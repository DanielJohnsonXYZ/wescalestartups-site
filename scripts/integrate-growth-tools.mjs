import fs from 'node:fs/promises';
import path from 'node:path';
import postcss from 'postcss';

const root = process.cwd();
const sourceRepo = 'https://raw.githubusercontent.com/DanielJohnsonXYZ/wss-growth-machine/a22534f7ae65eddf669a1a9e0b95223de3e896a1/growth-tools-v2';
const toolFiles = ['core.js', 'bottleneck.js', 'customer.js', 'positioning.js', 'leak.js', 'weekly.js'];

const tools = [
  {
    slug: 'growth-dependency',
    id: 'bottleneck',
    title: 'What is keeping growth dependent on you?',
    label: 'Growth dependency diagnostic',
    description: 'Find the commercial capability that still relies on founder knowledge, effort or judgement, then identify the evidence that would prove it has been transferred.',
    time: '4 minutes',
    questions: '12 questions',
    previewTitle: 'Founder-held sales knowledge',
    previewText: 'The strongest sales narrative and objection handling still work best when the founder is personally involved.'
  },
  {
    slug: 'customer-segment',
    id: 'customer',
    title: 'Which customer segment should we prioritise next?',
    label: 'Customer segment prioritisation',
    description: 'Compare two or three real customer segments using evidence, economics, retention and delivery fit, then choose where to focus.',
    time: '6 minutes',
    questions: '7 criteria',
    previewTitle: 'Leading option',
    previewText: 'A prioritised segment, the strongest evidence behind it and the group to deprioritise for now.'
  },
  {
    slug: 'positioning',
    id: 'positioning',
    title: 'How do I explain what my product does?',
    label: 'Positioning and messaging builder',
    description: 'Turn customer evidence into one clear positioning direction, a homepage message and a practical customer test.',
    time: '8 minutes',
    questions: '9 prompts',
    previewTitle: 'A clear working message',
    previewText: 'One positioning foundation, homepage direction, sales introduction and validation plan.'
  },
  {
    slug: 'gtm-leak',
    id: 'leak',
    title: 'Where are we losing customers?',
    label: 'GTM leak diagnostic',
    description: 'Separate volume, conversion and measurement problems across the customer journey, then identify the stage with the greatest likely commercial impact.',
    time: '5 minutes',
    questions: '6 stages',
    previewTitle: 'Activation conversion leak',
    previewText: 'The stage to focus on, the failure type, the primary metric and the next evidence target.'
  },
  {
    slug: 'weekly-focus',
    id: 'weekly',
    title: 'What should I focus on this week?',
    label: 'Weekly constraint planner',
    description: 'Compare the strongest diagnoses, choose one constraint and leave with one evidence target and exactly three actions.',
    time: '5 minutes',
    questions: 'One focused week',
    previewTitle: 'One constraint, not five priorities',
    previewText: 'A Friday evidence target, three time-boxed actions and an explicit defer list.'
  }
];

async function read(rel) {
  return fs.readFile(path.join(root, rel), 'utf8');
}

async function write(rel, content) {
  const file = path.join(root, rel);
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, content);
}

