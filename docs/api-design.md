# API design

All endpoints below use `/api` as prefix, JSON request/response, and bearer authentication except login. Responses are objects or arrays. `204` has no body. Errors use `{ "error": { "code": "...", "message": "..." } }`. Common errors: 400 malformed JSON, 401 missing/expired token, 403 role/ownership, 404 missing resource, 409 conflict/invalid transition, 422 invalid fields, 500 persistence/internal failure. Stack traces are never returned.

| Method | Route | Role | Request DTO / validation | Success | Business rule |
|---|---|---|---|---|---|
| POST | `/auth/login` | Public | email, password; generic failure | 200 token, user | BR-010 |
| POST | `/auth/logout` | All | bearer token | 204 | FR-003 |
| GET/PATCH | `/profile` | All | PATCH name required, contact_info optional | 200 user | own profile |
| GET | `/notifications` | All | — | 200 own notifications | privacy |
| GET/POST | `/users` | Admin | POST name, email, role, password ≥8 | 200 list / 201 user | FR-032 |
| PATCH | `/users/{id}` | Admin | role and/or active boolean | 200 user | FR-004, BR-010 |
| GET/POST | `/master/countries` | GET all; POST Admin | POST name, code | 200 list / 201 item | FR-031 |
| GET/POST | `/master/institutions` | GET all; POST Admin | POST name, city, active country_id | 200 / 201 | FR-029 |
| GET/POST | `/master/programmes` | GET all; POST Admin | POST name, degree_type, duration, active institution_id | 200 / 201 | FR-030 |
| PATCH | `/master/{kind}/{id}` | Admin | fields as above; active boolean | 200 item | valid references, uniqueness |
| GET/POST | `/records` | All GET; Student POST | GET student, institution_id, programme_id, country_id, admission_status, progression_status, verification_status; POST valid references and admission_status; optional dates/evidence | 200 list / 201 Draft | BR-003, BR-007 |
| GET/PATCH | `/records/{id}` | Owner or staff GET; owner PATCH | PATCH same fields as create; Submitted locked; Verified edit starts Draft | 200 detail | BR-003, BR-005 |
| POST | `/records/{id}/submit` | Owner student | Draft or Correction Required | 200 detail | FR-019 |
| POST | `/records/{id}/verification` | Coordinator | decision `Verified` or `Correction Required`; reason mandatory for latter | 200 detail | BR-004, atomic history/audit/notification |
| POST | `/records/{id}/progression` | Coordinator | status, update_date, remarks; approved edge | 200 detail/history | BR-008, atomic current/history |
| POST | `/records/{id}/admission` | Coordinator | status, update_date, remarks; controlled status | 200 detail/history | BR-006 |
| GET | `/reports` | Coordinator/Admin | — | 200 grouped summaries | BR-009 |
| GET | `/audit` | Admin | — | 200 latest 200 entries | NFR-007 |

Record detail includes admission, progression and verification histories. Search results include student, institution, programme and country labels. Filtering is conjunctive. Student searches are always scoped to their own records.
