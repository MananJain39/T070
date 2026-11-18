/**
 * ============================================================================
 * FEATURE 4.8: Text Limit for Admission Remarks Field
 * Filename: text-limit-admission-remarks.js
 * ============================================================================
 * Enforces a character limit on the Admission Remarks textarea in the
 * Update Admission modal, with a live character counter indicator.
 * ============================================================================
 */

(function () {
  'use strict';

  const FEATURE_NAME = 'text-limit-admission-remarks';
  const MAX_LENGTH = 300;
  const SELECTOR = '#admissionRemarks, textarea[name="remarks"]';

  function applyLimit() {
    const inputs = document.querySelectorAll(SELECTOR);
    inputs.forEach((input) => {
      if (input.dataset.limitAttached === 'admission-remarks') return;
      input.dataset.limitAttached = 'admission-remarks';
      input.setAttribute('maxlength', MAX_LENGTH);

      let counter = input.parentNode.querySelector('.char-limit-admission-remarks');
      if (!counter) {
        counter = document.createElement('small');
        counter.className = 'char-limit-admission-remarks char-counter-badge';
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
