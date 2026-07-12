export const GHOST_SCRIPT_URL = 'https://cdn.cloudversify.com/ghost/cloudversify-ghost-booking-element.js';

export const GHOST_SETTINGS_SCHEMA = {
  platform: 'ghost',
  surfaces: ['Code Injection', 'HTML card', 'Handlebars theme partial'],
  fields: [
    {
      name: 'organizationSlug',
      attribute: 'organization-slug',
      label: 'Organization slug',
      required: true,
      placeholder: 'demo-publication'
    },
    {
      name: 'calendarId',
      attribute: 'calendar-id',
      label: 'Calendar ID',
      required: false,
      placeholder: 'cal_editor'
    },
    {
      name: 'serviceId',
      attribute: 'service-id',
      label: 'Service ID',
      required: false,
      placeholder: 'svc_member_session'
    },
    {
      name: 'postSlug',
      attribute: 'post-slug',
      label: 'Post slug',
      required: false,
      placeholder: 'subscriber-office-hours'
    },
    {
      name: 'pageSlug',
      attribute: 'page-slug',
      label: 'Page slug',
      required: false,
      placeholder: 'book-a-session'
    },
    {
      name: 'authorSlug',
      attribute: 'author-slug',
      label: 'Author slug',
      required: false,
      placeholder: 'jane-editor'
    },
    {
      name: 'tagSlug',
      attribute: 'tag-slug',
      label: 'Tag slug',
      required: false,
      placeholder: 'workshops'
    },
    {
      name: 'memberSegment',
      attribute: 'member-segment',
      label: 'Member segment',
      required: false,
      placeholder: 'paid-members'
    },
    {
      name: 'mode',
      attribute: 'mode',
      label: 'Mode',
      required: true,
      values: ['button', 'embed'],
      default: 'button'
    },
    {
      name: 'label',
      attribute: 'label',
      label: 'Button or frame label',
      required: false,
      default: 'Book now'
    },
    {
      name: 'primaryColor',
      attribute: 'primary-color',
      label: 'Primary color',
      required: false,
      default: '#15171a'
    },
    {
      name: 'height',
      attribute: 'height',
      label: 'Embed height',
      required: false,
      default: '720px',
      mode: 'embed'
    },
    {
      name: 'utmCampaign',
      attribute: 'utm-campaign',
      label: 'UTM campaign',
      required: false,
      placeholder: 'ghost-demo'
    }
  ]
};

export function buildGhostSnippet(settings = {}) {
  const normalized = normalizeSettings(settings);
  const lines = [
    `<script src="${GHOST_SCRIPT_URL}" defer></script>`,
    '',
    '<cloudversify-ghost-booking'
  ];

  for (const field of GHOST_SETTINGS_SCHEMA.fields) {
    const value = normalized[field.name];
    if (!value) {
      continue;
    }

    lines.push(`  ${field.attribute}="${escapeAttribute(value)}"`);
  }

  lines.push('></cloudversify-ghost-booking>');
  return `${lines.join('\n')}\n`;
}

export function normalizeSettings(settings) {
  const mode = settings.mode === 'embed' ? 'embed' : 'button';
  const normalized = {
    organizationSlug: cleanPublicId(settings.organizationSlug),
    calendarId: cleanPublicId(settings.calendarId),
    serviceId: cleanPublicId(settings.serviceId),
    postSlug: cleanPublicId(settings.postSlug),
    pageSlug: cleanPublicId(settings.pageSlug),
    authorSlug: cleanPublicId(settings.authorSlug),
    tagSlug: cleanPublicId(settings.tagSlug),
    memberSegment: cleanPublicId(settings.memberSegment),
    mode,
    label: cleanText(settings.label) || 'Book now',
    primaryColor: cleanText(settings.primaryColor) || '#15171a',
    height: mode === 'embed' ? cleanHeight(settings.height) : '',
    utmCampaign: cleanPublicId(settings.utmCampaign)
  };

  if (!normalized.organizationSlug) {
    throw new Error('organizationSlug is required.');
  }

  return normalized;
}

function cleanPublicId(value) {
  return value ? String(value).trim().replace(/[^a-zA-Z0-9_.-]/g, '') : '';
}

function cleanText(value) {
  return value ? String(value).trim().replace(/\s+/g, ' ') : '';
}

function cleanHeight(value) {
  const height = cleanText(value) || '720px';
  const pixelHeight = height.match(/^(\d+)px$/);
  if (pixelHeight && Number(pixelHeight[1]) < 620) {
    return '620px';
  }

  return height;
}

function escapeAttribute(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
