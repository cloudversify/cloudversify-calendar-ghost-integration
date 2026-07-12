const DEFAULT_BOOKING_BASE_URL = 'https://book.cloudversify.com';
const DEFAULT_LABEL = 'Book now';
const DEFAULT_PRIMARY_COLOR = '#15171a';
const DEFAULT_FRAME_HEIGHT = '720px';

class CloudversifyGhostBookingElement extends HTMLElement {
  static get observedAttributes() {
    return [
      'booking-base-url',
      'organization-slug',
      'calendar-id',
      'service-id',
      'post-slug',
      'page-slug',
      'author-slug',
      'tag-slug',
      'member-segment',
      'mode',
      'label',
      'primary-color',
      'height',
      'utm-campaign'
    ];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    if (this.isConnected) {
      this.render();
    }
  }

  render() {
    const config = this.config();
    const style = document.createElement('style');
    style.textContent = this.styles();

    const wrapper = document.createElement('div');
    wrapper.className = 'cloudversify-ghost-booking';
    wrapper.style.setProperty('--cloudversify-primary-color', config.primaryColor);
    wrapper.style.setProperty('--cloudversify-frame-height', config.height);

    if (!config.organizationSlug) {
      wrapper.appendChild(this.error('Cloudversify booking requires an organization slug.'));
    } else if (config.mode === 'embed') {
      wrapper.appendChild(this.frame(config));
      wrapper.appendChild(this.fallbackLink(config));
    } else {
      wrapper.appendChild(this.button(config));
    }

    this.shadowRoot.replaceChildren(style, wrapper);
  }

  config() {
    return {
      bookingBaseUrl: this.cleanHttpsUrl(this.getAttribute('booking-base-url')) || DEFAULT_BOOKING_BASE_URL,
      organizationSlug: this.cleanPublicId(this.getAttribute('organization-slug')),
      calendarId: this.cleanPublicId(this.getAttribute('calendar-id')),
      serviceId: this.cleanPublicId(this.getAttribute('service-id')),
      postSlug: this.cleanPublicId(this.getAttribute('post-slug')),
      pageSlug: this.cleanPublicId(this.getAttribute('page-slug')),
      authorSlug: this.cleanPublicId(this.getAttribute('author-slug')),
      tagSlug: this.cleanPublicId(this.getAttribute('tag-slug')),
      memberSegment: this.cleanPublicId(this.getAttribute('member-segment')),
      mode: this.getAttribute('mode') === 'embed' ? 'embed' : 'button',
      label: this.cleanLabel(this.getAttribute('label')) || DEFAULT_LABEL,
      primaryColor: this.safeCss('color', this.getAttribute('primary-color'), DEFAULT_PRIMARY_COLOR),
      height: this.safeFrameHeight(this.getAttribute('height')),
      utmCampaign: this.cleanPublicId(this.getAttribute('utm-campaign'))
    };
  }

  button(config) {
    const link = document.createElement('a');
    link.className = 'cloudversify-ghost-booking-button';
    link.href = this.bookingUrl(config);
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = config.label;
    return link;
  }

  frame(config) {
    const frame = document.createElement('iframe');
    frame.className = 'cloudversify-ghost-booking-frame';
    frame.src = this.bookingUrl(config);
    frame.title = config.label;
    frame.loading = 'lazy';
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    frame.setAttribute('sandbox', 'allow-forms allow-same-origin allow-scripts allow-popups allow-popups-to-escape-sandbox');
    return frame;
  }

  fallbackLink(config) {
    const link = this.button(config);
    link.className = 'cloudversify-ghost-booking-fallback';
    link.textContent = `Open ${config.label}`;
    return link;
  }

  error(message) {
    const node = document.createElement('div');
    node.className = 'cloudversify-ghost-booking-error';
    node.textContent = message;
    return node;
  }

  bookingUrl(config) {
    const url = new URL(`/org/${config.organizationSlug}`, config.bookingBaseUrl);

    this.setParam(url, 'calendar_id', config.calendarId);
    this.setParam(url, 'service_id', config.serviceId);
    this.setParam(url, 'ghost_post_slug', config.postSlug);
    this.setParam(url, 'ghost_page_slug', config.pageSlug);
    this.setParam(url, 'ghost_author_slug', config.authorSlug);
    this.setParam(url, 'ghost_tag_slug', config.tagSlug);
    this.setParam(url, 'member_segment', config.memberSegment);

    url.searchParams.set('source_platform', 'ghost');
    url.searchParams.set('utm_source', 'ghost');
    url.searchParams.set('utm_medium', 'custom-integration');

    if (config.utmCampaign) {
      url.searchParams.set('utm_campaign', config.utmCampaign);
    }

    return url.toString();
  }

  setParam(url, key, value) {
    if (value) {
      url.searchParams.set(key, value);
    }
  }

  cleanHttpsUrl(value) {
    if (!value) {
      return '';
    }

    try {
      const url = new URL(value);
      if (url.protocol !== 'https:' || url.username || url.password) {
        return '';
      }

      return url.toString();
    } catch {
      return '';
    }
  }

  cleanPublicId(value) {
    return value ? value.trim().replace(/[^a-zA-Z0-9_.-]/g, '') : '';
  }

  cleanLabel(value) {
    return value ? value.trim().replace(/\s+/g, ' ').slice(0, 80) : '';
  }

  safeCss(property, value, fallback) {
    if (!value || typeof CSS === 'undefined' || !CSS.supports(property, value)) {
      return fallback;
    }

    return value;
  }

  safeFrameHeight(value) {
    const fallback = DEFAULT_FRAME_HEIGHT;
    const rawValue = value || fallback;

    if (typeof CSS === 'undefined' || !CSS.supports('height', rawValue)) {
      return fallback;
    }

    const pixelHeight = rawValue.match(/^(\d+)px$/);
    if (pixelHeight && Number(pixelHeight[1]) < 620) {
      return '620px';
    }

    return rawValue;
  }

  styles() {
    return `
      :host {
        --cloudversify-primary-color: ${DEFAULT_PRIMARY_COLOR};
        --cloudversify-frame-height: ${DEFAULT_FRAME_HEIGHT};
        color: #15171a;
        display: block;
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        width: 100%;
      }

      .cloudversify-ghost-booking {
        display: grid;
        gap: 12px;
        width: 100%;
      }

      .cloudversify-ghost-booking-button,
      .cloudversify-ghost-booking-fallback {
        align-items: center;
        background: var(--cloudversify-primary-color);
        border-radius: 6px;
        color: #fff;
        display: inline-flex;
        font-size: 15px;
        font-weight: 700;
        justify-content: center;
        line-height: 1.2;
        min-height: 44px;
        padding: 12px 18px;
        text-decoration: none;
      }

      .cloudversify-ghost-booking-fallback {
        background: transparent;
        color: var(--cloudversify-primary-color);
        justify-self: start;
        min-height: 0;
        padding: 0;
      }

      .cloudversify-ghost-booking-frame {
        border: 1px solid #d7dce0;
        border-radius: 6px;
        display: block;
        height: var(--cloudversify-frame-height);
        min-height: 620px;
        width: 100%;
      }

      .cloudversify-ghost-booking-error {
        border: 1px solid #f0c0c0;
        border-radius: 6px;
        color: #8a1f1f;
        padding: 12px;
      }
    `;
  }
}

customElements.define('cloudversify-ghost-booking', CloudversifyGhostBookingElement);
