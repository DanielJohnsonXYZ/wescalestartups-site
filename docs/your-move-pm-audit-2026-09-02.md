# Your Move, Prime Minister: product, design and technical audit, and a direction

**Target:** https://danieljohnsonxyz.github.io/your-move-prime-minister/
**Date:** 2 September 2026
**Build audited:** GitHub Pages assets, last modified 21 August 2026 (`index.html`, `styles.css`, `js/content.js`, `js/engine.js`, `js/ui.js`, `manifest.webmanifest`)

## How this was done

The source repository was not reachable from this session, so the audit was performed on the deployed code. All five assets were read line by line. The unmodified engine and content files were then loaded into a Node harness and driven through 5,300 complete twenty-quarter terms under seven strategies (spend everything, protect the Treasury, chase approval, balanced, random, deliberately bad, do nothing), plus targeted reproduction tests for every suspected bug. Finally the exact deployed files were served locally and played through in headless Chromium: six complete five-year terms in the real UI under different strategies with screenshots at every year, plus a scripted pass for flow bugs at phone, tablet and desktop widths.

Two caveats. First, there is no server: "backend" here means the simulation engine and content library that run in the browser. Second, the brief's Phase 5 asked me to review your consolidated feedback after forming my own view, but the placeholder in the brief was empty. Everything below is independent. Section 18 is reserved for the merge once you send it.

---

## 1. Executive verdict

**Score: 4 / 10 as a game. 8 / 10 as a piece of front-end engineering.**

**What is genuinely good.** The craft is real. No injection surface, no third parties, proper focus management and dialogs, contrast-checked palette, plain-English readouts ("7.4m waiting" rather than "health: 28"), a deterministic seeded simulation that survives reload, and a design philosophy in the code comments that is mostly right: higher-is-better indicators, consequences shown rather than silently applied, promises as objectives rather than hidden scoring. The Commons vote is the one screen that already feels like a game. The manifesto-as-objective idea is the right spine.

**What is holding it back.** It is a twenty-round multiple-choice questionnaire wearing a game's clothes. The player reads a card, reads three options with numeric previews, picks the one with the biggest green numbers, reads a dialog, clicks back, clicks next. Money has no consequence, so the biggest green numbers are always right: a spend-everything strategy wins the election in 100% of simulated terms and a frugal one wins 0%. Nothing the player does is remembered by the content: zero events reference a prior choice. Five of nine indicators, and all six regions, have no effect whatsoever on the election. The content runs out at quarter 13, so the last third of every term is a single "fund something" card and a "Next quarter" button. The ending is six rows of numbers.

**What it should become.** A control room, not a reading list. One persistent screen: Britain on the left, changing visibly as you govern; the desk on the right; the clock and the election countdown at the top. A quarter is something you *watch happen* after you have set your priorities and handled your crises, the way a Football Manager match is something you watch after you pick the team. Three scarce currencies (money, authority, attention), each with a dramatic failure state, so that every governing philosophy can win and every one can lose. Events that chain, escalate and remember. An election night that plays out region by region and hands the player a shareable verdict on the Britain they made.

---

## 2. The north-star experience

You are handed the keys to Downing Street with a map of Britain on the wall. Six regions, each with its own mood and its own problems: hospitals overwhelmed in the North, rents unaffordable in London, the lights flickering in Scotland. A clock in the corner counts down twenty quarters to the election.

Every quarter, three or four things land on your desk. A strike. A leaked message. A flood. Your Chancellor telling you the numbers don't add up. Each one is a card you can pick up, with two or three ways to handle it and an adviser or two arguing in your ear. You can't deal with all of them; you have to choose what gets your attention, and what you leave will get worse and come back angrier.

Alongside the crises you set your priorities: where the money goes this year, which fight you pick in Parliament, which promise you are actually going to deliver. Then you press **Run the quarter** and watch. Weeks tick by. The map changes colour. Cranes appear over Manchester because of the housing money you found last year. A headline scrolls past about the prison you didn't build. Your approval line twitches. Your own MPs mutter.

Some decisions pay off in the same quarter; most take a year or more, so the government you are in Year 4 is the one you built in Year 1. Money runs out if you spend, services collapse if you don't, your party turns on you if you break the promises they were elected on, and the bond markets turn on you if you pretend the bills aren't real. Every route can win. Every route can lose. And the country keeps a record.

On election night the results come in region by region. Then the game tells you who you were: the Builder who left Britain with 300,000 new homes and a deficit, the Bookkeeper who balanced the books and lost the North, the Reformer who took a beating in Year 2 and was vindicated in Year 5. You get a front page, a map of the Britain you left behind, the three decisions that defined your government, and a button that says *Do better*.

---

## 3. What should stay

- **Promises as objectives.** Choosing three pledges up front and tracking them live is the right spine. Keep it, but make the promises visible on the main screen at all times and make breaking one *cost* something politically, not just a chip turning red.
- **Human readouts.** "7.4m waiting", "230k homes a year", "0.8% growth". This is the single best design decision in the current build and should drive the whole visual layer.
- **Delayed consequences shown as chains.** "You chose X → Y is now happening" in the quarterly report is exactly right. It needs to be the main event, not one section of a long page.
- **The Commons vote.** Arithmetic, tactics, risk, a button that says *Hold the vote*. It is the one screen where the player is operating rather than reading. Expand it.
- **Advisers who disagree.** The second opinion driven by whatever pressure is worst is good and should be pushed harder into personalities.
- **Regional weighting.** Each region caring about different indicators is the right model. It just doesn't feed anything yet.
- **Uncertainty on outcomes.** The 0.72 to 1.28 multiplier with a shown range is good; keep ranges visible.
- **Engineering hygiene.** Engine and UI separation, `textContent` everywhere, seeded RNG in the save, accessibility.

---

## 4. What should fundamentally change

1. **The interaction model.** Five separate screens (briefing, decision, outcome dialog, consequences, and three tabs) for one quarter is a website. It should be one screen with a desk, a map and a clock, and a quarter should be watched, not clicked through.
2. **The economy of the game.** Money is currently free. There must be three scarce currencies with real failure states: Money (bond markets), Authority (your party and Parliament), Attention (what you can deal with). Every strategy should be a bet about which one you are willing to run short of.
3. **Memory.** The content system must know what you did. Events need prerequisites, exclusions, escalation stages and follow-ups. Today's model is a deck of 23 cards dealt once.
4. **What matters to the election.** Regions and five of nine indicators must actually feed the result. Otherwise the map is decoration and half the dashboard is lying about its importance.
5. **The late game.** Years 4 and 5 should be the most intense part of the term. Today they are the emptiest.
6. **The ending.** Election night, a verdict, a legacy, a Britain you can look at, a card you can share.
7. **Onboarding.** Manifesto-first is backwards. First decision within 30 seconds, promises chosen once the player knows what they are for.

---

