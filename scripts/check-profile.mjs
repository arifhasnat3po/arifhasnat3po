import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const readme = await fs.readFile(path.join(root, 'README.md'), 'utf8');
let fence = false;
for (const line of readme.split(/\r?\n/)) {
  if (/^```/.test(line)) fence = !fence;
}
assert.equal(fence, false, 'A code block is not closed.');
for (const tag of ['details', 'picture', 'table']) {
  assert.equal((readme.match(new RegExp(`<${tag}(?:\\s[^>]*)?>`, 'g')) || []).length, (readme.match(new RegExp(`</${tag}>`, 'g')) || []).length, `Unbalanced ${tag} elements.`);
}
for (const match of readme.matchAll(/(?:src|srcset)="(assets\/[^" ]+)"/g)) {
  await fs.access(path.join(root, match[1]));
}
for (const match of readme.matchAll(/\]\((docs\/[^)]+)\)/g)) {
  await fs.access(path.join(root, match[1]));
}
const headings = new Set([...readme.matchAll(/^#{1,6} (.+)$/gm)].map(match => match[1].toLowerCase().replace(/[^a-z0-9 -]/g, '').replace(/ /g, '-')));
for (const match of readme.matchAll(/href="#([^"]+)"/g)) {
  assert.ok(headings.has(match[1]), `Missing navigation heading: ${match[1]}`);
}
assert.ok(!readme.includes('The public snapshot is being prepared.'), 'Generate the real snapshot before publishing.');
for (const file of await fs.readdir(path.join(root, 'assets'))) {
  if (!file.endsWith('.svg')) continue;
  const content = await fs.readFile(path.join(root, 'assets', file), 'utf8');
  assert.ok(content.startsWith('<svg '), `${file}: expected SVG`);
  assert.ok(content.includes('<title') && content.includes('<desc'), `${file}: needs accessible text`);
  assert.ok(!/<(?:script|foreignObject|image)\b|\son\w+=/i.test(content), `${file}: unexpected executable or external content`);
}
console.log('PASS: balanced Markdown, navigation targets, local assets, and accessible SVGs.');
