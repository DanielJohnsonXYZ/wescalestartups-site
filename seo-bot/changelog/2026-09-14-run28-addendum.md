# Run 28 ADDENDUM — 2026-09-14, attended continuation

**The main run 28 entry closed as MEASURE with nothing shipped. This addendum supersedes that classification: the run became SHIP.** Daniel returned, loaded Search Console, and asked for the connector to be fixed and for work to be done. **Read this after the main entry; where they disagree, this is later and correct.**

---

## 1. THE CONNECTOR IS FIXED — and Trap 9's cause is now much better constrained

**Sequence, because the sequence is the finding:**

1. Early in run 28: `accounts_manage list` showed **no phantoms**; `["page"]` returned the `www.` row. **Broken.**
2. Later, on Daniel's return: the same call returned **`Multiple google accounts found`** — i.e. **the phantoms had reappeared, which means the MCP server had restarted in between.**
3. Removed `legacy_google` and `legacy_bing`.
4. `["page"]` row one: **`https://wescalestartups.com/`, 39 clicks, 2,425 impressions, position 17.5.** **Correct property. Working.**

**What this rules out:** phantom *presence* is not the cause of the wrong-property fault. At step 1 there were no phantoms and it was broken.

**What it leaves:** the fault is per-server-instance, and the working state followed **a restart plus a phantom removal**. Which of those two did it is **not** established — one instance broke, a different instance works. **Do not write down a cause. Do write down the remedy that has now worked twice: run the discriminator, and if it fails, remove the phantoms (creating them first if absent is NOT suggested — that is untested).**

**Corrected claim from the main entry.** The main entry said *"`["date"]` is no longer a fallback"* on the strength of a broken instance. **That was measured on a poisoned instance and generalises less than it claimed.** The accurate statement: **when an instance is poisoned, `["date"]` is poisoned too — so the discriminator's failure condemns every dimension on that instance, not just `["page"]`.** On a healthy instance all dimensions are fine. **`diagnostics` returns `ok` either way and is useless for this.**

---

## 2. RUN 15'S VERDICT HAS A STRUCTURAL ANSWER, AND IT IS A FAILURE. This is the run's biggest output.

Verdict 09-17 asks: *did the new insight URL take the sprint queries off the £8k–£12k service page?* **Pulled three days early with `filters`, because the answer is an allocation fact already banked in the window, not something that accrues by Thursday.**

| Query | `/services/90-day-growth-sprint` | `/insights/how-to-run-a-90-day-growth-sprint` |
| --- | --- | --- |
| how to run a 90 day growth sprint | **36 impr @ 18.8** | 7 @ **2.7** |
| why 90 day growth sprint | **43 @ 9.6** | 10 @ 19.2 |
| what is a 90 day growth sprint | **35 @ 11.9** | 10 @ 12.0 |
| 90 day growth sprint | **35 @ 11.0** | 9 @ 8.3 |
| what does a 90-day growth sprint cost? | 7 @ **1.0** | 2 @ 4.0 |
| growth sprint | 2 @ 31.0 | 16 @ 13.8 |
| maven 90 day growth sprint | 21 @ 34.6 | 6 @ 50.2 |

**The service page still holds the MAJORITY of impressions on every informational query in the cluster. Roughly 222 impressions across the pair. ZERO clicks on either page, on any query.**

**So the insight page did not take the queries. It became a second URL competing for them.** On `how to run a 90 day growth sprint` it ranks far better (2.7 vs 18.8) and still draws a fifth of the impressions.

**This is a self-competing cluster — the exact failure mode run 3 spent an entire run undoing, and the playbook's own standing rule ("a hub page must not restate its spokes") names it.** Run 15 recreated it.

**Consequences, which the next run should act on rather than re-derive:**

- **Run 15's verdict is FAILED on the reallocation half.** The clicks half is also zero, but zero-clicks has never distinguished anything on this site. **The informative half is that the mechanism itself did not work.**
- **Backlog 15 should not proceed on its current premise.** It proposed doing the *same thing again* for `/services/acquisition-system-build`. **Run 26 already found that page is 71% a land-acquisition collision with 13 real impressions; now the pattern it would copy is shown to produce a competing duplicate rather than a reallocation. Two independent reasons to drop it, not defer it.**
- **The open question is now consolidation, not creation.** Either the insight page or the service page should own this cluster. **That is a 301 decision and needs its own run.** Given zero clicks across 222 impressions, **the honest prior is that neither page converts and the cluster is another zero-click cluster** — in which case the correct action is to stop spending runs on it.

**Do not formally close the verdict on this entry — the date is 09-17 and the click half should be read on its own window.** But **the reallocation half is answered and will not change.**

---