async function fetchText(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Unable to fetch ${url}: ${response.status}`);
  return response.text();
}

function replaceOrThrow(source, search, replacement, label) {
  if (!source.includes(search)) throw new Error(`Could not find ${label}`);
  return source.replace(search, replacement);
}

function replaceRegexOrThrow(source, regex, replacement, label) {
  if (!regex.test(source)) throw new Error(`Could not find ${label}`);
  return source.replace(regex, replacement);
}

function adaptJavaScript(files) {
  let js = files.join('\n\n');

  const routeMap = {
    '/bottleneck': '/resources/growth-dependency',
    '/customer': '/resources/customer-segment',
    '/positioning': '/resources/positioning',
    '/leak': '/resources/gtm-leak',
    '/weekly': '/resources/weekly-focus'
  };

  js = js.replace(
    "const ROUTES = ['/', '/bottleneck', '/customer', '/positioning', '/leak', '/weekly'];",
    "const ROUTES = ['/resources/growth-dependency', '/resources/customer-segment', '/resources/positioning', '/resources/gtm-leak', '/resources/weekly-focus'];"
  );

  for (const [oldRoute, newRoute] of Object.entries(routeMap)) {
    js = js.replaceAll(`'${oldRoute}'`, `'${newRoute}'`);
    js = js.replaceAll(`\"${oldRoute}\"`, `\"${newRoute}\"`);
  }

  js = replaceRegexOrThrow(
    js,
    /function track\(name,data=\{\}\)\{[\s\S]*?\n\}/,
    `function track(name,data={}){\n  try{\n    const event=String(name).trim().toLowerCase().replace(/[^a-z0-9]+/g,'_').replace(/^_|_$/g,'');\n    window.dataLayer=window.dataLayer||[];\n    window.dataLayer.push({event,tool_id:data.tool||currentTool()||'collection',tool_source:data.source||'',tool_result:data.result||'',tool_confidence:data.confidence||'',tool_stage:data.stage||'',tool_destination:data.destination||'',imported_results:Number(data.imported||0),page_path:location.pathname});\n  }catch(e){}\n}`,
    'analytics function'
  );

  js = replaceRegexOrThrow(
    js,
    /function currentPath\(\)\{[\s\S]*?window\.addEventListener\('popstate',[\s\S]*?\);/,
    `function currentPath(){return ROUTES.includes(location.pathname)?location.pathname:ROUTES[0];}\nfunction currentTool(){return Object.keys(TOOL_META).find(k=>TOOL_META[k].route===currentPath())||'bottleneck';}\nfunction go(path,source='navigation'){\n  const destination=ROUTES.includes(path)?path:'/resources#growth-tools';\n  const tool=Object.keys(TOOL_META).find(k=>TOOL_META[k].route===destination);\n  if(tool)track('Next Tool Selected',{tool:currentTool(),source,destination:tool});\n  window.location.assign(destination);\n}`,
    'route navigation block'
  );

  js = replaceRegexOrThrow(
    js,
    /function header\(\)\{[\s\S]*?function completed\(tool\)/,
    `function layout(content){return \`<div class=\"growth-tool-app\">\${content}</div>\`;}\nfunction completed(tool)`,
    'standalone header and footer'
  );

  js = js.replaceAll('<h1>', '<h2>').replaceAll('</h1>', '</h2>');
  js = js.replaceAll('class="micro">← All tools</a>', 'class="micro">← All growth tools</a>');
  js = js.replaceAll('href="/" data-route="/" class="micro"', 'href="/resources#growth-tools" class="micro"');
  js = js.replaceAll('href="https://wescalestartups.com/contact" target="_blank" rel="noopener"', 'href="/book"');
  js = js.replaceAll('Talk it through with Daniel →', 'Bring this to a Growth Audit →');

  const renderBlock = `function render(){\n  const path=currentPath();\n  if(path==='/resources/growth-dependency'){app.innerHTML=bottleneckResult();return;}\n  if(path==='/resources/customer-segment'){app.innerHTML=customerResult();return;}\n  if(path==='/resources/positioning'){app.innerHTML=positioningResult();return;}\n  if(path==='/resources/gtm-leak'){app.innerHTML=leakResult();return;}\n  if(path==='/resources/weekly-focus'){app.innerHTML=weeklyResult();return;}\n  app.innerHTML=bottleneckResult();\n}`;
  js = replaceRegexOrThrow(js, /function render\(\)\{[\s\S]*?\n\}/, renderBlock, 'render router');

  js = js.replace(
    'Object.assign(window,{state,copyText,restartTool,track,renderPositioning,renderPositionReview,renderWeekly});\nrender();',
    `Object.assign(window,{state,copyText,restartTool,track,renderPositioning,renderPositionReview,renderWeekly});\nrender();\ntrack('Tool Viewed',{tool:currentTool(),source:'resources'});`
  );

  return js;
}

async function scopeCss(css) {
  const parsed = postcss.parse(css);
  parsed.walkRules((rule) => {
    if (rule.parent?.type === 'atrule' && /keyframes$/i.test(rule.parent.name)) return;
    rule.selectors = rule.selectors.map((selector) => {
      const s = selector.trim();
      if (s === ':root' || s === 'html' || s === 'body') return '#growth-tool-app';
      if (s === '*') return '#growth-tool-app, #growth-tool-app *';
      if (s.startsWith('body ')) return `#growth-tool-app ${s.slice(5)}`;
      if (s.startsWith('html ')) return `#growth-tool-app ${s.slice(5)}`;
      return `#growth-tool-app ${s}`;
    });
  });
  return `${parsed.toString()}\n\n#growth-tool-app .tool-intro h2,#growth-tool-app .result-head h2{font-size:clamp(2.55rem,5.4vw,4.4rem);line-height:1;letter-spacing:-.055em;margin:1.1rem 0 1.25rem;}\n#growth-tool-app .growth-tool-app{padding-bottom:1rem;}\n`;
}

const component = `---
import BaseLayout from "../layouts/BaseLayout.astro";
import "../styles/growth-tools.css";

interface Props {
  slug: string;
  id: string;
  title: string;
  label: string;
  description: string;
  time: string;
  questions: string;
  previewTitle: string;
  previewText: string;
}

const { slug, id, title, label, description, time, questions, previewTitle, previewText } = Astro.props;
const route = \`/resources/\${slug}\`;
---

<BaseLayout
  title={\`${title} | Free WSS Growth Tool\`}
  description={description}
  path={route}
  breadcrumbItems={[{ name: "Home", path: "/" }, { name: "Resources", path: "/resources" }, { name: title, path: route }]}
  stickyBookCta={false}
  showAnnouncement={false}
  bodyClass="growth-tool-page"
>
  <section class="page-hero growth-tool-page-hero">
    <div class="shell growth-tool-hero-grid">
      <div>
        <p class="eyebrow">{label}</p>
        <h1>{title}</h1>
        <p class="growth-tool-lede">{description}</p>
        <div class="growth-tool-meta" aria-label="Tool details">
          <span>{time}</span>
          <span>{questions}</span>
          <span>No sign-up</span>
          <span>Private in this browser</span>
        </div>
        <div class="hero-actions">
          <a class="button button-brand" href="#growth-tool-start" data-cta={\`growth-tool-hero-start-\${id}\`}>Start the tool ↓</a>
          <a class="button button-light" href="/resources#growth-tools">Explore all five tools →</a>
        </div>
      </div>
      <aside class="growth-tool-preview" aria-label="Example result">
        <p class="card-kicker">Example result</p>
        <h2>{previewTitle}</h2>
        <p>{previewText}</p>
        <div class="growth-tool-preview-flow" aria-hidden="true">
          <span>Evidence</span><i>→</i><span>Decision</span><i>→</i><span>Action</span>
        </div>
      </aside>
    </div>
  </section>

  <section id="growth-tool-start" class="growth-tool-stage" data-tool={id}>
    <div id="growth-tool-app">
      <div id="app" aria-live="polite"><p class="growth-tool-loading">Loading the tool…</p></div>
      <div id="toast" class="toast" role="status" aria-live="polite">Copied</div>
    </div>
  </section>

  <noscript><p class="shell">This tool requires JavaScript to save progress and calculate the result.</p></noscript>
  <script is:inline src="/growth-tools/app.js"></script>
</BaseLayout>

<style>
  .growth-tool-page-hero { padding-block: clamp(3.5rem, 7vw, 6.5rem); }
  .growth-tool-hero-grid { display:grid;grid-template-columns:minmax(0,1.08fr) minmax(320px,.72fr);gap:clamp(2.5rem,6vw,6rem);align-items:center; }
  .growth-tool-page-hero h1 { max-width:14ch;font-size:clamp(3rem,5.4vw,5.6rem); }
  .growth-tool-lede { max-width:62ch;font-size:clamp(1.05rem,1.8vw,1.25rem); }
  .growth-tool-meta { display:flex;flex-wrap:wrap;gap:.55rem;margin-top:1.5rem; }
  .growth-tool-meta span { border:1px solid var(--border);border-radius:999px;padding:.45rem .72rem;background:rgba(255,255,255,.58);font-size:.78rem;font-weight:700; }
  .growth-tool-preview { border:1px solid var(--border);border-radius:1.25rem;background:var(--surface);padding:clamp(1.4rem,3vw,2.1rem);box-shadow:var(--shadow-soft); }
  .growth-tool-preview h2 { margin:.5rem 0 .75rem;font-size:clamp(1.7rem,3vw,2.55rem); }
  .growth-tool-preview p:not(.card-kicker) { color:var(--muted); }
  .growth-tool-preview-flow { display:flex;align-items:center;flex-wrap:wrap;gap:.5rem;margin-top:1.4rem; }
  .growth-tool-preview-flow span { border-radius:999px;background:var(--surface-muted);padding:.45rem .65rem;font-size:.72rem;font-weight:800; }
  .growth-tool-preview-flow i { color:var(--muted);font-style:normal; }
  .growth-tool-stage { scroll-margin-top:7rem;padding:clamp(1rem,3vw,2rem) 0 clamp(4rem,8vw,7rem);background:linear-gradient(180deg,var(--surface-muted),transparent 24rem); }
  .growth-tool-loading { text-align:center;padding:4rem 1rem;color:var(--muted); }
  @media(max-width:820px){.growth-tool-hero-grid{grid-template-columns:1fr}.growth-tool-page-hero h1{max-width:none}.growth-tool-preview{max-width:42rem}}
</style>
`;

const dynamicPage = `---
import GrowthToolPage from "../../components/GrowthToolPage.astro";

const tools = ${JSON.stringify(tools, null, 2)} as const;

export function getStaticPaths() {
  return tools.map((tool) => ({ params: { tool: tool.slug }, props: tool }));
}

const tool = Astro.props;
---

<GrowthToolPage {...tool} />
`;

function toolsArraySource() {
  return `const diagnosticTools = [\n${tools.map((tool, index) => `  {\n    href: \"/resources/${tool.slug}\",\n    title: \"${tool.title.replaceAll('"', '\\"')}\",\n    audience: \"${tool.label}\",\n    description: \"${tool.description.replaceAll('"', '\\"')}\",\n    time: \"${tool.time}\",\n    featured: ${index === 0}\n  }`).join(',\n')}\n] as const;`;
}

function toolsSectionSource() {
  return `  <section class="section section-alt" id="growth-tools">\n    <div class="shell">\n      <SectionIntro\n        eyebrow="Interactive growth tools"\n        title="Start with the decision holding growth back."\n        body="Five connected tools to diagnose the constraint, clarify the evidence and choose what to do next. No sign-up is required, and completed results carry into the Weekly Focus Planner."\n      />\n      {diagnosticTools.filter((tool) => tool.featured).map((tool) => (\n        <article class="growth-tool-featured">\n          <div>\n            <p class="card-kicker">Recommended starting point</p>\n            <h3><a href={tool.href}>{tool.title}</a></h3>\n            <p>{tool.description}</p>\n            <div class="growth-tool-card-meta"><span>{tool.time}</span><span>Immediate result</span><span>No email gate</span></div>\n            <a class="button button-brand" href={tool.href} data-cta="resources-growth-tool-featured">Run the diagnostic →</a>\n          </div>\n          <div class="growth-tool-featured-preview" aria-hidden="true">\n            <span>Strongest signal</span>\n            <strong>Founder-held sales knowledge</strong>\n            <p>See the evidence, the success condition and the recommended next tool.</p>\n          </div>\n        </article>\n      ))}\n      <div class="growth-tool-card-grid">\n        {diagnosticTools.filter((tool) => !tool.featured).map((tool, index) => (\n          <article class="feature-card growth-tool-card">\n            <p class="card-kicker">0{index + 2} · {tool.audience}</p>\n            <h3><a href={tool.href}>{tool.title}</a></h3>\n            <p>{tool.description}</p>\n            <div class="growth-tool-card-meta"><span>{tool.time}</span><span>Private in your browser</span></div>\n            <a class="card-link" href={tool.href} data-cta={\`resources-growth-tool-\${index + 2}\`}>Use the tool →</a>\n          </article>\n        ))}\n      </div>\n    </div>\n  </section>\n\n`;
}

async function updateResourcesPage() {
  const rel = 'src/pages/resources/index.astro';
  let source = await read(rel);
  source = replaceRegexOrThrow(source, /const diagnosticTools = \[[\s\S]*?\] as const;/, toolsArraySource(), 'diagnostic tools data');
  source = source.replace('href="#guides" data-cta="resources-browse"', 'href="#growth-tools" data-cta="resources-browse"');
  source = source.replace('Browse the resource library ↓', 'Explore the growth tools ↓');
  source = source.replace('href={siteConfig.scorecardUrl} data-cta="resources-scorecard"', 'href="/resources/growth-dependency" data-cta="resources-scorecard"');
  source = source.replace('Take the Growth Bottleneck Scorecard', 'Start the Growth Dependency Diagnostic');
  source = replaceRegexOrThrow(source, /  <section class="section">\n    <div class="shell">\n      <SectionIntro\n        eyebrow="Interactive diagnostics"[\s\S]*?  <\/section>\n\n/, '', 'old interactive diagnostics section');
  source = replaceOrThrow(source, '  <section class="section" id="guides">', `${toolsSectionSource()}  <section class="section" id="guides">`, 'guides section insertion point');
  const extraStyles = `\n  .growth-tool-featured { display:grid;grid-template-columns:minmax(0,1.15fr) minmax(280px,.65fr);gap:clamp(2rem,5vw,5rem);align-items:center;border:1px solid var(--border);border-radius:1.5rem;padding:clamp(1.6rem,4vw,3.2rem);background:var(--surface);box-shadow:var(--shadow-soft);margin-bottom:1rem; }\n  .growth-tool-featured h3 { max-width:18ch;font-size:clamp(2rem,4vw,3.5rem);margin:.55rem 0 1rem; }\n  .growth-tool-featured p { max-width:62ch; }\n  .growth-tool-featured-preview { border-radius:1.1rem;padding:1.45rem;background:var(--ink);color:white; }\n  .growth-tool-featured-preview span { display:block;color:rgba(255,255,255,.65);font-size:.72rem;text-transform:uppercase;letter-spacing:.08em;font-weight:800; }\n  .growth-tool-featured-preview strong { display:block;font-family:var(--font-display);font-size:clamp(1.45rem,3vw,2.2rem);line-height:1.05;margin:.7rem 0; }\n  .growth-tool-featured-preview p { color:rgba(255,255,255,.76);margin-bottom:0; }\n  .growth-tool-card-grid { display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1rem; }\n  .growth-tool-card { display:flex;flex-direction:column;min-height:19rem; }\n  .growth-tool-card .card-link { margin-top:auto; }\n  .growth-tool-card-meta { display:flex;flex-wrap:wrap;gap:.45rem;margin:1rem 0 1.25rem; }\n  .growth-tool-card-meta span { border-radius:999px;background:var(--surface-muted);padding:.38rem .6rem;font-size:.72rem;font-weight:750; }\n  @media(max-width:780px){.growth-tool-featured,.growth-tool-card-grid{grid-template-columns:1fr}.growth-tool-card{min-height:auto}}\n`;
  const closingStyle = source.lastIndexOf('</style>');
  if (closingStyle < 0) throw new Error('Could not find resources page style block');
  source = `${source.slice(0, closingStyle)}${extraStyles}${source.slice(closingStyle)}`;
  await write(rel, source);
}

async function updateHeader() {
  const rel = 'src/components/SiteHeader.astro';
  let source = await read(rel);
  source = replaceOrThrow(
    source,
    `      { href: siteConfig.scorecardUrl, label: "Growth Bottleneck Scorecard", note: "10 questions, 5 minutes" },\n      { href: "/resources", label: "Templates & tools", note: "Free frameworks and checklists" },`,
    `      { href: "/resources#growth-tools", label: "Growth tools", note: "Five connected diagnostics" },\n      { href: siteConfig.scorecardUrl, label: "Growth Bottleneck Scorecard", note: "10 questions, 5 minutes" },\n      { href: "/resources", label: "Templates & guides", note: "Free frameworks and checklists" },`,
    'resources navigation items'
  );
  await write(rel, source);
}

async function updateSitemap() {
  const rel = 'src/pages/sitemap.xml.ts';
  let source = await read(rel);
  source = replaceOrThrow(
    source,
    `      "/resources",\n      "/reports",`,
    `      "/resources",\n      "/resources/growth-dependency",\n      "/resources/customer-segment",\n      "/resources/positioning",\n      "/resources/gtm-leak",\n      "/resources/weekly-focus",\n      "/reports",`,
    'sitemap resources paths'
  );
  await write(rel, source);
}

async function updateRedirects() {
  const rel = 'public/_redirects';
  let source = await read(rel);
  const rules = `\n# Consolidated WSS Growth Tools\n/founder-led-growth-bottleneck-map /resources/growth-dependency 301\n/founder-led-growth-bottleneck-map/ /resources/growth-dependency 301\n`;
  if (!source.includes('/founder-led-growth-bottleneck-map /resources/growth-dependency')) {
    source = source.replace('# Legacy contact path', `${rules}\n# Legacy contact path`);
  }
  await write(rel, source);
}

async function main() {
  const [jsFiles, css] = await Promise.all([
    Promise.all(toolFiles.map((file) => fetchText(`${sourceRepo}/${file}`))),
    fetchText(`${sourceRepo}/styles.css`)
  ]);

  await Promise.all([
    write('public/growth-tools/app.js', adaptJavaScript(jsFiles)),
    write('src/styles/growth-tools.css', await scopeCss(css)),
    write('src/components/GrowthToolPage.astro', component),
    write('src/pages/resources/[tool].astro', dynamicPage)
  ]);

  await updateResourcesPage();
  await updateHeader();
  await updateSitemap();
  await updateRedirects();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
