import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const stations=[['Explore','Find the question','#73d7ef'],['Build','Make it work','#bca2ff'],['Test','Try the edge cases','#63dfad'],['Ship','Leave good docs','#ffc47c']];
const stars=Array.from({length:48},(_,i)=>`<circle class="star" cx="${18+(i*137)%822}" cy="${18+(i*53)%180}" r="${i%4===0?1.4:.7}" fill="#b4c8e8" opacity="${i%3===0?.65:.25}" style="animation-delay:-${i%5}s"/>`).join('');
const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="860" height="330" viewBox="0 0 860 330" role="img" aria-labelledby="title desc">
<title id="title">From packets to products — a small world of ideas</title>
<desc id="desc">A packet explores a globe, visits a glowing build station, passes a shield checkpoint, and launches as a rocket. Explore: find the question. Build: make it work. Test: try the edge cases. Ship: leave good docs. Animation stops for reduced motion.</desc>
<defs><linearGradient id="sky" x2="0" y2="1"><stop stop-color="#101829"/><stop offset="1" stop-color="#0d1117"/></linearGradient><clipPath id="edge"><rect x="1" y="1" width="858" height="328" rx="8"/></clipPath></defs>
<rect x=".5" y=".5" width="859" height="329" rx="8" fill="url(#sky)" stroke="#303b4c"/>
<g clip-path="url(#edge)">${stars}
<path d="M20 220 100 187 180 217 255 200 345 229 430 205 505 223 610 188 701 217 788 195 850 221V330H20Z" fill="#151f2f" opacity=".6"/>
<path d="M106 184C180 222 240 146 322 184S460 222 538 184 680 146 754 184" fill="none" stroke="#36455d" stroke-width="2" stroke-dasharray="3 7"/>
${stations.map(([title,note,color],i)=>`<g transform="translate(${106+i*216} 184)"><ellipse cy="3" rx="60" ry="17" fill="#101724" stroke="${color}" stroke-opacity=".4"/><path d="M-54 8-25 37 6 44 48 11" fill="#1a2940" stroke="#2c3e57"/><path d="M-25 37-9 16 6 44 23 12" fill="none" stroke="#34465d"/><ellipse cy="-2" rx="53" ry="11" fill="#1c3040"/><text y="82" text-anchor="middle" fill="${color}" font-size="22" font-weight="600">${title}</text><text y="110" text-anchor="middle" fill="#bbc7d8" font-size="14">${note}</text></g>`).join('')}
<!-- Explore: a little rotating world and satellite. -->
<g transform="translate(106 122)"><g class="world"><circle r="34" fill="#153d54" stroke="#73d7ef" stroke-width="2"/><ellipse rx="15" ry="34" fill="none" stroke="#73d7ef" opacity=".4"/><path d="M-32-10H32M-32 11H32M-5-32V32" fill="none" stroke="#73d7ef" opacity=".3"/><path d="m-19-22 15-5 11 10-9 12-12-2-8 10-6-12Zm28 29 17 2-6 17-12 6-8-13Z" fill="#69ceaf"/><g class="satellite"><path d="M-49 0h10m78 0h10" stroke="#73d7ef"/><rect x="43" y="-4" width="8" height="8" rx="1" fill="#e2faff"/></g></g></g>
<!-- Build: a tiny workshop with an active terminal. -->
<g transform="translate(322 126)"><rect x="-37" y="-32" width="74" height="52" rx="5" fill="#1d213c" stroke="#bca2ff" stroke-width="2"/><path d="M-37-20H37M-9 22v13m-15 0h48" stroke="#bca2ff" stroke-width="2"/><circle cx="-27" cy="-26" r="2" fill="#bca2ff"/><circle cx="-20" cy="-26" r="2" fill="#bca2ff"/><path d="m-13-10-9 8 9 8m26-16 9 8-9 8M5-12-4 10" stroke="#d8c7ff" stroke-width="2.5" fill="none"/><rect class="cursor" x="24" y="9" width="7" height="2" fill="#bca2ff"/><g class="block"><path d="M-46 36v-15h14v15m65 0V15h14v21" fill="#473767" stroke="#bca2ff"/></g></g>
<!-- Test: shield checkpoint, with a passing checkmark. -->
<g transform="translate(538 126)"><path d="M0-39 32-26V-5Q31 19 0 38-31 19-32-5v-21Z" fill="#143a35" stroke="#63dfad" stroke-width="2"/><path class="check" d="m-14-2 10 11 20-24" pathLength="1" stroke="#b3ffda" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"/><circle class="radar" r="43" fill="none" stroke="#63dfad" stroke-opacity=".4" stroke-dasharray="20 250"/></g>
<!-- Ship: rocket lifts off and comes back for the next idea. -->
<g transform="translate(754 130)"><g class="rocket"><path class="flame" d="m-9 24 9 25 9-25" fill="#ffb45f"/><path d="M-12 11-24 29-10 25M12 11 24 29 10 25" fill="#d3946e" stroke="#ffc47c"/><path d="M0-43C-17-28-19-1-11 25H11C19-1 17-28 0-43Z" fill="#dce6ed" stroke="#ffc47c" stroke-width="1.5"/><path d="M0-43q-9 9-12 20h24Q9-34 0-43" fill="#de8f73"/><circle cy="-9" r="8" fill="#153d54" stroke="#7cdbea" stroke-width="2"/></g></g>
<g class="packet"><rect x="-7" y="-5" width="14" height="10" rx="2" fill="#ddfff0" stroke="#63dfad"/><path d="m-5-3 5 4 5-4" fill="none" stroke="#1c7355"/></g>
<text x="28" y="30" fill="#91a6c3" font-size="12">One idea. Four stops. Ready for the world.</text>
</g>
<style>text{font-family:Arial,Helvetica,sans-serif}.star{animation:twinkle 4s ease-in-out infinite alternate}.world{animation:bob 5s ease-in-out infinite}.satellite,.radar{animation:spin 10s linear infinite}.cursor{animation:blink 1.5s steps(2,end) infinite}.block{animation:bob 3s ease-in-out infinite}.check{stroke-dasharray:1;animation:check 8s ease-in-out infinite}.rocket{animation:launch 10s ease-in-out infinite}.flame{animation:flame .6s ease-in-out infinite alternate;transform-origin:0 24px}.packet{animation:deliver 10s linear infinite}
@keyframes twinkle{to{opacity:.8}}@keyframes bob{50%{transform:translateY(-6px)}}@keyframes spin{to{transform:rotate(360deg)}}@keyframes blink{50%{opacity:0}}@keyframes check{0%,35%{stroke-dashoffset:1}50%,100%{stroke-dashoffset:0}}
@keyframes launch{0%,65%,100%{transform:translateY(0);opacity:1}78%{transform:translateY(-105px);opacity:0}79%{transform:translateY(20px);opacity:0}90%{transform:translateY(0);opacity:1}}
@keyframes flame{to{transform:scaleY(.65)}}
@keyframes deliver{0%,5%{transform:translate(106px,184px);opacity:0}8%{opacity:1}20%{transform:translate(214px,184px)}32%{transform:translate(322px,184px)}44%{transform:translate(430px,198px)}56%{transform:translate(538px,184px)}65%{transform:translate(646px,170px)}73%{transform:translate(754px,184px);opacity:1}78%,100%{transform:translate(754px,184px);opacity:0}}
@media(prefers-reduced-motion:reduce){.star,.world,.satellite,.radar,.cursor,.block,.check,.rocket,.flame,.packet{animation:none}.packet{display:none}}
</style></svg>\n`;
await fs.writeFile(path.join(root,'assets/workbench-world.svg'),svg);
await fs.writeFile(path.join(root,'assets/workbench-world-static.svg'),svg.replaceAll(/animation:[^;}]+/g,'animation:none').replace('<style>','<style>.packet{display:none}'));
console.log('Built animated mini-world and still fallback.');
