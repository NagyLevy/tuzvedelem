/* 1. lecke — Égéselmélet (forrás: 2. ÉGÉSELMÉLET.pdf, Dr. habil. Kuti Rajmund; tesztkérdés-bank; ZH-minták) */
(function () {
  'use strict';
  const TM = window.TM;
  const { h, $, $$, clamp, lerp } = TM;

  const sec = (id, ch, no, title, lead, inner, cls = '') => `
    <section class="section ${cls}" id="${id}" data-ch="${ch}"><div class="wrap">
      <p class="eyebrow reveal"><span class="num">${no}</span> ${ch}</p>
      <h2 class="h-sec word-rise">${title}</h2>
      ${lead ? `<p class="lead reveal">${lead}</p>` : ''}
      ${inner}
    </div></section>`;
  const def = (lbl, html) => `<div class="def reveal"><div class="lbl">${lbl}</div>${html}</div>`;
  const note = (html, kind = '') => `<div class="note ${kind} reveal"><i>${kind === 'danger' ? '!' : kind === 'warn' ? '★' : 'i'}</i><div>${html}</div></div>`;

  /* Hőszín: 0 = hideg (kék), 1 = forró (fehér-sárga) */
  const heatColor = (t, a = 1) => {
    t = clamp(t, 0, 1);
    const stops = [[0, 60, 120, 255], [0.35, 140, 60, 200], [0.55, 230, 50, 30], [0.75, 255, 140, 20], [1, 255, 240, 180]];
    let i = 0; while (i < stops.length - 2 && t > stops[i + 1][0]) i++;
    const [t0, r0, g0, b0] = stops[i], [t1, r1, g1, b1] = stops[i + 1];
    const k = (t - t0) / (t1 - t0);
    return `rgba(${lerp(r0, r1, k) | 0},${lerp(g0, g1, k) | 0},${lerp(b0, b1, k) | 0},${a})`;
  };

  const lesson = {
    no: 1,
    id: 'egeselmelet',
    title: 'Égéselmélet',
    short: 'Égéselmélet',
    heroTitle: '<span class="fire-text">Égés</span>elmélet.',
    intro: 'Mi a <b>hő</b>, hogyan <b>terjed</b>, mi kell ahhoz, hogy valami <b>égjen</b> — és mitől lesz az égésből <b>tűz</b>. Minden, ami a ZH első feladataihoz kell.',
    meta: ['9 fejezet', '≈ 30 perc', 'Forrás: 2. diasor (Kuti R.)'],
    chapters: ['hotan', 'gyujtas', 'hoatadas', 'eges', 'oxigen', 'fajtak', 'halmaz', 'tuz', 'lang'],

    render(root) {
      root.innerHTML = [
        /* ---------- 1. Hőtani alapfogalmak ---------- */
        sec('hotan', 'Hőtani alapfogalmak', 1, 'Minden a <span class="fire-text">hővel</span> kezdődik.',
          'Az égés hőt termel, és hő kell az elindításához is. Ezért a diasor a hőtani alapfogalmakkal indít — és a ZH is.',
          def('Hő', 'A <mark>hő</mark> az energia egyik fajtája, melyet <mark>hőforrás</mark> biztosít.') +
          def('Hőforrás', 'Hőforrásnak nevezünk <mark>minden olyan forrást, ahonnan hőenergia szabadul fel</mark>. Hőforrás lehet minden <mark>magasabb hőmérsékletű test</mark> is, mindaddig, amíg <mark>hőmérséklet-különbség</mark> áll fenn a test és a környezete hőmérséklete között.') +
          note('A tesztes ZH-n: „Melyik állítás igaz a hőforrásra?” — a jó válasz: <b>minden olyan forrás, ahonnan hőenergia szabadul fel</b>. Ami „csak” szót tartalmaz (csak elektromos, csak égés, csak kémiai), az csapda.', 'warn') +
          `<div class="grid-2 reveal" style="margin-top:48px">
            <div class="card"><span class="tag">Hőmérséklet</span><div class="big">T <span class="dim" style="font-size:.5em">[K]</span></div>
              <p>A testek azon állapota, amely a <b>hőérzetet</b> kelti. SI-mértékegysége a <b>Kelvin (K)</b>, mérése <b>hőmérővel</b> (thermométer) történik.</p></div>
            <div class="card"><span class="tag">Hőmennyiség</span><div class="big">Q <span class="dim" style="font-size:.5em">[J]</span></div>
              <p>A termikus energiacsere jellemzésére szolgál. Valamely test hőmérsékletének megváltozását az általa <b>felvett vagy leadott hőmennyiség</b> okozza. Függ: <b>T</b>, <b>m</b> és az <b>anyagminőség</b>.</p></div>
          </div>` +
          def('Hőmérséklet', 'A testek azon állapotát, amely a <mark>hőérzetet</mark> kelti, <mark>hőmérsékletnek</mark> nevezzük.') +
          def('Hőmennyiség', 'Valamely test hőmérsékletének megváltozását az általa <mark>felvett, vagy leadott hőmennyiség</mark> okozza. A hőmennyiség a termikus energiacsere jellemzésére szolgáló fizikai mennyiség, jele: <mark>Q</mark>, mértékegysége: <mark>Joule (J)</mark>.') +
          `<div class="stage reveal"><div class="stage-body calc">
              <canvas class="beaker" aria-label="Melegedő anyag animáció"></canvas>
              <div>
                <div class="seg" data-mat>
                  <button class="on" data-c="4186" data-n="víz">Víz</button><button data-c="900" data-n="alumínium">Alumínium</button><button data-c="450" data-n="vas">Vas</button><button data-c="1700" data-n="fa">Fa</button>
                </div>
                <label>Tömeg (m) <b data-o="m">1,0 kg</b></label><input class="range" type="range" min="0.1" max="10" step="0.1" value="1" data-in="m" aria-label="Tömeg">
                <label>Hőmérséklet-emelkedés (ΔT) <b data-o="dt">20 K</b></label><input class="range" type="range" min="1" max="100" step="1" value="20" data-in="dt" aria-label="Hőmérséklet-emelkedés">
                <div style="margin-top:26px" class="formula">Q = c · m · ΔT</div>
                <div class="formula" style="margin-top:6px"><em data-o="q">83,7 kJ</em></div>
                <p class="muted" style="font-size:14px;margin:12px 0 0" data-o="cmt"></p>
              </div>
            </div>
            <div class="stage-cap"><span>Próbáld ki: ugyanannyi hő a vasat sokkal jobban felmelegíti, mint a vizet.</span><span>c = fajlagos hőkapacitás</span></div>
          </div>` +
          note('A <b>Q = c·m·ΔT</b> képlet a diákon nincs kiírva, de a fajlagos hőkapacitás definíciójából következik — megértéshez kell, a ZH a definíciókat kéri. Az anyagértékek kerekítettek (kiegészítés).') +
          def('Fajlagos hőkapacitás', 'Az anyag minőségére jellemző <mark>állandó</mark>, mely annak a hőmennyiségnek a számértékét jelöli, mely <mark>1 kg</mark> tömegű anyag hőmérsékletének <mark>1 K-nel</mark>, azaz 1 °C-kal történő növeléséhez szükséges. Jele: <mark>c</mark>. Mértékegysége: <mark>J/kg·K</mark>.') +
          def('Égéshő', 'Az égéshő az a hőenergia-mennyiség, amely <mark>1 kg</mark> szilárd, illetve cseppfolyós, vagy <mark>1 m³</mark> gáz halmazállapotú, <mark>293 K</mark> hőmérsékletű anyag <mark>tökéletes égése</mark> során felszabadul. Jele: <mark>Hf</mark>. Mértékegysége: <mark>J/kg</mark>.')
        ),

        /* ---------- 2. Gyulladási hőmérséklet és lobbanáspont ---------- */
        sec('gyujtas', 'Gyulladás vagy lobbanás?', 2, 'Meggyullad. <span class="fire-text">De ég is?</span>',
          'Két fogalom, amit mindenki összekever — a ZH pedig pont erre kérdez rá. A különbség egyetlen kérdés: <b>ég-e tovább, ha elveszed a gyufát?</b>',
          `<div class="stage dark reveal"><div class="stage-body" style="padding-bottom:10px">
              <div class="o2">
                <canvas class="o2-canvas" data-ign aria-label="Gyújtópróba animáció"></canvas>
                <div>
                  <div class="o2-read" data-o="t">20<small>°C</small></div>
                  <p style="color:#a1a1a6;margin:6px 0 0">a folyadék hőmérséklete</p>
                  <div class="o2-scale"><input class="range" type="range" min="10" max="80" step="1" value="20" data-in="t" aria-label="Folyadék hőmérséklete">
                    <div class="o2-ticks"><span>10</span><span style="color:#ffb340">lobbanáspont 35</span><span style="color:#ff6a3d">gyulladási 55</span><span>80</span></div></div>
                  <div class="mini-cta"><button class="btn btn-fire" data-match>Gyufa odatartása</button><button class="btn btn-ghost" data-reset style="background:rgba(255,255,255,.1);color:#fff">Lehűtés</button></div>
                  <div class="tri-status burn" data-o="st" style="margin-top:18px">Kevés a gőz — a gyufa sem tudja meggyújtani.</div>
                </div>
              </div></div>
            <div class="stage-cap"><span>1) Melegítsd 35 °C fölé, tartsd oda a gyufát, aztán vedd el. 2) Ismételd 55 °C fölött.</span><span>Szemléltető értékek</span></div>
          </div>` +
          def('Lobbanáspont', 'A lobbanáspont az a <mark>legalacsonyabb hőmérséklet</mark>, amelynél a folyadék annyi gázt (gőzt) képez, hogy <mark>nyílt lánggal meggyújtható</mark>, de a gyújtóforrás elvétele után <mark>önálló égésre még nem képes</mark>.') +
          def('Gyulladási hőmérséklet', 'Az a hőmérséklet, melynek elérésekor az adott anyag az <mark>iniciáló gyújtóforrás elvétele után önállóan ég</mark>, a folyamat <mark>önfenntartóvá</mark> válik.') +
          note('Memóriatrükk: <b>LOBBAN</b> = egy pillanatra fellobban, aztán kialszik. <b>GYULLAD</b> = begyullad és magától ég tovább. A lobbanáspont mindig <b>alacsonyabb</b>.', 'warn')
        ),

        /* ---------- 3. Hőátadási formák ---------- */
        sec('hoatadas', 'Hőátadási formák', 3, 'Három út. <span class="fire-text">Egy hő.</span>',
          'A ZH kifejtős kérdése szó szerint: <b>„Határozza meg a hőátadás formáit!”</b> — vezetés, áramlás, sugárzás. Kapcsolgass közöttük, és figyeld, mi mozog és mi nem.',
          `<div class="stage dark reveal">
            <div class="stage-body" style="padding-bottom:0">
              <div class="seg" data-heat><button class="on" data-m="cond">Hővezetés · kondukció</button><button data-m="conv">Hőáramlás · konvekció</button><button data-m="rad">Hősugárzás · radiáció</button></div>
              <canvas class="heat-canvas" style="margin-top:14px" aria-label="Hőátadás animáció"></canvas>
            </div>
            <div class="stage-body" style="padding-top:8px"><div class="heat-info" data-hinfo></div></div>
          </div>` +
          def('Hővezetés (kondukció)', 'Hő az anyagon belül a <mark>melegebb helyről a hidegebb felé</mark> terjed, <mark>anyagáramlás nem jön létre</mark>, az anyagban a molekulák/atomok rendezett mozgást nem végeznek; a hő a testben <mark>részecskéről részecskére</mark> terjed anélkül, hogy a közeg vándorolna. Anyaghoz kötött — <mark>légüres térben nem jöhet létre</mark>. Jó hővezetők: fémek; rossz hővezetők (jó hőszigetelők): fa, porcelán.') +
          def('Hőáramlás (konvekció)', '<mark>Folyadékokra és gázokra</mark> jellemző hőátadási forma, a hőenergiát a <mark>közeg részecskéi viszik magukkal</mark>, <mark>anyagáramlással</mark> járó energiatranszport; a folyamat a <mark>teljes hőkiegyenlítődésig</mark> tart. Nemcsak hőenergiát, hanem <mark>égésterméket is képes szállítani</mark>.') +
          def('Hősugárzás (radiáció)', 'Tulajdonképpen <mark>elektromágneses sugárzás</mark>, közvetítő közegként <mark>anyag nem szükséges</mark>, a testek közötti tér <mark>észrevehetően nem melegszik fel</mark>. A kibocsátott energia rohamosan nő a hőmérséklettel; a <mark>fekete, durva</mark> felületek több energiát nyelnek el és sugároznak ki, mint a fényes, simák. A kisugárzott energia visszaverődik, elnyelődik, áteresztődik.') +
          note('A tesztbankban a „légáramlás” is szerepel: a tüzet körülvevő hűvösebb levegő és a felhevült, égéstermékkel szennyezett levegő <b>sűrűségkülönbségének</b> hatására létrejövő áramlás — ez a konvekció a tűzben.')
        ),

        /* ---------- 4. Az égés és feltételei ---------- */
        sec('eges', 'Az égés feltételei', 4, 'Három feltétel. <span class="fire-text">Egy időben.</span>',
          '',
          def('Égés', 'Égésnek azt a <mark>kémiai folyamatot</mark> nevezzük, melynek során az éghető anyag <mark>megfelelő hőmérsékleten</mark> a levegő <mark>oxigénjével egyesül</mark>, <mark>hő</mark> és legtöbb esetben <mark>fény</mark> formájában energiát szolgáltat.') +
          `<div class="stage dark reveal" style="margin-top:40px"><div class="stage-body tri-wrap">
            <div class="tri" style="position:relative">
              <svg viewBox="0 0 600 540" aria-label="Tűzháromszög">
                <defs><filter id="softglow"><feGaussianBlur stdDeviation="6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
                <g class="side" data-s="fuel"><line class="hit" x1="300" y1="40" x2="60" y2="480"/><line class="edge" x1="300" y1="40" x2="60" y2="480" stroke="#ffb340" stroke-dasharray="510" stroke-dashoffset="0" filter="url(#softglow)"/>
                  <text x="150" y="250" fill="#ffb340" transform="rotate(-61 150 250)" text-anchor="middle">ÉGHETŐ ANYAG</text></g>
                <g class="side" data-s="o2"><line class="hit" x1="300" y1="40" x2="540" y2="480"/><line class="edge" x1="300" y1="40" x2="540" y2="480" stroke="#3ea2ff" stroke-dasharray="510" stroke-dashoffset="0" filter="url(#softglow)"/>
                  <text x="450" y="250" fill="#3ea2ff" transform="rotate(61 450 250)" text-anchor="middle">OXIGÉN (O₂)</text></g>
                <g class="side" data-s="heat"><line class="hit" x1="60" y1="480" x2="540" y2="480"/><line class="edge" x1="60" y1="480" x2="540" y2="480" stroke="#ff5a1f" stroke-dasharray="510" stroke-dashoffset="0" filter="url(#softglow)"/>
                  <text x="300" y="520" fill="#ff5a1f" text-anchor="middle">GYÚJTÓFORRÁS / HŐ</text></g>
              </svg>
              <canvas data-tri style="position:absolute;left:22%;top:28%;width:56%;height:62%;pointer-events:none"></canvas>
            </div>
            <div class="tri-panel">
              <h3>Vedd el bármelyiket.</h3>
              <p>Kattints egy oldalra vagy gombra. Ha egy feltétel hiányzik, az égés megszűnik — ebből jön a három oltási mód.</p>
              <div class="tri-btns">
                <button class="tri-btn" data-s="fuel"><span class="dot" style="background:#ffb340">É.a.</span><span>Éghető anyag<small>oltás: az éghető anyag eltávolítása</small></span></button>
                <button class="tri-btn" data-s="o2"><span class="dot" style="background:#3ea2ff">O₂</span><span>Oxigén<small>oltás: az oxigén elvonása (fojtás)</small></span></button>
                <button class="tri-btn" data-s="heat"><span class="dot" style="background:#ff5a1f">Gy.h.</span><span>Gyújtóforrás, megfelelő hőmérséklet<small>oltás: az éghető anyag hűtése</small></span></button>
              </div>
              <div class="tri-status burn" data-o="tri">Mindhárom feltétel megvan, azonos térben és időben → <b>ÉG</b>.</div>
            </div>
          </div>
          <div class="stage-cap"><span>A feltételeknek <b style="color:#fff">azonos térben és időben</b> kell rendelkezésre állniuk.</span><span>2. diasor, 13. dia</span></div></div>` +
          def('Az égés feltételei', '<mark>Éghető anyag</mark>, <mark>oxigén</mark> és <mark>gyújtóforrás</mark> (megfelelő hőmérséklet / gyújtási energia) — amelyek <mark>azonos térben és időben</mark> állnak rendelkezésre.') +
          def('Oltási módok', 'Az égéshez szükséges három feltétel alapján megkülönböztethető oltási módok: – az <mark>éghető anyag eltávolítása</mark>; – az <mark>oxigén elvonása</mark>; – az éghető anyag hőmérsékletének <mark>hűtése</mark>.') +
          `<div class="axis"><h3 class="reveal">Éghetőség szerint az anyag lehet…</h3><div class="grid-3">
            <div class="card reveal"><span class="tag" style="background:rgba(255,90,31,.14);color:var(--flame)">Éghető</span><h3>Ég tovább</h3><p>Gyújtóforrás hatására meggyullad, a gyújtóforrás eltávolítása után <b>önálló égésre képes</b>.</p></div>
            <div class="card reveal" style="--d:.08s"><span class="tag" style="background:rgba(255,159,10,.16);color:#c77700">Nehezen éghető</span><h3>Magától kialszik</h3><p>A gyújtóforrás eltávolítása után <b>önállóan nem ég</b>.</p></div>
            <div class="card reveal" style="--d:.16s"><span class="tag" style="background:rgba(31,157,85,.14);color:var(--safe)">Nem éghető</span><h3>Meg sem gyullad</h3><p>Gyújtóforrás hatására <b>sem gyullad meg</b>.</p></div>
          </div></div>` +
          `<div class="axis"><h3 class="reveal">Gyújtóforrás: nem csak a hőmérséklet számít</h3><p class="reveal" style="color:var(--ink-2);max-width:760px;margin:0">A gyulladási hőmérséklet (gyújtó energia) az éghető anyagtól függő hőmennyiség, energiaközlés. A gyulladási folyamat időbeli lefolyása függ a <b>gyújtási energia intenzitásától és nagyságától</b>.</p></div>`
        ),

        /* ---------- 5. Oxigén ---------- */
        sec('oxigen', 'Oxigén és égésforma', 5, '21% van. <span class="cool-text">14% alatt vége.</span>',
          'A levegő oxigéntartalma dönti el, hogy az égés tökéletes, tökéletlen, vagy megszűnik. Ez az egyik legbiztosabb ZH-kérdés — húzd a csúszkát.',
          `<div class="card reveal" style="margin-top:40px"><span class="tag">A levegő összetétele</span>
            <div style="display:flex;height:46px;border-radius:12px;overflow:hidden;margin:6px 0 12px;font-weight:700;font-size:14px;color:#fff" data-air>
              <div style="width:0;background:var(--grad-cool);display:grid;place-items:center;transition:width 1.4s var(--ease)" data-w="21">21% O₂</div>
              <div style="width:0;background:#6e6e73;display:grid;place-items:center;transition:width 1.4s var(--ease) .15s" data-w="78">78% N₂</div>
              <div style="width:0;background:#c7c7cc;transition:width 1.4s var(--ease) .3s" data-w="1"></div>
            </div><p>21% oxigén · 78% nitrogén · 1% egyéb (argon, CO₂ …)</p></div>` +
          `<div class="stage dark reveal"><div class="stage-body o2">
              <canvas class="o2-canvas" data-o2c aria-label="Láng az oxigéntartalom függvényében"></canvas>
              <div>
                <div class="o2-read" data-o="o2">21<small>tf% O₂</small></div>
                <div class="o2-scale">
                  <div class="o2-bands"><i style="width:${(4 / 11) * 100}%;background:#3a3a3c"></i><i style="width:${(4 / 11) * 100}%;background:#ff9f0a"></i><i style="width:${(3 / 11) * 100}%;background:#ff5a1f"></i></div>
                  <input class="range" type="range" min="10" max="21" step="0.5" value="21" data-in="o2" aria-label="Oxigéntartalom">
                  <div class="o2-ticks"><span>10%</span><span>14%</span><span>18%</span><span>21%</span></div>
                </div>
                <div class="o2-verdict"><div><small>Égésforma</small><b data-o="form">Tökéletes</b></div><div><small>Égéstermék</small><b data-o="prod">CO₂</b></div></div>
              </div></div>
            <div class="stage-cap"><span>18% felett tökéletes · 14–18% tökéletlen (szúróláng) · 14% alatt megszűnik</span><span>2. diasor, 15. dia</span></div></div>` +
          `<div class="stage reveal"><div class="stage-body" style="padding:0">
            <table style="width:100%;border-collapse:collapse;font-size:17px" class="o2tab">
              <tr style="color:var(--ink-3);font-size:13px;text-align:left"><th style="padding:16px 24px">O₂-tartalom</th><th>Égésforma</th><th>Égéstermék</th></tr>
              <tr style="border-top:1px solid var(--hair)"><td style="padding:16px 24px"><b>18% felett</b></td><td>Tökéletes</td><td><b style="color:var(--flame)">CO₂</b></td></tr>
              <tr style="border-top:1px solid var(--hair)"><td style="padding:16px 24px"><b>14–18%</b></td><td>Tökéletlen</td><td><b style="color:var(--warn)">CO</b> <span class="muted">(szúróláng)</span></td></tr>
              <tr style="border-top:1px solid var(--hair)"><td style="padding:16px 24px"><b>14% alatt</b></td><td>Megszűnik</td><td class="muted">—</td></tr>
            </table></div></div>` +
          note('ZH „A” csoport, 2. feladat: <i>a) 13 tf% → tökéletes, CO₂; b) 16 tf% → tökéletlen, CO; c) 20 tf% → tökéletes, CO.</i> A helyes: <b>b)</b>. Az a) rossz, mert 13% alatt nincs égés; a c) rossz, mert tökéletes égésnél CO₂ keletkezik.', 'warn')
        ),

        /* ---------- 6. Az égés fajtái ---------- */
        sec('fajtak', 'Az égés fajtái', 6, 'Gyors, lassú, <span class="fire-text">robbanásszerű.</span>',
          'Az égéseket három szempont szerint csoportosítjuk: az <b>oxidáció sebessége</b>, a <b>végtermék</b>, és az, hogy az éghető anyag <b>hogyan keveredik</b> az oxigénnel.',
          `<div class="axis"><h3 class="reveal">1 · Az oxidáció sebessége alapján</h3><div class="pair">
            <div class="kind reveal"><canvas data-k="fast"></canvas><div class="kb"><small>Gyors égés</small><h3>Fény és hő</h3><p>Jellemzője a <b style="color:#fff">fényjelenség</b>, gyors hőmérséklet-emelkedés.</p></div></div>
            <div class="kind reveal" style="--d:.08s"><canvas data-k="slow"></canvas><div class="kb"><small>Lassú égés</small><h3>Csendes rozsda</h3><p><b style="color:#fff">Fényjelenség nélkül</b>, kicsi hőmérséklet-emelkedés (pl. <b style="color:#fff">korrózió</b>).</p></div></div>
          </div></div>` +
          `<div class="axis"><h3 class="reveal">2 · A végtermék tekintetében</h3><div class="pair">
            <div class="card reveal"><span class="tag" style="background:rgba(255,90,31,.14);color:var(--flame)">Tökéletes égés</span>
              <svg viewBox="0 0 220 80" style="width:200px;margin:4px 0 10px"><g class="mol"><circle cx="50" cy="40" r="20" fill="#e5251b"/><circle cx="110" cy="40" r="24" fill="#2c2c2e"/><circle cx="170" cy="40" r="20" fill="#e5251b"/><text x="110" y="46" fill="#fff" font-size="16" font-weight="700" text-anchor="middle">C</text><text x="50" y="46" fill="#fff" font-size="15" font-weight="700" text-anchor="middle">O</text><text x="170" y="46" fill="#fff" font-size="15" font-weight="700" text-anchor="middle">O</text></g></svg>
              <h3>CO₂ — elfogyott, ami éghet</h3><p>Elegendő oxigén jelenlétében megy végbe, a végtermék <b>nem tartalmaz további éghető anyagot</b>.</p></div>
            <div class="card reveal" style="--d:.08s"><span class="tag" style="background:rgba(255,159,10,.16);color:#c77700">Tökéletlen égés</span>
              <svg viewBox="0 0 220 80" style="width:200px;margin:4px 0 10px"><g class="mol"><circle cx="80" cy="40" r="24" fill="#2c2c2e"/><circle cx="140" cy="40" r="20" fill="#e5251b"/><text x="80" y="46" fill="#fff" font-size="16" font-weight="700" text-anchor="middle">C</text><text x="140" y="46" fill="#fff" font-size="15" font-weight="700" text-anchor="middle">O</text></g></svg>
              <h3>CO — még éghetne</h3><p><b>Nincs elegendő oxigén</b>, a végtermék <b>további éghető anyagot tartalmaz</b>.</p></div>
          </div>` + note('A szén-monoxid (CO) <b>0,4 tf% felett halálos</b>. Színtelen, szagtalan — ezért veszélyes a tökéletlen égés zárt térben.', 'danger') + `</div>` +
          `<div class="axis"><h3 class="reveal">3 · Az oxigénnel való keveredés szerint</h3></div>` +
          `<div class="kinds" style="margin-top:0">
            <div class="kind reveal"><canvas data-k="kin"></canvas><div class="kb"><small>Kinetikai égés</small><h3>Előre összekeveredett</h3><p>Az éghető gázok, gőzök a levegő oxigénjével a szükséges arányban <b style="color:#fff">még a begyulladás előtt összekeveredtek</b>; az égés (robbanás) során nagy hőfejlődés mellett <b style="color:#fff">rövid idő alatt nagy mennyiségű gáz</b> fejlődik.</p></div>
            <div class="kind reveal" style="--d:.08s"><canvas data-k="dif"></canvas><div class="kb"><small>Diffúz égés</small><h3>Égés közben keveredik</h3><p>Az éghető anyag bomlási gázai, gőzei a hő hatására változnak, és úgy égnek el, hogy <b style="color:#fff">az égés folyamán keverednek</b> a levegő oxigénjével. (Lassú folyamat, kisebb hőfejlődés.)</p></div>
            <div class="kind reveal" style="--d:.16s"><canvas data-k="izzo"></canvas><div class="kb"><small>Izzó égés</small><h3>Láng nélkül</h3><p>Az éghető anyag a bomlás során egyáltalán nem, vagy már nem tud kibocsátani éghető gázokat és gőzöket, ezért <b style="color:#fff">a lánggal égés nem jöhet létre</b>.</p></div>
          </div>` +
          def('Kinetikai égés', 'Ha az éghető gázok, gőzök a levegő oxigénjével a szükséges arányban <mark>még a begyulladás előtt összekeveredtek</mark>, égés (robbanás) során <mark>nagy hőfejlődés</mark> mellett <mark>rövid idő alatt nagy mennyiségű gáz</mark> fejlődik.') +
          def('Diffúz égés', 'Az éghető anyag bomlási gázai, gőzei a hő hatására változnak és úgy égnek el, hogy <mark>az égés folyamán keverednek</mark> a levegő oxigénjével. (<mark>Lassú folyamat kisebb hőfejlődéssel.</mark>)') +
          def('Izzó égés', 'Ha az éghető anyag a bomlás során egyáltalán nem, vagy már nem tud kibocsátani <mark>éghető gázokat és gőzöket</mark>, ezért a <mark>lánggal égés nem jöhet létre</mark>.')
        ),

        /* ---------- 7. Halmazállapot ---------- */
        sec('halmaz', 'Halmazállapot és éghetőség', 7, 'Valójában <span class="fire-text">a gőz ég.</span>',
          'A fa nem „úgy ahogy van” ég: előbb a hő gázokat, gőzöket bont ki belőle, és <b>azok</b> gyulladnak meg. Ezért van a lángnak távolsága az anyag felszínétől.',
          `<div class="stage dark reveal"><div class="stage-body"><div class="phase">
            <div><canvas data-ph="0"></canvas><b>1. Hő éri</b><span>a szilárd / folyékony anyag melegszik</span></div>
            <div><canvas data-ph="1"></canvas><b>2. Gázzá, gőzzé alakul</b><span>bomlás, párolgás</span></div>
            <div><canvas data-ph="2"></canvas><b>3. A gőz meggyullad</b><span>láng a gőzfelhőben</span></div>
          </div></div></div>` +
          def('Halmazállapot és éghetőség', 'A legtöbb esetben <mark>csak a gőz-halmazállapotú anyagok képesek égni</mark>. A kondenzált halmazállapotú anyagokat (szilárd, folyadék) <mark>gázállapotba kell juttatni</mark>, mielőtt a gyulladás és égés bekövetkezhet.')
        ),

        /* ---------- 8. Mi a tűz? ---------- */
        sec('tuz', 'Mi a tűz?', 8, 'Égés, ami <span class="fire-text">elszabadult.</span>',
          'Minden tűz égés — de nem minden égés tűz. A gyertya ég; ha a függönyt is elkapja, abból tűz lesz.',
          def('Tűz (diasor)', 'Tűzről akkor beszélünk, amikor a kémiai folyamat (égés) során <mark>lángképződést</mark>, illetve <mark>parázslást</mark> és <mark>intenzív hőmennyiség</mark> keletkezését észleljük.') +
          def('Tűz (tesztbank)', 'Tűz az <mark>anyagi javak pusztulásával</mark>, az <mark>emberi élet, egészség veszélyeztetésével</mark> járó, az ember által <mark>nem kívánt</mark>, időben és térben <mark>nem korlátozott</mark> és <mark>nem ellenőrzött</mark> égési folyamat.') +
          `<div class="grid-3" style="margin-top:48px">
            <div class="card reveal"><span class="tag">A tűz környezetétől függően</span><h3>Zárt · Nyílt</h3><p><b>Zárt tűz</b>: épületen, helyiségen belül. <b>Nyílt tűz</b>: szabadtéren.</p></div>
            <div class="card reveal" style="--d:.08s"><span class="tag">A tűz fejlődése szempontjából</span><h3>Terjedő · Nem terjedő</h3><p>Terjed-e a tűz a környező éghető anyagokra, vagy helyben marad.</p></div>
            <div class="card reveal" style="--d:.16s"><span class="tag">A tűz nagysága szerint</span><h3>Kis · Közepes · Nagy</h3><p>A területet és az okozott kárt is figyelembe véve.</p></div>
          </div>` +
          note('Tipikus tesztcsapda: ugyanaz a 4 válasz (terjedő, zárt, nyílt, nem terjedő) mindkét kérdésnél. <b>Környezet → zárt, nyílt</b>. <b>Fejlődés → terjedő, nem terjedő</b>.', 'warn') +
          `<div class="stage reveal"><div class="stage-body">
            <div style="display:flex;align-items:flex-end;gap:clamp(16px,4vw,48px);flex-wrap:wrap" data-area>
              <div style="text-align:center"><div class="sq" style="width:32px;height:32px;border-radius:6px;background:var(--grad-fire);margin:0 auto;transform:scale(0);transition:transform 1s var(--spring)"></div><b style="display:block;margin-top:12px">Kis tűz</b><span class="muted" style="font-size:14px">100 m² alatt</span></div>
              <div style="text-align:center"><div class="sq" style="width:100px;height:100px;border-radius:12px;background:var(--grad-fire);margin:0 auto;transform:scale(0);transition:transform 1s var(--spring) .15s"></div><b style="display:block;margin-top:12px">Közepes tűz</b><span class="muted" style="font-size:14px">100–1000 m²</span></div>
              <div style="text-align:center"><div class="sq" style="width:180px;height:180px;border-radius:18px;background:linear-gradient(135deg,#e5251b,#ff5a1f 60%,#ffb340);margin:0 auto;transform:scale(0);transition:transform 1s var(--spring) .3s;box-shadow:0 20px 60px rgba(255,90,31,.4)"></div><b style="display:block;margin-top:12px">Nagy tűz</b><span class="muted" style="font-size:14px">1000 m² felett</span></div>
            </div></div>
            <div class="stage-cap"><span>A négyzetek területe arányos (√-skála szerint szemléltetve).</span><span>3. diasor, 5. dia</span></div></div>`
        ),

        /* ---------- 9. A láng szerkezete ---------- */
        sec('lang', 'A láng szerkezete', 9, 'Egy gyufaláng <span class="fire-text">anatómiája.</span>',
          'A láng nem egyforma: három zónája van, és a hőmérséklet sem a közepén a legnagyobb. Vidd az egeret a zónákra.',
          `<div class="stage dark reveal"><div class="stage-body flame-anat">
            <svg viewBox="0 0 440 560" aria-label="A láng zónái">
              <defs>
                <radialGradient id="z3" cx="50%" cy="70%" r="70%"><stop offset="0" stop-color="#ff9f0a" stop-opacity=".9"/><stop offset=".7" stop-color="#ff4d1a" stop-opacity=".75"/><stop offset="1" stop-color="#e5251b" stop-opacity=".2"/></radialGradient>
                <radialGradient id="z2" cx="50%" cy="65%" r="65%"><stop offset="0" stop-color="#fffbe6"/><stop offset=".6" stop-color="#ffe27a"/><stop offset="1" stop-color="#ffb340"/></radialGradient>
                <radialGradient id="z1" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#7cc4ff"/><stop offset="1" stop-color="#1a5cff" stop-opacity=".2"/></radialGradient>
                <filter id="fblur"><feGaussianBlur stdDeviation="5"/></filter>
              </defs>
              <rect x="201" y="330" width="18" height="240" rx="3" fill="#c9a77a"/><rect x="201" y="330" width="18" height="240" rx="3" fill="url(#z1)" opacity=".0"/>
              <ellipse cx="210" cy="330" rx="16" ry="20" fill="#5a2a1a"/>
              <g class="flick">
                <path class="zpath" data-z="3" d="M210 30 C 250 110, 304 170, 304 252 C 304 322, 264 356, 210 356 C 156 356, 116 322, 116 252 C 116 170, 170 110, 210 30 Z" fill="url(#z3)" filter="url(#fblur)"/>
                <path d="M210 30 C 250 110, 304 170, 304 252 C 304 322, 264 356, 210 356 C 156 356, 116 322, 116 252 C 116 170, 170 110, 210 30 Z" fill="none" stroke="#e5251b" stroke-width="2" opacity=".85"/>
                <path class="zpath" data-z="2" d="M210 118 C 236 168, 264 206, 264 256 C 264 302, 242 326, 210 326 C 178 326, 156 302, 156 256 C 156 206, 184 168, 210 118 Z" fill="url(#z2)" filter="url(#fblur)"/>
                <ellipse class="zpath" data-z="1" cx="210" cy="322" rx="34" ry="22" fill="url(#z1)" filter="url(#fblur)"/>
              </g>
              <g class="pins" font-family="Inter, sans-serif">
                ${[[210, 36, 1540, 0], [262, 112, 1560, 1], [236, 190, 1550, 0], [180, 262, 1540, 0], [240, 304, 520, 0], [222, 330, 360, 0], [214, 352, 300, 0]].map(([x, y, t, hot], i) => {
                  const ly = 50 + i * 72; return `<g class="pin" style="opacity:0;transition:opacity .6s ${0.2 + i * 0.12}s"><circle cx="${x}" cy="${y}" r="4" fill="${hot ? '#ff3b1f' : '#fff'}"/><path d="M${x} ${y} L 330 ${ly} L 342 ${ly}" stroke="${hot ? '#ff3b1f' : 'rgba(255,255,255,.45)'}" fill="none" stroke-width="1.2"/><text class="temp-pin" x="348" y="${ly + 5}" fill="${hot ? '#ff6a3d' : '#f5f5f7'}">${t} °C${hot ? ' ◂ max' : ''}</text></g>`;
                }).join('')}
              </g>
            </svg>
            <div class="zone-list">
              <div class="zone" data-z="1"><span class="rn" style="background:#7cc4ff">I</span><div><b>Gőzök, gázok kilépése</b><span>Az éghető anyagból gőzök, gázok lépnek ki, a hőmérséklet alacsony.</span></div></div>
              <div class="zone" data-z="2"><span class="rn" style="background:#ffe27a">II</span><div><b>Bomlás, világító láng</b><span>Molekulák bomlása, O₂ korlátozott, hőmérséklet magas, elemi részek keletkeznek: fehér izzó, világító láng. Szénben gazdag anyagoknál korom.</span></div></div>
              <div class="zone" data-z="3"><span class="rn" style="background:#ff5a1f">III</span><div><b>Tökéletes égés</b><span>Itt ég el a H₂ és a CO; a hő a <b style="color:#fff">rétegvonalnál maximális</b> (≈ 1560 °C).</span></div></div>
            </div>
          </div><div class="stage-cap"><span>A legmelegebb pont nem a láng közepe, hanem a külső zóna határa.</span><span>2. diasor, 22–23. dia</span></div></div>`
        )
      ].join('');

      initCalc(root);
      initIgnition(root);
      initHeat(root);
      initTriangle(root);
      initO2(root);
      initKinds(root);
      initPhase(root);
      initArea(root);
      initFlame(root);
      return [];
    },

    /* ---------- Kvíz ---------- */
    quiz: [
      { type: 'mc', q: 'Melyik állítás igaz a hőforrásra?', opts: ['Csak elektromos energiát képes leadni', 'Minden olyan forrás, ahonnan hőenergia szabadul fel', 'Csak égési folyamatban jöhet létre', 'Csak kémiai reakció során keletkezik'], a: 1, fixed: true, why: 'Hőforrás <b>minden</b> olyan forrás, ahonnan hőenergia szabadul fel — akár egy melegebb test is, amíg hőmérséklet-különbség van.', src: 'tesztes ZH, 6. kérdés' },
      { type: 'mc', q: 'Válassza ki a helyes megoldást!', opts: ['13 tf% O₂ tartalom mellett az égés tökéletes, CO₂ gáz képződik.', '16 tf% O₂ tartalom mellett az égés tökéletlen, CO gáz képződik.', '20 tf% O₂ tartalom mellett tökéletes az égés, CO gáz fejlődik.'], a: 1, fixed: true, why: '14–18% között tökéletlen az égés és CO keletkezik. 13% alatt megszűnik az égés; tökéletes égésnél CO₂ keletkezik.', src: 'ZH „A”, 2. feladat' },
      { type: 'mc', q: 'Milyen anyag keletkezik tökéletes égés során?', opts: ['CO (szén-monoxid)', 'CO₂ (szén-dioxid)', 'H₂O₂ (hidrogén-peroxid)', 'CH₄ (metán)'], a: 1, fixed: true, why: '18% O₂ felett az égés tökéletes, és CO₂ keletkezik.', src: 'tesztes ZH, 8. kérdés' },
      { type: 'mc', q: 'Mi jellemzi a lobbanáspontot?', opts: ['Az a legalacsonyabb hőmérséklet, amelynél a folyadék önfenntartóan ég', 'Az a legalacsonyabb hőmérséklet, amelynél a folyadék gőze gyújtható, de nem ég önfenntartóan', 'Az a hőmérséklet, amelyen az anyag gyújtóforrás nélkül magától meggyullad', 'A láng legmagasabb hőmérséklete'], a: 1, fixed: true, why: 'Lobbanáspont: nyílt lánggal meggyújtható, de a gyújtóforrás elvétele után <b>önálló égésre még nem képes</b>. Az önfenntartó égés a gyulladási hőmérséklet.', src: 'tesztes ZH, 10. kérdés' },
      { type: 'cloze', text: 'A [hő] az energia egyik fajtája, melyet [hőforrás] biztosít.', why: 'Szó szerinti ZH-mondat a diasor 2. diájáról.', src: 'tesztbank' },
      { type: 'cloze', text: '[14] % oxigéntartalom alatt az égés megszűnik.', why: '14% alatt megszűnik, 14–18% tökéletlen, 18% felett tökéletes.', src: 'tesztbank' },
      { type: 'cloze', text: '[18]% oxigén tartalom felett az égés [tökéletes], [CO2|CO₂|szén-dioxid|szendioxid] keletkezik.', why: '18% felett: tökéletes égés, CO₂.', src: 'tesztbank' },
      { type: 'cloze', text: '14–18% oxigéntartalom mellett az égés [tökéletlen], [CO|szén-monoxid|szenmonoxid] keletkezik.', why: 'Ez a „szúróláng” tartomány.', src: 'tesztbank' },
      { type: 'cloze', text: 'Gyors égés: jellemzője a [fényjelenség|fény jelenség|fény], gyors hőmérséklet emelkedés.', why: 'Gyors égés = fényjelenség + gyors hőmérséklet-emelkedés.', src: 'tesztbank' },
      { type: 'cloze', text: 'Lassú égés: fényjelenség nélkül, kicsi hőmérséklet emelkedés ([korrózió|korrozio|rozsdásodás]).', why: 'A lassú égés példája a korrózió.', src: 'tesztbank' },
      { type: 'cloze', text: 'Égésnek azt a [kémiai] folyamatot nevezzük, melynek során az éghető anyag megfelelő hőmérsékleten a levegő [oxigénjével|oxigénnel] egyesül, hő és legtöbb esetben [fény] formájában energiát szolgáltat.', why: 'Ez a ZH „A” 3. feladatának első fele (az égés fogalma).', src: 'tesztbank, ZH „A” 3.' },
      { type: 'multi', q: 'A tűz környezetétől függően lehet:', opts: ['terjedő tűz', 'zárt tűz', 'nyílt tűz', 'nem terjedő tűz'], a: [1, 2], fixed: true, why: 'Környezet szerint: <b>zárt</b> és <b>nyílt</b>. A terjedő / nem terjedő a fejlődés szerinti felosztás.', src: 'tesztbank' },
      { type: 'multi', q: 'A tűz fejlődésének szempontjából lehet:', opts: ['nyílt tűz', 'nem terjedő tűz', 'zárt tűz', 'terjedő tűz'], a: [1, 3], fixed: true, why: 'Fejlődés szerint: <b>terjedő</b> és <b>nem terjedő</b>.', src: 'tesztbank' },
      { type: 'tf', q: 'A hővezetés (kondukció) légüres térben is létrejöhet.', a: false, why: 'A hővezetés anyaghoz kötött — légüres térben nem jöhet létre. Vákuumon csak a hősugárzás jut át.' },
      { type: 'tf', q: 'Hősugárzásnál a testek közötti tér észrevehetően nem melegszik fel.', a: true, why: 'A hősugárzás elektromágneses sugárzás, közvetítő közeg nem kell, a köztes tér nem melegszik fel észrevehetően.' },
      { type: 'mc', q: 'Melyik hőátadási forma jár anyagáramlással, és képes égésterméket is szállítani?', opts: ['Hővezetés (kondukció)', 'Hőáramlás (konvekció)', 'Hősugárzás (radiáció)'], a: 1, why: 'A konvekció folyadékokra és gázokra jellemző, a közeg részecskéi viszik a hőt — és az égésterméket is.' },
      { type: 'mc', q: 'Az égés három feltételén túl mi szükséges még az égéshez?', opts: ['Azonos térben és időben álljanak rendelkezésre', 'Legalább 21% oxigén', 'Zárt tér', 'Katalizátor jelenléte'], a: 0, why: 'Éghető anyag + oxigén + gyújtóforrás, <b>azonos térben és időben</b>.' },
      { type: 'mc', q: 'Melyik égésfajta: „az éghető gázok a levegő oxigénjével már a begyulladás előtt összekeveredtek, rövid idő alatt nagy mennyiségű gáz fejlődik”?', opts: ['Diffúz égés', 'Kinetikai égés', 'Izzó égés', 'Lassú égés'], a: 1, why: 'Kinetikai égés (robbanás): előre összekeveredett elegy.' },
      { type: 'mc', q: 'Mi az égéshő jele és mértékegysége?', opts: ['Hf, J/kg', 'Q, J', 'c, J/kg·K', 'T, K'], a: 0, why: 'Égéshő: Hf, J/kg (1 kg szilárd/folyékony vagy 1 m³ gáz, 293 K, tökéletes égés).' },
      { type: 'mc', q: 'A láng melyik zónájában ég el a H₂ és a CO?', opts: ['I. zóna', 'II. zóna', 'III. zóna'], a: 2, fixed: true, why: 'A III. zónában tökéletes az égés; a hő a rétegvonalnál maximális.' },
      { type: 'cloze', text: 'Tűzről akkor beszélünk, amikor a kémiai folyamat (égés) során [lángképződést], illetve [parázslást] és intenzív hőmennyiség keletkezését észleljük.', why: 'A diasor tűz-definíciója.' },
      { type: 'tf', q: 'A legtöbb esetben csak a gőz-halmazállapotú anyagok képesek égni.', a: true, why: 'A szilárd és folyékony anyagokat előbb gázállapotba kell juttatni.' },
      { type: 'mc', q: 'Mi a „nehezen éghető” anyag?', opts: ['Gyújtóforrás hatására sem gyullad meg', 'A gyújtóforrás eltávolítása után önállóan nem ég', 'Csak 18% oxigén felett ég', 'Önálló égésre képes'], a: 1, why: 'Nehezen éghető: meggyullad, de a gyújtóforrás eltávolítása után magától kialszik.' },
      { type: 'cloze', text: 'A fajlagos hőkapacitás jele: [c], mértékegysége: [J/kgK|J/kg K|J/kg·K|J/(kg·K)|J/kg*K].', why: 'c, J/kg·K — 1 kg anyag 1 K-nel való melegítéséhez szükséges hő.' },
      { type: 'mc', q: 'Hogyan nevezzük a gyújtóforrás elvétele után is önfenntartó égés kezdőhőmérsékletét?', opts: ['Lobbanáspont', 'Gyulladási hőmérséklet', 'Égéshő', 'Rétegvonal'], a: 1, why: 'Gyulladási hőmérséklet: a gyújtóforrás elvétele után önállóan ég, önfenntartóvá válik.' }
    ],

    cards: [
      { term: 'Hő', def: 'Az energia egyik <mark>fajtája</mark>, melyet <mark>hőforrás</mark> biztosít.' },
      { term: 'Hőforrás', def: 'Minden olyan forrás, ahonnan <mark>hőenergia szabadul fel</mark>. Lehet minden magasabb hőmérsékletű test is, amíg <mark>hőmérséklet-különbség</mark> áll fenn közte és a környezete között.' },
      { term: 'Hőmérséklet', def: 'A testek azon állapota, amely a <mark>hőérzetet</mark> kelti. SI: <mark>Kelvin (K)</mark>, mérése hőmérővel.' },
      { term: 'Hőmennyiség', def: 'A termikus energiacsere jellemzésére szolgáló fizikai mennyiség. Jele <mark>Q</mark>, mértékegysége <mark>Joule</mark>. Függ: T, m, anyagminőség.' },
      { term: 'Fajlagos hőkapacitás', def: '1 kg anyag hőmérsékletének 1 K-nel (1 °C-kal) történő növeléséhez szükséges hőmennyiség. Jele <mark>c</mark>, mértékegysége <mark>J/kg·K</mark>.' },
      { term: 'Égéshő', def: '1 kg szilárd/cseppfolyós vagy 1 m³ gáz, <mark>293 K</mark> hőmérsékletű anyag <mark>tökéletes égése</mark> során felszabaduló hő. Jele <mark>Hf</mark>, mértékegysége <mark>J/kg</mark>.' },
      { term: 'Gyulladási hőmérséklet', def: 'Az a hőmérséklet, melynek elérésekor az anyag az iniciáló gyújtóforrás <mark>elvétele után önállóan ég</mark>, a folyamat <mark>önfenntartóvá</mark> válik.' },
      { term: 'Lobbanáspont', def: 'A <mark>legalacsonyabb hőmérséklet</mark>, amelynél a folyadék annyi gázt képez, hogy nyílt lánggal <mark>meggyújtható</mark>, de a gyújtóforrás elvétele után <mark>önálló égésre még nem képes</mark>.' },
      { term: 'Hővezetés (kondukció)', def: 'Melegebbről hidegebb felé, <mark>anyagáramlás nélkül</mark>, részecskéről részecskére. Anyaghoz kötött, <mark>légüres térben nem jön létre</mark>. Jó vezető: fém; rossz: fa, porcelán.' },
      { term: 'Hőáramlás (konvekció)', def: '<mark>Folyadékokra és gázokra</mark> jellemző; a közeg részecskéi viszik a hőt, <mark>anyagáramlással</mark> jár, a teljes hőkiegyenlítődésig tart, <mark>égésterméket is szállít</mark>.' },
      { term: 'Hősugárzás (radiáció)', def: '<mark>Elektromágneses sugárzás</mark>, közvetítő anyag nem kell, a köztes tér <mark>nem melegszik fel</mark> észrevehetően. Fekete, durva felület többet nyel el és sugároz ki.' },
      { term: 'Égés', def: '<mark>Kémiai folyamat</mark>, melynek során az éghető anyag megfelelő hőmérsékleten a levegő <mark>oxigénjével egyesül</mark>, <mark>hő</mark> és legtöbbször <mark>fény</mark> formájában energiát szolgáltat.' },
      { term: 'Az égés feltételei', def: '<mark>Éghető anyag</mark> + <mark>oxigén</mark> + <mark>gyújtóforrás</mark> (megfelelő hőmérséklet), <mark>azonos térben és időben</mark>.' },
      { term: 'O₂ és égésforma', def: '<mark>18% felett</mark>: tökéletes, CO₂ · <mark>14–18%</mark>: tökéletlen, CO (szúróláng) · <mark>14% alatt</mark>: megszűnik. Levegő: 21% O₂, 78% N₂, 1% egyéb.' },
      { term: 'Tökéletes / tökéletlen égés', def: 'Tökéletes: <mark>elegendő oxigén</mark>, a végtermék nem tartalmaz további éghető anyagot. Tökéletlen: <mark>nincs elegendő oxigén</mark>, a végtermék további éghető anyagot tartalmaz. (CO 0,4 tf% felett halálos.)' },
      { term: 'Kinetikai · diffúz · izzó', def: 'Kinetikai: <mark>előre összekeveredett</mark> elegy, robbanás. Diffúz: <mark>égés közben keveredik</mark> az oxigénnel, lassú. Izzó: nincs éghető gáz/gőz, <mark>láng nélkül</mark> ég.' },
      { term: 'Tűz', def: 'Égés, amely során <mark>lángképződést</mark>, illetve <mark>parázslást</mark> és intenzív hőmennyiség keletkezését észleljük. (Tesztbank: nem kívánt, időben és térben nem korlátozott, nem ellenőrzött égési folyamat.)' },
      { term: 'A tűz osztályozása', def: 'Környezet: <mark>zárt, nyílt</mark>. Fejlődés: <mark>terjedő, nem terjedő</mark>. Nagyság: <mark>kis (100 m² alatt), közepes (100–1000 m²), nagy (1000 m² felett)</mark>.' },
      { term: 'A láng zónái', def: 'I: gőzök, gázok lépnek ki, alacsony hőmérséklet. II: bomlás, O₂ korlátozott, fehér izzó világító láng, korom. III: <mark>tökéletes égés</mark>, itt ég el a H₂ és a CO, a hő a <mark>rétegvonalnál maximális</mark>.' }
    ]
  };

  /* ================= Interaktív elemek ================= */

  function initCalc(root) {
    const cv = $('.beaker', root);
    const st = { c: 4186, n: 'víz', m: 1, dt: 20, shown: 0 };
    const fmt = (x, d = 1) => x.toLocaleString('hu-HU', { maximumFractionDigits: d, minimumFractionDigits: d });
    const upd = () => {
      const q = st.c * st.m * st.dt;
      $('[data-o="m"]', root).textContent = fmt(st.m) + ' kg';
      $('[data-o="dt"]', root).textContent = st.dt + ' K';
      $('[data-o="q"]', root).textContent = q >= 1e6 ? fmt(q / 1e6, 2) + ' MJ' : fmt(q / 1000) + ' kJ';
      const same = 100000 / (st.c * st.m);
      $('[data-o="cmt"]', root).textContent = `100 kJ hő ${fmt(st.m)} kg ${st.n} hőmérsékletét kb. ${fmt(same, 0)} K-nel emelné.`;
    };
    $$('[data-mat] button', root).forEach((b) => b.onclick = () => {
      $$('[data-mat] button', root).forEach((x) => x.classList.toggle('on', x === b));
      st.c = +b.dataset.c; st.n = b.dataset.n; upd();
    });
    $('[data-in="m"]', root).oninput = (e) => { st.m = +e.target.value; upd(); };
    $('[data-in="dt"]', root).oninput = (e) => { st.dt = +e.target.value; upd(); };
    upd();
    const mols = Array.from({ length: 70 }, () => ({ x: Math.random(), y: Math.random(), p: Math.random() * 7 }));
    TM.scene(cv, (g, w, hh, t, dt) => {
      g.clearRect(0, 0, w, hh);
      const heat = st.dt / 100;
      st.shown = lerp(st.shown, heat, Math.min(1, dt * 3));
      const H = st.shown;
      const bw = Math.min(w * 0.6, 260), bh = hh * 0.62, bx = (w - bw) / 2, by = hh * 0.12;
      // láng alul
      const fy = by + bh + 34;
      g.globalCompositeOperation = TM.isDark() ? 'lighter' : 'source-over';
      for (let i = 0; i < 9; i++) {
        const fx = bx + bw * (0.15 + i * 0.0875), fh = 14 + 18 * H + Math.sin(t * 12 + i) * 4;
        const gr = g.createLinearGradient(fx, fy, fx, fy - fh);
        gr.addColorStop(0, 'rgba(60,140,255,.9)'); gr.addColorStop(1, 'rgba(60,140,255,0)');
        g.fillStyle = gr; g.beginPath(); g.ellipse(fx, fy - fh / 2, 5, fh / 2, 0, 0, 7); g.fill();
      }
      g.globalCompositeOperation = 'source-over';
      // edény + tartalom
      const liq = g.createLinearGradient(0, by, 0, by + bh);
      liq.addColorStop(0, heatColor(0.15 + H * 0.65, 0.18)); liq.addColorStop(1, heatColor(0.2 + H * 0.75, 0.38));
      g.fillStyle = liq;
      g.beginPath(); g.roundRect(bx, by + bh * 0.12, bw, bh * 0.88, [0, 0, 18, 18]); g.fill();
      g.strokeStyle = TM.isDark() ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)'; g.lineWidth = 2;
      g.beginPath(); g.moveTo(bx, by); g.lineTo(bx, by + bh - 18); g.quadraticCurveTo(bx, by + bh, bx + 18, by + bh); g.lineTo(bx + bw - 18, by + bh); g.quadraticCurveTo(bx + bw, by + bh, bx + bw, by + bh - 18); g.lineTo(bx + bw, by); g.stroke();
      // molekulák: rezgés ~ hőmérséklet
      const amp = 1 + H * 9, sp = 6 + H * 30;
      for (const m of mols) {
        const x = bx + 12 + m.x * (bw - 24) + Math.sin(t * sp + m.p) * amp;
        const y = by + bh * 0.17 + m.y * (bh * 0.78) + Math.cos(t * sp * 1.1 + m.p * 2) * amp;
        g.fillStyle = heatColor(0.15 + H * 0.8, 0.9);
        g.beginPath(); g.arc(x, y, 4, 0, 7); g.fill();
      }
      // hőmérő
      const tx = bx + bw + 30, ty = by + 6, th = bh - 10;
      g.fillStyle = TM.isDark() ? 'rgba(255,255,255,.12)' : 'rgba(0,0,0,.08)';
      g.beginPath(); g.roundRect(tx - 5, ty, 10, th, 5); g.fill();
      g.fillStyle = heatColor(0.3 + H * 0.7);
      const lv = th * (0.12 + H * 0.85);
      g.beginPath(); g.roundRect(tx - 5, ty + th - lv, 10, lv, 5); g.fill();
      g.beginPath(); g.arc(tx, ty + th + 6, 11, 0, 7); g.fill();
    });
  }

  function initIgnition(root) {
    const cv = $('[data-ign]', root);
    const LP = 35, GY = 55;
    const st = { T: 20, match: false, burn: false, flash: 0, vapor: [], power: 0 };
    const fl = new TM.Flame({ w: 70, h: 120, rate: 260 });
    const btn = $('[data-match]', root), out = $('[data-o="st"]', root);
    const status = () => {
      let s, cls = 'burn';
      if (st.T < LP) s = st.match ? 'A gyufa ég, de <b>kevés a gőz</b> — a folyadék nem gyullad meg. (Lobbanáspont alatt.)' : 'Kevés a gőz — a gyufa sem tudja meggyújtani. Melegíts!';
      else if (st.T < GY) s = st.match ? '<b>LOBBANÁS!</b> A gőz meggyulladt — de csak amíg ott a gyújtóforrás. Most vedd el a gyufát!' : st.flash > 0 ? 'Kialudt, amint elvetted a gyufát. <b>Ez a lobbanáspont</b>: gyújtható, de nem ég önállóan.' : 'Már elég a gőz a lobbanáshoz. Tartsd oda a gyufát!';
      else s = st.burn && !st.match ? '<b>ÖNFENNTARTÓ ÉGÉS.</b> Elérted a gyulladási hőmérsékletet: gyufa nélkül is ég.' : st.burn ? 'Ég. Most vedd el a gyufát — vajon kialszik?' : 'Bőven van gőz. Tartsd oda a gyufát!';
      if (st.T >= GY && st.burn && !st.match) cls = 'burn';
      else if (st.flash > 0 && !st.match) cls = 'out';
      out.className = 'tri-status ' + cls; out.innerHTML = s;
      btn.textContent = st.match ? 'Gyufa elvétele' : 'Gyufa odatartása';
    };
    $('[data-in="t"]', root).oninput = (e) => { st.T = +e.target.value; $('[data-o="t"]', root).innerHTML = st.T + '<small>°C</small>'; if (st.T < LP) st.burn = false; status(); };
    btn.onclick = () => { st.match = !st.match; if (!st.match && st.burn && st.T < GY) { st.burn = false; st.flash = 1; } status(); };
    $('[data-reset]', root).onclick = () => { st.T = 20; st.burn = false; st.match = false; st.flash = 0; $('[data-in="t"]', root).value = 20; $('[data-o="t"]', root).innerHTML = '20<small>°C</small>'; status(); };
    TM.scene(cv, (g, w, hh, t, dt) => {
      g.clearRect(0, 0, w, hh);
      const dx = w / 2, dy = hh * 0.78, dw = Math.min(w * 0.62, 300);
      if (st.match && st.T >= LP) st.burn = true;
      st.power = lerp(st.power, st.burn ? (st.T >= GY ? 1 : 0.75) : 0, Math.min(1, dt * (st.burn ? 6 : 10)));
      // gőz
      const rate = clamp((st.T - 10) / 70, 0, 1);
      if (Math.random() < rate * 1.4) st.vapor.push({ x: dx + (Math.random() - 0.5) * dw * 0.8, y: dy - 6, l: 1, s: Math.random() * 9 });
      g.globalCompositeOperation = 'lighter';
      for (const v of st.vapor) { v.y -= 28 * dt; v.x += Math.sin(t * 2 + v.s) * 10 * dt; v.l -= dt * 0.55; g.fillStyle = `rgba(190,200,255,${v.l * 0.12})`; g.beginPath(); g.arc(v.x, v.y, 10 + (1 - v.l) * 16, 0, 7); g.fill(); }
      st.vapor = st.vapor.filter((v) => v.l > 0);
      g.globalCompositeOperation = 'source-over';
      // tál
      g.fillStyle = '#1c1c1e'; g.beginPath(); g.ellipse(dx, dy + 4, dw / 2 + 10, 22, 0, 0, Math.PI); g.lineTo(dx - dw / 2 - 10, dy + 4); g.fill();
      const lg = g.createLinearGradient(dx - dw / 2, 0, dx + dw / 2, 0); lg.addColorStop(0, '#3a2a10'); lg.addColorStop(0.5, heatColor(0.2 + rate * 0.55, 1)); lg.addColorStop(1, '#3a2a10');
      g.fillStyle = lg; g.beginPath(); g.ellipse(dx, dy, dw / 2, 14, 0, 0, 7); g.fill();
      g.strokeStyle = 'rgba(255,255,255,.25)'; g.lineWidth = 1.5; g.beginPath(); g.ellipse(dx, dy, dw / 2 + 10, 20, 0, Math.PI, 0); g.stroke();
      // láng a gőzben
      fl.x = dx; fl.y = dy - 4; fl.w = dw * 0.32; fl.h = 70 + 70 * st.power; fl.power = st.power;
      fl.step(dt, t); fl.draw(g);
      // villanás
      if (st.flash > 0) { st.flash -= dt * 0.35; }
      // gyufa
      const mx = st.match ? dx - dw * 0.18 : -60, my = dy - 54;
      const tgt = st.mx == null ? mx : lerp(st.mx, mx, Math.min(1, dt * 7)); st.mx = tgt;
      if (tgt > -50) {
        g.save(); g.translate(tgt, my); g.rotate(-0.5);
        g.fillStyle = '#d9b98a'; g.fillRect(-150, -3, 150, 6); g.fillStyle = '#8c2a1a'; g.beginPath(); g.ellipse(2, 0, 8, 6, 0, 0, 7); g.fill();
        g.restore();
        g.globalCompositeOperation = 'lighter';
        const mg = g.createRadialGradient(tgt + 4, my - 12, 0, tgt + 4, my - 12, 22);
        mg.addColorStop(0, `rgba(255,220,140,${0.9})`); mg.addColorStop(1, 'rgba(255,120,30,0)');
        g.fillStyle = mg; g.beginPath(); g.ellipse(tgt + 4, my - 14 + Math.sin(t * 20) * 1.5, 9, 18, 0, 0, 7); g.fill();
        g.globalCompositeOperation = 'source-over';
      }
      // hőmérő-skála
      const sx = w - 26, sy = hh * 0.12, sh = hh * 0.68;
      g.fillStyle = 'rgba(255,255,255,.1)'; g.beginPath(); g.roundRect(sx - 4, sy, 8, sh, 4); g.fill();
      const lv = sh * clamp((st.T - 10) / 70, 0, 1);
      g.fillStyle = heatColor(0.3 + rate * 0.7); g.beginPath(); g.roundRect(sx - 4, sy + sh - lv, 8, lv, 4); g.fill();
      [[LP, '#ffb340'], [GY, '#ff6a3d']].forEach(([v, c]) => { const yy = sy + sh - sh * (v - 10) / 70; g.fillStyle = c; g.fillRect(sx - 14, yy - 1, 28, 2); });
    });
    status();
  }

  function initHeat(root) {
    const cv = $('.heat-canvas', root), info = $('[data-hinfo]', root);
    const INFO = {
      cond: [['Mi mozog?', 'Csak az energia. A részecskék a helyükön rezegnek, és ütközéssel adják tovább.'], ['Hol?', 'Szilárd anyagban, anyaghoz kötött — légüres térben nem jön létre.'], ['Példa', 'Jó vezető: fémek. Rossz vezető (jó szigetelő): fa, porcelán.']],
      conv: [['Mi mozog?', 'Maga a közeg: a meleg rész felszáll (kisebb sűrűség, felhajtóerő), a hideg lesüllyed.'], ['Hol?', 'Folyadékokban és gázokban. A teljes hőkiegyenlítődésig tart.'], ['Tűzben', 'Nemcsak hőt, hanem égésterméket (füstöt) is szállít.']],
      rad: [['Mi mozog?', 'Elektromágneses hullám. Közvetítő anyag nem kell — a köztes tér nem melegszik fel.'], ['Felület', 'A fekete, durva felület többet nyel el; a fényes, sima visszaver.'], ['A sugárzás', 'visszaverődik, elnyelődik, áteresztődik. Hőmérséklettel rohamosan nő.']]
    };
    const st = { mode: 'cond', T: new Array(36).fill(0), ps: [], waves: [], plate: [0, 0], acc: 0 };
    const fl = new TM.Flame({ w: 34, h: 70, rate: 200 });
    const setMode = (m) => {
      st.mode = m; st.T.fill(0); st.waves = []; st.plate = [0, 0]; st.ps = [];
      info.innerHTML = INFO[m].map(([a, b]) => `<div><b>${a}</b>${b}</div>`).join('');
      $$('[data-heat] button', root).forEach((b) => b.classList.toggle('on', b.dataset.m === m));
    };
    $$('[data-heat] button', root).forEach((b) => b.onclick = () => setMode(b.dataset.m));
    setMode('cond');
    TM.scene(cv, (g, w, hh, t, dt) => {
      g.clearRect(0, 0, w, hh);
      g.font = '600 13px Inter, sans-serif'; g.textAlign = 'center';
      if (st.mode === 'cond') {
        const N = st.T.length, x0 = w * 0.16, x1 = w * 0.92, cy = hh * 0.45, rows = 5, gap = (x1 - x0) / (N - 1);
        // hővezetés: 1D hőegyenlet
        for (let k = 0; k < 6; k++) {
          st.T[0] = 1;
          const n = st.T.slice();
          for (let i = 1; i < N; i++) { const r = i === N - 1 ? n[i - 1] : n[i + 1]; st.T[i] += (n[i - 1] - 2 * n[i] + r) * 0.45 * dt * 6 - n[i] * 0.004 * dt; }
        }
        fl.x = x0; fl.y = cy + rows * gap * 0.5 + 70; fl.step(dt, t); fl.draw(g);
        for (let i = 0; i < N; i++) for (let r = 0; r < rows; r++) {
          const T = st.T[i], a = 1 + T * 5;
          const x = x0 + i * gap + Math.sin(t * 40 + i * 3 + r * 7) * a * 0.6, y = cy + (r - (rows - 1) / 2) * gap + Math.cos(t * 37 + i * 5 + r) * a * 0.6;
          g.fillStyle = heatColor(T * 1.05, 1); g.beginPath(); g.arc(x, y, Math.min(7, gap * 0.32), 0, 7); g.fill();
          if (T > 0.5) { g.fillStyle = heatColor(T, 0.12); g.beginPath(); g.arc(x, y, gap * 0.7, 0, 7); g.fill(); }
        }
        // nyíl
        const ay = cy - rows * gap * 0.5 - 30; const prog = (t * 0.25) % 1;
        g.strokeStyle = 'rgba(255,255,255,.25)'; g.lineWidth = 2; g.beginPath(); g.moveTo(x0, ay); g.lineTo(x1, ay); g.stroke();
        g.fillStyle = '#ff9f0a'; g.beginPath(); g.arc(x0 + (x1 - x0) * prog, ay, 4, 0, 7); g.fill();
        g.fillStyle = '#a1a1a6'; g.fillText('meleg → hideg: a hő részecskéről részecskére halad, a részecskék helyben rezegnek', (x0 + x1) / 2, ay - 14);
      } else if (st.mode === 'conv') {
        const bx = w * 0.08, by = hh * 0.06, bw = w * 0.84, bh = hh * 0.82;
        g.strokeStyle = 'rgba(255,255,255,.18)'; g.lineWidth = 1.5; g.strokeRect(bx, by, bw, bh);
        while (st.ps.length < 240) st.ps.push({ x: Math.random(), y: Math.random(), T: 0.25, smoke: st.ps.length < 36 });
        // áramlási hurkok jelzése
        g.strokeStyle = 'rgba(255,255,255,.07)'; g.lineWidth = 26;
        [0.25, 0.75].forEach((cx) => { g.beginPath(); g.ellipse(bx + cx * bw, by + bh / 2, bw * 0.17, bh * 0.33, 0, 0, 7); g.stroke(); });
        g.lineWidth = 2; g.strokeStyle = 'rgba(255,255,255,.28)';
        [[0.25, 1], [0.75, -1]].forEach(([cx, dir]) => { const a = t * 0.9 * dir; for (let k = 0; k < 3; k++) { const an = a + k * 2.09, x = bx + cx * bw + Math.cos(an) * bw * 0.17, y = by + bh / 2 + Math.sin(an) * bh * 0.33; g.beginPath(); g.arc(x, y, 3, 0, 7); g.fillStyle = 'rgba(255,255,255,.35)'; g.fill(); } });
        fl.x = bx + bw / 2; fl.y = by + bh - 4; fl.w = 54; fl.h = 110; fl.step(dt, t); fl.draw(g);
        for (const p of st.ps) {
          const X = p.x, Y = 1 - p.y;
          const u = -Math.PI * Math.sin(2 * Math.PI * X) * Math.cos(Math.PI * Y);
          const v = -2 * Math.PI * Math.cos(2 * Math.PI * X) * Math.sin(Math.PI * Y);
          p.x += u * dt * 0.09; p.y -= v * dt * 0.09;
          p.x = clamp(p.x, 0.01, 0.99); p.y = clamp(p.y, 0.01, 0.99);
          if (p.y > 0.72 && Math.abs(p.x - 0.5) < 0.22) p.T += 3 * dt;
          else p.T -= (p.y < 0.25 ? 0.6 : 0.22) * dt;
          p.T = clamp(p.T, 0.05, 1);
          const x = bx + p.x * bw, y = by + p.y * bh;
          if (p.smoke) { g.fillStyle = `rgba(160,160,165,${0.3 + p.T * 0.4})`; g.beginPath(); g.arc(x, y, 5.5, 0, 7); g.fill(); }
          else { g.fillStyle = heatColor(0.08 + p.T * 0.92, 1); g.beginPath(); g.arc(x, y, 3.4, 0, 7); g.fill(); }
        }
        g.fillStyle = '#a1a1a6'; g.fillText('meleg, ritkább közeg felszáll  ·  lehűlve lesüllyed  ·  a szürke pöttyök az égéstermék', bx + bw / 2, by + bh + 22);
      } else {
        // sugárzás
        for (let i = 0; i < 40; i++) { const sx = (i * 97.3) % w, sy = (i * 53.7) % hh; g.fillStyle = `rgba(255,255,255,${0.15 + 0.1 * Math.sin(t + i)})`; g.fillRect(sx, sy, 1.5, 1.5); }
        const fx = w * 0.12, fy = hh * 0.72;
        fl.x = fx; fl.y = fy; fl.w = 46; fl.h = 120; fl.step(dt, t); fl.draw(g);
        const pX = w * 0.84, plates = [{ y: hh * 0.3, black: true }, { y: hh * 0.66, black: false }];
        st.acc += dt * 7;
        while (st.acc > 1) { st.acc--; const k = Math.random() < 0.5 ? 0 : 1; st.waves.push({ x: fx + 20, y0: fy - 60, y1: plates[k].y, k, p: 0, back: false }); }
        g.lineWidth = 2.5;
        for (const wv of st.waves) {
          wv.p += dt * 0.55 * (wv.back ? -1 : 1);
          const x = lerp(wv.x, pX - 14, wv.p), y = lerp(wv.y0, wv.y1, wv.p);
          const ang = Math.atan2(wv.y1 - wv.y0, pX - wv.x);
          g.strokeStyle = wv.back ? 'rgba(160,200,255,.6)' : 'rgba(255,150,60,.85)';
          g.beginPath();
          for (let s = -18; s <= 18; s += 2) { const px = x + Math.cos(ang) * s - Math.sin(ang) * Math.sin(s * 0.5 + t * 20) * 5, py = y + Math.sin(ang) * s + Math.cos(ang) * Math.sin(s * 0.5 + t * 20) * 5; s === -18 ? g.moveTo(px, py) : g.lineTo(px, py); }
          g.stroke();
          if (!wv.back && wv.p >= 1) { if (plates[wv.k].black) { st.plate[0] = Math.min(1, st.plate[0] + 0.012); wv.dead = true; } else { if (Math.random() < 0.8) wv.back = true; else { st.plate[1] = Math.min(1, st.plate[1] + 0.012); wv.dead = true; } } }
          if (wv.back && wv.p < 0.55) wv.dead = true;
        }
        st.waves = st.waves.filter((w2) => !w2.dead);
        st.plate = st.plate.map((v) => Math.max(0, v - dt * 0.03));
        plates.forEach((pl, i) => {
          const T = st.plate[i];
          g.fillStyle = pl.black ? '#1c1c1e' : '#d1d1d6';
          g.strokeStyle = 'rgba(255,255,255,.3)'; g.beginPath(); g.roundRect(pX - 12, pl.y - 44, 24, 88, 4); g.fill(); g.stroke();
          if (T > 0.01) { g.fillStyle = `rgba(255,${70 + T * 120 | 0},20,${Math.min(0.9, T * 1.6)})`; g.fill(); g.shadowColor = 'rgba(255,90,20,.8)'; g.shadowBlur = 30 * T; g.fill(); g.shadowBlur = 0; }
          if (!pl.black) { const sh = g.createLinearGradient(pX - 12, 0, pX + 12, 0); sh.addColorStop(0, 'rgba(255,255,255,.9)'); sh.addColorStop(0.5, 'rgba(255,255,255,0)'); g.fillStyle = sh; g.fillRect(pX - 12, pl.y - 44, 24, 88); }
          g.fillStyle = '#a1a1a6'; g.textAlign = 'left';
          g.fillText(pl.black ? 'fekete, durva' : 'fényes, sima', pX + 20 > w - 90 ? pX - 110 : pX + 20, pl.y - 52);
          g.fillStyle = '#fff'; g.fillText((20 + Math.round(T * 180)) + ' °C', pX - 22, pl.y + 64);
          g.textAlign = 'center';
        });
        const mx = w * 0.48;
        g.fillStyle = 'rgba(255,255,255,.08)'; g.beginPath(); g.roundRect(mx - 46, hh * 0.08, 92, 34, 10); g.fill();
        g.fillStyle = '#5ac8fa'; g.fillText('köztes tér: 20 °C', mx, hh * 0.08 + 22);
      }
    });
  }

  function initTriangle(root) {
    const cv = $('[data-tri]', root);
    const off = { fuel: false, o2: false, heat: false };
    const fl = new TM.Flame({ w: 60, h: 150, rate: 320 });
    const out = $('[data-o="tri"]', root);
    const MSG = { fuel: 'Nincs éghető anyag → <b>kialszik</b>. Oltási mód: <b>az éghető anyag eltávolítása</b>.', o2: 'Nincs oxigén → <b>kialszik</b>. Oltási mód: <b>az oxigén elvonása</b> (fojtás).', heat: 'Nincs meg a gyulladási hőmérséklet → <b>kialszik</b>. Oltási mód: <b>hűtés</b>.' };
    const sync = () => {
      $$('.tri .side, .tri-btn', root).forEach((n) => n.classList.toggle('off', off[n.dataset.s]));
      const gone = Object.keys(off).filter((k) => off[k]);
      if (!gone.length) { out.className = 'tri-status burn'; out.innerHTML = 'Mindhárom feltétel megvan, azonos térben és időben → <b>ÉG</b>.'; }
      else { out.className = 'tri-status out'; out.innerHTML = gone.map((k) => MSG[k]).join('<br>'); }
    };
    $$('.tri .side, .tri-btn', root).forEach((n) => n.addEventListener('click', () => { off[n.dataset.s] = !off[n.dataset.s]; sync(); }));
    let smoke = [];
    TM.scene(cv, (g, w, hh, t, dt) => {
      g.clearRect(0, 0, w, hh);
      const on = !off.fuel && !off.o2 && !off.heat;
      const prev = fl.power;
      fl.power = lerp(fl.power, on ? 1 : 0, Math.min(1, dt * (on ? 2.5 : 5)));
      if (prev > 0.3 && fl.power <= 0.3) for (let i = 0; i < 18; i++) smoke.push({ x: w / 2 + (Math.random() - 0.5) * 30, y: hh * 0.6, vx: (Math.random() - 0.5) * 30, l: 1, r: 8 + Math.random() * 10 });
      fl.x = w / 2; fl.y = hh * 0.86; fl.w = Math.min(60, w * 0.2); fl.h = hh * 0.55;
      fl.o2 = off.o2 ? 0.3 : 1;
      fl.step(dt, t); fl.draw(g);
      for (const s of smoke) { s.y -= 40 * dt; s.x += s.vx * dt; s.r += 20 * dt; s.l -= dt * 0.5; const rg = g.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r); rg.addColorStop(0, `rgba(140,140,145,${s.l * 0.35})`); rg.addColorStop(1, 'rgba(140,140,145,0)'); g.fillStyle = rg; g.beginPath(); g.arc(s.x, s.y, s.r, 0, 7); g.fill(); }
      smoke = smoke.filter((s) => s.l > 0);
      // fa hasábok
      g.fillStyle = '#5a3a22'; g.save(); g.translate(w / 2, hh * 0.9); g.rotate(0.18); g.beginPath(); g.roundRect(-w * 0.18, -7, w * 0.36, 14, 7); g.fill(); g.rotate(-0.36); g.fillStyle = '#6b4528'; g.beginPath(); g.roundRect(-w * 0.18, -7, w * 0.36, 14, 7); g.fill(); g.restore();
      if (off.fuel) { g.clearRect(0, hh * 0.84, w, hh); }
    });
  }

  function initO2(root) {
    const cv = $('[data-o2c]', root);
    const st = { o2: 21, power: 1, lab: [] };
    const fl = new TM.Flame({ w: 60, h: 190, rate: 320 });
    const form = $('[data-o="form"]', root), prod = $('[data-o="prod"]', root);
    const upd = () => {
      const v = st.o2;
      $('[data-o="o2"]', root).innerHTML = String(v).replace('.', ',') + '<small>tf% O₂</small>';
      if (v > 18) { form.textContent = 'Tökéletes'; form.style.color = '#ff9a5c'; prod.textContent = 'CO₂'; prod.style.color = '#ff9a5c'; }
      else if (v >= 14) { form.textContent = 'Tökéletlen'; form.style.color = '#ffc24a'; prod.textContent = 'CO'; prod.style.color = '#ffc24a'; }
      else { form.textContent = 'Megszűnik'; form.style.color = '#8e8e93'; prod.textContent = '—'; prod.style.color = '#8e8e93'; }
    };
    $('[data-in="o2"]', root).oninput = (e) => { st.o2 = +e.target.value; upd(); };
    upd();
    // levegő-sáv animáció
    const air = $('[data-air]', root);
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { $$('[data-w]', air).forEach((d) => d.style.width = d.dataset.w + '%'); io.disconnect(); } });
    io.observe(air);
    TM.scene(cv, (g, w, hh, t, dt) => {
      g.clearRect(0, 0, w, hh);
      const v = st.o2;
      const target = v > 18 ? 1 : v >= 14 ? 0.55 + (v - 14) / 4 * 0.25 : 0;
      st.power = lerp(st.power, target, Math.min(1, dt * 3));
      fl.x = w / 2; fl.y = hh * 0.82; fl.w = Math.min(64, w * 0.15); fl.h = hh * 0.42;
      fl.power = st.power; fl.o2 = v > 18 ? 1 : 0.35;
      fl.step(dt, t); fl.draw(g);
      // kanóc / gyertya
      g.fillStyle = '#e8e2d6'; g.beginPath(); g.roundRect(w / 2 - 26, hh * 0.84, 52, hh * 0.2, 6); g.fill();
      g.fillStyle = '#222'; g.fillRect(w / 2 - 1.5, hh * 0.8, 3, hh * 0.05);
      // felszálló molekulák
      if (st.power > 0.2 && Math.random() < dt * 3) st.lab.push({ x: w / 2 + (Math.random() - 0.5) * 60, y: hh * 0.32, l: 1, txt: v > 18 ? 'CO₂' : 'CO' });
      g.font = '700 15px Inter, sans-serif'; g.textAlign = 'center';
      for (const m of st.lab) { m.y -= 30 * dt; m.l -= dt * 0.45; g.fillStyle = m.txt === 'CO' ? `rgba(255,194,74,${m.l})` : `rgba(255,154,92,${m.l * 0.85})`; g.fillText(m.txt, m.x + Math.sin(t * 2 + m.x) * 8, m.y); }
      st.lab = st.lab.filter((m) => m.l > 0);
      if (st.power < 0.05) { g.fillStyle = '#8e8e93'; g.font = '600 15px Inter, sans-serif'; g.fillText('az égés megszűnt', w / 2, hh * 0.6); }
    });
  }

  function initKinds(root) {
    $$('[data-k]', root).forEach((cv) => {
      const k = cv.dataset.k;
      const fl = new TM.Flame({ w: 26, h: 90, rate: 200 });
      const parts = Array.from({ length: 60 }, (_, i) => ({ x: Math.random(), y: Math.random(), vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3, f: i % 2 }));
      const rust = Array.from({ length: 26 }, () => ({ x: Math.random(), y: Math.random(), r: 0, s: 6 + Math.random() * 20, d: Math.random() * 8 }));
      TM.scene(cv, (g, w, hh, t, dt) => {
        g.clearRect(0, 0, w, hh);
        if (k === 'fast' || k === 'dif') {
          fl.x = w / 2; fl.y = hh * 0.8; fl.w = k === 'fast' ? 44 : 22; fl.h = k === 'fast' ? hh * 0.6 : hh * 0.45; fl.rate = k === 'fast' ? 360 : 180;
          fl.step(dt, t); fl.draw(g);
          g.fillStyle = '#e8e2d6';
          if (k === 'dif') {
            g.beginPath(); g.roundRect(w / 2 - 18, hh * 0.82, 36, hh * 0.2, 4); g.fill();
            for (const p of parts) { // oxigén diffundál a láng felé
              p.x += (0.5 - p.x) * dt * 0.25 + Math.sin(t + p.y * 9) * dt * 0.02; p.y += Math.sin(t * 0.7 + p.x * 7) * dt * 0.03;
              if (Math.abs(p.x - 0.5) < 0.06) { p.x = Math.random() < 0.5 ? 0.02 : 0.98; p.y = 0.25 + Math.random() * 0.55; }
              g.fillStyle = 'rgba(62,162,255,.8)'; g.beginPath(); g.arc(p.x * w, p.y * hh, 2.6, 0, 7); g.fill();
            }
          } else { g.fillStyle = '#5a3a22'; g.beginPath(); g.roundRect(w / 2 - 50, hh * 0.82, 100, 12, 6); g.fill(); }
        } else if (k === 'slow') {
          const gr = g.createLinearGradient(0, 0, w, hh); gr.addColorStop(0, '#6d6f74'); gr.addColorStop(1, '#3d3f44');
          g.fillStyle = gr; g.beginPath(); g.roundRect(w * 0.12, hh * 0.18, w * 0.76, hh * 0.64, 10); g.fill();
          g.save(); g.beginPath(); g.roundRect(w * 0.12, hh * 0.18, w * 0.76, hh * 0.64, 10); g.clip();
          const cyc = (t * 0.12) % 1.3;
          for (const r of rust) {
            const rr = Math.max(0, (cyc - r.d * 0.05)) * r.s * 2.2;
            g.fillStyle = `rgba(150,72,28,${0.55})`; g.beginPath(); g.arc(w * 0.12 + r.x * w * 0.76, hh * 0.18 + r.y * hh * 0.64, rr, 0, 7); g.fill();
            g.fillStyle = 'rgba(190,100,40,.35)'; g.beginPath(); g.arc(w * 0.12 + r.x * w * 0.76 + 2, hh * 0.18 + r.y * hh * 0.64 - 2, rr * 0.6, 0, 7); g.fill();
          }
          g.restore();
          g.fillStyle = '#86868b'; g.font = '600 12px Inter, sans-serif'; g.textAlign = 'center'; g.fillText('nincs láng, nincs fény — csak lassú oxidáció', w / 2, hh * 0.93);
        } else if (k === 'kin') {
          const cyc = t % 4.2;
          g.strokeStyle = 'rgba(255,255,255,.18)'; g.strokeRect(w * 0.1, hh * 0.1, w * 0.8, hh * 0.8);
          if (cyc < 3) {
            for (const p of parts) {
              p.x += p.vx * dt; p.y += p.vy * dt;
              if (p.x < 0 || p.x > 1) p.vx *= -1; if (p.y < 0 || p.y > 1) p.vy *= -1;
              p.x = clamp(p.x, 0, 1); p.y = clamp(p.y, 0, 1);
              g.fillStyle = p.f ? 'rgba(255,179,64,.95)' : 'rgba(62,162,255,.9)';
              g.beginPath(); g.arc(w * 0.1 + p.x * w * 0.8, hh * 0.1 + p.y * hh * 0.8, 3, 0, 7); g.fill();
            }
            if (cyc > 2.6) { g.fillStyle = '#fff'; g.beginPath(); g.arc(w * 0.2, hh * 0.8, 3 + Math.random() * 4, 0, 7); g.fill(); }
            g.fillStyle = '#86868b'; g.font = '600 12px Inter, sans-serif'; g.textAlign = 'center'; g.fillText(cyc > 2.6 ? 'szikra…' : 'gáz + O₂ már összekeveredett', w / 2, hh * 0.97);
          } else {
            const k2 = (cyc - 3) / 1.2;
            const R = k2 * Math.hypot(w, hh);
            const rg = g.createRadialGradient(w * 0.2, hh * 0.8, R * 0.2, w * 0.2, hh * 0.8, R);
            rg.addColorStop(0, `rgba(255,240,200,${(1 - k2) * 0.9})`); rg.addColorStop(0.6, `rgba(255,120,30,${(1 - k2) * 0.8})`); rg.addColorStop(1, 'rgba(255,60,20,0)');
            g.fillStyle = rg; g.fillRect(0, 0, w, hh);
            g.strokeStyle = `rgba(255,255,255,${1 - k2})`; g.lineWidth = 3; g.beginPath(); g.arc(w * 0.2, hh * 0.8, R * 0.8, 0, 7); g.stroke();
            if (k2 > 0.95) parts.forEach((p) => { p.x = Math.random(); p.y = Math.random(); });
          }
        } else if (k === 'izzo') {
          for (let i = 0; i < 7; i++) {
            const x = w * (0.22 + i * 0.095), y = hh * (0.66 + (i % 2) * 0.08), r = 22 + (i % 3) * 6;
            const pulse = 0.55 + 0.45 * Math.sin(t * 1.8 + i * 1.7);
            const gr = g.createRadialGradient(x, y, 0, x, y, r);
            gr.addColorStop(0, heatColor(0.6 + pulse * 0.25)); gr.addColorStop(0.7, heatColor(0.45 + pulse * 0.1, 0.9)); gr.addColorStop(1, '#1c0d06');
            g.fillStyle = gr; g.beginPath(); g.ellipse(x, y, r, r * 0.7, i, 0, 7); g.fill();
          }
          g.globalCompositeOperation = 'lighter';
          const gl = g.createRadialGradient(w / 2, hh * 0.7, 0, w / 2, hh * 0.7, w * 0.5); gl.addColorStop(0, 'rgba(255,80,20,.25)'); gl.addColorStop(1, 'rgba(255,40,0,0)');
          g.fillStyle = gl; g.fillRect(0, 0, w, hh);
          for (let i = 0; i < 5; i++) { const sx = w * (0.3 + ((t * 0.13 + i * 0.21) % 1) * 0.4), sy = hh * (0.6 - ((t * 0.5 + i * 0.37) % 1) * 0.5); g.fillStyle = `rgba(255,170,60,${0.8 - ((t * 0.5 + i * 0.37) % 1)})`; g.fillRect(sx, sy, 2, 2); }
          g.globalCompositeOperation = 'source-over';
        }
      });
    });
  }

  function initPhase(root) {
    $$('[data-ph]', root).forEach((cv) => {
      const k = +cv.dataset.ph;
      const fl = new TM.Flame({ w: 40, h: 90, rate: 240 });
      let vap = [];
      TM.scene(cv, (g, w, hh, t, dt) => {
        g.clearRect(0, 0, w, hh);
        const bx = w / 2 - 50, by = hh * 0.66;
        const heat = k === 0 ? 0.5 + 0.5 * Math.sin(t * 2) : 1;
        // hasáb
        const gr = g.createLinearGradient(0, by, 0, by + 40); gr.addColorStop(0, heatColor(0.35 + heat * 0.25 * (k ? 1 : 0.6))); gr.addColorStop(1, '#3a2414');
        g.fillStyle = gr; g.beginPath(); g.roundRect(bx, by, 100, 40, 6); g.fill();
        if (k === 0) { // hőnyilak
          g.strokeStyle = `rgba(255,140,40,${0.4 + heat * 0.5})`; g.lineWidth = 2.5;
          for (let i = 0; i < 3; i++) { const x = bx + 20 + i * 30, y0 = by + 80, y1 = by + 50 + Math.sin(t * 4 + i) * 3; g.beginPath(); g.moveTo(x, y0); g.lineTo(x, y1); g.lineTo(x - 5, y1 + 7); g.moveTo(x, y1); g.lineTo(x + 5, y1 + 7); g.stroke(); }
        }
        if (k >= 1) {
          if (Math.random() < dt * 14) vap.push({ x: bx + 10 + Math.random() * 80, y: by - 2, l: 1, s: Math.random() * 9 });
          for (const v of vap) { v.y -= 30 * dt; v.x += Math.sin(t * 3 + v.s) * 12 * dt; v.l -= dt * 0.6; g.fillStyle = `rgba(200,200,215,${v.l * 0.35})`; g.beginPath(); g.arc(v.x, v.y, 6 + (1 - v.l) * 12, 0, 7); g.fill(); }
          vap = vap.filter((v) => v.l > 0);
        }
        if (k === 2) { fl.x = w / 2; fl.y = by - 14; fl.w = 46; fl.h = hh * 0.42; fl.step(dt, t); fl.draw(g); g.strokeStyle = 'rgba(255,255,255,.35)'; g.setLineDash([3, 4]); g.beginPath(); g.moveTo(bx + 104, by - 2); g.lineTo(bx + 104, by - 16); g.stroke(); g.setLineDash([]); g.fillStyle = '#a1a1a6'; g.font = '600 11px Inter, sans-serif'; g.fillText('rés', bx + 108, by - 6); }
      });
    });
  }

  function initArea(root) {
    const a = $('[data-area]', root);
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { $$('.sq', a).forEach((s) => s.style.transform = 'scale(1)'); io.disconnect(); } }, { threshold: 0.4 });
    io.observe(a);
  }

  function initFlame(root) {
    const svg = $('#lang svg', root);
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { $$('.pin', svg).forEach((p) => p.style.opacity = 1); io.disconnect(); } }, { threshold: 0.3 });
    io.observe(svg);
    const focus = (z) => {
      $$('.zpath', svg).forEach((p) => { p.style.opacity = !z || p.dataset.z === z ? 1 : 0.25; });
      $$('#lang .zone', root).forEach((n) => n.classList.toggle('on', n.dataset.z === z));
    };
    $$('#lang .zone', root).forEach((n) => { n.addEventListener('mouseenter', () => focus(n.dataset.z)); n.addEventListener('click', () => focus(n.dataset.z)); n.addEventListener('mouseleave', () => focus(null)); });
    $$('.zpath', svg).forEach((p) => p.addEventListener('mouseenter', () => focus(p.dataset.z)));
    svg.addEventListener('mouseleave', () => focus(null));
  }

  TM.register(lesson);
})();
