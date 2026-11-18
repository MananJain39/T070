# Test cases

These identifiers are actual test methods in `tests/test_unit.py` and `tests/test_integration.py`. Each test starts with its own preconditions: pure value input for domain tests or deterministic fresh seed data for service/HTTP tests. For HTTP tests, steps include sending the listed request through authentication, authorization, controller, service, repository and SQLite.

| Test ID | Requirement ID | Use Case | Component | Preconditions | Input | Steps | Expected Result | Test Type |
|---|---|---|---|---|---|---|---|---|
| UT-STATE-001 | FR-019–022 | See RTM | STATE | Isolated input or seeded service | draft submit | Run `UT-STATE-001` method | Assert draft submit outcome and relevant persisted state/status | Unit |
| UT-STATE-002 | FR-019–022 | See RTM | STATE | Isolated input or seeded service | correction resubmit | Run `UT-STATE-002` method | Assert correction resubmit outcome and relevant persisted state/status | Unit |
| UT-STATE-003 | FR-019–022 | See RTM | STATE | Isolated input or seeded service | verified edit new cycle | Run `UT-STATE-003` method | Assert verified edit new cycle outcome and relevant persisted state/status | Unit |
| UT-STATE-004 | FR-019–022 | See RTM | STATE | Isolated input or seeded service | duplicate verify | Run `UT-STATE-004` method | Assert duplicate verify outcome and relevant persisted state/status | Unit |
| UT-STATE-005 | FR-019–022 | See RTM | STATE | Isolated input or seeded service | submitted edit | Run `UT-STATE-005` method | Assert submitted edit outcome and relevant persisted state/status | Unit |
| UT-PROG-001 | FR-015–018 | UC-006 | PROG | Isolated input or seeded service | start ongoing | Run `UT-PROG-001` method | Assert start ongoing outcome and relevant persisted state/status | Unit |
| UT-PROG-002 | FR-015–018 | UC-006 | PROG | Isolated input or seeded service | ongoing complete | Run `UT-PROG-002` method | Assert ongoing complete outcome and relevant persisted state/status | Unit |
| UT-PROG-003 | FR-015–018 | UC-006 | PROG | Isolated input or seeded service | terminal reject | Run `UT-PROG-003` method | Assert terminal reject outcome and relevant persisted state/status | Unit |
| UT-PROG-004 | FR-015–018 | UC-006 | PROG | Isolated input or seeded service | same status reject | Run `UT-PROG-004` method | Assert same status reject outcome and relevant persisted state/status | Unit |
| UT-DTO-001 | BR-006–008 | See RTM | DTO | Isolated input or seeded service | required | Run `UT-DTO-001` method | Assert required outcome and relevant persisted state/status | Unit |
| UT-DTO-002 | BR-006–008 | See RTM | DTO | Isolated input or seeded service | choice | Run `UT-DTO-002` method | Assert choice outcome and relevant persisted state/status | Unit |
| UT-DTO-003 | BR-006–008 | See RTM | DTO | Isolated input or seeded service | invalid date | Run `UT-DTO-003` method | Assert invalid date outcome and relevant persisted state/status | Unit |
| UT-DTO-004 | BR-006–008 | See RTM | DTO | Isolated input or seeded service | valid leap date | Run `UT-DTO-004` method | Assert valid leap date outcome and relevant persisted state/status | Unit |
| UT-AUTH-001 | FR-001–005 | UC-001 | AUTH | Isolated input or seeded service | password hash | Run `UT-AUTH-001` method | Assert password hash outcome and relevant persisted state/status | Unit |
| UT-RBAC-001 | FR-005 | See RTM | RBAC | Isolated input or seeded service | student forbidden coordinator | Run `UT-RBAC-001` method | Assert student forbidden coordinator outcome and relevant persisted state/status | Unit |
| UT-RBAC-002 | FR-005 | See RTM | RBAC | Isolated input or seeded service | owner allowed | Run `UT-RBAC-002` method | Assert owner allowed outcome and relevant persisted state/status | Unit |
| UT-RBAC-003 | FR-005 | See RTM | RBAC | Isolated input or seeded service | other student forbidden | Run `UT-RBAC-003` method | Assert other student forbidden outcome and relevant persisted state/status | Unit |
| UT-RBAC-004 | FR-005 | See RTM | RBAC | Isolated input or seeded service | staff allowed | Run `UT-RBAC-004` method | Assert staff allowed outcome and relevant persisted state/status | Unit |
| UT-AUTH-002 | FR-001–005 | UC-001 | AUTH | Isolated input or seeded service | valid login | Run `UT-AUTH-002` method | Assert valid login outcome and relevant persisted state/status | Unit |
| UT-AUTH-003 | FR-001–005 | UC-001 | AUTH | Isolated input or seeded service | invalid generic | Run `UT-AUTH-003` method | Assert invalid generic outcome and relevant persisted state/status | Unit |
| UT-AUTH-004 | FR-001–005 | UC-001 | AUTH | Isolated input or seeded service | inactive | Run `UT-AUTH-004` method | Assert inactive outcome and relevant persisted state/status | Unit |
| UT-REC-001 | FR-006–010 | See RTM | REC | Isolated input or seeded service | create draft | Run `UT-REC-001` method | Assert create draft outcome and relevant persisted state/status | Unit |
| UT-REC-002 | FR-006–010 | See RTM | REC | Isolated input or seeded service | missing reference | Run `UT-REC-002` method | Assert missing reference outcome and relevant persisted state/status | Unit |
| UT-REC-003 | FR-006–010 | See RTM | REC | Isolated input or seeded service | wrong programme institution | Run `UT-REC-003` method | Assert wrong programme institution outcome and relevant persisted state/status | Unit |
| UT-REC-004 | FR-006–010 | See RTM | REC | Isolated input or seeded service | invalid country | Run `UT-REC-004` method | Assert invalid country outcome and relevant persisted state/status | Unit |
| UT-REC-005 | FR-006–010 | See RTM | REC | Isolated input or seeded service | staff cannot create student record | Run `UT-REC-005` method | Assert staff cannot create student record outcome and relevant persisted state/status | Unit |
| UT-REC-006 | FR-006–010 | See RTM | REC | Isolated input or seeded service | private record | Run `UT-REC-006` method | Assert private record outcome and relevant persisted state/status | Unit |
| UT-REC-007 | FR-006–010 | See RTM | REC | Isolated input or seeded service | missing | Run `UT-REC-007` method | Assert missing outcome and relevant persisted state/status | Unit |
| UT-REC-008 | FR-006–010 | See RTM | REC | Isolated input or seeded service | verified edit returns draft | Run `UT-REC-008` method | Assert verified edit returns draft outcome and relevant persisted state/status | Unit |
| UT-VER-001 | FR-019–022 | UC-008/009 | VER | Isolated input or seeded service | coordinator verifies | Run `UT-VER-001` method | Assert coordinator verifies outcome and relevant persisted state/status | Unit |
| UT-VER-002 | FR-019–022 | UC-008/009 | VER | Isolated input or seeded service | student forbidden | Run `UT-VER-002` method | Assert student forbidden outcome and relevant persisted state/status | Unit |
| UT-VER-003 | FR-019–022 | UC-008/009 | VER | Isolated input or seeded service | duplicate | Run `UT-VER-003` method | Assert duplicate outcome and relevant persisted state/status | Unit |
| UT-VER-004 | FR-019–022 | UC-008/009 | VER | Isolated input or seeded service | correction reason required | Run `UT-VER-004` method | Assert correction reason required outcome and relevant persisted state/status | Unit |
| UT-VER-005 | FR-019–022 | UC-008/009 | VER | Isolated input or seeded service | correction saved | Run `UT-VER-005` method | Assert correction saved outcome and relevant persisted state/status | Unit |
| UT-PROG-005 | FR-015–018 | UC-006 | PROG | Isolated input or seeded service | history preserved | Run `UT-PROG-005` method | Assert history preserved outcome and relevant persisted state/status | Unit |
| UT-PROG-006 | FR-015–018 | UC-006 | PROG | Isolated input or seeded service | invalid no change | Run `UT-PROG-006` method | Assert invalid no change outcome and relevant persisted state/status | Unit |
| UT-PROG-007 | FR-015–018 | UC-006 | PROG | Isolated input or seeded service | date required | Run `UT-PROG-007` method | Assert date required outcome and relevant persisted state/status | Unit |
| UT-PROG-008 | FR-015–018 | UC-006 | PROG | Isolated input or seeded service | student forbidden | Run `UT-PROG-008` method | Assert student forbidden outcome and relevant persisted state/status | Unit |
| UT-MASTER-001 | FR-029–031 | See RTM | MASTER | Isolated input or seeded service | admin add country | Run `UT-MASTER-001` method | Assert admin add country outcome and relevant persisted state/status | Unit |
| UT-MASTER-002 | FR-029–031 | See RTM | MASTER | Isolated input or seeded service | student forbidden | Run `UT-MASTER-002` method | Assert student forbidden outcome and relevant persisted state/status | Unit |
| UT-MASTER-003 | FR-029–031 | See RTM | MASTER | Isolated input or seeded service | programme parent required | Run `UT-MASTER-003` method | Assert programme parent required outcome and relevant persisted state/status | Unit |
| UT-SEARCH-001 | FR-023–024 | UC-010 | SEARCH | Isolated input or seeded service | student scope | Run `UT-SEARCH-001` method | Assert student scope outcome and relevant persisted state/status | Unit |
| UT-SEARCH-002 | FR-023–024 | UC-010 | SEARCH | Isolated input or seeded service | combined filters | Run `UT-SEARCH-002` method | Assert combined filters outcome and relevant persisted state/status | Unit |
| UT-REPORT-001 | FR-025–028 | UC-011 | REPORT | Isolated input or seeded service | aggregate | Run `UT-REPORT-001` method | Assert aggregate outcome and relevant persisted state/status | Unit |
| UT-REPORT-002 | FR-025–028 | UC-011 | REPORT | Isolated input or seeded service | student forbidden | Run `UT-REPORT-002` method | Assert student forbidden outcome and relevant persisted state/status | Unit |
| UT-ADM-001 | FR-011–014 | See RTM | ADM | Isolated input or seeded service | history | Run `UT-ADM-001` method | Assert history outcome and relevant persisted state/status | Unit |
| UT-USER-001 | FR-032 | See RTM | USER | Isolated input or seeded service | role change | Run `UT-USER-001` method | Assert role change outcome and relevant persisted state/status | Unit |
| UT-USER-002 | FR-032 | See RTM | USER | Isolated input or seeded service | deactivate | Run `UT-USER-002` method | Assert deactivate outcome and relevant persisted state/status | Unit |
| IT-AUTH-001 | FR-001–005 | UC-001 | AUTH | Fresh seeded DB | login success | Run `IT-AUTH-001` method | Assert login success outcome and relevant persisted state/status | Integration |
| IT-AUTH-002 | FR-001–005 | UC-001 | AUTH | Fresh seeded DB | failure generic | Run `IT-AUTH-002` method | Assert failure generic outcome and relevant persisted state/status | Integration |
| IT-AUTH-003 | FR-001–005 | UC-001 | AUTH | Fresh seeded DB | inactive | Run `IT-AUTH-003` method | Assert inactive outcome and relevant persisted state/status | Integration |
| IT-AUTH-004 | FR-001–005 | UC-001 | AUTH | Fresh seeded DB | protected | Run `IT-AUTH-004` method | Assert protected outcome and relevant persisted state/status | Integration |
| IT-AUTH-005 | FR-001–005 | UC-001 | AUTH | Fresh seeded DB | logout | Run `IT-AUTH-005` method | Assert logout outcome and relevant persisted state/status | Integration |
| IT-PROFILE-001 | FR-006–007 | See RTM | PROFILE | Fresh seeded DB | update | Run `IT-PROFILE-001` method | Assert update outcome and relevant persisted state/status | Integration |
| IT-UC004-001 | FR-006–010 | UC-004 | UC004 | Fresh seeded DB | create persists | Run `IT-UC004-001` method | Assert create persists outcome and relevant persisted state/status | Integration |
| IT-UC004-002 | FR-006–010 | UC-004 | UC004 | Fresh seeded DB | invalid master | Run `IT-UC004-002` method | Assert invalid master outcome and relevant persisted state/status | Integration |
| IT-UC004-003 | FR-006–010 | UC-004 | UC004 | Fresh seeded DB | unauthorized | Run `IT-UC004-003` method | Assert unauthorized outcome and relevant persisted state/status | Integration |
| IT-UC004-004 | FR-006–010 | UC-004 | UC004 | Fresh seeded DB | ownership | Run `IT-UC004-004` method | Assert ownership outcome and relevant persisted state/status | Integration |
| IT-UC004-005 | FR-006–010 | UC-004 | UC004 | Fresh seeded DB | submit | Run `IT-UC004-005` method | Assert submit outcome and relevant persisted state/status | Integration |
| IT-UC004-006 | FR-006–010 | UC-004 | UC004 | Fresh seeded DB | verified edit new cycle | Run `IT-UC004-006` method | Assert verified edit new cycle outcome and relevant persisted state/status | Integration |
| IT-UC008-001 | FR-019–022 | UC-008 | UC008 | Fresh seeded DB | verify all rows | Run `IT-UC008-001` method | Assert verify all rows outcome and relevant persisted state/status | Integration |
| IT-UC008-002 | FR-019–022 | UC-008 | UC008 | Fresh seeded DB | correction | Run `IT-UC008-002` method | Assert correction outcome and relevant persisted state/status | Integration |
| IT-UC008-007 | FR-019–022 | UC-008 | UC008 | Fresh seeded DB | notification visible | Run `IT-UC008-007` method | Assert notification visible outcome and relevant persisted state/status | Integration |
| IT-UC008-003 | FR-019–022 | UC-008 | UC008 | Fresh seeded DB | duplicate | Run `IT-UC008-003` method | Assert duplicate outcome and relevant persisted state/status | Integration |
| IT-UC008-004 | FR-019–022 | UC-008 | UC008 | Fresh seeded DB | student forbidden | Run `IT-UC008-004` method | Assert student forbidden outcome and relevant persisted state/status | Integration |
| IT-UC008-005 | FR-019–022 | UC-008 | UC008 | Fresh seeded DB | missing reason | Run `IT-UC008-005` method | Assert missing reason outcome and relevant persisted state/status | Integration |
| IT-UC008-006 | FR-019–022 | UC-008 | UC008 | Fresh seeded DB | rollback | Run `IT-UC008-006` method | Assert rollback outcome and relevant persisted state/status | Integration |
| IT-UC006-001 | FR-015–018 | UC-006 | UC006 | Fresh seeded DB | progression history | Run `IT-UC006-001` method | Assert progression history outcome and relevant persisted state/status | Integration |
| IT-UC006-002 | FR-015–018 | UC-006 | UC006 | Fresh seeded DB | invalid | Run `IT-UC006-002` method | Assert invalid outcome and relevant persisted state/status | Integration |
| IT-UC006-003 | FR-015–018 | UC-006 | UC006 | Fresh seeded DB | missing record | Run `IT-UC006-003` method | Assert missing record outcome and relevant persisted state/status | Integration |
| IT-UC006-004 | FR-015–018 | UC-006 | UC006 | Fresh seeded DB | forbidden | Run `IT-UC006-004` method | Assert forbidden outcome and relevant persisted state/status | Integration |
| IT-UC006-005 | FR-015–018 | UC-006 | UC006 | Fresh seeded DB | rollback | Run `IT-UC006-005` method | Assert rollback outcome and relevant persisted state/status | Integration |
| IT-ADM-001 | FR-011–014 | See RTM | ADM | Fresh seeded DB | update and history | Run `IT-ADM-001` method | Assert update and history outcome and relevant persisted state/status | Integration |
| IT-SEARCH-001 | FR-023–024 | UC-010 | SEARCH | Fresh seeded DB | combined | Run `IT-SEARCH-001` method | Assert combined outcome and relevant persisted state/status | Integration |
| IT-SEARCH-002 | FR-023–024 | UC-010 | SEARCH | Fresh seeded DB | student scope | Run `IT-SEARCH-002` method | Assert student scope outcome and relevant persisted state/status | Integration |
| IT-REPORT-001 | FR-025–028 | UC-011 | REPORT | Fresh seeded DB | summary | Run `IT-REPORT-001` method | Assert summary outcome and relevant persisted state/status | Integration |
| IT-ADMIN-001 | FR-029–032 | UC-002/012–014 | ADMIN | Fresh seeded DB | role | Run `IT-ADMIN-001` method | Assert role outcome and relevant persisted state/status | Integration |
| IT-ADMIN-002 | FR-029–032 | UC-002/012–014 | ADMIN | Fresh seeded DB | deactivate | Run `IT-ADMIN-002` method | Assert deactivate outcome and relevant persisted state/status | Integration |
| IT-ADMIN-003 | FR-029–032 | UC-002/012–014 | ADMIN | Fresh seeded DB | country | Run `IT-ADMIN-003` method | Assert country outcome and relevant persisted state/status | Integration |
| IT-ADMIN-004 | FR-029–032 | UC-002/012–014 | ADMIN | Fresh seeded DB | institution | Run `IT-ADMIN-004` method | Assert institution outcome and relevant persisted state/status | Integration |
| IT-ADMIN-005 | FR-029–032 | UC-002/012–014 | ADMIN | Fresh seeded DB | programme | Run `IT-ADMIN-005` method | Assert programme outcome and relevant persisted state/status | Integration |
| IT-ADMIN-006 | FR-029–032 | UC-002/012–014 | ADMIN | Fresh seeded DB | forbidden | Run `IT-ADMIN-006` method | Assert forbidden outcome and relevant persisted state/status | Integration |
| IT-ADMIN-007 | FR-029–032 | UC-002/012–014 | ADMIN | Fresh seeded DB | audit | Run `IT-ADMIN-007` method | Assert audit outcome and relevant persisted state/status | Integration |
| IT-ADMIN-008 | FR-029–032 | UC-002/012–014 | ADMIN | Fresh seeded DB | master deactivation | Run `IT-ADMIN-008` method | Assert master deactivation outcome and relevant persisted state/status | Integration |

