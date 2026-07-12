import { buildGhostSnippet, GHOST_SETTINGS_SCHEMA } from '../src/ghost-snippet-generator.js';

const buttonSnippet = buildGhostSnippet({
  organizationSlug: 'demo publication',
  serviceId: 'svc_editorial_consult',
  postSlug: 'launch post',
  label: 'Book & discuss',
  utmCampaign: 'ghost campaign'
});

mustInclude(buttonSnippet, '<script src="https://cdn.cloudversify.com/ghost/cloudversify-ghost-booking-element.js" defer></script>', 'script tag');
mustInclude(buttonSnippet, 'organization-slug="demopublication"', 'cleaned organization slug');
mustInclude(buttonSnippet, 'service-id="svc_editorial_consult"', 'service ID');
mustInclude(buttonSnippet, 'post-slug="launchpost"', 'cleaned post slug');
mustInclude(buttonSnippet, 'mode="button"', 'default button mode');
mustInclude(buttonSnippet, 'label="Book &amp; discuss"', 'escaped label');
mustInclude(buttonSnippet, 'utm-campaign="ghostcampaign"', 'cleaned campaign');
mustNotInclude(buttonSnippet, 'height=', 'button height omission');
mustNotInclude(buttonSnippet, 'admin-api-key', 'secret-like Admin API key field');

const embedSnippet = buildGhostSnippet({
  organizationSlug: 'demo-publication',
  calendarId: 'cal_editor',
  serviceId: 'svc_member_session',
  authorSlug: 'jane-editor',
  tagSlug: 'workshops',
  memberSegment: 'paid-members',
  mode: 'embed',
  height: '480px'
});

mustInclude(embedSnippet, 'calendar-id="cal_editor"', 'calendar ID');
mustInclude(embedSnippet, 'author-slug="jane-editor"', 'author slug');
mustInclude(embedSnippet, 'tag-slug="workshops"', 'tag slug');
mustInclude(embedSnippet, 'member-segment="paid-members"', 'member segment');
mustInclude(embedSnippet, 'mode="embed"', 'embed mode');
mustInclude(embedSnippet, 'height="620px"', 'minimum embed height');
mustInclude(GHOST_SETTINGS_SCHEMA.surfaces.join('\\n'), 'Code Injection', 'Ghost Code Injection surface');
mustInclude(GHOST_SETTINGS_SCHEMA.surfaces.join('\\n'), 'HTML card', 'Ghost HTML card surface');

let requiredError = '';
try {
  buildGhostSnippet({});
} catch (error) {
  requiredError = error.message;
}

mustInclude(requiredError, 'organizationSlug is required', 'required organization slug error');

console.log('Ghost snippet generator smoke validation passed.');

function mustInclude(source, needle, label) {
  if (!source.includes(needle)) {
    throw new Error(`Missing ${label}: ${needle}`);
  }
}

function mustNotInclude(source, needle, label) {
  if (source.includes(needle)) {
    throw new Error(`Unexpected ${label}: ${needle}`);
  }
}
