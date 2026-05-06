# Mautic Welcome Sequences By Signup Intent

Last updated: 2026-05-06

This is the implementation sheet for the WSS Mautic welcome automation. It assumes one shared Mautic form can receive hidden source fields from the site and route contacts into one of three welcome paths.

## Required Contact/Form Fields

Create or confirm these fields in Mautic before activating the campaigns:

| Field label | Alias | Type | Purpose |
| --- | --- | --- | --- |
| Source type | `source_type` | Text or select | `lead_magnet`, `newsletter`, or `contact_enquiry` |
| Source page | `source_page` | URL/text | Full page URL where the contact submitted |
| Lead magnet | `lead_magnet` | Text | Resource slug/title when relevant |
| UTM source | `utm_source` | Text | Campaign attribution |
| UTM medium | `utm_medium` | Text | Campaign attribution |
| UTM campaign | `utm_campaign` | Text | Campaign attribution |

The site component `src/components/EmailSignup.astro` now sends those fields as `mauticform[...]` values and fills `source_page` plus UTM values in the browser.

## Campaign Structure

Create one Mautic campaign named `WSS - Welcome nurture by signup intent`.

Entry rules:

- Entry source: contacts submitted through the WSS newsletter/resource form, or segment membership if the form writes to a holding segment.
- Suppression: exclude contacts already tagged `wss_welcome_active` or `wss_welcome_completed`.
- On campaign start: add tag `wss_welcome_active`.
- On campaign end: remove `wss_welcome_active`; add tag `wss_welcome_completed`.

Decision split:

- If `source_type = lead_magnet`, enter the lead magnet path.
- If `source_type = newsletter`, enter the newsletter path.
- If `source_type = contact_enquiry`, enter the contact/enquiry path.
- If missing/unknown, default to newsletter path.

Recommended delays:

- Email 1: immediately.
- Email 2: wait 1 day.
- Email 3: wait 2 days.
- Email 4: wait 3 days.
- Email 5: wait 4 days.

## Shared Emails

### Email 2 - The Growth Bottleneck Usually Is Not More Activity

Subject: The bottleneck is usually not more marketing activity

Preview: Before adding spend or channels, name the constraint.

Body:

Hi {contactfield=firstname|there},

Most post-PMF teams do not have a shortage of marketing activity. They have a shortage of clear decisions.

The symptoms usually look familiar:

- Paid, content, outbound, referrals, and sales all exist, but nothing compounds.
- The founder still has to make every growth call.
- Reporting shows activity, but not what to scale, stop, or fix.
- The team keeps adding channels before naming the constraint.

That is why we start with the bottleneck, not the channel.

For most founder-led teams, the constraint sits in one of five places: positioning, acquisition, conversion, reporting, or team ownership. Once you name the actual constraint, the next quarter gets much simpler.

Useful next step: review the five-layer diagnosis framework here:

https://wescalestartups.com/diagnose?utm_source=mautic&utm_medium=email&utm_campaign=welcome_nurture

Daniel

### Email 3 - What Changes When The System Is Working

Subject: What founders leave with after WSS work

Preview: The point is a system the team can keep running.

Body:

Hi {contactfield=firstname|there},

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

https://wescalestartups.com/proof?utm_source=mautic&utm_medium=email&utm_campaign=welcome_nurture

Daniel

### Email 4 - A Simple Diagnostic Before The Next Growth Bet

Subject: A 5-layer diagnostic before your next growth bet

Preview: Positioning, acquisition, conversion, reporting, team ownership.

Body:

Hi {contactfield=firstname|there},

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

https://wescalestartups.com/quiz?utm_source=mautic&utm_medium=email&utm_campaign=welcome_nurture

Daniel

## Path-Specific Emails

### Lead Magnet Path

Email 1 subject: Your WSS resource is here

Email 1 body:

Hi {contactfield=firstname|there},

Thanks for requesting the WSS resource.

If you asked for a specific asset, use this page to return to it:

{contactfield=source_page}

