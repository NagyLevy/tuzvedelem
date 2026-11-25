/* Jogi ismeretek — ZH-gyakorló. Hash-router, kvízmotor, villámkártya, leckék, haladás (localStorage). */
(function () {
  'use strict';
  const FX = window.FX;
  const TEMAK = window.JOG_TEMAK;
  const LECKEK = window.JOG_LECKEK || [];
  const ANIM = window.JOG_ANIM || {};
  const T = Object.fromEntries(TEMAK.map((t) => [t.id, t]));
  const L = Object.fromEntries(LECKEK.map((l) => [l.id, l]));
  const app = document.getElementById('app');
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = (Math.random() * (i + 1)) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const LETTERS = 'ABCDEFGH';

  /* ---------- Kérdésbank ---------- */
  const BANK = [
    ...(window.JOG_TESZT || []).map((q) => ({ ...q, id: 'j' + q.n, src: 'teszt' })),
    /* a kurzus-kérdések magyarázata külön fájlban van (kurzus.js generált): JOG_KURZUS_X[id] = 'szöveg' vagy {x, old} */
    ...(window.JOG_KURZUS || []).map((q) => { const e = (window.JOG_KURZUS_X || {})[q.id]; return e ? { ...q, ...(typeof e === 'string' ? { x: e } : e) } : q; }),
    /* egy korábbi éles ZH 15 kérdése (3 válasz, 1 jó) */
    ...(window.JOG_ZHMINTA || []).map((q) => ({ ...q, id: 'z' + q.n, src: 'zh' })),
  ];
  const BY_ID = Object.fromEntries(BANK.map((q) => [q.id, q]));
  /* „régen” megjegyzés: ha a szöveg maga nem a régi szabályra utal, elé tesszük, hogy „Régen:” */
  const oldNote = (t) => (/^(régen|a régi|régi|\d{4})/i.test(t) ? '' : '<b>Régen:</b> ') + esc(t);
  const srcLabel = (q) => (q.src === 'teszt' ? `jogteszt.pdf · ${q.n}.` : q.src === 'zh' ? `⭐ Valódi ZH · ${q.n}.` : 'Kurzus-önellenőrző');
  /* éles ZH ponthatára (15 kérdésből): 8 = elégséges, 10 = közepes, 12 = jó, 14 = jeles */
  const ZH_CUTS = [8, 10, 12, 14];
  const zhDays = () => Math.round((new Date(2026, 10, 26) - new Date(new Date().toDateString())) / 864e5);

  /* ---------- Haladás ---------- */
  const KEY = 'jog.v1';
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } };
  const S = Object.assign({ seen: {}, wrong: [], best: 0, flash: {}, srs: {}, xp: 0, days: {}, story: {}, pb: {}, coachN: 0, g: {} }, load());
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* privát mód: nem baj */ } };
  const today = () => new Date().toLocaleDateString('sv'); // ÉÉÉÉ-HH-NN, helyi idő
  /* napi számláló + XP (minden 250 XP-nél egy kis dicséret) */
  const bump = (ok, xp) => {
    S.days[today()] = (S.days[today()] || 0) + 1;
    if (!ok) return;
    const before = S.xp;
    S.xp += xp;
    if (Math.floor(S.xp / 250) > Math.floor(before / 250)) setTimeout(() => FX.toast(`⚡ ${S.xp} XP — így tovább!`), 500);
  };
  /* Ismétlés a felejtés pillanatában: rossz válasz → 2 perc múlva újra; jó → egyre ritkábban
     (10 perc, 1 óra, 5 óra, 1 nap, 3 nap). Az elsőre eltalált kérdés rögtön az 1 órás fokra kerül. */
  const IV = [2, 10, 60, 300, 1440, 4320].map((m) => m * 60000);
  const record = (id, ok) => {
    const s = S.seen[id] || (S.seen[id] = { ok: 0, bad: 0 });
    const first = !s.ok && !s.bad;
    ok ? s.ok++ : s.bad++;
    s.last = ok ? 1 : 0;
    const i = S.wrong.indexOf(id);
    if (ok && i >= 0) S.wrong.splice(i, 1);
    if (!ok && i < 0) S.wrong.push(id);
    const r = S.srs[id] || { b: 0 };
    r.b = !ok ? 0 : first ? 2 : Math.min(r.b + 1, IV.length - 1);
    r.due = Date.now() + IV[r.b];
    S.srs[id] = r;
    bump(ok, 10);
    save();
  };
  /* a korábbi (ismétlési rendszer előtti) hibák azonnal esedékesek */
  S.wrong.forEach((id) => { if (!S.srs[id]) S.srs[id] = { b: 0, due: 0 }; });
  const dueIds = () => { const now = Date.now(); return Object.keys(S.srs).filter((id) => BY_ID[id] && S.srs[id].due <= now).sort((a, b) => S.srs[a].due - S.srs[b].due); };
  const dayStreak = () => {
    const d = new Date();
    if (!S.days[today()]) d.setDate(d.getDate() - 1);
    let n = 0;
    while (S.days[d.toLocaleDateString('sv')]) { n++; d.setDate(d.getDate() - 1); }
    return n;
  };
  const topicQs = (t) => BANK.filter((q) => q.t === t);
  const mastery = (qs) => (qs.length ? Math.round((qs.filter((q) => S.seen[q.id] && S.seen[q.id].last).length / qs.length) * 100) : 0);
  const stats = () => {
    const seen = Object.values(S.seen);
    const ok = seen.reduce((a, s) => a + s.ok, 0), all = seen.reduce((a, s) => a + s.ok + s.bad, 0);
    return { done: seen.length, acc: all ? Math.round((ok / all) * 100) : 0, known: BANK.filter((q) => S.seen[q.id] && S.seen[q.id].last).length };
  };

  /* ---------- Téma szín ---------- */
  const setTone = (color) => document.documentElement.style.setProperty('--tc', color || '#5e5ce6');

  /* ---------- Router ---------- */
  const parse = () => {
    const h = location.hash.replace(/^#\/?/, '');
    const [path, qs] = h.split('?');
    const parts = path.split('/').filter(Boolean);
    const params = Object.fromEntries(new URLSearchParams(qs || ''));
    return { parts, params };
  };
  let cleanup = null;
  const route = () => {
    if (cleanup) { cleanup(); cleanup = null; }
    const { parts, params } = parse();
    const page = parts[0] || 'home';
    $$('[data-nav]').forEach((a) => a.classList.toggle('on', a.dataset.nav === page || (['lecke', 'sztori'].includes(page) && a.dataset.nav === 'leckek') || (['kviz', 'kartya', 'zh', 'parbaj', 'villam', 'grind', 'sync'].includes(page) && a.dataset.nav === 'gyakorlas') || (page === 'osszefoglalo' && a.dataset.nav === 'szamok')));
    setTone(null);
    const views = { home: viewHome, leckek: viewLessons, lecke: () => viewLesson(parts[1]), gyakorlas: viewPractice, kviz: () => viewQuiz(params), zh: () => viewQuiz({ mode: 'zh' }), kartya: () => viewFlash(params), szamok: viewNumbers, sztori: () => viewStory(parts[1]),
      most: viewCoach, grind: () => viewGrind(params), sync: () => viewSync(params), parbaj: () => (parts[1] ? viewDuel(parts[1]) : viewDuelList()), villam: () => viewSwipe(params), osszefoglalo: viewSummary };
    (views[page] || viewHome)();
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
    app.querySelectorAll('.view').forEach((v) => { FX.words(v); FX.reveal(v); FX.rings(v); });
  };
  const mount = (html) => { app.innerHTML = `<div class="view">${html}</div>`; return app.firstElementChild; };

  /* ---------- Kezdőlap ---------- */
  function topicCard(t, href) {
    const qs = topicQs(t.id), m = mastery(qs), l = L[t.id];
    return `<a class="topic reveal" href="${href || '#/lecke/' + t.id}" style="--tc:${t.c}">
      ${FX.ring(m, `<span class="pct">${m}%</span>`)}
      <div class="meta"><div class="no">${t.no}. ${l ? `lecke · ~${l.perc} perc` : 'téma'}</div><div class="ttl">${esc(t.title)}</div><div class="sub">${qs.length} kérdés · ${esc(t.lead)}</div></div></a>`;
  }
  function viewHome() {
    const st = stats();
    const next = TEMAK.find((t) => mastery(topicQs(t.id)) < 60) || TEMAK[0];
    mount(`<div class="wrap">
      <section class="hero">
        <p class="eyebrow">Jogi ismeretek · elővizsga: november 26.</p>
        <h1 class="h-hero word-rise">Holnap <span class="grad-text">ZH.</span> Ma megtanulod.</h1>
        <p class="lead reveal">Rövid, emberi nyelvű leckék és <b>${BANK.length} feleletválasztós kérdés</b>: a jogteszt.pdf mind a ${(window.JOG_TESZT || []).length} kérdése a mai jog szerint javítva, plusz a kurzus önellenőrző kérdései.</p>
        <div class="btn-row reveal">
          <a class="btn big-go" href="#/most">▶ Mit csináljak most?</a>
          <a class="btn alt" href="#/grind">🔥 Grind</a>
          <a class="btn alt" href="#/lecke/${next.id}">${st.done ? 'Folytasd a leckét' : 'Kezdd az 1. leckével'} →</a>
        </div>
      </section>
      <div class="stats">
        <div class="stat reveal"><div class="v" data-count="${st.known}">${st.known}</div><div class="l">kérdést tudsz (${BANK.length}-ból)</div></div>
        <div class="stat reveal"><div class="v" data-count="${st.acc}%">${st.acc}%</div><div class="l">pontosság eddig</div></div>
        <div class="stat reveal"><div class="v" data-count="${S.wrong.length}">${S.wrong.length}</div><div class="l">hibás kérdés vár rád</div></div>
        <div class="stat reveal"><div class="v" data-count="${S.best}">${S.best}</div><div class="l">leghosszabb sorozat</div></div>
      </div>
      <div class="sec-head"><h2 class="h-sec reveal">Témakörök</h2><p class="lead reveal">A gyűrű azt mutatja, a téma kérdéseinek hány százalékára válaszoltál jól legutóbb.</p></div>
      <div class="grid grid-2">${TEMAK.map((t) => topicCard(t)).join('')}</div>
      <div class="sec"><div class="sec-head"><h2 class="h-sec reveal">Gyors indítás</h2></div>${modeTiles()}</div>
    </div>`);
  }

  /* ---------- Leckék listája ---------- */
  function viewLessons() {
    mount(`<div class="wrap">
      <section class="hero"><p class="eyebrow">11 lecke · kb. 5 perc mindegyik</p>
        <h1 class="h-hero word-rise">Nem voltál órán? <span class="grad-text">Semmi baj.</span></h1>
        <p class="lead reveal">Minden lecke: egy mondatos lényeg → animált ábrák → fogalomkártyák hasonlatokkal → a számok, amiket kérdeznek → csapdák → mini-kvíz.</p>
        <div class="btn-row reveal"><a class="btn tc focus-btn" href="#/sztori/${TEMAK[0].id}">▶ Fókusz mód <small>egyszerre egy dolog, animálva, közben kérdésekkel</small></a></div></section>
      <div class="grid grid-2">${TEMAK.map((t) => topicCard(t)).join('')}</div></div>`);
  }

  /* ---------- Egy lecke ---------- */
  function viewLesson(id) {
    const t = T[id], l = L[id];
    if (!t) return viewLessons();
    setTone(t.c);
    const idx = TEMAK.indexOf(t), prev = TEMAK[idx - 1], next = TEMAK[idx + 1];
    const qs = topicQs(id);
    const anims = ANIM[id] || [];
    if (!l) {
      mount(`<div class="wrap"><div class="empty"><div class="e">${t.g}</div><h2>${esc(t.title)}</h2><p>Ehhez a témához még nincs lecke, de ${qs.length} kérdéssel gyakorolhatsz.</p><a class="btn tc" href="#/kviz?t=${id}">Gyakorlás</a></div></div>`);
      return;
    }
    const v = mount(`<div class="wrap">
      <section class="lesson-hero">
        <div class="big-ico">${t.g}</div>
        <p class="eyebrow">${t.no}. lecke · ~${l.perc} perc</p>
        <h1 class="h-hero word-rise">${esc(t.title)}</h1>
        <p class="lead reveal">${esc(t.lead)}</p>
        <div class="btn-row reveal"><a class="btn tc focus-btn" href="#/sztori/${id}">▶ Fókusz mód <small>kártyánként, animálva</small></a></div>
        <div class="one-liner reveal" id="lenyeg">${l.egyMondat}</div>
      </section>
      <div class="toc"><div class="seg">
        <button data-go="lenyeg">Lényeg</button>${anims.length ? '<button data-go="videok">Videók</button>' : ''}<button data-go="kartyak">Kártyák</button>${l.szamok && l.szamok.length ? '<button data-go="szamok">Számok</button>' : ''}<button data-go="csapdak">Csapdák</button><button data-go="kerdesek">Kérdések</button><button data-go="minikviz">Kvíz</button>
      </div></div>
      ${anims.length ? `<section class="sec" id="videok"><div class="sec-head"><h2 class="h-sec reveal">🎬 Nézd meg mozgásban</h2><p class="lead reveal">Rövid, magától lejátszódó ábrák. Bármelyik lépésre rákattinthatsz, a ↻ újraindítja.</p></div>
        <div class="anims">${anims.map(animBlock).join('')}</div></section>` : ''}
      <section class="sec" id="kartyak"><div class="sec-head"><h2 class="h-sec reveal">Amit érteni kell</h2></div>
        <div class="grid grid-2">${l.kartyak.map((k) => `<article class="concept reveal">${k.k ? `<div class="k">${esc(k.k)}</div>` : ''}<h3 class="h-card">${k.cim}</h3>${k.html}${k.hasonlat ? `<div class="analogy">${k.hasonlat}</div>` : ''}</article>`).join('')}</div></section>
      ${l.szamok && l.szamok.length ? `<section class="sec" id="szamok"><div class="sec-head"><h2 class="h-sec reveal">🔢 Számok, amiket kérdeznek</h2><p class="lead reveal">A tesztek kedvenc csapdái. Ezeket érdemes bemagolni.</p></div>
        <div class="numbers">${l.szamok.map((n) => `<div class="num reveal"><div class="v" data-count="${esc(n.v)}">${esc(n.v)}</div><div class="l">${n.l}</div></div>`).join('')}</div></section>` : ''}
      <section class="sec" id="csapdak"><div class="sec-head"><h2 class="h-sec reveal">⚠️ Csapdák</h2><p class="lead reveal">Itt szoktak elcsúszni a válaszok.</p></div>
        <div class="grid">${l.csapdak.map((c) => `<div class="trap reveal"><i>!</i><div>${c}</div></div>`).join('')}</div></section>
      <section class="sec" id="kerdesek"><div class="sec-head"><h2 class="h-sec reveal">📋 Mit kérdeznek?</h2><p class="lead reveal">A téma mind a ${qs.length} kérdése, a jó válasszal. Olvasd át egyszer, mint egy puskát. A „Miért?” lenyitja a magyarázatot.</p></div>
        <div class="qa-list">${qs.map(qaItem).join('')}</div></section>
      <section class="sec" id="minikviz"><div class="sec-head"><h2 class="h-sec reveal">Mini-kvíz</h2><p class="lead reveal">3 kérdés a leckéből. Ha megy, jöhet a teljes téma (${qs.length} kérdés).</p></div>
        <div id="inlineQuiz"></div></section>
      <div class="lesson-nav">
        ${prev ? `<a class="btn alt" href="#/lecke/${prev.id}">← ${esc(prev.short)}</a>` : '<span></span>'}
        <a class="btn tc" href="#/kviz?t=${id}">Az egész téma gyakorlása (${qs.length})</a>
        ${next ? `<a class="btn alt" href="#/lecke/${next.id}">${esc(next.short)} →</a>` : '<span></span>'}
      </div></div>`);
    $$('[data-go]', v).forEach((b) => b.addEventListener('click', () => {
      const el = document.getElementById(b.dataset.go);
      window.scrollTo({ top: el.getBoundingClientRect().top + scrollY - 120, behavior: 'smooth' });
    }));
    const stops = $$('.anim', v).map((el, i) => animPlayer(el, anims[i]));
    cleanup = () => stops.forEach((f) => f());
    const mini = (l.mini || []).map((i) => BY_ID[i]).filter(Boolean);
    const pool = mini.length >= 3 ? mini.slice(0, 3) : mini.concat(shuffle(qs.filter((q) => !mini.includes(q))).slice(0, 3 - mini.length));
    runQuiz($('#inlineQuiz', v), pool, { inline: true, title: 'Mini-kvíz' });
  }

  /* ---------- Animált ábra („videó”): a lépések egyenként épülnek fel, alattuk narráció ----------
     tipus: piramis (fentről lefelé szélesedő szintek) | lanc (számozott folyamat) | nyil (ki → kit, a nyílon a feltétel) */
  function animBlock(a) {
    const n = a.lepesek.length;
    const step = (st, i) => {
      if (a.tipus === 'piramis') return `<div class="st" style="--w:${Math.round(38 + (62 * i) / Math.max(1, n - 1))}%"><b>${st.t}</b>${st.s ? `<span>${st.s}</span>` : ''}</div>`;
      if (a.tipus === 'nyil') return `<div class="st"><span class="from">${st.from}</span><span class="arr"><em>${st.via || ''}</em></span><span class="to"><b>${st.t}</b>${st.s ? `<span>${st.s}</span>` : ''}</span></div>`;
      return `<div class="st"><div class="dot">${i + 1}</div><div><b>${st.t}</b>${st.s ? `<span>${st.s}</span>` : ''}</div></div>`;
    };
    return `<div class="anim reveal"><div class="anim-head"><h3 class="h-card">${a.cim}</h3>
      <div class="anim-ctl"><button class="ab play" aria-label="Lejátszás">▶</button><button class="ab redo" aria-label="Újra">↻</button></div></div>
      <div class="anim-cap"><span class="n"></span><p></p></div><div class="anim-bar"><i></i></div>
      <div class="anim-stage t-${a.tipus || 'lanc'}">${a.lepesek.map(step).join('')}</div></div>`;
  }
  function animPlayer(el, a, onCap) {
    const sts = $$('.st', el), n = sts.length, cap = $('.anim-cap p', el), num = $('.anim-cap .n', el), bar = $('.anim-bar i', el), btn = $('.play', el);
    let i = -1, timer = null;
    const show = (k) => {
      i = k;
      sts.forEach((s, j) => { s.classList.toggle('in', j <= k); s.classList.toggle('cur', j === k); });
      cap.classList.remove('fade'); void cap.offsetWidth; cap.classList.add('fade');
      cap.innerHTML = k < 0 ? (a.intro || 'Nyomd meg a ▶ gombot.') : a.lepesek[k].c;
      num.textContent = k < 0 ? '' : `${k + 1}/${n}`;
      if (onCap && k >= 0) onCap(a.lepesek[k].c);
      bar.style.width = ((k + 1) / n) * 100 + '%';
    };
    const stop = () => { clearTimeout(timer); timer = null; btn.textContent = '▶'; };
    /* olvasási idő a narráció hosszából (kb. 15 karakter / mp), 2,6 és 7 mp között */
    const wait = (k) => { const sp = onCap && TTS.on; return Math.min(sp ? 11000 : 7000, Math.max(2600, (a.lepesek[k].c || '').replace(/<[^>]+>/g, '').length * (sp ? 82 : 65))); };
    const tick = () => { if (i >= n - 1) return stop(); show(i + 1); timer = setTimeout(tick, wait(i)); };
    const play = () => { if (i >= n - 1) show(-1); btn.textContent = '❚❚'; timer = setTimeout(tick, 350); };
    btn.addEventListener('click', () => (timer ? stop() : play()));
    $('.redo', el).addEventListener('click', () => { stop(); show(-1); play(); });
    sts.forEach((s, j) => s.addEventListener('click', () => { stop(); show(j); }));
    show(-1);
    const io = new IntersectionObserver((es) => { if (es[0].isIntersecting) { io.disconnect(); if (i < 0 && !timer) play(); } }, { threshold: 0.55 });
    io.observe(el);
    return () => { stop(); io.disconnect(); };
  }

  /* „Mit kérdeznek?” sor: kérdés, a jó válasz(ok) kiemelve, a rosszak halványan, lenyitható magyarázat */
  function qaItem(q) {
    const good = q.a.map((k) => `<li>${esc(q.o[k])}</li>`).join('');
    const bad = q.o.filter((_, k) => !q.a.includes(k)).map(esc).join(' · ');
    const why = (q.x ? `<p>${esc(q.x)}</p>` : '') + (q.old ? `<p class="old">${oldNote(q.old)}</p>` : '');
    return `<div class="qa"><div class="qa-q">${esc(q.q)}${q.a.length > 1 ? ' <span class="pill">több jó</span>' : ''}</div>
      <ul class="qa-a">${good}</ul>${bad ? `<div class="qa-no">Nem: ${bad}</div>` : ''}
      ${why ? `<details><summary>Miért?</summary>${why}</details>` : ''}</div>`;
  }

  /* ---------- Fókusz mód („sztori”): egy lecke diákra bontva; minden diának „ütemei” vannak,
     koppintásra egyenként jelennek meg; minden 2. fogalomkártya után egy gyors kérdés ---------- */
  function storySlides(id) {
    const t = T[id], l = L[id], anims = ANIM[id] || [];
    const qs = shuffle(topicQs(id).filter((q) => q.a.length === 1 && q.o.length <= 5 && q.o.join('').length < 420));
    const slides = [{ kind: 'intro' }];
    /* „előbb kérdez”: egy tipp-kérdés még a tanulás előtt — a rossz tipp utáni „aha” jobban megmarad */
    if (qs.length > 3) slides.push({ kind: 'q', q: qs.shift(), pre: true });
    anims.forEach((a) => slides.push({ kind: 'anim', a }));
    l.kartyak.forEach((k, i) => {
      slides.push({ kind: 'card', k });
      if (i % 2 === 1 && qs.length) slides.push({ kind: 'q', q: qs.shift() });
    });
    if (l.szamok && l.szamok.length) slides.push({ kind: 'nums' });
    slides.push({ kind: 'traps' });
    qs.slice(0, 2).forEach((q) => slides.push({ kind: 'q', q }));
    slides.push({ kind: 'end' });
    return slides;
  }
  function storyHTML(sl, t, l) {
    const nextT = TEMAK[TEMAK.indexOf(t) + 1];
    switch (sl.kind) {
      case 'intro': return `<div class="s-intro"><div class="s-emoji">${t.g}</div><p class="eyebrow">${t.no}. lecke · fókusz mód</p><h1>${esc(t.title)}</h1>
        <div class="beat s-one"><b>Egy mondatban:</b> ${l.egyMondat}</div></div>`;
      case 'anim': return animBlock(sl.a).replace('anim reveal', 'anim');
      case 'card': return `<div class="s-card">${sl.k.k ? `<div class="k">${esc(sl.k.k)}</div>` : ''}<h2>${sl.k.cim}</h2><div class="s-body">${sl.k.html}</div>${sl.k.hasonlat ? `<div class="analogy beat">${sl.k.hasonlat}</div>` : ''}</div>`;
      case 'nums': return `<div class="s-card"><div class="k">Magold be</div><h2>🔢 Számok</h2><div class="s-nums">${l.szamok.map((n) => `<div class="beat s-num"><div class="v">${esc(n.v)}</div><div class="l">${n.l}</div></div>`).join('')}</div></div>`;
      case 'traps': return `<div class="s-card"><div class="k">Itt szoktak elcsúszni</div><h2>⚠️ Csapdák</h2><div class="s-traps">${l.csapdak.map((c) => `<div class="beat trap"><i>!</i><div>${c}</div></div>`).join('')}</div></div>`;
      case 'q': {
        const order = shuffle(sl.q.o.map((_, i) => i));
        return `<div class="s-card s-q"><div class="k">${sl.pre ? 'Tippelj! Nem baj, ha még nem tudod' : 'Gyors kérdés'}</div><h2>${esc(sl.q.q)}</h2><div class="s-opts">${order.map((i) => `<button class="s-opt" data-i="${i}">${esc(sl.q.o[i])}</button>`).join('')}</div><div class="s-fb"></div></div>`;
      }
      default: return `<div class="s-intro"><div class="s-emoji">🎉</div><h1>Kész a lecke!</h1><p class="lead">Most rögzítsd: nézd át a kérdéslistát, vagy gyakorold a témát.</p>
        <div class="btn-row"><a class="btn tc" href="#/most">▶ Mit csináljak most?</a><a class="btn alt" href="#/kviz?t=${t.id}&n=10">Téma-kvíz</a><a class="btn alt" href="#/lecke/${t.id}">📋 Mit kérdeznek?</a>${nextT ? `<a class="btn alt" href="#/sztori/${nextT.id}">Következő: ${esc(nextT.short)} ▶</a>` : ''}</div></div>`;
    }
  }
  /* a számok „felpörögnek”: a szöveg elején álló számot 0-ról animálja, az utótagot megtartja */
  function countUp(el) {
    const m = el.textContent.match(/^(\d[\d ]*)(.*)$/);
    if (!m) return;
    const end = parseInt(m[1].replace(/ /g, ''), 10), suf = m[2], spaced = / /.test(m[1]), t0 = performance.now();
    const fmt = (v) => (spaced ? v.toLocaleString('hu-HU').replace(/\s/g, ' ') : String(v));
    const f = (now) => { const k = Math.min(1, (now - t0) / 700); el.textContent = fmt(Math.round(end * (1 - Math.pow(1 - k, 3)))) + suf; if (k < 1) requestAnimationFrame(f); };
    requestAnimationFrame(f);
  }
  function viewStory(id) {
    const t = T[id], l = L[id];
    if (!t || !l) return viewLessons();
    setTone(t.c);
    const slides = storySlides(id);
    /* a body-ba kerül, mert a .view belépő animációja (transform) elrontaná a position: fixed-et */
    mount('');
    const v = document.createElement('div');
    v.className = 'story';
    v.style.setProperty('--tc', t.c);
    v.innerHTML = (`
      <div class="s-top"><div class="s-segs">${slides.map(() => '<span><i></i></span>').join('')}</div>
        <div class="s-bar"><span>${t.g} ${esc(t.short)}</span><span class="s-tools">${ttsBtn('s-x')}<a class="s-x" href="#/lecke/${id}" aria-label="Bezárás">✕</a></span></div></div>
      <div class="s-stage" id="sStage"></div>
      <div class="s-bot"><button class="btn alt s-prev" aria-label="Vissza">‹</button><span class="s-hint">Koppints bárhová · <span class="kbd">Szóköz</span></span><button class="btn tc s-next">Tovább ›</button></div>`);
    document.body.appendChild(v);
    const stage = $('#sStage', v), segs = $$('.s-segs i', v), nextBtn = $('.s-next', v);
    let si = 0, bi = 0, beats = [], stopAnim = null, answered = false, spoken = null;
    /* hangos mód: a dia címe, aztán minden új ütem */
    const speakSlide = () => {
      const sl = slides[si];
      if (!TTS.on || sl.kind === 'anim') return;
      const h = $('.s-slide h1, .s-slide h2', stage);
      let txt = h ? h.textContent : '';
      if (sl.kind === 'intro' && beats[0]) { txt += '. ' + beats[0].textContent; spoken = beats[0]; }
      if (sl.kind === 'q') txt += '. ' + $$('.s-opt', stage).map((o) => o.textContent).join('. Vagy: ');
      TTS.say(txt);
    };
    const paint = () => {
      segs.forEach((g, i) => (g.style.width = i < si ? '100%' : i > si ? '0%' : `${beats.length ? Math.round(((bi + 1) / (beats.length + 1)) * 100) : 100}%`));
      beats.forEach((b, i) => { b.classList.toggle('on', i <= bi - 1); b.classList.toggle('now', i === bi - 1); });
      const cur = beats[bi - 1];
      if (cur && cur !== spoken) { spoken = cur; TTS.say(cur.innerHTML); }
      if (cur) {
        const num = cur.querySelector('.v');
        if (num && !cur.dataset.done) { cur.dataset.done = 1; countUp(num); }
        const r = cur.getBoundingClientRect(), sr = stage.getBoundingClientRect();
        if (r.bottom > sr.bottom - 20) stage.scrollBy({ top: r.bottom - sr.bottom + 60, behavior: 'smooth' });
      }
      const sl = slides[si];
      nextBtn.textContent = si === slides.length - 1 ? 'Bezárás' : sl.kind === 'q' && !answered ? 'Kihagyom ›' : 'Tovább ›';
    };
    const render = (dir, atEnd) => {
      if (stopAnim) { stopAnim(); stopAnim = null; }
      const sl = slides[si];
      answered = false;
      stage.innerHTML = `<div class="s-slide ${dir < 0 ? 'back' : ''}">${storyHTML(sl, t, l)}</div>`;
      stage.scrollTop = 0;
      const body = $('.s-body', stage);
      beats = $$('.beat', stage);
      if (body) {
        const fromBody = [];
        [...body.children].forEach((c) => (/^(UL|OL)$/.test(c.tagName) ? fromBody.push(...c.children) : fromBody.push(c)));
        fromBody.forEach((b) => b.classList.add('beat'));
        beats = [...fromBody, ...beats];
      }
      if (sl.kind === 'anim') stopAnim = animPlayer($('.anim', stage), sl.a, (c) => TTS.say(c));
      if (sl.kind === 'q') bindQ(sl.q);
      if (sl.kind === 'end') { FX.confetti(160); S.story[id] = Date.now(); save(); }
      bi = atEnd ? beats.length : sl.kind === 'intro' ? 1 : 0;
      spoken = sl.kind === 'intro' ? beats[0] : atEnd ? beats[beats.length - 1] : null;
      paint();
      speakSlide();
    };
    const bindQ = (q) => {
      $$('.s-opt', stage).forEach((b) => b.addEventListener('click', (e) => {
        e.stopPropagation();
        if (answered) return;
        answered = true;
        const ok = +b.dataset.i === q.a[0];
        record(q.id, ok);
        $$('.s-opt', stage).forEach((o) => { o.disabled = true; if (+o.dataset.i === q.a[0]) o.classList.add('ok'); });
        if (!ok) b.classList.add('bad');
        $('.s-fb', stage).innerHTML = `<div class="fb ${ok ? 'ok' : 'no'}"><div class="h">${ok ? '✓ Ez az!' : '✕ Nem egészen.'}</div>${q.x ? `<p>${esc(q.x)}</p>` : ''}${q.old ? `<div class="old">${oldNote(q.old)}</div>` : ''}</div>`;
        if (ok) FX.confetti(50);
        paint();
      }));
    };
    const next = () => {
      if (bi < beats.length) { bi++; return paint(); }
      if (si < slides.length - 1) { si++; render(1); } else location.hash = `#/lecke/${id}`;
    };
    const prev = () => {
      if (bi > (slides[si].kind === 'intro' ? 1 : 0)) { bi--; return paint(); }
      if (si > 0) { si--; render(-1, true); }
    };
    nextBtn.addEventListener('click', (e) => { e.stopPropagation(); next(); });
    $('.s-prev', v).addEventListener('click', (e) => { e.stopPropagation(); prev(); });
    stage.addEventListener('click', (e) => { if (!e.target.closest('a, button, .anim')) next(); });
    const onKey = (e) => {
      if (e.key === ' ' || e.key === 'ArrowRight' || e.key === 'Enter') { e.preventDefault(); next(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
      else if (e.key === 'Escape') location.hash = `#/lecke/${id}`;
      else if (slides[si].kind === 'q' && /^[1-5]$/.test(e.key)) { const o = $$('.s-opt', stage)[+e.key - 1]; if (o) o.click(); }
    };
    document.addEventListener('keydown', onKey);
    document.documentElement.classList.add('story-open');
    bindTts(v, speakSlide);
    cleanup = () => { document.removeEventListener('keydown', onKey); document.documentElement.classList.remove('story-open'); if (stopAnim) stopAnim(); TTS.stop(); v.remove(); };
    render(1);
  }

  /* ---------- Hangos mód: a böngésző beépített (magyar) felolvasója ---------- */
  const TTS = {
    ok: 'speechSynthesis' in window,
    on: (() => { try { return localStorage.getItem('jog.tts') === '1'; } catch (e) { return false; } })(),
    set(v) { this.on = v; try { localStorage.setItem('jog.tts', v ? '1' : '0'); } catch (e) { /* nincs tárhely */ } if (!v) this.stop(); },
    stop() { if (this.ok) speechSynthesis.cancel(); },
    say(html) {
      if (!this.on || !this.ok) return;
      const txt = String(html).replace(/<[^>]+>/g, ' ').replace(/[→←·•|]/g, ', ').replace(/\s+/g, ' ').trim();
      if (!txt) return;
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(txt);
      u.lang = 'hu-HU';
      u.rate = 1.05;
      const hu = speechSynthesis.getVoices().find((x) => /^hu/i.test(x.lang));
      if (hu) u.voice = hu;
      speechSynthesis.speak(u);
    },
  };
  const ttsBtn = (cls) => (TTS.ok ? `<button class="${cls || 'x'} tts-btn${TTS.on ? ' on' : ''}" aria-label="Hangos mód" title="Hangos mód: felolvassa a szöveget">🔊</button>` : '');
  const bindTts = (root, onOn) => {
    const b = $('.tts-btn', root);
    if (b) b.addEventListener('click', (e) => { e.stopPropagation(); TTS.set(!TTS.on); b.classList.toggle('on', TTS.on); if (TTS.on && onOn) onOn(); });
  };

  /* Húzás balra / jobbra (egér és érintés): onPick('a') = bal, onPick('b') = jobb */
  function swipe(card, onPick) {
    let x0 = null, dx = 0;
    const set = (x, anim) => {
      card.style.transition = anim ? '' : 'none';
      card.style.transform = x ? `translateX(${x}px) rotate(${x / 18}deg)` : '';
      card.dataset.lean = x < -40 ? 'a' : x > 40 ? 'b' : '';
    };
    card.addEventListener('pointerdown', (e) => {
      if (e.button > 0 || e.target.closest('button, a')) return;
      x0 = e.clientX; dx = 0;
      card.setPointerCapture(e.pointerId);
    });
    card.addEventListener('pointermove', (e) => { if (x0 !== null) { dx = e.clientX - x0; set(dx); } });
    const end = () => {
      if (x0 === null) return;
      x0 = null;
      if (Math.abs(dx) > Math.min(110, card.offsetWidth * 0.28)) onPick(dx < 0 ? 'a' : 'b');
      else set(0, true);
    };
    card.addEventListener('pointerup', end);
    card.addEventListener('pointercancel', end);
  }
  /* ←/→ billentyű; várakozáskor Enter / Szóköz is továbbvisz */
  const arrowKeys = (onLeft, onRight, onGo) => {
    const f = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === 'ArrowLeft') { e.preventDefault(); onLeft(); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); onRight(); }
      else if ((e.key === 'Enter' || e.key === ' ') && onGo) { e.preventDefault(); onGo(); }
    };
    document.addEventListener('keydown', f);
    cleanup = () => { document.removeEventListener('keydown', f); TTS.stop(); };
  };

  /* ---------- „Mit csináljak most?” — egyetlen javaslat, döntés nélkül ---------- */
  const PARBAJ = window.JOG_PARBAJ || [];
  const storyDone = (id) => !!S.story[id] || mastery(topicQs(id)) >= 70;
  function coachPick() {
    if (BY_ID.z1 && !S.seen.z1 && !Object.keys(S.g).length) return { href: '#/kviz?mode=minta', ic: '⭐', c: '#ff375f', title: 'Valódi ZH-minta: 15 kérdés', why: 'Pont így néz ki a ZH: 15 kérdés, 3 válasz, 8 jó = kettes. Kezdd ezzel, minden válasz után magyarázattal.', perc: 5 };
    const dz = zhDays();
    if (dz >= 0 && dz <= 1) {
      if (S.coachN % 3 === 2) return { href: '#/zh', ic: '⏱️', c: '#ff9f0a', title: 'ZH-szimuláció: 15 kérdés, mint élesben', why: 'Főpróba: minden témából, időre, a végén jeggyel. Utána vissza a grindhoz.', perc: 10 };
      const gs = gStats(GPOOL);
      return { href: '#/grind?go=1', ic: '🔥', c: '#ff453a', title: `Grind: ${gs.n - gs.m} kérdés van hátra`, why: `Az összes kérdés az éles formában (3 válasz). Amit rontasz, visszajön; ami kétszer megy, kiesik. Becsült ZH-pontod most: ${fmt1(gEst())}.`, perc: 10 };
    }
    const due = dueIds(), urgent = due.filter((id) => S.srs[id].b <= 1).length;
    if (urgent >= 4 || due.length >= 12) return { href: '#/kviz?mode=most', ic: '🔁', c: '#ff375f', title: `Ismétlés: ${Math.min(Math.max(due.length, 10), 12)} kérdés`, why: 'Ezeket most kezded elfelejteni — ilyenkor a legolcsóbb visszahozni őket.', perc: 3 };
    const fresh = TEMAK.find((t) => L[t.id] && !storyDone(t.id));
    if (fresh) return { href: '#/sztori/' + fresh.id, ic: fresh.g, c: fresh.c, title: `${fresh.no}. lecke fókusz módban: ${fresh.short}`, why: Object.keys(S.story).length ? 'A következő lecke, amit még nem vettél át. Kártyánként, animálva, közben kérdésekkel.' : 'Kezdjük az elején: egy lecke kártyánként, animálva, közben kérdésekkel.', perc: L[fresh.id].perc };
    const weak = TEMAK.filter((t) => L[t.id]).map((t) => ({ t, m: mastery(topicQs(t.id)) })).sort((a, b) => a.m - b.m)[0];
    if (weak.m >= 85) return { href: '#/zh', ic: '⏱️', c: '#ff9f0a', title: 'ZH-szimuláció', why: 'Minden témád 85% felett van — jöhet a főpróba.', perc: 30 };
    const t = weak.t, why = `Ez most a leggyengébb témád (${weak.m}%). Váltogatjuk a formát, hogy ne und meg.`;
    const kind = S.coachN % 3, pbs = PARBAJ.filter((x) => x.t === t.id);
    if (kind === 1 && pbs.length) {
      const x = pbs.slice().sort((a, b) => (S.pb[a.id] || 0) - (S.pb[b.id] || 0))[0];
      return { href: '#/parbaj/' + x.id, ic: '⚔️', c: t.c, title: `Párbaj: ${x.a[0]} vs. ${x.b[0]}`, why, perc: 2 };
    }
    if (kind === 2) return { href: '#/villam?t=' + t.id, ic: '⚡', c: t.c, title: `Igaz vagy hamis: ${t.short}`, why, perc: 2 };
    return { href: `#/kviz?t=${t.id}&n=10`, ic: t.g, c: t.c, title: `10 kérdés: ${t.short}`, why, perc: 5 };
  }
  function viewCoach() {
    const p = coachPick(), due = dueIds().length, todayN = S.days[today()] || 0, goal = 100;
    const days = zhDays();
    const zh = days > 1 ? `${days} nap múlva ZH` : days === 1 ? 'Holnap ZH' : days === 0 ? 'Ma ZH — hajrá!' : 'A ZH után';
    const topics = TEMAK.filter((t) => L[t.id]).map((t) => ({ t, m: mastery(topicQs(t.id)) })).sort((a, b) => a.m - b.m);
    const v = mount(`<div class="wrap coach">
      <section class="hero"><p class="eyebrow">${zh} · 🔥 ${dayStreak()} napos sorozat · ⚡ ${S.xp} XP</p>
        <h1 class="h-hero word-rise">Mit csináljak <span class="grad-text">most?</span></h1>
        <p class="lead reveal">Nem kell döntened. Ez a legjobb következő lépés a válaszaid alapján — ha kész, gyere vissza ide.</p></section>
      <a class="next-card" href="${p.href}" id="goNext" style="--tc:${p.c}">
        <div class="nc-ic">${p.ic}</div>
        <div class="nc-body"><div class="nc-k">Most ezt · kb. ${p.perc} perc</div><div class="nc-t">${esc(p.title)}</div><div class="nc-why">${esc(p.why)}</div></div>
        <div class="nc-go" aria-hidden="true">▶</div></a>
      <div class="coach-alt reveal"><span>Inkább mást?</span>
        <a class="chip" href="#/grind">🔥 Grind</a><a class="chip" href="#/sync">📲 Szinkron</a><a class="chip" href="#/villam">⚡ Igaz/hamis</a><a class="chip" href="#/parbaj">⚔️ Párbaj</a><a class="chip" href="#/kviz?mode=most">🔁 Ismétlés (${due})</a><a class="chip" href="#/osszefoglalo">📄 Összefoglaló</a><a class="chip" href="#/zh">⏱️ ZH-szimuláció</a></div>
      <div class="grid grid-2 coach-stats">
        <div class="card reveal"><h3 class="h-card">Mai adag</h3>${FX.ring(Math.min(100, Math.round((todayN / goal) * 100)), `<span class="pct">${todayN}</span>`)}<p class="muted">válasz ma · cél: ${goal}</p></div>
        <div class="card reveal"><h3 class="h-card">Ismétlésre vár</h3><div class="big-n">${due}</div><p class="muted">A rossz válaszokat 2 perc múlva, a jókat egyre ritkábban hozza vissza.</p></div>
      </div>
      <section class="sec"><div class="sec-head"><h2 class="h-sec reveal">Témáid, a leggyengébbtől</h2><p class="lead reveal">Koppints egy témára: 10 kérdés belőle.</p></div>
        <div class="tbars">${topics.map(({ t, m }) => `<a class="tbar reveal" href="#/kviz?t=${t.id}&n=10" style="--tc:${t.c}"><span class="tb-n">${t.g} ${esc(t.short)}${storyDone(t.id) ? '' : '<em>új</em>'}</span><span class="tb-track"><i style="--w:${m}%"></i></span><span class="tb-p">${m}%</span></a>`).join('')}</div></section>
    </div>`);
    $('#goNext', v).addEventListener('click', () => { S.coachN++; save(); });
  }

  /* ---------- Grind: az összes kérdés az éles formában (3 válasz, 1 jó), amíg mind „megy” ----------
     S.g[id]: 0 = rontott, 1 = egyszer jó, 2 = megy (kétszer egymás után jó; elsőre eltalált kérdésnél a második
     jó válasz ~25 kérdéssel később jön, hogy a szerencsés tipp ne számítson tudásnak). */
  const GSELF = /^(mindkettő(re)?|egyik sem|mindegyik|a fentiek.*|fentiek.*)\.?$|\b[A-D] és [A-D]\b/i;
  const GW = { alap: 2, alkotmany: 2, allamszerv: 2, birosag: 1, munka: 1, polgari1: 1, polgari2: 2, bunteto: 2, nemzetkozi: 1, kozig: 1, fogyaszto: 0.3 };
  const GC = ['', '#ff453a', '#ff9f0a', '#0a84ff', '#30d158', '#bf5af2'], GRADE_W = ['', 'elégtelen', 'elégséges', 'közepes', 'jó', 'jeles'];
  const fmt1 = (x) => x.toFixed(1).replace('.', ',');
  const gGood = (q) => q.a.filter((k) => !GSELF.test(q.o[k]));
  const gBad = (q) => q.o.map((_, k) => k).filter((k) => !q.a.includes(k) && !GSELF.test(q.o[k]));
  /* a bank átalakítható, ismétlődés nélküli része */
  const GPOOL = (() => {
    const norm = (x) => x.toLowerCase().replace(/[^a-záéíóöőúüű0-9]/g, ''), seen = new Set();
    return BANK.filter((q) => {
      const key = norm(q.q) + '|' + q.a.map((k) => norm(q.o[k])).sort().join(',');
      if (!gGood(q).length || !gBad(q).length || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  })();
  const gText = (q) => q.q.replace(/\s*\(több jó válasz\)/gi, '').replace(/állítás\(ok\) igaz\(ak\)/gi, 'állítás igaz');
  function gStats(pool) {
    let m = 0, h = 0;
    pool.forEach((q) => { const l = S.g[q.id]; if (l >= 2) m++; else if (l === 1) h++; });
    return { m, h, n: pool.length };
  }
  /* becsült ZH-pont: amit tudsz, az pont; a többi 1/3 eséllyel tipp */
  const gEst = () => { const { m, h, n } = gStats(GPOOL), k = n ? (m + h / 2) / n : 0; return 15 * (k + (1 - k) / 3); };
  const gGrade = (e) => 1 + ZH_CUTS.filter((c) => e >= c).length;
  /* átmenési esély: 15 kérdés, mindegyik p eséllyel jó (tudod, vagy 1/3 eséllyel eltalálod) → P(legalább 8) */
  const gPass = () => {
    const { m, h, n } = gStats(GPOOL), k = n ? (m + h / 2) / n : 0, p = k + (1 - k) / 3;
    let sum = 0, c = 1;
    for (let i = 0; i <= 15; i++) { if (i >= 8) sum += c * p ** i * (1 - p) ** (15 - i); c = (c * (15 - i)) / (i + 1); }
    return Math.round(sum * 100);
  };
  const answered = () => { let ok = 0, all = 0; Object.values(S.seen).forEach((x) => { ok += x.ok; all += x.ok + x.bad; }); return { ok, all }; };
  /* sorrend: témák az éles ZH súlya szerint összefésülve, témán belül előbb a valódi ZH, aztán a rövid (alap) kérdések */
  function gOrder(pool) {
    const by = {}, out = [];
    pool.forEach((q) => (by[q.t] = by[q.t] || []).push(q));
    const len = (q) => q.q.length + Math.min(...gGood(q).map((k) => q.o[k].length));
    Object.entries(by).forEach(([t, qs]) => {
      qs.sort((a, b) => (b.src === 'zh') - (a.src === 'zh') || len(a) - len(b));
      qs.forEach((q, i) => out.push({ q, key: (i + 0.5) / (GW[t] || 1) }));
    });
    const o = out.sort((a, b) => a.key - b.key).map((x) => x.q);
    return [...o.filter((q) => S.g[q.id] === 0), ...o.filter((q) => S.g[q.id] === 1), ...o.filter((q) => S.g[q.id] === undefined)];
  }
  function viewGrind(p) {
    const t0 = p.t && T[p.t] ? T[p.t] : null, pool = t0 ? GPOOL.filter((q) => q.t === t0.id) : GPOOL;
    setTone(t0 ? t0.c : '#ff453a');
    const home = '#/grind' + (t0 ? '?t=' + t0.id : '');
    if (!p.go) {
      const st = gStats(pool), e = gEst(), g = gGrade(e), pct = st.n ? Math.round((st.m / st.n) * 100) : 0;
      const topics = TEMAK.map((t) => ({ t, ...gStats(GPOOL.filter((q) => q.t === t.id)) })).filter((x) => x.n);
      mount(`<div class="wrap grind">
        <section class="hero"><p class="eyebrow">Grind · ${t0 ? `${t0.g} ${esc(t0.short)} · ` : ''}${st.n} kérdés, az éles formában</p>
          <h1 class="h-hero word-rise">Darálj, amíg <span class="grad-text">megy.</span></h1>
          <p class="lead reveal">3 válasz, 1 jó — mint holnap. Amit rontasz, 3 kérdés múlva visszajön. Ami kétszer egymás után megy, az kiesik. Csak kattints: a jó válasz után magától lapoz.</p>
          <div class="g-stats reveal">${FX.ring(pct, `<span class="pct">${pct}%</span>`, true)}
            <div><div class="g-est">${fmt1(e)} <small>/ 15 pont</small></div><span class="g-grade" style="--gc:${GC[g]}">${g} · ${GRADE_W[g]}</span>
            <div class="g-pass">Átmenési esély (legalább 8 pont): <b>${gPass()}%</b></div>
            <div class="g-sub">Becsült ZH-pont a mostani tudásoddal (amit nem tudsz, azt 1/3 eséllyel tippelnéd).<br>Megy: <b>${st.m}</b> / ${st.n}${st.h ? ` · félig: ${st.h}` : ''}${answered().all ? ` · eddig ${answered().all} válasz, ${Math.round((answered().ok / answered().all) * 100)}% jó` : ''}</div></div></div>
          <div class="btn-row reveal"><a class="btn big-go" href="#/grind?go=1${t0 ? '&t=' + t0.id : ''}">🔥 ${st.m || st.h ? 'Folytatás' : 'Indulás'}</a>${t0 ? '<a class="btn alt" href="#/grind">Minden téma</a>' : ''}<a class="btn alt" href="#/sync">📲 Szinkron a telefonnal</a></div></section>
        <section class="sec"><div class="sec-head"><h2 class="h-sec reveal">Csak egy téma?</h2></div>
          <div class="tbars">${topics.map(({ t, m, n }) => `<a class="tbar reveal" href="#/grind?go=1&t=${t.id}" style="--tc:${t.c}"><span class="tb-n">${t.g} ${esc(t.short)}</span><span class="tb-track"><i style="--w:${Math.round((m / n) * 100)}%"></i></span><span class="tb-p">${m}/${n}</span></a>`).join('')}</div></section></div>`);
      return;
    }
    const order = gOrder(pool), act = [], later = [];
    let step = 0, cur = null, last = null, combo = 0, rN = 0, rOk = 0, rNew = 0, adv = null, roundOn = false, grade0 = gGrade(gEst());
    const v = mount('<div class="quiz grind-run" id="gRoot"></div>'), root = $('#gRoot', v);
    const inQ = (q) => act.some((x) => x.q === q) || later.some((x) => x.q === q);
    const place = (x, list, due) => { [act, later].forEach((l) => { const i = l.indexOf(x); if (i >= 0) l.splice(i, 1); }); x.due = due; if (list) list.push(x); };
    const pick = () => {
      const all = [...act, ...later], cand = all.length > 1 ? all.filter((x) => x.q !== last) : all;
      const due = cand.filter((x) => x.due <= step).sort((a, b) => a.due - b.due)[0];
      if (due) return due;
      if (act.length < 7) {
        const q = order.find((q) => !(S.g[q.id] >= 2) && !inQ(q));
        if (q) { const x = { q, due: step }; act.push(x); return x; }
      }
      return cand.sort((a, b) => a.due - b.due)[0] || null;
    };
    const bar = () => { const st = gStats(pool); return `<div class="qbar"><a class="x" href="${home}" aria-label="Kilépés">✕</a><div class="track"><i id="gTrack" style="width:${(st.m / st.n) * 100}%"></i></div><span class="streak" id="gCombo">${combo >= 3 ? '🔥 ' + combo : ''}</span><span class="cnt" id="gN">${st.m} / ${st.n} megy</span></div>`; };
    const lvOf = (id) => (S.g[id] !== undefined ? S.g[id] : S.seen[id] && S.seen[id].last ? 1 : undefined);
    function next() {
      clearTimeout(adv);
      roundOn = false;
      cur = pick();
      if (!cur) return allDone();
      const q = cur.q, good = gGood(q), g = good[(Math.random() * good.length) | 0];
      const opts = shuffle([g, ...shuffle(gBad(q)).slice(0, 2)]), t = T[q.t] || {}, lv = lvOf(q.id);
      cur.view = { opts, right: opts.indexOf(g), g, done: false };
      root.innerHTML = `${bar()}<div class="qcard" style="--tc:${t.c || 'var(--accent)'}">
        <div class="qmeta"><span class="tag">${t.g || ''} ${esc(t.short || '')}</span>${lv === 0 ? '<span class="tag multi">🔁 Visszajött</span>' : lv === 1 ? '<span class="tag grey">Még egyszer, és megy</span>' : '<span class="tag grey">Új</span>'}${q.src === 'zh' ? '<span class="tag grey">⭐ Valódi ZH</span>' : ''}<span class="tag grey">≈ ${fmt1(gEst())} pont</span></div>
        <h2 class="qtext">${esc(gText(q))}</h2>
        <div class="opts">${opts.map((k, j) => `<button class="opt" data-j="${j}"><span class="L">${LETTERS[j]}</span><span>${esc(q.o[k])}</span></button>`).join('')}</div>
        <div id="fbSlot"></div>
        <div class="qfoot"><span class="hint">1–3 vagy A–C · a jó válasz után magától lapoz</span><button class="btn sm" id="gGo" style="visibility:hidden">Tovább →</button></div></div>`;
      $$('.opt', root).forEach((b) => b.addEventListener('click', () => answer(+b.dataset.j)));
      $('#gGo', root).addEventListener('click', go);
      last = q;
    }
    function answer(j) {
      const V = cur && cur.view;
      if (!V || V.done) return;
      V.done = true;
      const q = cur.q, ok = j === V.right, lv = lvOf(q.id);
      record(q.id, ok);
      rN++; step++;
      $$('.opt', root).forEach((b, k) => { b.disabled = true; b.classList.add(k === V.right ? (k === j ? 'ok' : 'miss') : k === j ? 'no' : 'dim'); });
      if (ok) {
        rOk++; combo++;
        if (lv === 1) { S.g[q.id] = 2; place(cur, null); rNew++; plus(); }
        else if (lv === undefined) { S.g[q.id] = 1; place(cur, later, step + 25); }
        else { S.g[q.id] = 1; place(cur, act, step + 7); }
        if (combo % 10 === 0) FX.toast(`🔥 ${combo} egymás után!`);
        adv = setTimeout(go, 650);
      } else {
        combo = 0;
        S.g[q.id] = 0;
        place(cur, act, step + 3);
        const others = gGood(q).filter((k) => k !== V.g);
        $('#fbSlot', root).innerHTML = `<div class="fb no"><div class="h">✕ A jó: ${esc(q.o[V.g])}</div>${q.x ? `<p>${esc(q.x)}</p>` : ''}${others.length ? `<p style="margin-top:6px"><b>Ez is jó lett volna:</b> ${others.map((k) => esc(q.o[k])).join(' · ')}</p>` : ''}${q.old ? `<div class="old">${oldNote(q.old)}</div>` : ''}</div>`;
        const b = $('#gGo', root);
        b.style.visibility = 'visible';
        b.focus({ preventScroll: true });
      }
      save();
      const st = gStats(pool);
      $('#gN', root).textContent = `${st.m} / ${st.n} megy`;
      $('#gTrack', root).style.width = (st.m / st.n) * 100 + '%';
      $('#gCombo', root).textContent = combo >= 3 ? '🔥 ' + combo : '';
      const g = gGrade(gEst());
      if (g > grade0) { grade0 = g; FX.confetti(200); FX.toast(g === 2 ? '🎉 Átlépted a 8 pontot — ezzel már átmennél!' : `🎉 Becsült jegyed: ${g} · ${GRADE_W[g]}!`); }
    }
    function plus() {
      const n = $('#gN', root);
      if (!n) return;
      const e = document.createElement('span');
      e.className = 'g-plus';
      e.textContent = '+1 ✓';
      n.appendChild(e);
      setTimeout(() => e.remove(), 950);
    }
    function go() {
      clearTimeout(adv);
      if (rN && rN % 20 === 0 && !roundOn) return roundScreen();
      next();
    }
    function roundScreen() {
      roundOn = true;
      const st = gStats(pool), e = gEst(), g = gGrade(e);
      if (rOk >= 16) FX.confetti(150);
      root.innerHTML = `${bar()}<div class="qcard g-round"><p class="eyebrow">${rN / 20}. kör kész · ${rOk} / 20 jó</p>
        ${FX.ring(Math.round((rOk / 20) * 100), `<span class="pct">${rOk}/20</span>`)}
        <div class="g-est">${fmt1(e)} <small>/ 15 pont</small></div><span class="g-grade" style="--gc:${GC[g]}">${g} · ${GRADE_W[g]}</span>
        <div class="g-pass">Átmenési esély: <b>${gPass()}%</b></div>
        <p class="g-sub">Ebben a körben <b>+${rNew}</b> kérdés lett „megy”. Összesen ${st.m} / ${st.n}.</p>
        <p class="muted">Igyál egy kortyot, nyújtózz egyet. Aztán jöhet a következő 20.</p>
        <div class="btn-row"><button class="btn big-go" id="gNext">Következő kör ▶</button><a class="btn alt" href="${home}">Szünet</a></div></div>`;
      FX.rings(root);
      $('#gNext', root).addEventListener('click', next);
      rOk = 0; rNew = 0;
    }
    function allDone() {
      roundOn = true;
      FX.confetti(220);
      root.innerHTML = `${bar()}<div class="qcard g-round"><div class="s-emoji">🏆</div><h2 class="qtext">${t0 ? `${t0.g} ${esc(t0.short)}: minden` : 'Minden'} kérdés megy!</h2>
        <div class="g-est">${fmt1(gEst())} <small>/ 15 pont</small></div>
        <p class="muted">Reggel egy gyors átismétlés: mindegyik kérdés még egyszer, egy jó válasz elég.</p>
        <div class="btn-row"><button class="btn big-go" id="gRe">🔁 Átismétlés</button><a class="btn alt" href="#/zh">⏱️ ZH-szimuláció</a></div></div>`;
      $('#gRe', root).addEventListener('click', () => { pool.forEach((q) => { if (S.g[q.id] >= 2) S.g[q.id] = 1; }); save(); route(); });
    }
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey || e.key.length > 1 && !['Enter', 'ArrowRight'].includes(e.key)) return;
      if (roundOn) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); const b = $('#gNext, #gRe', root); if (b) b.click(); } return; }
      const V = cur && cur.view;
      if (!V) return;
      const k = e.key.length === 1 ? Math.max('123'.indexOf(e.key), 'abc'.indexOf(e.key.toLowerCase())) : -1;
      if (!V.done && k >= 0 && k < V.opts.length) { e.preventDefault(); answer(k); }
      else if (V.done && (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight')) { e.preventDefault(); go(); }
    };
    document.addEventListener('keydown', onKey);
    cleanup = () => { document.removeEventListener('keydown', onKey); clearTimeout(adv); };
    next();
  }

  /* ---------- Szinkron gép ⇄ telefon: a grind-haladás egy linkben (QR-kóddal) utazik, szerver nélkül ----------
     kód: '1.<GPOOL hossza>.<xp>.<base64url>' — kérdésenként 2 bit (0 = nem volt, 1 = rontott, 2 = egyszer jó, 3 = megy) */
  const SYNC_V = '1';
  function syncCode() {
    const bytes = new Uint8Array(Math.ceil(GPOOL.length / 4));
    GPOOL.forEach((q, i) => { const l = S.g[q.id]; bytes[i >> 2] |= (l === undefined ? 0 : l + 1) << ((i & 3) * 2); });
    let bin = '';
    bytes.forEach((b) => (bin += String.fromCharCode(b)));
    return [SYNC_V, GPOOL.length, S.xp | 0, btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')].join('.');
  }
  function syncRead(code) {
    try {
      const [v, n, xp, b] = String(code || '').split('.');
      if (v !== SYNC_V || +n !== GPOOL.length || !b) return null;
      const bin = atob(b.replace(/-/g, '+').replace(/_/g, '/'));
      return { lv: GPOOL.map((_, i) => ((bin.charCodeAt(i >> 2) || 0) >> ((i & 3) * 2)) & 3), xp: +xp || 0 };
    } catch (e) { return null; }
  }
  /* egyesítés: kérdésenként a jobbik eredmény marad */
  function syncMerge(d) {
    let up = 0;
    GPOOL.forEach((q, i) => {
      const v = d.lv[i];
      if (!v) return;
      const l = v - 1, cur = S.g[q.id];
      if (cur === undefined || l > cur) { S.g[q.id] = l; up++; }
    });
    S.xp = Math.max(S.xp, d.xp);
    save();
    return up;
  }
  function viewSync(p) {
    setTone('#0a84ff');
    /* helyi fájlból vagy localhostról a telefon nem érné el → ilyenkor az élő oldalra mutat */
    const base = /^https?:$/.test(location.protocol) && !/^(localhost|127\.|\[::1\])/.test(location.hostname) ? location.href.split('#')[0] : 'https://nagylevy.github.io/tuzvedelem/Jog/index.html';
    const url = base + '#/sync?d=' + syncCode(), st = gStats(GPOOL), inc = p.d ? syncRead(p.d) : null;
    const incHTML = !p.d ? '' : !inc
      ? `<div class="card sync-in bad"><h3 class="h-card">⚠️ Ezt a kódot nem tudom beolvasni</h3><p class="muted">Valószínűleg a két eszközön más verzió fut. Frissítsd az oldalt mindkét helyen, aztán küldd át újra.</p></div>`
      : `<div class="card sync-in"><h3 class="h-card">📥 Haladás érkezett a másik eszközről</h3><p>Benne: <b>${inc.lv.filter((x) => x === 3).length}</b> kérdés „megy” · ${inc.xp} XP</p><p class="muted">Egyesítéskor kérdésenként a jobbik eredmény marad meg, semmi nem vész el.</p><div class="btn-row"><button class="btn big-go" id="syncGo">✓ Egyesítés ezen az eszközön</button></div></div>`;
    const v = mount(`<div class="wrap sync">
      <section class="hero"><p class="eyebrow">Szinkron · gép ⇄ telefon</p><h1 class="h-hero word-rise">Vidd át a <span class="grad-text">haladásod.</span></h1>
        <p class="lead reveal">Nincs fiók, nincs szerver: a haladásod egy linkben utazik. Olvasd be a QR-kódot a telefonod kamerájával, és koppints az Egyesítésre.</p></section>
      ${incHTML}
      <div class="grid grid-2">
        <div class="card sync-qr reveal"><h3 class="h-card">📲 Küldés erről az eszközről</h3><div class="qr-box" id="qrBox"><span class="muted">QR-kód betöltése…</span></div>
          <p class="muted">Megy: <b>${st.m}</b> / ${st.n} · ${S.xp} XP</p>
          <div class="btn-row"><button class="btn alt sm" id="syncCopy">🔗 Link másolása</button>${navigator.share ? '<button class="btn alt sm" id="syncShare">📤 Megosztás</button>' : ''}</div></div>
        <div class="card reveal"><h3 class="h-card">Így csináld</h3><ol class="sync-steps">
          <li>A <b>gépen</b> nyisd meg ezt az oldalt (Grind → 📲 Szinkron).</li>
          <li>A <b>telefon kamerájával</b> olvasd be a QR-kódot. Abban a böngészőben nyisd meg, amiben tanulni szoktál (ha a kamera másikat nyit, másold át a linket).</li>
          <li>A telefonon koppints: <b>✓ Egyesítés</b>.</li>
          <li>Visszafelé ugyanígy: a telefonon <b>📤 Megosztás</b> → küldd el magadnak (pl. Messengeren), és a gépen nyisd meg.</li></ol>
          <p class="muted">Kérdésenként mindig a jobbik eredmény marad meg. Ha mindkét eszközön tanulsz, a végén szinkronizálj egyszer oda-vissza.</p></div>
      </div>
      <div class="btn-row"><a class="btn tc" href="#/grind">🔥 Vissza a Grindhez</a></div></div>`);
    const box = $('#qrBox', v);
    const draw = () => {
      try {
        const qr = qrcode(0, 'L');
        qr.addData(url);
        qr.make();
        const n = qr.getModuleCount();
        let d = '';
        for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (qr.isDark(r, c)) d += `M${c},${r}h1v1h-1z`;
        box.innerHTML = `<svg viewBox="-2 -2 ${n + 4} ${n + 4}" shape-rendering="crispEdges" role="img" aria-label="QR-kód a szinkron linkhez"><rect x="-2" y="-2" width="${n + 4}" height="${n + 4}" fill="#fff"/><path d="${d}" fill="#000"/></svg>`;
      } catch (e) { box.innerHTML = '<span class="muted">A QR-kód nem töltött be. Használd a Link másolása gombot.</span>'; }
    };
    if (window.qrcode) draw();
    else {
      const sc = document.createElement('script');
      sc.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.4.4/qrcode.min.js';
      sc.onload = draw;
      sc.onerror = () => (box.innerHTML = '<span class="muted">Nincs net a QR-kódhoz. Használd a Link másolása gombot.</span>');
      document.head.appendChild(sc);
    }
    $('#syncCopy', v).addEventListener('click', async () => { try { await navigator.clipboard.writeText(url); FX.toast('🔗 Link másolva'); } catch (e) { window.prompt('Másold ki ezt a linket:', url); } });
    const sh = $('#syncShare', v);
    if (sh) sh.addEventListener('click', () => navigator.share({ title: 'Jog – a haladásom', url }).catch(() => {}));
    const go = $('#syncGo', v);
    if (go) go.addEventListener('click', () => { const up = syncMerge(inc); FX.confetti(140); FX.toast(`✓ Egyesítve: ${up} kérdés frissült`); location.hash = '#/grind'; });
  }

  /* ---------- Párbaj: összekeverhető fogalompárok ---------- */
  function viewDuelList() {
    const groups = TEMAK.map((t) => ({ t, ps: PARBAJ.filter((x) => x.t === t.id) })).filter((g) => g.ps.length);
    mount(`<div class="wrap"><section class="hero"><p class="eyebrow">Párbaj · ${PARBAJ.length} fogalompár</p>
      <h1 class="h-hero word-rise">Ne keverd <span class="grad-text">össze.</span></h1>
      <p class="lead reveal">A ZH-n nem az a nehéz, hogy mi a kötbér, hanem hogy kötbér, foglaló vagy előleg. Húzd az állítást a jó oldalra (vagy <span class="kbd">←</span> <span class="kbd">→</span>).</p>
      <div class="btn-row reveal"><a class="btn tc" href="#/parbaj/${shuffle(PARBAJ)[0].id}">⚔️ Véletlen párbaj</a></div></section>
      ${groups.map(({ t, ps }) => `<div class="numgroup" style="--tc:${t.c}"><h3 class="reveal">${t.g} ${esc(t.title)}</h3><div class="pb-grid">${ps.map((x) => `<a class="pb-tile reveal" href="#/parbaj/${x.id}"><b>${esc(x.a[0])}</b><span>vs.</span><b>${esc(x.b[0])}</b>${S.pb[x.id] != null ? `<em>${S.pb[x.id]}%</em>` : ''}</a>`).join('')}</div></div>`).join('')}</div>`);
  }
  function viewDuel(id) {
    const P = PARBAJ.find((x) => x.id === id);
    if (!P) return viewDuelList();
    const t = T[P.t];
    setTone(t.c);
    const items = shuffle(P.s);
    let i = -1, score = 0, combo = 0, wait = false;
    const v = mount(`<div class="duel" style="--tc:${t.c}">
      <div class="qbar"><a class="x" href="#/parbaj" aria-label="Kilépés">✕</a><div class="track"><i id="dTrack"></i></div>${ttsBtn()}<span class="streak" id="dCombo"></span><span class="cnt" id="dCnt">${items.length} állítás</span></div>
      <div class="duel-sides">
        <button class="side side-a" data-s="a"><b>← ${esc(P.a[0])}</b><span>${esc(P.a[1])}</span></button>
        <div class="vs">VS</div>
        <button class="side side-b" data-s="b"><b>${esc(P.b[0])} →</b><span>${esc(P.b[1])}</span></button></div>
      <div class="duel-stage" id="dStage"><div class="sw-card done"><div class="sw-k">${t.g} ${esc(t.short)} · párbaj</div><div class="sw-t">${esc(P.a[0])} <i class="vs-i">vs.</i> ${esc(P.b[0])}</div>
        <p class="muted">Olvasd el fent a két oldalt. Utána jön ${items.length} állítás: mindegyiket küldd a jó oldalra.</p><div class="btn-row"><button class="btn tc" id="dStart">Kezdjük ▶</button></div></div></div>
      <p class="duel-hint">Húzd a kártyát, vagy koppints a jó oldalra · <span class="kbd">←</span> <span class="kbd">→</span></p></div>`);
    const stage = $('#dStage', v);
    const next = () => {
      i++; wait = false;
      $('#dTrack', v).style.width = (i / items.length) * 100 + '%';
      if (i >= items.length) return done();
      $('#dCnt', v).textContent = `${i + 1} / ${items.length}`;
      stage.innerHTML = `<div class="sw-card" id="dCard"><div class="sw-k">Melyikre igaz?</div><div class="sw-t">${esc(items[i][0])}</div><div class="sw-fb"></div></div>`;
      swipe($('#dCard', v), pick);
      TTS.say(items[i][0]);
    };
    const pick = (side) => {
      if (i < 0 || wait) return next();
      if (i >= items.length) return;
      const [, good, why] = items[i], ok = side === good, card = $('#dCard', v), sideEl = $('.side-' + good, v);
      sideEl.classList.remove('hit'); void sideEl.offsetWidth; sideEl.classList.add('hit');
      bump(ok, 5);
      if (ok) {
        score++; combo++;
        card.classList.add('fly-' + side);
        setTimeout(next, 360);
      } else {
        combo = 0; wait = true;
        card.style.transform = '';
        card.classList.add('wrong');
        $('.sw-fb', card).innerHTML = `<b>✕ Ez a(z) „${esc(P[good][0])}” oldala.</b><p>${esc(why || P[good][1])}</p><button class="btn sm tc" id="dGo">Értem, tovább →</button>`;
        $('#dGo', v).addEventListener('click', (e) => { e.stopPropagation(); next(); });
        TTS.say(`Nem. Ez a ${P[good][0]} oldala. ${why || P[good][1]}`);
      }
      $('#dCombo', v).textContent = combo >= 2 ? '🔥 ' + combo : '';
      save();
    };
    const done = () => {
      const pct = Math.round((score / items.length) * 100), nextP = PARBAJ[(PARBAJ.indexOf(P) + 1) % PARBAJ.length];
      S.pb[P.id] = Math.max(S.pb[P.id] || 0, pct);
      save();
      if (pct >= 80) FX.confetti(140);
      $('#dCnt', v).textContent = 'kész';
      $('.duel-hint', v).style.visibility = 'hidden';
      stage.innerHTML = `<div class="sw-card done">${FX.ring(pct, `<span class="pct">${pct}%</span>`)}<div class="sw-t">${score} / ${items.length}</div>
        <p class="muted">${pct === 100 ? 'Hibátlan — ezt már nem kevered!' : 'Ahol tévedtél, olvasd el még egyszer a két oldalt fent.'}</p>
        <div class="btn-row"><a class="btn tc" href="#/most">▶ Mit csináljak most?</a><a class="btn alt" href="#/parbaj/${nextP.id}">Következő párbaj</a><button class="btn alt" id="dAgain">Újra</button></div></div>`;
      FX.rings(stage);
      $('#dAgain', v).addEventListener('click', route);
    };
    $('#dStart', v).addEventListener('click', next);
    $$('.side', v).forEach((b) => b.addEventListener('click', () => pick(b.dataset.s)));
    arrowKeys(() => pick('a'), () => pick('b'), () => { if (i < 0 || wait) next(); });
    bindTts(v, () => { if (i >= 0 && i < items.length) TTS.say(items[i][0]); });
  }

  /* ---------- Igaz vagy hamis: a kérdésbankból — jó válasz ez erre a kérdésre? ---------- */
  /* kimaradnak a kérdések, amelyek opciói egymásra hivatkoznak („mindkettő”, „A és B”…) */
  const SELFREF = /(mindkett|mindhár|mindegyik|egyik sem|fentiek|\b[A-D] és [A-D]\b)/i;
  function viewSwipe(p) {
    const t0 = p.t && T[p.t] ? T[p.t] : null, c0 = t0 ? t0.c : '#30d158';
    setTone(c0);
    const known = (q) => (S.seen[q.id] && S.seen[q.id].last ? 1 : 0);
    const src = shuffle(BANK.filter((q) => (!t0 || q.t === t0.id) && !q.o.some((o) => SELFREF.test(o)))).sort((a, b) => known(a) - known(b)).slice(0, 20);
    const items = shuffle(src).map((q) => {
      const want = Math.random() < 0.5;
      const ks = q.o.map((_, k) => k).filter((k) => q.a.includes(k) === want);
      const k = ks.length ? ks[(Math.random() * ks.length) | 0] : q.a[0];
      return { q, k, truth: q.a.includes(k) };
    });
    let i = -1, score = 0, combo = 0, wait = false;
    const miss = [];
    const v = mount(`<div class="duel swipe" style="--tc:${c0}">
      <div class="qbar"><a class="x" href="#/gyakorlas" aria-label="Kilépés">✕</a><div class="track"><i id="vTrack"></i></div>${ttsBtn()}<span class="streak" id="vCombo"></span><span class="cnt" id="vCnt"></span></div>
      <div class="sw-head"><h1>⚡ Igaz vagy hamis?${t0 ? ` <small>${t0.g} ${esc(t0.short)}</small>` : ''}</h1><p>Jó válasz ez a kérdésre? Húzd <b>jobbra</b>, ha igen, <b>balra</b>, ha nem.</p></div>
      <div class="duel-stage" id="vStage"></div>
      <div class="sw-btns" id="vBtns"><button class="btn no-btn" id="vNo">✕ Nem jó</button><button class="btn yes-btn" id="vYes">Ez a jó ✓</button></div></div>`);
    const stage = $('#vStage', v);
    const next = () => {
      i++; wait = false;
      $('#vTrack', v).style.width = (i / items.length) * 100 + '%';
      if (i >= items.length) return done();
      $('#vCnt', v).textContent = `${i + 1} / ${items.length}`;
      const { q, k } = items[i], t = T[q.t] || {};
      stage.innerHTML = `<div class="sw-card" id="vCard"><div class="sw-k">${t.g || ''} ${esc(t.short || '')}</div><div class="sw-q">${esc(q.q)}</div><div class="sw-arrow">erre a válasz:</div><div class="sw-t">${esc(q.o[k])}</div><div class="sw-fb"></div></div>`;
      swipe($('#vCard', v), (s) => pick(s === 'b'));
      TTS.say(`${q.q} ... ${q.o[k]}`);
    };
    const pick = (yes) => {
      if (wait) return next();
      if (i < 0 || i >= items.length) return;
      const it = items[i], ok = yes === it.truth, card = $('#vCard', v);
      if (ok) {
        bump(true, 5);
        score++; combo++;
        card.classList.add(yes ? 'fly-b' : 'fly-a');
        setTimeout(next, 330);
        if (combo % 10 === 0) { FX.confetti(90); FX.toast(`🔥 ${combo} egymás után!`); }
      } else {
        record(it.q.id, false);
        combo = 0; wait = true; miss.push(it);
        card.style.transform = '';
        card.classList.add('wrong');
        $('.sw-fb', card).innerHTML = `<b>${it.truth ? '✕ Pedig ez jó válasz!' : '✕ Ez nem jó válasz.'}</b><p><b>Helyes:</b> ${it.q.a.map((k) => esc(it.q.o[k])).join(' · ')}</p>${it.q.x ? `<p>${esc(it.q.x)}</p>` : ''}<button class="btn sm tc" id="vGo">Értem, tovább →</button>`;
        $('#vGo', v).addEventListener('click', (e) => { e.stopPropagation(); next(); });
        TTS.say(`Nem. A helyes válasz: ${it.q.a.map((k) => it.q.o[k]).join(', ')}`);
      }
      $('#vCombo', v).textContent = combo >= 2 ? '🔥 ' + combo : '';
      save();
    };
    const done = () => {
      const pct = items.length ? Math.round((score / items.length) * 100) : 0;
      if (pct >= 80) FX.confetti(150);
      $('#vBtns', v).style.display = 'none';
      $('#vCnt', v).textContent = 'kész';
      stage.innerHTML = `<div class="sw-card done">${FX.ring(pct, `<span class="pct">${pct}%</span>`)}<div class="sw-t">${score} / ${items.length}</div>
        <div class="btn-row"><a class="btn tc" href="#/most">▶ Mit csináljak most?</a><button class="btn alt" id="vAgain">Még 20 ⚡</button></div>
        ${miss.length ? `<div class="sw-miss"><h3 class="h-card">Ezeket nézd át</h3>${miss.map((it) => `<div><span>${esc(it.q.q)}</span><b>✓ ${it.q.a.map((k) => esc(it.q.o[k])).join(' · ')}</b></div>`).join('')}</div>` : ''}</div>`;
      FX.rings(stage);
      $('#vAgain', v).addEventListener('click', route);
    };
    $('#vNo', v).addEventListener('click', () => pick(false));
    $('#vYes', v).addEventListener('click', () => pick(true));
    arrowKeys(() => pick(false), () => pick(true), () => { if (wait) next(); });
    bindTts(v, () => { const it = items[i]; if (it) TTS.say(`${it.q.q} ... ${it.q.o[it.k]}`); });
    if (!items.length) { stage.innerHTML = '<div class="empty"><div class="e">🤷</div><p>Nincs kérdés ebben a válogatásban.</p></div>'; return; }
    next();
  }

  /* ---------- Évszám-létra (a 2026-os diák szerint) ---------- */
  const LADDER = [
    [3, 'AB elnöke — 2026 óta a tagok választják maguk közül'],
    [4, 'Országgyűlés (199 képviselő)'],
    [5, 'Köztársasági elnök (egyszer újraválasztható) · Európai Parlament'],
    [6, 'Kúria elnöke · OBH elnöke · ombudsman'],
    [9, 'Alkotmánybírák (2026 óta; előtte 12) · legfőbb ügyész · hágai Nemzetközi Bíróság bírái'],
    [12, 'ÁSZ elnöke'],
  ];
  function ladderHTML() {
    return `<div class="ladder">${LADDER.map(([y, w], i) => `<div class="rung reveal" style="--i:${i};--w:${Math.round((y / 12) * 100)}%"><div class="rg-y">${y} év</div><div class="rg-bar"><i></i></div><div class="rg-w">${w}</div></div>`).join('')}
      <p class="ladder-tip reveal">💡 Rigmus: <b>3</b> az AB elnöke, <b>4</b> a Parlament, <b>5</b> az Elnök, <b>6</b> a bírák főnökei és az ombudsman, <b>9</b> az Alaptörvény őrei és a vádló, <b>12</b> a pénz őre (ÁSZ).</p></div>`;
  }

  /* ---------- Egyoldalas összefoglaló ---------- */
  function viewSummary() {
    const v = mount(`<div class="wrap summary">
      <section class="hero"><p class="eyebrow">Utolsó átnézés · ZH előtt reggel</p><h1 class="h-hero word-rise">Minden, ami kell, <span class="grad-text">egy helyen.</span></h1>
        <p class="lead reveal">Témánként: a lényeg egy mondatban, a számok, a csapdák és az összekeverhető párok. Görgesd végig egyszer, lassan.</p>
        <div class="btn-row reveal"><button class="btn alt" id="printBtn">🖨️ Nyomtatás / PDF</button><a class="btn tc" href="#/zh">⏱️ ZH-szimuláció</a></div>
        <div class="chips reveal sum-nav">${LECKEK.map((l) => `<button class="chip" data-go="sum-${l.id}" style="--tc:${T[l.id].c}">${T[l.id].g} ${esc(T[l.id].short)}</button>`).join('')}</div></section>
      <section class="sec"><div class="sec-head"><h2 class="h-sec reveal">🪜 Évszám-létra</h2></div>${ladderHTML()}</section>
      ${LECKEK.map((l) => { const t = T[l.id]; return `<section class="sum-topic" id="sum-${l.id}" style="--tc:${t.c}">
        <h2 class="reveal">${t.g} <span>${t.no}.</span> ${esc(t.title)}</h2>
        <div class="sum-one reveal">${l.egyMondat}</div>
        ${l.szamok && l.szamok.length ? `<div class="sum-nums reveal">${l.szamok.map((n) => `<span><b>${esc(n.v)}</b> ${n.l}</span>`).join('')}</div>` : ''}
        <ul class="sum-traps reveal">${l.csapdak.map((c) => `<li>${c}</li>`).join('')}</ul>
        ${PARBAJ.filter((x) => x.t === l.id).map((x) => `<div class="sum-pair reveal"><div><b>${esc(x.a[0])}</b>${esc(x.a[1])}</div><i>vs.</i><div><b>${esc(x.b[0])}</b>${esc(x.b[1])}</div></div>`).join('')}
      </section>`; }).join('')}
      <div class="btn-row"><a class="btn tc" href="#/most">▶ Mit csináljak most?</a></div>
    </div>`);
    $('#printBtn', v).addEventListener('click', () => window.print());
    $$('[data-go]', v).forEach((b) => b.addEventListener('click', () => document.getElementById(b.dataset.go).scrollIntoView({ behavior: 'smooth', block: 'start' })));
  }

  /* ---------- Gyakorlás menü ---------- */
  function modeTiles() {
    const nT = (window.JOG_TESZT || []).length;
    const tile = (href, ic, mc, t, d, n) => `<a class="mode reveal" href="${href}" style="--mc:${mc}"><div class="ic">${ic}</div><div class="t">${t}</div><div class="d">${d}</div><div class="n">${n}</div></a>`;
    return `<div class="grid grid-3">
      ${tile('#/sztori/' + TEMAK[0].id, '▶️', '#bf5af2', 'Fókusz mód', 'A leckék sztoriként: egyszerre egy kártya, a pontok egyenként jönnek elő, közben gyors kérdések.', 'ADHD-barát')}
      ${tile('#/grind', '🔥', '#ff453a', 'Grind — az összes kérdés', '3 válasz, 1 jó, mint élesben. Amit rontasz, visszajön; ami kétszer egymás után megy, kiesik. Közben mutatja a becsült ZH-pontodat.', `${gStats(GPOOL).m} / ${GPOOL.length} megy`)}
      ${tile('#/most', '🧭', '#ff375f', 'Mit csináljak most?', 'Nem kell döntened: a válaszaid alapján megmondja a legjobb következő 5 percet.', 'Edző')}
      ${tile('#/parbaj', '⚔️', '#ff9f0a', 'Párbaj', `Összekeverhető párok (semmis vs. megtámadható, foglaló vs. előleg…). Húzd a jó oldalra!`, `${PARBAJ.length} pár`)}
      ${tile('#/villam', '⚡', '#30d158', 'Igaz vagy hamis?', 'Villámgyors lapozás: jó válasz ez a kérdésre? Jobbra igen, balra nem.', '20 kártya / kör')}
      ${tile('#/kviz?mode=mix', '🎲', '#5e5ce6', 'Vegyes kvíz', '20 véletlen kérdés az összes témából, azonnali magyarázattal.', `${BANK.length} kérdésből`)}
      ${tile('#/kviz?mode=hibak', '🎯', '#ff375f', 'Hibáim', 'Csak azok, amiket elrontottál. Ha jól válaszolsz, kikerül a listáról.', `${S.wrong.length} vár rád`)}
      ${tile('#/kviz?mode=minta', '⭐', '#ff375f', 'Valódi ZH-minta', 'Egy korábbi éles ZH mind a 15 kérdése, azonnali magyarázattal. Így néz ki a vizsga.', '15 kérdés · 3 válasz')}
      ${tile('#/zh', '⏱️', '#ff9f0a', 'ZH-szimuláció', '15 kérdés minden témából, 3 válasz, 20 perc, magyarázat csak a végén — mint élesben. Éles ponthatárral.', 'Vizsga-mód')}
      ${tile('#/kviz?mode=teszt', '📄', '#0a84ff', 'jogteszt.pdf végig', `Mind a ${nT} kérdés sorban. Ott folytatod, ahol abbahagytad.`, `${BANK.filter((q) => q.src === 'teszt' && S.seen[q.id]).length} / ${nT} kész`)}
      ${tile('#/kartya', '🃏', '#30d158', 'Villámkártyák', 'Fogalmak és számok, megfordítható kártyákon. A „nem tudtam” visszajön.', 'Szóköz = fordítás')}
      ${tile('#/szamok', '🔢', '#bf5af2', 'Számok összesítő', 'Minden határidő, létszám, életkor egy helyen.', 'Évek, napok, fők')}
      ${tile('#/osszefoglalo', '📄', '#64d2ff', 'Egyoldalas összefoglaló', 'Lényeg, számok, csapdák, párok — a reggeli utolsó átnézéshez. Nyomtatható.', 'ZH előtt')}
    </div>`;
  }
  function viewPractice() {
    const v = mount(`<div class="wrap">
      <section class="hero"><p class="eyebrow">Gyakorlás</p><h1 class="h-hero word-rise">Válassz <span class="grad-text">módot.</span></h1>
      <p class="lead reveal">Billentyűk: <span class="kbd">1</span>–<span class="kbd">6</span> válasz · <span class="kbd">Enter</span> ellenőrzés / tovább · <span class="kbd">Szóköz</span> kártyafordítás.</p></section>
      ${modeTiles()}
      <section class="sec"><div class="sec-head"><h2 class="h-sec reveal">Témakörönként</h2>
        <div class="seg reveal" id="srcSeg"><button data-src="" class="on">Minden kérdés</button><button data-src="teszt">Csak jogteszt.pdf</button><button data-src="kurzus">Csak kurzus</button></div></div>
        <div class="grid grid-2" id="topicGrid">${TEMAK.map((t) => topicCard(t, '#/kviz?t=' + t.id)).join('')}</div></section></div>`);
    $$('#srcSeg button', v).forEach((b) => b.addEventListener('click', () => {
      $$('#srcSeg button', v).forEach((x) => x.classList.toggle('on', x === b));
      $$('#topicGrid a', v).forEach((a, i) => { a.href = '#/kviz?t=' + TEMAK[i].id + (b.dataset.src ? '&src=' + b.dataset.src : ''); });
    }));
  }

  /* ---------- Kvíz nézet ---------- */
  function viewQuiz(p) {
    let pool, opts = {};
    if (p.mode === 'hibak') {
      pool = shuffle(S.wrong.map((i) => BY_ID[i]).filter(Boolean));
      opts.title = 'Hibáim';
      if (!pool.length) { mount(`<div class="wrap"><div class="empty"><div class="e">🎉</div><h2>Nincs hibás kérdésed!</h2><p>Vagy még nem gyakoroltál, vagy mindent kijavítottál.</p><a class="btn" href="#/kviz?mode=mix">Vegyes kvíz</a></div></div>`); return; }
    } else if (p.mode === 'most') {
      /* esedékes ismétlések (a legrégebben esedékes elöl), kiegészítve a hibákkal és új kérdésekkel */
      pool = dueIds().slice(0, 12).map((id) => BY_ID[id]);
      const add = (qs) => { for (const q of qs) { if (pool.length >= 10) break; if (q && !pool.includes(q)) pool.push(q); } };
      add(shuffle(S.wrong.map((id) => BY_ID[id])));
      add(shuffle(BANK.filter((q) => !S.seen[q.id])));
      opts.title = 'Ismétlés';
    } else if (p.mode === 'minta') {
      pool = BANK.filter((q) => q.src === 'zh');
      opts = { title: 'Valódi ZH-minta', cuts: ZH_CUTS };
    } else if (p.mode === 'zh') {
      /* mint élesben: 15 kérdés minden témából, 3 válasz (a jó + 2 véletlen rossz), 1 jó */
      const QUOTA = { alap: 2, alkotmany: 2, allamszerv: 2, birosag: 1, munka: 1, polgari1: 1, polgari2: 2, bunteto: 2, nemzetkozi: 1, kozig: 1 };
      const fits = (q) => q.a.length === 1 && q.o.length >= 3 && !q.o.some((o) => SELFREF.test(o));
      pool = shuffle(Object.entries(QUOTA).flatMap(([t, k]) => shuffle(topicQs(t).filter(fits)).slice(0, k)))
        .map((q) => ({ ...q, o: [q.o[q.a[0]], ...shuffle(q.o.filter((_, k) => k !== q.a[0])).slice(0, 2)], a: [0] }));
      opts = { title: 'ZH-szimuláció', exam: true, minutes: 20, cuts: ZH_CUTS };
    } else if (p.mode === 'teszt') {
      const all = BANK.filter((q) => q.src === 'teszt');
      const firstOpen = all.findIndex((q) => !S.seen[q.id]);
      pool = firstOpen > 0 ? all.slice(firstOpen).concat(all.slice(0, firstOpen)) : all;
      opts = { title: 'jogteszt.pdf', ordered: true };
    } else if (p.t && T[p.t]) {
      pool = shuffle(topicQs(p.t).filter((q) => !p.src || q.src === p.src));
      // először a még nem tudottak
      pool.sort((a, b) => (S.seen[a.id] && S.seen[a.id].last ? 1 : 0) - (S.seen[b.id] && S.seen[b.id].last ? 1 : 0));
      opts.title = T[p.t].title;
      setTone(T[p.t].c);
    } else {
      pool = shuffle(BANK).slice(0, 20);
      opts.title = 'Vegyes kvíz';
    }
    if (p.n) pool = pool.slice(0, +p.n);
    const v = mount('<div class="quiz" id="quizRoot"></div>');
    runQuiz($('#quizRoot', v), pool, opts);
  }

  /* ---------- Kvízmotor ---------- */
  function runQuiz(root, pool, o) {
    let i = 0, score = 0, streak = 0, state = null, timer = null;
    const wrongs = [], answers = [];
    const deadline = o.minutes ? Date.now() + o.minutes * 60000 : 0;
    const inline = !!o.inline;

    const onKey = (e) => {
      if (!root.isConnected) return document.removeEventListener('keydown', onKey);
      if (e.target.closest('input,textarea') || e.metaKey || e.ctrlKey || e.altKey) return;
      if (inline && !root.contains(document.activeElement) && document.activeElement !== document.body) return;
      if (!state) return;
      const n = '123456789'.indexOf(e.key);
      const li = 'abcdefgh'.indexOf(e.key.toLowerCase());
      const k = n >= 0 ? n : (e.key.length === 1 ? li : -1);
      if (k >= 0 && k < state.order.length && !state.done) { e.preventDefault(); pick(k); }
      else if (e.key === 'Enter' || (e.key === 'ArrowRight' && state.done)) { e.preventDefault(); state.done ? nextQ() : check(); }
    };
    if (!inline) { document.addEventListener('keydown', onKey); cleanup = () => { document.removeEventListener('keydown', onKey); clearInterval(timer); }; }
    else root.addEventListener('focusin', () => {}, { once: true });

    const bar = () => inline ? '' : `<div class="qbar">
      <a class="x" href="#/gyakorlas" aria-label="Kilépés">✕</a>
      <div class="track"><i style="width:${(i / pool.length) * 100}%"></i></div>
      ${o.exam ? `<span class="cnt" id="clock">--:--</span>` : `<span class="streak" id="streak">${streak >= 2 ? '🔥 ' + streak : ''}</span>`}
      <span class="cnt">${i + 1} / ${pool.length}</span></div>`;

    function render() {
      const q = pool[i];
      const order = shuffle(q.o.map((_, k) => k));
      const multi = q.a.length > 1;
      state = { q, order, multi, sel: new Set(), done: false };
      const t = T[q.t] || {};
      if (!inline) setTone(t.c);
      root.innerHTML = `${bar()}<div class="qcard" style="--tc:${t.c || 'var(--accent)'}">
        <div class="qmeta"><span class="tag">${t.g || ''} ${esc(t.short || '')}</span><span class="tag grey">${srcLabel(q)}</span>${multi ? '<span class="tag multi">Több jó válasz</span>' : ''}${inline ? `<span class="tag grey">${i + 1} / ${pool.length}</span>` : ''}</div>
        <h2 class="qtext">${esc(q.q)}</h2>
        <div class="opts">${order.map((k, j) => `<button class="opt" data-j="${j}"><span class="L">${LETTERS[j]}</span><span>${esc(q.o[k])}</span></button>`).join('')}</div>
        <div id="fbSlot"></div>
        <div class="qfoot"><span class="hint">${multi ? 'Jelöld be az összes jót, aztán Ellenőrzés' : (o.exam ? 'Vizsga-mód: a megoldás a végén' : 'Kattints vagy nyomd meg a betűt / számot')}</span>
          <button class="btn sm${multi || o.exam ? '' : ' alt'}" id="actBtn" ${multi || o.exam ? 'disabled' : 'style="visibility:hidden"'}>${o.exam ? 'Tovább' : 'Ellenőrzés'}</button></div></div>`;
      $$('.opt', root).forEach((b) => b.addEventListener('click', () => pick(+b.dataset.j)));
      $('#actBtn', root).addEventListener('click', () => (state.done ? nextQ() : check()));
      if (o.exam) tickClock();
    }

    function pick(j) {
      if (state.done) return;
      if (state.multi || o.exam) {
        if (state.multi) state.sel.has(j) ? state.sel.delete(j) : state.sel.add(j);
        else { state.sel.clear(); state.sel.add(j); }
        $$('.opt', root).forEach((b, k) => b.classList.toggle('sel', state.sel.has(k)));
        $('#actBtn', root).disabled = state.sel.size === 0;
      } else { state.sel = new Set([j]); check(); }
    }

    function check() {
      if (state.done || !state.sel.size) return;
      const { q, order, sel } = state;
      const right = new Set(order.map((k, j) => (q.a.includes(k) ? j : -1)).filter((j) => j >= 0));
      const ok = right.size === sel.size && [...sel].every((j) => right.has(j));
      state.done = true;
      record(q.id, ok);
      answers.push({ q, ok });
      if (ok) { score++; streak++; } else { streak = 0; wrongs.push(q); }
      if (streak > S.best) { S.best = streak; save(); }
      if (o.exam) return nextQ();
      $$('.opt', root).forEach((b, j) => {
        b.disabled = true;
        b.classList.remove('sel');
        if (right.has(j) && sel.has(j)) b.classList.add('ok');
        else if (right.has(j)) b.classList.add('miss');
        else if (sel.has(j)) b.classList.add('no');
        else b.classList.add('dim');
      });
      const t = T[q.t];
      $('#fbSlot', root).innerHTML = `<div class="fb ${ok ? 'ok' : 'no'}"><div class="h">${ok ? '✓ Helyes!' : '✕ Nem egészen.'}</div>
        ${!ok ? `<p style="margin-bottom:8px"><b>Helyes válasz:</b> ${q.a.map((k) => esc(q.o[k])).join(' · ')}</p>` : ''}
        ${q.x ? `<p>${esc(q.x)}</p>` : ''}${q.old ? `<div class="old">${oldNote(q.old)}</div>` : ''}
        ${!ok && L[q.t] && !inline ? `<div class="acts"><a class="btn sm alt" href="#/lecke/${q.t}">Nem érted? → ${esc(t.short)} lecke</a></div>` : ''}</div>`;
      const act = $('#actBtn', root);
      act.style.visibility = 'visible'; act.disabled = false; act.classList.remove('alt');
      act.textContent = i + 1 < pool.length ? 'Tovább →' : 'Eredmény';
      act.focus({ preventScroll: true });
      const sk = $('#streak', root);
      if (sk) { sk.textContent = streak >= 2 ? '🔥 ' + streak : ''; sk.classList.add('pop'); setTimeout(() => sk.classList.remove('pop'), 300); }
      if (ok && streak > 0 && streak % 5 === 0) { FX.confetti(); FX.toast(`🔥 ${streak} jó válasz egymás után!`); }
      if (inline) $('#fbSlot', root).scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }

    function nextQ() {
      const card = $('.qcard', root);
      const go = () => { i++; i < pool.length ? render() : finish(); if (!inline) window.scrollTo({ top: 0, behavior: 'smooth' }); };
      if (card && !o.exam) { card.classList.add('out'); setTimeout(go, 220); } else go();
    }

    function tickClock() {
      if (timer) return;
      const upd = () => {
        const el = $('#clock', root), left = Math.max(0, deadline - Date.now());
        if (el) el.textContent = `⏱ ${String((left / 60000) | 0).padStart(2, '0')}:${String(((left / 1000) | 0) % 60).padStart(2, '0')}`;
        if (!left) { clearInterval(timer); FX.toast('Lejárt az idő!'); finish(); }
      };
      upd(); timer = setInterval(upd, 1000);
    }

    function finish() {
      clearInterval(timer);
      state = null;
      const pct = pool.length ? Math.round((score / pool.length) * 100) : 0;
      const grade = o.cuts ? 1 + o.cuts.filter((c) => score >= c).length : pct >= 87 ? 5 : pct >= 75 ? 4 : pct >= 63 ? 3 : pct >= 50 ? 2 : 1;
      const words = ['', 'Elégtelen', 'Elégséges', 'Közepes', 'Jó', 'Jeles'];
      if (pct >= 80) FX.confetti(180);
      if (inline) {
        root.innerHTML = `<div class="card" style="text-align:center"><div class="grade tc-text">${score} / ${pool.length}</div>
          <p class="lead">${pct === 100 ? 'Hibátlan! Jöhet a teljes téma.' : 'A hibás kérdések bekerültek a „Hibáim” listába.'}</p>
          <div class="btn-row"><a class="btn tc" href="#/kviz?t=${pool[0] ? pool[0].t : ''}">Teljes téma</a></div></div>`;
        return;
      }
      setTone(o.cuts ? (grade >= 4 ? '#30d158' : grade >= 2 ? '#ff9f0a' : '#ff453a') : pct >= 75 ? '#30d158' : pct >= 50 ? '#ff9f0a' : '#ff453a');
      root.innerHTML = `<div class="result">
        <p class="eyebrow">${esc(o.title || 'Kvíz')} · kész</p>
        ${FX.ring(pct, `<span class="pct">${pct}%</span>`, true)}
        <div class="grade">${o.exam || o.cuts ? grade + ' · ' + words[grade] : score + ' / ' + pool.length}</div>
        <p class="lead">${o.cuts ? `${score} / ${pool.length} pont. Éles ponthatár: 8 elégséges, 10 közepes, 12 jó, 14 jeles.` : o.exam ? `${score} / ${pool.length} jó válasz. A jegy csak becslés (50% elégséges, 63% közepes, 75% jó, 87% jeles).` : pct >= 80 ? 'Ez nagyon megy. 🔥' : pct >= 50 ? 'Jó úton vagy — a hibákat nézd át alább.' : 'Nézd át a leckét, aztán jöhet a Hibáim mód.'}</p>
        <div class="btn-row"><a class="btn" href="#/most">▶ Mit csináljak most?</a><a class="btn alt" href="#/kviz?mode=hibak">Hibáim (${S.wrong.length})</a><a class="btn alt" href="#/gyakorlas">Másik mód</a></div>
        ${wrongs.length ? `<div class="wrong-list"><h3 class="h-card">Ezeket rontottad el</h3>${wrongs.map((q) => `<div class="card"><div class="q">${esc(q.q)}</div><div class="a">✓ ${q.a.map((k) => esc(q.o[k])).join(' · ')}</div>${q.x ? `<div class="muted" style="font-size:14px;margin-top:4px">${esc(q.x)}</div>` : ''}${q.old ? `<div class="muted" style="font-size:13px;margin-top:4px">⚠️ ${oldNote(q.old)}</div>` : ''}</div>`).join('')}</div>` : ''}
      </div>`;
      FX.rings(root);
    }

    if (!pool.length) { root.innerHTML = '<div class="empty"><div class="e">🤷</div><p>Nincs kérdés ebben a válogatásban.</p></div>'; return; }
    render();
  }

  /* ---------- Villámkártyák ---------- */
  function deckFor(tid) {
    const cards = [];
    LECKEK.filter((l) => !tid || l.id === tid).forEach((l) => {
      const t = T[l.id];
      l.kartyak.forEach((k) => cards.push({ t: l.id, front: k.cim, back: k.html, x: k.hasonlat || '', key: 'c:' + l.id + ':' + k.cim }));
      (l.szamok || []).forEach((n) => cards.push({ t: l.id, front: n.l.replace(/<[^>]+>/g, '') + ' — mennyi?', back: `<div class="big" style="font-size:44px;font-weight:800;color:${t.c}">${esc(n.v)}</div>`, x: '', key: 'n:' + l.id + ':' + n.l }));
    });
    return cards;
  }
  function viewFlash(p) {
    const tid = p.t && T[p.t] ? p.t : '';
    let deck = shuffle(deckFor(tid));
    const v = mount(`<div class="wrap"><section class="hero" style="padding-bottom:8px"><p class="eyebrow">Villámkártyák</p><h1 class="h-sec word-rise">Fordítsd meg, mondd ki, <span class="grad-text">tudtad-e.</span></h1>
      <div class="chips reveal" style="margin-top:18px"><button class="chip${tid ? '' : ' on'}" data-t="">Mind</button>${TEMAK.filter((t) => L[t.id]).map((t) => `<button class="chip${tid === t.id ? ' on' : ''}" data-t="${t.id}" style="--tc:${t.c}">${t.g} ${esc(t.short)}</button>`).join('')}</div></section>
      <div class="flash-wrap" id="fw"></div></div>`);
    $$('.chip', v).forEach((c) => c.addEventListener('click', () => { location.hash = '#/kartya' + (c.dataset.t ? '?t=' + c.dataset.t : ''); }));
    const fw = $('#fw', v);
    let flipped = false, known = 0;
    const total = deck.length;
    const show = () => {
      if (!deck.length) { fw.innerHTML = `<div class="empty"><div class="e">🏁</div><h2>Végeztél a paklival!</h2><p>${known} kártyát tudtál elsőre.</p><div class="btn-row"><a class="btn" href="#/kviz?mode=mix">Jöhet egy kvíz</a></div></div>`; FX.confetti(); return; }
      const c = deck[0], t = T[c.t];
      setTone(t.c);
      flipped = false;
      fw.innerHTML = `<div class="qbar"><div class="track"><i style="width:${((total - deck.length) / total) * 100}%"></i></div><span class="cnt">${total - deck.length + 1} / ${total}</span></div>
        <div class="flash enter" id="fc"><div class="face front"><span class="k">${t.g} ${esc(t.short)}</span><div class="q">${c.front}</div><div class="turn">Kattints vagy <span class="kbd">Szóköz</span> a fordításhoz</div></div>
        <div class="face back"><span class="k">${t.g} ${esc(t.short)}</span><div class="a">${c.back}</div>${c.x ? `<div class="x">💡 ${c.x}</div>` : ''}</div></div>
        <div class="flash-acts"><button class="btn no" id="fNo">✕ Nem tudtam <span class="kbd" style="color:#fff;border-color:#fff8">←</span></button><button class="btn ok" id="fOk">✓ Tudtam <span class="kbd" style="color:#fff;border-color:#fff8">→</span></button></div>`;
      $('#fc', fw).addEventListener('click', flip);
      $('#fc', fw).addEventListener('animationend', (e) => e.currentTarget.classList.remove('enter'), { once: true });
      $('#fNo', fw).addEventListener('click', () => answer(false));
      $('#fOk', fw).addEventListener('click', () => answer(true));
    };
    const flip = () => { flipped = !flipped; $('#fc', fw).classList.toggle('flip', flipped); };
    const answer = (ok) => {
      const c = deck.shift();
      if (ok) known++; else deck.splice(Math.min(3, deck.length), 0, c);
      show();
    };
    const onKey = (e) => {
      if (!fw.isConnected) return document.removeEventListener('keydown', onKey);
      if (e.key === ' ') { e.preventDefault(); flip(); }
      else if (e.key === 'ArrowRight') answer(true);
      else if (e.key === 'ArrowLeft') answer(false);
    };
    document.addEventListener('keydown', onKey);
    cleanup = () => document.removeEventListener('keydown', onKey);
    if (!total) fw.innerHTML = '<div class="empty"><div class="e">🃏</div><p>Ehhez a témához még nincs kártya.</p></div>';
    else show();
  }

  /* ---------- Számok ---------- */
  function viewNumbers() {
    mount(`<div class="wrap"><section class="hero"><p class="eyebrow">Számok összesítő</p><h1 class="h-hero word-rise">Évek, napok, <span class="grad-text">fők.</span></h1>
      <p class="lead reveal">A teszt imádja a számokat. Itt van mind egy helyen, témánként.</p>
      <div class="btn-row reveal"><a class="btn" href="#/kartya">Kikérdezés kártyákkal</a><a class="btn alt" href="#/osszefoglalo">📄 Egyoldalas összefoglaló</a></div></section>
      <section class="sec"><div class="sec-head"><h2 class="h-sec reveal">🪜 Évszám-létra</h2><p class="lead reveal">Ki hány évre kapja a megbízatását — a teszt kedvenc kérdése.</p></div>${ladderHTML()}</section>
      ${LECKEK.filter((l) => l.szamok && l.szamok.length).map((l) => { const t = T[l.id]; return `<div class="numgroup" style="--tc:${t.c}"><h3 class="reveal">${t.g} ${esc(t.title)}</h3>
        <div class="numbers">${l.szamok.map((n) => `<div class="num reveal"><div class="v" data-count="${esc(n.v)}">${esc(n.v)}</div><div class="l">${n.l}</div></div>`).join('')}</div></div>`; }).join('')}
    </div>`);
  }

  /* ---------- Téma (sötét / világos) ---------- */
  const themeBtn = document.getElementById('themeBtn');
  try { const th = localStorage.getItem('jog.theme'); if (th) document.documentElement.dataset.theme = th; } catch (e) { /* nincs tárhely */ }
  themeBtn.addEventListener('click', () => {
    const dark = document.documentElement.dataset.theme ? document.documentElement.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.dataset.theme = dark ? 'light' : 'dark';
    try { localStorage.setItem('jog.theme', document.documentElement.dataset.theme); } catch (e) { /* nincs tárhely */ }
  });

  window.addEventListener('hashchange', route);
  route();
})();
