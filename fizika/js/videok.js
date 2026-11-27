/* Animált magyarázó „videók”. FIZ_VIDEOK[kulcs] = { cim, tema, hossz, jelenetek:[{t, cim, szoveg}], rajz(ctx, t, W, H, C) }.
   A szövegek a leckék anyagából. Rajzsegédek: window.FIZK (abrak.js). */
(function () {
  'use strict';
  const V = (window.FIZ_VIDEOK = window.FIZ_VIDEOK || {});
  const K = window.FIZK;
  const { TAU, clamp, lerp, arrow, txt, line, dot, rrect, spring, alpha, wl } = K;
  const ease = (k) => { k = clamp(k, 0, 1); return k * k * (3 - 2 * k); };
  /* Melyik jelenet, és azon belül hol tartunk */
  function at(v, t) {
    let i = 0;
    v.jelenetek.forEach((j, k) => { if (t >= j.t) i = k; });
    const a = v.jelenetek[i].t, b = (v.jelenetek[i + 1] || { t: v.hossz }).t;
    return { i, u: t - a, k: clamp((t - a) / (b - a), 0, 1), f: ease((t - a) / 0.7) };
  }
  /* Nagy képlet a vászon alján (sima Unicode, nem KaTeX) */
  function big(ctx, s, W, H, C, f = 1) {
    ctx.save(); ctx.globalAlpha = f;
    txt(ctx, s, W / 2, H - 18, C.fg, { a: 'center', s: Math.max(15, Math.min(26, W / 30)), w: 700 });
    ctx.restore();
  }
  function fade(ctx, f) { ctx.globalAlpha = f; }

  /* ───────── 3a ───────── */
  V.perdulet = {
    cim: 'Lendület és perdület 40 másodpercben', tema: '3a', hossz: 46,
    jelenetek: [
      { t: 0, cim: 'Lendület', szoveg: 'A lendület $\\underline{p}=m\\underline{v}$. Vektor, iránya a sebességé. Kétszer nagyobb tömeg, azonos sebesség: kétszer nagyobb lendület.' },
      { t: 9, cim: 'Impulzustétel', szoveg: 'Ha erő hat, változik a lendület: $\\frac{d\\underline{p}}{dt}=\\underline{F}$. Rövid ütközésnél $F_{átl}=\\Delta p/\\Delta t$.' },
      { t: 18, cim: 'Perdület', szoveg: 'A perdület $\\underline{N}=\\underline{r}\\times\\underline{p}$. Nagysága $N=r\\,p\\sin\\varphi$. Függ attól, honnan nézzük.' },
      { t: 28, cim: 'Forgatónyomaték', szoveg: 'A forgatónyomaték $M=rF\\sin\\alpha$. Ez változtatja a perdületet: $\\frac{d\\underline{N}}{dt}=\\underline{M}$.' },
      { t: 37, cim: 'Megmaradás', szoveg: 'Ha $M=0$, a perdület állandó. Például centrális erőnél: az erő párhuzamos $\\underline{r}$-rel.' }
    ],
    rajz(ctx, t, W, H, C) {
      const p = at(this, t), cy = H * 0.48; fade(ctx, p.f);
      if (p.i === 0) {
        [[0.32, 1, C.c], [0.68, 2, C.acc]].forEach(([y, m], j) => {
          const x = lerp(W * 0.1, W * 0.6, (p.u * 0.12) % 1), yy = H * y, r = 10 + m * 6;
          dot(ctx, x, yy, r, j ? C.acc : C.c, 16);
          arrow(ctx, x + r + 4, yy, x + r + 4 + 50 * m, yy, j ? C.acc : C.c, 3);
          txt(ctx, (m === 1 ? 'm' : '2m') + ',  p = ' + (m === 1 ? 'mv' : '2mv'), x + r + 64 + 50 * (m - 1), yy + 5, C.fg, { s: 14 });
        });
        big(ctx, 'p = m·v', W, H, C, p.f);
      } else if (p.i === 1) {
        const x = W * 0.25 + p.u * 6 * p.u * 0.5, len = 30 + p.u * 18;
        dot(ctx, Math.min(x, W * 0.7), cy, 18, C.c, 16);
        arrow(ctx, W * 0.1, cy, Math.min(x, W * 0.7) - 22, cy, C.acc, 4);
        txt(ctx, 'F', W * 0.12, cy - 12, C.acc, { s: 16, w: 700 });
        arrow(ctx, Math.min(x, W * 0.7), cy - 34, Math.min(x, W * 0.7) + len, cy - 34, C.c, 3);
        txt(ctx, 'p nő', Math.min(x, W * 0.7) + len + 8, cy - 30, C.c, { s: 14 });
        big(ctx, 'dp/dt = F', W, H, C, p.f);
      } else if (p.i === 2) {
        const O = [W * 0.3, H * 0.72], x = lerp(W * 0.1, W * 0.9, p.k), y = H * 0.25;
        dot(ctx, O[0], O[1], 6, C.fg); txt(ctx, 'O', O[0] - 16, O[1] + 4, C.muted, { s: 14 });
        line(ctx, [O, [x, y]], C.dim, 2); dot(ctx, x, y, 12, C.c, 14);
        arrow(ctx, x + 14, y, x + 70, y, C.c, 3); txt(ctx, 'p', x + 74, y + 5, C.c, { s: 15, w: 700 });
        line(ctx, [O, [O[0], y]], C.acc, 2, [5, 5]); txt(ctx, 'r·sin φ', O[0] + 8, (O[1] + y) / 2, C.acc, { s: 13 });
        line(ctx, [[W * 0.05, y], [W * 0.95, y]], alpha(C.fg, 0.12), 1);
        big(ctx, 'N = r·p·sin φ', W, H, C, p.f);
      } else if (p.i === 3) {
        const cx = W * 0.3, ang = -0.2 - Math.min(1.2, p.u * 0.15);
        const L = W * 0.3, ex = cx + Math.cos(ang) * L, ey = cy - Math.sin(ang) * L * 0.6;
        dot(ctx, cx, cy, 7, C.fg);
        line(ctx, [[cx, cy], [ex, ey]], C.c, 8);
        arrow(ctx, ex, ey, ex + 10, ey - 70, C.acc, 3.5); txt(ctx, 'F', ex + 16, ey - 64, C.acc, { s: 16, w: 700 });
        txt(ctx, 'r', (cx + ex) / 2, (cy + ey) / 2 + 22, C.c, { s: 15, w: 700 });
        big(ctx, 'M = r·F·sin α     dN/dt = M', W, H, C, p.f);
      } else {
        const cx = W * 0.5, R = H * 0.3, a = p.u * 1.4, x = cx + Math.cos(a) * R * 1.6, y = cy + Math.sin(a) * R;
        dot(ctx, cx, cy, 9, C.acc, 18);
        ctx.save(); ctx.strokeStyle = alpha(C.fg, 0.18); ctx.setLineDash([3, 5]); ctx.beginPath(); ctx.ellipse(cx, cy, R * 1.6, R, 0, 0, TAU); ctx.stroke(); ctx.restore();
        line(ctx, [[cx, cy], [x, y]], C.dim, 1.6);
        arrow(ctx, x, y, x + (cx - x) * 0.3, y + (cy - y) * 0.3, C.acc, 3);
        dot(ctx, x, y, 9, C.c, 14);
        txt(ctx, 'F ∥ r  →  M = 0', W * 0.04, H * 0.16, C.fg, { s: 16, w: 700 });
        big(ctx, 'N = állandó', W, H, C, p.f);
      }
      ctx.globalAlpha = 1;
    }
  };

  /* ───────── 3b ───────── */
  V.energia = {
    cim: 'Munka és energia', tema: '3b', hossz: 46,
    jelenetek: [
      { t: 0, cim: 'Munka', szoveg: 'Munka: erő szorozva az elmozdulással. Csak az elmozdulás irányú komponens számít: $W=F\\,\\Delta s\\cos\\alpha$.' },
      { t: 9, cim: 'Emelés', szoveg: 'Emelési munka: $W=mgh$. Ennyi helyzeti energiát kap a test.' },
      { t: 18, cim: 'Energiafajták', szoveg: 'Helyzeti: $mgh$. Rugalmas: $\\frac12 Dx^2$. Mozgási: $\\frac12 mv^2$.' },
      { t: 27, cim: 'Megmaradás', szoveg: 'Csak konzervatív erőknél: $\\frac12 mv_1^2+mgz_1=\\frac12 mv_2^2+mgz_2$. Az energia csak átalakul.' },
      { t: 37, cim: 'Súrlódás', szoveg: 'Súrlódásnál a mechanikai energia csökken. A súrlódási munka $W=\\mu N s$.' }
    ],
    rajz(ctx, t, W, H, C) {
      const p = at(this, t), gy = H * 0.72; fade(ctx, p.f);
      if (p.i === 0 || p.i === 4) line(ctx, [[0, gy], [W, gy]], C.line, 2);
      if (p.i === 0) {
        const x = W * 0.15 + (p.u * 30) % (W * 0.55);
        rrect(ctx, x, gy - 50, 70, 50, 8, alpha(C.fg, 0.12), C.dim);
        const a = 0.55, L = 110, cx = x + 35, cy = gy - 25;
        arrow(ctx, cx, cy, cx + Math.cos(a) * L, cy - Math.sin(a) * L, C.fg, 3);
        arrow(ctx, cx, cy, cx + Math.cos(a) * L, cy, C.c, 5);
        txt(ctx, 'F·cos α', cx + Math.cos(a) * L + 8, cy + 6, C.c, { s: 14, w: 700 });
        big(ctx, 'W = F·Δs·cos α', W, H, C, p.f);
      } else if (p.i === 1) {
        line(ctx, [[0, gy], [W, gy]], C.line, 2);
        const y = gy - 50 - ease(p.u / 6) * H * 0.4;
        rrect(ctx, W * 0.45, y, 60, 50, 8, alpha(C.c, 0.85));
        txt(ctx, 'm', W * 0.45 + 30, y + 31, C.bg, { a: 'center', s: 16, w: 750 });
        arrow(ctx, W * 0.45 + 30, y, W * 0.45 + 30, y - 50, C.acc, 3);
        line(ctx, [[W * 0.62, gy], [W * 0.62, y + 50]], C.muted, 1.4); txt(ctx, 'h', W * 0.64, (gy + y + 50) / 2, C.muted, { s: 15, w: 700 });
        big(ctx, 'W = m·g·h', W, H, C, p.f);
      } else if (p.i === 2) {
        const items = [['mgh', C.acc], ['½Dx²', C.link], ['½mv²', C.c]];
        items.forEach(([l, col], j) => {
          const x = W * (0.25 + j * 0.25), hh = H * 0.45 * ease((p.u - j * 0.8) / 1.5) * (0.6 + 0.4 * Math.sin(p.u * 1.5 + j));
          rrect(ctx, x - 26, gy - hh, 52, hh, 8, col);
          txt(ctx, l, x, gy + 24, C.fg, { a: 'center', s: 16, w: 700 });
        });
      } else if (p.i === 3) {
        const cx = W * 0.35, top = H * 0.08, L = H * 0.55, th = 0.8 * Math.cos(p.u * 2.2);
        const bx = cx + Math.sin(th) * L, by = top + Math.cos(th) * L;
        line(ctx, [[cx, top], [bx, by]], C.dim, 2); dot(ctx, bx, by, 14, C.c, 16);
        const hEp = 1 - Math.cos(th), hMax = 1 - Math.cos(0.8), Ep = hEp / hMax;
        const x0 = W * 0.68;
        rrect(ctx, x0, gy - H * 0.5 * Ep, 40, H * 0.5 * Ep, 6, C.acc);
        rrect(ctx, x0 + 56, gy - H * 0.5 * (1 - Ep), 40, H * 0.5 * (1 - Ep), 6, C.c);
        txt(ctx, 'mgh', x0 + 20, gy + 22, C.fg, { a: 'center', s: 14 });
        txt(ctx, '½mv²', x0 + 76, gy + 22, C.fg, { a: 'center', s: 14 });
        big(ctx, '½mv² + mgh = állandó', W, H, C, p.f);
      } else {
        const v0 = 1, dec = 0.11, tt = Math.min(p.u, v0 / dec), x = W * 0.1 + (v0 * tt - 0.5 * dec * tt * tt) * W * 0.16;
        rrect(ctx, x, gy - 46, 70, 46, 8, alpha(C.fg, 0.12), C.dim);
        const sp = Math.max(0, v0 - dec * tt);
        if (sp > 0.01) arrow(ctx, x + 35, gy - 60, x + 35 + 70 * sp, gy - 60, C.c, 3);
        arrow(ctx, x + 4, gy - 8, x + 4 - 40 * (sp > 0.01 ? 1 : 0), gy - 8, C.acc, 3);
        for (let i = 0; i < 6; i++) { const hx = x + 10 + i * 10, hy = gy - 4 - ((p.u * 30 + i * 13) % 40); ctx.globalAlpha = p.f * 0.4 * (sp > 0.01 ? 1 : 0.3); txt(ctx, '~', hx, hy, C.acc, { s: 16 }); }
        ctx.globalAlpha = p.f;
        big(ctx, 'W súrl = μ·N·s', W, H, C, p.f);
      }
      ctx.globalAlpha = 1;
    }
  };

  /* ───────── 4 ───────── */
  V['kor-arnyek'] = {
    cim: 'Körmozgás árnyéka = harmonikus rezgés', tema: '4', hossz: 38,
    jelenetek: [
      { t: 0, cim: 'Körmozgás', szoveg: 'Egy pont egyenletesen kering. A szögsebessége $\\omega$, a sugár $A$.' },
      { t: 8, cim: 'Az árnyék', szoveg: 'A vetülete egy egyenesen ide-oda mozog. A körmozgás vetülete harmonikus rezgés: $x=A\\sin(\\omega t+\\alpha)$.' },
      { t: 18, cim: 'Időben', szoveg: 'Ha az időt is felrajzoljuk, szinuszgörbe lesz. Egy teljes kör ideje a periódus: $T=2\\pi/\\omega$.' },
      { t: 28, cim: 'Gyorsulás', szoveg: 'A gyorsulás $a=-\\omega^2x$. Mindig az egyensúlyi helyzet felé mutat, és a kitéréssel arányos.' }
    ],
    rajz(ctx, t, W, H, C) {
      const p = at(this, t), cx = W * 0.25, cy = H * 0.46, R = H * 0.32, om = 1.4, a = om * t;
      const px = cx + Math.cos(a) * R, py = cy - Math.sin(a) * R;
      ctx.save(); ctx.strokeStyle = alpha(C.fg, 0.2); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.stroke(); ctx.restore();
      line(ctx, [[cx, cy], [px, py]], C.dim, 1.6);
      dot(ctx, px, py, 9, C.c, 16);
      const sx = W * 0.5;
      if (p.i >= 1) {
        fade(ctx, p.i === 1 ? p.f : 1);
        line(ctx, [[sx, cy - R - 10], [sx, cy + R + 10]], C.line, 2);
        line(ctx, [[px, py], [sx, py]], alpha(C.acc, 0.5), 1.2, [3, 4]);
        dot(ctx, sx, py, 9, C.acc, 16);
        ctx.globalAlpha = 1;
      }
      if (p.i >= 2) {
        fade(ctx, p.i === 2 ? p.f : 1);
        const x0 = sx + 16, x1 = W - 16;
        line(ctx, Array.from({ length: 200 }, (_, i) => [x0 + (x1 - x0) * i / 199, cy - Math.sin(a - i * 0.035) * R]), C.acc, 2.4);
        ctx.globalAlpha = 1;
      }
      if (p.i === 3) {
        fade(ctx, p.f);
        const x = Math.sin(a) * R;
        arrow(ctx, sx - 14, py, sx - 14, py + x * 0.55, C.c, 3);
        txt(ctx, 'a', sx - 30, py + x * 0.3, C.c, { s: 15, w: 700, a: 'right' });
        big(ctx, 'a = −ω²·x', W, H, C, p.f);
        ctx.globalAlpha = 1;
      } else big(ctx, ['ω = állandó', 'x = A·sin(ωt + α)', 'T = 2π / ω'][p.i], W, H, C, p.f);
    }
  };

  V.inga = {
    cim: 'A matematikai inga', tema: '4', hossz: 38,
    jelenetek: [
      { t: 0, cim: 'Az inga', szoveg: 'Matematikai inga: pontszerű test egy $l$ hosszú, súlytalan fonálon.' },
      { t: 8, cim: 'Visszatérítő erő', szoveg: 'A nehézségi erő pályamenti komponense húzza vissza. Kis kitérésnél ez harmonikus rezgést ad.' },
      { t: 18, cim: 'Lengésidő', szoveg: '$T_0=2\\pi\\sqrt{l/g}$. Hosszabb inga lassabban leng. A tömegtől független, ezért alkalmas $g$ mérésére.' },
      { t: 29, cim: 'Csillapodás', szoveg: 'Közegellenállással az amplitúdó csökken: $A_0e^{-\\beta t}$. A rezgés lassul: $\\omega_{cs}=\\sqrt{\\omega_0^2-\\beta^2}$.' }
    ],
    rajz(ctx, t, W, H, C) {
      const p = at(this, t), top = H * 0.08; fade(ctx, p.f);
      const pend = (cx, L, th, col, r = 13) => {
        const bx = cx + Math.sin(th) * L, by = top + Math.cos(th) * L;
        line(ctx, [[cx, top], [bx, by]], C.dim, 2); dot(ctx, bx, by, r, col, 14);
        return [bx, by];
      };
      line(ctx, [[W * 0.1, top], [W * 0.9, top]], C.line, 3);
      if (p.i <= 1) {
        const L = H * 0.62, th = 0.45 * Math.cos(2.4 * t);
        const [bx, by] = pend(W * 0.42, L, th, C.c);
        if (p.i === 0) {
          line(ctx, [[W * 0.42, top], [W * 0.42, top + L]], alpha(C.fg, 0.15), 1, [3, 5]);
          txt(ctx, 'l', W * 0.42 + Math.sin(th) * L * 0.5 + 10, top + L * 0.5, C.muted, { s: 15, w: 700 });
          big(ctx, 'l · m · g', W, H, C, p.f);
        } else {
          arrow(ctx, bx, by, bx, by + 70, C.fg, 2.6); txt(ctx, 'mg', bx + 8, by + 70, C.fg, { s: 14, w: 700 });
          const ft = -Math.sin(th) * 70;
          arrow(ctx, bx, by, bx + ft * Math.cos(th), by - ft * Math.sin(th), C.acc, 3.4);
          txt(ctx, 'mg·sin φ', W * 0.62, H * 0.3, C.acc, { s: 15, w: 700 });
          big(ctx, 'F ≈ −mg·φ   (kis φ)', W, H, C, p.f);
        }
      } else if (p.i === 2) {
        const g = 9.81;
        [[0.28, 0.35, C.c, '1×'], [0.52, 0.6, C.acc, '2×'], [0.76, 0.85, C.link, '3×']].forEach(([x, Lr, col]) => {
          const L = H * Lr, T = TAU * Math.sqrt(Lr / g);
          pend(W * x, L, 0.35 * Math.cos(TAU * p.u / T / 1.6), col);
        });
        txt(ctx, 'rövid → gyors', W * 0.28, H * 0.95, C.muted, { a: 'center', s: 12 });
        txt(ctx, 'hosszú → lassú', W * 0.76, H * 0.95, C.muted, { a: 'center', s: 12 });
        big(ctx, 'T₀ = 2π·√(l/g)', W, H * 0.92, C, p.f);
      } else {
        const L = H * 0.62, A0 = 0.6 * Math.exp(-0.22 * p.u);
        pend(W * 0.3, L, A0 * Math.cos(2.4 * p.u), C.c);
        const x0 = W * 0.5, x1 = W - 16, my = H * 0.45, am = H * 0.3;
        line(ctx, Array.from({ length: 200 }, (_, i) => { const tt = i / 199 * 9; return [x0 + (x1 - x0) * i / 199, my - 0.6 * Math.exp(-0.22 * tt) * Math.cos(2.4 * tt) / 0.6 * am]; }), C.c, 2);
        line(ctx, Array.from({ length: 100 }, (_, i) => { const tt = i / 99 * 9; return [x0 + (x1 - x0) * i / 99, my - Math.exp(-0.22 * tt) * am]; }), C.acc, 1.4, [5, 5]);
        big(ctx, 'A₀·e^(−βt)', W, H, C, p.f);
      }
      ctx.globalAlpha = 1;
    }
  };

  /* ───────── 5 ───────── */
  V.utkozes = {
    cim: 'Ütközések', tema: '5', hossz: 38,
    jelenetek: [
      { t: 0, cim: 'Zárt rendszer', szoveg: 'Ha a külső erők eredője nulla, a rendszer teljes lendülete állandó: $\\sum\\underline{p}_i=$ áll. Ütközésnél is.' },
      { t: 9, cim: 'Rugalmas', szoveg: 'Rugalmas ütközés: a lendület és a mozgási energia is megmarad. Egyenlő tömegeknél, ha a második áll, a sebességek kicserélődnek (a képletből).' },
      { t: 19, cim: 'Rugalmatlan', szoveg: 'Tökéletesen rugalmatlan ütközés: együtt mennek tovább, $v\'=\\frac{m_1v_1+m_2v_2}{m_1+m_2}$. Mozgási energia vész el.' },
      { t: 28, cim: 'Ballisztikus inga', szoveg: 'A lövedék beleáll a hasábba, ami $h$ magasra lendül. Ebből: $v_1=\\frac{m_1+m_2}{m_1}\\sqrt{2gh}$.' }
    ],
    rajz(ctx, t, W, H, C) {
      const p = at(this, t), gy = H * 0.7; fade(ctx, p.f);
      const X = (x) => W * 0.05 + x / 10 * W * 0.9;
      const cart = (x, m, col, vel, lab) => {
        const bw = W * 0.08, bh = 24 + m * 10;
        rrect(ctx, X(x) - bw / 2, gy - bh, bw, bh, 8, col);
        txt(ctx, lab, X(x), gy - bh / 2 + 5, C.bg, { a: 'center', s: 13, w: 750 });
        if (Math.abs(vel) > 0.05) arrow(ctx, X(x), gy - bh - 14, X(x) + vel * 22, gy - bh - 14, col, 2.6);
      };
      if (p.i < 3) {
        line(ctx, [[0, gy], [W, gy]], C.line, 2);
        const m1 = p.i === 0 ? 2 : 1, m2 = 1, v1 = 2, tc = 2.2, tau = (p.u % 8.5);
        const cw = 0.45;
        let u1, u2;
        if (p.i === 0 || p.i === 2) { u1 = u2 = m1 * v1 / (m1 + m2); } else { u1 = 0; u2 = v1; }
        if (p.i === 0) { u1 = ((m1 - m2) * v1) / (m1 + m2); u2 = (2 * m1 * v1) / (m1 + m2); }
        const pre = tau < tc;
        const x1 = pre ? 5 - cw + v1 * (tau - tc) : 5 - cw + u1 * (tau - tc);
        const x2 = pre ? 5 + cw : 5 + cw + u2 * (tau - tc);
        cart(x1, m1, C.c, pre ? v1 : u1, 'm₁'); cart(x2, m2, C.acc, pre ? 0 : u2, 'm₂');
        const pt = m1 * v1;
        txt(ctx, 'Σp = ' + pt + ' (előtte és utána is)', W / 2, H * 0.18, C.fg, { a: 'center', s: 16, w: 700 });
        if (p.i === 2 && !pre) txt(ctx, 'ΔE < 0', W / 2, H * 0.3, C.acc, { a: 'center', s: 15, w: 700 });
        big(ctx, ['Σp = állandó', "v₁' = 0,  v₂' = v₁", "v' = (m₁v₁ + m₂v₂)/(m₁ + m₂)"][p.i], W, H, C, p.f);
      } else {
        const px = W * 0.6, top = H * 0.06, L = H * 0.55, tc = 1.5, tau = p.u % 7;
        let th = 0;
        if (tau > tc) th = 0.5 * Math.sin(Math.min(Math.PI, (tau - tc) * 1.6));
        const bx = px + Math.sin(th) * L, by = top + Math.cos(th) * L;
        line(ctx, [[px - 60, top], [px + 60, top]], C.line, 3);
        line(ctx, [[px - 22, top], [bx - 22, by]], C.dim, 1.6); line(ctx, [[px + 22, top], [bx + 22, by]], C.dim, 1.6);
        rrect(ctx, bx - 30, by, 60, 34, 6, alpha(C.c, 0.8));
        if (tau < tc) { const lx = lerp(W * 0.05, bx - 30, tau / tc); rrect(ctx, lx - 14, by + 13, 14, 8, 3, C.acc); arrow(ctx, lx + 4, by + 17, lx + 30, by + 17, C.acc, 2); }
        else { line(ctx, [[W * 0.85, top + L + 17], [W * 0.85, by + 17]], C.muted, 1.4); if (top + L - by > 6) txt(ctx, 'h', W * 0.87, (top + L + by) / 2 + 20, C.muted, { s: 15, w: 700 }); }
        big(ctx, 'v₁ = (m₁+m₂)/m₁ · √(2gh)', W, H, C, p.f);
      }
      ctx.globalAlpha = 1;
    }
  };

  /* ───────── 6 ───────── */
  V.forgas = {
    cim: 'Merev test forgása', tema: '6', hossz: 38,
    jelenetek: [
      { t: 0, cim: 'Erőkar', szoveg: 'A forgatónyomaték $M=F\\cdot k$, ahol $k$ az erőkar: a tengely és az erő hatásvonalának távolsága.' },
      { t: 9, cim: 'Tehetetlenség', szoveg: 'Ugyanaz a nyomaték, más $\\Theta$. $\\Theta\\beta=M$: a kisebb $\\Theta$-jú test gyorsul jobban. Gömb $\\frac25mR^2$, korong $\\frac12mR^2$, abroncs $mR^2$.' },
      { t: 20, cim: 'Steiner', szoveg: 'Ha a tengely nem a tömegközépponton megy át: $\\Theta_A=\\Theta_S+ms^2$. Mindig nagyobb.' },
      { t: 29, cim: 'Forgási energia', szoveg: 'A forgó test mozgási energiája $E=\\frac12\\Theta\\omega^2$. A perdület $N=\\Theta\\omega$.' }
    ],
    rajz(ctx, t, W, H, C) {
      const p = at(this, t), cy = H * 0.46; fade(ctx, p.f);
      if (p.i === 0) {
        const cx = W * 0.3, a = -0.25 * Math.sin(p.u * 0.8), L = W * 0.34;
        const ex = cx + Math.cos(a) * L, ey = cy + Math.sin(a) * L;
        dot(ctx, cx, cy, 8, C.fg); line(ctx, [[cx, cy], [ex, ey]], alpha(C.c, 0.9), 10);
        const fa = 1.15;
        arrow(ctx, ex, ey, ex + Math.cos(fa) * 20, ey - Math.sin(fa) * 90, C.acc, 3.5);
        const dx = Math.cos(fa), dy = -Math.sin(fa) * 4.5, nl = Math.hypot(dx, dy), ux = dx / nl, uy = dy / nl;
        line(ctx, [[ex - ux * 200, ey - uy * 200], [ex + ux * 140, ey + uy * 140]], alpha(C.acc, 0.35), 1, [4, 5]);
        const tproj = (cx - ex) * ux + (cy - ey) * uy, fx = ex + ux * tproj, fy = ey + uy * tproj;
        line(ctx, [[cx, cy], [fx, fy]], C.fg, 2, [3, 3]); txt(ctx, 'k', (cx + fx) / 2 - 14, (cy + fy) / 2, C.fg, { s: 16, w: 700 });
        big(ctx, 'M = F · k', W, H, C, p.f);
      } else if (p.i === 1) {
        [['abroncs', 1, 0.2], ['korong', 0.5, 0.5], ['gömb', 0.4, 0.8]].forEach(([l, k, x]) => {
          const cx = W * x, R = H * 0.2, ph = 0.5 * (0.6 / k) * p.u * p.u * 0.3;
          ctx.save();
          if (k === 1) { ctx.strokeStyle = C.c; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(cx, cy, R - 4, 0, TAU); ctx.stroke(); }
          else { ctx.fillStyle = alpha(C.c, k === 0.5 ? 0.5 : 0.8); ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.fill(); }
          ctx.restore();
          line(ctx, [[cx, cy], [cx + Math.cos(ph) * R, cy + Math.sin(ph) * R]], C.fg, 2.4);
          txt(ctx, l, cx, cy + R + 22, C.muted, { a: 'center', s: 14 });
        });
        big(ctx, 'Θ·β = M', W, H, C, p.f);
      } else if (p.i === 2) {
        const px = W * 0.35, py = H * 0.2, s = H * 0.25, R = H * 0.22, th = 0.35 * Math.cos(3 * p.u);
        const cx = px + Math.sin(th) * s, cyy = py + Math.cos(th) * s;
        ctx.save(); ctx.fillStyle = alpha(C.c, 0.45); ctx.beginPath(); ctx.arc(cx, cyy, R, 0, TAU); ctx.fill(); ctx.restore();
        dot(ctx, px, py, 6, C.fg); txt(ctx, 'A', px + 10, py - 8, C.fg, { s: 15, w: 700 });
        dot(ctx, cx, cyy, 5, C.acc); txt(ctx, 'S', cx + 9, cyy + 5, C.acc, { s: 15, w: 700 });
        line(ctx, [[px, py], [cx, cyy]], C.acc, 2); txt(ctx, 's', (px + cx) / 2 + 8, (py + cyy) / 2, C.acc, { s: 14, w: 700 });
        txt(ctx, 'Θ_A = Θ_S + m·s²', W * 0.62, cy, C.fg, { s: 20, w: 750 });
        big(ctx, 'fizikai inga: T = 2π·√(Θ / mgs)', W, H, C, p.f);
      } else {
        const cx = W * 0.32, R = H * 0.3, om = Math.min(6, p.u * 0.8), ph = 0.4 * p.u * p.u;
        ctx.save(); ctx.fillStyle = alpha(C.c, 0.5); ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.fill(); ctx.restore();
        for (let i = 0; i < 4; i++) line(ctx, [[cx, cy], [cx + Math.cos(ph + i * TAU / 4) * R, cy + Math.sin(ph + i * TAU / 4) * R]], alpha(C.fg, 0.6), 2);
        const bx = W * 0.62, bw = W * 0.3;
        rrect(ctx, bx, cy - 8, bw, 16, 8, alpha(C.fg, 0.08));
        rrect(ctx, bx, cy - 8, Math.max(16, bw * (om * om) / 36), 16, 8, C.acc);
        txt(ctx, 'E = ½Θω²', bx, cy - 20, C.fg, { s: 16, w: 700 });
        big(ctx, 'E = ½·Θ·ω²     N = Θ·ω', W, H, C, p.f);
      }
      ctx.globalAlpha = 1;
    }
  };

  /* ───────── 7 ───────── */
  V.nyujtas = {
    cim: 'Rugalmas alakváltozások', tema: '7', hossz: 38,
    jelenetek: [
      { t: 0, cim: 'Nyújtás', szoveg: 'Húzott rúd: feszültség $\\sigma=F/A$, relatív megnyúlás $\\varepsilon=\\Delta l/l_0$.' },
      { t: 9, cim: 'Hooke-törvény', szoveg: 'Rugalmas tartományban arányosak: $\\sigma=E\\varepsilon$. $E$ a Young-modulus, acélra $2{,}14\\cdot10^{11}$ N/m².' },
      { t: 18, cim: 'Harántösszehúzódás', szoveg: 'Nyújtáskor a rúd elvékonyodik: $\\frac{\\Delta d}{d_0}=-\\mu\\varepsilon$. $\\mu$ a Poisson-szám.' },
      { t: 28, cim: 'Nyírás, csavarás', szoveg: 'Nyírás: $\\gamma=\\frac1G\\frac FA$. Csavarás: $\\varphi=\\frac{2}{\\pi G}\\frac{l}{R^4}M$. A sugár negyedik hatványa számít.' }
    ],
    rajz(ctx, t, W, H, C) {
      const p = at(this, t), cy = H * 0.45; fade(ctx, p.f);
      const st = 0.5 - 0.5 * Math.cos(p.u * 1.4);
      if (p.i === 0 || p.i === 2) {
        const x0 = W * 0.12, L0 = W * 0.5, L = L0 * (1 + 0.12 * st), d0 = H * 0.18, d = d0 * (p.i === 2 ? 1 - 0.18 * st : 1);
        rrect(ctx, x0 - 20, cy - 60, 20, 120, 3, alpha(C.fg, 0.15));
        rrect(ctx, x0, cy - d / 2, L, d, 6, alpha(C.c, 0.8));
        line(ctx, [[x0 + L0, cy - d0 / 2 - 14], [x0 + L0, cy + d0 / 2 + 14]], C.dim, 1.2, [3, 3]);
        arrow(ctx, x0 + L, cy, x0 + L + 40 + 40 * st, cy, C.acc, 3.5); txt(ctx, 'F', x0 + L + 50 + 40 * st, cy - 10, C.acc, { s: 16, w: 700 });
        if (p.i === 0) { txt(ctx, 'l₀', x0 + L0 / 2, cy + d0 / 2 + 26, C.muted, { a: 'center', s: 14 }); txt(ctx, 'Δl', x0 + L0 + (L - L0) / 2, cy - d0 / 2 - 18, C.acc, { a: 'center', s: 14, w: 700 }); }
        else { line(ctx, [[x0 + L * 0.5, cy - d / 2], [x0 + L * 0.5, cy + d / 2]], C.fg, 1.6); txt(ctx, 'd', x0 + L * 0.5 + 8, cy + 5, C.bg, { s: 14, w: 700 }); }
        big(ctx, p.i === 0 ? 'σ = F/A     ε = Δl/l₀' : 'Δd/d₀ = −μ·ε', W, H, C, p.f);
      } else if (p.i === 1) {
        const x0 = W * 0.3, y0 = H * 0.78, x1 = W * 0.75, y1 = H * 0.1;
        K.axes(ctx, x0, y0, x1, y1, C, 'ε', 'σ');
        const k = ease(p.u / 4);
        line(ctx, [[x0, y0], [lerp(x0, x1 - 30, k), lerp(y0, y1 + 30, k)]], C.c, 3);
        dot(ctx, lerp(x0, x1 - 30, k), lerp(y0, y1 + 30, k), 6, C.acc, 14);
        txt(ctx, 'meredekség = E', x0 + (x1 - x0) * 0.45 + 14, y0 - (y0 - y1) * 0.45 + 16, C.muted, { s: 14 });
        big(ctx, 'σ = E · ε', W, H, C, p.f);
      } else {
        const bx = W * 0.15, by = H * 0.65, s = H * 0.38, sh = s * 0.3 * st;
        ctx.save(); ctx.fillStyle = alpha(C.c, 0.7); ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx + s, by); ctx.lineTo(bx + s + sh, by - s); ctx.lineTo(bx + sh, by - s); ctx.closePath(); ctx.fill(); ctx.restore();
        line(ctx, [[bx - 10, by], [bx + s + 20, by]], C.line, 3);
        arrow(ctx, bx + sh, by - s - 12, bx + sh + 70, by - s - 12, C.acc, 3);
        txt(ctx, 'γ', bx + 14, by - s * 0.4, C.fg, { s: 16, w: 700 });
        const cx = W * 0.72, L = W * 0.22, R = H * 0.1, tw = 2.2 * st;
        rrect(ctx, cx - L / 2, cy - R, L, 2 * R, 8, alpha(C.link, 0.55));
        for (let i = 0; i < 7; i++) { const u = i / 6, x = cx - L / 2 + L * u; line(ctx, [[x, cy - R], [x + tw * u * 8, cy + R]], alpha(C.fg, 0.5), 1.2); }
        txt(ctx, 'M', cx + L / 2 + 14, cy + 5, C.acc, { s: 16, w: 700 });
        big(ctx, 'γ = F/(G·A)     φ ~ l·M / R⁴', W, H, C, p.f);
      }
      ctx.globalAlpha = 1;
    }
  };

  /* ───────── 8 ───────── */
  V['hullam-terjedes'] = {
    cim: 'Hogyan terjed a hullám?', tema: '8', hossz: 40,
    jelenetek: [
      { t: 0, cim: 'Zavar halad', szoveg: 'Hullám: egy zavar tovaterjedése. A részecskék csak a helyükön rezegnek, átlagos elmozdulásuk nulla. Az energia halad.' },
      { t: 9, cim: 'Két fajta', szoveg: 'Transzverzális: a rezgés merőleges a terjedésre. Longitudinális: a terjedés irányába rezeg. Folyadékban és gázban csak longitudinális van.' },
      { t: 19, cim: 'Hullámhossz', szoveg: 'Egy pontot nézve rezgés, periódusa $T$. Egy pillanatot nézve szinusz, periódusa $\\lambda$. A sebesség: $c=f\\lambda$.' },
      { t: 30, cim: 'Törés', szoveg: 'Új közegben más a sebesség, ezért a hullám irányt vált: $\\frac{\\sin\\alpha}{\\sin\\beta}=\\frac{c_1}{c_2}$.' }
    ],
    rajz(ctx, t, W, H, C) {
      const p = at(this, t), mid = H * 0.45; fade(ctx, p.f);
      if (p.i === 0) {
        const c = W * 0.12, xc = (p.u * c) % (W * 1.2) - W * 0.1;
        for (let i = 0; i <= 40; i++) { const x = W * 0.03 + i * W * 0.94 / 40, d = x - xc, y = mid - H * 0.25 * Math.exp(-d * d / (2 * 30 * 30)); dot(ctx, x, y, i === 20 ? 7 : 4, i === 20 ? C.acc : C.c, i === 20 ? 12 : 0); }
        arrow(ctx, W * 0.7, H * 0.85, W * 0.9, H * 0.85, C.muted, 2); txt(ctx, 'terjedés', W * 0.68, H * 0.86, C.muted, { a: 'right', s: 13 });
      } else if (p.i === 1) {
        const k = TAU / (W * 0.3), om = 3;
        for (let i = 0; i <= 40; i++) { const x = W * 0.03 + i * W * 0.94 / 40; dot(ctx, x, H * 0.27 - Math.sin(k * x - om * p.u) * H * 0.12, 4, C.c); }
        for (let i = 0; i <= 50; i++) { const x0 = W * 0.03 + i * W * 0.94 / 50, x = x0 + Math.sin(k * x0 - om * p.u) * 10; line(ctx, [[x, H * 0.56], [x, H * 0.8]], alpha(C.acc, 0.8), 2); }
        txt(ctx, 'transzverzális', W * 0.03, H * 0.08, C.c, { s: 14, w: 700 });
        txt(ctx, 'longitudinális', W * 0.03, H * 0.52, C.acc, { s: 14, w: 700 });
      } else if (p.i === 2) {
        const lam = W * 0.3, k = TAU / lam, om = 2.2;
        line(ctx, Array.from({ length: 300 }, (_, i) => { const x = W * 0.03 + W * 0.94 * i / 299; return [x, mid - Math.sin(k * x - om * p.u) * H * 0.22]; }), C.c, 3);
        const x0 = ((om * p.u + Math.PI / 2) / k) % lam + W * 0.03;
        line(ctx, [[x0, mid - H * 0.3], [x0 + lam, mid - H * 0.3]], C.fg, 1.6); txt(ctx, 'λ', x0 + lam / 2, mid - H * 0.3 - 8, C.fg, { a: 'center', s: 17, w: 700 });
        big(ctx, 'c = f · λ = λ / T', W, H, C, p.f);
      } else {
        const bx = W * 0.5, a = 0.6, b = Math.asin(Math.sin(a) * 0.55);
        ctx.save(); ctx.fillStyle = alpha(C.c, 0.1); ctx.fillRect(bx, 0, W - bx, H); ctx.restore();
        line(ctx, [[bx, 0], [bx, H]], C.dim, 2);
        txt(ctx, 'c₁', bx - 20, 24, C.muted, { a: 'right', s: 15, w: 700 }); txt(ctx, 'c₂ < c₁', bx + 20, 24, C.muted, { s: 15, w: 700 });
        const lam1 = 36, lam2 = lam1 * 0.55, ph = p.u * 50;
        // hullámfrontok: beeső (merőlegesek az α irányra), megtört (β irányra)
        const dirIn = [Math.cos(a), Math.sin(a)], dirOut = [Math.cos(b), Math.sin(b)];
        const P0 = [bx, H * 0.5];
        for (let i = 0; i < 9; i++) {
          const s1 = -(i * lam1) + (ph % lam1);
          if (s1 <= 0) { const c = [P0[0] + dirIn[0] * s1, P0[1] + dirIn[1] * s1], n = [-dirIn[1], dirIn[0]]; const L = 130; const e1 = [c[0] - n[0] * L, c[1] - n[1] * L], e2 = [c[0] + n[0] * L, c[1] + n[1] * L];
            const clip = (q) => (q[0] > bx ? [bx, c[1] + (bx - c[0]) * n[1] / n[0]] : q);
            line(ctx, [clip(e1), clip(e2)], C.c, 2.4); }
          const s2 = i * lam2 + (ph * 0.55 % lam2);
          const c2 = [P0[0] + dirOut[0] * s2, P0[1] + dirOut[1] * s2], n2 = [-dirOut[1], dirOut[0]]; const L2 = 130;
          const f1 = [c2[0] - n2[0] * L2, c2[1] - n2[1] * L2], f2 = [c2[0] + n2[0] * L2, c2[1] + n2[1] * L2];
          const clip2 = (q) => (q[0] < bx ? [bx, c2[1] + (bx - c2[0]) * n2[1] / n2[0]] : q);
          line(ctx, [clip2(f1), clip2(f2)], C.acc, 2.4);
        }
        line(ctx, [[bx - 140 * dirIn[0], H * 0.5 - 140 * dirIn[1]], [bx, H * 0.5]], C.fg, 1.4, [4, 4]);
        line(ctx, [[bx, H * 0.5], [bx + 140 * dirOut[0], H * 0.5 + 140 * dirOut[1]]], C.fg, 1.4, [4, 4]);
        big(ctx, 'sin α / sin β = c₁ / c₂', W, H, C, p.f);
      }
      ctx.globalAlpha = 1;
    }
  };

  V.allohullam = {
    cim: 'Állóhullám', tema: '8', hossz: 40,
    jelenetek: [
      { t: 0, cim: 'Visszaverődés', szoveg: 'A húr végéről a hullám visszaverődik. Rögzített végen ellentétes fázisban, szabad végen azonos fázisban.' },
      { t: 10, cim: 'Összeadódás', szoveg: 'A beeső és a visszavert hullám összege alkalmas frekvenciánál állóhullám. Csomópont: mindig nyugalom. Duzzadóhely: legnagyobb kitérés.' },
      { t: 20, cim: 'Két rögzített vég', szoveg: 'Csak egész számú félhullám fér rá: $l=n\\frac{\\lambda}{2}$. Ezek a sajátrezgések.' },
      { t: 30, cim: 'Egy szabad vég', szoveg: 'Egy rögzített, egy szabad végnél: $l=n\\frac{\\lambda}{2}+\\frac{\\lambda}{4}$. A szabad végen duzzadóhely van.' }
    ],
    rajz(ctx, t, W, H, C) {
      const p = at(this, t), x0 = W * 0.06, x1 = W * 0.94, mid = H * 0.45, amp = H * 0.18; fade(ctx, p.f);
      const L = x1 - x0;
      rrect(ctx, x0 - 12, mid - 40, 8, 80, 3, alpha(C.fg, 0.3));
      if (p.i < 3) rrect(ctx, x1 + 4, mid - 40, 8, 80, 3, alpha(C.fg, 0.3));
      if (p.i <= 1) {
        const lam = L / 1.5, k = TAU / lam, om = 2.4;
        const inc = (x) => Math.sin(k * x - om * p.u), ref = (x) => -Math.sin(k * (2 * L - x) - om * p.u);
        const show = p.i === 0 ? 1 : 0.35;
        ctx.globalAlpha = p.f * show;
        line(ctx, Array.from({ length: 200 }, (_, i) => { const x = L * i / 199; return [x0 + x, mid - inc(x) * amp]; }), C.c, 2);
        line(ctx, Array.from({ length: 200 }, (_, i) => { const x = L * i / 199; return [x0 + x, mid - ref(x) * amp]; }), C.acc, 2);
        ctx.globalAlpha = p.f;
        if (p.i === 1) {
          line(ctx, Array.from({ length: 300 }, (_, i) => { const x = L * i / 299; return [x0 + x, mid - (inc(x) + ref(x)) * amp]; }), C.fg, 3.2);
          for (let m = 0; m <= 3; m++) dot(ctx, x1 - m * lam / 2, mid, 5, C.acc, 10);
        }
        txt(ctx, 'beeső', W * 0.06, H * 0.9, C.c, { s: 13, w: 700 }); txt(ctx, 'visszavert', W * 0.2, H * 0.9, C.acc, { s: 13, w: 700 });
      } else {
        const free = p.i === 3, n = 1 + Math.floor(p.u / 3.3) % 3;
        const lam = free ? 4 * L / (2 * (n - 1) + 1) : 2 * L / n, k = TAU / lam, c = Math.cos(3 * p.u);
        if (free) line(ctx, [[x1 + 8, mid - amp - 20], [x1 + 8, mid + amp + 20]], C.dim, 1.2, [3, 4]);
        line(ctx, Array.from({ length: 300 }, (_, i) => { const x = L * i / 299; return [x0 + x, mid - Math.sin(k * x) * amp * 1.4 * c]; }), C.c, 3.2);
        line(ctx, Array.from({ length: 300 }, (_, i) => { const x = L * i / 299; return [x0 + x, mid + Math.sin(k * x) * amp * 1.4 * c]; }), alpha(C.c, 0.3), 1.5);
        for (let m = 0; m * lam / 2 <= L + 1; m++) dot(ctx, x0 + m * lam / 2, mid, 5, C.acc, 10);
        txt(ctx, free ? 'n = ' + (n - 1) : 'n = ' + n, W / 2, H * 0.12, C.fg, { a: 'center', s: 18, w: 750 });
        big(ctx, free ? 'l = n·λ/2 + λ/4' : 'l = n · λ/2', W, H, C, p.f);
      }
      ctx.globalAlpha = 1;
    }
  };

  /* ───────── 9 ───────── */
  V.doppler = {
    cim: 'A Doppler-hatás', tema: '9', hossz: 38,
    jelenetek: [
      { t: 0, cim: 'Álló forrás', szoveg: 'Álló forrás körül a hullámfrontok szabályos körök. Mindenhol ugyanazt a frekvenciát halljuk.' },
      { t: 8, cim: 'Mozgó forrás', szoveg: 'Ha a forrás mozog, előtte összetorlódnak a frontok, mögötte széthúzódnak: $\\lambda\'=\\lambda-v_fT$.' },
      { t: 18, cim: 'Mentőautó', szoveg: 'Diás feladat: 400 Hz, 72 km/h = 20 m/s, $c=340$ m/s. Közeledve $f\'=\\frac{f}{1-v_f/c}=425$ Hz. Távolodva kb. 378 Hz (saját számolás).' },
      { t: 28, cim: 'Mach-kúp', szoveg: 'A puskán: ha $v_f>c$, a frontok kúpba sűrűsödnek, $\\sin\\Theta=c/v_f$. Ez a látható diákon nincs.' }
    ],
    rajz(ctx, t, W, H, C) {
      const p = at(this, t), cy = H * 0.47; fade(ctx, p.f);
      const cv = W * 0.12, per = 0.35;
      const ratio = [0, 0.5, 0.35, 1.6][p.i], vs = ratio * cv;
      const span = W * 0.75, tt = vs ? p.u % (span / vs) : p.u;
      const sx = vs ? W * 0.1 + vs * tt : W * 0.5;
      for (let e = Math.max(0, tt - 6); e <= tt; e += per) {
        const te = Math.floor(e / per) * per, ex = vs ? W * 0.1 + vs * te : W * 0.5, r = (tt - te) * cv;
        ctx.save(); ctx.strokeStyle = alpha(C.c, clamp(1 - r / (W * 0.7), 0, 1) * 0.9); ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(ex, cy, r, 0, TAU); ctx.stroke(); ctx.restore();
      }
      if (ratio > 1) {
        const th = Math.asin(1 / ratio);
        line(ctx, [[sx, cy], [sx - W * Math.cos(th), cy - W * Math.sin(th)]], C.acc, 2.4);
        line(ctx, [[sx, cy], [sx - W * Math.cos(th), cy + W * Math.sin(th)]], C.acc, 2.4);
      }
      dot(ctx, sx, cy, 10, C.acc, 20);
      if (p.i === 2) {
        txt(ctx, '425 Hz', W * 0.93, cy - 30, C.fg, { a: 'right', s: 20, w: 750 });
        txt(ctx, '≈ 378 Hz', W * 0.07, cy - 30, C.fg, { s: 20, w: 750 });
        txt(ctx, '👂', W * 0.93, cy + 8, C.fg, { a: 'right', s: 24 }); txt(ctx, '👂', W * 0.07, cy + 8, C.fg, { s: 24 });
      }
      big(ctx, ['f′ = f', "λ' = λ − v_f·T", "f' = f / (1 ∓ v_f/c)", 'sin Θ = c / v_f   (puska)'][p.i], W, H, C, p.f);
      ctx.globalAlpha = 1;
    }
  };

  /* ───────── 10 ───────── */
  V.lencse = {
    cim: 'Hogyan képez le egy lencse?', tema: '10', hossz: 40,
    jelenetek: [
      { t: 0, cim: 'Fókusz', szoveg: 'A gyűjtőlencse a tengellyel párhuzamos sugarakat a fókuszpontba töri. Távolsága a lencsétől a fókusztávolság, $f$.' },
      { t: 9, cim: 'Nevezetes sugarak', szoveg: 'Párhuzamos → fókuszon át. Fókuszon át → párhuzamos. Középponton át → egyenesen. Ahol találkoznak, ott a kép.' },
      { t: 20, cim: 'Nagyító', szoveg: 'Ha a tárgy a fókuszon belül van ($t\\lt f$), a sugarak széttartanak. Látszólagos, egyenes állású, nagyított kép: ez a nagyító.' },
      { t: 30, cim: 'Képlet', szoveg: 'Leképezési törvény: $\\frac1f=\\frac1k+\\frac1t$. Nagyítás: $N=\\frac KT=\\frac kt$. Látszólagos képnél $k\\lt 0$.' }
    ],
    rajz(ctx, t, W, H, C) {
      const p = at(this, t), cx = W / 2, cy = H * 0.5, sc = W / 52, f = 6; fade(ctx, p.f);
      const X = (x) => cx + x * sc, Y = (y) => cy - y * sc;
      line(ctx, [[0, cy], [W, cy]], C.line, 1);
      ctx.save(); ctx.strokeStyle = alpha(C.link, 0.8); ctx.fillStyle = alpha(C.link, 0.12); ctx.lineWidth = 1.6; ctx.beginPath();
      ctx.moveTo(cx, cy - H * 0.4); ctx.quadraticCurveTo(cx + 18, cy, cx, cy + H * 0.4); ctx.quadraticCurveTo(cx - 18, cy, cx, cy - H * 0.4); ctx.fill(); ctx.stroke(); ctx.restore();
      dot(ctx, X(-f), cy, 4, C.fg); dot(ctx, X(f), cy, 4, C.fg);
      txt(ctx, 'F', X(f), cy + 18, C.muted, { a: 'center', s: 13, w: 700 }); txt(ctx, 'F', X(-f), cy + 18, C.muted, { a: 'center', s: 13, w: 700 });
      const dash = -t * 40;
      const run = (pts, col) => { line(ctx, pts, col, 2); ctx.save(); ctx.setLineDash([4, 12]); ctx.lineDashOffset = dash; line(ctx, pts, C.fg, 2.2); ctx.restore(); };
      if (p.i === 0) {
        [-3, -1.5, 1.5, 3].forEach((y) => run([[0, Y(y)], [X(0), Y(y)], [X(26), Y(y - y / f * 26)]], C.c));
        big(ctx, 'f', W, H, C, p.f);
      } else {
        const tt = p.i === 1 ? 14 : p.i === 2 ? 3.6 : lerp(14, 3.6, 0.5 + 0.5 * Math.sin(p.u * 0.6)), T = 2.5;
        const k = f * tt / (tt - f), yi = -T * k / tt;
        arrow(ctx, X(-tt), cy, X(-tt), Y(T), C.acc, 3.4);
        const ray = (yl) => {
          let dx, dy; if (k > 0) { dx = k; dy = yi - yl; } else { dx = -k; dy = yl - yi; }
          const m = dy / dx;
          run([[X(-tt), Y(T)], [X(0), Y(yl)], [X(27), Y(yl + m * 27)]], C.c);
          if (k < 0) line(ctx, [[X(0), Y(yl)], [X(k), Y(yi)]], alpha(C.link, 0.7), 1.3, [4, 5]);
        };
        ray(T); ray(0); const y3 = -T * f / (tt - f); if (Math.abs(y3) < 9) ray(y3);
        if (Math.abs(k) < 40) { ctx.save(); if (k < 0) ctx.globalAlpha = p.f * 0.7; arrow(ctx, X(k), cy, X(k), Y(yi), k > 0 ? C.c : C.link, 3.4); ctx.restore(); }
        big(ctx, p.i === 3 ? '1/f = 1/k + 1/t' : k > 0 ? 'valódi, fordított kép' : 'látszólagos, nagyított kép', W, H, C, p.f);
      }
      ctx.globalAlpha = 1;
    }
  };

  V.interferencia = {
    cim: 'Fényinterferencia: két rés, rács', tema: '10', hossz: 38,
    jelenetek: [
      { t: 0, cim: 'Két rés', szoveg: 'A fény hullám. Két résen áthaladva két koherens forrás lesz belőle. Ehhez lézer kell: hagyományos forrásnál a koherenciahossz túl kicsi.' },
      { t: 9, cim: 'Útkülönbség', szoveg: 'A két rés távolsága $a$. Az útkülönbség $\\Delta s\\approx a\\sin\\alpha$. Erősítés, ha ez $n\\lambda$.' },
      { t: 19, cim: 'Csíkok', szoveg: 'Az ernyőn világos és sötét csíkok: $\\sin\\alpha_n=n\\frac{\\lambda}{a}$ (erősítés), $\\sin\\beta_n=(n+\\frac12)\\frac{\\lambda}{a}$ (kioltás).' },
      { t: 28, cim: 'Rács', szoveg: 'Optikai rács: sok rés. Ugyanaz a képlet, de éles maximumok. Fehér fényt színekre bont: a vörös térül el jobban.' }
    ],
    rajz(ctx, t, W, H, C) {
      const p = at(this, t), bx = W * 0.3, sx = W * 0.85, cy = H * 0.47, lam = 26; fade(ctx, p.f);
      for (let i = 0; i < 8; i++) { const x = ((p.u * 40 + i * lam) % (bx - 10)); line(ctx, [[x, cy - 60], [x, cy + 60]], wl(620, 0.55), 2); }
      line(ctx, [[bx, 0], [bx, cy - 26]], C.fg, 4); line(ctx, [[bx, cy - 14], [bx, cy + 14]], C.fg, 4); line(ctx, [[bx, cy + 26], [bx, H]], C.fg, 4);
      if (p.i === 3) { ctx.save(); ctx.fillStyle = C.bg; ctx.fillRect(bx - 3, 0, 6, H); ctx.restore(); for (let i = -12; i <= 12; i++) line(ctx, [[bx, cy + i * 9 - 3], [bx, cy + i * 9 + 3]], C.fg, 4); }
      const s1 = [bx, cy - 20], s2 = [bx, cy + 20];
      if (p.i < 3) {
        for (let r = (p.u * 40) % lam; r < W; r += lam) [s1, s2].forEach((s) => { ctx.save(); ctx.strokeStyle = wl(620, clamp(0.6 - r / W, 0, 0.6)); ctx.lineWidth = 1.6; ctx.beginPath(); ctx.arc(s[0], s[1], r, -1.3, 1.3); ctx.stroke(); ctx.restore(); });
      }
      line(ctx, [[sx, 10], [sx, H - 10]], C.dim, 2);
      if (p.i >= 2) {
        for (let y = 10; y < H - 10; y += 2) {
          const al = Math.atan((y - cy) / (sx - bx)), I = p.i === 3 ? Math.pow(Math.cos(Math.PI * 40 * Math.sin(al) / lam * 3), 40) : Math.pow(Math.cos(Math.PI * 40 * Math.sin(al) / lam), 2);
          line(ctx, [[sx + 4, y], [sx + 4 + 40 * I, y]], wl(620, 0.25 + 0.75 * I), 2);
        }
      }
      if (p.i === 1) {
        const P = [sx, cy - H * 0.3];
        line(ctx, [s1, P], C.c, 1.6); line(ctx, [s2, P], C.acc, 1.6);
        txt(ctx, 'Δs = a·sin α', W * 0.5, H * 0.9, C.fg, { a: 'center', s: 17, w: 700 });
      }
      if (p.i === 3) {
        for (let n = -2; n <= 2; n++) { if (!n) continue; for (let l = 400; l <= 700; l += 30) { const s = n * l / 1600; const y = cy - (sx - bx) * Math.tan(Math.asin(s)); line(ctx, [[bx, cy], [sx, y]], wl(l, 0.35), 1.2); dot(ctx, sx, y, 3, wl(l)); } }
      }
      big(ctx, ['két koherens forrás', 'Δs = n·λ → erősítés', 'sin αₙ = n·λ/a', 'rács: sin αₙ = n·λ/a'][p.i], W, H, C, p.f);
      ctx.globalAlpha = 1;
    }
  };
})();
