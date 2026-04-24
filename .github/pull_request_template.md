<!-- Read AGENTS.md at the repo root before filling this out. -->

## What changed

<!-- One sentence on the user-visible change. -->

## Why

<!-- Audit item, issue, or conversation that triggered this. Link it. -->

## PR hygiene checklist

- [ ] I ran `gh pr list --state open` and confirmed this does not duplicate or conflict with an open PR.
- [ ] If it does overlap, I rebased onto the older PR or added commits to it instead of opening a parallel PR.
- [ ] I read `AGENTS.md` and stayed inside the canonical positioning (senior operator, post-PMF B2B SaaS + AI, $1M–$10M ARR, £5k–£15k/mo retainer, "Book a growth call" CTA).
- [ ] `npm run build` passes locally with zero errors.
- [ ] I updated `src/pages/llms.txt.ts` if I changed ICP, offers, pricing, or canonical pages.
- [ ] I updated `public/_redirects` if I renamed or removed a page.

## Test plan

- [ ] Preview build on this branch (Cloudflare Pages) goes green.
- [ ] View-source shows expected schema (`Organization`, `WebSite`, and any page-specific schema I added).
- [ ] Homepage + any pages I touched render on mobile width (375px).
- [ ] CTAs all point to Calendly with `data-cta` attributes.
