import test from 'node:test';
import assert from 'node:assert/strict';
import * as data from './profile-data.mjs';
import { activitySvg, languagesSvg } from './dashboard-art.mjs';

const repo = (name, extras = {}) => ({ name, private: false, fork: false, owner: { login: 'arifhasnat3po' }, ...extras });

test('language percentages use bytes only from original public repositories', () => {
  const result = data.summarizeLanguages(
    [repo('one'), repo('two'), repo('secret', {private:true}), repo('fork', {fork:true})],
    { one: {Python:300, JavaScript:100}, two: {JavaScript:600}, secret:{Rust:100000}, fork:{C:9000} }
  );
  assert.equal(result.totalBytes,1000);
  assert.deepEqual(result.rows.map(({name,bytes,percent})=>({name,bytes,percent})),[
    {name:'JavaScript',bytes:700,percent:70},{name:'Python',bytes:300,percent:30}
  ]);
});

test('small languages group into Other without dropping bytes; empty data stays empty', () => {
  const values={A:10,B:20,C:30,D:40,E:50,F:60,G:70,H:80};
  const result=data.summarizeLanguages([repo('one')],{one:values});
  assert.equal(result.rows.length,7);
  assert.equal(result.rows.at(-1).name,'Other');
  assert.equal(result.rows.at(-1).bytes,30);
  assert.equal(result.totalBytes,360);
  assert.deepEqual(data.summarizeLanguages([],{}),{totalBytes:0,rows:[]});
});

test('monthly windows cross years, handle leap days, and end the current month today in UTC', () => {
  const months=data.monthWindows(new Date('2024-03-01T23:30:00Z'));
  assert.equal(months.length,12);
  assert.deepEqual(months[0],{key:'2023-04',label:'Apr',year:'23',from:'2023-04-01',to:'2023-04-30'});
  assert.equal(months[10].to,'2024-02-29');
  assert.equal(months[11].from,'2024-03-01');
  assert.equal(months[11].to,'2024-03-01');
});

test('incomplete or malformed API counts fail instead of becoming plausible statistics', () => {
  assert.equal(data.searchCount({total_count:0,incomplete_results:false}),0);
  assert.equal(data.searchCount({total_count:324,incomplete_results:false}),324);
  for(const response of [{total_count:32,incomplete_results:true},{total_count:-1,incomplete_results:false},{total_count:'23',incomplete_results:false},{}]){
    assert.throws(()=>data.searchCount(response));
  }
});

test('a year with zero public commits renders without invalid chart coordinates', () => {
  const months=data.monthWindows(new Date('2026-10-12T00:00:00Z')).map(month=>({...month,count:0}));
  const svg=activitySvg(months,'13 Oct 2026');
  assert.doesNotMatch(svg,/NaN|Infinity|undefined/);
  assert.match(svg,/Nov 2025: 0 commits/);
  assert.match(svg,/Oct 2026: 0 commits/);
});

test('empty language results show an explicit empty state instead of invented percentages', () => {
  const svg=languagesSvg(data.summarizeLanguages([],{}));
  assert.match(svg,/No language data available yet/);
  assert.doesNotMatch(svg,/NaN|Infinity|undefined/);
});
