# Cloudversify Calendar Ghost Integration

This repo contains the Ghost-specific integration work for Cloudversify Calendar.

The first implementation target is a Ghost Code Injection or HTML card snippet that opens Cloudversify hosted booking while preserving Ghost source attribution.

## Current Scope

- Ghost terminology and integration planning.
- Public custom-element booking widget foundation.
- Code Injection and HTML card examples.
- Customer setup documentation.
- Schema-driven snippet generator for support and customer success handoff.
- Local release packaging and handoff verification for the Ghost integration beta.
- Local validation for no-secret, booking URL, Ghost attribution, and member-aware public settings.

## Repo Direction

Ghost should remain a thin publishing adapter over Cloudversify:

- No Admin API keys, Content API keys, or private credentials in public Ghost markup.
- Use public organization/calendar/service identifiers.
- Support Ghost Code Injection for global booking calls to action.
- Support Ghost HTML cards for post/page-specific booking calls to action.
- Preserve source attribution with `source_platform=ghost`.
- Optionally pass public Ghost context such as post slug, page slug, author slug, tag slug, or member segment.
- Reuse Cloudversify hosted booking pages and API-backed availability.

## Local Check

```sh
npm run check
```

## Release Packaging

Build and verify a local Ghost handoff package with:

```sh
npm run release:check
```

The command writes `dist/cloudversify-ghost-booking-v<version>/` with the custom element, reviewed Ghost snippets, setup guide, implementation plan, release notes, a setup/QA `handoff.json`, and a checksum `manifest.json`.

## Snippet Generator

Import `buildGhostSnippet` from `src/ghost-snippet-generator.js` in support tooling.

The generator follows the settings contract in `docs/ghost-settings-contract.md` and emits Ghost Code Injection or HTML card code with the reviewed CDN script URL.

## Ghost Fit

Ghost is a strong publisher and member-site target. Ghost's developer docs describe custom integrations, the read-only Content API, Handlebars themes, HTML cards, and Code Injection as the surfaces that map cleanly to Cloudversify booking.
