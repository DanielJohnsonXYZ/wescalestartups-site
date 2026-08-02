import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const outputUrl = new URL('../dist/founder-led-growth-bottleneck-map.html', import.meta.url);
const outputPath = fileURLToPath(outputUrl);

let html = await readFile(outputPath, 'utf8');

const oldCta = `    <div class="cta-card">
      <h3>Want a personalised founder-led growth teardown?</h3>
      <p>In 5 minutes, we'll show you exactly where your GTM system is leaking — and what to fix first. No pitch. No fluff. Just a clear, specific commercial diagnosis.</p>
      <!-- ✏️  Update the href below to your booking link -->
      <a href="https://wescalestartups.com/contact" class="btn-cta">Book Your Free 5-Minute Teardown →</a>
      <p class="cta-sub">Free · No obligation · With a We Scale Startups senior advisor</p>
    </div>`;

const newCta = `    <div class="cta-card">
      <h3>Want a second opinion on your result?</h3>
      <p>In a free 20-minute Growth Audit, we'll pressure-test the diagnosis, name the biggest commercial constraint, and give you the clearest next move.</p>
      <a href="/book" class="btn-cta" data-cta="bottleneck-map-result-book">Book a Growth Audit →</a>
      <p class="cta-sub">Free · 20 minutes · You'll leave with your biggest growth bottleneck named in plain English</p>
    </div>`;

if (html.includes(oldCta)) {
  html = html.replace(oldCta, newCta);
} else if (!html.includes('data-cta="bottleneck-map-result-book"')) {
  throw new Error('Bottleneck Map CTA markup changed, refusing to apply an unsafe replacement.');
}

if (!html.includes('GTM-TV6C7GS')) {
  const gtmHead = `
  <!-- Google Tag Manager -->
  <script>
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-TV6C7GS');
  </script>
  <!-- End Google Tag Manager -->
`;

  html = html.replace('</head>', `${gtmHead}</head>`);

  const bodyTag = '<body class="theme-wss-v9 standalone-tool">';
  const gtmBody = `${bodyTag}
  <!-- Google Tag Manager (noscript) -->
  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TV6C7GS"
  height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
  <!-- End Google Tag Manager (noscript) -->`;

  if (!html.includes(bodyTag)) {
    throw new Error('Bottleneck Map body markup changed, refusing to insert GTM unsafely.');
  }

  html = html.replace(bodyTag, gtmBody);
}

if (!html.includes('data-wss-bottleneck-tracking')) {
  const tracking = `
<script data-wss-bottleneck-tracking>
(() => {
  window.dataLayer = window.dataLayer || [];
  const scorecardId = 'founder-led-growth-bottleneck-map';
  const push = (event, fields = {}) => window.dataLayer.push({ event, ...fields });

  push('page_context', {
    page_type: 'diagnostic-tool',
    page_name: scorecardId,
    page_path: window.location.pathname
  });

  document.querySelector('.btn-start')?.addEventListener('click', () => {
    push('scorecard_start', { scorecard_id: scorecardId });
  }, { once: true });

  let completionTracked = false;
  const trackCompletion = () => {
    const results = document.getElementById('results-screen');
    if (completionTracked || !results?.classList.contains('active')) return;

    completionTracked = true;
    const resultName = document.querySelector('.result-name')?.textContent?.trim() || '';
    const primaryBottleneck = document.querySelector('.result-primary strong')?.textContent?.trim() || '';
    const riskLevel = document.querySelector('.result-risk')?.textContent?.replace('●', '')?.trim() || '';

    push('form_submit', {
      form_id: 'wss-newsletter',
      form_location: scorecardId
    });

    push('scorecard_complete', {
      scorecard_id: scorecardId,
      result_name: resultName,
      primary_bottleneck: primaryBottleneck,
      risk_level: riskLevel
    });
  };

  const observer = new MutationObserver(trackCompletion);
  observer.observe(document.body, {
    subtree: true,
    attributes: true,
    attributeFilter: ['class']
  });
  trackCompletion();

  document.addEventListener('click', (event) => {
    const cta = event.target.closest('[data-cta]');
    if (!cta) return;

    const ctaId = cta.getAttribute('data-cta') || '';
    push('cta_click', {
      cta_id: ctaId,
      cta_text: cta.textContent?.trim() || '',
      destination: cta.getAttribute('href') || ''
    });

    if (ctaId === 'bottleneck-map-result-book') {
      push('book_call', {
        cta_id: ctaId,
        source_page: scorecardId
      });
    }
  });
})();
</script>
`;

  html = html.replace('</body>', `${tracking}</body>`);
}

const requiredMarkers = [
  'href="/book"',
  'data-cta="bottleneck-map-result-book"',
  'GTM-TV6C7GS',
  "push('scorecard_start'",
  "push('scorecard_complete'",
  "push('book_call'"
];

for (const marker of requiredMarkers) {
  if (!html.includes(marker)) {
    throw new Error(`Bottleneck Map patch failed validation, missing: ${marker}`);
  }
}

await writeFile(outputPath, html, 'utf8');
console.log('Patched founder-led-growth-bottleneck-map.html conversion path and analytics.');
