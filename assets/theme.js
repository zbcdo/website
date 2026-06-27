(function () {
  // 1) set the theme before first paint (prevents a flash of the wrong theme)
  try {
    var t = localStorage.getItem('theme');
    if (t !== 'light' && t !== 'dark') {
      t = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
    }
    document.documentElement.setAttribute('data-theme', t);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'light');
  }

  // 2) wire up the toggle once the DOM is parsed
  function init() {
    var btn = document.getElementById('theme-toggle');
    if (!btn) return;
    function current() { return document.documentElement.getAttribute('data-theme') || 'light'; }
    function label(v) {
      btn.setAttribute('aria-label', v === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
      btn.setAttribute('aria-pressed', String(v === 'dark'));
    }
    label(current());
    btn.addEventListener('click', function () {
      var next = current() === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      label(next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();