/**
 * ============================================================================
 * FEATURE 4.13: Text Limit for Master Programme Duration Field
 * Filename: text-limit-master-duration.js
 * ============================================================================
 * Enforces a character limit on the Duration input in Programme master data,
 * displaying remaining characters / max characters.
 * ============================================================================
 */

(function () {
  'use strict';

  const FEATURE_NAME = 'text-limit-master-duration';
  const MAX_LENGTH = 30;
  const SELECTOR = '#masterForm input[name="duration"]';

  function applyLimit() {
    const inputs = document.querySelectorAll(SELECTOR);
    inputs.forEach((input) => {
      if (input.dataset.limitAttached === 'master-duration') return;
      input.dataset.limitAttached = 'master-duration';
      input.setAttribute('maxlength', MAX_LENGTH);

      let counter = input.parentNode.querySelector('.char-limit-master-duration');
      if (!counter) {
        counter = document.createElement('small');
        counter.className = 'char-limit-master-duration char-counter-badge';
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
