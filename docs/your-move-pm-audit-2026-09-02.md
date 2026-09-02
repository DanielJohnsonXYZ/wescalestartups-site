# Audit: Your Move, Prime Minister

**Target:** https://danieljohnsonxyz.github.io/your-move-prime-minister/
**Date:** 2 September 2026
**Deployed build audited:** assets served by GitHub Pages, last modified 21 August 2026 (`index.html`, `styles.css`, `js/content.js`, `js/engine.js`, `js/ui.js`, `manifest.webmanifest`)

## Scope and method

The source repository was not reachable from this session, so the audit was performed on the deployed code itself. All five text assets were downloaded and reviewed line by line. The unmodified `content.js` and `engine.js` were then loaded into a Node harness and driven through 5,100 complete twenty-turn terms under five strategies, plus fourteen targeted reproduction tests. Finally the exact deployed files were served locally and driven in headless Chromium with Playwright to confirm each user-facing finding in the real UI at 390px, 620px and 1280px.

There is no server. "Backend" in this report means the simulation engine and content library that run in the browser. The game makes six requests in total, all to its own origin, and stores state only in `localStorage`.

## Verdict

The codebase is unusually clean for a browser game: no `innerHTML`, no third-party scripts, no console errors, real focus management, and honest privacy claims. The engine, however, has one balance flaw that makes the game trivially winnable, one unenforced state machine that lets players re-roll Commons votes and can crash a saved game, and one CSS bug that puts the in-game header on the title screen and lets players skip the manifesto. A third of every term has no events on the desk. These are all fixable in small, local changes.

| Area | Rating |
|---|---|
| Security and privacy | Good |
| Accessibility | Good |
| Engine correctness | Needs work |
| Game balance | Broken (spend-everything wins 100%) |
| Content volume | Insufficient for a 20-turn term |
| UI flow control | Needs work |

## Findings

Severity reflects impact on the player's experience, not code size.

### High

**H1. Borrowing has no real cost, so spending everything is the dominant strategy.**
Fiscal headroom is hard-clamped at −£60bn in both `applyEffects` and `endTurn`. Below zero the "strain" penalty is capped at strain = 1 (economy −1.7, approval −0.9, party −1.0 per quarter), which any single funding decision more than offsets. The `affordable()` check exists and is returned on every choice as `choice.affordable`, but neither `decide()` nor the UI ever reads it, so an unaffordable choice resolves normally. Simulation: a strategy that always picks the biggest indicator gain wins the election in 100% of 1,200 terms with headroom pinned at the floor, while the strategy that always protects the Treasury wins 0% of 1,200 terms. The engine's own comment says "debt has to cost something, or spending freely is simply the right answer every time." It currently is.

**H2. The Commons vote phase is not enforced. Players can re-roll rebels, and a saved game can crash.**
`state.phase` is written but never read by the UI, and the tab bar stays live on the vote screen. Confirmed in the browser: from the vote screen, click Agenda, the bill's item is still enabled, re-open it, pick the same option, and `decide()` mints a new bill with freshly rolled rebels (16 → 17 in the test run, 18/13/18/15/13/13 across six engine calls) and concessions reset to zero. Worse, a player can run the quarter with a bill pending. `endTurn` then counts the bill's event as "left unattended" and drifts its indicator (housing 32 → 25.9 in the test), while `state.bill` survives the turn. If the event's scheduling window has closed, the next resume goes straight to the vote screen and "Hold the vote" throws `TypeError: Cannot set properties of undefined (setting 'done')` in `commitChoice`, because the agenda entry no longer exists. The bill stays set, so every subsequent resume lands on the same broken screen.

**H3. The stylesheet overrides the `hidden` attribute on the stats bar and the tab bar.**
`.stats { display: flex }` and `.tabs { display: flex }` beat the user-agent `display: none` for `[hidden]`; only `.view[hidden]` is handled. Result on every viewport: approval, money and party, and the Agenda tab, are rendered on the title, manifesto and end screens. Confirmed by computed style at 390px, 620px and 1280px. Because the Agenda tab is clickable on the title screen, a player can enter the briefing with zero promises and no agenda, run a quarter, and the game saves that state (confirmed: turn 2 reached with `promises.length === 0`).

**H4. "Start again" on the title screen destroys a saved term with no confirmation.**
`startNew()` calls `E.reset()`, which calls `clearSave()` immediately, before the player has chosen a single new promise. The in-game home button, by contrast, shows a dialog promising "Your term is saved... Nothing is lost." Confirmed in the browser: save present, one click, no dialog, save gone.

**H5. The content library runs dry for a third of the term.**
There are 22 non-final events for 19 playable quarters with two event slots each, and each event fires once. Across 200 simulated terms the share of games with no event on the desk (only the standing funding card) was 79% at quarter 13 and 100% at quarters 14, 15, 17, 18 and 19. Quarter 16 is saved only by `final_budget`. The briefing then reads "Nothing new has landed this quarter" for six of twenty turns.

