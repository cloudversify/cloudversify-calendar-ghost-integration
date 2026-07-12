# Ghost Customer Setup Guide

## Add Cloudversify Booking To Ghost

Cloudversify Calendar lets Ghost publishers add booking buttons or embedded booking pages backed by Cloudversify calendars, offerings, and availability rules.

## Before You Start

You need:

- A Ghost site where you can edit Code Injection, HTML cards, or the active theme.
- A Cloudversify organization slug.
- Optional calendar ID for an author, editor, coach, practitioner, room, location, or resource.
- Optional service ID for an offering such as a consultation, office-hours session, class, interview, coaching session, or sponsor call.
- Optional public Ghost context such as post slug, page slug, author slug, tag slug, or member segment.

## Code Injection Setup

1. Open Ghost Admin.
2. Go to Settings.
3. Open Code Injection.
4. Paste the Cloudversify script tag and booking element into the site footer or the target injection area.
5. Save the change.
6. Open the published Ghost site and test the booking button or embed.

## HTML Card Setup

1. Open the target Ghost post or page.
2. Add an HTML card.
3. Paste the Cloudversify booking snippet.
4. Publish or update the post.
5. Open the published post and test the booking button or embed.

## Setup Values

- Organization slug: required.
- Calendar ID: optional.
- Service ID: optional.
- Post slug: optional public post context.
- Page slug: optional public page context.
- Author slug: optional public author context.
- Tag slug: optional public tag context.
- Member segment: optional public segment label such as `free-members` or `paid-members`.
- Button label: defaults to `Book now`.
- Primary color: uses the publication brand color when configured.
- Frame height: defaults to `720px`.

## Troubleshooting

### Booking Does Not Load

Check that the script loads on the published Ghost site and that the organization slug is correct.

### Embedded Booking Looks Too Short

Use at least `620px` for embedded mode. The widget enforces that minimum for pixel-based heights.

### Attribution Is Missing

Confirm that the opened booking URL includes `source_platform=ghost` and `utm_medium=custom-integration`.