## 5. Top 10 improvements

Ranked by impact on the actual player experience. Effort is relative to the current codebase.

### 1. Make money real: bond markets, borrowing costs and a fiscal crisis
**Problem.** Headroom is clamped at −£60bn and the penalty for being there is smaller than one funding card. Spend-everything wins 100% of terms. The `affordable()` check exists and is ignored.
**Why it matters.** Without scarcity there are no trade-offs, and without trade-offs there is no game. This single flaw is why every strategy collapses into "click the biggest green number".
**Recommended change.** Replace the clamp with a **market confidence** meter driven by deficit size and trend. As it falls: borrowing costs rise (a growing quarterly interest drain), then a "gilt wobble" event forces a choice (emergency cuts, tax rise, or ride it out), then a full mini-budget crisis that tanks approval, party unity and the economy in one quarter. Spending should also have diminishing returns per topic (already partly modelled) and a delivery lag (already modelled).
**Example.** Year 2, Q3: headroom −£18bn and falling. Chancellor card: "The markets have noticed." Options: £8bn cuts now (services −, approval −), a 2p tax rise (approval −, tax promise broken), or hold the line (60% chance nothing happens this quarter, 40% chance of a gilt crisis: economy −8, approval −6, party −8).
**Expected player impact.** Spending becomes a bet instead of a default. Frugal play becomes viable. Year 3–4 gets a natural dramatic peak.
**Effort:** Medium.

### 2. One main screen with the map, the desk and the clock
**Problem.** A quarter is five screens and roughly eight clicks. The map lives behind a tab that unlocks in quarter 2. Consequences arrive as a scrolling page.
**Why it matters.** The player never sees Britain and their decisions at the same time, so cause and effect never connect visually. This is the "website not game" problem in one sentence.
**Recommended change.** A single persistent layout. Map of Britain (large), desk of cards (side or bottom), HUD strip (money, approval, party, election countdown, promises). Cards open as overlays on top of the map, not as separate pages. Consequences animate onto the map and the HUD when the quarter runs.
**Example.** See section 7.
**Expected player impact.** Halves clicks per quarter, makes the map the thing the player looks at, and lets every consequence be a visible change rather than a sentence.
**Effort:** Large.

### 3. Events that remember: prerequisites, exclusions, escalation and follow-ups
**Problem.** Zero events reference a prior choice. Ignored events come back louder but identical. There is no escalation ladder. Nothing is mutually exclusive.
**Why it matters.** Replayability comes from "what if I had done X", which requires X to change what happens next. Today it changes a number.
**Recommended change.** Event schema with `requires`, `excludes`, `stage`, `follow` and `flags` (section 13). Every major event gets at least one follow-up that depends on the choice. Ignored issues escalate through named stages (Simmering → Crisis → Emergency) with different cards and worse options.
**Example.** See section 8.
**Expected player impact.** Stories the player caused. Different terms feel different.
**Effort:** Medium for the schema, Large for the content.

### 4. Run the quarter as a watchable sequence
**Problem.** "Run the quarter" is a button that produces a page of text.
**Why it matters.** This is the moment the simulation happens, and it is invisible.
**Recommended change.** A six to ten second sequence, skippable, with a pause: the clock advances week by week, headlines scroll, map regions shift colour, indicator dials move with a trail, matured decisions pop as chained callouts ("Your rail money → reliability up in the North"), and an unattended problem visibly escalates. Ends on a compact scorecard overlay, not a page.
**Expected player impact.** The single biggest change to how the game *feels*. Turns reading into watching.
**Effort:** Medium (the data is all there; it is a presentation layer).

### 5. Regions and all indicators feed the election
**Problem.** Seat projection uses approval, economy, party and health only. Crime, energy, transport, migration, defence, services and all six regions have zero effect on seats. Regions feed nothing at all.
**Why it matters.** Half the dashboard is decoration. The map cannot matter if it doesn't count.
**Recommended change.** Give each region a seat count (roughly Scotland 57, North 158, Midlands 105, Wales 32, London 75, South 223) and compute seats per region from regional approval, which already derives from each region's own indicator mix. National approval becomes a derived number. Add a "swing" concept so marginal regions matter more.
**Example.** A London-heavy housing collapse costs 30 seats in London and the South even if the North loves you. The North can be won with transport and NHS.
**Expected player impact.** The map becomes the strategy board. "Where am I losing?" becomes a real question.
**Effort:** Small to Medium.

### 6. Fill Years 4 and 5, and make them the hardest
**Problem.** Under balanced play, the desk has zero events at quarters 13, 14, 15, 17, 18 and 19. The player sees one funding card and "End the quarter without acting".
**Why it matters.** The run-up to the election should be the climax. It is currently the lull.
**Recommended change.** Content for the late term: a leadership challenge if unity is low, a pre-election spending scramble, an opposition poll lead with a "reshuffle or hold" choice, promise reckoning cards ("You promised X; here is your last chance"), a scandal that lands worse in Year 5, external shocks weighted late. Escalation from Year 1–2 issues should naturally arrive here. Manifesto promises should lock at Q16 so the player cannot fix them in Q19.
**Expected player impact.** Tension rises to the finish instead of fading.
**Effort:** Medium (content) once the schema in #3 exists.