### Medium

**M1. Concessions can only be made once, not three times.**
`voteState()` exposes `canConcede: b.concessions < 3`, but `concessions` is the number of rebels won back (4 to 9 per concession), not a count. `concessionCount` is tracked but never checked, and the line `if (b.concessionCount >= 3) b.concessions = b.concessions;` is a no-op. Confirmed: after one concession the button is disabled. A successful "Talk to the rebels" also disables it.

**M2. The flagship planning bill fails 90% of the time without negotiation.**
With a majority of 24 and party unity at 73, "Full planning reform" (voteBoost −8) generates 13 to 19 rebels against a cushion of 11. Simulation over 500 votes: 10% pass with no negotiation, 96% with concede + talk + threaten. Intended tension or not, the vote screen's "Likely to fail" on the first flagship bill is the norm, not the exception.

**M3. Ignoring political and fiscal events has no consequence.**
Neglect drift only applies when `state.indicators[m.topic]` exists. Events with topic `party` (scandal, PMQs, by-election, local elections, Lords) or `treasury` (the £18bn fiscal hole) can be ignored indefinitely with no penalty. The briefing nonetheless tells the player "N items left unanswered will get worse."

**M4. Abandoning a bill costs zero action points; talking is free at zero actions.**
`abandonBill()` marks the entry done and resolved without deducting `entry.cost`. Confirmed: three actions before, three after abandoning a two-action bill. `negotiate('talk')` says "Costs an action" but silently proceeds when `actionsLeft` is 0.

**M5. The "Keep taxes down" promise is close to unkeepable for anyone who plays.**
Kept in 0% of terms under active strategies and 15–23% under random play. A purpose-built strategy that never spends and never raises tax kept it 81% of the time but won 0% of elections. Headroom drifts by (economy − 55) × 0.45 − 2 per quarter, so it falls whenever the economy is below about 59.

**M6. Public services saturates at 100 in every spending game.**
Every `britain` effect moves `services` as well as the event's topic, including all funding cards. Final services was 97–100 in every non-frugal strategy, which is why "THE REFORMER" is the legacy in 60–80% of wins and "THE DELIVERER" almost never appears (it is tested last in the `if` chain).

**M7. The opening is scripted.**
Across 200 seeds, turn one was always NHS Strike (urgent) plus either Cut Interest Rates or PMQs, plus Fund Energy Security. The NHS indicator starts at 28, which gives `nhs_strike` a +17.6 score bonus that nothing else can beat.

**M8. The Lords event's mechanics contradict its text.**
The card says "Your MPs demand that you reject the changes," yet "Reject the amendments" carries voteBoost −2 (hostile to your own side, 7 rebels in the test) and "Accept most changes" carries +7 (4 rebels, "Likely to pass").

**M9. Save data is trusted without validation.**
`load()` does `Object.assign(freshState(), parsed)` after checking only `version`. A save with `indicators: null` loads successfully and `britain()` then throws. The UI has no error boundary, so a corrupted or hand-edited save leaves a blank screen with no recovery path other than clearing site data.

### Low

**L1.** The delayed-consequence explanation always says "1 quarter(s) ago" because it computes `turn − (dueTurn − 1)` at the moment `dueTurn === turn`. The `report.chains` array that carries it is never rendered anyway.

**L2.** Copy and numbers disagree: "Extra £2bn found for health staff pay rise" on a choice previewed as −£5bn to −£9bn; "£12BN RAIL PLAN" on a choice costing −£4bn to −£8bn.

**L3.** The defeat news story reports the expected rebel count, not the actual one after the vote swing.

**L4.** Vote-event previews show effects as if certain, with no hint that they apply only if the bill passes, or that concessions dilute them to as little as 45%.

**L5.** The consequences headline usually repeats the headline the player just read in the outcome dialog (`pickHeadline` returns `news[0]` whenever a decision was made that turn).

**L6.** The first PRNG step multiplies `Date.now()` by 1664525, exceeding 2^53, so it loses precision. Harmless, and persisting the seed correctly prevents save-scumming.

**L7.** `manifest.webmanifest` locks `orientation: portrait`, which is hostile on tablets and desktop installs. No service worker is registered, so the "installable" app does not work offline. There is no Content-Security-Policy meta tag; GitHub Pages cannot send headers, but a meta CSP would be cheap insurance.

**L8.** The `busy` guard is set and cleared synchronously and so guards nothing. `EVENT_META` "cost" for the standing funding card is hard-coded in two places.

## What is done well

