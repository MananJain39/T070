# Requirements traceability matrix

The PDF `T070.pdf` controls identifiers and descriptions. The earlier `docs/requirements/SRS-v1.0.md` has a different FR numbering/content (for example its FR-001 is registration); this matrix deliberately follows the PDF and does not merge those conflicting numbers. `—` means the PDF has no exact story or the particular behavior lacks a dedicated automated integration test; the functional flow is still covered by related tests.

| Requirement ID | Requirement Description | User Story | Use Case | Architecture Component | Implementation Module/Class | API Endpoint | Unit Test(s) | Integration Test(s) | Status |
|---|---|---|---|---|---|---|---|---|---|
| FR-001 | User Login | US-001 | UC-001 | Authentication & Access Control | security.authenticate | `POST /auth/login` | UT-AUTH-002 | IT-AUTH-001 | Implemented |
| FR-002 | Authentication Failure | US-001 | UC-001 | Authentication & Access Control | security.authenticate | `POST /auth/login` | UT-AUTH-003 | IT-AUTH-002 | Implemented |
| FR-003 | Logout | — | UC-001 | Authentication & Access Control | api.Application | `POST /auth/logout` | UT-AUTH-001 | IT-AUTH-005 | Implemented |
| FR-004 | Role Assignment | US-010 | UC-002 | User Management | Service.update_user | `PATCH /users/{id}` | UT-USER-001 | IT-ADMIN-001 | Implemented |
| FR-005 | Role-Based Access | US-010 | UC-001/002 | Authentication & Access Control | security.require_role | `all protected` | UT-RBAC-001 | IT-ADMIN-006 | Implemented |
| FR-006 | View Profile | US-002 | UC-003 | Higher-Study Record Manager | Service.profile | `GET /profile` | UT-REC-006 | IT-AUTH-001 | Implemented |
| FR-007 | Update Profile | US-003 | UC-003 | Higher-Study Record Manager | Service.update_profile | `PATCH /profile` | UT-REC-006 | IT-PROFILE-001 | Implemented |
| FR-008 | Institution Details | US-003 | UC-004 | Higher-Study Record Manager | Service.create_record | `POST /records` | UT-REC-001 | IT-UC004-001 | Implemented |
| FR-009 | Programme Details | US-003 | UC-004 | Higher-Study Record Manager | Service._record_fields | `POST /records` | UT-REC-003 | IT-UC004-002 | Implemented |
| FR-010 | Country Details | US-003 | UC-004 | Higher-Study Record Manager | Service._record_fields | `POST /records` | UT-REC-004 | IT-UC004-002 | Implemented |
| FR-011 | Admission Status | US-004 | UC-004/005 | Higher-Study Record Manager | HigherStudyRecord | `POST /records` | UT-REC-001 | IT-UC004-001 | Implemented |
| FR-012 | Admission Update | US-004 | UC-005 | Higher-Study Record Manager | Service.update_admission | `POST /records/{id}/admission` | UT-ADM-001 | IT-ADM-001 | Implemented |
| FR-013 | Admission Evidence | US-004 | UC-004 | Higher-Study Record Manager | HigherStudyRecord.admission_evidence | `POST /records` | UT-REC-001 | IT-UC004-001 | Implemented |
| FR-014 | Status History | US-004 | UC-005 | Higher-Study Record Manager | AdmissionUpdate | `GET /records/{id}` | UT-ADM-001 | IT-ADM-001 | Implemented |
| FR-015 | Progression Status | US-008 | UC-006 | Progression Tracker | HigherStudyRecord.progression_status | `POST /records/{id}/progression` | UT-PROG-005 | IT-UC006-001 | Implemented |
| FR-016 | Progress Update | US-008 | UC-006 | Progression Tracker | Service.update_progression | `POST /records/{id}/progression` | UT-PROG-005 | IT-UC006-001 | Implemented |
| FR-017 | Progress History | US-013 | UC-006 | Progression Tracker | ProgressUpdate | `GET /records/{id}` | UT-PROG-005 | IT-UC006-001 | Implemented |
| FR-018 | Completion Status | US-008 | UC-006 | Progression Tracker | domain.PROGRESS_EDGES | `POST /records/{id}/progression` | UT-PROG-002/003 | IT-UC006-001 | Implemented |
| FR-019 | Submit for Verification | US-005 | UC-007 | Verification Manager | Service.submit | `POST /records/{id}/submit` | UT-STATE-001 | IT-UC004-005 | Implemented |
| FR-020 | Verify Record | US-006 | UC-008 | Verification Manager | Service.decide; Verification | `POST /records/{id}/verification` | UT-VER-001/003 | IT-UC008-001/003 | Implemented |
| FR-021 | Request Correction | US-007 | UC-009 | Verification Manager | Service.decide; Notification | `POST /records/{id}/verification` | UT-VER-004/005 | IT-UC008-002/005 | Implemented |
| FR-022 | Record Status | US-005 | UC-003/007/008 | Verification Manager | HigherStudyRecord.verification_status | `GET /records/{id}` | UT-STATE-001/003 | IT-UC004-005/006 | Implemented |
| FR-023 | Student Search | US-009 | UC-010 | Search & Reporting | Service.search | `GET /records` | UT-SEARCH-001 | IT-SEARCH-002 | Implemented |
| FR-024 | Filter Records | US-009 | UC-010 | Search & Reporting | Service.search | `GET /records` | UT-SEARCH-002 | IT-SEARCH-001 | Implemented |
| FR-025 | Institution Summary | US-012 | UC-011 | Search & Reporting | Service.reports; Report | `GET /reports` | UT-REPORT-001 | IT-REPORT-001 | Implemented |
| FR-026 | Country Summary | US-012 | UC-011 | Search & Reporting | Service.reports; Report | `GET /reports` | UT-REPORT-001 | IT-REPORT-001 | Implemented |
| FR-027 | Status Report | US-012 | UC-011 | Search & Reporting | Service.reports; Report | `GET /reports` | UT-REPORT-001 | IT-REPORT-001 | Implemented |
| FR-028 | Dashboard | US-012 | UC-011 | Search & Reporting | Service.reports; Web UI | `GET /reports` | UT-REPORT-001 | IT-REPORT-001 | Implemented |
| FR-029 | Manage Institutions | US-011 | UC-012 | Master Data Manager | Service.save_master; Institution | `POST/PATCH /master/institutions` | UT-MASTER-003 | IT-ADMIN-004 | Implemented |
| FR-030 | Manage Programmes | US-011 | UC-013 | Master Data Manager | Service.save_master; Programme | `POST/PATCH /master/programmes` | UT-MASTER-003 | IT-ADMIN-005 | Implemented |
| FR-031 | Manage Countries | US-011 | UC-014 | Master Data Manager | Service.save_master; Country | `POST/PATCH /master/countries` | UT-MASTER-001 | IT-ADMIN-003 | Implemented |
| FR-032 | User Management | US-010/014 | UC-002 | User Management | Service.create_user/update_user | `GET/POST/PATCH /users` | UT-USER-001/002 | IT-ADMIN-001/002 | Implemented |

## Business rules and quality links

BR-001/002/003/004/005/009/010 map to authentication, role guards, ownership, transition functions and report guards (`UT-RBAC-*`, `IT-AUTH-*`, `IT-UC008-*`). BR-006/007/008 map to controlled status/reference/date validation (`UT-DTO-*`, `UT-REC-*`, `UT-PROG-*`). NFR-004–007 and 019–021 map to these same access and audit tests. NFR-011/012 map to persisted SQLite and rollback tests `IT-UC008-006`, `IT-UC006-005`. Performance, availability, scalability and browser compatibility NFRs are architecture goals, not measured service-level guarantees in this local prototype.
