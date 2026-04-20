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
    order: z.number().default(999)
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
    order: z.number().default(999)
  })
});

export const collections = {
  services,
  industries,
  cases
};
