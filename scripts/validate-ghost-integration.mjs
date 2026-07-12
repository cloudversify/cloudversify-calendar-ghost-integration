import { readFile } from 'node:fs/promises';

const widgetSource = await readFile('src/cloudversify-ghost-booking-element.js', 'utf8');
const readme = await readFile('README.md', 'utf8');
const plan = await readFile('docs/ghost-implementation-plan.md', 'utf8');
const setup = await readFile('docs/ghost-customer-setup-guide.md', 'utf8');
const codeInjection = await readFile('examples/code-injection.html', 'utf8');
const htmlCard = await readFile('examples/html-card-embed.html', 'utf8');
const packageJson = await readFile('package.json', 'utf8');

mustInclude(widgetSource, "customElements.define('cloudversify-ghost-booking'", 'custom element registration');
mustInclude(widgetSource, "source_platform', 'ghost'", 'Ghost source platform attribution');
mustInclude(widgetSource, "utm_medium', 'custom-integration'", 'Ghost UTM medium attribution');
mustInclude(widgetSource, "ghost_post_slug', config.postSlug", 'Ghost post slug handoff');
mustInclude(widgetSource, "member_segment', config.memberSegment", 'Ghost member segment handoff');
mustInclude(widgetSource, 'url.username || url.password', 'credentialed booking host rejection');
mustInclude(widgetSource, "sandbox', 'allow-forms", 'iframe sandbox policy');
mustInclude(widgetSource, "return '620px';", 'embedded frame minimum height');
mustNotInclude(widgetSource, 'admin-api-key', 'secret-like Admin API key field');
mustNotInclude(widgetSource, 'content-api-key', 'secret-like Content API key field');
mustNotInclude(widgetSource, 'access-token', 'secret-like access token field');

mustInclude(readme, 'Code Injection', 'README Code Injection positioning');
mustInclude(readme, 'HTML card', 'README HTML card positioning');
mustInclude(readme, 'source_platform=ghost', 'README attribution');
mustInclude(plan, 'Custom integrations', 'plan custom integrations terminology');
mustInclude(plan, 'Content API', 'plan Content API terminology');
mustInclude(plan, 'No Admin API keys', 'plan no-secret boundary');
mustInclude(setup, 'Ghost Admin', 'setup Ghost Admin');
mustInclude(setup, 'HTML card', 'setup HTML card');
mustInclude(codeInjection, '<cloudversify-ghost-booking', 'Code Injection example');
mustInclude(htmlCard, 'mode="embed"', 'HTML card embed example');
mustInclude(htmlCard, 'member-segment=', 'member segment example');
mustInclude(packageJson, 'scripts/smoke-ghost-widget.mjs', 'widget smoke validation script');

console.log('Ghost integration validation passed.');

function mustInclude(source, needle, label) {
  if (!source.includes(needle)) {
    throw new Error(`Missing ${label}: ${needle}`);
  }
}

function mustNotInclude(source, needle, label) {
  if (source.toLowerCase().includes(needle)) {
    throw new Error(`Unexpected ${label}: ${needle}`);
  }
}
