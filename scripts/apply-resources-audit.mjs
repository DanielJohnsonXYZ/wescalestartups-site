// Trigger Resources audit after PR creation.
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const write = (file, content) => {
  const full = path.join(root, file);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content.endsWith("\n") ? content : content + "\n");
};
const remove = (file) => {
  const full = path.join(root, file);
  if (fs.existsSync(full)) fs.rmSync(full);
};
const replaceOnce = (source, oldValue, newValue, label) => {
  if (!source.includes(oldValue)) {
    throw new Error(`Could not find ${label}`);
  }
  return source.replace(oldValue, newValue);
};
const replaceAll = (source, oldValue, newValue) => source.split(oldValue).join(newValue);

const alreadyApplied = fs.existsSync(path.join(root, "src/data/growthTools.ts"))
  && fs.existsSync(path.join(root, "scripts/verify-resources.mjs"));
if (alreadyApplied && !process.argv.includes("--force")) {
  console.log("Resources audit source already materialised.");
  process.exit(0);
}

const growthToolsData = `export const growthTools = [
  {
    slug: "growth-dependency",
    id: "bottleneck",
    number: "01",
    title: "What is keeping growth dependent on you?",
    label: "Growth Bottleneck Scorecard",
    description:
      "Find the commercial capability that still relies on founder knowledge, effort or judgement, then identify the evidence that would prove it has been transferred.",
    time: "4 minutes",
    questions: "12 questions",
    previewTitle: "Founder-held sales knowledge",
    previewText:
      "The strongest sales narrative and objection handling still work best when the founder is personally involved.",
    bestFor:
      "Post-PMF B2B SaaS and AI teams where growth still slows down when the founder steps away.",
    assesses: [
      "Founder-held sales knowledge",
      "Positioning clarity",
      "Pipeline consistency",
      "Customer proof",
      "Commercial learning rhythm",
      "Hiring readiness"
    ],
    resultIncludes: [
      "The strongest current dependency",
      "The evidence behind the diagnosis",
      "A measurable transfer condition",
      "Three actions to reduce the dependency"
    ],
    nextHref: "/resources/customer-segment",
    nextLabel: "Prioritise the next customer segment"
  },
  {
    slug: "customer-segment",
    id: "customer",
    number: "02",
    title: "Which customer segment should we prioritise next?",
    label: "Customer Segment Prioritisation",
    description:
      "Compare two or three real customer segments using evidence, economics, retention and delivery fit, then choose where to focus.",
    time: "6 minutes",
    questions: "7 criteria",
    previewTitle: "Leading option",
    previewText:
      "A prioritised segment, the strongest evidence behind it and the group to deprioritise for now.",
    bestFor:
      "Teams with several plausible customer groups and too little evidence to justify spreading acquisition across all of them.",
    assesses: [
      "Observed demand",
      "Problem urgency",
      "Commercial value",
      "Retention evidence",
      "Access to the buyer",
      "Delivery fit",
      "Confidence gaps"
    ],
    resultIncludes: [
      "A ranked segment shortlist",
      "The strongest and weakest evidence",
      "A clear deprioritisation decision",
      "The next evidence to collect"
    ],
    nextHref: "/resources/positioning",
    nextLabel: "Build the positioning for that segment"
  },
  {
    slug: "positioning",
    id: "positioning",
    number: "03",
    title: "How do I explain what my product does?",
    label: "Positioning and Messaging Builder",
    description:
      "Turn customer evidence into one clear positioning direction, a homepage message and a practical customer test.",
    time: "8 minutes",
    questions: "9 prompts",
    previewTitle: "A clear working message",
    previewText:
      "One positioning foundation, homepage direction, sales introduction and validation plan.",
    bestFor:
      "Founders who know the product well but struggle to explain it simply, consistently and in the customer's language.",
    assesses: [
      "Target customer specificity",
      "Trigger and problem clarity",
      "Desired outcome",
      "Current alternatives",
      "Differentiation",
      "Evidence and proof",
      "Message testability"
    ],
    resultIncludes: [
      "A positioning foundation",
      "Homepage headline and subheadline",
      "A short sales introduction",
      "An outreach opener",
      "A seven-day validation plan"
    ],
    nextHref: "/resources/gtm-leak",
    nextLabel: "Find where the GTM journey is leaking"
  },
  {
    slug: "gtm-leak",
    id: "leak",
    number: "04",
    title: "Where are we losing customers?",
    label: "GTM Leak Diagnostic",
    description:
      "Separate volume, conversion and measurement problems across the customer journey, then identify the stage with the greatest likely commercial impact.",
    time: "5 minutes",
    questions: "6 stages",
    previewTitle: "Activation conversion leak",
    previewText:
      "The stage to focus on, the failure type, the primary metric and the next evidence target.",
    bestFor:
      "Teams with activity across the funnel but no shared view of which stage is creating the largest commercial loss.",
    assesses: [
      "Reach and qualified demand",
      "Lead conversion",
      "Sales progression",
      "Activation",
      "Retention",
      "Measurement confidence"
    ],
    resultIncludes: [
      "The highest-priority leak",
      "Whether it is volume, conversion or measurement",
      "The primary metric to watch",
      "A focused evidence target"
    ],
    nextHref: "/resources/weekly-focus",
    nextLabel: "Turn the diagnosis into this week's plan"
  },
  {
    slug: "weekly-focus",
    id: "weekly",
    number: "05",
    title: "What should I focus on this week?",
    label: "Weekly Constraint Planner",
    description:
      "Compare the strongest diagnoses, choose one constraint and leave with one evidence target and exactly three actions.",
    time: "5 minutes",
    questions: "One focused week",
    previewTitle: "One constraint, not five priorities",
    previewText:
      "A Friday evidence target, three time-boxed actions and an explicit defer list.",
    bestFor:
      "Founders and growth teams with several sensible priorities competing for the same week.",
    assesses: [
      "Commercial impact",
      "Urgency",
      "Evidence quality",
      "Ability to act now",
      "Available team capacity"
    ],
    resultIncludes: [
      "One weekly constraint",
      "A Friday evidence target",
      "Exactly three time-boxed actions",
      "An explicit defer list",
      "A Friday review prompt"
    ],
    nextHref: "/book",
    nextLabel: "Pressure-test the plan with WSS"
  }
] as const;

export type GrowthTool = (typeof growthTools)[number];

export const growthToolRoutes = growthTools.map((tool) => \`/resources/\${tool.slug}\`);
`;

