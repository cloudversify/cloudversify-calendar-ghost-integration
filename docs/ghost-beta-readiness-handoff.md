# Ghost Beta Readiness Handoff

## Current Readiness

Ghost is ready for external beta validation once a CDN publishing path and a real Ghost test site are available.

## Completed Locally

- Ghost Code Injection and HTML card custom element.
- Button mode for hosted booking.
- Embedded iframe mode for hosted booking.
- Public Ghost settings contract.
- Snippet generator for support and customer success.
- Release package and checksum manifest.
- Published-site review packet.
- Jeremy-facing test tutorial.
- Machine-readable QA cases.
- Local validation for attribution, no-secret guardrails, URL cleanup, Ghost public context, iframe height, release package integrity, and review packet coverage.

## External Blockers

- CDN location for `cloudversify-ghost-booking-element.js`.
- Real Ghost site with Code Injection access.
- Real Ghost post or page where an HTML card can be tested.
- Published site URL and published post/page URL.
- Desktop and mobile screenshots from published pages.
- Confirmation that Ghost does not strip the script tag or custom element on publish.

## Recommended CDN Contract

- Public script URL: `https://cdn.cloudversify.com/ghost/cloudversify-ghost-booking-element.js`.
- Cache policy: immutable for versioned paths, short TTL for the channel alias if one is used.
- Rollback path: restore the previous script file or point the channel alias back to the previous version.
- Beta package source: `dist/cloudversify-ghost-booking-v0.1.0/`.

## Customer Support Flow

1. Confirm the customer can edit Ghost Code Injection or add an HTML card.
2. Ask for their organization slug, optional calendar ID, optional service ID, and optional public Ghost context.
3. Generate the snippet with `src/ghost-snippet-generator.js`.
4. For site-wide placement, use Code Injection.
5. For post/page-specific placement, use an HTML card.
6. Have them publish the site, post, or page.
7. Confirm button mode opens hosted booking with `source_platform=ghost`.
8. Confirm embed mode is only used when the iframe layout is acceptable on mobile.

## Beta Exit Criteria

- Code Injection button mode passes on at least one published Ghost site.
- HTML card embed mode passes or is documented as conditional on theme layout.
- No private Ghost keys, member identifiers, emails, subscription IDs, or Cloudversify credentials appear in public markup.
- Support can generate a snippet without editing raw attributes manually.
- Rollback can be explained in one support response.

## Move-On Recommendation

Move from platform adapters into infrastructure, HIPAA isolation, API coverage, and SDK coverage planning after the Ghost branch set is pushed and no obvious local handoff gaps remain. Further Ghost progress mainly depends on CDN and real Ghost published-page testing.
