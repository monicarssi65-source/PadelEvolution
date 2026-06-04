import { useState, useEffect, useRef } from "react";

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Russo+One&family=Outfit:wght@300;400;500;600;700;800&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --lime:#C8F135;--lime2:#a8d120;--dark:#0B0F0A;--dark2:#111509;
  --surface:#161C10;--card:#1C2415;--card2:#222D18;--card3:#283020;
  --border:rgba(200,241,53,0.12);--border2:rgba(200,241,53,0.28);
  --text:#EEF5E0;--muted:rgba(238,245,224,0.45);
  --red:#FF4D4D;--blue:#4DA6FF;--gold:#FFD700;--silver:#C0C0C0;--bronze:#CD7F32;--orange:#FF8C42;
  --r:12px;--r2:18px;--shadow:0 8px 40px rgba(0,0,0,.6)
}
html{font-size:16px}
body{background:var(--dark);color:var(--text);font-family:'Outfit',sans-serif;min-height:100vh;overflow-x:hidden}
::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:var(--dark2)}::-webkit-scrollbar-thumb{background:var(--lime2);border-radius:3px}
::selection{background:var(--lime);color:var(--dark)}
.app{display:flex;flex-direction:column;min-height:100vh}
.app-body{display:flex;flex:1}
.sidebar{width:236px;flex-shrink:0;background:var(--dark2);border-right:1px solid var(--border);display:flex;flex-direction:column;padding:0 0 16px;position:sticky;top:0;height:100vh;overflow-y:auto}
.content{flex:1;padding:28px 26px;overflow-x:hidden;min-width:0}
.topbar{background:var(--dark2);border-bottom:1px solid var(--border);height:56px;display:flex;align-items:center;justify-content:space-between;padding:0 22px;position:sticky;top:0;z-index:100}
.logo{font-family:'Russo One',sans-serif;font-size:20px;letter-spacing:2px;display:flex;align-items:center;gap:9px;cursor:pointer;user-select:none}
.logo-icon{width:32px;height:32px;background:var(--lime);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:17px;flex-shrink:0}
.logo-text span{color:var(--lime)}
.topbar-right{display:flex;align-items:center;gap:10px}
.sidebar-sec{padding:18px 14px 5px;font-size:10px;font-weight:700;letter-spacing:2px;color:var(--muted);text-transform:uppercase}
.nav-item{display:flex;align-items:center;gap:9px;padding:9px 14px;margin:1px 8px;border-radius:10px;cursor:pointer;font-size:13.5px;font-weight:500;color:var(--muted);transition:all .18s;border:1px solid transparent;position:relative}
.nav-item:hover{background:var(--card);color:var(--text)}
.nav-item.active{background:rgba(200,241,53,.12);color:var(--lime);border-color:var(--border2);font-weight:700}
.nav-icon{font-size:16px;width:20px;text-align:center}
.nav-badge{position:absolute;right:10px;background:var(--red);color:#fff;font-size:10px;font-weight:800;padding:1px 6px;border-radius:10px;min-width:18px;text-align:center}
.sidebar-bottom{margin-top:auto;padding:10px}
.page-title{font-family:'Russo One',sans-serif;font-size:32px;letter-spacing:2px;line-height:1.1}
.page-title span{color:var(--lime)}
.page-sub{color:var(--muted);font-size:13.5px;margin-top:5px}
.page-header{margin-bottom:24px}
.card{background:var(--card);border:1px solid var(--border);border-radius:var(--r2);padding:20px}
.card-sm{background:var(--card);border:1px solid var(--border);border-radius:var(--r);padding:13px 15px}
.glass{background:linear-gradient(135deg,rgba(28,36,21,.92),rgba(22,28,16,.97));border:1px solid var(--border2);border-radius:var(--r2);padding:22px;backdrop-filter:blur(10px)}
.torneo-card{background:var(--card);border:1px solid var(--border);border-radius:var(--r2);padding:18px;cursor:pointer;transition:all .2s;position:relative;overflow:hidden}
.torneo-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--lime),transparent)}
.torneo-card:hover{border-color:var(--border2);transform:translateY(-2px);box-shadow:var(--shadow)}
.g2{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:14px}
.g3{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:12px}
.g4{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px}
.stat-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px;margin-bottom:24px}
.stat-card{background:var(--card);border:1px solid var(--border);border-radius:var(--r);padding:14px 16px}
.stat-val{font-family:'Russo One',sans-serif;font-size:28px;color:var(--lime);line-height:1}
.stat-lbl{font-size:11.5px;color:var(--muted);margin-top:3px;font-weight:500}
.stat-icon{font-size:20px;margin-bottom:7px}
.btn{display:inline-flex;align-items:center;gap:6px;border:none;border-radius:9px;font-family:'Outfit',sans-serif;font-weight:700;cursor:pointer;transition:all .18s;white-space:nowrap;font-size:13.5px}
.btn-lime{background:var(--lime);color:var(--dark);padding:10px 20px}
.btn-lime:hover{background:#d6ff3d;transform:translateY(-1px);box-shadow:0 4px 18px rgba(200,241,53,.35)}
.btn-outline{background:transparent;color:var(--lime);border:1.5px solid var(--border2);padding:9px 18px}
.btn-outline:hover{background:rgba(200,241,53,.08)}
.btn-ghost{background:var(--card2);color:var(--text);border:1px solid var(--border);padding:8px 15px}
.btn-ghost:hover{border-color:var(--lime);color:var(--lime)}
.btn-red{background:rgba(255,77,77,.12);color:var(--red);border:1px solid rgba(255,77,77,.3);padding:7px 13px}
.btn-red:hover{background:rgba(255,77,77,.22)}
.btn-sm{padding:6px 12px!important;font-size:12px!important}
.btn-xs{padding:4px 9px!important;font-size:11px!important}
.btn-icon{background:var(--card2);border:1px solid var(--border);color:var(--muted);width:32px;height:32px;border-radius:8px;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;transition:all .18s;font-size:14px}
.btn-icon:hover{border-color:var(--lime);color:var(--lime)}
.flex-row{display:flex;align-items:center;gap:9px;flex-wrap:wrap}
.input{background:var(--dark);border:1.5px solid var(--border);border-radius:9px;color:var(--text);font-family:'Outfit',sans-serif;font-size:13.5px;padding:9px 13px;width:100%;outline:none;transition:border-color .18s}
.input:focus{border-color:var(--lime)}
.input::placeholder{color:var(--muted)}
select.input{cursor:pointer}
textarea.input{resize:vertical}
.form-group{margin-bottom:14px}
.form-label{font-size:10.5px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--muted);margin-bottom:5px;display:block}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:11px}
.form-row3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:11px}
.badge{display:inline-flex;align-items:center;gap:3px;padding:3px 9px;border-radius:20px;font-size:11px;font-weight:700;letter-spacing:.4px}
.b-lime{background:rgba(200,241,53,.12);color:var(--lime);border:1px solid var(--border2)}
.b-red{background:rgba(255,77,77,.12);color:var(--red);border:1px solid rgba(255,77,77,.3)}
.b-blue{background:rgba(77,166,255,.12);color:var(--blue);border:1px solid rgba(77,166,255,.3)}
.b-gold{background:rgba(255,215,0,.12);color:var(--gold);border:1px solid rgba(255,215,0,.3)}
.b-gray{background:rgba(255,255,255,.06);color:var(--muted);border:1px solid var(--border)}
.b-orange{background:rgba(255,140,66,.12);color:var(--orange);border:1px solid rgba(255,140,66,.3)}
.tabs{display:flex;gap:3px;background:var(--dark2);border-radius:11px;padding:4px;margin-bottom:22px}
.tab{flex:1;padding:8px 10px;border:none;background:transparent;color:var(--muted);font-family:'Outfit',sans-serif;font-weight:600;font-size:12.5px;border-radius:8px;cursor:pointer;transition:all .18s}
.tab.active{background:var(--lime);color:var(--dark)}
.table{width:100%;border-collapse:collapse;font-size:13.5px}
.table th{font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--muted);padding:9px 13px;text-align:left;border-bottom:1px solid var(--border)}
.table td{padding:10px 13px;border-bottom:1px solid rgba(200,241,53,.05);vertical-align:middle}
.table tr:hover td{background:rgba(200,241,53,.025)}
.table tr:last-child td{border-bottom:none}
.overlay{position:fixed;inset:0;background:rgba(0,0,0,.78);display:flex;align-items:center;justify-content:center;z-index:300;padding:18px;backdrop-filter:blur(6px);animation:fadeIn .2s}
.modal{background:var(--surface);border:1px solid var(--border2);border-radius:20px;padding:28px;width:100%;max-width:500px;animation:slideUp .25s ease;max-height:92vh;overflow-y:auto}
.modal-lg{max-width:680px}
.modal-hd{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:20px}
.modal-close{background:var(--card2);border:1px solid var(--border);color:var(--muted);width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:13px;transition:all .18s;flex-shrink:0}
.modal-close:hover{border-color:var(--red);color:var(--red)}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes slideUp{from{transform:translateY(14px);opacity:0}to{transform:translateY(0);opacity:1}}
.tog-wrap{display:flex;align-items:center;gap:9px}
.tog{width:38px;height:21px;background:var(--card2);border:1.5px solid var(--border);border-radius:11px;cursor:pointer;position:relative;transition:all .18s;flex-shrink:0}
.tog.on{background:var(--lime);border-color:var(--lime)}
.tog-k{width:15px;height:15px;background:white;border-radius:50%;position:absolute;top:2px;left:2px;transition:all .18s}
.tog.on .tog-k{left:19px;background:var(--dark)}
.empty{text-align:center;padding:52px 18px}
.empty-icon{font-size:48px;opacity:.25;margin-bottom:12px}
.empty-title{font-family:'Russo One',sans-serif;font-size:18px;color:var(--muted);margin-bottom:5px;letter-spacing:1px}
.empty-sub{color:var(--muted);font-size:12.5px}
.match-card{background:var(--card2);border:1px solid var(--border);border-radius:var(--r);padding:14px;transition:border-color .18s}
.match-card:hover{border-color:var(--border2)}
.match-grid{display:grid;grid-template-columns:1fr 50px 1fr;align-items:center;gap:6px}
.match-vs{text-align:center;font-family:'Russo One',sans-serif;font-size:14px;color:var(--lime)}
.score-inp{width:44px;height:36px;text-align:center;font-size:18px;font-weight:800;color:var(--lime);font-family:'Russo One',sans-serif}
.score-row{display:flex;align-items:center;justify-content:center;gap:7px;margin-top:10px}
.score-sep{color:var(--muted);font-weight:700}
.rank-row{display:grid;grid-template-columns:36px 1fr 50px 50px 50px 50px 58px;align-items:center;gap:5px;padding:9px 13px;border-radius:9px;font-size:12.5px}
.rank-row:nth-child(even){background:rgba(200,241,53,.025)}
.rank-row:hover{background:rgba(200,241,53,.05)}
.rank-pts{font-family:'Russo One',sans-serif;font-size:18px;color:var(--lime);text-align:center}
.avatar{border-radius:50%;background:linear-gradient(135deg,var(--lime),var(--lime2));display:flex;align-items:center;justify-content:center;font-weight:800;color:var(--dark);flex-shrink:0}
.prog{background:var(--dark);border-radius:4px;height:5px;overflow:hidden}
.prog-fill{height:100%;background:var(--lime);border-radius:4px;transition:width .5s ease}
.notif-item{display:flex;gap:12px;padding:13px 16px;border-bottom:1px solid var(--border);transition:background .15s;cursor:pointer}
.notif-item:hover{background:rgba(200,241,53,.03)}
.notif-item.unread{background:rgba(200,241,53,.045)}
.notif-dot{width:8px;height:8px;border-radius:50%;background:var(--lime);flex-shrink:0;margin-top:5px}
.notif-dot.read{background:var(--muted)}
.notif-popup{position:absolute;top:calc(100% + 8px);right:0;width:320px;background:var(--surface);border:1px solid var(--border2);border-radius:14px;box-shadow:var(--shadow);z-index:200;overflow:hidden;animation:slideUp .2s ease}
.time-slot{background:var(--card2);border:1px solid var(--border);border-radius:7px;padding:7px 10px;cursor:pointer;transition:all .15s;text-align:center}
.time-slot:hover{border-color:var(--border2)}
.toast{position:fixed;bottom:22px;right:22px;background:var(--lime);color:var(--dark);padding:12px 18px;border-radius:11px;font-weight:800;font-size:13.5px;z-index:500;animation:toastIn .3s ease;box-shadow:0 5px 28px rgba(200,241,53,.4);display:flex;align-items:center;gap:7px}
@keyframes toastIn{from{transform:translateY(14px);opacity:0}to{transform:translateY(0);opacity:1}}
.login-bg{min-height:100vh;background:var(--dark);display:flex;align-items:center;justify-content:center;padding:18px;position:relative;overflow:hidden}
.login-bg::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 30% 50%,rgba(200,241,53,.07) 0%,transparent 60%),radial-gradient(ellipse at 70% 20%,rgba(200,241,53,.04) 0%,transparent 50%)}
.login-box{background:var(--surface);border:1px solid var(--border2);border-radius:22px;padding:36px;width:100%;max-width:420px;position:relative;z-index:1}
.court-bg{position:absolute;inset:0;opacity:.03;background-image:repeating-linear-gradient(0deg,var(--lime) 0,transparent 1px,transparent 40px),repeating-linear-gradient(90deg,var(--lime) 0,transparent 1px,transparent 80px);pointer-events:none}
.sep{height:1px;background:var(--border);margin:16px 0}
.section-title{font-family:'Russo One',sans-serif;font-size:15px;letter-spacing:1px;margin-bottom:12px}
@media print{.sidebar,.topbar,.no-print{display:none!important}.content{padding:0}.card,.glass,.match-card{break-inside:avoid}body{background:#fff;color:#000}}
@media(max-width:768px){.sidebar{display:none}.content{padding:16px}.form-row,.form-row3{grid-template-columns:1fr}.rank-row{grid-template-columns:32px 1fr 58px}.rank-row>*:nth-child(3),.rank-row>*:nth-child(4),.rank-row>*:nth-child(5),.rank-row>*:nth-child(6){display:none}}
`;

const LIVELLI=["1.0","1.5","2.0","2.5","3.0","3.5","4.0","4.5","5.0"];
const LATI=["Indifferente","Destra","Sinistra"];
const CAMPI=[
  {id:"c1",nome:"Campo 1",tipo:"Indoor",superficie:"Vetro"},
  {id:"c2",nome:"Campo 2",tipo:"Indoor",superficie:"Vetro"},
  {id:"c3",nome:"Campo 3",tipo:"Outdoor",superficie:"Sintetico"},
  {id:"c4",nome:"Campo 4",tipo:"Outdoor",superficie:"Sintetico"},
];
const ORARI=["08:00","09:30","11:00","12:30","14:00","15:30","17:00","18:30","20:00","21:30"];
const CATEGORIE=["Maschile","Femminile","Misto","Over 40","Under 25"];
const LIVELLI_ARB=["Provinciale","Regionale","Nazionale","Internazionale"];

function uid(){return Math.random().toString(36).slice(2,9)}
function initials(n){return(n||"?").split(" ").map(x=>x[0]||"").join("").slice(0,2).toUpperCase()}
function shuffle(a){const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]]}return b}
function today(){return new Date().toISOString().slice(0,10)}
function fmtDate(d){if(!d)return"—";try{const[y,m,g]=d.split("-");return`${g}/${m}/${y}`}catch{return d}}

const DEMO_GIOCATORI=[
  {id:"p1",nome:"Marco Rossi",livello:"3.5",lato:"Destra",mancino:false,email:"marco@test.it",circolo:"Evolution Padel",puntiRanking:1240,vittorie:18,sconfitte:7,partiteGiocate:25},
  {id:"p2",nome:"Luca Bianchi",livello:"3.0",lato:"Sinistra",mancino:false,email:"luca@test.it",circolo:"Evolution Padel",puntiRanking:980,vittorie:12,sconfitte:9,partiteGiocate:21},
  {id:"p3",nome:"Giulia Verdi",livello:"4.0",lato:"Destra",mancino:true,email:"giulia@test.it",circolo:"Evolution Padel",puntiRanking:1560,vittorie:22,sconfitte:5,partiteGiocate:27},
  {id:"p4",nome:"Federica Neri",livello:"2.5",lato:"Indifferente",mancino:false,email:"fede@test.it",circolo:"Evolution Padel",puntiRanking:720,vittorie:8,sconfitte:14,partiteGiocate:22},
  {id:"p5",nome:"Alessandro Conti",livello:"3.5",lato:"Destra",mancino:false,email:"ale@test.it",circolo:"Evolution Padel",puntiRanking:1180,vittorie:16,sconfitte:8,partiteGiocate:24},
  {id:"p6",nome:"Matteo Ferrari",livello:"4.0",lato:"Sinistra",mancino:false,email:"matt@test.it",circolo:"Evolution Padel",puntiRanking:1490,vittorie:20,sconfitte:6,partiteGiocate:26},
  {id:"p7",nome:"Sara Marino",livello:"3.0",lato:"Destra",mancino:false,email:"sara@test.it",circolo:"Evolution Padel",puntiRanking:890,vittorie:10,sconfitte:12,partiteGiocate:22},
  {id:"p8",nome:"Roberto Esposito",livello:"2.0",lato:"Destra",mancino:true,email:"roby@test.it",circolo:"Evolution Padel",puntiRanking:540,vittorie:5,sconfitte:16,partiteGiocate:21},
  {id:"p9",nome:"Valentina Ricci",livello:"3.5",lato:"Sinistra",mancino:false,email:"vale@test.it",circolo:"Evolution Padel",puntiRanking:1320,vittorie:19,sconfitte:7,partiteGiocate:26},
  {id:"p10",nome:"Davide Romano",livello:"4.5",lato:"Destra",mancino:false,email:"dave@test.it",circolo:"Evolution Padel",puntiRanking:1780,vittorie:25,sconfitte:3,partiteGiocate:28},
  {id:"p11",nome:"Chiara Colombo",livello:"3.0",lato:"Indifferente",mancino:false,email:"chiara@test.it",circolo:"Evolution Padel",puntiRanking:870,vittorie:11,sconfitte:11,partiteGiocate:22},
  {id:"p12",nome:"Simone Moretti",livello:"2.5",lato:"Sinistra",mancino:true,email:"simo@test.it",circolo:"Evolution Padel",puntiRanking:640,vittorie:7,sconfitte:15,partiteGiocate:22},
];
const DEMO_ARBITRI=[
  {id:"a1",nome:"Giorgio Palma",livello:"Nazionale",email:"giorgio@arb.it",telefono:"333-1234567",torneiArbitrati:12,attivo:true},
  {id:"a2",nome:"Monica Bruni",livello:"Regionale",email:"monica@arb.it",telefono:"334-9876543",torneiArbitrati:8,attivo:true},
  {id:"a3",nome:"Franco Lisi",livello:"Provinciale",email:"franco@arb.it",telefono:"335-5556789",torneiArbitrati:5,attivo:false},
];

// ── GAME LOGIC ──
function buildCoppie(pl){
  const sorted=[...pl].sort((a,b)=>parseFloat(b.livello)-parseFloat(a.livello));
  const coppie=[],used=new Set();
  for(let i=0;i<sorted.length;i++){
    if(used.has(sorted[i].id))continue;
    let found=false;
    for(let j=i+1;j<sorted.length;j++){
      if(used.has(sorted[j].id))continue;
      const c=(sorted[i].lato==="Destra"&&sorted[j].lato==="Sinistra")||(sorted[i].lato==="Sinistra"&&sorted[j].lato==="Destra")||sorted[i].lato==="Indifferente"||sorted[j].lato==="Indifferente";
      if(c){coppie.push({id:uid(),g1:sorted[i],g2:sorted[j],livello:((parseFloat(sorted[i].livello)+parseFloat(sorted[j].livello))/2).toFixed(1)});used.add(sorted[i].id);used.add(sorted[j].id);found=true;break}
    }
    if(!found&&!used.has(sorted[i].id)){for(let j=i+1;j<sorted.length;j++){if(!used.has(sorted[j].id)){coppie.push({id:uid(),g1:sorted[i],g2:sorted[j],livello:((parseFloat(sorted[i].livello)+parseFloat(sorted[j].livello))/2).toFixed(1)});used.add(sorted[i].id);used.add(sorted[j].id);break}}}
  }
  return coppie;
}
function buildTabellone(coppie){
  const s=shuffle(coppie),pts=[];
  for(let i=0;i<s.length-1;i+=2)pts.push({id:uid(),c1:s[i],c2:s[i+1],s1:null,s2:null,round:1,campo:CAMPI[i%CAMPI.length]?.nome||"—"});
  if(s.length%2)pts.push({id:uid(),c1:s[s.length-1],c2:null,s1:null,s2:null,round:1,bye:true});
  return pts;
}
function buildGironi(coppie,n=2){
  const s=shuffle(coppie);
  const gs=Array.from({length:n},(_,i)=>({id:i+1,nome:`Girone ${String.fromCharCode(65+i)}`,coppie:[],partite:[],classifica:[]}));
  s.forEach((c,i)=>gs[i%n].coppie.push(c));
  gs.forEach(g=>{
    const pts=[];
    for(let i=0;i<g.coppie.length;i++)for(let j=i+1;j<g.coppie.length;j++)pts.push({id:uid(),c1:g.coppie[i],c2:g.coppie[j],s1:null,s2:null,campo:CAMPI[(i+j)%CAMPI.length]?.nome||"—"});
    g.partite=pts;g.classifica=g.coppie.map(c=>({coppia:c,V:0,P:0,GF:0,GS:0,Pts:0}));
  });
  return gs;
}
function buildRodeo(pl){
  if(pl.length<4)return{rounds:[],punteggi:[]};
  const rounds=[];
  const numRounds=Math.min(pl.length-1,6);
  for(let r=0;r<numRounds;r++){
    const rot=[pl[0],...pl.slice(1).map((_,i,arr)=>arr[(i+r)%arr.length])];
    const partite=[];
    const mid=Math.floor(rot.length/2);
    for(let i=0;i<mid;i++){
      const g1=rot[i],g2=rot[rot.length-1-i];
      const opp1=rot[mid+i]||rot[mid];
      const opp2=rot[mid-1-i]||rot[0];
      if(g1&&g2&&opp1&&opp2&&g1.id!==g2.id&&opp1.id!==opp2.id&&g1.id!==opp1.id){
        partite.push({id:uid(),c1:{id:uid(),g1,g2,livello:"—"},c2:{id:uid(),g1:opp1,g2:opp2,livello:"—"},s1:null,s2:null});
      }
    }
    if(partite.length)rounds.push({numero:r+1,partite});
  }
  const punteggi=pl.map(p=>({giocatore:p,punti:0,V:0,P:0}));
  return{rounds,punteggi};
}
function recalcGirone(g){
  const cls=g.coppie.map(c=>({coppia:c,V:0,P:0,GF:0,GS:0,Pts:0}));
  g.partite.forEach(p=>{
    if(p.s1===null||p.s2===null)return;
    const i1=cls.findIndex(x=>x.coppia.id===p.c1.id),i2=cls.findIndex(x=>x.coppia.id===p.c2?.id);
    if(i1<0||i2<0)return;
    cls[i1].GF+=p.s1;cls[i1].GS+=p.s2;cls[i2].GF+=p.s2;cls[i2].GS+=p.s1;
    if(p.s1>p.s2){cls[i1].V++;cls[i1].Pts+=3;cls[i2].P++;}
    else if(p.s2>p.s1){cls[i2].V++;cls[i2].Pts+=3;cls[i1].P++;}
    else{cls[i1].Pts+=1;cls[i2].Pts+=1;}
  });
  cls.sort((a,b)=>b.Pts-a.Pts||(b.GF-b.GS)-(a.GF-a.GS));
  return cls;
}

// ── BASE COMPONENTS ──
function Toast({msg,onDone}){useEffect(()=>{const t=setTimeout(onDone,2800);return()=>clearTimeout(t);},[]);return<div className="toast">✓ {msg}</div>;}
function Av({nome,size=36}){return<div className="avatar" style={{width:size,height:size,fontSize:size*.37}}>{initials(nome)}</div>;}
function Modal({title,onClose,children,large}){
  return<div className="overlay" onClick={e=>e.target===e.currentTarget&&onClose()}>
    <div className={`modal${large?" modal-lg":""}`}>
      <div className="modal-hd"><div style={{fontFamily:"'Russo One',sans-serif",fontSize:18,letterSpacing:1}}>{title}</div><button className="modal-close" onClick={onClose}>✕</button></div>
      {children}
    </div>
  </div>;
}
function Tog({v,onChange}){return<div className={`tog ${v?"on":""}`} onClick={()=>onChange(!v)}><div className="tog-k"/></div>;}

// ── NOTIFICATIONS ──
function NotifBell({notifiche,setNotifiche}){
  const [open,setOpen]=useState(false);
  const unread=notifiche.filter(n=>!n.letta).length;
  const ref=useRef();
  useEffect(()=>{function h(e){if(ref.current&&!ref.current.contains(e.target))setOpen(false);}document.addEventListener("mousedown",h);return()=>document.removeEventListener("mousedown",h);},[]);
  const icons={torneo:"🏆",iscrizione:"📝",campo:"🏟️",sistema:"ℹ️",arbitro:"👔"};
  return<div style={{position:"relative"}} ref={ref}>
    <button className="btn-icon" style={{position:"relative"}} onClick={()=>setOpen(o=>!o)}>
      🔔{unread>0&&<span style={{position:"absolute",top:-4,right:-4,background:"var(--red)",color:"#fff",fontSize:9,fontWeight:800,width:15,height:15,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center"}}>{unread}</span>}
    </button>
    {open&&<div className="notif-popup">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 14px",borderBottom:"1px solid var(--border)"}}>
        <span style={{fontWeight:700,fontSize:13}}>Notifiche</span>
        <button className="btn btn-xs btn-ghost" onClick={()=>setNotifiche(n=>n.map(x=>({...x,letta:true})))}>Tutte lette</button>
      </div>
      <div style={{maxHeight:300,overflowY:"auto"}}>
        {notifiche.length===0&&<div style={{padding:"20px",textAlign:"center",color:"var(--muted)",fontSize:13}}>Nessuna notifica</div>}
        {notifiche.map(n=><div key={n.id} className={`notif-item ${n.letta?"":"unread"}`} onClick={()=>setNotifiche(prev=>prev.map(x=>x.id===n.id?{...x,letta:true}:x))}>
          <div className={`notif-dot ${n.letta?"read":""}`}/>
          <div style={{flex:1}}><div style={{display:"flex",alignItems:"center",gap:5,marginBottom:2}}><span>{icons[n.tipo]||"📢"}</span><span style={{fontWeight:700,fontSize:12.5}}>{n.titolo}</span></div><div style={{fontSize:11.5,color:"var(--muted)"}}>{n.testo}</div><div style={{fontSize:10,color:"var(--muted)",marginTop:2}}>{n.data}</div></div>
        </div>)}
      </div>
    </div>}
  </div>;
}
// ─────────────────────────────────────────────────────────────
// FORMATI TORNEO COMPLETI — PADEL EVOLUTION
// ─────────────────────────────────────────────────────────────

const FORMATI = [
  {
    id: "elim",
    icon: "🏆",
    nome: "Eliminazione Diretta",
    desc: "Perdi ed esci. Tabellone classico.",
    dettaglio: "Ogni sconfitta elimina la coppia. Il vincitore avanza fino alla finale.",
    minCoppie: 4,
    maxCoppie: 32,
    durata: "2-4 ore",
    difficolta: "Facile",
    popolare: true,
  },
  {
    id: "gironi",
    icon: "📋",
    nome: "Gironi + Finale",
    desc: "Tutti vs tutti nei gironi, poi knockout.",
    dettaglio: "Le coppie vengono divise in gironi. Le prime di ogni girone accedono al tabellone finale.",
    minCoppie: 6,
    maxCoppie: 24,
    durata: "4-6 ore",
    difficolta: "Media",
    popolare: true,
  },
  {
    id: "rodeo",
    icon: "🎠",
    nome: "Formula Rodeo",
    desc: "Partner ruotano ogni round.",
    dettaglio: "Ogni giocatore cambia partner ad ogni round. Classifica individuale finale. Perfetto per misti e sociali.",
    minCoppie: 4,
    maxCoppie: 20,
    durata: "2-3 ore",
    difficolta: "Facile",
    popolare: true,
  },
  {
    id: "americano",
    icon: "🔄",
    nome: "Americano",
    desc: "Tutti con e contro tutti. Punti individuali.",
    dettaglio: "Ogni giocatore gioca con e contro tutti gli altri. Si contano i punti/game vinti individualmente. Il migliore vince.",
    minCoppie: 4,
    maxCoppie: 16,
    durata: "3-5 ore",
    difficolta: "Facile",
    popolare: true,
  },
  {
    id: "gold_silver",
    icon: "🥇",
    nome: "Gold / Silver / Bronze",
    desc: "3 tabelloni per livello. Tutti vincono qualcosa.",
    dettaglio: "Dopo una fase iniziale, le coppie vengono smistare in tabellone Gold (top), Silver (medio) e Bronze (altri). Ognuno gioca il proprio livello.",
    minCoppie: 8,
    maxCoppie: 32,
    durata: "5-8 ore",
    difficolta: "Media",
    popolare: true,
  },
  {
    id: "round_robin",
    icon: "👥",
    nome: "Round Robin Coppie Fisse",
    desc: "Coppie fisse, tutti vs tutti.",
    dettaglio: "Le coppie sono fisse per tutto il torneo. Ogni coppia affronta tutte le altre. Classifica finale per punti.",
    minCoppie: 4,
    maxCoppie: 12,
    durata: "3-5 ore",
    difficolta: "Facile",
    popolare: false,
  },
  {
    id: "super_tb",
    icon: "⚡",
    nome: "Super Tie-Break",
    desc: "Formato ultra rapido. 3 super tie-break.",
    dettaglio: "Ogni match si gioca al meglio di 3 super tie-break (a 10 punti). Ideale per tornei serali o con poco tempo.",
    minCoppie: 4,
    maxCoppie: 16,
    durata: "1-2 ore",
    difficolta: "Facile",
    popolare: false,
  },
  {
    id: "doppio_tab",
    icon: "🏅",
    nome: "Doppio Tabellone",
    desc: "Chi perde va nel tabellone di consolazione.",
    dettaglio: "Tabellone principale + tabellone di consolazione. Chi perde al primo turno continua a giocare nel Bronze. Nessuno torna a casa subito.",
    minCoppie: 8,
    maxCoppie: 32,
    durata: "4-6 ore",
    difficolta: "Media",
    popolare: false,
  },
  {
    id: "tappe",
    icon: "📅",
    nome: "Campionato a Tappe",
    desc: "Più eventi, classifica cumulativa stagione.",
    dettaglio: "Il campionato si gioca su più tornei/tappe. I punti si accumulano. La classifica finale determina il campione della stagione.",
    minCoppie: 4,
    maxCoppie: 32,
    durata: "Stagionale",
    difficolta: "Avanzata",
    popolare: false,
  },
];

// ── LOGIC: Americano ──
function buildAmericano(partecipanti) {
  // Round-robin individuale: ogni giocatore gioca con e contro tutti
  const pl = [...partecipanti];
  const n = pl.length;
  const rounds = [];
  const punteggi = pl.map(p => ({ giocatore: p, punti: 0, game: 0, V: 0, P: 0 }));

  // Genera tutti gli abbinamenti possibili
  const matches = [];
  for (let i = 0; i < n - 1; i++) {
    for (let j = i + 1; j < n; j++) {
      for (let k = 0; k < n; k++) {
        if (k === i || k === j) continue;
        for (let l = k + 1; l < n; l++) {
          if (l === i || l === j) continue;
          matches.push({
            id: uid(),
            c1: { id: uid(), g1: pl[i], g2: pl[j], livello: "—" },
            c2: { id: uid(), g1: pl[k], g2: pl[l], livello: "—" },
            s1: null, s2: null
          });
        }
      }
    }
  }

  // Raggruppa in round (max 2 partite/round per 4 giocatori)
  const maxMatchPerRound = Math.floor(n / 4);
  let round = [];
  let usedInRound = new Set();
  let roundNum = 1;

  for (const m of matches) {
    const ids = [m.c1.g1.id, m.c1.g2.id, m.c2.g1.id, m.c2.g2.id];
    if (ids.some(id => usedInRound.has(id))) continue;
    round.push(m);
    ids.forEach(id => usedInRound.add(id));
    if (round.length >= maxMatchPerRound) {
      rounds.push({ numero: roundNum++, partite: round });
      round = [];
      usedInRound = new Set();
    }
  }
  if (round.length) rounds.push({ numero: roundNum, partite: round });

  return { rounds: rounds.slice(0, 8), punteggi }; // max 8 round
}

// ── LOGIC: Gold/Silver/Bronze ──
function buildGoldSilverBronze(coppie) {
  const shuffled = shuffle(coppie);
  const n = shuffled.length;
  const goldCount = Math.ceil(n / 3);
  const silverCount = Math.ceil((n - goldCount) / 2);

  // Fase iniziale: gironi per smistamento
  const gSmist = buildGironi(shuffled, Math.max(2, Math.floor(n / 3)));

  return {
    fase: "smistamento",
    gironiSmistamento: gSmist,
    tabelloneGold: [],
    tabelloneSilver: [],
    tabelloneBronze: [],
    goldCount,
    silverCount,
  };
}

function promuoviGSB(gsb) {
  // Dopo che i gironi di smistamento sono completati, crea i 3 tabelloni
  const tutte = [];
  gsb.gironiSmistamento.forEach(g => {
    g.classifica.forEach((r, i) => tutte.push({ coppia: r.coppia, pos: i, girone: g.nome, pts: r.Pts }));
  });
  tutte.sort((a, b) => a.pos - b.pos || b.pts - a.pts);

  const gold = tutte.slice(0, gsb.goldCount).map(r => r.coppia);
  const silver = tutte.slice(gsb.goldCount, gsb.goldCount + gsb.silverCount).map(r => r.coppia);
  const bronze = tutte.slice(gsb.goldCount + gsb.silverCount).map(r => r.coppia);

  return {
    ...gsb,
    fase: "tabelloni",
    tabelloneGold: buildTabellone(gold.length >= 2 ? gold : gold),
    tabelloneSilver: buildTabellone(silver.length >= 2 ? silver : silver),
    tabelloneBronze: buildTabellone(bronze.length >= 2 ? bronze : bronze),
  };
}

// ── LOGIC: Doppio Tabellone ──
function buildDoppioTabellone(coppie) {
  return {
    principale: buildTabellone(coppie),
    consolazione: [],
    fase: "principale",
  };
}

function aggiungiConsolazione(dt, perdente) {
  if (!perdente) return dt;
  return {
    ...dt,
    consolazione: [...dt.consolazione, perdente],
  };
}

// ── LOGIC: Round Robin Coppie Fisse ──
function buildRoundRobin(coppie) {
  const partite = [];
  for (let i = 0; i < coppie.length; i++) {
    for (let j = i + 1; j < coppie.length; j++) {
      partite.push({ id: uid(), c1: coppie[i], c2: coppie[j], s1: null, s2: null });
    }
  }
  const classifica = coppie.map(c => ({ coppia: c, V: 0, P: 0, GF: 0, GS: 0, Pts: 0 }));
  return { partite, classifica };
}

function recalcRoundRobin(rr) {
  const cls = rr.classifica.map(r => ({ ...r, V: 0, P: 0, GF: 0, GS: 0, Pts: 0 }));
  rr.partite.forEach(p => {
    if (p.s1 === null || p.s2 === null) return;
    const i1 = cls.findIndex(x => x.coppia.id === p.c1.id);
    const i2 = cls.findIndex(x => x.coppia.id === p.c2.id);
    if (i1 < 0 || i2 < 0) return;
    cls[i1].GF += p.s1; cls[i1].GS += p.s2;
    cls[i2].GF += p.s2; cls[i2].GS += p.s1;
    if (p.s1 > p.s2) { cls[i1].V++; cls[i1].Pts += 3; cls[i2].P++; }
    else if (p.s2 > p.s1) { cls[i2].V++; cls[i2].Pts += 3; cls[i1].P++; }
    else { cls[i1].Pts++; cls[i2].Pts++; }
  });
  cls.sort((a, b) => b.Pts - a.Pts || (b.GF - b.GS) - (a.GF - a.GS));
  return { ...rr, classifica: cls };
}

// ── LOGIC: Super Tie-Break ──
function buildSuperTieBrk(coppie) {
  // Ogni match: 3 set, ognuno al meglio a 10 punti
  const partite = buildTabellone(coppie).map(p => ({
    ...p,
    sets: [{ s1: null, s2: null }, { s1: null, s2: null }, { s1: null, s2: null }],
    tipo: "super_tb"
  }));
  return partite;
}

// ── COMPONENTE: Selezione Formato con card dettagliate ──
function FormatoSelector({ value, onChange }) {
  const [expanded, setExpanded] = useState(null);

  return (
    <div>
      <label className="form-label">Formato Torneo</label>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10, marginTop: 6 }}>
        {FORMATI.map(f => (
          <div
            key={f.id}
            onClick={() => onChange(f.id)}
            style={{
              background: value === f.id ? "rgba(200,241,53,.14)" : "var(--dark)",
              border: `1.5px solid ${value === f.id ? "var(--lime)" : "var(--border)"}`,
              borderRadius: 12,
              padding: "12px 13px",
              cursor: "pointer",
              transition: "all .18s",
              position: "relative",
            }}
          >
            {f.popolare && (
              <div style={{ position: "absolute", top: -8, right: 8, background: "var(--lime)", color: "var(--dark)", fontSize: 9, fontWeight: 800, padding: "2px 7px", borderRadius: 10, letterSpacing: 1 }}>
                POPOLARE
              </div>
            )}
            <div style={{ fontSize: 22, marginBottom: 5 }}>{f.icon}</div>
            <div style={{ fontWeight: 700, fontSize: 13 }}>{f.nome}</div>
            <div style={{ color: "var(--muted)", fontSize: 11, marginTop: 3, lineHeight: 1.4 }}>{f.desc}</div>
            <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
              <span style={{ fontSize: 10, background: "rgba(255,255,255,.06)", borderRadius: 6, padding: "2px 6px", color: "var(--muted)" }}>⏱ {f.durata}</span>
              <span style={{ fontSize: 10, background: "rgba(255,255,255,.06)", borderRadius: 6, padding: "2px 6px", color: "var(--muted)" }}>{f.minCoppie}-{f.maxCoppie} coppie</span>
            </div>
            {value === f.id && (
              <div style={{ marginTop: 8, fontSize: 11, color: "var(--lime)", lineHeight: 1.5 }}>
                ℹ️ {f.dettaglio}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── TAB PARTITE per tutti i formati ──
function TabelloneTabV2({ t, update }) {
  const fmt = t.formato;

  // Americano
  if (fmt === "americano") {
    const am = t.americanoData;
    if (!am?.rounds?.length) return <div className="empty"><div className="empty-icon">🔄</div><div className="empty-title">AMERICANO NON AVVIATO</div></div>;

    function setScoreAm(ri, pi, field, val) {
      const v = val === "" ? null : parseInt(val) || 0;
      const rounds = am.rounds.map((r, rIdx) => rIdx !== ri ? r : {
        ...r,
        partite: r.partite.map((p, pIdx) => pIdx !== pi ? p : { ...p, [field]: v })
      });
      // Ricalcola punteggi individuali
      const punteggi = [...(am.punteggi || [])].map(pp => ({ ...pp, punti: 0, game: 0, V: 0, P: 0 }));
      rounds.forEach(r => r.partite.forEach(p => {
        if (p.s1 === null || p.s2 === null) return;
        [p.c1?.g1, p.c1?.g2].forEach(g => {
          if (!g) return;
          const idx = punteggi.findIndex(x => x.giocatore?.id === g.id);
          if (idx >= 0) { punteggi[idx].punti += p.s1; if (p.s1 > p.s2) punteggi[idx].V++; else punteggi[idx].P++; }
        });
        [p.c2?.g1, p.c2?.g2].forEach(g => {
          if (!g) return;
          const idx = punteggi.findIndex(x => x.giocatore?.id === g.id);
          if (idx >= 0) { punteggi[idx].punti += p.s2; if (p.s2 > p.s1) punteggi[idx].V++; else punteggi[idx].P++; }
        });
      }));
      update({ americanoData: { ...am, rounds, punteggi } });
    }

    return <div>
      {am.rounds.map((round, ri) => (
        <div key={ri} style={{ marginBottom: 26 }}>
          <div style={{ fontFamily: "'Russo One',sans-serif", fontSize: 14, color: "var(--lime)", marginBottom: 11 }}>ROUND {round.numero}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {round.partite.map((p, pi) => <MatchCard key={p.id} match={p} onScore={(id, f, v) => setScoreAm(ri, pi, f, v)} />)}
          </div>
        </div>
      ))}
      {am.punteggi?.length > 0 && (
        <div style={{ marginTop: 22 }}>
          <div className="section-title" style={{ marginBottom: 10 }}>🔄 CLASSIFICA AMERICANO</div>
          <div className="card" style={{ padding: 0 }}>
            {[...am.punteggi].sort((a, b) => b.punti - a.punti).map((r, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 11, padding: "10px 14px", borderBottom: "1px solid var(--border)" }}>
                <span style={{ fontFamily: "'Russo One',sans-serif", fontSize: 15, color: i < 3 ? "var(--gold)" : "var(--muted)", width: 26, textAlign: "center" }}>{["🥇", "🥈", "🥉"][i] || i + 1}</span>
                <Av nome={r.giocatore?.nome || "?"} size={30} />
                <div style={{ flex: 1, fontWeight: 700, fontSize: 13 }}>{r.giocatore?.nome}</div>
                <div style={{ display: "flex", gap: 14, fontSize: 12, color: "var(--muted)" }}>
                  <span>V: <b style={{ color: "var(--lime)" }}>{r.V}</b></span>
                  <span>P: <b style={{ color: "var(--red)" }}>{r.P}</b></span>
                </div>
                <span style={{ fontFamily: "'Russo One',sans-serif", fontSize: 20, color: "var(--lime)" }}>{r.punti} pt</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>;
  }

  // Gold/Silver/Bronze
  if (fmt === "gold_silver") {
    const gsb = t.gsbData;
    if (!gsb) return <div className="empty"><div className="empty-icon">🥇</div><div className="empty-title">GSB NON AVVIATO</div></div>;

    function setScoreGsb(gironeId, matchId, field, val) {
      const v = val === "" ? null : parseInt(val) || 0;
      const gironi = gsb.gironiSmistamento.map(g => {
        if (g.id !== gironeId) return g;
        const partite = g.partite.map(p => p.id === matchId ? { ...p, [field]: v } : p);
        return { ...g, partite, classifica: recalcGirone({ ...g, partite }) };
      });
      update({ gsbData: { ...gsb, gironiSmistamento: gironi } });
    }

    function setScoreTab(tabKey, matchId, field, val) {
      const v = val === "" ? null : parseInt(val) || 0;
      update({ gsbData: { ...gsb, [tabKey]: gsb[tabKey].map(p => p.id === matchId ? { ...p, [field]: v } : p) } });
    }

    return <div>
      {gsb.fase === "smistamento" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
            <div>
              <div className="section-title">FASE SMISTAMENTO</div>
              <div style={{ fontSize: 12, color: "var(--muted)" }}>Completa i gironi per generare i tabelloni Gold/Silver/Bronze</div>
            </div>
            <button className="btn btn-lime btn-sm" onClick={() => update({ gsbData: promuoviGSB(gsb) })}>
              🥇 Genera Tabelloni GSB →
            </button>
          </div>
          {gsb.gironiSmistamento.map(g => (
            <div key={g.id} style={{ marginBottom: 24 }}>
              <div style={{ fontFamily: "'Russo One',sans-serif", fontSize: 14, color: "var(--lime)", marginBottom: 11 }}>{g.nome}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {g.partite.map(p => <MatchCard key={p.id} match={p} onScore={(id, f, v) => setScoreGsb(g.id, id, f, v)} />)}
              </div>
            </div>
          ))}
        </div>
      )}
      {gsb.fase === "tabelloni" && (
        <div>
          {[
            { key: "tabelloneGold", label: "🥇 TABELLONE GOLD", color: "var(--gold)" },
            { key: "tabelloneSilver", label: "🥈 TABELLONE SILVER", color: "var(--silver)" },
            { key: "tabelloneBronze", label: "🥉 TABELLONE BRONZE", color: "var(--bronze)" },
          ].map(tb => (
            <div key={tb.key} style={{ marginBottom: 28 }}>
              <div style={{ fontFamily: "'Russo One',sans-serif", fontSize: 16, color: tb.color, marginBottom: 12, letterSpacing: 1 }}>{tb.label}</div>
              {gsb[tb.key]?.length > 0
                ? <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>{gsb[tb.key].map(p => <MatchCard key={p.id} match={p} onScore={(id, f, v) => setScoreTab(tb.key, id, f, v)} />)}</div>
                : <div style={{ color: "var(--muted)", fontSize: 13, padding: "10px 0" }}>Nessuna coppia in questo tabellone</div>
              }
            </div>
          ))}
        </div>
      )}
    </div>;
  }

  // Round Robin Coppie Fisse
  if (fmt === "round_robin") {
    const rr = t.rrData;
    if (!rr?.partite?.length) return <div className="empty"><div className="empty-icon">👥</div><div className="empty-title">ROUND ROBIN NON AVVIATO</div></div>;
    function setScoreRR(matchId, field, val) {
      const v = val === "" ? null : parseInt(val) || 0;
      const partite = rr.partite.map(p => p.id === matchId ? { ...p, [field]: v } : p);
      update({ rrData: recalcRoundRobin({ ...rr, partite }) });
    }
    return <div>
      <div className="section-title" style={{ marginBottom: 12 }}>PARTITE ROUND ROBIN</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
        {rr.partite.map(p => <MatchCard key={p.id} match={p} onScore={(id, f, v) => setScoreRR(id, f, v)} />)}
      </div>
      {rr.classifica?.length > 0 && (
        <div>
          <div className="section-title" style={{ marginBottom: 10 }}>CLASSIFICA</div>
          <ClassificaTable rows={rr.classifica} />
        </div>
      )}
    </div>;
  }

  // Super Tie-Break
  if (fmt === "super_tb") {
    const partite = t.partite || [];
    if (!partite.length) return <div className="empty"><div className="empty-icon">⚡</div><div className="empty-title">SUPER TIE-BREAK NON AVVIATO</div></div>;

    function setScoreSTB(matchId, field, val) {
      const v = val === "" ? null : parseInt(val) || 0;
      update({ partite: partite.map(p => p.id === matchId ? { ...p, [field]: v } : p) });
    }

    return <div>
      <div className="section-title" style={{ marginBottom: 4 }}>⚡ SUPER TIE-BREAK</div>
      <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 16 }}>Inserisci il punteggio del super tie-break (es. 10-7)</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {partite.map(p => <MatchCard key={p.id} match={p} onScore={(id, f, v) => setScoreSTB(id, f, v)} />)}
      </div>
    </div>;
  }

  // Doppio Tabellone
  if (fmt === "doppio_tab") {
    const dt = t.doppioTabData;
    if (!dt?.principale?.length) return <div className="empty"><div className="empty-icon">🏅</div><div className="empty-title">DOPPIO TABELLONE NON AVVIATO</div></div>;

    function setScoreDT(tabKey, matchId, field, val) {
      const v = val === "" ? null : parseInt(val) || 0;
      const nuove = dt[tabKey].map(p => p.id === matchId ? { ...p, [field]: v } : p);
      // Aggiungi perdenti al tabellone consolazione
      let consolazione = [...(dt.consolazione || [])];
      if (tabKey === "principale" && field === "s1" || field === "s2") {
        nuove.forEach(p => {
          if (p.s1 !== null && p.s2 !== null && !p.bye && p.c2) {
            const perdente = p.s1 < p.s2 ? p.c1 : p.c2;
            if (!consolazione.some(m => m.c1?.id === perdente?.id || m.c2?.id === perdente?.id)) {
              // Aggiungi al tabellone consolazione
            }
          }
        });
      }
      update({ doppioTabData: { ...dt, [tabKey]: nuove } });
    }

    return <div>
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontFamily: "'Russo One',sans-serif", fontSize: 15, color: "var(--lime)", marginBottom: 12, letterSpacing: 1 }}>🏆 TABELLONE PRINCIPALE</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {dt.principale.map(p => <MatchCard key={p.id} match={p} onScore={(id, f, v) => setScoreDT("principale", id, f, v)} />)}
        </div>
      </div>
      {dt.consolazione?.length > 0 && (
        <div>
          <div style={{ fontFamily: "'Russo One',sans-serif", fontSize: 15, color: "var(--bronze)", marginBottom: 12, letterSpacing: 1 }}>🥉 TABELLONE CONSOLAZIONE</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {dt.consolazione.map(p => <MatchCard key={p.id} match={p} onScore={(id, f, v) => setScoreDT("consolazione", id, f, v)} />)}
          </div>
        </div>
      )}
    </div>;
  }

  // Fallback: usa TabelloneTab originale per elim, gironi, rodeo, tappe, americano
  return <TabelloneTab t={t} update={update} />;
}

// ── AVVIA TORNEO per tutti i formati ──
function avviaTorneo(t, partecipanti) {
  const coppie = buildCoppie(partecipanti);
  let partite = [], gironi = [], rodeoData = null, tappe = [];
  let americanoData = null, gsbData = null, rrData = null, doppioTabData = null;

  switch (t.formato) {
    case "elim":
      partite = buildTabellone(coppie);
      break;
    case "gironi":
      gironi = buildGironi(coppie, Math.max(2, Math.floor(coppie.length / 3)));
      break;
    case "rodeo":
      rodeoData = buildRodeo(partecipanti);
      break;
    case "americano":
      americanoData = buildAmericano(partecipanti);
      break;
    case "gold_silver":
      gsbData = buildGoldSilverBronze(coppie);
      break;
    case "round_robin":
      rrData = buildRoundRobin(coppie);
      break;
    case "super_tb":
      partite = buildSuperTieBrk(coppie);
      break;
    case "doppio_tab":
      doppioTabData = buildDoppioTabellone(coppie);
      break;
    case "tappe":
      const tc = buildCoppie(partecipanti);
      const tg = buildGironi(tc, Math.max(2, Math.floor(tc.length / 3)));
      tappe = [{ id: uid(), numero: 1, nome: "Tappa 1", data: today(), status: "live", coppie: tc, gironi: tg, partite: [] }];
      break;
  }

  return { coppie, partite, gironi, rodeoData, tappe, americanoData, gsbData, rrData, doppioTabData };
}

// ── LOGIN ──
function LoginPage({onLogin}){
  const [mode,setMode]=useState("admin");
  const [user,setUser]=useState("");
  const [pass,setPass]=useState("");
  function doLogin(){
    if(mode==="admin"&&user==="admin"&&pass==="admin"){onLogin("admin",{id:"admin",nome:"Admin Circolo"});return;}
    if(mode==="player"){const f=DEMO_GIOCATORI.find(g=>g.email===user);if(f){onLogin("player",f);return;}}
    alert("Admin: admin/admin\nGiocatore: es. marco@test.it (qualsiasi password)");
  }
  return<div className="login-bg"><div className="court-bg"/>
    <div className="login-box">
      <div style={{textAlign:"center",marginBottom:26}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10,marginBottom:8}}><div className="logo-icon" style={{width:44,height:44,fontSize:22}}>🎾</div><div style={{fontFamily:"'Russo One',sans-serif",fontSize:26,letterSpacing:3}}>PADEL <span style={{color:"var(--lime)"}}>EVOLUTION</span></div></div>
        <div style={{color:"var(--muted)",fontSize:12}}>Piattaforma professionale per circoli di padel</div>
      </div>
      <div className="tabs" style={{marginBottom:18}}>
        <button className={`tab ${mode==="admin"?"active":""}`} onClick={()=>setMode("admin")}>⚙️ Admin</button>
        <button className={`tab ${mode==="player"?"active":""}`} onClick={()=>setMode("player")}>👤 Giocatore</button>
      </div>
      <div className="form-group"><label className="form-label">{mode==="admin"?"Username":"Email"}</label><input className="input" value={user} onChange={e=>setUser(e.target.value)} placeholder={mode==="admin"?"admin":"marco@test.it"} onKeyDown={e=>e.key==="Enter"&&doLogin()}/></div>
      <div className="form-group"><label className="form-label">Password</label><input className="input" type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="••••••••" onKeyDown={e=>e.key==="Enter"&&doLogin()}/></div>
      <button className="btn btn-lime" style={{width:"100%",justifyContent:"center",padding:"12px",fontSize:14,marginTop:6}} onClick={doLogin}>Accedi →</button>
      <div className="sep"/>
      <div style={{fontSize:11,color:"var(--muted)",textAlign:"center",lineHeight:1.8}}><b>Admin:</b> admin / admin &nbsp;|&nbsp; <b>Giocatore:</b> marco@test.it</div>
    </div>
  </div>;
}

// ── ADMIN DASHBOARD ──
function AdminDashboard({giocatori,tornei,arbitri,prenotazioni,setPage}){
  const live=tornei.filter(t=>t.status==="live");
  const pending=tornei.reduce((s,t)=>s+(t.iscritti?.filter(i=>i.status==="attesa").length||0),0);
  return<div>
    <div className="page-header"><div className="page-title">DASHBOARD<br/><span>CIRCOLO</span></div><div className="page-sub">Pannello di controllo Padel Evolution</div></div>
    <div className="stat-grid">
      {[{icon:"👥",v:giocatori.length,l:"Giocatori"},{icon:"🏆",v:tornei.length,l:"Tornei"},{icon:"🔴",v:live.length,l:"Live",c:"var(--red)"},{icon:"👔",v:arbitri.filter(a=>a.attivo).length,l:"Arbitri"},{icon:"🏟️",v:prenotazioni.filter(p=>p.data===today()).length,l:"Prenot. oggi"},{icon:"📝",v:pending,l:"Richieste",c:pending>0?"var(--orange)":undefined}].map((s,i)=><div key={i} className="stat-card"><div className="stat-icon">{s.icon}</div><div className="stat-val" style={s.c?{color:s.c}:{}}>{s.v}</div><div className="stat-lbl">{s.l}</div></div>)}
    </div>
    <div className="g2" style={{marginBottom:24}}>
      {[{icon:"🏆",t:"Gestisci Tornei",d:"Crea e gestisci eventi",p:"tornei"},{icon:"👥",t:"Giocatori",d:"Anagrafica e statistiche",p:"giocatori"},{icon:"🏟️",t:"Prenotazione Campi",d:"Calendario disponibilità",p:"campi"},{icon:"👔",t:"Arbitri",d:"Gestione referenti",p:"arbitri"},{icon:"📊",t:"Ranking",d:"Classifica stagionale",p:"ranking"},{icon:"📝",t:"Iscrizioni",d:"Richieste pendenti",p:"iscrizioni"}].map((a,i)=><div key={i} className="torneo-card" onClick={()=>setPage(a.p)}><div style={{fontSize:28,marginBottom:10}}>{a.icon}</div><div style={{fontFamily:"'Russo One',sans-serif",fontSize:14,letterSpacing:1,marginBottom:3}}>{a.t}</div><div style={{color:"var(--muted)",fontSize:12}}>{a.d}</div></div>)}
    </div>
    {live.length>0&&<div><div className="section-title">🔴 TORNEI IN CORSO</div>{live.map(t=><div key={t.id} className="card-sm" style={{display:"flex",alignItems:"center",gap:12,marginBottom:7,cursor:"pointer"}} onClick={()=>setPage("tornei")}><span style={{fontSize:20}}>{FORMATI.find(f=>f.id===t.formato)?.icon||"🏆"}</span><div style={{flex:1}}><div style={{fontWeight:700,fontSize:13.5}}>{t.nome}</div><div style={{fontSize:11.5,color:"var(--muted)"}}>{FORMATI.find(f=>f.id===t.formato)?.nome}</div></div><span className="badge b-red">● Live</span></div>)}</div>}
  </div>;
}

// ── GIOCATORI ADMIN ──
function GiocatoriAdmin({giocatori,setGiocatori,toast}){
  const [search,setSearch]=useState("");
  const [showAdd,setShowAdd]=useState(false);
  const [editId,setEditId]=useState(null);
  const [showStats,setShowStats]=useState(null);
  const [form,setForm]=useState({nome:"",livello:"3.0",lato:"Destra",mancino:false,email:"",circolo:"",puntiRanking:500,vittorie:0,sconfitte:0,partiteGiocate:0});
  const list=giocatori.filter(g=>g.nome.toLowerCase().includes(search.toLowerCase())||g.email?.toLowerCase().includes(search.toLowerCase()));
  function openAdd(){setForm({nome:"",livello:"3.0",lato:"Destra",mancino:false,email:"",circolo:"",puntiRanking:500,vittorie:0,sconfitte:0,partiteGiocate:0});setEditId(null);setShowAdd(true);}
  function save(){
    if(!form.nome.trim())return;
    if(editId)setGiocatori(g=>g.map(x=>x.id===editId?{...form,id:editId}:x));
    else setGiocatori(g=>[...g,{...form,id:uid()}]);
    toast(editId?"Aggiornato!":"Aggiunto!");setShowAdd(false);
  }
  return<div>
    <div className="page-header">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:10}}>
        <div><div className="page-title">GIOCATORI<br/><span>ANAGRAFICA</span></div><div className="page-sub">{giocatori.length} atleti</div></div>
        <button className="btn btn-lime" onClick={openAdd}>+ Nuovo</button>
      </div>
      <div style={{marginTop:12}}><input className="input" style={{maxWidth:300}} placeholder="🔍 Cerca..." value={search} onChange={e=>setSearch(e.target.value)}/></div>
    </div>
    <div className="card" style={{padding:0,overflowX:"auto"}}>
      <table className="table">
        <thead><tr><th>Giocatore</th><th>Email</th><th>Liv.</th><th>Lato</th><th>Pts</th><th></th></tr></thead>
        <tbody>{list.map(g=><tr key={g.id}>
          <td><div style={{display:"flex",alignItems:"center",gap:9}}><Av nome={g.nome} size={32}/><div><div style={{fontWeight:700,fontSize:13.5}}>{g.nome}</div><div style={{fontSize:11,color:"var(--muted)"}}>{g.circolo}</div></div></div></td>
          <td style={{color:"var(--muted)",fontSize:12.5}}>{g.email||"—"}</td>
          <td><span className="badge b-lime">{g.livello}</span></td>
          <td style={{color:"var(--muted)",fontSize:12}}>{g.lato}{g.mancino?" ✋":""}</td>
          <td><span style={{fontFamily:"'Russo One',sans-serif",fontSize:16,color:"var(--lime)"}}>{g.puntiRanking}</span></td>
          <td><div style={{display:"flex",gap:5}}>
            <button className="btn btn-sm btn-ghost" onClick={()=>setShowStats(g)}>📊</button>
            <button className="btn-icon" onClick={()=>{setForm({...g});setEditId(g.id);setShowAdd(true);}}>✏️</button>
            <button className="btn-icon" onClick={()=>{setGiocatori(x=>x.filter(p=>p.id!==g.id));toast("Rimosso");}}>🗑️</button>
          </div></td>
        </tr>)}</tbody>
      </table>
      {list.length===0&&<div className="empty"><div className="empty-icon">👤</div><div className="empty-title">NESSUN GIOCATORE</div></div>}
    </div>
    {showAdd&&<Modal title={editId?"Modifica":"Nuovo Giocatore"} onClose={()=>setShowAdd(false)} large>
      <div className="form-row"><div className="form-group"><label className="form-label">Nome</label><input className="input" value={form.nome} onChange={e=>setForm({...form,nome:e.target.value})}/></div><div className="form-group"><label className="form-label">Email</label><input className="input" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></div></div>
      <div className="form-row3"><div className="form-group"><label className="form-label">Livello</label><select className="input" value={form.livello} onChange={e=>setForm({...form,livello:e.target.value})}>{LIVELLI.map(l=><option key={l}>{l}</option>)}</select></div><div className="form-group"><label className="form-label">Lato</label><select className="input" value={form.lato} onChange={e=>setForm({...form,lato:e.target.value})}>{LATI.map(l=><option key={l}>{l}</option>)}</select></div><div className="form-group"><label className="form-label">Punti Ranking</label><input className="input" type="number" value={form.puntiRanking} onChange={e=>setForm({...form,puntiRanking:+e.target.value})}/></div></div>
      <div className="form-row3"><div className="form-group"><label className="form-label">Circolo</label><input className="input" value={form.circolo} onChange={e=>setForm({...form,circolo:e.target.value})}/></div><div className="form-group"><label className="form-label">Vittorie</label><input className="input" type="number" value={form.vittorie} onChange={e=>setForm({...form,vittorie:+e.target.value})}/></div><div className="form-group"><label className="form-label">Sconfitte</label><input className="input" type="number" value={form.sconfitte} onChange={e=>setForm({...form,sconfitte:+e.target.value})}/></div></div>
      <div className="form-group"><div className="tog-wrap"><Tog v={form.mancino} onChange={v=>setForm({...form,mancino:v})}/><span style={{fontSize:13.5}}>Mancino</span></div></div>
      <div style={{display:"flex",gap:9}}><button className="btn btn-ghost" onClick={()=>setShowAdd(false)}>Annulla</button><button className="btn btn-lime" style={{flex:1,justifyContent:"center"}} onClick={save}>{editId?"Salva":"Aggiungi"}</button></div>
    </Modal>}
    {showStats&&<StatModal g={showStats} onClose={()=>setShowStats(null)}/>}
  </div>;
}
function StatModal({g,onClose}){
  const pct=g.partiteGiocate>0?Math.round((g.vittorie/g.partiteGiocate)*100):0;
  return<Modal title="Statistiche" onClose={onClose}>
    <div style={{textAlign:"center",marginBottom:18}}><Av nome={g.nome} size={56}/><div style={{fontFamily:"'Russo One',sans-serif",fontSize:19,marginTop:10}}>{g.nome}</div><div style={{color:"var(--muted)",fontSize:12.5}}>Lv. {g.livello} · {g.lato}</div></div>
    <div className="g4" style={{marginBottom:14}}>{[{v:g.vittorie,l:"Vittorie",c:"var(--lime)"},{v:g.sconfitte,l:"Sconfitte",c:"var(--red)"},{v:g.partiteGiocate||g.vittorie+g.sconfitte,l:"Partite"},{v:`${pct}%`,l:"Win rate",c:pct>=50?"var(--lime)":"var(--red)"}].map((s,i)=><div key={i} className="stat-card"><div className="stat-val" style={s.c?{color:s.c}:{}}>{s.v}</div><div className="stat-lbl">{s.l}</div></div>)}</div>
    <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:"var(--muted)",marginBottom:5}}><span>Win rate</span><span style={{fontWeight:700,color:pct>=50?"var(--lime)":"var(--red)"}}>{pct}%</span></div>
    <div className="prog" style={{height:7,marginBottom:14}}><div className="prog-fill" style={{width:`${pct}%`}}/></div>
    <div className="card-sm" style={{display:"flex",justifyContent:"space-between"}}><div><div style={{fontSize:11,color:"var(--muted)"}}>Punti Ranking</div><div style={{fontFamily:"'Russo One',sans-serif",fontSize:22,color:"var(--lime)"}}>{g.puntiRanking}</div></div><div style={{textAlign:"right"}}><div style={{fontSize:11,color:"var(--muted)"}}>Circolo</div><div style={{fontWeight:700}}>{g.circolo||"—"}</div></div></div>
  </Modal>;
}

// ── ARBITRI ──
function ArbitriAdmin({arbitri,setArbitri,toast}){
  const [showAdd,setShowAdd]=useState(false);
  const [editId,setEditId]=useState(null);
  const [form,setForm]=useState({nome:"",livello:"Provinciale",email:"",telefono:"",torneiArbitrati:0,attivo:true});
  function save(){
    if(!form.nome.trim())return;
    if(editId)setArbitri(a=>a.map(x=>x.id===editId?{...form,id:editId}:x));
    else setArbitri(a=>[...a,{...form,id:uid()}]);
    toast(editId?"Aggiornato!":"Aggiunto!");setShowAdd(false);
  }
  return<div>
    <div className="page-header"><div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:10}}><div><div className="page-title">ARBITRI<br/><span>REFERENTI</span></div><div className="page-sub">{arbitri.length} arbitri</div></div><button className="btn btn-lime" onClick={()=>{setForm({nome:"",livello:"Provinciale",email:"",telefono:"",torneiArbitrati:0,attivo:true});setEditId(null);setShowAdd(true);}}>+ Nuovo Arbitro</button></div></div>
    <div className="g2">
      {arbitri.map(a=><div key={a.id} className="card">
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}><div style={{width:40,height:40,borderRadius:"50%",background:"rgba(77,166,255,.12)",border:"1px solid rgba(77,166,255,.3)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>👔</div><div><div style={{fontWeight:700,fontSize:14}}>{a.nome}</div><div style={{fontSize:11.5,color:"var(--muted)"}}>{a.email}</div></div></div>
          <div style={{display:"flex",gap:5}}><button className="btn-icon" onClick={()=>{setForm({...a});setEditId(a.id);setShowAdd(true);}}>✏️</button><button className="btn-icon" onClick={()=>{setArbitri(x=>x.filter(r=>r.id!==a.id));toast("Rimosso");}}>🗑️</button></div>
        </div>
        <div style={{display:"flex",gap:7,flexWrap:"wrap",marginBottom:10}}><span className="badge b-blue">{a.livello}</span><span className={`badge ${a.attivo?"b-lime":"b-gray"}`}>{a.attivo?"● Attivo":"Inattivo"}</span></div>
        <div style={{fontSize:12,color:"var(--muted)"}}>📞 {a.telefono||"—"} · 🏆 {a.torneiArbitrati} tornei</div>
      </div>)}
      {arbitri.length===0&&<div className="empty"><div className="empty-icon">👔</div><div className="empty-title">NESSUN ARBITRO</div></div>}
    </div>
    {showAdd&&<Modal title={editId?"Modifica":"Nuovo Arbitro"} onClose={()=>setShowAdd(false)}>
      <div className="form-row"><div className="form-group"><label className="form-label">Nome</label><input className="input" value={form.nome} onChange={e=>setForm({...form,nome:e.target.value})}/></div><div className="form-group"><label className="form-label">Livello</label><select className="input" value={form.livello} onChange={e=>setForm({...form,livello:e.target.value})}>{LIVELLI_ARB.map(l=><option key={l}>{l}</option>)}</select></div></div>
      <div className="form-row"><div className="form-group"><label className="form-label">Email</label><input className="input" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></div><div className="form-group"><label className="form-label">Telefono</label><input className="input" value={form.telefono} onChange={e=>setForm({...form,telefono:e.target.value})}/></div></div>
      <div className="form-group"><div className="tog-wrap"><Tog v={form.attivo} onChange={v=>setForm({...form,attivo:v})}/><span style={{fontSize:13.5}}>Attivo</span></div></div>
      <div style={{display:"flex",gap:9}}><button className="btn btn-ghost" onClick={()=>setShowAdd(false)}>Annulla</button><button className="btn btn-lime" style={{flex:1,justifyContent:"center"}} onClick={save}>{editId?"Salva":"Aggiungi"}</button></div>
    </Modal>}
  </div>;
}

// ── CAMPI ADMIN ──
function CampiAdmin({prenotazioni,setPrenotazioni,giocatori,toast}){
  const [selData,setSelData]=useState(today());
  const [showBook,setShowBook]=useState(null);
  const [form,setForm]=useState({giocatoreId:"",note:""});
  const giorni=Array.from({length:7},(_,i)=>{const d=new Date();d.setDate(d.getDate()+i);return d.toISOString().slice(0,10);});
  const getPren=(campoId,ora)=>prenotazioni.find(p=>p.campoId===campoId&&p.ora===ora&&p.data===selData);
  function prenota(){
    if(!form.giocatoreId)return;
    if(getPren(showBook.campoId,showBook.ora)){toast("Slot occupato!");return;}
    const g=giocatori.find(x=>x.id===form.giocatoreId);
    setPrenotazioni(p=>[...p,{id:uid(),campoId:showBook.campoId,ora:showBook.ora,data:selData,giocatoreId:form.giocatoreId,giocatoreNome:g?.nome||"",note:form.note}]);
    toast("Prenotazione confermata!");setShowBook(null);setForm({giocatoreId:"",note:""});
  }
  return<div>
    <div className="page-header"><div className="page-title">PRENOTAZIONE<br/><span>CAMPI</span></div><div className="page-sub">{CAMPI.length} campi · {prenotazioni.filter(p=>p.data===selData).length} prenotazioni oggi</div></div>
    <div style={{display:"flex",gap:7,overflowX:"auto",paddingBottom:8,marginBottom:18}}>
      {giorni.map(d=><button key={d} className={`btn ${selData===d?"btn-lime":"btn-ghost"}`} onClick={()=>setSelData(d)} style={{flexShrink:0}}>
        <div style={{textAlign:"center"}}><div style={{fontSize:9,opacity:.7}}>{["D","L","M","M","G","V","S"][new Date(d).getDay()]}</div><div style={{fontFamily:"'Russo One',sans-serif",fontSize:15}}>{d.slice(8)}</div></div>
      </button>)}
    </div>
    <div style={{overflowX:"auto"}}><div style={{minWidth:600,display:"grid",gridTemplateColumns:`70px repeat(${CAMPI.length},1fr)`,gap:4}}>
      <div/>
      {CAMPI.map(c=><div key={c.id} style={{textAlign:"center",fontSize:12,fontWeight:700,color:"var(--lime)",padding:"5px 0"}}>{c.nome}<div style={{fontSize:10,color:"var(--muted)",fontWeight:400}}>{c.tipo}</div></div>)}
      {ORARI.map(ora=>[
        <div key={`t-${ora}`} style={{display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:"var(--muted)",padding:"4px 0"}}>{ora}</div>,
        ...CAMPI.map(c=>{
          const p=getPren(c.id,ora);
          const occ=!!p;
          return<div key={`${c.id}-${ora}`} className="time-slot" style={{background:occ?"rgba(255,77,77,.1)":"rgba(200,241,53,.07)",border:`1px solid ${occ?"rgba(255,77,77,.25)":"var(--border2)"}`,cursor:occ?"default":"pointer"}} onClick={()=>!occ&&setShowBook({campoId:c.id,ora,campo:c.nome})}>
            <div style={{fontSize:11,fontWeight:700,color:occ?"var(--red)":"var(--lime)"}}>{occ?p.giocatoreNome?.split(" ")[0]||"Occ.":"Libero"}</div>
            {occ&&<button style={{fontSize:10,background:"none",border:"none",color:"var(--red)",cursor:"pointer"}} onClick={e=>{e.stopPropagation();setPrenotazioni(x=>x.filter(r=>r.id!==p.id));toast("Cancellata");}}>✕</button>}
          </div>;
        })
      ])}
    </div></div>
    {showBook&&<Modal title={`Prenota ${showBook.campo} · ${showBook.ora}`} onClose={()=>setShowBook(null)}>
      <div className="form-group"><label className="form-label">Giocatore</label><select className="input" value={form.giocatoreId} onChange={e=>setForm({...form,giocatoreId:e.target.value})}><option value="">Seleziona...</option>{giocatori.map(g=><option key={g.id} value={g.id}>{g.nome}</option>)}</select></div>
      <div className="form-group"><label className="form-label">Note</label><input className="input" value={form.note} onChange={e=>setForm({...form,note:e.target.value})} placeholder="Opzionale..."/></div>
      <div style={{display:"flex",gap:9}}><button className="btn btn-ghost" onClick={()=>setShowBook(null)}>Annulla</button><button className="btn btn-lime" style={{flex:1,justifyContent:"center"}} onClick={prenota}>✓ Conferma</button></div>
    </Modal>}
  </div>;
}

// ── TORNEI LIST ──
function TorneiAdmin({tornei,setTornei,giocatori,arbitri,setDetailId,toast,addNotifica}){
  const [showNew,setShowNew]=useState(false);
  const [form,setForm]=useState({nome:"",formato:"elim",data:today(),luogo:"",maxCoppie:16,quotaIscrizione:0,descrizione:"",categoria:"Misto",arbitroId:""});
  function create(){
    if(!form.nome.trim())return;
    const t={...form,id:uid(),status:"aperto",partecipanti:[],iscritti:[],coppie:[],partite:[],gironi:[],tappe:[],rodeoData:null,createdAt:new Date().toISOString()};
    setTornei(p=>[t,...p]);addNotifica({tipo:"torneo",titolo:"Torneo creato",testo:`"${t.nome}" aperto alle iscrizioni`,data:new Date().toLocaleString()});toast("Torneo creato!");setShowNew(false);setDetailId(t.id);
  }
  const fI=id=>FORMATI.find(f=>f.id===id)?.icon||"🏆";
  const fN=id=>FORMATI.find(f=>f.id===id)?.nome||id;
  const sCls={aperto:"b-lime",live:"b-red",chiuso:"b-gray",concluso:"b-blue"};
  const sLbl={aperto:"Aperto",live:"● Live",chiuso:"Chiuso",concluso:"Concluso"};
  return<div>
    <div className="page-header"><div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:10}}><div><div className="page-title">GESTIONE<br/><span>TORNEI</span></div><div className="page-sub">{tornei.length} tornei</div></div><button className="btn btn-lime" onClick={()=>setShowNew(true)}>+ Crea Torneo</button></div></div>
    {tornei.length===0?<div className="empty"><div className="empty-icon">🏆</div><div className="empty-title">NESSUN TORNEO</div></div>
    :<div className="g2">{tornei.map(t=><div key={t.id} className="torneo-card" onClick={()=>setDetailId(t.id)}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}><span style={{fontSize:28}}>{fI(t.formato)}</span><div style={{display:"flex",gap:5,alignItems:"center"}}><span className={`badge ${sCls[t.status]||"b-gray"}`}>{sLbl[t.status]||t.status}</span><button className="btn-icon" onClick={e=>{e.stopPropagation();if(!confirm("Eliminare?"))return;setTornei(x=>x.filter(r=>r.id!==t.id));toast("Eliminato");}}>🗑️</button></div></div>
      <div style={{fontFamily:"'Russo One',sans-serif",fontSize:15,letterSpacing:1,marginBottom:4}}>{t.nome}</div>
      <div style={{color:"var(--muted)",fontSize:12,marginBottom:12}}>{fN(t.formato)}{t.categoria&&` · ${t.categoria}`}</div>
      <div style={{display:"flex",gap:10,fontSize:11,color:"var(--muted)",flexWrap:"wrap"}}>
        <span>📅 {fmtDate(t.data)}</span>{t.luogo&&<span>📍 {t.luogo}</span>}{t.quotaIscrizione>0&&<span>💶 €{t.quotaIscrizione}</span>}
      </div>
      <div className="sep"/>
      <div style={{display:"flex",gap:12,fontSize:11.5}}><span style={{color:"var(--muted)"}}>👥 {t.partecipanti?.length||0}</span><span style={{color:"var(--muted)"}}>🤝 {t.coppie?.length||0}</span><span style={{color:"var(--muted)"}}>🎾 {(t.partite||[]).length+(t.gironi||[]).reduce((s,g)=>s+(g.partite||[]).length,0)}</span></div>
    </div>)}</div>}
    {showNew&&<Modal title="Crea Torneo" onClose={()=>setShowNew(false)} large>
      <div className="form-row"><div className="form-group"><label className="form-label">Nome</label><input className="input" value={form.nome} onChange={e=>setForm({...form,nome:e.target.value})} placeholder="Es. Torneo Primavera 2026"/></div><div className="form-group"><label className="form-label">Data</label><input className="input" type="date" value={form.data} onChange={e=>setForm({...form,data:e.target.value})}/></div></div>
      <div className="form-group"><FormatoSelector value={form.formato} onChange={v=>setForm({...form,formato:v})}/></div>
      <div className="form-row3"><div className="form-group"><label className="form-label">Luogo</label><input className="input" value={form.luogo} onChange={e=>setForm({...form,luogo:e.target.value})}/></div><div className="form-group"><label className="form-label">Categoria</label><select className="input" value={form.categoria} onChange={e=>setForm({...form,categoria:e.target.value})}>{CATEGORIE.map(c=><option key={c}>{c}</option>)}</select></div><div className="form-group"><label className="form-label">Quota €</label><input className="input" type="number" value={form.quotaIscrizione} onChange={e=>setForm({...form,quotaIscrizione:+e.target.value})}/></div></div>
      <div className="form-row"><div className="form-group"><label className="form-label">Max Coppie</label><input className="input" type="number" value={form.maxCoppie} onChange={e=>setForm({...form,maxCoppie:+e.target.value})}/></div><div className="form-group"><label className="form-label">Arbitro</label><select className="input" value={form.arbitroId} onChange={e=>setForm({...form,arbitroId:e.target.value})}><option value="">Nessun arbitro</option>{arbitri.filter(a=>a.attivo).map(a=><option key={a.id} value={a.id}>{a.nome} ({a.livello})</option>)}</select></div></div>
      <div className="form-group"><label className="form-label">Descrizione</label><textarea className="input" rows={2} value={form.descrizione} onChange={e=>setForm({...form,descrizione:e.target.value})} placeholder="Info, regolamento..."/></div>
      <div style={{display:"flex",gap:9}}><button className="btn btn-ghost" onClick={()=>setShowNew(false)}>Annulla</button><button className="btn btn-lime" style={{flex:1,justifyContent:"center"}} onClick={create}>Crea →</button></div>
    </Modal>}
  </div>;
}

// ── TORNEO DETAIL ──
function TorneoDetail({torneoId,tornei,setTornei,giocatori,arbitri,onBack,toast,addNotifica}){
  const [tab,setTab]=useState("iscrizioni");
  const t=tornei.find(x=>x.id===torneoId);
  if(!t)return null;
  function update(patch){setTornei(prev=>prev.map(x=>x.id===torneoId?{...x,...patch}:x));}
  const arb=arbitri.find(a=>a.id===t.arbitroId);
  const fmtNome=FORMATI.find(f=>f.id===t.formato)?.nome||t.formato;
  const fmtIcon=FORMATI.find(f=>f.id===t.formato)?.icon||"🏆";

  function avvia(){
    const risultato=avviaTorneo(t,t.partecipanti||[]);
    update({status:"live",...risultato});
    addNotifica({tipo:"torneo",titolo:"Torneo avviato",testo:`"${t.nome}" è ora live`,data:new Date().toLocaleString()});
    toast("Torneo avviato!");setTab("tabellone");
  }

  const noClassifica=["rodeo","americano"];
  const noCoppie=["rodeo","americano","round_robin","super_tb","doppio_tab","gold_silver"];
  const tabList=t.formato==="tappe"
    ?[{id:"iscrizioni",l:"👥 Partecipanti"},{id:"tappe",l:"📅 Tappe"},{id:"classifica",l:"📊 Classifica"}]
    :[
      {id:"iscrizioni",l:"👥 Partecipanti"},
      ...(!noCoppie.includes(t.formato)?[{id:"coppie",l:"🤝 Coppie"}]:[]),
      {id:"tabellone",l:`${FORMATI.find(f=>f.id===t.formato)?.icon||"🎾"} Partite`},
      ...(!noClassifica.includes(t.formato)?[{id:"classifica",l:"📊 Classifica"}]:[]),
    ];

  return<div>
    <button className="btn btn-ghost btn-sm no-print" onClick={onBack} style={{marginBottom:16}}>← Tornei</button>
    <div className="glass" style={{marginBottom:20,position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",right:16,bottom:-16,fontSize:90,opacity:.04}}>{fmtIcon}</div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:12}}>
        <div>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}><span style={{fontSize:24}}>{fmtIcon}</span><span style={{fontSize:10,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:"var(--lime)"}}>{fmtNome}</span></div>
          <div style={{fontFamily:"'Russo One',sans-serif",fontSize:22,letterSpacing:1}}>{t.nome}</div>
          <div style={{color:"var(--muted)",fontSize:12,marginTop:5}}>📅 {fmtDate(t.data)}{t.luogo&&` · 📍 ${t.luogo}`}{t.categoria&&` · ${t.categoria}`}{t.quotaIscrizione>0&&` · 💶 €${t.quotaIscrizione}`}{arb&&` · 👔 ${arb.nome}`}</div>
          {t.descrizione&&<div style={{fontSize:12,color:"var(--muted)",marginTop:5,fontStyle:"italic"}}>{t.descrizione}</div>}
        </div>
        <div style={{display:"flex",gap:7,flexWrap:"wrap"}} className="no-print">
          {t.status==="aperto"&&<button className="btn btn-ghost btn-sm" onClick={()=>update({status:"chiuso"})}>🔒 Chiudi iscrizioni</button>}
          {(t.status==="aperto"||t.status==="chiuso")&&(t.partecipanti||[]).length>=4&&<button className="btn btn-lime btn-sm" onClick={avvia}>🚀 Avvia</button>}
          {t.status==="live"&&<><button className="btn btn-outline btn-sm" onClick={()=>window.print()}>🖨️ Stampa</button><button className="btn btn-ghost btn-sm" onClick={()=>{update({status:"concluso"});toast("Torneo concluso!");}}>✅ Concludi</button></>}
        </div>
      </div>
      <div style={{display:"flex",gap:9,flexWrap:"wrap",marginTop:14}}>
        {[{n:t.partecipanti?.length||0,l:"Partecipanti"},{n:t.coppie?.length||0,l:"Coppie"},{n:(t.partite||[]).length+(t.gironi||[]).reduce((s,g)=>s+(g.partite||[]).length,0)+(t.tappe||[]).reduce((s,tp)=>s+(tp.gironi||[]).reduce((ss,g)=>ss+(g.partite||[]).length,0),0),l:"Partite"},{n:(t.iscritti||[]).filter(i=>i.status==="attesa").length,l:"In attesa"}].map((s,i)=><div key={i} style={{background:"rgba(0,0,0,.3)",borderRadius:8,padding:"6px 13px",display:"flex",alignItems:"center",gap:6}}><span style={{fontFamily:"'Russo One',sans-serif",fontSize:18,color:"var(--lime)"}}>{s.n}</span><span style={{fontSize:11,color:"var(--muted)"}}>{s.l}</span></div>)}
      </div>
    </div>
    <div className="tabs no-print">{tabList.map(tb=><button key={tb.id} className={`tab ${tab===tb.id?"active":""}`} onClick={()=>setTab(tb.id)}>{tb.l}</button>)}</div>
    {tab==="iscrizioni"&&<IscrizioniTab t={t} giocatori={giocatori} update={update} toast={toast} addNotifica={addNotifica}/>}
    {tab==="coppie"&&<CoppieTab t={t} update={update} toast={toast}/>}
    {tab==="tabellone"&&<TabelloneTabV2 t={t} update={update}/>}
    {tab==="classifica"&&<ClassificaTab t={t}/>}
    {tab==="rodeo"&&<RodeoTab t={t} update={update}/>}
    {tab==="tappe"&&<TappeTab t={t} update={update} toast={toast}/>}
  </div>;
}

function IscrizioniTab({t,giocatori,update,toast,addNotifica}){
  const isSel=id=>(t.partecipanti||[]).some(p=>p.id===id);
  const pending=(t.iscritti||[]).filter(i=>i.status==="attesa");
  function approva(iscId){
    const isc=(t.iscritti||[]).find(i=>i.id===iscId);const g=giocatori.find(x=>x.id===isc?.giocatoreId);
    const nuoviPart=g&&!isSel(g.id)?[...(t.partecipanti||[]),g]:t.partecipanti||[];
    update({partecipanti:nuoviPart,iscritti:(t.iscritti||[]).map(i=>i.id===iscId?{...i,status:"approvata"}:i)});
    addNotifica({tipo:"iscrizione",titolo:"Approvata",testo:`${g?.nome} aggiunto a "${t.nome}"`,data:new Date().toLocaleString()});toast("Approvata!");
  }
  return<div>
    {pending.length>0&&<div style={{marginBottom:20}}>
      <div className="section-title" style={{color:"var(--orange)",marginBottom:10}}>⏳ IN ATTESA ({pending.length})</div>
      {pending.map(isc=>{const g=giocatori.find(x=>x.id===isc.giocatoreId);return<div key={isc.id} className="card-sm" style={{display:"flex",alignItems:"center",gap:11,marginBottom:8}}>
        <Av nome={g?.nome||"?"} size={32}/><div style={{flex:1}}><div style={{fontWeight:700,fontSize:13.5}}>{g?.nome||"?"}</div><div style={{fontSize:11.5,color:"var(--muted)"}}>{g?.email}{isc.partner&&` · con ${isc.partner}`}{isc.categoria&&` · ${isc.categoria}`}</div></div>
        <div style={{display:"flex",gap:6}}><button className="btn btn-lime btn-sm" onClick={()=>approva(isc.id)}>✓</button><button className="btn btn-red btn-sm" onClick={()=>update({iscritti:(t.iscritti||[]).map(i=>i.id===isc.id?{...i,status:"rifiutata"}:i)})}>✕</button></div>
      </div>;})}
      <div className="sep"/>
    </div>}
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12,flexWrap:"wrap",gap:8}}>
      <div className="section-title">PARTECIPANTI ({(t.partecipanti||[]).length})</div>
      <div style={{display:"flex",gap:7}}><button className="btn btn-ghost btn-sm" onClick={()=>update({partecipanti:[]})}>Desel. tutti</button><button className="btn btn-ghost btn-sm" onClick={()=>update({partecipanti:[...giocatori]})}>Sel. tutti</button></div>
    </div>
    <div style={{marginBottom:12}}><div className="prog"><div className="prog-fill" style={{width:`${Math.min(100,((t.partecipanti||[]).length/((t.maxCoppie||16)*2))*100)}%`}}/></div></div>
    <div className="card" style={{padding:0,overflow:"hidden"}}>
      {giocatori.map(g=><div key={g.id} onClick={()=>{const curr=t.partecipanti||[];isSel(g.id)?update({partecipanti:curr.filter(p=>p.id!==g.id)}):update({partecipanti:[...curr,g]});}} style={{display:"flex",alignItems:"center",gap:11,padding:"10px 14px",borderBottom:"1px solid var(--border)",cursor:"pointer",background:isSel(g.id)?"rgba(200,241,53,.05)":"transparent",transition:"background .15s"}}>
        <div style={{width:17,height:17,borderRadius:4,border:`1.5px solid ${isSel(g.id)?"var(--lime)":"var(--border)"}`,background:isSel(g.id)?"var(--lime)":"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{isSel(g.id)&&<span style={{fontSize:9,color:"var(--dark)",fontWeight:800}}>✓</span>}</div>
        <Av nome={g.nome} size={28}/><div style={{flex:1}}><div style={{fontWeight:600,fontSize:13}}>{g.nome}</div><div style={{fontSize:11,color:"var(--muted)"}}>{g.email}</div></div>
        <div style={{display:"flex",gap:7,fontSize:11}}><span className="badge b-lime">Lv.{g.livello}</span><span style={{color:"var(--muted)"}}>{g.lato}</span><span style={{fontFamily:"'Russo One',sans-serif",color:"var(--lime)",fontSize:13}}>{g.puntiRanking}</span></div>
      </div>)}
    </div>
  </div>;
}

function CoppieTab({t,update,toast}){
  function rigenera(){if((t.partecipanti||[]).length<4){toast("Min 4 partecipanti!");return;}update({coppie:buildCoppie(t.partecipanti)});toast("Coppie rigenerate!");}
  const coppie=t.coppie||[];
  return<div>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,flexWrap:"wrap",gap:8}}>
      <div className="section-title">COPPIE ({coppie.length})</div>
      <button className="btn btn-outline" onClick={rigenera}>🎲 Rigenera</button>
    </div>
    {coppie.length===0?<div className="empty"><div className="empty-icon">🎲</div><div className="empty-title">NESSUNA COPPIA</div></div>
    :<div className="g2">{coppie.map((c,i)=><div key={c.id} className="card-sm"><div style={{display:"flex",justifyContent:"space-between",marginBottom:9}}><span style={{fontSize:10,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:"var(--muted)"}}>Coppia {i+1}</span><span className="badge b-lime">Lv. {c.livello}</span></div><div style={{display:"flex",alignItems:"center",gap:7}}><div style={{flex:1}}><div style={{fontWeight:700,fontSize:13}}>{c.g1.nome}</div><div style={{fontSize:11,color:"var(--muted)"}}>{c.g1.lato}</div></div><div style={{color:"var(--lime)",fontWeight:700,fontSize:11}}>⟷</div><div style={{flex:1,textAlign:"right"}}><div style={{fontWeight:700,fontSize:13}}>{c.g2.nome}</div><div style={{fontSize:11,color:"var(--muted)"}}>{c.g2.lato}</div></div></div></div>)}</div>}
  </div>;
}

function MatchCard({match,onScore}){
  if(match.bye)return<div className="match-card" style={{opacity:.55}}><div style={{display:"flex",alignItems:"center",gap:10}}><div style={{flex:1,fontWeight:700,fontSize:13}}>{match.c1?.g1?.nome} / {match.c1?.g2?.nome}</div><span className="badge b-gold">BYE</span></div></div>;
  if(!match.c2)return null;
  const done=match.s1!==null&&match.s2!==null,w1=done&&match.s1>match.s2,w2=done&&match.s2>match.s1;
  return<div className="match-card">
    {match.campo&&<div style={{fontSize:10,color:"var(--muted)",marginBottom:6,fontWeight:600,letterSpacing:1}}>🏟️ {match.campo}</div>}
    <div className="match-grid">
      <div style={{textAlign:"left"}}><div style={{fontWeight:700,fontSize:12.5,color:w1?"var(--lime)":w2?"var(--muted)":"var(--text)"}}>{match.c1?.g1?.nome}<br/>{match.c1?.g2?.nome}</div><div style={{fontSize:10.5,color:"var(--muted)"}}>Lv.{match.c1?.livello}</div></div>
      <div className="match-vs">VS</div>
      <div style={{textAlign:"right"}}><div style={{fontWeight:700,fontSize:12.5,color:w2?"var(--lime)":w1?"var(--muted)":"var(--text)"}}>{match.c2?.g1?.nome}<br/>{match.c2?.g2?.nome}</div><div style={{fontSize:10.5,color:"var(--muted)"}}>Lv.{match.c2?.livello}</div></div>
    </div>
    <div className="score-row">
      <input className="input score-inp" type="number" min="0" max="99" value={match.s1===null?"":match.s1} onChange={e=>onScore(match.id,"s1",e.target.value)} placeholder="–"/>
      <span className="score-sep">:</span>
      <input className="input score-inp" type="number" min="0" max="99" value={match.s2===null?"":match.s2} onChange={e=>onScore(match.id,"s2",e.target.value)} placeholder="–"/>
    </div>
  </div>;
}

function TabelloneTab({t,update}){
  const isGironi=(t.gironi||[]).length>0;
  function setScore(matchId,field,val,gironeId=null){
    const v=val===""?null:parseInt(val)||0;
    if(gironeId!==null){
      const gironi=(t.gironi||[]).map(g=>{if(g.id!==gironeId)return g;const partite=g.partite.map(p=>p.id===matchId?{...p,[field]:v}:p);return{...g,partite,classifica:recalcGirone({...g,partite})};});
      update({gironi});
    } else update({partite:(t.partite||[]).map(p=>p.id===matchId?{...p,[field]:v}:p)});
  }
  if(!isGironi&&(t.partite||[]).length===0)return<div className="empty"><div className="empty-icon">🎾</div><div className="empty-title">PARTITE NON GENERATE</div><div className="empty-sub">Avvia il torneo</div></div>;
  return<div>
    {isGironi
      ?(t.gironi||[]).map(g=><div key={g.id} style={{marginBottom:26}}><div style={{fontFamily:"'Russo One',sans-serif",fontSize:14,color:"var(--lime)",marginBottom:11,letterSpacing:1}}>{g.nome}</div><div style={{display:"flex",flexDirection:"column",gap:8}}>{g.partite.map(p=><MatchCard key={p.id} match={p} onScore={(id,f,v)=>setScore(id,f,v,g.id)}/>)}</div></div>)
      :<div><div className="section-title" style={{marginBottom:11}}>TABELLONE — ROUND 1</div><div style={{display:"flex",flexDirection:"column",gap:8}}>{(t.partite||[]).map(p=><MatchCard key={p.id} match={p} onScore={(id,f,v)=>setScore(id,f,v,null)}/>)}</div></div>
    }
  </div>;
}

function RodeoTab({t,update}){
  const rd=t.rodeoData;
  function setScore(ri,pi,field,val){
    if(!rd)return;
    const rounds=rd.rounds.map((r,rIdx)=>rIdx!==ri?r:{...r,partite:r.partite.map((p,pIdx)=>pIdx!==pi?p:{...p,[field]:val===""?null:parseInt(val)||0})});
    const punteggi=[...(rd.punteggi||[])].map(pp=>({...pp,punti:0,V:0}));
    rounds.forEach(r=>r.partite.forEach(p=>{
      if(p.s1===null||p.s2===null)return;
      [p.c1?.g1,p.c1?.g2].forEach(g=>{if(!g)return;const idx=punteggi.findIndex(x=>x.giocatore?.id===g.id);if(idx>=0){punteggi[idx].punti+=p.s1;if(p.s1>p.s2)punteggi[idx].V++;}});
      [p.c2?.g1,p.c2?.g2].forEach(g=>{if(!g)return;const idx=punteggi.findIndex(x=>x.giocatore?.id===g.id);if(idx>=0){punteggi[idx].punti+=p.s2;if(p.s2>p.s1)punteggi[idx].V++;}});
    }));
    update({rodeoData:{...rd,rounds,punteggi}});
  }
  if(!rd?.rounds?.length)return<div className="empty"><div className="empty-icon">🎠</div><div className="empty-title">RODEO NON AVVIATO</div></div>;
  return<div>
    {rd.rounds.map((round,ri)=><div key={ri} style={{marginBottom:26}}><div style={{fontFamily:"'Russo One',sans-serif",fontSize:14,color:"var(--lime)",marginBottom:11}}>ROUND {round.numero}</div><div style={{display:"flex",flexDirection:"column",gap:8}}>{round.partite.map((p,pi)=><MatchCard key={p.id} match={p} onScore={(id,f,v)=>setScore(ri,pi,f,v)}/>)}</div></div>)}
    {rd.punteggi?.length>0&&<div style={{marginTop:22}}><div className="section-title" style={{marginBottom:10}}>CLASSIFICA RODEO</div><div className="card" style={{padding:0}}>{[...rd.punteggi].sort((a,b)=>b.punti-a.punti).map((r,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:11,padding:"10px 14px",borderBottom:"1px solid var(--border)"}}><span style={{fontFamily:"'Russo One',sans-serif",fontSize:15,color:i<3?"var(--gold)":"var(--muted)",width:26,textAlign:"center"}}>{["🥇","🥈","🥉"][i]||i+1}</span><Av nome={r.giocatore?.nome||"?"} size={30}/><div style={{flex:1,fontWeight:700,fontSize:13}}>{r.giocatore?.nome}</div><span style={{fontFamily:"'Russo One',sans-serif",fontSize:18,color:"var(--lime)"}}>{r.punti} pt</span></div>)}</div></div>}
  </div>;
}

function TappeTab({t,update,toast}){
  const tappe=t.tappe||[];
  function addTappa(){
    const n=tappe.length+1;
    const tc=buildCoppie(t.partecipanti||[]);
    const tg=buildGironi(tc,Math.max(2,Math.floor(tc.length/3)));
    const tappa={id:uid(),numero:n,nome:`Tappa ${n}`,data:today(),status:"live",coppie:tc,gironi:tg,partite:[]};
    update({tappe:[...tappe,tappa]});toast(`Tappa ${n} aggiunta!`);
  }
  function setScoreTappa(tappaId,gironeId,matchId,field,val){
    const v=val===""?null:parseInt(val)||0;
    update({tappe:tappe.map(tp=>{if(tp.id!==tappaId)return tp;const gironi=tp.gironi.map(g=>{if(g.id!==gironeId)return g;const partite=g.partite.map(p=>p.id===matchId?{...p,[field]:v}:p);return{...g,partite,classifica:recalcGirone({...g,partite})};});return{...tp,gironi};})});
  }
  const cumul={};
  tappe.forEach(tp=>{(tp.gironi||[]).forEach(g=>{g.classifica.forEach((r,i)=>{const bonus=[10,7,5,3,2][i]||1;[r.coppia?.g1,r.coppia?.g2].forEach(gj=>{if(!gj)return;if(!cumul[gj.id])cumul[gj.id]={giocatore:gj,pts:0,tappe:0};cumul[gj.id].pts+=r.Pts+bonus;cumul[gj.id].tappe++;});});});});
  const sortedCumul=Object.values(cumul).sort((a,b)=>b.pts-a.pts);
  return<div>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,flexWrap:"wrap",gap:8}}><div className="section-title">CAMPIONATO A TAPPE ({tappe.length})</div><button className="btn btn-lime btn-sm" onClick={addTappa}>+ Tappa</button></div>
    {tappe.map(tp=><div key={tp.id} style={{marginBottom:26}}>
      <div style={{fontFamily:"'Russo One',sans-serif",fontSize:15,color:"var(--lime)",marginBottom:12}}>{tp.nome} <span style={{fontSize:11,color:"var(--muted)",fontFamily:"'Outfit',sans-serif"}}>{fmtDate(tp.data)}</span></div>
      {(tp.gironi||[]).map(g=><div key={g.id} style={{marginBottom:18}}>
        <div style={{fontSize:12.5,fontWeight:700,color:"var(--muted)",marginBottom:9,letterSpacing:1}}>{g.nome}</div>
        <div style={{display:"flex",flexDirection:"column",gap:7}}>{g.partite.map(p=><MatchCard key={p.id} match={p} onScore={(id,f,v)=>setScoreTappa(tp.id,g.id,id,f,v)}/>)}</div>
        {g.classifica.length>0&&<div style={{marginTop:9,padding:"10px 14px",background:"var(--card2)",borderRadius:9}}>
          <div style={{fontSize:10,fontWeight:700,color:"var(--muted)",letterSpacing:1,marginBottom:7}}>CLASSIFICA {g.nome}</div>
          {g.classifica.map((r,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:9,marginBottom:4,fontSize:12.5}}><span style={{color:i===0?"var(--gold)":i===1?"var(--silver)":i===2?"var(--bronze)":"var(--muted)",fontFamily:"'Russo One',sans-serif",width:20,textAlign:"center"}}>{i+1}</span><span style={{flex:1,fontWeight:600}}>{r.coppia?.g1?.nome?.split(" ")[0]} / {r.coppia?.g2?.nome?.split(" ")[0]}</span><span style={{fontFamily:"'Russo One',sans-serif",color:"var(--lime)"}}>{r.Pts}pt</span></div>)}
        </div>}
      </div>)}
    </div>)}
    {sortedCumul.length>0&&<div style={{marginTop:24}}><div className="section-title" style={{marginBottom:10}}>🏆 CLASSIFICA CUMULATIVA</div><div className="card" style={{padding:0}}>{sortedCumul.map((r,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:11,padding:"10px 14px",borderBottom:"1px solid var(--border)"}}><span style={{fontFamily:"'Russo One',sans-serif",fontSize:15,color:i===0?"var(--gold)":i===1?"var(--silver)":i===2?"var(--bronze)":"var(--muted)",width:26,textAlign:"center"}}>{["🥇","🥈","🥉"][i]||i+1}</span><Av nome={r.giocatore?.nome||"?"} size={30}/><div style={{flex:1}}><div style={{fontWeight:700,fontSize:13}}>{r.giocatore?.nome}</div><div style={{fontSize:10.5,color:"var(--muted)"}}>{r.tappe} tappe</div></div><span style={{fontFamily:"'Russo One',sans-serif",fontSize:20,color:"var(--lime)"}}>{r.pts}pt</span></div>)}</div></div>}
    {tappe.length===0&&<div className="empty"><div className="empty-icon">📅</div><div className="empty-title">NESSUNA TAPPA</div></div>}
  </div>;
}

function ClassificaTab({t}){
  if(t.formato==="rodeo")return<div style={{textAlign:"center",padding:"40px 0",color:"var(--muted)"}}>Classifica nel tab Rodeo</div>;
  if(t.formato==="tappe")return<div style={{textAlign:"center",padding:"40px 0",color:"var(--muted)"}}>Classifica cumulativa nel tab Tappe</div>;
  const isGironi=(t.gironi||[]).length>0;
  if(!isGironi){
    const stats={};
    (t.coppie||[]).forEach(c=>stats[c.id]={coppia:c,V:0,P:0,GF:0,GS:0,Pts:0});
    (t.partite||[]).forEach(p=>{if(p.s1===null||p.s2===null||p.bye||!p.c2)return;if(!stats[p.c1.id])stats[p.c1.id]={coppia:p.c1,V:0,P:0,GF:0,GS:0,Pts:0};if(!stats[p.c2.id])stats[p.c2.id]={coppia:p.c2,V:0,P:0,GF:0,GS:0,Pts:0};stats[p.c1.id].GF+=p.s1;stats[p.c1.id].GS+=p.s2;stats[p.c2.id].GF+=p.s2;stats[p.c2.id].GS+=p.s1;if(p.s1>p.s2){stats[p.c1.id].V++;stats[p.c1.id].Pts+=3;stats[p.c2.id].P++;}else if(p.s2>p.s1){stats[p.c2.id].V++;stats[p.c2.id].Pts+=3;stats[p.c1.id].P++;}});
    return<ClassificaTable rows={Object.values(stats).sort((a,b)=>b.Pts-a.Pts)}/>;
  }
  return<div>{(t.gironi||[]).map(g=><div key={g.id} style={{marginBottom:22}}><div style={{fontFamily:"'Russo One',sans-serif",fontSize:14,color:"var(--lime)",marginBottom:9,letterSpacing:1}}>{g.nome}</div><ClassificaTable rows={g.classifica}/></div>)}</div>;
}
function ClassificaTable({rows}){
  if(!rows?.length)return<div className="empty" style={{padding:"24px 0"}}><div className="empty-sub">Inserisci risultati</div></div>;
  const m=["🥇","🥈","🥉"];
  return<div className="card" style={{padding:0}}>
    <div className="rank-row" style={{background:"transparent",borderBottom:"1px solid var(--border)"}}>{["#","Coppia","V","P","GF","GS","PTS"].map(h=><span key={h} style={{fontSize:9.5,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",color:"var(--muted)",textAlign:"center"}}>{h}</span>)}</div>
    {rows.map((r,i)=><div key={r.coppia?.id||i} className="rank-row"><div style={{fontFamily:"'Russo One',sans-serif",fontSize:15,textAlign:"center",color:i===0?"var(--gold)":i===1?"var(--silver)":i===2?"var(--bronze)":"var(--muted)"}}>{m[i]||i+1}</div><div><div style={{fontWeight:700,fontSize:12.5}}>{r.coppia?.g1?.nome?.split(" ")[0]} / {r.coppia?.g2?.nome?.split(" ")[0]}</div><div style={{fontSize:10,color:"var(--muted)"}}>Lv.{r.coppia?.livello}</div></div><div style={{textAlign:"center",color:"var(--lime)",fontWeight:700}}>{r.V||0}</div><div style={{textAlign:"center",color:"var(--red)"}}>{r.P||0}</div><div style={{textAlign:"center",color:"var(--muted)"}}>{r.GF||0}</div><div style={{textAlign:"center",color:"var(--muted)"}}>{r.GS||0}</div><div className="rank-pts">{r.Pts||0}</div></div>)}
  </div>;
}

function RankingAdmin({giocatori}){
  const sorted=[...giocatori].sort((a,b)=>(b.puntiRanking||0)-(a.puntiRanking||0));
  const m=["🥇","🥈","🥉"];
  return<div>
    <div className="page-header"><div className="page-title">RANKING<br/><span>STAGIONALE</span></div></div>
    <div className="card" style={{padding:0}}>
      {sorted.map((g,i)=><div key={g.id} style={{display:"flex",alignItems:"center",gap:11,padding:"10px 14px",borderBottom:"1px solid rgba(200,241,53,.05)"}}><div style={{width:28,textAlign:"center",fontFamily:"'Russo One',sans-serif",fontSize:15,color:i<3?"var(--gold)":"var(--muted)"}}>{m[i]||i+1}</div><Av nome={g.nome} size={32}/><div style={{flex:1}}><div style={{fontWeight:700,fontSize:13.5}}>{g.nome}</div><div style={{fontSize:11,color:"var(--muted)"}}>{g.circolo}</div></div><span className="badge b-lime">Lv.{g.livello}</span><span style={{fontFamily:"'Russo One',sans-serif",fontSize:20,color:"var(--lime)"}}>{g.puntiRanking}</span></div>)}
    </div>
  </div>;
}

function IscrizioniAdmin({tornei,setTornei,giocatori,toast,addNotifica}){
  const aperti=tornei.filter(t=>t.status==="aperto"&&(t.iscritti||[]).some(i=>i.status==="attesa"));
  return<div>
    <div className="page-header"><div className="page-title">ISCRIZIONI<br/><span>PENDENTI</span></div></div>
    {aperti.length===0?<div className="empty"><div className="empty-icon">✅</div><div className="empty-title">TUTTO IN ORDINE</div><div className="empty-sub">Nessuna richiesta pendente</div></div>
    :aperti.map(t=><div key={t.id} className="card" style={{marginBottom:14}}>
      <div style={{fontFamily:"'Russo One',sans-serif",fontSize:15,letterSpacing:1,marginBottom:12}}>{t.nome}</div>
      {(t.iscritti||[]).filter(i=>i.status==="attesa").map(isc=>{const g=giocatori.find(x=>x.id===isc.giocatoreId);return<div key={isc.id} style={{display:"flex",alignItems:"center",gap:11,padding:"9px 0",borderBottom:"1px solid var(--border)"}}>
        <Av nome={g?.nome||"?"} size={30}/><div style={{flex:1}}><div style={{fontWeight:700,fontSize:13}}>{g?.nome}</div><div style={{fontSize:11,color:"var(--muted)"}}>{isc.partner&&`Con: ${isc.partner}`}{isc.categoria&&` · ${isc.categoria}`}</div></div>
        <div style={{display:"flex",gap:6}}>
          <button className="btn btn-lime btn-sm" onClick={()=>{setTornei(prev=>prev.map(x=>x.id===t.id?{...x,iscritti:x.iscritti.map(i=>i.id===isc.id?{...i,status:"approvata"}:i),partecipanti:g?[...(x.partecipanti||[]),g]:x.partecipanti}:x));addNotifica({tipo:"iscrizione",titolo:"Approvata",testo:`${g?.nome} approvato`,data:new Date().toLocaleString()});toast("Approvata!");}}>✓</button>
          <button className="btn btn-red btn-sm" onClick={()=>{setTornei(prev=>prev.map(x=>x.id===t.id?{...x,iscritti:x.iscritti.map(i=>i.id===isc.id?{...i,status:"rifiutata"}:i)}:x));toast("Rifiutata");}}>✕</button>
        </div>
      </div>;})}
    </div>)}
  </div>;
}

// ── ADMIN SHELL ──
function AdminShell({user,onLogout,giocatori,setGiocatori,tornei,setTornei,arbitri,setArbitri,prenotazioni,setPrenotazioni,notifiche,setNotifiche}){
  const [page,setPage]=useState("dashboard");
  const [detailId,setDetailId]=useState(null);
  const [toastMsg,setToastMsg]=useState(null);
  function toast(msg){setToastMsg(msg);}
  function addNotifica(n){setNotifiche(prev=>[{...n,id:uid(),letta:false},...prev].slice(0,50));}
  function goPage(p){setPage(p);setDetailId(null);}
  const pending=tornei.reduce((s,t)=>s+(t.iscritti?.filter(i=>i.status==="attesa").length||0),0);
  const navSecs=[
    {sec:"Principale",items:[{id:"dashboard",icon:"🏠",label:"Dashboard"},{id:"tornei",icon:"🏆",label:"Tornei"},{id:"iscrizioni",icon:"📝",label:"Iscrizioni",badge:pending}]},
    {sec:"Atleti",items:[{id:"giocatori",icon:"👥",label:"Giocatori"},{id:"ranking",icon:"📊",label:"Ranking ELO"}]},
    {sec:"Struttura",items:[{id:"campi",icon:"🏟️",label:"Campi & Tariffe"},{id:"arbitri",icon:"👔",label:"Arbitri"},{id:"qr",icon:"📷",label:"QR Refertazione"},{id:"tv",icon:"📺",label:"TV Live"}]},
    {sec:"Business",items:[{id:"ai",icon:"🤖",label:"AI Engine"},{id:"sponsor",icon:"🎨",label:"Sponsor & WL"}]},
  ];
  return<div className="app">
    <div className="topbar">
      <div className="logo" onClick={()=>goPage("dashboard")}><div className="logo-icon">🎾</div><div className="logo-text">PADEL <span>EVOLUTION</span></div></div>
      <div className="topbar-right">
        <span style={{fontSize:10.5,fontWeight:700,letterSpacing:1.5,padding:"3px 9px",borderRadius:20,background:"rgba(200,241,53,.12)",color:"var(--lime)",border:"1px solid var(--border2)"}}>ADMIN</span>
        <NotifBell notifiche={notifiche} setNotifiche={setNotifiche}/>
        <div style={{display:"flex",alignItems:"center",gap:7,background:"var(--card)",border:"1px solid var(--border)",borderRadius:50,padding:"4px 11px 4px 6px",cursor:"pointer",fontSize:13,fontWeight:600}} onClick={onLogout}><Av nome={user.nome} size={22}/>{user.nome.split(" ")[0]} · Esci</div>
      </div>
    </div>
    <div className="app-body">
      <aside className="sidebar">
        {navSecs.map(sec=><div key={sec.sec}><div className="sidebar-sec">{sec.sec}</div>{sec.items.map(item=><div key={item.id} className={`nav-item ${(page===item.id||(page==="detail"&&item.id==="tornei"))?"active":""}`} onClick={()=>goPage(item.id)}><span className="nav-icon">{item.icon}</span>{item.label}{item.badge>0&&<span className="nav-badge">{item.badge}</span>}</div>)}</div>)}
        <div className="sidebar-bottom"><div className="nav-item" onClick={onLogout}><span className="nav-icon">🚪</span>Esci</div></div>
      </aside>
      <main className="content">
        {page==="dashboard"&&<AdminDashboard giocatori={giocatori} tornei={tornei} arbitri={arbitri} prenotazioni={prenotazioni} setPage={goPage}/>}
        {page==="tornei"&&<TorneiAdmin tornei={tornei} setTornei={setTornei} giocatori={giocatori} arbitri={arbitri} setDetailId={id=>{setDetailId(id);setPage("detail");}} toast={toast} addNotifica={addNotifica}/>}
        {page==="giocatori"&&<GiocatoriAdmin giocatori={giocatori} setGiocatori={setGiocatori} toast={toast}/>}
        {page==="ranking"&&<RankingELO giocatori={giocatori} setGiocatori={setGiocatori} tornei={tornei} toast={toast}/>}
        {page==="iscrizioni"&&<IscrizioniAdmin tornei={tornei} setTornei={setTornei} giocatori={giocatori} toast={toast} addNotifica={addNotifica}/>}
        {page==="campi"&&<CampiAvanzati prenotazioni={prenotazioni} setPrenotazioni={setPrenotazioni} giocatori={giocatori} toast={toast}/>}
        {page==="arbitri"&&<ArbitriAdmin arbitri={arbitri} setArbitri={setArbitri} toast={toast}/>}
        {page==="qr"&&<QRRefertazione tornei={tornei} setTornei={setTornei} toast={toast}/>}
        {page==="tv"&&<TVScreenLive tornei={tornei} circolo={user.circolo}/>}
        {page==="ai"&&<AIEngine circolo={user.circolo} giocatori={giocatori} tornei={tornei}/>}
        {page==="sponsor"&&<SponsorWhiteLabel circolo={user.circolo} toast={toast}/>}
        {page==="detail"&&detailId&&<TorneoDetail torneoId={detailId} tornei={tornei} setTornei={setTornei} giocatori={giocatori} arbitri={arbitri} onBack={()=>goPage("tornei")} toast={toast} addNotifica={addNotifica}/>}
      </main>
    </div>
    {toastMsg&&<Toast msg={toastMsg} onDone={()=>setToastMsg(null)}/>}
  </div>;
}

// ── PLAYER VIEW ──
function PlayerView({user,tornei,setTornei,giocatori,prenotazioni,setPrenotazioni,notifiche,setNotifiche}){
  const [page,setPage]=useState("home");
  const [toastMsg,setToastMsg]=useState(null);
  function toast(msg){setToastMsg(msg);}
  const mioRank=[...giocatori].sort((a,b)=>(b.puntiRanking||0)-(a.puntiRanking||0)).findIndex(g=>g.id===user.id)+1;
  const mieiTornei=tornei.filter(t=>(t.partecipanti||[]).some(p=>p.id===user.id));
  const miePrenotazioni=prenotazioni.filter(p=>p.giocatoreId===user.id&&p.data>=today());
  function iscriviti(torneoId,extra={}){
    setTornei(prev=>prev.map(t=>{if(t.id!==torneoId)return t;const iscritti=t.iscritti||[];if(iscritti.some(i=>i.giocatoreId===user.id))return t;return{...t,iscritti:[...iscritti,{id:uid(),giocatoreId:user.id,status:"attesa",data:new Date().toISOString(),...extra}]};}));
    toast("Richiesta inviata! In attesa di approvazione.");
  }
  function prenota(campoId,ora,data){setPrenotazioni(p=>[...p,{id:uid(),campoId,ora,data,giocatoreId:user.id,giocatoreNome:user.nome}]);toast("Campo prenotato!");}
  function cancellaPren(id){setPrenotazioni(p=>p.filter(x=>x.id!==id));toast("Prenotazione cancellata");}
  const navTabs=[{id:"home",icon:"🏠",l:"Home"},{id:"tornei",icon:"🏆",l:"Tornei"},{id:"campi",icon:"🏟️",l:"Campi"},{id:"ranking",icon:"📊",l:"Ranking"},{id:"ai",icon:"🤖",l:"AI"},{id:"profilo",icon:"👤",l:"Profilo"}];
  return<div style={{display:"flex",flexDirection:"column",minHeight:"100vh"}}>
    <div className="topbar">
      <div className="logo"><div className="logo-icon">🎾</div><div className="logo-text">PADEL <span>EVOLUTION</span></div></div>
      <div className="topbar-right">
        <span style={{fontSize:10.5,fontWeight:700,padding:"3px 9px",borderRadius:20,background:"rgba(77,166,255,.12)",color:"var(--blue)",border:"1px solid rgba(77,166,255,.3)"}}>GIOCATORE</span>
        <NotifBell notifiche={notifiche} setNotifiche={setNotifiche}/>
        <div style={{display:"flex",alignItems:"center",gap:7,background:"var(--card)",border:"1px solid var(--border)",borderRadius:50,padding:"4px 11px 4px 6px",fontSize:13,fontWeight:600}}><Av nome={user.nome} size={22}/>{user.nome.split(" ")[0]}</div>
      </div>
    </div>
    <div style={{flex:1,padding:"20px 16px",maxWidth:900,margin:"0 auto",width:"100%"}}>
      <div className="tabs">{navTabs.map(n=><button key={n.id} className={`tab ${page===n.id?"active":""}`} onClick={()=>setPage(n.id)}>{n.icon} {n.l}</button>)}</div>
      {page==="home"&&<PHome user={user} mioRank={mioRank} mieiTornei={mieiTornei} miePrenotazioni={miePrenotazioni} setPage={setPage}/>}
      {page==="tornei"&&<PTornei tornei={tornei} user={user} iscriviti={iscriviti}/>}
      {page==="campi"&&<CampiAvanzati prenotazioni={prenotazioni} setPrenotazioni={setPrenotazioni} giocatori={giocatori} toast={toast} isPlayer={true} currentUser={user}/>}
      {page==="ranking"&&<PRanking giocatori={giocatori} user={user}/>}
      {page==="ai"&&<AIEngine circolo={null} giocatori={giocatori} tornei={tornei}/>}
      {page==="profilo"&&<PProfilo user={user} giocatori={giocatori} mieiTornei={mieiTornei}/>}
    </div>
    {toastMsg&&<Toast msg={toastMsg} onDone={()=>setToastMsg(null)}/>}
  </div>;
}

function PHome({user,mioRank,mieiTornei,miePrenotazioni,setPage}){
  return<div>
    <div className="glass" style={{marginBottom:20,background:"linear-gradient(135deg,rgba(200,241,53,.08),rgba(28,36,21,.97))"}}>
      <div style={{display:"flex",alignItems:"center",gap:13,marginBottom:14}}><Av nome={user.nome} size={50}/><div><div style={{fontFamily:"'Russo One',sans-serif",fontSize:19,letterSpacing:1}}>{user.nome}</div><div style={{color:"var(--muted)",fontSize:12}}>Lv.{user.livello} · {user.lato}{user.mancino?" · Mancino":""}</div></div></div>
      <div style={{display:"flex",gap:9,flexWrap:"wrap"}}>{[{n:`#${mioRank||"?"}`,l:"Ranking"},{n:user.puntiRanking||0,l:"Punti"},{n:mieiTornei.length,l:"Tornei"},{n:miePrenotazioni.length,l:"Prenot."}].map((s,i)=><div key={i} style={{background:"rgba(0,0,0,.3)",borderRadius:8,padding:"6px 13px"}}><div style={{fontFamily:"'Russo One',sans-serif",fontSize:20,color:"var(--lime)"}}>{s.n}</div><div style={{fontSize:10,color:"var(--muted)"}}>{s.l}</div></div>)}</div>
    </div>
    <div className="g2" style={{marginBottom:20}}>{[{icon:"🏆",t:"Tornei",d:"Iscriviti agli eventi",p:"tornei"},{icon:"🏟️",t:"Prenota Campo",d:"Verifica disponibilità",p:"campi"},{icon:"📊",t:"Ranking",d:"La tua posizione",p:"ranking"},{icon:"👤",t:"Profilo",d:"Statistiche personali",p:"profilo"}].map((a,i)=><div key={i} className="torneo-card" onClick={()=>setPage(a.p)}><div style={{fontSize:26,marginBottom:9}}>{a.icon}</div><div style={{fontFamily:"'Russo One',sans-serif",fontSize:13,letterSpacing:1,marginBottom:3}}>{a.t}</div><div style={{color:"var(--muted)",fontSize:11.5}}>{a.d}</div></div>)}</div>
    {mieiTornei.length>0&&<div style={{marginBottom:16}}><div className="section-title" style={{marginBottom:9}}>I MIEI TORNEI</div>{mieiTornei.map(t=><div key={t.id} className="card-sm" style={{display:"flex",alignItems:"center",gap:10,marginBottom:7}}><span style={{fontSize:18}}>{FORMATI.find(f=>f.id===t.formato)?.icon||"🏆"}</span><div style={{flex:1}}><div style={{fontWeight:700,fontSize:13}}>{t.nome}</div><div style={{fontSize:11,color:"var(--muted)"}}>{fmtDate(t.data)}</div></div><span className={`badge ${t.status==="live"?"b-red":t.status==="aperto"?"b-lime":"b-gray"}`}>{t.status}</span></div>)}</div>}
  </div>;
}

function PTornei({tornei,user,iscriviti}){
  const [showModal,setShowModal]=useState(null);
  const [form,setForm]=useState({partner:"",categoria:"Misto"});
  const isSent=t=>(t.iscritti||[]).some(i=>i.giocatoreId===user.id);
  const isPart=t=>(t.partecipanti||[]).some(p=>p.id===user.id);
  const getIsc=t=>(t.iscritti||[]).find(i=>i.giocatoreId===user.id);
  const aperti=tornei.filter(t=>t.status==="aperto");
  const altri=tornei.filter(t=>t.status!=="aperto");
  return<div>
    <div className="page-title" style={{marginBottom:18}}>TORNEI<br/><span>DISPONIBILI</span></div>
    {aperti.length===0&&<div className="empty"><div className="empty-icon">🏆</div><div className="empty-title">NESSUN TORNEO APERTO</div></div>}
    {aperti.map(t=>{const sent=isSent(t),part=isPart(t),isc=getIsc(t);return<div key={t.id} className="torneo-card" style={{cursor:"default",marginBottom:11}}>
      <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
        <div>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:5}}><span style={{fontSize:24}}>{FORMATI.find(f=>f.id===t.formato)?.icon||"🏆"}</span><div><div style={{fontFamily:"'Russo One',sans-serif",fontSize:15,letterSpacing:1}}>{t.nome}</div><div style={{fontSize:12,color:"var(--muted)"}}>{FORMATI.find(f=>f.id===t.formato)?.nome}{t.categoria&&` · ${t.categoria}`}</div></div></div>
          <div style={{fontSize:11.5,color:"var(--muted)"}}>📅 {fmtDate(t.data)}{t.luogo&&` · 📍 ${t.luogo}`}{t.quotaIscrizione>0&&<span style={{color:"var(--gold)",marginLeft:6}}>💶 €{t.quotaIscrizione}</span>}</div>
          {t.descrizione&&<div style={{fontSize:12,color:"var(--muted)",marginTop:5,fontStyle:"italic"}}>{t.descrizione}</div>}
        </div>
        <div>{part?<span className="badge b-lime">✓ Confermato</span>:sent?<span className={`badge ${isc?.status==="approvata"?"b-lime":isc?.status==="rifiutata"?"b-red":"b-gold"}`}>{isc?.status==="approvata"?"✓ Approvata":isc?.status==="rifiutata"?"✕ Rifiutata":"⏳ In attesa"}</span>:<button className="btn btn-lime btn-sm" onClick={()=>{setShowModal(t);setForm({partner:"",categoria:t.categoria||"Misto"});}}>📝 Iscriviti</button>}</div>
      </div>
    </div>;})}
    {altri.length>0&&<div style={{marginTop:22}}><div className="section-title" style={{marginBottom:10,color:"var(--muted)"}}>ALTRI TORNEI</div><div className="g2">{altri.map(t=><div key={t.id} className="torneo-card" style={{opacity:.65,cursor:"default"}}><div style={{fontSize:22,marginBottom:7}}>{FORMATI.find(f=>f.id===t.formato)?.icon||"🏆"}</div><div style={{fontFamily:"'Russo One',sans-serif",fontSize:13,marginBottom:3}}>{t.nome}</div><div style={{fontSize:11,color:"var(--muted)",marginBottom:7}}>{fmtDate(t.data)}</div><span className={`badge ${t.status==="live"?"b-red":"b-gray"}`}>{t.status}</span></div>)}</div></div>}
    {showModal&&<Modal title={`Iscrizione: ${showModal.nome}`} onClose={()=>setShowModal(null)}>
      <div style={{fontSize:12.5,color:"var(--muted)",marginBottom:14}}>La richiesta verrà inviata al circolo per approvazione.</div>
      <div className="form-group"><label className="form-label">Categoria</label><select className="input" value={form.categoria} onChange={e=>setForm({...form,categoria:e.target.value})}>{CATEGORIE.map(c=><option key={c}>{c}</option>)}</select></div>
      <div className="form-group"><label className="form-label">Partner (opzionale)</label><input className="input" value={form.partner} onChange={e=>setForm({...form,partner:e.target.value})} placeholder="Nome partner se già accordato"/></div>
      <div style={{display:"flex",gap:9}}><button className="btn btn-ghost" onClick={()=>setShowModal(null)}>Annulla</button><button className="btn btn-lime" style={{flex:1,justifyContent:"center"}} onClick={()=>{iscriviti(showModal.id,{partner:form.partner,categoria:form.categoria});setShowModal(null);}}>Invia richiesta →</button></div>
    </Modal>}
  </div>;
}

