// Reads UTM params from the URL, persists them in sessionStorage,
// and injects hidden inputs into every Netlify form on the page.
// Include this script (non-deferred) on any page with a Netlify form.
(function () {
  var UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
  var STORE_KEY = 'muvap_utms';

  // Load previously stored UTMs (from an earlier page in this session)
  var stored = {};
  try { stored = JSON.parse(sessionStorage.getItem(STORE_KEY) || '{}'); } catch (e) {}

  // Override with any UTMs present in the current URL
  var params = new URLSearchParams(window.location.search);
  var found = false;
  UTM_KEYS.forEach(function (k) {
    if (params.has(k)) { stored[k] = params.get(k); found = true; }
  });
  if (found || Object.keys(stored).length) {
    try { sessionStorage.setItem(STORE_KEY, JSON.stringify(stored)); } catch (e) {}
  }

  // Inject hidden inputs into all Netlify forms so FormData picks them up automatically
  function inject() {
    document.querySelectorAll('form[data-netlify="true"]').forEach(function (form) {
      UTM_KEYS.forEach(function (k) {
        if (!form.querySelector('[name="' + k + '"]')) {
          var inp = document.createElement('input');
          inp.type = 'hidden';
          inp.name = k;
          inp.value = stored[k] || '';
          form.appendChild(inp);
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
