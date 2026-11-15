/* GRIND mód: végtelen kérdésfolyam ismétléses rendszerrel (Leitner), XP, rangok, combo, Boss fight. */
(function () {
  'use strict';
  const TM = window.TM;
  const { h, $, $$ } = TM;

  const KEY = 'tm-grind-v1';
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } };
  const save = (s) => { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) { /* */ } };
  const INTERVAL = [1, 3, 8, 20, 50, 120];
  const RANKS = [[1, 'Újonc', '🔰'], [3, 'Kadét', '🧯'], [5, 'Tűzoltó', '🚒'], [8, 'Szakaszvezető', '🔥'], [12, 'Kapitány', '⚔️'], [16, 'Lángparancsnok', '🐉'], [20, 'Hashira', '👑'], [30, 'Legenda', '🌋']];
  const COMBO_TXT = { 5: 'GYORSULSZ!', 10: 'ON FIRE!', 15: 'SHONEN ARC!', 25: 'BANKAI!', 40: 'ULTRA INSTINCT', 60: 'ISTENI SZINT', 100: 'TÚLLÉPTED A HATÁRT' };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = (Math.random() * (i + 1)) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const levelOf = (xp) => Math.floor(Math.sqrt(xp / 60)) + 1;
  const xpFor = (lv) => 60 * (lv - 1) * (lv - 1);
  const rankOf = (lv) => RANKS.filter((r) => lv >= r[0]).pop();

  function allQuestions() {
    const out = [];
    TM.lessons.forEach((l) => l.quiz.forEach((q) => out.push({ ...q, topic: l.id })));
    (TM.bank || []).forEach((q) => out.push(q));
    out.forEach((q) => { q.key = q.topic + '|' + (q.q || q.text); });
    return out;
  }
  const topicTitle = (id) => (TM.plan.find((p) => p.id === id) || { title: id }).title;
  const topicNo = (id) => (TM.plan.find((p) => p.id === id) || { no: 0 }).no;

  TM.grind = function (app) {
    const Q = allQuestions();
    const topics = [...new Set(Q.map((q) => q.topic))].sort((a, b) => topicNo(a) - topicNo(b));
    const S = Object.assign({ xp: 0, tick: 0, cards: {}, best: 0, bossBest: 0, sel: topics, days: [], answered: 0, correct: 0 }, load());
    S.sel = S.sel.filter((t) => topics.includes(t)); if (!S.sel.length) S.sel = topics.slice();
    let mode = 'grind', combo = 0, cur = null, answered = false, boss = null, timer = 0, lastKey = '';

    const view = h(`<div class="grind">
      <section class="g-hero"><canvas aria-hidden="true"></canvas><div class="wrap">
        <p class="eyebrow reveal"><span class="num">∞</span> Grind mód</p>
        <h1 class="h-hero word-rise">Grindolj, <span class="fire-text">amíg ég.</span></h1>
        <p class="lead reveal">${Q.length} kérdés a teljes anyagból. Amit elrontasz, az gyakrabban jön vissza; amit tudsz, ritkábban. Szedd az XP-t, építs combót, és verd meg a Bosst.</p>
        <div class="g-stats reveal">
          <div class="g-rank"><span class="g-badge" data-o="badge"></span><div><small data-o="lvl"></small><b data-o="rank"></b></div></div>
          <div class="g-xp"><div class="g-xpbar"><i data-o="xpbar"></i></div><small data-o="xptxt"></small></div>
          <div class="g-mini"><b data-o="streak">0</b><small>nap sorozat</small></div>
          <div class="g-mini"><b data-o="best">0</b><small>legjobb combo</small></div>
          <div class="g-mini"><b data-o="acc">–</b><small>pontosság</small></div>
        </div>
      </div></section>
      <section class="section" style="padding-top:40px"><div class="wrap">
        <div class="g-modes"><div class="seg" data-mode><button class="on" data-m="grind">∞ Végtelen grind</button><button data-m="boss">☠ Boss fight</button><button data-m="weak">🎯 Gyenge pontjaim</button></div></div>
        <div class="g-topics" data-topics></div>
        <div class="g-arena">
          <div class="g-combo" data-combo><canvas aria-hidden="true"></canvas><div><b data-o="combo">0</b><small>COMBO</small></div></div>
          <div class="g-boss" data-boss hidden><div class="g-bossname">☠ TŰZDÉMON</div><div class="g-hp"><i data-o="hp"></i></div><div class="g-lives" data-o="lives"></div><div class="g-timer"><i data-o="timer"></i></div></div>
          <div class="g-slot" data-slot></div>
        </div>
        <p class="muted" style="text-align:center;font-size:13px;margin-top:18px">Billentyűk: <span class="kbd">1–8</span> válasz · <span class="kbd">I</span>/<span class="kbd">H</span> igaz-hamis · <span class="kbd">Enter</span> ellenőrzés / tovább</p>
      </div></section>
      <div class="g-flash" data-flash></div>
    </div>`);
    app.replaceChildren(view);
    TM.splitWords(view); TM.observeReveals(view);
    TM.embers($('.g-hero canvas', view), { density: 8000, alwaysDark: true });

    /* combo-láng */
    const fl = new TM.Flame({ w: 26, h: 60, rate: 160 });
    TM.scene($('[data-combo] canvas', view), (g, w, hh, t, dt) => {
      g.clearRect(0, 0, w, hh);
      const p = Math.min(1, combo / 25);
      fl.x = w / 2; fl.y = hh * 0.92; fl.w = 18 + p * 30; fl.h = 30 + p * hh * 0.75; fl.power = combo ? 0.35 + p * 0.65 : 0.08; fl.rate = 100 + p * 300;
      fl.step(dt, t); fl.draw(g);
    });

    /* napi sorozat */
    const today = new Date().toISOString().slice(0, 10);
    const streak = () => { let n = 0; const d = new Date(); for (;;) { const k = d.toISOString().slice(0, 10); if (S.days.includes(k)) { n++; d.setDate(d.getDate() - 1); } else if (n === 0 && k === today) { d.setDate(d.getDate() - 1); } else break; } return n; };

    function hud() {
      const lv = levelOf(S.xp), r = rankOf(lv), a = xpFor(lv), b = xpFor(lv + 1);
      $('[data-o="badge"]', view).textContent = r[2];
      $('[data-o="lvl"]', view).textContent = `${lv}. szint`;
      $('[data-o="rank"]', view).textContent = r[1];
      $('[data-o="xpbar"]', view).style.width = ((S.xp - a) / (b - a)) * 100 + '%';
      $('[data-o="xptxt"]', view).textContent = `${S.xp - a} / ${b - a} XP a következő szintig`;
      $('[data-o="streak"]', view).textContent = streak();
      $('[data-o="best"]', view).textContent = S.best;
      $('[data-o="acc"]', view).textContent = S.answered ? Math.round((S.correct / S.answered) * 100) + '%' : '–';
      $('[data-o="combo"]', view).textContent = combo;
      $('[data-combo]', view).classList.toggle('hot', combo >= 5);
      topicsUI();
    }

    function mastery(t) {
      const qs = Q.filter((q) => q.topic === t);
      return qs.reduce((s, q) => s + Math.min(5, (S.cards[q.key] || { b: 0 }).b), 0) / (qs.length * 5);
    }
    function topicsUI() {
      const host = $('[data-topics]', view);
      host.innerHTML = topics.map((t) => { const m = mastery(t); return `<button class="g-chip ${S.sel.includes(t) ? 'on' : ''}" data-t="${t}"><span>${topicNo(t)}. ${topicTitle(t)}</span><i style="--m:${(m * 100).toFixed(0)}%"></i><small>${Math.round(m * 100)}%</small></button>`; }).join('') +
        `<button class="g-chip all" data-t="*"><span>${S.sel.length === topics.length ? 'Egyik sem' : 'Mind'}</span></button>`;
      $$('.g-chip', host).forEach((b) => b.onclick = () => {
        const t = b.dataset.t;
        if (t === '*') S.sel = S.sel.length === topics.length ? [topics[0]] : topics.slice();
        else if (S.sel.includes(t)) { if (S.sel.length > 1) S.sel = S.sel.filter((x) => x !== t); } else S.sel.push(t);
        save(S); topicsUI(); if (!answered && mode !== 'boss') next();
      });
    }

    function pick() {
      let pool = Q.filter((q) => S.sel.includes(q.topic));
      if (mode === 'weak') { const w = pool.filter((q) => S.cards[q.key] && S.cards[q.key].b <= 1); if (w.length) pool = w; else TM.toast('Nincs gyenge pontod ezekben a témákban 💪'); }
      if (pool.length > 1) pool = pool.filter((q) => q.key !== lastKey);
      if (mode === 'boss') return pool[(Math.random() * pool.length) | 0];
      const due = pool.filter((q) => { const c = S.cards[q.key]; return !c || c.d <= S.tick; });
      const src = due.length ? due : pool;
      const minB = Math.min(...src.map((q) => (S.cards[q.key] || { b: -1 }).b));
      const best = src.filter((q) => (S.cards[q.key] || { b: -1 }).b === minB);
      return best[(Math.random() * best.length) | 0];
    }

    function prep(q) {
      if ((q.type === 'mc' || q.type === 'multi') && !q.fixed) {
        const order = shuffle(q.opts.map((_, i) => i)); const ans = Array.isArray(q.a) ? q.a : [q.a];
        return { ...q, opts: order.map((i) => q.opts[i]), a: q.type === 'multi' ? ans.map((a) => order.indexOf(a)) : order.indexOf(q.a) };
      }
      return q;
    }

    function next() {
      clearInterval(timer);
      const raw = pick(); if (!raw) return;
      lastKey = raw.key; cur = prep(raw); answered = false;
      const T = { mc: 'Feleletválasztós', multi: 'Több helyes válasz', tf: 'Igaz vagy hamis?', cloze: 'Egészítse ki!' };
      const c = S.cards[cur.key];
      const card = h(`<div class="q-card enter g-card"><div class="g-qhead"><span class="q-type">${T[cur.type]}</span><span class="g-topic">${topicNo(cur.topic)}. ${topicTitle(cur.topic)}${c ? ` · ${'★'.repeat(Math.min(5, c.b))}${'☆'.repeat(5 - Math.min(5, c.b))}` : ' · ÚJ'}</span></div></div>`);
      if (cur.type === 'cloze') {
        const blanks = [];
        const body = cur.text.split(/(\[[^\]]+\])/).map((p) => {
          if (/^\[.*\]$/.test(p)) { const alts = p.slice(1, -1).split('|'); blanks.push(alts); return `<input type="text" autocomplete="off" spellcheck="false" data-b="${blanks.length - 1}" style="--w:${Math.max(6, alts[0].length + 2)}ch">`; }
          return esc(p);
        }).join('');
        cur._blanks = blanks;
        card.appendChild(h(`<div class="q-text q-cloze">${body}</div>`));
      } else {
        card.appendChild(h(`<div class="q-text">${cur.q}</div>`));
        const opts = cur.type === 'tf' ? ['Igaz', 'Hamis'] : cur.opts;
        const wrap = h('<div class="q-opts"></div>');
        opts.forEach((o, i) => { const b = h(`<button class="q-opt" data-i="${i}"><span class="k">${cur.type === 'tf' ? (i ? 'H' : 'I') : i + 1}</span><span>${o}</span></button>`); b.onclick = () => select(i); wrap.appendChild(b); });
        card.appendChild(wrap);
      }
      card.appendChild(h('<div class="q-explain"></div>'));
      card.appendChild(h(`<div class="q-actions"><span class="g-xpgain" data-o="gain"></span><button class="btn btn-fire" data-act>Ellenőrzés</button></div>`));
      $('[data-act]', card).onclick = () => advance();
      $('[data-slot]', view).replaceChildren(card);
      const inp = $('input', card); if (inp) setTimeout(() => inp.focus({ preventScroll: true }), 40);
      if (mode === 'boss') startTimer();
    }

    function select(i) {
      if (answered) return;
      const b = $(`.q-opt[data-i="${i}"]`, view); if (!b) return;
      if (cur.type === 'multi') { b.classList.toggle('sel'); return; }
      $$('.q-opt', view).forEach((x) => x.classList.remove('sel')); b.classList.add('sel');
      if (cur.type !== 'multi') check();
    }

    function check(timeout) {
      if (answered) return;
      let ok = false;
      if (timeout) { ok = false; }
      else if (cur.type === 'cloze') {
        const ins = $$('.q-cloze input', view);
        if (ins.every((n) => !n.value.trim())) { TM.toast('Írj be valamit!'); return; }
        let good = 0;
        ins.forEach((n) => { const alts = cur._blanks[+n.dataset.b]; const hit = alts.some((a) => TM.norm(a) === TM.norm(n.value)); n.classList.add(hit ? 'ok' : 'bad'); n.readOnly = true; if (hit) good++; else n.insertAdjacentHTML('afterend', `<span class="sol">${esc(alts[0])}</span>`); });
        ok = good === ins.length;
      } else {
        const sel = $$('.q-opt.sel', view).map((b) => +b.dataset.i);
        if (!sel.length) { TM.toast('Válassz!'); return; }
        const ans = cur.type === 'tf' ? [cur.a ? 0 : 1] : Array.isArray(cur.a) ? cur.a : [cur.a];
        $$('.q-opt', view).forEach((b) => { const i = +b.dataset.i, isA = ans.includes(i), isS = sel.includes(i); b.disabled = true; b.classList.remove('sel'); if (isA && isS) b.classList.add('ok'); else if (isS) b.classList.add('bad'); else if (isA) b.classList.add('miss', 'ok'); });
        ok = ans.length === sel.length && ans.every((a) => sel.includes(a));
      }
      if (timeout) $$('.q-opt', view).forEach((b) => b.disabled = true);
      answered = true; clearInterval(timer);
      score(ok);
      const ex = $('.q-explain', view);
      ex.innerHTML = `<b>${timeout ? '⏱ Lejárt az idő! ' : ok ? 'Helyes! ' : 'Nem egészen. '}</b>${cur.why || ''}${cur.src ? `<span class="src">Forrás: ${cur.src}</span>` : ''}`;
      ex.classList.add('show');
      const btn = $('[data-act]', view);
      btn.textContent = mode === 'boss' && boss && boss.over ? 'Eredmény' : 'Következő →';
      btn.focus({ preventScroll: true });
    }

    function score(ok) {
      S.tick++; S.answered++;
      const c = S.cards[cur.key] || { b: 0, d: 0 };
      if (!S.days.includes(today)) S.days.push(today);
      const card = $('.g-card', view);
      if (ok) {
        S.correct++; combo++;
        c.b = Math.min(5, c.b + 1); c.d = S.tick + INTERVAL[c.b];
        const gain = (10 + Math.min(combo, 20)) * (mode === 'boss' ? 2 : 1);
        const lvBefore = levelOf(S.xp); S.xp += gain;
        $('[data-o="gain"]', view).textContent = `+${gain} XP`;
        $('[data-o="gain"]', view).classList.add('show');
        if (combo > S.best) S.best = combo;
        if (COMBO_TXT[combo]) banner(`COMBO ×${combo}`, COMBO_TXT[combo]);
        const r = $('[data-act]', view).getBoundingClientRect(); TM.sparks(r.left + r.width / 2, r.top, 18 + Math.min(combo, 30) * 2);
        if (levelOf(S.xp) > lvBefore) { const lv = levelOf(S.xp); setTimeout(() => banner('LEVEL UP!', `${lv}. szint · ${rankOf(lv)[1]} ${rankOf(lv)[2]}`, true), 350); }
        if (boss) { boss.hp = Math.max(0, boss.hp - 5); boss.hits++; if (boss.hp <= 0) endBoss(true); }
      } else {
        if (combo >= 5) TM.toast(`Combo elveszett (${combo}) 💔`);
        combo = 0; c.b = 0; c.d = S.tick + 2;
        card.classList.add('g-hit'); flash('bad');
        if (boss) { boss.lives--; if (boss.lives <= 0) endBoss(false); }
      }
      S.cards[cur.key] = c; save(S); hud(); bossUI();
    }

    function banner(big, small, lvl) {
      const b = h(`<div class="g-banner ${lvl ? 'lvl' : ''}"><b>${big}</b><span>${small}</span></div>`);
      view.appendChild(b); flash(lvl ? 'lvl' : 'good');
      if (lvl) TM.sparks(innerWidth / 2, innerHeight / 2, 140);
      setTimeout(() => b.remove(), 1900);
    }
    function flash(k) { const f = $('[data-flash]', view); f.className = 'g-flash ' + k; void f.offsetWidth; f.classList.add('go'); }

    /* Boss fight */
    function startBoss() { boss = { hp: 100, lives: 3, hits: 0, over: false }; $('[data-boss]', view).hidden = false; bossUI(); next(); }
    function bossUI() {
      if (!boss) return;
      $('[data-o="hp"]', view).style.width = boss.hp + '%';
      $('[data-o="lives"]', view).innerHTML = '❤️'.repeat(Math.max(0, boss.lives)) + '<span style="opacity:.25">' + '❤️'.repeat(3 - Math.max(0, boss.lives)) + '</span>';
    }
    function startTimer() {
      const T0 = performance.now(), D = 25000, bar = $('[data-o="timer"]', view);
      timer = setInterval(() => { const k = 1 - (performance.now() - T0) / D; bar.style.width = Math.max(0, k * 100) + '%'; bar.classList.toggle('low', k < 0.3); if (k <= 0) { clearInterval(timer); check(true); } }, 100);
    }
    function endBoss(win) {
      boss.over = true; boss.win = win; clearInterval(timer);
      if (win) S.bossBest = Math.max(S.bossBest || 0, boss.lives);
      save(S);
    }
    function advance() { if (!answered) return check(); if (boss && boss.over) return showBossEnd(); next(); }
    function showBossEnd() {
      const win = boss.win;
      {
        const slot = $('[data-slot]', view);
        slot.replaceChildren(h(`<div class="q-card enter q-done g-end ${win ? 'win' : 'lose'}">
          <div class="score ${win ? 'fire-text' : ''}">${win ? 'GYŐZELEM' : 'K.O.'}</div>
          <p>${win ? `Legyőzted a Tűzdémont ${boss.lives} megmaradt élettel! 🔥` : `A Tűzdémon nyert. ${boss.hits} találatot vittél be (${100 - boss.hp}% sebzés).`}<br><span class="muted">Tipp: a „Gyenge pontjaim” módban gyakorold azt, amit most elrontottál.</span></p>
          <div class="mini-cta" style="justify-content:center"><button class="btn btn-fire" data-again>Újra a Boss ellen</button><button class="btn btn-ghost" data-weak>Gyenge pontjaim</button></div></div>`));
        $('[data-again]', slot).onclick = () => startBoss();
        $('[data-weak]', slot).onclick = () => setMode('weak');
        if (win) TM.sparks(innerWidth / 2, innerHeight / 2, 180);
      }
    }

    function setMode(m) {
      mode = m; combo = 0; clearInterval(timer);
      $$('[data-mode] button', view).forEach((b) => b.classList.toggle('on', b.dataset.m === m));
      $('[data-boss]', view).hidden = m !== 'boss';
      boss = null; hud();
      if (m === 'boss') startBoss(); else next();
    }
    $$('[data-mode] button', view).forEach((b) => b.onclick = () => setMode(b.dataset.m));

    const onKey = (e) => {
      if (!document.body.contains(view)) { document.removeEventListener('keydown', onKey); return; }
      if (!cur) return;
      if (e.key === 'Enter') { e.preventDefault(); if ($('.g-end', view)) return; advance(); return; }
      if (answered || cur.type === 'cloze' || e.target.tagName === 'INPUT') return;
      let i = -1;
      if (cur.type === 'tf') i = { i: 0, I: 0, h: 1, H: 1, 1: 0, 2: 1 }[e.key] ?? -1;
      else if (/^[1-8]$/.test(e.key)) i = +e.key - 1;
      if (i >= 0) select(i);
    };
    document.addEventListener('keydown', onKey);


    TM._grindCur = () => cur; // hibakereséshez
    hud(); next();
    return () => { clearInterval(timer); document.removeEventListener('keydown', onKey); };
  };
})();
