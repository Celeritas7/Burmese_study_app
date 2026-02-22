import { useState, useMemo } from "react";

const CONS = [{"id":1,"b":"က","r":"ka","h":1,"wc":6},{"id":2,"b":"ခ","r":"kha","h":0,"wc":0},{"id":5,"b":"င","r":"nga","h":0,"wc":0},{"id":13,"b":"ဈ","r":"zha","h":0,"wc":0},{"id":22,"b":"တ","r":"ta","h":0,"wc":0},{"id":23,"b":"ထ","r":"tha","h":0,"wc":0},{"id":24,"b":"သ","r":"tha","h":0,"wc":0},{"id":25,"b":"ဒ","r":"da","h":0,"wc":0},{"id":27,"b":"န","r":"na","h":0,"wc":0},{"id":28,"b":"ပ","r":"pa","h":1,"wc":1},{"id":31,"b":"ဘ","r":"bha","h":0,"wc":0},{"id":32,"b":"မ","r":"ma","h":0,"wc":0},{"id":34,"b":"ရ","r":"ra","h":2,"wc":8},{"id":35,"b":"လ","r":"la","h":0,"wc":0},{"id":36,"b":"ဝ","r":"wa","h":0,"wc":0},{"id":38,"b":"စ","r":"sa","h":0,"wc":0},{"id":39,"b":"ဆ","r":"sa","h":0,"wc":0},{"id":41,"b":"ဟ","r":"ha","h":1,"wc":8},{"id":43,"b":"အ","r":"a","h":0,"wc":0}];
const HUBS = [{"id":19,"w":"ပါ","m":"(spelled as \"pa2\".) polite ending word with emphasis","c":28,"g":"LESSON - 2A","ch":[{"w":"ပါတယ်","e":"affirmation in the answer."}]},{"id":89,"w":"ရောက်","m":"to reach the destination","c":34,"g":"REACHED DESTINATION","ch":[{"w":"ရောက်ပြီ","e":"We are there"},{"w":"ရောက်ပြီလား","e":"Are we there yet?"},{"w":"မရောက်သေးဘူးလား","e":"Are we not there yet?"},{"w":"မရောက်သေးဘူး","e":"We are not there yet"}]},{"id":94,"w":"ရ","m":"to obtain; to be ready; to be available","c":34,"g":"BE AVAILABLE / BE READY","ch":[{"w":"ရပြီ","e":"Yes, got it!"},{"w":"ရပြီလား","e":"Have you got it? Is it ready?"},{"w":"မရသေးဘူးလား","e":"Haven't got it yet? Not ready yet?"},{"w":"မရသေးဘူး","e":"No. / Haven't got it yet. Not ready yet."}]},{"id":122,"w":"ဟုတ်","m":"AFFIRMATIVE","c":41,"g":"AFFIRMATIVE","ch":[{"w":"ဟုတ်ပါတယ်","e":"Yes, that's right (polite)"},{"w":"ဟုတ်တယ်","e":"Yes, that's right"},{"w":"ဟုတ်လား","e":"Is that so?"},{"w":"ဟုတ်ပါ့ဟုတ်ပါ့","e":"Yes yes, of course"},{"w":"ဟုတ်ရဲ့လား","e":"Is it really so?"},{"w":"ဟုတ်ကဲ့","e":"Yes (respectful)"},{"w":"မဟုတ်ဘူး","e":"No, that's not right"},{"w":"မဟုတ်သေးဘူး","e":"Not yet"}]},{"id":131,"w":"ကောင်း","m":"GOOD","c":1,"g":"GOOD","ch":[{"w":"ကောင်းပါတယ်","e":"It's good (polite)"},{"w":"ကောင်းပါတယ်လေ","e":"It's good! (emphasis)"},{"w":"ကောင်းပြီလေ","e":"It's good now / That's enough"},{"w":"ကောင်းတယ်","e":"It's good"},{"w":"ကောင်းလား","e":"Is it good?"},{"w":"ကောင်းရဲ့လား","e":"Is it really good?"}]}];