function PCampi({prenotazioni,user,prenota,cancella}){
  const [selData,setSelData]=useState(today());
  const giorni=Array.from({length:7},(_,i)=>{const d=new Date();d.setDate(d.getDate()+i);return d.toISOString().slice(0,10);});
  const isOcc=(campoId,ora)=>prenotazioni.some(p=>p.campoId===campoId&&p.ora===ora&&p.data===selData);
  const isMine=(campoId,ora)=>prenotazioni.some(p=>p.campoId===campoId&&p.ora===ora&&p.data===selData&&p.giocatoreId===user.id);
  const getPrenId=(campoId,ora)=>prenotazioni.find(p=>p.campoId===campoId&&p.ora===ora&&p.data===selData&&p.giocatoreId===user.id)?.id;
  const mieFuture=prenotazioni.filter(p=>p.giocatoreId===user.id&&p.data>=today()).sort((a,b)=>a.data.localeCompare(b.data));
  return<div>
    <div className="page-title" style={{marginBottom:16}}>PRENOTA<br/><span>CAMPO</span></div>
    <div style={{display:"flex",gap:6,overflowX:"auto",paddingBottom:8,marginBottom:16}}>{giorni.map(d=><button key={d} className={`btn ${selData===d?"btn-lime":"btn-ghost"}`} onClick={()=>setSelData(d)} style={{flexShrink:0}}><div style={{textAlign:"center"}}><div style={{fontSize:9,opacity:.7}}>{["D","L","M","M","G","V","S"][new Date(d).getDay()]}</div><div style={{fontFamily:"'Russo One',sans-serif",fontSize:15}}>{d.slice(8)}/{d.slice(5,7)}</div></div></button>)}</div>
    <div className="g2" style={{marginBottom:20}}>
      {CAMPI.map(c=><div key={c.id} className="card">
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:11}}><div><div style={{fontFamily:"'Russo One',sans-serif",fontSize:15}}>{c.nome}</div><div style={{fontSize:11,color:"var(--muted)"}}>{c.tipo} · {c.superficie}</div></div><span style={{fontSize:22}}>🏟️</span></div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:5}}>
          {ORARI.map(ora=>{const occ=isOcc(c.id,ora),mine=isMine(c.id,ora);return<div key={ora} style={{background:mine?"rgba(77,166,255,.12)":occ?"rgba(255,77,77,.08)":"rgba(200,241,53,.06)",border:`1px solid ${mine?"rgba(77,166,255,.3)":occ?"rgba(255,77,77,.2)":"var(--border2)"}`,borderRadius:7,padding:"6px 8px",cursor:occ&&!mine?"default":"pointer",textAlign:"center"}} onClick={()=>{if(mine){cancella(getPrenId(c.id,ora));}else if(!occ){prenota(c.id,ora,selData);}}}>
            <div style={{fontSize:11.5,fontWeight:700,color:mine?"var(--blue)":occ?"var(--red)":"var(--lime)"}}>{ora}</div>
            <div style={{fontSize:9.5,color:mine?"var(--blue)":occ?"var(--red)":"var(--muted)"}}>{mine?"Mia (cancella)":occ?"Occupato":"Prenota"}</div>
          </div>;})}
        </div>
      </div>)}
    </div>
    {mieFuture.length>0&&<div><div className="section-title" style={{marginBottom:9}}>LE MIE PRENOTAZIONI</div>{mieFuture.map(p=><div key={p.id} className="card-sm" style={{display:"flex",alignItems:"center",gap:11,marginBottom:7}}><span style={{fontSize:18}}>🏟️</span><div style={{flex:1}}><div style={{fontWeight:700,fontSize:13}}>{CAMPI.find(c=>c.id===p.campoId)?.nome} · {p.ora}</div><div style={{fontSize:11,color:"var(--muted)"}}>{fmtDate(p.data)}</div></div><button className="btn btn-red btn-sm" onClick={()=>cancella(p.id)}>Cancella</button></div>)}</div>}
  </div>;
}

