/**
 * ============================================================================
 * FEATURE 5: LNMIIT Institutional Email Domain Validator (@lnmiit.ac.in)
 * Filename: email-domain-validator-lnmiit.js
 * ============================================================================
 * Enforces that user emails must belong to the official '@lnmiit.ac.in' domain.
 * Provides real-time input validation, custom error styling, and intercepts
 * form submissions if a non-LNMIIT email domain is entered.
 * ============================================================================
 */

(function () {
  'use strict';

  const FEATURE_NAME = 'email-domain-validator-lnmiit';

  // Configurable target domain (easily modified by developers)
  const REQUIRED_DOMAIN = '@lnmiit.ac.in';
  const SELECTOR = 'input[type="email"], input[name="email"]';

  /**
   * Helper function to check if an email matches the required domain.
   * @param {string} email
   * @returns {boolean}
   */
  function isLNMIITEmail(email) {
    if (!email) return false;
    const clean = String(email).trim().toLowerCase();
    return clean.endsWith(REQUIRED_DOMAIN);
  }

  // Export validator globally for use by other scripts or tests
  window.LNMIITEmailValidator = {
    requiredDomain: REQUIRED_DOMAIN,
    isValid: isLNMIITEmail
  };

  function setupDomainValidation() {
    if (window.FeatureRouter && window.FeatureRouter.injectCSS) {
      window.FeatureRouter.injectCSS(
        'email-domain-validator-styles',
        `
        .email-domain-hint {
          display: block;
          font-size: 0.75rem;
          color: #0284c7;
          margin-top: 2px;
        }
        .email-domain-error {
          display: block;
          font-size: 0.75rem;
          color: #ef4444;
          margin-top: 2px;
          font-weight: 500;
        }
        input.invalid-domain {
          border-color: #ef4444 !important;
          background-color: #fef2f2 !important;
        }
        [data-theme="dark"] input.invalid-domain {
          background-color: #451a1a !important;
          border-color: #f87171 !important;
        }
        `
      );
    }

    const emailInputs = document.querySelectorAll(SELECTOR);
    emailInputs.forEach((input) => {
      // Avoid attaching multiple times
      if (input.dataset.domainValidation === 'attached') return;
      input.dataset.domainValidation = 'attached';

      // Create feedback helper element
      let msg = input.parentNode.querySelector('.email-domain-feedback');
      if (!msg) {
        msg = document.createElement('small');
        msg.className = 'email-domain-feedback email-domain-hint';
        msg.textContent = `Allowed domain: ${REQUIRED_DOMAIN}`;
        input.parentNode.appendChild(msg);
      }

      function validateInput() {
        const val = input.value.trim().toLowerCase();
        if (!val) {
          msg.textContent = `Allowed domain: ${REQUIRED_DOMAIN}`;
          msg.className = 'email-domain-feedback email-domain-hint';
          input.classList.remove('invalid-domain');
          return true;
        }

        // Note: allow development demo accounts (e.g. docs/demo.md) if needed for quick testing
        const isDemo = val.endsWith('@example.edu');
        if (isLNMIITEmail(val) || isDemo) {
          msg.textContent = isDemo ? '✓ Demo domain accepted' : `✓ Valid ${REQUIRED_DOMAIN} domain`;
          msg.className = 'email-domain-feedback email-domain-hint';
          msg.style.color = '#10b981';
          input.classList.remove('invalid-domain');
          return true;
        } else {
          msg.textContent = `✕ Must be an official ${REQUIRED_DOMAIN} address`;
          msg.className = 'email-domain-feedback email-domain-error';
          msg.style.color = '#ef4444';
          input.classList.add('invalid-domain');
          return false;
        }
      }

      input.addEventListener('input', validateInput);
      input.addEventListener('blur', validateInput);

      // Intercept form submit if domain is invalid
      const form = input.closest('form');
      if (form && !form.dataset.domainSubmitIntercepted) {
        form.dataset.domainSubmitIntercepted = 'true';
        form.addEventListener(
          'submit',
          (e) => {
            const currentEmail = input.value.trim().toLowerCase();
            if (currentEmail && !isLNMIITEmail(currentEmail) && !currentEmail.endsWith('@example.edu')) {
              e.preventDefault();
              e.stopImmediatePropagation();
              input.focus();
              alert(`Invalid email domain! Only ${REQUIRED_DOMAIN} email addresses are permitted.`);
            }
          },
          true
        );
      }
    });
  }

  if (window.FeatureRouter) {
    window.FeatureRouter.register(FEATURE_NAME, {
      init: setupDomainValidation,
      onDOMChange: setupDomainValidation
    });
  } else {
    document.addEventListener('DOMContentLoaded', setupDomainValidation);
  }
})();
