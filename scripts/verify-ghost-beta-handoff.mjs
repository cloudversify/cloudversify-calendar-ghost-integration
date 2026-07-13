import { readFile } from 'node:fs/promises';

const readiness = await readFile('docs/ghost-beta-readiness-handoff.md', 'utf8');
const support = await readFile('docs/ghost-support-handoff.md', 'utf8');
const releaseNotes = await readFile('docs/ghost-release-notes.md', 'utf8');

mustInclude(readiness, 'External Blockers', 'readiness external blockers');
mustInclude(readiness, 'CDN location', 'readiness CDN blocker');
mustInclude(readiness, 'Real Ghost site', 'readiness Ghost site blocker');
mustInclude(readiness, 'Recommended CDN Contract', 'readiness CDN contract');
mustInclude(readiness, 'infrastructure, HIPAA isolation, API coverage, and SDK coverage planning', 'readiness next strategic area');
mustInclude(support, 'Triage Checklist', 'support triage checklist');
mustInclude(support, 'source_platform=ghost', 'support attribution check');
mustInclude(support, 'rotate the exposed credential', 'support exposed credential handling');
mustInclude(releaseNotes, 'Rollback', 'release notes rollback');

console.log('Ghost beta handoff verification passed.');

function mustInclude(source, needle, label) {
  if (!source.includes(needle)) {
    throw new Error(`Missing ${label}: ${needle}`);
  }
}