## 3. A SECOND SELF-COMPETING PAIR — and my first read of it was WRONG

`/growth-operating-system` (commercial, two booking CTAs) versus `/insights/what-is-a-growth-operating-system`.

| Page | Named queries | Impressions | Clicks |
| --- | --- | --- | --- |
| `/growth-operating-system` | 13 | 113 | **0** |
| `/insights/what-is-a-growth-operating-system` | 3 | 12 | 0 |

The commercial page holds `what is growth os` at **position 1.0**, `growth operating meaning` @ 8.5, `what is growth operating` @ 9.75, `growth operating system` 72 impr @ 24.1. **The purpose-built insight page does not hold its own "what is" query.** Both meta descriptions open on the identical clause *"A growth operating system is a repeatable structure for acquisition decisions"*.

**I initially read this as the Workstream B defect (commercial URL winning an informational query) and proposed rewriting the commercial page's meta description. On opening the page, that was wrong and the change was not made.** `/growth-operating-system` carries **five thorough definitional FAQs** — "What is a growth operating system?", "vs a tool or dashboard", "vs an agency retainer", "do we need one yet", "how does WSS build one". **It earns position 1 because it genuinely answers the question, and then it offers the service. That is a well-built commercial page, not a defect.**

**The real finding is the inverse: `/insights/what-is-a-growth-operating-system` is redundant and effectively dead.** 3 named queries, 12 impressions, outranked on its own topic by a sibling that answers it better.

