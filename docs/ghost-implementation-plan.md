# Ghost Implementation Plan

## Objective

Let Ghost publishers add Cloudversify booking buttons or embedded booking pages to posts, pages, themes, and member journeys without rebuilding scheduling inside Ghost.

## Ghost Surfaces

- Code Injection: best for global booking calls to action or site-wide script loading.
- HTML card: best for post/page-specific booking widgets.
- Handlebars themes: useful for theme-level placement near author boxes, tag pages, or membership calls to action.
- Custom integrations: useful later when we need private Admin API workflows or publication metadata, but private keys must stay server-side.
- Content API: read-only public content access, not required for the first embed beta.

## Beta Scope

- Ghost-compatible custom element.
- Button mode for hosted booking calls to action.
- Embed mode for hosted booking iframe.
- Public organization slug, calendar ID, service ID, post slug, page slug, author slug, tag slug, member segment, label, color, height, and campaign settings.
- No Admin API keys, Content API keys, OAuth tokens, or private credentials in public Ghost markup.
- `source_platform=ghost` attribution.

## Non-Goals

- Do not create appointments inside Ghost.
- Do not duplicate availability logic in Ghost.
- Do not expose Ghost Admin API keys in browser code.
- Do not require a custom Ghost theme for the first beta.

## Milestones

1. Code Injection and HTML card foundation.
2. Ghost settings contract and snippet generator.
3. Release package with reviewed snippets.
4. Published-site review packet.
5. Theme and custom integration follow-up when real Ghost site feedback exists.
