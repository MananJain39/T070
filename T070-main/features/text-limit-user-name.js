/**
 * ============================================================================
 * FEATURE 4.1: Text Limit for User Name Field
 * Filename: text-limit-user-name.js
 * ============================================================================
 * Enforces a character limit on User Name inputs (Profile, User Management)
 * with a live character counter indicator.
 * ============================================================================
 */

(function () {
  'use strict';

  const FEATURE_NAME = 'text-limit-user-name';
  const MAX_LENGTH = 50;
  const SELECTOR = 'input[name="name"]';

  function applyLimit() {
    const inputs = document.querySelectorAll(SELECTOR);
    inputs.forEach((input) => {
      // Avoid attaching multiple times
      if (input.dataset.limitAttached === 'user-name') return;
      input.dataset.limitAttached = 'user-name';
      input.setAttribute('maxlength', MAX_LENGTH);

      // Create live counter element
      let counter = input.parentNode.querySelector('.char-limit-user-name');
      if (!counter) {
        counter = document.createElement('small');
        counter.className = 'char-limit-user-name char-counter-badge';
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
