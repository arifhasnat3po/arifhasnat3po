import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');

export async function buildCover() {
  let seed=73;
  const random=()=>{seed=(seed*16807)%2147483647;return (seed-1)/2147483646;};
  const stars=Array.from({length:170},(_,i)=>{
    const x=(random()*860).toFixed(1),y=(random()*300).toFixed(1),r=(.35+random()*.85).toFixed(2);
    return `<circle cx="${x}" cy="${y}" r="${r}" fill="${i%4?'#c8d4ef':'#fff0d9'}" opacity="${(.2+random()*.6).toFixed(2)}"${i%11===0?' class="star"':''}/>`;
  }).join('');
  const galaxy=Array.from({length:390},(_,i)=>{
    const arm=i%3, t=random()*Math.PI*3, radius=16+t*15, scatter=(random()-.5)*22;
    const x=570+Math.cos(t+arm*2.094)*radius+scatter;
    const y=143+Math.sin(t+arm*2.094)*radius*.38+scatter*.4;
    return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(.3+random()*.8).toFixed(1)}" fill="${i%3?'#b5a7de':'#e7c2a6'}" opacity="${(.1+random()*.4).toFixed(2)}"/>`;
  }).join('');
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="860" height="300" viewBox="0 0 860 300" role="img" aria-labelledby="title desc">
<title id="title">Arif Hasnat — a little corner of the universe</title>
<desc id="desc">An animated black hole with a warm accretion disk, a spiral galaxy, and quietly twinkling stars. Arif Hasnat, machine learning, security, and networks. Reduced motion shows a still image.</desc>
<defs>
<radialGradient id="space"><stop stop-color="#222038"/><stop offset="1" stop-color="#080d17"/></radialGradient>
<radialGradient id="halo"><stop offset=".38" stop-color="#000" stop-opacity="0"/><stop offset=".52" stop-color="#e8ad79" stop-opacity=".22"/><stop offset="1" stop-color="#e8ad79" stop-opacity="0"/></radialGradient>
<linearGradient id="disk"><stop stop-color="#927da8" stop-opacity=".2"/><stop offset=".4" stop-color="#efbe8e"/><stop offset=".65" stop-color="#ffe9c2"/><stop offset="1" stop-color="#927da8" stop-opacity=".2"/></linearGradient>
<clipPath id="bounds"><rect width="860" height="300" rx="6"/></clipPath>
</defs>
<g clip-path="url(#bounds)">
<rect width="860" height="300" fill="url(#space)"/>
${stars}
<g opacity=".7">${galaxy}</g>
<circle cx="570" cy="143" r="115" fill="url(#halo)"/>
<g transform="translate(570 143) rotate(-14)">
<ellipse rx="165" ry="38" fill="none" stroke="url(#disk)" stroke-width="16" opacity=".14"/>
<ellipse rx="152" ry="30" fill="none" stroke="url(#disk)" stroke-width="3"/>
<g transform="scale(1 .22)"><circle class="orbit" r="145" fill="none" stroke="#f1c99e" stroke-width="6" stroke-dasharray="100 95 25 130" opacity=".65"/></g>
<circle r="47" fill="#060910" stroke="#ecc6a2" stroke-width="1.5"/>
<path d="M-54 0C-54-72 54-72 54 0" fill="none" stroke="#ecc6a2" stroke-width="2" opacity=".55"/>
<path d="M-152 0C-148 40 148 40 152 0" fill="none" stroke="url(#disk)" stroke-width="7"/>
<path d="M-149 2C-130 31 130 31 149 2" fill="none" stroke="#fff0d8" stroke-width="1" opacity=".75"/>
</g>
<text x="30" y="243" fill="#e7eaf2" font-size="22" font-weight="600">Arif Hasnat</text>
<text x="30" y="272" fill="#acb7cb" font-size="14">Machine learning · Security · Networks</text>
<text x="830" y="272" fill="#acb7cb" text-anchor="end" font-size="12">@arifhasnat3po</text>
</g>
<style>text{font-family:Arial,Helvetica,sans-serif}.orbit{animation:orbit 26s linear infinite;transform-origin:0 0}.star{animation:twinkle 7s ease-in-out infinite alternate}.star:nth-child(odd){animation-delay:-4s}@keyframes orbit{to{transform:rotate(360deg)}}@keyframes twinkle{to{opacity:.18}}@media(prefers-reduced-motion:reduce){.orbit,.star{animation:none}}</style></svg>\n`;
  await fs.writeFile(path.join(root,'assets/profile-cover.svg'),svg);
  await fs.writeFile(path.join(root,'assets/profile-cover-static.svg'),svg.replaceAll(/animation:(?:orbit|twinkle)[^;}]+/g,'animation:none'));
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)) {
  await buildCover();
  console.log('Built animated space cover and reduced-motion fallback.');
}
