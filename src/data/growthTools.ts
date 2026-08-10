export const growthTools = [
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

export const growthToolRoutes = growthTools.map((tool) => `/resources/${tool.slug}`);
