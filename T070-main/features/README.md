# Modular Feature Extensions & Feature Router

This directory contains standalone, modular features for the **Higher Studies Tracking System (HSTS)**. Each feature is encapsulated in its own separate file with an intuitive, self-explanatory filename.

---

## 🗂️ Directory Overview & Filename Mapping

| Requirement | Filename | Description |
|---|---|---|
| **Route File** | `feature-router.js` | Central router file. Registers and activates features dynamically in the main project. |
| **1. Password Visibility** | `password-show-hide-toggle.js` | Adds an interactive show/hide (👁️ / 🙈) icon to password fields. |
| **2. Dark / Light Theme** | `theme-toggle-dark-light.js` | Adds a header button allowing users to switch between Light and Dark themes with persistence. |
| **3. Reset Password** | `login-reset-password.js` | Adds a "Forgot / Reset Password?" modal on the login page with email domain verification. |
| **4.1 Text Limit** | `text-limit-user-name.js` | Max 50 characters on User Name inputs with live character counter. |
| **4.2 Text Limit** | `text-limit-user-email.js` | Max 80 characters on Email inputs with live character counter. |
| **4.3 Text Limit** | `text-limit-user-password.js` | Max 64 characters on Password inputs with live character counter. |
| **4.4 Text Limit** | `text-limit-contact-info.js` | Max 100 characters on Contact Information input with live character counter. |
| **4.5 Text Limit** | `text-limit-admission-evidence.js` | Max 200 characters on Admission Evidence input with live character counter. |
| **4.6 Text Limit** | `text-limit-correction-reason.js` | Max 300 characters on Correction Reason textarea with live character counter. |
| **4.7 Text Limit** | `text-limit-progression-remarks.js` | Max 300 characters on Progression Remarks textarea with live character counter. |
| **4.8 Text Limit** | `text-limit-admission-remarks.js` | Max 300 characters on Admission Remarks textarea with live character counter. |
| **4.9 Text Limit** | `text-limit-master-name.js` | Max 80 characters on Master Data entity name inputs with live character counter. |
| **4.10 Text Limit** | `text-limit-master-city.js` | Max 60 characters on Institution City input with live character counter. |
| **4.11 Text Limit** | `text-limit-master-code.js` | Max 10 characters on Country Code input with live character counter. |
| **5. Email Domain Check** | `email-domain-validator-lnmiit.js` | Enforces that email addresses must strictly belong to `@lnmiit.ac.in`. |

---

## 🚀 How the Feature Router Works (`feature-router.js`)

The `feature-router.js` file serves as the routing switchboard.

### To Enable or Add a Feature:
Open `feature-router.js` and ensure the filename is in the `ACTIVE_FEATURE_ROUTES` array:

```javascript
const ACTIVE_FEATURE_ROUTES = [
  'password-show-hide-toggle.js',
  'theme-toggle-dark-light.js',
  'login-reset-password.js',
  // ... any other feature file
];
```

### To Disable a Feature:
Comment out or remove the filename from `ACTIVE_FEATURE_ROUTES`:

```javascript
const ACTIVE_FEATURE_ROUTES = [
  'password-show-hide-toggle.js',
  // 'theme-toggle-dark-light.js', <-- Disabled! The file is "just there" without running
  'login-reset-password.js',
];
```

The feature files can remain safely in this directory without affecting the main project. Whenever a developer wants to activate a feature in the future, they simply add the file name to the route list in `feature-router.js`.
