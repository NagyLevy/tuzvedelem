/* Vászon-animációk: jelenetkezelő (csak látható vásznat rajzol), részecske-láng, parázseső. */
(function () {
  'use strict';
  const TM = window.TM;
  const scenes = new Set();

  /* Egy vászon jelenet: automatikus méretezés (retina), szünet ha nem látszik. */
  TM.scene = (canvas, draw, opts = {}) => {
    const g = canvas.getContext('2d');
    const s = { canvas, g, w: 0, h: 0, t: 0, visible: false, raf: 0, dead: false, state: opts.state || {} };
    const dpr = () => Math.min(2, window.devicePixelRatio || 1);
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      s.w = Math.max(1, r.width); s.h = Math.max(1, r.height);
      const d = dpr();
      canvas.width = Math.round(s.w * d); canvas.height = Math.round(s.h * d);
      g.setTransform(d, 0, 0, d, 0, 0);
      if (opts.onResize) opts.onResize(s);
      if (!s.visible || TM.reduced) frame(performance.now(), true);
    };
    let last = performance.now();
    const frame = (now, once) => {
      if (s.dead) return;
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      s.t += TM.reduced ? 0 : dt;
      g.save();
      draw(g, s.w, s.h, s.t, TM.reduced ? 0.016 : dt, s);
      g.restore();
      if (!once && s.visible && !TM.reduced) s.raf = requestAnimationFrame(frame);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const vo = new IntersectionObserver(([e]) => {
      const was = s.visible;
      s.visible = e.isIntersecting;
      if (s.visible && !was) { last = performance.now(); cancelAnimationFrame(s.raf); s.raf = requestAnimationFrame(frame); }
    }, { rootMargin: '120px' });
    vo.observe(canvas);
    s.redraw = () => frame(performance.now(), true);
    s.tick = (d) => { s.t += d; g.save(); draw(g, s.w, s.h, s.t, d, s); g.restore(); };
    s.destroy = () => { s.dead = true; cancelAnimationFrame(s.raf); ro.disconnect(); vo.disconnect(); scenes.delete(s); };
    scenes.add(s);
    if (TM.reduced) {
      // Csökkentett mozgásnál pár lépést előre szimulálunk, hogy legyen kép.
      setTimeout(() => { for (let i = 0; i < 90; i++) { s.t += 0.016; draw(g, s.w, s.h, s.t, 0.016, s); } }, 30);
    }
    return s;
  };
  TM.destroyScenes = () => { scenes.forEach((s) => s.destroy()); };
  /* Hibakereséshez: a látható jeleneteket előre pörgeti (rejtett, lassított panelben). */
  TM.ff = (sec) => scenes.forEach((s) => { const r = s.canvas.getBoundingClientRect(); if (r.bottom > 0 && r.top < innerHeight) for (let i = 0; i < sec * 60; i++) s.tick(1 / 60); });

  /* ---------- Részecske-láng ----------
     power: 0..1 (lángméret), o2: 0..1 (1 = tökéletes, kék tő, nincs füst; 0.5 = tökéletlen, kormos, füstös),
     A színeket hőmérséklet szerint keverjük: fehér-sárga mag → narancs → vörös → átlátszó. */
  class Flame {
    constructor(o = {}) {
      this.x = o.x || 0; this.y = o.y || 0; this.w = o.w || 40; this.h = o.h || 160;
      this.power = o.power == null ? 1 : o.power;
      this.o2 = o.o2 == null ? 1 : o.o2;
      this.ps = []; this.smoke = []; this.acc = 0; this.sacc = 0;
      this.rate = o.rate || 260; this.blue = o.blue !== false;
    }
    step(dt, t) {
      const p = this.power;
      this.acc += this.rate * p * dt;
      while (this.acc > 1) {
        this.acc--;
        const spread = (Math.random() - 0.5) * this.w * (0.6 + 0.4 * p);
        this.ps.push({
          x: this.x + spread, y: this.y - Math.random() * 6,
          vx: -spread * 0.25 + (Math.random() - 0.5) * 12,
          vy: -(this.h * (0.9 + Math.random() * 0.6)) * (0.55 + 0.45 * p),
          life: 1, decay: 0.85 + Math.random() * 0.9,
          r: this.w * (0.32 + Math.random() * 0.28) * (0.6 + 0.4 * p),
          seed: Math.random() * 100
        });
      }
      const sooty = TM.clamp((1 - this.o2) * 2, 0, 1);
      this.sacc += 26 * sooty * p * dt;
      while (this.sacc > 1) {
        this.sacc--;
        this.smoke.push({ x: this.x + (Math.random() - 0.5) * this.w * 0.5, y: this.y - this.h * 0.9, vx: (Math.random() - 0.5) * 14, vy: -40 - Math.random() * 40, life: 1, r: 10 + Math.random() * 12, seed: Math.random() * 100 });
      }
      for (const q of this.ps) {
        const sway = Math.sin(t * 6 + q.seed + q.y * 0.03) * 22;
        q.vx += (this.x - q.x) * 2.2 * dt + sway * dt;
        q.x += q.vx * dt; q.y += q.vy * dt;
        q.life -= q.decay * dt * 1.25; q.r *= 1 - 0.55 * dt;
      }
      for (const q of this.smoke) {
        q.x += (q.vx + Math.sin(t * 1.5 + q.seed) * 12) * dt; q.y += q.vy * dt;
        q.r += 16 * dt; q.life -= 0.32 * dt;
      }
      this.ps = this.ps.filter((q) => q.life > 0 && q.r > 0.5);
      this.smoke = this.smoke.filter((q) => q.life > 0);
    }
    draw(g) {
      const p = this.power;
      const sooty = TM.clamp((1 - this.o2) * 2, 0, 1);
      // talajfény
      if (p > 0.02) {
        const rg = g.createRadialGradient(this.x, this.y - this.h * 0.35, 0, this.x, this.y - this.h * 0.35, this.h * 1.4);
        rg.addColorStop(0, `rgba(255,120,30,${0.28 * p})`);
        rg.addColorStop(1, 'rgba(255,80,20,0)');
        g.fillStyle = rg;
        g.fillRect(this.x - this.h * 1.5, this.y - this.h * 1.9, this.h * 3, this.h * 3);
      }
      // füst
      g.globalCompositeOperation = 'source-over';
      for (const q of this.smoke) {
        const a = q.life * 0.22 * sooty;
        const rg = g.createRadialGradient(q.x, q.y, 0, q.x, q.y, q.r);
        rg.addColorStop(0, `rgba(70,66,64,${a})`);
        rg.addColorStop(1, 'rgba(70,66,64,0)');
        g.fillStyle = rg; g.beginPath(); g.arc(q.x, q.y, q.r, 0, 7); g.fill();
      }
      g.globalCompositeOperation = 'lighter';
      for (const q of this.ps) {
        const L = q.life;
        // L 1 → 0: fehér/sárga → narancs → vörös
        let r, gg, b;
        if (L > 0.7) { r = 255; gg = 230 - (1 - L) * 200; b = 160 - (1 - L) * 400; }
        else if (L > 0.35) { r = 255; gg = 120 + (L - 0.35) * 300; b = 20; }
        else { r = 200 + L * 150; gg = 40 + L * 200; b = 10; }
        // tökéletlen égés: sárgább, kormosabb láng (fehér izzó szén)
        if (sooty > 0) { gg = gg * (1 - sooty * 0.15); b *= 1 - sooty; }
        const a = Math.min(1, L * 1.4) * 0.5;
        const rg = g.createRadialGradient(q.x, q.y, 0, q.x, q.y, q.r);
        rg.addColorStop(0, `rgba(${r | 0},${Math.max(0, gg) | 0},${Math.max(0, b) | 0},${a})`);
        rg.addColorStop(1, `rgba(${r | 0},${Math.max(0, gg * 0.6) | 0},0,0)`);
        g.fillStyle = rg; g.beginPath(); g.arc(q.x, q.y, q.r, 0, 7); g.fill();
      }
      // kék tő (tökéletes égésnél)
      if (this.blue && p > 0.05) {
        const bA = 0.55 * p * TM.clamp(this.o2 * 1.6 - 0.6, 0, 1);
        const bg = g.createRadialGradient(this.x, this.y - 4, 0, this.x, this.y - 4, this.w * 0.75);
        bg.addColorStop(0, `rgba(90,160,255,${bA})`);
        bg.addColorStop(1, 'rgba(40,90,255,0)');
        g.fillStyle = bg; g.beginPath(); g.ellipse(this.x, this.y - 4, this.w * 0.7, this.w * 0.45, 0, 0, 7); g.fill();
      }
      g.globalCompositeOperation = 'source-over';
    }
  }
  TM.Flame = Flame;

  /* ---------- Parázseső háttér ---------- */
  TM.embers = (canvas, o = {}) => {
    const flames = [];
    let es = [];
    return TM.scene(canvas, (g, w, h, t, dt) => {
      const dark = o.alwaysDark || TM.isDark();
      g.clearRect(0, 0, w, h);
      // alsó izzás
      const glow = g.createRadialGradient(w / 2, h * 1.08, 0, w / 2, h * 1.08, Math.max(w, h) * 0.75);
      glow.addColorStop(0, dark ? 'rgba(255,80,20,0.38)' : 'rgba(255,110,40,0.22)');
      glow.addColorStop(0.45, dark ? 'rgba(160,30,10,0.12)' : 'rgba(255,160,80,0.08)');
      glow.addColorStop(1, 'rgba(0,0,0,0)');
      g.fillStyle = glow; g.fillRect(0, 0, w, h);
      const want = Math.round((w * h) / (o.density || 9000));
      while (es.length < want) es.push(spawn(w, h, true));
      g.globalCompositeOperation = dark ? 'lighter' : 'source-over';
      for (const e of es) {
        e.y -= e.v * dt * 60; e.x += Math.sin(t * e.f + e.s) * 0.4 * dt * 60; e.life -= dt * 0.08;
        const tw = 0.6 + 0.4 * Math.sin(t * 7 + e.s * 3);
        const a = Math.max(0, Math.min(1, e.life)) * tw * (dark ? 0.9 : 0.55);
        g.fillStyle = `hsla(${e.h},100%,${dark ? 60 : 52}%,${a})`;
        g.beginPath(); g.arc(e.x, e.y, e.r, 0, 7); g.fill();
        if (e.r > 1.6) {
          g.fillStyle = `hsla(${e.h},100%,60%,${a * 0.15})`;
          g.beginPath(); g.arc(e.x, e.y, e.r * 4, 0, 7); g.fill();
        }
      }
      es = es.filter((e) => e.life > 0 && e.y > -20);
      g.globalCompositeOperation = 'source-over';
      if (o.flame) {
        if (!flames.length) flames.push(new Flame({ w: Math.min(70, w * 0.09), h: Math.min(260, h * 0.32), rate: 320 }));
        const f = flames[0];
        f.x = w * (o.flameX ? o.flameX(w) : 0.5); f.y = h * (typeof o.flameY === 'function' ? o.flameY(w) : o.flameY || 0.72);
        f.step(dt, t); f.draw(g);
      }
    });
    function spawn(w, h, init) {
      return { x: Math.random() * w, y: init ? Math.random() * h : h + 10, v: 0.3 + Math.random() * 1.1, r: 0.6 + Math.random() * 2.2, f: 0.5 + Math.random() * 1.5, s: Math.random() * 10, h: 10 + Math.random() * 30, life: 0.6 + Math.random() * 1.2 };
    }
  };
})();
