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
  ];
  const BY_ID = Object.fromEntries(BANK.map((q) => [q.id, q]));
  /* „régen” megjegyzés: ha a szöveg maga nem a régi szabályra utal, elé tesszük, hogy „Régen:” */
  const oldNote = (t) => (/^(régen|a régi|régi|\d{4})/i.test(t) ? '' : '<b>Régen:</b> ') + esc(t);
  const srcLabel = (q) => (q.src === 'teszt' ? `jogteszt.pdf · ${q.n}.` : 'Kurzus-önellenőrző');

  /* ---------- Haladás ---------- */
  const KEY = 'jog.v1';
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } };
  const S = Object.assign({ seen: {}, wrong: [], best: 0, flash: {} }, load());
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* privát mód: nem baj */ } };
  const record = (id, ok) => {
    const s = S.seen[id] || (S.seen[id] = { ok: 0, bad: 0 });
    ok ? s.ok++ : s.bad++;
    s.last = ok ? 1 : 0;
    const i = S.wrong.indexOf(id);
    if (ok && i >= 0) S.wrong.splice(i, 1);
    if (!ok && i < 0) S.wrong.push(id);
    save();
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
    $$('[data-nav]').forEach((a) => a.classList.toggle('on', a.dataset.nav === page || (page === 'lecke' && a.dataset.nav === 'leckek') || (['kviz', 'kartya', 'zh'].includes(page) && a.dataset.nav === 'gyakorlas')));
    setTone(null);
    const views = { home: viewHome, leckek: viewLessons, lecke: () => viewLesson(parts[1]), gyakorlas: viewPractice, kviz: () => viewQuiz(params), zh: () => viewQuiz({ mode: 'zh' }), kartya: () => viewFlash(params), szamok: viewNumbers };
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
          <a class="btn" href="#/lecke/${next.id}">${st.done ? 'Folytasd' : 'Kezdd az 1. leckével'} →</a>
          <a class="btn alt" href="#/kviz?mode=mix">Vegyes kvíz</a>
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
        <p class="lead reveal">Minden lecke: egy mondatos lényeg → fogalomkártyák hasonlatokkal → a számok, amiket kérdeznek → csapdák → mini-kvíz.</p></section>
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
  function animPlayer(el, a) {
    const sts = $$('.st', el), n = sts.length, cap = $('.anim-cap p', el), num = $('.anim-cap .n', el), bar = $('.anim-bar i', el), btn = $('.play', el);
    let i = -1, timer = null;
    const show = (k) => {
      i = k;
      sts.forEach((s, j) => { s.classList.toggle('in', j <= k); s.classList.toggle('cur', j === k); });
      cap.classList.remove('fade'); void cap.offsetWidth; cap.classList.add('fade');
      cap.innerHTML = k < 0 ? (a.intro || 'Nyomd meg a ▶ gombot.') : a.lepesek[k].c;
      num.textContent = k < 0 ? '' : `${k + 1}/${n}`;
      bar.style.width = ((k + 1) / n) * 100 + '%';
    };
    const stop = () => { clearTimeout(timer); timer = null; btn.textContent = '▶'; };
    /* olvasási idő a narráció hosszából (kb. 15 karakter / mp), 2,6 és 7 mp között */
    const wait = (k) => Math.min(7000, Math.max(2600, (a.lepesek[k].c || '').replace(/<[^>]+>/g, '').length * 65));
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

  /* ---------- Gyakorlás menü ---------- */
  function modeTiles() {
    const nT = (window.JOG_TESZT || []).length;
    const tile = (href, ic, mc, t, d, n) => `<a class="mode reveal" href="${href}" style="--mc:${mc}"><div class="ic">${ic}</div><div class="t">${t}</div><div class="d">${d}</div><div class="n">${n}</div></a>`;
    return `<div class="grid grid-3">
      ${tile('#/kviz?mode=mix', '🎲', '#5e5ce6', 'Vegyes kvíz', '20 véletlen kérdés az összes témából, azonnali magyarázattal.', `${BANK.length} kérdésből`)}
      ${tile('#/kviz?mode=hibak', '🎯', '#ff375f', 'Hibáim', 'Csak azok, amiket elrontottál. Ha jól válaszolsz, kikerül a listáról.', `${S.wrong.length} vár rád`)}
      ${tile('#/zh', '⏱️', '#ff9f0a', 'ZH-szimuláció', '30 kérdés, 30 perc, magyarázat csak a végén — mint élesben. Becsült jeggyel.', 'Vizsga-mód')}
      ${tile('#/kviz?mode=teszt', '📄', '#0a84ff', 'jogteszt.pdf végig', `Mind a ${nT} kérdés sorban. Ott folytatod, ahol abbahagytad.`, `${BANK.filter((q) => q.src === 'teszt' && S.seen[q.id]).length} / ${nT} kész`)}
      ${tile('#/kartya', '🃏', '#30d158', 'Villámkártyák', 'Fogalmak és számok, megfordítható kártyákon. A „nem tudtam” visszajön.', 'Szóköz = fordítás')}
      ${tile('#/szamok', '🔢', '#bf5af2', 'Számok összesítő', 'Minden határidő, létszám, életkor egy helyen.', 'Évek, napok, fők')}
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
    } else if (p.mode === 'zh') {
      pool = shuffle(BANK.filter((q) => q.t !== 'fogyaszto')).slice(0, 30);
      opts = { title: 'ZH-szimuláció', exam: true, minutes: 30 };
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
      const grade = pct >= 87 ? 5 : pct >= 75 ? 4 : pct >= 63 ? 3 : pct >= 50 ? 2 : 1;
      const words = ['', 'Elégtelen', 'Elégséges', 'Közepes', 'Jó', 'Jeles'];
      if (pct >= 80) FX.confetti(180);
      if (inline) {
        root.innerHTML = `<div class="card" style="text-align:center"><div class="grade tc-text">${score} / ${pool.length}</div>
          <p class="lead">${pct === 100 ? 'Hibátlan! Jöhet a teljes téma.' : 'A hibás kérdések bekerültek a „Hibáim” listába.'}</p>
          <div class="btn-row"><a class="btn tc" href="#/kviz?t=${pool[0] ? pool[0].t : ''}">Teljes téma</a></div></div>`;
        return;
      }
      setTone(pct >= 75 ? '#30d158' : pct >= 50 ? '#ff9f0a' : '#ff453a');
      root.innerHTML = `<div class="result">
        <p class="eyebrow">${esc(o.title || 'Kvíz')} · kész</p>
        ${FX.ring(pct, `<span class="pct">${pct}%</span>`, true)}
        <div class="grade">${o.exam ? grade + ' · ' + words[grade] : score + ' / ' + pool.length}</div>
        <p class="lead">${o.exam ? `${score} / ${pool.length} jó válasz. A jegy csak becslés (50% elégséges, 63% közepes, 75% jó, 87% jeles).` : pct >= 80 ? 'Ez nagyon megy. 🔥' : pct >= 50 ? 'Jó úton vagy — a hibákat nézd át alább.' : 'Nézd át a leckét, aztán jöhet a Hibáim mód.'}</p>
        <div class="btn-row"><a class="btn" href="#/kviz?mode=hibak">Hibáim gyakorlása (${S.wrong.length})</a><a class="btn alt" href="#/gyakorlas">Másik mód</a></div>
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
      <div class="btn-row reveal"><a class="btn" href="#/kartya">Kikérdezés kártyákkal</a></div></section>
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
