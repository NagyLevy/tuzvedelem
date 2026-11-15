/* Alap segédfüggvények: DOM, tárolás, felbukkanás, haladás, toast. */
(function () {
  'use strict';

  const TM = (window.TM = window.TM || {});
  TM.lessons = [];
  TM.register = (lesson) => TM.lessons.push(lesson);
  TM.reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* A tanfolyam teljes térképe: a még meg nem írt leckék "hamarosan" állapotúak. */
  TM.plan = [
    { no: 1, id: 'egeselmelet', title: 'Égéselmélet', sub: 'Hő, égés feltételei, oxigén, a láng szerkezete' },
    { no: 2, id: 'eges-tuzoltas', title: 'Égés és tűzoltás', sub: 'A tűz zónái, oltási módok, oltóhatások' },
    { no: 3, id: 'egestermekek', title: 'Égéstermékek', sub: 'Tökéletes és tökéletlen égéstermékek, CO, füst' },
    { no: 4, id: 'viz', title: 'A víz mint oltóanyag', sub: 'Tulajdonságok, sugárfajták, mikor TILOS' },
    { no: 5, id: 'oltogaz-oltopor', title: 'Oltógázok, oltóporok', sub: 'Inert gázok, inhibíció, falhatás' },
    { no: 6, id: 'habok', title: 'Tűzoltó habok', sub: 'Habkiadósság, nehéz-, közép-, könnyűhab' },
    { no: 7, id: 'kemiai-biztonsag', title: 'Kémiai biztonság', sub: 'Veszélyes anyagok, jelölések, robbanási határ' },
    { no: 8, id: 'munkavedelem-alapjai', title: 'A munkavédelem alapjai', sub: 'Fogalmak, szintek, résztvevők, jogviszonyok' },
    { no: 9, id: 'munkavedelem-gyakorlat', title: 'Munkavédelem a gyakorlatban', sub: 'Munkabaleset, foglalkozási megbetegedés' },
    { no: 10, id: 'kotelezettsegek', title: 'Munkavédelmi kötelezettségek', sub: 'Munkáltató és munkavállaló kötelezettségei' }
  ];

  /* ---------- DOM ---------- */
  TM.$ = (sel, root = document) => root.querySelector(sel);
  TM.$$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  TM.h = (html) => {
    const t = document.createElement('template');
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  };
  TM.clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  TM.lerp = (a, b, t) => a + (b - a) * t;

  /* ---------- Tárolás (privát ablakban is működjön) ---------- */
  const KEY = 'tm-progress-v1';
  TM.store = {
    read() {
      try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; }
    },
    write(data) {
      try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) { /* nincs tárolás */ }
    },
    lesson(id) { return this.read()[id] || { seen: [], best: 0, done: false }; },
    patch(id, fn) {
      const all = this.read();
      const cur = all[id] || { seen: [], best: 0, done: false };
      all[id] = fn(cur) || cur;
      this.write(all);
      return all[id];
    }
  };
  TM.pref = {
    get(k, d) { try { const v = localStorage.getItem('tm-' + k); return v == null ? d : v; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem('tm-' + k, v); } catch (e) { /* */ } }
  };

  /* Lecke haladása 0..1: elolvasott fejezetek (60%) + legjobb kvíz (40%). */
  TM.progressOf = (lesson) => {
    if (!lesson) return 0;
    const s = TM.store.lesson(lesson.id);
    const ch = lesson.chapters ? lesson.chapters.length : 1;
    const read = Math.min(1, (s.seen || []).length / ch);
    return Math.min(1, read * 0.6 + (s.best || 0) * 0.4);
  };

  /* ---------- Felbukkanás ---------- */
  let io;
  TM.observeReveals = (root) => {
    if (io) io.disconnect();
    io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      }
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
    TM.$$('.reveal, .word-rise, .def', root).forEach((n) => io.observe(n));
  };

  /* Szavanként felemelkedő cím: <h2 class="word-rise">…</h2> */
  TM.splitWords = (root) => {
    TM.$$('.word-rise', root).forEach((node) => {
      if (node.dataset.split) return;
      node.dataset.split = '1';
      let i = 0;
      const walk = (n) => {
        Array.from(n.childNodes).forEach((c) => {
          if (c.nodeType === 3) {
            const frag = document.createDocumentFragment();
            c.textContent.split(/(\s+)/).forEach((part) => {
              if (!part) return;
              if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
              const s = document.createElement('span');
              s.className = 'w';
              s.style.transitionDelay = (i++ * 0.06).toFixed(2) + 's';
              s.textContent = part;
              frag.appendChild(s);
            });
            c.replaceWith(frag);
          } else if (c.nodeType === 1) {
            if (c.classList.contains('fire-text') || c.classList.contains('cool-text')) {
              c.classList.add('w');
              c.style.transitionDelay = (i++ * 0.06).toFixed(2) + 's';
            } else walk(c);
          }
        });
      };
      walk(node);
    });
  };

  /* ---------- Toast ---------- */
  let toastT;
  TM.toast = (msg) => {
    const t = TM.$('#toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastT);
    toastT = setTimeout(() => t.classList.remove('show'), 2400);
  };

  /* ---------- Szikraeső (siker) ---------- */
  TM.sparks = (x, y, n = 70) => {
    if (TM.reduced) return;
    const c = document.createElement('canvas');
    c.className = 'sparks';
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    c.width = innerWidth * dpr; c.height = innerHeight * dpr;
    document.body.appendChild(c);
    const g = c.getContext('2d');
    g.scale(dpr, dpr);
    const ps = Array.from({ length: n }, () => {
      const a = Math.random() * Math.PI * 2, v = 3 + Math.random() * 9;
      return { x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 5, life: 1, r: 1.5 + Math.random() * 2.5, h: 15 + Math.random() * 35 };
    });
    let last = performance.now();
    const tick = (now) => {
      const dt = Math.min(2, (now - last) / 16.7); last = now;
      g.clearRect(0, 0, innerWidth, innerHeight);
      g.globalCompositeOperation = 'lighter';
      let alive = 0;
      for (const p of ps) {
        if (p.life <= 0) continue;
        alive++;
        p.vy += 0.25 * dt; p.vx *= 0.985; p.x += p.vx * dt; p.y += p.vy * dt; p.life -= 0.012 * dt;
        g.fillStyle = `hsla(${p.h},100%,${55 + p.life * 20}%,${p.life})`;
        g.beginPath(); g.arc(p.x, p.y, p.r, 0, 7); g.fill();
      }
      if (alive) requestAnimationFrame(tick); else c.remove();
    };
    requestAnimationFrame(tick);
  };

  /* ---------- Téma ---------- */
  TM.applyTheme = () => {
    const t = TM.pref.get('theme', '');
    if (t) document.documentElement.dataset.theme = t; else delete document.documentElement.dataset.theme;
  };
  TM.toggleTheme = () => {
    const sysDark = matchMedia('(prefers-color-scheme: dark)').matches;
    const cur = document.documentElement.dataset.theme || (sysDark ? 'dark' : 'light');
    TM.pref.set('theme', cur === 'dark' ? 'light' : 'dark');
    TM.applyTheme();
  };
  TM.isDark = () => {
    const t = document.documentElement.dataset.theme;
    return t ? t === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
  };
  TM.applyTheme();

  /* Ékezet- és kisbetű-független összevetés a kitöltős feladatokhoz. */
  TM.norm = (s) => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[„”"'.,;:!?()–\-]/g, ' ').replace(/\s+/g, ' ').trim();
})();

