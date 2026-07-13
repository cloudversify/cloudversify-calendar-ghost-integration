import { readFile } from 'node:fs/promises';

const cases = JSON.parse(await readFile('qa/ghost-published-page-cases.json', 'utf8'));
const tutorial = await readFile('docs/jeremy-ghost-test-tutorial.md', 'utf8');
const packet = await readFile('docs/ghost-published-site-review-packet.md', 'utf8');

assertEqual(cases.platform, 'ghost', 'QA platform');
mustInclude(cases.surfaces.join('\n'), 'Code Injection', 'Code Injection surface');
mustInclude(cases.surfaces.join('\n'), 'HTML card', 'HTML card surface');
assertEqual(cases.cases.length, 4, 'QA case count');

for (const testCase of cases.cases) {
  const evidence = testCase.requiredEvidence.join('\n');
  if (testCase.id === 'missing-organization') {
    mustInclude(evidence, 'Preview or published', `${testCase.id} preview evidence`);
  } else {
    mustInclude(evidence, 'Published', `${testCase.id} published evidence`);
  }

  if (testCase.mode === 'embed') {
    mustInclude(testCase.passCriteria.join('\n'), 'hosted booking', `${testCase.id} hosted booking criteria`);
  }
}

mustInclude(tutorial, 'Ghost site where you can edit Code Injection', 'tutorial access requirement');
mustInclude(tutorial, 'HTML card', 'tutorial HTML card step');
mustInclude(tutorial, 'source_platform=ghost', 'tutorial source attribution');
mustInclude(tutorial, 'Desktop screenshot of button mode', 'tutorial evidence request');
mustInclude(packet, 'Ghost Published Site Review Packet', 'packet title');
mustInclude(packet, 'utm_medium=custom-integration', 'packet UTM attribution');
mustInclude(packet, 'private credentials', 'packet security review');

console.log('Ghost review packet verification passed.');

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
