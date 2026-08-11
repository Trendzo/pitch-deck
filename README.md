# Trendzo investor deck

Landscape 16:9 HTML deck, styled from the consumer app's own design system
(`src/theme/brutal.ts`): white ground, black ink, Helvetica Neue with the
bundled Black face for display type, zero corner radius, hairline rules only,
`#0E8A45` as the single accent. No boxes, no borders, no shadows.

## Present

Open `index.html` in any browser.

| Key | Action |
| --- | --- |
| `→` `↓` `space` | Next slide |
| `←` `↑` | Previous slide |
| `G` | Contents overlay (click a row to jump) |
| `F` | Fullscreen |
| `Home` / `End` | First / last slide |

Clicking the right side of the slide advances, the left side goes back, and the
pixel blocks at the bottom left are clickable. The URL carries the slide number
(`index.html#7`), so a specific slide can be linked or reloaded into.

## Export to PDF

`Cmd + P` → Save as PDF. Print styles lay each slide out as its own 1280×720
landscape page with all entrance animations resolved. Set margins to None and
turn off headers and footers.

## Structure

24 slides. The problem opens as three slides, one per side of the market
(consumers, retailers, aggregators), followed by a three-slide "how we work"
section — retailer diagnostic, then the retailer app's features, then the
retailer app on screen — then a one-slide thesis statement ("not another
ecommerce platform") before the solution. Kicker number 04 spans the three
how-we-work slides; kicker 05 is the thesis slide alone. Every other paired
section (the app, retailer side, fleet operations) is a text slide followed
by one screenshot slide:

01 cover · 02 problem — consumers · 03 problem — retailers ·
04 problem — aggregators · 05 how we work — retailer diagnostic ·
06 how we work — the retailer app · **07 how we work — the retailer app,
screens** · 08 the thesis · 09 solution · 10 the app · **11 app screens** ·
12 retailer side · **13 retailer screens** · 14 fleet operations ·
**15 driver screens** · 16 business model · 17 trust and compliance ·
18 build status · 19 market · 20 differentiation · 21 go to market ·
22 roadmap · 23 the ask · 24 closing

Note slides 06-07 (retailer app, early) and slides 12-13 (retailer side,
later) both cover the retailer app — deliberately, with different emphasis:
what it does and how it answers the diagnostic, right after the diagnostic;
the business terms (commission funding, payout cadence, POS) later, once the
consumer-facing story has been made. Only three retailer screenshots exist in
`assets/screens/`, so slide 07 reuses two of the same three images shown
again on slide 13.

The deck is a single file. Slides are `<section class="slide">` blocks in
source order; the `TITLES` array in the script at the bottom feeds the contents
overlay, so keep it in sync if slides are added or reordered.

## Before this goes in front of investors

Placeholders are rendered in light gray as `[INSERT · …]` and are deliberately
easy to spot. Outstanding:

- **Slide 05** the retailer-diagnostic percentages are illustrative, not
  measured — verify against actual retailer conversations (Ops / Research)
- **Slide 16** 3 to 5 year GMV, revenue and margin model (Finance)
- **Slide 19** TAM / SAM / SOM (market research)
- **Slide 20** named competitor comparison (competitive research)
- **Slide 22** city sequencing and timeline (Ops / Strategy)
- **Slide 23** round, amount, valuation, runway, milestones (Finance)
- **Slides 01 and 24** presenter name, email, phone, website, date

Three things in the screenshots need a decision before this is presented:

- **Slide 15 contradicts slide 14.** The driver queue screen shows "Accept
  order" and "Pass" buttons, while slide 14 says agents are auto-assigned with
  no accept and no reject. Either the app or the claim has to change.
- **Slide 15 shows seeded metrics** (1,284 trips, 4.9 stars, 96% on-time) on a
  deck whose credibility rests on being honest that nothing has launched. A
  caption says the figures are test data. Recapturing with a zeroed account
  would be stronger.
- **Slides 13 and 15 carry test-fixture names and the wrong city**: "Akshat
  Test Store", "Kaushaly Fashion Studio", Juhu/Mumbai addresses, and "Indire"
  spelled wrong in the driver header, against an Indore-only pilot. (Slide 07
  reuses two of the three retailer screenshots but not the one carrying
  "Akshat Test Store," so it's clean on this point.)

Also note the retailer screenshots are the retailer **mobile** app. The web
dashboard mentioned on slide 13 is not pictured anywhere in the deck.

Two figures need sign-off before they are quoted externally: the 20% commission
and fortnightly payout cadence (Finance's "Commission & Payout Rules" doc says
20% / fortnightly, an older retailer-terms draft says "[X]%" and "within 15
working days"), and the return inspection window (12 vs 24 hours across two
internal drafts). The deck uses the Finance figures.

There is no team slide. Conventional decks carry one, so consider adding it
after the cover once bios and photos exist.

## Assets

`assets/` holds copies of the four Helvetica Neue faces, the Trendzo wordmark,
the cover photograph, and `assets/screens/` with the eight device captures, so
the folder can be zipped and shared as a unit.

The wordmark PNG is white-on-transparent and is flipped to black with a CSS
`filter: invert(1)`, matching how the app tints it.

Screenshots are shown as bare screens, no phone bezel, matching the deck's
no-frames rule. Each is lifted 18px inside its window so the Android status bar
crops off the top and the frame ends just below the app's own tab bar. To swap
one, drop a 738x1600 capture into `assets/screens/` under the same filename.