### 7. Three currencies with visible failure states
**Problem.** Party unity has no failure state (nothing happens at 20%). Attention (actions) resets each quarter with no memory. Money has no failure state.
**Why it matters.** Scarcity is what makes a decision a decision. A currency without a failure state is a number.
**Recommended change.** Money → market confidence and a fiscal crisis (#1). Authority → party unity below 40 triggers a confidence vote; a lost vote ends the term early (a genuine loss state, and a shareable one). Attention → ignored problems escalate (#3) and the backlog is visible as a pile on the desk.
**Expected player impact.** Every strategy has a way to lose, which is the precondition for any strategy being interesting to win with.
**Effort:** Medium.

### 8. Fix the dominated choices and the "britain" effect
**Problem.** 12 of 23 events have one option that beats the worst by a wide margin under any sane weighting. Eight choices have no downside at all. Every `britain` effect also moves `services`, which therefore hits 100 in every non-frugal term and makes "The Reformer" the legacy in 60–80% of wins.
**Why it matters.** Fake choices are the fastest way to make a player feel the game is a form.
**Recommended change.** Every option should trade one currency for another. Remove the automatic `services` coupling. Re-tune so the best immediate option is rarely the best long-term option (e.g. the popular energy cap costs the most later).
**Expected player impact.** The player thinks instead of scanning for green.
**Effort:** Small to Medium.

### 9. Election night and a shareable verdict
**Problem.** The end screen is six rows of numbers, a legacy word and "Run again".
**Why it matters.** The ending is the reward for five years and the thing players show friends.
**Recommended change.** See section 12.
**Effort:** Medium.

### 10. Onboarding: first decision in 30 seconds, promises after
**Problem.** Title → "How it works" → six promise buttons plus a free-text box → briefing → decision. About 300 words before a choice, and the player is asked to promise things before they know what a promise does.
**Recommended change.** See section 11.
**Effort:** Small to Medium.

---

## 6. Proposed new core loop

A quarter has four beats. The player spends most of their time in the first two and *watches* the third.

**Beat 1: The desk (30–60 seconds).** Three to four cards fan onto the desk over the map: one urgent, one or two ordinary, and one standing decision (the budget or a bill). Each card shows a title, a one-line situation, its region pin on the map, and a cost in attention. The player picks up the ones they want to handle. Anything left will escalate; the card's corner shows what it turns into.

**Beat 2: Handling (per card, 15–30 seconds).** A card opens as an overlay. Two or three options, each phrased as an action, each showing which currency it spends and which it earns as coloured chips (Money, Approval, Party, and the relevant department dial), plus a "takes time" clock for delayed payoffs. Two advisers, one line each, and they disagree. Pick one. The card resolves with a headline and the relevant dial or region pulses. No dialog to dismiss.

**Beat 3: Run the quarter (6–10 seconds, skippable).** The clock runs. Headlines scroll. The map shifts. Matured decisions pop as chained callouts. An escalating problem visibly grows. The HUD dials move with trails. Ends on a compact scorecard overlay: three things that changed, one thing that is coming, promise status.

**Beat 4: Glance (5 seconds).** The scorecard closes and the player is back on the desk with the next quarter's cards arriving. The election countdown ticks down one.

### Example: Year 2, Quarter 3

*Desk.* Four cards arrive: **PRISONS FULL** (urgent, pinned on the Midlands, cost 1), **THE WHATSAPPS LEAK** (cost 1), **RAIL UPGRADE BILL** (a bill you introduced last quarter, now scheduled for its Commons vote, cost 2), and the standing **AUTUMN STATEMENT** (cost 1). The attention meter shows 3. The player can't do everything.

*Handling.* The player opens Prisons. Justice Secretary: "There are no good headlines here." Chancellor: "Modular jails are £5bn we do not have." Options: Early release (Approval −4, Crime dial +1, Party −2), Temporary prisons (Money −£5bn, Crime +3), Tougher sentencing (Approval +3 now, but a clock icon: "Courts can't sentence" in two quarters). The player picks early release. Headline: PRISONERS FREED EARLY. The Midlands pin turns amber. Attention 2.

The player opens the Rail Bill vote. The arithmetic: 336 MPs, 14 expected rebels, need 326. "Too close to call." They talk to the rebels (attention 1) and win six round. Hold the vote: passes 330–320. Headline. Transport dial shows a clock: "+reliability in Year 3". Attention 0.

The WhatsApps leak stays on the desk. Its corner says "Next quarter: the story spreads."

*Run the quarter.* Weeks tick. "EARLY RELEASE: FIRST REOFFENDING CASE" scrolls. Crime dial dips. A callout chains from Year 1: "Your energy fast-track → first wind farm connected" and the Scotland region brightens a shade. The market confidence needle drops a notch: −£23bn and falling. Scorecard: Approval 51 → 49. Money −£19bn → −£23bn (borrowing costs rising). Party 58 → 56. Coming: "The WhatsApps leak has spread to the Home Secretary's diary."

*Glance.* Back on the desk. Countdown: 13 quarters to the election. The leak card is now red.

---

## 7. Proposed main game screen

Think of a war room wall, not a web page.

**Always visible (the HUD, top strip):**
- **The clock and countdown:** "Year 2, Autumn · 13 quarters to the election". The countdown is the tension device; it should be big.
- **Money:** headroom as a number *and* a market-confidence gauge with a needle. Negative money glows amber, crisis glows red.
- **Approval:** a number with a sparkline of the last eight quarters, and a small "polls: lead / behind" tag against the opposition.
- **Your party:** unity as a number with an MPs icon; below 45 a "restless" tag, below 35 a "challenge risk" tag.
- **Promises:** three small chips, always on screen, each with a mini-progress bar toward its target. Broken ones stay visibly broken.

**Britain (left two thirds on desktop; top half on mobile):** the six-region stylised map, filled by regional approval (the number that will elect you), with department signs on each region (cranes, ambulances, pylons) that change as indicators cross thresholds. Tapping a region shows its mood, its top two concerns and what you have done for it. Event cards pin to the region they affect. When the quarter runs, this is where things happen.

**Department dials (a row under the map):** NHS, Housing, Economy, Crime, Energy, Transport as six small gauges with their human readout ("6.9m waiting"), a trend arrow and a clock icon if money is on its way. Tap a dial to see the last four quarters and what moved it.

**The desk (right third on desktop; bottom sheet on mobile):** the quarter's cards, fanned. Urgent on top with a red edge. Each card shows attention cost and a region pin. The attention meter sits at the top of the desk as three coins. Below the cards, the standing decisions: **Budget** (open a slider panel for this year's allocations) and **Parliament** (introduce a bill, see the arithmetic).

**Choosing actions:** tap a card → overlay over the map with the options as large buttons showing currency chips → pick → card resolves in place with a headline strip; no dialog, no "back". Budget: sliders per department with the total against headroom and the market gauge reacting live. Bills: the existing vote screen, as an overlay.

**Consequences:** the run-the-quarter sequence animates them onto the map, the dials and the HUD. Chains draw as a line from the old decision's ghost card to the region or dial it moved. After the run, a compact scorecard overlay (three lines up, three lines down, one thing coming) that dismisses on tap.

**Where the election lives:** the countdown in the HUD, a "Projection" button that shows the seat map by region at any time (the map recoloured by projected outcome, a seats bar, and "if the election were tomorrow"), and election night as its own sequence at the end.

**Mobile:** map on top (collapsible to a strip of six region chips), desk as a bottom sheet, HUD fixed. Cards open full screen. All of it works with thumbs.

---

## 8. Example decision chains

Each chain shows how a Year 1–2 choice produces a Year 3–5 story. These use the existing events as starting points where possible.

**1. NHS pay (health, public finances, party).**
Q1 NHS strike → *Give them 8%* → Q3 nurses and teachers demand parity ("If doctors got 8%…") → *Concede* (Money −, inflation +) or *Refuse* (Services −, strikes spread) → Q6 if conceded: inflation card, Bank of England raises rates, mortgage anger in the South → Q10 if refused: winter crisis, hospitals overwhelmed sign on the North → Q16 promise reckoning: waiting list target met or missed → election: health is the North's top concern.
Alternative branch: *Offer 5% + reform* → Q5 productivity reforms unpopular with consultants → Q9 first productivity figures (uncertain: 60% good) → Q13 waiting lists fall visibly, cranes become green crosses.

