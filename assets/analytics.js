(function () {
  window.dataLayer = window.dataLayer || [];

  // Derive a short page identifier from the pathname for lead_source / page_location
  function pageId() {
    var p = window.location.pathname.replace(/\/$/, '').split('/').pop() || 'home';
    return p.replace('.html', '') || 'home';
  }

  // 1. Calendly booking confirmation
  // Fires ONLY when the user completes a booking, not when the popup opens.
  window.addEventListener('message', function (e) {
    if (e.data && e.data.event === 'calendly.event_scheduled') {
      window.dataLayer.push({
        event:       'meeting_booked',
        lead_source: pageId()
      });
    }
  });

  // 2. WhatsApp outbound clicks — covers every wa.me link on the page, now and future.
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href*="wa.me"]');
    if (!a) return;
    window.dataLayer.push({
      event:         'outbound_clicked',
      destination:   'whatsapp',
      page_location: pageId()
    });
  });
})();
