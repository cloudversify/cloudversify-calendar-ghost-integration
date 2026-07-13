import { readFile } from 'node:fs/promises';

const widgetSource = await readFile('src/cloudversify-ghost-booking-element.js', 'utf8');
const readme = await readFile('README.md', 'utf8');
const plan = await readFile('docs/ghost-implementation-plan.md', 'utf8');
const setup = await readFile('docs/ghost-customer-setup-guide.md', 'utf8');
const releaseNotes = await readFile('docs/ghost-release-notes.md', 'utf8');
const settingsContract = await readFile('docs/ghost-settings-contract.md', 'utf8');
const reviewPacket = await readFile('docs/ghost-published-site-review-packet.md', 'utf8');
const jeremyTutorial = await readFile('docs/jeremy-ghost-test-tutorial.md', 'utf8');
const betaHandoff = await readFile('docs/ghost-beta-readiness-handoff.md', 'utf8');
const supportHandoff = await readFile('docs/ghost-support-handoff.md', 'utf8');
const qaCases = await readFile('qa/ghost-published-page-cases.json', 'utf8');
const codeInjection = await readFile('examples/code-injection.html', 'utf8');
const htmlCard = await readFile('examples/html-card-embed.html', 'utf8');
const snippetGenerator = await readFile('src/ghost-snippet-generator.js', 'utf8');
const packageJson = await readFile('package.json', 'utf8');
const packageScript = await readFile('scripts/package-ghost-release.mjs', 'utf8');
const verifyScript = await readFile('scripts/verify-ghost-release.mjs', 'utf8');

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
mustInclude(releaseNotes, 'Beta Package Scope', 'release notes beta scope');
mustInclude(releaseNotes, 'Rollback', 'release notes rollback');
mustInclude(settingsContract, 'Ghost Settings Contract', 'settings contract title');
mustInclude(settingsContract, 'Code Injection', 'settings Code Injection surface');
mustInclude(settingsContract, 'source_platform=ghost', 'settings attribution');
mustInclude(reviewPacket, 'Ghost Published Site Review Packet', 'published-site packet title');
mustInclude(reviewPacket, 'utm_medium=custom-integration', 'published-site packet attribution');
mustInclude(jeremyTutorial, 'Desktop screenshot of button mode', 'Jeremy tutorial evidence');
mustInclude(jeremyTutorial, 'HTML card', 'Jeremy tutorial Ghost setup');
mustInclude(betaHandoff, 'External Blockers', 'beta readiness external blockers');
mustInclude(betaHandoff, 'HIPAA isolation', 'beta readiness strategic next step');
mustInclude(supportHandoff, 'Triage Checklist', 'support handoff triage');
mustInclude(supportHandoff, 'rotate the exposed credential', 'support handoff credential handling');
mustInclude(qaCases, 'code-injection-button', 'QA Code Injection case');
mustInclude(qaCases, 'html-card-embed', 'QA HTML card case');
mustInclude(codeInjection, '<cloudversify-ghost-booking', 'Code Injection example');
mustInclude(htmlCard, 'mode="embed"', 'HTML card embed example');
mustInclude(htmlCard, 'member-segment=', 'member segment example');
mustInclude(snippetGenerator, 'GHOST_SETTINGS_SCHEMA', 'snippet generator schema');
mustInclude(snippetGenerator, 'buildGhostSnippet', 'snippet generator builder');
mustInclude(snippetGenerator, 'organizationSlug is required', 'snippet generator required setting');
mustInclude(packageJson, 'scripts/smoke-ghost-widget.mjs', 'widget smoke validation script');
mustInclude(packageJson, 'scripts/smoke-ghost-snippet-generator.mjs', 'snippet generator smoke validation script');
mustInclude(packageJson, 'scripts/verify-ghost-review-packet.mjs', 'review packet validation script');
mustInclude(packageJson, 'scripts/verify-ghost-beta-handoff.mjs', 'beta handoff validation script');
mustInclude(packageJson, 'release:check', 'release check script');
mustInclude(packageScript, 'settingsContract', 'release package settings contract source');
mustInclude(packageScript, 'snippetGenerator', 'release package snippet generator source');
mustInclude(packageScript, 'handoff.json', 'release package handoff artifact');
mustInclude(packageScript, 'manifest.json', 'release package manifest artifact');
mustInclude(verifyScript, 'Ghost release package verification passed', 'release verification script');

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