**2. Planning reform (housing, party, Parliament, London).**
Q2 planning bill → *Full reform*, passes with two concessions → Q4 backbench "NIMBY caucus" forms, party −3 → Q6 by-election in a shire seat, lost → Q8 rebels demand a planning U-turn as the price of the next bill → hold firm (Authority −) or U-turn (housing pipeline collapses) → Q12 if held: first big housing numbers, London and South approval up, cranes on the map → Q18 rents fall headline → election: housing promise delivered, London swings to you.
Alternative: *Drop the bill* → Q7 rents crisis in London, Q11 "generation rent" protest event, Q15 housing promise formally broken, London seats lost.

**3. Borrowing (public finances, economy, everything).**
Q3 fiscal hole → *Borrow more* → Q5 borrowing costs rise (interest drain begins) → Q7 "The markets have noticed" card: cuts, tax, or hold → *Hold* → Q8 40% gilt crisis: economy −8, emergency Budget forced, approval −6, party −8, opposition lead → Q10 recovery choices under constraint (every card costs more) → Q14 either a credibility recovery arc or a leadership challenge.
Alternative: *Raise income tax* → tax promise broken → Q4 party unity −6, "tax rebels" flag → Q9 rebels threaten your next bill → Q16 the money bought something visible (services strong) and the story is "honest but unpopular".

**4. Prisons (crime, public finances, justice).**
Q3 prisons full → *Tougher sentencing* → Q5 courts postpone sentences (hidden until now: sentencing backlog counter) → Q8 a high-profile case is released on a technicality, Crime confidence −6 → Q10 "Law and order emergency" card with only expensive options → Q13 prison building programme (Money −, pays off Year 5) → election: crime promise depends on whether you started building in time.
Alternative: *Early release* → Q4 reoffending headline → Q6 opposition attack, approval −2 → Q9 if crime dial recovers, the story dies; if not, it becomes the Year 4 attack line.

**5. Energy (energy, public finances, Scotland, planning).**
Q2 energy shock → *Cap bills* → Q4 the cap costs more than forecast (Money −£3bn extra, uncertain) → Q7 second price spike, cap must be renewed or removed (renewing is now a habit the markets price in) → Q11 no structural change made, energy insecure sign on Scotland → Q15 winter blackouts risk card.
Alternative: *Fast-track clean energy* → Q4 pylon protests in the Midlands and South (party −, approval −2 there) → Q6 planning fight overlaps with the housing bill (two rebellions at once) → Q10 first projects connect, Scotland brightens → Q14 bills fall, energy promise on track, "clean power online" sign.

**6. Migration (migration, councils, local elections, Home Office).**
Q4 asylum backlog → *Hire caseworkers* → Q7 backlog falls but removals rise, legal challenge event → Q9 courts block part of the system → *Legislate* (a bill, rebels on both wings) or *Accept* (migration confidence −) → Q13 local elections: migration is the top issue in the Midlands.
Alternative: *Harsher rules* → Q6 court blocks → Q8 "the boats" headline weekly (recurring −1 approval until resolved) → Q12 Home Secretary scandal chain triggers if the leak event fires while this is unresolved.

**7. Rail (transport, the North, unions).**
Q4 rail meltdown → *Fund the upgrade* → Q6 cost overrun card (uncertain 50%): find £3bn more or descope → Q9 rail strike over the new operating model → Q12 first upgraded line opens, North approval +4, "transport improving" sign → Q17 a Northern mayor endorses you, seats in the North safer.
Alternative: *Blame the operator* → Q8 franchise collapse, forced nationalisation card (Money −) → Q13 still failing, North approval −.

**8. Scandal (party, media, authority).**
Q3 WhatsApps leak → *Order an inquiry* → Q5 inquiry report lands: minister cleared (30%) or condemned (70%) → if condemned: sack now (Authority −, looks weak) or defend (Approval −, the story runs) → Q7 if defended: a second leak names you → Q9 "Do you have confidence in the PM?" PMQs card with a real party unity hit → Q11 leadership challenge if unity < 40.
Alternative: *Sack immediately* → Q4 the minister becomes a backbench critic (rebels +2 on every bill) → Q10 they run a rival platform in the local elections.

**9. AI and jobs (economy, Midlands, welfare).**
Q6 AI boom → *Let the market decide* → Q8 call-centre closures in the Midlands and Wales, "jobs being lost" sign → Q10 retraining demand card (Money −) → Q14 if funded, productivity gains; if not, regional approval −6 in two regions.
Alternative: *Investment + retraining* → Q9 productivity up, economy +, but Q11 a data-centre energy demand card links back to chain 5.

**10. The Lords (Parliament, time, authority).**
Q7 Lords amendments → *Reject* → Q8 ping-pong: the bill eats a quarter of parliamentary time (one fewer attention next quarter) → Q9 either Parliament Act override (Authority +, looks strong) or a deal → Q12 the bill finally lands with its original effects.
Alternative: *Accept most changes* → no time cost, weaker bill, your MPs annoyed → Q10 "soft on the Lords" rebels.

**11. Floods (services, resilience, the South West).**
Q4 floods → *Relief only* → Q12 second flood, worse, "you were warned" headline, approval −4, Wales and South signs → Q13 resilience is now twice the price.
Alternative: *Relief + resilience* → Money − now → Q12 second flood, defences hold, approval +3, "prepared" story.

**12. External shock (defence, public finances, allies).**
Q5 war escalates → *Limit involvement* → Q8 allies cool, trade deal event blocked (economy −) → Q11 a security incident at home, defence readiness matters.
Alternative: *Increase support* → Q7 defence budget squeezes services → Q10 refugee arrivals link to chain 6.

**13. Manifesto reckoning (all).**
Q16 promises lock. For each promise: delivered → a "keep it" card (defend the record in the campaign); missed → a "explain it" card with a choice between honesty (party +, approval −) and spin (approval + now, uncertain scandal later). Broken tax promise specifically triggers a Year 5 rebel bloc.

---

## 9. Game balance recommendations

The principle: **every strategy spends one currency to earn another, and every currency has a cliff.**

| Strategy | What it spends | What it earns | Its cliff | How it wins |
|---|---|---|---|---|
| **The Builder** (spend on housing, transport, energy) | Money, early approval | Long-term growth, regional swings, delivered promises | Market confidence: a gilt crisis in Year 3 if the deficit isn't managed | Growth arrives in Year 4 and pays for itself; the map turns green |
| **The Bookkeeper** (restraint, balanced books) | Approval, services, party patience | Market confidence, a war chest, low borrowing costs | Services collapse and a "what was it all for" opposition in Year 4 | Spends the war chest in Year 5 on visible things; wins on competence |
| **The Populist** (approval-first, giveaways) | Money, party unity, long-term dials | Big polling lead early | Delivery: nothing improves, promises break, unity collapses, leadership challenge | Times the giveaways for Year 5 and rides the poll lead through the election |
| **The Reformer** (bills, restructures, fights) | Authority, party unity, approval in Years 1–2 | Structural gains in Years 3–5, the strongest legacy | Rebellions: loses a flagship vote, or a confidence vote in Year 2 | Survives the middle years; reforms mature exactly when the election arrives |
| **The Technocrat** (balanced, reactive) | A little of everything | Stability | Never gets a story; loses on "no vision" in a close election | Wins if the opposition is weak and nothing external blows up |