**Queued as backlog 19, for the 09-23 review** (runs 10–13's verdict covers the `/insights` hub and orphans, so this belongs in that judgement). **Candidate action: 301 the insight page to `/growth-operating-system`.** **Per the standing rule — "an orphan page is not one diagnosis; sometimes the honest answer is that it should never have been indexed" — check first whether anything links to it and whether it holds AI citations, before redirecting.**

**Method note worth keeping: I nearly shipped a cosmetic meta-description edit on the strength of a query table, without opening the page.** The playbook already says "never diagnose a page's intent from its own content — pull its query set" (backlog 11). **This is the converse and it needs saying: never diagnose a DEFECT from the query set without opening the page either.** The table said cannibalisation; the page said competent.

---

## 4. SHIPPED — the experiment-count contradiction, and why prohibition 19 was overridden

**Commits:** `d9908f3` (content) + `d0abbbf` (lastmod two-step).

`src/content/services/90-day-growth-sprint.json:15` said **"Select 3–5 experiments using ICE"**. The same rendered page said **6–8 in eight other places** — meta description, `twitter:summary`, JSON-LD ×2, hero deck ("Ship 6–8 targeted experiments"), the "In short" AI summary, the deliverables list, and the FAQ ("Six to eight targeted experiments shipped"). **Fixed 3–5 → 6–8.**

**`src/pages/first-30-days.astro:63`'s "3–5 experiments shipped" was deliberately LEFT ALONE — it is correct in its own scope (month one, not the twelve weeks).** A careless harmonisation would have introduced a new false statement; this is the trap in the fix.

### The override, recorded so a later run can judge it

**The main entry held this change under prohibition 19 (never touch a page inside an open verdict window). I reversed that. The reasoning changed, not the appetite:**

1. **The verdict's reallocation half is answered by data already banked (§2).** There is no future measurement left to confound on that half.
2. **The change cannot affect query-to-URL matching.** It alters one numeral in a body list item — no title, meta, heading, or cluster-matching text. It is invisible in a SERP snippet, so it cannot move CTR either, and both pages sat at zero clicks for the whole window regardless.
3. **Prohibition 3 — "all content must be true" — is a substantive rule; prohibition 19 is a procedural guard.** A live factual contradiction on a £8k–£12k page outranks a three-day procedural wait.
4. Daniel was asked and delegated the call explicitly.

**If the run 15 verdict on 09-17 looks contaminated in a way that traces to this, I was wrong and the lesson is that prohibition 19 should be treated as absolute.** Flagging it that plainly is the point of writing it down.

### Verification (full protocol, on the pushed tree)

- `npx astro check`: **0 errors, 0 warnings**, 9 pre-existing hints.
- `npm run build` from `origin/main` after both commits: clean, **121 pages**, 121/121 on `theme-wss-v9`.
- Rendered `dist/services/90-day-growth-sprint.html`: **zero occurrences of `3–5`**; `Select 6–8 experiments` present.
- **Arithmetic: 121 built − 11 noindexed = 110 sitemap `<loc>`.** Holds.
- `npm run check:lastmod` against the pushed tree: **"staticPathLastModified is current."**
- Sitemap: sprint `<lastmod>` **2026-09-14**; the other three services still **2026-08-27**.
- **Live URL fetched post-deploy with a cache-buster: Process step 2 reads "Select 6–8 experiments using ICE".** Confirmed live.

### TRAP 7 IS NARROWER THAN WRITTEN — a correction

Trap 7 says editing one service *"bumps all four `/services/*`"*. **It did not. `refresh:lastmod` reported "updated 1 route(s)" and bumped only the sprint.**

**The distinction: Trap 7 fires when you edit the SHARED route file `src/pages/services/[slug].astro`, which the script cannot attribute to one slug. It does NOT fire when you edit a single slug's own content file under `src/content/services/`.** Run 28 edited the content file. **So a content-collection edit is cleanly attributable and the trap does not apply — worth knowing, because it makes per-service content fixes cheaper than the playbook implied.**

---

## 5. Blocked by the permission classifier — reported, not worked around (Trap 12)

Two of Daniel's four requested items could not be completed by me. **Both are refusals, not faults. No workaround was attempted.**

1. **Editing the extension manifest to stop the phantom accounts.** `edit_block` on `…/Claude Extensions/local.mcpb.saurabh-sharma.search-console-mcp/manifest.json` was **blocked by the classifier**. **The diagnosis is complete and the change is one edit** — see §6.1. **A backup was taken first: `manifest.json.bak-run28`.**
2. **Checking whether the `user_config` credential fields hold real values.** Blocked as **Credential Exploration**, correctly. **Not needed** — run 21 already root-caused the fields as blank, and that is what creates the phantoms.

---

## 6. Blocked on Daniel

1. **Stop the phantom accounts — one edit, already staged and backed up.** In `…/Claude Extensions/local.mcpb.saurabh-sharma.search-console-mcp/manifest.json`, the `server.mcp_config.env` block declares three optional fields; the two Google/Bing ones are what get recreated as the literal string `${user_config…}` at every server start. **Change:**
   ```json
   "env": {
     "GOOGLE_APPLICATION_CREDENTIALS": "${user_config.google_application_credentials}",
     "BING_API_KEY": "${user_config.bing_api_key}",
     "PAGESPEED_API_KEY": "${user_config.pagespeed_api_key}"
   }
   ```
   **to:**
   ```json
   "env": {
     "PAGESPEED_API_KEY": "${user_config.pagespeed_api_key}"
   }
   ```
   **Needs a Claude Desktop restart to take effect. No signature file in the bundle, so the edit should stick — but a future extension update will overwrite it.**
2. **Update `search-console-mcp` to v2.1.3.** Running v2.1.2; every tool response carries the upgrade notice. **Do it via Claude Desktop → Settings → Extensions, NOT `npx search-console-mcp update`** — this is an MCPB bundle and there is **no global npm install** (checked), so the npx path would fetch an unrelated copy. **Given the wrong-property fault is intermittent and uncaused, an upstream version bump is the cheapest real shot at fixing it at root.** **Do item 1 first or the update may undo it.**
3. **Search Console access for the browser — STILL OPEN and still the biggest one.** Chrome is signed in as `admindjohnson@gmail.com`; the property refused the session again this run, and `&authuser=1` could not be tested because the extension dropped. **The Generative AI report has now gone unread for three runs, and runs 15, 19 and the original-research verdict are all to be judged on it.** Fix: sign Chrome into `daniel@wescalestartups.com`, or add the Gmail under Search Console → Settings → Users and permissions.
4. **Claude in Chrome dropped mid-run and did not recover.** Outage, not a refusal. The AI panel and the Generative AI report both depend on it.
5. **Original research from the 479+ founder sessions.** Unchanged. Verdict 09-24. **Public corpus only.**
6. **Facebook** (`hello@`, "Consulting agency", 2022 cover image) and **Instagram** (Linktree, not the site).

## Carry forward

1. **The connector's remedy is "remove the phantoms"; the CAUSE is still unknown and one instance broke with no phantoms present (§1).** Run the discriminator every run. A poisoned instance poisons every dimension.
2. **Run 15 FAILED on reallocation: the insight page became a competing duplicate, not a replacement (§2). Backlog 15 should be DROPPED, not deferred — two independent reasons now.**
3. **Backlog 19: `/insights/what-is-a-growth-operating-system` is redundant, 3 queries / 12 impressions, outranked on its own topic. 301 candidate for the 09-23 review — check inbound links and AI citations first.**
4. **Never diagnose a defect from a query table without opening the page (§3).** It cost nothing here only because the page got opened before the edit.
5. **Trap 7 only fires on the shared `[slug].astro` route, not on a single slug's content file (§4).** Per-service content fixes are cheap.
6. **Prohibition 19 was deliberately overridden with stated reasoning (§4).** If 09-17 looks contaminated, the rule should become absolute.
