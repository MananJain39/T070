/**
 * ============================================================================
 * FEATURE 4.7: Text Limit for Progression Remarks Field
 * Filename: text-limit-progression-remarks.js
 * ============================================================================
 * Enforces a character limit on the Progression Remarks textarea in the
 * Update Progression modal, with a live character counter indicator.
 * ============================================================================
 */

(function () {
  'use strict';

  const FEATURE_NAME = 'text-limit-progression-remarks';
  const MAX_LENGTH = 300;
  const SELECTOR = '#modalForm textarea[name="remarks"], #remarks';

  function applyLimit() {
    const inputs = document.querySelectorAll(SELECTOR);
    inputs.forEach((input) => {
      if (input.dataset.limitAttached === 'progression-remarks') return;
      input.dataset.limitAttached = 'progression-remarks';
      input.setAttribute('maxlength', MAX_LENGTH);

      let counter = input.parentNode.querySelector('.char-limit-progression-remarks');
      if (!counter) {
        counter = document.createElement('small');
        counter.className = 'char-limit-progression-remarks char-counter-badge';
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
