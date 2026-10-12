import { escapeXml as e } from './profile-data.mjs';

const colors = ['#f1df64','#9c80c9','#638dc9','#58bdbb','#b6cc62','#dc6748','#a7a4b9'];
const theme = () => ({bg:'#0d1117',ink:'#e6edf3',muted:'#a7b6c8',border:'#30363d',accent:'#56c781',track:'#212b36'});
const number = value => new Intl.NumberFormat('en-US').format(value);
function frame(width,height,title,description,dark,body) {
  const c=theme(dark);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title desc">
<title id="title">${e(title)}</title><desc id="desc">${e(description)}</desc>
<rect x=".5" y=".5" width="${width-1}" height="${height-1}" rx="5" fill="${c.bg}" stroke="${c.border}"/>
${body(c)}
<style>text{font-family:Arial,Helvetica,sans-serif}</style></svg>\n`;
}

export const visibleStats = stats => [
  ['Original public repos',stats.repositories],
  ['Stars (original repos)',stats.stars],
  ['Followers',stats.followers],
  ['Public pull requests',stats.pullRequests],
  ['Public issues opened',stats.issues],
].filter(([,value])=>value>0);

export function statsSvg(stats,dark=false) {
  const rows=visibleStats(stats);
  const description=rows.map(([label,value])=>`${label}: ${value}`).join('. ')+`. On GitHub since ${stats.since}. Updated ${stats.date}.`;
  return frame(420,280,"Arif's GitHub stats",description,dark,c=>`
<text x="26" y="36" fill="${c.accent}" font-size="20" font-weight="600">Arif Hasnat's GitHub stats</text>
<text x="26" y="61" fill="${c.muted}" font-size="14">@arifhasnat3po · since ${e(stats.since)}</text>
${rows.map(([label,value],i)=>`<text x="26" y="${99+i*29}" fill="${c.muted}" font-size="16">${label}</text><text x="394" y="${99+i*29}" text-anchor="end" fill="${c.ink}" font-size="20" font-weight="600">${number(value)}</text>`).join('')}
<path d="M26 238h368" stroke="${c.border}"/>
<text x="26" y="259" fill="${c.muted}" font-size="12">Public GitHub data · ${e(stats.date)}</text>`);
}

export function languagesSvg(languages,dark=false) {
  const description=languages.rows.length?languages.rows.map(r=>`${r.name}: ${r.percent.toFixed(1)} percent`).join('. '):'No language data available.';
  return frame(420,280,'Languages in my repositories',description+' Shares of code bytes in original public repositories, not skill levels.',dark,c=>{
    let offset=26;
    const segments=languages.rows.map((row,i)=>{
      const width=row.percent/100*368;
      const segment=`<rect x="${offset.toFixed(2)}" y="82" width="${width.toFixed(2)}" height="8" fill="${colors[i]}"/>`;
      offset+=width;return segment;
    }).join('');
    return `<text x="26" y="36" fill="${c.accent}" font-size="20" font-weight="600">Most used languages</text>
<text x="26" y="61" fill="${c.muted}" font-size="14">Original public repositories</text>
<clipPath id="bar"><rect x="26" y="82" width="368" height="8" rx="4"/></clipPath>
<g clip-path="url(#bar)">${segments}</g>
${languages.rows.map((row,i)=>`<circle cx="32" cy="${114+i*21}" r="4" fill="${colors[i]}"/><text x="47" y="${119+i*21}" fill="${c.ink}" font-size="15">${e(row.name)}</text><text x="394" y="${119+i*21}" text-anchor="end" fill="${c.muted}" font-size="15">${row.percent.toFixed(1)}%</text>`).join('')}
${languages.rows.length?'':`<text x="26" y="176" fill="${c.muted}" font-size="16">No language data available yet.</text>`}
<text x="26" y="270" fill="${c.muted}" font-size="11">By code bytes · not time spent or proficiency</text>`;
  });
}

export function activitySvg(months,date,dark=false) {
  const total=months.reduce((sum,month)=>sum+month.count,0);
  const highest=Math.max(1,...months.map(month=>month.count));
  const scale=highest<=4?4:Math.ceil(highest/4)*4;
  const start=months[0],last=months.at(-1);
  const description=months.map(m=>`${m.label} 20${m.year}: ${m.count} commits`).join('. ');
  return frame(860,340,'Public commits by month',description+'. GitHub commit-search results from public default branches. Current month is partial.',dark,c=>{
    const plot={x:60,y:129,width:772,height:132};
    const step=plot.width/12;
    const points=months.map((month,i)=>[plot.x+step*(i+.5),plot.y+plot.height-month.count/scale*plot.height]);
    const line=points.map(([x,y],i)=>`${i?'L':'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
    return `<text x="28" y="42" fill="${c.muted}" font-size="22" font-weight="600">Public commit activity</text>
<text x="28" y="71" fill="${c.muted}" font-size="16">${start.label} 20${start.year} – ${last.label} 20${last.year} · monthly public commits</text>
<text x="832" y="44" text-anchor="end" fill="${c.accent}" font-size="26" font-weight="600">${number(total)}</text>
<text x="832" y="71" text-anchor="end" fill="${c.muted}" font-size="14">in this window</text>
${[0,1,2,3,4].map(i=>{const y=plot.y+plot.height-i*plot.height/4;return `<path d="M${plot.x} ${y}h${plot.width}" stroke="${c.border}" stroke-dasharray="3 5"/><text x="45" y="${y+5}" text-anchor="end" fill="${c.muted}" font-size="13">${number(scale*i/4)}</text>`;}).join('')}
<path d="${line} L${points.at(-1)[0]} ${plot.y+plot.height} L${points[0][0]} ${plot.y+plot.height}Z" fill="#49c96d" opacity=".65"/>
<path d="${line}" stroke="#49c96d" stroke-width="2" fill="none" stroke-linejoin="round"/>
${months.map((month,i)=>`<text x="${points[i][0]}" y="${Math.max(plot.y-10,points[i][1]-13)}" text-anchor="middle" fill="${c.ink}" font-size="14">${month.count||''}</text><text x="${points[i][0]}" y="284" text-anchor="middle" fill="${c.muted}" font-size="14">${month.label}</text>`).join('')}
<text x="28" y="318" fill="${c.muted}" font-size="13">Public default branches · ${last.label} is in progress · Updated ${e(date)}</text>`;
  });
}
