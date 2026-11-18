/**
 * ============================================================================
 * FEATURE 4.10: Text Limit for Master Data Institution City Field
 * Filename: text-limit-master-city.js
 * ============================================================================
 * Enforces a character limit on the City field in Institution master data
 * management forms with a live counter indicator.
 * ============================================================================
 */

(function () {
  'use strict';

  const FEATURE_NAME = 'text-limit-master-city';
  const MAX_LENGTH = 60;
  const SELECTOR = '#masterForm input[name="city"]';

  function applyLimit() {
    const inputs = document.querySelectorAll(SELECTOR);
    inputs.forEach((input) => {
      if (input.dataset.limitAttached === 'master-city') return;
      input.dataset.limitAttached = 'master-city';
      input.setAttribute('maxlength', MAX_LENGTH);

      let counter = input.parentNode.querySelector('.char-limit-master-city');
      if (!counter) {
        counter = document.createElement('small');
        counter.className = 'char-limit-master-city char-counter-badge';
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
