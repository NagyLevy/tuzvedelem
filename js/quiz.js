/* Kvízmotor (feleletválasztós, több helyes, igaz/hamis, kitöltős) és villámkártyák. */
(function () {
  'use strict';
  const TM = window.TM;
  const { h, $, $$ } = TM;

  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = (Math.random() * (i + 1)) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const TYPE = { mc: 'Feleletválasztós', multi: 'Több helyes válasz', tf: 'Igaz vagy hamis?', cloze: 'Egészítse ki!' };

  /* Kitöltős: "A [hő] az energia egyik [fajtája|formája]…" — a | után elfogadott változatok. */
  function parseCloze(text) {
    const parts = []; const blanks = [];
    text.split(/(\[[^\]]+\])/).forEach((p) => {
      if (/^\[.*\]$/.test(p)) { const alts = p.slice(1, -1).split('|'); blanks.push(alts); parts.push({ blank: blanks.length - 1 }); }
      else if (p) parts.push({ text: p });
    });
    return { parts, blanks };
  }

  TM.quiz = (root, lesson) => {
    let items, idx, score, answered, current;
    const start = () => {
      items = shuffle(lesson.quiz).map((q) => (q.type === 'mc' || q.type === 'multi') && !q.fixed ? shuffleOpts(q) : q);
      idx = 0; score = 0; render();
    };
    function shuffleOpts(q) {
      const order = shuffle(q.opts.map((_, i) => i));
      const ans = Array.isArray(q.a) ? q.a : [q.a];
      return { ...q, opts: order.map((i) => q.opts[i]), a: q.type === 'multi' ? ans.map((a) => order.indexOf(a)) : order.indexOf(q.a) };
    }
    const shell = h(`<div class="quiz">
      <div class="q-head"><div class="q-bar"><i></i></div><div class="q-count"></div></div>
      <div class="q-slot"></div></div>`);
    root.appendChild(shell);
    const slot = $('.q-slot', shell);

    function render() {
      $('.q-bar i', shell).style.width = (idx / items.length) * 100 + '%';
      $('.q-count', shell).textContent = idx < items.length ? `${idx + 1} / ${items.length}` : `${items.length} / ${items.length}`;
      if (idx >= items.length) return finish();
      answered = false;
      const q = (current = items[idx]);
      const card = h(`<div class="q-card enter"><div class="q-type">${TYPE[q.type]}</div></div>`);
      if (q.type === 'cloze') {
        const { parts, blanks } = parseCloze(q.text);
        q._blanks = blanks;
        const body = parts.map((p) => p.text != null ? esc(p.text)
          : `<input type="text" autocomplete="off" autocapitalize="off" spellcheck="false" data-b="${p.blank}" style="--w:${Math.max(6, blanks[p.blank][0].length + 2)}ch" aria-label="${p.blank + 1}. hiányzó szó">`).join('');
        card.appendChild(h(`<div class="q-text q-cloze">${body}</div>`));
      } else {
        card.appendChild(h(`<div class="q-text">${q.q}</div>`));
        const opts = q.type === 'tf' ? ['Igaz', 'Hamis'] : q.opts;
        const wrap = h('<div class="q-opts"></div>');
        opts.forEach((o, i) => {
          const b = h(`<button class="q-opt" data-i="${i}"><span class="k">${q.type === 'tf' ? (i ? 'H' : 'I') : 'ABCDEFGH'[i]}</span><span>${o}</span></button>`);
          b.onclick = () => pick(b, i);
          wrap.appendChild(b);
        });
        card.appendChild(wrap);
      }
      card.appendChild(h(`<div class="q-explain"></div>`));
      const act = h(`<div class="q-actions"><span class="muted" style="font-size:13px">${q.type === 'cloze' ? 'Ékezet és kis/nagybetű nem számít.' : q.type === 'multi' ? 'Jelöld be az összeset, aztán Ellenőrzés.' : 'Billentyű: ' + (q.type === 'tf' ? 'I / H' : '1–4') + ', Enter'}</span><button class="btn btn-fire" data-act>Ellenőrzés</button></div>`);
      card.appendChild(act);
      $('[data-act]', act).onclick = () => (answered ? next() : check());
      slot.replaceChildren(card);
      const first = $('input', card);
      if (first) setTimeout(() => first.focus({ preventScroll: true }), 50);
    }

    function pick(btn, i) {
      if (answered) return;
      const q = current;
      if (q.type === 'multi') { btn.classList.toggle('sel'); return; }
      $$('.q-opt', slot).forEach((b) => b.classList.remove('sel'));
      btn.classList.add('sel');
    }

    function check() {
      const q = current; let ok = false;
      if (q.type === 'cloze') {
        const ins = $$('input', slot);
        if (ins.every((n) => !n.value.trim())) { TM.toast('Írj be valamit a mezőkbe!'); return; }
        let good = 0;
        ins.forEach((n) => {
          const alts = q._blanks[+n.dataset.b];
          const hit = alts.some((a) => TM.norm(a) === TM.norm(n.value));
          n.classList.add(hit ? 'ok' : 'bad'); n.readOnly = true;
          if (hit) good++;
          else n.insertAdjacentHTML('afterend', `<span class="sol">${esc(alts[0])}</span>`);
        });
        ok = good === ins.length;
        score += good / ins.length;
      } else {
        const sel = $$('.q-opt.sel', slot).map((b) => +b.dataset.i);
        if (!sel.length) { TM.toast('Válassz egy választ!'); return; }
        const ans = q.type === 'tf' ? [q.a ? 0 : 1] : Array.isArray(q.a) ? q.a : [q.a];
        $$('.q-opt', slot).forEach((b) => {
          const i = +b.dataset.i; b.disabled = true;
          const isA = ans.includes(i), isS = sel.includes(i);
          b.classList.remove('sel');
          if (isA && isS) b.classList.add('ok');
          else if (isS) b.classList.add('bad');
          else if (isA) b.classList.add('miss', q.type === 'multi' ? 'x' : 'ok');
        });
        ok = ans.length === sel.length && ans.every((a) => sel.includes(a));
        if (ok) score++;
      }
      answered = true;
      const ex = $('.q-explain', slot);
      ex.innerHTML = `<b>${ok ? 'Helyes! ' : 'Nem egészen. '}</b>${q.why || ''}${q.src ? `<span class="src">Forrás: ${q.src}</span>` : ''}`;
      ex.classList.add('show');
      const btn = $('[data-act]', slot);
      btn.textContent = idx + 1 < items.length ? 'Következő →' : 'Eredmény';
      btn.focus({ preventScroll: true });
      if (ok) { const r = btn.getBoundingClientRect(); TM.sparks(r.left + r.width / 2, r.top, 26); }
    }
    function next() { idx++; render(); }

    function finish() {
      const pct = score / items.length;
      const s = TM.store.patch(lesson.id, (c) => { c.best = Math.max(c.best || 0, pct); if (pct >= 0.8) c.done = true; return c; });
      const msg = pct >= 0.9 ? 'Ez ZH-szint. Mehet a következő lecke!' : pct >= 0.7 ? 'Jó úton vagy — a rosszakat nézd át még egyszer.' : 'Olvasd át újra a kiemelt ZH-mondatokat, aztán próbáld újra.';
      slot.replaceChildren(h(`<div class="q-card enter q-done">
        <div class="score fire-text">${Math.round(pct * 100)}%</div>
        <p>${msg}<br><span class="muted">Legjobb eredményed: ${Math.round((s.best || 0) * 100)}%</span></p>
        <div class="mini-cta" style="justify-content:center"><button class="btn btn-fire" data-r>Újra, más sorrendben</button></div></div>`));
      $('[data-r]', slot).onclick = start;
      if (pct >= 0.7) { const r = slot.getBoundingClientRect(); TM.sparks(innerWidth / 2, r.top + 80, 120); }
    }

    const onKey = (e) => {
      if (!document.body.contains(shell)) { document.removeEventListener('keydown', onKey); return; }
      const r = shell.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight) return;
      const q = current; if (!q) return;
      if (e.key === 'Enter') { e.preventDefault(); answered ? next() : check(); return; }
      if (answered || q.type === 'cloze' || e.target.tagName === 'INPUT') return;
      let i = -1;
      if (q.type === 'tf') i = { i: 0, I: 0, h: 1, H: 1 }[e.key] ?? -1;
      else if (/^[1-8]$/.test(e.key)) i = +e.key - 1;
      const b = $(`.q-opt[data-i="${i}"]`, slot);
      if (b) pick(b, i);
    };
    document.addEventListener('keydown', onKey);
    start();
  };

  /* Villámkártyák: fogalom elöl, ZH-definíció hátul. */
  TM.flashcards = (root, cards) => {
    let order = cards.map((_, i) => i), i = 0;
    const deck = h(`<div><div class="cards-deck"><div class="flash"><div class="front"><h3></h3><small>Kattints a megfordításhoz · Szóköz</small></div><div class="back"></div></div></div>
      <div class="deck-nav"><button class="btn btn-ghost" data-p>←</button><span data-c></span><button class="btn btn-ghost" data-n>→</button><button class="btn btn-ghost" data-s>Keverés</button></div></div>`);
    root.appendChild(deck);
    const f = $('.flash', deck);
    const show = () => {
      const c = cards[order[i]];
      f.classList.remove('flip');
      setTimeout(() => { $('h3', f).textContent = c.term; $('.back', f).innerHTML = c.def; }, f.classList.contains('flip') ? 250 : 0);
      $('h3', f).textContent = c.term; $('.back', f).innerHTML = c.def;
      $('[data-c]', deck).textContent = `${i + 1} / ${cards.length}`;
    };
    f.onclick = () => f.classList.toggle('flip');
    $('[data-p]', deck).onclick = () => { i = (i - 1 + cards.length) % cards.length; show(); };
    $('[data-n]', deck).onclick = () => { i = (i + 1) % cards.length; show(); };
    $('[data-s]', deck).onclick = () => { order = shuffle(order); i = 0; show(); TM.toast('Megkeverve'); };
    const onKey = (e) => {
      if (!document.body.contains(deck)) { document.removeEventListener('keydown', onKey); return; }
      const r = deck.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight || e.target.tagName === 'INPUT') return;
      if (e.key === ' ') { e.preventDefault(); f.classList.toggle('flip'); }
      if (e.key === 'ArrowRight') $('[data-n]', deck).click();
      if (e.key === 'ArrowLeft') $('[data-p]', deck).click();
    };
    document.addEventListener('keydown', onKey);
    show();
  };
})();
