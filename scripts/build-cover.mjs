import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');

export async function buildCover(months) {
  const maximum=Math.max(1,...months.map(month=>month.count));
  const points=months.map((month,i)=>[478+i*30,145-month.count/maximum*70]);
  const line=points.map(([x,y],i)=>`${i?'L':'M'}${x} ${y.toFixed(1)}`).join(' ');
  const total=months.reduce((sum,month)=>sum+month.count,0);
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="860" height="210" viewBox="0 0 860 210" role="img" aria-labelledby="title desc">
<title id="title">Arif Hasnat — GitHub profile</title>
<desc id="desc">Machine learning, cybersecurity, and networking. Chittagong, Bangladesh. ${total} public commits in the displayed 12-month window. The graph draws once, then stays still.</desc>
<rect x=".5" y=".5" width="859" height="209" rx="5" fill="#141321" stroke="#302d40"/>
<text x="28" y="47" fill="#e65e99" font-size="26" font-weight="600">Arif Hasnat</text>
<text x="28" y="78" fill="#a5d8dc" font-size="15">@arifhasnat3po</text>
<text x="28" y="118" fill="#dedde5" font-size="15">Machine learning · Cybersecurity</text>
<text x="28" y="143" fill="#dedde5" font-size="15">Networking · Python</text>
<text x="28" y="183" fill="#a4a2b7" font-size="13">Chittagong, Bangladesh</text>
<path d="M431 27v156" stroke="#302d40"/>
<text x="478" y="41" fill="#a5d8dc" font-size="14">Public commits</text>
<text x="809" y="41" text-anchor="end" fill="#dedde5" font-size="14">${total} / 12 months</text>
<path d="M478 145h330M478 110h330M478 75h330" stroke="#292637" stroke-dasharray="2 4"/>
<path d="${line} L808 145L478 145Z" fill="#49c96d" opacity=".12"/>
<path class="draw" d="${line}" pathLength="1" fill="none" stroke="#49c96d" stroke-width="2" stroke-linejoin="round"/>
<text x="478" y="183" fill="#a4a2b7" font-size="12">${months[0].key}</text>
<text x="808" y="183" text-anchor="end" fill="#a4a2b7" font-size="12">${months.at(-1).key} · in progress</text>
<style>text{font-family:Arial,Helvetica,sans-serif}.draw{animation:draw 2.5s ease-out both}@keyframes draw{from{stroke-dasharray:1;stroke-dashoffset:1}to{stroke-dasharray:1;stroke-dashoffset:0}}@media(prefers-reduced-motion:reduce){.draw{animation:none}}</style></svg>\n`;
  await fs.writeFile(path.join(root,'assets/profile-cover.svg'),svg);
  await fs.writeFile(path.join(root,'assets/profile-cover-static.svg'),svg.replace('animation:draw 2.5s ease-out both','animation:none'));
}

if (process.argv[1] && path.resolve(process.argv[1])===fileURLToPath(import.meta.url)) {
  const readme=await fs.readFile(path.join(root,'README.md'),'utf8');
  const months=[...readme.matchAll(/^\| (\d{4}-\d{2}) \| (\d+) \|/gm)].map(match=>({key:match[1],count:Number(match[2])}));
  if(months.length!==12) throw new Error('Expected 12 verified monthly counts in the README.');
  await buildCover(months);
  console.log('Built compact profile header from verified public activity.');
}