function PRanking({giocatori,user}){
  const sorted=[...giocatori].sort((a,b)=>(b.puntiRanking||0)-(a.puntiRanking||0));
  const m=["🥇","🥈","🥉"];
  return<div>
    <div className="page-title" style={{marginBottom:16}}>RANKING<br/><span>CIRCOLO</span></div>
    <div className="card" style={{padding:0}}>{sorted.map((g,i)=><div key={g.id} style={{display:"flex",alignItems:"center",gap:11,padding:"10px 14px",borderBottom:"1px solid rgba(200,241,53,.05)",background:g.id===user.id?"rgba(200,241,53,.05)":"transparent"}}><div style={{width:26,textAlign:"center",fontFamily:"'Russo One',sans-serif",fontSize:14,color:i<3?"var(--gold)":"var(--muted)"}}>{m[i]||i+1}</div><Av nome={g.nome} size={30}/><div style={{flex:1}}><div style={{fontWeight:700,fontSize:13.5}}>{g.nome}{g.id===user.id&&<span style={{fontSize:10,color:"var(--lime)",marginLeft:7}}>◀ Tu</span>}</div><div style={{fontSize:11,color:"var(--muted)"}}>Lv.{g.livello} · W{g.vittorie||0} L{g.sconfitte||0}</div></div><span style={{fontFamily:"'Russo One',sans-serif",fontSize:19,color:"var(--lime)"}}>{g.puntiRanking}</span></div>)}</div>
  </div>;
}

