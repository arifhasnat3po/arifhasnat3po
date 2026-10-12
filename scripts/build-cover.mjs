import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const stars=[[51,95,2],[316,74,2],[415,303,2],[1108,153,2],[786,43,2],[586,66,1.5],[292,318,1.5],[1138,323,2],[69,301,1.5],[993,44,1.5],[369,190,1.5],[716,347,1.5]];
const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="400" viewBox="0 0 1200 400" role="img" aria-labelledby="title desc">
<title id="title">Arif's coding orbit</title>
<desc id="desc">A cheerful robot astronaut floats beside a laptop, surrounded by ringed planets, tiny stars, a rocket, and traveling data packets. Arif Hasnat's curiosity lab. Motion stops for reduced-motion preferences.</desc>
<defs>
 <linearGradient id="space" x2="1" y2="1"><stop stop-color="#101b32"/><stop offset="1" stop-color="#091322"/></linearGradient>
 <linearGradient id="planet" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#c5a5ff"/><stop offset="1" stop-color="#726cc2"/></linearGradient>
 <linearGradient id="metal" x2="0.8" y2="1"><stop stop-color="#ecf9ec"/><stop offset="1" stop-color="#a7d8ce"/></linearGradient>
 <clipPath id="planet-clip"><circle cx="177" cy="203" r="68"/></clipPath>
 <pattern id="dust" width="38" height="38" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r=".65" fill="#43607a" opacity=".3"/></pattern>
</defs>
<rect width="1200" height="400" rx="22" fill="url(#space)"/>
<rect width="1200" height="400" rx="22" fill="url(#dust)"/>
<path d="M38 55h1124" stroke="#27354a"/>
<circle cx="42" cy="32" r="4" fill="#b4f09b"/>
<text x="57" y="38" fill="#dae6ef" font-size="17" font-weight="500">Arif Hasnat <tspan fill="#839bb4">/ curiosity lab</tspan></text>
<text x="1158" y="38" text-anchor="end" fill="#9db1c7" font-size="13" letter-spacing="1">ALWAYS EXPLORING</text>
${stars.map(([x,y,r],i)=>`<circle class="star" style="animation-delay:-${i*.37}s" cx="${x}" cy="${y}" r="${r}" fill="${i%3?'#9ec0d8':'#f2d88c'}"/>`).join('')}
<g fill="none" stroke="#6c849b" stroke-width="1.5"><path d="M345 99v10m-5-5h10M1084 254v12m-6-6h12M816 312v10m-5-5h10"/></g>
<path d="M278 245C417 331 923 341 1051 198S917 53 773 86" stroke="#2a4458" stroke-width="1.5" stroke-dasharray="5 9" fill="none"/>
<!-- A ringed planet and one tiny orbiting moon. -->
<g class="planet-float"><g>
 <ellipse cx="177" cy="203" rx="113" ry="33" transform="rotate(-25 177 203)" fill="none" stroke="#8f9bc6" stroke-width="9" opacity=".3"/>
 <circle cx="177" cy="203" r="68" fill="url(#planet)"/>
 <g clip-path="url(#planet-clip)" fill="none" stroke="#d1bdff" opacity=".3"><path d="M104 164q78 41 151 0M94 185q89 52 163 0M108 229q69 20 134-7" stroke-width="10"/></g>
 <path d="M75 234c22 31 190-27 206-70" fill="none" stroke="#d4cbf5" stroke-width="8" stroke-linecap="round"/>
 <g class="moon-orbit"><circle cx="177" cy="95" r="7" fill="#f2d88c"/><circle cx="175" cy="93" r="2" fill="#fff1be"/></g>
