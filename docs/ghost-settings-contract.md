# Ghost Settings Contract

## Ghost Surfaces

- Code Injection: site-wide snippet placement.
- HTML card: post/page-specific snippet placement.
- Handlebars theme partial: theme-level placement after a publisher edits the active theme.

## Required Setting

- Organization slug: public Cloudversify organization slug used to open hosted booking.

## Optional Settings

- Calendar ID: narrows booking to an author, editor, practitioner, room, location, resource, or other calendar-backed surface.
- Service ID: narrows booking to an offering, consultation, office-hours session, class, interview, coaching session, or sponsor call.
- Post slug: public post context for attribution and routing.
- Page slug: public page context for attribution and routing.
- Author slug: public author context.
- Tag slug: public topic or collection context.
- Member segment: public segment label such as `free-members`, `paid-members`, or `founding-members`.
- Mode: `button` or `embed`.
- Label: visible button text or iframe title.
- Primary color: button and fallback link color.
- Height: iframe height for embedded mode. Pixel heights below `620px` are raised to `620px`.
- UTM campaign: optional public campaign slug for attribution.

## Guardrails

- Do not place Ghost Admin API keys, Content API keys, OAuth tokens, webhooks, private credentials, or staff-only identifiers in public Ghost markup.
- Do not copy scheduling rules, availability rules, appointments, participant data, payment state, or staff notes into Ghost.
- Treat Code Injection and HTML cards as public launch surfaces. Cloudversify remains the source of truth for booking state.

## Generated Snippets

Use `src/ghost-snippet-generator.js` to generate reviewed Code Injection or HTML card snippets from plain settings. Generated snippets always include `source_platform=ghost`, `utm_source=ghost`, and `utm_medium=custom-integration` through the runtime widget.
