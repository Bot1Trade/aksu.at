/* aksu.at – Sprache (DE/EN) und Erfolge, gemeinsam für alle Seiten */
(function(){
  var store = {
    get: function(k){ try { return localStorage.getItem(k); } catch(e){ return null; } },
    set: function(k,v){ try { localStorage.setItem(k,v); } catch(e){} }
  };
  var lang = store.get('lang') || ((navigator.language||'de').toLowerCase().indexOf('de')===0 ? 'de' : 'en');

  var ACH = [
    {id:'first',     i:'🎮', de:['Erste Runde','Ein Spiel gestartet'],                 en:['First round','Started a game']},
    {id:'all7',      i:'🏆', de:['Allrounder','Alle 7 Spiele ausprobiert'],            en:['All-rounder','Tried all 7 games']},
    {id:'tetris1000',i:'🧱', de:['Tetris-Profi','1.000 Punkte in Tetris'],             en:['Tetris pro','1,000 points in Tetris']},
    {id:'tetris4',   i:'💥', de:['Tetris!','4 Reihen auf einmal'],                    en:['Tetris!','4 lines at once']},
    {id:'snake20',   i:'🐍', de:['Lange Schlange','20 Punkte in Snake'],               en:['Long snake','20 points in Snake']},
    {id:'t512',      i:'🔢', de:['Halbzeit','512er-Kachel in 2048'],                   en:['Halfway','512 tile in 2048']},
    {id:'t2048',     i:'👑', de:['2048!','Die 2048-Kachel erreicht'],                  en:['2048!','Reached the 2048 tile']},
    {id:'mines',     i:'🚩', de:['Minenräumer','Minesweeper gewonnen'],               en:['Deminer','Won a game of Minesweeper']},
    {id:'minesHard', i:'💣', de:['Sprengmeister','Minesweeper „Schwer“ gewonnen'],    en:['Demolition expert','Won Minesweeper on hard']},
    {id:'tttWin',    i:'❌', de:['Taktiker','Den Computer besiegt'],                   en:['Tactician','Beat the computer']},
    {id:'tttHard',   i:'🤝', de:['Auf Augenhöhe','Remis gegen „Unschlagbar“'],        en:['Evenly matched','Draw against “Unbeatable”']},
    {id:'memory',    i:'🧠', de:['Gutes Gedächtnis','Memory gelöst'],                  en:['Good memory','Solved Memory']},
    {id:'memoryPro', i:'📸', de:['Fotografisch','Memory 4×4 in max. 12 Zügen'],       en:['Photographic','Memory 4×4 in 12 moves or less']},
    {id:'breakout2', i:'🧨', de:['Mauerbrecher','Level 2 in Breakout erreicht'],      en:['Wall breaker','Reached level 2 in Breakout']},
    {id:'terminal',  i:'⌨️', de:['Hacker in Ausbildung','Einen Terminal-Befehl ausgeführt'], en:['Hacker in training','Ran a terminal command']},
    {id:'secret',    i:'🕵️', de:['Geheimnisträger','Einen versteckten Befehl gefunden'], en:['Secret keeper','Found a hidden command']},
    {id:'konami',    i:'🎉', de:['Cheat-Code','Den Konami-Code eingegeben'],          en:['Cheat code','Entered the Konami code']},
    {id:'lost',      i:'🧭', de:['Verlaufen','Die 404-Seite entdeckt'],                en:['Lost','Found the 404 page']},
    {id:'night',     i:'🦉', de:['Nachteule','Zwischen 0 und 5 Uhr gespielt'],         en:['Night owl','Played between midnight and 5 am']},
    {id:'contact',   i:'✉️', de:['Kontaktfreudig','Kontakt kopiert, gespeichert oder geschrieben'], en:['Sociable','Copied, saved or sent the contact']},
    {id:'daily',     i:'🎯', de:['Volltreffer','Eine Tages-Challenge geschafft'],      en:['Bullseye','Completed a daily challenge']},
    {id:'streak3',   i:'🔥', de:['Am Ball','3 Tages-Challenges in Folge'],             en:['On a roll','3 daily challenges in a row']}
  ];
  var CH = [
    {g:'snake',      m:'score', v:15,   de:'Sammle 15 Punkte in Snake',               en:'Score 15 points in Snake'},
    {g:'tetris',     m:'score', v:800,  de:'Erreiche 800 Punkte in Tetris',           en:'Reach 800 points in Tetris'},
    {g:'2048',       m:'tile',  v:256,  de:'Bau eine 256er-Kachel in 2048',            en:'Build a 256 tile in 2048'},
    {g:'memory',     m:'moves4',v:14,   lt:1, de:'Löse Memory 4×4 in max. 14 Zügen',  en:'Solve Memory 4×4 in 14 moves or less'},
    {g:'minesweeper',m:'time',  v:90,   lt:1, de:'Gewinne Minesweeper in max. 90 Sekunden', en:'Win Minesweeper in 90 seconds or less'},
    {g:'breakout',   m:'score', v:300,  de:'Hol 300 Punkte in Breakout',              en:'Score 300 points in Breakout'},
    {g:'tictactoe',  m:'win',   v:1,    de:'Besiege den Computer in Tic-Tac-Toe',     en:'Beat the computer at Tic-Tac-Toe'},
    {g:'tetris',     m:'lines', v:10,   de:'Räume 10 Reihen in Tetris ab',            en:'Clear 10 lines in Tetris'},
    {g:'snake',      m:'score', v:25,   de:'Sammle 25 Punkte in Snake',               en:'Score 25 points in Snake'},
    {g:'2048',       m:'score', v:2500, de:'Erreiche 2.500 Punkte in 2048',           en:'Reach 2,500 points in 2048'},
    {g:'breakout',   m:'level', v:2,    de:'Schaffe Level 2 in Breakout',             en:'Reach level 2 in Breakout'},
    {g:'memory',     m:'moves4',v:18,   lt:1, de:'Löse Memory 4×4 in max. 18 Zügen',  en:'Solve Memory 4×4 in 18 moves or less'}
  ];
  var NAMES = {tetris:'Tetris',breakout:'Breakout',memory:'Memory',minesweeper:'Minesweeper',snake:'Snake','2048':'2048',tictactoe:'Tic-Tac-Toe'};
  var GAMES = ['tetris','breakout','memory','minesweeper','snake','2048','tictactoe'];

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
      '.lang-seg{display:flex;border:1px solid var(--line,rgba(255,255,255,.1));border-radius:10px;overflow:hidden;margin-left:auto}'+
      '.lang-seg button{border:0;border-radius:0;padding:7px 10px;font-size:12px;font-family:"JetBrains Mono",monospace;background:transparent;color:var(--muted,#8b95a7)}'+
      '.lang-seg button[aria-pressed="true"]{background:var(--ink,#f2f4f8);color:var(--accent-ink,#0a0d14)}'+
      '.dl-banner{display:flex;gap:12px;align-items:center;margin:0 0 14px;padding:12px 16px;border-radius:16px;border:1px solid rgba(251,191,36,.35);'+
      'background:linear-gradient(90deg,rgba(251,191,36,.12),rgba(192,132,252,.08));font-size:14px;color:var(--ink,#f2f4f8)}'+
      '.dl-banner.done{border-color:rgba(52,211,153,.4);background:linear-gradient(90deg,rgba(52,211,153,.12),rgba(45,212,191,.06))}'+
      '.dl-banner .dl-i{font-size:22px}.dl-banner small{display:block;font-family:"JetBrains Mono",monospace;font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted,#8b95a7)}'+
      '@media (prefers-reduced-motion:reduce){.ach-toast{transition:none}}';
    document.head.appendChild(s);
  }
  function nextToast(){
    if (showing || !toastQ.length) return;
    showing = true; css();
    var a = toastQ.shift(), d = a[lang] || a.de;
    if (!toastEl){ toastEl = document.createElement('div'); toastEl.className = 'ach-toast'; toastEl.setAttribute('role','status'); document.body.appendChild(toastEl); }
    toastEl.innerHTML = '<div class="ai">'+a.i+'</div><div><small>'+(a.lbl?(lang==='de'?a.lbl[0]:a.lbl[1]):(lang==='de'?'Erfolg freigeschaltet':'Achievement unlocked'))+'</small><b>'+d[0]+'</b><span>'+d[1]+'</span></div>';
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
  function played(game){
    var p = readJSON('aksu-played', []);
    if (p.indexOf(game) < 0){ p.push(game); store.set('aksu-played', JSON.stringify(p)); }
    achieve('first');
    if (GAMES.every(function(g){ return p.indexOf(g) >= 0; })) achieve('all7');
    var h = new Date().getHours(); if (h < 5) achieve('night');
  }

  /* ---------- Tages-Challenge ---------- */
  function ymd(d){ return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'); }
  function today(){ return ymd(new Date()); }
  function yesterday(){ var d = new Date(); d.setDate(d.getDate()-1); return ymd(d); }
  function pick(day){ var h = 2166136261; for (var i=0;i<day.length;i++){ h ^= day.charCodeAt(i); h = Math.imul(h, 16777619); } return CH[(h>>>0) % CH.length]; }
  function dailyState(){ var st = readJSON('aksu-daily', {}); var t = today();
    var streak = (st.last === t || st.last === yesterday()) ? (st.streak||0) : 0;
    return { day:t, c:pick(t), done: st.last === t, streak: streak, best: st.best||0 }; }
  function challengeText(c){ return (lang==='en' ? c.en : c.de); }
  function report(game, metrics){
    var d = dailyState(); if (d.done || d.c.g !== game) return;
    var val = metrics[d.c.m]; if (val == null) return;
    var ok = d.c.lt ? val <= d.c.v : val >= d.c.v; if (!ok) return;
    var st = readJSON('aksu-daily', {}); var streak = (st.last === yesterday()) ? (st.streak||0)+1 : 1;
    store.set('aksu-daily', JSON.stringify({last:d.day, streak:streak, best:Math.max(streak, st.best||0)}));
    toastQ.push({i:'🎯', lbl:['Tages-Challenge','Daily challenge'], de:['Tages-Challenge geschafft!','Serie: '+streak+(streak>1?' Tage 🔥':' Tag')], en:['Daily challenge done!','Streak: '+streak+(streak>1?' days 🔥':' day')]});
    nextToast(); achieve('daily'); if (streak >= 3) achieve('streak3');
    var b = document.getElementById('aksu-daily'); if (b) paintBanner(b);
    try { dispatchEvent(new CustomEvent('aksu:daily')); } catch(e){}
  }
  function paintBanner(el){ var d = dailyState();
    el.innerHTML = '<span class="dl-i">'+(d.done?'✅':'🎯')+'</span><span><small>'+(lang==='de'?'Tages-Challenge':'Daily challenge')+(d.streak?' · 🔥 '+d.streak:'')+'</small>'+
      challengeText(d.c)+(d.done?' — <b>'+(lang==='de'?'geschafft!':'done!')+'</b>':'')+'</span>';
    el.classList.toggle('done', d.done); }
  function addBanner(){
    var game = (location.pathname.split('/').pop()||'').replace('.html','');
    var d = dailyState(); if (!NAMES[game] || d.c.g !== game) return;
    var panel = document.querySelector('.panel'); if (!panel || document.getElementById('aksu-daily')) return;
    css(); var el = document.createElement('div'); el.id = 'aksu-daily'; el.className = 'dl-banner'; el.setAttribute('role','status');
    panel.parentNode.insertBefore(el, panel); paintBanner(el);
    addEventListener('aksu:lang', function(){ paintBanner(el); });
  }

  /* ---------- Sprache ---------- */
  function t(de, en){ return lang === 'en' ? en : de; }
  function apply(){
    document.documentElement.lang = lang;
    var els = document.querySelectorAll('[data-en]');
    for (var i=0;i<els.length;i++){ var el = els[i];
      if (el.dataset.de == null) el.dataset.de = el.innerHTML;
      el.innerHTML = lang === 'en' ? el.dataset.en : el.dataset.de; }
    var at = document.querySelectorAll('[data-en-label]');
    for (var j=0;j<at.length;j++){ var a = at[j];
      if (a.dataset.deLabel == null) a.dataset.deLabel = a.getAttribute('aria-label') || '';
      a.setAttribute('aria-label', lang === 'en' ? a.dataset.enLabel : a.dataset.deLabel); }
    var seg = document.querySelectorAll('.lang-seg button');
    for (var k=0;k<seg.length;k++) seg[k].setAttribute('aria-pressed', seg[k].dataset.lng === lang);
  }
  function setLang(l){ lang = l; store.set('lang', l); apply(); try { dispatchEvent(new CustomEvent('aksu:lang', {detail:l})); } catch(e){} }
  function addToggle(){
    var top = document.querySelector('.top'); if (!top || top.querySelector('.lang-seg')) return;
    css();
    var seg = document.createElement('div'); seg.className = 'lang-seg'; seg.setAttribute('role','group'); seg.setAttribute('aria-label','Sprache / Language');
    seg.innerHTML = '<button type="button" data-lng="de">DE</button><button type="button" data-lng="en">EN</button>';
    seg.addEventListener('click', function(e){ var b = e.target.closest('button'); if (b) setLang(b.dataset.lng); });
    var h1 = top.querySelector('h1'); top.insertBefore(seg, h1);
    if (h1) h1.style.marginLeft = '12px';
  }
  function init(){ addToggle(); apply(); addBanner(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();

  window.AKSU = { get lang(){ return lang; }, t:t, setLang:setLang, apply:apply, achieve:achieve, played:played,
    unlocked:unlocked, list:ACH, games:GAMES, report:report, daily:dailyState, challengeText:challengeText, gameName:function(g){return NAMES[g];} };
})();
