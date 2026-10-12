const owner = 'arifhasnat3po';

export const originalRepositories = repositories => repositories.filter(repo =>
  repo.private === false && repo.fork === false && repo.owner?.login === owner
);

export function summarize(repositories, release, date) {
  const originals = originalRepositories(repositories);
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

export function summarizeLanguages(repositories, languages) {
  const totals = new Map();
  for (const repo of originalRepositories(repositories)) {
    for (const [name, bytes] of Object.entries(languages[repo.name] || {})) {
      if (!Number.isSafeInteger(bytes) || bytes < 0) throw new Error('Invalid language byte count.');
      if (bytes) totals.set(name, (totals.get(name) || 0) + bytes);
    }
  }
  const sorted = [...totals].sort((a,b) => b[1]-a[1] || a[0].localeCompare(b[0]));
  const totalBytes = sorted.reduce((sum, [,bytes]) => sum+bytes, 0);
  const rows = sorted.slice(0,6).map(([name,bytes]) => ({name,bytes}));
  if (sorted.length>6) rows.push({name:'Other',bytes:sorted.slice(6).reduce((sum,[,bytes])=>sum+bytes,0)});
  return {totalBytes,rows:rows.map(row=>({...row,percent:row.bytes/totalBytes*100}))};
}

export function monthWindows(now) {
  const iso = date => date.toISOString().slice(0,10);
  return Array.from({length:12},(_,index)=>{
    const from = new Date(Date.UTC(now.getUTCFullYear(),now.getUTCMonth()-11+index,1));
    const lastDay = new Date(Date.UTC(from.getUTCFullYear(),from.getUTCMonth()+1,0));
    return {
      key:iso(from).slice(0,7),
      label:new Intl.DateTimeFormat('en',{month:'short',timeZone:'UTC'}).format(from),
      year:String(from.getUTCFullYear()).slice(-2),
      from:iso(from),to:iso(lastDay>now?now:lastDay),
    };
  });
}

export function searchCount(response) {
  if (response.incomplete_results !== false || !Number.isSafeInteger(response.total_count) || response.total_count < 0) {
    throw new Error('Incomplete or invalid GitHub search results; existing dashboard retained.');
  }
  return response.total_count;
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
