# Commands Guide: Running Frontend & Backend

This document contains all the commands used to run, test, and manage the **Higher Studies Tracking System (HSTS)**.

---

## ⚡ Quick Start (Easiest Way)

The frontend and backend run together through a single Python server.

### Option 1: Python Launcher (Recommended for All Operating Systems)
Run from the root directory (`T--070`):
```bash
python run.py
```
To automatically open the web application in your default browser:
```bash
python run.py --open
```

### Option 2: Windows Double-Click / Command Prompt
Double-click `run.bat` or run:
```cmd
run.bat
```

### Option 3: Windows PowerShell
```powershell
.\run.ps1
```

Once running, access the web app at:
👉 **[http://127.0.0.1:8000](http://127.0.0.1:8000)**

---

## 🛠 Manual Commands for Frontend & Backend

If you prefer to run commands manually step-by-step:

### 1. Windows PowerShell

**A. Seed / Reset Database:**
```powershell
$env:PYTHONPATH="src"; python -m hsts seed
```

**B. Run Frontend & Backend (Default Port 8000):**
```powershell
$env:PYTHONPATH="src"; python -m hsts serve
```

**C. Run on a Custom Port (e.g., 8080):**
```powershell
$env:PYTHONPATH="src"; python -m hsts serve --port 8080
```

---

### 2. Windows Command Prompt (CMD)

**A. Seed Database:**
```cmd
set PYTHONPATH=src && python -m hsts seed
```

**B. Run Frontend & Backend:**
```cmd
set PYTHONPATH=src && python -m hsts serve
```

**C. Run on a Custom Port:**
```cmd
set PYTHONPATH=src && python -m hsts serve --port 8080
```

---

### 3. Linux / macOS (Bash / Zsh)

**A. Seed Database:**
```bash
PYTHONPATH=src python3 -m hsts seed
```

**B. Run Frontend & Backend:**
```bash
PYTHONPATH=src python3 -m hsts serve
```

**C. Run on a Custom Port:**
```bash
PYTHONPATH=src python3 -m hsts serve --port 8080
```

---

## 🧪 Testing and Syntax Verification Commands

### 1. Run All Integration & Unit Tests
- **PowerShell:**
  ```powershell
  $env:PYTHONPATH="src"; python -m unittest discover -s tests -v
  ```
- **Linux / macOS / CMD:**
  ```bash
  PYTHONPATH=src python -m unittest discover -s tests -v
  ```

### 2. Validate Python Files (Compile Check)
- **PowerShell:**
  ```powershell
  Get-ChildItem src/hsts/*.py | ForEach-Object { python -m py_compile $_.FullName }
  ```
- **Linux / macOS:**
  ```bash
  python3 -m py_compile src/hsts/*.py
  ```

### 3. Validate Frontend JavaScript (Node Check)
```bash
node --check src/web/app.js
```

---

## 🔑 Demo Login Credentials

| Role | Email | Password | Access Capabilities |
| :--- | :--- | :--- | :--- |
| **Student / Alumni** | `student1@lnmiit.ac.in` | `Student@123` | Create & submit higher study records, view status, track progression |
| **Coordinator** | `coordinator@lnmiit.ac.in` | `Coord@123` | Verify records, request corrections, update admission/progression |
| **Administrator** | `admin@lnmiit.ac.in` | `Admin@123` | User management, audit logs, master data (degrees, institutions) |

---

## 🌐 Architecture Overview

- **Backend API:** Built in Python using standard libraries (`http.server`, `sqlite3`). Provides REST endpoints under `/api/*`.
- **Frontend UI:** Vanilla HTML5, CSS3, and JavaScript located under `src/web/` and modular enhancements under `features/`.
- **Single Port Simplicity:** The backend HTTP server directly serves both the frontend static assets (`/index.html`, `/app.js`, `/features/*`) and handles API requests on the same port (`8000`), eliminating CORS issues.
