# Final verification report

## Implementation summary

The prototype provides local authentication and role-based access; Student/Alumni profile, record creation/editing, submission and history; coordinator verification/correction, admission and progression updates, queue, search and reports; administrator user, role and master-data management with audit viewing. The three detailed PDF use cases UC-004, UC-008 and UC-006 are implemented through service methods and real SQLite transactions. Deterministic seed data covers all four verification states.

## Architecture summary

The browser UI calls a Python JSON API. Application services enforce business rules and call a SQLite repository; `domain.py` centralizes status validation and transitions. A local single-process stack keeps the laboratory prototype reproducible while retaining the PDF's layered client-server dependency direction. The original conceptual domain classes map to normalized tables/read models and service responsibilities as described in `architecture.md`.

## Requirement coverage

**32 of 32 PDF functional requirements have prototype implementations.** The matrix in `requirements-traceability-matrix.md` names each FR, story/use case, component, module, API and actual test IDs. FR-013 is implemented as an admission-evidence reference field; there is no binary attachment feature. The PDF's initial-scope mention of student registration is not a separately numbered FR; in this prototype administrators create local accounts. No FR is marked incomplete, while the production-oriented NFRs for scale, availability, browser compatibility and response-time targets have not been quantitatively validated.

## UML deliverables

Editable source files in `diagrams/`:

- Class and use-case diagrams: `class.puml`, `use-cases.puml`.
- Eight activity diagrams: login, add record, submit record, verify record, request correction, update progression, search/filter, user management.
- Seven sequence diagrams: login, add record, submit record, verify record, request correction, update progression, search/filter.
- Two state diagrams: `record-state.puml`, `progression-state.puml`.
- Component, deployment and package diagrams: `component.puml`, `deployment.puml`, `package.puml`.
- ER diagram: `er.mmd`.

The source diagrams were reviewed against code and API routes. A PlantUML/Mermaid renderer was not installed in this environment, so rendered diagram images were not generated.

## Testing summary

The actual final runner output was `Ran 85 tests in 46.836s` and `OK`: **49 unit tests, 36 integration tests, 85 passing, 0 failing**. The integration suite sends HTTP requests through authentication, authorization, API, service and repository into a real temporary SQLite database. Trigger-injected failures prove rollback for verification and progression. The final checks `python3 -m py_compile src/hsts/*.py`, `node --check src/web/app.js` and `git diff --check` passed. A seeded local server returned HTTP 200 for `/` and served `/app.js` successfully. Browser automation was unavailable in this environment; visual browser QA remains a manual demo check.

## Requirement traceability

The matrix contains 32 FR rows and all 41 explicit test-ID references checked against test methods exist. All major PDF use cases map to implementation components; the strongest automated chains cover UC-004, UC-008 and UC-006. The older Markdown SRS has conflicting FR numbering; the PDF is the controlling source.

## Known limitations

- Local password accounts replace institutional identity provider integration. Demo passwords are development-only.
- Notifications are durable in-app rows, with no email delivery.
- Admission evidence is a reference string, not a binary upload.
- SQLite and the bundled HTTP server target a local prototype, not production concurrency, availability or institutional load.
- No automated browser UI suite or rendered UML output was produced; the HTTP API and source diagram consistency were checked.
- No numeric performance, availability or browser matrix claim is made because the PDF does not define thresholds and such testing was outside this local validation.

## How to demo

1. Run the seed and server commands in the README; log in as Aarav (Student/Alumni).
2. Add a Draft higher-study record with valid institution, programme and country; submit it.
3. Log out and log in as the coordinator; open Verification Queue and inspect the Submitted record.
4. Verify it, or request a correction with a reason on another submitted record; inspect the resulting history and student notification.
5. Update progression with a date, inspect earlier history, then use combined record filters and reports.
6. Log out and log in as the administrator; create/change a user, activate/deactivate an account, maintain country/institution/programme data, and inspect audit entries.