const growthToolPage = `---
import BaseLayout from "../layouts/BaseLayout.astro";
import { buildBreadcrumbSchema } from "../lib/schema";
import { absoluteUrl } from "../lib/utils";
import { entityGraph, siteConfig } from "../site";
import "../styles/growth-tools.css";

interface Props {
  slug: string;
  id: string;
  number: string;
  title: string;
  label: string;
  description: string;
  time: string;
  questions: string;
  previewTitle: string;
  previewText: string;
  bestFor: string;
  assesses: readonly string[];
  resultIncludes: readonly string[];
  nextHref: string;
  nextLabel: string;
}

const {
  slug,
  id,
  number,
  title,
  label,
  description,
  time,
  questions,
  previewTitle,
  previewText,
  bestFor,
  assesses,
  resultIncludes,
  nextHref,
  nextLabel
} = Astro.props;
const route = \`/resources/\${slug}\`;
const schemas = [
  buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Resources", path: "/resources" },
    { name: title, path: route }
  ]),
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": \`\${absoluteUrl(route)}#tool\`,
    name: label,
    alternateName: title,
    description,
    url: absoluteUrl(route),
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    inLanguage: "en-GB",
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "GBP",
      availability: "https://schema.org/InStock"
    },
    provider: { "@id": entityGraph.wssOrganization },
    featureList: [...resultIncludes]
  }
];
---

<BaseLayout
  title={\`\${label}: \${title} | WSS\`}
  description={description}
  path={route}
  schema={schemas}
  breadcrumbItems={[
    { name: "Home", path: "/" },
    { name: "Resources", path: "/resources" },
    { name: label, path: route }
  ]}
  lastUpdated={siteConfig.lastUpdated}
  stickyBookCta={false}
  showAnnouncement={false}
  bodyClass="growth-tool-page"
  ogImageAlt={\`\${label} by We Scale Startups\`}
>
  <section class="page-hero growth-tool-page-hero">
    <div class="shell growth-tool-hero-grid">
      <div>
        <p class="eyebrow">{number} · {label}</p>
        <h1>{title}</h1>
        <p class="growth-tool-lede">{description}</p>
        <div class="growth-tool-meta" aria-label="Tool details">
          <span>{time}</span>
          <span>{questions}</span>
          <span>No sign-up</span>
          <span>Private in this browser</span>
        </div>
        <div class="hero-actions">
          <a
            class="button button-brand"
            href="#growth-tool-start"
            data-cta={\`growth-tool-hero-start-\${id}\`}
            data-tool-launch={id}
          >
            Start the tool ↓
          </a>
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

  <section class="section growth-tool-explainer" aria-labelledby="growth-tool-fit">
    <div class="shell">
      <div class="growth-tool-explainer-intro">
        <p class="eyebrow">Before you start</p>
        <h2 id="growth-tool-fit">Use this when the decision matters more than another list of tactics.</h2>
        <p>{bestFor}</p>
      </div>
      <div class="growth-tool-explainer-grid">
        <article class="feature-card">
          <p class="card-kicker">What it assesses</p>
          <ul>
            {assesses.map((item) => <li>{item}</li>)}
          </ul>
        </article>
        <article class="feature-card">
          <p class="card-kicker">What you leave with</p>
          <ul>
            {resultIncludes.map((item) => <li>{item}</li>)}
          </ul>
        </article>
      </div>
      <div class="growth-tool-next-static">
        <div>
          <p class="card-kicker">Connected next step</p>
          <h3>Your result stays in this browser and can feed the next tool.</h3>
        </div>
        <a class="button button-light" href={nextHref} data-cta={\`growth-tool-static-next-\${id}\`}>
          {nextLabel} →
        </a>
      </div>
    </div>
  </section>

  <noscript>
    <section class="section">
      <div class="shell">
        <h2>JavaScript is required for the interactive result.</h2>
        <p>The questions, purpose and expected output remain available above so search engines and visitors can understand the resource before running it.</p>
      </div>
    </section>
  </noscript>
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
  .growth-tool-explainer { border-top:1px solid var(--border); }
  .growth-tool-explainer-intro { max-width:760px; }
  .growth-tool-explainer-intro h2 { max-width:18ch; }
  .growth-tool-explainer-intro > p:last-child { color:var(--muted);font-size:1.05rem; }
  .growth-tool-explainer-grid { display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1rem;margin-top:2rem; }
  .growth-tool-explainer-grid ul { margin:1rem 0 0;padding-left:1.2rem; }
  .growth-tool-explainer-grid li + li { margin-top:.55rem; }
  .growth-tool-next-static { display:flex;align-items:center;justify-content:space-between;gap:1.5rem;margin-top:1rem;padding:1.5rem;border:1px solid var(--border);border-radius:1rem;background:var(--surface-muted); }
  .growth-tool-next-static h3 { max-width:34ch;margin:.35rem 0 0; }
  @media(max-width:820px){
    .growth-tool-hero-grid,.growth-tool-explainer-grid{grid-template-columns:1fr}
    .growth-tool-page-hero h1{max-width:none}
    .growth-tool-preview{max-width:42rem}
    .growth-tool-next-static{align-items:flex-start;flex-direction:column}
  }
</style>
`;

const toolRoute = `---
import GrowthToolPage from "../../components/GrowthToolPage.astro";
import { growthTools } from "../../data/growthTools";

export function getStaticPaths() {
  return growthTools.map((tool) => ({
    params: { tool: tool.slug },
    props: tool
  }));
}

const tool = Astro.props;
---

<GrowthToolPage {...tool} />
`;