Concrete mechanics that produce this:

- **Money:** deficit → borrowing cost drain (quarterly, growing) → market events → crisis. Growth widens headroom (already modelled). Spending has diminishing returns per topic (already modelled) and a delivery lag (already modelled). Remove the −60 clamp.
- **Approval:** pulled toward fundamentals (already modelled), but fundamentals should include crime, energy and transport at low weights, and *regional* approval should be what elects you, so a national number can hide a regional collapse.
- **Party:** breaking a manifesto promise costs unity; every unpopular vote costs unity; a rebel bloc forms as a persistent modifier on future votes; unity < 40 triggers a confidence vote; losing it ends the term (loss state with its own ending).
- **Attention:** three per quarter, but unresolved issues escalate through stages with worse options and higher costs, so backlog is a real debt.
- **No ideologically correct answers:** every "left" option should have a "right" failure mode and vice versa. Spending → markets. Cutting → services and revolt. Tough on crime → prisons full. Soft on crime → reoffending headline. Cap bills → deficit. Let prices rise → poverty headlines. The game should reward *coherence and timing*, not a side.
- **Uncertainty:** keep the outcome multiplier, add a handful of genuinely probabilistic events (the gilt crisis, the inquiry verdict, the cost overrun), always with the odds shown.
- **Validate with the harness:** the target is that four archetypal bots each win 40–60% of terms and no bot wins more than 70%.

---

## 10. Five-year difficulty curve

**Year 1: Learn by doing.** Two cards a quarter, one clearly urgent. The promises are chosen at the end of Q1 (see onboarding). Advisers explain what each currency does the first time it moves. First bill in Q2 with a generous majority. Money is comfortable. Difficulty: low; goal is that the player understands the three currencies and the map by Q4.

**Year 2: The government gets an identity.** Three cards a quarter. The first consequences of Year 1 land (pay parity, rebels, cost overruns). The first "which promise are you actually going to deliver" pressure. Local elections at Q6 as a mid-term verdict that names the region you are losing. The budget slider panel unlocks. Difficulty: medium; the player commits to a strategy here, often without realising.

**Year 3: The bill comes due.** Money is tight for spenders, services are creaking for savers, unity is fraying for reformers. Market confidence events for anyone in deficit. A scandal chain. Escalated Year 1 issues return as emergencies. The player should feel the game push back for the first time. Difficulty: high.

**Year 4: Pressure.** Four cards a quarter. Opposition poll lead visible in the HUD. Leadership challenge risk if unity is low. Long-term investments start paying off, which is the Builder's and Reformer's reward. Promise chips show "at risk" with a countdown to the Q16 lock. External shock weighted here. Difficulty: highest.

**Year 5: The campaign.** Promises lock at Q16. Every card is now framed by the election: the pre-election Budget, the manifesto reckoning cards, a campaign-launch choice, the final debate PMQs. The map shows projected seats live. Money spent now buys approval but the markets know why. Difficulty: high but *different*; the player is now optimising a known endpoint, which is its own tension.

The current curve is the inverse of this: hard at Q1 (NHS at 28, everything red), then flat, then empty.

---

## 11. Onboarding redesign

Assume the player knows nothing and is on a phone.

**0–10 seconds.** Title screen: the map of Britain, dim, with a single line: "Run Britain for five years. Try not to get sacked." One button: **Take office**.

**10–40 seconds: The first morning.** Straight onto the main screen, map lit, one card already on the desk: **NHS STRIKE**. Two advisers in the overlay, each with one line. Three options as big buttons with currency chips. The first time a chip appears, a one-line coach mark: "£ is your spare money. Run out and the markets get nervous." The player picks. The card resolves, the NHS dial pulses, the headline strip runs. That is the whole tutorial for currencies.

**40–60 seconds: Your promises.** Before the first quarter runs, the Party Chair card: "The country wants to know what you're for. Pick three." Same six promises, but as map-pinned cards ("Cut waiting lists: the North cares most") and no free-text box. Each shows its target in the human readout ("from 7.4m waiting to under 6.5m"). This is the moment a promise makes sense, because the player has just felt what the NHS dial is.

**60–90 seconds: Run the quarter.** One button. The player watches the first sequence. Coach marks on the first run only: "This is what your decision did", "This is coming back later", "This is the election countdown".

**Terminology.** Rename in the UI, keep in the engine: "Fiscal headroom" → **Spare money**; "Party unity" → **Your MPs**; "Working majority" → **Votes you can count on**; "Whip" → explained the first time in the vote overlay ("Threaten to kick rebels out of the party"); "Manifesto" → **Your promises**; "Lords" needs one line the first time. Every term of art gets a tap-to-explain tooltip rather than a briefing dialog. Remove the "Read the brief" essays from the decision flow; keep them as an optional "Explain this" link.

**Cut from the current opening:** the 49-word title lede, the "How it works" dialog, the tab unlocking (which hides the map exactly when the player should be learning it), and free-text custom promises.

---

## 12. Election and ending redesign

The ending should answer the eight questions in the brief, in this order, as a sequence.

**1. Election night (30 seconds, skippable).** The map dims. Results come in region by region, in a plausible order (North East first), each region flipping to its colour with a seat count and a one-line reason ("The North: transport investment paid off, +12"). A seats bar fills toward 326. A "swing" needle. Music optional. The moment 326 is crossed, or it becomes impossible, is the beat.

**2. The verdict.** "Did I win?" and "Why?" on one screen: seats, the three regions that decided it, the two indicators that mattered most to voters, and the opposition's attack line that stuck.

**3. Your Britain.** A before/after map: Year 1 versus Year 5, with the department signs. Below it, the human readouts side by side: waiting list, homes, growth, bills, crime confidence, with arrows. "What did I achieve, what did I damage."

**4. Your government.** The legacy title (keep the five, add a few: The Survivor, The Builder, The Bookkeeper, The Reformer, The Deliverer, The Gambler, The Firefighter, The Caretaker), chosen by the *shape* of the term (where the money went, which promises were kept, how many bills passed, how many crises escalated), not a fixed if-chain. Then **the three decisions that defined your government**, computed as the three choices with the largest downstream effect, each with its chain ("You gave doctors 8% → nurses demanded parity → inflation → rates rose → the South turned"). Then the promises, delivered or broken, with the quarter each was decided.

**5. The front page.** A generated newspaper front page: headline, sub-head, the map thumbnail, three bullet stats. This is the share card. Designed at 1200×630 so it looks right in a chat.

