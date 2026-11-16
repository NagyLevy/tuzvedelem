/* Útválasztó (#/ és #/lecke/<id>), kezdőlap, leckekeret. */
(function () {
  'use strict';
  const TM = window.TM;
  const { h, $, $$ } = TM;
  const app = $('#app');
  let cleanup = [];

  const lessonById = (id) => TM.lessons.find((l) => l.id === id);

  const glyph = (no) => `<svg class="glyph" viewBox="0 0 64 64"><path fill="var(--flame)" d="M32 4c4 12 18 18 18 34a18 18 0 0 1-36 0c0-9 5-14 9-18 0 7 3 11 7 12-3-10 0-20 2-28z"/></svg>`;
  const ring = (p) => {
    const C = 2 * Math.PI * 14;
    return `<svg class="ring" viewBox="0 0 34 34"><defs><linearGradient id="ringGrad"><stop offset="0" stop-color="#ff3b1f"/><stop offset="1" stop-color="#ffc53d"/></linearGradient></defs>
      <circle class="bgc" cx="17" cy="17" r="14"/><circle class="fgc" cx="17" cy="17" r="14" stroke-dasharray="${C}" stroke-dashoffset="${C * (1 - p)}" transform="rotate(-90 17 17)"/></svg>`;
  };

  function nav(active) {
    const links = $('#navLinks');
    links.innerHTML = `<a href="#/" class="${active === 'home' ? 'on' : ''}">Leckék</a><a href="#/kartyak" class="grind-link ${active === 'kartyak' ? 'on' : ''}">🃏 ZH-kártyák</a><a href="#/zh" class="grind-link ${active === 'zh' ? 'on' : ''}">📝 ZH-gyakorló</a><a href="#/dungeon" class="grind-link ${active === 'dungeon' ? 'on' : ''}">⚔️ Dungeon</a><a href="#/rapid" class="grind-link ${active === 'rapid' ? 'on' : ''}">⚡ Rapid</a><a href="#/grind" class="grind-link ${active === 'grind' ? 'on' : ''}">🔥 Grind</a>` +
      TM.lessons.map((l) => `<a href="#/lecke/${l.id}" class="${active === l.id ? 'on' : ''}">${l.no}. ${l.short || l.title}</a>`).join('');
  }

  /* ---------- Kezdőlap ---------- */
  function home() {
    nav('home');
    document.title = 'Tűz- és munkavédelem';
    const open = TM.lessons.length;
    const done = TM.lessons.filter((l) => TM.store.lesson(l.id).done).length;
    const qn = TM.lessons.reduce((s, l) => s + (l.quiz ? l.quiz.length : 0), 0);
    const nextL = TM.lessons.find((l) => !TM.store.lesson(l.id).done) || TM.lessons[0];
    const view = h(`<div>
      <section class="home-hero">
        <canvas aria-hidden="true"></canvas>
        <div class="wrap">
          <div class="kicker reveal"><b>ZH</b> Leckéről leckére, animációkkal</div>
          <h1 class="h-hero word-rise">Tűz- és <span class="fire-text">munkavédelem.</span></h1>
          <p class="lead reveal" style="--d:.35s">Nem bemagolod — <b>látod</b>, hogyan ég a tűz, miért alszik ki, és mit mond rá pontosan a ZH. Minden leckében a szó szerinti ZH-mondatok kiemelve.</p>
          <div class="cta reveal" style="--d:.5s">
            ${nextL ? `<a class="btn btn-fire" href="#/lecke/${nextL.id}">${TM.store.lesson(nextL.id).seen.length ? 'Folytatás' : 'Kezdjük'}: ${nextL.title}</a>` : ''}
            <a class="btn btn-fire" href="#/zh">📝 ZH-gyakorló</a>
            <a class="btn btn-fire" href="#/dungeon">⚔️ Dungeon (RPG)</a>
            <a class="btn btn-fire" href="#/rapid">⚡ Rapid kérdésdarálás</a>
            <a class="btn btn-ghost" href="#/grind">🔥 Kérdés-grind</a>
          </div>
        </div>
        <div class="scroll-hint" aria-hidden="true"></div>
      </section>

      <section class="section" style="padding-bottom:0"><div class="wrap">
        <a class="grind-cta reveal" href="#/grind">
          <div><span class="kicker" style="margin:0 0 14px"><b>ÚJ</b> Grind mód</span>
          <h2 class="h-sec">Nincs kedved tanulni? <span class="fire-text">Grindolj.</span></h2>
          <p class="lead">Végtelen kérdésfolyam a teljes anyagból, XP, rangok, combo és Boss fight. Amit elrontasz, az visszajön, amíg meg nem tanulod.</p></div>
          <span class="btn btn-fire">Indítás →</span>
        </a></div></section>
      <section class="section" id="tananyag">
        <div class="wrap">
          <p class="eyebrow reveal">A tanfolyam</p>
          <h2 class="h-sec word-rise">Tíz lecke. <span class="dim">Egy ZH.</span></h2>
          <p class="lead reveal">A sorrend a diasorokét követi. Az új leckék folyamatosan érkeznek — ami szürke, az még készül.</p>
          <div class="stats reveal">
            <div><b data-count="${open}">0</b><span>elérhető lecke</span></div>
            <div><b data-count="${done}">0</b><span>teljesítve (≥80%)</span></div>
            <div><b data-count="${qn}">0</b><span>gyakorlókérdés</span></div>
            <div><b data-count="10">0</b><span>lecke összesen</span></div>
          </div>
          <div class="course"></div>
        </div>
      </section>
    </div>`);
    const course = $('.course', view);
    TM.plan.forEach((p, i) => {
      const l = lessonById(p.id);
      const prog = TM.progressOf(l);
      const card = h(`<a class="lesson-card ${l ? 'open' : 'soon'} reveal" style="--d:${(i % 3) * 0.08}s" ${l ? `href="#/lecke/${p.id}"` : 'aria-disabled="true"'}>
        ${glyph(p.no)}
        <span class="no">${String(p.no).padStart(2, '0')}. lecke</span>
        <h3>${p.title}</h3><p>${p.sub}</p>
        <div class="foot-row"><span class="go">${l ? (prog > 0 ? 'Folytatás →' : 'Kezdés →') : 'Hamarosan'}</span>${l ? ring(prog) : ''}</div></a>`);
      if (!l) card.addEventListener('click', (e) => { e.preventDefault(); TM.toast('Ez a lecke még készül 🔥'); });
      card.addEventListener('pointermove', (e) => { const r = card.getBoundingClientRect(); card.style.setProperty('--mx', e.clientX - r.left + 'px'); card.style.setProperty('--my', e.clientY - r.top + 'px'); });
      course.appendChild(card);
    });
    mount(view);
    TM.embers($('canvas', view), { density: 7000 });
    countUp(view);
  }

  function countUp(root) {
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return; io.unobserve(e.target);
      const n = +e.target.dataset.count, t0 = performance.now();
      const step = (t) => { const k = Math.min(1, (t - t0) / 1200); e.target.textContent = Math.round(n * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    }));
    $$('[data-count]', root).forEach((n) => io.observe(n));
    cleanup.push(() => io.disconnect());
  }

  /* ---------- Lecke ---------- */
  function lesson(id) {
    const L = lessonById(id);
    if (!L) { location.hash = '#/'; return; }
    nav(id);
    document.title = `${L.no}. ${L.title} · Tűz- és munkavédelem`;
    const view = h(`<div>
      <section class="lesson-hero">
        <canvas aria-hidden="true"></canvas>
        <div class="wrap">
          <p class="eyebrow reveal"><span class="num">${L.no}</span> ${L.no}. lecke</p>
          <h1 class="h-hero word-rise">${L.heroTitle || L.title}</h1>
          <p class="lead reveal" style="--d:.3s">${L.intro}</p>
          <div class="meta reveal" style="--d:.45s">${(L.meta || []).map((m) => `<span>${m}</span>`).join('')}</div>
        </div>
      </section>
      <div class="lesson-body"></div>
      <nav class="chapter-dots" aria-label="Fejezetek"></nav>
    </div>`);
    const body = $('.lesson-body', view);
    const fns = L.render(body) || [];
    cleanup.push(...fns);

    // gyakorlás
    body.appendChild(h(`<section class="section" id="gyakorlas" data-ch="Gyakorlás">
      <div class="wrap">
        <p class="eyebrow reveal"><span class="num">✓</span> Gyakorlás</p>
        <h2 class="h-sec word-rise">Most te <span class="fire-text">jössz.</span></h2>
        <p class="lead reveal">${L.quiz.length} kérdés a ZH stílusában — feleletválasztós, igaz/hamis és kiegészítős. 80% felett a lecke teljesítve.</p>
        <div class="q-mode reveal"><div class="seg" role="tablist"><button class="on" data-m="quiz">Kvíz</button><button data-m="cards">Villámkártyák (${L.cards.length})</button></div></div>
        <div class="q-host"></div>
      </div></section>`));
    const host = $('.q-host', body);
    const modes = { quiz: () => TM.quiz(host, L), cards: () => TM.flashcards(host, L.cards) };
    $$('.q-mode [data-m]', body).forEach((b) => b.onclick = () => {
      $$('.q-mode [data-m]', body).forEach((x) => x.classList.toggle('on', x === b));
      host.replaceChildren(); modes[b.dataset.m]();
    });
    modes.quiz();

    const idx = TM.lessons.indexOf(L), nxt = TM.lessons[idx + 1], planNext = TM.plan[L.no];
    body.appendChild(h(`<section class="section finish"><div class="wrap">
      <h2 class="h-sec word-rise">Ennyi volt a(z) <span class="fire-text">${L.no}. lecke.</span></h2>
      <p class="lead reveal">${nxt ? `Következik: <b>${nxt.title}</b>.` : planNext ? `Következik: <b>${planNext.title}</b> — ez a lecke még készül.` : 'Ez volt az utolsó lecke.'}</p>
      <div class="mini-cta reveal" style="justify-content:center">
        ${nxt ? `<a class="btn btn-fire" href="#/lecke/${nxt.id}">Tovább →</a>` : ''}
        <a class="btn btn-ghost" href="#/">Vissza a leckékhez</a>
      </div></div></section>`));

    mount(view);
    TM.embers($('.lesson-hero canvas', view), { flame: true, alwaysDark: true, density: 9000, flameY: (w) => (w > 900 ? 0.62 : 0.26), flameX: (w) => (w > 900 ? 0.74 : 0.5) });

    // fejezetpöttyök + olvasottság
    const secs = $$('[data-ch]', view);
    const dots = $('.chapter-dots', view);
    secs.forEach((s, i) => {
      if (!s.id) s.id = 'f' + i;
      dots.appendChild(h(`<a href="#${s.id}" data-i="${i}"><span>${s.dataset.ch}</span></a>`));
    });
    $$('a', dots).forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); document.getElementById(a.getAttribute('href').slice(1)).scrollIntoView({ behavior: 'smooth' }); }));
    const seenIO = new IntersectionObserver((es) => es.forEach((e) => {
      const i = secs.indexOf(e.target);
      if (e.isIntersecting) {
        $$('a', dots).forEach((a, k) => a.classList.toggle('on', k === i));
        if (e.target.id !== 'gyakorlas') TM.store.patch(L.id, (c) => { if (!c.seen.includes(e.target.id)) c.seen.push(e.target.id); return c; });
      }
    }), { rootMargin: '-45% 0px -50% 0px' });
    secs.forEach((s) => seenIO.observe(s));
    cleanup.push(() => seenIO.disconnect());
  }

  function mount(view) {
    app.replaceChildren(view);
    TM.splitWords(view);
    TM.observeReveals(view);
    window.scrollTo(0, 0);
  }

  function route() {
    cleanup.forEach((f) => { try { f(); } catch (e) { /* */ } });
    cleanup = [];
    TM.destroyScenes();
    const m = location.hash.match(/^#\/lecke\/([\w-]+)/);
    if (m) lesson(m[1]);
    else if (location.hash.startsWith('#/kartyak')) { nav('kartyak'); document.title = 'ZH-kártyák · Tűz- és munkavédelem'; window.scrollTo(0, 0); cleanup.push(TM.zhCards(app)); }
    else if (location.hash.startsWith('#/zh')) { nav('zh'); document.title = 'ZH-gyakorló · Tűz- és munkavédelem'; window.scrollTo(0, 0); cleanup.push(TM.zh(app)); }
    else if (location.hash.startsWith('#/dungeon')) { nav('dungeon'); document.title = 'Dungeon · Tűz- és munkavédelem'; window.scrollTo(0, 0); cleanup.push(TM.rpg(app)); }
    else if (location.hash.startsWith('#/rapid')) { nav('rapid'); document.title = 'Rapid · Tűz- és munkavédelem'; window.scrollTo(0, 0); cleanup.push(TM.rapid(app)); }
    else if (location.hash.startsWith('#/grind')) { nav('grind'); document.title = 'Grind · Tűz- és munkavédelem'; window.scrollTo(0, 0); cleanup.push(TM.grind(app)); }
    else if (location.hash === '' || location.hash === '#/' || location.hash.startsWith('#/')) home();
  }

  // Belső horgonyok (#tananyag) ne váltsanak oldalt.
  window.addEventListener('hashchange', (e) => {
    if (!location.hash.startsWith('#/') && location.hash !== '') {
      const t = document.getElementById(location.hash.slice(1));
      if (t) { t.scrollIntoView({ behavior: 'smooth' }); history.replaceState(null, '', e.oldURL); return; }
    }
    route();
  });

  // Olvasási csík
  const bar = $('#readProgress');
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
  };
  addEventListener('scroll', onScroll, { passive: true });

  $('#themeBtn').onclick = () => { TM.toggleTheme(); };
  route();
})();
