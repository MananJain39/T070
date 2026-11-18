# Higher Studies Tracking System

**CS314 Software Development Laboratory · Team T070 · The LNM Institute of Information Technology, Jaipur**

Team: Laxita Bhimsaria (24UCS144), Vaibhav Goyal (24UCS145), Manan Jain (24UCS146), and Harsh Varshney (24UCS148). The project follows an Agile and incremental development approach.

Graduates' higher-study information is often scattered across forms, spreadsheets and messages. This prototype provides a central place for students/alumni to record institutions, programmes, countries and admission details; for coordinators to verify information and track progression; and for administrators to maintain access and master data. It implements the scope and terminology in [`T070.pdf`](T070.pdf).

## Features and actors

- **Student/Alumni:** sign in, view/update profile, create/edit own Draft records, submit for verification, see status/correction reason and histories. Editing a Verified record opens a new Draft cycle.
- **Higher Studies Coordinator:** search/filter, review the Submitted queue, verify or request corrections, update admission/progression, view histories and reports.
- **Administrator:** create/deactivate users, assign roles, maintain institution/programme/country lists, view reports and audit records.

## Technology and architecture

Python 3 standard library HTTP server and `sqlite3`, vanilla HTML/CSS/JavaScript, and `unittest`. No package installation is needed. The layered path is browser UI → JSON API → application service and domain validation → repository → SQLite. Authentication, role/ownership checks, audit logging and in-app notifications cross these layers. SQLite transactions keep verification and progression state aligned with their history. See [`docs/architecture.md`](docs/architecture.md).

## Project structure

```text
src/hsts/       API, service, domain rules, security, schema/repository, seed
src/web/        browser UI
 tests/         unit and real HTTP/SQLite integration tests
 docs/          analysis, architecture, schema, API, tests, traceability, demo
 docs/diagrams/ editable PlantUML/Mermaid diagrams
 T070.pdf       primary specification
```

## Install, initialize and run

Use Python 3.11 or newer. From the repository root:

```bash
PYTHONPATH=src python3 -m hsts seed
PYTHONPATH=src python3 -m hsts serve
```

Open `http://127.0.0.1:8000`. Seeding creates `data/hsts.sqlite3` and refuses to overwrite a nonempty database. To use a different database path or port:

```bash
PYTHONPATH=src python3 -m hsts seed --db /tmp/hsts-demo.sqlite3
PYTHONPATH=src python3 -m hsts serve --db /tmp/hsts-demo.sqlite3 --port 8080
```

Environment variables for the server are `HSTS_DB` (default `data/hsts.sqlite3`), `HSTS_HOST` (default `127.0.0.1`) and `HSTS_PORT` (default `8000`). The `--db`/`--port` flags override their respective settings. The schema initializes automatically; `seed` supplies deterministic demonstration rows. Demo credentials are in [`docs/demo.md`](docs/demo.md) and are development-only.

## Tests and checks

```bash
PYTHONPATH=src python3 -m unittest discover -s tests -v
python3 -m py_compile src/hsts/*.py
node --check src/web/app.js
```

The integration suite opens an ephemeral local HTTP port and uses a fresh SQLite file per test. If a managed sandbox denies loopback sockets, run the test command in a local shell or grant that sandbox permission. The project uses no external build dependencies; Python compilation and JavaScript syntax check are its build checks.

## API and design

The JSON API starts at `/api`. Main resources are `/auth/login`, `/profile`, `/users`, `/master/{countries|institutions|programmes}`, `/records`, `/records/{id}/submit`, `/records/{id}/verification`, `/records/{id}/progression`, `/records/{id}/admission`, `/reports` and `/audit`. Full request, response, role and error details are in [`docs/api-design.md`](docs/api-design.md). The database schema is in [`docs/database-design.md`](docs/database-design.md); editable UML/ER sources are in [`docs/diagrams/`](docs/diagrams/); test plans and requirement links are in [`docs/testing-strategy.md`](docs/testing-strategy.md), [`docs/test-cases.md`](docs/test-cases.md) and [`docs/requirements-traceability-matrix.md`](docs/requirements-traceability-matrix.md).

## Prototype limitations

Local password accounts replace institutional SSO; an administrator creates accounts. Verification notifications are in-app rows rather than email. Admission evidence is a reference string rather than a binary upload. SQLite and the bundled HTTP server target an academic demonstration, not production availability/load. The PDF's requirements do not set numeric performance thresholds, so no institutional-scale performance claim is made. The repository also contains an earlier Markdown SRS with conflicting FR numbers; `T070.pdf` controls this implementation and RTM.