function PProfilo({user,giocatori,mieiTornei}){
  const g=giocatori.find(x=>x.id===user.id)||user;
  const rank=[...giocatori].sort((a,b)=>(b.puntiRanking||0)-(a.puntiRanking||0)).findIndex(x=>x.id===user.id)+1;
  const pct=g.partiteGiocate>0?Math.round((g.vittorie/g.partiteGiocate)*100):0;
  return<div>
    <div className="page-title" style={{marginBottom:16}}>IL MIO<br/><span>PROFILO</span></div>
    <div className="glass" style={{textAlign:"center",marginBottom:16}}><Av nome={g.nome} size={60}/><div style={{fontFamily:"'Russo One',sans-serif",fontSize:20,marginTop:11}}>{g.nome}</div><div style={{color:"var(--muted)",fontSize:12,marginTop:3}}>{g.email} · {g.circolo}</div><div style={{display:"flex",justifyContent:"center",gap:7,marginTop:11,flexWrap:"wrap"}}><span className="badge b-lime">Lv.{g.livello}</span><span className="badge b-blue">{g.lato}</span>{g.mancino&&<span className="badge b-gold">✋ Mancino</span>}</div></div>
    <div className="stat-grid" style={{marginBottom:14}}>{[{icon:"🏆",v:`#${rank||"?"}`,l:"Ranking"},{icon:"⭐",v:g.puntiRanking||0,l:"Punti"},{icon:"✅",v:g.vittorie||0,l:"Vittorie",c:"var(--lime)"},{icon:"❌",v:g.sconfitte||0,l:"Sconfitte",c:"var(--red)"},{icon:"🎾",v:g.partiteGiocate||0,l:"Partite"},{icon:"📊",v:`${pct}%`,l:"Win rate",c:pct>=50?"var(--lime)":"var(--red)"}].map((s,i)=><div key={i} className="stat-card"><div className="stat-icon">{s.icon}</div><div className="stat-val" style={s.c?{color:s.c}:{}}>{s.v}</div><div className="stat-lbl">{s.l}</div></div>)}</div>
    <div style={{marginBottom:6,display:"flex",justifyContent:"space-between",fontSize:12,color:"var(--muted)"}}><span>Win rate</span><span style={{fontWeight:700,color:pct>=50?"var(--lime)":"var(--red)"}}>{pct}%</span></div>
    <div className="prog" style={{height:7}}><div className="prog-fill" style={{width:`${pct}%`}}/></div>
  </div>;
}


