/**
 * ============================================================================
 * FEATURE 1: Password Show / Hide Visibility Toggle
 * Filename: password-show-hide-toggle.js
 * ============================================================================
 * Adds an interactive eye toggle icon to all password fields (Login,
 * Create User, Reset Password, etc.). Clicking the icon toggles between
 * masked (••••) and plain text visibility.
 * ============================================================================
 */

(function () {
  'use strict';

  const FEATURE_NAME = 'password-show-hide-toggle';

  function setupPasswordToggles() {
    // Inject styling for the toggle button wrapper if not already injected
    if (window.FeatureRouter && window.FeatureRouter.injectCSS) {
      window.FeatureRouter.injectCSS(
        'password-toggle-styles',
        `
        .pwd-toggle-container {
          position: relative;
          display: flex;
          align-items: center;
          width: 100%;
        }
        .pwd-toggle-container input {
          width: 100% !important;
          padding-right: 40px !important;
          box-sizing: border-box;
        }
        .pwd-toggle-btn {
          position: absolute;
          right: 8px;
          background: transparent !important;
          border: none !important;
          cursor: pointer;
          font-size: 1.15rem;
          color: #555;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: none !important;
          width: auto !important;
          height: auto !important;
          min-height: unset !important;
          transition: transform 0.15s ease, opacity 0.15s ease;
          opacity: 0.75;
          z-index: 2;
        }
        .pwd-toggle-btn:hover {
          opacity: 1;
          transform: scale(1.1);
        }
        [data-theme="dark"] .pwd-toggle-btn {
          color: #ccc;
        }
        `
      );
    }

    const passwordInputs = document.querySelectorAll(
      'input[type="password"], input[data-password-toggle="true"]'
    );

    passwordInputs.forEach((input) => {
      // Avoid attaching multiple times
      if (input.dataset.passwordToggle === 'true') return;
      input.dataset.passwordToggle = 'true';

      // Check if already in container
      if (input.parentElement && input.parentElement.classList.contains('pwd-toggle-container')) {
        return;
      }

      // Create container wrapper
      const wrapper = document.createElement('div');
      wrapper.className = 'pwd-toggle-container';

      // Insert wrapper before input, then move input inside
      input.parentNode.insertBefore(wrapper, input);
      wrapper.appendChild(input);

      // Create toggle button
      const toggleBtn = document.createElement('button');
      toggleBtn.type = 'button';
      toggleBtn.className = 'pwd-toggle-btn';
      toggleBtn.title = 'Show / Hide password';
      toggleBtn.setAttribute('aria-label', 'Toggle password visibility');
      toggleBtn.innerHTML = '👁️';

      toggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const isPassword = input.type === 'password';
        input.type = isPassword ? 'text' : 'password';
        toggleBtn.innerHTML = isPassword ? '🙈' : '👁️';
        toggleBtn.title = isPassword ? 'Hide password' : 'Show password';
        input.focus();
      });

      wrapper.appendChild(toggleBtn);
    });
  }

  // Register with Feature Router
  if (window.FeatureRouter) {
    window.FeatureRouter.register(FEATURE_NAME, {
      init: setupPasswordToggles,
      onDOMChange: setupPasswordToggles
    });
  } else {
    document.addEventListener('DOMContentLoaded', setupPasswordToggles);
  }
})();
