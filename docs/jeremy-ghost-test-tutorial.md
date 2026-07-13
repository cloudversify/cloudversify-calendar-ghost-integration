# Jeremy Ghost Test Tutorial

## Goal

Validate the Cloudversify Calendar Ghost integration beta on a real published Ghost site.

## What You Need

- Ghost site where you can edit Code Injection or a post/page HTML card.
- A published Cloudversify widget script URL.
- A Cloudversify organization slug.
- Optional calendar ID and service ID for a realistic booking target.
- Optional public Ghost context such as post slug, author slug, tag slug, or member segment.

## Code Injection Button Test

1. Open Ghost Admin.
2. Go to Settings.
3. Open Code Injection.
4. Paste the button snippet from `examples/code-injection.html`, or generate one with `src/ghost-snippet-generator.js`.
5. Replace `demo-publication` with the real organization slug.
6. Replace `svc_editorial_consult` with a real service ID, or remove the `service-id` line.
7. Save Code Injection.
8. Open the published Ghost site in a private browser window.
9. Click the booking button.
10. Confirm the opened Cloudversify URL includes `source_platform=ghost` and `utm_medium=custom-integration`.

## HTML Card Embed Test

1. Open a Ghost post or page.
2. Add an HTML card.
3. Paste the embed snippet from `examples/html-card-embed.html`, or generate one with `mode` set to `embed`.
4. Keep `height` at `720px` for the first test.
5. Replace organization, calendar, service, and public Ghost context values with real values.
6. Publish or update the post/page.
7. Open the published URL on desktop.
8. Confirm the hosted booking iframe loads and the fallback link appears below it.
9. Open the published URL on a phone-width viewport.
10. Confirm the iframe fits the page width and does not overlap nearby Ghost theme content.

## Evidence To Send Back

- Published Ghost site URL.
- Published Ghost post/page URL.
- Desktop screenshot of button mode.
- Desktop screenshot of embed mode.
- Mobile screenshot of embed mode.
- The opened booking URL from button mode.
- Any notes about confusing Ghost Admin steps.

## Stop Conditions

- Ghost strips the script tag.
- Published page source shows private API keys, OAuth tokens, member IDs, email addresses, or staff-only data.
- Hosted booking cannot open from either button or embed mode.
- The iframe is visibly clipped even at `720px` height.
