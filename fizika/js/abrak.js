/* Interaktív ábrák. FIZ_ABRAK[kulcs] = { cim, leiras?, mount(body, out) -> cleanup }.
   Minden szám a lecke képleteiből jön. Közös rajzsegédek: window.FIZK (a videók is használják). */
(function () {
  'use strict';
  const A = (window.FIZ_ABRAK = window.FIZ_ABRAK || {});
  const FZ = () => window.FIZ;
  const TAU = Math.PI * 2;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const lerp = (a, b, k) => a + (b - a) * k;

  /* Számformázás magyarul: tizedesvessző */
  const nf = (x, d = 2) => (isFinite(x) ? (+x).toFixed(d).replace('.', ',').replace('-', '−') : '–');
  const SUP = { '-': '⁻', '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' };
  const sci = (x, d = 2) => {
    if (!isFinite(x)) return '–';
    if (x === 0) return '0';
    const e = Math.floor(Math.log10(Math.abs(x)));
    if (e >= -2 && e <= 3) return nf(x, Math.max(0, d - Math.max(0, e)));
    return nf(x / Math.pow(10, e), d) + '·10' + String(e).split('').map((c) => SUP[c]).join('');
  };

  /* Rajz */
  function arrow(ctx, x1, y1, x2, y2, col, lw = 2.5, head = 10) {
    const a = Math.atan2(y2 - y1, x2 - x1), L = Math.hypot(x2 - x1, y2 - y1);
    if (L < 1) return;
    const hh = Math.min(head, L * 0.6);
    ctx.save();
    ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2 - Math.cos(a) * hh * 0.7, y2 - Math.sin(a) * hh * 0.7); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - hh * Math.cos(a - 0.42), y2 - hh * Math.sin(a - 0.42));
    ctx.lineTo(x2 - hh * Math.cos(a + 0.42), y2 - hh * Math.sin(a + 0.42));
    ctx.closePath(); ctx.fill();
    ctx.restore();
  }
  function txt(ctx, s, x, y, col, o = {}) {
    ctx.save();
    ctx.font = `${o.w || 600} ${o.s || 13}px Inter, system-ui, sans-serif`;
    ctx.fillStyle = col; ctx.textAlign = o.a || 'left'; ctx.textBaseline = o.b || 'alphabetic';
    ctx.fillText(s, x, y);
    ctx.restore();
  }
  function line(ctx, pts, col, lw = 2, dash) {
    ctx.save();
    ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    if (dash) ctx.setLineDash(dash);
    ctx.beginPath();
    pts.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])));
    ctx.stroke();
    ctx.restore();
  }
  function dot(ctx, x, y, r, col, glow) {
    ctx.save();
    if (glow) { ctx.shadowColor = col; ctx.shadowBlur = glow; }
    ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill();
    ctx.restore();
  }
  function rrect(ctx, x, y, w, h, r, fill, stroke) {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
    if (fill) { ctx.fillStyle = fill; ctx.fill(); }
    if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = 1.5; ctx.stroke(); }
    ctx.restore();
  }
  function spring(ctx, x1, y1, x2, y2, n, amp, col, lw = 2) {
    const L = Math.hypot(x2 - x1, y2 - y1), a = Math.atan2(y2 - y1, x2 - x1);
    const pts = [[0, 0], [L * 0.08, 0]];
    for (let i = 0; i < n; i++) pts.push([L * 0.08 + (L * 0.84) * (i + 0.5) / n, i % 2 ? -amp : amp]);
    pts.push([L * 0.92, 0], [L, 0]);
    line(ctx, pts.map(([u, v]) => [x1 + u * Math.cos(a) - v * Math.sin(a), y1 + u * Math.sin(a) + v * Math.cos(a)]), col, lw);
  }
  function axes(ctx, x0, y0, x1, y1, C, xl, yl) {
    arrow(ctx, x0, y0, x1, y0, C.dim, 1.4, 7);
    arrow(ctx, x0, y0, x0, y1, C.dim, 1.4, 7);
    if (xl) txt(ctx, xl, x1, y0 + 18, C.muted, { a: 'right', s: 12 });
    if (yl) txt(ctx, yl, x0 + 8, y1 + 4, C.muted, { s: 12, b: 'top' });
  }
  /* Szín → [r,g,b] (CSS-színből) */
  let _pc = null;
  function rgb(col) {
    _pc = _pc || document.createElement('canvas').getContext('2d');
    _pc.fillStyle = '#000'; _pc.fillStyle = col;
    const s = _pc.fillStyle;
    if (s[0] === '#') return [1, 3, 5].map((i) => parseInt(s.slice(i, i + 2), 16));
    const m = s.match(/[\d.]+/g) || [0, 0, 0];
    return m.slice(0, 3).map(Number);
  }
  const alpha = (col, a) => { const [r, g, b] = rgb(col); return `rgba(${r},${g},${b},${a})`; };
  /* Hullámhossz (nm) → látható szín, közelítés */
  function wl(l, a = 1) {
    let r = 0, g = 0, b = 0;
    if (l < 440) { r = (440 - l) / 60; b = 1; } else if (l < 490) { g = (l - 440) / 50; b = 1; } else if (l < 510) { g = 1; b = (510 - l) / 20; } else if (l < 580) { r = (l - 510) / 70; g = 1; } else if (l < 645) { r = 1; g = (645 - l) / 65; } else r = 1;
    const f = l < 420 ? 0.3 + 0.7 * (l - 380) / 40 : l > 700 ? 0.3 + 0.7 * (760 - l) / 60 : 1;
    const c = (v) => Math.round(255 * Math.pow(clamp(v * f, 0, 1), 0.8));
    return `rgba(${c(r)},${c(g)},${c(b)},${a})`;
  }

  /* UI: csúszkák, gombsor, kimenet */
  function ui(body, defs, onChange) {
    const box = document.createElement('div');
    box.className = 'sliders';
    const v = { _in: {} };
    defs.forEach((d) => {
      v[d.k] = d.v;
      const lab = document.createElement('label');
      lab.innerHTML = `<span>${d.l}: <b></b></span>`;
      const b = lab.querySelector('b');
      const inp = document.createElement('input');
      inp.type = 'range'; inp.min = d.min; inp.max = d.max; inp.step = d.st || 'any'; inp.value = d.v;
      inp.setAttribute('aria-label', d.l.replace(/\$/g, ''));
      const show = () => { b.textContent = d.f ? d.f(v[d.k]) : nf(v[d.k], d.d == null ? 1 : d.d) + (d.u ? ' ' + d.u : ''); };
      inp.addEventListener('input', () => { v[d.k] = +inp.value; show(); if (onChange) onChange(d.k); });
      v._in[d.k] = { inp, show };
      lab.appendChild(inp); box.appendChild(lab); show();
    });
    v.set = (k, x) => { v[k] = x; v._in[k].inp.value = x; v._in[k].show(); };
    body.appendChild(box);
    return v;
  }
  function chips(body, opts, cur, onPick) {
    const row = document.createElement('div');
    row.className = 'row';
    row.setAttribute('role', 'group');
    const st = { v: cur };
    opts.forEach(([k, l]) => {
      const b = document.createElement('button');
      b.className = 'chip' + (k === cur ? ' on' : '');
      b.textContent = l; b.type = 'button';
      b.setAttribute('aria-pressed', k === cur);
      b.onclick = () => {
        st.v = k;
        row.querySelectorAll('button').forEach((x) => { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', x === b); });
        onPick(k);
      };
      row.appendChild(b);
    });
    body.appendChild(row);
    return st;
  }
  const outs = (el, rows) => { el.innerHTML = rows.map(([s, b]) => `<div><span>${s}</span><b>${b}</b></div>`).join(''); };

  /* Animált vászon: draw(ctx, w, h, C, t, dt). Látótéren kívül áll. */
  function scene(body, ratio, draw, o = {}) {
    const host = document.createElement('div');
    host.style.position = 'relative';
    body.appendChild(host);
    const narrow = (body.clientWidth || 600) < 560;
    const R = narrow ? (o.rm || Math.min(ratio, 1.35)) : ratio;
    const F = FZ();
    let C = F.colors(), t = 0, dt = 0, last = 0, raf = 0;
    const cv = F.canvas(host, R, (ctx, w, h) => { ctx.clearRect(0, 0, w, h); draw(ctx, w, h, C, t, dt); });
    const anim = o.anim !== false && !F.reduce;
    const loop = (now) => {
      dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
      last = now; t += dt;
      cv.redraw(); dt = 0;
      raf = requestAnimationFrame(loop);
    };
    const start = () => { if (anim && !raf) { last = 0; raf = requestAnimationFrame(loop); } };
    const halt = () => { cancelAnimationFrame(raf); raf = 0; };
    let io = null;
    if (anim && 'IntersectionObserver' in window) {
      io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : halt()));
      io.observe(host);
    } else start();
    const th = () => { C = F.colors(); cv.redraw(); };
    window.addEventListener('fiz:theme', th);
    return {
      cv, host, narrow,
      redraw: () => cv.redraw(),
      reset: () => { t = 0; },
      stop: () => { halt(); cv.stop(); if (io) io.disconnect(); window.removeEventListener('fiz:theme', th); }
    };
  }

  window.FIZK = { TAU, clamp, lerp, nf, sci, arrow, txt, line, dot, rrect, spring, axes, rgb, alpha, wl };

  /* ───────────── 3a · Lendület, perdület ───────────── */

  A.utkozes = {
    cim: 'Ugyanaz a Δp, más Δt',
    leiras: 'A görbe alatti terület mindig $\\Delta p=m\\Delta v$. Ha hosszabb ideig tart a fékezés, kisebb az átlagos erő: $F_{átl}=\\Delta p/\\Delta t$. A csúcserő a rajzon egy félszinusz alakú lökésre számolt (saját szemléltetés).',
    mount(body, out) {
      let v;
      const s = scene(body, 2.4, (ctx, w, h, C, t) => {
        if (!v) return;
        const x0 = 46, y0 = h - 34, x1 = w - 20, y1 = 22;
        axes(ctx, x0, y0, x1, y1, C, 't (ms)', 'F (N)');
        const tmax = 600, dp = v.m * v.dv, dts = v.dt / 1000;
        const Fa = dp / dts, Fpk = Math.PI / 2 * Fa;
        const Fmax = Math.PI / 2 * dp / 0.03 * 1.08;
        const X = (ms) => x0 + ms / tmax * (x1 - x0 - 10), Y = (F) => y0 - F / Fmax * (y0 - y1 - 10);
        const ta = 40, tb = 40 + v.dt;
        const k = FZ().reduce ? 1 : ((t % 3) / 2.2);
        const tc = ta + clamp(k, 0, 1) * v.dt;
        // kitöltött terület eddig
        ctx.save(); ctx.beginPath(); ctx.moveTo(X(ta), y0);
        for (let ms = ta; ms <= tc; ms += v.dt / 80) ctx.lineTo(X(ms), Y(Fpk * Math.sin(Math.PI * (ms - ta) / v.dt)));
        ctx.lineTo(X(tc), y0); ctx.closePath(); ctx.fillStyle = alpha(C.c, 0.28); ctx.fill(); ctx.restore();
        const pts = [];
        for (let ms = 0; ms <= tmax; ms += 2) pts.push([X(ms), Y(ms < ta || ms > tb ? 0 : Fpk * Math.sin(Math.PI * (ms - ta) / v.dt))]);
        line(ctx, pts, C.c, 2.6);
        line(ctx, [[X(ta), Y(Fa)], [X(tb), Y(Fa)]], C.acc, 2, [6, 6]);
        txt(ctx, 'F átl', X(tb) + 8, Y(Fa) + 4, C.acc, { s: 12 });
        txt(ctx, 'terület = Δp = ' + nf(dp, 0) + ' kg·m/s', X(ta + v.dt / 2), Math.max(y1 + 30, Y(Fpk) - 12), C.fg, { a: 'center', s: 13 });
      });
      v = ui(body, [
        { k: 'm', l: 'Tömeg $m$', min: 1, max: 100, st: 1, v: 70, d: 0, u: 'kg' },
        { k: 'dv', l: 'Sebességváltozás $\\Delta v$', min: 1, max: 20, st: 0.5, v: 10, d: 1, u: 'm/s' },
        { k: 'dt', l: 'Ütközés ideje $\\Delta t$', min: 30, max: 500, st: 5, v: 50, d: 0, u: 'ms' }
      ], () => upd());
      const upd = () => {
        const dp = v.m * v.dv, Fa = dp / (v.dt / 1000);
        outs(out, [['Δp', nf(dp, 0) + ' kg·m/s'], ['F átl', sci(Fa, 2) + ' N'], ['F átl / súly', nf(Fa / (v.m * 9.81), 1) + '×']]);
        s.redraw();
      };
      upd();
      return s.stop;
    }
  };

  A.centralis = {
    cim: 'Centrális erő: a perdület állandó',
    leiras: 'Az erő mindig a középpont felé mutat, párhuzamos $\\underline{r}$-rel, ezért $M=rF\\sin\\alpha=0$. Így $N=m\\,r\\,v\\sin\\varphi$ végig ugyanannyi, pedig $r$ és $v$ közben változik. (Saját szimuláció, $m=1$, $1/r^2$-es vonzás.)',
    mount(body, out) {
      let v, P, orbit = [], geo;
      const reset = () => {
        P = { x: 1, y: 0, vx: 0, vy: v.v0 };
        const E = v.v0 * v.v0 / 2 - 1, a = -1 / (2 * E), other = 2 * a - 1;
        const T = TAU * Math.pow(a, 1.5);
        geo = { a, T, xmin: -other, xmax: 1, b: Math.sqrt(other) };
        orbit = [];
        const q = { x: 1, y: 0, vx: 0, vy: v.v0 }, n = 1600, h = T / n;
        for (let i = 0; i <= n; i++) { orbit.push([q.x, q.y]); step(q, h); }
      };
      const step = (q, h) => {
        let r = Math.hypot(q.x, q.y), k = -1 / (r * r * r);
        q.vx += q.x * k * h / 2; q.vy += q.y * k * h / 2;
        q.x += q.vx * h; q.y += q.vy * h;
        r = Math.hypot(q.x, q.y); k = -1 / (r * r * r);
        q.vx += q.x * k * h / 2; q.vy += q.y * k * h / 2;
      };
      const s = scene(body, 1.9, (ctx, w, h, C, t, dt) => {
        if (!v) return;
        if (dt) { const sim = dt * geo.T / 7, n = Math.ceil(sim / 0.002); for (let i = 0; i < n; i++) step(P, sim / n); }
        const mid = (geo.xmin + geo.xmax) / 2;
        const sc = Math.min((w - 40) / (2 * geo.a), (h - 40) / (2 * geo.b));
        const X = (x) => w / 2 + (x - mid) * sc, Y = (y) => h / 2 - y * sc;
        line(ctx, orbit.map(([x, y]) => [X(x), Y(y)]), alpha(C.fg, 0.22), 1.5, [3, 5]);
        dot(ctx, X(0), Y(0), 10, C.acc, 24);
        txt(ctx, 'középpont', X(0), Y(0) + 26, C.muted, { a: 'center', s: 12 });
        const px = X(P.x), py = Y(P.y);
        line(ctx, [[X(0), Y(0)], [px, py]], C.dim, 1.6);
        txt(ctx, 'r', (X(0) + px) / 2 + 6, (Y(0) + py) / 2 - 6, C.muted, { s: 14, w: 700 });
        const r = Math.hypot(P.x, P.y), vv = Math.hypot(P.vx, P.vy);
        arrow(ctx, px, py, px + P.vx * sc * 0.45, py - P.vy * sc * 0.45, C.c, 2.6);
        txt(ctx, 'v', px + P.vx * sc * 0.45 + 6, py - P.vy * sc * 0.45, C.c, { s: 14, w: 700 });
        const fl = clamp(42 / (r * r), 14, 70);
        arrow(ctx, px, py, px - P.x / r * fl, py + P.y / r * fl, C.acc, 2.4);
        txt(ctx, 'F', px - P.x / r * fl - 14, py + P.y / r * fl, C.acc, { s: 14, w: 700 });
        dot(ctx, px, py, 8, C.c, 18);
        const N = Math.abs(P.x * P.vy - P.y * P.vx);
        outs(out, [['r', nf(r, 2)], ['v', nf(vv, 2)], ['sin φ', nf(N / (r * vv), 2)], ['N = r·v·sin φ', nf(N, 3)]]);
      });
      v = ui(body, [{ k: 'v0', l: 'Kezdősebesség (pálya alakja)', min: 0.6, max: 1.3, st: 0.01, v: 1.15, d: 2 }], () => { reset(); s.redraw(); });
      reset(); s.redraw();
      return s.stop;
    }
  };

  /* ───────────── 3b · Munka, energia ───────────── */

  A['munka-szog'] = {
    cim: 'Munka és a szög',
    leiras: 'Csak az elmozdulás irányú erőkomponens végez munkát: $W=F\\,\\Delta s\\cos\\alpha$. $\\alpha=90°$-nál $W=0$, $\\alpha>90°$-nál negatív (fékez).',
    mount(body, out) {
      let v;
      const s = scene(body, 2.4, (ctx, w, h, C, t) => {
        if (!v) return;
        const gy = h * 0.72, sx = 50, ex = w - 50;
        line(ctx, [[20, gy], [w - 20, gy]], C.line, 2);
        const L = (ex - sx - 70) * v.s / 10;
        const k = FZ().reduce ? 1 : (0.5 - 0.5 * Math.cos((t % 4) / 4 * TAU));
        const bx = sx + k * L, bw = 70, bh = 46;
        line(ctx, [[sx + bw / 2, gy + 16], [sx + bw / 2 + L, gy + 16]], C.dim, 1.4, [4, 4]);
        txt(ctx, 'Δs = ' + nf(v.s, 1) + ' m', sx + bw / 2 + L / 2, gy + 34, C.muted, { a: 'center', s: 12 });
        rrect(ctx, bx, gy - bh, bw, bh, 8, alpha(C.fg, 0.1), C.dim);
        const cx = bx + bw / 2, cy = gy - bh / 2, a = v.a * Math.PI / 180, fl = 40 + v.F * 1.1;
        const fx = cx + Math.cos(a) * fl, fy = cy - Math.sin(a) * fl;
        const par = Math.cos(a) * fl;
        line(ctx, [[fx, fy], [cx + par, cy]], C.dim, 1.2, [3, 4]);
        arrow(ctx, cx, cy, cx + par, cy, par >= 0 ? C.c : C.acc, 4);
        arrow(ctx, cx, cy, fx, fy, C.fg, 2.6);
        txt(ctx, 'F', fx + 6, fy - 6, C.fg, { s: 15, w: 700 });
        txt(ctx, 'F·cos α', cx + par + (par >= 0 ? 8 : -8), cy + 20, par >= 0 ? C.c : C.acc, { s: 12, a: par >= 0 ? 'left' : 'right' });
        ctx.save(); ctx.strokeStyle = C.muted; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(cx, cy, 24, -a, 0, a < 0); ctx.stroke(); ctx.restore();
        txt(ctx, 'α', cx + 30 * Math.cos(a / 2), cy - 30 * Math.sin(a / 2) + 4, C.muted, { s: 13 });
      });
      v = ui(body, [
        { k: 'F', l: 'Erő $F$', min: 0, max: 100, st: 1, v: 50, d: 0, u: 'N' },
        { k: 's', l: 'Elmozdulás $\\Delta s$', min: 0.5, max: 10, st: 0.5, v: 6, d: 1, u: 'm' },
        { k: 'a', l: 'Szög $\\alpha$', min: 0, max: 180, st: 1, v: 30, d: 0, u: '°' }
      ], () => upd());
      const upd = () => {
        const c = Math.cos(v.a * Math.PI / 180), W = v.F * v.s * c;
        outs(out, [['F·cos α', nf(v.F * c, 1) + ' N'], ['W', nf(W, 0) + ' J'], ['', Math.abs(W) < 0.5 ? 'nincs munka' : W > 0 ? 'gyorsít' : 'fékez']]);
        s.redraw();
      };
      upd();
      return s.stop;
    }
  };

  A['energia-palya'] = {
    cim: 'Energiamegmaradás a pályán',
    leiras: 'Súrlódás nélkül $\\frac12 mv^2+mgh=$ áll. Ahol mélyebben jár a golyó, ott gyorsabb. Ha az indulási magasság kisebb a középső dombnál, nem jut át rajta. ($m=1$ kg, $g=9{,}81$ m/s².)',
    mount(body, out) {
      let v, st;
      const g = 9.81;
      const y = (x) => 1.25 + 1.25 * Math.cos(TAU * x / 10) + Math.exp(-Math.pow((x - 5) / 0.9, 2));
      const yp = (x) => (y(x + 1e-4) - y(x - 1e-4)) / 2e-4;
      const ypp = (x) => (y(x + 1e-3) - 2 * y(x) + y(x - 1e-3)) / 1e-6;
      const reset = () => {
        let lo = 0, hi = 3.8;
        for (let i = 0; i < 50; i++) { const m = (lo + hi) / 2; if (y(m) > v.h) lo = m; else hi = m; }
        st = { x: (lo + hi) / 2 + 0.002, u: 0 };
      };
      const s = scene(body, 2.3, (ctx, w, h, C, t, dt) => {
        if (!v) return;
        if (dt) {
          const n = 30, hh = dt / n;
          for (let i = 0; i < n; i++) {
            const p = yp(st.x), acc = -(g + ypp(st.x) * st.u * st.u) * p / (1 + p * p);
            st.u += acc * hh; st.x += st.u * hh;
            const e = v.h - y(st.x);
            if (e > 2e-3) st.u = Math.sign(st.u) * Math.sqrt(2 * g * e / (1 + p * p));
            st.x = clamp(st.x, 0.01, 9.99);
          }
        }
        const pad = 26, X = (x) => pad + x / 10 * (w - 2 * pad), base = h - 22, sy = (h - 60) / 2.6, Y = (yy) => base - yy * sy;
        ctx.save(); ctx.beginPath(); ctx.moveTo(X(0), base + 10);
        for (let x = 0; x <= 10.001; x += 0.05) ctx.lineTo(X(x), Y(y(x)));
        ctx.lineTo(X(10), base + 10); ctx.closePath();
        const gr = ctx.createLinearGradient(0, Y(2.6), 0, base); gr.addColorStop(0, alpha(C.c, 0.18)); gr.addColorStop(1, alpha(C.c, 0.02));
        ctx.fillStyle = gr; ctx.fill(); ctx.restore();
        const pts = []; for (let x = 0; x <= 10.001; x += 0.05) pts.push([X(x), Y(y(x))]);
        line(ctx, pts, C.c, 2.5);
        line(ctx, [[X(0), Y(v.h)], [X(10), Y(v.h)]], C.acc, 1.4, [6, 6]);
        txt(ctx, 'indulási magasság: E = áll.', X(10), Y(v.h) - 8, C.acc, { a: 'right', s: 12 });
        const bx = X(st.x), by = Y(y(st.x));
        dot(ctx, bx, by - 9, 9, C.fg, 16);
        const hh = y(st.x), Ek = Math.max(0, g * (v.h - hh)), Ep = g * hh, E = g * v.h;
        const bw = 14, bxp = w - 2 * bw - 40, bt = 20, bH = h * 0.36;
        rrect(ctx, bxp, bt + bH * (1 - Ep / E), bw, bH * Ep / E, 4, C.acc);
        rrect(ctx, bxp + bw + 8, bt + bH * (1 - Ek / E), bw, bH * Ek / E, 4, C.c);
        txt(ctx, 'mgh', bxp + bw / 2, bt + bH + 16, C.muted, { a: 'center', s: 11 });
        txt(ctx, '½mv²', bxp + bw * 1.5 + 8, bt + bH + 16, C.muted, { a: 'center', s: 11 });
        outs(out, [['h', nf(hh, 2) + ' m'], ['v', nf(Math.sqrt(2 * Ek), 2) + ' m/s'], ['mgh', nf(Ep, 1) + ' J'], ['½mv²', nf(Ek, 1) + ' J']]);
      });
      v = ui(body, [{ k: 'h', l: 'Indulási magasság $h_0$', min: 0.6, max: 2.45, st: 0.01, v: 2.2, d: 2, u: 'm' }], () => { reset(); s.redraw(); });
      reset(); s.redraw();
      return s.stop;
    }
  };

  /* ───────────── 4 · Rezgéstan ───────────── */

  A.rugo = {
    cim: 'Rugós rezgés',
    leiras: '$\\omega=\\sqrt{D/m}$. Nehezebb test lassabban, merevebb rugó gyorsabban rezeg. Az amplitúdó nem változtat a perióduson, csak az energián: $E=\\frac12 DA^2$.',
    mount(body, out) {
      let v;
      const s = scene(body, 2.1, (ctx, w, h, C, t) => {
        if (!v) return;
        const om = Math.sqrt(v.D / v.m), top = h * 0.3, wall = 22;
        const sc = (w * 0.2) / 0.15, cx = w * 0.42;
        const x = v.A * Math.sin(om * t);
        rrect(ctx, 8, top - 34, wall - 8, 68, 3, alpha(C.fg, 0.12));
        const bs = 30 + v.m * 10, bx = cx + x * sc;
        spring(ctx, wall, top, bx - bs / 2, top, 12, 10, C.dim, 2);
        rrect(ctx, bx - bs / 2, top - bs / 2, bs, bs, 8, alpha(C.c, 0.9));
        txt(ctx, 'm', bx, top + 5, C.bg, { a: 'center', s: 14, w: 750 });
        line(ctx, [[cx, top + bs / 2 + 6], [cx, top + bs / 2 + 16]], C.dim, 1.4);
        txt(ctx, 'x = 0', cx, top + bs / 2 + 30, C.muted, { a: 'center', s: 11 });
        // x(t) görbe az elmúlt 4 s-ról
        const py = h * 0.78, pa = h * 0.16 / 0.15, x0 = 40, x1 = w - 16;
        line(ctx, [[x0, py], [x1, py]], C.line, 1);
        txt(ctx, 'x(t)', x0 - 6, py - pa * 0.15 - 4, C.muted, { s: 11, a: 'right' });
        const pts = [];
        for (let i = 0; i <= 200; i++) { const tt = t - 4 + 4 * i / 200; pts.push([x0 + (x1 - x0) * i / 200, py - v.A * Math.sin(om * tt) * pa]); }
        line(ctx, pts, C.c, 2.2);
        dot(ctx, x1, py - x * pa, 5, C.c, 10);
      });
      v = ui(body, [
        { k: 'm', l: 'Tömeg $m$', min: 0.1, max: 2, st: 0.05, v: 0.5, d: 2, u: 'kg' },
        { k: 'D', l: 'Rugóállandó $D$', min: 5, max: 100, st: 1, v: 20, d: 0, u: 'N/m' },
        { k: 'A', l: 'Amplitúdó $A$', min: 0.02, max: 0.15, st: 0.005, v: 0.1, d: 3, u: 'm' }
      ], () => upd());
      const upd = () => {
        const om = Math.sqrt(v.D / v.m), T = TAU / om;
        outs(out, [['ω', nf(om, 2) + ' 1/s'], ['T', nf(T, 2) + ' s'], ['f', nf(1 / T, 2) + ' Hz'], ['E', nf(0.5 * v.D * v.A * v.A, 3) + ' J']]);
        s.redraw();
      };
      upd();
      return s.stop;
    }
  };

  A.csillapitott = {
    cim: 'Csillapított rezgés',
    leiras: 'Az amplitúdó $e^{-\\beta t}$ szerint csökken (szaggatott burkoló). A rezgés lassabb: $\\omega_{cs}=\\sqrt{\\omega_0^2-\\beta^2}$. A képlet csak $\\omega_0>\\beta$ esetén érvényes.',
    mount(body, out) {
      let v;
      const s = scene(body, 2.3, (ctx, w, h, C, t) => {
        if (!v) return;
        const x0 = 40, x1 = w - 16, mid = h * 0.5, amp = h * 0.38, T = 5;
        const X = (tt) => x0 + tt / T * (x1 - x0);
        axes(ctx, x0, mid, x1, 14, C, 't (s)', 'x');
        const env = (tt) => Math.exp(-v.b * tt);
        line(ctx, Array.from({ length: 201 }, (_, i) => [X(T * i / 200), mid - env(T * i / 200) * amp]), C.acc, 1.4, [5, 5]);
        line(ctx, Array.from({ length: 201 }, (_, i) => [X(T * i / 200), mid + env(T * i / 200) * amp]), C.acc, 1.4, [5, 5]);
        const ok = v.w0 > v.b;
        if (ok) {
          const wc = Math.sqrt(v.w0 * v.w0 - v.b * v.b);
          const x = (tt) => env(tt) * Math.cos(wc * tt);
          line(ctx, Array.from({ length: 601 }, (_, i) => [X(T * i / 600), mid - x(T * i / 600) * amp]), C.c, 2.4);
          const tt = FZ().reduce ? 0 : (t % 6.5) / 6.5 * T;
          dot(ctx, X(tt), mid - x(tt) * amp, 6, C.c, 14);
        } else {
          txt(ctx, 'ω₀ ≤ β: nincs rezgés, a képlet itt nem érvényes', (x0 + x1) / 2, mid - 12, C.acc, { a: 'center', s: 14 });
        }
      });
      v = ui(body, [
        { k: 'w0', l: 'Sajátkörfrekvencia $\\omega_0$', min: 2, max: 12, st: 0.1, v: 8, d: 1, u: '1/s' },
        { k: 'b', l: 'Csillapítás $\\beta$', min: 0, max: 6, st: 0.05, v: 0.6, d: 2, u: '1/s' }
      ], () => upd());
      const upd = () => {
        const ok = v.w0 > v.b, wc = ok ? Math.sqrt(v.w0 * v.w0 - v.b * v.b) : NaN;
        outs(out, [['ω_cs', ok ? nf(wc, 2) + ' 1/s' : '–'], ['T_cs', ok ? nf(TAU / wc, 2) + ' s' : '–'], ['felezési idő', v.b > 0 ? nf(Math.LN2 / v.b, 2) + ' s' : '∞']]);
        s.redraw();
      };
      upd();
      return s.stop;
    }
  };

  A.rezonancia = {
    cim: 'Rezonancia',
    leiras: '$A_g=\\frac{a_0}{\\sqrt{(\\omega_0^2-\\omega_g^2)^2+4\\beta^2\\omega_g^2}}$, itt a nyugalmi kitéréshez ($a_0/\\omega_0^2$) viszonyítva. Kis csillapításnál $\\omega_g\\approx\\omega_0$ körül nagyon nagy. A fáziskésés: $\\operatorname{tg}\\delta=\\frac{2\\beta\\omega_g}{\\omega_0^2-\\omega_g^2}$. ($\\omega_0=5$ 1/s.)',
    mount(body, out) {
      let v;
      const w0 = 5;
      const Ar = (wg, b) => w0 * w0 / Math.sqrt(Math.pow(w0 * w0 - wg * wg, 2) + 4 * b * b * wg * wg);
      const s = scene(body, 2.3, (ctx, w, h, C, t) => {
        if (!v) return;
        const x0 = 44, x1 = w * 0.78, y0 = h - 30, y1 = 16, ymax = 13;
        const X = (wg) => x0 + wg / 12 * (x1 - x0 - 10), Y = (a) => y0 - Math.min(a, ymax) / ymax * (y0 - y1 - 10);
        axes(ctx, x0, y0, x1, y1, C, 'ω_g', 'A_g / A₀');
        line(ctx, [[X(w0), y0], [X(w0), y1 + 10]], C.dim, 1.2, [4, 5]);
        txt(ctx, 'ω₀', X(w0), y0 + 16, C.muted, { a: 'center', s: 12 });
        [0.25, 1, 3].forEach((b) => line(ctx, Array.from({ length: 241 }, (_, i) => [X(12 * i / 240), Y(Ar(12 * i / 240, b))]), alpha(C.fg, 0.12), 1.2));
        line(ctx, Array.from({ length: 481 }, (_, i) => [X(12 * i / 480), Y(Ar(12 * i / 480, v.b))]), C.c, 2.6);
        const a = Ar(v.wg, v.b);
        line(ctx, [[X(v.wg), y0], [X(v.wg), Y(a)]], C.acc, 1.2, [3, 4]);
        dot(ctx, X(v.wg), Y(a), 6, C.acc, 14);
        // rezgő test jobb oldalt
        const d = Math.atan2(2 * v.b * v.wg, w0 * w0 - v.wg * v.wg);
        const cx = w * 0.9, cy = h * 0.5, amp = Math.min(a, ymax) / ymax * h * 0.36;
        const tt = FZ().reduce ? 0.3 : t;
        line(ctx, [[cx, 10], [cx, h - 10]], C.line, 1);
        const gy = cy - Math.sin(v.wg * tt) * h * 0.05;
        line(ctx, [[cx - 26, gy], [cx - 14, gy]], C.dim, 3);
        txt(ctx, 'gerj.', cx - 20, 14, C.dim, { a: 'center', s: 10, b: 'top' });
        rrect(ctx, cx - 10, cy - Math.sin(v.wg * tt - d) * amp - 10, 20, 20, 5, C.acc);
      });
      v = ui(body, [
        { k: 'wg', l: 'Gerjesztő körfrekvencia $\\omega_g$', min: 0, max: 12, st: 0.05, v: 4, d: 2, u: '1/s' },
        { k: 'b', l: 'Csillapítás $\\beta$', min: 0.2, max: 4, st: 0.05, v: 0.5, d: 2, u: '1/s' }
      ], () => upd());
      const upd = () => {
        const d = Math.atan2(2 * v.b * v.wg, w0 * w0 - v.wg * v.wg);
        outs(out, [['A_g / A₀', nf(Ar(v.wg, v.b), 2) + '×'], ['δ', nf(d * 180 / Math.PI, 0) + '°']]);
        s.redraw();
      };
      upd();
      return s.stop;
    }
  };

  A.eredo = {
    cim: 'Két rezgés összege (forgóvektorok)',
    leiras: 'Azonos frekvenciájú, egyirányú rezgéseket vektorként adunk össze: $A=\\sqrt{A_1^2+A_2^2+2A_1A_2\\cos(\\varphi_1-\\varphi_2)}$. Azonos fázis: $A_1+A_2$. Ellentétes: $|A_1-A_2|$.',
    mount(body, out) {
      let v;
      const s = scene(body, 2.3, (ctx, w, h, C, t) => {
        if (!v) return;
        const om = 1.3, tt = FZ().reduce ? 0.6 : t, cx = h * 0.5, cy = h * 0.5, sc = h * 0.42 / 6;
        const d = v.d * Math.PI / 180;
        const p1 = om * tt, p2 = om * tt + d;
        const a1 = [v.A1 * Math.cos(p1), v.A1 * Math.sin(p1)], a2 = [v.A2 * Math.cos(p2), v.A2 * Math.sin(p2)];
        ctx.save(); ctx.strokeStyle = C.line; ctx.beginPath(); ctx.arc(cx, cy, 6 * sc, 0, TAU); ctx.stroke(); ctx.restore();
        arrow(ctx, cx, cy, cx + a1[0] * sc, cy - a1[1] * sc, C.c, 2.4);
        arrow(ctx, cx + a1[0] * sc, cy - a1[1] * sc, cx + (a1[0] + a2[0]) * sc, cy - (a1[1] + a2[1]) * sc, C.link, 2.4);
        arrow(ctx, cx, cy, cx + (a1[0] + a2[0]) * sc, cy - (a1[1] + a2[1]) * sc, C.acc, 3.2);
        // időfüggvények
        const x0 = h + 10, x1 = w - 10;
        const yy = (A, ph, k) => cy - A * Math.sin(ph - k * 0.04) * sc;
        [[v.A1, 0, C.c, 1.6], [v.A2, d, C.link, 1.6]].forEach(([A, ph, col, lw]) => line(ctx, Array.from({ length: 161 }, (_, k) => [x0 + (x1 - x0) * k / 160, yy(A, om * tt + ph, k)]), col, lw));
        line(ctx, Array.from({ length: 161 }, (_, k) => [x0 + (x1 - x0) * k / 160, cy - (v.A1 * Math.sin(om * tt - k * 0.04) + v.A2 * Math.sin(om * tt + d - k * 0.04)) * sc]), C.acc, 2.8);
        line(ctx, [[cx + (a1[0] + a2[0]) * sc, cy - (a1[1] + a2[1]) * sc], [x0, cy - (a1[1] + a2[1]) * sc]], C.dim, 1, [2, 4]);
        txt(ctx, 'A₁', 12, 20, C.c, { s: 13, w: 700 }); txt(ctx, 'A₂', 40, 20, C.link, { s: 13, w: 700 }); txt(ctx, 'eredő', 68, 20, C.acc, { s: 13, w: 700 });
      });
      v = ui(body, [
        { k: 'A1', l: '$A_1$', min: 0.5, max: 3, st: 0.1, v: 2, d: 1 },
        { k: 'A2', l: '$A_2$', min: 0.5, max: 3, st: 0.1, v: 1.5, d: 1 },
        { k: 'd', l: 'Fáziskülönbség $\\varphi_2-\\varphi_1$', min: 0, max: 360, st: 1, v: 60, d: 0, u: '°' }
      ], () => upd());
      const upd = () => {
        const A = Math.sqrt(v.A1 * v.A1 + v.A2 * v.A2 + 2 * v.A1 * v.A2 * Math.cos(v.d * Math.PI / 180));
        outs(out, [['A', nf(A, 2)], ['A₁ + A₂', nf(v.A1 + v.A2, 1)], ['|A₁ − A₂|', nf(Math.abs(v.A1 - v.A2), 1)]]);
        s.redraw();
      };
      upd();
      return s.stop;
    }
  };

  /* ───────────── 5 · Pontrendszerek ───────────── */

  A.utkozes2 = {
    cim: 'Egyenes, centrális ütközés',
    leiras: 'Mindkét esetben megmarad a lendület. Rugalmasnál a mozgási energia is. Rugalmatlannál együtt mennek tovább: $v\'=\\frac{m_1v_1+m_2v_2}{m_1+m_2}$, és energia vész el.',
    mount(body, out) {
      let v, mode = 'rug';
      const res = () => {
        const { m1, m2, v1, v2 } = v;
        if (mode === 'rug') return [((m1 - m2) * v1 + 2 * m2 * v2) / (m1 + m2), ((m2 - m1) * v2 + 2 * m1 * v1) / (m1 + m2)];
        const u = (m1 * v1 + m2 * v2) / (m1 + m2); return [u, u];
      };
      const s = scene(body, 2.6, (ctx, w, h, C, t) => {
        if (!v) return;
        const gy = h * 0.66, X = (x) => 20 + x / 10 * (w - 40);
        line(ctx, [[10, gy], [w - 10, gy]], C.line, 2);
        const meet = v.v1 > v.v2;
        const tc = 1.3, cyc = 2.8, tau = FZ().reduce ? tc + 0.6 : (t * 0.5) % cyc;
        const [u1, u2] = res();
        const cw = 0.8;
        let x1, x2;
        if (!meet) { x1 = 3; x2 = 7; } else if (tau < tc) { x1 = 5 - cw / 2 + v.v1 * (tau - tc); x2 = 5 + cw / 2 + v.v2 * (tau - tc); } else { x1 = 5 - cw / 2 + u1 * (tau - tc); x2 = 5 + cw / 2 + u2 * (tau - tc); }
        const draw = (x, m, col, lab, vel) => {
          const bw = X(cw) - X(0), bh = 24 + m * 7;
          rrect(ctx, X(x) - bw / 2, gy - bh, bw, bh, 8, col);
          txt(ctx, lab, X(x), gy - bh / 2 + 5, C.bg, { a: 'center', s: 13, w: 750 });
          if (Math.abs(vel) > 0.01) arrow(ctx, X(x), gy - bh - 14, X(x) + vel * 14, gy - bh - 14, col, 2.4);
        };
        const after = meet && tau >= tc;
        draw(x1, v.m1, C.c, 'm₁', after ? u1 : v.v1);
        draw(x2, v.m2, C.acc, 'm₂', after ? u2 : v.v2);
        if (!meet) txt(ctx, 'v₁ ≤ v₂: nem érik utol egymást', w / 2, h * 0.22, C.muted, { a: 'center', s: 14 });
        else txt(ctx, after ? 'ütközés után' : 'ütközés előtt', w / 2, h * 0.2, C.muted, { a: 'center', s: 13 });
      });
      chips(body, [['rug', 'Rugalmas'], ['rugtlan', 'Rugalmatlan']], mode, (k) => { mode = k; upd(); });
      v = ui(body, [
        { k: 'm1', l: '$m_1$', min: 1, max: 5, st: 0.5, v: 2, d: 1, u: 'kg' },
        { k: 'm2', l: '$m_2$', min: 1, max: 5, st: 0.5, v: 1, d: 1, u: 'kg' },
        { k: 'v1', l: '$v_1$', min: 0, max: 5, st: 0.1, v: 3, d: 1, u: 'm/s' },
        { k: 'v2', l: '$v_2$', min: -3, max: 3, st: 0.1, v: 0, d: 1, u: 'm/s' }
      ], () => upd());
      const upd = () => {
        const [u1, u2] = res(), p = v.m1 * v.v1 + v.m2 * v.v2;
        const E0 = 0.5 * v.m1 * v.v1 * v.v1 + 0.5 * v.m2 * v.v2 * v.v2, E1 = 0.5 * v.m1 * u1 * u1 + 0.5 * v.m2 * u2 * u2;
        outs(out, [["v₁'", nf(u1, 2) + ' m/s'], ["v₂'", nf(u2, 2) + ' m/s'], ['Σp', nf(p, 1) + ' kg·m/s'], ['ΔE', nf(E1 - E0, 2) + ' J']]);
        s.redraw();
      };
      upd();
      return s.stop;
    }
  };

  /* ───────────── 6 · Merev testek ───────────── */

  A.forgas = {
    cim: 'Forgás: Θβ = M',
    leiras: 'Ugyanakkora nyomaték ($M=FR$) a kisebb $\\Theta$-jú testet jobban gyorsítja. Azonos $m$ és $R$ mellett: gömb $\\frac25 mR^2$ < korong $\\frac12 mR^2$ < abroncs $mR^2$. 4 s-onként újraindul.',
    mount(body, out) {
      let v, shape = 'korong';
      const k = { abroncs: 1, korong: 0.5, gomb: 0.4 };
      const vals = () => { const Th = k[shape] * v.m * v.R * v.R, M = v.F * v.R; return { Th, M, b: M / Th }; };
      const s = scene(body, 2.2, (ctx, w, h, C, t) => {
        if (!v) return;
        const { b } = vals(), tau = FZ().reduce ? 1 : t % 4;
        const phi = 0.5 * b * tau * tau, om = b * tau;
        const cx = w * 0.36, cy = h * 0.52, R = (h * 0.4) * (0.45 + 0.55 * v.R / 0.5);
        ctx.save();
        if (shape === 'gomb') {
          const g = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.35, R * 0.1, cx, cy, R);
          g.addColorStop(0, alpha(C.c, 0.95)); g.addColorStop(1, alpha(C.c, 0.25));
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.fill();
        } else if (shape === 'korong') {
          ctx.fillStyle = alpha(C.c, 0.5); ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.fill();
        } else {
          ctx.strokeStyle = alpha(C.c, 0.9); ctx.lineWidth = 10; ctx.beginPath(); ctx.arc(cx, cy, R - 5, 0, TAU); ctx.stroke();
        }
        ctx.restore();
        for (let i = 0; i < 6; i++) { const a = -phi + i * TAU / 6; line(ctx, [[cx, cy], [cx + Math.cos(a) * R * 0.92, cy + Math.sin(a) * R * 0.92]], alpha(C.fg, i ? 0.25 : 0.85), i ? 1.4 : 2.4); }
        dot(ctx, cx, cy, 4, C.fg);
        const fl = 20 + v.F * 1.6;
        arrow(ctx, cx, cy - R, cx + fl, cy - R, C.acc, 3);
        txt(ctx, 'F', cx + fl + 6, cy - R + 5, C.acc, { s: 15, w: 700 });
        line(ctx, [[cx, cy], [cx, cy - R]], C.acc, 1.2, [3, 4]);
        txt(ctx, 'R', cx - 14, cy - R / 2, C.acc, { s: 13, w: 700 });
        const bx = w * 0.66, bw = w * 0.28, by = h * 0.3;
        txt(ctx, 'ω(t)', bx, by - 10, C.muted, { s: 12 });
        rrect(ctx, bx, by, bw, 12, 6, alpha(C.fg, 0.08));
        const omMax = Math.max(...Object.values(k).map((kk) => v.F * v.R / (kk * v.m * v.R * v.R))) * 4;
        rrect(ctx, bx, by, Math.max(12, bw * om / omMax), 12, 6, C.c);
        txt(ctx, 't = ' + nf(tau, 1) + ' s', bx, by + 36, C.muted, { s: 12 });
        txt(ctx, 'ω = ' + nf(om, 1) + ' 1/s', bx, by + 56, C.fg, { s: 15, w: 700 });
      });
      chips(body, [['abroncs', 'Abroncs'], ['korong', 'Korong'], ['gomb', 'Gömb']], shape, (kk) => { shape = kk; s.reset(); upd(); });
      v = ui(body, [
        { k: 'm', l: 'Tömeg $m$', min: 1, max: 10, st: 0.5, v: 2, d: 1, u: 'kg' },
        { k: 'R', l: 'Sugár $R$', min: 0.1, max: 0.5, st: 0.01, v: 0.3, d: 2, u: 'm' },
        { k: 'F', l: 'Erő a peremen $F$', min: 1, max: 50, st: 1, v: 10, d: 0, u: 'N' }
      ], () => { s.reset(); upd(); });
      const upd = () => {
        const { Th, M, b } = vals();
        outs(out, [['Θ', nf(Th, 3) + ' kg·m²'], ['M', nf(M, 2) + ' N·m'], ['β = M/Θ', nf(b, 1) + ' 1/s²']]);
        s.redraw();
      };
      upd();
      return s.stop;
    }
  };

  A.steiner = {
    cim: 'Steiner-tétel: korong, mint fizikai inga',
    leiras: '$\\Theta_A=\\Theta_S+ms^2$, itt $\\Theta_S=\\frac12 mR^2$. Lengésidő: $T=2\\pi\\sqrt{\\frac{\\Theta_A}{mgs}}$. A tömeg kiesik, $T$ nem függ $m$-től.',
    mount(body, out) {
      let v;
      const vals = () => { const s = v.sr * v.R, TS = 0.5 * v.m * v.R * v.R, TA = TS + v.m * s * s; return { s, TS, TA, T: TAU * Math.sqrt(TA / (v.m * 9.81 * s)) }; };
      const sc = scene(body, 2.1, (ctx, w, h, C, t) => {
        if (!v) return;
        const { s, T } = vals();
        const th = (FZ().reduce ? 0.5 : Math.cos(TAU * t / T)) * 0.3;
        const px = w * 0.38, py = h * 0.16, k = (h * 0.34) / 0.5;
        const R = v.R * k, d = s * k;
        const cx = px + Math.sin(th) * d, cy = py + Math.cos(th) * d;
        line(ctx, [[px - 40, py - 8], [px + 40, py - 8]], C.line, 3);
        line(ctx, [[px, py], [px, py + h * 0.78]], C.line, 1, [3, 5]);
        ctx.save(); ctx.fillStyle = alpha(C.c, 0.45); ctx.strokeStyle = C.c; ctx.lineWidth = 1.6;
        ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore();
        line(ctx, [[px, py], [cx, cy]], C.acc, 2);
        dot(ctx, px, py, 5, C.fg);
        txt(ctx, 'A', px + 10, py - 12, C.fg, { s: 14, w: 700 });
        dot(ctx, cx, cy, 4, C.acc);
        txt(ctx, 'S', cx + 9, cy + 5, C.acc, { s: 14, w: 700 });
        txt(ctx, 's', (px + cx) / 2 + 8, (py + cy) / 2, C.acc, { s: 13, w: 700 });
        // T(s) görbe
        const x0 = w * 0.66, x1 = w - 14, y0 = h - 28, y1 = 20;
        axes(ctx, x0, y0, x1, y1, C, 's/R', 'T');
        const Tf = (sr) => TAU * Math.sqrt((0.5 * v.R * v.R + sr * sr * v.R * v.R) / (9.81 * sr * v.R));
        const Tm = Tf(0.08);
        line(ctx, Array.from({ length: 101 }, (_, i) => { const sr = 0.08 + 0.92 * i / 100; return [x0 + (x1 - x0 - 8) * (sr - 0.08) / 0.92, y0 - Tf(sr) / Tm * (y0 - y1 - 8)]; }), C.c, 2);
        dot(ctx, x0 + (x1 - x0 - 8) * (v.sr - 0.08) / 0.92, y0 - T / Tm * (y0 - y1 - 8), 5, C.acc, 10);
      });
      v = ui(body, [
        { k: 'm', l: 'Tömeg $m$', min: 0.5, max: 5, st: 0.1, v: 1, d: 1, u: 'kg' },
        { k: 'R', l: 'Sugár $R$', min: 0.1, max: 0.5, st: 0.01, v: 0.3, d: 2, u: 'm' },
        { k: 'sr', l: 'Tengelytávolság $s/R$', min: 0.08, max: 1, st: 0.01, v: 0.8, d: 2 }
      ], () => upd());
      const upd = () => {
        const r = vals();
        outs(out, [['s', nf(r.s, 3) + ' m'], ['Θ_S', nf(r.TS, 4) + ' kg·m²'], ['Θ_A', nf(r.TA, 4) + ' kg·m²'], ['T', nf(r.T, 2) + ' s']]);
        sc.redraw();
      };
      upd();
      return sc.stop;
    }
  };

  /* ───────────── 7 · Deformálható testek ───────────── */

  A.hooke = {
    cim: 'Nyújtás: Hooke-törvény',
    leiras: '$\\Delta l=\\frac{F\\,l_0}{E\\,A}$, $\\sigma=F/A$, $\\varepsilon=\\Delta l/l_0$, $\\sigma=E\\varepsilon$. A rajzon a megnyúlás 200×-osra nagyítva. Acél: $E=2{,}14\\cdot10^{11}$ N/m² (a diáról).',
    mount(body, out) {
      let v, cur = 0;
      const vals = () => { const A = Math.PI * Math.pow(v.d / 1000, 2) / 4, sg = v.F * 1000 / A, E = v.E * 1e9, e = sg / E; return { A, sg, e, dl: e * v.l }; };
      const s = scene(body, 2.1, (ctx, w, h, C, t, dt) => {
        if (!v) return;
        const r = vals();
        cur = dt ? lerp(cur, r.e, 1 - Math.exp(-dt * 8)) : (FZ().reduce || !cur ? r.e : cur);
        const cx = w * 0.24, top = 18, L0 = (h - 90) * (0.5 + 0.5 * v.l / 5);
        const L = L0 * (1 + Math.min(cur * 200, 0.6));
        const rw = 6 + v.d * 0.9;
        line(ctx, [[cx - 50, top], [cx + 50, top]], C.line, 4);
        rrect(ctx, cx - rw / 2, top, rw, L, 3, alpha(C.c, 0.75));
        line(ctx, [[cx + rw / 2 + 14, top + L0], [cx + rw / 2 + 34, top + L0]], C.dim, 1.2, [3, 3]);
        txt(ctx, 'l₀', cx + rw / 2 + 38, top + L0 + 4, C.muted, { s: 12 });
        if (L - L0 > 4) { line(ctx, [[cx + rw / 2 + 24, top + L0], [cx + rw / 2 + 24, top + L]], C.acc, 2); txt(ctx, 'Δl', cx + rw / 2 + 30, top + (L0 + L) / 2 + 4, C.acc, { s: 12, w: 700 }); }
        arrow(ctx, cx, top + L, cx, top + L + 18 + v.F * 0.5, C.fg, 3);
        txt(ctx, 'F', cx + 10, top + L + 18 + v.F * 0.5, C.fg, { s: 14, w: 700 });
        // σ–ε diagram
        const x0 = w * 0.5, x1 = w - 16, y0 = h - 28, y1 = 18, em = 0.004, sm = 250 * em * 1e9;
        axes(ctx, x0, y0, x1, y1, C, 'ε', 'σ');
        const X = (e) => x0 + Math.min(e, em) / em * (x1 - x0 - 10), Y = (sg) => y0 - Math.min(sg, sm) / sm * (y0 - y1 - 10);
        const eTop = Math.min(em, sm / (v.E * 1e9));
        line(ctx, [[X(0), Y(0)], [X(eTop), Y(eTop * v.E * 1e9)]], C.c, 2.2);
        txt(ctx, 'meredekség: E', X(eTop * 0.5) + 10, Y(eTop * 0.5 * v.E * 1e9) + 16, C.muted, { s: 11 });
        if (r.e <= em && r.sg <= sm) dot(ctx, X(r.e), Y(r.sg), 6, C.acc, 12);
        else txt(ctx, 'a skálán kívül', x1, y1 + 14, C.acc, { a: 'right', s: 12 });
      });
      v = ui(body, [
        { k: 'F', l: 'Húzóerő $F$', min: 0, max: 100, st: 1, v: 20, d: 0, u: 'kN' },
        { k: 'd', l: 'Átmérő $d$', min: 5, max: 30, st: 0.5, v: 12, d: 1, u: 'mm' },
        { k: 'l', l: 'Hossz $l_0$', min: 0.5, max: 5, st: 0.1, v: 2, d: 1, u: 'm' },
        { k: 'E', l: 'Young-modulus $E$', min: 20, max: 250, st: 1, v: 214, d: 0, u: 'GPa' }
      ], () => upd());
      const upd = () => {
        const r = vals();
        outs(out, [['σ', nf(r.sg / 1e6, 0) + ' MPa'], ['ε', sci(r.e, 2)], ['Δl', nf(r.dl * 1000, 2) + ' mm']]);
        s.redraw();
      };
      upd();
      return s.stop;
    }
  };

  A.hajlitas = {
    cim: 'Befogott rúd lehajlása',
    leiras: '$s=\\frac{1}{3E}\\frac{l^3}{I}F$, téglalapra $I=\\frac{ab^3}{12}$. A $b$ (hajlítás irányú méret) köbösen számít: kétszer vastagabb rúd 8× kevésbé hajlik. Acél, $E=2{,}14\\cdot10^{11}$ N/m². A görbe alakja szemléltetés.',
    mount(body, out) {
      let v;
      const E = 2.14e11;
      const vals = () => { const a = v.a / 1000, b = v.b / 1000, I = a * b * b * b / 12; return { I, s: Math.pow(v.l, 3) * v.F / (3 * E * I) }; };
      const sc = scene(body, 2.3, (ctx, w, h, C, t) => {
        if (!v) return;
        const { s } = vals();
        const x0 = 40, Lp = (w * 0.62 - x0) * (0.5 + 0.5 * v.l / 3), y0 = h * 0.3, th = 4 + v.b * 0.35;
        const sp = Math.min(s * 3000, h * 0.5);
        const wob = FZ().reduce ? 1 : 1 + 0.03 * Math.sin(t * 3);
        rrect(ctx, x0 - 26, y0 - 50, 26, 100, 3, alpha(C.fg, 0.14));
        const pts = [];
        for (let i = 0; i <= 60; i++) { const u = i / 60; pts.push([x0 + Lp * u, y0 + sp * wob * u * u * (3 - u) / 2]); }
        ctx.save(); ctx.strokeStyle = alpha(C.c, 0.85); ctx.lineWidth = th; ctx.lineCap = 'butt';
        ctx.beginPath(); pts.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]))); ctx.stroke(); ctx.restore();
        line(ctx, [[x0, y0], [x0 + Lp, y0]], C.dim, 1, [4, 4]);
        const ex = x0 + Lp, ey = y0 + sp * wob;
        arrow(ctx, ex, ey + th / 2, ex, ey + th / 2 + 18 + v.F / 25, C.acc, 3);
        txt(ctx, 'F', ex + 8, ey + 24, C.acc, { s: 14, w: 700 });
        if (sp > 10) { line(ctx, [[ex + 26, y0], [ex + 26, ey]], C.fg, 1.4); txt(ctx, 's', ex + 32, (y0 + ey) / 2 + 4, C.fg, { s: 13, w: 700 }); }
        txt(ctx, 'rajz: 3000× nagyítva', x0, h - 12, C.dim, { s: 11 });
        // keresztmetszet
        const qx = w * 0.84, qy = h * 0.42, qa = v.a * 0.9, qb = v.b * 0.9;
        rrect(ctx, qx - qa / 2, qy - qb / 2, qa, qb, 2, alpha(C.c, 0.5), C.c);
        txt(ctx, 'a', qx, qy + qb / 2 + 16, C.muted, { a: 'center', s: 12 });
        txt(ctx, 'b', qx + qa / 2 + 8, qy + 4, C.muted, { s: 12 });
        arrow(ctx, qx, qy - qb / 2 - 30, qx, qy - qb / 2 - 6, C.acc, 2);
        txt(ctx, 'keresztmetszet', qx, Math.min(h - 8, qy + qb / 2 + 34), C.dim, { a: 'center', s: 11 });
      });
      v = ui(body, [
        { k: 'F', l: 'Erő $F$', min: 0, max: 1000, st: 10, v: 200, d: 0, u: 'N' },
        { k: 'l', l: 'Hossz $l$', min: 0.5, max: 3, st: 0.05, v: 1, d: 2, u: 'm' },
        { k: 'a', l: 'Szélesség $a$', min: 10, max: 100, st: 1, v: 40, d: 0, u: 'mm' },
        { k: 'b', l: 'Vastagság $b$', min: 10, max: 100, st: 1, v: 20, d: 0, u: 'mm' }
      ], () => upd());
      const upd = () => {
        const r = vals();
        outs(out, [['I', nf(r.I * 1e8, 2) + ' cm⁴'], ['s', nf(r.s * 1000, 2) + ' mm']]);
        sc.redraw();
      };
      upd();
      return sc.stop;
    }
  };

  /* ───────────── 8 · Hullámtan ───────────── */

  A.hullam = {
    cim: 'Haladó hullám',
    leiras: 'A piros pont csak a helyén rezeg, a hullám (a csúcs) halad tovább $c=f\\lambda$ sebességgel. Longitudinálisnál a rezgés a terjedés irányába mutat: sűrűsödések és ritkulások.',
    mount(body, out) {
      let v, mode = 'tr';
      const s = scene(body, 2.4, (ctx, w, h, C, t) => {
        if (!v) return;
        const L = 10, x0 = 20, x1 = w - 20, mid = h * 0.52, sc = (x1 - x0) / L, amp = h * 0.3 * v.A;
        const k = TAU / v.lam, om = TAU * v.f, tt = FZ().reduce ? 0 : t;
        const Z = (x) => Math.sin(k * x - om * tt);
        line(ctx, [[x0, mid], [x1, mid]], C.line, 1);
        if (mode === 'tr') {
          line(ctx, Array.from({ length: 301 }, (_, i) => { const x = L * i / 300; return [x0 + x * sc, mid - Z(x) * amp]; }), C.c, 2.6);
          for (let i = 0; i <= 40; i++) { const x = L * i / 40; dot(ctx, x0 + x * sc, mid - Z(x) * amp, 2.5, alpha(C.fg, 0.5)); }
          const xp = 3; dot(ctx, x0 + xp * sc, mid - Z(xp) * amp, 7, C.acc, 14);
          line(ctx, [[x0 + xp * sc, mid - amp - 6], [x0 + xp * sc, mid + amp + 6]], alpha(C.acc, 0.4), 1, [2, 3]);
          // λ jelölés az első csúcstól
          let xc = ((om * tt + Math.PI / 2) / k) % v.lam; if (xc < 0) xc += v.lam;
          if (xc + v.lam <= L) {
            const yb = mid - amp - 16;
            line(ctx, [[x0 + xc * sc, yb], [x0 + (xc + v.lam) * sc, yb]], C.muted, 1.4);
            line(ctx, [[x0 + xc * sc, yb - 5], [x0 + xc * sc, yb + 5]], C.muted, 1.4);
            line(ctx, [[x0 + (xc + v.lam) * sc, yb - 5], [x0 + (xc + v.lam) * sc, yb + 5]], C.muted, 1.4);
            txt(ctx, 'λ', x0 + (xc + v.lam / 2) * sc, yb - 6, C.muted, { a: 'center', s: 14, w: 700 });
            dot(ctx, x0 + xc * sc, mid - amp, 5, C.c, 12);
          }
        } else {
          const n = 64;
          for (let i = 0; i <= n; i++) {
            const x = L * i / n, dx = Z(x) * 0.18 * v.A * v.lam;
            const px = x0 + (x + dx) * sc;
            line(ctx, [[px, mid - h * 0.3], [px, mid + h * 0.3]], i === 19 ? C.acc : alpha(C.c, 0.75), i === 19 ? 3 : 2);
          }
        }
        arrow(ctx, x1 - 80, h - 16, x1 - 10, h - 16, C.muted, 1.6, 8);
        txt(ctx, 'terjedés', x1 - 88, h - 12, C.muted, { a: 'right', s: 12 });
      });
      chips(body, [['tr', 'Transzverzális'], ['lo', 'Longitudinális']], mode, (kk) => { mode = kk; s.redraw(); });
      v = ui(body, [
        { k: 'lam', l: 'Hullámhossz $\\lambda$', min: 1, max: 6, st: 0.1, v: 3, d: 1, u: 'm' },
        { k: 'f', l: 'Frekvencia $f$', min: 0.1, max: 1.5, st: 0.05, v: 0.4, d: 2, u: 'Hz' },
        { k: 'A', l: 'Amplitúdó (relatív)', min: 0.2, max: 1, st: 0.05, v: 0.8, d: 2 }
      ], () => upd());
      const upd = () => {
        outs(out, [['c = f·λ', nf(v.f * v.lam, 2) + ' m/s'], ['T', nf(1 / v.f, 2) + ' s'], ['k = 2π/λ', nf(TAU / v.lam, 2) + ' 1/m']]);
        s.redraw();
      };
      upd();
      return s.stop;
    }
  };

  A.interferencia = {
    cim: 'Két forrás interferenciája',
    leiras: 'Két azonos fázisú forrás. Útkülönbség $s_2-s_1=n\\lambda$: erősítés. $n\\lambda+\\lambda/2$: kioltás (sötét sávok). Koppints a mezőre: megmutatja az útkülönbséget abban a pontban.',
    mount(body, out) {
      let v, probe = null, off = null, img = null, geo = null;
      const WCM = 60;
      const col = { a: [0, 0, 0], b: [0, 0, 0] };
      const s = scene(body, 1.9, (ctx, w, h, C, t) => {
        if (!v) return;
        const gw = Math.max(80, Math.round(w / 4)), gh = Math.max(40, Math.round(h / 4));
        if (!off || off.width !== gw || off.height !== gh) { off = document.createElement('canvas'); off.width = gw; off.height = gh; img = off.getContext('2d').createImageData(gw, gh); }
        col.a = rgb(C.bg); col.b = rgb(C.c);
        const cmPx = gw / WCM, sy = gh * 0.1, k = TAU / v.lam, om = 2.4, tt = FZ().reduce ? 0 : t;
        const s1 = gw / 2 - v.d / 2 * cmPx, s2 = gw / 2 + v.d / 2 * cmPx;
        geo = { w, h, gw, gh, s1, s2, sy, cmPx };
        const D = img.data;
        for (let j = 0; j < gh; j++) for (let i = 0; i < gw; i++) {
          const r1 = Math.hypot(i - s1, j - sy) / cmPx, r2 = Math.hypot(i - s2, j - sy) / cmPx;
          const val = (Math.sin(k * r1 - om * tt) + Math.sin(k * r2 - om * tt)) / 2;
          const q = (val + 1) / 2, p = (j * gw + i) * 4;
          D[p] = col.a[0] + (col.b[0] - col.a[0]) * q; D[p + 1] = col.a[1] + (col.b[1] - col.a[1]) * q; D[p + 2] = col.a[2] + (col.b[2] - col.a[2]) * q; D[p + 3] = 255;
        }
        off.getContext('2d').putImageData(img, 0, 0);
        ctx.save(); ctx.imageSmoothingEnabled = true; ctx.drawImage(off, 0, 0, w, h); ctx.restore();
        const fx = w / gw;
        dot(ctx, s1 * fx, sy * fx, 6, C.fg, 12); dot(ctx, s2 * fx, sy * fx, 6, C.fg, 12);
        txt(ctx, 'S₁', s1 * fx - 10, sy * fx - 10, C.fg, { a: 'right', s: 13, w: 700 });
        txt(ctx, 'S₂', s2 * fx + 10, sy * fx - 10, C.fg, { s: 13, w: 700 });
        if (probe) {
          const [px, py] = probe;
          line(ctx, [[s1 * fx, sy * fx], [px, py]], C.fg, 1.4, [4, 4]);
          line(ctx, [[s2 * fx, sy * fx], [px, py]], C.fg, 1.4, [4, 4]);
          dot(ctx, px, py, 7, C.acc, 16);
        }
        txt(ctx, 'látómező: ' + WCM + ' cm széles', w - 10, h - 10, C.fg, { a: 'right', s: 11 });
      }, { rm: 1.1 });
      s.host.style.cursor = 'crosshair';
      const onp = (e) => {
        const r = s.host.getBoundingClientRect();
        probe = [e.clientX - r.left, e.clientY - r.top];
        upd();
      };
      s.host.addEventListener('pointerdown', onp);
      v = ui(body, [
        { k: 'lam', l: 'Hullámhossz $\\lambda$', min: 2, max: 8, st: 0.1, v: 4, d: 1, u: 'cm' },
        { k: 'd', l: 'Források távolsága $d$', min: 4, max: 24, st: 0.5, v: 12, d: 1, u: 'cm' }
      ], () => upd());
      const upd = () => {
        const rows = [['λ', nf(v.lam, 1) + ' cm']];
        if (probe && geo) {
          const fx = geo.w / geo.gw, i = probe[0] / fx, j = probe[1] / fx;
          const r1 = Math.hypot(i - geo.s1, j - geo.sy) / geo.cmPx, r2 = Math.hypot(i - geo.s2, j - geo.sy) / geo.cmPx;
          const ds = Math.abs(r2 - r1), q = ds / v.lam, fr = q - Math.floor(q);
          rows.push(['|s₂ − s₁|', nf(ds, 1) + ' cm'], ['= ? · λ', nf(q, 2)], ['', fr < 0.15 || fr > 0.85 ? 'erősítés' : Math.abs(fr - 0.5) < 0.15 ? 'kioltás' : 'átmenet']);
        } else rows.push(['', 'koppints a mezőre']);
        outs(out, rows);
        s.redraw();
      };
      upd();
      return () => { s.host.removeEventListener('pointerdown', onp); s.stop(); };
    }
  };

  A.allohullam = {
    cim: 'Állóhullám húron',
    leiras: 'Két rögzített vég: $l=n\\frac{\\lambda}{2}$. Egy rögzített, egy szabad vég: $l=n\\frac{\\lambda}{2}+\\frac{\\lambda}{4}$. Csomópont: nyugalom. Duzzadóhely: legnagyobb kitérés. Alapérték a diás példa: 75 cm, 5 m/s, 3 duzzadóhely.',
    mount(body, out) {
      let v, mode = 'rr';
      const lam = () => (mode === 'rr' ? 2 * v.l / v.n : 4 * v.l / (2 * v.n - 1));
      const s = scene(body, 2.5, (ctx, w, h, C, t) => {
        if (!v) return;
        const x0 = 30, x1 = w - 30, mid = h * 0.5, amp = h * 0.3, L = lam();
        const k = TAU / L, X = (x) => x0 + x / v.l * (x1 - x0);
        const c = FZ().reduce ? 1 : Math.cos(TAU * 0.6 * t);
        line(ctx, Array.from({ length: 201 }, (_, i) => { const x = v.l * i / 200; return [X(x), mid - Math.sin(k * x) * amp]; }), alpha(C.fg, 0.14), 1.2);
        line(ctx, Array.from({ length: 201 }, (_, i) => { const x = v.l * i / 200; return [X(x), mid + Math.sin(k * x) * amp]; }), alpha(C.fg, 0.14), 1.2);
        line(ctx, Array.from({ length: 301 }, (_, i) => { const x = v.l * i / 300; return [X(x), mid - Math.sin(k * x) * amp * c]; }), C.c, 3);
        for (let m = 0; m * L / 2 <= v.l + 1e-9; m++) { dot(ctx, X(m * L / 2), mid, 5, C.acc, 10); }
        for (let m = 0; (m + 0.5) * L / 2 <= v.l + 1e-9; m++) txt(ctx, 'D', X((m + 0.5) * L / 2), mid - amp - 12, C.muted, { a: 'center', s: 12, w: 700 });
        rrect(ctx, x0 - 14, mid - 30, 10, 60, 3, alpha(C.fg, 0.3));
        if (mode === 'rr') rrect(ctx, x1 + 4, mid - 30, 10, 60, 3, alpha(C.fg, 0.3));
        else { line(ctx, [[x1 + 8, mid - amp - 10], [x1 + 8, mid + amp + 10]], C.dim, 1.2, [3, 4]); txt(ctx, 'szabad', x1, h - 8, C.dim, { a: 'center', s: 11 }); }
        txt(ctx, '● csomópont   D duzzadóhely', x0, h - 8, C.muted, { s: 11 });
      });
      chips(body, [['rr', 'Két rögzített vég'], ['rs', 'Egy szabad vég']], mode, (kk) => { mode = kk; upd(); });
      v = ui(body, [
        { k: 'n', l: 'Duzzadóhelyek száma', min: 1, max: 6, st: 1, v: 3, d: 0 },
        { k: 'l', l: 'Húrhossz $l$', min: 0.25, max: 2, st: 0.05, v: 0.75, d: 2, u: 'm' },
        { k: 'c', l: 'Terjedési sebesség $c$', min: 1, max: 20, st: 0.5, v: 5, d: 1, u: 'm/s' }
      ], () => upd());
      const upd = () => {
        const L = lam();
        outs(out, [['λ', nf(L, 3) + ' m'], ['f = c/λ', nf(v.c / L, 2) + ' Hz']]);
        s.redraw();
      };
      upd();
      return s.stop;
    }
  };

  /* ───────────── 9 · Hangtan ───────────── */

  A.doppler = {
    cim: 'Doppler-hatás',
    leiras: 'Mozgó forrásnál a hullámfrontok előtte összetorlódnak, mögötte széthúzódnak: $f\'=\\frac{f}{1\\mp v_f/c}$. Alapérték a diás példa: 400 Hz, 20 m/s, $c=340$ m/s. Hangsebesség fölött Mach-kúp: $\\sin\\Theta=c/v_f$ (ez a puskán van, a diákon nincs).',
    mount(body, out) {
      let v, fronts = [], sx = 0, lastEmit = 0, clock = 0, started = false;
      const f0 = 400, c0 = 340;
      const restart = (w) => { fronts = []; sx = v.v > 0 ? w * 0.12 : w * 0.5; lastEmit = -1; clock = 0; };
      const s = scene(body, 2.2, (ctx, w, h, C, t, dt) => {
        if (!v) return;
        const cy = h * 0.5, cv = w * 0.11, vs = v.v / c0 * cv, per = 0.32;
        if (!started) { restart(w); started = true; }
        if (FZ().reduce && !fronts.length) { for (let i = 0; i < 14; i++) fronts.push({ x: sx + vs * i * per, t0: i * per }); clock = 14 * per; sx += vs * clock; }
        if (dt) {
          clock += dt; sx += vs * dt;
          if (clock - lastEmit >= per || lastEmit < 0) { fronts.push({ x: sx, t0: clock }); lastEmit = clock; }
          fronts = fronts.filter((f) => (clock - f.t0) * cv < w * 1.3);
          if (sx > w * 0.9) restart(w);
        }
        fronts.forEach((f) => {
          const r = (clock - f.t0) * cv, a = clamp(1 - r / (w * 0.9), 0, 1);
          ctx.save(); ctx.strokeStyle = alpha(C.c, 0.2 + 0.7 * a); ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(f.x, cy, r, 0, TAU); ctx.stroke(); ctx.restore();
        });
        if (v.v > c0) {
          const th = Math.asin(c0 / v.v), L = w;
          line(ctx, [[sx, cy], [sx - L * Math.cos(th), cy - L * Math.sin(th)]], C.acc, 2.2);
          line(ctx, [[sx, cy], [sx - L * Math.cos(th), cy + L * Math.sin(th)]], C.acc, 2.2);
          txt(ctx, 'Mach-kúp', sx - 60, cy - 60 * Math.tan(th) - 10, C.acc, { a: 'right', s: 12, w: 700 });
        }
        dot(ctx, sx, cy, 9, C.acc, 20);
        if (v.v > 0) arrow(ctx, sx + 12, cy, sx + 12 + 16 + vs * 0.4, cy, C.acc, 2.4, 8);
        txt(ctx, '👂', w - 26, cy + 6, C.fg, { a: 'center', s: 20 });
        txt(ctx, '👂', 26, cy + 6, C.fg, { a: 'center', s: 20 });
        txt(ctx, 'közeledik', w - 26, cy + 30, C.muted, { a: 'center', s: 11 });
        txt(ctx, 'távolodik', 26, cy + 30, C.muted, { a: 'center', s: 11 });
      });
      v = ui(body, [{ k: 'v', l: 'Forrás sebessége $v_f$', min: 0, max: 500, st: 1, v: 20, f: (x) => nf(x, 0) + ' m/s = ' + nf(x * 3.6, 0) + ' km/h' }], () => { restart(s.cv.size().w); upd(); });
      const upd = () => {
        const sup = v.v >= c0;
        outs(out, [["f' (közeledik)", sup ? '–' : nf(f0 / (1 - v.v / c0), 1) + ' Hz'], ["f' (távolodik)", nf(f0 / (1 + v.v / c0), 1) + ' Hz'], [sup ? 'sin Θ = c/v_f' : 'f', sup ? nf(c0 / v.v, 2) + ' → Θ = ' + nf(Math.asin(c0 / v.v) * 180 / Math.PI, 0) + '°' : '400 Hz']]);
        s.redraw();
      };
      upd();
      return s.stop;
    }
  };

  A.sip = {
    cim: 'Nyitott és zárt síp',
    leiras: 'Nyitott: $f_n=n\\frac{c}{2l}$. Zárt: $f_n=(2n-1)\\frac{c}{4l}$, csak páratlan felhangok. A pontok a levegő részecskéi: longitudinálisan rezegnek. Zárt végen csomópont, nyitott végen duzzadóhely. ($c=340$ m/s.)',
    mount(body, out) {
      let v, mode = 'ny', ac = null;
      const c0 = 340;
      const f = () => (mode === 'ny' ? v.n * c0 / (2 * v.l) : (2 * v.n - 1) * c0 / (4 * v.l));
      const env = (u) => (mode === 'ny' ? Math.cos(v.n * Math.PI * u) : Math.sin((2 * v.n - 1) * Math.PI * u / 2));
      const s = scene(body, 2.6, (ctx, w, h, C, t) => {
        if (!v) return;
        const x0 = 40, x1 = w - 40, top = h * 0.3, bot = h * 0.8, cyc = FZ().reduce ? 1 : Math.cos(TAU * 0.7 * t);
        rrect(ctx, x0, top, x1 - x0, bot - top, 10, alpha(C.c, 0.06));
        line(ctx, [[x0, top], [x1, top]], C.dim, 3); line(ctx, [[x0, bot], [x1, bot]], C.dim, 3);
        if (mode === 'za') line(ctx, [[x0, top], [x0, bot]], C.fg, 6);
        const amp = (x1 - x0) / (v.n * 2 + 2) * 0.35;
        const cols = 46, rows = 6;
        for (let i = 0; i <= cols; i++) for (let j = 0; j < rows; j++) {
          const u = i / cols, px = x0 + 8 + u * (x1 - x0 - 16) + env(u) * amp * cyc, py = top + (bot - top) * (j + 0.5) / rows;
          dot(ctx, px, py, 2.4, alpha(C.c, 0.85));
        }
        const ey = top - 30, ea = 18;
        line(ctx, Array.from({ length: 201 }, (_, i) => [x0 + (x1 - x0) * i / 200, ey - env(i / 200) * ea]), C.acc, 2);
        line(ctx, Array.from({ length: 201 }, (_, i) => [x0 + (x1 - x0) * i / 200, ey + env(i / 200) * ea]), C.acc, 2);
        txt(ctx, 'kitérés-burkoló', x0, ey - ea - 8, C.muted, { s: 11 });
        txt(ctx, mode === 'za' ? 'zárt vég' : 'nyitott', x0, h - 8, C.muted, { s: 11 });
        txt(ctx, 'nyitott', x1, h - 8, C.muted, { a: 'right', s: 11 });
      });
      const row = chips(body, [['ny', 'Nyitott síp'], ['za', 'Zárt síp']], mode, (kk) => { mode = kk; upd(); });
      const play = document.createElement('button');
      play.className = 'chip'; play.type = 'button'; play.textContent = '🔊 Meghallgatom';
      play.onclick = () => {
        try {
          ac = ac || new (window.AudioContext || window.webkitAudioContext)();
          const o = ac.createOscillator(), g = ac.createGain();
          o.frequency.value = f(); o.type = 'sine';
          g.gain.setValueAtTime(0.0001, ac.currentTime);
          g.gain.exponentialRampToValueAtTime(0.12, ac.currentTime + 0.05);
          g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + 1.2);
          o.connect(g).connect(ac.destination); o.start(); o.stop(ac.currentTime + 1.25);
        } catch (e) {}
      };
      body.lastChild.appendChild(play);
      v = ui(body, [
        { k: 'n', l: 'Módus $n$', min: 1, max: 5, st: 1, v: 1, d: 0 },
        { k: 'l', l: 'Síphossz $l$', min: 0.2, max: 2, st: 0.01, v: 0.5, d: 2, u: 'm' }
      ], () => upd());
      const upd = () => {
        const fr = f();
        outs(out, [['f', nf(fr, 0) + ' Hz'], ['λ = c/f', nf(c0 / fr, 3) + ' m'], ['', mode === 'ny' ? (v.n === 1 ? 'alaphang' : v.n + '. harmonikus') : (v.n === 1 ? 'alaphang' : (2 * v.n - 1) + '·f₁')]]);
        s.redraw();
      };
      upd();
      void row;
      return () => { s.stop(); if (ac) try { ac.close(); } catch (e) {} };
    }
  };

  A.decibel = {
    cim: 'Decibel: pontforrás',
    leiras: '$I=\\frac{P}{4\\pi r^2}$, $n=10\\lg\\frac{I}{I_0}$, $I_0=10^{-12}$ W/m². +10 dB = 10× intenzitás. Kétszer messzebb: negyed intenzitás, kb. −6 dB. Alapérték a diás feladat: 10 m-re 90 dB. A skálán a phon-példák a diákról (1000 Hz-en phon = dB).',
    mount(body, out) {
      let v;
      const vals = () => { const P = Math.pow(10, v.p), I = P / (4 * Math.PI * v.r * v.r); return { P, I, n: 10 * Math.log10(I / 1e-12) }; };
      const marks = [[0, 'hallásküszöb'], [20, 'suttogás'], [50, 'beszélgetés'], [70, 'utca'], [120, 'repülőmotor'], [130, 'fájdalomküszöb']];
      const s = scene(body, 2.3, (ctx, w, h, C, t) => {
        if (!v) return;
        const { n } = vals();
        const sx = 40, cy = h * 0.5, maxR = w * 0.55;
        const rp = clamp(v.r / 100, 0.02, 1) * maxR;
        for (let i = 0; i < 6; i++) {
          const ph = FZ().reduce ? i / 6 : ((t * 0.5 + i / 6) % 1);
          const r = ph * maxR;
          ctx.save(); ctx.strokeStyle = alpha(C.c, 0.7 * (1 - ph) * (1 - ph)); ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(sx, cy, r, -1.1, 1.1); ctx.stroke(); ctx.restore();
        }
        dot(ctx, sx, cy, 9, C.c, 18);
        line(ctx, [[sx, cy + 8], [sx + rp, cy + 8]], C.dim, 1.2, [3, 4]);
        txt(ctx, '👂', sx + rp, cy + 6, C.fg, { a: 'center', s: 20 });
        txt(ctx, 'r = ' + nf(v.r, 0) + ' m', sx + rp / 2, cy + 26, C.muted, { a: 'center', s: 12 });
        // dB skála
        const bx = w - 46, y0 = h - 16, y1 = 16, Y = (d) => y0 - clamp(d, 0, 140) / 140 * (y0 - y1);
        const g = ctx.createLinearGradient(0, y0, 0, y1); g.addColorStop(0, alpha(C.c, 0.25)); g.addColorStop(0.7, alpha(C.acc, 0.6)); g.addColorStop(1, '#ff4d4d');
        rrect(ctx, bx, y1, 14, y0 - y1, 7, alpha(C.fg, 0.07));
        rrect(ctx, bx, Y(n), 14, y0 - Y(n), 7, g);
        marks.forEach(([d, l]) => { line(ctx, [[bx - 6, Y(d)], [bx, Y(d)]], C.dim, 1); txt(ctx, l + ' ' + d, bx - 10, Y(d) + 4, C.muted, { a: 'right', s: 10.5 }); });
        txt(ctx, nf(n, 0) + ' dB', bx + 7, Y(n) - 8, C.fg, { a: 'center', s: 13, w: 750 });
      });
      v = ui(body, [
        { k: 'p', l: 'Teljesítmény $P$', min: -6, max: 2, st: 0.01, v: Math.log10(1.26), f: (x) => sci(Math.pow(10, x), 2) + ' W' },
        { k: 'r', l: 'Távolság $r$', min: 1, max: 100, st: 1, v: 10, d: 0, u: 'm' }
      ], () => upd());
      const upd = () => {
        const r = vals();
        outs(out, [['I', sci(r.I, 2) + ' W/m²'], ['n', nf(r.n, 1) + ' dB']]);
        s.redraw();
      };
      upd();
      return s.stop;
    }
  };

  /* ───────────── 10 · Optika ───────────── */

  A.lencse = {
    cim: 'Leképezés lencsével',
    leiras: '$\\frac1f=\\frac1k+\\frac1t$, $N=\\frac Kt=\\frac kt$. Húzd a tárgyat (bal oldali nyíl). $t>f$: valódi, fordított kép. $t\\lt f$: látszólagos, egyenes állású (nagyító). Szórólencsénél mindig látszólagos, kicsinyített.',
    mount(body, out) {
      let v, kind = 'gy', drag = false;
      const T = 3;
      const fz = () => (kind === 'gy' ? v.f : -v.f);
      const s = scene(body, 2.2, (ctx, w, h, C, t) => {
        if (!v) return;
        const f = fz(), XM = 26, sc = w / (2 * XM), cx = w / 2, cy = h * 0.55;
        const X = (x) => cx + x * sc, Y = (y) => cy - y * sc;
        line(ctx, [[0, cy], [w, cy]], C.line, 1);
        const lh = h * 0.42;
        ctx.save(); ctx.strokeStyle = alpha(C.link, 0.8); ctx.fillStyle = alpha(C.link, 0.12); ctx.lineWidth = 1.6; ctx.beginPath();
        const bul = kind === 'gy' ? 9 : -6;
        ctx.moveTo(cx, cy - lh); ctx.quadraticCurveTo(cx + bul + 8, cy, cx, cy + lh); ctx.quadraticCurveTo(cx - bul - 8, cy, cx, cy - lh);
        if (kind !== 'gy') { ctx.moveTo(cx - 8, cy - lh); ctx.lineTo(cx + 8, cy - lh); ctx.moveTo(cx - 8, cy + lh); ctx.lineTo(cx + 8, cy + lh); }
        ctx.fill(); ctx.stroke(); ctx.restore();
        [-1, 1].forEach((sg) => { dot(ctx, X(sg * v.f), cy, 4, C.fg); txt(ctx, 'F', X(sg * v.f), cy + 18, C.muted, { a: 'center', s: 12, w: 700 }); });
        // tárgy
        arrow(ctx, X(-v.t), cy, X(-v.t), Y(T), C.acc, 3.2);
        txt(ctx, 'tárgy', X(-v.t), Y(T) - 10, C.acc, { a: 'center', s: 12 });
        const inf = Math.abs(v.t - f) < 0.05;
        const k = inf ? Infinity : f * v.t / (v.t - f), yi = inf ? 0 : -T * k / v.t;
        const dash = FZ().reduce ? 0 : -t * 40;
        const ray = (yl, col) => {
          if (!isFinite(yl) || Math.abs(yl) * sc > lh * 1.4) return;
          line(ctx, [[X(-v.t), Y(T)], [X(0), Y(yl)]], col, 1.8);
          let dx, dy;
          if (inf) { dx = v.t; dy = -T; } else if (k > 0) { dx = k; dy = yi - yl; } else { dx = -k; dy = yl - yi; }
          const m = dy / dx, xe = XM + 2;
          line(ctx, [[X(0), Y(yl)], [X(xe), Y(yl + m * xe)]], col, 1.8);
          ctx.save(); ctx.setLineDash([4, 12]); ctx.lineDashOffset = dash; ctx.strokeStyle = C.fg; ctx.lineWidth = 2.2;
          ctx.beginPath(); ctx.moveTo(X(-v.t), Y(T)); ctx.lineTo(X(0), Y(yl)); ctx.lineTo(X(xe), Y(yl + m * xe)); ctx.stroke(); ctx.restore();
          if (!inf && k < 0) line(ctx, [[X(0), Y(yl)], [X(k), Y(yi)]], alpha(col, 0.6), 1.2, [4, 5]);
        };
        ray(T, C.c);
        ray(0, alpha(C.c, 0.85));
        ray(-T * f / (v.t - f), alpha(C.c, 0.7));
        if (!inf && Math.abs(k) < XM * 3) {
          const real = k > 0;
          ctx.save(); if (!real) ctx.globalAlpha = 0.65;
          arrow(ctx, X(k), cy, X(k), Y(yi), real ? C.c : C.link, 3.2);
          ctx.restore();
          txt(ctx, real ? 'valódi kép' : 'látszólagos kép', X(k), Y(yi) + (yi > 0 ? -10 : 20), real ? C.c : C.link, { a: 'center', s: 12 });
        }
      });
      s.host.style.touchAction = 'pan-y';
      const pos = (e) => { const r = s.host.getBoundingClientRect(); return (e.clientX - r.left) / r.width; };
      const onDown = (e) => { const p = pos(e); if (p < 0.5) { drag = true; s.host.setPointerCapture(e.pointerId); onMove(e); } };
      const onMove = (e) => { if (!drag) return; const x = (pos(e) - 0.5) * 52; v.set('t', clamp(Math.round(-x * 10) / 10, 1, 24)); upd(); };
      const onUp = () => { drag = false; };
      s.host.addEventListener('pointerdown', onDown); s.host.addEventListener('pointermove', onMove); s.host.addEventListener('pointerup', onUp);
      s.host.style.cursor = 'ew-resize';
      chips(body, [['gy', 'Gyűjtőlencse'], ['sz', 'Szórólencse']], kind, (kk) => { kind = kk; upd(); });
      v = ui(body, [
        { k: 't', l: 'Tárgytávolság $t$', min: 1, max: 24, st: 0.1, v: 12, d: 1, u: 'cm' },
        { k: 'f', l: 'Fókusztávolság $|f|$', min: 2, max: 9, st: 0.1, v: 5, d: 1, u: 'cm' }
      ], () => upd());
      const upd = () => {
        const f = fz(), inf = Math.abs(v.t - f) < 0.05, k = f * v.t / (v.t - f);
        outs(out, [['k', inf ? '∞' : nf(k, 1) + ' cm'], ['N = k/t', inf ? '∞' : nf(k / v.t, 2)], ['', inf ? 'nincs kép (t = f)' : k > 0 ? 'valódi, fordított' : 'látszólagos, egyenes']]);
        s.redraw();
      };
      upd();
      return () => { s.host.removeEventListener('pointerdown', onDown); s.host.removeEventListener('pointermove', onMove); s.host.removeEventListener('pointerup', onUp); s.stop(); };
    }
  };

  A.racs = {
    cim: 'Optikai rács',
    leiras: '$\\sin\\alpha_n=n\\frac{\\lambda}{a}$, ahol $a$ a rácsállandó. Alapérték a diás példa: 2000 rés/cm = 200 rés/mm. Vörösre nagyobb a szög, mint ibolyára. Fehér fénynél minden rendben spektrum lesz. Ernyő 1 m-re.',
    mount(body, out) {
      let v, mode = 'mono';
      const s = scene(body, 2.2, (ctx, w, h, C, t) => {
        if (!v) return;
        const gx = w * 0.1, sx = w * 0.88, cy = h * 0.5, L = sx - gx, a = 1e-3 / v.N;
        const dash = FZ().reduce ? 0 : -t * 50;
        for (let i = -6; i <= 6; i++) line(ctx, [[gx - 2, cy + i * 6], [gx + 2, cy + i * 6]], C.fg, 1.6);
        line(ctx, [[gx, cy - h * 0.4], [gx, cy + h * 0.4]], C.dim, 1);
        line(ctx, [[sx, 8], [sx, h - 8]], C.fg, 2);
        txt(ctx, 'rács', gx, h - 8, C.muted, { a: 'center', s: 11 });
        txt(ctx, 'ernyő', sx, h - 8 + 0, C.muted, { a: 'right', s: 11 });
        ctx.save(); ctx.setLineDash([4, 10]); ctx.lineDashOffset = dash; line(ctx, [[0, cy], [gx, cy]], mode === 'mono' ? wl(v.l) : C.fg, 3); ctx.restore();
        const order = (lam, n, col, lw, lab) => {
          const sn = n * lam * 1e-9 / a;
          if (Math.abs(sn) >= 1) return null;
          const al = Math.asin(sn), y = cy - L * Math.tan(al);
          if (y < 4 || y > h - 4) return null;
          ctx.save(); ctx.setLineDash(lw > 1.5 ? [5, 9] : []); ctx.lineDashOffset = dash;
          line(ctx, [[gx, cy], [sx, y]], col, lw); ctx.restore();
          dot(ctx, sx, y, lw > 1.5 ? 5 : 2, col, lw > 1.5 ? 12 : 0);
          if (lab) txt(ctx, lab, sx + 10, y + 4, C.muted, { s: 11 });
          return al;
        };
        if (mode === 'mono') {
          for (let n = -6; n <= 6; n++) order(v.l, n, wl(v.l), 2.4, 'n=' + n);
        } else {
          for (let n = -4; n <= 4; n++) { if (!n) { order(550, 0, '#fff', 2.4, 'n=0'); continue; } for (let lam = 380; lam <= 760; lam += 6) order(lam, n, wl(lam, 0.55), 1.2); }
        }
      });
      chips(body, [['mono', 'Egyszínű'], ['feher', 'Fehér fény']], mode, (kk) => { mode = kk; s.redraw(); });
      v = ui(body, [
        { k: 'l', l: 'Hullámhossz $\\lambda$', min: 380, max: 760, st: 1, v: 600, d: 0, u: 'nm' },
        { k: 'N', l: 'Rések sűrűsége', min: 50, max: 800, st: 10, v: 200, d: 0, u: 'rés/mm' }
      ], () => upd());
      const upd = () => {
        const a = 1e-3 / v.N, s1 = v.l * 1e-9 / a, nmax = Math.floor(a / (v.l * 1e-9));
        outs(out, [['a', nf(a * 1e6, 2) + ' µm'], ['α₁', s1 < 1 ? nf(Math.asin(s1) * 180 / Math.PI, 1) + '°' : '–'], ['tg α₁', s1 < 1 ? nf(Math.tan(Math.asin(s1)), 3) : '–'], ['n max', String(nmax)]]);
        s.redraw();
      };
      upd();
      return s.stop;
    }
  };

  A.tavcso = {
    cim: 'Kepler-távcső',
    leiras: '$N=f_1/f_2$. Felbontás: $\\varphi\\approx0{,}138\'\'/D$. Értelmes határok: $N_{max}\\approx430D$ (felette üres nagyítás), $N_{min}=D/8$ mm (alatta a kilépő nyaláb szélesebb a pupillánál). Alapérték a diás példa: $D=50$ mm. A rajz vázlat, nem méretarányos.',
    mount(body, out) {
      let v;
      const vals = () => { const N = v.f1 / (v.f2 / 1000), Dm = v.D / 1000; return { N, Nmax: 430 * Dm, Nmin: v.D / 8, phi: 0.138 / Dm, exit: v.D / N }; };
      const s = scene(body, 2.4, (ctx, w, h, C, t) => {
        if (!v) return;
        const r = vals();
        const ox = w * 0.14, cy = h * 0.5, f1v = w * 0.5, Nv = Math.min(r.N, 8), f2v = f1v / Nv, ex = ox + f1v + f2v, fx = ox + f1v;
        const Dv = h * 0.18 + h * 0.18 * v.D / 200, al = 2.5 * Math.PI / 180;
        const dash = FZ().reduce ? 0 : -t * 40;
        line(ctx, [[0, cy], [w, cy]], C.line, 1);
        const lens = (x, hh, col) => { ctx.save(); ctx.strokeStyle = col; ctx.fillStyle = alpha(col, 0.12); ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(x, cy - hh); ctx.quadraticCurveTo(x + 12, cy, x, cy + hh); ctx.quadraticCurveTo(x - 12, cy, x, cy - hh); ctx.fill(); ctx.stroke(); ctx.restore(); };
        lens(ox, Dv + 8, C.link); lens(ex, Math.max(18, Dv / Nv + 30), C.link);
        txt(ctx, 'objektív f₁', ox, cy + Dv + 26, C.muted, { a: 'center', s: 11 });
        txt(ctx, 'okulár f₂', ex, cy + Dv + 26, C.muted, { a: 'center', s: 11 });
        const P = [fx, cy + f1v * Math.tan(al)];
        const mExit = (P[1] - cy) / (ex - fx);
        [-1, -0.5, 0, 0.5, 1].forEach((u) => {
          const yo = cy - u * Dv;
          const xin = 0, yin = yo - (ox - xin) * Math.tan(al);
          const ye = yo + (P[1] - yo) * (ex - ox) / (fx - ox);
          const xe = w;
          const pts = [[xin, yin], [ox, yo], [ex, ye], [xe, ye - (xe - ex) * mExit]];
          line(ctx, pts, alpha(C.c, 0.8), 1.6);
          ctx.save(); ctx.setLineDash([4, 12]); ctx.lineDashOffset = dash; line(ctx, pts, C.fg, 2); ctx.restore();
        });
        dot(ctx, P[0], P[1], 4, C.acc, 10);
        txt(ctx, 'közös fókusz', P[0], P[1] + 18, C.acc, { a: 'center', s: 11 });
        const warn = r.N > r.Nmax ? 'üres nagyítás' : r.N < r.Nmin ? 'nyaláb > pupilla' : 'jó tartomány';
        txt(ctx, warn, w - 12, 20, r.N > r.Nmax || r.N < r.Nmin ? C.acc : C.c, { a: 'right', s: 13, w: 700 });
      });
      v = ui(body, [
        { k: 'f1', l: 'Objektív $f_1$', min: 0.3, max: 2, st: 0.05, v: 1, d: 2, u: 'm' },
        { k: 'f2', l: 'Okulár $f_2$', min: 5, max: 60, st: 1, v: 50, d: 0, u: 'mm' },
        { k: 'D', l: 'Objektív átmérő $D$', min: 20, max: 200, st: 1, v: 50, d: 0, u: 'mm' }
      ], () => upd());
      const upd = () => {
        const r = vals();
        outs(out, [['N', nf(r.N, 1) + '×'], ['N_min … N_max', nf(r.Nmin, 1) + ' … ' + nf(r.Nmax, 1)], ['φ', nf(r.phi, 2) + '″'], ['kilépő nyaláb', nf(r.exit, 1) + ' mm']]);
        s.redraw();
      };
      upd();
      return s.stop;
    }
  };
})();
