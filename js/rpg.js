/* DUNGEON (tycoon/RPG): Rapid-kérdések = trash (arany + XP), bossok (XP + loot), armory, bolt, enchant, Kuti-raid.
   A tárgyikonok saját SVG-rajzok (nem Blizzard-grafika). */
(function () {
  'use strict';
  const TM = window.TM;
  const { h, $, $$ } = TM;
  const KEY = 'tm-rpg-v1', HKEY = 'tm-rapid-v1';
  const load = (k) => { try { return JSON.parse(localStorage.getItem(k)) || {}; } catch (e) { return {}; } };
  const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* */ } };
  const rnd = (a) => a[(Math.random() * a.length) | 0];
  const fmt = (n) => Math.floor(n).toLocaleString('hu-HU');
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* ---------- Világ ---------- */
  const ALL = ['egeselmelet', 'eges-tuzoltas', 'egestermekek', 'viz', 'oltogaz-oltopor', 'habok', 'kemiai-biztonsag', 'munkavedelem-alapjai', 'munkavedelem-gyakorlat', 'kotelezettsegek'];
  const DUNGEONS = [
    { id: 'd1', name: 'Lángok Barlangja', min: 1, icon: '🔥', pre: 'Parázs', topics: ['egeselmelet', 'eges-tuzoltas'], hue: 18,
      bosses: [{ n: 'Hőforrás-elementál', hp: 280, t: ['egeselmelet'], e: '🔥' }, { n: 'Lobbanáspont-ikrek', hp: 360, t: ['egeselmelet'], e: '👯' }, { n: 'A Tűzháromszög', hp: 460, t: ['egeselmelet', 'eges-tuzoltas'], e: '🔺' }] },
    { id: 'd2', name: 'Füstös Kazamaták', min: 10, icon: '🌫️', pre: 'Füstjáró', topics: ['egestermekek', 'viz'], hue: 260,
      bosses: [{ n: 'Füstdémon', hp: 550, t: ['egestermekek'], e: '👹' }, { n: 'Foszgén-szellem', hp: 650, t: ['egestermekek'], e: '👻' }, { n: 'Gőzkolosszus', hp: 800, t: ['viz'], e: '🌊' }] },
    { id: 'd3', name: 'Oltóanyag-labor', min: 20, icon: '🧪', pre: 'Habpáncélos', topics: ['oltogaz-oltopor', 'habok'], hue: 190,
      bosses: [{ n: 'Halon Lich', hp: 900, t: ['oltogaz-oltopor'], e: '💀' }, { n: 'Porvihar', hp: 1050, t: ['oltogaz-oltopor'], e: '🌪️' }, { n: 'Habóriás', hp: 1250, t: ['habok'], e: '🫧' }] },
    { id: 'd4', name: 'Vegyszerraktár', min: 30, icon: '☣️', pre: 'Vegyész', topics: ['kemiai-biztonsag'], hue: 95,
      bosses: [{ n: 'CLP-golem', hp: 1300, t: ['kemiai-biztonsag'], e: '🗿' }, { n: 'REACH-hidra', hp: 1500, t: ['kemiai-biztonsag'], e: '🐉' }, { n: 'A Kockázat Ura', hp: 1750, t: ['kemiai-biztonsag'], e: '⚖️' }] },
    { id: 'd5', name: 'Paragrafus-citadella', min: 40, icon: '🏛️', pre: 'Paragrafus', topics: ['munkavedelem-alapjai', 'munkavedelem-gyakorlat', 'kotelezettsegek'], hue: 45,
      bosses: [{ n: 'Munkabaleset-lovag', hp: 1800, t: ['munkavedelem-gyakorlat'], e: '🛡️' }, { n: 'Az Mvt.-bíró', hp: 2100, t: ['munkavedelem-alapjai'], e: '👨‍⚖️' }, { n: 'Kötelezettség-titán', hp: 2500, t: ['kotelezettsegek', 'munkavedelem-alapjai'], e: '🗽' }] },
    { id: 'raid', name: 'RAID: A ZH-terem', min: 50, icon: '🎓', pre: 'Vizsgáztató', topics: ALL, hue: 0, raid: true,
      bosses: [{ n: 'Dr. habil. Kuti Rajmund — a Végső Vizsgáztató', hp: 5500, t: ALL, e: '🎓', final: true }] }
  ];
  const tierOf = (d) => DUNGEONS.indexOf(d) + 1;

  /* ---------- Gyors XP-görbe: 50. szint ≈ 2–2,5 óra darálás ---------- */
  const need = (L) => 60 + 12 * L;
  const levelInfo = (xp) => { let L = 1, rest = xp; while (L < 60 && rest >= need(L)) { rest -= need(L); L++; } return { L, rest, need: need(L) }; };

  /* ---------- Tárgyak ---------- */
  const RAR = [
    { n: 'Silány', c: '#9d9d9d', m: 0.6 }, { n: 'Jó', c: '#1eff00', m: 1 }, { n: 'Ritka', c: '#0070dd', m: 1.4 },
    { n: 'Epikus', c: '#a335ee', m: 1.9 }, { n: 'Legendás', c: '#ff8000', m: 2.6 }
  ];
  const SLOTS = { head: 'Fej', shoulder: 'Váll', chest: 'Mellkas', hands: 'Kéz', waist: 'Derék', feet: 'Láb', weapon: 'Fegyver', neck: 'Nyak', ring1: 'Gyűrű', ring2: 'Gyűrű', trinket: 'Trinket' };
  const BASE = { head: ['Sisak', 'Tűzoltósisak', 'Kobak'], shoulder: ['Vállvért', 'Vállpáncél'], chest: ['Mellvért', 'Védőkabát', 'Páncélzubbony'], hands: ['Kesztyű', 'Lángkesztyű'], waist: ['Öv', 'Mentőöv'], feet: ['Csizma', 'Bakancs'], weapon: ['Tűzoltóbalta', 'Csákány', 'Lángpallos', 'Vízágyú'], neck: ['Nyaklánc', 'Medál'], ring: ['Gyűrű', 'Pecsétgyűrű'], trinket: ['Talizmán', 'Oltókészülék-amulett', 'Homokóra'] };
  const SUF = { dmg: 'az Oltásé', gold: 'a Kincstárnoké', crit: 'a Lángvágásé', time: 'a Türelemé', lives: 'a Túlélőé', shield: 'a 14%-é' };
  const STATN = { dmg: 'Sebzés', gold: 'Arany', crit: 'Kritikus esély', time: 'Idő kérdésenként', lives: 'Élet a bossnál', shield: 'Sorozatpajzs' };
  const statTxt = (k, v) => k === 'dmg' ? `+${Math.round(v)} Sebzés` : k === 'lives' ? `+${v} Élet a bossnál` : k === 'time' ? `+${v} mp kérdésenként` : `+${Math.round(v)}% ${STATN[k]}`;
  const FLAVOR = ['„Aki 14% alá megy, az már nem ég.”', '„A lobbanás csak egy pillanat. A gyulladás örök.”', '„1750 liter gőz. Egyetlen liter vízből.”', '„Hőforrás minden, ahonnan hő szabadul fel. Minden.”', '„Hk húsz alatt: nehéz. Mint ez a páncél.”', '„A kockázat: valószínűség és súlyosság.”', '„Szervezett munkavégzés során vagy azzal összefüggésben.”', '„Az inert gáz nem gátol kémiailag. Ne feledd.”', '„Megszüntetése szervezett tűzoltással lehetséges.”', '„Veszély! — nem Figyelem!”'];

  function makeItem(S, tier, rarity, slot) {
    slot = slot || rnd(['head', 'shoulder', 'chest', 'hands', 'waist', 'feet', 'weapon', 'neck', 'ring', 'trinket']);
    const r = RAR[rarity], ilvl = tier * 10 + rarity * 2 + ((Math.random() * 4) | 0);
    const st = {}, k = r.m * (0.85 + Math.random() * 0.3);
    const P = (stat, v) => { st[stat] = (st[stat] || 0) + v; };
    if (slot === 'weapon') P('dmg', 3 + ilvl * 0.35 * k);
    if (slot === 'shoulder' || slot === 'hands') { P('dmg', 1 + ilvl * 0.08 * k); P('crit', 2 + ilvl * 0.08 * k); }
    if (slot === 'head' || slot === 'chest') { P('gold', 3 + ilvl * 0.15 * k); if (rarity >= 2) P('lives', rarity >= 4 ? 2 : 1); }
    if (slot === 'waist') P('gold', 4 + ilvl * 0.25 * k);
    if (slot === 'feet') P('time', Math.max(1, Math.round(rarity + ilvl / 25)));
    if (slot === 'neck' || slot === 'ring') { P('gold', 3 + ilvl * 0.18 * k); P('crit', 1 + ilvl * 0.06 * k); }
    if (slot === 'trinket') P('shield', 5 + rarity * 6 + ilvl * 0.1);
    Object.keys(st).forEach((x) => { if (x !== 'lives' && x !== 'time') st[x] = Math.round(st[x]); });
    const top = Object.keys(st).sort((a, b) => st[b] - st[a])[0];
    const d = DUNGEONS[tier - 1];
    const name = `${d.pre} ${rnd(BASE[slot])}${rarity >= 2 ? ' ' + SUF[top] : ''}`;
    return { id: ++S.nid, slot, name, rarity, ilvl, st, ench: [], price: Math.round(Math.pow(ilvl, 1.7) * (1 + rarity * 0.9) * 4), flavor: rarity >= 3 ? rnd(FLAVOR) : '' };
  }
  /* Ritkaság dungeon szerint: eleinte csak gyakori, később ritka/epikus/legendás. src: 'trash' | 'boss' | 'shop' */
  function rollRarity(tier, src) {
    const x = Math.random() * 100;
    const T = {
      trash: [[0, 60, 40], [0, 40, 55, 5], [0, 20, 65, 15], [0, 5, 65, 28, 2], [0, 0, 60, 35, 5], [0, 0, 40, 50, 10]],
      boss: [[0, 0, 100], [0, 0, 80, 20], [0, 0, 50, 42, 8], [0, 0, 30, 55, 13, 2], [0, 0, 0, 50, 42, 8], [0, 0, 0, 0, 70, 30]],
      shop: [[0, 0, 100], [0, 0, 80, 20], [0, 0, 60, 40], [0, 0, 45, 55], [0, 0, 30, 70], [0, 0, 30, 70]]
    }[src][tier - 1];
    // T[i] = esély (%) az i-1. ritkaságra (index 0 nem használt)
    let acc = 0; for (let i = 1; i < T.length; i++) { acc += T[i]; if (x < acc) return i - 1; }
    return T.length - 2;
  }
  const itemStats = (it) => { const t = Object.assign({}, it.st); (it.ench || []).forEach((e) => { t[e.k] = (t[e.k] || 0) + e.v; }); return t; };

  /* ---------- Saját, WoW-hangulatú SVG-ikonok ---------- */
  const SHAPE = {
    head: '<path d="M13 38 Q13 13 32 11 Q51 13 51 38 L51 46 L43 46 L43 37 L21 37 L21 46 L13 46 Z"/><path d="M24 26 L40 26 L38 31 L26 31 Z" fill="#000" opacity=".55"/><path d="M31 6 L33 6 L34 14 L30 14 Z"/>',
    shoulder: '<path d="M6 42 Q8 18 30 20 L30 46 Z"/><path d="M58 42 Q56 18 34 20 L34 46 Z"/><circle cx="18" cy="30" r="3" fill="#fff" opacity=".5"/><circle cx="46" cy="30" r="3" fill="#fff" opacity=".5"/>',
    chest: '<path d="M16 14 L26 10 Q32 17 38 10 L48 14 L53 31 L46 33 L46 55 L18 55 L18 33 L11 31 Z"/><path d="M32 18 L32 52" stroke="#000" stroke-width="2" opacity=".4"/>',
    hands: '<path d="M22 55 L22 31 L19 19 Q21 14 25 18 L27 29 L28 12 Q31 8 34 12 L34 28 L36 12 Q39 9 41 13 L40 29 L43 19 Q47 17 47 21 L44 37 Q44 49 40 55 Z"/>',
    waist: '<path d="M6 25 L58 25 L58 39 L6 39 Z"/><rect x="25" y="22" width="14" height="20" rx="2" fill="none" stroke="#fff" stroke-width="3" opacity=".7"/>',
    feet: '<path d="M20 9 L37 9 L37 39 L55 45 L55 55 L17 55 Z"/><path d="M17 49 L55 49" stroke="#000" stroke-width="2" opacity=".4"/>',
    weapon: '<path d="M29 7 L34 7 L34 58 L29 58 Z"/><path d="M34 11 Q55 13 54 33 Q45 27 34 29 Z"/><path d="M29 11 Q15 15 14 26 Q21 23 29 24 Z" opacity=".8"/>',
    neck: '<path d="M14 10 Q32 40 50 10" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="32" cy="40" r="11"/><circle cx="29" cy="37" r="3.5" fill="#fff" opacity=".6"/>',
    ring: '<circle cx="32" cy="38" r="15" fill="none" stroke="currentColor" stroke-width="7"/><path d="M24 22 L32 10 L40 22 Z"/><circle cx="31" cy="17" r="2.5" fill="#fff" opacity=".7"/>',
    trinket: '<circle cx="32" cy="34" r="19"/><path d="M32 18 Q40 28 36 36 Q42 34 41 28 Q48 38 40 46 Q32 52 25 45 Q19 38 26 30 Q26 36 30 37 Q26 28 32 18 Z" fill="#fff" opacity=".55"/>'
  };
  const shapeOf = (slot) => (slot === 'ring1' || slot === 'ring2') ? 'ring' : slot;
  function icon(it, size = 54) {
    const r = RAR[it.rarity], id = 'g' + it.id + '_' + size;
    return `<span class="ic r${it.rarity}" style="--rc:${r.c};width:${size}px;height:${size}px"><svg viewBox="0 0 64 64" style="color:${r.c}">
      <defs><radialGradient id="${id}b" cx="35%" cy="30%" r="80%"><stop offset="0" stop-color="#3b3b44"/><stop offset="1" stop-color="#0c0c10"/></radialGradient>
      <linearGradient id="${id}m" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff"/><stop offset=".35" stop-color="${r.c}"/><stop offset="1" stop-color="#1a1a1a"/></linearGradient></defs>
      <rect width="64" height="64" fill="url(#${id}b)"/><g fill="url(#${id}m)" stroke="#000" stroke-width="1.2" stroke-linejoin="round">${SHAPE[shapeOf(it.slot)]}</g>
      <rect x="1.5" y="1.5" width="61" height="61" fill="none" stroke="#000" stroke-width="3"/><rect x="3.5" y="3.5" width="57" height="57" fill="none" stroke="${r.c}" stroke-width="1.6" opacity=".9"/></svg></span>`;
  }
  const emptyIcon = (slot, size = 54) => `<span class="ic empty" style="width:${size}px;height:${size}px"><svg viewBox="0 0 64 64"><rect width="64" height="64" fill="#101014"/><g fill="#2a2a32">${SHAPE[shapeOf(slot)]}</g><rect x="1.5" y="1.5" width="61" height="61" fill="none" stroke="#000" stroke-width="3"/></svg></span>`;
  function tooltip(it, extra = '') {
    const r = RAR[it.rarity], st = itemStats(it);
    return `<div class="tt-name" style="color:${r.c}">${esc(it.name)}</div><div class="tt-ilvl">Tárgyszint ${it.ilvl}</div>
      <div class="tt-row"><span>${SLOTS[it.slot === 'ring' ? 'ring1' : it.slot] || ''}</span><span>${r.n}</span></div>
      ${Object.keys(it.st).map((k) => `<div class="tt-stat">${statTxt(k, it.st[k])}</div>`).join('')}
      ${(it.ench || []).map((e) => `<div class="tt-ench">Enchant: ${statTxt(e.k, e.v)}</div>`).join('')}
      ${it.flavor ? `<div class="tt-flavor">${esc(it.flavor)}</div>` : ''}
      <div class="tt-sell">Eladási ár: <span class="gold">${fmt(it.price / 4)}</span></div>${extra}`;
  }

  /* ---------- Kasztok: képességek szintenként ---------- */
  const CLASSES = {
    warrior: {
      n: 'Harcos', e: '⚔️', desc: 'Karddal aprítja a bosst. Több élet, nagy sebzés, közelharc.',
      spells: [
        { lv: 1, id: 'tough', n: 'Edzett test', ic: '💪', type: 'passive', d: '+1 élet a bossnál.' },
        { lv: 3, id: 'smash', n: 'Pusztító csapás', ic: '💥', type: 'active', cd: 8, d: 'A következő találat ×3 sebzést üt. Újratöltés: 8 kérdés.' },
        { lv: 8, id: 'execute', n: 'Kivégzés', ic: '🪓', type: 'passive', d: '+50% sebzés, ha a boss 30% HP alatt van.' },
        { lv: 15, id: 'wall', n: 'Pajzsfal', ic: '🛡️', type: 'active', cd: 12, d: 'A következő 2 hiba nem visz életet. Újratöltés: 12 kérdés.' },
        { lv: 25, id: 'rage', n: 'Harci mámor', ic: '🔥', type: 'passive', d: 'Minden 5. találat zsinórban visszaad 1 életet.' },
        { lv: 35, id: 'storm', n: 'Pengevihar', ic: '🌪️', type: 'active', cd: 15, d: '5 találatig dupla sebzés. Újratöltés: 15 kérdés.' },
        { lv: 45, id: 'champ', n: 'Bajnok', ic: '👑', type: 'passive', d: '+20% sebzés mindig.' }
      ]
    },
    mage: {
      n: 'Mágus', e: '🧯', desc: 'Poroltóval és varázslattal olt. Több idő, több krit, több arany.',
      spells: [
        { lv: 1, id: 'calm', n: 'Hidegvér', ic: '🧊', type: 'passive', d: '+3 mp minden kérdésnél.' },
        { lv: 3, id: 'blast', n: 'CO₂-löket', ic: '💨', type: 'active', cd: 8, d: 'A következő találat ×3 sebzést üt. Újratöltés: 8 kérdés.' },
        { lv: 8, id: 'focus', n: 'Fókusz', ic: '🎯', type: 'passive', d: '+10% kritikus esély.' },
        { lv: 15, id: 'slow', n: 'Időlassítás', ic: '⏳', type: 'active', cd: 12, d: '3 kérdésig nincs időkorlát. Újratöltés: 12 kérdés.' },
        { lv: 25, id: 'alch', n: 'Arany-alkímia', ic: '⚗️', type: 'passive', d: '+25% arany a trashből.' },
        { lv: 35, id: 'mist', n: 'Vízköd-vihar', ic: '🌫️', type: 'active', cd: 15, d: '5 találatig dupla sebzés. Újratöltés: 15 kérdés.' },
        { lv: 45, id: 'arch', n: 'Főmágus', ic: '🔮', type: 'passive', d: 'A kritikus találat ×3 sebzést üt (×2 helyett).' }
      ]
    }
  };
  /* WoW-stílusú képesség-tooltip */
  const spellTip = (sp, lvNow) => `<div class="tt-name" style="color:#ffd100">${sp.ic} ${sp.n}</div>
    <div class="tt-row"><span>${sp.type === 'active' ? 'Aktív képesség' : 'Passzív képesség'}</span><span>${sp.type === 'active' ? 'Újratöltés: ' + sp.cd + ' kérdés' : ''}</span></div>
    <div class="tt-stat" style="color:#fff">${sp.d}</div>
    <div class="tt-ilvl" style="color:${lvNow >= sp.lv ? '#1eff00' : '#ff4040'}">${lvNow >= sp.lv ? '✔ Elérhető' : 'Szükséges szint: ' + sp.lv}</div>
    ${sp.type === 'active' ? '<div class="tt-hint">Harc közben: Q / W / E gomb, vagy kattints az ikonra.</div>' : '<div class="tt-hint">Mindig hat, nem kell aktiválni.</div>'}`;
  /* Pálcikaember: harcos karddal, mágus poroltóval. */
  function stickman(cls) {
    const warrior = cls === 'warrior';
    return `<svg class="stick" viewBox="0 0 130 170" aria-hidden="true"><g stroke="#ffe2a8" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <circle cx="50" cy="32" r="13" fill="#0e0c0a"/>
      ${warrior ? '<path d="M37 26 L63 26" stroke="#e5251b" stroke-width="4"/>' : '<path d="M34 24 L50 -2 L66 24 Z" fill="#5b3bd9" stroke="#8e6bff"/><circle cx="50" cy="-2" r="3" fill="#ffd36b" stroke="none"/>'}
      <path d="M50 45 L50 100"/><path class="st-legl" d="M50 100 L34 150"/><path class="st-legr" d="M50 100 L68 150"/>
      <path d="M50 60 L30 84"/>
      <g class="st-arm">${warrior
        ? '<path d="M50 60 L76 70"/><path d="M76 70 L118 30" stroke="#dfe8ff" stroke-width="6"/><path d="M69 63 L83 77" stroke="#ffd36b" stroke-width="5"/>'
        : '<path d="M50 60 L72 70"/><rect x="66" y="62" width="15" height="34" rx="6" fill="#e5251b" stroke="#ff7a6a" stroke-width="2"/><path d="M73 62 L73 56 L90 52" stroke="#222" stroke-width="4"/><path d="M90 52 L98 48" stroke="#555" stroke-width="5"/>'}</g>
    </g></svg>`;
  }

  /* ---------- Fő nézet ---------- */
  TM.rpg = function (app) {
    const ITEMS = TM.rapidItems();
    const S = Object.assign({ gold: 0, xp: 0, gear: {}, inv: [], kills: {}, zh: false, nid: 0, shop: null, lastBoss: null }, load(KEY));
    const H = Object.assign({ hard: {} }, load(HKEY));
    // v2 egyensúly: a régi (túl erős) tárgyak sebzését visszaskálázzuk
    if (!S.v2) {
      const fix = (it) => { if (!it) return; if (it.st.dmg) it.st.dmg = Math.max(1, Math.round(it.st.dmg * 0.4)); (it.ench || []).forEach((e) => { if (e.k === 'dmg') e.v = Math.max(1, Math.round(e.v * 0.3)); }); it.price = Math.round(Math.pow(it.ilvl, 1.7) * (1 + it.rarity * 0.9) * 4); };
      Object.values(S.gear).forEach(fix); S.inv.forEach(fix); S.shop = null; S.kills = {}; S.v2 = true; save(KEY, S);
      setTimeout(() => TM.toast('⚖️ Új egyensúly: erősebb bossok, több arany a trashből'), 600);
    }
    let view, cleanupRun = null, tab = 'map', alive = true;
    const persist = () => save(KEY, S);
    const stats = () => {
      const t = { dmg: 10, gold: 0, crit: 3, time: 10, lives: 3, shield: 0 };
      Object.values(S.gear).forEach((it) => { if (!it) return; const s = itemStats(it); Object.keys(s).forEach((k) => { t[k] += s[k]; }); });
      if (has('tough')) t.lives += 1; if (has('calm')) t.time += 3; if (has('focus')) t.crit += 10;
      t.crit = Math.min(60, t.crit); t.shield = Math.min(50, t.shield);
      return t;
    };
    const lvl = () => levelInfo(S.xp).L;
    const has = (id) => !!S.cls && CLASSES[S.cls].spells.some((sp) => sp.id === id && lvl() >= sp.lv);
    const activeSpells = () => S.cls ? CLASSES[S.cls].spells.filter((sp) => sp.type === 'active' && lvl() >= sp.lv) : [];
    const goldMult = () => (1 + 0.1 * (lvl() - 1)) * (1 + stats().gold / 100);
    const unlocked = (d) => S.zh || lvl() >= d.min;

    view = h(`<div class="rpg">
      <div class="rpg-hud">
        <div class="rpg-lvl"><b data-o="lvl">1</b><small>szint</small></div>
        <div class="rpg-xp"><div class="rpg-xpbar"><i data-o="xpbar"></i></div><small data-o="xptxt"></small></div>
        <div class="rpg-gold"><span class="coin"></span><b data-o="gold">0</b><small data-o="mult">×1,0</small></div>
        <div class="seg rpg-tabs"><button data-tab="map" class="on">🗺️ Térkép</button><button data-tab="armory">🛡️ Armory</button><button data-tab="shop">💰 Bolt</button></div>
      </div>
      <div class="rpg-body" data-body></div>
      <div class="rpg-tt" data-tt></div>
    </div>`);
    app.replaceChildren(view);
    const body = $('[data-body]', view);

    function hud() {
      const li = levelInfo(S.xp);
      $('[data-o="lvl"]', view).textContent = li.L;
      $('[data-o="xpbar"]', view).style.width = li.L >= 60 ? '100%' : (li.rest / li.need) * 100 + '%';
      $('[data-o="xptxt"]', view).textContent = li.L >= 60 ? 'Maximális szint' : `${fmt(li.rest)} / ${fmt(li.need)} XP`;
      $('[data-o="gold"]', view).textContent = fmt(S.gold);
      $('[data-o="mult"]', view).textContent = '×' + goldMult().toFixed(1).replace('.', ',') + ' arany';
    }
    function addXP(x) {
      const before = lvl(); S.xp += x; const after = lvl();
      if (after > before) {
        banner(`LEVEL ${after}!`, `Arany-szorzó: ×${goldMult().toFixed(1).replace('.', ',')}`, 'lvl');
        const opened = DUNGEONS.find((d) => d.min > before && d.min <= after);
        if (opened && !S.zh) setTimeout(() => banner('ÚJ DUNGEON!', opened.icon + ' ' + opened.name, 'lvl'), 1500);
      }
    }
    function banner(big, small, k) {
      const b = h(`<div class="g-banner ${k === 'lvl' ? 'lvl' : ''}"><b>${big}</b><span>${small}</span></div>`);
      document.body.appendChild(b); setTimeout(() => b.remove(), 1900);
      if (k === 'lvl') TM.sparks(innerWidth / 2, innerHeight / 2, 120);
    }

    /* tooltip */
    const tt = $('[data-tt]', view);
    view.addEventListener('mousemove', (e) => {
      const sel = e.target.closest('[data-spell]');
      const el = sel || e.target.closest('[data-item]');
      if (!el) { tt.style.display = 'none'; return; }
      if (sel) {
        const [ck, sid] = sel.dataset.spell.split(':'); const sp = CLASSES[ck].spells.find((x) => x.id === sid);
        tt.innerHTML = spellTip(sp, ck === S.cls ? lvl() : -1);
      } else {
        const it = findItem(+el.dataset.item); if (!it) return;
        tt.innerHTML = tooltip(it, el.dataset.hint ? `<div class="tt-hint">${el.dataset.hint}</div>` : '');
      }
      tt.style.display = 'block';
      const x = Math.min(e.clientX + 18, innerWidth - tt.offsetWidth - 10), y = Math.min(e.clientY + 18, innerHeight - tt.offsetHeight - 10);
      tt.style.left = x + 'px'; tt.style.top = y + 'px';
    });
    const findItem = (id) => S.inv.find((i) => i.id === id) || Object.values(S.gear).find((i) => i && i.id === id) || (S.shop && S.shop.items.find((i) => i.id === id)) || (S.lastLoot && S.lastLoot.id === id ? S.lastLoot : null);

    /* ---------- Térkép ---------- */
    function renderClassSelect() {
      body.innerHTML = `<div class="cls-pick"><h2>Válassz kasztot</h2><p class="muted">Később az Armoryban válthatsz. A képességek szintenként nyílnak.</p>
        <div class="cls-grid">${Object.keys(CLASSES).map((k) => { const c = CLASSES[k]; return `<button class="cls-card ${k}" data-cls="${k}">
          <div class="hero ${k} idle">${stickman(k)}</div><h3>${c.e} ${c.n}</h3><p>${c.desc}</p>
          <ul>${c.spells.map((sp) => `<li data-spell="${k}:${sp.id}"><div><span>${sp.ic}</span><b>${sp.lv}. szint</b> ${sp.n} <small>(${sp.type === 'active' ? 'aktív' : 'passzív'})</small></div><p>${sp.d}</p></li>`).join('')}</ul>
          <span class="btn btn-fire">Ezt választom</span></button>`; }).join('')}</div></div>`;
      $$('[data-cls]', body).forEach((b) => b.onclick = () => { S.cls = b.dataset.cls; persist(); TM.toast(`${CLASSES[S.cls].e} ${CLASSES[S.cls].n} lettél!`); show('map'); });
    }
    function renderMap() {
      if (!S.cls) return renderClassSelect();
      body.innerHTML = `<div class="rpg-map">
        <label class="rpg-zh"><input type="checkbox" data-zh ${S.zh ? 'checked' : ''}> <b>ZH-mód</b> — minden dungeon nyitva (szinttől függetlenül)</label>
        ${DUNGEONS.map((d) => {
          const open = unlocked(d), k = d.bosses.filter((b, i) => S.kills[d.id + i]).length;
          return `<div class="dg ${open ? '' : 'locked'} ${d.raid ? 'raid' : ''}" style="--h:${d.hue}">
            <div class="dg-head"><span class="dg-ic">${d.icon}</span><div><b>${d.name}</b><small>${d.raid ? 'Raid' : 'Dungeon'} · ${d.min}${d.raid ? '+' : '–' + (d.min === 1 ? 10 : d.min + 10)}. szint · ${d.topics.length === ALL.length ? 'minden téma' : d.topics.map((t) => TM.plan.find((p) => p.id === t).title).join(', ')}</small></div><span class="dg-prog">${k}/${d.bosses.length}</span></div>
            ${open ? `<div class="dg-act">${d.raid ? '' : `<button class="btn btn-ghost" data-trash="${d.id}">⚔️ Trash farm (arany + XP)</button>`}
              ${d.bosses.map((b, i) => `<button class="boss-btn ${S.kills[d.id + i] ? 'dead' : ''}" data-boss="${d.id}:${i}"><span>${b.e}</span><b>${b.n}</b><small>${fmt(b.hp)} HP${S.kills[d.id + i] ? ' · ✔ legyőzve' : ''}</small></button>`).join('')}</div>`
              : `<div class="dg-lock">🔒 ${d.min}. szinttől</div>`}
          </div>`;
        }).join('')}</div>`;
      $('[data-zh]', body).onchange = (e) => { S.zh = e.target.checked; persist(); renderMap(); };
      $$('[data-trash]', body).forEach((b) => b.onclick = () => runTrash(DUNGEONS.find((d) => d.id === b.dataset.trash)));
      $$('[data-boss]', body).forEach((b) => b.onclick = () => { const [di, bi] = b.dataset.boss.split(':'); const d = DUNGEONS.find((x) => x.id === di); runBoss(d, +bi); });
    }

    /* ---------- Közös kérdés-motor (2 gomb) ---------- */
    function stream(host, topics, opt) {
      const pool = ITEMS.filter((i) => topics.includes(i.topic) && (!opt.filter || opt.filter(i)));
      const queue = []; let n = 0, cur = null, side = 0, busy = false, last = [], timer = 0;
      host.innerHTML = `<div class="r-card" data-card><div class="r-topic" data-o="topic"></div><div class="r-q" data-o="q"></div>
        <div class="r-opts"><button class="r-opt" data-s="0"><span class="r-k">← · A</span><b data-o="o0"></b></button><button class="r-opt" data-s="1"><span class="r-k">→ · D</span><b data-o="o1"></b></button></div>
        ${opt.timed ? '<div class="g-timer" style="margin-top:14px"><i data-o="timer"></i></div>' : ''}<div class="r-why" data-o="why"></div></div>`;
      const pick = () => {
        const p2 = opt.filter2 ? pool.filter(opt.filter2) : pool; const P = p2.length ? p2 : pool;
        const di = queue.findIndex((x) => x.at <= n); if (di >= 0) return queue.splice(di, 1)[0].it;
        const hard = P.filter((i) => H.hard[i.key] > 0 && !last.includes(i.key));
        if (hard.length && Math.random() < 0.3) return rnd(hard);
        let it, g = 0; do { it = rnd(P); } while (last.includes(it.key) && g++ < 20); return it;
      };
      function show() {
        if (!alive || opt.stopped()) return;
        cur = pick(); last.push(cur.key); if (last.length > 12) last.shift();
        side = Math.random() < 0.5 ? 0 : 1;
        const p = TM.plan.find((x) => x.id === cur.topic);
        $('[data-o="topic"]', host).textContent = (p ? p.no + '. ' + p.title : '') + (H.hard[cur.key] > 0 ? ' · 🔁 nehéz (×2 arany)' : '');
        $('[data-o="q"]', host).textContent = cur.q;
        $('[data-o="o0"]', host).textContent = side ? cur.w : cur.r;
        $('[data-o="o1"]', host).textContent = side ? cur.r : cur.w;
        $('[data-o="why"]', host).textContent = '';
        $('[data-card]', host).className = 'r-card in'; $$('.r-opt', host).forEach((b) => b.className = 'r-opt');
        busy = false;
        if (opt.timed) {
          clearInterval(timer); const T0 = performance.now(), D = opt.timed() * 1000, bar = $('[data-o="timer"]', host);
          timer = setInterval(() => { const k = 1 - (performance.now() - T0) / D; bar.style.width = Math.max(0, k * 100) + '%'; bar.classList.toggle('low', k < 0.3); if (k <= 0) { clearInterval(timer); answer(-1); } }, 80);
        }
      }
      function answer(s) {
        if (busy || !cur) return; busy = true; clearInterval(timer); n++;
        const ok = s === side, btns = $$('.r-opt', host), card = $('[data-card]', host);
        btns[side].classList.add('ok');
        const wasHard = H.hard[cur.key] > 0;
        if (ok) {
          if (wasHard) { H.hard[cur.key]--; if (!H.hard[cur.key]) delete H.hard[cur.key]; }
          card.className = 'r-card good'; save(HKEY, H);
          const keep = opt.onAnswer(true, cur, wasHard);
          if (keep !== false) setTimeout(show, 170);
        } else {
          if (s >= 0) btns[s].classList.add('bad');
          H.hard[cur.key] = Math.min(3, (H.hard[cur.key] || 0) + 2); save(HKEY, H);
          queue.push({ it: cur, at: n + 3 }, { it: cur, at: n + 9 });
          card.className = 'r-card bad';
          $('[data-o="why"]', host).innerHTML = `${s < 0 ? '⏱ Lejárt az idő! ' : ''}<b>✔ ${esc(cur.r)}</b>${cur.why ? ' — ' + esc(cur.why) : ''}<span>Nyomj egy gombot a folytatáshoz</span>`;
          const keep = opt.onAnswer(false, cur, wasHard);
          busy = keep === false ? 'end' : 'wrong';
        }
      }
      const press = (s) => { if (busy === 'wrong') { busy = false; show(); return; } if (busy === 'end') return; answer(s); };
      $$('.r-opt', host).forEach((b) => b.onclick = (e) => { e.stopPropagation(); press(+b.dataset.s); });
      $('[data-card]', host).onclick = () => { if (busy === 'wrong') press(0); };
      const onKey = (e) => { const k = e.key.toLowerCase(); if (['arrowleft', 'a', '1'].includes(k)) { e.preventDefault(); press(0); } else if (['arrowright', 'd', '2'].includes(k)) { e.preventDefault(); press(1); } else if ((k === ' ' || k === 'enter') && busy === 'wrong') { e.preventDefault(); press(0); } };
      document.addEventListener('keydown', onKey);
      show();
      return () => { clearInterval(timer); document.removeEventListener('keydown', onKey); };
    }

    /* ---------- Trash farm ---------- */
    function runTrash(d) {
      tab = 'run'; setTabs();
      let streak = 0, earned = 0, xpGot = 0, kills = 0, stop = false;
      body.innerHTML = `<div class="run"><div class="run-head" style="--h:${d.hue}"><span>${d.icon}</span><div><b>${d.name} — Trash farm</b><small>Minden jó válasz arany + XP. Sorozat-szorzó, kritikus találat, a nehéz kérdések dupláznak.</small></div>
        <button class="btn btn-ghost" data-leave>⟵ Térkép</button></div>
        <div class="run-stats"><div><b data-o="streak">0</b><small>sorozat</small></div><div><b data-o="smult">×1,0</b><small>sorozat-szorzó</small></div><div><b data-o="earned">0</b><small>arany most</small></div><div><b data-o="xpgot">0</b><small>XP most</small></div><div><b data-o="kills">0</b><small>legyőzött mob</small></div></div>
        <div data-stage></div><div class="pop-layer" data-pop></div></div>`;
      const st = stats();
      const sm = () => 1 + Math.min(streak, 50) / 25;
      const ui = () => { $('[data-o="streak"]', body).textContent = streak; $('[data-o="smult"]', body).textContent = '×' + sm().toFixed(1).replace('.', ','); $('[data-o="earned"]', body).textContent = fmt(earned); $('[data-o="xpgot"]', body).textContent = fmt(xpGot); $('[data-o="kills"]', body).textContent = kills; };
      const pop = (txt, cls) => { const p = h(`<span class="pop ${cls || ''}">${txt}</span>`); p.style.left = 40 + Math.random() * 20 + '%'; $('[data-pop]', body).appendChild(p); setTimeout(() => p.remove(), 1100); };
      cleanupRun = stream($('[data-stage]', body), d.topics, {
        stopped: () => stop,
        onAnswer(ok, it, hard) {
          if (ok) {
            streak++; kills++;
            const crit = Math.random() * 100 < st.crit;
            const g = 22 * Math.pow(tierOf(d), 1.6) * sm() * goldMult() * (hard ? 2 : 1) * (crit ? 2 : 1) * (has('alch') ? 1.25 : 1);
            S.gold += g; earned += g; const x = 14 + tierOf(d) * 5; xpGot += x; addXP(x);
            pop(`+${fmt(g)} 💰${crit ? ' KRIT!' : ''}`, crit ? 'crit' : '');
            if (streak % 10 === 0) { TM.toast(`🔥 ${streak}-es sorozat! ×${sm().toFixed(1).replace('.', ',')}`); }
            if (Math.random() < 0.03) { const it2 = makeItem(S, tierOf(d), rollRarity(tierOf(d), 'trash')); if (S.inv.length < 40) { S.inv.push(it2); pop('🎁 ' + RAR[it2.rarity].n + ' tárgy!', 'loot'); } }
          } else {
            if (Math.random() * 100 < st.shield && streak > 0) { pop('🛡️ Sorozatpajzs!', 'loot'); }
            else streak = 0;
          }
          persist(); hud(); ui();
        }
      });
      $('[data-leave]', body).onclick = () => { stop = true; leaveRun(); };
    }

    /* ---------- Boss ---------- */
    function runBoss(d, bi) {
      tab = 'run'; setTabs();
      const b = d.bosses[bi], st = stats(), C = CLASSES[S.cls];
      let hp = b.hp, lives = st.lives, stop = false, phase = 1, streak = 0;
      const buff = { triple: false, wall: 0, slow: 0, storm: 0 };
      const cd = {}; activeSpells().forEach((sp) => { cd[sp.id] = 0; });
      const isKuti = !!b.final;
      const PH = isKuti ? {
        1: ['„Lássuk, kolléga, mit tud a tűzről. Kezdjük a definíciókkal.”', (i) => i.q.includes('_____')],
        2: ['„Most jönnek a csapdák. Figyeljen a CSAK szóra!”', (i) => !i.q.includes('_____')],
        3: ['„Utolsó kérdéssor. Gyorsabban, kolléga!”', null]
      } : null;
      body.innerHTML = `<div class="run boss-run ${isKuti ? 'kuti' : ''}"><div class="boss-top" style="--h:${d.hue}">
          <div class="boss-info"><b>${b.e} ${b.n}</b><small>${d.name}${isKuti ? ' · 3 fázis' : ''}</small>
            <div class="boss-hp"><i data-o="hp"></i><span data-o="hptxt"></span></div>
            <div class="boss-meta"><span data-o="lives"></span><span>⚔️ ${fmt(st.dmg)} sebzés / találat</span><span>⏱ ${st.time} mp</span><span data-o="buffs" class="buffs"></span></div></div>
          <button class="btn btn-ghost" data-leave>Menekülés</button></div>
        <div class="arena" style="--h:${d.hue}">
          <div class="hero ${S.cls}">${stickman(S.cls)}</div>
          <div class="arena-fx"><div class="spray"></div></div>
          <div class="boss-stage"><canvas class="boss-aura" aria-hidden="true"></canvas><div class="boss-portrait">${b.e}</div><svg class="slash" viewBox="0 0 200 200" aria-hidden="true"><path d="M20 170 Q100 110 185 20" /></svg></div>
        </div>
        <div class="spells" data-spells></div>
        ${isKuti ? '<div class="kuti-quote" data-o="quote"></div>' : ''}
        <div data-stage></div><div class="pop-layer" data-pop></div></div>`;
      const KEYS = ['q', 'w', 'e'];
      let heroEl, portrait, slash, spray, run;
      const fx = (el, cls) => { if (!el) return; el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); };
      const spellsUI = () => {
        const act = activeSpells();
        const nextSp = C.spells.find((x) => lvl() < x.lv);
        $('[data-spells]', body).innerHTML = (act.length ? act.map((sp, i) => `<button class="spell ${cd[sp.id] ? 'cd' : ''}" data-sp="${sp.id}" data-spell="${S.cls}:${sp.id}"><span class="sp-ic">${sp.ic}</span><span><b>${sp.n}</b><small>${cd[sp.id] ? cd[sp.id] + ' kérdés múlva' : 'KÉSZ · ' + KEYS[i].toUpperCase() + ' gomb'}</small></span></button>`).join('')
          : `<p class="muted" style="margin:0">Az első aktív képesség a 3. szinten nyílik (${C.spells.find((s) => s.type === 'active').n}).</p>`)
          + C.spells.filter((x) => x.type === 'passive' && lvl() >= x.lv).map((x) => `<span class="passive-chip" data-spell="${S.cls}:${x.id}">${x.ic} ${x.n}</span>`).join('')
          + (nextSp ? `<span class="next-sp" data-spell="${S.cls}:${nextSp.id}">Következő: ${nextSp.ic} ${nextSp.n} — ${nextSp.lv}. szint</span>` : '');
        $$('[data-sp]', body).forEach((el) => el.onclick = () => cast(el.dataset.sp));
        const bf = []; if (buff.triple) bf.push('💥 ×3 a következő'); if (buff.wall) bf.push(`🛡️ Pajzsfal ×${buff.wall}`); if (buff.slow) bf.push(`⏳ Nincs időkorlát ×${buff.slow}`); if (buff.storm) bf.push(`🌪️ ×2 sebzés ×${buff.storm}`);
        $('[data-o="buffs"]', body).textContent = bf.join(' · ');
      };
      function cast(id) {
        if (stop || cd[id] === undefined || cd[id] > 0) return;
        const sp = C.spells.find((s) => s.id === id);
        if (id === 'smash' || id === 'blast') buff.triple = true;
        if (id === 'wall') buff.wall = 2;
        if (id === 'slow') buff.slow = 3;
        if (id === 'storm' || id === 'mist') buff.storm = 5;
        cd[id] = sp.cd; pop(`${sp.ic} ${sp.n}!`, 'loot'); fx(heroEl, 'buffed'); spellsUI();
      }
      const ui = () => {
        $('[data-o="hp"]', body).style.width = Math.max(0, hp / b.hp * 100) + '%';
        $('[data-o="hptxt"]', body).textContent = `${fmt(Math.max(0, hp))} / ${fmt(b.hp)}`;
        $('[data-o="lives"]', body).innerHTML = '❤️'.repeat(Math.max(0, lives)) + '<span style="opacity:.25">' + '❤️'.repeat(Math.max(0, st.lives - lives)) + '</span>';
        if (isKuti) $('[data-o="quote"]', body).textContent = '🎓 ' + PH[phase][0];
      };
      const pop = (txt, cls) => { const p = h(`<span class="pop ${cls || ''}">${txt}</span>`); p.style.left = 52 + Math.random() * 20 + '%'; $('[data-pop]', body).appendChild(p); setTimeout(() => p.remove(), 1100); };
      const end = (win) => {
        stop = true; if (cleanupRun) cleanupRun(); cleanupRun = null; prevCleanup();
        let html;
        if (win) {
          const first = !S.kills[d.id + bi]; S.kills[d.id + bi] = true;
          const tier = tierOf(d);
          const xp = Math.round((120 + 90 * tier) * (first ? 1.5 : 0.4));
          const gold = Math.round(60 * Math.pow(tier, 1.7) * (bi + 2) * goldMult() * (first ? 1.5 : 0.7));
          const loot = makeItem(S, tier, rollRarity(tier, 'boss'), isKuti ? 'trinket' : null);
          if (isKuti) { loot.name = 'Kuti Rajmund Pecsétje — „Megfelelt”'; loot.flavor = '„Gratulálok, kolléga. Megfelelt.”'; }
          S.inv.push(loot); S.lastLoot = loot; S.gold += gold; addXP(xp); persist(); hud();
          TM.sparks(innerWidth / 2, innerHeight / 3, isKuti ? 260 : 150);
          html = `<div class="victory"><div class="v-title">${isKuti ? 'A ZH-TEREM MEGTISZTÍTVA' : 'GYŐZELEM'}</div>
            <p>${b.e} <b>${b.n}</b> legyőzve${first ? ' — első győzelem bónusz!' : ''}</p>
            <div class="v-rew"><span>+${fmt(xp)} XP</span><span class="gold">+${fmt(gold)} 💰</span></div>
            <div class="v-loot"><small>Zsákmány</small><div class="loot-row" data-item="${loot.id}">${icon(loot, 64)}<b style="color:${RAR[loot.rarity].c}">${esc(loot.name)}</b></div></div>
            <div class="mini-cta" style="justify-content:center"><button class="btn btn-fire" data-armory>🛡️ Felveszem (Armory)</button><button class="btn btn-ghost" data-again>Újra</button><button class="btn btn-ghost" data-map>Térkép</button></div></div>`;
        } else {
          html = `<div class="victory lose"><div class="v-title">MEGHALTÁL</div><p>${b.e} ${b.n} még ${fmt(hp)} HP-n áll. Farmolj aranyat, vegyél gear-t, és gyere vissza!</p>
            <div class="mini-cta" style="justify-content:center"><button class="btn btn-fire" data-again>Újra</button><button class="btn btn-ghost" data-shop>💰 Bolt</button><button class="btn btn-ghost" data-map>Térkép</button></div></div>`;
        }
        $('[data-stage]', body).innerHTML = html; $('[data-spells]', body).innerHTML = '';
        const a = (s, f) => { const el = $(s, body); if (el) el.onclick = f; };
        a('[data-again]', () => runBoss(d, bi)); a('[data-map]', leaveRun); a('[data-armory]', () => { leaveRun(); show('armory'); }); a('[data-shop]', () => { leaveRun(); show('shop'); });
      };
      ui(); spellsUI();
      /* --- harci animációk --- */
      const fl = new TM.Flame({ w: 40, h: 90, rate: 220 });
      const aura = TM.scene($('.boss-aura', body), (g, w, hh, t, dt) => {
        g.clearRect(0, 0, w, hh);
        const enr = hp / b.hp < 0.3;
        fl.x = w / 2; fl.y = hh * 0.92; fl.w = w * 0.32; fl.h = hh * (enr ? 0.95 : 0.7); fl.power = stop ? Math.max(0, fl.power - dt) : (enr ? 1 : 0.65); fl.rate = enr ? 340 : 220;
        fl.step(dt, t); fl.draw(g);
      });
      run = $('.run', body); portrait = $('.boss-portrait', body); slash = $('.slash', body); heroEl = $('.hero', body); spray = $('.spray', body);
      const hitFx = (crit) => {
        if (S.cls === 'warrior') {
          fx(heroEl, crit ? 'atk-crit' : 'atk');
          setTimeout(() => { slash.style.transform = `rotate(${(Math.random() * 50 - 25).toFixed(0)}deg) scale(${crit ? 1.25 : 1})`; fx(slash, crit ? 'go-crit' : 'go'); fx(portrait, 'hit'); if (crit) fx(run, 'shake'); }, 170);
        } else {
          fx(heroEl, 'cast'); fx(spray, crit ? 'go-crit' : 'go');
          setTimeout(() => { fx(portrait, 'hit'); if (crit) fx(run, 'shake'); }, 220);
        }
        portrait.classList.toggle('enrage', hp / b.hp < 0.3);
      };
      const bossAttack = () => { fx(portrait, 'attack'); setTimeout(() => fx(heroEl, 'hurt'), 180); fx(run, 'hurt'); };
      const deathFx = () => { portrait.classList.add('dead'); const r2 = portrait.getBoundingClientRect(); TM.sparks(r2.left + r2.width / 2, r2.top + r2.height / 2, 160); };
      const onSpellKey = (e) => { const i = KEYS.indexOf(e.key.toLowerCase()); const act = activeSpells(); if (i >= 0 && act[i]) { e.preventDefault(); cast(act[i].id); } };
      document.addEventListener('keydown', onSpellKey);
      const prevCleanup = () => { aura.destroy(); document.removeEventListener('keydown', onSpellKey); };
      cleanupRun = stream($('[data-stage]', body), b.t, {
        stopped: () => stop,
        timed: () => buff.slow > 0 ? 999 : Math.max(4, st.time - (isKuti && phase === 3 ? 3 : 0)),
        filter2: (i) => !PH || !PH[phase][1] || PH[phase][1](i),
        onAnswer(ok) {
          Object.keys(cd).forEach((k) => { if (cd[k] > 0) cd[k]--; }); if (buff.slow > 0) buff.slow--;
          if (ok) {
            streak++;
            const crit = Math.random() * 100 < st.crit;
            let dmg = st.dmg * (crit ? (has('arch') ? 3 : 2) : 1);
            if (buff.triple) { dmg *= 3; buff.triple = false; }
            if (buff.storm > 0) { dmg *= 2; buff.storm--; }
            if (has('execute') && hp / b.hp < 0.3) dmg *= 1.5;
            if (has('champ')) dmg *= 1.2;
            dmg = Math.round(dmg);
            hp -= dmg; pop(`-${fmt(dmg)}${crit ? ' KRIT!' : ''}`, crit ? 'crit' : 'dmg');
            hitFx(crit);
            if (has('rage') && streak % 5 === 0 && lives < st.lives) { lives++; pop('+1 ❤️ Harci mámor', 'loot'); }
            if (isKuti) { const np = hp / b.hp > 0.66 ? 1 : hp / b.hp > 0.33 ? 2 : 3; if (np !== phase) { phase = np; banner(`${phase}. FÁZIS`, PH[phase][0], 'lvl'); } }
            ui(); spellsUI(); if (hp <= 0) { deathFx(); setTimeout(() => end(true), 900); return false; }
          } else {
            streak = 0;
            if (buff.wall > 0) { buff.wall--; pop('🛡️ Pajzsfal!', 'loot'); fx(portrait, 'attack'); }
            else if (Math.random() * 100 < st.shield) pop('🛡️ Kivédve!', 'loot');
            else { lives--; pop('-1 ❤️', 'dmg'); bossAttack(); }
            ui(); spellsUI(); if (lives <= 0) { setTimeout(() => end(false), 900); return false; }
          }
        }
      });
      $('[data-leave]', body).onclick = () => { stop = true; prevCleanup(); leaveRun(); };
    }
    function leaveRun() { if (cleanupRun) cleanupRun(); cleanupRun = null; show('map'); }

    /* ---------- Armory ---------- */
    const SLOT_L = ['head', 'neck', 'shoulder', 'chest', 'waist'], SLOT_R = ['hands', 'feet', 'ring1', 'ring2', 'trinket'];
    const fits = (it, slot) => it.slot === slot || (it.slot === 'ring' && (slot === 'ring1' || slot === 'ring2'));
    function slotHtml(slot) {
      const it = S.gear[slot];
      return `<div class="slot" data-slot="${slot}" ${it ? `data-item="${it.id}" data-hint="Kattints: levétel"` : ''}>${it ? icon(it) : emptyIcon(slot)}<div><small>${SLOTS[slot]}</small><b style="color:${it ? RAR[it.rarity].c : '#555'}">${it ? esc(it.name) : '— üres —'}</b></div></div>`;
    }
    function renderArmory() {
      const st = stats(), li = levelInfo(S.xp);
      body.innerHTML = `<div class="armory">
        <div class="paper">
          <div class="pcol">${SLOT_L.map(slotHtml).join('')}</div>
          <div class="pmid"><div class="hero-fig"><div class="hero ${S.cls} idle big">${stickman(S.cls)}</div>
            <div class="hero-name">${CLASSES[S.cls].e} ${CLASSES[S.cls].n} · ${li.L}. szint</div></div>
            <div class="pweap">${slotHtml('weapon')}</div></div>
          <div class="pcol">${SLOT_R.map(slotHtml).join('')}</div>
        </div>
        <div class="statbox"><h3>Statok</h3>
          <div><span>⚔️ Sebzés / találat</span><b>${fmt(st.dmg)}</b></div><div><span>❤️ Élet a bossnál</span><b>${st.lives}</b></div>
          <div><span>⏱ Idő kérdésenként</span><b>${st.time} mp</b></div><div><span>💥 Kritikus esély</span><b>${Math.round(st.crit)}%</b></div>
          <div><span>💰 Arany (gear)</span><b>+${Math.round(st.gold)}%</b></div><div><span>🛡️ Sorozatpajzs</span><b>${Math.round(st.shield)}%</b></div>
          <div><span>📈 Összes arany-szorzó</span><b>×${goldMult().toFixed(2).replace('.', ',')}</b></div>
          <div><span>🏆 Legyőzött bossok</span><b>${Object.keys(S.kills).length} / ${DUNGEONS.reduce((s, d) => s + d.bosses.length, 0)}</b></div>
        </div>
        <div class="statbox abil"><h3>Képességek <button class="btn-link btn" data-recls style="font-size:12px;float:right">Kaszt váltása</button></h3>
          ${CLASSES[S.cls].spells.map((sp) => `<div class="abil-row ${li.L >= sp.lv ? '' : 'locked'}" data-spell="${S.cls}:${sp.id}"><span class="abil-ic">${sp.ic}</span><span class="abil-txt"><b>${sp.n}</b> <small>${sp.type === 'active' ? 'aktív · ' + sp.cd + ' kérdés újratöltés' : 'passzív'}</small><em>${sp.d}</em></span><b class="abil-lv">${li.L >= sp.lv ? '✔' : sp.lv + '. szint'}</b></div>`).join('')}
        </div>
        <div class="bag"><h3>Táska (${S.inv.length}/40) <small>Kattints: felvétel · Jobb klikk: eladás · ✨ Enchant a felvett tárgyakon (alt+katt)</small></h3>
          <div class="bag-grid">${S.inv.map((it) => `<div class="bag-it" data-item="${it.id}" data-hint="Bal klikk: felvétel · Jobb klikk: eladás (${fmt(it.price / 4)} arany)">${icon(it, 56)}</div>`).join('') || '<p class="muted">Üres. Bossok és trash dobnak tárgyakat, vagy vegyél a Boltban.</p>'}</div></div>
        <div class="ench"><h3>✨ Enchant-asztal</h3><p class="muted">Válassz egy felvett tárgyat. Siker esetén +1 véletlen stat (max. 3 enchant / tárgy). 25% eséllyel elbukik — az arany elvész.</p>
          <div class="ench-row">${Object.keys(SLOTS).filter((s) => S.gear[s]).map((s) => { const it = S.gear[s]; const c = enchCost(it); return `<button class="ench-btn" data-ench="${s}" data-item="${it.id}" ${it.ench.length >= 3 ? 'disabled' : ''}>${icon(it, 40)}<span>${it.ench.length >= 3 ? 'MAX' : fmt(c) + ' 💰'}</span></button>`; }).join('') || '<p class="muted">Előbb vegyél fel valamit.</p>'}</div></div>
      </div>`;
      $('[data-recls]', body).onclick = () => { S.cls = null; persist(); show('map'); };
      $$('.slot', body).forEach((el) => el.onclick = () => { const s = el.dataset.slot; if (S.gear[s]) { if (S.inv.length >= 40) return TM.toast('Tele a táska!'); S.inv.push(S.gear[s]); delete S.gear[s]; persist(); renderArmory(); } });
      $$('.bag-it', body).forEach((el) => {
        el.onclick = () => equip(+el.dataset.item);
        el.oncontextmenu = (e) => { e.preventDefault(); sell(+el.dataset.item); };
      });
      $$('[data-ench]', body).forEach((el) => el.onclick = () => enchant(el.dataset.ench));
    }
    const enchCost = (it) => Math.round(it.ilvl * 18 * (1 + it.ench.length * 0.8));
    function equip(id) {
      const it = S.inv.find((i) => i.id === id); if (!it) return;
      let slot = it.slot;
      if (slot === 'ring') slot = !S.gear.ring1 ? 'ring1' : !S.gear.ring2 ? 'ring2' : (S.gear.ring1.ilvl <= S.gear.ring2.ilvl ? 'ring1' : 'ring2');
      S.inv = S.inv.filter((i) => i.id !== id);
      if (S.gear[slot]) S.inv.push(S.gear[slot]);
      S.gear[slot] = it; persist(); tt.style.display = 'none'; renderArmory();
      TM.toast(`Felvéve: ${it.name}`);
    }
    function sell(id) {
      const it = S.inv.find((i) => i.id === id); if (!it) return;
      S.inv = S.inv.filter((i) => i.id !== id); S.gold += it.price / 4; persist(); hud(); tt.style.display = 'none'; renderArmory();
      TM.toast(`Eladva: +${fmt(it.price / 4)} arany`);
    }
    function enchant(slot) {
      const it = S.gear[slot]; if (!it || it.ench.length >= 3) return;
      const c = enchCost(it); if (S.gold < c) return TM.toast(`Kell még ${fmt(c - S.gold)} arany`);
      S.gold -= c;
      if (Math.random() < 0.25) { TM.toast('💥 Az enchant elbukott…'); }
      else {
        const k = rnd(['gold', 'crit', 'dmg', 'time', 'shield']);
        const v = k === 'dmg' ? Math.max(1, Math.round(it.ilvl * 0.08)) : k === 'time' ? 1 : k === 'shield' ? 3 : k === 'crit' ? 2 : 4;
        it.ench.push({ k, v }); TM.toast(`✨ Siker! ${statTxt(k, v)}`); TM.sparks(innerWidth / 2, innerHeight / 2, 60);
      }
      persist(); hud(); renderArmory();
    }

    /* ---------- Bolt ---------- */
    const shopTier = () => Math.max(1, ...DUNGEONS.filter(unlocked).map(tierOf).filter((t) => t <= 5));
    function restock(force) {
      const t = shopTier();
      if (!force && S.shop && S.shop.tier === t && S.shop.items.length) return;
      const slots = ['weapon', 'head', 'chest', 'feet', 'ring', 'trinket', 'hands', 'neck'];
      S.shop = { tier: t, items: slots.map((s) => makeItem(S, t, rollRarity(t, 'shop'), s)) };
      persist();
    }
    function renderShop() {
      restock(false);
      const rc = 40 * shopTier();
      body.innerHTML = `<div class="shop"><div class="shop-head"><div><h3>💰 Kovácsműhely</h3><p class="muted">${DUNGEONS[shopTier() - 1].name} szintű felszerelés. Gyűjts aranyat a Trash farmon!</p></div>
        <button class="btn btn-ghost" data-restock>🔄 Új áru (${fmt(rc)} 💰)</button></div>
        <div class="shop-grid">${S.shop.items.map((it) => `<div class="shop-it ${S.gold >= it.price ? '' : 'poor'}" data-item="${it.id}">${icon(it, 56)}<div><b style="color:${RAR[it.rarity].c}">${esc(it.name)}</b><small>${SLOTS[it.slot === 'ring' ? 'ring1' : it.slot]} · ${Object.keys(it.st).map((k) => statTxt(k, it.st[k])).join(', ')}</small></div><button class="btn btn-fire" data-buy="${it.id}">${fmt(it.price)} 💰</button></div>`).join('')}</div></div>`;
      $('[data-restock]', body).onclick = () => { if (S.gold < rc) return TM.toast('Nincs elég arany'); S.gold -= rc; restock(true); hud(); renderShop(); };
      $$('[data-buy]', body).forEach((b) => b.onclick = () => {
        const it = S.shop.items.find((i) => i.id === +b.dataset.buy);
        if (S.gold < it.price) return TM.toast(`Kell még ${fmt(it.price - S.gold)} arany`);
        if (S.inv.length >= 40) return TM.toast('Tele a táska!');
        S.gold -= it.price; S.shop.items = S.shop.items.filter((i) => i !== it); S.inv.push(it); persist(); hud();
        equip(it.id); TM.sparks(innerWidth / 2, innerHeight / 2, 50); show('shop');
      });
    }

    function setTabs() { $$('[data-tab]', view).forEach((b) => b.classList.toggle('on', b.dataset.tab === tab)); }
    function show(t) {
      if (cleanupRun) { cleanupRun(); cleanupRun = null; }
      tab = t; setTabs(); hud(); tt.style.display = 'none';
      if (!S.cls || t === 'map') renderMap(); else if (t === 'armory') renderArmory(); else renderShop();
      window.scrollTo(0, 0);
    }
    $$('[data-tab]', view).forEach((b) => b.onclick = () => show(b.dataset.tab));
    show('map');
    TM._rpgState = () => S; // hibakereséshez
    return () => { alive = false; if (cleanupRun) cleanupRun(); };
  };
})();
