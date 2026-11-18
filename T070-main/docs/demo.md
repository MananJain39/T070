# Development-only demo data

Run `PYTHONPATH=src python3 -m hsts seed` against a fresh database. These deterministic accounts are for local demonstration only and must never be reused in deployment:

| Role | Email | Password |
|---|---|---|
| Student/Alumni | `aarav@example.edu` | `StudentDemo123!` |
| Student/Alumni | `meera@example.edu` | `StudentDemo123!` |
| Higher Studies Coordinator | `coordinator@example.edu` | `CoordinatorDemo123!` |
| Administrator | `admin@example.edu` | `AdminDemo123!` |

Seed data has three countries, three institutions, four programmes and four higher-study records: Draft, Submitted, Verified and Correction Required. It includes multiple admission and progression statuses and prior history for a completed record. Seed refuses to overwrite a nonempty database.

Demo order: sign in as Aarav; create a Draft; submit it; sign out. Sign in as coordinator; open Verification Queue; verify the new record or request correction on another Submitted record; update an Ongoing record to Completed; review histories, search and reports. Sign in as admin; inspect users, change a role or activation status, add master data and review audit entries.
