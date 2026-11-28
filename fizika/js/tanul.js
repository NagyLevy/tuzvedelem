/* Tanulómotor: ismétlős kártyák (Leitner-dobozok) és a leckék adataiból generált kvízkérdések.
   Minden kérdés a FIZ_LECKEK / FIZ_PUSKA meglévő mezőiből áll össze, új fizikai tartalom nincs benne.
   Kártya-azonosító: "<lecke-id>|<képlet neve>". Állapot: { b: doboz 0–4, t: utolsó válasz ideje, n: hányszor láttad }. */
(function () {
  'use strict';
  const LECKEK = window.FIZ_LECKEK || [];
  const TEMAK = window.FIZ_TEMAK || [];
  const PUSKA = window.FIZ_PUSKA || [];
  const KEY = 'fiz.tanul.v1';
  const PERC = 60 * 1000, ORA = 60 * PERC;
  /* Mennyi idő múlva jön újra egy kártya az adott dobozból */
  const VAR = [0, 10 * PERC, 4 * ORA, 24 * ORA, 72 * ORA];
  const MEGY = 2; /* ettől a doboztól számít tudottnak */

  let S = { k: {}, zh: [] };
  try { S = Object.assign(S, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} };

  const kartyak = [];
  TEMAK.forEach((t) => {
    const l = LECKEK.find((x) => x.id === t.id);
    if (!l) return;
    l.kepletek.forEach((k) => kartyak.push({ id: t.id + '|' + k.nev, lecke: t.id, k }));
  });
  const byId = {}; kartyak.forEach((c) => (byId[c.id] = c));

  const T = {};
  T.kartyak = (lecke) => (lecke ? kartyak.filter((c) => c.lecke === lecke) : kartyak.slice());
  T.kartya = (id) => byId[id];
  T.allapot = (id) => S.k[id] || null;
  T.doboz = (id) => (S.k[id] ? S.k[id].b : -1);
  T.megy = (id) => !!S.k[id] && S.k[id].b >= MEGY;
  T.esedekes = (id, now = Date.now()) => { const a = S.k[id]; return !!a && now - a.t >= VAR[a.b]; };

  /* jegy: 0 = nem tudtam, 1 = majdnem, 2 = tudtam */
  T.ertekel = (id, jegy) => {
    const a = S.k[id] || { b: -1, t: 0, n: 0 };
    if (jegy === 0) a.b = 0;
    else if (jegy === 1) a.b = Math.max(1, Math.min(a.b, 2));
    else a.b = a.b < 0 ? MEGY : Math.min(4, a.b + 1);
    a.t = Date.now(); a.n++;
    S.k[id] = a; save();
  };

  T.stat = (lecke) => {
    const cs = T.kartyak(lecke);
    const megy = cs.filter((c) => T.megy(c.id)).length;
    const latott = cs.filter((c) => S.k[c.id]).length;
    return { ossz: cs.length, megy, latott, pct: cs.length ? Math.round((megy / cs.length) * 100) : 0 };
  };

  /* Egy tanulókör kártyái. mit: 'ma' (esedékes + új, legfeljebb n), 'gyenge', vagy egy lecke-id. */
  T.adag = (mit, n = 20) => {
    const now = Date.now();
    const fejbenElol = (a, b) => (a.k.puska === b.k.puska ? 0 : a.k.puska ? 1 : -1);
    if (mit === 'ma') {
      const due = kartyak.filter((c) => T.esedekes(c.id, now)).sort((a, b) => S.k[a.id].b - S.k[b.id].b || S.k[a.id].t - S.k[b.id].t);
      const uj = kartyak.filter((c) => !S.k[c.id]).sort(fejbenElol);
      return due.concat(uj).slice(0, n);
    }
    if (mit === 'gyenge') return kartyak.filter((c) => S.k[c.id] && S.k[c.id].b < MEGY).sort((a, b) => S.k[a.id].b - S.k[b.id].b);
    const cs = T.kartyak(mit);
    /* leckén belül: ami nem megy, az elöl; a többi a végén ismétlésnek */
    return cs.filter((c) => !T.megy(c.id)).concat(cs.filter((c) => T.megy(c.id)));
  };
  T.maDb = () => T.adag('ma', 20).length;

  /* ——— Kvíz ——— */
  const kever = (a) => { const r = a.slice(); for (let i = r.length - 1; i > 0; i--) { const j = (Math.random() * (i + 1)) | 0; [r[i], r[j]] = [r[j], r[i]]; } return r; };
  const valaszt = (lista, db, kiveve) => kever(lista.filter((x) => !kiveve(x))).slice(0, db);

  /* Elterelők: először ugyanabból a leckéből, ha kevés, a többiből */
  function elterelok(c, mezo) {
    const mas = (x) => x.id !== c.id && x.k[mezo] !== c.k[mezo];
    let e = valaszt(kartyak.filter((x) => x.lecke === c.lecke), 3, (x) => !mas(x));
    if (e.length < 3) e = e.concat(valaszt(kartyak.filter((x) => x.lecke !== c.lecke), 3 - e.length, (x) => !mas(x) || e.some((y) => y.k[mezo] === x.k[mezo])));
    return e;
  }
  const opciok = (jo, rosszak) => { const o = kever([{ ...jo, jo: true }].concat(rosszak.map((r) => ({ ...r, jo: false })))); return o; };

  const TIPUS = {
    /* név → képlet */
    keplet: (c) => ({ tipus: 'keplet', kartya: c.id, kerdes: 'Melyik képlet ez?', targy: { szoveg: c.k.nev },
      opciok: opciok({ tex: c.k.tex }, elterelok(c, 'tex').map((x) => ({ tex: x.k.tex }))) }),
    /* képlet → név */
    nev: (c) => ({ tipus: 'nev', kartya: c.id, kerdes: 'Mi ennek a képletnek a neve?', targy: { tex: c.k.tex },
      opciok: opciok({ szoveg: c.k.nev }, elterelok(c, 'nev').map((x) => ({ szoveg: x.k.nev }))) }),
    /* rajta van-e a segédleten */
    puska: (c) => ({ tipus: 'puska', kartya: c.id, kerdes: 'Rajta van ez a puskán?', targy: { szoveg: c.k.nev, tex: c.k.tex },
      opciok: [{ szoveg: 'Igen, a puskán ott lesz', jo: c.k.puska }, { szoveg: 'Nem, fejből kell tudni', jo: !c.k.puska }] })
  };

  /* A puska egy jelének jelentése. Csak olyan képletből, ami egy leckéhez tartozik. */
  function jelKerdes(lecke) {
    const jok = PUSKA.filter((p) => p.lecke && (!lecke || p.lecke === lecke) && p.jelek && p.jelek.length);
    if (!jok.length) return null;
    const p = jok[(Math.random() * jok.length) | 0];
    const j = p.jelek[(Math.random() * p.jelek.length) | 0];
    const mind = [];
    PUSKA.forEach((x) => (x.jelek || []).forEach((y) => { if (y.d !== j.d && y.s !== j.s && !mind.some((m) => m.d === y.d)) mind.push({ d: y.d, kozel: x.sz === p.sz }); }));
    const kozel = kever(mind.filter((m) => m.kozel)), tavol = kever(mind.filter((m) => !m.kozel));
    const rossz = kozel.concat(tavol).slice(0, 3);
    if (rossz.length < 3) return null;
    const kartya = byId[p.lecke + '|' + p.nev] ? p.lecke + '|' + p.nev : null;
    return { tipus: 'jel', kartya, lecke: p.lecke, kerdes: 'Mit jelent ebben a képletben ez a jel?', targy: { szoveg: p.nev, tex: p.tex, jel: j.s },
      opciok: opciok({ szoveg: j.d }, rossz.map((r) => ({ szoveg: r.d }))), magyarazat: p.jelek };
  }

  function egyKerdes(c) {
    const r = Math.random();
    if (r < 0.2) { const q = jelKerdes(c.lecke); if (q) return q; }
    const t = r < 0.55 ? 'keplet' : r < 0.85 ? 'nev' : 'puska';
    return TIPUS[t](c);
  }

  /* mit: lecke-id, 'mix' (minden fejezet), vagy 'zh' (fejezetenként egy kérdés, összesen 10) */
  T.kviz = (mit, n = 10) => {
    if (mit === 'zh') return kever(TEMAK.map((t) => { const cs = T.kartyak(t.id); return cs.length ? egyKerdes(cs[(Math.random() * cs.length) | 0]) : null; }).filter(Boolean));
    const cs = mit === 'mix' ? kartyak : T.kartyak(mit);
    /* ami még nem megy, abból kérdezünk előbb */
    const sor = kever(cs.filter((c) => !T.megy(c.id))).concat(kever(cs.filter((c) => T.megy(c.id)))).slice(0, n);
    return kever(sor.map(egyKerdes));
  };
  T.kvizValasz = (q, jo) => { if (q.kartya) T.ertekel(q.kartya, jo ? 2 : 0); };

  T.zhMent = (pont, ossz) => { S.zh.push({ p: pont, o: ossz, t: Date.now() }); S.zh = S.zh.slice(-20); save(); };
  T.zh = () => S.zh.slice();
  T.torol = () => { S = { k: {}, zh: [] }; save(); };

  window.FIZ_TANUL = T;
})();
