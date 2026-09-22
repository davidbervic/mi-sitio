/* Munap shared "wow" interaction layer.
   Loaded on every page via <script src="assets/interactions.js" defer></script>.
   Injects shared skeleton/shimmer styles once, then wires up magnetic buttons
   and a subtle grid-parallax on blue/grid sections. Safe no-ops if the page
   has none of these elements. Respects prefers-reduced-motion throughout. */
(function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var css = [
    '@keyframes nx-shimmer{0%{transform:translateX(-120%)}100%{transform:translateX(120%)}}',
    '.nx-skeleton{position:relative;overflow:hidden;background:rgba(255,255,255,.14);border-radius:7px;isolation:isolate}',
    '.nx-skeleton::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.4),transparent)}',
    '.nx-skeleton.is-dark{background:rgba(5,5,5,.08)}',
    '.nx-skeleton.is-dark::after{background:linear-gradient(90deg,transparent,rgba(5,5,5,.16),transparent)}',
    reduceMotion ? '' : '.nx-skeleton::after{animation:nx-shimmer 1.8s ease-in-out infinite}',
    '[data-magnetic]{will-change:transform}',
    reduceMotion ? '' : '[data-magnetic]{transition:transform .25s cubic-bezier(.2,.9,.3,1)}',
    '.nav-cta{border:1.5px solid var(--nx-ink);box-shadow:var(--nx-drop-sm);gap:7px;transition:transform .12s ease,box-shadow .12s ease}',
    '.nav-cta:hover{transform:translate(-2px,-2px);box-shadow:var(--nx-drop-md)}',
    '.nav-cta:active{transform:translate(3px,3px)!important;box-shadow:none!important}',
    '.site-nav{transition:filter .2s ease}',
    '.site-nav .nav-links{transition:box-shadow .2s ease}',
    '.site-nav.is-scrolled .nav-links{box-shadow:var(--nx-drop-sm)}'
  ].join('\n');

  var styleTag = document.createElement('style');
  styleTag.setAttribute('data-nx-interactions', '');
  styleTag.textContent = css;
  document.head.appendChild(styleTag);

  if (!reduceMotion) {
    document.querySelectorAll('[data-magnetic]').forEach(function (btn) {
      var strength = parseFloat(btn.getAttribute('data-magnetic')) || 0.25;
      btn.addEventListener('mousemove', function (e) {
        var r = btn.getBoundingClientRect();
        var x = (e.clientX - r.left - r.width / 2) * strength;
        var y = (e.clientY - r.top - r.height / 2) * strength;
        btn.style.transform = 'translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px)';
      });
      btn.addEventListener('mouseleave', function () {
        btn.style.transform = '';
      });
    });
  }

  var navEls = document.querySelectorAll('.site-nav');
  if (navEls.length) {
    function updateNavScrolled() {
      var scrolled = window.scrollY > 40;
      navEls.forEach(function (nav) { nav.classList.toggle('is-scrolled', scrolled); });
    }
    window.addEventListener('scroll', updateNavScrolled, { passive: true });
    updateNavScrolled();
  }

  var gridEls = document.querySelectorAll('[data-grid-parallax]');
  if (gridEls.length && !reduceMotion) {
    var ticking = false;
    function updateParallax() {
      gridEls.forEach(function (el) {
        var rect = el.getBoundingClientRect();
        var offset = (rect.top * 0.05).toFixed(1);
        el.style.backgroundPosition = '0 ' + offset + 'px, ' + offset + 'px 0';
      });
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { requestAnimationFrame(updateParallax); ticking = true; }
    }, { passive: true });
    updateParallax();
  }

  // Count-up utility for when real numbers replace skeleton placeholders.
  // Usage: <span data-count-to="120" data-count-suffix="+"></span>
  var counters = document.querySelectorAll('[data-count-to]');
  if (counters.length) {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        counterObserver.unobserve(entry.target);
        var el = entry.target;
        var to = parseFloat(el.getAttribute('data-count-to'));
        var suffix = el.getAttribute('data-count-suffix') || '';
        if (reduceMotion) { el.textContent = to + suffix; return; }
        var start = null;
        var duration = 1200;
        function step(ts) {
          if (!start) start = ts;
          var progress = Math.min(1, (ts - start) / duration);
          var eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(eased * to) + suffix;
          if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }, { threshold: 0.4 });
    counters.forEach(function (el) { counterObserver.observe(el); });
  }
})();
