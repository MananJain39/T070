#!/usr/bin/env python3
"""
Higher Studies Tracking System (HSTS)
Single-command launcher: starts backend and frontend, and opens the browser.

Run command:
    python3 run.py
    (or: py run.py)
"""
import os
import sys
import threading
import time
import webbrowser
from pathlib import Path

# Automatically add 'src' to Python module path
ROOT_DIR = Path(__file__).resolve().parent
SRC_DIR = ROOT_DIR / "src"
if str(SRC_DIR) not in sys.path:
    sys.path.insert(0, str(SRC_DIR))

# Import HSTS modules (supports both root-level and src-level imports)
try:
    from hsts.api import serve
    from hsts.db import Repository
    from hsts.seed import seed
except (ImportError, ModuleNotFoundError):
    from src.hsts.api import serve
    from src.hsts.db import Repository
    from src.hsts.seed import seed

def ensure_database(db_file):
    """Ensures database directory exists and seeds demo data if not present."""
    db_path = Path(db_file)
    db_path.parent.mkdir(parents=True, exist_ok=True)

    if not db_path.exists() or db_path.stat().st_size == 0:
        print(f"[*] Initializing and seeding database at: {db_path}")
        repo = Repository(str(db_path))
        seed(repo)
        print("[+] Database seeded with demo records successfully.")

def open_browser_when_ready(url, delay=0.6):
    """Opens browser automatically in a background thread once server starts."""
    time.sleep(delay)
    try:
        webbrowser.open(url)
    except Exception:
        pass

def main():
    host = os.environ.get("HSTS_HOST", "127.0.0.1")
    port = int(os.environ.get("HSTS_PORT", "8000"))
    db_file = os.environ.get("HSTS_DB", str(ROOT_DIR / "data" / "hsts.sqlite3"))

    # 1. Setup Database
    ensure_database(db_file)

    url = f"http://{host}:{port}"

    # 2. Print status banner and credentials
    print("=" * 65)
    print(" Higher Studies Tracking System (HSTS)")
    print(" Backend & Frontend are running together at:")
    print(f"  --> {url}")
    print("=" * 65)
    print(" Demo Accounts:")
    print("   Student:     student1@lnmiit.ac.in      | pass: Student@123")
    print("   Coordinator: coordinator@lnmiit.ac.in   | pass: Coord@123")
    print("   Admin:       admin@lnmiit.ac.in         | pass: Admin@123")
    print("=" * 65)
    print(" Press Ctrl + C to stop the server.\n")

    # 3. Automatically launch browser
    threading.Thread(target=open_browser_when_ready, args=(url,), daemon=True).start()

    # 4. Start HTTP Server (serves both API & Frontend)
    serve(database=db_file, host=host, port=port)

if __name__ == "__main__":
    main()
