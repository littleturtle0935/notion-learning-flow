const WEEKLY=[['2025-05-26',1],['2025-06-02',14],['2025-06-09',4],['2025-06-16',21],['2025-06-23',2],['2025-06-30',10],['2025-07-07',20],['2025-07-14',14],['2025-07-21',19],['2025-07-28',24],['2025-08-04',38],['2025-08-11',23],['2025-08-18',53],['2025-08-25',36],['2025-09-01',38],['2025-09-08',39],['2025-09-15',37],['2025-09-22',23],['2025-09-29',25],['2025-10-06',27],['2025-10-13',18],['2025-10-20',32],['2025-10-27',25],['2025-11-03',44],['2025-11-10',34],['2025-11-17',40],['2025-11-24',11],['2025-12-01',19],['2025-12-08',15],['2025-12-15',24],['2025-12-22',11],['2025-12-29',8],['2026-01-05',18],['2026-01-12',12],['2026-01-19',51],['2026-01-26',42],['2026-02-02',36],['2026-02-09',52],['2026-02-16',45],['2026-02-23',46],['2026-03-02',44],['2026-03-09',50],['2026-03-16',61],['2026-03-23',69],['2026-03-30',48],['2026-04-06',38],['2026-04-13',51],['2026-04-20',51],['2026-04-27',43],['2026-05-04',48],['2026-05-11',33],['2026-05-18',38],['2026-05-25',57],['2026-06-01',45],['2026-06-08',49],['2026-06-15',46],['2026-06-22',42],['2026-06-29',41],['2026-07-06',24],['2026-07-13',31],['2026-07-20',60],['2026-07-27',57],['2026-08-03',41],['2026-08-10',71],['2026-08-17',73],['2026-08-24',60],['2026-08-31',56],['2026-09-07',55],['2026-09-14',53],['2026-09-21',52],['2026-09-28',45],['2026-10-05',26]];
const DAILY=[['2026-09-11',8],['2026-09-12',7],['2026-09-13',11],['2026-09-14',8],['2026-09-15',8],['2026-09-16',4],['2026-09-17',6],['2026-09-18',9],['2026-09-19',8],['2026-09-20',10],['2026-09-21',11],['2026-09-22',2],['2026-09-23',8],['2026-09-24',7],['2026-09-25',9],['2026-09-26',4],['2026-09-27',11],['2026-09-28',12],['2026-09-29',6],['2026-09-30',4],['2026-10-01',8],['2026-10-02',5],['2026-10-03',2],['2026-10-04',8],['2026-10-05',8],['2026-10-06',2],['2026-10-07',4],['2026-10-08',9],['2026-10-09',0],['2026-10-10',3]];
const tip=document.querySelector('#tooltip');
const colors=['#c88be6','#ed8588','#f3c46b','#5bc6cd','#639fff','#7acb9e'];
function bind(root){
 root.querySelectorAll('.bar').forEach(el=>{
  el.onpointerenter=()=>{tip.innerHTML='<strong>'+el.dataset.title+'</strong>'+el.dataset.detail;tip.classList.add('show')};
  el.onpointermove=e=>{tip.style.left=Math.min(e.clientX,innerWidth-190)+'px';tip.style.top=e.clientY+'px'};
  el.onpointerleave=()=>tip.classList.remove('show');
 });
 if(matchMedia('(max-width:760px)').matches) requestAnimationFrame(()=>{root.scrollLeft=root.scrollWidth-root.clientWidth});
}
function chart(rootId,rows,cumulative){
 const root=document.querySelector(rootId),W=cumulative?1320:740,H=cumulative?340:285;
 const p={l:42,r:18,t:24,b:34},max=cumulative?3200:Math.max(14,...rows.map(r=>r[1]));
 const y=v=>H-p.b-(H-p.t-p.b)*v/max,bw=(W-p.l-p.r)/rows.length;
 const ticks=cumulative?[0,800,1600,2400,3200]:[0,5,10,max];
 let sum=0;
 const grid=ticks.map(v=>`<line x1="${p.l}" y1="${y(v)}" x2="${W-p.r}" y2="${y(v)}" stroke="#1b354d" ${cumulative?'stroke-dasharray="2 5"':''}/><text x="${p.l-9}" y="${y(v)+4}" text-anchor="end" class="chart-label">${v}</text>`).join('');
 const bars=rows.map(([date,n],i)=>{
  sum+=n;const value=cumulative?sum:n,x=p.l+i*bw+2,width=Math.max(3,bw-4);
  const label=i===rows.length-1||(cumulative?i%8===4:i%5===0);
  const fill=cumulative?colors[i%colors.length]:i===rows.length-1?'#68e0cf':'#5597ff';
  return `<rect class="bar" data-title="${date}" data-detail="${cumulative?'本週新增 '+n+' 筆<br>累積 '+value:n} 筆學習紀錄" x="${x}" y="${y(value)}" width="${width}" height="${H-p.b-y(value)}" rx="2" fill="${fill}"/>`+
   (label?`<text x="${x+width/2}" y="${H-10}" text-anchor="middle" class="chart-label">${cumulative?date.slice(0,7):date.slice(5)}</text>`:'')+
   (cumulative&&(i%8===0||i===rows.length-1)?`<text x="${x+width/2}" y="${y(value)-8}" text-anchor="middle" class="chart-value">${value}</text>`:'');
 }).join('');
 root.innerHTML=`<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet" role="img">${grid}${bars}</svg>`;
 bind(root);
}
chart('#cumulativeChart',WEEKLY,true);
chart('#dailyChart',DAILY,false);
