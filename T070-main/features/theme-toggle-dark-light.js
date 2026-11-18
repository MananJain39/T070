/**
 * ============================================================================
 * FEATURE 2: Dark / Light Theme Switcher
 * Filename: theme-toggle-dark-light.js
 * ============================================================================
 * Provides an interactive header button that toggles between Dark and Light
 * themes on click. Saves preference to localStorage so it persists across sessions.
 * ============================================================================
 */

(function () {
  'use strict';

  const FEATURE_NAME = 'theme-toggle-dark-light';
  const STORAGE_KEY = 'hsts_theme_preference';

  const DARK_THEME_CSS = `
    [data-theme="dark"] {
      --bg: #0b1120;
      --card-bg: #1e293b;
      --card-border: #334155;
      --text: #f8fafc;
      --text-muted: #94a3b8;
      --primary: #38bdf8;
      --primary-hover: #0284c7;
      --input-bg: #0f172a;
      --input-border: #475569;
      --table-header: #1e293b;
      --table-row-alt: #162032;
      --dialog-bg: #1e293b;
      --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.5);
    }

    [data-theme="dark"] body {
      background-color: var(--bg) !important;
      color: var(--text) !important;
    }

    [data-theme="dark"] header {
      background: #0f172a !important;
      border-bottom: 1px solid #334155 !important;
      color: #f8fafc !important;
    }

    [data-theme="dark"] header .brand strong {
      color: #f8fafc !important;
    }

    [data-theme="dark"] header .brand small {
      color: #94a3b8 !important;
    }

    [data-theme="dark"] nav#nav button {
      color: #cbd5e1 !important;
      background: transparent !important;
      border-color: #334155 !important;
    }

    [data-theme="dark"] nav#nav button:hover,
    [data-theme="dark"] nav#nav button.active {
      background: #1e293b !important;
      color: #38bdf8 !important;
      border-color: #38bdf8 !important;
    }

    [data-theme="dark"] .card,
    [data-theme="dark"] dialog,
    [data-theme="dark"] .stat {
      background: var(--card-bg) !important;
      color: var(--text) !important;
      border-color: var(--card-border) !important;
      box-shadow: var(--shadow) !important;
    }

    [data-theme="dark"] input,
    [data-theme="dark"] select,
    [data-theme="dark"] textarea {
      background: var(--input-bg) !important;
      color: var(--text) !important;
      border-color: var(--input-border) !important;
    }

    [data-theme="dark"] input:disabled,
    [data-theme="dark"] select:disabled {
      background: #1e293b !important;
      color: #64748b !important;
    }

    [data-theme="dark"] table {
      color: var(--text) !important;
    }

    [data-theme="dark"] th {
      background: #0f172a !important;
      color: #cbd5e1 !important;
      border-color: #334155 !important;
    }

    [data-theme="dark"] td {
      border-color: #334155 !important;
    }

    [data-theme="dark"] tbody tr:nth-child(even) {
      background: var(--table-row-alt) !important;
    }

    [data-theme="dark"] .sub,
    [data-theme="dark"] .muted {
      color: var(--text-muted) !important;
    }

    [data-theme="dark"] button.secondary {
      background: #334155 !important;
      color: #f1f5f9 !important;
      border-color: #475569 !important;
    }

    [data-theme="dark"] button.secondary:hover {
      background: #475569 !important;
    }

    /* Theme Switcher Button */
    .theme-toggle-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      margin-left: 10px;
      cursor: pointer;
      border-radius: 6px;
      font-size: 0.9rem;
      font-weight: 500;
      border: 1px solid #cbd5e1;
      background: #f8fafc;
      color: #1e293b;
      transition: all 0.2s ease;
    }

    [data-theme="dark"] .theme-toggle-btn {
      background: #1e293b;
      color: #f8fafc;
      border-color: #475569;
    }

    .theme-toggle-btn:hover {
      transform: translateY(-1px);
    }
  `;

  function getSavedTheme() {
    return localStorage.getItem(STORAGE_KEY) || 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);

    const btn = document.getElementById('theme-toggle-btn');
    if (btn) {
      if (theme === 'dark') {
        btn.innerHTML = '☀️ Light Mode';
        btn.setAttribute('aria-label', 'Switch to light theme');
      } else {
        btn.innerHTML = '🌙 Dark Mode';
        btn.setAttribute('aria-label', 'Switch to dark theme');
      }
    }
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
  }

  function ensureThemeButton() {
    if (document.getElementById('theme-toggle-btn')) return;

    const header = document.querySelector('header');
    if (!header) return;

    const accountDiv = document.getElementById('account') || header;
    const btn = document.createElement('button');
    btn.id = 'theme-toggle-btn';
    btn.type = 'button';
    btn.className = 'theme-toggle-btn';
    btn.onclick = toggleTheme;

    // Append to account div or right side of header
    accountDiv.appendChild(btn);

    // Sync button text
    const currentTheme = getSavedTheme();
    applyTheme(currentTheme);
  }

  function initTheme() {
    if (window.FeatureRouter && window.FeatureRouter.injectCSS) {
      window.FeatureRouter.injectCSS('dark-theme-stylesheet', DARK_THEME_CSS);
    }
    const saved = getSavedTheme();
    applyTheme(saved);
    ensureThemeButton();
  }

  if (window.FeatureRouter) {
    window.FeatureRouter.register(FEATURE_NAME, {
      init: initTheme,
      onDOMChange: ensureThemeButton
    });
  } else {
    document.addEventListener('DOMContentLoaded', initTheme);
  }
})();
