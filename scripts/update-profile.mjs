import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { summarize, replaceSnapshot, snapshotSvg, escapeXml } from './profile-data.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'arifhasnat3po-profile' };
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
async function github(endpoint) {
  const response = await fetch(`https://api.github.com${endpoint}`, { headers, signal: AbortSignal.timeout(30000) });
  if (!response.ok) throw new Error(`GitHub API ${response.status}: ${endpoint}; existing snapshot retained.`);
  return response.json();
}
const repositories = [];
for (let page = 1; ; page++) {
  const batch = await github(`/users/arifhasnat3po/repos?type=owner&per_page=100&page=${page}`);
  if (!Array.isArray(batch)) throw new Error('Unexpected repository response.');
  repositories.push(...batch);
  if (batch.length < 100) break;
  if (page >= 20) throw new Error('Unexpected pagination size; existing snapshot retained.');
}
const release = await github('/repos/arifhasnat3po/pixelpair-plugin/releases/latest');
const date = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Dhaka' }).format(new Date());
const snapshot = summarize(repositories, release, date);
const alt = `${snapshot.repositories} original public repositories; ${snapshot.languages} primary languages; latest PixelPair release ${snapshot.latestRelease}. Updated ${date}.`;
const recent = snapshot.recent.map(repo => `| [${repo.name}](https://github.com/arifhasnat3po/${repo.name}) | ${repo.pushed} |`).join('\n');
const content = `<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/github-snapshot-dark.svg" />
  <img src="assets/github-snapshot-light.svg" width="100%" alt="${escapeXml(alt)}" />
</picture>

**${snapshot.repositories} original public repositories · ${snapshot.languages} primary languages · PixelPair ${snapshot.latestRelease}**

<details>
<summary>Recent repository updates and how this snapshot is counted</summary>

| Public project | Last push (UTC) |
| :--- | :--- |
${recent}

Refreshed **${date}** from GitHub's public API. Counts include original public repositories only; forks and private repositories are excluded. Language counts use each repository's primary language, not proficiency or time spent. This profile and the snake automation are omitted from the recent-project list.

This section refreshes weekly through [GitHub Actions](https://github.com/arifhasnat3po/arifhasnat3po/actions/workflows/profile.yml). [How to maintain it](docs/profile-maintenance.md).

</details>`;
const readme = await fs.readFile(path.join(root, 'README.md'), 'utf8');
const updated = replaceSnapshot(readme, content);
await fs.mkdir(path.join(root, 'assets'), { recursive: true });
await fs.writeFile(path.join(root, 'assets/github-snapshot-light.svg'), snapshotSvg(snapshot));
await fs.writeFile(path.join(root, 'assets/github-snapshot-dark.svg'), snapshotSvg(snapshot, true));
await fs.writeFile(path.join(root, 'README.md'), updated);
console.log(`Updated public snapshot: ${snapshot.repositories} repositories, ${snapshot.languages} primary languages.`);