**6. Play again, differently.** Not "Run again" but three prompts derived from this term: "Try winning without borrowing", "Try keeping the tax promise", "Try losing the vote you won". Each starts a new term with that as a highlighted challenge and a badge if achieved. This is the replayability engine.

Also a **loss state that isn't the election**: a lost confidence vote in Year 3 produces its own short ending ("Your party sacked you before the voters could") and share card. Losing dramatically is more shareable than winning quietly.

---

## 13. Technical architecture recommendations

The current architecture is one 984-line engine module, one 888-line UI module and one 308-line content file, all globals, no build, no tests. That is fine for a prototype and it is clean, but it cannot support the redesign for four reasons: the content has no vocabulary for conditions or chains; state is a flat bag with no notion of issues, flags or history; the UI is a set of screens rather than a scene; and there is no way to validate content or balance automatically.

**Keep:** vanilla JS or a very light layer, no backend, `localStorage` saves, the seeded RNG, engine/UI separation, `textContent`-only rendering.

**Change:**

### 13.1 Event and content schema
Events become declarative records with conditions and consequences the engine can reason about.

```js
{
  id: 'nhs_pay_parity',
  title: 'NURSES DEMAND PARITY',
  region: 'North',                 // where it pins; null for national
  topic: 'health',
  stage: 1,                        // escalation stage of the issue it belongs to
  issue: 'public_sector_pay',      // groups escalating cards
  requires: { flags: ['nhs_deal_8pc'], turnMin: 3 },
  excludes: { flags: ['pay_freeze'] },
  weight: (s) => 10 + (s.flags.nhs_deal_8pc ? 20 : 0),
  once: true,
  cost: 1,
  options: [
    { id: 'concede', text: 'Match the deal',
      effects: [{ k: 'money', v: -4 }, { k: 'services', v: +3 },
                { k: 'inflation', v: +1, after: 2, text: 'Pay rises feed inflation' }],
      setFlags: ['pay_parity_conceded'], chance: null },
    { id: 'refuse', text: 'Hold the line',
      effects: [{ k: 'approval', v: -3 }, { k: 'services', v: -2 }],
      escalate: { issue: 'public_sector_pay', to: 2, after: 2 } }
  ],
  advisers: ['chancellor', 'health'],
  followUps: [{ optionId: 'concede', eventId: 'inflation_warning', after: 2, chance: 0.7 }]
}
```

Key properties: `requires`/`excludes` on flags, indicators, turn windows, region conditions and promises; `weight` as a function of state; `issue` and `stage` for escalation ladders; `followUps` with delay and probability; `setFlags` on options; `region` for map pinning and regional effects. Effects gain `after`, `chance`, `region` and `text`.

### 13.2 State model
```js
state = {
  turn, seed, rngCursor,
  money: { headroom, borrowingCost, confidence },
  approval: { national, byRegion: {…}, history: [] },
  party: { unity, rebelBloc: 0, challengeRisk },
  indicators: { …, history: { health: [], … } },
  regions: { North: { approval, seats: 158, concerns: […], signs: [] }, … },
  promises: [{ id, target, lockedAt, status }],
  flags: Set,                      // everything the content can test
  issues: { public_sector_pay: { stage: 1, since: 3, cards: [] } },
  scheduled: [{ dueTurn, effect | eventId, cause }],
  history: [{ turn, eventId, optionId, effects, headline }],   // the record, structured
  bill: null, phase: 'desk' | 'card' | 'vote' | 'running' | 'scorecard' | 'election'
}
```
`flags` and `issues` are what make memory possible. `history` as structured data is what makes "the three decisions that defined your government" computable. Per-region approval is what makes the map count.

### 13.3 Engine modules
Split the engine into small pure modules with one job each: `rng.js`, `effects.js` (apply, schedule, mature), `scheduler.js` (event selection with requires/excludes/weights and escalation), `economy.js` (money, confidence, borrowing), `politics.js` (unity, rebels, votes, confidence vote), `regions.js`, `election.js` (seats by region), `legacy.js` (title and defining decisions), `save.js` (versioned with migrations). Each exports pure functions of `(state, …) → newState/report`. The state machine (`phase`) is enforced in one place and the UI cannot bypass it.

### 13.4 Content validation and balance harness
A `scripts/validate-content.js` that checks every event: referenced flags exist, follow-up ids exist, every option touches at least two currencies with opposite signs, windows are sane, every issue has a stage 2. A `scripts/balance.js` (the harness used for this audit, essentially) that runs N terms per archetypal bot and fails CI if any bot's win rate is outside 30–70% or any indicator saturates. These two scripts are worth more than any framework.

### 13.5 UI as a scene
One root layout with regions (HUD, map, dials, desk, overlay) rendered from state, rather than seven `view-*` sections. The map becomes an SVG component with per-region state and CSS transitions; the run-the-quarter sequence is a timeline of state snapshots played with `requestAnimationFrame` and honouring `prefers-reduced-motion` (instant final state). A tiny reactive layer (Preact or lit, both under 5 KB) would cut the render code roughly in half and make the overlay/phase logic far less brittle; it is optional but recommended once the layout is a scene.

