/* Fizika — hash-router és nézetek. Adat: FIZ_TEMAK, FIZ_LECKEK, FIZ_PUSKA, FIZ_ABRAK, FIZ_VIDEOK. Tanulómotor: FIZ_TANUL (tanul.js). */
(function () {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const app = $('#app');
  const TEMAK = window.FIZ_TEMAK || [];
  const LECKEK = window.FIZ_LECKEK || [];
  const PUSKA = window.FIZ_PUSKA || [];
  const ABRAK = window.FIZ_ABRAK || {};
  const VIDEOK = window.FIZ_VIDEOK || {};
  const T = window.FIZ_TANUL;
  const ZH = new Date('2026-11-30T08:00:00');
  const ACC = '#2997FF';
  const lecke = (id) => LECKEK.find((l) => l.id === id);
  const tema = (id) => TEMAK.find((t) => t.id === id);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* Haladás (localStorage, hibatűrő). A kártyák állapota külön kulcson van, lásd tanul.js. */
  const KEY = 'fiz.v1';
  let S = { story: {}, seen: {}, takar: false };
  try { S = Object.assign(S, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} };

  /* Közös segédek a többi modulnak */
  const FIZ = (window.FIZ = window.FIZ || {});
  FIZ.colors = () => {
    const cs = getComputedStyle(document.body);
    const v = (n) => cs.getPropertyValue(n).trim();
    return { fg: v('--fg'), muted: v('--muted'), dim: v('--dim'), line: v('--line2'), bg: v('--bg2'), c: v('--c') || ACC, acc: v('--fejben'), puska: v('--puska'), link: v('--link') };
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

  /* Fényfolt a kártyákon: az egér helyét a --mx / --my változó viszi a CSS-be */
  if (window.matchMedia('(hover: hover)').matches) {
    let pe = null, raf = 0;
    document.addEventListener('pointermove', (e) => {
      pe = e;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const c = pe.target.closest && pe.target.closest('.card');
        if (!c) return;
        const r = c.getBoundingClientRect();
        c.style.setProperty('--mx', (pe.clientX - r.left) + 'px');
        c.style.setProperty('--my', (pe.clientY - r.top) + 'px');
      });
    }, { passive: true });
  }

  /* Ikonok (vonalas SVG) */
  const I = {
    arrow: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    back: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>',
    x: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    doc: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 2h9l5 5v15H6z"/><path d="M14 2v6h6"/></svg>',
    brain: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    warn: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18v.5"/></svg>',
    story: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="2.5" width="14" height="19" rx="3"/><path d="M9 7h6M9 11h6"/></svg>',
    sheet: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h16v16H4z"/><path d="M8 9h3M8 13h8M8 17h5"/></svg>',
    map: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="5" cy="6" r="2.5"/><circle cx="19" cy="6" r="2.5"/><circle cx="12" cy="18" r="2.5"/><path d="M7 7.5l3.5 8.5M17 7.5L13.5 16"/></svg>',
    play: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2.5" y="4.5" width="19" height="15" rx="3"/><path d="M10 9v6l5-3z"/></svg>',
    decode: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 2h9l5 5v15H6z"/><path d="M14 2v6h6M9 13h6M9 17h4"/></svg>'
  };
  I.chev = '<svg class="chev" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>';
  I.bulb = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.2 1.1 2.2h5c.1-1 .5-1.7 1.1-2.2A6 6 0 0 0 12 3z"/></svg>';
  FIZ.I = I;
  const badge = (k) => k.puska
    ? `<span class="pill puska" title="Rajta van a ZH-n használható segédleten">${I.doc}Puskán</span>`
    : `<span class="pill fejben" title="Nincs a segédleten: fejből kell tudni">${I.brain}Fejben tartsd</span>`;
  /* Tudás-pötty a képlet neve előtt */
  const pott = (cid) => {
    const b = T.doboz(cid);
    const [cls, cim] = b < 0 ? ['', 'Még nem kérdezted ki'] : b >= 2 ? ['ok', 'Megy'] : ['gy', 'Gyakorolni kell'];
    return `<i class="md ${cls}" title="${cim}" role="img" aria-label="${cim}"></i>`;
  };
  const kepletKartya = (k, id) => `<div class="card kk reveal">
      <div class="fej"><span class="nev">${id ? pott(id + '|' + k.nev) : ''}${esc(k.nev)}</span>${badge(k)}</div>
      <div class="tex">${FIZ.tex(k.tex, true)}</div>
      <div class="jel">${k.jel}</div>
      ${k.mikor ? `<div class="mikor">${k.mikor}</div>` : ''}
      <span class="lesd" aria-hidden="true">Idézd fel, aztán koppints</span>
    </div>`;
  const takarGomb = () => `<button class="chip${S.takar ? ' on' : ''}" data-takar aria-pressed="${S.takar}" title="Elmossa a képleteket: előbb idézd fel, aztán koppints rá">Takarás: ${S.takar ? 'be' : 'ki'}</button>`;

  /* ——— Nézetek ——— */
  let cleanups = [];
  const onLeave = (fn) => cleanups.push(fn);
  const setColor = (c) => document.documentElement.style.setProperty('--c', c || ACC);

  function viewHome() {
    setColor(ACC);
    const napok = Math.max(0, Math.ceil((ZH - new Date()) / 864e5));
    const kesz = TEMAK.filter((t) => S.story[t.id]).length;
    const kov = TEMAK.find((t) => !S.story[t.id]) || TEMAK[0];
    const st = T.stat(), ma = T.maDb();
    const vDb = Object.keys(VIDEOK).length;
    const html = `<div class="wrap">
      <section class="hero mid">
        <p class="eyebrow">Klasszikus fizika · elméleti ZH</p>
        <h1 class="h-hero word-rise">Fizika.<br><span class="dim">Hétfőre megvan.</span></h1>
        <p class="lead reveal">Tíz fejezet a diákból. Olvasd el, nézd meg, aztán kérdezd ki magad, amíg megy. A cél: <b>legalább 7 pont a 10-ből</b>.</p>
        <div class="row reveal">
          <a class="btn" href="${ma ? '#/kartya/ma' : '#/kviz/mix'}">${ma ? 'Mai adag indítása' : 'Vegyes kvíz'} ${I.arrow}</a>
          <a class="btn ghost" href="#/lecke/${kov.id}">${kesz ? 'Folytatás' : 'Kezdjük'}: ${esc(kov.id + ' · ' + kov.nev)}</a>
        </div>
        <canvas class="wave" data-wave aria-hidden="true"></canvas>
      </section>
      ${roadBanner()}
      <section class="bento">
        <div class="card stat reveal"><span class="k">ZH-ig</span>
          <span class="v">${napok ? `<span data-count="${napok}">${napok}</span> <small>nap</small>` : 'Ma'}</span>
          <span class="s end">Hétfő, november 30. A cél: legalább 7 pont a 10-ből.</span></div>
        <div class="card stat reveal" style="--tc:var(--ok)"><span class="k">Tudásszint</span>
          <div class="mid">${FX.ring(st.pct, `<b>${st.pct}%</b>`, true)}<div><span class="v2">${st.megy} <small>/ ${st.ossz}</small></span><br><span class="s">képlet megy fejből</span></div></div>
          <span class="s end">A kártyák és a kvíz válaszaiból számolva.</span></div>
        ${maiAdagKartya(ma)}
      </section>
      <section>
        <div class="sec-head"><h2 class="h2">Leckék</h2><span>A diák sorrendjében. A sáv azt mutatja, mennyi megy már.</span></div>
        <div class="grid" style="--min:210px">
          ${TEMAK.map((t) => { const s = T.stat(t.id), l = lecke(t.id); return `<a class="card tema reveal" href="#/lecke/${t.id}" style="--tc:${t.szin}">
            <div class="top"><span class="num">${esc(t.id)}</span>${S.story[t.id] ? '<span class="pill ok">Átvéve</span>' : ''}</div>
            <span class="nev">${esc(t.nev)}</span><span class="rov">${esc(t.rovid)}</span>
            <div class="foot"><span class="meter"><i style="width:${s.pct}%"></i></span><span class="mt"><span>${s.megy}/${s.ossz} megy</span><span>${t.dia} dia${l ? ' · ' + l.perc + ' perc' : ''}</span></span></div>
          </a>`; }).join('')}
        </div>
      </section>
      <section style="padding-bottom:120px">
        <div class="sec-head"><h2 class="h2">Eszközök</h2><span>Ugyanaz az anyag, hat különböző módon.</span></div>
        <div class="grid modes" style="--min:320px">
          <a class="card reveal" href="#/kviz/zh"><span class="n">10</span><span class="t">ZH-próba</span><span class="d">Tíz vegyes kérdés, fejezetenként egy. Megvan a 7 pont?</span></a>
          <a class="card reveal" href="#/sztori/${kov.id}"><span class="n">${I.story}</span><span class="t">Fókusz mód</span><span class="d">Egy lecke, egyszerre egy dia. Szóköz vagy koppintás: tovább.</span></a>
          <a class="card reveal" href="#/videok"><span class="n">${vDb}</span><span class="t">Videók</span><span class="d">Animált magyarázók felirattal és felolvasással.</span></a>
          <a class="card reveal" href="#/kepletlap"><span class="n">${st.ossz}</span><span class="t">Képletlap</span><span class="d">Minden képlet egy oldalon. Takarható és nyomtatható.</span></a>
          <a class="card reveal" href="#/puska"><span class="n">${PUSKA.length}</span><span class="t">Puska-dekóder</span><span class="d">A segédlet minden jele lefordítva. A ZH-n ezt kell tudni olvasni.</span></a>
          <a class="card reveal" href="#/terkep"><span class="n">${I.map}</span><span class="t">Képlettérkép</span><span class="d">Melyik képlet miből jön. Levezetni könnyebb, mint magolni.</span></a>
        </div>
      </section>
    </div>`;
    return { html, after: () => { const w = $('[data-wave]', app); if (w) mountWave(w); } };
  }

  const maiAdagKartya = (ma) => ma
    ? `<a class="card stat acc reveal" href="#/kartya/ma"><span class="k">Mai adag</span><span class="v" data-count="${ma}">${ma}</span>
        <span class="s">kártya vár rád, kb. ${Math.max(1, Math.round(ma / 3))} perc.</span><span class="btn inv sm end" style="align-self:flex-start">Kezdés</span></a>`
    : `<a class="card stat acc reveal" href="#/kviz/mix"><span class="k">Mai adag</span><span class="v">0</span>
        <span class="s">Most minden kártya pihen. Jöhet egy kvíz.</span><span class="btn inv sm end" style="align-self:flex-start">Vegyes kvíz</span></a>`;

  /* Díszítő hullámvonalak a főoldal tetején. Látótéren kívül megáll. */
  function mountWave(cv) {
    const ctx = cv.getContext('2d');
    const cols = ['#2997FF', '#3DD6C4', '#B18CFF', '#FF6B8A'];
    let w = 0, h = 0, raf = 0, lat = true;
    const t0 = performance.now();
    const size = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = cv.clientWidth; h = cv.clientHeight;
      cv.width = w * dpr; cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const draw = (now) => {
      raf = 0;
      const t = (now - t0) / 1000;
      ctx.clearRect(0, 0, w, h);
      const g = ctx.createLinearGradient(0, 0, w, 0);
      cols.forEach((c, i) => g.addColorStop(i / (cols.length - 1), c));
      ctx.strokeStyle = g;
      for (let k = 0; k < 5; k++) {
        ctx.globalAlpha = 0.85 - k * 0.16;
        ctx.lineWidth = 2.2 - k * 0.3;
        ctx.beginPath();
        for (let x = 0; x <= w; x += 4) {
          const u = x / w, env = Math.sin(Math.PI * u);
          const y = h / 2 + env * h * (0.36 - k * 0.05) * Math.sin(u * (5 + k * 0.9) * Math.PI - t * (0.9 + k * 0.17) + k * 0.7);
          x ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
        }
        ctx.stroke();
      }
      if (lat && !FIZ.reduce) raf = requestAnimationFrame(draw);
    };
    const start = () => { if (!raf) raf = requestAnimationFrame(draw); };
    const resize = () => { size(); start(); };
    const io = 'IntersectionObserver' in window ? new IntersectionObserver(([en]) => { lat = en.isIntersecting; if (lat) start(); }) : null;
    if (io) io.observe(cv);
    window.addEventListener('resize', resize);
    size(); start();
    onLeave(() => { lat = false; cancelAnimationFrame(raf); window.removeEventListener('resize', resize); if (io) io.disconnect(); });
  }

  function viewLecke(id) {
    const l = lecke(id), t = tema(id);
    if (!l || !t) return view404();
    setColor(t.szin);
    S.seen[id] = Date.now(); save();
    const i = TEMAK.indexOf(t), prev = TEMAK[i - 1], next = TEMAK[i + 1];
    const st = T.stat(id);
    const reszek = [
      l.videok.length && ['s-videok', 'Videók'], ['s-kepletek', 'Képletek'], l.abrak.length && ['s-abrak', 'Próbáld ki'],
      ['s-ertheto', 'Érthetően'], ['s-csapdak', 'Csapdák'], ['s-gyak', 'Gyakorlás']
    ].filter(Boolean);
    const html = `<div class="wrap">
      <section class="hero" style="padding-bottom:48px">
        <div class="row" style="gap:12px;font-size:14px;color:var(--muted)">
          <a href="#/" style="display:inline-flex;align-items:center;gap:6px">${I.back}Leckék</a>
          <span class="pill c">${esc(t.id)}. fejezet</span><span>${t.dia} dia · kb. ${l.perc} perc</span>
          ${S.story[id] ? '<span class="pill ok">Átvéve</span>' : ''}
        </div>
        <h1 class="h1 word-rise">${esc(t.nev)}</h1>
        <p class="egy reveal">${l.egyMondat}</p>
        <div class="row reveal"><a class="btn c" href="#/sztori/${id}">Fókusz mód ${I.arrow}</a><a class="btn ghost" href="#/kartya/${id}">Kártyák</a><a class="btn ghost" href="#/kviz/${id}">Kvíz</a></div>
      </section>
      <nav class="subnav no-print" data-subnav aria-label="A lecke részei">${reszek.map(([k, n], j) => `<button data-go="${k}"${j ? '' : ' class="on"'}>${n}</button>`).join('')}</nav>
      ${l.videok.length ? `<section id="s-videok"><div class="sec-head"><h2 class="h2">Videók</h2><span>Nyomd meg a lejátszást, vagy ugorj jelenetre.</span></div><div data-videos></div></section>` : ''}
      <section id="s-kepletek">
        <div class="sec-head"><h2 class="h2">Kulcsképletek</h2><div class="row"><span class="legend"><span class="pill puska">${I.doc}Puskán</span> ott lesz a ZH-n <span class="pill fejben">${I.brain}Fejben tartsd</span> nincs a lapon</span>${takarGomb()}</div></div>
        <div class="grid${S.takar ? ' takar' : ''}" data-kgrid style="--min:320px">${l.kepletek.map((k) => kepletKartya(k, id)).join('')}</div>
      </section>
      ${l.abrak.length ? `<section id="s-abrak"><div class="sec-head"><h2 class="h2">Próbáld ki</h2><span>Húzd a csúszkákat, és nézd, mi változik.</span></div><div data-abrak></div></section>` : ''}
      <section id="s-ertheto">
        <div class="sec-head"><h2 class="h2">Érthetően</h2></div>
        <div class="grid" style="--min:340px">${l.kartyak.map((c) => `<div class="card mk reveal"><span class="k">${esc(c.k)}</span><span class="cim">${esc(c.cim)}</span><div class="tx">${c.html}</div>${c.hasonlat ? `<div class="has">${c.hasonlat}</div>` : ''}</div>`).join('')}</div>
      </section>
      <section id="s-csapdak">
        <div class="sec-head"><h2 class="h2">Csapdák a ZH-ban</h2></div>
        <div class="csapdak">${l.csapdak.map((c) => `<div class="csapda reveal">${I.warn}<span>${c}</span></div>`).join('')}</div>
        ${l.hianyzik && l.hianyzik.length ? `<p class="hiany">Nem került be (a diákon szerepel, de itt nincs kifejtve): ${l.hianyzik.map(esc).join(' · ')}</p>` : ''}
      </section>
      <section id="s-gyak">
        <div class="card gyak reveal" style="--tc:var(--ok)">
          ${FX.ring(st.pct, `<b>${st.pct}%</b>`, true)}
          <div class="tx"><p class="eyebrow">Gyakorlás</p><h3>Kérdezd ki magad.</h3><p>${st.megy} / ${st.ossz} képlet megy ebből a leckéből. Ami nem megy, hamarabb jön vissza.</p></div>
          <div class="row"><a class="btn c" href="#/kartya/${id}">Kártyák ${I.arrow}</a><a class="btn ghost" href="#/kviz/${id}">Kvíz</a></div>
        </div>
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
      olvasasSav(); szekcioFigyelo();
    } };
  }

  /* Felső olvasási sáv: mennyit görgettél a leckéből */
  function olvasasSav() {
    const bar = $('#readbar i');
    if (!bar) return;
    const f = () => { const m = document.documentElement.scrollHeight - window.innerHeight; bar.style.width = (m > 0 ? Math.min(1, window.scrollY / m) * 100 : 0) + '%'; };
    window.addEventListener('scroll', f, { passive: true });
    f();
    onLeave(() => { window.removeEventListener('scroll', f); bar.style.width = '0'; });
  }
  /* A szekció-sávban az a gomb aktív, amelyik rész épp a képernyőn van */
  function szekcioFigyelo() {
    const nav = $('[data-subnav]', app);
    if (!nav || !('IntersectionObserver' in window)) return;
    const btns = [...nav.querySelectorAll('[data-go]')];
    const io = new IntersectionObserver((es) => {
      es.forEach((en) => {
        if (!en.isIntersecting) return;
        btns.forEach((b) => {
          const on = b.dataset.go === en.target.id;
          b.classList.toggle('on', on);
          if (on && nav.scrollWidth > nav.clientWidth) nav.scrollTo({ left: b.offsetLeft - 24, behavior: FIZ.reduce ? 'auto' : 'smooth' });
        });
      });
    }, { rootMargin: '-25% 0px -65% 0px' });
    btns.forEach((b) => { const s = document.getElementById(b.dataset.go); if (s) io.observe(s); });
    onLeave(() => io.disconnect());
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
    setColor(ACC);
    const keys = Object.keys(VIDEOK);
    const html = `<div class="wrap"><section class="hero" style="padding-bottom:40px">
      <p class="eyebrow">Animált magyarázók</p><h1 class="h1 word-rise">Videók</h1>
      <p class="lead reveal">Minden fejezethez rövid, jelenetekre bontott animáció. Kapcsold be a felolvasást, és hallgasd végig.</p>
      <div class="row reveal"><a class="chip${q.t ? '' : ' on'}" href="#/videok">Mind</a>${TEMAK.filter((t) => keys.some((k) => VIDEOK[k].tema === t.id)).map((t) => `<a class="chip${q.t === t.id ? ' on' : ''}" href="#/videok?t=${t.id}" style="--c:${t.szin}">${esc(t.id + ' · ' + t.nev)}</a>`).join('')}</div>
      </section><section data-videos></section></div>`;
    return { html, after: () => {
      const host = $('[data-videos]', app);
      keys.filter((k) => !q.t || VIDEOK[k].tema === q.t).forEach((k) => {
        const t = tema(VIDEOK[k].tema);
        const wrap = document.createElement('div');
        wrap.style.setProperty('--c', t ? t.szin : ACC);
        host.appendChild(wrap);
        mountVideo(wrap, k);
      });
    } };
  }

  function viewKepletlap() {
    setColor(ACC);
    const f = q.f || 'mind';
    const szur = (k) => f === 'mind' || (f === 'puska' ? k.puska : !k.puska);
    const html = `<div class="wrap">
      <section class="hero" style="padding-bottom:24px"><p class="eyebrow">Minden fejezet</p><h1 class="h1 word-rise">Képletlap</h1>
        <p class="lead reveal">Az összes képlet egy helyen. A <b>Fejben tartsd</b> jelűek nincsenek a segédleten, ezeket tanuld meg. Kapcsold be a takarást, és idézd fel őket magadtól.</p></section>
      <div class="kl-filter no-print">
        <a class="chip ${f === 'mind' ? 'on' : ''}" href="#/kepletlap">Mind</a>
        <a class="chip ${f === 'fejben' ? 'on' : ''}" href="#/kepletlap?f=fejben">Csak fejben tartandó</a>
        <a class="chip ${f === 'puska' ? 'on' : ''}" href="#/kepletlap?f=puska">Csak puskán lévő</a>
        ${takarGomb()}
        <button class="chip" onclick="print()">Nyomtatás</button>
      </div>
      <div data-kgrid class="${S.takar ? 'takar' : ''}">
      ${TEMAK.map((t) => { const l = lecke(t.id); if (!l) return ''; const ks = l.kepletek.filter(szur); if (!ks.length) return '';
        return `<div style="--tc:${t.szin};--c:${t.szin}"><div class="kl-fej"><span class="dot"></span><h3>${esc(t.id + ' · ' + t.nev)}</h3><a href="#/lecke/${t.id}" class="no-print" style="font-size:14px">lecke →</a></div>
          <div class="grid" style="--min:300px">${ks.map((k) => kepletKartya(k, t.id)).join('')}</div></div>`; }).join('')}
      </div>
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
      <div class="kl-filter no-print">
        <a class="chip ${cur === 'mind' ? 'on' : ''}" href="#/puska">Mind (${PUSKA.length})</a>
        ${szak.map((s) => `<a class="chip ${cur === s ? 'on' : ''}" href="#/puska?sz=${encodeURIComponent(s)}">${esc(s)}</a>`).join('')}
      </div>
      <div class="grid" style="--min:340px;padding:16px 0 120px">
        ${lista.map((p) => `<div class="card kk reveal"><div class="fej"><span class="nev">${esc(p.nev)}</span>${p.lecke ? `<a href="#/lecke/${p.lecke}" style="font-size:13px;font-weight:600">${esc(p.lecke)} →</a>` : '<span class="pill fejben">nincs az előadásban</span>'}</div>
          <div class="tex">${FIZ.tex(p.tex, true)}</div>
          <div class="jelek">${p.jelek.map((j) => `<div><span class="s">${FIZ.tex(j.s)}</span><span>${j.d}</span></div>`).join('')}</div></div>`).join('')}
      </div></div>`;
  }

  function viewTerkep() {
    setColor(ACC);
    const t = tema(q.t) || TEMAK.find((x) => lecke(x.id) && lecke(x.id).kepletek.some((k) => k.bol && k.bol.length)) || TEMAK[0];
    const l = lecke(t.id);
    const html = `<div class="wrap">
      <section class="hero" style="padding-bottom:24px"><p class="eyebrow">Levezetési útvonalak</p><h1 class="h1 word-rise">Képlettérkép</h1>
        <p class="lead reveal">A nyíl azt jelenti: <b>ebből jön</b>. Ha egy képletet elfelejtesz, menj vissza a nyíl mentén, és vezesd le.</p></section>
      <div class="kl-filter">${TEMAK.filter((x) => lecke(x.id)).map((x) => `<a class="chip ${x.id === t.id ? 'on' : ''}" href="#/terkep?t=${x.id}">${esc(x.id + ' · ' + x.nev)}</a>`).join('')}</div>
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

  /* ——— Tanulás ——— */
  function viewTanul() {
    setColor(ACC);
    const st = T.stat(), ma = T.maDb(), gy = T.adag('gyenge').length, zh = T.zh();
    const utolso = zh[zh.length - 1], legjobb = zh.length ? Math.max(...zh.map((z) => z.p)) : 0;
    return `<div class="wrap">
      <section class="hero" style="padding-bottom:40px">
        <p class="eyebrow">Kérdezd ki magad</p><h1 class="h1 word-rise">Tanulás</h1>
        <p class="lead reveal">Az olvasás kevés. Itt előbb fel kell idézned a képletet, és csak utána nézed meg. Ami nem megy, hamarabb jön vissza.</p>
      </section>
      <section class="bento">
        ${maiAdagKartya(ma)}
        <a class="card stat reveal" href="#/kviz/zh"><span class="k">ZH-próba</span>
          <span class="v">${utolso ? `${utolso.p}<small>/${utolso.o}</small>` : '10'}</span>
          <span class="s">${utolso ? `Ez volt a legutóbbi. Az eddigi legjobb: ${legjobb}. A cél 7.` : 'kérdés, fejezetenként egy. A cél 7 pont.'}</span>
          <span class="btn ghost sm end" style="align-self:flex-start">${utolso ? 'Újra' : 'Indítás'}</span></a>
        <div class="card stat reveal" style="--tc:var(--ok)"><span class="k">Tudásszint</span>
          <div class="mid">${FX.ring(st.pct, `<b>${st.pct}%</b>`, true)}<div><span class="v2">${st.megy} <small>/ ${st.ossz}</small></span><br><span class="s">képlet megy fejből</span></div></div>
          <div class="row end">${gy ? `<a class="btn ghost sm" href="#/kartya/gyenge">Gyenge pontok (${gy})</a>` : ''}<a class="btn ghost sm" href="#/kviz/mix">Vegyes kvíz</a></div></div>
      </section>
      <section>
        <div class="sec-head"><h2 class="h2">Leckénként</h2><span>Kártya: felidézed és értékeled magad. Kvíz: négy válaszból választasz.</span></div>
        <div class="tl reveal">${TEMAK.filter((t) => lecke(t.id)).map((t) => { const s = T.stat(t.id); return `<div class="tl-row" style="--tc:${t.szin}"><span class="num">${esc(t.id)}</span>
          <div class="inf"><div class="nev"><a href="#/lecke/${t.id}">${esc(t.nev)}</a><span>${s.megy}/${s.ossz} megy</span></div><span class="meter"><i style="width:${s.pct}%"></i></span></div>
          <div class="acts"><a class="btn ghost sm" href="#/kartya/${t.id}">Kártyák</a><a class="btn ghost sm" href="#/kviz/${t.id}">Kvíz</a></div></div>`; }).join('')}</div>
      </section>
      <section style="padding-bottom:120px">
        <div class="sec-head"><h2 class="h2">Így működik</h2></div>
        <div class="how">
          <div class="card reveal"><b style="color:var(--bad)">Nem tudtam</b><span>A kártya még ebben a körben újra előjön.</span></div>
          <div class="card reveal"><b style="color:var(--fejben)">Majdnem</b><span>Tíz perc múlva jön vissza.</span></div>
          <div class="card reveal"><b style="color:var(--ok)">Tudtam</b><span>Egyre ritkábban jön: 4 óra, 1 nap, aztán 3 nap múlva.</span></div>
        </div>
        <p class="apro" style="margin:24px 0 16px">Egy képlet akkor számít tudottnak, ha a kártyán azt mondtad rá, hogy tudtam, vagy a kvízben eltaláltad. A kérdések a leckék képleteiből készülnek. A haladás csak ebben a böngészőben marad meg.</p>
        <button class="chip" data-reset>Tanulási haladás törlése</button>
      </section>
    </div>`;
  }

  const sessTop = (o, i, n) => `<div class="sess-top"><a class="icon-btn" href="${o.vissza}" aria-label="Kilépés (Esc)">${I.x}</a><span class="cim">${esc(o.cim)}</span>
    <div class="sess-bar" role="progressbar" aria-valuemin="0" aria-valuemax="${n}" aria-valuenow="${i}"><i style="width:${n ? (i / n) * 100 : 0}%"></i></div><span class="n">${Math.min(i + 1, n)} / ${n}</span></div>`;
  const sessCel = (mit) => {
    const t = tema(mit);
    if (t && lecke(mit)) return { cim: t.id + ' · ' + t.nev, vissza: '#/lecke/' + t.id, szin: t.szin };
    const cim = { ma: 'Mai adag', gyenge: 'Gyenge pontok', mix: 'Vegyes kvíz', zh: 'ZH-próba' }[mit];
    return cim ? { cim, vissza: '#/tanul', szin: ACC } : null;
  };

  /* Tanulókártyák: elöl a név, hátul a képlet. Megfordítod, aztán értékeled magad. */
  function viewKartya(mit) {
    const o = sessCel(mit);
    if (!o || mit === 'mix' || mit === 'zh') return view404();
    setColor(o.szin);
    return { html: '<div class="sess" data-sess></div>', after: () => kartyaKor($('[data-sess]', app), Object.assign(o, { mit })) };
  }
  function kartyaKor(el, o) {
    const sor = T.adag(o.mit).map((c) => c.id);
    const veg = {}, ujra = {};
    let i = 0, fordult = false, vege = false;
    if (!sor.length) {
      el.innerHTML = `${sessTop(o, 0, 0)}<div class="res"><h2 class="q-nev">${o.mit === 'gyenge' ? 'Nincs gyenge pont.' : 'Most nincs esedékes kártya.'}</h2>
        <p class="lead">${o.mit === 'gyenge' ? 'Amit eddig kikérdeztél, az mind megy.' : 'Minden kártya pihen. Nézz vissza később, vagy próbáld ki a kvízt.'}</p>
        <div class="row" style="justify-content:center"><a class="btn" href="#/kviz/mix">Vegyes kvíz</a><a class="btn ghost" href="#/tanul">Vissza</a></div></div>`;
      return;
    }
    const draw = () => {
      if (i >= sor.length) return osszegzes();
      const c = T.kartya(sor[i]), t = tema(c.lecke), k = c.k;
      fordult = false;
      el.classList.remove('flipped');
      el.style.setProperty('--c', t.szin);
      el.innerHTML = `${sessTop(o, i, sor.length)}
        <div class="fc" data-fc><div class="fc-in" role="button" tabindex="0" aria-label="Kártya megfordítása">
          <div class="fc-face fc-front"><p class="eyebrow">${esc(t.id + ' · ' + t.nev)}</p><h2 class="fc-nev">${esc(k.nev)}</h2>${badge(k)}
            <span class="fc-hint">Mondd ki vagy írd le a képletet. Utána fordítsd meg.</span></div>
          <div class="fc-face fc-back" aria-hidden="true"><p class="eyebrow">${esc(k.nev)}</p><div class="fc-tex">${FIZ.tex(k.tex, true)}</div>
            <div class="fc-jel">${k.jel}</div>${k.mikor ? `<div class="fc-mikor">${k.mikor}</div>` : ''}</div>
        </div></div>
        <div class="sess-ctl"><button class="btn fordit" data-flip>Megfordítom</button>
          <div class="rate"><button class="r0" data-r="0">Nem tudtam<small>újra előjön</small></button><button class="r1" data-r="1">Majdnem<small>10 perc múlva</small></button><button class="r2" data-r="2">Tudtam<small>később jön</small></button></div></div>
        <p class="kbd no-print">Szóköz: megfordít · 1, 2, 3: értékel · Esc: kilép</p>`;
      FIZ.render(el);
      $('.fc-in', el).onclick = fordit;
      $('[data-flip]', el).onclick = fordit;
      el.querySelectorAll('[data-r]').forEach((b) => (b.onclick = () => ertekel(+b.dataset.r)));
    };
    const fordit = () => {
      const fc = $('[data-fc]', el);
      if (!fc) return;
      const hatul = fc.classList.toggle('flip');
      $('.fc-front', el).setAttribute('aria-hidden', hatul);
      $('.fc-back', el).setAttribute('aria-hidden', !hatul);
      fordult = true;
      el.classList.add('flipped');
    };
    const ertekel = (j) => {
      if (!fordult || vege) return;
      const id = sor[i];
      T.ertekel(id, j);
      veg[id] = j;
      /* amit nem tudtál, pár kártyával később még egyszer megkapod (legfeljebb kétszer) */
      if (j === 0 && (ujra[id] = (ujra[id] || 0) + 1) <= 2) sor.splice(Math.min(sor.length, i + 4), 0, id);
      i++; draw();
    };
    const osszegzes = () => {
      vege = true;
      const db = [0, 1, 2].map((j) => Object.values(veg).filter((v) => v === j).length);
      const st = T.stat();
      el.classList.remove('flipped');
      el.style.setProperty('--c', o.szin);
      el.innerHTML = `${sessTop(o, sor.length, sor.length)}<div class="res">
        <p class="eyebrow">Kör vége</p><h2 class="q-nev">${db[0] + db[1] ? 'Megvan a kör.' : 'Mind ment.'}</h2>
        <div class="trio"><div><b style="color:var(--ok)">${db[2]}</b><span>tudtam</span></div><div><b style="color:var(--fejben)">${db[1]}</b><span>majdnem</span></div><div><b style="color:var(--bad)">${db[0]}</b><span>nem tudtam</span></div></div>
        <p class="lead">Összesen ${st.megy} / ${st.ossz} képlet megy.${db[0] + db[1] ? ' Ami nem ment, hamarosan újra előjön.' : ''}</p>
        <div class="row" style="justify-content:center"><button class="btn" data-again>Még egy kör</button><a class="btn ghost" href="#/kviz/${tema(o.mit) ? o.mit : 'mix'}">Kvíz</a><a class="btn ghost" href="${o.vissza}">Vissza</a></div></div>`;
      if (!(db[0] + db[1])) FX.confetti(120);
    };
    const key = (e) => {
      if (e.key === 'Escape') { location.hash = o.vissza; return; }
      if (vege) return;
      if (e.key === ' ' || e.key === 'Enter') {
        if (e.target.closest && e.target.closest('button, a')) return;
        e.preventDefault(); fordit();
      } else if (fordult && ['1', '2', '3'].includes(e.key)) ertekel(+e.key - 1);
    };
    document.addEventListener('keydown', key);
    onLeave(() => document.removeEventListener('keydown', key));
    draw();
  }

  /* Kvíz: a kérdéseket a tanul.js állítja össze a leckék képleteiből */
  function viewKviz(mit) {
    const o = sessCel(mit);
    if (!o || mit === 'ma' || mit === 'gyenge') return view404();
    setColor(o.szin);
    return { html: '<div class="sess" data-sess></div>', after: () => kvizKor($('[data-sess]', app), Object.assign(o, { mit })) };
  }
  function kvizKor(el, o) {
    const qs = T.kviz(o.mit);
    const hibak = [];
    let i = 0, pont = 0, valaszolt = false, vege = false;
    const qLecke = (k) => k.lecke || (T.kartya(k.kartya) || {}).lecke;
    const targy = (k) => {
      const g = k.targy;
      if (k.tipus === 'keplet') return `<h2 class="q-nev">${esc(g.szoveg)}</h2>`;
      if (k.tipus === 'nev') return `<div class="q-tex">${FIZ.tex(g.tex, true)}</div>`;
      if (k.tipus === 'puska') return `<h2 class="q-nev">${esc(g.szoveg)}</h2><div class="q-tex">${FIZ.tex(g.tex, true)}</div>`;
      return `<p class="q-nev kis">${esc(g.szoveg)}</p><div class="q-tex">${FIZ.tex(g.tex, true)}</div><span class="q-jel">A kérdezett jel: <b>${FIZ.tex(g.jel)}</b></span>`;
    };
    const magy = (k, jo) => {
      const c = k.kartya && T.kartya(k.kartya);
      let b = `<span class="v ${jo ? 'jo' : 'rossz'}">${jo ? 'Jó válasz.' : 'Nem ez volt. A helyes válasz zölddel van jelölve.'}</span>`;
      if (k.tipus === 'jel') b += `<div class="jelek">${k.magyarazat.map((j) => `<div><span class="s">${FIZ.tex(j.s)}</span><span>${j.d}</span></div>`).join('')}</div>`;
      else if (c) b += `<div class="row" style="gap:10px"><b>${esc(c.k.nev)}</b>${badge(c.k)}</div><div class="tex">${FIZ.tex(c.k.tex, true)}</div><div class="tx">${c.k.jel}</div>${c.k.mikor ? `<div class="tx">${c.k.mikor}</div>` : ''}`;
      return `<div class="q-magy">${b}</div><button class="btn" data-next style="align-self:flex-end">${i < qs.length - 1 ? 'Tovább' : 'Eredmény'} ${I.arrow}</button>`;
    };
    const draw = () => {
      if (i >= qs.length) return osszegzes();
      const k = qs[i], t = tema(qLecke(k));
      valaszolt = false;
      el.style.setProperty('--c', t ? t.szin : o.szin);
      el.innerHTML = `${sessTop(o, i, qs.length)}
        <div class="q-card"><p class="eyebrow">${t ? esc(t.id + ' · ' + t.nev) : ''}</p><p class="q-k">${k.kerdes}</p>${targy(k)}
          <div class="q-opts" role="group" aria-label="Válaszok">${k.opciok.map((op, j) => `<button class="q-opt" data-o="${j}"><span class="n">${j + 1}</span><span class="o">${op.tex ? FIZ.tex(op.tex) : k.tipus === 'jel' ? op.szoveg : esc(op.szoveg)}</span></button>`).join('')}</div>
          <div data-magy aria-live="polite" style="display:contents"></div></div>
        <p class="kbd no-print">1–${k.opciok.length}: válasz · Enter: tovább · Esc: kilép</p>`;
      FIZ.render(el);
      el.querySelectorAll('[data-o]').forEach((b) => (b.onclick = () => valasz(+b.dataset.o)));
    };
    const valasz = (j) => {
      if (valaszolt || vege) return;
      const k = qs[i];
      if (!k.opciok[j]) return;
      valaszolt = true;
      const jo = !!k.opciok[j].jo;
      if (jo) pont++; else hibak.push(k);
      T.kvizValasz(k, jo);
      el.querySelectorAll('[data-o]').forEach((b) => {
        const op = k.opciok[+b.dataset.o];
        b.disabled = true;
        b.classList.add(op.jo ? 'jo' : +b.dataset.o === j ? 'rossz' : 'halv');
      });
      const m = $('[data-magy]', el);
      m.innerHTML = magy(k, jo);
      FIZ.render(m);
      const nb = $('[data-next]', el);
      nb.onclick = tovabb;
      nb.focus({ preventScroll: true });
      nb.scrollIntoView({ block: 'nearest', behavior: FIZ.reduce ? 'auto' : 'smooth' });
    };
    const tovabb = () => { if (!valaszolt) return; i++; draw(); window.scrollTo(0, 0); };
    const osszegzes = () => {
      vege = true;
      const n = qs.length, zh = o.mit === 'zh';
      if (zh) T.zhMent(pont, n);
      const megvan = zh ? pont >= 7 : pont === n;
      el.style.setProperty('--c', o.szin);
      el.innerHTML = `${sessTop(o, n, n)}<div class="res">
        <p class="eyebrow">${zh ? 'ZH-próba' : 'Kvíz vége'}</p>
        <div class="big" style="color:${megvan ? 'var(--ok)' : 'var(--fg)'}">${pont}<small> / ${n}</small></div>
        <p class="lead">${zh ? (pont >= 7 ? 'Ez megvan. A cél a 7 pont volt.' : `Még ${7 - pont} pont kell a 7-hez. Nézd át, ami nem ment.`) : (pont === n ? 'Hibátlan.' : 'Ami nem ment, hamarosan újra előjön a kártyák között.')}</p>
        ${hibak.length ? `<div class="tl hibak">${hibak.map((k) => { const c = k.kartya && T.kartya(k.kartya), lid = qLecke(k), t = tema(lid); return `<a href="#/lecke/${lid}"><b>${esc(c ? c.k.nev : k.targy.szoveg)}</b><span>${t ? esc(t.id + ' · ' + t.nev) : ''} →</span></a>`; }).join('')}</div>` : ''}
        <div class="row" style="justify-content:center"><button class="btn" data-again>${zh ? 'Új próba' : 'Új kvíz'}</button>${hibak.length ? '<a class="btn ghost" href="#/kartya/gyenge">Gyenge pontok kártyán</a>' : ''}<a class="btn ghost" href="${o.vissza}">Vissza</a></div>
        ${zh ? '<p class="apro">Saját gyakorló kérdések a leckék képleteiből. Nem a valódi ZH kérdései, és a pontszám sem a ZH pontozása.</p>' : ''}</div>`;
      if (megvan) FX.confetti(140);
    };
    const key = (e) => {
      if (e.key === 'Escape') { location.hash = o.vissza; return; }
      if (vege) return;
      if (!valaszolt && /^[1-4]$/.test(e.key)) valasz(+e.key - 1);
      else if (valaszolt && (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight')) {
        if (e.key !== 'ArrowRight' && e.target.closest && e.target.closest('button, a')) return;
        e.preventDefault(); tovabb();
      }
    };
    document.addEventListener('keydown', key);
    onLeave(() => document.removeEventListener('keydown', key));
    draw();
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
      <div class="row">${TEMAK[TEMAK.indexOf(t) + 1] ? `<a class="btn c" href="#/sztori/${TEMAK[TEMAK.indexOf(t) + 1].id}">Következő: ${esc(TEMAK[TEMAK.indexOf(t) + 1].nev)}</a>` : ''}<a class="btn ghost" href="#/kartya/${id}">Kérdezd ki magad</a><a class="btn ghost" href="#/lecke/${id}">Vissza a leckéhez</a></div>`, beats: 0, end: true });

    const el = document.createElement('div');
    el.className = 'story'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-label', 'Fókusz mód: ' + t.nev);
    document.body.appendChild(el);
    document.body.style.overflow = 'hidden';
    let si = 0, bi = 0, dir = 1;
    const draw = () => {
      const s = slides[si];
      el.innerHTML = `<div class="bars">${slides.map((_, i) => `<i class="${i < si ? 'done' : i === si ? 'cur' : ''}"></i>`).join('')}</div>
        <div class="top"><span>${si + 1} / ${slides.length}</span><button class="icon-btn" data-x aria-label="Bezárás (Esc)">${I.x}</button></div>
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

  /* ——— ZH Roadmap: állomások, elméleti kérdések, levezetett feladatok. Adat: FIZ_ROADMAP (data/roadmap/*.js) ——— */
  const ROAD = window.FIZ_ROADMAP || [];
  const RKEY = 'fiz.road.v1';
  let RS = { e: {}, f: {}, g: {} };
  try { const r = JSON.parse(localStorage.getItem(RKEY) || '{}'); ['e', 'f', 'g'].forEach((k) => { if (r[k]) RS[k] = r[k]; }); } catch (e) {}
  const rSave = () => { try { localStorage.setItem(RKEY, JSON.stringify(RS)); } catch (e) {} };
  const allomas = (id) => ROAD.find((s) => s.id === id);
  const rSzin = (s) => (tema(s.leckek[0]) || {}).szin || ACC;
  const rStat = (s) => {
    const e = s.elmelet.filter((_, i) => RS.e[s.id + '|' + i]).length;
    const f = s.feladatok.filter((x) => RS.f[s.id + '|' + x.id]).length;
    const g = s.gyakorlo.filter((x) => RS.g[s.id + '|' + x.id]).length;
    const ne = s.elmelet.length, nf = s.feladatok.length, ng = s.gyakorlo.length;
    const kesz = e + f + g, ossz = ne + nf + ng;
    return { e, f, g, ne, nf, ng, kesz, ossz, pct: ossz ? Math.round((kesz / ossz) * 100) : 0 };
  };
  const rOssz = () => {
    const o = { kesz: 0, ossz: 0, e: 0, ne: 0, f: 0, nf: 0, g: 0, ng: 0 };
    ROAD.forEach((s) => { const st = rStat(s); Object.keys(o).forEach((k) => { o[k] += st[k]; }); });
    o.pct = o.ossz ? Math.round((o.kesz / o.ossz) * 100) : 0;
    return o;
  };
  const rPerc = (p) => (p >= 60 ? Math.floor(p / 60) + ' óra' + (p % 60 ? ' ' + (p % 60) + ' perc' : '') : p + ' perc');
  const maStr = () => { const d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };
  /* Menetrend: melyik állomás mikorra jut. Az extra sorok ismétlő körök. */
  const TERV = [
    { nap: 'Szombat', datum: '2026-11-28', cim: 'A három nagy mechanika-téma', all: ['lendulet', 'pontrendszerek', 'merev'] },
    { nap: 'Vasárnap délelőtt', datum: '2026-11-29', cim: 'Rezgések és rugalmasságtan', all: ['rezgesek', 'rugalmassag'] },
    { nap: 'Vasárnap délután', datum: '2026-11-29', cim: 'Hullám, hang, fény', all: ['hullamtan', 'hangtan', 'optika'] },
    { nap: 'Vasárnap este', datum: '2026-11-29', cim: 'Ismétlés', extra: [
      { jel: 'E', nev: 'Elmélet gyorskör', sub: 'Minden elméleti kérdés egy helyen. Takard le, mondd ki, ellenőrizd.', href: '#/roadmap/elmelet', perc: 40, gomb: 'Indítás' },
      { jel: 'ZH', nev: 'ZH-feladatok újra', sub: 'A próba-ZH-k és a MINTA vizsga számolós feladatai, most már segítség nélkül.', href: '#/roadmap/zh', perc: 60, gomb: 'Indítás' }] },
    { nap: 'Hétfő reggel', datum: '2026-11-30', cim: 'Bemelegítés a ZH előtt', extra: [
      { jel: 'E', nev: 'Elmélet átfutás', sub: 'Csak azok a kérdések, amelyek még nem mennek.', href: '#/roadmap/elmelet?nem=1', perc: 20, gomb: 'Indítás' },
      { jel: '★', nev: 'Aranyszabályok', sub: 'Egy perc, mielőtt beülsz. Mértékegység, átváltás, sorrend.', go: 'r-arany', perc: 5, gomb: 'Megnézem' }] }
  ];
  const ARANY = [
    'Minden számolós feladatnál ugyanaz a sorrend: <b>adatok SI-ben → képlet betűkkel → behelyettesítés → eredmény mértékegységgel</b>. Így a tanár is, te is követni tudod.',
    'A tanár megoldásaiban $g = 10\\,\\mathrm{m/s^2}$. Ahol mással számolt, azt a feladatnál jelöltük.',
    'Átváltások, mielőtt bármit beírsz: cm → m, g → kg, km/h → m/s (osztás 3,6-tal), mm² → m² (szorzás $10^{-6}$-nal), fordulat → radián (szorzás $2\\pi$-vel).',
    'Rezgésnél és hullámnál a számológép legyen <b>radián</b> módban, ha szinusz vagy koszinusz kell.',
    'Elméleti kérdésre egy-két mondat elég, de legyen benne a <b>kulcsszó</b>. Ha a kérdés két részből áll, mindkettőre felelj.',
    'Kezdd az elmélettel, utána jöjjön az a számolós feladat, amelyik a legismerősebb. Ami nem megy, azt hagyd a végére.',
    'Ami a segédleten rajta van, azt nem kell magolni, de tudd, hol találod. Nézd át a <a href="#/puska">puska-dekódert</a>.',
    'Kinematika és dinamika külön nem lesz, de egy összetett feladat része lehet (például ütközés utáni hajítás). Az alapképleteket tartsd fejben.'
  ];

  /* Elméleti kérdés: lenyíló kártya. Előbb mondd ki a választ, aztán nyisd ki. */
  const rKerdes = (s, e, i) => {
    const k = s.id + '|' + i;
    return `<details class="rq${RS.e[k] ? ' ok' : ''}" data-rk="e" data-rid="${k}">
      <summary><span class="no">${i + 1}</span><span class="qq"><span class="q">${e.k}</span><span class="src">${esc(e.forras || '')}</span></span>${I.chev}</summary>
      <div class="body"><span class="lab">Tanári mintaválasz</span><div class="v">${e.v}</div>
        ${e.trukk ? `<div class="trukk">${e.trukk}</div>` : ''}
        <div class="row"><button class="chip jo" data-rjel="1">Tudtam</button><button class="chip" data-rjel="0">Még nem megy</button></div></div>
    </details>`;
  };
  /* Levezetés: számozott lépések idővonalon — cím, magyarázat, képlet, behelyettesítés, részeredmény */
  const rLepesek = (f) => `<ol class="steps">${f.lepesek.map((l, i) => `<li><span class="sn">${i + 1}</span><div class="sb">
      <h4>${l.cim}</h4>${l.szoveg ? `<p>${l.szoveg}</p>` : ''}
      ${l.tex ? `<div class="sf">${FIZ.tex(l.tex, true)}</div>` : ''}
      ${l.be ? `<div class="sf be"><span class="lab">Behelyettesítve</span>${FIZ.tex(l.be, true)}</div>` : ''}
      ${l.er ? `<div class="ser">${FIZ.tex(l.er)}</div>` : ''}
      ${l.megj ? `<p class="smj">${l.megj}</p>` : ''}</div></li>`).join('')}</ol>`;
  const rFeladat = (s, f) => {
    const k = s.id + '|' + f.id, kesz = !!RS.f[k];
    return `<article class="card fel reveal${kesz ? ' kesz' : ''}" data-rk="f" data-rid="${k}">
      <div class="fej">${f.zh ? '<span class="pill zh">ZH-feladat</span>' : ''}<span class="pill c">${esc(f.forras || '')}</span><span class="pill ok kp">Megvan</span></div>
      <h3>${f.cim}</h3>
      <p class="szov">${f.szoveg}</p>
      ${f.adatok && f.adatok.length ? `<div class="adatok">${f.adatok.map((a) => `<span>${FIZ.tex(a)}</span>`).join('')}</div>` : ''}
      ${f.tipp ? `<details class="dd tp"><summary>${I.chev}Tipp, ha elakadtál</summary><div class="in">${f.tipp}</div></details>` : ''}
      <details class="dd mo"><summary>${I.chev}Levezetés lépésről lépésre<span class="n">${f.lepesek.length} lépés</span></summary><div class="in">
        ${rLepesek(f)}
        <div class="valasz"><span class="lab">Végeredmény</span>${FIZ.tex(f.valasz, true)}</div>
        ${f.megj ? `<p class="smj">${f.megj}</p>` : ''}
      </div></details>
      <div class="row"><button class="chip jo" data-rjel="t" aria-pressed="${kesz}">${kesz ? 'Megvan ✓' : 'Megcsináltam egyedül'}</button></div>
    </article>`;
  };
  const rGyakorlo = (s, g) => {
    const k = s.id + '|' + g.id, kesz = !!RS.g[k];
    return `<article class="card fel gy reveal${kesz ? ' kesz' : ''}" data-rk="g" data-rid="${k}">
      <div class="fej"><span class="pill c">${esc(g.forras || '')}</span><span class="pill ok kp">Megvan</span></div>
      <p class="szov">${g.szoveg}</p>
      ${g.tipp ? `<details class="dd tp"><summary>${I.chev}Tipp</summary><div class="in">${g.tipp}</div></details>` : ''}
      <details class="dd mo"><summary>${I.chev}Végeredmény</summary><div class="in"><div class="valasz"><span class="lab">Ennyi jön ki</span>${FIZ.tex(g.valasz, true)}</div></div></details>
      <div class="row"><button class="chip jo" data-rjel="t" aria-pressed="${kesz}">${kesz ? 'Megvan ✓' : 'Kijött'}</button></div>
    </article>`;
  };
  const rSzamlalo = (s, k) => { const st = rStat(s); return `<span data-rszam="${s.id}|${k}">${st[k]} / ${st['n' + k]} megvan</span>`; };

  /* Főoldali belépő a Roadmaphez */
  function roadBanner() {
    if (!ROAD.length) return '';
    const o = rOssz(), kov = ROAD.find((s) => rStat(s).pct < 100) || ROAD[0];
    return `<section><div class="card gyak rm-banner reveal" style="--tc:var(--accent)">
      ${FX.ring(o.pct, `<b>${o.pct}%</b>`, true)}
      <div class="tx"><p class="eyebrow">ZH Roadmap · új</p><h3>Vezetett felkészülés hétfőig.</h3>
        <p>${ROAD.length} állomás, ${o.ne} elméleti kérdés a tanár válaszaival, ${o.nf} lépésenként levezetett feladat a próba-ZH-kból és a gyakorló sorokból.</p></div>
      <div class="row"><a class="btn" href="#/roadmap">Roadmap ${I.arrow}</a><a class="btn ghost" href="#/roadmap/${kov.id}">${o.kesz ? 'Folytatás' : 'Kezdés'}: ${esc(kov.nev)}</a></div>
    </div></section>`;
  }

  function viewRoadmap() {
    setColor(ACC);
    if (!ROAD.length) return view404();
    const o = rOssz(), ma = maStr();
    const ora = Math.max(0, Math.round((ZH - new Date()) / 36e5));
    const kov = ROAD.find((s) => rStat(s).pct < 100) || ROAD[0];
    const zhDb = ROAD.reduce((n, s) => n + s.feladatok.filter((f) => f.zh).length, 0);
    const sor = (s) => { const st = rStat(s), i = ROAD.indexOf(s), fo = s === kov && st.pct < 100; return `<div class="tl-row" style="--tc:${rSzin(s)}"><span class="num">${String(i + 1).padStart(2, '0')}</span>
      <div class="inf"><div class="nev"><a href="#/roadmap/${s.id}">${esc(s.nev)}</a><span>${st.kesz}/${st.ossz}</span></div>
        <span class="sub">${st.ne} elméleti kérdés${st.nf ? ` · ${st.nf} levezetés` : ''}${st.ng ? ` · ${st.ng} gyakorló` : ''} · kb. ${rPerc(s.perc)}</span>
        <span class="meter"><i style="width:${st.pct}%"></i></span></div>
      <div class="acts"><a class="btn ${fo ? 'c' : 'ghost'} sm" href="#/roadmap/${s.id}"${fo ? ` style="--c:${rSzin(s)}"` : ''}>${st.pct >= 100 ? 'Kész ✓' : st.kesz ? 'Folytatás' : 'Kezdés'}</a></div></div>`; };
    const extra = (x) => `<div class="tl-row" style="--tc:var(--accent)"><span class="num jel">${x.jel}</span>
      <div class="inf"><div class="nev">${x.href ? `<a href="${x.href}">${x.nev}</a>` : `<a href="#/roadmap" data-go="${x.go}">${x.nev}</a>`}<span>kb. ${rPerc(x.perc)}</span></div><span class="sub">${x.sub}</span></div>
      <div class="acts">${x.href ? `<a class="btn ghost sm" href="${x.href}">${x.gomb}</a>` : `<button class="btn ghost sm" data-go="${x.go}">${x.gomb}</button>`}</div></div>`;
    return `<div class="wrap">
      <section class="hero mid">
        <p class="eyebrow">ZH Roadmap · hétfő, november 30.</p>
        <h1 class="h-hero word-rise">Roadmap.<br><span class="dim">Lépésről lépésre.</span></h1>
        <p class="lead reveal">Nyolc állomás a hétfői ZH-ig. Mindegyiken ott vannak az <b>elméleti kérdések a tanár válaszaival</b>, a feladattípusok receptjei és a <b>próba-ZH-k feladatai lépésenként levezetve</b>.</p>
        <div class="row reveal"><a class="btn" href="#/roadmap/${kov.id}">${o.kesz ? 'Folytatás' : 'Kezdjük'}: ${esc(kov.nev)} ${I.arrow}</a><a class="btn ghost" href="#/roadmap/elmelet">Elmélet gyorskör</a></div>
      </section>
      <section class="bento">
        <div class="card stat reveal"><span class="k">ZH-ig</span>
          <span class="v">${ora > 48 ? `<span data-count="${Math.ceil(ora / 24)}">${Math.ceil(ora / 24)}</span> <small>nap</small>` : ora ? `<span data-count="${ora}">${ora}</span> <small>óra</small>` : 'Ma'}</span>
          <span class="s end">Hétfő, november 30. A terv összesen kb. ${rPerc(ROAD.reduce((n, s) => n + s.perc, 0))} tanulás.</span></div>
        <div class="card stat reveal" style="--tc:var(--ok)"><span class="k">Haladás</span>
          <div class="mid">${FX.ring(o.pct, `<b>${o.pct}%</b>`, true)}<div><span class="v2">${o.kesz} <small>/ ${o.ossz}</small></span><br><span class="s">tétel megvan</span></div></div>
          <span class="s end">${o.e}/${o.ne} elméleti kérdés · ${o.f}/${o.nf} levezetés · ${o.g}/${o.ng} gyakorló</span></div>
        <div class="card stat reveal"><span class="k">Ilyen egy próba-ZH</span>
          <span class="v2" style="margin-top:8px">5 <small>elmélet</small> + 3 <small>számolás</small></span>
          <span class="s">Témánként öt elméleti kérdés 1–1 pontért és három számolós feladat 1–2 pontért: összesen 10 pont. A MINTA vizsgán tíz elméleti kérdés és öt számolós feladat volt.</span>
          <span class="s end">Optikából csak elmélet lesz. Hőtan nincs.</span></div>
      </section>
      <section id="r-terv">
        <div class="sec-head"><h2 class="h2">Menetrend</h2><span>Sorban haladj. Ha kevés az idő: elmélet, aztán a ZH-jelölésű levezetések.</span></div>
        ${TERV.map((b) => { const p = (b.all || []).reduce((n, id) => n + (allomas(id) || { perc: 0 }).perc, 0) + (b.extra || []).reduce((n, x) => n + x.perc, 0);
          return `<div class="rm-day${b.datum === ma ? ' ma' : ''} reveal"><div class="dfej"><b>${b.nap}</b>${b.datum === ma ? '<span class="pill c">Ma</span>' : ''}<span>${b.cim} · kb. ${rPerc(p)}</span></div>
          <div class="tl">${(b.all || []).map((id) => allomas(id)).filter(Boolean).map(sor).join('')}${(b.extra || []).map(extra).join('')}</div></div>`; }).join('')}
      </section>
      <section>
        <div class="sec-head"><h2 class="h2">Így haladj egy állomáson</h2><span>Mindegyik ugyanúgy épül fel.</span></div>
        <div class="how rm-how">
          <div class="card reveal"><b><i>1</i>Elmélet</b><span>Olvasd el a kérdést, mondd ki hangosan a választ, és csak utána nyisd ki. Ezekből lesz az öt gyors pont.</span></div>
          <div class="card reveal"><b><i>2</i>Receptek</b><span>Minden feladattípushoz egy rövid lépéssor. Erről ismered fel a ZH-ban, hogy mit kell csinálni.</span></div>
          <div class="card reveal"><b><i>3</i>Levezetések</b><span>Előbb próbáld meg papíron. Ha elakadsz, jöhet a tipp, és csak a végén a teljes levezetés.</span></div>
          <div class="card reveal"><b><i>4</i>Gyakorló</b><span>Itt már csak a végeredményt látod. Ha kijön, megy a típus.</span></div>
        </div>
      </section>
      <section id="r-arany" style="padding-bottom:120px">
        <div class="sec-head"><h2 class="h2">Aranyszabályok</h2><span>Ezt olvasd el hétfő reggel is.</span></div>
        <ol class="arany">${ARANY.map((a) => `<li class="reveal">${a}</li>`).join('')}</ol>
        <p class="apro" style="margin-top:28px">Az elméleti válaszok és a levezetések a tanár próba-ZH-iból, a MINTA vizsgából és a gyakorló feladatsorok megoldásaiból készültek (${zhDb} ZH-feladat). Ahol a saját számolás eltér a tanárétól, ott mindkét érték szerepel. A haladás csak ebben a böngészőben marad meg.</p>
        <button class="chip" data-rreset style="margin-top:8px">Roadmap-haladás törlése</button>
      </section>
    </div>`;
  }

  function viewRoadmapAllomas(id) {
    const s = allomas(id);
    if (!s) return view404();
    setColor(rSzin(s));
    const i = ROAD.indexOf(s), prev = ROAD[i - 1], next = ROAD[i + 1], st = rStat(s);
    const reszek = [['r-elmelet', 'Elmélet'], s.receptek.length && ['r-receptek', 'Receptek'], s.tippek.length && ['r-tippek', 'Tippek'],
      s.feladatok.length && ['r-levezetes', 'Levezetések'], s.gyakorlo.length && ['r-gyakorlo', 'Gyakorló']].filter(Boolean);
    const html = `<div class="wrap">
      <section class="hero" style="padding-bottom:48px">
        <div class="row" style="gap:12px;font-size:14px;color:var(--muted)">
          <a href="#/roadmap" style="display:inline-flex;align-items:center;gap:6px">${I.back}Roadmap</a>
          <span class="pill c">${i + 1}. állomás</span><span>kb. ${rPerc(s.perc)}</span>
        </div>
        <h1 class="h1 word-rise">${esc(s.nev)}</h1>
        <p class="egy reveal">${s.lenyeg}</p>
        <div class="row reveal rm-foot" data-rring="${s.id}">${FX.ring(st.pct, `<b>${st.pct}</b>`)}<span class="rm-prog"><b data-rszam="${s.id}|kesz">${st.kesz} / ${st.ossz}</b> tétel megvan</span>
          ${s.leckek.map((l) => { const t = tema(l); return t ? `<a class="btn ghost sm" href="#/lecke/${l}">Lecke: ${esc(t.nev)}</a>` : ''; }).join('')}</div>
      </section>
      <nav class="subnav no-print" data-subnav aria-label="Az állomás részei">${reszek.map(([k, n], j) => `<button data-go="${k}"${j ? '' : ' class="on"'}>${n}</button>`).join('')}</nav>
      <section id="r-elmelet">
        <div class="sec-head"><h2 class="h2">Elméleti kérdések</h2><span>Mondd ki a választ, aztán nyisd ki. ${rSzamlalo(s, 'e')}</span></div>
        <div class="rqs">${s.elmelet.map((e, j) => rKerdes(s, e, j)).join('')}</div>
      </section>
      ${s.receptek.length ? `<section id="r-receptek">
        <div class="sec-head"><h2 class="h2">Receptek</h2><span>Feladattípusonként: miről ismered fel, és mit csinálj.</span></div>
        <div class="grid" style="--min:380px">${s.receptek.map((r) => `<div class="card rc reveal"><span class="cim">${r.cim}</span>
          ${r.mikor ? `<span class="mikor">${r.mikor}</span>` : ''}<ol>${r.lepesek.map((x) => `<li>${x}</li>`).join('')}</ol>
          ${r.tex ? `<div class="sf">${FIZ.tex(r.tex, true)}</div>` : ''}</div>`).join('')}</div>
      </section>` : ''}
      ${s.tippek.length ? `<section id="r-tippek">
        <div class="sec-head"><h2 class="h2">Tippek és trükkök</h2></div>
        <div class="csapdak">${s.tippek.map((c) => `<div class="csapda tipp reveal">${I.bulb}<span>${c}</span></div>`).join('')}</div>
      </section>` : ''}
      ${s.feladatok.length ? `<section id="r-levezetes">
        <div class="sec-head"><h2 class="h2">Levezetett feladatok</h2><span>Elöl a ZH-feladatok. Előbb papíron, aztán a levezetés. ${rSzamlalo(s, 'f')}</span></div>
        <div class="fels">${s.feladatok.map((f) => rFeladat(s, f)).join('')}</div>
      </section>` : ''}
      ${s.gyakorlo.length ? `<section id="r-gyakorlo">
        <div class="sec-head"><h2 class="h2">Gyakorló feladatok</h2><span>Csak végeredmény van. ${rSzamlalo(s, 'g')}</span></div>
        <div class="fels">${s.gyakorlo.map((g) => rGyakorlo(s, g)).join('')}</div>
      </section>` : ''}
      <footer class="pn">
        ${prev ? `<a href="#/roadmap/${prev.id}"><span>Előző állomás</span><b>${esc(prev.nev)}</b></a>` : `<a href="#/roadmap"><span>Vissza</span><b>Roadmap</b></a>`}
        <span class="src">Forrás: próba-ZH, MINTA vizsga, gyakorló feladatsorok</span>
        ${next ? `<a href="#/roadmap/${next.id}" style="text-align:right"><span>Következő állomás</span><b>${esc(next.nev)}</b></a>` : `<a href="#/roadmap/elmelet" style="text-align:right"><span>Következő</span><b>Elmélet gyorskör</b></a>`}
      </footer>
    </div>`;
    return { html, after: () => { olvasasSav(); szekcioFigyelo(); } };
  }

  /* Gyűjtő nézetek: minden elméleti kérdés, illetve minden ZH-feladat egy oldalon */
  function viewRoadmapGyujto(mit) {
    setColor(ACC);
    const elm = mit === 'elmelet', csakNem = elm && q.nem === '1';
    const o = rOssz();
    const blokk = ROAD.map((s) => {
      const tetelek = elm
        ? s.elmelet.map((e, j) => (csakNem && RS.e[s.id + '|' + j] ? '' : rKerdes(s, e, j))).filter(Boolean)
        : s.feladatok.filter((f) => f.zh).map((f) => rFeladat(s, f));
      if (!tetelek.length) return '';
      return `<section style="--c:${rSzin(s)}" id="g-${s.id}"><div class="sec-head"><h2 class="h2">${esc(s.nev)}</h2><span><a href="#/roadmap/${s.id}">Az állomás megnyitása</a> · ${rSzamlalo(s, elm ? 'e' : 'f')}</span></div>
        <div class="${elm ? 'rqs' : 'fels'}">${tetelek.join('')}</div></section>`;
    }).join('');
    const zhDb = ROAD.reduce((n, s) => n + s.feladatok.filter((f) => f.zh).length, 0);
    return `<div class="wrap">
      <section class="hero" style="padding-bottom:40px">
        <div class="row" style="gap:12px;font-size:14px;color:var(--muted)"><a href="#/roadmap" style="display:inline-flex;align-items:center;gap:6px">${I.back}Roadmap</a></div>
        <h1 class="h1 word-rise">${elm ? 'Elmélet gyorskör' : 'ZH-feladatok'}</h1>
        <p class="lead reveal">${elm
          ? `Mind a ${o.ne} elméleti kérdés a próba-ZH-kból és a MINTA vizsgából, a tanár válaszaival. Mondd ki a választ, nyisd ki, és jelöld, hogy ment-e. Eddig <b>${o.e} megy</b>.`
          : `A próba-ZH-k és a MINTA vizsga mind a ${zhDb} számolós feladata. Most már papíron, segítség nélkül: a levezetést csak ellenőrzésre nyisd ki.`}</p>
        ${elm ? `<div class="row reveal"><a class="chip${csakNem ? '' : ' on'}" href="#/roadmap/elmelet">Mind</a><a class="chip${csakNem ? ' on' : ''}" href="#/roadmap/elmelet?nem=1">Csak ami még nem megy (${o.ne - o.e})</a></div>` : ''}
      </section>
      ${blokk || `<section><div class="card"><b style="font-size:22px">Minden kérdés megy.</b><span style="color:var(--muted)">Nincs olyan elméleti kérdés, amit ne jelöltél volna tudottnak.</span><a class="btn sm" style="align-self:flex-start" href="#/roadmap/zh">Jöhetnek a ZH-feladatok</a></div></section>`}
      <footer class="pn"><a href="#/roadmap"><span>Vissza</span><b>Roadmap</b></a><span class="src"></span>
        ${elm ? `<a href="#/roadmap/zh" style="text-align:right"><span>Következő</span><b>ZH-feladatok</b></a>` : `<a href="#/roadmap/elmelet" style="text-align:right"><span>Következő</span><b>Elmélet gyorskör</b></a>`}</footer>
    </div>`;
  }

  /* Egy tétel megjelölése: állapot mentése, kártya és számlálók frissítése újrarajzolás nélkül */
  function rJelol(btn) {
    const el = btn.closest('[data-rk]');
    if (!el) return;
    const k = el.dataset.rk, id = el.dataset.rid, s = allomas(id.split('|')[0]);
    if (!s) return;
    const elotte = rStat(s).pct;
    const be = k === 'e' ? btn.dataset.rjel === '1' : !RS[k][id];
    if (be) RS[k][id] = 1; else delete RS[k][id];
    rSave();
    if (k === 'e') { el.classList.toggle('ok', be); el.open = false; }
    else {
      el.classList.toggle('kesz', be);
      btn.setAttribute('aria-pressed', be);
      btn.textContent = be ? 'Megvan ✓' : k === 'f' ? 'Megcsináltam egyedül' : 'Kijött';
    }
    const st = rStat(s);
    app.querySelectorAll('[data-rszam]').forEach((x) => {
      const [sid, kk] = x.dataset.rszam.split('|');
      if (sid !== s.id) return;
      x.textContent = kk === 'kesz' ? `${st.kesz} / ${st.ossz}` : `${st[kk]} / ${st['n' + kk]} megvan`;
    });
    const rw = $(`[data-rring="${s.id}"]`, app);
    if (rw) { const r = rw.querySelector('.ring'); r.dataset.ring = st.pct; r.querySelector('b').textContent = st.pct; FX.rings(rw); }
    if (st.pct >= 100 && elotte < 100) { FX.confetti(); FX.toast('Állomás kész: ' + s.nev); }
  }

  function view404() {
    setColor(ACC);
    return `<div class="wrap empty"><h1 class="h1">Nincs ilyen oldal.</h1><p class="lead">Lehet, hogy elírás van a címben.</p><a class="btn" href="#/">Vissza a leckékhez</a></div>`;
  }

  /* Közös kattintáskezelés: takarás, szekció-ugrás, új kör, törlés */
  app.addEventListener('click', (e) => {
    const tk = e.target.closest('[data-takar]');
    if (tk) {
      S.takar = !S.takar; save();
      app.querySelectorAll('[data-kgrid]').forEach((g) => { g.classList.toggle('takar', S.takar); g.querySelectorAll('.lat').forEach((x) => x.classList.remove('lat')); });
      app.querySelectorAll('[data-takar]').forEach((b) => { b.textContent = 'Takarás: ' + (S.takar ? 'be' : 'ki'); b.setAttribute('aria-pressed', S.takar); b.classList.toggle('on', S.takar); });
      return;
    }
    const kk = e.target.closest('.takar .kk');
    if (kk) { kk.classList.toggle('lat'); return; }
    const rj = e.target.closest('[data-rjel]');
    if (rj) { rJelol(rj); return; }
    if (e.target.closest('[data-rreset]')) {
      if (window.confirm('Törlöd a Roadmap-haladást? A kártyák és a kvíz állapota megmarad.')) { RS = { e: {}, f: {}, g: {} }; rSave(); FX.toast('Törölve'); route(); }
      return;
    }
    const go = e.target.closest('[data-go]');
    if (go) { e.preventDefault(); const s = document.getElementById(go.dataset.go); if (s) s.scrollIntoView({ behavior: FIZ.reduce ? 'auto' : 'smooth', block: 'start' }); return; }
    if (e.target.closest('[data-again]')) { route(); return; }
    if (e.target.closest('[data-reset]')) {
      if (window.confirm('Biztosan törlöd a kártyák és a kvíz eddigi eredményét? Ezt nem lehet visszavonni.')) { T.torol(); FX.toast('Törölve'); route(); }
    }
  });

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
    else if (parts[0] === 'roadmap') out = !parts[1] ? viewRoadmap() : parts[1] === 'elmelet' || parts[1] === 'zh' ? viewRoadmapGyujto(parts[1]) : viewRoadmapAllomas(parts[1]);
    else if (parts[0] === 'tanul') out = viewTanul();
    else if (parts[0] === 'kartya') out = viewKartya(parts[1]);
    else if (parts[0] === 'kviz') out = viewKviz(parts[1]);
    else out = view404();
    paint(out);
    const tanul = ['tanul', 'kartya', 'kviz'].includes(parts[0]);
    navOn('/' + (tanul ? 'tanul' : parts[0] && parts[0] !== 'lecke' ? parts[0] : ''));
    window.scrollTo(0, 0);
  }
  function paint(out) {
    const r = typeof out === 'string' ? { html: out } : out;
    app.innerHTML = `<div class="view">${r.html}</div>`;
    FIZ.render(app);
    if (r.after) r.after();
    FX.words(app); FX.reveal(app); FX.rings(app);
  }
  function navOn(p) {
    const links = $('#navLinks');
    links.querySelectorAll('[data-nav]').forEach((a) => {
      const on = a.dataset.nav === p;
      a.classList.toggle('on', on);
      if (on) { a.setAttribute('aria-current', 'page'); links.scrollLeft = a.offsetLeft - links.clientWidth / 2 + a.clientWidth / 2; } else a.removeAttribute('aria-current');
    });
  }
  window.addEventListener('hashchange', route);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', route); else route();
})();
