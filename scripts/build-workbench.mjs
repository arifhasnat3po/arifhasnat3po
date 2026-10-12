import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const stations = [
  { title: 'Explore', note: 'Find the question', icon: '<circle cx="14" cy="14" r="9"/><path d="m21 21 7 7"/>' },
  { title: 'Build', note: 'Make it work', icon: '<path d="m10 7-8 9 8 9m12-18 8 9-8 9M19 3l-6 26"/>' },
  { title: 'Test', note: 'Try the edge cases', icon: '<rect x="3" y="3" width="26" height="26" rx="6"/><path d="m9 16 5 5 10-11"/>' },
  { title: 'Ship', note: 'Leave good docs', icon: '<path d="M16 3v18m-7-11 7-7 7 7M4 22v7h24v-7"/>' },
];
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="310" viewBox="0 0 960 310" role="img" aria-labelledby="title desc">
<title id="title">Arif's workbench: from packets to products</title>
<desc id="desc">Explore, build, test and ship. A small packet travels along the build loop. The animation stops when reduced motion is preferred.</desc>
<defs><pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="#23384d"/></pattern></defs>
<rect width="960" height="310" rx="18" fill="#0d1724"/><rect x="1" y="1" width="958" height="308" rx="18" fill="url(#grid)"/>
<path d="M28 31h23" stroke="#92fe9d" stroke-width="3" stroke-linecap="round"/>
<text x="63" y="37" fill="#92fe9d" font-size="19">Arif's workbench</text>
<text x="28" y="81" fill="#edf5ff" font-size="31" font-weight="600">Small experiments. Real things you can use.</text>
${stations.map((station, i) => `<g transform="translate(${28 + i * 235},107)"><rect width="199" height="126" rx="10" fill="#132235" stroke="#2b4059"/><g transform="translate(18,16)" fill="none" stroke="${i % 2 ? '#92fe9d' : '#70d6ef'}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${station.icon}</g><text x="18" y="77" fill="#edf5ff" font-size="23" font-weight="600">${station.title}</text><text x="18" y="105" fill="#afc1d5" font-size="16">${station.note}</text></g>${i < 3 ? `<path d="M${229+i*235} 169h29m-7-5 6 5-6 5" fill="none" stroke="#65839d" stroke-width="2"/>` : ''}`).join('')}
<path d="M49 268H911" stroke="#36566e" stroke-width="2" stroke-linecap="round"/>
<circle cx="49" cy="268" r="5" fill="#92fe9d" class="packet"/>
<text x="28" y="293" fill="#afc1d5" font-size="13">Curiosity in. Something useful out.</text>
<style>text{font-family:system-ui,-apple-system,Segoe UI,sans-serif}.packet{animation:travel 8s linear infinite}@keyframes travel{0%,5%{transform:translateX(0)}95%,100%{transform:translateX(862px)}}@media(prefers-reduced-motion:reduce){.packet{animation:none}}</style>
</svg>\n`;
await fs.mkdir(path.join(root, 'assets'), { recursive: true });
await fs.writeFile(path.join(root, 'assets/workbench.svg'), svg);
await fs.writeFile(path.join(root, 'assets/workbench-static.svg'), svg.replace('animation:travel 8s linear infinite', 'animation:none'));
console.log('Generated animated and static workbench artwork.');