const resourcesIndex = `---
import SectionIntro from "../../components/SectionIntro.astro";
import BaseLayout from "../../layouts/BaseLayout.astro";
import { growthTools } from "../../data/growthTools";
import { buildBreadcrumbSchema, buildFaqSchema } from "../../lib/schema";
import { absoluteUrl } from "../../lib/utils";
import { leadMagnets, resourcesRelatedReading, siteConfig } from "../../site";

const resourcesFaqs = [
  {
    question: "Are the growth tools and templates free?",
    answer:
      "Yes. The five interactive tools, downloadable templates and specialist diagnostics are free. The 90-Day Growth Experiment Planner asks for an email so the workbook, field guide and implementation sequence can be delivered."
  },
  {
    question: "Where should I start?",
    answer:
      "Start with the Growth Bottleneck Scorecard if growth still depends on the founder or the team disagrees about the constraint. Use the other tools directly when the immediate decision is customer focus, positioning, funnel leakage or weekly priority."
  },
  {
    question: "Are my answers stored or sent to WSS?",
    answer:
      "The five interactive tools store answers and results only in your current browser. WSS analytics receive tool-level events such as a start or completion, not the written answers."
  },
  {
    question: "Do these resources replace a growth engagement?",
    answer:
      "No. They help you name the problem, collect better evidence and brief the next decision. A Growth Diagnosis is useful when the evidence is disputed, the constraint crosses teams or senior judgement is needed."
  }
];

const templates = leadMagnets.map((magnet) => ({
  ...magnet,
  delivery:
    magnet.id === "90-day-growth-sprint-planner"
      ? "Email delivery"
      : "Instant download"
}));

const specialistDiagnostics = [
  {
    href: "/ai-sameness-scorecard",
    title: "AI Sameness Scorecard",
    audience: "AI positioning",
    description: "Check whether your AI product message sounds meaningfully different or collapses into the same category language as everyone else."
  },
  {
    href: "/hiring-readiness-scorecard",
    title: "Hiring Readiness Scorecard",
    audience: "Team design",
    description: "Work out whether the next growth problem needs a senior leader, specialist execution or a clearer system first."
  },
  {
    href: "/healthtech-buyer-confidence-matrix",
    title: "HealthTech Buyer Confidence Matrix",
    audience: "HealthTech GTM",
    description: "Map the evidence, trust and buying confidence required across complex healthtech stakeholders."
  },
  {
    href: "/portfolio-growth-readiness",
    title: "Portfolio Growth Readiness",
    audience: "VC and portfolio support",
    description: "Identify where a portfolio company needs diagnosis, experiments, acquisition infrastructure or senior growth leadership."
  }
];

const collectionItems = [
  ...growthTools.map((tool) => ({
    name: tool.label,
    description: tool.description,
    path: \`/resources/\${tool.slug}\`
  })),
  ...templates.map((template) => ({
    name: template.title,
    description: template.description,
    path: template.href
  })),
  ...specialistDiagnostics.map((diagnostic) => ({
    name: diagnostic.title,
    description: diagnostic.description,
    path: diagnostic.href
  })),
  {
    name: "Board Growth Report Template",
    description: "A board-ready view of what changed, what shipped and what to scale, stop or fix.",
    path: "/board-growth-report-template"
  },
  {
    name: "Growth Dashboard Template",
    description: "A weekly view tying pipeline, activity and commercial decisions together.",
    path: "/growth-dashboard-template"
  }
];

const resourcesSchema = [
  buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Resources", path: "/resources" }
  ]),
  buildFaqSchema(resourcesFaqs),
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": \`\${absoluteUrl("/resources")}#collection\`,
    name: "Free Startup Growth Tools and Templates",
    description:
      "Free interactive growth tools, templates and diagnostics for post-PMF B2B SaaS and AI teams.",
    url: absoluteUrl("/resources"),
    isPartOf: { "@id": \`\${siteConfig.siteUrl}/#website\` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: collectionItems.length,
      itemListElement: collectionItems.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(item.path),
        name: item.name,
        description: item.description
      }))
    }
  }
];
---

<BaseLayout
  title="Free Startup Growth Tools and Templates | WSS"
  description="Free interactive growth tools, templates and diagnostics for post-PMF B2B SaaS and AI teams. Diagnose the constraint, choose the next move and build a clearer growth system."
  keywords="startup growth tools, B2B SaaS growth diagnostic, growth bottleneck scorecard, positioning tool, GTM diagnostic, startup templates"
  path="/resources"
  schema={resourcesSchema}
  lastUpdated={siteConfig.lastUpdated}
>
  <section class="page-hero resources-hero">
    <div class="shell resources-hero-layout">
      <div class="resources-hero-copy">
        <p class="eyebrow">Free growth resources</p>
        <h1>Tools and templates for teams between <em>traction and scale.</em></h1>
        <p>
          Diagnose the constraint, make the next decision and brief your team with more clarity. Start with an interactive tool, then use the working templates when you need to put the decision into practice.
        </p>
        <div class="hero-actions">
          <a class="button button-dark" href="#growth-tools" data-cta="resources-browse-tools">
            Start with the growth tools ↓
          </a>
          <a class="button button-light" href="#templates" data-cta="resources-browse-templates">
            Browse templates →
          </a>
        </div>
        <nav class="resource-jump-links" aria-label="Resources page sections">
          <a href="#growth-tools">Growth tools</a>
          <a href="#templates">Templates</a>
          <a href="#specialist-diagnostics">Specialist diagnostics</a>
          <a href="#reading">Related reading</a>
        </nav>
      </div>

      <aside class="resource-router" aria-labelledby="resource-router-title">
        <div class="resource-router-head">
          <div>
            <span class="resource-window-dots" aria-hidden="true"><i></i><i></i><i></i></span>
            <span>WSS / Recommended start</span>
          </div>
          <span class="resource-router-status"><i aria-hidden="true"></i> Free</span>
        </div>
        <div class="resource-router-body">
          <p class="resource-router-label">Growth Bottleneck Scorecard</p>
          <h2 id="resource-router-title">Find what still depends on the founder.</h2>
          <p class="resource-router-copy">
            Assess sales knowledge, positioning, pipeline, proof, learning rhythm and hiring readiness before adding more activity.
          </p>
          <div class="resource-router-metrics" aria-label="Scorecard details">
            <span><strong>12</strong> questions</span>
            <span><strong>4</strong> minutes</span>
            <span><strong>£0</strong> cost</span>
          </div>
          <ol class="resource-router-steps">
            <li><span>01</span> Answer honestly</li>
            <li><span>02</span> See the dependency</li>
            <li><span>03</span> Get the next move</li>
          </ol>
          <a class="button resource-router-cta" href="/resources/growth-dependency" data-cta="resources-scorecard">
            Start the scorecard <span aria-hidden="true">↗</span>
          </a>
          <p class="resource-router-note">No email. Answers stay in this browser.</p>
        </div>
      </aside>
    </div>
  </section>

  <section class="section section-alt" id="growth-tools">
    <div class="shell">
      <SectionIntro
        eyebrow="Five connected growth tools"
        title="Move from diagnosis to one focused week."
        body="Use one tool for a specific decision or work through the sequence. Completed results stay in this browser and can feed the Weekly Constraint Planner."
      />
      <ol class="growth-tool-journey" aria-label="Connected growth tool sequence">
        {growthTools.map((tool) => (
          <li>
            <a
              class="growth-tool-journey-card"
              href={\`/resources/\${tool.slug}\`}
              data-resource-link
              data-cta={\`resources-growth-tool-\${tool.number}\`}
            >
              <span class="growth-tool-journey-number">{tool.number}</span>
              <div>
                <p class="card-kicker">{tool.label}</p>
                <h3>{tool.title}</h3>
                <p>{tool.description}</p>
                <div class="growth-tool-card-meta">
                  <span>{tool.time}</span>
                  <span>{tool.questions}</span>
                  <span>No sign-up</span>
                </div>
              </div>
              <span class="growth-tool-journey-arrow" aria-hidden="true">→</span>
            </a>
          </li>
        ))}
      </ol>
    </div>
  </section>

  <section class="section" id="templates">
    <div class="shell">
      <SectionIntro
        eyebrow="Working templates"
        title="Turn the decision into something the team can run."
        body="Every template has a crawlable overview, clear best-fit guidance and an explicit delivery method before you click."
      />
      <div class="grid-3">
        {templates.map((template) => (
          <article class="feature-card resource-template-card">
            <p class="card-kicker">{template.audience}</p>
            <h3><a href={template.href}>{template.title}</a></h3>
            <p>{template.description}</p>
            <div class="growth-tool-card-meta">
              <span>{template.delivery}</span>
              <span>Free</span>
            </div>
            <a
              class="card-link"
              href={template.href}
              data-resource-link
              data-cta={\`resources-template-\${template.id}\`}
            >
              View the resource →
            </a>
          </article>
        ))}
      </div>
    </div>
  </section>

  <section class="section section-alt" id="specialist-diagnostics">
    <div class="shell">
      <SectionIntro
        eyebrow="Specialist diagnostics"
        title="Use these when the context is more specific."
        body="Standalone scorecards for AI differentiation, hiring, healthtech buying confidence and portfolio support."
      />
      <div class="grid-2">
        {specialistDiagnostics.map((diagnostic) => (
          <article class="feature-card">
            <p class="card-kicker">{diagnostic.audience}</p>
            <h3><a href={diagnostic.href}>{diagnostic.title}</a></h3>
            <p>{diagnostic.description}</p>
            <a
              class="card-link"
              href={diagnostic.href}
              data-resource-link
              data-cta={\`resources-specialist-\${diagnostic.href.split("/").pop()}\`}
            >
              Open the diagnostic →
            </a>
          </article>
        ))}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="shell">
      <SectionIntro
        eyebrow="Reporting templates"
        title="Make the weekly and board conversation clearer."
        body="Two practical formats for connecting activity to decisions rather than vanity metrics."
      />
      <div class="grid-2">
        <article class="feature-card">
          <p class="card-kicker">Leadership</p>
          <h3><a href="/board-growth-report-template">Board Growth Report Template</a></h3>
          <p>What changed, what shipped and what to scale, stop or fix, without hiding behind channel activity.</p>
          <a class="card-link" href="/board-growth-report-template" data-resource-link data-cta="resources-board-report">
            View the board template →
          </a>
        </article>
        <article class="feature-card">
          <p class="card-kicker">Measurement</p>
          <h3><a href="/growth-dashboard-template">Growth Dashboard Template</a></h3>
          <p>A weekly view tying pipeline, activity, experiments and commercial decisions together.</p>
          <a class="card-link" href="/growth-dashboard-template" data-resource-link data-cta="resources-growth-dashboard">
            View the dashboard template →
          </a>
        </article>
      </div>
    </div>
  </section>

  <section class="section section-alt" id="reading">
    <div class="shell">
      <SectionIntro
        eyebrow="Related reading"
        title="The thinking behind the tools."
        body="Use these when you need the reasoning, examples and operating principles behind a diagnosis."
      />
      <ul class="related-insights-list">
        {resourcesRelatedReading.map((item) => (
          <li>
            <a class="card-link" href={item.href} data-cta="resources-related-reading">
              {item.label} →
            </a>
          </li>
        ))}
      </ul>
    </div>
  </section>

  <section class="section">
    <div class="shell">
      <SectionIntro eyebrow="FAQ" title="Using the resource hub." />
      <div class="grid-2">
        {resourcesFaqs.map((item) => (
          <article class="feature-card">
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </article>
        ))}
      </div>
    </div>
  </section>

  <section class="cta-band">
    <div class="shell cta-inner">
      <div>
        <p class="eyebrow">Need the diagnosis done with you?</p>
        <h2>Bring the current growth mess.</h2>
        <p>
          In {siteConfig.bookingCallDurationPhrase}, we will identify the binding constraint and the next evidence to collect. No pitch unless there is a clear fit.
        </p>
      </div>
      <div class="hero-actions">
        <a
          class="button button-brand button-with-subcopy"
          href={siteConfig.bookingUrl}
          data-cta="resources-final-book"
          title={siteConfig.bookingCallReassurance}
        >
          <span class="button-label">{siteConfig.bookingLabel}</span>
          <span class="button-subcopy">{siteConfig.bookingSubcopy}</span>
        </a>
        <a class="button button-light" href="/resources/growth-dependency" data-cta="resources-final-scorecard">
          Or, take the free scorecard →
        </a>
      </div>
    </div>
  </section>
</BaseLayout>

<style>
  .resources-hero { padding-block: clamp(4.25rem, 7vw, 6.75rem); }
  .resources-hero-layout { display:grid;grid-template-columns:minmax(0,1.08fr) minmax(360px,.92fr);align-items:center;gap:clamp(3rem,6vw,6.75rem); }
  .resources-hero-copy { min-width:0; }
  .resources-hero .resources-hero-copy h1 { max-width:13ch;font-size:clamp(3.05rem,5.1vw,5.25rem); }
  .resources-hero .resources-hero-copy > p:not(.eyebrow) { max-width:58ch; }
  .resource-jump-links { display:flex;flex-wrap:wrap;gap:.55rem;margin-top:1.5rem; }
  .resource-jump-links a { border:1px solid rgba(255,255,255,.2);border-radius:999px;padding:.45rem .7rem;color:rgba(255,255,255,.78);font-size:.75rem;text-decoration:none; }
  .resource-jump-links a:hover { border-color:rgba(255,255,255,.5);color:#fff; }
  .resource-router { overflow:hidden;border:1px solid rgba(255,255,255,.14);border-radius:1.15rem;background:linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px),#16151d;background-size:32px 32px,32px 32px,auto;box-shadow:0 30px 80px rgba(27,23,52,.22);color:#fff; }
  .resource-router-head { display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:.85rem 1rem;border-bottom:1px solid rgba(255,255,255,.12);color:rgba(255,255,255,.62);font-family:var(--v9-mono);font-size:.62rem;letter-spacing:.08em;text-transform:uppercase; }
  .resource-router-head > div,.resource-router-status { display:flex;align-items:center;gap:.65rem; }
  .resource-window-dots { display:inline-flex;gap:.28rem; }
  .resource-window-dots i,.resource-router-status i { display:block;width:.42rem;height:.42rem;border-radius:50%; }
  .resource-window-dots i:first-child { background:#ff887a; }
  .resource-window-dots i:nth-child(2) { background:#ffc86b; }
  .resource-window-dots i:last-child,.resource-router-status i { background:var(--v9-mint);box-shadow:0 0 12px rgba(200,255,101,.55); }
  .resource-router-body { padding:clamp(1.5rem,3.5vw,2.35rem); }
  .resources-hero .resource-router-label { margin:0 0 .65rem;color:var(--v9-mint);font-family:var(--v9-mono);font-size:.66rem;font-weight:600;letter-spacing:.11em;text-transform:uppercase; }
  .resources-hero .resource-router h2 { max-width:13ch;margin:0;color:#fff;font-family:var(--v9-sans);font-size:clamp(2rem,3.6vw,3.2rem);font-weight:640;line-height:1;letter-spacing:-.045em; }
  .resources-hero .resource-router-copy { margin:1rem 0 1.4rem;color:rgba(255,255,255,.66);font-size:.92rem;line-height:1.6; }
  .resource-router-metrics { display:grid;grid-template-columns:repeat(3,1fr);margin-bottom:1.35rem;border-block:1px solid rgba(255,255,255,.12); }
  .resource-router-metrics span { display:grid;gap:.15rem;padding:.9rem .75rem;border-right:1px solid rgba(255,255,255,.12);color:rgba(255,255,255,.5);font-family:var(--v9-mono);font-size:.58rem;letter-spacing:.07em;text-transform:uppercase; }
  .resource-router-metrics span:first-child { padding-left:0; }
  .resource-router-metrics span:last-child { border-right:0; }
  .resource-router-metrics strong { color:#fff;font-family:var(--v9-sans);font-size:1.25rem;letter-spacing:-.03em; }
  .resource-router-steps { display:grid;gap:.55rem;margin:0 0 1.45rem;padding:0;list-style:none; }
  .resource-router-steps li { display:flex;align-items:center;gap:.8rem;color:rgba(255,255,255,.78);font-size:.82rem; }
  .resource-router-steps span { color:var(--v9-violet-bright);font-family:var(--v9-mono);font-size:.62rem; }
  .resources-hero .resource-router-cta { display:flex;justify-content:space-between;width:100%;min-height:50px;padding:.9rem 1rem;border:1px solid var(--v9-violet);border-radius:999px;background:linear-gradient(135deg,var(--v9-violet-deep),var(--v9-violet));color:#fff;font-size:.77rem;box-shadow:0 16px 36px rgba(77,63,196,.28); }
  .resources-hero .resource-router-cta:hover { transform:translateY(-2px);box-shadow:0 20px 44px rgba(77,63,196,.36); }
  .resources-hero .resource-router-note { margin:.75rem 0 0;color:rgba(255,255,255,.44);font-family:var(--v9-mono);font-size:.58rem;letter-spacing:.05em;text-align:center;text-transform:uppercase; }
  .growth-tool-journey { display:grid;gap:.75rem;margin:0;padding:0;list-style:none; }
  .growth-tool-journey-card { display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:1.25rem;align-items:start;padding:clamp(1.3rem,2.4vw,2rem);border:1px solid var(--border);border-radius:1rem;background:var(--surface);color:inherit;text-decoration:none;transition:transform .18s ease,border-color .18s ease,box-shadow .18s ease; }
  .growth-tool-journey-card:hover { transform:translateY(-2px);border-color:color-mix(in srgb,var(--violet) 45%,var(--border));box-shadow:var(--shadow-soft); }
  .growth-tool-journey-number { color:var(--violet);font-family:var(--v9-mono);font-size:.72rem;font-weight:700; }
  .growth-tool-journey-card h3 { margin:.3rem 0 .65rem;font-size:clamp(1.4rem,2.4vw,2rem); }
  .growth-tool-journey-card p:not(.card-kicker) { max-width:70ch;color:var(--muted); }
  .growth-tool-journey-arrow { align-self:center;font-size:1.4rem; }
  .growth-tool-card-meta { display:flex;flex-wrap:wrap;gap:.45rem;margin-top:1rem; }
  .growth-tool-card-meta span { border-radius:999px;background:var(--surface-muted);padding:.38rem .6rem;font-size:.7rem;font-weight:700; }
  .resource-template-card { display:flex;flex-direction:column; }
  .resource-template-card .card-link { margin-top:auto; }
  @media(max-width:1000px){.resources-hero-layout{grid-template-columns:1fr;gap:2.75rem}.resource-router{width:min(100%,640px)}}
  @media(max-width:680px){.growth-tool-journey-card{grid-template-columns:auto minmax(0,1fr)}.growth-tool-journey-arrow{display:none}.resource-jump-links{display:none}}
  @media(prefers-reduced-motion:reduce){.growth-tool-journey-card{transition:none}}
</style>
`;

