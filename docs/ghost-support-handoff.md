# Ghost Support Handoff

## Common Customer Requests

### Add A Booking Button To The Whole Site

Use Code Injection button mode when the publisher wants a global booking call to action.

Required values:

- Organization slug.

Optional values:

- Service ID.
- Calendar ID.
- Button label.
- Primary color.
- UTM campaign.

### Add Booking Inside A Post Or Page

Use an HTML card when the booking call to action belongs inside a specific post, page, member-only article, or landing page.

Recommended values:

- Organization slug.
- Service ID.
- Post slug or page slug.
- Member segment only when it is a public segment label.

### Add Embedded Booking

Use embed mode only when the publisher wants booking to happen inside the Ghost page itself.

Recommended values:

- Height of `720px` or greater.
- Fallback link review on mobile.

## Triage Checklist

- Can the customer edit Code Injection or add HTML cards?
- Does the published page load the Cloudversify script?
- Does the custom element include `organization-slug`?
- Does the opened booking URL include `source_platform=ghost`?
- Is embed mode at least `620px` high?
- Is any private API key, member identifier, email, subscription ID, or private credential present in public markup? If yes, remove it immediately and rotate the exposed credential.

## Escalation Triggers

- Ghost strips the script on publish.
- Hosted booking is blocked inside the iframe.
- Page source exposes private Ghost or Cloudversify credentials.
- Published page works in preview but not after publish.
- Mobile embed layout is clipped even above `720px` height.

## Support Reply Template

Use Ghost Code Injection for site-wide booking buttons or an HTML card for post/page-specific booking. Paste the Cloudversify snippet generated for your organization. After publishing, test the button or embed on the public page and confirm the opened booking URL includes `source_platform=ghost`.
