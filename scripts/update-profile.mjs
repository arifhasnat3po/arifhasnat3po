import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { summarize, replaceSnapshot, escapeXml, originalRepositories, summarizeLanguages, monthWindows, searchCount } from './profile-data.mjs';
import { statsSvg, languagesSvg, activitySvg, visibleStats } from './dashboard-art.mjs';
import { buildCover } from './build-cover.mjs';

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
const now = new Date();
const date = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Dhaka' }).format(now);
const snapshot = summarize(repositories, release, date);
const user = await github('/users/arifhasnat3po');
const originals = originalRepositories(repositories);
const languageData = {};
for (const repo of originals) {
  languageData[repo.name] = await github(`/repos/arifhasnat3po/${encodeURIComponent(repo.name)}/languages`);
}
const languages = summarizeLanguages(repositories, languageData);
const count = async (kind, query) => {
  // Pace every search, including issue/PR counts, below the unauthenticated limit.
  if (!process.env.GITHUB_TOKEN) await new Promise(resolve => setTimeout(resolve,6500));
  return searchCount(await github(`/search/${kind}?q=${encodeURIComponent(query)}&per_page=1`));
};
const pullRequests = await count('issues','author:arifhasnat3po is:pr is:public');
const issues = await count('issues','author:arifhasnat3po is:issue is:public');
const months = monthWindows(now);
for (const month of months) {
  month.count = await count('commits',`author:arifhasnat3po is:public committer-date:${month.from}..${month.to}`);
}
const stats = {
  repositories:snapshot.repositories,
  stars:originals.reduce((sum,repo)=>sum+repo.stargazers_count,0),
  followers:user.followers,pullRequests,issues,since:user.created_at.slice(0,4),date,
};
if (![stats.stars,stats.followers].every(value=>Number.isSafeInteger(value)&&value>=0)) throw new Error('Invalid public profile counts.');
const totalCommits = months.reduce((sum,month)=>sum+month.count,0);
const displayedStats=visibleStats(stats);
const picture = (name,alt,width) => `<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/${name}-dark.svg" />
  <img src="assets/${name}-light.svg" width="${width}" alt="${escapeXml(alt)}" />
</picture>`;
const content = `<p>
${picture('github-stats',`${displayedStats.map(([label,value])=>`${label}: ${value}`).join('; ')}. On GitHub since ${stats.since}.`,420)}
${picture('github-languages',languages.rows.map(row=>`${row.name} ${row.percent.toFixed(1)}%`).join(', ')+'. Language shares by code bytes in original public repositories.',420)}
</p>

${picture('github-activity',`${totalCommits} public commits from ${months[0].from} to ${months.at(-1).to}. Public default-branch commits; current month is partial.`,860)}

**${snapshot.repositories} original public repositories · ${snapshot.languages} primary languages · PixelPair ${snapshot.latestRelease}**

`;
const readme = await fs.readFile(path.join(root, 'README.md'), 'utf8');
const updated = replaceSnapshot(readme, content);
await fs.mkdir(path.join(root, 'assets'), { recursive: true });
for (const [name,render,value] of [['github-stats',statsSvg,stats],['github-languages',languagesSvg,languages]]) {
  await fs.writeFile(path.join(root,`assets/${name}-light.svg`),render(value));
  await fs.writeFile(path.join(root,`assets/${name}-dark.svg`),render(value,true));
}
await fs.writeFile(path.join(root,'assets/github-activity-light.svg'),activitySvg(months,date));
await fs.writeFile(path.join(root,'assets/github-activity-dark.svg'),activitySvg(months,date,true));
await fs.writeFile(path.join(root, 'README.md'), updated);
await buildCover(months);
console.log(`Updated public dashboard: ${snapshot.repositories} repositories, ${languages.rows.length} language groups, ${totalCommits} public commits.`);
