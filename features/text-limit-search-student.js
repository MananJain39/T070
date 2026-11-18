/**
 * ============================================================================
 * FEATURE 4.14: Text Limit for Student Search Filter Field
 * Filename: text-limit-search-student.js
 * ============================================================================
 * Enforces a character limit on the Student Name search filter input,
 * displaying remaining characters / max characters.
 * ============================================================================
 */

(function () {
  'use strict';

  const FEATURE_NAME = 'text-limit-search-student';
  const MAX_LENGTH = 50;
  const SELECTOR = '#filter input[name="student"]';

  function applyLimit() {
    const inputs = document.querySelectorAll(SELECTOR);
    inputs.forEach((input) => {
      if (input.dataset.limitAttached === 'search-student') return;
      input.dataset.limitAttached = 'search-student';
      input.setAttribute('maxlength', MAX_LENGTH);

      let counter = input.parentNode.querySelector('.char-limit-search-student');
      if (!counter) {
        counter = document.createElement('small');
        counter.className = 'char-limit-search-student char-counter-badge';
        counter.style.cssText = 'display:block; text-align:right; font-size:0.78rem; font-weight:500; color:#64748b; margin-top:4px;';
        input.parentNode.appendChild(counter);
      }

      function updateCounter() {
        const currentLength = input.value.length;
        const remaining = Math.max(0, MAX_LENGTH - currentLength);
        counter.textContent = `${remaining} / ${MAX_LENGTH} remaining`;
        if (remaining === 0) {
          counter.style.color = '#ef4444';
        } else if (remaining <= MAX_LENGTH * 0.1) {
          counter.style.color = '#f59e0b';
        } else {
          counter.style.color = '#64748b';
        }
      }

      input.addEventListener('input', updateCounter);
      updateCounter();
    });
  }

  if (window.FeatureRouter) {
    window.FeatureRouter.register(FEATURE_NAME, {
      init: applyLimit,
      onDOMChange: applyLimit
    });
  } else {
    document.addEventListener('DOMContentLoaded', applyLimit);
  }
})();
