/* Fizika — hash-router és nézetek. Adat: FIZ_TEMAK, FIZ_LECKEK, FIZ_PUSKA, FIZ_ABRAK, FIZ_VIDEOK. */
(function () {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const app = $('#app');
  const TEMAK = window.FIZ_TEMAK || [];
  const LECKEK = window.FIZ_LECKEK || [];
  const PUSKA = window.FIZ_PUSKA || [];
  const ABRAK = window.FIZ_ABRAK || {};
  const VIDEOK = window.FIZ_VIDEOK || {};
  const ZH = new Date('2026-11-30T08:00:00');
  const lecke = (id) => LECKEK.find((l) => l.id === id);
  const tema = (id) => TEMAK.find((t) => t.id === id);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* Haladás (localStorage, hibatűrő) */
  const KEY = 'fiz.v1';
  let S = { story: {}, seen: {} };
  try { S = Object.assign(S, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} };

  /* Közös segédek a többi modulnak */
  const FIZ = (window.FIZ = window.FIZ || {});
  FIZ.colors = () => {
    const cs = getComputedStyle(document.body);
    const v = (n) => cs.getPropertyValue(n).trim();
    return { fg: v('--fg'), muted: v('--muted'), dim: v('--dim'), line: v('--line2'), bg: v('--bg2'), c: v('--c') || '#4DA3FF', acc: v('--fejben'), puska: v('--puska'), link: v('--link') };
  };
  FIZ.reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  FIZ.tex = (t, display) => {
    if (window.katex) {
      try { return window.katex.renderToString(t, { throwOnError: false, displayMode: !!display }); } catch (e) {}
    }
    return '<span class="m">' + esc(t) + '</span>';
  };
  FIZ.render = (el) => {
    if (window.renderMathInElement) {
      try {
        window.renderMathInElement(el, { delimiters: [{ left: '$$', right: '$$', display: true }, { left: '$', right: '$', display: false }], throwOnError: false, ignoredClasses: ['notex'] });
      } catch (e) {}
    }
  };
  /* Hi-DPI vászon, ami a szülő szélességéhez igazodik. draw(ctx, w, h) */
  FIZ.canvas = (el, ratio, draw) => {
    const cv = document.createElement('canvas');
    el.appendChild(cv);
    const ctx = cv.getContext('2d');
    let w = 0, h = 0;
    const size = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = el.clientWidth || 600; h = Math.round(w / ratio);
      cv.width = w * dpr; cv.height = h * dpr; cv.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(ctx, w, h);
    };
    const ro = 'ResizeObserver' in window ? new ResizeObserver(size) : null;
    ro ? ro.observe(el) : window.addEventListener('resize', size);
    size();
    return { cv, ctx, redraw: () => draw(ctx, w, h), size: () => ({ w, h }), stop: () => { ro ? ro.disconnect() : window.removeEventListener('resize', size); } };
  };

  /* Téma */
  $('#themeBtn').addEventListener('click', () => {
    const cur = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = cur;
    try { localStorage.setItem('fiz.theme', cur); } catch (e) {}
    window.dispatchEvent(new Event('fiz:theme'));
  });

  /* Ikonok (vonalas SVG) */
  const I = {
    arrow: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    back: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>',
    doc: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 2h9l5 5v15H6z"/><path d="M14 2v6h6"/></svg>',
    brain: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    warn: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18v.5"/></svg>',
    story: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="2.5" width="14" height="19" rx="3"/><path d="M9 7h6M9 11h6"/></svg>',
    sheet: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h16v16H4z"/><path d="M8 9h3M8 13h8M8 17h5"/></svg>',
    map: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="5" cy="6" r="2.5"/><circle cx="19" cy="6" r="2.5"/><circle cx="12" cy="18" r="2.5"/><path d="M7 7.5l3.5 8.5M17 7.5L13.5 16"/></svg>',
    play: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2.5" y="4.5" width="19" height="15" rx="3"/><path d="M10 9v6l5-3z"/></svg>',
    decode: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 2h9l5 5v15H6z"/><path d="M14 2v6h6M9 13h6M9 17h4"/></svg>'
  };
  FIZ.I = I;
  const badge = (k) => k.puska
    ? `<span class="pill puska" title="Rajta van a ZH-n használható segédleten">${I.doc}Puskán</span>`
    : `<span class="pill fejben" title="Nincs a segédleten: fejből kell tudni">${I.brain}Fejben tartsd</span>`;
  const kepletKartya = (k) => `<div class="card kk reveal">
      <div class="fej"><span class="nev">${esc(k.nev)}</span>${badge(k)}</div>
      <div class="tex">${FIZ.tex(k.tex, true)}</div>
      <div class="jel">${k.jel}</div>
      ${k.mikor ? `<div class="mikor">${k.mikor}</div>` : ''}
    </div>`;

  /* ——— Nézetek ——— */
  let cleanups = [];
  const onLeave = (fn) => cleanups.push(fn);
  const setColor = (c) => document.documentElement.style.setProperty('--c', c || '#4DA3FF');

  function viewHome() {
    setColor('#4DA3FF');
    const napok = Math.max(0, Math.ceil((ZH - new Date()) / 864e5));
    const kesz = TEMAK.filter((t) => S.story[t.id]).length;
    const dia = TEMAK.reduce((a, t) => a + t.dia, 0);
    const kov = TEMAK.find((t) => !S.story[t.id]) || TEMAK[0];
    const vDb = Object.keys(VIDEOK).length;
    return `<div class="wrap">
      <section class="hero">
        <p class="eyebrow" style="color:var(--link)">Klasszikus fizika villamosmérnököknek</p>
        <h1 class="h-hero word-rise">Fizika.<br><span class="dim">Hétfőre megvan.</span></h1>
        <p class="lead reveal">Tíz fejezet Dr. Giczi Ferenc diáiból, röviden, képletekkel, animált videókkal és húzható ábrákkal. A cél: <b>legalább 7 pont a 10-ből</b>.</p>
        <div class="row reveal" style="padding-top:8px">
          <a class="btn" href="#/lecke/${kov.id}">${kesz ? 'Folytatás' : 'Kezdjük'}: ${esc(kov.id + ' ' + kov.nev)} ${I.arrow}</a>
          <a class="btn ghost" href="#/puska">Puska-dekóder</a>
        </div>
      </section>
      <section class="grid" style="--min:240px">
        <div class="card stat hl reveal"><span class="k" style="color:var(--link-h)">ZH-ig</span><span class="v" data-count="${napok} nap">${napok} nap</span><span class="s">hétfő, november 30.</span></div>
        <div class="card stat reveal"><span class="k">Átvett leckék</span><span class="v">${kesz}<small>/10</small></span><span class="s">Fókusz módban pipálódik ki.</span></div>
        <div class="card stat reveal"><span class="k">Animált videók</span><span class="v" data-count="${vDb}">${vDb}</span><span class="s">jelenetekre bontva, felirattal.</span></div>
        <div class="card stat reveal"><span class="k">Forrás</span><span class="v" data-count="${dia}">${dia}</span><span class="s">dia, mind a 10 fejezetből.</span></div>
      </section>
      <section>
        <div class="sec-head"><h2 class="h2">Leckék</h2><span>A diák sorrendjében. Mind benne lesz a ZH-ban.</span></div>
        <div class="grid" style="--min:260px">
          ${TEMAK.map((t) => `<a class="card tema reveal" href="#/lecke/${t.id}" style="--tc:${t.szin}">
            <div class="top">${FX.ring(S.story[t.id] ? 100 : (S.seen[t.id] ? 35 : 0), `<b>${t.id}</b>`)}<span>${t.dia} dia${lecke(t.id) ? ' · ' + lecke(t.id).perc + ' perc' : ''}</span></div>
            <div style="display:flex;flex-direction:column;gap:6px"><span class="nev">${esc(t.nev)}</span><span class="rov">${esc(t.rovid)}</span></div>
            <span class="bar"></span>
          </a>`).join('')}
        </div>
      </section>
      <section class="grid modes" style="--min:260px;padding-bottom:120px">
        <a class="card reveal" href="#/sztori/${kov.id}">${I.story}<span class="t">Fókusz mód</span><span class="d">Egy lecke, egyszerre egy dia. Szóköz vagy koppintás: tovább.</span></a>
        <a class="card reveal" href="#/videok">${I.play}<span class="t">Videók</span><span class="d">Animált magyarázók minden fejezethez, felirattal és felolvasással.</span></a>
        <a class="card reveal" href="#/kepletlap">${I.sheet}<span class="t">Képletlap</span><span class="d">Minden képlet egy oldalon, jelölve, mi van a puskán. Nyomtatható.</span></a>
        <a class="card reveal" href="#/puska">${I.decode}<span class="t">Puska-dekóder</span><span class="d">A segédlet minden jele lefordítva. A ZH-n ezt kell tudni olvasni.</span></a>
        <a class="card reveal" href="#/terkep">${I.map}<span class="t">Képlettérkép</span><span class="d">Melyik képlet miből jön. Levezetni könnyebb, mint magolni.</span></a>
      </section>
    </div>`;
  }

  function viewLecke(id) {
    const l = lecke(id), t = tema(id);
    if (!l || !t) return view404();
    setColor(t.szin);
    S.seen[id] = Date.now(); save();
    const i = TEMAK.indexOf(t), prev = TEMAK[i - 1], next = TEMAK[i + 1];
    const html = `<div class="wrap">
      <section class="hero" style="padding-bottom:56px">
        <div class="row" style="gap:12px;font-size:14px;color:var(--muted)">
          <a href="#/" style="display:inline-flex;align-items:center;gap:6px">${I.back}Leckék</a>
          <span class="pill c">${esc(t.id)}. fejezet</span><span>${t.dia} dia · kb. ${l.perc} perc</span>
        </div>
        <h1 class="h1 word-rise">${esc(t.nev)}</h1>
        <p class="egy reveal">${l.egyMondat}</p>
        <div class="row reveal"><a class="btn c" href="#/sztori/${id}">Fókusz mód ${I.arrow}</a>${S.story[id] ? '<span class="pill puska">Átvéve</span>' : ''}</div>
      </section>
      ${l.videok.length ? `<section><div class="sec-head"><h2 class="h2">Videók</h2><span>Nyomd meg a lejátszást, vagy ugorj jelenetre.</span></div><div data-videos></div></section>` : ''}
      <section>
        <div class="sec-head"><h2 class="h2">Kulcsképletek</h2><span class="legend"><span class="pill puska">${I.doc}Puskán</span> ott lesz a ZH-n <span class="pill fejben">${I.brain}Fejben tartsd</span> nincs a lapon</span></div>
        <div class="grid" style="--min:320px">${l.kepletek.map(kepletKartya).join('')}</div>
      </section>
      ${l.abrak.length ? `<section><div class="sec-head"><h2 class="h2">Próbáld ki</h2><span>Húzd a csúszkákat, és nézd, mi változik.</span></div><div data-abrak></div></section>` : ''}
      <section>
        <div class="sec-head"><h2 class="h2">Érthetően</h2></div>
        <div class="grid" style="--min:340px">${l.kartyak.map((c) => `<div class="card mk reveal"><span class="k">${esc(c.k)}</span><span class="cim">${esc(c.cim)}</span><div class="tx">${c.html}</div>${c.hasonlat ? `<div class="has">${c.hasonlat}</div>` : ''}</div>`).join('')}</div>
      </section>
      <section>
        <div class="sec-head"><h2 class="h2">Csapdák a ZH-ban</h2></div>
        <div class="csapdak">${l.csapdak.map((c) => `<div class="csapda reveal">${I.warn}<span>${c}</span></div>`).join('')}</div>
        ${l.hianyzik && l.hianyzik.length ? `<p class="hiany">Nem került be (a diákon szerepel, de itt nincs kifejtve): ${l.hianyzik.map(esc).join(' · ')}</p>` : ''}
      </section>
      <footer class="pn">
        ${prev ? `<a href="#/lecke/${prev.id}"><span>Előző</span><b>${esc(prev.id + ' · ' + prev.nev)}</b></a>` : '<span></span>'}
        <span class="src">Forrás: ${esc(l.forras)}</span>
        ${next ? `<a href="#/lecke/${next.id}" style="text-align:right"><span>Következő</span><b>${esc(next.id + ' · ' + next.nev)}</b></a>` : '<span></span>'}
      </footer>
    </div>`;
    return { html, after: () => {
      const vb = $('[data-videos]', app);
      if (vb) l.videok.forEach((k) => mountVideo(vb, k));
      const ab = $('[data-abrak]', app);
      if (ab) l.abrak.forEach((k) => mountAbra(ab, k));
    } };
  }

  function mountAbra(host, key) {
    const a = ABRAK[key];
    if (!a) return;
    const box = document.createElement('div');
    box.className = 'stage reveal';
    box.innerHTML = `<div class="fej"><div><p class="eyebrow">Interaktív</p><h3 class="cim">${esc(a.cim)}</h3></div><div class="out" data-out></div></div><div data-body></div>${a.leiras ? `<p class="note">${a.leiras}</p>` : ''}`;
    host.appendChild(box);
    const stop = a.mount($('[data-body]', box), $('[data-out]', box));
    FIZ.render(box);
    if (typeof stop === 'function') onLeave(stop);
  }

  /* Videólejátszó: canvas jelenetek, felirat, hu-HU felolvasás */
  function mountVideo(host, key) {
    const v = VIDEOK[key];
    if (!v) return;
    const len = v.hossz || v.jelenetek.length * 10;
    const box = document.createElement('div');
    box.className = 'video reveal';
    box.innerHTML = `<div class="vhead"><div><p class="eyebrow">Videó · ${esc(tema(v.tema) ? tema(v.tema).nev : '')}</p><h3>${esc(v.cim)}</h3></div>
      <span class="tm">${v.jelenetek.length} jelenet · ${Math.round(len)} mp</span></div>
      <div data-cv></div><div class="cap" aria-live="polite"><span></span></div>
      <div class="ctl"><button class="play" aria-label="Lejátszás"></button><div class="prog" role="slider" aria-label="Idő" tabindex="0"><i></i></div><span class="tm" data-tm></span>
      <button class="chip" data-tts aria-pressed="false" style="min-height:36px;font-size:13px">Felolvasás: ki</button></div>
      <div class="scn">${v.jelenetek.map((j, i) => `<button class="chip" data-j="${i}">${i + 1}. ${esc(j.cim || '')}</button>`).join('')}</div>`;
    host.appendChild(box);
    const playIc = '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15l13-7.5z"/></svg>';
    const pauseIc = '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>';
    const btn = $('.play', box), bar = $('.prog i', box), tm = $('[data-tm]', box), tts = $('[data-tts]', box);
    let cap = $('.cap span', box);
    let t = 0, playing = false, last = 0, raf = 0, sceneIdx = -1, speak = false;
    try { speak = localStorage.getItem('fiz.tts') === '1'; } catch (e) {}
    const sceneAt = (tt) => { let k = 0; v.jelenetek.forEach((j, i) => { if (tt >= j.t) k = i; }); return k; };
    const cvs = FIZ.canvas($('[data-cv]', box), v.arany || 2.2, (ctx, w, h) => { ctx.clearRect(0, 0, w, h); v.rajz(ctx, t, w, h, FIZ.colors()); });
    const fmt = (s) => Math.floor(s / 60) + ':' + String(Math.floor(s % 60)).padStart(2, '0');
    const ui = () => {
      bar.style.width = (t / len * 100) + '%';
      tm.textContent = fmt(t) + ' / ' + fmt(len);
      const k = sceneAt(t);
      if (k !== sceneIdx) {
        sceneIdx = k;
        cap.outerHTML = `<span>${v.jelenetek[k].szoveg}</span>`;
        cap = $('.cap span', box); FIZ.render(cap);
        box.querySelectorAll('[data-j]').forEach((b) => b.classList.toggle('on', +b.dataset.j === k));
        if (speak && playing && 'speechSynthesis' in window) {
          speechSynthesis.cancel();
          const u = new SpeechSynthesisUtterance(cap.textContent);
          u.lang = 'hu-HU'; u.rate = 1.05; speechSynthesis.speak(u);
        }
      }
      btn.innerHTML = playing ? pauseIc : playIc;
      btn.setAttribute('aria-label', playing ? 'Szünet' : 'Lejátszás');
      tts.textContent = 'Felolvasás: ' + (speak ? 'be' : 'ki'); tts.setAttribute('aria-pressed', speak);
    };
    const frame = (now) => {
      if (!playing) return;
      const dt = Math.min(0.1, (now - last) / 1000); last = now;
      t += dt;
      if (t >= len) { t = len; playing = false; }
      cvs.redraw(); ui();
      if (playing) raf = requestAnimationFrame(frame);
    };
    const play = () => { if (t >= len) { t = 0; sceneIdx = -1; } playing = true; last = performance.now(); ui(); raf = requestAnimationFrame(frame); };
    const pause = () => { playing = false; cancelAnimationFrame(raf); if ('speechSynthesis' in window) speechSynthesis.cancel(); ui(); };
    const seek = (tt) => { t = Math.max(0, Math.min(len - 0.01, tt)); sceneIdx = -1; cvs.redraw(); ui(); };
    btn.onclick = () => (playing ? pause() : play());
    $('.prog', box).onclick = (e) => { const r = e.currentTarget.getBoundingClientRect(); seek((e.clientX - r.left) / r.width * len); };
    $('.prog', box).onkeydown = (e) => { if (e.key === 'ArrowRight') seek(t + 3); if (e.key === 'ArrowLeft') seek(t - 3); };
    box.querySelectorAll('[data-j]').forEach((b) => (b.onclick = () => { seek(v.jelenetek[+b.dataset.j].t + 0.01); if (!playing) play(); }));
    tts.onclick = () => { speak = !speak; try { localStorage.setItem('fiz.tts', speak ? '1' : '0'); } catch (e) {} if (!speak && 'speechSynthesis' in window) speechSynthesis.cancel(); sceneIdx = -1; ui(); };
    const th = () => cvs.redraw();
    window.addEventListener('fiz:theme', th);
    // Félig látható → magától indul (ha nincs csökkentett mozgás), kifut → szünet
    let io = null;
    if (!FIZ.reduce && 'IntersectionObserver' in window) {
      io = new IntersectionObserver(([en]) => { if (!en.isIntersecting && playing) pause(); }, { threshold: 0.2 });
      io.observe(box);
    }
    ui();
    onLeave(() => { pause(); cvs.stop(); window.removeEventListener('fiz:theme', th); if (io) io.disconnect(); });
  }

  function viewVideok() {
    setColor('#4DA3FF');
    const keys = Object.keys(VIDEOK);
    const html = `<div class="wrap"><section class="hero" style="padding-bottom:40px">
      <p class="eyebrow" style="color:var(--link)">Animált magyarázók</p><h1 class="h1 word-rise">Videók</h1>
      <p class="lead reveal">Minden fejezethez rövid, jelenetekre bontott animáció. Kapcsold be a felolvasást, és hallgasd végig.</p>
      <div class="row reveal">${TEMAK.filter((t) => keys.some((k) => VIDEOK[k].tema === t.id)).map((t) => `<a class="chip" href="#/videok?t=${t.id}" style="display:inline-flex;align-items:center;${q.t === t.id ? 'border-color:' + t.szin : ''}">${esc(t.id + ' · ' + t.nev)}</a>`).join('')}</div>
      </section><section data-videos></section></div>`;
    return { html, after: () => {
      const host = $('[data-videos]', app);
      keys.filter((k) => !q.t || VIDEOK[k].tema === q.t).forEach((k) => {
        const t = tema(VIDEOK[k].tema);
        const wrap = document.createElement('div');
        wrap.style.setProperty('--c', t ? t.szin : '#4DA3FF');
        host.appendChild(wrap);
        mountVideo(wrap, k);
      });
    } };
  }

  function viewKepletlap() {
    setColor('#4DA3FF');
    const f = q.f || 'mind';
    const szur = (k) => f === 'mind' || (f === 'puska' ? k.puska : !k.puska);
    const html = `<div class="wrap">
      <section class="hero" style="padding-bottom:24px"><p class="eyebrow" style="color:var(--link)">Minden fejezet</p><h1 class="h1 word-rise">Képletlap</h1>
        <p class="lead reveal">Az összes képlet egy helyen. A <b>Fejben tartsd</b> jelűek nincsenek a segédleten, ezeket tanuld meg.</p></section>
      <div class="kl-filter row no-print">
        <a class="chip ${f === 'mind' ? 'on' : ''}" href="#/kepletlap" style="display:inline-flex;align-items:center">Mind</a>
        <a class="chip ${f === 'fejben' ? 'on' : ''}" href="#/kepletlap?f=fejben" style="display:inline-flex;align-items:center">Csak fejben tartandó</a>
        <a class="chip ${f === 'puska' ? 'on' : ''}" href="#/kepletlap?f=puska" style="display:inline-flex;align-items:center">Csak puskán lévő</a>
        <button class="chip" onclick="print()">Nyomtatás</button>
      </div>
      ${TEMAK.map((t) => { const l = lecke(t.id); if (!l) return ''; const ks = l.kepletek.filter(szur); if (!ks.length) return '';
        return `<div style="--tc:${t.szin};--c:${t.szin}"><div class="kl-fej"><span class="dot"></span><h3>${esc(t.id + ' · ' + t.nev)}</h3><a href="#/lecke/${t.id}" class="no-print" style="font-size:14px">lecke →</a></div>
          <div class="grid" style="--min:300px">${ks.map(kepletKartya).join('')}</div></div>`; }).join('')}
      <div style="height:120px"></div></div>`;
    return html;
  }

  function viewPuska() {
    setColor('#FF9F45');
    const szak = [...new Set(PUSKA.map((p) => p.sz))];
    const cur = q.sz && szak.includes(q.sz) ? q.sz : 'mind';
    const lista = PUSKA.filter((p) => cur === 'mind' || p.sz === cur);
    return `<div class="wrap">
      <section class="hero" style="padding-bottom:24px"><p class="eyebrow">A ZH-n használható segédlet</p><h1 class="h1 word-rise">Puska-dekóder</h1>
        <p class="lead reveal">A képlet ott lesz előtted, de <b>magyarázat nincs rajta</b>. A tanár szerint a jelek jelentését helyesen kell tudni, és a számolós feladat csak teljes levezetéssel ér pontot. Itt minden jel le van fordítva.</p></section>
      <div class="kl-filter row no-print">
        <a class="chip ${cur === 'mind' ? 'on' : ''}" href="#/puska" style="display:inline-flex;align-items:center">Mind (${PUSKA.length})</a>
        ${szak.map((s) => `<a class="chip ${cur === s ? 'on' : ''}" href="#/puska?sz=${encodeURIComponent(s)}" style="display:inline-flex;align-items:center">${esc(s)}</a>`).join('')}
      </div>
      <div class="grid" style="--min:340px;padding:16px 0 120px">
        ${lista.map((p) => `<div class="card kk reveal"><div class="fej"><span class="nev">${esc(p.nev)}</span>${p.lecke ? `<a href="#/lecke/${p.lecke}" style="font-size:13px;font-weight:600">${esc(p.lecke)} →</a>` : '<span class="pill fejben">nincs az előadásban</span>'}</div>
          <div class="tex">${FIZ.tex(p.tex, true)}</div>
          <div class="jelek">${p.jelek.map((j) => `<div><span class="s">${FIZ.tex(j.s)}</span><span>${j.d}</span></div>`).join('')}</div></div>`).join('')}
      </div></div>`;
  }

  function viewTerkep() {
    setColor('#4DA3FF');
    const t = tema(q.t) || TEMAK.find((x) => lecke(x.id) && lecke(x.id).kepletek.some((k) => k.bol && k.bol.length)) || TEMAK[0];
    const l = lecke(t.id);
    const html = `<div class="wrap">
      <section class="hero" style="padding-bottom:24px"><p class="eyebrow" style="color:var(--link)">Levezetési útvonalak</p><h1 class="h1 word-rise">Képlettérkép</h1>
        <p class="lead reveal">A nyíl azt jelenti: <b>ebből jön</b>. Ha egy képletet elfelejtesz, menj vissza a nyíl mentén, és vezesd le.</p></section>
      <div class="kl-filter row">${TEMAK.filter((x) => lecke(x.id)).map((x) => `<a class="chip ${x.id === t.id ? 'on' : ''}" href="#/terkep?t=${x.id}" style="display:inline-flex;align-items:center">${esc(x.id + ' · ' + x.nev)}</a>`).join('')}</div>
      <div class="card terkep reveal" style="--c:${t.szin};margin:16px 0 120px;padding:24px" data-map></div></div>`;
    return { html, after: () => { if (l) drawMap($('[data-map]', app), l, t); } };
  }

  /* Rétegzett elrendezés: a bol-szint szerint sorokba */
  function drawMap(host, l, t) {
    const ks = l.kepletek;
    const by = {}; ks.forEach((k) => (by[k.nev] = k));
    const lvl = {};
    const depth = (k, seen = new Set()) => {
      if (lvl[k.nev] !== undefined) return lvl[k.nev];
      if (seen.has(k.nev)) return 0;
      seen.add(k.nev);
      const d = (k.bol || []).filter((b) => by[b]).reduce((m, b) => Math.max(m, depth(by[b], seen) + 1), 0);
      return (lvl[k.nev] = d);
    };
    ks.forEach((k) => depth(k));
    const rows = [];
    ks.forEach((k) => (rows[lvl[k.nev]] = rows[lvl[k.nev]] || []).push(k));
    const W = 1100, rowH = 150, boxW = 240, boxH = 96;
    const pos = {};
    rows.forEach((r, ri) => r.forEach((k, i) => { pos[k.nev] = { x: (W / (r.length + 1)) * (i + 1) - boxW / 2, y: 30 + ri * rowH }; }));
    const H = 30 + rows.length * rowH;
    const edges = [];
    ks.forEach((k) => (k.bol || []).forEach((b) => { if (!pos[b]) return; const a = pos[b], c = pos[k.nev];
      edges.push(`<path class="edge" d="M${a.x + boxW / 2} ${a.y + boxH} C ${a.x + boxW / 2} ${a.y + boxH + 40}, ${c.x + boxW / 2} ${c.y - 40}, ${c.x + boxW / 2} ${c.y - 4}"/>`); }));
    host.innerHTML = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(t.nev)} képletei és levezetési kapcsolataik">
      <defs><marker id="nyil" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="currentColor" style="color:var(--muted)"/></marker></defs>
      ${edges.join('')}
      ${ks.map((k) => { const p = pos[k.nev]; return `<g class="node"><rect x="${p.x}" y="${p.y}" width="${boxW}" height="${boxH}" rx="16"/>
        <foreignObject x="${p.x + 10}" y="${p.y + 8}" width="${boxW - 20}" height="${boxH - 16}"><div xmlns="http://www.w3.org/1999/xhtml" style="font:500 13px Inter,sans-serif;color:var(--muted);display:flex;flex-direction:column;gap:4px;height:100%;justify-content:center">
        <span>${esc(k.nev)} ${k.puska ? '' : '<b style="color:var(--fejben)">·</b>'}</span><span style="color:var(--fg);font-size:16px;overflow:hidden;white-space:nowrap">${FIZ.tex(k.tex)}</span></div></foreignObject></g>`; }).join('')}
    </svg>
    <p class="hiany" style="margin:12px 0 0">Narancs pont: nincs a puskán. ${ks.some((k) => k.bol && k.bol.length) ? '' : 'Ennél a fejezetnél nincsenek levezetési kapcsolatok megadva.'}</p>`;
  }

  /* Fókusz mód */
  function story(id) {
    const l = lecke(id), t = tema(id);
    if (!l || !t) { location.hash = '#/'; return; }
    setColor(t.szin);
    const slides = [];
    slides.push({ html: `<p class="eyebrow">${esc(t.id)}. fejezet · Fókusz mód</p><h2 class="big">${esc(t.nev)}</h2><p class="egy beat">${l.egyMondat}</p>`, beats: 1 });
    l.kepletek.forEach((k) => slides.push({ html: `<p class="eyebrow">Képlet</p><h2 class="big" style="font-size:clamp(24px,3.5vw,36px)">${esc(k.nev)}</h2>
      <div class="tex beat">${FIZ.tex(k.tex, true)}</div><div class="beat" style="font-size:18px;color:var(--fg2)">${k.jel}</div><div class="beat">${badge(k)}</div>`, beats: 3 }));
    l.kartyak.forEach((c) => {
      const tmp = document.createElement('div'); tmp.innerHTML = c.html;
      const lis = [...tmp.querySelectorAll('li')];
      lis.forEach((li) => li.classList.add('beat'));
      slides.push({ html: `<p class="eyebrow">${esc(c.k)}</p><h2 class="big">${esc(c.cim)}</h2><div class="tx" style="font-size:20px;line-height:1.55;color:var(--fg2)">${tmp.innerHTML}</div>${c.hasonlat ? `<p class="beat" style="font-size:17px;color:var(--dim)">Hasonlat · ${c.hasonlat}</p>` : ''}`, beats: lis.length + (c.hasonlat ? 1 : 0) });
    });
    slides.push({ html: `<p class="eyebrow">Vigyázz</p><h2 class="big">Csapdák</h2>${l.csapdak.map((c) => `<div class="csapda beat">${I.warn}<span>${c}</span></div>`).join('')}`, beats: l.csapdak.length });
    slides.push({ html: `<h2 class="big">Kész.</h2><p class="egy">A <b>${esc(t.nev)}</b> átvéve. ${TEMAK[TEMAK.indexOf(t) + 1] ? 'Jöhet a következő?' : 'Mind a 10 megvan!'}</p>
      <div class="row">${TEMAK[TEMAK.indexOf(t) + 1] ? `<a class="btn c" href="#/sztori/${TEMAK[TEMAK.indexOf(t) + 1].id}">Következő: ${esc(TEMAK[TEMAK.indexOf(t) + 1].nev)}</a>` : ''}<a class="btn ghost" href="#/lecke/${id}">Vissza a leckéhez</a></div>`, beats: 0, end: true });

    const el = document.createElement('div');
    el.className = 'story'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-label', 'Fókusz mód: ' + t.nev);
    document.body.appendChild(el);
    document.body.style.overflow = 'hidden';
    let si = 0, bi = 0, dir = 1;
    const draw = () => {
      const s = slides[si];
      el.innerHTML = `<div class="bars">${slides.map((_, i) => `<i class="${i < si ? 'done' : i === si ? 'cur' : ''}"></i>`).join('')}</div>
        <div class="top"><span>${si + 1} / ${slides.length}</span><button class="icon-btn" data-x aria-label="Bezárás (Esc)"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>
        <button class="tap l" data-prev aria-label="Vissza" style="background:none;border:0"></button><button class="tap r" data-next aria-label="Tovább" style="background:none;border:0"></button>
        <div class="slide ${dir < 0 ? 'back' : ''}">${s.html}</div>
        <div class="nav2"><button class="btn ghost sm" data-prev>${I.back} Vissza</button><span style="font-size:13px;color:var(--dim)">Szóköz / → tovább · Esc kilép</span><button class="btn c sm" data-next>Tovább ${I.arrow}</button></div>`;
      FIZ.render(el);
      const beats = [...el.querySelectorAll('.slide .beat')];
      beats.forEach((b, i) => { if (i < bi || dir < 0) b.classList.add('on'); });
      el.querySelector('[data-x]').onclick = close;
      el.querySelectorAll('[data-next]').forEach((b) => (b.onclick = next));
      el.querySelectorAll('[data-prev]').forEach((b) => (b.onclick = prev));
      if (s.end && !S.story[id]) { S.story[id] = Date.now(); save(); FX.confetti(140); }
    };
    const next = () => {
      const beats = [...el.querySelectorAll('.slide .beat')];
      const hidden = beats.filter((b) => !b.classList.contains('on'));
      if (hidden.length) { hidden[0].classList.add('on'); bi++; return; }
      if (si < slides.length - 1) { si++; bi = 0; dir = 1; draw(); setTimeout(() => { const b = el.querySelector('.slide .beat'); if (b && slides[si].beats === 1) { b.classList.add('on'); bi = 1; } }, 350); }
    };
    const prev = () => { if (si > 0) { si--; bi = 99; dir = -1; draw(); } };
    const key = (e) => {
      if (e.key === 'Escape') close();
      else if (e.key === ' ' || e.key === 'ArrowRight' || e.key === 'Enter') { e.preventDefault(); next(); }
      else if (e.key === 'ArrowLeft') prev();
    };
    function close() { document.removeEventListener('keydown', key); el.remove(); document.body.style.overflow = ''; if (location.hash.startsWith('#/sztori')) location.hash = '#/lecke/' + id; }
    document.addEventListener('keydown', key);
    onLeave(() => { if (document.body.contains(el)) { document.removeEventListener('keydown', key); el.remove(); document.body.style.overflow = ''; } });
    draw();
    setTimeout(() => { const b = el.querySelector('.slide .beat'); if (b) { b.classList.add('on'); bi = 1; } }, 500);
  }

  function view404() {
    setColor('#4DA3FF');
    return `<div class="wrap empty"><h1 class="h1">Nincs ilyen oldal.</h1><p class="lead">Lehet, hogy elírás van a címben.</p><a class="btn" href="#/">Vissza a leckékhez</a></div>`;
  }

  /* Router */
  let q = {};
  function route() {
    cleanups.forEach((f) => { try { f(); } catch (e) {} });
    cleanups = [];
    const h = location.hash.replace(/^#/, '') || '/';
    const [p, qs] = h.split('?');
    q = Object.fromEntries(new URLSearchParams(qs || ''));
    const parts = p.split('/').filter(Boolean);
    let out;
    if (!parts.length) out = viewHome();
    else if (parts[0] === 'lecke') out = viewLecke(parts[1]);
    else if (parts[0] === 'sztori') { paint(viewLecke(parts[1])); story(parts[1]); navOn('/'); return; }
    else if (parts[0] === 'videok') out = viewVideok();
    else if (parts[0] === 'kepletlap') out = viewKepletlap();
    else if (parts[0] === 'puska') out = viewPuska();
    else if (parts[0] === 'terkep') out = viewTerkep();
    else out = view404();
    paint(out);
    navOn('/' + (parts[0] && parts[0] !== 'lecke' ? parts[0] : ''));
    window.scrollTo(0, 0);
  }
  function paint(out) {
    const r = typeof out === 'string' ? { html: out } : out;
    app.innerHTML = `<div class="view">${r.html}</div>`;
    FIZ.render(app);
    if (r.after) r.after();
    FX.words(app); FX.reveal(app); FX.rings(app);
  }
  function navOn(p) { document.querySelectorAll('[data-nav]').forEach((a) => a.classList.toggle('on', a.dataset.nav === p)); }
  window.addEventListener('hashchange', route);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', route); else route();
})();
