const owner = 'arifhasnat3po';

export function summarize(repositories, release, date) {
  const originals = repositories.filter(repo =>
    repo.private === false && repo.fork === false && repo.owner?.login === owner
  );
  const projects = originals.filter(repo => !['arifhasnat3po', 'snake'].includes(repo.name));
  return {
    date,
    repositories: originals.length,
    languages: new Set(originals.map(repo => repo.language).filter(Boolean)).size,
    latestRelease: release?.draft === false && release?.prerelease === false
      ? release.tag_name : 'See releases',
    recent: projects
      .filter(repo => !repo.archived && repo.pushed_at)
      .sort((a, b) => b.pushed_at.localeCompare(a.pushed_at))
      .slice(0, 4)
      .map(repo => ({ name: repo.name, pushed: repo.pushed_at.slice(0, 10) })),
  };
}

export function replaceSnapshot(readme, content) {
  const start = '<!-- PROFILE-SNAPSHOT:START -->';
  const end = '<!-- PROFILE-SNAPSHOT:END -->';
  if (readme.split(start).length !== 2 || readme.split(end).length !== 2 || readme.indexOf(end) < readme.indexOf(start)) {
    throw new Error('Expected one complete public-snapshot block; README left unchanged.');
  }
  return readme.slice(0, readme.indexOf(start) + start.length) + '\n' + content + '\n' + readme.slice(readme.indexOf(end));
}

export const escapeXml = value => String(value).replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;',
})[character]);

export function snapshotSvg(snapshot, dark = false) {
  const c = dark
    ? { bg: '#0d1724', panel: '#142234', ink: '#edf5ff', muted: '#adbed2', accent: '#92fe9d', border: '#2b4059' }
    : { bg: '#f5f9fc', panel: '#ffffff', ink: '#162536', muted: '#496176', accent: '#126943', border: '#ccdbe6' };
  const values = [snapshot.repositories, snapshot.languages, snapshot.latestRelease];
  const labels = ['Original repositories', 'Repository languages', 'Latest PixelPair'];
  const notes = ['Public, forks excluded', 'Primary language per repo', 'Published release'];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="210" viewBox="0 0 900 210" role="img" aria-labelledby="title desc">
<title id="title">Arif's public GitHub snapshot</title><desc id="desc">${escapeXml(values.map((value, i) => `${labels[i]}: ${value}`).join('. '))}. Refreshed ${escapeXml(snapshot.date)}.</desc>
<rect width="900" height="210" rx="16" fill="${c.bg}"/>
${values.map((value, i) => `<g transform="translate(${20 + i * 293},20)"><rect width="274" height="143" rx="10" fill="${c.panel}" stroke="${c.border}"/><text x="20" y="35" fill="${c.muted}" font-size="16">${labels[i]}</text><text x="20" y="84" fill="${c.ink}" font-size="38" font-weight="600">${escapeXml(value)}</text><text x="20" y="119" fill="${c.muted}" font-size="14">${notes[i]}</text></g>`).join('')}
<circle cx="31" cy="185" r="4" fill="${c.accent}"/><text x="43" y="190" fill="${c.muted}" font-size="13">Public GitHub API · ${escapeXml(snapshot.date)} · Snapshot, not a skill score</text>
<style>text{font-family:system-ui,-apple-system,Segoe UI,sans-serif}</style></svg>\n`;
}
