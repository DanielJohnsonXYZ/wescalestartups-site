# READING #10 — ADDENDUM, 2026-09-09 (run 25, attended)

**Daniel turned off "Use search history" during the session. It was verified off, both prompts were re-taken, and the contamination is still there. The toggle is NOT the fix, and the main log's instruction was wrong.**

## What was done and what happened

**Verified off:** Settings → Memory settings → "Use search history" toggle confirmed in the off position by screenshot.

**Prompt 9 re-taken, `Finished` tell verified:** 7,943 chars, 13 source domains, **WSS absent, no personalisation phrasing.** So the "suspect, not scored" naming from the main reading did **not** reproduce once the toggle was off. **Prompt 9 = clean absence. The series still has no organic Perplexity naming.**

**Prompt 6 re-taken, tell verified:** 9,959 chars, 13 domains, **WSS named — and still personalised**: *"**Given your agency and automation background**, I would not start with a generic 'lead-gen agency'…"* Not scoreable, second time.

## The real root cause: a SECOND, SEPARATE memory store the toggle does not touch

**Settings → Personalisation is EMPTY** — occupation, company name and custom instructions are all placeholder text. Not the source.

**`perplexity.ai/computer/memory` — "Memory: Perplexity automatically remembers useful details across conversations" — holds three stored Notes, 5 to 10 months old.** This is a different store from the "Use search history" toggle and is unaffected by it.

**And the contents are not Daniel's.** Verbatim from the Website note:

> `用户的个人网站是 https://ashleyyang.xyz/。 - Has a personal website at danieljohnson.xyz.`

The stored profile **merges Daniel with a second person** — entries in Chinese about running a social-media account to 20k followers and managing Meta ad campaigns, a personal-finance DCA MVP, a productivity system covering a China trip and learning Chinese, and a ClickUp review. **That is the foreign profile readings #3 and #4 saw (the Shopee / Lazada / n8n / GoHighLevel lineage), still resident.** It also explains the exact wording of the prompt-6 tell: *"agency and automation background"* is social-media ops plus Meta ads plus ClickUp, not WSS.

**Corrected ask for Daniel: `perplexity.ai/computer/memory` → delete the stored Notes (Work, Projects, Tools).** Not done by the bot: deleting data is prohibited outright, and this is an account setting besides.

## Corrections this addendum makes to the main reading and the playbook

1. **"Turn off Use search history" is NOT sufficient and must not be recorded as the fix.** It was done, verified, and the personalisation survived it.
2. **Prompt 9's naming was contamination-adjacent, not source-derived.** With the toggle off it is a clean absence. **Perplexity remains 0 organic namings across the whole series.** The Growth-Division-sourced comparison table in the main log stands as evidence about *Growth Division's page*, but not as a Perplexity result.
3. **The tell regex needs `Given your` too, not just `Given you run`.** Run 25 recorded `Given you run`; this reading produced `Given your agency and automation background`. **Match `Given you` / `Given your` as a prefix, plus any reference to the reader's own company or background.**
4. **Method rule earned: when an instrument is contaminated, find the STORE, not the switch.** The main log reasoned from one visible toggle to a cause, which is the same shape as run 23's error it was correcting — inference from the nearest plausible setting instead of opening the thing that actually holds the data.
