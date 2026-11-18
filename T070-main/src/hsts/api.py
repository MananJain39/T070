import hashlib
import json
import os
import sqlite3
import threading
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlparse
from .db import Repository
from .domain import AppError, fail
from .security import authenticate, current_user
from .service import Service

WEB = Path(__file__).resolve().parents[1] / 'web'
FEATURES_DIR = Path(__file__).resolve().parents[2] / 'features'

class Application:
    def __init__(self, database):
        self.db = Repository(database)
        self.service = Service(self.db)
        self.lock = threading.RLock()

    def handle(self, method, path, query, body, authorization=''):
        if path == '/api/auth/login' and method == 'POST':
            token, user = authenticate(self.db, body.get('email',''), body.get('password',''))
            return 200, {'token':token,'user':user}
        if path == '/api/auth/reset-password' and method == 'POST':
            return self.service.reset_password(body.get('email',''), body.get('password',''))
        user = current_user(self.db, authorization)
        if path == '/api/auth/logout' and method == 'POST':
            token_hash = hashlib.sha256(authorization[7:].encode()).hexdigest()
            self.db.run('DELETE FROM sessions WHERE token_hash=?', (token_hash,))
            return 204, None
        if path == '/api/profile':
            if method == 'GET': return 200, self.service.profile(user)
            if method == 'PATCH': return 200, self.service.update_profile(user, body)
        if path == '/api/notifications' and method == 'GET': return 200, self.service.notifications(user)
        if path == '/api/reports' and method == 'GET': return 200, self.service.reports(user)
        if path == '/api/audit' and method == 'GET': return 200, self.service.audit_list(user)
        if path == '/api/users':
            if method == 'GET': return 200, self.service.users(user)
            if method == 'POST': return 201, self.service.create_user(user, body)
        parts = path.strip('/').split('/')
        if len(parts) == 3 and parts[:2] == ['api','users'] and parts[2].isdigit() and method == 'PATCH':
            return 200, self.service.update_user(user, int(parts[2]), body)
        if len(parts) >= 3 and parts[:2] == ['api','master']:
            kind = parts[2]
            if len(parts) == 3:
                if method == 'GET': return 200, self.service.master(kind)
                if method == 'POST': return 201, self.service.save_master(user, kind, body)
            if len(parts) == 4 and parts[3].isdigit() and method == 'PATCH':
                return 200, self.service.save_master(user, kind, body, int(parts[3]))
        if path == '/api/records':
            if method == 'GET': return 200, self.service.search(user, query)
            if method == 'POST': return 201, self.service.create_record(user, body)
        if len(parts) >= 3 and parts[:2] == ['api','records'] and parts[2].isdigit():
            rid = int(parts[2])
            if len(parts) == 3:
                if method == 'GET': return 200, self.service.detail(user, rid)
                if method == 'PATCH': return 200, self.service.edit_record(user, rid, body)
            if len(parts) == 4 and method == 'POST':
                if parts[3] == 'submit': return 200, self.service.submit(user, rid)
                if parts[3] == 'verification': return 200, self.service.decide(user, rid, body.get('decision'), body.get('reason',''))
                if parts[3] == 'progression': return 200, self.service.update_progression(user, rid, body)
                if parts[3] == 'admission': return 200, self.service.update_admission(user, rid, body)
        fail('NOT_FOUND', 'Resource not found.', 404)

class Handler(BaseHTTPRequestHandler):
    app = None
    def _respond(self, status, payload):
        self.send_response(status)
        self.send_header('Content-Type','application/json; charset=utf-8')
        self.send_header('Cache-Control','no-store')
        self.send_header('X-Content-Type-Options','nosniff')
        self.end_headers()
        if payload is not None: self.wfile.write(json.dumps(payload).encode())

    def _request(self):
        route = urlparse(self.path)
        if not route.path.startswith('/api/'):
            if self.command != 'GET': return self._respond(404, {'error':{'code':'NOT_FOUND','message':'Resource not found.'}})
            return self._static(route.path)
        try:
            length = int(self.headers.get('Content-Length','0'))
            if length > 1024 * 1024: fail('VALIDATION_ERROR','Request body is too large.',422)
            if length:
                try: body = json.loads(self.rfile.read(length))
                except json.JSONDecodeError: fail('VALIDATION_ERROR','Malformed JSON.',400)
                if not isinstance(body, dict): fail('VALIDATION_ERROR','JSON object required.',400)
            else: body = {}
            query = {k:v[0] for k,v in parse_qs(route.query).items()}
            with self.app.lock:
                status, payload = self.app.handle(self.command, route.path, query, body, self.headers.get('Authorization',''))
            self._respond(status,payload)
        except AppError as e:
            self._respond(e.status, {'error':{'code':e.code,'message':e.message}})
        except (sqlite3.Error, OSError):
            self._respond(500, {'error':{'code':'PERSISTENCE_ERROR','message':'The operation could not be saved.'}})
        except Exception:
            self._respond(500, {'error':{'code':'INTERNAL_ERROR','message':'An unexpected error occurred.'}})

    def _static(self, path):
        rel = path.lstrip('/') or 'index.html'
        if rel.startswith('features/'):
            sub_path = rel[len('features/'):]
            file_path = (FEATURES_DIR / sub_path).resolve()
            base_dir = FEATURES_DIR
        else:
            file_path = (WEB / rel).resolve()
            base_dir = WEB
        try:
            file_path.relative_to(base_dir)
        except ValueError:
            return self._respond(403, {'error':{'code':'FORBIDDEN','message':'Access denied.'}})
        if not file_path.is_file():
            return self._respond(404, {'error':{'code':'NOT_FOUND','message':'Page not found.'}})
        ext = file_path.suffix.lstrip('.').lower()
        content_types = {
            'html': 'text/html; charset=utf-8',
            'js': 'text/javascript; charset=utf-8',
            'css': 'text/css; charset=utf-8',
            'svg': 'image/svg+xml',
            'json': 'application/json; charset=utf-8',
            'png': 'image/png'
        }
        content_type = content_types.get(ext, 'text/plain; charset=utf-8')
        data = file_path.read_bytes()
        self.send_response(200)
        self.send_header('Content-Type', content_type)
        self.send_header('Content-Length', str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    do_GET = do_POST = do_PATCH = _request

def serve(database=None, host=None, port=None):
    Handler.app = Application(database or os.environ.get('HSTS_DB','data/hsts.sqlite3'))
    server = ThreadingHTTPServer((host or os.environ.get('HSTS_HOST','127.0.0.1'), int(port or os.environ.get('HSTS_PORT','8000'))), Handler)
    print(f'Listening on http://{server.server_address[0]}:{server.server_address[1]}', flush=True)
    server.serve_forever()
