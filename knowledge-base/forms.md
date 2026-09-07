# Public Forms & Enquiries

## What this subsystem does
Turns the six public forms into WhatsApp enquiries. Submitting opens WhatsApp — the app on
mobile, WhatsApp Web on desktop — with the customer's details already typed into a message
addressed to the business number. The customer presses send.

Until 2026-09-07 all six forms were dead markup (ISSUE-006).

## How it is structured
| File | Role |
|------|------|
| `src/lib/whatsapp.js` | Builds the message and the `wa.me` URL; owns the phone number |
| `src/components/QuoteBar.jsx` | The "Get Quote" bar, used on five pages |
| `src/pages/ContactPage.jsx` | The long enquiry form, wired inline |

`QuoteBar` appears on About, Contact, Services, Projects and Product Detail. Those five
were previously byte-identical copies of the same markup — verified by checksum before
extracting them, so the refactor changed no rendering.

## Conventions and rules
- **The number lives in `src/lib/whatsapp.js`** as `WHATSAPP_NUMBER`, in international
  format with no `+` or spaces (`919106780688`) — the shape `wa.me` requires. Change it
  there. Note the older plain `wa.me` anchor links elsewhere still hardcode it; if the
  number ever changes, grep for `wa.me` too.
- **Name and contact number are required**; everything else is optional. Those two are the
  minimum needed to call someone back.
- **Empty fields are dropped** from the message rather than sent as blank lines, so a
  half-filled form still produces something tidy.
- **A `<select>` left untouched reports its placeholder option.** `whatsapp.js` treats
  `-- Select Range --` as empty so it is never sent as if the customer chose it. Add any
  new placeholder text to `PLACEHOLDER_VALUES`.
- **Free text goes in `note`**, not `fields` — it renders as its own `Message:` block
  instead of being squeezed onto a `Label: value` line.
- **Never leave a submit button without a handler.** That is the exact shape of ISSUE-006:
  it looks like it works and silently loses the enquiry.

## Known gotchas
- **Nothing is stored.** If the customer does not press send in WhatsApp, the business never
  learns about them. This was a deliberate choice for simplicity over a database or email
  trail — revisit if leads seem to be going missing.
- **Popup blockers.** The handoff uses `window.open(..., '_blank')`; if that returns null it
  falls back to navigating the current tab. Losing the page beats a click doing nothing.
- **Desktop needs a WhatsApp account** linked to WhatsApp Web, or the visitor lands on a QR
  page. Most traffic is mobile, where it opens the app directly.
- The message is carried in a URL, so very long text can hit browser URL limits. The
  Message box is the only unbounded field; realistic enquiries are far below any limit.

## How it is tested
`src/lib/whatsapp.test.js` covers layout, dropping empty and whitespace-only fields, the
select-placeholder case, trimming, the `Message:` block, field order, non-string values,
percent-encoding of newlines, escaping of `&`/`#`/`?` so they cannot break the URL, number
override, and both branches of the popup-blocker fallback.

Browser-verified manually: the quote bar on `/contact` and `/services` and the long form on
`/contact` each produce a correct `wa.me` URL; submitting empty shows an inline error,
opens nothing, and — critically — no longer reloads the page.

Not automated: React component rendering (there is no DOM testing setup yet) and whether
WhatsApp itself opens.

## Related
- [known-issues.md](known-issues.md) — ISSUE-006
