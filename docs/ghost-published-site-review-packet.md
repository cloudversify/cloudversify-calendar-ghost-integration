# Ghost Published Site Review Packet

## Review Purpose

Prove that the Cloudversify Calendar Ghost integration works on a real published Ghost site, not only in local examples.

## Required Test Surface

- Ghost site with Code Injection access.
- One Code Injection booking button test.
- One post or page with an HTML card embedded booking test.
- Published site URL.
- Published post/page URL.

## Evidence Checklist

- Published site URL.
- Published post/page URL.
- Code Injection button desktop screenshot.
- HTML card embed desktop screenshot.
- HTML card embed mobile screenshot.
- Opened booking URL from button mode.
- Iframe source URL from embed mode when available.
- Page source scan confirming there are no Admin API keys, Content API keys, OAuth tokens, member IDs, email addresses, subscription IDs, or private credentials.

## Expected Attribution

Every hosted booking URL opened by the Ghost widget should include:

- `source_platform=ghost`
- `utm_source=ghost`
- `utm_medium=custom-integration`

Optional campaign-specific pages may also include `utm_campaign`.

## Layout Review

- Button mode should fit Ghost theme sections without shifting nearby content.
- Embed mode should use at least `620px` height.
- The fallback link should remain visible below the iframe.
- Mobile width should not clip the iframe horizontally.

## Security Review

- Ghost public markup must contain only public configuration values.
- Calendar IDs, service IDs, organization slugs, post slugs, author slugs, tag slugs, and member segments are treated as public routing IDs.
- Availability rules, appointments, participants, member identities, staff notes, tokens, and credentials stay in Cloudversify or private Ghost server-side systems.

## Result States

- Pass: Code Injection and HTML card modes work on published pages with expected attribution and no private data exposure.
- Conditional pass: Button mode works, but embed mode needs a height, theme, or layout adjustment.
- Fail: Ghost blocks the script, hosted booking cannot open, or private data appears in public markup.
