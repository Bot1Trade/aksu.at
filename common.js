/* aksu.at – Sprache (DE/EN) und Erfolge, gemeinsam für alle Seiten */
(function(){
  var store = {
    get: function(k){ try { return localStorage.getItem(k); } catch(e){ return null; } },
    set: function(k,v){ try { localStorage.setItem(k,v); } catch(e){} }
  };
  var lang = store.get('lang') || ((navigator.language||'de').toLowerCase().indexOf('de')===0 ? 'de' : 'en');

  var ACH = [
    {id:'terminal',  i:'⌨️', de:['Hacker in Ausbildung','Einen Terminal-Befehl ausgeführt'], en:['Hacker in training','Ran a terminal command']},
    {id:'secret',    i:'🕵️', de:['Geheimnisträger','Einen versteckten Befehl gefunden'], en:['Secret keeper','Found a hidden command']},
    {id:'konami',    i:'🎉', de:['Cheat-Code','Den Konami-Code eingegeben'],          en:['Cheat code','Entered the Konami code']},
    {id:'lost',      i:'🧭', de:['Verlaufen','Die 404-Seite entdeckt'],                en:['Lost','Found the 404 page']},
    {id:'contact',   i:'✉️', de:['Kontaktfreudig','Kontakt kopiert, gespeichert oder geschrieben'], en:['Sociable','Copied, saved or sent the contact']}
  ];

  function readJSON(k, d){ try { return JSON.parse(store.get(k)) || d; } catch(e){ return d; } }
  function unlocked(){ return readJSON('aksu-ach', {}); }

  /* ---------- Toast ---------- */
  var toastEl, toastQ = [], showing = false;
  function css(){
    if (document.getElementById('aksu-ach-css')) return;
    var s = document.createElement('style'); s.id = 'aksu-ach-css';
    s.textContent =
      '.ach-toast{position:fixed;left:50%;top:18px;z-index:300;display:flex;align-items:center;gap:12px;min-width:260px;max-width:calc(100% - 32px);'+
      'padding:12px 16px 12px 12px;border-radius:16px;background:rgba(15,20,32,.92);border:1px solid rgba(255,255,255,.12);color:#f2f4f8;'+
      'box-shadow:0 20px 60px rgba(0,0,0,.5),0 0 0 1px rgba(192,132,252,.25) inset;backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);'+
      'font-family:Inter,system-ui,sans-serif;transform:translate(-50%,-140%);transition:transform .5s cubic-bezier(.2,.9,.2,1.2)}'+
      '.ach-toast.show{transform:translate(-50%,0)}'+
      '.ach-toast .ai{width:44px;height:44px;flex:none;border-radius:12px;display:grid;place-items:center;font-size:24px;'+
      'background:linear-gradient(135deg,#7c9cff,#c084fc 50%,#2dd4bf);box-shadow:0 0 24px rgba(192,132,252,.5)}'+
      '.ach-toast small{display:block;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#c084fc;font-family:"JetBrains Mono",monospace}'+
      '.ach-toast b{display:block;font-family:"Space Grotesk",Inter,sans-serif;font-size:16px}'+
      '.ach-toast span{display:block;font-size:13px;color:#8b95a7}'+
      '@media (prefers-reduced-motion:reduce){.ach-toast{transition:none}}';
    document.head.appendChild(s);
  }
  function nextToast(){
    if (showing || !toastQ.length) return;
    showing = true; css();
    var a = toastQ.shift(), d = a[lang] || a.de;
    if (!toastEl){ toastEl = document.createElement('div'); toastEl.className = 'ach-toast'; toastEl.setAttribute('role','status'); document.body.appendChild(toastEl); }
    toastEl.innerHTML = '<div class="ai">'+a.i+'</div><div><small>'+(lang==='de'?'Erfolg freigeschaltet':'Achievement unlocked')+'</small><b>'+d[0]+'</b><span>'+d[1]+'</span></div>';
    requestAnimationFrame(function(){ toastEl.classList.add('show'); });
    try { if (store.get('sound')==='1'){ var C = window.AudioContext||window.webkitAudioContext, ac = new C();
      [660,880,1320].forEach(function(f,i){ var o=ac.createOscillator(), g=ac.createGain(); o.type='triangle'; o.frequency.value=f;
        g.gain.setValueAtTime(.05, ac.currentTime+i*.09); g.gain.exponentialRampToValueAtTime(.0001, ac.currentTime+i*.09+.18);
        o.connect(g).connect(ac.destination); o.start(ac.currentTime+i*.09); o.stop(ac.currentTime+i*.09+.2); }); } } catch(e){}
    setTimeout(function(){ toastEl.classList.remove('show'); setTimeout(function(){ showing=false; nextToast(); }, 550); }, 3400);
  }

  function achieve(id){
    var u = unlocked(); if (u[id]) return false;
    var a = ACH.filter(function(x){ return x.id===id; })[0]; if (!a) return false;
    u[id] = Date.now(); store.set('aksu-ach', JSON.stringify(u));
    toastQ.push(a);
    if (document.body) nextToast(); else addEventListener('DOMContentLoaded', nextToast);
    try { dispatchEvent(new CustomEvent('aksu:ach', {detail:id})); } catch(e){}
    return true;
  }

  /* ---------- Sprache ---------- */
  function t(de, en){ return lang === 'en' ? en : de; }
  function apply(){ document.documentElement.lang = lang; }
  function setLang(l){ lang = l; store.set('lang', l); apply(); try { dispatchEvent(new CustomEvent('aksu:lang', {detail:l})); } catch(e){} }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply); else apply();

  window.AKSU = { get lang(){ return lang; }, t:t, setLang:setLang, apply:apply, achieve:achieve,
    unlocked:unlocked, list:ACH };
})();
