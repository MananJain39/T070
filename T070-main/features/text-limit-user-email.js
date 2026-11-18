/**
 * ============================================================================
 * FEATURE 4.2: Text Limit for User Email Field
 * Filename: text-limit-user-email.js
 * ============================================================================
 * Enforces a character limit on Email inputs (Login, Create User, Reset Password)
 * with a live character counter indicator.
 * ============================================================================
 */

(function () {
  'use strict';

  const FEATURE_NAME = 'text-limit-user-email';
  const MAX_LENGTH = 80;
  const SELECTOR = 'input[type="email"], input[name="email"], #email';

  function applyLimit() {
    const inputs = document.querySelectorAll(SELECTOR);
    inputs.forEach((input) => {
      if (input.dataset.limitAttached === 'user-email') return;
      input.dataset.limitAttached = 'user-email';
      input.setAttribute('maxlength', MAX_LENGTH);

      let counter = input.parentNode.querySelector('.char-limit-user-email');
      if (!counter) {
        counter = document.createElement('small');
        counter.className = 'char-limit-user-email char-counter-badge';
        counter.style.cssText = 'display:block; text-align:right; font-size:0.75rem; color:#64748b; margin-top:2px;';
        input.parentNode.appendChild(counter);
      }

      function updateCounter() {
        const currentLength = input.value.length;
        counter.textContent = `${currentLength} / ${MAX_LENGTH} characters`;
        if (currentLength >= MAX_LENGTH) {
          counter.style.color = '#ef4444';
        } else if (currentLength >= MAX_LENGTH * 0.9) {
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