const verifyResources = `import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const exists = (file) => fs.existsSync(path.join(root, file));
const failures = [];
const check = (condition, message) => {
  if (!condition) failures.push(message);
};
const htmlPath = (route) => {
  if (route === "/") return "dist/index.html";
  if (/\.(xml|txt)$/.test(route)) return "dist/" + route.replace(/^\//, "");
  return "dist/" + route.replace(/^\//, "") + ".html";
};
const loadHtml = (route) => {
  const file = htmlPath(route);
  check(exists(file), \`Missing generated page: \${route} (\${file})\`);
  return exists(file) ? read(file) : "";
};
const canonical = (html) => html.match(/<link rel="canonical" href="([^"]+)"/)?.[1] || "";
const robots = (html) => html.match(/<meta name="robots" content="([^"]+)"/)?.[1] || "";

check(exists("src/data/growthTools.ts"), "Missing central growthTools data");
const source = read("src/data/growthTools.ts");
const routeMatches = [...source.matchAll(/slug: "([^"]+)"/g)].map((match) => \`/resources/\${match[1]}\`);
check(routeMatches.length === 5, \`Expected 5 growth tools, found \${routeMatches.length}\`);

const hub = loadHtml("/resources");
check(canonical(hub) === "https://wescalestartups.com/resources", "Resources canonical is incorrect");
check(robots(hub).includes("index") && robots(hub).includes("follow"), "Resources hub is not index,follow");
check((hub.match(/<h1[\\s>]/g) || []).length === 1, "Resources hub must have one H1");
check(hub.includes('"@type":"CollectionPage"'), "Resources hub is missing CollectionPage schema");
check(hub.includes('"@type":"ItemList"'), "Resources hub is missing ItemList schema");

for (const route of routeMatches) {
  const html = loadHtml(route);
  check(canonical(html) === \`https://wescalestartups.com\${route}\`, \`\${route} canonical is incorrect\`);
  check(robots(html).includes("index") && robots(html).includes("follow"), \`\${route} is not index,follow\`);
  check((html.match(/<h1[\\s>]/g) || []).length === 1, \`\${route} must have one H1\`);
  check(html.includes('"@type":"WebApplication"'), \`\${route} is missing WebApplication schema\`);
  check(html.includes("What it assesses"), \`\${route} is missing crawlable assessment copy\`);
  check(html.includes("What you leave with"), \`\${route} is missing crawlable result copy\`);
}

const sitemap = loadHtml("/sitemap.xml");
for (const route of routeMatches) {
  check(sitemap.includes(\`<loc>https://wescalestartups.com\${route}</loc>\`), \`Sitemap missing \${route}\`);
}
const deprecatedRoutes = [
  "/resources/growth-bottleneck-scorecard",
  "/resources/founder-led-growth-diagnostic",
  "/founder-led-growth-bottleneck-map"
];
for (const route of deprecatedRoutes) {
  check(!sitemap.includes(\`<loc>https://wescalestartups.com\${route}</loc>\`), \`Deprecated URL remains in sitemap: \${route}\`);
}

const sourceFiles = [];
const collect = (directory) => {
  if (!exists(directory)) return;
  for (const entry of fs.readdirSync(path.join(root, directory), { withFileTypes: true })) {
    const rel = path.join(directory, entry.name);
    if (entry.isDirectory()) collect(rel);
    else if (/\\.(astro|ts|js|mjs|md|mdx|html|json)$/.test(entry.name)) sourceFiles.push(rel);
  }
};
collect("src");
collect("public");
for (const file of sourceFiles) {
  const text = read(file);
  check(!/wss-(growth-tools|founder-bottleneck|ideal-customer|positioning-builder|gtm-leak|weekly-constraint)[^\\s"'<>]*\\.vercel\\.app/i.test(text), \`Legacy Vercel tool URL in \${file}\`);
}
const allowedRedirectFiles = new Set(["functions/_middleware.js", "public/_redirects", "src/lib/sitemapCanonical.ts"]);
for (const file of sourceFiles) {
  if (allowedRedirectFiles.has(file)) continue;
  const text = read(file);
  for (const route of deprecatedRoutes) {
    check(!text.includes(route), \`Deprecated resource URL referenced in \${file}: \${route}\`);
  }
}
check(!exists("src/pages/founder-led-growth-bottleneck-map.astro"), "Duplicate standalone bottleneck page still exists");

const siteSource = read("src/site.ts");
const downloadMatches = [...siteSource.matchAll(/downloadPath:\\s*"([^"]+)"/g)].map((match) => match[1]);
for (const href of downloadMatches) {
  check(exists(path.join("public", href.replace(/^\\//, ""))), \`Missing resource download: \${href}\`);
}

const thanks = loadHtml("/resources/90-day-growth-sprint-planner/thanks");
check(robots(thanks).includes("noindex") && robots(thanks).includes("follow"), "Planner thanks page must be noindex,follow");
for (const href of [
  "/downloads/90-day-growth-experiment-planner.xlsx",
  "/downloads/90-day-growth-experiment-planner-guide.pdf"
]) {
  check(exists(path.join("public", href.replace(/^\\//, ""))), \`Planner delivery file missing: \${href}\`);
  check(thanks.includes(href), \`Planner thanks page is missing delivery link: \${href}\`);
}

if (failures.length) {
  console.error("[resources] audit failed:");
  failures.forEach((failure) => console.error(\`- \${failure}\`));
  process.exit(1);
}
console.log(\`[resources] OK: hub, \${routeMatches.length} tools, sitemap, redirects, downloads and legacy-link guard verified.\`);
`;