/* Közös leckeépítő elemek (a 2. leckétől). */
(function () {
  const TM = window.TM;
  TM.ui = {
    sec: (id, ch, no, title, lead, inner, cls = '') => `
      <section class="section ${cls}" id="${id}" data-ch="${ch}"><div class="wrap">
        <p class="eyebrow reveal"><span class="num">${no}</span> ${ch}</p>
        <h2 class="h-sec word-rise">${title}</h2>
        ${lead ? `<p class="lead reveal">${lead}</p>` : ''}
        ${inner}
      </div></section>`,
    def: (lbl, html) => `<div class="def reveal"><div class="lbl">${lbl}</div>${html}</div>`,
    note: (html, kind = '') => `<div class="note ${kind} reveal"><i>${kind === 'danger' ? '!' : kind === 'warn' ? '★' : 'i'}</i><div>${html}</div></div>`,
    heatColor: (t, a = 1) => {
      t = Math.max(0, Math.min(1, t));
      const s = [[0, 60, 120, 255], [0.35, 140, 60, 200], [0.55, 230, 50, 30], [0.75, 255, 140, 20], [1, 255, 240, 180]];
      let i = 0; while (i < s.length - 2 && t > s[i + 1][0]) i++;
      const [t0, r0, g0, b0] = s[i], [t1, r1, g1, b1] = s[i + 1], k = (t - t0) / (t1 - t0), L = (a1, b1) => (a1 + (b1 - a1) * k) | 0;
      return `rgba(${L(r0, r1)},${L(g0, g1)},${L(b0, b1)},${a})`;
    }
  };
})();