// ─────────────────────────────────────────────────────────────
// RANKING ELO
// ─────────────────────────────────────────────────────────────
const ELO_K = 32; // K-factor standard

function calcolaELO(ratingA, ratingB, risultatoA) {
  // risultatoA: 1=vittoria, 0=sconfitta, 0.5=pari
  const expectedA = 1 / (1 + Math.pow(10, (ratingB - ratingA) / 400));
  const nuovoA = Math.round(ratingA + ELO_K * (risultatoA - expectedA));
  const nuovoB = Math.round(ratingB + ELO_K * ((1 - risultatoA) - (1 - expectedA)));
  const deltaA = nuovoA - ratingA;
  const deltaB = nuovoB - ratingB;
  return { nuovoA, nuovoB, deltaA, deltaB };
}

function aggiornaTorneoELO(partite, giocatori) {
  const ratings = {};
  giocatori.forEach(g => { ratings[g.id] = g.puntiRanking || 1000; });

  const aggiornamenti = [];
  partite.forEach(p => {
    if (p.s1 === null || p.s2 === null || p.bye || !p.c2) return;
    const g1 = p.c1?.g1, g2 = p.c1?.g2, g3 = p.c2?.g1, g4 = p.c2?.g2;
    if (!g1 || !g2 || !g3 || !g4) return;

    const mediaC1 = ((ratings[g1.id] || 1000) + (ratings[g2.id] || 1000)) / 2;
    const mediaC2 = ((ratings[g3.id] || 1000) + (ratings[g4.id] || 1000)) / 2;
    const ris = p.s1 > p.s2 ? 1 : p.s2 > p.s1 ? 0 : 0.5;

    const { nuovoA, nuovoB, deltaA, deltaB } = calcolaELO(mediaC1, mediaC2, ris);

    [g1, g2].forEach(g => {
      ratings[g.id] = Math.max(100, (ratings[g.id] || 1000) + Math.round(deltaA / 2));
      aggiornamenti.push({ giocatoreId: g.id, nome: g.nome, delta: Math.round(deltaA / 2), nuovoRating: ratings[g.id] });
    });
    [g3, g4].forEach(g => {
      ratings[g.id] = Math.max(100, (ratings[g.id] || 1000) + Math.round(deltaB / 2));
      aggiornamenti.push({ giocatoreId: g.id, nome: g.nome, delta: Math.round(deltaB / 2), nuovoRating: ratings[g.id] });
    });
  });
  return { ratings, aggiornamenti };
}

