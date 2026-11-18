/**
 * ============================================================================
 * FEATURE 4.4: Text Limit for Contact Information Field
 * Filename: text-limit-contact-info.js
 * ============================================================================
 * Enforces a character limit on Contact Information fields (Profile, User Setup),
 * displaying remaining characters / max characters.
 * ============================================================================
 */

(function () {
  'use strict';

  const FEATURE_NAME = 'text-limit-contact-info';
  const MAX_LENGTH = 100;
  const SELECTOR = 'input[name="contact_info"]';

  function applyLimit() {
    const inputs = document.querySelectorAll(SELECTOR);
    inputs.forEach((input) => {
      if (input.dataset.limitAttached === 'contact-info') return;
      input.dataset.limitAttached = 'contact-info';
      input.setAttribute('maxlength', MAX_LENGTH);

      let counter = input.parentNode.querySelector('.char-limit-contact-info');
      if (!counter) {
        counter = document.createElement('small');
        counter.className = 'char-limit-contact-info char-counter-badge';
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
