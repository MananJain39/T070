# Testing strategy

**Unit testing:** `tests/test_unit.py` checks lifecycle edges, validation, password hashing, RBAC/ownership and service-level workflows. It uses isolated temporary SQLite data for service behavior; pure domain tests have no database.

**Integration testing:** `tests/test_integration.py` starts the actual HTTP server on an ephemeral loopback port, seeds a fresh temporary SQLite database for every test, and sends JSON HTTP requests. No database mock is used. Database triggers inject failures during verification and progression to prove transaction rollback.

**System/end-to-end testing:** Start and seed a local instance, then follow `docs/demo.md` through Student, Coordinator and Administrator flows in a browser. UI JavaScript syntax is checked with `node --check`; HTTP integration tests cover the same API the UI uses. Automated browser interaction is not part of this prototype suite.

**Acceptance testing:** US-003 AC-01–03 map to IT-UC004-001/002 and record retrieval; US-006 AC-01–03 map to IT-UC008-001/002/004; US-008 AC-01–03 map to IT-UC006-001/002/005. A viva reviewer can repeat these scenarios using the demo script.

Run `PYTHONPATH=src python3 -m unittest discover -s tests -v`. HTTP tests require permission to bind loopback sockets. A failed test must be investigated; no test is skipped to produce a green count.