const OVR={"တိရစ္ဆာန်များ":"ति1य1स्सान1म्या3","ခန္ဓာကိုယ်":"खन्धा2को2ये³¹12"};
const CM={"က":"क","ခ":"ख","ဂ":"ग","ဃ":"घ","င":"ङ","စ":"स","ဆ":"स","ဇ":"ज","ဈ":"झ","ဉ":"ज्ञ","ည":"ज्ञ","ဋ":"ट","ဌ":"ठ","ဍ":"ड","ဎ":"ढ","ဏ":"न","တ":"त","ထ":"थ","ဒ":"द","ဓ":"ध","န":"न","ပ":"प","ဖ":"फ","ဗ":"ब","ဘ":"ब","မ":"म","ယ":"य","ရ":"य","လ":"ल","ဝ":"व","သ":"थ","ဟ":"ह","ဠ":"ल","အ":"अ","ဥ":"उ","ဧ":"इ","ဿ":"स्स"};
const CC={"ကျ":"च","ကြ":"च","ကွ":"क्व","ကှ":"क्ह","ကွှ":"क्व","ချ":"छ","ခြ":"छ","ခွ":"ख्व","ခှ":"ख्ह","ခွှ":"ख्व","ဂျ":"ज","ဂြ":"ज","ဂွ":"ग्व","ဂှ":"ग्ह","ငြ":"ग","ငှ":"ङ्ह","တျ":"त्य","တြ":"त्य","တွ":"त्व","တှ":"त्ह","ထျ":"थ्य","ထြ":"थ्य","ထွ":"थ्व","ဒျ":"द्य","ဒြ":"द्य","ဒွ":"द्व","နျ":"न्य","နြ":"न्य","နွ":"न्व","နှ":"न्ह","ပျ":"प्य","ပြ":"प्य","ပွ":"प्व","ပှ":"प्ह","ဖျ":"फ्य","ဖြ":"फ्य","ဖွ":"फ्व","ဗျ":"ब्य","ဗြ":"ब्य","ဘျ":"ब्य","ဘြ":"ब्य","ဘွ":"ब्व","မျ":"म्य","မြ":"म्य","မွ":"म्व","မှ":"म्ह","ယွ":"य्व","ရွ":"य्व","ရှ":"श","လျ":"ल्य","လြ":"ल्य","လွ":"ल्व","လှ":"ल्ह","သျ":"थ्य","သြ":"थ्य","သွ":"थ्व","သှ":"थ्ह","ဟျ":"ह्य","ဟြ":"ह्य","ဟွ":"ह्व"};
const VM={"":"1","ာ":"ा2","ား":"ा3","ိ":"ि1","ီ":"ि2","ီး":"ि3","ု":"ु1","ူ":"ु2","ူး":"ु3","ို":"ो2","ို့":"ो1","ိုး":"ोए","ေ":"े2","ေ့":"े11","ေး":"े3","ော":"ौ3","ော့":"ौ1","ော်":"ौ2","ဲ":"े³¹13","ဲ့":"े³¹111","ံ":"ं32","ံ့":"ं31","င်":"िन2","င့်":"िन1","င်း":"िन3","န်":"ं12","န့်":"ं11","န်း":"ं13","မ်":"ं22","မ့်":"ं21","မ်း":"ं23","ည်":"े³¹22","ည့်":"े³¹21","ည်း":"े³¹23","ယ်":"े³¹12","ယ့်":"े³¹11","ိန်":"ेन12","ိန့်":"ेन11","ိန်း":"ेन13","ိမ်":"ेन22","ိမ့်":"ेन21","ိမ်း":"ेन23","ိုင်":"ाइन2","ိုင့်":"ाइन1","ိုင်း":"ाइन3","ိုက်":"ाइ","ောင်":"ौं2","ောင့်":"ौं1","ောင်း":"ौं3","ောက်":"ौ?1","ုန်":"ों12","ုန့်":"ों11","ုန်း":"ों13","ုံ":"ों22","ုံ့":"ों21","ုံး":"ों23","ုဏ်":"ों32","ုဏ့်":"ों31","ုဏ်း":"ों33","ွန်":"ुन12","ွန့်":"ुन11","ွန်း":"ुन13","ွမ်":"ुन22","ွမ့်":"ुन21","ွမ်း":"ुन23","ွံ":"ुन32","ွံ့":"ुन31","ွံး":"ुन33","ွတ်":"ुत1","ွပ်":"ुत2","တ်":"त1","ပ်":"त2","ဒ်":"त3","ာတ်":"त4","ာသ်":"त5","ိတ်":"ै1","ိပ်":"ै2","ုတ်":"ोट","ုပ်":"ोप","က်":"ेत","စ်":"े?2","ေတ်":"े?1","ဏ်":"ं4","ြက်":"ेत"};
function isMM(c){const x=c.charCodeAt(0);return x>=0x1000&&x<=0x109F}
function ce(w,s){let i=s+1;while(i<w.length){const c=w.charCodeAt(i);if(c>=0x103B&&c<=0x103E)i++;else if(c===0x1039&&i+1<w.length)i+=2;else break}return i}
function se(w,s){let i=ce(w,s);while(i<w.length){const c=w.charCodeAt(i);if((c>=0x102B&&c<=0x1036)||c===0x1037||c===0x1038||c===0x103A)i++;else if(c>=0x1000&&c<=0x1021&&i+1<w.length&&w.charCodeAt(i+1)===0x103A){i+=2;while(i<w.length&&(w.charCodeAt(i)===0x1037||w.charCodeAt(i)===0x1038))i++;break}else break}return i}
function toDev(word){
  if(!word)return'';if(OVR[word])return OVR[word];
  let r='',i=0;
  while(i<word.length){
    if(!isMM(word[i])){r+=word[i];i++;continue}
    const s=se(word,i),c=ce(word,i),cp=word.slice(i,c),vp=word.slice(c,s);
    const cd=CC[cp]||CM[cp];
    if(cd!==undefined){const vd=VM[vp];if(vd!==undefined){r+=cd+vd;i=s;continue}if(vp===''){r+=cd;i=s;continue}}
    if(CM[word[i]]){r+=CM[word[i]];i++;continue}
    r+='·';i++
  }
  return r
}

