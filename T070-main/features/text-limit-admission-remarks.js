/**
 * ============================================================================
 * FEATURE 4.8: Text Limit for Admission Remarks Field
 * Filename: text-limit-admission-remarks.js
 * ============================================================================
 * Enforces a character limit on the Admission Remarks textarea in the
 * Update Admission modal, displaying remaining characters / max characters.
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
      // Check if this is the admission remarks field
      const isAdmissionModal = input.id === 'admissionRemarks' || input.closest('form')?.querySelector('#admissionStatus');
      if (!isAdmissionModal && input.id !== 'admissionRemarks') return;

      if (input.dataset.limitAttached === 'admission-remarks') return;
      input.dataset.limitAttached = 'admission-remarks';
      input.setAttribute('maxlength', MAX_LENGTH);

      let counter = input.parentNode.querySelector('.char-limit-admission-remarks');
      if (!counter) {
        counter = document.createElement('small');
        counter.className = 'char-limit-admission-remarks char-counter-badge';
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
