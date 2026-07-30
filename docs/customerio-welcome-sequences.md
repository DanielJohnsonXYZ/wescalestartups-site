# Customer.io Welcome Sequences By Signup Intent

Last updated: 2026-07-30

Implementation sheet for WSS welcome automation in Customer.io. The site posts to same-origin `/api/forms`, which proxies to the Track Forms API. Form fields become person attributes; form submissions become events you can use to trigger campaigns.

## Live workspace status (EU `227766`)

| Piece | Status |
| --- | --- |
| Sender | Daniel Johnson / `daniel@wescalestartups.com` — verified |
| Sending domain | `wescalestartups.com` — SPF/DKIM/DMARC verified |
| Link tracking CNAME | **Missing** — add `email.wescalestartups.com` → `e-trk-eu.customeriomail.com` |
| Journeys | Three drafts (emails set to **automatic**; journeys not started) |
| Conversion goals | Disabled (were incomplete) |
| People / forms | Empty until Pages secrets + first live submit |

| Journey | ID | Trigger | UI |
| --- | --- | --- | --- |
| WSS — Welcome: Newsletter | 2 | `source_type = newsletter` | [Open](https://eu.fly.customer.io/workspaces/227766/journeys/automations/2) |
| WSS — Welcome: Lead Magnet | 1 | `source_type = lead_magnet` | [Open](https://eu.fly.customer.io/workspaces/227766/journeys/automations/1) |
| WSS — Welcome: Enquiry | 3 | `contact_enquiry` **or** `contact-form` | [Open](https://eu.fly.customer.io/workspaces/227766/journeys/automations/3) |

Not covered by welcome journeys (profile still created): `referral-form`, `course-waitlist-form`, `podcast-guest-form`.

Enquiry journey exit: when `booked_diagnostic = true` (segment **Booked diagnostic**). Set by Calendly booking completion via `/api/forms` after a prior form email is remembered in sessionStorage.

### Still needs a human

1. Cloudflare Pages env (WSS + DJ, Production + Preview): `CUSTOMER_IO_SITE_ID`, `CUSTOMER_IO_TRACK_API_KEY`, **`CUSTOMER_IO_REGION=eu`**, form ids.
2. DNS CNAME for branded link tracking (above).
3. Test submit from each path → confirm person + attributes.
4. Import Mautic CSV **without** setting `source_type` to a welcome trigger (or journeys will enroll them when started).
5. Start the three journeys when ready (do not backfill unless intentional).

## Site → Customer.io wiring

| Piece | Value |
| --- | --- |
| Proxy | `functions/api/forms.js` → `POST https://track-eu.customer.io/api/v1/forms/{form_id}/submit` |
| Default form id | `wss-newsletter` (`PUBLIC_CUSTOMER_IO_FORM_ID` / `CUSTOMER_IO_FORM_ID`); DJ uses `dj-newsletter` |
| Secrets (Pages) | `CUSTOMER_IO_SITE_ID`, `CUSTOMER_IO_TRACK_API_KEY`, **`CUSTOMER_IO_REGION=eu`** (required for this workspace) |

Attributes sent on every capture (when present):

| Attribute | Purpose |
| --- | --- |
| `email` | Identifier |
| `source_type` | `lead_magnet`, `newsletter`, `contact_enquiry`, or form-specific values |
| `source_page` | Full page URL where they submitted |
| `lead_magnet` | Resource slug/title when relevant |
| `utm_source` / `utm_medium` / `utm_campaign` | Attribution from the landing URL |

`EmailSignup.astro` and the contact/refer/course/podcast scripts send these fields as JSON to `/api/forms`. After the first live submit, open **Integrations → Forms**, select the form, and confirm field → attribute mapping.

## Campaign Structure

Three separate attribute-triggered journeys (already built — see status table above), not one branched campaign.

Entry: `source_type` attribute equals the path value when the person is created/updated via the Forms API.

Delays (already wired): Email 1 immediate → wait 1d → Email 2 → wait 2d → Email 3 → wait 3d → Email 4 → wait 4d → Email 5 → exit.

Liquid: `{{ customer.first_name | default: "there" }}`.

## Shared Emails

### Email 2 - The Growth Bottleneck Usually Is Not More Activity

Subject: The bottleneck is usually not more marketing activity

Preview: Before adding spend or channels, name the constraint.

Body:

Hi {{ customer.first_name | default: "there" }},

Most post-PMF teams do not have a shortage of marketing activity. They have a shortage of clear decisions.

The symptoms usually look familiar:

- Paid, content, outbound, referrals, and sales all exist, but nothing compounds.
- The founder still has to make every growth call.
- Reporting shows activity, but not what to scale, stop, or fix.
- The team keeps adding channels before naming the constraint.

That is why we start with the bottleneck, not the channel.

For most founder-led teams, the constraint sits in one of five places: positioning, acquisition, conversion, reporting, or team ownership. Once you name the actual constraint, the next quarter gets much simpler.

Useful next step: review the five-layer diagnosis framework here:

https://wescalestartups.com/diagnose?utm_source=customerio&utm_medium=email&utm_campaign=welcome_nurture

Daniel

### Email 3 - What Changes When The System Is Working

Subject: What founders leave with after WSS work

Preview: The point is a system the team can keep running.

Body:

Hi {{ customer.first_name | default: "there" }},

The best growth work should leave something behind.

Not just a campaign. Not just a deck. Not a set of opinions that disappear when the consultant leaves.

In WSS engagements, the useful outputs tend to be practical working assets:

- A clear ICP and positioning read.
- A prioritised experiment backlog.
- A landing or offer structure the team can reuse.
- A channel plan tied to stage and capacity.
- A weekly decision cadence.
- A reporting view that answers scale, stop, or fix.
- Named owners inside the team.

That matters because founder-led growth breaks when every decision routes back through the founder.

You can see proof and case studies here:

https://wescalestartups.com/proof?utm_source=customerio&utm_medium=email&utm_campaign=welcome_nurture

Daniel

### Email 4 - A Simple Diagnostic Before The Next Growth Bet

Subject: A 5-layer diagnostic before your next growth bet

Preview: Positioning, acquisition, conversion, reporting, team ownership.

Body:

Hi {{ customer.first_name | default: "there" }},

Before the next channel, campaign, agency brief, or hire, run this quick diagnostic.

Score your current growth system across five layers:

1. Positioning: can the right buyer quickly understand why this matters now?
2. Acquisition: do you know which channel deserves the next serious bet?
3. Conversion: are enough of the right people taking the next step?
4. Reporting: can the team see what to scale, stop, or fix each week?
5. Team ownership: who owns the rhythm when the founder is not in the room?

One weak layer can make the whole system feel broken.

The goal is not to score perfectly. The goal is to stop treating every symptom as a channel problem.

Use the scorecard or book page as the next step:

https://wescalestartups.com/quiz?utm_source=customerio&utm_medium=email&utm_campaign=welcome_nurture

Daniel

## Path-Specific Emails

### Lead Magnet Path

Email 1 subject: Your WSS resource is here

Email 1 body:

Hi {{ customer.first_name | default: "there" }},

Thanks for requesting the WSS resource.

If you asked for a specific asset, use this page to return to it:

{{ customer.source_page }}

The most useful way to use it is simple: fill it in honestly, then look for the layer that creates the most friction. That is usually the bottleneck to address before adding more activity.

Over the next few emails, I will send the framework behind it: how to identify the real constraint, what good growth systems leave behind, and how to decide whether the next move is diagnosis, a sprint, an acquisition system build, or fractional CMO support.

Daniel

Email 5 subject: Want a second pair of eyes on the bottleneck?

Email 5 body:

Hi {{ customer.first_name | default: "there" }},

If the resource surfaced an obvious constraint, the next useful step is to name it in plain English before you commit budget, team time, or another channel bet.

You can book a 30-minute growth diagnostic here:

https://wescalestartups.com/book?utm_source=customerio&utm_medium=email&utm_campaign=welcome_lead_magnet

Bring the current growth picture. In the call, we will work out whether the constraint is positioning, acquisition, conversion, reporting, or team ownership.

If there is a fit, we can talk about the right engagement. If there is not, you still leave with a clearer diagnosis.

Daniel

### Newsletter Path

Email 1 subject: Welcome to The Growth Bottleneck

Email 1 body:

Hi {{ customer.first_name | default: "there" }},

Thanks for joining The Growth Bottleneck.

The note is for post-PMF founders and operators who have traction, but want growth to feel less dependent on scattered activity and founder heroics.

Expect practical notes on bottlenecks, acquisition systems, positioning, reporting, and the weekly rhythm that makes growth easier to manage.

A good place to start is the insights hub:

https://wescalestartups.com/insights?utm_source=customerio&utm_medium=email&utm_campaign=welcome_newsletter

Daniel

Email 5 subject: What should I write about next?

Email 5 body:

Hi {{ customer.first_name | default: "there" }},

Quick question: what is the most annoying growth problem in your business right now?

Reply with one line. Examples:

- Pipeline is inconsistent.
- Paid is getting expensive.
- The team cannot agree what to focus on.
- We are getting traffic but not enough qualified calls.
- Founder-led sales still carries too much of the load.

I read replies, and good questions often become future notes.

If you would rather diagnose it live, the booking page is here:

https://wescalestartups.com/book?utm_source=customerio&utm_medium=email&utm_campaign=welcome_newsletter

Daniel

### Contact/Enquiry Path

Email 1 subject: Thanks - I have your enquiry

Email 1 body:

Hi {{ customer.first_name | default: "there" }},

Thanks for getting in touch.

If your enquiry is about working together, the fastest useful next step is a 30-minute growth diagnostic. The goal is to name the current bottleneck before we talk about the right engagement shape.

Book here if you have not already:

https://wescalestartups.com/book?utm_source=customerio&utm_medium=email&utm_campaign=welcome_contact

If you already sent context, I will use that to make the conversation sharper.

Daniel

Email 5 subject: Should we diagnose this properly?

Email 5 body:

Hi {{ customer.first_name | default: "there" }},

If the growth issue is still live, it is worth diagnosing before adding more activity.

The useful question is not "which tactic next?" It is: where is the system actually constrained?

That could be positioning, acquisition, conversion, reporting, or team ownership.

Book a 30-minute diagnostic here:

https://wescalestartups.com/book?utm_source=customerio&utm_medium=email&utm_campaign=welcome_contact

If it is not a fit, I will say that directly.

Daniel

## QA Checklist

Before starting journeys:

- [ ] Pages secrets set with `CUSTOMER_IO_REGION=eu` (both sites).
- [ ] Optional: CNAME `email.wescalestartups.com` → `e-trk-eu.customeriomail.com`.
- [ ] Submit newsletter form → person has `source_type = newsletter`.
- [ ] Submit lead magnet → `source_type = lead_magnet` + `lead_magnet` set.
- [ ] Submit contact → `source_type = contact-form`.
- [ ] Send yourself a test from one email action in each journey.
- [ ] Confirm sender, reply-to, unsubscribe, UTMs on CTAs.
- [ ] Start journeys **without** backfill unless you intend to enroll existing matches.

## Contact migration from Mautic

1. In Mautic, export contacts (CSV) including email, first name, and any tags/segments you care about.
2. In Customer.io → People → Import, upload the CSV; map `email` as the identifier.
3. **Do not** set `source_type` to `newsletter` / `lead_magnet` / `contact-form` on import if journeys are running — that enrolls them in welcome. Use a migration tag instead (e.g. `imported_from_mautic`).
4. After import and a successful live form test, decommission `comms.wescalestartups.com` (see `docs/deindex-internal-subdomains.md`).

## Activation Notes

Emails are already `automatic`. Journeys remain `draft` until you start them in the UI (or ask the agent to start with `update_type: state`, `state: start`). Prefer starting only after a live form test creates a person and Integrations → Forms shows the form connection.