const S={root:{background:'#0E0E0E',minHeight:'100vh',color:'#F5E6C8',fontFamily:"'Noto Sans Myanmar','Noto Sans Devanagari',system-ui,sans-serif",padding:'14px 10px',maxWidth:880,margin:'0 auto'},gold:'#C8A951',orange:'#E8845C',blue:'#6BA4B8'};

export default function App(){
  const[view,setView]=useState(0);
  const tabs=[{l:'Tree',i:'◎'},{l:'List',i:'☰'},{l:'Cards',i:'▦'}];
  const totalCh=useMemo(()=>HUBS.reduce((s,h)=>s+h.ch.length,0),[]);

  return(
    <div style={S.root}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Myanmar:wght@400;600;700&family=Noto+Sans+Devanagari:wght@400;600&display=swap');*{box-sizing:border-box;margin:0}button{font-family:inherit}::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:rgba(200,169,81,.3);border-radius:4px}input::placeholder{color:#555}`}</style>

      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:14}}>
        <h1 style={{fontSize:18,fontWeight:700,color:S.gold}}>မြန်မာ <span style={{fontSize:12,color:'#666',fontWeight:400}}>Burmese Study</span></h1>
        <span style={{fontSize:10,color:'#444'}}>prefix-based groups only</span>
      </div>

      <div style={{display:'flex',gap:14,justifyContent:'center',padding:'8px 0 14px',marginBottom:12,borderBottom:'1px solid rgba(255,255,255,.05)'}}>
        {[{l:'Consonants',v:CONS.length,c:S.gold},{l:'Hubs',v:HUBS.length,c:S.orange},{l:'Spokes',v:totalCh,c:S.blue}].map((s,i)=>(
          <div key={i} style={{textAlign:'center'}}><div style={{fontSize:20,fontWeight:700,color:s.c}}>{s.v}</div><div style={{fontSize:9,color:'#555'}}>{s.l}</div></div>
        ))}
      </div>

      <div style={{display:'flex',gap:2,marginBottom:12,background:'rgba(255,255,255,.03)',borderRadius:10,padding:3}}>
        {tabs.map((t,i)=>(<button key={i} onClick={()=>setView(i)} style={{flex:1,padding:'8px 0',borderRadius:8,border:'none',background:view===i?'rgba(200,169,81,.18)':'transparent',color:view===i?S.gold:'#555',fontSize:13,fontWeight:view===i?600:400,cursor:'pointer'}}>{t.i} {t.l}</button>))}
      </div>

      <div style={{background:'rgba(255,255,255,.015)',borderRadius:14,border:'1px solid rgba(255,255,255,.05)',padding:14,minHeight:300}}>
        {view===0&&<TreeView/>}{view===1&&<ListView/>}{view===2&&<CardsView/>}
      </div>
      <EngineTest/>
    </div>
  )
}

