/**
 * Public WSS Studio portfolio. Add or remove a project here.
 * Only list WSS-owned projects with a verified public destination.
 * Client products and private internal tools should not be published.
 */
export type StudioProject = {
  name: string;
  category: string;
  description: string;
  href: string;
  image: string;
  imageAlt: string;
  external: boolean;
};

export const studioProjects: StudioProject[] = [
  {
    name: "Radar",
    category: "Client intelligence",
    description: "Understand which client relationships need attention, before small problems become lost revenue.",
    href: "https://radar.wescalestartups.com/",
    image: "/images/studio/radar.jpg",
    imageAlt: "Radar website preview",
    external: true
  },
  {
    name: "Crux",
    category: "Growth experimentation",
    description: "A more systematic way for B2B SaaS teams to run experiments and learn what works.",
    href: "https://crux.wescalestartups.com/",
    image: "/images/studio/crux.jpg",
    imageAlt: "Crux website preview",
    external: true
  },
  {
    name: "Focus",
    category: "Productivity",
    description: "A calmer home for projects, tasks and notes, with a clear view of what matters next.",
    href: "https://focus-personal-execution.vercel.app/",
    image: "/images/studio/focus.svg",
    imageAlt: "Illustrative preview of the Focus task workspace",
    external: true
  },
  {
    name: "WSS Solo",
    category: "Founder accelerator",
    description: "A practical accelerator for solo founders turning AI-built products into working businesses.",
    href: "/solo",
    image: "/images/studio/solo.jpg",
    imageAlt: "WSS Solo website preview",
    external: false
  }
];
