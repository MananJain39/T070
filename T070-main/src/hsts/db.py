import sqlite3
from contextlib import contextmanager
from pathlib import Path

SCHEMA = '''
PRAGMA foreign_keys=ON;
CREATE TABLE IF NOT EXISTS users (
 id INTEGER PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL UNIQUE COLLATE NOCASE,
 contact_info TEXT NOT NULL DEFAULT '', role TEXT NOT NULL CHECK(role IN ('Student/Alumni','Higher Studies Coordinator','Administrator')),
 active INTEGER NOT NULL DEFAULT 1 CHECK(active IN (0,1)), password_hash TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS sessions (token_hash TEXT PRIMARY KEY, user_id INTEGER NOT NULL REFERENCES users(id), expires_at TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS countries (id INTEGER PRIMARY KEY, name TEXT NOT NULL UNIQUE, code TEXT NOT NULL UNIQUE, active INTEGER NOT NULL DEFAULT 1 CHECK(active IN (0,1)));
CREATE TABLE IF NOT EXISTS institutions (id INTEGER PRIMARY KEY, name TEXT NOT NULL, city TEXT NOT NULL, country_id INTEGER NOT NULL REFERENCES countries(id), active INTEGER NOT NULL DEFAULT 1 CHECK(active IN (0,1)), UNIQUE(name,city,country_id));
CREATE TABLE IF NOT EXISTS programmes (id INTEGER PRIMARY KEY, institution_id INTEGER NOT NULL REFERENCES institutions(id), name TEXT NOT NULL, degree_type TEXT NOT NULL, duration TEXT NOT NULL DEFAULT '', active INTEGER NOT NULL DEFAULT 1 CHECK(active IN (0,1)), UNIQUE(institution_id,name,degree_type));
CREATE TABLE IF NOT EXISTS higher_study_records (
 id INTEGER PRIMARY KEY, student_id INTEGER NOT NULL REFERENCES users(id), institution_id INTEGER NOT NULL REFERENCES institutions(id),
 programme_id INTEGER NOT NULL REFERENCES programmes(id), country_id INTEGER NOT NULL REFERENCES countries(id),
 admission_status TEXT NOT NULL CHECK(admission_status IN ('Applied','Offer Received','Admitted','Rejected','Deferred')),
 admission_evidence TEXT NOT NULL DEFAULT '', start_date TEXT, expected_completion_date TEXT,
 progression_status TEXT NOT NULL DEFAULT 'Not Started' CHECK(progression_status IN ('Not Started','Ongoing','Completed','Discontinued')),
 verification_status TEXT NOT NULL DEFAULT 'Draft' CHECK(verification_status IN ('Draft','Submitted','Verified','Correction Required')),
 correction_reason TEXT NOT NULL DEFAULT '', created_at TEXT NOT NULL, updated_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS admission_updates (id INTEGER PRIMARY KEY, record_id INTEGER NOT NULL REFERENCES higher_study_records(id), status TEXT NOT NULL, remarks TEXT NOT NULL DEFAULT '', update_date TEXT NOT NULL, updated_by INTEGER NOT NULL REFERENCES users(id));
CREATE TABLE IF NOT EXISTS progress_updates (id INTEGER PRIMARY KEY, record_id INTEGER NOT NULL REFERENCES higher_study_records(id), status TEXT NOT NULL, remarks TEXT NOT NULL DEFAULT '', update_date TEXT NOT NULL, updated_by INTEGER NOT NULL REFERENCES users(id));
CREATE TABLE IF NOT EXISTS verifications (id INTEGER PRIMARY KEY, record_id INTEGER NOT NULL REFERENCES higher_study_records(id), reviewer_id INTEGER NOT NULL REFERENCES users(id), decision TEXT NOT NULL CHECK(decision IN ('Verified','Correction Required')), reason TEXT NOT NULL DEFAULT '', decision_date TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS audit_records (id INTEGER PRIMARY KEY, actor_id INTEGER NOT NULL REFERENCES users(id), action TEXT NOT NULL, entity TEXT NOT NULL, entity_id INTEGER NOT NULL, detail TEXT NOT NULL DEFAULT '', timestamp TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS notifications (id INTEGER PRIMARY KEY, recipient_id INTEGER NOT NULL REFERENCES users(id), record_id INTEGER NOT NULL REFERENCES higher_study_records(id), message TEXT NOT NULL, created_at TEXT NOT NULL, read_at TEXT);
CREATE INDEX IF NOT EXISTS idx_records_student ON higher_study_records(student_id);
CREATE INDEX IF NOT EXISTS idx_records_status ON higher_study_records(verification_status);
CREATE INDEX IF NOT EXISTS idx_records_filters ON higher_study_records(institution_id,programme_id,country_id,admission_status,progression_status);
CREATE INDEX IF NOT EXISTS idx_progress_record ON progress_updates(record_id,update_date);
CREATE INDEX IF NOT EXISTS idx_admission_record ON admission_updates(record_id,update_date);
CREATE INDEX IF NOT EXISTS idx_verifications_record ON verifications(record_id,decision_date);
CREATE INDEX IF NOT EXISTS idx_audit_entity ON audit_records(entity,entity_id,timestamp);
'''

class Repository:
    def __init__(self, path):
        self.path = str(path)
        Path(self.path).parent.mkdir(parents=True, exist_ok=True)
        self.conn = sqlite3.connect(self.path, isolation_level=None, check_same_thread=False)
        self.conn.row_factory = sqlite3.Row
        self.conn.execute('PRAGMA foreign_keys=ON')
        self.conn.execute('PRAGMA busy_timeout=5000')
        self.conn.executescript(SCHEMA)

    def one(self, sql, args=()):
        row = self.conn.execute(sql, args).fetchone()
        return dict(row) if row else None

    def all(self, sql, args=()):
        return [dict(r) for r in self.conn.execute(sql, args).fetchall()]

    def run(self, sql, args=()):
        return self.conn.execute(sql, args)

    @contextmanager
    def transaction(self):
        self.conn.execute('BEGIN IMMEDIATE')
        try:
            yield
            self.conn.execute('COMMIT')
        except Exception:
            self.conn.execute('ROLLBACK')
            raise
