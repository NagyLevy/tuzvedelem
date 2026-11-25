/* Animációs segédek: görgetésre beúszás, szavanként felemelkedő címek, számláló, gyűrűk, konfetti, toast. */
(function () {
  'use strict';
  const FX = {};
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Görgetésre beúszó elemek (.reveal → .in), kis lépcsőzéssel a testvérek között */
  let io = null;
  FX.reveal = (root) => {
    if (io) io.disconnect();
    const els = [...root.querySelectorAll('.reveal')];
    if (reduce || !('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('in')); return; }
    io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const el = en.target;
        const sibs = [...el.parentElement.children].filter((c) => c.classList.contains('reveal'));
        el.style.transitionDelay = Math.min(sibs.indexOf(el), 6) * 70 + 'ms';
        el.classList.add('in');
        el.querySelectorAll('[data-count]').forEach(FX.countUp);
        if (el.matches('[data-count]')) FX.countUp(el);
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    els.forEach((e) => io.observe(e));
  };

  /* Cím szavakra bontása: <h1 class="word-rise">…</h1> — a HTML-címkéket (pl. <span>) megtartja */
  FX.words = (root) => {
    root.querySelectorAll('.word-rise:not([data-split])').forEach((h) => {
      h.dataset.split = '1';
      let i = 0;
      const walk = (node) => {
        [...node.childNodes].forEach((n) => {
          if (n.nodeType === 3) {
            const frag = document.createDocumentFragment();
            n.textContent.split(/(\s+)/).forEach((part) => {
              if (!part) return;
              if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
              const s = document.createElement('span');
              s.className = 'w';
              s.style.animationDelay = (i++ * 60) + 'ms';
              s.textContent = part;
              frag.appendChild(s);
            });
            n.replaceWith(frag);
          } else if (n.nodeType === 1) walk(n);
        });
      };
      walk(h);
    });
  };

  /* Számláló: <b data-count="199">199</b> → 0-tól felpörög. Csak a szám elejét animálja, a többi szöveg marad. */
  FX.countUp = (el) => {
    if (el.dataset.done) return;
    el.dataset.done = '1';
    const raw = el.dataset.count;
    const m = raw.match(/^(\D*)(\d+)(.*)$/);
    if (!m || reduce) { el.textContent = raw; return; }
    const [, pre, num, post] = m;
    const to = parseInt(num, 10);
    const t0 = performance.now(), dur = Math.min(1400, 500 + to * 4);
    const tick = (t) => {
      const k = Math.min(1, (t - t0) / dur);
      const e = 1 - Math.pow(1 - k, 4);
      el.textContent = pre + Math.round(to * e) + post;
      if (k < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  /* SVG haladásgyűrű */
  FX.ring = (pct, inner, big) => {
    const r = big ? 80 : 26, c = 2 * Math.PI * r, s = big ? 180 : 64;
    return `<div class="ring${big ? ' big' : ''}" data-ring="${pct}">
      <svg viewBox="0 0 ${s} ${s}"><circle class="bg" cx="${s / 2}" cy="${s / 2}" r="${r}"/>
      <circle class="fg" cx="${s / 2}" cy="${s / 2}" r="${r}" stroke-dasharray="${c}" stroke-dashoffset="${c}"/></svg>
      ${inner}</div>`;
  };
  FX.rings = (root) => {
    requestAnimationFrame(() => requestAnimationFrame(() => {
      root.querySelectorAll('[data-ring]').forEach((el) => {
        const fg = el.querySelector('.fg');
        const c = parseFloat(fg.getAttribute('stroke-dasharray'));
        fg.style.strokeDashoffset = c * (1 - Math.max(0.001, el.dataset.ring / 100));
      });
    }));
  };

  /* Toast */
  let tt;
  FX.toast = (msg) => {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(tt);
    tt = setTimeout(() => t.classList.remove('show'), 2200);
  };

  /* Konfetti — rövid, könnyű részecske-robbanás canvasra */
  FX.confetti = (n = 120) => {
    if (reduce) return;
    const cv = document.getElementById('confetti');
    const ctx = cv.getContext('2d');
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    cv.width = innerWidth * dpr; cv.height = innerHeight * dpr;
    ctx.scale(dpr, dpr);
    const cols = ['#5e5ce6', '#0a84ff', '#64d2ff', '#30d158', '#ffd60a', '#ff9f0a', '#ff375f', '#bf5af2'];
    const ps = Array.from({ length: n }, () => ({
      x: innerWidth / 2 + (Math.random() - 0.5) * 120, y: innerHeight * 0.45,
      vx: (Math.random() - 0.5) * 16, vy: -Math.random() * 16 - 6,
      r: Math.random() * Math.PI, vr: (Math.random() - 0.5) * 0.4,
      w: 6 + Math.random() * 6, h: 8 + Math.random() * 10, c: cols[(Math.random() * cols.length) | 0], a: 1,
    }));
    const t0 = performance.now();
    const step = (t) => {
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      const age = (t - t0) / 1000;
      ps.forEach((p) => {
        p.vy += 0.45; p.vx *= 0.99; p.x += p.vx; p.y += p.vy; p.r += p.vr;
        p.a = Math.max(0, 1 - age / 2.4);
        ctx.save(); ctx.globalAlpha = p.a; ctx.translate(p.x, p.y); ctx.rotate(p.r);
        ctx.fillStyle = p.c; ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h * Math.abs(Math.cos(p.r * 2)));
        ctx.restore();
      });
      if (age < 2.5) requestAnimationFrame(step); else ctx.clearRect(0, 0, innerWidth, innerHeight);
    };
    requestAnimationFrame(step);
  };

  window.FX = FX;
})();
