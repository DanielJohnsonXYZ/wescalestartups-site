# Cross-site proof hierarchy — WSS + danieljohnson.xyz

**Status:** Active reference doc · Created 2026-04-29 · Maintainer: Daniel
**Notion source:** [Cross-site: WSS + DJ.xyz](https://www.notion.so/354f99a79fdb81df8b90feb7a2734be7)

The two sites share underlying proof assets — testimonials, logos, event photos, case studies, mentor stats — but each one needs different framing. The same asset is a different argument depending on which audience it's serving. This doc maps which proof goes where, with the framing per site.

## The two sites — different buyers, different proof needs

| Dimension | wescalestartups.com (WSS) | danieljohnson.xyz (DJ) |
|---|---|---|
| Buyer | Companies (founders, leadership teams) | Individuals hiring Daniel personally |
| Use case | "We need a fractional CMO / sprint / system" | "I want to learn from / book / hire / interview Daniel" |
| Voice | We, your team, your growth system | I, my approach, the work I do |
| Proof needed | Commercial credibility — outcomes, systems built, client logos | Personal authority — speaking, mentoring, podcast, media, universities |
| Lead style | Inbound to a paid engagement | Inbound to a call, mentor session, speaking enquiry, or podcast guest spot |
| Conversion event | Book a Growth Diagnosis / Strategy Sprint scoping call | Book a 30-min Growth Audit / Mentor session / Speaker enquiry |

The rule of thumb: if the proof is a **business outcome** (CAC dropped, pipeline rebuilt, ARR moved), it lives on WSS. If the proof is a **personal credential** (Cambridge lecture, Google for Startups mentor, podcast guest, GrowthMentor rating), it lives on DJ — and is *referenced* on WSS as a trust signal for Daniel as the founder.

## Asset-by-asset mapping

### Client logos (companies Daniel has worked with)
- **WSS:** Hero strip, /proof page, /press page, /industries pages. Framed as "current and recent client work — these companies hired us to build a growth system."
- **DJ:** /about page only, as a small reference. Not in the hero. Framed as "Daniel has worked with companies including…" as personal-experience context, not as commercial proof.

### Founder testimonials (Christian A., Camiel Roex, Greg Weinstein, Fabi Herrmann, Kamil Kaminski, Indie Ludbrook, Bartosz Majewski, etc.)
- **WSS:** /proof page, sprinkled across service pages. Framed as engagement outcomes. Lead with the specific result, not the quote.
- **DJ:** /testimonials page, homepage testimonial section, footer pull-quote. Framed as personal feedback from mentor sessions and 1:1 work. Lead with the quote, attribute by name + role.

### Cambridge Judge / Imperial College / Techstars / Google for Startups (academic + accelerator credentials)
- **WSS:** Brief mention on /about, on the founder card on the homepage, in the credential logo strip. Framed as Daniel's background.
- **DJ:** Front and centre on /speaking, /about, the homepage credential card. Framed as venues where Daniel has lectured, mentored, or spoken. These are the *primary* personal-authority signals — they belong on DJ.

### GrowthMentor 4.93/5 (220 reviews, 389 sessions)
- **WSS:** Hero proof rail ("479+ founder sessions · ★ 4.93") with a "Verify on GrowthMentor →" link. Framed as live, independently verifiable proof of demand for Daniel's work.
- **DJ:** Headline metric in the hero proof bar. Linked to the GrowthMentor profile. Same framing — live, verifiable, ongoing.

### Case studies (the 6×, 35% CAC, 21% churn, 90-day operating system writeups)
- **WSS:** /case-studies (the canonical home — full writeups). Cross-linked from service pages and /proof.
- **DJ:** /case-studies (mirror, but lighter — abbreviated versions linking back to WSS for the full writeup). Framed as "examples from Daniel's operator work." DJ shouldn't be the canonical source — WSS is.

### Podcast guest appearances + speaking history
- **WSS:** /press, /podcast (the WSS-owned podcast lives here). Framed as "Daniel has been featured on…" — credibility for the company.
- **DJ:** /speaking, /podcast-appearances, /about. Framed as Daniel's personal speaking and media history. This is the *primary* home — WSS just borrows.

### Event photos (conference photos, lecture room photos)
- **DJ only.** WSS shouldn't use these — they make the company look like a personal brand site. Keep on DJ /speaking and /about.

### Aircraft / pilot photo (the Cessna shot)
- **DJ only.** It's a personal-character signal that supports the operator-mindset story. Wouldn't fit WSS's commercial frame.

### Two operator-side exits (eQuoo, eCommerce brand)
- **DJ:** Headline in /about and the lifetime-totals strip. Framed as Daniel's founder track record.
- **WSS:** Mentioned in /press and /about as part of Daniel's background. Not headline material on WSS — the company sells GTM systems, not the founder's prior exits.

## Cross-linking rules

### From WSS → DJ
- "About Daniel" link in the footer and on /about goes to `https://danieljohnson.xyz/about/` for personal background.
- Speaking enquiries route to `https://danieljohnson.xyz/speaking/` (DJ owns this).
- Podcast guest applications stay on WSS (`/podcast-guest-application`) because the show is a WSS asset.
- Mentor sessions for individual founders route to GrowthMentor directly, not to a WSS page.

### From DJ → WSS
- "I run a fractional CMO practice — work with us at" link to `https://wescalestartups.com/services/fractional-cmo` from the DJ /fractional-cmo page.
- Case-study links on DJ point to the WSS canonical version.
- The `/work-with-me` or "Hire me" path on DJ should make it explicit: "For company engagements, that's We Scale Startups (link). For individual sessions, that's GrowthMentor (link)."

### Visual cohesion (so it doesn't feel like two unrelated brands)
- Same Daniel headshot on both sites (consistency of trust signal).
- Same colour palette family — purple accent works on both.
- Both sites use IBM Plex Mono for eyebrows, Inter for body — already aligned.
- Footer on both sites carries a one-line "Daniel runs WSS / Daniel is the founder of WSS" link.

## What NOT to share between sites

These should live on one site only — copying creates either duplicate-content SEO problems or audience confusion.

- **Pricing tables:** WSS owns engagement pricing (Strategy Sprint, Fractional CMO). DJ doesn't show prices for company engagements — it routes to WSS for that.
- **Service comparison tables (vs agency, vs full-time CMO):** DJ has its own comparison pages framed for individual buyers (when *I* would recommend X). WSS has its own framed for buying teams. Don't copy verbatim.
- **Long-form case studies:** WSS is canonical. DJ links to WSS, doesn't duplicate.
- **Calendly booking pages:** Different slugs per site (DJ uses `/danieljohnson`, WSS uses `/wescalestartups`) so attribution is clean. Don't share the slug.
- **Newsletter signup:** DJ owns Growth Notes (Daniel's personal writing). WSS owns the company newsletter (if/when there is one). Don't cross-promote on each other's sites — the audiences differ.

## Maintenance

When adding a new proof asset (testimonial, case study, logo, speaking engagement), use the rules above to decide where it lives. The default question is: **"Is this proof of the company's commercial work, or proof of Daniel's personal credentials?"**

If both, decide which is the canonical home and link from the other.

This doc should be reviewed quarterly. Update the asset-mapping table when proof shifts (e.g., a testimonial that started as personal feedback becomes a case study; or a logo that was just an academic affiliation becomes a paying client).
