(function () {
  'use strict';

  /* ── Reading progress bar ─────────────────────────────────── */
  var bar = document.getElementById('readProgress');
  if (bar) {
    window.addEventListener('scroll', function () {
      var scrollTop = window.scrollY;
      var docH = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (docH > 0 ? (scrollTop / docH) * 100 : 0) + '%';
    }, { passive: true });
  }

  /* ── Sticky TOC sidebar ───────────────────────────────────── */
  var article = document.querySelector('article');
  if (!article) return;

  // Collect h2s that have an id (skip h2 inside .sources / footer)
  var headings = Array.from(article.querySelectorAll('h2[id]'));
  if (headings.length < 2) return;

  // Strip the CSS counter text (::before) — textContent is clean already
  function headingText(h) {
    return h.textContent.trim();
  }

  // Build sidebar element
  var sidebar = document.createElement('aside');
  sidebar.className = 'article-toc-sidebar';
  sidebar.setAttribute('aria-label', 'Table of contents');

  var listItems = headings.map(function (h, i) {
    return '<li class="toc-sb-item">' +
      '<a href="#' + h.id + '" class="toc-sb-link" data-id="' + h.id + '">' +
        '<span class="toc-sb-num">' + String(i + 1).padStart(2, '0') + '</span>' +
        '<span class="toc-sb-text">' + headingText(h) + '</span>' +
      '</a>' +
    '</li>';
  }).join('');

  sidebar.innerHTML =
    '<div class="toc-sb-inner">' +
      '<p class="toc-sb-label">Table of contents</p>' +
      '<nav><ol class="toc-sb-list">' + listItems + '</ol></nav>' +
    '</div>';

  // Wrap article + sidebar in a grid container
  var wrapper = document.createElement('div');
  wrapper.className = 'article-layout';
  article.parentNode.insertBefore(wrapper, article);
  wrapper.appendChild(sidebar);
  wrapper.appendChild(article);

  /* ── Active-section highlighting ─────────────────────────── */
  var links = Array.from(sidebar.querySelectorAll('.toc-sb-link'));
  var inner = sidebar.querySelector('.toc-sb-inner');

  function setActive(id) {
    links.forEach(function (a) {
      var active = a.dataset.id === id;
      a.classList.toggle('is-active', active);
      if (active && inner) {
        // Scroll sidebar so active link is visible
        var aTop = a.offsetTop - inner.offsetTop;
        var iH = inner.clientHeight;
        if (aTop < inner.scrollTop + 20 || aTop > inner.scrollTop + iH - 40) {
          inner.scrollTo({ top: aTop - iH / 2, behavior: 'smooth' });
        }
      }
    });
  }

  function updateActive() {
    // Find the last heading whose top edge is above the 30% mark of the viewport
    var threshold = window.scrollY + window.innerHeight * 0.3;
    var active = headings[0];
    for (var i = 0; i < headings.length; i++) {
      if (headings[i].getBoundingClientRect().top + window.scrollY <= threshold) {
        active = headings[i];
      }
    }
    setActive(active.id);
  }

  // Start with first heading active
  if (headings.length) setActive(headings[0].id);

  window.addEventListener('scroll', updateActive, { passive: true });
  updateActive();

  // Smooth scroll on click
  links.forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      var target = document.getElementById(a.dataset.id);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();
