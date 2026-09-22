/* Central article registry + auto related-reading picker.
   Add a new article here (category + tags) and every article page's
   "Related reading" section resolves itself — no manual curation. */
(function () {
  var ARTICLES = [
    { href: 'what-is-lead-scoring.html', title: 'What Is Lead Scoring and How Does It Help Sales Teams Prioritize Leads?', category: 'Data & Reporting', tags: ['lead-scoring', 'prioritization', 'scoring-model'] },
    { href: 'how-to-score-leads-hubspot.html', title: 'How Do You Calculate a Lead Score in HubSpot?', category: 'Data & Reporting', tags: ['lead-scoring', 'fit-score', 'engagement-score', 'formula', 'hubspot'] },
    { href: 'how-to-design-a-fit-score-in-hubspot.html', title: 'How Do You Design a Fit Score in HubSpot Step by Step?', category: 'Data & Reporting', tags: ['fit-score', 'icp', 'scoring-rules', 'hubspot'] },
    { href: 'how-to-use-fit-score-for-crm-cleaning.html', title: 'How Can You Use Fit Score for CRM Cleaning?', category: 'Data & Reporting', tags: ['fit-score', 'crm-cleaning', 'data-hygiene'] },
    { href: 'what-is-engagement-score-hubspot.html', title: "What Is an Engagement Score in HubSpot? A Founder's Guide", category: 'Data & Reporting', tags: ['engagement-score', 'lead-scoring', 'hubspot'] },
    { href: '4-ways-engagement-score-hubspot-lead-scoring.html', title: 'What Are the 4 Best Ways to Use Your HubSpot Engagement Score?', category: 'Automation', tags: ['engagement-score', 'automation', 'routing', 'alerts'] },
    { href: 'what-are-lifecycle-stages-in-hubspot.html', title: 'What Are Lifecycle Stages in HubSpot?', category: 'GTM Systems', tags: ['lifecycle-stages', 'crm', 'hubspot', 'funnel'] },
    { href: 'why-do-you-need-a-crm-early-stage-startup.html', title: 'Why Do You Need a CRM in the Early Stages of a Startup?', category: 'GTM Systems', tags: ['crm', 'startup', 'early-stage'] },
    { href: 'most-used-crms-hubspot-salesforce-dynamics-365.html', title: 'What Are the Most Used CRMs: HubSpot, Salesforce, or Dynamics 365?', category: 'Tooling', tags: ['crm-comparison', 'hubspot', 'salesforce', 'dynamics', 'vendor-comparison'] },
    { href: 'hubspot-agent-builder-vs-workflow-builder-2026.html', title: "Agent Builder vs Workflow Builder: What's the Difference in HubSpot?", category: 'Tooling', tags: ['hubspot', 'automation-builder', 'workflow'] },
    { href: 'api-integration-mistake-breaks-every-migration.html', title: 'What Is the API Integration Mistake That Breaks Every GTM Migration?', category: 'GTM Systems', tags: ['api-integration', 'abstraction-layer', 'migration', 'architecture', 'ipaas'] },
    { href: 'clearbit-vs-zoominfo-vs-apollo-enrichment-provider-comparison.html', title: 'Clearbit vs ZoomInfo vs Apollo: Which Enrichment Provider Should Anchor Your Data Stack?', category: 'Data & Reporting', tags: ['enrichment', 'data-vendor-comparison', 'waterfall', 'crm-integration', 'zoominfo', 'apollo', 'clearbit', 'vendor-comparison'] },
  ];

  window.MUNAP_ARTICLES = ARTICLES;

  function currentSlug() {
    var path = window.location.pathname.split('/').pop();
    return path || '';
  }

  function pickRelated(current, count) {
    var others = ARTICLES.filter(function (a) { return a.href !== current.href; });
    function score(a) {
      var sameCategory = a.category === current.category ? 100 : 0;
      var sharedTags = a.tags.filter(function (t) { return current.tags.indexOf(t) !== -1; }).length;
      return sameCategory + sharedTags * 10;
    }
    return others
      .map(function (a) { return { a: a, s: score(a) }; })
      .sort(function (x, y) { return y.s - x.s; })
      .slice(0, count)
      .map(function (x) { return x.a; });
  }

  var slot = document.getElementById('relatedSlot');
  if (!slot) return;
  var current = ARTICLES.filter(function (a) { return a.href === currentSlug(); })[0];
  if (!current) return;
  var related = pickRelated(current, 2);
  if (!related.length) return;

  slot.innerHTML = '<h2>Related reading</h2>' + related.map(function (a) {
    return '<a href="' + a.href + '" class="related-card"><span class="rc-tag">' + a.category + '</span><span class="rc-title">' + a.title + '</span></a>';
  }).join('');
})();
