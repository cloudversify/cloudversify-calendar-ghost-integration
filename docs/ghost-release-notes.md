# Ghost Release Notes

## Beta Package Scope

This release contains a Ghost Code Injection and HTML card friendly custom element for Cloudversify Calendar booking.

It supports:

- Button mode.
- Embedded hosted booking mode.
- Public organization, calendar, and service identifiers.
- Public Ghost context such as post slug, page slug, author slug, tag slug, and member segment.
- Campaign attribution.
- Ghost source attribution.

## Validation Evidence

Run:

```sh
npm run check
```

The check validates JavaScript syntax, documentation coverage, no-secret guardrails, booking URL attribution, Ghost context handoff, credentialed booking host rejection, and minimum iframe height.

## Guardrails

- No Admin API keys in Ghost public markup.
- No Content API keys in Ghost public markup.
- No copied scheduling logic in Ghost.
- Cloudversify remains the scheduling system of record.
- Ghost handles publishing, member journeys, and content placement.

## Rollback

Remove the Code Injection snippet, remove the HTML card, or revert the active theme change, then republish. Cloudversify calendars, offerings, availability, appointments, and participants are not deleted by removing the Ghost widget.
