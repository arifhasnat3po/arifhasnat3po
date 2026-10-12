import test from 'node:test';
import assert from 'node:assert/strict';
import { summarize, replaceSnapshot, snapshotSvg } from './profile-data.mjs';

const repo = (name, extras = {}) => ({ name, owner: { login: 'arifhasnat3po' }, private: false, fork: false, language: 'Python', pushed_at: '2026-10-01T00:00:00Z', ...extras });

test('private, forked and other-owner repositories cannot leak into the snapshot', () => {
  const result = summarize([
    repo('public-project'), repo('private-name', { private: true }),
    repo('fork', { fork: true }), repo('another-owner', { owner: { login: 'someone-else' } }),
    repo('missing-visibility', { private: undefined }),
  ], { draft: false, prerelease: false, tag_name: 'v1.0.0' }, '13 Oct 2026');
  assert.equal(result.repositories, 1);
  assert.deepEqual(result.recent, [{ name: 'public-project', pushed: '2026-10-01' }]);
  assert.equal(result.languages, 1);
  assert.ok(!JSON.stringify(result).includes('private-name'));
});

test('recent work excludes profile automation, is sorted by push, and ignores archived work', () => {
  const result = summarize([
    repo('arifhasnat3po'), repo('snake'), repo('archived', { archived: true }),
    repo('older', { language: null }), repo('newer', { language: 'JavaScript', pushed_at: '2026-10-12T00:00:00Z' }),
  ], { draft: true, tag_name: 'secret-release' }, '13 Oct 2026');
  assert.deepEqual(result.recent.map(item => item.name), ['newer', 'older']);
  assert.equal(result.languages, 2);
  assert.equal(result.latestRelease, 'See releases');
});

test('refresh preserves all text outside the generated block, including existing line endings', () => {
  const before = 'Existing introduction\r\n<!-- PROFILE-SNAPSHOT:START -->\nOld data\n<!-- PROFILE-SNAPSHOT:END -->\r\nExisting footer\r\n';
  assert.equal(replaceSnapshot(before, 'New data'), before.replace('Old data', 'New data'));
  assert.throws(() => replaceSnapshot('No markers', 'New data'));
  assert.throws(() => replaceSnapshot(before + '<!-- PROFILE-SNAPSHOT:START -->', 'New data'));
});

test('generated artwork escapes API text and has an accessible description', () => {
  const svg = snapshotSvg({ repositories: 2, languages: 1, latestRelease: '<script>', date: '13 Oct 2026' });
  assert.ok(svg.includes('&lt;script&gt;'));
  assert.ok(!svg.includes('<script>'));
  assert.ok(svg.includes('aria-labelledby="title desc"'));
});
