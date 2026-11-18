# Software Requirements Specification (SRS) v1.0

## Higher Studies Tracking System

---

**Course:** CS314 — Software Development Laboratory
**Institute:** The LNM Institute of Information Technology, Jaipur
**Faculty:** Dr. Saurabh Kumar
**Team:** T070

**Prepared by Team T070**

LAXITA BHIMSARIA (24UCS144, Project/Requirement Lead) ·
VAIBHAV GOYAL (24UCS145, Design/Architecture Lead)
MANAN JAIN (24UCS146, Development Lead) ·
HARSH VARSHNEY (24UCS148, Testing & Documentation Lead)

---

## Table of Contents

1. [Document Control](#document-control)
2. [Introduction](#introduction)
3. [User Classes](#user-classes)
4. [System Context](#system-context)
5. [Functional Requirements](#functional-requirements)
6. [Business Rules](#business-rules)
7. [Non-Functional Requirements](#non-functional-requirements)
8. [Data Requirements](#data-requirements)
9. [Major Use Cases](#major-use-cases)
10. [Detailed Use Cases](#detailed-use-cases)
11. [User Stories](#user-stories)
12. [Acceptance Criteria](#acceptance-criteria)
13. [Requirements Prioritisation (MoSCoW)](#requirements-prioritisation-moscow)
14. [Requirements Traceability (RTM)](#requirements-traceability-rtm)
15. [Requirements Validation](#requirements-validation)
16. [AI Usage Declaration](#ai-usage-declaration)

---

## Document Control

| Version | Description | Date | Author |
|---|---|---|---|
| 1.0 | Initial baseline SRS for the Higher Studies Tracking System, derived from Assignment 1 (Project Identification, 31 Aug 2026). | 2026-08-31 | Team T070 |

---

## 1. Introduction

### 1.1 Purpose

This Software Requirements Specification (SRS) defines the functional and non-functional requirements of the **Higher Studies Tracking System** (HSTS), a web-based application developed by Team T070 as part of CS314 (Software Development Laboratory) at LNMIIT Jaipur. It is the baseline document that will drive subsequent UML analysis, design, implementation and testing activities.

### 1.2 Product Scope

HSTS centralises the recording, verification and tracking of higher-study information for graduating students and alumni of the institute. It supports role-based workflows for students/alumni, higher studies coordinators, administrators and authorised faculty, and provides basic search, filtering and reporting facilities. Out-of-scope items (such as university application submission, fee processing, visa processing and alumni networking) are explicitly listed in the Assignment 1 brief and are excluded from this release.

### 1.3 Definitions, Acronyms, Abbreviations

- **SRS** — Software Requirements Specification.
- **FR / BR / NFR** — Functional Requirement / Business Rule / Non-Functional Requirement.
- **UC / US / AC** — Use Case / User Story / Acceptance Criterion.
- **RTM** — Requirements Traceability Matrix.
- **MoSCoW** — Must have / Should have / Could have / Won't have.
- **HSTS** — Higher Studies Tracking System.

### 1.4 References

1. CS314 Lab Assignment 1 — Project Identification and Initial Project Definition (Team T070, 31 Aug 2026).
2. CS314 Lab Assignment 2 — Requirements Specification brief.
3. IEEE Std 830-1998 — Recommended Practice for Software Requirements Specifications.
4. CS314 Project Guidelines for Students (course handbook).

### 1.5 Document Overview

Section 3 lists user classes and the system context. Sections 5–8 define the functional, business-rule, non-functional and data requirements. Sections 9–11 document the use cases, user stories and acceptance criteria. Sections 13–15 cover MoSCoW prioritisation, traceability and a self-administered validation review.

---

## 2. User Classes

The user classes below are derived from the stakeholder analysis in Assignment 1, Section 6. Each class is briefly described together with its main interactions with HSTS.

### UC-2.1 Student / Alumni

The primary data contributor. Creates, maintains and views their own higher-study record; updates admission status; receives notifications related to their own records.

### UC-2.2 Higher Studies Coordinator

The verifier and day-to-day operator. Searches and filters records; verifies or rejects student-submitted records (with reasons); records progression updates; generates status, institution and programme reports.

### UC-2.3 Administrator

Manages user accounts and role assignments; monitors audit logs; configures system-level reference data (institutions, programmes, countries); accesses administrative reports.

### UC-2.4 Institute Management / Authorised Faculty

Read-only consumer of aggregated reports and dashboards for academic planning and outcome reporting.

---

## 3. System Context

The system context diagram below shows HSTS as a single bounded system interacting with its four primary user classes and one external service (the e-mail/notification service used for outbound messages).

![System Context Diagram for HSTS](diagrams/System-Context.png)

**Notes:**

- All four user classes authenticate before interacting with HSTS.
- The e-mail/notification service is an external dependency used for outbound messages only; HSTS does not depend on it for core database operations.
- Students/Alumni do not have direct access to other students' records.

---

## 4. Functional Requirements

All functional requirements are written in the form *“The system shall…”*. Each FR has a unique identifier (FR-NNN), a short title, the full requirement text, and (where relevant) a reference to a related business rule in Section 5.

### 4.1 Authentication and Account Management

| ID | Title | Requirement |
|---|---|---|
| FR-001 | User Registration | The system shall allow a Student/Alumni to register an account using a valid institutional e-mail address and a self-chosen password. |
| FR-002 | User Login | The system shall allow a registered user to authenticate using valid credentials. |
| FR-003 | Authentication Failure Notification | The system shall notify the user when authentication fails without revealing which of the credentials was incorrect. |
| FR-004 | Logout | The system shall allow an authenticated user to terminate their session. |
| FR-005 | Role Assignment | The system shall allow an Administrator to assign one or more roles to a user account. |
| FR-006 | Role-Based Access Control | The system shall restrict access to functions according to the role(s) assigned to the authenticated user. |

### 4.2 Higher-Study Profile Management

| ID | Title | Requirement |
|---|---|---|
| FR-007 | Create Higher-Study Record | The system shall allow an authenticated Student/Alumni to create a higher-study record capturing institution, programme, country, applied intake year and any additional declared information. |
| FR-008 | Edit Higher-Study Record | The system shall allow an authenticated Student/Alumni to edit their own record while it is in *Draft* or *Rejected* status. |
| FR-009 | View Higher-Study Record | The system shall allow a Student/Alumni to view all of their own higher-study records together with current status and history. |
| FR-010 | Manage Institution Records | The system shall allow an Administrator to maintain the list of institutions that can be referenced in higher-study records. |
| FR-011 | Manage Programme Records | The system shall allow an Administrator to maintain the list of programmes (degree, field of study) that can be referenced in higher-study records. |
| FR-012 | Manage Country Records | The system shall allow an Administrator to maintain the list of countries that can be referenced in higher-study records. |
| FR-013 | Multiple Applications | The system shall allow a Student/Alumni to maintain more than one higher-study record concurrently (e.g. multiple applications). |
| FR-014 | Deactivate Record | The system shall allow an authorised user to deactivate a record in place of permanent deletion (see BR-006). |

### 4.3 Admission and Progression Status

| ID | Title | Requirement |
|---|---|---|
| FR-015 | Set Admission Status | The system shall allow a Student/Alumni to set the admission status of their record to *Applied* when first creating it, and to subsequently update it through the lifecycle defined in BR-002. |
| FR-016 | Status Transition Validation | The system shall reject any status change that does not conform to the allowed lifecycle in BR-002 and shall display an explanatory message. |
| FR-017 | Record Progression Updates | The system shall allow an authorised Coordinator to record progression updates (e.g. coursework completed, thesis submitted) against an enrolled record. |
| FR-018 | View Status History | The system shall display the complete chronological status and progression history for each higher-study record, including the user responsible for each change and the timestamp. |
| FR-019 | Final Outcome Capture | The system shall allow an authorised Coordinator to record the final outcome of a record as *Completed* or *Withdrawn*. |

### 4.4 Verification Workflow

| ID | Title | Requirement |
|---|---|---|
| FR-020 | Verify Record | The system shall allow an authorised Higher Studies Coordinator to mark a submitted record as *Verified*. |
| FR-021 | Reject Verification with Reason | The system shall allow an authorised Higher Studies Coordinator to reject a submitted record, requiring a textual reason. |
| FR-022 | Add Verification Comment | The system shall allow a Coordinator to attach free-text comments to a verification decision. |
| FR-023 | View Verification History | The system shall display the complete verification history (verifier, decision, reason, comments, timestamp) for each record. |

### 4.5 Search, Filter and Listing

| ID | Title | Requirement |
|---|---|---|
| FR-024 | List Records | The system shall allow a Coordinator or Administrator to list higher-study records with pagination. |
| FR-025 | Free-Text Search | The system shall allow a Coordinator or Administrator to search records by student name, roll number or institution. |
| FR-026 | Filter by Institution | The system shall allow records to be filtered by institution. |
| FR-027 | Filter by Country | The system shall allow records to be filtered by country. |
| FR-028 | Filter by Status | The system shall allow records to be filtered by admission or verification status. |

### 4.6 Reports and Dashboard

| ID | Title | Requirement |
|---|---|---|
| FR-029 | Status Distribution Report | The system shall generate a report showing the distribution of records across admission statuses. |
| FR-030 | Institution-Wise Report | The system shall generate a report aggregating record counts by institution. |
| FR-031 | Country-Wise Report | The system shall generate a report aggregating record counts by country. |
| FR-032 | Programme-Wise Report | The system shall generate a report aggregating record counts by programme. |
| FR-033 | Administrative Dashboard | The system shall provide an Administrative dashboard summarising key counts (total records, pending verifications, recent verifications). |

---

## 5. Business Rules

| ID | Title | Rule |
|---|---|---|
| BR-001 | Self-Service Records | A Student/Alumni may create, edit and submit only their own higher-study records. |
| BR-002 | Admission Status Lifecycle | Admission status shall follow the lifecycle *Applied → (Accepted \| Rejected) → Enrolled → (Completed \| Withdrawn)*. Transitions outside this lifecycle are rejected by the system. |
| BR-003 | Coordinator Verification Authority | Only a user holding the *Higher Studies Coordinator* role may verify or reject a record. |
| BR-004 | Edit Lock After Verification | Once a record has been verified, only a Coordinator may edit it; a Student/Alumni may no longer modify it directly. |
| BR-005 | Rejection Reason Mandatory | A verification rejection shall not be saved without a textual reason. |
| BR-006 | No Hard Delete (Soft Deactivation) | Higher-study records shall not be permanently deleted; deactivation shall preserve the full historical record for auditing. |
| BR-007 | Multiple Concurrent Applications | A Student/Alumni may hold more than one active record simultaneously, reflecting multiple parallel applications. |
| BR-008 | Audit Attribution | Every status change, verification decision and edit to a record shall be attributed to a user and timestamped in the status history. |
| BR-009 | Self-Access Only for Students | A Student/Alumni may view only their own records; viewing other students' records is denied. |
| BR-010 | Reports Use Verified Data First | Aggregate reports shall be computed over verified records by default; unverified records shall be reported separately when included. |

---

## 6. Non-Functional Requirements

### 6.1 Performance

- **NFR-001** The system shall return responses to typical user operations (page loads, form submissions, record lookups) within 2 seconds under expected concurrent load.
- **NFR-002** Free-text search across higher-study records (FR-025) shall return results within 3 seconds for the expected data volume.
- **NFR-003** The system shall support at least 50 concurrent authenticated users without degradation beyond the targets in NFR-001 and NFR-002.

### 6.2 Security

- **NFR-004** Passwords shall be stored using a strong adaptive cryptographic hash (e.g. bcrypt/Argon2) and shall never be logged or transmitted in clear text.
- **NFR-005** All access to protected resources shall require a successful authentication.
- **NFR-006** Role-based authorisation shall be enforced at every API endpoint in addition to any UI-level checks.
- **NFR-007** The system shall protect against common web vulnerabilities including SQL injection, XSS and CSRF.

### 6.3 Usability

- **NFR-008** The interface shall provide consistent navigation across all major user-facing pages.
- **NFR-009** Form validation errors shall be presented in human-readable language next to the offending field.
- **NFR-010** The most common task for each user role shall be reachable within two navigation steps from the dashboard.

### 6.4 Reliability

- **NFR-011** Status and verification data shall be persisted within an atomic transaction; partial failures shall not leave a record in an inconsistent state.
- **NFR-012** Database backups shall be performed daily and a documented restore procedure shall be available.

### 6.5 Availability

- **NFR-013** The system shall target 99% availability during normal institute operating hours, excluding scheduled maintenance windows communicated in advance.

### 6.6 Maintainability

- **NFR-014** The application shall be organised into clearly separated modules (presentation, application logic, data access) to enable independent modification.
- **NFR-015** Source code shall be maintained in a Git repository with meaningful, atomic commits.
- **NFR-016** Technical and user documentation shall be updated in the same commit that changes the corresponding behaviour.

### 6.7 Scalability

- **NFR-017** The application tier shall be horizontally scalable through stateless request handling.
- **NFR-018** Database schema shall include indexes on the most common search and filter columns (institution, country, status, student identifier).

### 6.8 Privacy

- **NFR-019** Personal information of students shall be accessible only to authorised users and shall not be exposed in public reports.
- **NFR-020** Personally identifying fields shall be masked in administrative listings shown to users without view-on-record permission.

### 6.9 Compatibility

- **NFR-021** The system shall operate correctly on the current major versions of Chrome, Firefox, Edge and Safari.

### 6.10 Auditability

- **NFR-022** Significant actions (status changes, verification decisions, user/role management, deactivation) shall be written to an append-only audit log including user, timestamp, action and target record.
- **NFR-023** Audit log entries shall be retained for a minimum of one academic year and shall be viewable by Administrators.

---

## 7. Data Requirements

The following logical entities are required to support the functional requirements in Section 4 and the business rules in Section 5. Attribute lists are non-exhaustive and represent the most important fields.

| Entity | Key Attributes | Notes |
|---|---|---|
| User | user_id, name, email, password_hash, status, created_at | Identity record for every system actor. |
| Role | role_id, name, description | Reference data; supports the RBAC model in FR-006. |
| UserRole | user_id, role_id | Join entity linking users to their assigned roles. |
| Student | student_id, roll_no, name, programme_of_study, batch_year | Derived from institute records; subject to BR-009 access rules. |
| Institution | institution_id, name, country, type | Reference data maintained by Administrators. |
| Programme | programme_id, name, level (UG/PG/PhD), field_of_study | Reference data maintained by Administrators. |
| Country | country_id, name, code | Reference data maintained by Administrators. |
| HigherStudyRecord | record_id, student_id, institution_id, programme_id, country_id, intake_year, admission_status, verification_status, is_active, created_at, updated_at | Central entity; subject to BR-002, BR-004, BR-006. |
| AdmissionStatusHistory | history_id, record_id, from_status, to_status, changed_by, changed_at, reason | Implements BR-008; supports FR-018. |
| VerificationRecord | verification_id, record_id, decision, reason, comments, verified_by, verified_at | Implements FR-020–FR-023 and BR-005. |
| AuditLog | log_id, user_id, action, target_type, target_id, timestamp, details | Implements NFR-022 / NFR-023; append-only. |

---

## 8. Major Use Cases

| ID | Use Case | Primary Actor |
|---|---|---|
| UC-001 | Register User Account | Student / Alumni |
| UC-002 | Log In | All Users |
| UC-003 | Manage User Accounts and Roles | Administrator |
| UC-004 | Create Higher-Study Record | Student / Alumni |
| UC-005 | Edit Higher-Study Record | Student / Alumni |
| UC-006 | Update Admission Status | Student / Alumni |
| UC-007 | Verify Higher-Study Record | Higher Studies Coordinator |
| UC-008 | Reject Higher-Study Record | Higher Studies Coordinator |
| UC-009 | View Status and Verification History | Student / Alumni |
| UC-010 | Search Higher-Study Records | Higher Studies Coordinator |
| UC-011 | Filter Higher-Study Records | Higher Studies Coordinator |
| UC-012 | Generate Status Distribution Report | Higher Studies Coordinator |
| UC-013 | Generate Institution / Country / Programme Reports | Higher Studies Coordinator |
| UC-014 | View Administrative Dashboard | Administrator |
| UC-015 | View Audit Log | Administrator |

---

## 9. Detailed Use Cases

Three use cases considered most critical are elaborated below.

### 9.1 UC-004 — Create Higher-Study Record

| Field | Value |
|---|---|
| **Primary Actor** | Student / Alumni |
| **Goal** | Capture a new higher-study application in the system. |
| **Preconditions** | • The user is authenticated (FR-002).<br>• The student profile is linked to the authenticated user.<br>• The targeted institution, programme and country exist as reference data (FR-010–FR-012). |
| **Main Flow** | 1. Student selects *Add Higher-Study Record*.<br>2. System presents an empty form with institution, programme, country, intake year and notes fields.<br>3. Student enters the data and submits the form.<br>4. System validates the inputs against reference data and mandatory-field rules.<br>5. System persists the record with admission status *Applied* (BR-002) and verification status *Pending*.<br>6. System confirms successful creation and displays the new record in the student's profile. |
| **Alternative / Exception Flows** | • *Invalid input*: system highlights offending fields with human-readable messages (NFR-009) and returns to step 3.<br>• *Reference data missing*: system prevents submission and advises the user to contact the Administrator.<br>• *Authentication lost*: system redirects to login (FR-002). |
| **Postconditions** | A new higher-study record exists with status *Applied* and is visible to the student and to Coordinators in pending lists. |

### 9.2 UC-007 — Verify Higher-Study Record

| Field | Value |
|---|---|
| **Primary Actor** | Higher Studies Coordinator |
| **Goal** | Officially validate a submitted higher-study record. |
| **Preconditions** | • The Coordinator is authenticated.<br>• At least one record exists in *Pending* verification status. |
| **Main Flow** | 1. Coordinator opens the list of pending records (UC-010).<br>2. Coordinator selects a record to review.<br>3. System displays the record details, status history and student profile.<br>4. Coordinator chooses *Verify*.<br>5. System records the verification decision with the Coordinator as verifier and the current timestamp (BR-008, FR-022).<br>6. System updates the record's verification status to *Verified* and confirms the action. |
| **Alternative / Exception Flows** | • *Reject*: Coordinator chooses *Reject*; system requires a textual reason (BR-005), records the rejection (FR-021) and returns the record to the student for correction.<br>• *Add comment*: Coordinator optionally attaches a comment (FR-022) to either decision.<br>• *Race condition*: if the record was modified by another user after retrieval, system refreshes the view and warns the Coordinator before allowing the decision to be saved. |
| **Postconditions** | The record carries a permanent verification decision and is included in reports (BR-010). |

### 9.3 UC-012 — Generate Status Distribution Report

| Field | Value |
|---|---|
| **Primary Actor** | Higher Studies Coordinator |
| **Goal** | Obtain an aggregated view of how records are distributed across admission statuses. |
| **Preconditions** | • The Coordinator is authenticated.<br>• Sufficient data exists in the system to compute a meaningful distribution. |
| **Main Flow** | 1. Coordinator selects *Reports → Status Distribution*.<br>2. System offers filters for intake year, programme and country.<br>3. Coordinator applies desired filters and confirms.<br>4. System aggregates the matching records by admission status (FR-029), counting verified and unverified records separately (BR-010).<br>5. System displays a table and a simple bar visualisation of the counts, with a timestamp and the applied filters.<br>6. Coordinator optionally exports the report. |
| **Alternative / Exception Flows** | • *No matching records*: system displays an empty-state message rather than failing.<br>• *Filter conflict*: if a combination yields zero results, system suggests relaxing filters. |
| **Postconditions** | The Coordinator has a status-distribution view corresponding to the chosen filters; the report is not stored as a separate record unless explicitly exported. |

---

## 10. User Stories

| ID | Story |
|---|---|
| US-001 | As a Student/Alumni, I want to register an account with my institute e-mail so that I can use the Higher Studies Tracking System. |
| US-002 | As a Student/Alumni, I want to log in securely so that I can access my own higher-study records. |
| US-003 | As a Student/Alumni, I want to create a higher-study record with my institution, programme and country so that my application is tracked centrally. |
| US-004 | As a Student/Alumni, I want to update my admission status as it changes so that my information remains accurate. |
| US-005 | As a Student/Alumni, I want to view the status and verification history of my records so that I know where each application stands. |
| US-006 | As a Higher Studies Coordinator, I want to verify a submitted record so that it becomes an official entry in the system. |
| US-007 | As a Higher Studies Coordinator, I want to reject a record with a reason so that the student can correct it. |
| US-008 | As a Higher Studies Coordinator, I want to search records by name, roll number or institution so that I can find specific applications quickly. |
| US-009 | As a Higher Studies Coordinator, I want to filter pending records so that I can process verifications efficiently. |
| US-010 | As a Higher Studies Coordinator, I want to generate a status distribution report so that I can summarise outcomes for the institute. |
| US-011 | As an Administrator, I want to manage user accounts and roles so that access to the system is controlled. |
| US-012 | As an Administrator, I want to maintain reference data (institutions, programmes, countries) so that records reference consistent values. |
| US-013 | As an Administrator, I want to view an audit log so that I can investigate changes to records and user accounts. |
| US-014 | As Institute Management, I want to view an aggregated dashboard so that I can understand higher-study outcomes for planning. |

---

## 11. Acceptance Criteria

Acceptance criteria are provided for three of the highest-priority user stories. Each criterion is a single, testable, observable condition.

### US-003 — Create Higher-Study Record

- **AC-01** The user must be authenticated (FR-002) before the *Add Higher-Study Record* option is offered.
- **AC-02** All mandatory fields (institution, programme, country, intake year) must be supplied; the system must display a clear, field-level error otherwise (NFR-009).
- **AC-03** The selected institution, programme and country must exist in the reference data maintained by the Administrator (FR-010–FR-012).
- **AC-04** On successful creation, the new record must appear in the student's profile with admission status *Applied* (BR-002) and verification status *Pending*.
- **AC-05** The new record must be visible in the Coordinator's pending-verification list (UC-007) within the same session.

### US-006 — Verify Higher-Study Record

- **AC-06** Only a user holding the Higher Studies Coordinator role may see the *Verify* and *Reject* actions (FR-006, BR-003).
- **AC-07** Selecting *Verify* must mark the record as *Verified* and must record the verifying Coordinator and a timestamp (BR-008, FR-022).
- **AC-08** Selecting *Reject* must require a textual reason before saving (BR-005, FR-021).
- **AC-09** Once verified, the Student/Alumni must no longer be able to edit the record directly (BR-004).
- **AC-10** The verification decision must appear in the record's verification history (FR-023).

### US-010 — Generate Status Distribution Report

- **AC-11** The report must aggregate counts of records grouped by admission status (FR-029) and must clearly separate verified from unverified records (BR-010).
- **AC-12** The Coordinator must be able to filter the report by intake year, programme and country and the report must reflect the chosen filters.
- **AC-13** If no records match the filters, the system must display an empty-state message rather than an error.
- **AC-14** The report must display the timestamp of generation and the filter parameters applied.

---

## 12. Requirements Prioritisation (MoSCoW)

### Must Have (Initial Release)

- Authentication and role-based access (FR-001–FR-006).
- Higher-study profile CRUD with multiple applications (FR-007–FR-009, FR-013).
- Admission status lifecycle and history (FR-015–FR-019, BR-002).
- Coordinator verification with reason and history (FR-020–FR-023, BR-003–BR-005).
- Reference data management by Administrator (FR-010–FR-012).
- Basic search, filter and listing (FR-024–FR-028).
- Status, institution, country and programme reports (FR-029–FR-032).
- Soft-deactivation instead of hard delete (FR-014, BR-006).
- Audit logging of significant actions (NFR-022, NFR-023).

### Should Have

- Administrative dashboard (FR-033).
- Free-text comments on verification decisions (FR-022).
- Detailed verification history view (FR-023).
- Pagination on record lists (FR-024).

### Could Have

- E-mail notifications on key events (e.g. status changes, verification decisions).
- Bulk actions for Coordinators (e.g. multi-record verification).
- Export of reports to CSV/PDF.
- Self-service password reset.

### Won't Have (Initial Release)

The following items are explicitly out of scope for this release, in accordance with Assignment 1, Section 7:

- Submitting university applications directly through the system.
- Online payment or fee processing.
- Managing university entrance examinations.
- Complete alumni management and alumni networking.
- Scholarship application processing.
- Visa and immigration processing.
- Hostel or accommodation management.
- Automatic university recommendations or integration with external admission portals.

---

## 13. Requirements Traceability (RTM)

The initial Requirements Traceability Matrix maps each selected functional requirement to the user story and use case that primarily satisfy it. Test references are marked **TBD** and will be populated during the testing phase.

| Req. ID | Requirement Title | User Story | Use Case | Test Ref. |
|---|---|---|---|---|
| FR-001 | User Registration | US-001 | UC-001 | TBD |
| FR-002 | User Login | US-002 | UC-002 | TBD |
| FR-005 | Role Assignment | US-011 | UC-003 | TBD |
| FR-006 | Role-Based Access Control | US-011 | UC-003 | TBD |
| FR-007 | Create Higher-Study Record | US-003 | UC-004 | TBD |
| FR-008 | Edit Higher-Study Record | US-003 | UC-005 | TBD |
| FR-009 | View Higher-Study Record | US-005 | UC-009 | TBD |
| FR-010 | Manage Institution Records | US-012 | UC-003 | TBD |
| FR-011 | Manage Programme Records | US-012 | UC-003 | TBD |
| FR-012 | Manage Country Records | US-012 | UC-003 | TBD |
| FR-015 | Set Admission Status | US-004 | UC-006 | TBD |
| FR-016 | Status Transition Validation | US-004 | UC-006 | TBD |
| FR-017 | Record Progression Updates | US-005 | UC-006 | TBD |
| FR-018 | View Status History | US-005 | UC-009 | TBD |
| FR-020 | Verify Record | US-006 | UC-007 | TBD |
| FR-021 | Reject Verification with Reason | US-007 | UC-008 | TBD |
| FR-022 | Add Verification Comment | US-006 | UC-007 | TBD |
| FR-023 | View Verification History | US-005 | UC-009 | TBD |
| FR-024 | List Records | US-009 | UC-011 | TBD |
| FR-025 | Free-Text Search | US-008 | UC-010 | TBD |
| FR-026 | Filter by Institution | US-009 | UC-011 | TBD |
| FR-027 | Filter by Country | US-009 | UC-011 | TBD |
| FR-028 | Filter by Status | US-009 | UC-011 | TBD |
| FR-029 | Status Distribution Report | US-010 | UC-012 | TBD |
| FR-030 | Institution-Wise Report | US-010 | UC-013 | TBD |
| FR-031 | Country-Wise Report | US-010 | UC-013 | TBD |
| FR-032 | Programme-Wise Report | US-010 | UC-013 | TBD |
| FR-033 | Administrative Dashboard | US-014 | UC-014 | TBD |

---

## 14. Requirements Validation

This section records a self-administered validation review against the nine quality attributes listed in the Assignment 2 brief.

| Attribute | Validation Note |
|---|---|
| Correctness | All FRs and BRs are derived from Assignment 1's stakeholders, objectives and scope; no items were introduced outside the agreed scope. |
| Unambiguity | FRs are written using the standard *“The system shall…”* form and avoid ambiguous adjectives. Where ambiguity could remain (e.g. *recent*), the requirement quantifies the behaviour (e.g. NFR-023 specifies a one-year retention window). |
| Completeness | All ten items in Assignment 1 §7 (Initial Scope) are represented by at least one FR; data entities required by the FRs are listed in Section 7. |
| Consistency | Identifier prefixes (FR, BR, NFR, UC, US, AC) are used consistently; the status lifecycle in BR-002 is the single source of truth referenced by FR-015, FR-016 and FR-018. |
| Verifiability | Every FR is observable through a UI action, a stored record, or a report; each AC in Section 11 states a single observable condition. |
| Feasibility | The proposed stack (web application with a relational database) is feasible for a four-member student team within the course timeframe; items that would require external systems (payment, visa) are out of scope. |
| Traceability | Section 13 provides an initial RTM linking FRs to user stories and use cases; test references will be added in the testing phase. |
| Prioritisation | Section 12 applies MoSCoW against the initial scope, with the Won't Have list mirroring Assignment 1 §7. |
| Modifiability | The document is organised into independently numbered sections with stable IDs, allowing changes to be localised and reflected in the RTM without rewriting unrelated content. |

---

## 15. AI Usage Declaration

The team used AI-based development assistants as supporting tools for the preparation of this SRS. All AI-generated suggestions were reviewed, verified, edited and adapted by the team to match the Higher Studies Tracking System's scope and Assignment 1's content. The team understands and can explain every requirement, use case and user story documented herein.

| Field | Value |
|---|---|
| AI Tool(s) Used |  |
| Purpose of AI Use |  |
| Team ID | T070 |
| Team Representative | LAXITA BHIMSARIA |
| Date | 2026-08-31 |