### 13.6 Tests
Engine unit tests (Node's built-in test runner is enough) for: effect application and clamps, scheduling and escalation, vote arithmetic, election seats, save migration. A Playwright smoke test that plays one full term with a bot. These would have caught every bug in section 14.

### 13.7 Housekeeping
Add `[hidden] { display: none !important; }`. Add a CSP meta tag. Drop `orientation: portrait` from the manifest, or add a service worker if offline is actually a goal. Version the save schema with a migration function rather than discarding on mismatch.

---

## 14. Confirmed bugs

All reproduced against the deployed build. Ranked by severity.

| # | Severity | Bug | Evidence |
|---|---|---|---|
| B1 | High | **Borrowing has no cost.** Headroom is clamped at −£60bn in two places; strain caps at economy −1.7, approval −0.9, party −1.0 per quarter; `choice.affordable` is computed and never read by `decide()` or the UI. | Spend-everything bot: 100% election wins over 1,200 terms with headroom at the floor. Frugal bot: 0%. |
| B2 | High | **Vote phase not enforced.** `state.phase` is written, never read; tabs stay live on the vote screen. Re-entering the decision mints a new bill with re-rolled rebels and reset concessions. Running the quarter with a bill pending leaves `state.bill` set, applies a neglect penalty to the bill's own topic, and if the event's window has closed the next resume crashes in `commitChoice` on "Hold the vote". | Browser: rebels 16 → 17 on re-entry, concessions 0. Engine: `TypeError: Cannot set properties of undefined (setting 'done')`. Housing 32 → 25.9 for a bill in flight. |
| B3 | High | **`hidden` overridden by CSS.** `.stats` and `.tabs` set `display: flex`; only `.view[hidden]` is handled. HUD and Agenda tab render on title, manifesto and end screens; clicking Agenda from the title starts a term with zero promises and saves it. | Computed style at 390/620/1280px. Turn 2 reached with `promises.length === 0`. |
| B4 | High | **"Start again" wipes the save with no confirmation**, while the in-game home button promises "Nothing is lost". | One click, no dialog, save removed. |
| B5 | High | **Content exhaustion.** 22 non-final events, 19 playable quarters, two slots each, each event once. | Balanced bot: zero events on the desk at Q13, 14, 15, 17, 18, 19 in 100% of 200 terms; Q16 has only the final Budget. |
| B6 | Medium | **Concessions single-use.** `canConcede` compares `concessions` (rebels won back, 4–9 per use) to 3 instead of `concessionCount`; the guard line is a no-op assignment. A successful "Talk" also disables it. | Button disabled after one use in the browser. |
| B7 | Medium | **Regions and five indicators do not affect the election.** `finish()` uses approval, economy, party, health only; `regions` feed nothing. | +30 on any region: 0 seats. +20 on crime, energy, transport, migration, defence, services or housing: 0 seats directly. |
| B8 | Medium | **Ignoring political and fiscal events has no consequence.** Neglect drift only applies to indicator topics; scandal, PMQs, by-election, local elections, Lords and the £18bn hole can be ignored forever, while the UI says they "will get worse". | Zero neglect entries for `tax_gap` and `minister_scandal`. |
| B9 | Medium | **Abandoning a bill costs zero actions; "Talk" is free at zero actions.** | 3 actions before and after abandoning a 2-action bill. |
| B10 | Medium | **Public services saturates.** Every `britain` effect also moves `services`. | Services 97–100 at the end of every non-frugal term; "The Reformer" in 60–80% of wins; "The Deliverer" almost never (tested last). |
| B11 | Medium | **Tax promise near-unkeepable.** Kept 0% under active bots, 15–23% random; a bot built to keep it kept it 81% and won 0%. | Headroom drifts (economy − 55) × 0.45 − 2 per quarter. |
| B12 | Medium | **Scripted opening.** Q1 is always NHS Strike + (Rates or PMQs) + Fund Energy; Q2 always Planning; Q3 Energy 97%. | 200 seeds. |
| B13 | Medium | **Lords event mechanics contradict its text.** "Reject the amendments" (what your MPs demand) carries voteBoost −2 and 7 rebels; "Accept" carries +7 and 4 rebels. | Engine. |
| B14 | Medium | **Save loaded without validation.** `Object.assign(freshState(), parsed)` after a version check only; `indicators: null` loads and `britain()` throws; no error boundary. | Engine. |
| B15 | Medium | **Flagship planning bill fails 90% un-negotiated.** 13–19 rebels vs an 11-seat cushion. | 500 votes: 10% pass with no tactics, 96% with all three. |
| B16 | Low | Chain explanation always says "1 quarter(s) ago"; `report.chains` never rendered. | Engine. |
| B17 | Low | Copy/number mismatches: "Extra £2bn found" on a −£5–9bn choice; "£12BN RAIL PLAN" on a −£4–8bn choice. | Content. |
| B18 | Low | Defeat story reports expected rebels, not the actual post-swing count. | Engine. |
| B19 | Low | Vote-event previews show effects as certain; no hint they apply only on passing or are diluted up to 55% by concessions. | UI. |
| B20 | Low | Consequences headline usually repeats the outcome-dialog headline. | `pickHeadline` returns `news[0]`. |
| B21 | Low | Manifest locks portrait; no service worker so not offline; no CSP meta. `busy` guard is synchronous and guards nothing. First RNG step exceeds 2^53 (harmless). | Assets. |

**Suspected design problems, not bugs:** three actions per quarter never binds after Year 2 (the desk rarely costs more than 3); the investment card is the same card every quarter; custom promises are judged on approval ≥ 50 and unity ≥ 55 regardless of text; the tab-unlock mechanic hides the map for the first quarter; "Read the brief" essays average 90 words per card.

---

## 15. Implementation roadmap

### Phase 1: Make the current game materially better (1–2 weeks)
Fix B1–B6, B8–B10, B13–B14 in the existing code. Specifically: remove the −60 clamp and add a growing borrowing-cost drain plus one "markets have noticed" event; enforce the vote phase and hide tabs during it; add the `[hidden]` rule; confirm before wiping a save; fix concessions; deduct actions on abandon; drift party/headroom for ignored political events; decouple `services`; flip the Lords boosts; validate saves. Add ten late-term events and let escalated issues recur so Q13–19 are never empty. Merge the outcome dialog into an inline headline strip (removes one click per decision). Make regional approval feed the seat projection. Run the balance harness until no bot exceeds 70%.

### Phase 2: Core gameplay redesign (4–8 weeks)
The single main screen (section 7): map, dials, HUD with countdown and promise chips, desk as cards, overlays for cards and votes. The run-the-quarter sequence. The event schema and state model from section 13, with a migration of the existing 23 events into it. The three currencies with failure states: market confidence and fiscal crisis, confidence vote, escalation ladder. The onboarding sequence from section 11. Election night and the verdict screens from section 12, first version.

### Phase 3: Depth and replayability (4–8 weeks)
The thirteen chains in section 8 and roughly 60 more events across all topics, written to the schema with follow-ups and escalation. Regional seats and a proper election model. The budget slider panel as a standing decision. Named advisers with personalities and consistent positions. Legacy titles computed from the shape of the term; "three defining decisions" computed from history. The "play again, differently" challenges. Balance harness in CI.

### Phase 4: Polish and distribution (ongoing)
Animation polish on the map and dials, sound (optional, off by default), the share-card renderer, a proper favicon and social preview, a service worker if offline matters, privacy-respecting analytics (a self-hosted counter for terms started, terms finished, wins, legacy distribution, and which challenge prompts get taken), a difficulty setting only after balance is proven, and localisation of readouts if there is ever appetite for other countries.

---

## 16. What NOT to build

- **A 650-constituency map.** Six regions with seat counts gives 90% of the strategic value for 5% of the work and stays readable on a phone.
- **Named cabinet ministers with loyalty stats.** Tempting, and it's a whole second game. Advisers with personalities, yes; a cabinet management layer, not until the core loop is proven.
- **Free-text custom promises.** They cannot be scored honestly. Replace with a longer list of preset promises.
- **Real-time simulation.** Turn-based with a watchable quarter gives the same feeling with none of the mobile and accessibility cost.
- **A full House of Lords or devolution model.** One or two events each is plenty.
- **A foreign-policy tree.** External shocks as events, not a diplomacy system.
- **Generated (LLM) events at runtime.** Undermines the deterministic, testable content model and the privacy promise.
- **Achievements, daily challenges, leaderboards** before the loop is fun.
- **Difficulty modes** before the balance harness says the default is balanced.
- **A tutorial mode.** Onboarding in the first quarter is the tutorial.
- **More decision cards on the current schema.** Volume on a model without memory adds reading, not play.

---

## 17. If you could only make five changes

1. **Make money real.** Borrowing costs, market confidence, a fiscal crisis. Without this nothing else is a trade-off.
2. **One screen: map, desk, clock.** Consequences on the map, cards over the map, the countdown always visible. This is what turns reading into operating.
3. **Events that remember.** Flags, prerequisites, escalation and follow-ups, with the thirteen chains as the first content.
4. **Watchable quarters.** The run-the-quarter sequence with chained callouts. Cheapest large change to how the game feels.
5. **Election night and a shareable verdict.** Region by region, the Britain you left behind, the three decisions that defined you, a front page.

---

## 18. Your consolidated feedback (to merge)

The brief's Phase 5 placeholder was empty in the request I received. Send the feedback and I will merge it here: what it confirms, what I would modify, what I disagree with and why, and what it missed.

---

## Appendix A: Audit evidence by area

### A. Core game design
- **The actual game:** pick the best of three options on two cards per quarter for twenty quarters. Strategy exists only at the level of "spend or don't", and spending always wins.
- **Meaningful decisions:** the planning bill (rebels vs housing), the fiscal hole (three genuinely different costs), energy shock (popular now vs structural later). Roughly six of 23 events have a real trade-off.
- **Fake or obvious decisions:** 12 of 23 events have a dominant option by a wide margin; PMQs, local elections, by-election, defence, the election itself and the final Budget have spreads under 3 net points, meaning the choice barely matters. Eight choices have no downside at all.
- **Scarcity:** three actions vs an average desk cost of 3.6–5.0 in Years 1–2, then 1.0 from Q13. Binding for six quarters, then never.
- **Memory:** none in content; only via indicators and the ignore counter.
- **Emergent stories:** the vote screen produces them ("it passed by four after I threatened the whip"). Nothing else does.
- **Uncertainty:** the 0.72–1.28 multiplier is good; every other outcome is deterministic and previewed.
- **Tension over time:** peaks in Q1 (everything is red) and Q2 (the first bill), then declines steadily; zero from Q13.
- **Most fun:** the Commons vote; the first consequences report when a Year 1 decision lands. **Least fun:** Q13–Q19; the outcome dialog → back → next loop; the identical funding card.

### B. UX and interaction model
- **Screens per quarter:** briefing, decision (per card), outcome dialog (per card), consequences, then back to briefing. Six to nine clicks for a quarter with two decisions; **158 clicks for a full term** in the scripted spender run.
- **Reading load:** title 49 words; manifesto 94; briefing 147 at Q1; decision card 126; outcome dialog 35; consequences 84; end 70. Briefing pages are 1,350–1,400 px tall at phone width, so the "Run the quarter" button is always below the fold.
- **Map:** hidden behind a tab that unlocks at Q2, decorative (feeds nothing), and its region fills reflect approval rather than conditions, so it barely changes.
- **Charts and meters:** three numbers in the HUD, meter bars in the Britain tab. No trends, no sparklines, no sense of direction.
- **Animation:** none beyond scroll.
- **Feedback:** every consequence is a sentence in a list. The one visual pulse (region colour) is on a screen the player rarely visits.
- **Does the player know what to do next:** yes, always, because there is only one thing to do. That is the problem.
- **Mobile:** works and is readable; too tall. **Desktop:** a phone layout centred on a wide screen, with the map at 232 px.
- **Verdict:** the player reads about Britain. They never operate it.

### C. Onboarding and accessibility
- About 300 words and four screens before the first decision. Promises are chosen before the player knows what a dial is.
- "Fiscal headroom", "party unity", "working majority", "whip", "Lords", "manifesto" appear without explanation; the briefs explain institutions at essay length but not the game's currencies.
- Accessibility engineering is strong (see original audit); the tab-unlock mechanic and `hidden` bug undermine it.
- A politics novice could understand what to click in 30 seconds. They could not understand what the game *is* in 60, because it never shows them.

### D. Systems and simulation
- **Interconnected:** economy → headroom → party (via headroom sign) → majority; indicators → approval fundamentals; approval → party target → majority. That is the entire causal graph.
- **Redundant:** `power` (party) and `majority` are the same thing at two scales; `services` is a dump variable.
- **Shallow:** migration and defence are indicators with one event each, never shown on the Britain tab, and no effect on anything.
- **Displayed but barely matter:** regions (nothing), crime/energy/transport (promises and legacy only), the record.
- **Hidden but should be visible:** the ignore counter (a card should show it is getting worse), the delayed-effect queue (the player should see what is coming), the seat projection (only shown at the end).
- **Complexity without fun:** the tab-unlock mechanic; the second-opinion adviser when it repeats the same line for five quarters; the custom promise.

### E. Content and decision quality
- 23 events, 69 choices, 2,118 words, 92 words per card. 19 of 69 choices have a delayed follow-up, all of them fixed effects, none of them new cards.
- Repeated template: every card is situation + one adviser + three options; the funding card is literally the same card each quarter with a different noun.
- Writing quality is good and dry ("You can dislike arithmetic. Unfortunately, arithmetic is not polling."). It is the mechanics under the writing that are thin.
- Consequences that don't match: the Lords (B13); "Extra £2bn found" (B17); the election's own choices, which move nothing that matters.

### F. Progression and pacing (measured, balanced bot, 200 terms)
| Year | Events per quarter | Desk cost vs 3 actions | What happens |
|---|---|---|---|
| 1 | 2.0 | 4.0–5.0 | Scripted opening; binding scarcity; learns by being overwhelmed |
| 2 | 2.0 | 3.8–4.3 | Identity forms only through which promise you fund |
| 3 | 2.0 | 3.6–3.8 | Some delayed effects land; party has drifted to 51 for everyone |
| 4 | 1.1 → 0.0 | 2.1 → 1.0 | Desk empties; tension gone |
| 5 | 0.0 (Q16: 1.0) | 1.0 | Final Budget, then nothing, then a three-option election card that moves nothing |

### G. Election and ending
Answers "did I win" and "how many seats". Does not answer why, what I achieved beyond two readouts, what I damaged, which decisions defined the term, or what Britain I left. Not visual, not dramatic, not shareable, not personal. "Run again" gives no reason to.

## Appendix B: Simulation results

300 terms per row, fixed seeds, three-promise manifestos rotated across four sets, engine unmodified.

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

Seat sensitivity at the end of a mid-strength term (approval 55, party 60): +20 economy = +7 seats; +20 health = +3; +20 on housing, services, crime, energy, transport, migration or defence = 0; +30 on any region = 0.

Real-UI spender run (one term): 158 clicks, 35 decisions, 2 votes, approval 58% → 70% while headroom sat between −£6bn and −£24bn for 17 quarters; final services 100, legacy "The Builder", 385 seats, 3/3 promises.