</g></g>
<text x="177" y="320" text-anchor="middle" fill="#9cabc5" font-size="13">a little outside the box</text>
<!-- Robot astronaut: big friendly visor, small waving hand, floating boots. -->
<g class="robot-float"><g transform="translate(392 108)">
 <path d="M83 143q-76 26-66 79t130 20" fill="none" stroke="#516c83" stroke-width="5" stroke-linecap="round"/>
 <g transform="rotate(-12 93 127)">
  <rect x="42" y="87" width="84" height="100" rx="29" fill="#8cbcaf"/>
  <rect x="56" y="88" width="85" height="102" rx="28" fill="url(#metal)"/>
  <rect x="76" y="122" width="43" height="31" rx="10" fill="#253d4a"/>
  <path d="m86 138 8 6 15-15" fill="none" stroke="#b9f498" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="83" cy="169" r="4" fill="#ffbc85"/><path d="M97 169h18" stroke="#72a397" stroke-width="4" stroke-linecap="round"/>
  <path d="M68 183l-7 24" stroke="#d5eadf" stroke-width="21" stroke-linecap="round"/>
  <path d="M126 180l10 23" stroke="#d5eadf" stroke-width="21" stroke-linecap="round"/>
  <path d="M54 214h15M131 209h17" stroke="#75baa9" stroke-width="19" stroke-linecap="round"/>
  <path d="M58 113 30 137" stroke="#c3e2d8" stroke-width="18" stroke-linecap="round"/>
  <circle cx="27" cy="140" r="11" fill="#8cc8b5"/>
  <g class="wave"><path d="M137 112q45-3 53-43" fill="none" stroke="#c3e2d8" stroke-width="18" stroke-linecap="round"/><rect x="179" y="46" width="24" height="30" rx="11" fill="#95d1be"/><path d="M187 53v-9m9 11 2-8" stroke="#b7e5cf" stroke-width="6" stroke-linecap="round"/></g>
 </g>
 <path d="M100 10V-7" stroke="#91c5b3" stroke-width="5"/><circle class="antenna" cx="100" cy="-12" r="7" fill="#ffd38c"/>
 <rect x="33" y="17" width="129" height="89" rx="36" fill="url(#metal)"/>
 <rect x="25" y="45" width="15" height="32" rx="7" fill="#78b8a7"/>
 <rect x="155" y="45" width="15" height="32" rx="7" fill="#78b8a7"/>
 <rect x="46" y="32" width="103" height="58" rx="25" fill="#142a36"/>
 <path d="M57 44q16-9 31-6" fill="none" stroke="#48616d" stroke-width="4" stroke-linecap="round"/>
 <g class="blink"><rect x="67" y="51" width="10" height="17" rx="5" fill="#baf69d"/><rect x="117" y="51" width="10" height="17" rx="5" fill="#baf69d"/></g>
 <path d="M89 72q9 8 17-1" fill="none" stroke="#baf69d" stroke-width="3" stroke-linecap="round"/>
 <circle cx="59" cy="73" r="4" fill="#f3b2a4" opacity=".8"/><circle cx="137" cy="73" r="4" fill="#f3b2a4" opacity=".8"/>
</g></g>
<!-- Floating laptop; its cursor and progress dots stay quietly alive. -->
<g class="laptop-float"><g transform="translate(644 120) rotate(5 140 110)">
 <rect x="5" y="0" width="274" height="175" rx="15" fill="#334c61"/>
 <rect x="14" y="9" width="256" height="155" rx="8" fill="#111f30"/>
 <path d="M14 37h256" stroke="#30475b"/>
 <circle cx="29" cy="24" r="4" fill="#f39694"/><circle cx="43" cy="24" r="4" fill="#ecc784"/><circle cx="57" cy="24" r="4" fill="#90d7b1"/>
 <text x="249" y="28" text-anchor="end" fill="#8fa8bf" font-size="10">tiny experiments</text>
 <g fill="none" stroke-width="5" stroke-linecap="round"><path d="m41 62-9 9 9 9m27-18 9 9-9 9m-10-23-7 28" stroke="#b89add"/>
 <path d="M100 64h93m-93 14h54M34 106h18m13 0h76m-76 17h123M34 140h40m13 0h57" stroke="#6cacb0"/><path d="M165 106h57M204 123h28" stroke="#e1bc7d"/></g>
 <rect class="cursor" x="159" y="134" width="7" height="12" rx="1" fill="#c1f3a6"/>
 <path d="M5 175h274l28 18q0 10-18 10H-10q-18 0-18-10Z" fill="#8aa9b9"/>
 <path d="M102 175h78l8 10H94Z" fill="#527382"/>
