import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const stations=[['Explore','Find the question'],['Build','Make it work'],['Test','Try the edge cases'],['Ship','Leave good docs']];
const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="860" height="180" viewBox="0 0 860 180" role="img" aria-labelledby="title desc">
<title id="title">From packets to products</title><desc id="desc">Explore: find the question. Build: make it work. Test: try the edge cases. Ship: leave good docs. An animated packet connects the four steps.</desc>
<rect x=".5" y=".5" width="859" height="179" rx="5" fill="#0d1117" stroke="#30363d"/>
<path d="M28 56H820" stroke="#303b49" stroke-width="2"/>
<path class="packet" d="M28 56H820" stroke="#56c781" stroke-width="2" stroke-dasharray="24 756"/>
${stations.map(([title,note],i)=>`<circle cx="${28+i*207}" cy="56" r="5" fill="#0d1117" stroke="#56c781" stroke-width="2"/><text x="${28+i*207}" y="105" fill="#e6edf3" font-size="21" font-weight="600">${title}</text><text x="${28+i*207}" y="135" fill="#a7b6c8" font-size="15">${note}</text>`).join('')}
<style>text{font-family:Arial,Helvetica,sans-serif}.packet{animation:travel 9s linear infinite}@keyframes travel{to{stroke-dashoffset:-780}}@media(prefers-reduced-motion:reduce){.packet{animation:none}}</style></svg>\n`;
await fs.writeFile(path.join(root,'assets/workbench.svg'),svg);
await fs.writeFile(path.join(root,'assets/workbench-static.svg'),svg.replace('animation:travel 9s linear infinite','animation:none'));
console.log('Built minimal packet-to-product timeline.');