- **No injection surface.** Every string reaches the DOM through `textContent` or `createTextNode`. A custom promise of `<img src=x onerror="window.__xss=1">` rendered as literal text; no image element was created and the handler did not run.
- **No third parties.** Six requests, all same-origin, roughly 150 KB total, no analytics, no fonts, no CDN. The privacy statement in `<noscript>` and "How it works" is accurate.
- **Accessibility basics are real, not decorative.** Skip link is the first Tab stop, `lang="en"`, a single `h1` per screen, focus moves to each new screen, dialogs are labelled, `aria-modal`, focus-trapped and closable with Escape, focus returns to the opener, status is always a word as well as a colour, the map regions are keyboard-operable buttons with descriptive labels, `prefers-reduced-motion` is honoured, and the palette documents its contrast ratios.
- **Deterministic, resumable simulation.** The seed lives in the save, so a reload reproduces the same uncertain outcomes rather than inviting a reroll.
- **The design intent is coherent.** Higher-is-better indicators, human readouts, delayed consequences that are shown rather than silently applied, and regional weighting that makes the map diverge. The problems are in enforcement and tuning, not concept.
- **Zero runtime errors** through the whole scripted flow, and no horizontal scrolling at desktop widths.

## Simulation results

300 terms per row, fixed seeds, three-promise manifestos rotated across four sets. "Negotiation" is what the strategy does when a bill goes to the Commons.

| Strategy | Negotiation | Win rate | Avg seats | Avg final headroom | Promises kept | Bill pass rate |
|---|---|---|---|---|---|---|
| Random choice | none | 35% | 315 | −£14.5bn | 2.12 / 3 | 33% |
| Random choice | all three tactics | 43% | 319 | £0.1bn | 2.15 / 3 | 95% |
| Max approval | none | 100% | 351 | −£55.0bn | 2.30 / 3 | 5% |
| Max indicator gain | none | 100% | 359 | −£51.5bn | 2.32 / 3 | 26% |
| Max indicator gain | all three tactics | 100% | 366 | −£38.2bn | 2.42 / 3 | 93% |
| Protect the Treasury | none | 0% | 240 | £7.9bn | 0.00 / 3 | 1% |
| Protect the Treasury | all three tactics | 0% | 249 | £36.2bn | 0.00 / 3 | 83% |
| Do nothing | – | 0% | 209 | −£26.9bn | 0.27 / 3 | – |

Promise delivery under the max-indicator strategy: NHS 100%, housing 100%, crime 100%, clean energy 100%, growth 64–82%, taxes 0–1%.

## Recommended fixes, in priority order

1. **Make debt bite (H1).** Remove the −60 floor or make strain unbounded below it, scale strain into approval and party more steeply, and honour `choice.affordable` in `decide()` and in the choice button's `disabled` state. Re-run the harness until the frugal and spending strategies land within a plausible band of each other.
2. **Enforce the vote phase (H2).** Hide the tab bar and the home shortcut while `state.bill` is set, make `decide()` refuse when a bill is in flight, make `endTurn()` refuse or auto-abandon a pending bill, and guard `holdVote`/`commitChoice` against a missing agenda entry.
3. **Fix `hidden` (H3).** Add `[hidden] { display: none !important; }` near the top of `styles.css`. That single rule also closes the manifesto skip.
4. **Confirm before wiping a save (H4).** Route "Start again" through `confirmDialog`, and defer `clearSave()` to `beginTerm()` so abandoning the manifesto screen does not lose the old term.
5. **Add content or let events recur (H5).** Either roughly double the event pool for quarters 12–19 or allow topic events to return in new variants once resolved. Even a "quiet quarter" card with three small choices would be better than an empty desk.
6. **Concessions (M1):** compare `concessionCount`, not `concessions`, to 3; delete the no-op line.
7. **Neglect for political events (M3):** drift party or headroom when `party`/`treasury` events are ignored, or stop the briefing from promising that they will get worse.
8. **Action costs (M4):** deduct `entry.cost` in `abandonBill()`; disable "Talk to the rebels" when `actionsLeft` is 0.
9. **Tune the tax promise (M5)** and the services coupling (M6): drop the automatic `services` move for funding cards on other topics, and consider counting the promise kept at a lower headroom threshold.
10. **Validate saves (M9):** check that `indicators`, `regions`, `agenda` and the numeric fields have the expected shape in `load()`, and wrap `resume()` in a try/catch that falls back to the title screen with a "your save was unreadable" message.
11. **Diversify the opening (M7)** by capping the indicator bonus in `buildAgenda` or by starting NHS a little higher.
12. **Flip the Lords voteBoosts (M8)** and fix the copy mismatches (L2).

## Reproduction notes

All engine findings were reproduced by loading the deployed `content.js` and `engine.js` unchanged into a Node `vm` context with a stub `localStorage`. All UI findings were reproduced against the deployed files served from a local static server in headless Chromium 1194 via Playwright 1.56, because the sandbox proxy would not carry browser traffic to GitHub Pages. Screenshots and harness scripts are available on request.