write("src/data/growthTools.ts", growthToolsData);
write("src/components/GrowthToolPage.astro", growthToolPage);
write("src/pages/resources/[tool].astro", toolRoute);
write("src/pages/resources/index.astro", resourcesIndex);
write("scripts/verify-resources.mjs", verifyResources);

// Site-wide canonical scorecard and freshness.
let site = read("src/site.ts");
site = replaceAll(site, 'scorecardTagline: "10 questions. 5 minutes. Find the constraint stopping pipeline from becoming predictable."', 'scorecardTagline: "12 questions. 4 minutes. Find the commercial capability that still depends on the founder."');
site = replaceAll(site, 'scorecardUrl: "/resources/growth-bottleneck-scorecard"', 'scorecardUrl: "/resources/growth-dependency"');
site = replaceAll(site, 'lastUpdated: "26 July 2026"', 'lastUpdated: "6 August 2026"');
site = replaceAll(site, 'siteLastModified: "2026-07-26"', 'siteLastModified: "2026-08-06"');
site = replaceAll(site, '"/resources": "2026-07-26"', '"/resources": "2026-08-06"');
site = replaceAll(site, '"/founder-led-growth-bottleneck-map": "2026-07-26",', '');
site = replaceAll(site, '"/resources/growth-bottleneck-scorecard": "2026-05-11",', '');
site = replaceAll(site, '"/resources/founder-led-growth-diagnostic": "2026-05-11",', '');
site = replaceOnce(
  site,
  '  "/resources/90-day-growth-sprint-planner": "2026-05-11",',
  '  "/resources/growth-dependency": "2026-08-06",\n  "/resources/customer-segment": "2026-08-06",\n  "/resources/positioning": "2026-08-06",\n  "/resources/gtm-leak": "2026-08-06",\n  "/resources/weekly-focus": "2026-08-06",\n  "/resources/90-day-growth-sprint-planner": "2026-08-06",',
  "resource lastmod insertion"
);
site = replaceAll(site, '"/resources/growth-bottleneck-scorecard"', '"/resources/growth-dependency"');
site = replaceAll(site, '10 questions, 5 minutes', '12 questions, 4 minutes');
site = replaceAll(site, '10 questions. 5 minutes.', '12 questions. 4 minutes.');
site = site.replace(
  /\n  \{\n    id: "growth-bottleneck-scorecard",[\s\S]*?\n  \},(?=\n  \{\n    id: "90-day-growth-sprint-planner")/,
  ""
);
site = site.replace(
  /\n  \{\n    id: "founder-led-growth-diagnostic",[\s\S]*?\n  \},(?=\n  \{\n    id: "agency-brief-template")/,
  ""
);
write("src/site.ts", site);

// Planner email delivery must match the promise on the page.
let signup = read("src/components/EmailSignup.astro");
signup = replaceOnce(
  signup,
  '  finePrint?: string;\n}',
  '  finePrint?: string;\n  /** Optional same-origin destination after a successful signup. */\n  successRedirect?: string;\n}',
  "EmailSignup successRedirect interface"
);
signup = replaceOnce(
  signup,
  '  finePrint = "No spam. Unsubscribe any time."\n} = Astro.props;',
  '  finePrint = "No spam. Unsubscribe any time.",\n  successRedirect = ""\n} = Astro.props;',
  "EmailSignup successRedirect prop"
);
signup = replaceOnce(
  signup,
  '      data-cio-source-form\n    >',
  '      data-cio-source-form\n      data-success-redirect={successRedirect}\n    >',
  "EmailSignup successRedirect attribute"
);
signup = replaceOnce(
  signup,
  `          if (status) status.textContent = "You're in. Check your inbox.";`,
  `          const successRedirect = form.dataset.successRedirect || "";
          if (status) status.textContent = successRedirect ? "Success. Opening your downloads…" : "You're in. Check your inbox.";
          if (successRedirect) {
            const destination = new URL(successRedirect, window.location.origin);
            if (destination.origin === window.location.origin) window.location.assign(destination.href);
          }`,
  "EmailSignup success redirect handling"
);
write("src/components/EmailSignup.astro", signup);

let magnetPage = read("src/pages/resources/[slug].astro");
magnetPage = replaceOnce(
  magnetPage,
  '  buildFaqSchema(details.faq)\n];',
  '  buildFaqSchema(details.faq),\n  {\n    "@context": "https://schema.org",\n    "@type": "DigitalDocument",\n    name: magnet.title,\n    description: magnet.description,\n    url: `${siteConfig.siteUrl}/resources/${slug}`,\n    inLanguage: "en-GB",\n    isAccessibleForFree: true,\n    publisher: { "@id": `${siteConfig.siteUrl}/#organization` }\n  }\n];',
  "lead magnet DigitalDocument schema"
);
magnetPage = replaceOnce(
  magnetPage,
  '          finePrint={isGrowthExperimentPlanner\n            ? "Includes the five-email planner implementation series. Unsubscribe any time."\n            : "No spam. Unsubscribe any time."}\n        />',
  '          finePrint={isGrowthExperimentPlanner\n            ? "Includes the five-email planner implementation series. Unsubscribe any time."\n            : "No spam. Unsubscribe any time."}\n          successRedirect={isGrowthExperimentPlanner ? "/resources/90-day-growth-sprint-planner/thanks" : undefined}\n        />',
  "planner success redirect prop"
);
magnetPage = replaceAll(magnetPage, 'title="Three questions founders ask before requesting it."', 'title="Questions to check before using it."');
write("src/pages/resources/[slug].astro", magnetPage);

// Fix homepage stage selector links and duration copy.
let stageSelector = read("src/components/StageSelector.astro");
stageSelector = replaceAll(stageSelector, "https://wss-growth-tools.vercel.app/customer", "/resources/customer-segment");
stageSelector = replaceAll(stageSelector, "Find your bottleneck in five minutes", "Find your bottleneck in four minutes");
write("src/components/StageSelector.astro", stageSelector);

// Header navigation should expose one canonical scorecard and clear anchors.
let header = read("src/components/SiteHeader.astro");
header = replaceOnce(
  header,
  '      { href: "/resources#growth-tools", label: "Growth tools", note: "Five connected diagnostics" },\n      { href: siteConfig.scorecardUrl, label: "Growth Bottleneck Scorecard", note: "10 questions, 5 minutes" },\n      { href: "/resources", label: "Templates & guides", note: "Free frameworks and checklists" },',
  '      { href: siteConfig.scorecardUrl, label: "Growth Bottleneck Scorecard", note: "12 questions, 4 minutes" },\n      { href: "/resources#growth-tools", label: "All growth tools", note: "Five connected decisions" },\n      { href: "/resources#templates", label: "Templates & guides", note: "Free working resources" },',
  "Resources navigation"
);
write("src/components/SiteHeader.astro", header);

// Tool integration and accessibility.
let app = read("public/growth-tools/app.js");
app = replaceOnce(
  app,
  'function saveState(){localStorage.setItem(STORAGE_KEY,JSON.stringify(state));}',
  'function saveState(){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state));return true;}catch(e){return false;}}\nfunction scrollToolIntoView(){document.getElementById("growth-tool-start")?.scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"start"});}',
  "safe saveState and tool scrolling"
);
app = replaceOnce(
  app,
  "document.addEventListener('click',e=>{\n  const routeEl=e.target.closest('[data-route]');",
  "document.addEventListener('click',e=>{\n  const target=e.target instanceof Element?e.target:null;\n  if(!target)return;\n  const launch=target.closest('[data-tool-launch]');\n  if(launch){e.preventDefault();const tool=launch.dataset.toolLaunch;if(tool==='bottleneck')startBottleneck();else if(tool==='customer')startCustomer();else if(tool==='positioning')startPositioning();else if(tool==='leak')startLeak();else if(tool==='weekly')startWeekly();requestAnimationFrame(scrollToolIntoView);return;}\n  const routeEl=target.closest('[data-route]');",
  "safe click target and one-click launch"
);
app = replaceAll(app, "const tracked=e.target.closest('[data-track]');", "const tracked=target.closest('[data-track]');");
app = replaceAll(app, "window.scrollTo(0,0);", "scrollToolIntoView();");
app = replaceOnce(
  app,
  'function progress(step,total,title){return `<div class="progress-meta"><strong>${esc(title)}</strong><span>Step ${step+1} of ${total}</span></div><div class="progress-track"><div class="progress-fill" style="width:${Math.round((step+1)/total*100)}%"></div></div>`;}',
  'function progress(step,total,title){const value=step+1;return `<div class="progress-meta"><strong>${esc(title)}</strong><span>Step ${value} of ${total}</span></div><div class="progress-track" role="progressbar" aria-label="${esc(title)}" aria-valuemin="1" aria-valuemax="${total}" aria-valuenow="${value}"><div class="progress-fill" style="width:${Math.round(value/total*100)}%"></div></div>`;}',
  "progress accessibility"
);
app = replaceOnce(
  app,
  `class="option \${selected?'selected':''}" onclick="\${fn}(\${index})"`,
  `class="option \${selected?'selected':''}" aria-pressed="\${selected?'true':'false'}" onclick="\${fn}(\${index})"`,
  "option aria-pressed"
);
write("public/growth-tools/app.js", app);

let growthCss = read("src/styles/growth-tools.css");
if (!growthCss.includes("@media(prefers-reduced-motion:reduce)")) {
  growthCss += '\n@media(prefers-reduced-motion:reduce){#growth-tool-app *,#growth-tool-app *::before,#growth-tool-app *::after{scroll-behavior:auto!important;animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}#growth-tool-app .ticker-track{animation:none!important}}\n';
}
write("src/styles/growth-tools.css", growthCss);

// Canonical redirects, kept aligned across runtime, static hosting and sitemap checks.
let middleware = read("functions/_middleware.js");
middleware = replaceOnce(
  middleware,
  '  const legacyRedirects = {\n',
  '  const legacyRedirects = {\n    "/quiz": "/resources/growth-dependency",\n    "/quiz/": "/resources/growth-dependency",\n    "/resources/growth-bottleneck-scorecard": "/resources/growth-dependency",\n    "/resources/growth-bottleneck-scorecard/": "/resources/growth-dependency",\n    "/resources/founder-led-growth-diagnostic": "/resources/growth-dependency",\n    "/resources/founder-led-growth-diagnostic/": "/resources/growth-dependency",\n    "/founder-led-growth-bottleneck-map": "/resources/growth-dependency",\n    "/founder-led-growth-bottleneck-map/": "/resources/growth-dependency",\n',
  "resource middleware redirects"
);
write("functions/_middleware.js", middleware);

let redirects = read("public/_redirects");
const redirectBlock = `# Consolidated growth diagnosis URLs
/quiz /resources/growth-dependency 301
/quiz/ /resources/growth-dependency 301
/resources/growth-bottleneck-scorecard /resources/growth-dependency 301
/resources/growth-bottleneck-scorecard/ /resources/growth-dependency 301
/resources/founder-led-growth-diagnostic /resources/growth-dependency 301
/resources/founder-led-growth-diagnostic/ /resources/growth-dependency 301
/founder-led-growth-bottleneck-map /resources/growth-dependency 301
/founder-led-growth-bottleneck-map/ /resources/growth-dependency 301

`;
redirects = replaceOnce(redirects, "# Legacy contact path\n", redirectBlock + "# Legacy contact path\n", "static resource redirects");
write("public/_redirects", redirects);

let sitemapCanonical = read("src/lib/sitemapCanonical.ts");
sitemapCanonical = replaceAll(sitemapCanonical, '"/quiz": "/resources/growth-bottleneck-scorecard"', '"/quiz": "/resources/growth-dependency"');
sitemapCanonical = replaceOnce(
  sitemapCanonical,
  '  "/case-studies/marketplace-performance-audit": "/case-studies"\n};',
  '  "/case-studies/marketplace-performance-audit": "/case-studies",\n  "/resources/growth-bottleneck-scorecard": "/resources/growth-dependency",\n  "/resources/founder-led-growth-diagnostic": "/resources/growth-dependency",\n  "/founder-led-growth-bottleneck-map": "/resources/growth-dependency"\n};',
  "sitemap resource redirects"
);
write("src/lib/sitemapCanonical.ts", sitemapCanonical);

let sitemap = read("src/pages/sitemap.xml.ts");
sitemap = replaceOnce(
  sitemap,
  'import { isFinalSitemapPath } from "../lib/sitemapCanonical";',
  'import { growthToolRoutes } from "../data/growthTools";\nimport { isFinalSitemapPath } from "../lib/sitemapCanonical";',
  "growthTools sitemap import"
);
sitemap = replaceAll(
  sitemap,
  '      "/resources/growth-dependency",\n      "/resources/customer-segment",\n      "/resources/positioning",\n      "/resources/gtm-leak",\n      "/resources/weekly-focus",',
  '      ...growthToolRoutes,'
);
sitemap = replaceAll(sitemap, '      "/founder-led-growth-bottleneck-map",\n', '');
write("src/pages/sitemap.xml.ts", sitemap);

// Replace every internal reference with the final canonical route.
const canonicalResourceReplacements = new Map([
  ["/resources/growth-bottleneck-scorecard", "/resources/growth-dependency"],
  ["/resources/founder-led-growth-diagnostic", "/resources/growth-dependency"],
  ["/founder-led-growth-bottleneck-map", "/resources/growth-dependency"],
  ["https://wss-growth-tools.vercel.app/customer", "/resources/customer-segment"]
]);
const canonicalSweepExtensions = /\.(astro|ts|js|mjs|md|mdx|html|json)$/;
const canonicalSweepExcluded = new Set([
  "src/lib/sitemapCanonical.ts",
  "scripts/apply-resources-audit.mjs",
  "scripts/patch-resources-generator.mjs"
]);
const sweepCanonicalLinks = (directory) => {
  const absoluteDirectory = path.join(root, directory);
  if (!fs.existsSync(absoluteDirectory)) return;
  for (const entry of fs.readdirSync(absoluteDirectory, { withFileTypes: true })) {
    const relative = path.join(directory, entry.name).replaceAll(path.sep, "/");
    if (entry.isDirectory()) {
      sweepCanonicalLinks(relative);
      continue;
    }
    if (!canonicalSweepExtensions.test(entry.name) || canonicalSweepExcluded.has(relative)) continue;
    const content = read(relative);
    let updated = content;
    for (const [legacy, canonical] of canonicalResourceReplacements) {
      updated = updated.split(legacy).join(canonical);
    }
    if (updated !== content) write(relative, updated);
  }
};
sweepCanonicalLinks("src");
sweepCanonicalLinks("public");

// Printable companion now points to the canonical interactive diagnostic.
let printable = read("public/downloads/guides/growth-bottleneck-scorecard.md");
printable = replaceAll(printable, "https://wescalestartups.com/resources/growth-bottleneck-scorecard", "https://wescalestartups.com/resources/growth-dependency");
write("public/downloads/guides/growth-bottleneck-scorecard.md", printable);

// Add the Resources audit to normal verification.
let pkg = JSON.parse(read("package.json"));
pkg.scripts["verify:resources"] = "node scripts/verify-resources.mjs";
write("package.json", JSON.stringify(pkg, null, 2));

let ci = read(".github/workflows/ci.yml");
if (!ci.includes("Resources hub integrity")) {
  ci = replaceOnce(
    ci,
    '      - name: Crawl link check (if export exists)\n',
    '      - name: Resources hub integrity\n        run: npm run verify:resources\n\n      - name: Crawl link check (if export exists)\n',
    "Resources CI step"
  );
}
write(".github/workflows/ci.yml", ci);

remove("src/pages/founder-led-growth-bottleneck-map.astro");

console.log("Applied Resources hub audit fixes.");