The most useful way to use it is simple: fill it in honestly, then look for the layer that creates the most friction. That is usually the bottleneck to address before adding more activity.

Over the next few emails, I will send the framework behind it: how to identify the real constraint, what good growth systems leave behind, and how to decide whether the next move is diagnosis, a sprint, an acquisition system build, or fractional CMO support.

Daniel

Email 5 subject: Want a second pair of eyes on the bottleneck?

Email 5 body:

Hi {contactfield=firstname|there},

If the resource surfaced an obvious constraint, the next useful step is to name it in plain English before you commit budget, team time, or another channel bet.

You can book a 30-minute growth diagnostic here:

https://wescalestartups.com/book?utm_source=mautic&utm_medium=email&utm_campaign=welcome_lead_magnet

Bring the current growth picture. In the call, we will work out whether the constraint is positioning, acquisition, conversion, reporting, or team ownership.

If there is a fit, we can talk about the right engagement. If there is not, you still leave with a clearer diagnosis.

Daniel

### Newsletter Path

Email 1 subject: Welcome to Here's Some Growth

Email 1 body:

Hi {contactfield=firstname|there},

Thanks for joining Here's Some Growth.

The note is for post-PMF founders and operators who have traction, but want growth to feel less dependent on scattered activity and founder heroics.

Expect practical notes on bottlenecks, acquisition systems, positioning, reporting, and the weekly rhythm that makes growth easier to manage.

A good place to start is the insights hub:

https://wescalestartups.com/insights?utm_source=mautic&utm_medium=email&utm_campaign=welcome_newsletter

Daniel

Email 5 subject: What should I write about next?

Email 5 body:

Hi {contactfield=firstname|there},

Quick question: what is the most annoying growth problem in your business right now?

Reply with one line. Examples:

- Pipeline is inconsistent.
- Paid is getting expensive.
- The team cannot agree what to focus on.
- We are getting traffic but not enough qualified calls.
- Founder-led sales still carries too much of the load.

I read replies, and good questions often become future notes.

If you would rather diagnose it live, the booking page is here:

https://wescalestartups.com/book?utm_source=mautic&utm_medium=email&utm_campaign=welcome_newsletter

Daniel

### Contact/Enquiry Path

Email 1 subject: Thanks - I have your enquiry

Email 1 body:

Hi {contactfield=firstname|there},

Thanks for getting in touch.

If your enquiry is about working together, the fastest useful next step is a 30-minute growth diagnostic. The goal is to name the current bottleneck before we talk about the right engagement shape.

Book here if you have not already:

https://wescalestartups.com/book?utm_source=mautic&utm_medium=email&utm_campaign=welcome_contact

If you already sent context, I will use that to make the conversation sharper.

Daniel

Email 5 subject: Should we diagnose this properly?

Email 5 body:

Hi {contactfield=firstname|there},

If the growth issue is still live, it is worth diagnosing before adding more activity.

The useful question is not "which tactic next?" It is: where is the system actually constrained?

That could be positioning, acquisition, conversion, reporting, or team ownership.

Book a 30-minute diagnostic here:

https://wescalestartups.com/book?utm_source=mautic&utm_medium=email&utm_campaign=welcome_contact

If it is not a fit, I will say that directly.

Daniel

## QA Checklist

Before activation:

- Submit one newsletter form and confirm `source_type = newsletter`.
- Submit one lead magnet form once resource pages use the form and confirm `source_type = lead_magnet` plus `lead_magnet` is populated.
- Submit one contact/enquiry form if wired to Mautic and confirm `source_type = contact_enquiry`.
- Confirm the correct first email is sent for each path.
- Confirm Emails 2-4 are shared across paths.
- Confirm duplicate suppression tags prevent repeat welcome sequences.
- Confirm sender name, reply-to, unsubscribe, and company footer details are correct.
- Confirm every CTA URL has UTM values and appears in analytics.

## Activation Notes

Keep the campaign unpublished until all fields exist in the Mautic form. If Mautic rejects unknown `mauticform[...]` inputs, add the fields to the form as hidden fields with the aliases above, then retest.
