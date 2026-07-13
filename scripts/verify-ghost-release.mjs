import { readFile, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const packageJson = JSON.parse(await readFile('package.json', 'utf8'));
const releaseDir = `dist/cloudversify-ghost-booking-v${packageJson.version}`;
const manifest = JSON.parse(await readFile(`${releaseDir}/manifest.json`, 'utf8'));
const handoff = JSON.parse(await readFile(`${releaseDir}/handoff.json`, 'utf8'));

assertEqual(manifest.package, 'cloudversify-ghost-booking', 'manifest package name');
assertEqual(manifest.version, packageJson.version, 'manifest version');
assertEqual(manifest.generatedAt, '1970-01-01T00:00:00.000Z', 'deterministic manifest timestamp');

const expectedFiles = [
  'cloudversify-ghost-booking-element.js',
  'code-injection.html',
  'html-card-embed.html',
  'ghost-customer-setup-guide.md',
  'ghost-implementation-plan.md',
  'ghost-release-notes.md',
  'ghost-settings-contract.md',
  'ghost-snippet-generator.js',
  'ghost-beta-readiness-handoff.md',
  'ghost-support-handoff.md',
  'ghost-published-site-review-packet.md',
  'jeremy-ghost-test-tutorial.md',
  'ghost-published-page-cases.json',
  'handoff.json',
  'README.md'
];

for (const expectedFile of expectedFiles) {
  const entry = manifest.files.find((file) => file.path === expectedFile);
  if (!entry) {
    throw new Error(`Missing manifest entry for ${expectedFile}`);
  }

  const contents = await readFile(`${releaseDir}/${expectedFile}`, 'utf8');
  const fileStats = await stat(`${releaseDir}/${expectedFile}`);
  assertEqual(entry.bytes, fileStats.size, `${expectedFile} byte count`);
  assertEqual(entry.sha256, createHash('sha256').update(contents).digest('hex'), `${expectedFile} checksum`);
}

mustInclude(await readFile(`${releaseDir}/cloudversify-ghost-booking-element.js`, 'utf8'), "source_platform', 'ghost'", 'Ghost attribution in packaged widget');
mustInclude(await readFile(`${releaseDir}/code-injection.html`, 'utf8'), '<cloudversify-ghost-booking', 'Code Injection example in package');
mustInclude(await readFile(`${releaseDir}/html-card-embed.html`, 'utf8'), 'mode="embed"', 'HTML card embed in package');
mustInclude(await readFile(`${releaseDir}/ghost-release-notes.md`, 'utf8'), 'Rollback', 'rollback notes in package');
mustInclude(await readFile(`${releaseDir}/ghost-settings-contract.md`, 'utf8'), 'Ghost Settings Contract', 'settings contract in package');
mustInclude(await readFile(`${releaseDir}/ghost-snippet-generator.js`, 'utf8'), 'buildGhostSnippet', 'snippet generator in package');
mustInclude(await readFile(`${releaseDir}/ghost-beta-readiness-handoff.md`, 'utf8'), 'External Blockers', 'beta readiness handoff in package');
mustInclude(await readFile(`${releaseDir}/ghost-support-handoff.md`, 'utf8'), 'Triage Checklist', 'support handoff in package');
mustInclude(await readFile(`${releaseDir}/ghost-published-site-review-packet.md`, 'utf8'), 'Published site URL', 'published-site review packet in package');
mustInclude(await readFile(`${releaseDir}/jeremy-ghost-test-tutorial.md`, 'utf8'), 'Evidence To Send Back', 'Jeremy tutorial in package');
mustInclude(await readFile(`${releaseDir}/ghost-published-page-cases.json`, 'utf8'), 'html-card-embed', 'QA cases in package');
mustInclude(handoff.supportedSurfaces, 'Code Injection', 'Code Injection handoff reference');
mustInclude(handoff.supportedSurfaces, 'HTML card', 'HTML card handoff reference');
assertEqual(handoff.generator.settingsContract, 'ghost-settings-contract.md', 'settings contract handoff reference');
assertEqual(handoff.generator.module, 'ghost-snippet-generator.js', 'snippet generator module handoff reference');
assertEqual(handoff.review.publishedSitePacket, 'ghost-published-site-review-packet.md', 'review packet handoff reference');
assertEqual(handoff.review.jeremyTutorial, 'jeremy-ghost-test-tutorial.md', 'Jeremy tutorial handoff reference');
assertEqual(handoff.review.qaCases, 'ghost-published-page-cases.json', 'QA cases handoff reference');
mustInclude(handoff.validation, 'npm run check', 'release validation command');
mustInclude(handoff.guardrails.join('\n'), 'No Admin API keys', 'no-secret release guardrail');
mustInclude(handoff.externalBlockers.join('\n'), 'CDN location', 'external blocker handoff');

console.log('Ghost release package verification passed.');

function assertEqual(actual, expected, label) {
  if (actual !== expected) {
    throw new Error(`${label}: expected ${expected}, received ${actual}`);
  }
}

function mustInclude(source, needle, label) {
  if (!source.includes(needle)) {
    throw new Error(`Missing ${label}: ${needle}`);
  }
}