## Detailed acceptance and rollback cases

| Test ID | Requirement ID | Use Case | Component | Preconditions | Input | Steps | Expected Result | Test Type |
|---|---|---|---|---|---|---|---|---|
| IT-UC004-001 | FR-007–011 | UC-004 | Record Manager | Aarav authenticated; active references exist | institution 1, programme 1, country 2, Applied | POST `/records`; query SQLite by returned ID | 201, Draft, owner 1 and references persisted | Integration |
| UT-REC-009 | FR-008–010 | UC-004 | Master validation | Seeded service | institution_id 1.5 | Call create_record | 422 validation error; no record created | Unit |
| IT-UC004-002 | FR-008–010, BR-007 | UC-004 | Master validation | Aarav authenticated | programme 4 with institution 1 | POST `/records` | 422; no record created | Integration |
| IT-UC008-001 | FR-020, NFR-007 | UC-008 | Verification Manager | Record 2 Submitted; coordinator authenticated | decision Verified | POST decision; query detail, audit, notifications | 200; Verified; reviewer/date/decision row, audit row, notification row | Integration |
| IT-UC008-002 | FR-021–022 | UC-009 | Verification Manager | Record 2 Submitted | decision Correction Required; reason Confirm date | POST decision; student GET detail | 200; reason persisted and visible to owner | Integration |
| IT-UC008-006 | NFR-012 | UC-008 | Repository transaction | Record 2 Submitted; notification insert trigger fails | decision Verified | POST decision; query record and verification table | 500; record remains Submitted; no Verification row | Integration |
| IT-UC006-001 | FR-015–018 | UC-006 | Progression Tracker | Record 2 Ongoing | Completed, 2026-10-27, Graduated | POST update; GET history | 200; current Completed; prior and new entries retained | Integration |
| IT-UC006-005 | NFR-012, BR-008 | UC-006 | Repository transaction | Record 1 Not Started; progress insert trigger fails | Ongoing, 2026-10-27 | POST update; query current state | 500; current remains Not Started; no new history | Integration |
| IT-SEARCH-001 | FR-023–024 | UC-010 | Search & Reporting | Four seeded records | institution 2 and Submitted | GET filtered `/records` | Only record 2 returned | Integration |
| IT-ADMIN-008 | FR-030, BR-007 | UC-013/004 | Master Data Manager | Programme 1 active | Admin deactivates; student creates with programme 1 | PATCH then POST | Deactivation succeeds; new record rejected 422 | Integration |
