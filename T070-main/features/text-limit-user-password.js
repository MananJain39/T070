/**
 * ============================================================================
 * FEATURE 4.3: Text Limit for Password Field
 * Filename: text-limit-user-password.js
 * ============================================================================
 * Enforces a maximum character limit on Password fields (Login, Create User,
 * Reset Password), displaying remaining characters / max characters.
 * ============================================================================
 */

(function () {
  'use strict';

  const FEATURE_NAME = 'text-limit-user-password';
  const MAX_LENGTH = 64;
  const SELECTOR = 'input[type="password"], input[name="password"], input[name="newPassword"], input[name="confirmPassword"]';

  function applyLimit() {
    const inputs = document.querySelectorAll(SELECTOR);
    inputs.forEach((input) => {
      if (input.dataset.limitAttached === 'user-password') return;
      input.dataset.limitAttached = 'user-password';
      input.setAttribute('maxlength', MAX_LENGTH);

      const container = input.closest('.pwd-toggle-container') || input.parentNode;
      let counter = container.parentNode.querySelector('.char-limit-user-password');
      if (!counter) {
        counter = document.createElement('small');
        counter.className = 'char-limit-user-password char-counter-badge';
        counter.style.cssText = 'display:block; text-align:right; font-size:0.78rem; font-weight:500; color:#64748b; margin-top:4px;';
        container.insertAdjacentElement('afterend', counter);
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
