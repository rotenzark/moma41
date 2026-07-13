/* ===== MOMA41 · main.js ===== */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var intro = document.getElementById('intro');
  function closeIntro() { if (intro) { intro.classList.add('done'); setTimeout(function () { intro.style.display = 'none'; }, 800); } }
  if (intro) { if (reduce) intro.style.display = 'none'; else { document.getElementById('intro-skip').addEventListener('click', closeIntro); setTimeout(closeIntro, 3000); } }

  var header = document.getElementById('site-header');
  function onScroll() { header.classList.toggle('scrolled', window.scrollY > 40); }
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });

  var burger = document.getElementById('burger'), nav = document.querySelector('.nav');
  burger.addEventListener('click', function () { var o = nav.classList.toggle('open'); burger.setAttribute('aria-expanded', o); document.body.style.overflow = o ? 'hidden' : ''; });
  nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { nav.classList.remove('open'); burger.setAttribute('aria-expanded', false); document.body.style.overflow = ''; }); });

  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (r) { io.observe(r); });
    setTimeout(function () { reveals.forEach(function (r) { if (r.getBoundingClientRect().top < window.innerHeight) r.classList.add('in'); }); }, 1500);
  } else reveals.forEach(function (r) { r.classList.add('in'); });

  var TABLE = { 2: [10, 19], 3: [10, 19], 4: [11, 20], 5: [10, 19], 6: [9, 17] }; // Tue..Sat; Mon/Sun closed
  var DAYS_IT = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'];
  var DAYS_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  function romeNow() { return new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Rome' })); }
  function isOpen(d) { var o = TABLE[d.getDay()], h = d.getHours() + d.getMinutes() / 60; return !!o && h >= o[0] && h < o[1]; }
  function updateLive() {
    var d = romeNow(), open = isOpen(d), dot = document.getElementById('live-dot'), txt = document.getElementById('live-text');
    if (!dot) return; var en = LANG === 'en', day = d.getDay(), h = d.getHours() + d.getMinutes() / 60;
    if (open) { dot.className = 'open'; txt.textContent = (en ? 'Open now · closes at ' : 'Aperto ora · chiude alle ') + TABLE[day][0 + 1] + ':00'; }
    else {
      dot.className = 'closed'; var info;
      if (TABLE[day] && h < TABLE[day][0]) info = { d: day, t: TABLE[day][0], off: 0 };
      else { for (var i = 1; i <= 7; i++) { var nd = (day + i) % 7; if (TABLE[nd]) { info = { d: nd, t: TABLE[nd][0], off: i }; break; } } }
      var name = info.off === 0 ? (en ? 'today' : 'oggi') : (en ? DAYS_EN[info.d] : DAYS_IT[info.d]);
      txt.textContent = (en ? 'Closed · opens ' + name + ' at ' : 'Chiuso · apre ' + name + ' alle ') + info.t + ':00';
    }
  }

  var lb = document.getElementById('lightbox'), lbImg = document.getElementById('lb-img');
  document.querySelectorAll('.g-item').forEach(function (fig) { fig.addEventListener('click', function () { lbImg.src = fig.getAttribute('data-full'); lbImg.alt = (fig.querySelector('img') || {}).alt || ''; lb.classList.add('open'); lb.setAttribute('aria-hidden', 'false'); }); });
  function closeLb() { lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true'); setTimeout(function () { lbImg.src = ''; }, 300); }
  document.getElementById('lb-close').addEventListener('click', closeLb);
  lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLb(); });

  var LANG = 'it';
  var EN = {
    'intro.txt': 'Moma41', 'intro.skip': 'Enter →', 'brand.sub': 'Beauty & Wellness · Via Padova 41',
    'nav.gesto': 'The touch', 'nav.tratt': 'Treatments', 'nav.gallery': 'Gallery', 'nav.dove': 'Find us', 'cta.book': 'Book',
    'hero.label': 'Via Padova 41 · Milan · 45.491, 9.223', 'hero.h1a': 'Beauty & wellness,', 'hero.h1b': 'at number 41',
    'hero.sub': "A small studio where time slows down. Face, body, massage and wellbeing, with expert hands and the calm you need. Here the only number is you — after 41.",
    'hero.cta1': 'Book on WhatsApp', 'hero.cta2': 'The treatments', 'hero.live': 'Checking hours…',
    'gesto.kicker': 'The touch', 'gesto.h2': 'You feel at home.',
    'gesto.p1': "Moma41 is beauty & wellness: a small, cared-for beauty centre on Via Padova, where every treatment is done with skill and gentleness. «Really relaxing, worth it», they write — and for a first wax or a facial ritual, you're in safe hands.",
    'gesto.p2': "Cleanser, scrub, mask, massage: a ritual that takes its time. Because beauty, first of all, is feeling good.",
    'tratt.kicker': 'Treatments', 'tratt.h2': 'Face, body, wellbeing.',
    'tr.1t': 'Face', 'tr.1p': 'Cleanser, scrub, mask and facial massage. Cleansing and tailored treatments for your skin.',
    'tr.2t': 'Body', 'tr.2p': 'Body treatments and relaxing rituals, also for couples. The moment just for you.',
    'tr.3t': 'Massage', 'tr.3p': 'Face and body massage, to release tension and find calm again.',
    'tr.4t': 'Waxing & hair removal', 'tr.4p': 'With care and reassurance, even the first time. The right beautician makes the difference.',
    'tr.5t': 'Wellbeing', 'tr.5p': 'Whirlpool and wellness space: a relaxing journey, beyond beauty.',
    'tratt.note': 'Price list and availability on request. Message us on WhatsApp for advice or a quote.',
    'gallery.kicker': 'Gallery', 'gallery.h2': 'Inside Moma41',
    'rev.kicker': 'Voices', 'rev.h2': '4.8★ · the words of those who return',
    'dove.kicker': 'Find us', 'dove.h2': 'At number 41<br>of Via Padova.',
    'dove.addr': 'Address', 'dove.hours': 'Hours', 'dove.hoursv': 'Tue–Fri 10–19 (Thu 11–20) · Sat 9–17 · Sun & Mon closed', 'dove.wa': 'Phone / WhatsApp', 'dove.book': 'Book on WhatsApp', 'dove.route': 'Get directions',
    'faq.h2': 'Frequently asked',
    'faq.q1': 'Where are you?', 'faq.a1': 'At Via Padova 41, in Milan — that\'s where our name comes from: Moma41.',
    'faq.q2': 'When are you open?', 'faq.a2': 'Tuesday to Saturday: Tue, Wed and Fri 10–19, Thu 11–20, Sat 9–17. Closed Sunday and Monday.',
    'faq.q3': 'What treatments do you offer?', 'faq.a3': 'Facial treatments (cleanser, scrub, mask, massage), body, massage, waxing and wellbeing.',
    'faq.q4': 'How do I book?', 'faq.a4': 'On WhatsApp at 340 672 0528, or by phone.',
    'foot.sub': 'Beauty & Wellness · Via Padova 41', 'foot.where': 'Where', 'foot.hours': 'Hours', 'foot.closed': 'Sun & Mon closed', 'foot.contact': 'Contact',
    'foot.disclaimer': 'Demo website. Content and photos gathered from public sources (Google Maps); hours and details are indicative, to be confirmed with the studio.',
    'ab.book': 'Book', 'ab.route': 'Directions'
  };
  var IT = {};
  document.querySelectorAll('[data-i18n]').forEach(function (el) { IT[el.getAttribute('data-i18n')] = el.innerHTML; });
  function setLang(lang) {
    LANG = lang; var dict = lang === 'en' ? EN : IT;
    document.querySelectorAll('[data-i18n]').forEach(function (el) { var k = el.getAttribute('data-i18n'), v = dict[k]; if (v == null && lang === 'en') v = IT[k]; if (v != null) el.innerHTML = v; });
    document.documentElement.lang = lang;
    document.querySelectorAll('.lang button').forEach(function (b) { b.classList.toggle('active', b.getAttribute('data-lang') === lang); });
    updateLive();
  }
  document.querySelectorAll('.lang button').forEach(function (b) { b.addEventListener('click', function () { setLang(b.getAttribute('data-lang')); }); });
  updateLive(); setInterval(updateLive, 60000);
})();
