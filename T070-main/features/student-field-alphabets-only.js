/**
 * ============================================================================
 * FEATURE: Only Alphabets Allowed in Student / Name Fields
 * Filename: student-field-alphabets-only.js
 * ============================================================================
 * Enforces that only alphabetic letters (A-Z, a-z) and single spaces are allowed.
 * Strictly blocks all numbers, symbols, punctuation, and special characters
 * from being typed or pasted.
 *
 * Implemented as a separate, isolated modular feature outside the main codebase.
 * ============================================================================
 */

(function () {
  'use strict';

  const FEATURE_NAME = 'student-field-alphabets-only';

  // Target selectors: Student search input and user/student name fields
  const SELECTORS = [
    '#filter input[name="student"]',
    'input[name="student"]',
    '#profileForm input[name="name"]',
    '#userForm input[name="name"]'
  ];

  function applyAlphabetsOnly() {
    SELECTORS.forEach((selector) => {
      const inputs = document.querySelectorAll(selector);
      inputs.forEach((input) => {
        if (input.dataset.alphabetsOnlyAttached === 'true') return;
        input.dataset.alphabetsOnlyAttached = 'true';

        // Create feedback indicator for blocked non-alphabetic input
        let warning = input.parentNode.querySelector('.alphabets-only-warning');
        if (!warning) {
          warning = document.createElement('small');
          warning.className = 'alphabets-only-warning';
          warning.style.cssText = 'display:none; color:#ef4444; font-size:0.75rem; margin-top:2px; font-weight:500;';
          warning.textContent = '✕ Only alphabetic characters (A-Z, a-z) are allowed.';
          input.parentNode.appendChild(warning);
        }

        function showWarning() {
          warning.style.display = 'block';
          clearTimeout(warning.dataset.timer);
          warning.dataset.timer = setTimeout(() => {
            warning.style.display = 'none';
          }, 2500);
        }

        // 1. Intercept non-alphabetic keypresses (allow letters and spaces)
        input.addEventListener('keypress', (e) => {
          // If Ctrl or Meta is held (e.g. Ctrl+A, Ctrl+C, Ctrl+V), allow it
          if (e.ctrlKey || e.metaKey || e.altKey) return;

          if (!/^[a-zA-Z\s]$/.test(e.key)) {
            e.preventDefault();
            showWarning();
          }
        });

        // 2. Sanitize on input (handles paste, drag-and-drop, autofill)
        input.addEventListener('input', () => {
          if (/[^a-zA-Z\s]/.test(input.value)) {
            input.value = input.value.replace(/[^a-zA-Z\s]/g, '');
            showWarning();
          }
        });
      });
    });
  }

  // Register with Feature Router
  if (window.FeatureRouter) {
    window.FeatureRouter.register(FEATURE_NAME, {
      init: applyAlphabetsOnly,
      onDOMChange: applyAlphabetsOnly
    });
  } else {
    document.addEventListener('DOMContentLoaded', applyAlphabetsOnly);
  }
})();
