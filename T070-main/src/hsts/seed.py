from datetime import date
from .db import Repository
from .security import hash_password

ACCOUNTS = [
 ('Aarav Sharma','aarav@example.edu','Student/Alumni','StudentDemo123!'),
 ('Meera Iyer','meera@example.edu','Student/Alumni','StudentDemo123!'),
 ('Dr. Kavita Rao','coordinator@example.edu','Higher Studies Coordinator','CoordinatorDemo123!'),
 ('System Admin','admin@example.edu','Administrator','AdminDemo123!'),
]

def seed(path='data/hsts.sqlite3'):
    db = Repository(path)
    with db.transaction():
        if db.one('SELECT id FROM users LIMIT 1'):
            raise RuntimeError('Database is not empty; seed only a fresh database.')
        for name,email,role,password in ACCOUNTS:
            db.run('INSERT INTO users(name,email,role,password_hash) VALUES(?,?,?,?)',(name,email,role,hash_password(password)))
        for name,code in [('India','IN'),('United States','US'),('United Kingdom','GB')]:
            db.run('INSERT INTO countries(name,code) VALUES(?,?)',(name,code))
        for name,city,cid in [('Arizona State University','Tempe',2),('University of Oxford','Oxford',3),('IIT Delhi','New Delhi',1)]:
            db.run('INSERT INTO institutions(name,city,country_id) VALUES(?,?,?)',(name,city,cid))
        for iid,name,degree in [(1,'Computer Science','MS'),(1,'Data Science','MS'),(2,'Computer Science','MSc'),(3,'Electrical Engineering','MTech')]:
            db.run('INSERT INTO programmes(institution_id,name,degree_type,duration) VALUES(?,?,?,?)',(iid,name,degree,'2 years'))
        cases = [(1,1,1,2,'Offer Received','Draft','Not Started',''),
                 (1,2,3,3,'Admitted','Submitted','Ongoing',''),
                 (2,3,4,1,'Admitted','Verified','Completed',''),
                 (2,1,2,2,'Applied','Correction Required','Not Started','Please confirm admission evidence.')]
        for student,inst,prog,country,adm,ver,progress,reason in cases:
            cur = db.run('''INSERT INTO higher_study_records(student_id,institution_id,programme_id,country_id,admission_status,verification_status,progression_status,correction_reason,created_at,updated_at)
                         VALUES(?,?,?,?,?,?,?,?,?,?)''',(student,inst,prog,country,adm,ver,progress,reason,date.today().isoformat(),date.today().isoformat()))
            rid = cur.lastrowid
            db.run('INSERT INTO admission_updates(record_id,status,remarks,update_date,updated_by) VALUES(?,?,?,?,?)',(rid,adm,'Seed admission',date.today().isoformat(),student))
            if progress != 'Not Started':
                if progress == 'Completed':
                    db.run('INSERT INTO progress_updates(record_id,status,remarks,update_date,updated_by) VALUES(?,?,?,?,?)',(rid,'Ongoing','Seed prior progression',date.today().isoformat(),3))
                db.run('INSERT INTO progress_updates(record_id,status,remarks,update_date,updated_by) VALUES(?,?,?,?,?)',(rid,progress,'Seed progression',date.today().isoformat(),3))
            if ver in ('Verified','Correction Required'):
                db.run('INSERT INTO verifications(record_id,reviewer_id,decision,reason,decision_date) VALUES(?,?,?,?,?)',(rid,3,ver,reason,date.today().isoformat()))
    db.conn.close()
