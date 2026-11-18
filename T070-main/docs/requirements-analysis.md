# Requirements analysis and implementation plan

Source of truth: `T070.pdf` (55 pages, Assignments 1–7). The earlier Markdown SRS is supporting material. The PDF defines a centralized web system for students/alumni to maintain higher-study records, coordinators to verify and track them, and administrators to manage access and master data. Institutions and management/faculty are stakeholders, not direct authenticated actors in this release.

The earlier `docs/requirements/SRS-v1.0.md` is not fully consistent with the PDF: its FR numbering begins with Student Registration while the PDF's FR-001 is User Login, and it uses other differing lifecycle terms. The PDF controls this implementation and traceability matrix. Existing files are preserved for provenance.

## Existing requirements and artifacts

- **Actors:** Student/Alumni, Higher Studies Coordinator, Administrator. Institution/University is external reference data.
- **Functional requirements:** FR-001–005 authentication/access; 006–010 profile and institution/programme/country; 011–014 admission and history/evidence; 015–018 progression; 019–022 verification; 023–028 search/reports/dashboard; 029–032 administration.
- **Rules:** BR-001 authentication; 002 RBAC; 003 ownership; 004 coordinator decisions on submitted records; 005 new cycle after verified edit; 006 controlled admission values; 007 valid references; 008 dated progression; 009 report access; 010 inactive login refusal.
- **Quality:** NFR-001–003 performance/concurrency, 004–007 security/audit, 008–010 usability, 011–012 durability/atomicity, 013 availability, 014–016 maintainability, 017 scale, 018 browser compatibility, 019–020 privacy, 021 change provenance.
- **Data:** User/Student, HigherStudyRecord, Institution, Programme, Country, AdmissionUpdate, ProgressUpdate, Verification, AuditRecord; later class design also has Report and Notification.
- **Use cases:** UC-001 Login; 002 Manage Users; 003 Maintain Higher-Study Profile; 004 Add Higher-Study Record; 005 Update Admission Status; 006 Update Progression; 007 Submit Record for Verification; 008 Verify Higher-Study Record; 009 Request Correction; 010 Search Higher-Study Records; 011 View Reports; 012 Manage Institution Data; 013 Manage Programme Data; 014 Manage Country Data.
- **Stories:** US-001–014 cover login, profile, add details, admission, submit, verify, correct, progression, search, roles, master data, reporting, history and account deactivation. The PDF gives explicit AC-01–03 for US-003, US-006 and US-008.
- **Existing traceability:** PDF section 22 maps 13 selected FRs to story/use case and leaves tests `TBD`. Section 42 maps UC-004/008/006 to classes/components/interfaces.
- **Existing UML/design:** context, use-case, three activity, analysis/design class and object diagrams; relationship table; three collaboration diagrams; record and progression state diagrams; component and refined component diagrams; layered client-server architecture; three UI wireframes; seven service interface contracts. Several diagrams are embedded images, while explanatory text is extractable.

## Implementation plan

1. **Stack:** Python 3 standard-library HTTP server, SQLite, HTML/CSS/vanilla JavaScript, `unittest`. No install or external service needed; the repository has no application stack or dependencies.
2. **Architecture:** browser → JSON API/controller → application services/domain transition rules → repository → SQLite. Authentication, authorization, audit and notifications are shared services.
3. **Entities:** users, higher_study_records, institutions, programmes, countries, admission_updates, progress_updates, verifications, audit_records, notifications. Report is a generated read model, not a stored table.
4. **Modules:** auth/access, record manager, verification manager, progression tracker, master data manager, search/reporting, user management, repository and UI.
5. **Editable diagrams:** class, use-case, eight activities, seven sequences, two states, component, deployment, package and ER, all under `docs/diagrams/`.
6. **Tests:** isolated domain/service tests plus HTTP-to-real-SQLite integration tests; transaction rollback injection for verification/progression.
7. **Phases:** schema/foundation → API/business workflows → UI → tests → documentation/diagrams → run and verify.

## Assumptions and ambiguities

- The PDF does not define exact admission values. Use `Applied`, `Offer Received`, `Admitted`, `Rejected`, `Deferred` as the system-controlled list.
- The PDF permits a draft with unavailable references *or* an addition-request process. This prototype requires valid active references even for Draft, consistent with BR-007; students contact an administrator for missing master data. No unsupported request workflow is invented.
- A verified record edited by its student starts a new Draft cycle before resubmission. Previous Verification rows remain. Submitted records are locked to students until a coordinator decides.
- Progression starts `Not Started`; allowed movement is `Not Started → Ongoing/Discontinued`, `Ongoing → Completed/Discontinued`, with no transition out of a terminal state. The PDF names states but leaves edges unspecified.
- Admission evidence is stored as an optional reference text/URL, as FR-013 says “attach or reference ... where ... supports documents”; binary upload is outside this prototype.
- Local password accounts stand in for institutional credentials; no institutional identity provider is connected. Notifications are durable in-app rows, not external email.
- The PDF has a typo `Reprt` in its class table; implementation retains its intended `Report` name. `Under Verification` appears in a state diagram description, but no action or rule uses it; a record remains Submitted while in the review queue.

## Initial traceability map

Detailed per-FR mapping with actual test IDs is maintained in `requirements-traceability-matrix.md`. The core chain is:

| Requirement | Use case | Story | Component | Domain class | API | Test |
|---|---|---|---|---|---|---|
| FR-001–005 | UC-001/002 | US-001/010/014 | Authentication & Access Control, User Management | User, Administrator | `/api/auth/*`, `/api/users/*` | `UT-AUTH-*`, `IT-AUTH-*`, `IT-ADMIN-*` |
| FR-006–010 | UC-003/004 | US-002/003 | Higher-Study Record Manager | StudentAlumnus, HigherStudyRecord, Institution, Programme, Country | `/api/records` | `UT-REC-*`, `IT-UC004-*` |
| FR-011–014 | UC-005 | US-004 | Higher-Study Record Manager | AdmissionUpdate | `/api/records/{id}/admission` | `UT-ADM-*`, `IT-ADM-*` |
| FR-015–018 | UC-006 | US-008/013 | Progression Tracker | ProgressUpdate, HigherStudyRecord | `/api/records/{id}/progression` | `UT-PROG-*`, `IT-UC006-*` |
| FR-019–022 | UC-007/008/009 | US-005/006/007 | Verification Manager | Verification, Notification, AuditRecord | `/api/records/{id}/submit`, `/api/records/{id}/verification` | `UT-VER-*`, `IT-UC008-*` |
| FR-023–028 | UC-010/011 | US-009/012 | Search & Reporting | Report, HigherStudyRecord | `/api/records`, `/api/reports` | `UT-SEARCH-*`, `IT-SEARCH-*` |
| FR-029–032 | UC-002/012/013/014 | US-010/011/014 | Master Data Manager, User Management | Administrator, Institution, Programme, Country | `/api/master/*`, `/api/users/*` | `UT-MASTER-*`, `IT-ADMIN-*` |
