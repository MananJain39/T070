import base64
import hashlib
import hmac
import secrets
from datetime import datetime, timedelta, timezone
from .domain import fail, ROLES

def hash_password(password):
    salt = secrets.token_bytes(16)
    digest = hashlib.pbkdf2_hmac('sha256', password.encode(), salt, 210000)
    return base64.b64encode(salt).decode() + '$' + base64.b64encode(digest).decode()

def check_password(password, stored):
    try:
        salt, expected = (base64.b64decode(x) for x in stored.split('$'))
        actual = hashlib.pbkdf2_hmac('sha256', password.encode(), salt, 210000)
        return hmac.compare_digest(actual, expected)
    except (ValueError, TypeError):
        return False

def authenticate(repo, email, password):
    user = repo.one('SELECT * FROM users WHERE email=?', (email,))
    if not user or not user['active'] or not check_password(password, user['password_hash']):
        fail('AUTHENTICATION_ERROR', 'Invalid credentials.', 401)
    token = secrets.token_urlsafe(32)
    expiry = (datetime.now(timezone.utc) + timedelta(hours=8)).isoformat()
    repo.run('INSERT INTO sessions VALUES (?,?,?)', (hashlib.sha256(token.encode()).hexdigest(), user['id'], expiry))
    return token, public_user(user)

def current_user(repo, header):
    if not header.startswith('Bearer '):
        fail('AUTHENTICATION_ERROR', 'Authentication required.', 401)
    token_hash = hashlib.sha256(header[7:].encode()).hexdigest()
    user = repo.one('SELECT u.* FROM sessions s JOIN users u ON u.id=s.user_id WHERE s.token_hash=? AND s.expires_at>? AND u.active=1', (token_hash, datetime.now(timezone.utc).isoformat()))
    if not user:
        fail('AUTHENTICATION_ERROR', 'Authentication required.', 401)
    return user

def require_role(user, *roles):
    if user['role'] not in roles:
        fail('AUTHORIZATION_ERROR', 'You do not have permission for this action.', 403)

def require_owner_or_staff(user, record):
    if user['role'] == ROLES[0] and user['id'] != record['student_id']:
        fail('AUTHORIZATION_ERROR', 'You do not have permission for this record.', 403)

def public_user(user):
    return {k: user[k] for k in ('id','name','email','contact_info','role','active')}