</g></g>
<!-- Mini planet and a paper-rocket messenger. -->
<g class="small-planet"><circle cx="1044" cy="117" r="31" fill="#e8c78c"/><path d="M1021 97q26 11 43 8m-48 21q25 12 49 5" fill="none" stroke="#c29c69" stroke-width="5" opacity=".55"/><ellipse cx="1044" cy="117" rx="49" ry="12" transform="rotate(-26 1044 117)" fill="none" stroke="#a5c9c8" stroke-width="4"/></g>
<g class="rocket-float"><g transform="translate(1005 226) rotate(25 24 40)">
 <path class="flame" d="M16 61q8 38 16 0" fill="#f4b775"/>
 <path d="M10 43 0 65l16-6m22-16 10 22-16-6" fill="#f0a39d"/>
 <path d="M12 58V29Q14 10 24 0q10 10 12 29v29Z" fill="#dceee9"/>
 <path d="M15 20q9-4 18 0Q29 6 24 0q-5 6-9 20" fill="#f0a39d"/>
 <circle cx="24" cy="34" r="8" fill="#5b8696"/><circle cx="22" cy="32" r="3" fill="#c3eeeb"/>
</g></g>
<path d="M392 357h490" stroke="#2a4356" stroke-width="2" stroke-linecap="round"/>
<g class="packet"><rect x="392" y="353" width="12" height="8" rx="4" fill="#b9ef9b"/></g>
<text x="38" y="375" fill="#a8bad0" font-size="14">build something. break something. learn something.</text>
<text x="1162" y="375" text-anchor="end" fill="#91c4b7" font-size="13">next stop: a good idea</text>
<style>
text{font-family:system-ui,-apple-system,Segoe UI,sans-serif}
.robot-float{animation:float 5s ease-in-out infinite}.laptop-float{animation:float 6s ease-in-out -2s infinite}.planet-float{animation:float 8s ease-in-out -3s infinite}.small-planet{animation:float 7s ease-in-out -1s infinite}.rocket-float{animation:float 4s ease-in-out -1s infinite}
.moon-orbit{transform-origin:177px 203px;animation:orbit 26s linear infinite}.wave{transform-origin:137px 112px;animation:wave 6s ease-in-out infinite}.blink{transform-box:fill-box;transform-origin:center;animation:blink 5.5s infinite}.cursor{animation:cursor 1.8s steps(1) infinite}.star{animation:twinkle 4s ease-in-out infinite}.packet{animation:packet 7s linear infinite}.flame{transform-box:fill-box;transform-origin:top;animation:flame .8s ease-in-out infinite}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-9px)}}
@keyframes orbit{to{transform:rotate(360deg)}}
@keyframes wave{0%,55%,100%{transform:rotate(0)}65%,85%{transform:rotate(-12deg)}75%,95%{transform:rotate(5deg)}}
@keyframes blink{0%,43%,47%,100%{transform:scaleY(1)}45%{transform:scaleY(.12)}}
@keyframes cursor{0%,65%{opacity:1}66%,100%{opacity:.2}}
@keyframes twinkle{0%,100%{opacity:.4}50%{opacity:1}}
@keyframes packet{0%{transform:translateX(0);opacity:0}8%{opacity:1}90%{opacity:1}100%{transform:translateX(478px);opacity:0}}
@keyframes flame{0%,100%{transform:scaleY(.8)}50%{transform:scaleY(1)}}
@media(prefers-reduced-motion:reduce){*{animation:none!important}}
</style></svg>\n`;
await fs.writeFile(path.join(root,'assets/profile-cover.svg'),svg);
await fs.writeFile(path.join(root,'assets/profile-cover-static.svg'),svg.replace('</style>','*{animation:none!important}</style>'));
console.log('Built animated coding-orbit cover and reduced-motion fallback.');
