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

  function setActive(id) {
    links.forEach(function (a) {
      a.classList.toggle('is-active', a.dataset.id === id);
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

  /* ── Related articles ────────────────────────────────────── */
  function esc(str) {
    return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  var relatedSlot = document.getElementById('relatedSlot');
  if (relatedSlot) {
    function renderRelated() {
      var all = window.MUVAP_ARTICLES;
      if (!all) return;

      var currentFile = location.pathname.split('/').pop() || '';
      var current = null;
      for (var i = 0; i < all.length; i++) {
        if (all[i].href === currentFile) { current = all[i]; break; }
      }
      if (!current) return;

      var sorted = all.slice().sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      });

      var same = sorted.filter(function (a) {
        return a.href !== currentFile && a.category === current.category;
      });
      var others = sorted.filter(function (a) {
        return a.href !== currentFile && a.category !== current.category;
      });

      var picks = same.slice(0, 3);
      if (picks.length < 3) {
        picks = picks.concat(others.slice(0, 3 - picks.length));
      }
      if (!picks.length) return;

      var section = document.createElement('section');
      section.className = 'related-full';
      section.innerHTML =
        '<div class="related-full-inner">' +
          '<p class="related-label">Related articles</p>' +
          '<div class="related-grid">' +
          picks.map(function (a) {
            var img = a.img
              ? '<img src="' + esc(a.img) + '" alt="" loading="lazy" width="400" height="225">'
              : '';
            return '<a href="' + esc(a.href) + '" class="related-card">' +
              img +
              '<div class="related-card-body">' +
                '<span class="related-card-tag">' + esc(a.category) + '</span>' +
                '<span class="related-card-title">' + esc(a.title) + '</span>' +
                '<span class="related-card-meta">' + esc(a.readTime) + '</span>' +
              '</div>' +
            '</a>';
          }).join('') +
          '</div>' +
        '</div>';

      var layout = document.querySelector('.article-layout');
      var anchor = layout || article;
      anchor.parentNode.insertBefore(section, anchor.nextSibling);
    }

    if (window.MUVAP_ARTICLES) {
      renderRelated();
    } else {
      var s = document.createElement('script');
      s.src = 'articles-data.js';
      s.onload = renderRelated;
      document.head.appendChild(s);
    }
  }
})();