function RankingELO({ giocatori, setGiocatori, tornei, toast }) {
  const [showCalc, setShowCalc] = useState(false);
  const [selTorneo, setSelTorneo] = useState("");
  const [preview, setPreview] = useState(null);
  const [search, setSearch] = useState("");

  const sorted = [...giocatori]
    .filter(g => g.nome.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => (b.puntiRanking || 0) - (a.puntiRanking || 0));

  const medals = ["🥇", "🥈", "🥉"];

  function calcolaPreview() {
    const t = tornei.find(x => x.id === selTorneo);
    if (!t) return;
    const partite = [
      ...(t.partite || []),
      ...(t.gironi || []).flatMap(g => g.partite || []),
      ...(t.tappe || []).flatMap(tp => (tp.gironi || []).flatMap(g => g.partite || [])),
    ].filter(p => p.s1 !== null && p.s2 !== null);

    const { ratings, aggiornamenti } = aggiornaTorneoELO(partite, giocatori);
    setPreview({ ratings, aggiornamenti, torneo: t });
  }

  function applicaELO() {
    if (!preview) return;
    setGiocatori(prev => prev.map(g => ({
      ...g,
      puntiRanking: preview.ratings[g.id] || g.puntiRanking,
    })));
    toast("Ranking ELO aggiornato!");
    setShowCalc(false);
    setPreview(null);
  }

  // Distribuzione per fascia
  const fasce = [
    { label: "Elite", min: 1800, color: "var(--gold)" },
    { label: "Avanzato", min: 1500, color: "var(--lime)" },
    { label: "Intermedio", min: 1200, color: "var(--blue)" },
    { label: "Principiante", min: 0, color: "var(--muted)" },
  ];

  return (
    <div>
      <div className="page-header">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10 }}>
          <div>
            <div className="page-title">RANKING<br /><span>ELO</span></div>
            <div className="page-sub">Sistema di rating automatico basato sui risultati reali</div>
          </div>
          <button className="btn btn-lime" onClick={() => setShowCalc(true)}>⚡ Calcola da Torneo</button>
        </div>
      </div>

      {/* Fasce */}
      <div className="g4" style={{ marginBottom: 20 }}>
        {fasce.map(f => {
          const count = giocatori.filter(g => (g.puntiRanking || 0) >= f.min &&
            (f.min === 1800 || (g.puntiRanking || 0) < fasce[fasce.indexOf(f) - 1]?.min || fasce.indexOf(f) === 0 ? true :
              (g.puntiRanking || 0) < fasce[fasce.indexOf(f) - 1]?.min)).length;
          const c2 = giocatori.filter(g => {
            const pts = g.puntiRanking || 0;
            const idx = fasce.indexOf(f);
            const max = idx === 0 ? Infinity : fasce[idx - 1].min;
            return pts >= f.min && pts < max;
          }).length;
          return (
            <div key={f.label} className="stat-card">
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: f.color, marginBottom: 8 }} />
              <div className="stat-val" style={{ color: f.color, fontSize: 24 }}>{c2}</div>
              <div className="stat-lbl">{f.label}</div>
              <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 3 }}>≥ {f.min} pt</div>
            </div>
          );
        })}
      </div>

      {/* Search */}
      <div style={{ marginBottom: 14 }}>
        <input className="input" style={{ maxWidth: 280 }} placeholder="🔍 Cerca giocatore..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      {/* Classifica */}
      <div className="card" style={{ padding: 0 }}>
        <div style={{ display: "grid", gridTemplateColumns: "36px 1fr 80px 70px 70px 60px", gap: 6, padding: "9px 14px", borderBottom: "1px solid var(--border)" }}>
          {["#", "Giocatore", "ELO", "Fascia", "W/L", "Trend"].map(h => (
            <span key={h} style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "var(--muted)" }}>{h}</span>
          ))}
        </div>
        {sorted.map((g, i) => {
          const pts = g.puntiRanking || 0;
          const fascia = fasce.find(f => {
            const idx = fasce.indexOf(f);
            const max = idx === 0 ? Infinity : fasce[idx - 1].min;
            return pts >= f.min && pts < max;
          }) || fasce[fasce.length - 1];
          const wl = (g.vittorie || 0) + (g.sconfitte || 0) > 0
            ? `${g.vittorie || 0}/${g.sconfitte || 0}`
            : "—";
          const trend = g.eloTrend || 0;

          return (
            <div key={g.id} style={{ display: "grid", gridTemplateColumns: "36px 1fr 80px 70px 70px 60px", gap: 6, padding: "10px 14px", borderBottom: "1px solid rgba(200,241,53,.05)", alignItems: "center" }}>
              <div style={{ fontFamily: "'Russo One',sans-serif", fontSize: 15, color: i < 3 ? "var(--gold)" : "var(--muted)", textAlign: "center" }}>{medals[i] || i + 1}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <Av nome={g.nome} size={30} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13.5 }}>{g.nome}</div>
                  <div style={{ fontSize: 11, color: "var(--muted)" }}>Lv. {g.livello}</div>
                </div>
              </div>
              <div style={{ fontFamily: "'Russo One',sans-serif", fontSize: 18, color: fascia.color }}>{pts}</div>
              <div><span className="badge" style={{ background: `${fascia.color}18`, color: fascia.color, border: `1px solid ${fascia.color}44`, fontSize: 10 }}>{fascia.label}</span></div>
              <div style={{ color: "var(--muted)", fontSize: 12.5 }}>{wl}</div>
              <div style={{ fontFamily: "'Russo One',sans-serif", fontSize: 13, color: trend > 0 ? "var(--lime)" : trend < 0 ? "var(--red)" : "var(--muted)" }}>
                {trend > 0 ? `▲ +${trend}` : trend < 0 ? `▼ ${trend}` : "—"}
              </div>
            </div>
          );
        })}
        {sorted.length === 0 && <div className="empty"><div className="empty-icon">📊</div><div className="empty-title">NESSUN GIOCATORE</div></div>}
      </div>

      {/* Modal calcolo ELO */}
      {showCalc && (
        <Modal title="⚡ Calcola ELO da Torneo" onClose={() => { setShowCalc(false); setPreview(null); }} large>
          <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 16, lineHeight: 1.6 }}>
            Seleziona un torneo completato per aggiornare automaticamente il ranking ELO di tutti i giocatori in base ai risultati reali.
          </div>
          <div className="form-group">
            <label className="form-label">Torneo</label>
            <select className="input" value={selTorneo} onChange={e => { setSelTorneo(e.target.value); setPreview(null); }}>
              <option value="">Seleziona torneo...</option>
              {tornei.filter(t => t.status === "live" || t.status === "concluso").map(t => (
                <option key={t.id} value={t.id}>{t.nome} ({t.data})</option>
              ))}
            </select>
          </div>

          {selTorneo && !preview && (
            <button className="btn btn-outline" style={{ width: "100%", justifyContent: "center", marginBottom: 12 }} onClick={calcolaPreview}>
              🔍 Calcola Preview
            </button>
          )}

          {preview && (
            <div>
              <div style={{ fontFamily: "'Russo One',sans-serif", fontSize: 14, marginBottom: 12, color: "var(--lime)" }}>
                PREVIEW AGGIORNAMENTI — {preview.torneo.nome}
              </div>
              <div style={{ maxHeight: 260, overflowY: "auto", marginBottom: 16 }}>
                {preview.aggiornamenti.map((a, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: "1px solid var(--border)" }}>
                    <Av nome={a.nome} size={28} />
                    <div style={{ flex: 1, fontWeight: 600, fontSize: 13 }}>{a.nome}</div>
                    <div style={{ fontFamily: "'Russo One',sans-serif", fontSize: 16, color: a.delta >= 0 ? "var(--lime)" : "var(--red)" }}>
                      {a.delta >= 0 ? `▲ +${a.delta}` : `▼ ${a.delta}`}
                    </div>
                    <div style={{ fontFamily: "'Russo One',sans-serif", fontSize: 18, color: "var(--text)" }}>{a.nuovoRating}</div>
                  </div>
                ))}
                {preview.aggiornamenti.length === 0 && (
                  <div style={{ textAlign: "center", color: "var(--muted)", padding: "20px 0", fontSize: 13 }}>
                    Nessun risultato inserito in questo torneo
                  </div>
                )}
              </div>
              <div style={{ display: "flex", gap: 9 }}>
                <button className="btn btn-ghost" onClick={() => setPreview(null)}>← Indietro</button>
                <button className="btn btn-lime" style={{ flex: 1, justifyContent: "center" }} onClick={applicaELO} disabled={preview.aggiornamenti.length === 0}>
                  ✅ Applica Aggiornamenti ELO
                </button>
              </div>
            </div>
          )}
          {!selTorneo && (
            <div style={{ textAlign: "center", padding: "20px 0", color: "var(--muted)", fontSize: 13 }}>
              💡 Seleziona un torneo con risultati inseriti per calcolare gli aggiornamenti ELO
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// CAMPI AVANZATI — tariffe, durata, fasce orarie
// ─────────────────────────────────────────────────────────────

const CAMPI_CONFIG_DEFAULT = [
  { id: "c1", nome: "Campo 1", tipo: "Indoor", superficie: "Vetro", tariffa: 20, durata: 90, attivo: true },
  { id: "c2", nome: "Campo 2", tipo: "Indoor", superficie: "Vetro", tariffa: 20, durata: 90, attivo: true },
  { id: "c3", nome: "Campo 3", tipo: "Outdoor", superficie: "Sintetico", tariffa: 15, durata: 90, attivo: true },
  { id: "c4", nome: "Campo 4", tipo: "Outdoor", superficie: "Sintetico", tariffa: 15, durata: 90, attivo: false },
];

function generaOrari(apertura = "08:00", chiusura = "23:00", durata = 90) {
  const orari = [];
  const [ah, am] = apertura.split(":").map(Number);
  const [ch, cm] = chiusura.split(":").map(Number);
  let cur = ah * 60 + am;
  const fine = ch * 60 + cm;
  while (cur + durata <= fine) {
    const h = Math.floor(cur / 60).toString().padStart(2, "0");
    const m = (cur % 60).toString().padStart(2, "0");
    const fh = Math.floor((cur + durata) / 60).toString().padStart(2, "0");
    const fm = ((cur + durata) % 60).toString().padStart(2, "0");
    orari.push({ inizio: `${h}:${m}`, fine: `${fh}:${fm}`, label: `${h}:${m} - ${fh}:${fm}` });
    cur += durata;
  }
  return orari;
}

function CampiAvanzati({ prenotazioni, setPrenotazioni, giocatori, toast, isPlayer = false, currentUser = null }) {
  const [campiConfig, setCampiConfig] = useState(CAMPI_CONFIG_DEFAULT);
  const [selData, setSelData] = useState(today());
  const [showConfig, setShowConfig] = useState(false);
  const [showBook, setShowBook] = useState(null);
  const [formBook, setFormBook] = useState({ giocatoreId: "", note: "" });
  const [editCampo, setEditCampo] = useState(null);

  const giorni = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() + i);
    return d.toISOString().slice(0, 10);
  });

  const campiAttivi = campiConfig.filter(c => c.attivo);

  function getPren(campoId, slotInizio) {
    return prenotazioni.find(p => p.campoId === campoId && p.slotInizio === slotInizio && p.data === selData);
  }

  function isMine(campoId, slotInizio) {
    const p = getPren(campoId, slotInizio);
    return p && (isPlayer ? p.giocatoreId === currentUser?.id : false);
  }

  function prenota(campoId, slot, campo) {
    if (isPlayer) {
      const pren = getPren(campoId, slot.inizio);
      if (pren && isMine(campoId, slot.inizio)) {
        setPrenotazioni(p => p.filter(x => x.id !== pren.id));
        toast("Prenotazione cancellata");
        return;
      }
      if (pren) return;
      setPrenotazioni(p => [...p, {
        id: uid(), campoId, slotInizio: slot.inizio, slotFine: slot.fine,
        data: selData, giocatoreId: currentUser?.id, giocatoreNome: currentUser?.nome,
        tariffa: campo.tariffa, durata: campo.durata, note: "",
      }]);
      toast(`Campo prenotato! ${slot.label} · €${campo.tariffa}`);
    } else {
      setShowBook({ campoId, slot, campo });
      setFormBook({ giocatoreId: "", note: "" });
    }
  }

  function confermaPrenotazione() {
    if (!formBook.giocatoreId) { toast("Seleziona un giocatore"); return; }
    const g = giocatori.find(x => x.id === formBook.giocatoreId);
    setPrenotazioni(p => [...p, {
      id: uid(), campoId: showBook.campoId,
      slotInizio: showBook.slot.inizio, slotFine: showBook.slot.fine,
      data: selData, giocatoreId: formBook.giocatoreId,
      giocatoreNome: g?.nome || "", tariffa: showBook.campo.tariffa,
      durata: showBook.campo.durata, note: formBook.note,
    }]);
    toast(`Prenotazione confermata! €${showBook.campo.tariffa}`);
    setShowBook(null);
  }

  // Incasso giornaliero
  const incassoOggi = prenotazioni
    .filter(p => p.data === selData)
    .reduce((s, p) => s + (p.tariffa || 0), 0);

  const prenOggi = prenotazioni.filter(p => p.data === selData);

  return (
    <div>
      <div className="page-header">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10 }}>
          <div>
            <div className="page-title">CAMPI &<br /><span>PRENOTAZIONI</span></div>
            <div className="page-sub">{campiAttivi.length} campi attivi · €{incassoOggi} incasso oggi</div>
          </div>
          {!isPlayer && (
            <button className="btn btn-outline" onClick={() => setShowConfig(true)}>⚙️ Configura Orari & Prezzi</button>
          )}
        </div>
      </div>

      {/* Stats rapide */}
      {!isPlayer && (
        <div className="stat-grid" style={{ marginBottom: 20 }}>
          {[
            { icon: "🏟️", v: campiAttivi.length, l: "Campi attivi" },
            { icon: "📅", v: prenOggi.length, l: "Prenot. oggi" },
            { icon: "💶", v: `€${incassoOggi}`, l: "Incasso oggi" },
            { icon: "📊", v: `${Math.round((prenOggi.length / (campiAttivi.length * generaOrari("08:00","23:00",campiConfig[0]?.durata||90).length)) * 100)}%`, l: "Occupazione" },
          ].map((s, i) => (
            <div key={i} className="stat-card">
              <div className="stat-icon">{s.icon}</div>
              <div className="stat-val">{s.v}</div>
              <div className="stat-lbl">{s.l}</div>
            </div>
          ))}
        </div>
      )}

      {/* Selezione data */}
      <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 8, marginBottom: 18 }}>
        {giorni.map(d => (
          <button key={d} className={`btn ${selData === d ? "btn-lime" : "btn-ghost"}`}
            onClick={() => setSelData(d)} style={{ flexShrink: 0 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 9, opacity: .7 }}>{["D", "L", "M", "M", "G", "V", "S"][new Date(d).getDay()]}</div>
              <div style={{ fontFamily: "'Russo One',sans-serif", fontSize: 15 }}>{d.slice(8)}/{d.slice(5, 7)}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Griglia campi / orari */}
      <div style={{ overflowX: "auto" }}>
        <div style={{ minWidth: Math.max(500, campiAttivi.length * 160 + 120) }}>
          {/* Header campi */}
          <div style={{ display: "grid", gridTemplateColumns: `110px repeat(${campiAttivi.length}, 1fr)`, gap: 6, marginBottom: 6 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: "var(--muted)", padding: "4px 0" }}>FASCIA ORARIA</div>
            {campiAttivi.map(c => (
              <div key={c.id} style={{ textAlign: "center", padding: "4px 0" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "var(--lime)" }}>{c.nome}</div>
                <div style={{ fontSize: 10, color: "var(--muted)" }}>{c.tipo} · €{c.tariffa}/{c.durata}min</div>
              </div>
            ))}
          </div>
          {/* Slot orari */}
          {generaOrari("08:00", "23:00", campiConfig[0]?.durata || 90).map(slot => (
            <div key={slot.inizio} style={{ display: "grid", gridTemplateColumns: `110px repeat(${campiAttivi.length}, 1fr)`, gap: 6, marginBottom: 5 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11.5, fontWeight: 700, color: "var(--muted)" }}>
                <span>⏱</span> {slot.label}
              </div>
              {campiAttivi.map(campo => {
                const pren = getPren(campo.id, slot.inizio);
                const mine = isPlayer && pren?.giocatoreId === currentUser?.id;
                const occ = !!pren;
                return (
                  <div key={campo.id}
                    onClick={() => !occ || mine ? prenota(campo.id, slot, campo) : null}
                    style={{
                      background: mine ? "rgba(77,166,255,.14)" : occ ? "rgba(255,77,77,.1)" : "rgba(200,241,53,.06)",
                      border: `1px solid ${mine ? "rgba(77,166,255,.35)" : occ ? "rgba(255,77,77,.25)" : "var(--border2)"}`,
                      borderRadius: 9, padding: "8px 10px", cursor: occ && !mine ? "default" : "pointer",
                      transition: "all .15s", textAlign: "center",
                    }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: mine ? "var(--blue)" : occ ? "var(--red)" : "var(--lime)" }}>
                      {mine ? "✓ Mia" : occ ? pren.giocatoreNome?.split(" ")[0] || "Occ." : "Libero"}
                    </div>
                    <div style={{ fontSize: 10, color: occ ? "var(--muted)" : "var(--lime)", marginTop: 2 }}>
                      {occ ? (mine ? "Tap cancella" : `${pren.tariffa || campo.tariffa}€`) : `€${campo.tariffa}`}
                    </div>
                    {!isPlayer && occ && (
                      <button onClick={e => { e.stopPropagation(); setPrenotazioni(p => p.filter(x => x.id !== pren.id)); toast("Cancellata"); }}
                        style={{ background: "none", border: "none", color: "var(--red)", cursor: "pointer", fontSize: 11, marginTop: 3 }}>✕ Cancella</button>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Lista prenotazioni del giorno */}
      {prenOggi.length > 0 && !isPlayer && (
        <div style={{ marginTop: 24 }}>
          <div className="section-title" style={{ marginBottom: 10 }}>📋 PRENOTAZIONI {fmtDate(selData)} · €{incassoOggi} totale</div>
          {prenOggi.sort((a, b) => a.slotInizio?.localeCompare(b.slotInizio)).map(p => (
            <div key={p.id} className="card-sm" style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 7 }}>
              <span style={{ fontSize: 18 }}>🏟️</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 13 }}>
                  {campiConfig.find(c => c.id === p.campoId)?.nome} · {p.slotInizio} - {p.slotFine}
                </div>
                <div style={{ fontSize: 11.5, color: "var(--muted)" }}>{p.giocatoreNome}</div>
              </div>
              <span style={{ fontFamily: "'Russo One',sans-serif", color: "var(--lime)", fontSize: 16 }}>€{p.tariffa || 0}</span>
              <button className="btn btn-red btn-sm" onClick={() => { setPrenotazioni(pr => pr.filter(x => x.id !== p.id)); toast("Cancellata"); }}>✕</button>
            </div>
          ))}
        </div>
      )}

      {/* Modal config campi */}
      {showConfig && (
        <Modal title="⚙️ Configura Campi & Prezzi" onClose={() => setShowConfig(false)} large>
          <div style={{ marginBottom: 16 }}>
            {campiConfig.map((c, i) => (
              <div key={c.id} style={{ background: "var(--card2)", border: "1px solid var(--border)", borderRadius: 12, padding: "14px 16px", marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <div style={{ fontFamily: "'Russo One',sans-serif", fontSize: 14 }}>{c.nome}</div>
                  <div className="tog-wrap">
                    <Tog v={c.attivo} onChange={v => setCampiConfig(prev => prev.map((x, j) => j === i ? { ...x, attivo: v } : x))} />
                    <span style={{ fontSize: 12, color: "var(--muted)" }}>{c.attivo ? "Attivo" : "Chiuso"}</span>
                  </div>
                </div>
                <div className="form-row3">
                  <div className="form-group">
                    <label className="form-label">Tipo</label>
                    <select className="input" value={c.tipo} onChange={e => setCampiConfig(prev => prev.map((x, j) => j === i ? { ...x, tipo: e.target.value } : x))}>
                      <option>Indoor</option><option>Outdoor</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Tariffa €</label>
                    <input className="input" type="number" value={c.tariffa}
                      onChange={e => setCampiConfig(prev => prev.map((x, j) => j === i ? { ...x, tariffa: +e.target.value } : x))} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Durata (min)</label>
                    <select className="input" value={c.durata}
                      onChange={e => setCampiConfig(prev => prev.map((x, j) => j === i ? { ...x, durata: +e.target.value } : x))}>
                      <option value={60}>60 min</option>
                      <option value={90}>90 min</option>
                      <option value={120}>120 min</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="btn btn-lime" style={{ width: "100%", justifyContent: "center" }} onClick={() => { setShowConfig(false); toast("Configurazione salvata!"); }}>
            ✅ Salva Configurazione
          </button>
        </Modal>
      )}

      {/* Modal prenota (admin) */}
      {showBook && (
        <Modal title={`Prenota ${showBook.campo.nome} · ${showBook.slot.label}`} onClose={() => setShowBook(null)}>
          <div style={{ background: "rgba(200,241,53,.07)", border: "1px solid var(--border2)", borderRadius: 10, padding: "10px 14px", marginBottom: 14, fontSize: 13 }}>
            💶 Tariffa: <b style={{ color: "var(--lime)" }}>€{showBook.campo.tariffa}</b> · {showBook.campo.durata} minuti · {showBook.campo.tipo}
          </div>
          <div className="form-group">
            <label className="form-label">Giocatore</label>
            <select className="input" value={formBook.giocatoreId} onChange={e => setFormBook({ ...formBook, giocatoreId: e.target.value })}>
              <option value="">Seleziona...</option>
              {giocatori.map(g => <option key={g.id} value={g.id}>{g.nome} (Lv. {g.livello})</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Note</label>
            <input className="input" value={formBook.note} onChange={e => setFormBook({ ...formBook, note: e.target.value })} placeholder="Es. Lezione, partita amichevole..." />
          </div>
          <div style={{ display: "flex", gap: 9 }}>
            <button className="btn btn-ghost" onClick={() => setShowBook(null)}>Annulla</button>
            <button className="btn btn-lime" style={{ flex: 1, justifyContent: "center" }} onClick={confermaPrenotazione}>
              ✓ Conferma · €{showBook.campo.tariffa}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// AI ENGINE — PADEL EVOLUTION
// 3 modalità: Club Advisor, Marketing Copy, Sales & Lead
// ─────────────────────────────────────────────────────────────

const AI_PERSONAS = [
  {
    id: "advisor",
    icon: "🤖",
    nome: "AI Club Advisor",
    color: "var(--lime)",
    colorBg: "rgba(200,241,53,.08)",
    colorBorder: "var(--border2)",
    desc: "Consigli su tornei, ranking ELO, gestione campi e organizzazione club",
    domande: [
      "Come funziona il calcolo del ranking ELO nei tornei di Padel?",
      "Come gestire un torneo con numero dispari di coppie?",
      "Qual è il formato torneo migliore per 16 coppie?",
      "Come bilanciare le coppie per livello in un Americano?",
      "Suggerisci una scaletta oraria per un torneo di 8 ore",
      "Come calcolare le quote iscrizione per coprire i costi?",
    ],
    systemPrompt: (ctx) => `Sei l'AI Club Advisor della piattaforma Padel Evolution, esperto in:
- Organizzazione tornei di padel (tutti i formati: Eliminazione, Gironi, Rodeo, Americano, Gold/Silver/Bronze, Round Robin, Super Tie-Break, Doppio Tabellone, Campionato a Tappe)
- Ranking ELO per padel: calcolo, aggiornamento, bilanciamento
- Gestione campi, prenotazioni, fasce orarie
- Regolamenti FIP (Federazione Italiana Padel)
- Ottimizzazione operativa del circolo

Contesto attuale del circolo:
${JSON.stringify(ctx, null, 2)}

Rispondi in italiano, con tono professionale ma amichevole. Sii pratico e diretto. Usa bullet point e numeri quando utile. Massimo 300 parole per risposta.`,
  },
  {
    id: "marketing",
    icon: "📣",
    nome: "AI Marketing Copy",
    color: "var(--blue)",
    colorBg: "rgba(77,166,255,.08)",
    colorBorder: "rgba(77,166,255,.3)",
    desc: "Post social, WhatsApp, newsletter e contenuti promozionali per il tuo club",
    domande: [
      "Scrivi un post Instagram per il torneo di questo weekend",
      "Crea un messaggio WhatsApp per invitare i soci al torneo",
      "Scrivi una newsletter mensile per i membri del club",
      "Crea una caption per una foto del campo con coupon sconto",
      "Scrivi 5 hashtag efficaci per un torneo padel amatoriale",
      "Crea un post per annunciare l'apertura delle iscrizioni",
    ],
    systemPrompt: (ctx) => `Sei l'AI Marketing Specialist della piattaforma Padel Evolution, esperto in:
- Social media marketing per club sportivi (Instagram, Facebook, TikTok)
- Copywriting persuasivo per sport e lifestyle
- Messaggi WhatsApp e comunicazioni dirette ai soci
- Newsletter e email marketing per circoli padel
- Campagne promozionali e offerte speciali

Contesto del circolo:
${JSON.stringify(ctx, null, 2)}

Crea sempre contenuti vivaci, coinvolgenti, con emoji appropriate e call-to-action chiare.
Adatta il tono al canale (formale per email, informale per WhatsApp, trendy per Instagram).
Includi sempre hashtag pertinenti per i post social. Rispondi in italiano.`,
  },
  {
    id: "sales",
    icon: "💼",
    nome: "AI Sales & Lead",
    color: "var(--gold)",
    colorBg: "rgba(255,215,0,.08)",
    colorBorder: "rgba(255,215,0,.3)",
    desc: "Strategie per trovare sponsor, aumentare ricavi e fidelizzare i soci",
    domande: [
      "Come trovare sponsor locali per il nostro torneo?",
      "Crea una proposta commerciale per uno sponsor premium",
      "Come strutturare i pacchetti abbonamento per i soci?",
      "Strategie per aumentare le prenotazioni nei giorni feriali",
      "Come fidelizzare i soci con un programma punti?",
      "Scrivi un'email di presentazione del club a potenziali sponsor",
    ],
    systemPrompt: (ctx) => `Sei l'AI Sales & Business Development Specialist della piattaforma Padel Evolution, esperto in:
- Acquisizione sponsor per eventi sportivi e circoli padel
- Strutturazione pacchetti commerciali e abbonamenti
- Revenue management per strutture sportive
- Lead generation e partnership locali
- Fidelizzazione soci e programmi fedeltà
- Pricing strategy per campi e tornei

Contesto del circolo:
${JSON.stringify(ctx, null, 2)}

Fornisci strategie concrete, con esempi di prezzi realistici per il mercato italiano.
Includi template di email/proposte quando richiesto. Sii orientato al risultato economico. Rispondi in italiano.`,
  },
];

async function callClaudeAI(systemPrompt, messages) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: systemPrompt,
      messages: messages.map(m => ({ role: m.role, content: m.content })),
    }),
  });
  const data = await response.json();
  if (data.error) throw new Error(data.error.message || "Errore API");
  return data.content?.[0]?.text || "Nessuna risposta ricevuta.";
}

function AIEngine({ circolo, giocatori, tornei }) {
  const [persona, setPersona] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const bottomRef = useRef();

  const ctx = {
    circolo: circolo?.nome || "Circolo",
    citta: circolo?.citta || "",
    piano: circolo?.piano || "base",
    numGiocatori: giocatori?.length || 0,
    numTornei: tornei?.length || 0,
    torneiAttivi: tornei?.filter(t => t.status === "live").length || 0,
    topGiocatori: (giocatori || [])
      .sort((a, b) => (b.puntiRanking || 0) - (a.puntiRanking || 0))
      .slice(0, 5)
      .map(g => ({ nome: g.nome, livello: g.livello, punti: g.puntiRanking })),
  };

  useEffect(() => {
    if (persona) {
      setMessages([{
        role: "assistant",
        content: `Ciao! Sono il tuo ${persona.nome}. ${persona.desc}.\n\nCome posso aiutarti oggi? Puoi usare le domande suggerite qui sotto o scrivere liberamente.`,
        isWelcome: true,
      }]);
      setError("");
    }
  }, [persona]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send(text) {
    const msg = text || input.trim();
    if (!msg || loading) return;
    setInput("");
    setError("");

    const userMsg = { role: "user", content: msg };
    const newMessages = [...messages.filter(m => !m.isWelcome), userMsg];
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      const p = AI_PERSONAS.find(p => p.id === persona.id);
      const reply = await callClaudeAI(p.systemPrompt(ctx), newMessages);
      setMessages(prev => [...prev, { role: "assistant", content: reply }]);
    } catch (e) {
      setError("Errore: " + e.message);
    }
    setLoading(false);
  }

  // Selezione persona
  if (!persona) return (
    <div>
      <div className="page-header">
        <div className="page-title">PADEL<br /><span>AI ENGINE</span></div>
        <div className="page-sub">Intelligenza artificiale integrata per il tuo circolo</div>
      </div>

      {/* Hero banner */}
      <div className="glass" style={{ marginBottom: 24, textAlign: "center", padding: "32px 24px", background: "linear-gradient(135deg,rgba(200,241,53,.07),rgba(28,36,21,.97))", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: .04, fontSize: 200, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>🤖</div>
        <div style={{ fontFamily: "'Russo One',sans-serif", fontSize: 13, letterSpacing: 3, color: "var(--lime)", marginBottom: 10 }}>NOVITÀ AI INTEGRATA</div>
        <div style={{ fontFamily: "'Russo One',sans-serif", fontSize: 26, letterSpacing: 1, marginBottom: 10, lineHeight: 1.2 }}>
          Utilizza l'AI per<br />accelerare il business del club
        </div>
        <div style={{ color: "var(--muted)", fontSize: 13.5, maxWidth: 420, margin: "0 auto" }}>
          Analisi profitti, post social già scritti, convocazioni WhatsApp, preventivi sponsor — tutto in secondi.
        </div>
      </div>

      {/* 3 persona cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {AI_PERSONAS.map(p => (
          <div key={p.id}
            onClick={() => setPersona(p)}
            style={{ background: p.colorBg, border: `1.5px solid ${p.colorBorder}`, borderRadius: 16, padding: "20px 22px", cursor: "pointer", transition: "all .2s" }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
            onMouseLeave={e => e.currentTarget.style.transform = ""}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 10 }}>
              <div style={{ width: 46, height: 46, borderRadius: 12, background: "rgba(0,0,0,.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{p.icon}</div>
              <div>
                <div style={{ fontFamily: "'Russo One',sans-serif", fontSize: 16, letterSpacing: 1, color: p.color }}>{p.nome}</div>
                <div style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 2 }}>{p.desc}</div>
              </div>
              <div style={{ marginLeft: "auto", color: p.color, fontSize: 18 }}>→</div>
            </div>
            {/* Preview domande */}
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {p.domande.slice(0, 2).map((d, i) => (
                <div key={i} style={{ fontSize: 11, background: "rgba(0,0,0,.25)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 20, padding: "3px 10px", color: "var(--muted)" }}>
                  {d.length > 40 ? d.slice(0, 40) + "…" : d}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Chat view
  const p = persona;
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 120px)", minHeight: 500 }}>
      {/* Header chat */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
        <button className="btn btn-ghost btn-sm" onClick={() => { setPersona(null); setMessages([]); }}>← Indietro</button>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: p.colorBg, border: `1px solid ${p.colorBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{p.icon}</div>
          <div>
            <div style={{ fontFamily: "'Russo One',sans-serif", fontSize: 15, color: p.color }}>{p.nome}</div>
            <div style={{ fontSize: 11, color: "var(--muted)" }}>{circolo?.nome || "Circolo"}</div>
          </div>
        </div>
        <button className="btn btn-ghost btn-sm" onClick={() => setMessages([{ role: "assistant", content: `Chat resettata. Come posso aiutarti?`, isWelcome: true }])}>🗑️ Reset</button>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 12, paddingBottom: 8 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
            <div style={{
              maxWidth: "85%",
              background: m.role === "user" ? "rgba(200,241,53,.15)" : "var(--card2)",
              border: `1px solid ${m.role === "user" ? p.colorBorder : "var(--border)"}`,
              borderRadius: m.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
              padding: "11px 15px",
              fontSize: 13.5,
              lineHeight: 1.65,
              color: "var(--text)",
              whiteSpace: "pre-wrap",
            }}>
              {m.role === "assistant" && !m.isWelcome && (
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8, fontSize: 11, color: p.color, fontWeight: 700 }}>
                  {p.icon} {p.nome}
                </div>
              )}
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div style={{ background: "var(--card2)", border: "1px solid var(--border)", borderRadius: "14px 14px 14px 4px", padding: "11px 18px" }}>
              <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: p.color, animation: `bounce 1.2s ease ${i * 0.2}s infinite`, opacity: 0.8 }} />
                ))}
              </div>
            </div>
          </div>
        )}
        {error && <div style={{ background: "rgba(255,77,77,.1)", border: "1px solid rgba(255,77,77,.3)", borderRadius: 10, padding: "10px 14px", color: "var(--red)", fontSize: 12.5 }}>⚠️ {error}</div>}
        <div ref={bottomRef} />
      </div>

      {/* Domande suggerite */}
      <div style={{ marginBottom: 10 }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "var(--muted)", marginBottom: 7 }}>Domande suggerite</div>
        <div style={{ display: "flex", gap: 7, overflowX: "auto", paddingBottom: 4 }}>
          {p.domande.map((d, i) => (
            <button key={i} onClick={() => send(d)} disabled={loading}
              style={{ flexShrink: 0, background: p.colorBg, border: `1px solid ${p.colorBorder}`, borderRadius: 20, padding: "6px 13px", fontSize: 11.5, color: p.color, cursor: "pointer", fontFamily: "'Outfit',sans-serif", fontWeight: 600, whiteSpace: "nowrap", transition: "all .15s" }}>
              {d.length > 45 ? d.slice(0, 45) + "…" : d}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div style={{ display: "flex", gap: 9, alignItems: "flex-end" }}>
        <textarea
          className="input"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
          placeholder={`Chiedi al ${p.nome}...`}
          rows={2}
          disabled={loading}
          style={{ resize: "none", flex: 1, borderColor: loading ? "var(--border)" : p.colorBorder }}
        />
        <button className="btn btn-lime" style={{ padding: "12px 18px", flexShrink: 0, alignSelf: "flex-end" }} onClick={() => send()} disabled={loading || !input.trim()}>
          {loading ? "⏳" : "→"}
        </button>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
      `}</style>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// STEP 3 — TV SCHERMO LIVE + QR SCANNER
// ─────────────────────────────────────────────────────────────

function TVScreenLive({ tornei, circolo }) {
  const [selTorneo, setSelTorneo] = useState(tornei.find(t => t.status === "live")?.id || "");
  const [fullscreen, setFullscreen] = useState(false);
  const t = tornei.find(x => x.id === selTorneo);

  const partiteRecenti = t ? [
    ...(t.partite || []),
    ...(t.gironi || []).flatMap(g => g.partite || []),
    ...(t.tappe || []).flatMap(tp => (tp.gironi || []).flatMap(g => g.partite || [])),
  ].filter(p => p.s1 !== null && p.s2 !== null).slice(-6) : [];

  const partiteInCorso = t ? [
    ...(t.partite || []),
    ...(t.gironi || []).flatMap(g => g.partite || []),
  ].filter(p => p.s1 === null && !p.bye && p.c2).slice(0, 4) : [];

  const [tick, setTick] = useState(0);
  useEffect(() => {
    const iv = setInterval(() => setTick(x => x + 1), 30000);
    return () => clearInterval(iv);
  }, []);

  const TVContent = () => (
    <div style={{
      background: "var(--dark)", minHeight: "100%", padding: "28px 32px",
      fontFamily: "'Russo One',sans-serif",
    }}>
      {/* Header TV */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28, borderBottom: "2px solid var(--lime)", paddingBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 44, height: 44, background: "var(--lime)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>🎾</div>
          <div>
            <div style={{ fontSize: 22, letterSpacing: 3, color: "var(--lime)" }}>PADEL EVOLUTION</div>
            <div style={{ fontSize: 13, color: "var(--muted)", fontFamily: "'Outfit',sans-serif", fontWeight: 500 }}>{circolo?.nome || "Circolo"}</div>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 28, color: "var(--text)" }}>{new Date().toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" })}</div>
          <div style={{ fontSize: 12, color: "var(--muted)", fontFamily: "'Outfit',sans-serif" }}>{new Date().toLocaleDateString("it-IT", { weekday: "long", day: "numeric", month: "long" })}</div>
        </div>
      </div>

      {!t ? (
        <div style={{ textAlign: "center", padding: "60px 0" }}>
          <div style={{ fontSize: 72, marginBottom: 20, opacity: .3 }}>🏆</div>
          <div style={{ fontSize: 28, color: "var(--muted)", letterSpacing: 2 }}>NESSUN TORNEO IN CORSO</div>
        </div>
      ) : (
        <div>
          {/* Nome torneo */}
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{ fontSize: 11, letterSpacing: 3, color: "var(--lime)", marginBottom: 6 }}>TORNEO IN CORSO</div>
            <div style={{ fontSize: 32, letterSpacing: 2 }}>{t.nome}</div>
            <div style={{ fontSize: 13, color: "var(--muted)", fontFamily: "'Outfit',sans-serif", marginTop: 4 }}>
              {FORMATI.find(f => f.id === t.formato)?.nome} · {t.categoria || ""}
            </div>
          </div>

          {/* Partite in corso */}
          {partiteInCorso.length > 0 && (
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 13, letterSpacing: 3, color: "var(--orange)", marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--orange)", display: "inline-block", animation: "pulse 1s infinite" }} />
                PARTITE IN CORSO
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))", gap: 12 }}>
                {partiteInCorso.map(p => (
                  <div key={p.id} style={{ background: "var(--card)", border: "1px solid var(--border2)", borderRadius: 14, padding: "16px 20px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", gap: 10 }}>
                      <div>
                        <div style={{ fontSize: 14, lineHeight: 1.3 }}>{p.c1?.g1?.nome}</div>
                        <div style={{ fontSize: 14, lineHeight: 1.3, color: "var(--muted)" }}>{p.c1?.g2?.nome}</div>
                      </div>
                      <div style={{ fontSize: 22, color: "var(--lime)", padding: "0 8px" }}>VS</div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 14, lineHeight: 1.3 }}>{p.c2?.g1?.nome}</div>
                        <div style={{ fontSize: 14, lineHeight: 1.3, color: "var(--muted)" }}>{p.c2?.g2?.nome}</div>
                      </div>
                    </div>
                    {p.campo && <div style={{ textAlign: "center", fontSize: 11, color: "var(--muted)", marginTop: 8, fontFamily: "'Outfit',sans-serif" }}>🏟️ {p.campo}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Ultimi risultati */}
          {partiteRecenti.length > 0 && (
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 13, letterSpacing: 3, color: "var(--muted)", marginBottom: 14 }}>ULTIMI RISULTATI</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {partiteRecenti.slice(-4).reverse().map(p => {
                  const w1 = p.s1 > p.s2, w2 = p.s2 > p.s1;
                  return (
                    <div key={p.id} style={{ background: "var(--card2)", borderRadius: 10, padding: "10px 18px", display: "grid", gridTemplateColumns: "1fr 80px 1fr", alignItems: "center", gap: 10 }}>
                      <div style={{ color: w1 ? "var(--lime)" : "var(--muted)", fontSize: 13 }}>
                        {p.c1?.g1?.nome?.split(" ")[0]} / {p.c1?.g2?.nome?.split(" ")[0]}
                        {w1 && <span style={{ marginLeft: 8, fontSize: 11 }}>🏆</span>}
                      </div>
                      <div style={{ textAlign: "center", fontSize: 20, letterSpacing: 2 }}>
                        <span style={{ color: w1 ? "var(--lime)" : "var(--muted)" }}>{p.s1}</span>
                        <span style={{ color: "var(--muted)", margin: "0 4px" }}>-</span>
                        <span style={{ color: w2 ? "var(--lime)" : "var(--muted)" }}>{p.s2}</span>
                      </div>
                      <div style={{ textAlign: "right", color: w2 ? "var(--lime)" : "var(--muted)", fontSize: 13 }}>
                        {w2 && <span style={{ marginRight: 8, fontSize: 11 }}>🏆</span>}
                        {p.c2?.g1?.nome?.split(" ")[0]} / {p.c2?.g2?.nome?.split(" ")[0]}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Classifica live */}
          {(t.gironi || []).length > 0 && (
            <div>
              <div style={{ fontSize: 13, letterSpacing: 3, color: "var(--muted)", marginBottom: 14 }}>CLASSIFICA LIVE</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 12 }}>
                {(t.gironi || []).map(g => (
                  <div key={g.id} style={{ background: "var(--card2)", borderRadius: 12, padding: "12px 16px" }}>
                    <div style={{ fontSize: 12, color: "var(--lime)", letterSpacing: 2, marginBottom: 10 }}>{g.nome}</div>
                    {g.classifica.slice(0, 4).map((r, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, fontSize: 12, fontFamily: "'Outfit',sans-serif" }}>
                        <span style={{ color: i < 2 ? "var(--gold)" : "var(--muted)", width: 18, textAlign: "center" }}>{["🥇", "🥈", "🥉"][i] || i + 1}</span>
                        <span style={{ flex: 1 }}>{r.coppia?.g1?.nome?.split(" ")[0]} / {r.coppia?.g2?.nome?.split(" ")[0]}</span>
                        <span style={{ color: "var(--lime)", fontFamily: "'Russo One',sans-serif", fontSize: 15 }}>{r.Pts}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}`}</style>
    </div>
  );

  if (fullscreen) return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1000, background: "var(--dark)", overflow: "auto" }}>
      <button onClick={() => setFullscreen(false)} style={{ position: "fixed", top: 16, right: 16, zIndex: 1001, background: "rgba(0,0,0,.6)", border: "1px solid var(--border)", borderRadius: 8, color: "white", padding: "8px 14px", cursor: "pointer", fontSize: 13 }}>✕ Esci fullscreen</button>
      <TVContent />
    </div>
  );

  return (
    <div>
      <div className="page-header">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10 }}>
          <div>
            <div className="page-title">TV<br /><span>SCHERMO LIVE</span></div>
            <div className="page-sub">Proietta il tabellone su qualsiasi schermo o TV</div>
          </div>
          <button className="btn btn-lime" onClick={() => setFullscreen(true)}>📺 Attiva Fullscreen</button>
        </div>
      </div>
      <div className="form-group" style={{ marginBottom: 20 }}>
        <label className="form-label">Seleziona Torneo</label>
        <select className="input" style={{ maxWidth: 400 }} value={selTorneo} onChange={e => setSelTorneo(e.target.value)}>
          <option value="">Nessun torneo</option>
          {tornei.map(t => <option key={t.id} value={t.id}>{t.nome} ({t.status})</option>)}
        </select>
      </div>
      <div style={{ border: "2px solid var(--border)", borderRadius: 16, overflow: "hidden", maxHeight: 500, overflowY: "auto" }}>
        <TVContent />
      </div>
      <div className="card-sm" style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontSize: 22 }}>💡</span>
        <div style={{ fontSize: 13, color: "var(--muted)" }}>
          Clicca <b style={{ color: "var(--lime)" }}>Attiva Fullscreen</b> per proiettare su TV. Si aggiorna automaticamente ogni 30 secondi.
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// QR SCANNER — Refertazione rapida match
// ─────────────────────────────────────────────────────────────

function QRRefertazione({ tornei, setTornei, toast }) {
  const [mode, setMode] = useState("list"); // list | scan | manual
  const [selTorneo, setSelTorneo] = useState(tornei.find(t => t.status === "live")?.id || "");
  const [selMatch, setSelMatch] = useState(null);
  const [scores, setScores] = useState({ s1: "", s2: "" });

  const t = tornei.find(x => x.id === selTorneo);
  const partiteDaGiocare = t ? [
    ...(t.partite || []).filter(p => p.s1 === null && !p.bye && p.c2).map(p => ({ ...p, source: "partite" })),
    ...(t.gironi || []).flatMap(g => (g.partite || []).filter(p => p.s1 === null && p.c2).map(p => ({ ...p, source: "girone", gironeId: g.id, gironeName: g.nome }))),
  ] : [];

  function salvaRisultato() {
    if (!selMatch || scores.s1 === "" || scores.s2 === "") return;
    const s1 = parseInt(scores.s1), s2 = parseInt(scores.s2);
    setTornei(prev => prev.map(x => {
      if (x.id !== selTorneo) return x;
      if (selMatch.source === "partite") {
        return { ...x, partite: x.partite.map(p => p.id === selMatch.id ? { ...p, s1, s2 } : p) };
      } else {
        const gironi = x.gironi.map(g => {
          if (g.id !== selMatch.gironeId) return g;
          const partite = g.partite.map(p => p.id === selMatch.id ? { ...p, s1, s2 } : p);
          return { ...g, partite, classifica: recalcGirone({ ...g, partite }) };
        });
        return { ...x, gironi };
      }
    }));
    toast(`Risultato salvato: ${s1} - ${s2} ✓`);
    setSelMatch(null);
    setScores({ s1: "", s2: "" });
    setMode("list");
  }

  return (
    <div>
      <div className="page-header">
        <div className="page-title">QR<br /><span>REFERTAZIONE</span></div>
        <div className="page-sub">Registra i risultati rapidamente da mobile</div>
      </div>

      <div className="form-group" style={{ marginBottom: 20 }}>
        <label className="form-label">Torneo</label>
        <select className="input" style={{ maxWidth: 380 }} value={selTorneo} onChange={e => setSelTorneo(e.target.value)}>
          <option value="">Seleziona...</option>
          {tornei.filter(t => t.status === "live").map(t => <option key={t.id} value={t.id}>{t.nome}</option>)}
        </select>
      </div>

      {t && (
        <div>
          <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
            <button className={`btn ${mode === "list" ? "btn-lime" : "btn-ghost"}`} onClick={() => setMode("list")}>📋 Lista Partite</button>
            <button className={`btn ${mode === "scan" ? "btn-lime" : "btn-ghost"}`} onClick={() => setMode("scan")}>📷 Scansiona QR</button>
          </div>

          {mode === "scan" && (
            <div className="glass" style={{ textAlign: "center", padding: "40px 24px", marginBottom: 20 }}>
              <div style={{ fontSize: 64, marginBottom: 16 }}>📷</div>
              <div style={{ fontFamily: "'Russo One',sans-serif", fontSize: 18, marginBottom: 10 }}>CAMERA SCANNER QR</div>
              <div style={{ color: "var(--muted)", fontSize: 13, marginBottom: 20, lineHeight: 1.6 }}>
                Ogni coppia ha un QR code univoco. Scansiona il QR della partita per aprire direttamente la scheda risultato.
              </div>
              <div style={{ background: "var(--card2)", border: "2px dashed var(--border2)", borderRadius: 16, padding: "40px", marginBottom: 20, maxWidth: 240, margin: "0 auto 20px" }}>
                <div style={{ fontSize: 11, color: "var(--muted)", letterSpacing: 2 }}>AREA SCANSIONE</div>
                <div style={{ fontSize: 40, margin: "16px 0" }}>⬜</div>
                <div style={{ fontSize: 11, color: "var(--muted)" }}>Punta la camera verso il QR</div>
              </div>
              <div style={{ fontSize: 12, color: "var(--muted)" }}>
                💡 Funzione disponibile nell'app mobile nativa (PWA in arrivo).<br />
                Per ora usa la <b style={{ color: "var(--lime)" }}>Lista Partite</b> per refertare.
              </div>
            </div>
          )}

          {mode === "list" && (
            <div>
              {partiteDaGiocare.length === 0 ? (
                <div className="empty"><div className="empty-icon">✅</div><div className="empty-title">TUTTE LE PARTITE REFERTATE</div></div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {partiteDaGiocare.map(p => (
                    <div key={p.id} className="match-card" style={{ cursor: "pointer" }} onClick={() => { setSelMatch(p); setScores({ s1: "", s2: "" }); }}>
                      {p.gironeName && <div style={{ fontSize: 10, color: "var(--lime)", fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>{p.gironeName}</div>}
                      <div className="match-grid">
                        <div style={{ textAlign: "left" }}>
                          <div style={{ fontWeight: 700, fontSize: 13 }}>{p.c1?.g1?.nome}</div>
                          <div style={{ fontSize: 12, color: "var(--muted)" }}>{p.c1?.g2?.nome}</div>
                        </div>
                        <div className="match-vs">VS</div>
                        <div style={{ textAlign: "right" }}>
                          <div style={{ fontWeight: 700, fontSize: 13 }}>{p.c2?.g1?.nome}</div>
                          <div style={{ fontSize: 12, color: "var(--muted)" }}>{p.c2?.g2?.nome}</div>
                        </div>
                      </div>
                      <div style={{ textAlign: "center", marginTop: 8 }}>
                        <span className="badge b-gold">Tap per inserire risultato →</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {selMatch && (
        <Modal title="⚡ Inserisci Risultato" onClose={() => setSelMatch(null)}>
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 10, alignItems: "center", background: "var(--card2)", borderRadius: 12, padding: "14px 16px" }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{selMatch.c1?.g1?.nome}</div>
                <div style={{ fontSize: 12, color: "var(--muted)" }}>{selMatch.c1?.g2?.nome}</div>
              </div>
              <div style={{ color: "var(--lime)", fontFamily: "'Russo One',sans-serif", fontSize: 16, textAlign: "center" }}>VS</div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{selMatch.c2?.g1?.nome}</div>
                <div style={{ fontSize: 12, color: "var(--muted)" }}>{selMatch.c2?.g2?.nome}</div>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 20 }}>
            <input className="input score-inp" style={{ width: 70, height: 70, fontSize: 32, textAlign: "center" }} type="number" min="0" max="99" value={scores.s1} onChange={e => setScores({ ...scores, s1: e.target.value })} placeholder="0" />
            <span style={{ fontFamily: "'Russo One',sans-serif", fontSize: 24, color: "var(--muted)" }}>:</span>
            <input className="input score-inp" style={{ width: 70, height: 70, fontSize: 32, textAlign: "center" }} type="number" min="0" max="99" value={scores.s2} onChange={e => setScores({ ...scores, s2: e.target.value })} placeholder="0" />
          </div>
          {scores.s1 !== "" && scores.s2 !== "" && (
            <div style={{ textAlign: "center", marginBottom: 14, fontSize: 13, color: "var(--muted)" }}>
              {parseInt(scores.s1) > parseInt(scores.s2)
                ? <span>🏆 Vince <b style={{ color: "var(--lime)" }}>{selMatch.c1?.g1?.nome?.split(" ")[0]} / {selMatch.c1?.g2?.nome?.split(" ")[0]}</b></span>
                : parseInt(scores.s2) > parseInt(scores.s1)
                  ? <span>🏆 Vince <b style={{ color: "var(--lime)" }}>{selMatch.c2?.g1?.nome?.split(" ")[0]} / {selMatch.c2?.g2?.nome?.split(" ")[0]}</b></span>
                  : <span>🤝 Pareggio</span>
              }
            </div>
          )}
          <div style={{ display: "flex", gap: 9 }}>
            <button className="btn btn-ghost" onClick={() => setSelMatch(null)}>Annulla</button>
            <button className="btn btn-lime" style={{ flex: 1, justifyContent: "center" }} onClick={salvaRisultato} disabled={scores.s1 === "" || scores.s2 === ""}>
              ✓ Salva Risultato
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// STEP 4 — SPONSOR & WHITE LABEL
// ─────────────────────────────────────────────────────────────

function SponsorWhiteLabel({ circolo, toast }) {
  const [tab, setTab] = useState("sponsor");
  const [sponsors, setSponsors] = useState([
    { id: "s1", nome: "Sport Store Roma", logo: "🏪", slogan: "Tutto per il padel!", livello: "gold", attivo: true, scadenza: "2026-12-31" },
    { id: "s2", nome: "Caffè del Circolo", logo: "☕", slogan: "La pausa perfetta", livello: "silver", attivo: true, scadenza: "2026-06-30" },
  ]);
  const [showNew, setShowNew] = useState(false);
  const [form, setForm] = useState({ nome: "", logo: "🏢", slogan: "", livello: "silver", scadenza: "", attivo: true });
  const [wlConfig, setWlConfig] = useState({
    nomeApp: circolo?.nome || "Padel Evolution",
    colorePrimario: "#C8F135",
    coloreSecondario: "#0B0F0A",
    logoUrl: "",
    slogan: "Il tuo circolo, la tua app",
    mostraBranding: true,
  });

  const livelli = [
    { id: "platinum", label: "Platinum", color: "var(--blue)", bg: "rgba(77,166,255,.12)", icon: "💎" },
    { id: "gold", label: "Gold", color: "var(--gold)", bg: "rgba(255,215,0,.12)", icon: "🥇" },
    { id: "silver", label: "Silver", color: "var(--silver)", bg: "rgba(192,192,192,.12)", icon: "🥈" },
    { id: "bronze", label: "Bronze", color: "var(--bronze)", bg: "rgba(205,127,50,.12)", icon: "🥉" },
  ];

  function salvaWL() {
    toast("White Label salvato! Le modifiche saranno visibili agli utenti.");
  }

  return (
    <div>
      <div className="page-header">
        <div className="page-title">SPONSOR &<br /><span>WHITE LABEL</span></div>
        <div className="page-sub">Gestisci sponsor e personalizza l'aspetto dell'app</div>
      </div>

      <div className="tabs">
        <button className={`tab ${tab === "sponsor" ? "active" : ""}`} onClick={() => setTab("sponsor")}>🏆 Sponsor</button>
        <button className={`tab ${tab === "whitelabel" ? "active" : ""}`} onClick={() => setTab("whitelabel")}>🎨 White Label</button>
        <button className={`tab ${tab === "preview" ? "active" : ""}`} onClick={() => setTab("preview")}>👁️ Preview</button>
      </div>

      {tab === "sponsor" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
            <div>
              <div className="section-title">SPONSOR ATTIVI ({sponsors.filter(s => s.attivo).length})</div>
              <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 3 }}>Gli sponsor appaiono nei tabelloni, nella TV Live e nelle comunicazioni</div>
            </div>
            <button className="btn btn-lime" onClick={() => { setForm({ nome: "", logo: "🏢", slogan: "", livello: "silver", scadenza: "", attivo: true }); setShowNew(true); }}>+ Nuovo Sponsor</button>
          </div>

          {/* Pacchetti */}
          <div className="g4" style={{ marginBottom: 24 }}>
            {livelli.map(l => {
              const count = sponsors.filter(s => s.livello === l.id && s.attivo).length;
              return (
                <div key={l.id} style={{ background: l.bg, border: `1px solid ${l.color}33`, borderRadius: 12, padding: "14px 16px" }}>
                  <div style={{ fontSize: 20, marginBottom: 6 }}>{l.icon}</div>
                  <div style={{ fontFamily: "'Russo One',sans-serif", fontSize: 15, color: l.color }}>{l.label}</div>
                  <div style={{ fontFamily: "'Russo One',sans-serif", fontSize: 24, color: "var(--text)", margin: "4px 0" }}>{count}</div>
                  <div style={{ fontSize: 11, color: "var(--muted)" }}>sponsor attivi</div>
                </div>
              );
            })}
          </div>

          {/* Lista sponsor */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {sponsors.map(s => {
              const liv = livelli.find(l => l.id === s.livello);
              return (
                <div key={s.id} style={{ background: "var(--card)", border: `1px solid ${s.attivo ? liv?.color + "33" : "var(--border)"}`, borderRadius: 14, padding: "16px 20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 46, height: 46, borderRadius: 12, background: liv?.bg || "var(--card2)", border: `1px solid ${liv?.color || "var(--border)"}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>{s.logo}</div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 15 }}>{s.nome}</div>
                        <div style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 2, fontStyle: "italic" }}>{s.slogan}</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
                      <span className="badge" style={{ background: liv?.bg, color: liv?.color, border: `1px solid ${liv?.color}33` }}>{liv?.icon} {liv?.label}</span>
                      <span className={`badge ${s.attivo ? "b-lime" : "b-gray"}`}>{s.attivo ? "Attivo" : "Scaduto"}</span>
                      <button className="btn-icon" onClick={() => setSponsors(sp => sp.filter(x => x.id !== s.id))}>🗑️</button>
                    </div>
                  </div>
                  {s.scadenza && <div style={{ marginTop: 10, fontSize: 12, color: "var(--muted)" }}>📅 Scadenza: {fmtDate(s.scadenza)}</div>}
                  <div style={{ marginTop: 10, padding: "8px 14px", background: "rgba(0,0,0,.3)", borderRadius: 8, fontSize: 12, color: "var(--muted)", display: "flex", gap: 16 }}>
                    <span>📺 Appare su: Tabelloni TV</span>
                    <span>📱 App giocatori</span>
                    {s.livello === "platinum" || s.livello === "gold" ? <span>📣 Newsletter</span> : null}
                  </div>
                </div>
              );
            })}
          </div>

          {showNew && (
            <Modal title="Nuovo Sponsor" onClose={() => setShowNew(false)}>
              <div className="form-row">
                <div className="form-group"><label className="form-label">Nome Azienda</label><input className="input" value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} /></div>
                <div className="form-group"><label className="form-label">Emoji/Logo</label><input className="input" value={form.logo} onChange={e => setForm({ ...form, logo: e.target.value })} maxLength={2} /></div>
              </div>
              <div className="form-group"><label className="form-label">Slogan</label><input className="input" value={form.slogan} onChange={e => setForm({ ...form, slogan: e.target.value })} placeholder="Es. Il meglio del padel!" /></div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Pacchetto</label>
                  <select className="input" value={form.livello} onChange={e => setForm({ ...form, livello: e.target.value })}>
                    {livelli.map(l => <option key={l.id} value={l.id}>{l.icon} {l.label}</option>)}
                  </select>
                </div>
                <div className="form-group"><label className="form-label">Scadenza</label><input className="input" type="date" value={form.scadenza} onChange={e => setForm({ ...form, scadenza: e.target.value })} /></div>
              </div>
              <div style={{ display: "flex", gap: 9 }}>
                <button className="btn btn-ghost" onClick={() => setShowNew(false)}>Annulla</button>
                <button className="btn btn-lime" style={{ flex: 1, justifyContent: "center" }} onClick={() => { if (!form.nome.trim()) return; setSponsors(s => [...s, { ...form, id: uid() }]); toast("Sponsor aggiunto!"); setShowNew(false); }}>Aggiungi →</button>
              </div>
            </Modal>
          )}
        </div>
      )}

      {tab === "whitelabel" && (
        <div>
          <div className="section-title" style={{ marginBottom: 16 }}>PERSONALIZZAZIONE APP</div>
          <div className="g2">
            <div>
              <div className="form-group"><label className="form-label">Nome App / Circolo</label><input className="input" value={wlConfig.nomeApp} onChange={e => setWlConfig({ ...wlConfig, nomeApp: e.target.value })} /></div>
              <div className="form-group"><label className="form-label">Slogan</label><input className="input" value={wlConfig.slogan} onChange={e => setWlConfig({ ...wlConfig, slogan: e.target.value })} /></div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Colore Primario</label>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <input type="color" value={wlConfig.colorePrimario} onChange={e => setWlConfig({ ...wlConfig, colorePrimario: e.target.value })} style={{ width: 44, height: 36, borderRadius: 8, border: "1px solid var(--border)", background: "none", cursor: "pointer" }} />
                    <input className="input" value={wlConfig.colorePrimario} onChange={e => setWlConfig({ ...wlConfig, colorePrimario: e.target.value })} style={{ fontFamily: "monospace" }} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Colore Sfondo</label>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <input type="color" value={wlConfig.coloreSecondario} onChange={e => setWlConfig({ ...wlConfig, coloreSecondario: e.target.value })} style={{ width: 44, height: 36, borderRadius: 8, border: "1px solid var(--border)", background: "none", cursor: "pointer" }} />
                    <input className="input" value={wlConfig.coloreSecondario} onChange={e => setWlConfig({ ...wlConfig, coloreSecondario: e.target.value })} style={{ fontFamily: "monospace" }} />
                  </div>
                </div>
              </div>
              <div className="form-group"><label className="form-label">URL Logo (opzionale)</label><input className="input" value={wlConfig.logoUrl} onChange={e => setWlConfig({ ...wlConfig, logoUrl: e.target.value })} placeholder="https://..." /></div>
              <div className="form-group">
                <div className="tog-wrap">
                  <Tog v={wlConfig.mostraBranding} onChange={v => setWlConfig({ ...wlConfig, mostraBranding: v })} />
                  <span style={{ fontSize: 13.5 }}>Mostra "Powered by Padel Evolution"</span>
                </div>
              </div>
              <button className="btn btn-lime" style={{ width: "100%", justifyContent: "center" }} onClick={salvaWL}>💾 Salva White Label</button>
            </div>
            <div>
              <div className="form-label" style={{ marginBottom: 10 }}>ANTEPRIMA</div>
              <div style={{ background: wlConfig.coloreSecondario, borderRadius: 16, overflow: "hidden", border: "1px solid var(--border)" }}>
                <div style={{ background: `${wlConfig.coloreSecondario}ee`, borderBottom: `1px solid ${wlConfig.colorePrimario}22`, height: 48, display: "flex", alignItems: "center", padding: "0 16px", gap: 10 }}>
                  <div style={{ width: 28, height: 28, background: wlConfig.colorePrimario, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>🎾</div>
                  <div style={{ fontFamily: "'Russo One',sans-serif", fontSize: 14, letterSpacing: 2, color: wlConfig.colorePrimario }}>{wlConfig.nomeApp.toUpperCase()}</div>
                </div>
                <div style={{ padding: "20px 16px" }}>
                  <div style={{ fontFamily: "'Russo One',sans-serif", fontSize: 18, color: "#EEF5E0", marginBottom: 6 }}>BENVENUTO</div>
                  <div style={{ fontSize: 12, color: "rgba(238,245,224,.5)", marginBottom: 16 }}>{wlConfig.slogan}</div>
                  <div style={{ background: wlConfig.colorePrimario, borderRadius: 9, padding: "10px 16px", fontSize: 13, fontWeight: 700, color: wlConfig.coloreSecondario, display: "inline-block" }}>Accedi →</div>
                  {wlConfig.mostraBranding && <div style={{ fontSize: 10, color: "rgba(238,245,224,.3)", marginTop: 16 }}>Powered by Padel Evolution</div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === "preview" && (
        <div>
          <div className="section-title" style={{ marginBottom: 16 }}>BANNER SPONSOR SU TABELLONE</div>
          <div style={{ background: "var(--dark)", borderRadius: 14, padding: "20px", border: "1px solid var(--border)" }}>
            <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap", marginBottom: 16 }}>
              {sponsors.filter(s => s.attivo).map(s => {
                const liv = livelli.find(l => l.id === s.livello);
                return (
                  <div key={s.id} style={{ background: liv?.bg, border: `1px solid ${liv?.color}44`, borderRadius: 10, padding: "8px 16px", display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 20 }}>{s.logo}</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 12, color: liv?.color }}>{s.nome}</div>
                      <div style={{ fontSize: 10, color: "var(--muted)" }}>{s.slogan}</div>
                    </div>
                  </div>
                );
              })}
              {sponsors.filter(s => s.attivo).length === 0 && <div style={{ color: "var(--muted)", fontSize: 13 }}>Nessuno sponsor attivo</div>}
            </div>
            <div style={{ textAlign: "center", fontSize: 11, color: "var(--muted)" }}>↑ Così appare sui tabelloni TV e nell'app giocatori</div>
          </div>
        </div>
      )}
    </div>
  );
}
// ─────────────────────────────────────────────────────────────
// SUPABASE CLIENT
// ─────────────────────────────────────────────────────────────
const SUPA_URL = "https://vzkhkxtzzibbrjkygtgi.supabase.co";
const SUPA_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6a2hreHR6emliYnJqa3lndGdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5NzQxNTMsImV4cCI6MjA5NTU1MDE1M30.CrT5Ic3my8AljLdnnFCrJyNAtYG2g2_IeL2HDh2J1WA";

// Minimal Supabase REST client (no npm needed in artifact)
const supa = {
  _url: SUPA_URL,
  _key: SUPA_KEY,
  _headers() {
    const h = { "Content-Type": "application/json", "apikey": this._key, "Authorization": `Bearer ${this._key}` };
    const tok = localStorage.getItem("supa_token");
    if (tok) h["Authorization"] = `Bearer ${tok}`;
    return h;
  },

  // AUTH
  async signUp(email, password, meta = {}) {
    const r = await fetch(`${this._url}/auth/v1/signup`, {
      method: "POST", headers: { "Content-Type": "application/json", "apikey": this._key },
      body: JSON.stringify({ email, password, data: meta })
    });
    return r.json();
  },
  async signIn(email, password) {
    const r = await fetch(`${this._url}/auth/v1/token?grant_type=password`, {
      method: "POST", headers: { "Content-Type": "application/json", "apikey": this._key },
      body: JSON.stringify({ email, password })
    });
    const d = await r.json();
    if (d.access_token) {
      localStorage.setItem("supa_token", d.access_token);
      localStorage.setItem("supa_refresh", d.refresh_token);
      localStorage.setItem("supa_user", JSON.stringify(d.user));
    }
    return d;
  },
  async refreshToken() {
    const refresh = localStorage.getItem("supa_refresh");
    if (!refresh) return null;
    const r = await fetch(`${this._url}/auth/v1/token?grant_type=refresh_token`, {
      method: "POST", headers: { "Content-Type": "application/json", "apikey": this._key },
      body: JSON.stringify({ refresh_token: refresh })
    });
    const d = await r.json();
    if (d.access_token) {
      localStorage.setItem("supa_token", d.access_token);
      localStorage.setItem("supa_refresh", d.refresh_token);
      localStorage.setItem("supa_user", JSON.stringify(d.user));
      return d;
    }
    return null;
  },
  async signOut() {
    await fetch(`${this._url}/auth/v1/logout`, { method: "POST", headers: this._headers() });
    localStorage.removeItem("supa_token");
    localStorage.removeItem("supa_refresh");
    localStorage.removeItem("supa_user");
  },
  getUser() {
    try { return JSON.parse(localStorage.getItem("supa_user")); } catch { return null; }
  },
  async resetPassword(email) {
    const r = await fetch(`${this._url}/auth/v1/recover`, {
      method: "POST", headers: { "Content-Type": "application/json", "apikey": this._key },
      body: JSON.stringify({ email })
    });
    return r.json();
  },

  // DB — generic REST
  async _refreshIfNeeded(response) {
    if (response.status === 401) {
      await this.refreshToken();
      return true; // retry
    }
    return false;
  },
  async select(table, query = "") {
    let r = await fetch(`${this._url}/rest/v1/${table}?${query}&order=created_at.desc`, { headers: this._headers() });
    if (r.status === 401) { await this.refreshToken(); r = await fetch(`${this._url}/rest/v1/${table}?${query}&order=created_at.desc`, { headers: this._headers() }); }
    if (!r.ok) return { data: null, error: await r.json() };
    return { data: await r.json(), error: null };
  },
  async insert(table, body) {
    let r = await fetch(`${this._url}/rest/v1/${table}`, {
      method: "POST", headers: { ...this._headers(), "Prefer": "return=representation" },
      body: JSON.stringify(body)
    });
    if (r.status === 401) {
      await this.refreshToken();
      r = await fetch(`${this._url}/rest/v1/${table}`, {
        method: "POST", headers: { ...this._headers(), "Prefer": "return=representation" },
        body: JSON.stringify(body)
      });
    }
    if (!r.ok) return { data: null, error: await r.json() };
    return { data: await r.json(), error: null };
  },
  async update(table, id, body) {
    const r = await fetch(`${this._url}/rest/v1/${table}?id=eq.${id}`, {
      method: "PATCH", headers: { ...this._headers(), "Prefer": "return=representation" },
      body: JSON.stringify(body)
    });
    if (!r.ok) return { data: null, error: await r.json() };
    return { data: await r.json(), error: null };
  },
  async delete(table, id) {
    const r = await fetch(`${this._url}/rest/v1/${table}?id=eq.${id}`, {
      method: "DELETE", headers: this._headers()
    });
    if (!r.ok) return { error: await r.json() };
    return { error: null };
  },
  async upsert(table, body) {
    const r = await fetch(`${this._url}/rest/v1/${table}`, {
      method: "POST", headers: { ...this._headers(), "Prefer": "resolution=merge-duplicates,return=representation" },
      body: JSON.stringify(body)
    });
    if (!r.ok) return { data: null, error: await r.json() };
    return { data: await r.json(), error: null };
  },

  // REALTIME (polling fallback)
  _subs: {},
  subscribe(table, circolo_id, cb) {
    const key = `${table}_${circolo_id}`;
    if (this._subs[key]) clearInterval(this._subs[key]);
    this._subs[key] = setInterval(async () => {
      const { data } = await this.select(table, `circolo_id=eq.${circolo_id}`);
      if (data) cb(data);
    }, 5000);
    return () => clearInterval(this._subs[key]);
  }
};

// ─────────────────────────────────────────────────────────────
// SUPABASE HOOKS
// ─────────────────────────────────────────────────────────────
function useSupaTable(table, filter = "", deps = []) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function load() {
    setLoading(true);
    const { data: d, error: e } = await supa.select(table, filter);
    if (e) setError(e.message || "Errore caricamento");
    else setData(d || []);
    setLoading(false);
  }

  useEffect(() => { load(); }, deps);
  return { data, setData, loading, error, reload: load };
}

// ─────────────────────────────────────────────────────────────
// SUPER ADMIN PANEL
// ─────────────────────────────────────────────────────────────
function SuperAdminPanel({ user, onLogout, notifiche, setNotifiche, onImpersonate }) {
  const [tab, setTab] = useState("circoli");
  const [toastMsg, setToastMsg] = useState(null);
  function toast(msg) { setToastMsg(msg); }

  const { data: circoli, reload: reloadCircoli, loading: loadCircoli } = useSupaTable("circoli", "");
  const { data: allProfiles, loading: loadProfiles } = useSupaTable("profiles", "");
  const { data: allTornei } = useSupaTable("tornei", "");

  const [showNew, setShowNew] = useState(false);
  const [form, setForm] = useState({ nome: "", citta: "", email: "", telefono: "", piano: "base" });

  async function creaCircolo() {
    if (!form.nome.trim()) return;
    const { error } = await supa.insert("circoli", { ...form, attivo: true });
    if (error) { toast("Errore: " + (error.message || JSON.stringify(error))); return; }
    toast("Circolo creato!");
    reloadCircoli();
    setShowNew(false);
    setForm({ nome: "", citta: "", email: "", telefono: "", piano: "base" });
  }

  async function toggleCircolo(id, attivo) {
    await supa.update("circoli", id, { attivo: !attivo });
    reloadCircoli();
    toast(attivo ? "Circolo disattivato" : "Circolo attivato");
  }

  async function deleteCircolo(id) {
    if (!confirm("Eliminare il circolo? Tutti i dati verranno persi.")) return;
    await supa.delete("circoli", id);
    reloadCircoli();
    toast("Circolo eliminato");
  }

  const pianoCls = { base: "b-gray", pro: "b-lime", enterprise: "b-gold" };

  return (
    <div className="app">
      <div className="topbar">
        <div className="logo"><div className="logo-icon">🎾</div><div className="logo-text">PADEL <span>EVOLUTION</span></div></div>
        <div className="topbar-right">
          <span style={{ fontSize: 10.5, fontWeight: 700, padding: "3px 9px", borderRadius: 20, background: "rgba(255,215,0,.12)", color: "var(--gold)", border: "1px solid rgba(255,215,0,.3)", letterSpacing: 1.5 }}>SUPER ADMIN</span>
          <NotifBell notifiche={notifiche} setNotifiche={setNotifiche} />
          <div style={{ display: "flex", alignItems: "center", gap: 7, background: "var(--card)", border: "1px solid var(--border)", borderRadius: 50, padding: "4px 11px 4px 6px", cursor: "pointer", fontSize: 13, fontWeight: 600 }} onClick={onLogout}>
            <Av nome={user.email || "SA"} size={22} />Esci
          </div>
        </div>
      </div>

      <div className="app-body">
        <aside className="sidebar">
          <div className="sidebar-sec">Super Admin</div>
          {[{ id: "circoli", icon: "🏢", label: "Circoli" }, { id: "utenti", icon: "👥", label: "Utenti" }, { id: "stats", icon: "📊", label: "Statistiche" }].map(item => (
            <div key={item.id} className={`nav-item ${tab === item.id ? "active" : ""}`} onClick={() => setTab(item.id)}>
              <span className="nav-icon">{item.icon}</span>{item.label}
            </div>
          ))}
          <div className="sidebar-bottom"><div className="nav-item" onClick={onLogout}><span className="nav-icon">🚪</span>Esci</div></div>
        </aside>

        <main className="content">
          {tab === "circoli" && (
            <div>
              <div className="page-header">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10 }}>
                  <div><div className="page-title">GESTIONE<br /><span>CIRCOLI</span></div><div className="page-sub">{circoli.length} circoli registrati</div></div>
                  <button className="btn btn-lime" onClick={() => setShowNew(true)}>+ Nuovo Circolo</button>
                </div>
              </div>

              <div className="stat-grid">
                {[
                  { icon: "🏢", v: circoli.length, l: "Circoli totali" },
                  { icon: "✅", v: circoli.filter(c => c.attivo).length, l: "Attivi" },
                  { icon: "⭐", v: circoli.filter(c => c.piano === "pro").length, l: "Piano Pro" },
                  { icon: "👑", v: circoli.filter(c => c.piano === "enterprise").length, l: "Enterprise" },
                  { icon: "👥", v: allProfiles.length, l: "Utenti totali" },
                  { icon: "🏆", v: allTornei.length, l: "Tornei totali" },
                ].map((s, i) => (
                  <div key={i} className="stat-card"><div className="stat-icon">{s.icon}</div><div className="stat-val">{s.v}</div><div className="stat-lbl">{s.l}</div></div>
                ))}
              </div>

              {loadCircoli ? <div style={{ textAlign: "center", padding: 40, color: "var(--muted)" }}>⏳ Caricamento...</div> : (
                <div className="card" style={{ padding: 0, overflowX: "auto" }}>
                  <table className="table">
                    <thead><tr><th>Circolo</th><th>Città</th><th>Email</th><th>Piano</th><th>Stato</th><th>Tornei</th><th></th></tr></thead>
                    <tbody>
                      {circoli.map(c => (
                        <tr key={c.id}>
                          <td><div style={{ fontWeight: 700, fontSize: 14 }}>{c.nome}</div></td>
                          <td style={{ color: "var(--muted)", fontSize: 13 }}>{c.citta || "—"}</td>
                          <td style={{ color: "var(--muted)", fontSize: 12.5 }}>{c.email || "—"}</td>
                          <td>
                            <select className="input" style={{ padding: "4px 8px", fontSize: 12, width: "auto" }} value={c.piano}
                              onChange={async e => { await supa.update("circoli", c.id, { piano: e.target.value }); reloadCircoli(); }}>
                              <option value="base">Base</option>
                              <option value="pro">Pro</option>
                              <option value="enterprise">Enterprise</option>
                            </select>
                          </td>
                          <td><span className={`badge ${c.attivo ? "b-lime" : "b-red"}`}>{c.attivo ? "● Attivo" : "Inattivo"}</span></td>
                          <td style={{ fontFamily: "'Russo One',sans-serif", color: "var(--lime)" }}>{allTornei.filter(t => t.circolo_id === c.id).length}</td>
                          <td>
                            <div style={{ display: "flex", gap: 5 }}>
                              <button className="btn btn-lime btn-sm" onClick={() => onImpersonate(c)}>🚪 Entra</button>
                              <button className={`btn btn-sm ${c.attivo ? "btn-red" : "btn-ghost"}`} onClick={() => toggleCircolo(c.id, c.attivo)}>{c.attivo ? "Disattiva" : "Attiva"}</button>
                              <button className="btn-icon" onClick={() => deleteCircolo(c.id)}>🗑️</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {circoli.length === 0 && <div className="empty"><div className="empty-icon">🏢</div><div className="empty-title">NESSUN CIRCOLO</div><div className="empty-sub">Crea il primo circolo</div></div>}
                </div>
              )}
            </div>
          )}

          {tab === "utenti" && (
            <div>
              <div className="page-header"><div className="page-title">UTENTI<br /><span>SISTEMA</span></div><div className="page-sub">{allProfiles.length} utenti registrati</div></div>
              <div className="card" style={{ padding: 0 }}>
                <table className="table">
                  <thead><tr><th>Nome</th><th>Email</th><th>Ruolo</th><th>Circolo</th></tr></thead>
                  <tbody>
                    {allProfiles.map(p => (
                      <tr key={p.id}>
                        <td><div style={{ display: "flex", alignItems: "center", gap: 9 }}><Av nome={p.nome || p.email || "?"} size={30} /><div style={{ fontWeight: 700, fontSize: 13.5 }}>{p.nome || "—"}</div></div></td>
                        <td style={{ color: "var(--muted)", fontSize: 12.5 }}>{p.email}</td>
                        <td><span className={`badge ${p.ruolo === "superadmin" ? "b-gold" : p.ruolo === "admin_circolo" ? "b-lime" : "b-blue"}`}>{p.ruolo}</span></td>
                        <td style={{ color: "var(--muted)", fontSize: 12.5 }}>{circoli.find(c => c.id === p.circolo_id)?.nome || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {allProfiles.length === 0 && <div className="empty"><div className="empty-icon">👥</div><div className="empty-title">NESSUN UTENTE</div></div>}
              </div>
            </div>
          )}

          {tab === "stats" && (
            <div>
              <div className="page-header"><div className="page-title">STATISTICHE<br /><span>PIATTAFORMA</span></div></div>
              <div className="g2">
                {[
                  { icon: "🏢", titolo: "Circoli attivi", val: circoli.filter(c => c.attivo).length, sub: `su ${circoli.length} totali` },
                  { icon: "👥", titolo: "Utenti registrati", val: allProfiles.length, sub: "totale piattaforma" },
                  { icon: "🏆", titolo: "Tornei creati", val: allTornei.length, sub: "tutti i circoli" },
                  { icon: "📅", titolo: "Tornei live", val: allTornei.filter(t => t.status === "live").length, sub: "in corso ora" },
                ].map((s, i) => (
                  <div key={i} className="glass" style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 36, marginBottom: 10 }}>{s.icon}</div>
                    <div style={{ fontFamily: "'Russo One',sans-serif", fontSize: 42, color: "var(--lime)" }}>{s.val}</div>
                    <div style={{ fontWeight: 700, fontSize: 15, marginTop: 6 }}>{s.titolo}</div>
                    <div style={{ color: "var(--muted)", fontSize: 12.5, marginTop: 4 }}>{s.sub}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 28 }}>
                <div className="section-title" style={{ marginBottom: 14 }}>DISTRIBUZIONE PIANI</div>
                {["base", "pro", "enterprise"].map(piano => {
                  const count = circoli.filter(c => c.piano === piano).length;
                  const pct = circoli.length > 0 ? Math.round((count / circoli.length) * 100) : 0;
                  return (
                    <div key={piano} style={{ marginBottom: 14 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 5 }}>
                        <span style={{ textTransform: "capitalize", fontWeight: 600 }}>{piano}</span>
                        <span style={{ color: "var(--lime)", fontFamily: "'Russo One',sans-serif" }}>{count} circoli ({pct}%)</span>
                      </div>
                      <div className="prog" style={{ height: 8 }}><div className="prog-fill" style={{ width: `${pct}%` }} /></div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </main>
      </div>

      {showNew && (
        <Modal title="Nuovo Circolo" onClose={() => setShowNew(false)}>
          <div className="form-row">
            <div className="form-group"><label className="form-label">Nome Circolo</label><input className="input" value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} placeholder="Es. Padel Club Roma" /></div>
            <div className="form-group"><label className="form-label">Città</label><input className="input" value={form.citta} onChange={e => setForm({ ...form, citta: e.target.value })} placeholder="Es. Roma" /></div>
          </div>
          <div className="form-row">
            <div className="form-group"><label className="form-label">Email</label><input className="input" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
            <div className="form-group"><label className="form-label">Telefono</label><input className="input" value={form.telefono} onChange={e => setForm({ ...form, telefono: e.target.value })} /></div>
          </div>
          <div className="form-group">
            <label className="form-label">Piano</label>
            <select className="input" value={form.piano} onChange={e => setForm({ ...form, piano: e.target.value })}>
              <option value="base">Base — Gratuito</option>
              <option value="pro">Pro — €29/mese</option>
              <option value="enterprise">Enterprise — €79/mese</option>
            </select>
          </div>
          <div style={{ display: "flex", gap: 9 }}>
            <button className="btn btn-ghost" onClick={() => setShowNew(false)}>Annulla</button>
            <button className="btn btn-lime" style={{ flex: 1, justifyContent: "center" }} onClick={creaCircolo}>Crea Circolo →</button>
          </div>
        </Modal>
      )}

      {toastMsg && <Toast msg={toastMsg} onDone={() => setToastMsg(null)} />}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// LOGIN CON SUPABASE REALE
// ─────────────────────────────────────────────────────────────
function LoginSupabase({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nome, setNome] = useState("");
  const [circoloNome, setCircoloNome] = useState("");
  const [loading, setLoading] = useState(false);
  const [errore, setErrore] = useState("");
  const [resetSent, setResetSent] = useState(false);

  async function doLogin() {
    setLoading(true); setErrore("");
    const d = await supa.signIn(email, password);
    if (d.error || !d.access_token) {
      setErrore(d.error?.message || d.msg || "Credenziali errate");
      setLoading(false); return;
    }
    // Carica profile
    const { data: profiles } = await supa.select("profiles", `id=eq.${d.user.id}`);
    const profile = profiles?.[0];
    if (!profile) { setErrore("Profilo non trovato. Contatta l'amministratore."); setLoading(false); return; }

    let circolo = null;
    if (profile.circolo_id) {
      const { data: c } = await supa.select("circoli", `id=eq.${profile.circolo_id}`);
      circolo = c?.[0] || null;
    }
    onLogin({ ...d.user, ...profile, circolo });
    setLoading(false);
  }

  async function doRegister() {
    if (!email || !password || !nome) { setErrore("Compila tutti i campi"); return; }
    setLoading(true); setErrore("");

    // Crea circolo
    const { data: c, error: ce } = await supa.insert("circoli", { nome: circoloNome || `Circolo di ${nome}`, attivo: true, piano: "base" });
    if (ce) { setErrore("Errore creazione circolo: " + (ce.message || JSON.stringify(ce))); setLoading(false); return; }
    const circolo = c?.[0];

    // Registra utente
    const d = await supa.signUp(email, password, { nome });
    if (d.error) { setErrore(d.error.message); setLoading(false); return; }

    // Aspetta 1 secondo poi login
    await new Promise(r => setTimeout(r, 1000));
    const login = await supa.signIn(email, password);
    if (login.access_token) {
      // Crea profile con retry
      await supa.upsert("profiles", { id: login.user.id, nome, email, ruolo: "admin_circolo", circolo_id: circolo?.id });
      // Aggiorna circolo con email
      if (circolo?.id) await supa.update("circoli", circolo.id, { email });
      const { data: profiles } = await supa.select("profiles", `id=eq.${login.user.id}`);
      onLogin({ ...login.user, ...profiles?.[0], circolo });
    } else if (login.error === "Email not confirmed") {
      setErrore("Controlla la tua email per confermare l'account, poi accedi.");
    } else {
      setErrore(login.error_description || login.msg || "Account creato! Prova ad accedere.");
    }
    setLoading(false);
  }

  async function doReset() {
    if (!email) { setErrore("Inserisci la tua email"); return; }
    await supa.resetPassword(email);
    setResetSent(true);
  }

  if (resetSent) return (
    <div className="login-bg"><div className="court-bg" />
      <div className="login-box" style={{ textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>📧</div>
        <div style={{ fontFamily: "'Russo One',sans-serif", fontSize: 20, marginBottom: 10 }}>Email inviata!</div>
        <div style={{ color: "var(--muted)", fontSize: 13.5, marginBottom: 20 }}>Controlla la tua casella di posta per il link di reset password.</div>
        <button className="btn btn-ghost" onClick={() => { setResetSent(false); setMode("login"); }}>← Torna al login</button>
      </div>
    </div>
  );

  return (
    <div className="login-bg"><div className="court-bg" />
      <div className="login-box">
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 8 }}>
            <div className="logo-icon" style={{ width: 44, height: 44, fontSize: 22 }}>🎾</div>
            <div style={{ fontFamily: "'Russo One',sans-serif", fontSize: 26, letterSpacing: 3 }}>PADEL <span style={{ color: "var(--lime)" }}>EVOLUTION</span></div>
          </div>
          <div style={{ color: "var(--muted)", fontSize: 12 }}>Piattaforma professionale per circoli di padel</div>
        </div>

        <div className="tabs" style={{ marginBottom: 20 }}>
          <button className={`tab ${mode === "login" ? "active" : ""}`} onClick={() => { setMode("login"); setErrore(""); }}>Accedi</button>
          <button className={`tab ${mode === "register" ? "active" : ""}`} onClick={() => { setMode("register"); setErrore(""); }}>Registra Circolo</button>
        </div>

        {errore && <div style={{ background: "rgba(255,77,77,.12)", border: "1px solid rgba(255,77,77,.3)", borderRadius: 9, padding: "10px 14px", color: "var(--red)", fontSize: 13, marginBottom: 14 }}>⚠️ {errore}</div>}

        {mode === "register" && (
          <div className="form-group"><label className="form-label">Nome Responsabile</label><input className="input" value={nome} onChange={e => setNome(e.target.value)} placeholder="Es. Mario Rossi" /></div>
        )}
        {mode === "register" && (
          <div className="form-group"><label className="form-label">Nome Circolo</label><input className="input" value={circoloNome} onChange={e => setCircoloNome(e.target.value)} placeholder="Es. Padel Club Roma" /></div>
        )}

        <div className="form-group"><label className="form-label">Email</label><input className="input" value={email} onChange={e => setEmail(e.target.value)} placeholder="nome@email.it" onKeyDown={e => e.key === "Enter" && (mode === "login" ? doLogin() : doRegister())} /></div>
        <div className="form-group"><label className="form-label">Password</label><input className="input" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" onKeyDown={e => e.key === "Enter" && (mode === "login" ? doLogin() : doRegister())} /></div>

        <button className="btn btn-lime" style={{ width: "100%", justifyContent: "center", padding: "12px", fontSize: 14, marginTop: 6 }} onClick={mode === "login" ? doLogin : doRegister} disabled={loading}>
          {loading ? "⏳ Attendi..." : mode === "login" ? "Accedi →" : "Crea account →"}
        </button>

        {mode === "login" && (
          <div style={{ textAlign: "center", marginTop: 14 }}>
            <button style={{ background: "none", border: "none", color: "var(--muted)", fontSize: 12.5, cursor: "pointer", textDecoration: "underline" }} onClick={() => setMode("reset")}>
              Password dimenticata?
            </button>
          </div>
        )}
        {mode === "reset" && (
          <div style={{ marginTop: 12 }}>
            <div className="form-group"><label className="form-label">La tua email</label><input className="input" value={email} onChange={e => setEmail(e.target.value)} /></div>
            <button className="btn btn-outline" style={{ width: "100%", justifyContent: "center" }} onClick={doReset}>Invia link reset</button>
            <div style={{ textAlign: "center", marginTop: 10 }}><button style={{ background: "none", border: "none", color: "var(--muted)", fontSize: 12, cursor: "pointer" }} onClick={() => setMode("login")}>← Torna al login</button></div>
          </div>
        )}

        <div className="sep" />
        <div style={{ fontSize: 11, color: "var(--muted)", textAlign: "center", lineHeight: 1.8 }}>
          <b>Registra Circolo</b> = crei il tuo account admin<br />
          I giocatori si registrano tramite il tuo link circolo
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ROOT CON SUPABASE AUTH
// ─────────────────────────────────────────────────────────────
export default function App() {
  const [session, setSession] = useState(null);
  const [checking, setChecking] = useState(true);
  const [notifiche, setNotifiche] = useState([
    { id: "n1", tipo: "sistema", titolo: "Benvenuto in Padel Evolution 2.0", testo: "Connessione a Supabase attiva. Sistema operativo.", data: "Adesso", letta: false }
  ]);

  // Controlla sessione salvata al mount — con auto refresh token
  useEffect(() => {
    const u = supa.getUser();
    const refresh = localStorage.getItem("supa_refresh");
    if (u && refresh) {
      (async () => {
        // Refresh token automatico
        await supa.refreshToken();
        const { data: profiles } = await supa.select("profiles", `id=eq.${u.id}`);
        const profile = profiles?.[0];
        if (profile) {
          if (profile.circolo_id) {
            const { data: c } = await supa.select("circoli", `id=eq.${profile.circolo_id}`);
            setSession({ ...u, ...profile, circolo: c?.[0] || null });
          } else {
            setSession({ ...u, ...profile, circolo: null });
          }
        }
        setChecking(false);
      })();
    } else {
      setChecking(false);
    }
  }, []);

  async function handleLogout() {
    await supa.signOut();
    setSession(null);
  }

  if (checking) return (
    <>
      <style>{STYLES}</style>
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16 }}>
        <div style={{ fontFamily: "'Russo One',sans-serif", fontSize: 28, letterSpacing: 3, color: "var(--lime)" }}>🎾 PADEL EVOLUTION</div>
        <div style={{ color: "var(--muted)", fontSize: 13 }}>⏳ Connessione a Supabase...</div>
        <div style={{ width: 200 }}><div className="prog"><div className="prog-fill" style={{ width: "70%", animation: "none" }} /></div></div>
      </div>
    </>
  );

  return (
    <>
      <style>{STYLES}</style>
      {!session && <LoginSupabase onLogin={u => setSession(u)} />}
      {session && session.ruolo === "superadmin" && !session._impersonate && (
        <SuperAdminPanel user={session} onLogout={handleLogout} notifiche={notifiche} setNotifiche={setNotifiche}
          onImpersonate={(circolo) => setSession(s => ({...s, _impersonate: circolo}))}
        />
      )}
      {session && session.ruolo === "superadmin" && session._impersonate && (
        <ImpersonateShell
          superUser={session}
          circolo={session._impersonate}
          onExit={() => setSession(s => ({...s, _impersonate: null}))}
          notifiche={notifiche}
          setNotifiche={setNotifiche}
        />
      )}
      {session && session.ruolo === "admin_circolo" && (
        <AdminShellSupabase user={session} onLogout={handleLogout} notifiche={notifiche} setNotifiche={setNotifiche} />
      )}
      {session && session.ruolo === "giocatore" && (
        <PlayerViewSupabase user={session} onLogout={handleLogout} notifiche={notifiche} setNotifiche={setNotifiche} />
      )}
      {session && !["superadmin","admin_circolo","giocatore"].includes(session.ruolo) && (
        <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:14 }}>
          <div style={{ fontSize: 48 }}>⚠️</div>
          <div style={{ fontFamily:"'Russo One',sans-serif", fontSize:20 }}>RUOLO NON ASSEGNATO</div>
          <div style={{ color:"var(--muted)", fontSize:13, textAlign:"center", maxWidth:360 }}>Il tuo account non ha ancora un ruolo assegnato. Contatta il super amministratore.</div>
          <button className="btn btn-ghost" onClick={handleLogout}>Esci</button>
        </div>
      )}
    </>
  );
}

// Wrapper Admin con Supabase (usa componenti esistenti, aggiunge circolo_id nei chiamanti)
function AdminShellSupabase({ user, onLogout, notifiche, setNotifiche }) {
  const circolo_id = user.circolo_id || user.circolo?.id;
  const [giocatori, setGiocatori] = useState([]);
  const [tornei, setTornei] = useState([]);
  const [arbitri, setArbitri] = useState([]);
  const [prenotazioni, setPrenotazioni] = useState([]);
  const [toastMsg, setToastMsg] = useState(null);
  const [loadingData, setLoadingData] = useState(true);
  function toast(msg) { setToastMsg(msg); }
  function addNotifica(n) { setNotifiche(prev => [{ ...n, id: uid(), letta: false }, ...prev].slice(0, 50)); }

  useEffect(() => {
    if (!circolo_id) { setLoadingData(false); return; }
    Promise.all([
      supa.select("giocatori", `circolo_id=eq.${circolo_id}&attivo=eq.true`),
      supa.select("tornei", `circolo_id=eq.${circolo_id}`),
      supa.select("arbitri", `circolo_id=eq.${circolo_id}`),
      supa.select("prenotazioni", `circolo_id=eq.${circolo_id}`),
    ]).then(([g, t, a, p]) => {
      setGiocatori(g.data || []);
      setTornei(t.data || []);
      setArbitri(a.data || []);
      setPrenotazioni(p.data || []);
      setLoadingData(false);
    });
  }, [circolo_id]);

  // Sync giocatori a Supabase
  async function setGiocatoriSync(updater) {
    const nuovi = typeof updater === "function" ? updater(giocatori) : updater;
    setGiocatori(nuovi);
    // Upsert changed items
    const localIds = new Set(giocatori.map(g => g.id));
    for (const g of nuovi) {
      if (!localIds.has(g.id)) {
        await supa.insert("giocatori", { ...g, circolo_id });
      }
    }
  }

  async function setTorneiSync(updater) {
    const nuovi = typeof updater === "function" ? updater(tornei) : updater;
    setTornei(nuovi);
    // Find changed torneo and upsert
    for (const t of nuovi) {
      const old = tornei.find(x => x.id === t.id);
      if (!old) await supa.insert("tornei", { ...t, circolo_id });
      else if (JSON.stringify(t) !== JSON.stringify(old)) await supa.upsert("tornei", { ...t, circolo_id });
    }
  }

  if (loadingData) return (
    <>
      <div className="topbar">
        <div className="logo"><div className="logo-icon">🎾</div><div className="logo-text">PADEL <span>EVOLUTION</span></div></div>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "60vh", flexDirection: "column", gap: 14 }}>
        <div style={{ color: "var(--muted)" }}>⏳ Caricamento dati circolo...</div>
        <div style={{ width: 200 }}><div className="prog"><div className="prog-fill" style={{ width: "60%" }} /></div></div>
      </div>
    </>
  );

  return <AdminShell
    user={{ ...user, nome: user.nome || user.email }}
    onLogout={onLogout}
    giocatori={giocatori}
    setGiocatori={setGiocatoriSync}
    tornei={tornei}
    setTornei={setTorneiSync}
    arbitri={arbitri}
    setArbitri={setArbitri}
    prenotazioni={prenotazioni}
    setPrenotazioni={setPrenotazioni}
    notifiche={notifiche}
    setNotifiche={setNotifiche}
  />;
}

function PlayerViewSupabase({ user, onLogout, notifiche, setNotifiche }) {
  const circolo_id = user.circolo_id;
  const [tornei, setTornei] = useState([]);
  const [giocatori, setGiocatori] = useState([]);
  const [prenotazioni, setPrenotazioni] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!circolo_id) { setLoading(false); return; }
    Promise.all([
      supa.select("tornei", `circolo_id=eq.${circolo_id}`),
      supa.select("giocatori", `circolo_id=eq.${circolo_id}`),
      supa.select("prenotazioni", `circolo_id=eq.${circolo_id}`),
    ]).then(([t, g, p]) => {
      setTornei(t.data || []);
      setGiocatori(g.data || []);
      setPrenotazioni(p.data || []);
      setLoading(false);
    });
  }, [circolo_id]);

  if (loading) return <div style={{ display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",color:"var(--muted)" }}>⏳ Caricamento...</div>;

  // Trova il giocatore corrispondente
  const gioUser = giocatori.find(g => g.profile_id === user.id) || {
    id: user.id, nome: user.nome || user.email, email: user.email,
    livello: "3.0", lato: "Indifferente", puntiRanking: 0, vittorie: 0, sconfitte: 0, partiteGiocate: 0
  };

  return <PlayerView
    user={gioUser}
    tornei={tornei}
    setTornei={setTornei}
    giocatori={giocatori}
    prenotazioni={prenotazioni}
    setPrenotazioni={setPrenotazioni}
    notifiche={notifiche}
    setNotifiche={setNotifiche}
  />;
}
