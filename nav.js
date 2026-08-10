/* Shared mobile-nav hamburger toggle, used site-wide.
   Toggles the .nav-open class on <nav>, which reveals .nav-links
   on mobile (styled by nav.css / blog.css). Closes on outside click.
   The existing Resources dropdown keeps its own inline handler. */
(function () {
  var burger = document.querySelector('.nav-burger');
  var nav = document.querySelector('nav');
  if (!burger || !nav) return;
  function close() {
    nav.classList.remove('nav-open');
    burger.setAttribute('aria-expanded', 'false');
    burger.textContent = '☰';
  }
  burger.addEventListener('click', function (e) {
    e.stopPropagation();
    var open = nav.classList.toggle('nav-open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.textContent = open ? '✕' : '☰';
  });
  document.addEventListener('click', function (e) {
    if (!nav.contains(e.target)) close();
  });
})();
