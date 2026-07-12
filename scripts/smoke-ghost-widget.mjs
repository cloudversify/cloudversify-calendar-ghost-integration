import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

const source = await readFile('src/cloudversify-ghost-booking-element.js', 'utf8');
const registry = new Map();
const context = {
  URL,
  CSS: {
    supports(property, value) {
      return property === 'height' ? /^(\d+)px$/.test(value) : true;
    }
  },
  customElements: {
    define(name, elementClass) {
      registry.set(name, elementClass);
    },
    get(name) {
      return registry.get(name);
    }
  },
  HTMLElement: class {
    constructor() {
      this.attributes = new Map();
      this.isConnected = false;
    }

    attachShadow() {
      return {
        replaceChildren() {}
      };
    }

    getAttribute(name) {
      return this.attributes.get(name) ?? null;
    }

    setAttribute(name, value) {
      this.attributes.set(name, String(value));
      this.attributeChangedCallback?.();
    }
  }
};

vm.runInNewContext(source, context, { filename: 'cloudversify-ghost-booking-element.js' });

const BookingElement = registry.get('cloudversify-ghost-booking');
if (!BookingElement) {
  throw new Error('Booking custom element was not registered.');
}

const bookingUrl = (attributes) => {
  const element = new BookingElement();
  for (const [name, value] of Object.entries(attributes)) {
    element.setAttribute(name, value);
  }

  return new URL(element.bookingUrl(element.config()));
};

const contextualUrl = bookingUrl({
  'organization-slug': 'demo-publication',
  'calendar-id': 'cal_editor',
  'service-id': 'svc_member_session',
  'post-slug': 'subscriber-office-hours',
  'author-slug': 'jane-editor',
  'tag-slug': 'workshops',
  'member-segment': 'paid-members',
  'utm-campaign': 'summer-members'
});

assertEqual(contextualUrl.pathname, '/org/demo-publication', 'organization path');
assertEqual(contextualUrl.searchParams.get('calendar_id'), 'cal_editor', 'calendar handoff');
assertEqual(contextualUrl.searchParams.get('service_id'), 'svc_member_session', 'service handoff');
assertEqual(contextualUrl.searchParams.get('ghost_post_slug'), 'subscriber-office-hours', 'post slug handoff');
assertEqual(contextualUrl.searchParams.get('ghost_author_slug'), 'jane-editor', 'author slug handoff');
assertEqual(contextualUrl.searchParams.get('ghost_tag_slug'), 'workshops', 'tag slug handoff');
assertEqual(contextualUrl.searchParams.get('member_segment'), 'paid-members', 'member segment handoff');
assertEqual(contextualUrl.searchParams.get('source_platform'), 'ghost', 'source platform');
assertEqual(contextualUrl.searchParams.get('utm_medium'), 'custom-integration', 'UTM medium');
assertEqual(contextualUrl.searchParams.get('utm_campaign'), 'summer-members', 'UTM campaign');

const credentialedHostUrl = bookingUrl({
  'booking-base-url': 'https://user:secret@book.cloudversify.com',
  'organization-slug': 'demo-publication'
});

assertEqual(credentialedHostUrl.origin, 'https://book.cloudversify.com', 'credentialed booking host rejected');

const element = new BookingElement();
assertEqual(element.safeFrameHeight('480px'), '620px', 'minimum iframe height');

console.log('Ghost widget smoke validation passed.');

function assertEqual(actual, expected, label) {
  if (actual !== expected) {
    throw new Error(`${label}: expected ${expected}, received ${actual}`);
  }
}
