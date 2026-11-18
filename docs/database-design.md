# Database design

SQLite is the local central relational database. `src/hsts/db.py` is the executable schema and migration baseline (`CREATE TABLE IF NOT EXISTS`). Foreign keys are enabled per connection. `Repository.transaction()` uses `BEGIN IMMEDIATE` and rollback on any error. No binary evidence is stored; `admission_evidence` is a reference string.

| Table | Primary key | Other fields (SQLite type; `!` = NOT NULL) | Foreign keys | Uniqueness / checks / indexes |
|---|---|---|---|---|
| `users` | `id INTEGER` | `name TEXT!`, `email TEXT!`, `contact_info TEXT!`, `role TEXT!`, `active INTEGER!`, `password_hash TEXT!` | — | email unique case insensitive; approved roles and active 0/1 |
| `sessions` | `token_hash TEXT` | `expires_at TEXT!` | `user_id → users.id!` | opaque bearer token stored only as digest |
| `countries` | `id INTEGER` | `name TEXT!`, `code TEXT!`, `active INTEGER!` | — | name/code unique; active 0/1 |
| `institutions` | `id INTEGER` | `name TEXT!`, `city TEXT!`, `active INTEGER!` | `country_id → countries.id!` | `(name, city, country_id)` unique |
| `programmes` | `id INTEGER` | `name TEXT!`, `degree_type TEXT!`, `duration TEXT!`, `active INTEGER!` | `institution_id → institutions.id!` | `(institution_id, name, degree_type)` unique |
| `higher_study_records` | `id INTEGER` | `admission_status TEXT!`, `admission_evidence TEXT!`, `start_date TEXT`, `expected_completion_date TEXT`, `progression_status TEXT!`, `verification_status TEXT!`, `correction_reason TEXT!`, `created_at TEXT!`, `updated_at TEXT!` | `student_id → users.id!`, `institution_id → institutions.id!`, `programme_id → programmes.id!`, `country_id → countries.id!` | status checks; indexes on student, verification, combined filters |
| `admission_updates` | `id INTEGER` | `status TEXT!`, `remarks TEXT!`, `update_date TEXT!` | `record_id → higher_study_records.id!`, `updated_by → users.id!` | record/date index |
| `progress_updates` | `id INTEGER` | `status TEXT!`, `remarks TEXT!`, `update_date TEXT!` | `record_id → higher_study_records.id!`, `updated_by → users.id!` | record/date index |
| `verifications` | `id INTEGER` | `decision TEXT!`, `reason TEXT!`, `decision_date TEXT!` | `record_id → higher_study_records.id!`, `reviewer_id → users.id!` | decision check; record/date index |
| `audit_records` | `id INTEGER` | `action TEXT!`, `entity TEXT!`, `entity_id INTEGER!`, `detail TEXT!`, `timestamp TEXT!` | `actor_id → users.id!` | entity/id/timestamp index; entity is generic because actions cover multiple tables |
| `notifications` | `id INTEGER` | `message TEXT!`, `created_at TEXT!`, `read_at TEXT` | `recipient_id → users.id!`, `record_id → higher_study_records.id!` | recipient is the owning student for verification outcome |

Dates use ISO 8601 text; API validation checks actual calendar dates. Foreign keys guarantee a referenced row exists, while service validation additionally requires active master data and that a selected programme belongs to the institution. The student role of `student_id` is enforced at the application boundary. Report is a transient aggregate read model, so there is no reports table. The `sessions` table is an implementation support entity. Because user deletion is not exposed, record ownership and audit history remain intact.

Verification writes the decision, current state, audit and in-app notification in one transaction. Progression writes history, current state and audit in one transaction. Admission changes similarly preserve history. A deliberately failing database trigger is used in integration tests to prove rollback.
