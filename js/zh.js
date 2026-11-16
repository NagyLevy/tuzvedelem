/* ZH-gyakorló (telefonra): kiegészítős szóbankkal, párosítós, kifejtős mini. Az elrontottak visszajönnek. */
(function () {
  'use strict';
  const TM = window.TM;
  const { h, $, $$ } = TM;
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = (Math.random() * (i + 1)) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const strip = (s) => String(s).replace(/<[^>]+>/g, '');

  /* ---------- Párosítós feladatok ---------- */
  const MATCH = [
    ['Hőátadási formák', [['Hővezetés', 'részecskéről részecskére, anyagáramlás nélkül'], ['Hőáramlás', 'folyadékban, gázban, anyagáramlással'], ['Hősugárzás', 'elektromágneses, közvetítő anyag nem kell']]],
    ['Oxigéntartalom → égés', [['18% felett', 'tökéletes égés, CO₂'], ['14–18%', 'tökéletlen égés, CO'], ['14% alatt', 'az égés megszűnik']]],
    ['Az égés fajtái', [['Kinetikai égés', 'a gáz és az O₂ már a gyulladás előtt összekeveredett'], ['Diffúz égés', 'égés közben keveredik az O₂-vel'], ['Izzó égés', 'nincs éghető gáz → láng nélkül ég'], ['Lassú égés', 'fényjelenség nélkül (korrózió)']]],
    ['Munkabaleset vs. foglalkozási megbetegedés', [['Munkabaleset', 'szervezett munkavégzés során bekövetkezett, hirtelen egészségkárosodás'], ['Foglalkozási megbetegedés', 'munkavégzéssel kapcsolatos, tartósan fennálló egészségkárosodás']]],
    ['Lobban vagy gyullad?', [['Lobbanáspont', 'meggyullad, de a gyújtóforrás elvétele után kialszik'], ['Gyulladási hőmérséklet', 'a gyújtóforrás elvétele után is önállóan ég']]],
    ['A füst színe', [['Sárga füst', 'kén'], ['Vörösesbarna füst', 'nitrózus gázok (NOx)'], ['Sűrű fehér füst', 'foszfor'], ['Fekete füst', 'korom (műanyag, gumi, olaj)']]],
    ['Habkiadósság (Hk)', [['Hk < 20', 'nehézhab'], ['Hk 20–200', 'középhab'], ['Hk > 200', 'könnyűhab']]],
    ['Tűzosztályok', [['„A”', 'szilárd éghető anyag'], ['„B”', 'tűzveszélyes folyadék'], ['„C”', 'éghető gáz'], ['„D”', 'éghető fém'], ['„E”', 'feszültség alatti berendezés']]],
    ['Fő oltóhatás → alhatás', [['Hűtőhatás', 'párolgási hatás'], ['Fojtóhatás', 'kiszorító hatás'], ['Antikatalitikus hatás', 'homogén inhibíció']]],
    ['A tűz zónái', [['Az égés zónája', 'hőfeszültség jellemzi'], ['Hőterhelésnek kitett zóna', 'az anyagok előkészülnek a meggyulladásra'], ['Füstzóna', 'forró, mérgező, oxigénhiányos gázok']]],
    ['A tűz nagysága', [['Kis tűz', '100 m² alatt'], ['Közepes tűz', '100–1000 m²'], ['Nagy tűz', '1000 m² felett']]],
    ['A tűz osztályozása', [['Környezet szerint', 'zárt / nyílt'], ['Fejlődés szerint', 'terjedő / nem terjedő'], ['Nagyság szerint', 'kis / közepes / nagy']]],
    ['Hőtani mennyiségek', [['Hőmennyiség', 'Q, joule (J)'], ['Hőmérséklet', 'T, kelvin (K)'], ['Fajlagos hőkapacitás', 'c, J/kg·K'], ['Égéshő', 'Hf, J/kg']]],
    ['A láng zónái', [['I. zóna', 'gőzök, gázok lépnek ki, alacsony hőmérséklet'], ['II. zóna', 'fehér izzó, világító láng, korom'], ['III. zóna', 'tökéletes égés, itt ég el a H₂ és a CO']]],
    ['Az égés megszüntetése', [['Éghető anyag', 'az égő anyag eltávolítása'], ['Oxigén', 'az égő tér lezárása, elárasztása'], ['Gyulladási hőmérséklet', 'gyulladáspont alá hűtés']]],
    ['Oltógázok', [['Inert gáz (CO₂, N₂)', 'fojtó, ezen belül kiszorító hatás'], ['Halon', 'antikatalitikus (kémiai) hatás']]],
    ['Régi veszélyjelek', [['Xn', 'ártalmas'], ['Xi', 'irritatív'], ['T+', 'nagyon mérgező'], ['E', 'robbanásveszélyes'], ['O', 'égést tápláló, oxidáló']]],
    ['Jogszabályok', [['Munkavédelmi törvény', '1993. évi XCIII. törvény'], ['Kémiai biztonsági törvény', '2000. évi XXV. törvény'], ['CLP', '1272/2008/EK rendelet'], ['REACH', '1907/2006/EK rendelet']]],
    ['Munkavédelmi oktatás', [['Előzetes oktatás', 'munkába lépés előtt, a közvetlen vezető tartja'], ['Ismétlődő oktatás', 'évente, munkavédelmi szakember tartja'], ['Rendkívüli oktatás', 'baleset, rendkívüli esemény után']]],
    ['Egyéni védőeszköz kategóriák', [['1. kategória', 'egyszerű, pl. kertészkesztyű, napszemüveg'], ['2. kategória', 'védősisak, hallásvédő, szemvédő'], ['3. kategória', 'légzésvédő, leesés elleni, villamosság elleni']]],
    ['Régi → új CLP-mondatok', [['R-mondat (veszély)', 'H-mondat'], ['S-mondat (biztonság)', 'P-mondat']]],
    ['Munkavédelem szakterületei', [['Munkabiztonság', 'balesetek megelőzése'], ['Munkahigiéné', 'a munkakörnyezet kóroki tényezőinek feltárása'], ['Foglalkozás-egészségügy', 'orvosi alkalmassági vizsgálat']]]
  ];

  /* ---------- Kifejtős mini (felsorolás, önellenőrzés) ---------- */
  const RECALL = [
    ['Sorolja fel a munkavédelem résztvevőit!', 'Állam · Munkáltató · Munkavállaló'],
    ['Sorolja fel a munkavédelem tagozódását (szintjeit)!', 'Munkabiztonság · Munkaegészségügy (foglalkozás-egészségügy) · Munkahigiénia'],
    ['Határozza meg az égés fogalmát!', 'Az a kémiai folyamat, melynek során az éghető anyag megfelelő hőmérsékleten a levegő oxigénjével egyesül, hő és legtöbb esetben fény formájában energiát szolgáltat.'],
    ['Írja le az égés feltételeit!', 'Éghető anyag + oxigén + gyújtóforrás (megfelelő hőmérséklet), azonos térben és időben.'],
    ['Határozza meg a hőátadás formáit!', 'Hővezetés (kondukció): részecskéről részecskére, anyagáramlás nélkül, vákuumban nem.\nHőáramlás (konvekció): folyadék, gáz, anyagáramlással, égésterméket is szállít.\nHősugárzás (radiáció): elektromágneses, közvetítő anyag nem kell.'],
    ['Melyek a fő oltóhatások?', 'Hűtőhatás (hőhatás) · Fojtóhatás · Antikatalitikus (inhibíciós) hatás'],
    ['Melyek az oltási módok (az égés feltételei alapján)?', 'Az éghető anyag eltávolítása · az oxigén elvonása · hűtés'],
    ['Milyen vízsugarakat alkalmazunk a tűzoltásban?', 'Kötött · porlasztott · szórt sugár · vízköd'],
    ['Mikor nem szabad vízzel oltani?', 'Elektromos tüzek, alkálifémek égése, ahol termikus bomlásra lehet számítani.'],
    ['Egészítse ki: A munkavédelem a … munkavégzésre vonatkozó biztonsági és … követelmények, … törvénykezési, szervezési, … előírások rendszere.', 'szervezett · egészségügyi · (továbbá a törvény céljának megvalósítására szolgáló) · intézményi'],
    ['Mi a munkabaleset?', 'Az a baleset, amely a munkavállalót a szervezett munkavégzés során vagy azzal összefüggésben éri, annak helyétől, időpontjától és a sérült közrehatásától függetlenül.'],
    ['Mi a foglalkozási megbetegedés?', 'A munkavégzés során fellépő (fizikai, kémiai, biológiai, pszichoszociális, ergonómiai) kóroki tényezőkre visszavezethető, tartós egészségkárosodás.'],
    ['Melyek a szervezett munkavégzés jogviszonyai (példák)?', 'Munkaviszony · közszolgálati / közalkalmazotti jogviszony · tanulói jogviszony a szakmai gyakorlat során · hallgatói gyakorlati képzés · (NEM: baráti segítség)'],
    ['Ki felelős a munkavédelmi előírások végrehajtásáért?', 'A munkáltató ÉS a munkavállaló egyaránt.'],
    ['Mit jelent a lobbanáspont?', 'Az a legalacsonyabb hőmérséklet, amelynél a folyadék annyi gázt képez, hogy nyílt lánggal meggyújtható, de a gyújtóforrás elvétele után önálló égésre még nem képes.'],
    ['Mi a tűz (tesztbank)?', 'Az anyagi javak pusztulásával, az emberi élet, egészség veszélyeztetésével járó, nem kívánt, időben és térben nem korlátozott és nem ellenőrzött égési folyamat.'],
    ['Sorolja fel a tűzosztályokat!', 'A szilárd · B folyadék · C gáz · D fém · E feszültség alatti berendezés'],
    ['Mi a kockázat?', 'A veszélyhelyzetben a sérülés vagy egészségkárosodás valószínűségének és súlyosságának együttes hatása.']
  ];

  /* ---------- Kiegészítős (szóbank) a leckékből + kérdésbankból ---------- */
  function clozeItems() {
    const all = [];
    TM.lessons.forEach((l) => l.quiz.forEach((q) => all.push({ ...q, topic: l.id })));
    (TM.bank || []).forEach((q) => all.push(q));
    const cl = all.filter((q) => q.type === 'cloze');
    const pool = []; cl.forEach((q) => q.text.replace(/\[([^\]]+)\]/g, (m, x) => pool.push(x.split('|')[0])));
    const uniq = (a) => [...new Map(a.map((w) => [TM.norm(w), w])).values()];
    return cl.map((q) => {
      const blanks = []; q.text.replace(/\[([^\]]+)\]/g, (m, x) => blanks.push(x.split('|')));
      const right = blanks.map((b) => b[0]);
      const numeric = right.some((w) => /\d/.test(w));
      const cand = uniq(pool).filter((w) => !right.some((r) => TM.norm(r) === TM.norm(w)) && (/\d/.test(w) === numeric || Math.random() < 0.25));
      const extra = shuffle(cand).slice(0, Math.max(2, 5 - right.length));
      return { kind: 'cloze', key: 'c|' + q.text, text: q.text, blanks, chips: shuffle(uniq(right.concat(extra))), why: strip(q.why || '') };
    });
  }

  TM.zh = function (app) {
    const C = clozeItems();
    const M = MATCH.map(([t, pairs]) => ({ kind: 'match', key: 'm|' + t, title: t, pairs }));
    const R = RECALL.map(([q, a]) => ({ kind: 'recall', key: 'r|' + q, q, a }));
    let mode = 'mix', deck = [], idx = 0, good = 0, total = 0, retry = [];
    const view = h(`<div class="zh">
      <div class="zh-top"><div class="zh-score"><b data-o="score">0 / 0</b><small>jó válasz</small></div>
        <div class="seg zh-modes"><button class="on" data-m="mix">Vegyes</button><button data-m="cloze">Kiegészítős</button><button data-m="match">Párosítós</button><button data-m="recall">Kifejtős</button></div></div>
      <div class="zh-card" data-card></div>
      <p class="zh-foot">Elrontott feladat pár kör múlva visszajön. ${C.length} kiegészítős · ${M.length} párosítós · ${R.length} kifejtős.</p>
    </div>`);
    app.replaceChildren(view);
    const card = $('[data-card]', view);

    function build() {
      const src = mode === 'cloze' ? C : mode === 'match' ? M : mode === 'recall' ? R : C.concat(M, M, R);
      deck = shuffle(src); idx = 0; retry = [];
    }
    function nextItem() {
      const due = retry.findIndex((r) => r.at <= total); if (due >= 0) return retry.splice(due, 1)[0].it;
      if (idx >= deck.length) { deck = shuffle(deck); idx = 0; }
      return deck[idx++];
    }
    function score(ok, it) {
      total++; if (ok) good++; else retry.push({ it, at: total + 4 });
      $('[data-o="score"]', view).textContent = `${good} / ${total}`;
    }
    const nextBtn = (label = 'Következő →') => `<button class="btn btn-fire zh-next" data-next>${label}</button>`;
    function render() {
      const it = nextItem();
      card.className = 'zh-card in'; void card.offsetWidth;
      if (it.kind === 'cloze') renderCloze(it); else if (it.kind === 'match') renderMatch(it); else renderRecall(it);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    /* Kiegészítős: koppints a szóra → a következő üres helyre kerül; koppints a kitöltött helyre → törlés. */
    function renderCloze(it) {
      const fill = it.blanks.map(() => null);
      let n = -1;
      const parts = it.text.split(/(\[[^\]]+\])/).map((p) => /^\[.*\]$/.test(p) ? `<button class="zh-blank" data-b="${++n}"><span>${n + 1}.</span></button>` : esc(p)).join('');
      card.innerHTML = `<div class="zh-type">Egészítse ki! <small>${it.blanks.length} hiányzó szó</small></div><div class="zh-text">${parts}</div>
        <div class="zh-chips">${it.chips.map((c, i) => `<button class="zh-chip" data-c="${i}">${esc(c)}</button>`).join('')}</div>
        <div class="zh-res" data-res></div><div class="zh-act"><button class="btn btn-ghost" data-clear>Törlés</button><button class="btn btn-fire" data-check>Ellenőrzés</button></div>`;
      const sync = () => {
        $$('.zh-blank', card).forEach((b, i) => { b.innerHTML = fill[i] != null ? esc(it.chips[fill[i]]) : `<span>${i + 1}.</span>`; b.classList.toggle('filled', fill[i] != null); });
        $$('.zh-chip', card).forEach((c, i) => c.classList.toggle('used', fill.includes(i)));
        const firstEmpty = fill.indexOf(null); $$('.zh-blank', card).forEach((b, i) => b.classList.toggle('next', i === firstEmpty));
      };
      $$('.zh-chip', card).forEach((c) => c.onclick = () => { const i = +c.dataset.c; if (fill.includes(i)) return; const e = fill.indexOf(null); if (e < 0) return; fill[e] = i; sync(); });
      $$('.zh-blank', card).forEach((b) => b.onclick = () => { fill[+b.dataset.b] = null; sync(); });
      $('[data-clear]', card).onclick = () => { fill.fill(null); sync(); };
      $('[data-check]', card).onclick = () => {
        if (fill.includes(null)) return TM.toast('Töltsd ki az összes helyet!');
        let okAll = true;
        $$('.zh-blank', card).forEach((b, i) => { const ok = it.blanks[i].some((a) => TM.norm(a) === TM.norm(it.chips[fill[i]])); b.classList.add(ok ? 'ok' : 'bad'); if (!ok) { okAll = false; b.insertAdjacentHTML('afterend', `<span class="zh-sol">${esc(it.blanks[i][0])}</span>`); } b.disabled = true; });
        $$('.zh-chip', card).forEach((c) => c.disabled = true);
        score(okAll, it);
        $('[data-res]', card).innerHTML = `<b class="${okAll ? 'ok' : 'bad'}">${okAll ? '✔ Helyes!' : '✗ Nem egészen — zölddel a helyes.'}</b>${it.why ? ' ' + esc(it.why) : ''}`;
        $('.zh-act', card).innerHTML = nextBtn(); $('[data-next]', card).onclick = render;
      };
      sync();
    }

    /* Párosítós: bal oldali fogalom → jobb oldali jelentés. */
    function renderMatch(it) {
      const L = it.pairs.map((p, i) => ({ t: p[0], i })), Rr = shuffle(it.pairs.map((p, i) => ({ t: p[1], i })));
      let selL = null, done = 0, mistakes = 0;
      card.innerHTML = `<div class="zh-type">Párosítsa! <small>${esc(it.title)}</small></div><p class="zh-hint">Koppints egy fogalomra a bal oszlopban, aztán a hozzá tartozó jelentésre.</p>
        <div class="zh-match"><div>${L.map((x) => `<button class="zh-m l" data-i="${x.i}">${esc(x.t)}</button>`).join('')}</div>
        <div>${Rr.map((x) => `<button class="zh-m r" data-i="${x.i}">${esc(x.t)}</button>`).join('')}</div></div>
        <div class="zh-res" data-res></div><div class="zh-act"></div>`;
      $$('.zh-m.l', card).forEach((b) => b.onclick = () => { if (b.disabled) return; $$('.zh-m.l', card).forEach((x) => x.classList.remove('sel')); b.classList.add('sel'); selL = +b.dataset.i; });
      $$('.zh-m.r', card).forEach((b) => b.onclick = () => {
        if (b.disabled || selL == null) { if (selL == null) TM.toast('Előbb bal oldalt válassz!'); return; }
        const lb = $(`.zh-m.l[data-i="${selL}"]`, card);
        if (+b.dataset.i === selL) {
          done++; const col = `hsl(${(done * 67) % 360} 70% 45%)`;
          [lb, b].forEach((x) => { x.disabled = true; x.classList.remove('sel'); x.classList.add('paired'); x.style.setProperty('--pc', col); });
          selL = null;
          if (done === it.pairs.length) {
            const ok = mistakes === 0; score(ok, it);
            $('[data-res]', card).innerHTML = `<b class="${ok ? 'ok' : 'bad'}">${ok ? '✔ Hibátlan!' : `Kész, ${mistakes} hibával — ez visszajön még.`}</b>`;
            $('.zh-act', card).innerHTML = nextBtn(); $('[data-next]', card).onclick = render;
          }
        } else { mistakes++; b.classList.add('wrong'); setTimeout(() => b.classList.remove('wrong'), 450); }
      });
    }

    /* Kifejtős mini: fejben válaszolsz, felfeded, megjelölöd. */
    function renderRecall(it) {
      card.innerHTML = `<div class="zh-type">Kifejtős <small>válaszolj fejben (vagy hangosan), aztán nézd meg</small></div><div class="zh-q">${esc(it.q)}</div>
        <div class="zh-ans" data-ans hidden>${esc(it.a).replace(/\n/g, '<br>')}</div>
        <div class="zh-act"><button class="btn btn-fire" data-show>Mutasd a választ</button></div>`;
      $('[data-show]', card).onclick = () => {
        $('[data-ans]', card).hidden = false;
        $('.zh-act', card).innerHTML = '<button class="btn btn-ghost zh-no" data-no>✗ Nem tudtam</button><button class="btn btn-fire" data-yes>✔ Tudtam</button>';
        $('[data-yes]', card).onclick = () => { score(true, it); render(); };
        $('[data-no]', card).onclick = () => { score(false, it); render(); };
      };
    }

    $$('[data-m]', view).forEach((b) => b.onclick = () => { mode = b.dataset.m; $$('[data-m]', view).forEach((x) => x.classList.toggle('on', x === b)); build(); render(); });
    build(); render();
    return () => {};
  };
})();
