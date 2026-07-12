import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import path from 'node:path';

const packageJson = JSON.parse(await readFile('package.json', 'utf8'));
const version = packageJson.version;
const releaseDir = path.join('dist', `cloudversify-ghost-booking-v${version}`);

const sources = {
  widget: 'src/cloudversify-ghost-booking-element.js',
  codeInjection: 'examples/code-injection.html',
  htmlCard: 'examples/html-card-embed.html',
  setupGuide: 'docs/ghost-customer-setup-guide.md',
  implementationPlan: 'docs/ghost-implementation-plan.md',
  releaseNotes: 'docs/ghost-release-notes.md'
};

await rm(releaseDir, { force: true, recursive: true });
await mkdir(releaseDir, { recursive: true });

const branch = execFileSync('git', ['branch', '--show-current'], { encoding: 'utf8' }).trim();
const commit = execFileSync('git', ['rev-parse', '--short=12', 'HEAD'], { encoding: 'utf8' }).trim();

const releaseFiles = [
  ['cloudversify-ghost-booking-element.js', await readFile(sources.widget, 'utf8')],
  ['code-injection.html', await readFile(sources.codeInjection, 'utf8')],
  ['html-card-embed.html', await readFile(sources.htmlCard, 'utf8')],
  ['ghost-customer-setup-guide.md', await readFile(sources.setupGuide, 'utf8')],
  ['ghost-implementation-plan.md', await readFile(sources.implementationPlan, 'utf8')],
  ['ghost-release-notes.md', await readFile(sources.releaseNotes, 'utf8')]
];

const handoff = {
  package: 'cloudversify-ghost-booking',
  version,
  source: {
    branch,
    commit,
    ...sources
  },
  supportedSurfaces: ['Code Injection', 'HTML card', 'Handlebars theme partial'],
  supportedModes: ['button', 'embed'],
  requiredSetting: 'organization-slug',
  attribution: {
    source_platform: 'ghost',
    utm_source: 'ghost',
    utm_medium: 'custom-integration'
  },
  guardrails: [
    'No Admin API keys, Content API keys, OAuth tokens, or private credentials belong in public Ghost markup.',
    'Scheduling rules, availability, appointments, calendars, offerings, and participants stay in Cloudversify.',
    'Use Ghost context fields only for public routing and attribution.'
  ],
  validation: ['npm run check']
};

releaseFiles.push(['handoff.json', `${JSON.stringify(handoff, null, 2)}\n`]);
releaseFiles.push([
  'README.md',
  `# Cloudversify Ghost Booking ${version}

This package contains the Ghost integration beta handoff for Cloudversify Calendar.

Run \`npm run check\` in the source repo before handing this package to a Ghost implementer or support owner.
`
]);

for (const [file, contents] of releaseFiles) {
  await writeFile(path.join(releaseDir, file), contents);
}

const manifestFiles = [];
for (const [file, contents] of releaseFiles) {
  manifestFiles.push({
    path: file,
    bytes: Buffer.byteLength(contents),
    sha256: createHash('sha256').update(contents).digest('hex')
  });
}

const manifest = {
  package: 'cloudversify-ghost-booking',
  version,
  generatedAt: new Date(0).toISOString(),
  source: {
    branch,
    commit
  },
  files: manifestFiles
};

await writeFile(path.join(releaseDir, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);

console.log(`Ghost release package written to ${releaseDir}`);