function TreeView(){
  const[selC,setSelC]=useState(null);
  const hubsForC=useMemo(()=>selC?HUBS.filter(h=>h.c===selC):[],[selC]);
  const activeCons=useMemo(()=>CONS.filter(c=>c.h>0),[]);
  return(<div>
    <div style={{display:'flex',gap:4,flexWrap:'wrap',marginBottom:14}}>
      {activeCons.map(c=>{const act=selC===c.id;return(
        <button key={c.id} onClick={()=>setSelC(act?null:c.id)} style={{padding:'5px 12px',borderRadius:10,border:`1px solid ${act?S.gold:'rgba(255,255,255,.06)'}`,background:act?'rgba(200,169,81,.18)':'transparent',color:act?S.gold:'#777',fontSize:14,fontWeight:600,cursor:'pointer'}}>
          {c.b} <span style={{fontSize:10,fontWeight:400}}>{c.h}</span>
        </button>
      )})}
    </div>
    {selC?(<div>
      {hubsForC.map(h=>(
        <div key={h.id} style={{marginBottom:14}}>
          <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:6}}>
            <div style={{background:'rgba(232,132,92,.12)',border:'1px solid rgba(232,132,92,.25)',borderRadius:12,padding:'6px 14px',display:'inline-flex',alignItems:'center',gap:8}}>
              <span style={{fontSize:18,color:S.orange,fontWeight:700}}>{h.w}</span>
              <span style={{fontSize:11,color:'#999'}}>{toDev(h.w)}</span>
              <span style={{fontSize:12,color:'#888'}}>{h.m}</span>
            </div>
            <span style={{fontSize:10,color:'#555'}}>{h.ch.length} spokes · {h.g}</span>
          </div>
          {h.ch.length>0&&(
            <div style={{display:'flex',flexWrap:'wrap',gap:5,paddingLeft:18,borderLeft:'2px solid rgba(232,132,92,.15)'}}>
              {h.ch.map((c,i)=>(
                <div key={i} style={{background:'rgba(107,164,184,.05)',border:'1px solid rgba(107,164,184,.1)',borderRadius:8,padding:'5px 10px'}}>
                  <div style={{fontSize:14,color:'#F5E6C8'}}>{c.w}</div>
                  <div style={{fontSize:10,color:'#666'}}>{toDev(c.w)}</div>
                  <div style={{fontSize:10,color:S.blue}}>{c.e}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>):(<div style={{textAlign:'center',color:'#555',padding:30,fontSize:13}}>Select a consonant to see its hub-spoke tree</div>)}
  </div>)
}

function ListView(){
  const[q,setQ]=useState('');
  const[openId,setOpenId]=useState(null);
  const consMap=useMemo(()=>{const m={};CONS.forEach(c=>m[c.id]=c);return m},[]);
  const filtered=useMemo(()=>{
    if(!q)return HUBS;
    const f=q.toLowerCase();
    return HUBS.filter(h=>h.w.includes(q)||(h.m||'').toLowerCase().includes(f)||h.g.toLowerCase().includes(f)||h.ch.some(c=>c.w.includes(q)||(c.e||'').toLowerCase().includes(f)));
  },[q]);
  return(<div>
    <input type="text" placeholder="Search hub, word, meaning, or group..." value={q} onChange={e=>setQ(e.target.value)} style={{width:'100%',padding:'9px 12px',borderRadius:10,border:'1px solid rgba(255,255,255,.08)',background:'rgba(255,255,255,.03)',color:'#F5E6C8',fontSize:14,outline:'none',marginBottom:10,boxSizing:'border-box'}}/>
    <div style={{maxHeight:440,overflowY:'auto'}}>
      {filtered.map(h=>{const open=openId===h.id;const cn=consMap[h.c];return(
        <div key={h.id}>
          <button onClick={()=>setOpenId(open?null:h.id)} style={{width:'100%',display:'flex',justifyContent:'space-between',alignItems:'center',padding:'7px 8px',background:open?'rgba(200,169,81,.05)':'transparent',border:'none',borderBottom:'1px solid rgba(255,255,255,.03)',cursor:'pointer'}}>
            <div style={{textAlign:'left',display:'flex',alignItems:'center',gap:6}}>
              <span style={{fontSize:12,color:'#555',background:'rgba(200,169,81,.08)',padding:'1px 5px',borderRadius:5}}>{cn?.b||'?'}</span>
              <span style={{fontSize:16,color:S.gold,fontWeight:600}}>{h.w}</span>
              <span style={{fontSize:9,color:'#444',background:'rgba(255,255,255,.03)',padding:'1px 5px',borderRadius:4}}>{h.g}</span>
            </div>
            <div style={{display:'flex',alignItems:'center',gap:6}}>
              <span style={{fontSize:11,color:'#999',maxWidth:140,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{h.m}</span>
              <span style={{fontSize:10,color:S.blue}}>{h.ch.length}w</span>
              <span style={{color:'#444',fontSize:10,transform:open?'rotate(90deg)':'none',transition:'transform .15s'}}>▶</span>
            </div>
          </button>
          {open&&h.ch.length>0&&(
            <div style={{padding:'4px 10px 8px 30px',background:'rgba(200,169,81,.02)'}}>
              {h.ch.map((c,i)=>{const d=toDev(c.w);return(
                <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'4px 0',borderBottom:i<h.ch.length-1?'1px solid rgba(255,255,255,.02)':'none'}}>
                  <div><span style={{fontSize:14,color:'#F5E6C8'}}>{c.w}</span><span style={{fontSize:10,color:'#555',marginLeft:6}}>{d}</span></div>
                  <span style={{fontSize:11,color:S.blue}}>{c.e}</span>
                </div>
              )})}
            </div>
          )}
          {open&&h.ch.length===0&&<div style={{padding:'6px 10px 8px 30px',color:'#444',fontSize:11}}>Hub only — no spokes yet</div>}
        </div>
      )})}
    </div>
    <div style={{fontSize:9,color:'#444',textAlign:'center',marginTop:6}}>Showing {filtered.length} of {HUBS.length} hubs</div>
  </div>)
}

function CardsView(){
  const[flipped,setFlipped]=useState({});
  const[filt,setFilt]=useState('all');
  const activeCons=useMemo(()=>CONS.filter(c=>c.h>0),[]);
  const filtered=useMemo(()=>{
    const hs=filt==='all'?HUBS:HUBS.filter(h=>h.c===parseInt(filt));
    const cards=[];
    hs.forEach(h=>{
      cards.push({id:'h'+h.id,w:h.w,e:h.m,type:'hub',nch:h.ch.length,g:h.g});
      h.ch.forEach((c,i)=>cards.push({id:'c'+h.id+'_'+i,w:c.w,e:c.e,type:'spoke',hub:h.w}));
    });
    return cards;
  },[filt]);
  return(<div>
    <div style={{display:'flex',gap:4,marginBottom:10,flexWrap:'wrap'}}>
      <Pill a={filt==='all'} o={()=>setFilt('all')}>All ({HUBS.length})</Pill>
      {activeCons.map(c=><Pill key={c.id} a={filt===String(c.id)} o={()=>setFilt(String(c.id))}>{c.b} ({c.h})</Pill>)}
    </div>
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(130px,1fr))',gap:7,maxHeight:430,overflowY:'auto'}}>
      {filtered.slice(0,100).map(c=>{const fl=flipped[c.id];const isHub=c.type==='hub';return(
        <button key={c.id} onClick={()=>setFlipped(p=>({...p,[c.id]:!p[c.id]}))} style={{background:fl?(isHub?'rgba(232,132,92,.12)':'rgba(107,164,184,.08)'):(isHub?'rgba(232,132,92,.05)':'rgba(255,255,255,.02)'),border:`1px solid ${isHub?'rgba(232,132,92,.2)':'rgba(107,164,184,.1)'}`,borderRadius:12,padding:10,cursor:'pointer',textAlign:'center',minHeight:80,display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
          {!fl?(<>
            <div style={{fontSize:isHub?17:15,color:isHub?S.orange:'#F5E6C8',fontWeight:isHub?700:400}}>{c.w}</div>
            {isHub&&<div style={{fontSize:8,color:'#666',marginTop:2}}>{c.nch} spokes · {c.g}</div>}
            {!isHub&&<div style={{fontSize:8,color:'#444',marginTop:2}}>tap to reveal</div>}
          </>):(<>
            <div style={{fontSize:13,color:'#F5E6C8'}}>{c.w}</div>
            <div style={{fontSize:10,color:'#777'}}>{toDev(c.w)}</div>
            <div style={{fontSize:11,color:isHub?S.orange:S.blue,fontWeight:600,marginTop:2}}>{c.e}</div>
            {c.hub&&<div style={{fontSize:9,color:'#555',marginTop:2}}>← {c.hub}</div>}
          </>)}
        </button>
      )})}
    </div>
    <div style={{fontSize:9,color:'#444',textAlign:'center',marginTop:6}}>Showing {Math.min(filtered.length,100)} of {filtered.length}</div>
  </div>)
}

function Pill({children,a,o}){return(<button onClick={o} style={{padding:'3px 10px',borderRadius:14,fontSize:10,cursor:'pointer',border:`1px solid ${a?S.gold:'rgba(255,255,255,.06)'}`,background:a?'rgba(200,169,81,.18)':'transparent',color:a?S.gold:'#555'}}>{children}</button>)}

function EngineTest(){
  const[inp,setInp]=useState('ခွေး');
  const out=useMemo(()=>toDev(inp),[inp]);
  const samples=['ခွေး','ကြောင်','နွား','ပန်းသီး','ဘီယာ','ကော်ဖီ','မုန့်ဟင်းခါး','ကောင်းပါတယ်'];
  return(<div style={{marginTop:14,padding:10,borderRadius:10,background:'rgba(200,169,81,.03)',border:'1px solid rgba(200,169,81,.08)'}}>
    <div style={{fontSize:10,color:'#666',marginBottom:5}}>Transliteration Engine</div>
    <div style={{display:'flex',gap:6}}>
      <input type="text" value={inp} onChange={e=>setInp(e.target.value)} placeholder="Burmese..." style={{flex:1,padding:'7px 10px',borderRadius:8,border:'1px solid rgba(255,255,255,.08)',background:'rgba(255,255,255,.03)',color:'#F5E6C8',fontSize:15,outline:'none'}}/>
      <div style={{flex:1,padding:'7px 10px',borderRadius:8,background:'rgba(200,169,81,.06)',border:'1px solid rgba(200,169,81,.12)',fontSize:15,color:S.gold,display:'flex',alignItems:'center'}}>{out||<span style={{color:'#444'}}>—</span>}</div>
    </div>
    <div style={{display:'flex',gap:4,marginTop:5,flexWrap:'wrap'}}>{samples.map(w=>(<button key={w} onClick={()=>setInp(w)} style={{padding:'2px 7px',borderRadius:6,fontSize:11,background:'rgba(255,255,255,.03)',border:'1px solid rgba(255,255,255,.05)',color:'#888',cursor:'pointer'}}>{w}</button>))}</div>
  </div>)
}
