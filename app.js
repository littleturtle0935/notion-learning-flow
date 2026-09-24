const WEEKLY=[
 ["2025-05-26",1],["2025-06-02",14],["2025-06-09",4],["2025-06-16",21],["2025-06-23",2],["2025-06-30",10],["2025-07-07",20],["2025-07-14",14],["2025-07-21",19],["2025-07-28",24],
 ["2025-08-04",38],["2025-08-11",23],["2025-08-18",53],["2025-08-25",36],["2025-09-01",38],["2025-09-08",39],["2025-09-15",37],["2025-09-22",23],["2025-09-29",25],["2025-10-06",27],
 ["2025-10-13",18],["2025-10-20",32],["2025-10-27",25],["2025-11-03",44],["2025-11-10",34],["2025-11-17",40],["2025-11-24",11],["2025-12-01",19],["2025-12-08",15],["2025-12-15",24],
 ["2025-12-22",11],["2025-12-29",8],["2026-01-05",18],["2026-01-12",12],["2026-01-19",51],["2026-01-26",42],["2026-02-02",36],["2026-02-09",52],["2026-02-16",45],["2026-02-23",46],
 ["2026-03-02",44],["2026-03-09",50],["2026-03-16",61],["2026-03-23",69],["2026-03-30",48],["2026-04-06",38],["2026-04-13",51],["2026-04-20",51],["2026-04-27",43],["2026-05-04",48],
 ["2026-05-11",33],["2026-05-18",38],["2026-05-25",57],["2026-06-01",45],["2026-06-08",49],["2026-06-15",46],["2026-06-22",42],["2026-06-29",41],["2026-07-06",24],["2026-07-13",31],
 ["2026-07-20",60],["2026-07-27",57],["2026-08-03",41],["2026-08-10",71],["2026-08-17",73],["2026-08-24",60],["2026-08-31",56],["2026-09-07",55],["2026-09-14",53],["2026-09-21",24]
];
const DAILY=[["2026-08-26",6],["2026-08-27",4],["2026-08-28",9],["2026-08-29",8],["2026-08-30",12],["2026-08-31",6],["2026-09-01",10],["2026-09-02",9],["2026-09-03",7],["2026-09-04",6],["2026-09-05",8],["2026-09-06",10],["2026-09-07",10],["2026-09-08",6],["2026-09-09",1],["2026-09-10",12],["2026-09-11",8],["2026-09-12",7],["2026-09-13",11],["2026-09-14",8],["2026-09-15",8],["2026-09-16",4],["2026-09-17",6],["2026-09-18",9],["2026-09-19",8],["2026-09-20",10],["2026-09-21",11],["2026-09-22",2],["2026-09-23",8],["2026-09-24",3]];
const COLORS=["#ca8ced","#f18480","#f4bd67","#5cc4ca","#5b9cff","#7ac99e"];
const SUBJECT_GROUPS=[
 {name:"自然科學",total:906,items:[
  ["數學與統計",448,"線性代數、機率統計、微積分與微分方程"],
  ["化學",186,"普通化學、酸鹼、有機與其他化學主題"],
  ["物理學",133,"普通物理、力學振動、材料與應用物理"],
  ["生物化學與代謝",118,"生化、代謝路徑、LDL 與相關主題"],
  ["生物學",21,"分子生物、演化生態與一般生物學"]
 ]},
 {name:"生命與醫學",total:175,items:[
  ["藥物動力學",41,"藥物在體內的吸收、分布、代謝與排除"],
  ["藥理學",20,"藥物作用與機轉"],
  ["免疫學",19,"免疫反應與免疫系統"],
  ["藥學",14,"藥物與藥學主題"],
  ["生理學",7,"器官系統與身體功能"],
  ["組織學",5,"組織結構與顯微層次"],
  ["放射學",3,"影像與放射相關主題"],
  ["病理學",2,"疾病機轉與病理變化"],
  ["臨床醫學其他",6,"醫檢、輸血等尚未再細分的項目"],
  ["動物與獸醫",33,"貓、動物照護與獸醫主題"],
  ["心理與認知科學",18,"發展、演化心理與行為"],
  ["運動與健康",7,"運動、訓練與身體健康"]
 ]},
 {name:"語言、人文與創作",total:878,items:[
  ["語言學習",520,"英文、日文、韓文、法文、德文與其他語言"],
  ["創作與影音",259,"寫稿、剪輯、Podcast、拍片與圖文"],
  ["藝術與設計",68,"繪畫、繪圖、透視與音樂"],
  ["人文與社會科學",31,"歷史、哲學、法學、閱讀與社會觀察"]
 ]},
 {name:"其他／待細分",total:551,items:[
  ["尚未可靠判定",551,"生活紀錄、零散主題或名稱資訊不足的項目"]
 ]}
];
const tooltip=document.querySelector("#tooltip");
function endOfWeek(start){const d=new Date(start+"T00:00:00Z");d.setUTCDate(d.getUTCDate()+6);return d.toISOString().slice(0,10)}
function bindTooltips(root){root.querySelectorAll(".bar").forEach(el=>{el.addEventListener("pointerenter",()=>{tooltip.innerHTML=`<strong>${el.dataset.title}</strong>${el.dataset.detail}`;tooltip.classList.add("show")});el.addEventListener("pointermove",e=>{tooltip.style.left=e.clientX+"px";tooltip.style.top=e.clientY+"px"});el.addEventListener("pointerleave",()=>tooltip.classList.remove("show"))})}
function alignMobileChartToLatest(root){if(matchMedia("(max-width:760px)").matches){requestAnimationFrame(()=>{root.scrollLeft=root.scrollWidth-root.clientWidth})}}
function cumulativeChart(){
 let total=0;const data=WEEKLY.map(([date,count])=>({date,count,total:total+=count}));
 const W=1320,H=380,p={l:52,r:16,t:30,b:44},max=3200,bw=(W-p.l-p.r)/data.length,y=v=>H-p.b-(H-p.t-p.b)*v/max;
 const grid=[0,800,1600,2400,3200].map(v=>`<line x1="${p.l}" y1="${y(v)}" x2="${W-p.r}" y2="${y(v)}" stroke="#1b354d" stroke-dasharray="2 5"/><text x="${p.l-10}" y="${y(v)+4}" text-anchor="end" class="chart-label">${v}</text>`).join("");
 const bars=data.map((d,i)=>{const x=p.l+i*bw+2,h=H-p.b-y(d.total),label=(i%8===4||i===data.length-1)?`<text x="${x+(bw-4)/2}" y="${H-14}" text-anchor="middle" class="chart-label">${d.date.slice(0,7)}</text>`:"",value=(i%5===0||i===data.length-1)?`<text x="${x+(bw-4)/2}" y="${Math.max(16,y(d.total)-7)}" text-anchor="middle" class="chart-value">${d.total}</text>`:"";return `<g><rect class="bar" data-title="${d.date}～${endOfWeek(d.date)}" data-detail="本週新增 ${d.count} 筆<br>累積 ${d.total} 筆" x="${x}" y="${y(d.total)}" width="${Math.max(4,bw-4)}" height="${h}" rx="2" fill="${COLORS[i%COLORS.length]}"/>${value}${label}</g>`}).join("");
 const root=document.querySelector("#cumulativeChart");root.innerHTML=`<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet" role="img">${grid}${bars}</svg>`;bindTooltips(root);alignMobileChartToLatest(root);
}
function dailyChart(){
 const W=1100,H=290,p={l:42,r:12,t:24,b:38},max=14,bw=(W-p.l-p.r)/DAILY.length,y=v=>H-p.b-(H-p.t-p.b)*v/max;
 const grid=[0,5,10,14].map(v=>`<line x1="${p.l}" y1="${y(v)}" x2="${W-p.r}" y2="${y(v)}" stroke="#1b354d"/><text x="${p.l-9}" y="${y(v)+4}" text-anchor="end" class="chart-label">${v}</text>`).join("");
 const bars=DAILY.map(([date,count],i)=>{const x=p.l+i*bw+4,h=H-p.b-y(count),label=(i%5===0||i===DAILY.length-1)?`<text x="${x+(bw-8)/2}" y="${H-12}" text-anchor="middle" class="chart-label">${date.slice(5)}</text>`:"";return `<g><rect class="bar" data-title="${date}" data-detail="${count} 筆學習紀錄" x="${x}" y="${y(count)}" width="${Math.max(5,bw-8)}" height="${h}" rx="3" fill="${i===DAILY.length-1?"#68e0cf":"#5597ff"}"/>${label}</g>`}).join("");
 const root=document.querySelector("#dailyChart");root.innerHTML=`<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" role="img">${grid}${bars}</svg>`;bindTooltips(root);alignMobileChartToLatest(root);
}
function subjectGroups(){
 const root=document.querySelector("#subjectGroups");
 const max=448;
 root.innerHTML=SUBJECT_GROUPS.map(group=>`<section class="subject-group"><div class="subject-group-head"><h3>${group.name}</h3><strong>${group.total.toLocaleString()} 筆</strong></div><div class="subject-list">${group.items.map(([name,count,detail])=>`<div class="subject-item"><div class="subject-item-head"><span>${name}</span><strong>${count.toLocaleString()}</strong></div><div class="subject-track"><i style="width:${Math.max(4,count/max*100)}%"></i></div><small>${detail}</small></div>`).join("")}</div></section>`).join("");
}
cumulativeChart();dailyChart();subjectGroups();
addEventListener("resize",()=>{document.querySelectorAll(".cumulative-chart,.daily-chart").forEach(alignMobileChartToLatest)});
