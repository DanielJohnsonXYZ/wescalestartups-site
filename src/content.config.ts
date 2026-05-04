import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const services = defineCollection({
  loader: glob({ base: "./src/content/services", pattern: "**/*.json" }),
  schema: z.object({
    title: z.string(),
    shortTitle: z.string(),
    description: z.string(),
    audience: z.string(),
    promise: z.string(),
    outcomes: z.array(z.string()),
    process: z.array(z.string()),
    cta: z.string(),
    order: z.number().default(999)
  })
});

const industries = defineCollection({
  loader: glob({ base: "./src/content/industries", pattern: "**/*.json" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    buyerProblem: z.string(),
    usefulWhen: z.array(z.string()),
    growthSystem: z.array(z.string()),
    proof: z.array(z.string()),
    order: z.number().default(999),
    /** Optional readable sections (shorter paragraphs) for dense industry pages. */
    readingBlocks: z
      .array(
        z
          .object({
            heading: z.string(),
            paragraphs: z.array(z.string()).optional(),
            bullets: z.array(z.string()).optional()
          })
          .refine(
            (b) =>
              (b.paragraphs?.length ?? 0) > 0 || (b.bullets?.length ?? 0) > 0,
            { message: "Each reading block needs paragraphs and/or bullets." }
          )
      )
      .optional()
  })
});

const cases = defineCollection({
  loader: glob({ base: "./src/content/cases", pattern: "**/*.json" }),
  schema: z.object({
    title: z.string(),
    client: z.string(),
    sector: z.string(),
    summary: z.string(),
    challenge: z.string(),
    work: z.array(z.string()),
    results: z.array(z.string()),
    services: z.array(z.string()),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    order: z.number().default(999)
  })
});

const insights = defineCollection({
  loader: glob({ base: "./src/content/insights", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    excerpt: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    author: z.string().default("Daniel Johnson"),
    tags: z.array(z.string()),
    tldr: z.string(),
    order: z.number().default(999),
    faqs: z
      .array(
        z.object({
          question: z.string(),
          answer: z.string()
        })
      )
      .optional()
  })
});

const podcastEpisodes = defineCollection({
  loader: glob({ base: "./src/content/podcast", pattern: "**/*.json" }),
  schema: z.object({
    title: z.string(),
    episodeNumber: z.number(),
    publishedAt: z.coerce.date(),
    guestName: z.string(),
    guestRole: z.string(),
    youtubeId: z.string().optional(),
    youtubeUrl: z.string().url(),
    summary: z.string(),
    keyTakeaways: z.array(z.string()),
    durationNote: z.string().optional(),
    resources: z
      .array(z.object({ label: z.string(), href: z.string().url() }))
      .optional()
  })
});

export const collections = {
  services,
  industries,
  cases,
  insights,
  podcastEpisodes
};
