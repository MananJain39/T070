/**
 * ============================================================================
 * FEATURE ROUTER & REGISTRY (feature-router.js)
 * ============================================================================
 * This route file connects modular features to the main HSTS application.
 *
 * HOW IT WORKS FOR DEVELOPERS:
 * 1. Each feature exists as an independent, self-contained file in this folder.
 * 2. To ENABLE a feature, simply add its filename to `ACTIVE_FEATURE_ROUTES`.
 * 3. To DISABLE a feature, simply comment it out or remove it from `ACTIVE_FEATURE_ROUTES`.
 *    The file remains safely in this folder ("just there"); it will not be executed
 *    unless its filename is added to the active routes below.
 * ============================================================================
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // ACTIVE FEATURE ROUTES
  // Add or remove filenames here to toggle features in the main project.
  // --------------------------------------------------------------------------
  const ACTIVE_FEATURE_ROUTES = [
    // [password] [visibility] [toggle] Show/hide password text and password eye icon.
    // 'password-show-hide-toggle.js',

    // [theme] [dark-mode] [light-mode] Switch between dark and light page themes.
    // 'theme-toggle-dark-light.js',

    // [reset-password] [forgot-password] [login] Open the forgot/reset-password modal on login.
    // 'login-reset-password.js',

    // [character-limit] [text-limit] [counter] Apply field-specific character limits.
    // [name] [50] Maximum 50 characters for user-name and search fields.
    // 'text-limit-user-name.js',
    // [email] [80] Maximum 80 characters for email inputs.
    // 'text-limit-user-email.js',
    // [password] [64] Maximum 64 characters for password inputs.
    // 'text-limit-user-password.js',
    // [contact] [100] Maximum 100 characters for contact information.
    // 'text-limit-contact-info.js',
    // [evidence] [200] Maximum 200 characters for admission evidence.
    // 'text-limit-admission-evidence.js',
    // [correction] [reason] [300] Maximum 300 characters for correction reasons.
    // 'text-limit-correction-reason.js',
    // [progression] [remarks] [300] Maximum 300 characters for progression remarks.
    // 'text-limit-progression-remarks.js',
    // [admission] [remarks] [300] Maximum 300 characters for admission remarks.
    // 'text-limit-admission-remarks.js',
    // [master] [name] [80] Maximum 80 characters for master-data names.
    // 'text-limit-master-name.js',
    // [master] [city] [60] Maximum 60 characters for institution city names.
    // 'text-limit-master-city.js',
    // [country] [code] [10] Maximum 10 characters for country codes.
    // 'text-limit-master-code.js',
    // [programme] [degree] [50] Maximum 50 characters for degree types.
    // 'text-limit-master-degree-type.js',
    // [programme] [duration] [30] Maximum 30 characters for programme duration.
    // 'text-limit-master-duration.js',
    // [search] [student] [50] Maximum 50 characters for student search filters.
    // 'text-limit-search-student.js',
    // [reset-code] [otp] [6] Maximum 6 characters for password reset codes.
    // 'text-limit-reset-code.js',

    // [alphabets-only] [name-validation] Allow letters and spaces only in student-name fields.
    // 'student-field-alphabets-only.js',

    // [email-domain] [LNMIIT] [validator] Restrict institutional email addresses to @lnmiit.ac.in.
    // 'email-domain-validator-lnmiit.js'
  ];

  // --------------------------------------------------------------------------
  // FEATURE ROUTER CORE ENGINE
  // --------------------------------------------------------------------------
  window.FeatureRouter = {
    features: {},
    activeRoutes: [...ACTIVE_FEATURE_ROUTES],

    /**
     * Register a feature module with the router.
     * @param {string} name - Unique feature name
     * @param {Object} module - Object containing init() and optional onDOMChange()
     */
    register(name, module) {
      this.features[name] = module;
      if (typeof module.init === 'function') {
        try {
          module.init();
        } catch (err) {
          console.error(`[FeatureRouter] Error initializing ${name}:`, err);
        }
      }
    },

    /**
     * Notify registered features when the DOM tree updates (e.g. view changes).
     */
    notifyDOMChange() {
      for (const [name, mod] of Object.entries(this.features)) {
        if (typeof mod.onDOMChange === 'function') {
          try {
            mod.onDOMChange();
          } catch (err) {
            console.error(`[FeatureRouter] Error in ${name}.onDOMChange:`, err);
          }
        }
      }
    },

    /**
     * Dynamically load an individual script file.
     * @param {string} fileName - File path relative to /features/
     */
    loadScript(fileName) {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = `/features/${fileName}`;
        script.async = false;
        script.onload = () => {
          console.log(`[FeatureRouter] Successfully routed & loaded: ${fileName}`);
          resolve();
        };
        script.onerror = () => {
          console.warn(`[FeatureRouter] Failed to load route: ${fileName}`);
          reject(new Error(`Failed to load ${fileName}`));
        };
        document.head.appendChild(script);
      });
    },

    /**
     * Injects custom CSS rules into document head.
     * @param {string} id - Unique style tag ID
     * @param {string} cssContent - CSS rules string
     */
    injectCSS(id, cssContent) {
      if (document.getElementById(id)) return;
      const style = document.createElement('style');
      style.id = id;
      style.textContent = cssContent;
      document.head.appendChild(style);
    },

    /**
     * Bootstrap and load all registered active routes.
     */
    async bootstrap() {
      console.log(`[FeatureRouter] Initializing ${this.activeRoutes.length} active routes...`);
      for (const route of this.activeRoutes) {
        try {
          await this.loadScript(route);
        } catch (e) {
          // Continue loading others even if one fails
        }
      }

      // Observe DOM mutations across the entire body so dialogs/modals and view changes are caught
      const observer = new MutationObserver(() => {
        this.notifyDOMChange();
      });

      observer.observe(document.body, { childList: true, subtree: true });

      // Initial run
      setTimeout(() => this.notifyDOMChange(), 100);
    }
  };

  // Start the feature router when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.FeatureRouter.bootstrap());
  } else {
    window.FeatureRouter.bootstrap();
  }
})();
