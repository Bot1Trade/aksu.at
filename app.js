/* aksu.at – gemeinsame Helfer für alle Seiten */
(function(){
  // Besucherstatistik (GoatCounter, ohne Cookies). Code eintragen, z. B. 'aksu' für https://aksu.goatcounter.com
  var GOATCOUNTER_CODE = '';
  if (GOATCOUNTER_CODE && location.hostname === 'aksu.at') {
    var s = document.createElement('script');
    s.async = true; s.src = 'https://gc.zgo.at/count.js';
    s.setAttribute('data-goatcounter', 'https://' + GOATCOUNTER_CODE + '.goatcounter.com/count');
    document.head.appendChild(s);
  }
  // Als App installierbar / offline spielbar
  if ('serviceWorker' in navigator && location.protocol === 'https:') {
    addEventListener('load', function(){ navigator.serviceWorker.register('/sw.js').catch(function(){}); });
  }
})();
