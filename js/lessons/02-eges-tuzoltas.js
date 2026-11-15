/* 2. lecke — Égés és tűzoltáselmélet (forrás: 3. ÉGÉS-tűzoltás.pdf, Kuti R.; tesztkérdés-bank) */
(function () {
  'use strict';
  const TM = window.TM;
  const { $, $$, clamp, lerp } = TM;
  const { sec, def, note, heatColor } = TM.ui;

  const lesson = {
    no: 2,
    id: 'eges-tuzoltas',
    title: 'Égés és tűzoltás',
    short: 'Tűzoltás',
    heroTitle: 'Égés és <span class="fire-text">tűzoltás.</span>',
    intro: 'Hogyan <b>osztályozzuk</b> a tüzet, milyen <b>zónái</b> vannak, hogyan <b>szívja a levegőt</b> — és pontosan milyen <b>hatásokkal</b> oltjuk el.',
    meta: ['6 fejezet', '≈ 30 perc', 'Forrás: 3. diasor (Kuti R.)'],
    chapters: ['tuz2', 'zonak', 'gazcsere', 'megszuntetes', 'oltohatasok', 'oltoanyag'],
    heroFlame: { x: 0.74 },

    render(root) {
      root.innerHTML = [
        /* ---------- 1. A tűz és osztályozása ---------- */
        sec('tuz2', 'A tűz osztályozása', 1, 'Minden tűz <span class="fire-text">más.</span>',
          'A tűz definícióját már ismered az 1. leckéből. A 3. diasor hozzátesz egy mondatot, és négy szempont szerint osztályozza a tüzeket.',
          def('Tűz', 'A tűz az <mark>emberi élet, egészség veszélyeztetésével</mark>, az <mark>anyagi javak pusztulásával</mark> járó, az ember által <mark>nem kívánt</mark>, időben és térben <mark>nem korlátozott</mark> és <mark>nem ellenőrzött</mark> égési folyamat. <mark>Megszüntetése szervezett tűzoltással lehetséges.</mark>') +
          `<div class="grid-2" style="margin-top:48px">
            <div class="card reveal"><span class="tag">1 · Környezettől függően</span><h3>Nyílt · Zárt</h3><p>Szabadtéri tűz, illetve épületen, helyiségen belüli tűz.</p></div>
            <div class="card reveal" style="--d:.06s"><span class="tag">2 · Az éghető anyag halmazállapota szerint</span><h3>Szilárd · Folyékony · Légnemű · Por · Vegyes</h3><p>Szilárd anyagok, folyékony anyagok, légnemű anyagok, porok, különböző halmazállapotú anyagok együttes égése.</p></div>
            <div class="card reveal"><span class="tag">3 · Fejlődése alapján</span><h3>Terjedő · Nem terjedő</h3><p>Átterjed-e a környező éghető anyagokra, vagy helyben marad.</p></div>
            <div class="card reveal" style="--d:.06s"><span class="tag">4 · Tűzterület nagysága szerint</span><h3>Kis · Közepes · Nagy</h3><p>100 m² alatt · 100–1000 m² · 1000 m² felett.</p></div>
          </div>` +
          `<div class="stage dark reveal"><div class="stage-body o2">
              <canvas class="o2-canvas" data-area2 aria-label="Tűzterület animáció"></canvas>
              <div>
                <div class="o2-read" data-o="a">60<small>m²</small></div>
                <p style="color:#a1a1a6;margin:6px 0 0" data-o="cmp">kb. egy kisebb lakás alapterülete</p>
                <div class="o2-scale">
                  <div class="o2-bands"><i style="width:33.3%;background:#ff9f0a"></i><i style="width:33.3%;background:#ff5a1f"></i><i style="width:33.4%;background:#e5251b"></i></div>
                  <input class="range" type="range" min="0" max="1000" step="1" value="296" data-in="a" aria-label="Tűzterület">
                  <div class="o2-ticks"><span>10 m²</span><span>100</span><span>1000</span><span>10 000 m²</span></div>
                </div>
                <div class="o2-verdict"><div><small>Kategória</small><b data-o="cat">Kis tűz</b></div><div><small>Határ</small><b data-o="lim">100 m² alatt</b></div></div>
              </div></div>
            <div class="stage-cap"><span>Logaritmikus csúszka: minden harmada tízszer akkora területet jelent.</span><span>3. diasor, 5. dia</span></div></div>` +
          note('A tesztbankban a tűz <b>környezet</b> és <b>fejlődés</b> szerinti felosztása ugyanazzal a négy válaszlehetőséggel szerepel — figyeld, melyiket kérdezik!', 'warn')
        ),

        /* ---------- 2. A tűz zónái ---------- */
        sec('zonak', 'A tűz zónái', 2, 'Három zóna. <span class="fire-text">Egy szoba.</span>',
          'Egy égő helyiségben a tűz nem csak ott van, ahol a láng. Kattints a zónákra, és nézd meg, hol mi történik.',
          `<div class="stage dark reveal">
            <div class="stage-body" style="padding-bottom:0">
              <div class="seg" data-zseg><button class="on" data-z="0">Mind</button><button data-z="1">1 · Az égés zónája</button><button data-z="2">2 · Hőterhelésnek kitett</button><button data-z="3">3 · Füstzóna</button></div>
              <canvas class="heat-canvas" data-zones style="margin-top:14px" aria-label="A tűz zónái"></canvas>
            </div>
            <div class="stage-body" style="padding-top:8px"><div class="tri-status burn" data-o="zinfo" style="margin:0"></div></div>
          </div>` +
          def('1 · Az égés zónája', 'A tér azon része, ahol <mark>lejátszódik az égést megelőző folyamat, valamint maga az égés</mark> (a láng zónája). Jellemzője a <mark>hőfeszültség</mark>: az égési zóna egységnyi térfogatából (1 m³) egységnyi idő alatt (1 s) mekkora hőmennyiség (W) szabadul fel.') +
          def('2 · Hőterhelésnek kitett zóna', 'A tűz hatására a közelben található éghető anyagok már <mark>kémiai változásokat szenvednek</mark>, azaz <mark>előkészülnek a meggyulladásra</mark>. Itt a hőmérséklet magas és fokozatosan növekvő, egészen a <mark>gyulladási hőmérsékletig</mark> emelkedik. (Diasor: a gyulladási hőmérsékletig növekvő hőmérsékletű, éghető anyagokkal telt tér, <mark>a tűz terjedési lehetőségének zónája</mark>.)') +
          def('3 · Füstzóna', 'Ahol az éghető gőzök-gázok, a <mark>tökéletlen és tökéletes égés</mark> során keletkezett <mark>forró gázok, égéstermékek</mark> képződnek. <mark>Magas hőmérsékletűek, mérgezőek és oxigénhiányosak</mark> is lehetnek. Másképpen alakul ki és másképpen változik nyílt térben és zárt térben.')
        ),

        /* ---------- 3. Gázcsere ---------- */
        sec('gazcsere', 'Gázcsere', 3, 'A tűz <span class="cool-text">lélegzik.</span>',
          'Az égéshez oxigén kell, ezért a tűz maga szívja magához a levegőt. Váltogass a nyílt tér, a szél és a zárt helyiség között.',
          def('Gázcsere', 'A tűz során létrejövő <mark>fizikai jelenség</mark> (légáramlás, szél), amely az <mark>égéstermékekkel szennyezett, a felszabaduló hőtől felhevült levegő</mark> és a <mark>tüzet körülvevő és azt tápláló hűvösebb levegő</mark> <mark>sűrűségkülönbsége</mark> miatt alakul ki.') +
          `<div class="stage dark reveal">
            <div class="stage-body" style="padding-bottom:0">
              <div class="seg" data-gseg><button class="on" data-g="open">Nyílt terület</button><button data-g="wind">Szél · röptűz</button><button data-g="room">Zárt terület</button></div>
              <canvas class="heat-canvas" data-gas style="margin-top:14px;height:clamp(320px,44vw,460px)" aria-label="Gázcsere animáció"></canvas>
            </div>
            <div class="stage-body" style="padding-top:6px">
              <div data-roomctl style="display:none">
                <div class="grid-2" style="gap:28px">
                  <div><label style="display:flex;justify-content:space-between;font-size:14px;color:#a1a1a6;margin-bottom:10px">Alsó / felső nyílás aránya (A₁/A₂) <b style="color:#fff" data-o="ar">1,0</b></label><input class="range" type="range" min="0.3" max="3" step="0.1" value="1" data-in="ar" aria-label="Nyílások aránya"></div>
                  <div><label style="display:flex;justify-content:space-between;font-size:14px;color:#a1a1a6;margin-bottom:10px">Belső hőmérséklet (T<sub>ép</sub>) <b style="color:#fff" data-o="tin">600 °C</b></label><input class="range" type="range" min="50" max="1000" step="10" value="600" data-in="tin" aria-label="Belső hőmérséklet"></div>
                </div>
                <div style="margin-top:20px;font-size:clamp(18px,2.4vw,24px);font-weight:650;letter-spacing:-.02em">H₁ = H / ( (A₁/A₂)² · T<sub>ép</sub>/T<sub>kö</sub> + 1 ) = <span class="fire-text" data-o="h1">0,30 H</span></div>
                <p style="color:#a1a1a6;font-size:14px;margin:8px 0 0">A <b style="color:#fff">semleges zóna</b> (0 pont) magassága az alsó nyílástól. Felette túlnyomás van (a forró füst kiáramlik), alatta depresszió (friss levegő áramlik be). T<sub>kö</sub> = 20 °C külső hőmérséklet, Kelvinben számolva.</p>
              </div>
              <div class="heat-info" data-ginfo></div>
            </div>
          </div>` +
          note('A képlet a diasoron szerepel (9. dia). Nem kell fejből számolni vele — azt kell érteni, hogy a semleges zóna <b>a nagyobb nyílás felé tolódik</b>, és <b>melegebb tűznél lejjebb kerül</b>.')
        ),

        /* ---------- 4. Az égés megszüntetésének módjai ---------- */
        sec('megszuntetes', 'Az égés megszüntetése', 4, 'Vedd el, <span class="fire-text">amit eszik.</span>',
          'Az égés megszüntetése = <b>az égés valamelyik feltételének megszüntetése</b>. Három feltétel, három út — a tűzháromszöget már ismered.',
          `<div class="grid-3" style="margin-top:48px">
            <div class="card reveal"><span class="tag" style="background:rgba(255,179,64,.18);color:#c77700">Éghető anyag</span><h3>Ne jusson hozzá</h3><p>• az éghető anyag <b>tűzhöz jutásának megakadályozása</b><br>• az <b>éghető anyag eltávolítása</b><br>• az <b>égő anyag eltávolítása</b></p></div>
            <div class="card reveal" style="--d:.08s"><span class="tag" style="background:rgba(10,132,255,.14);color:var(--oxy)">Oxigén</span><h3>Zárd el a levegőt</h3><p>• az égő terek (helységek, tartályok) <b>lezárása</b><br>• az égő terek <b>elárasztása, feltöltése</b></p></div>
            <div class="card reveal" style="--d:.16s"><span class="tag" style="background:rgba(255,90,31,.14);color:var(--flame)">Gyulladási hőmérséklet</span><h3>Hűtsd le</h3><p>• az égő anyag <b>gyulladáspont alá való hűtése</b></p></div>
          </div>` +
          def('Oltási módok (tesztbank)', 'Az égéshez szükséges három feltétel alapján megkülönböztethető oltási módok: – az <mark>éghető anyag eltávolítása</mark>; – az <mark>oxigén elvonása</mark>; – az éghető anyag hőmérsékletének <mark>hűtése</mark>.') +
          `<div class="stage reveal"><div class="stage-body">
            <h3 class="h-sub" style="margin-bottom:6px">Melyik feltételt szünteti meg?</h3>
            <p class="muted" style="margin:0 0 20px">Mind a 9 helyzetnél válaszd ki — azonnal látod, jó-e.</p>
            <div class="sorter" data-sorter></div>
          </div><div class="stage-cap"><span data-o="sscore">0 / 9 helyes</span><button class="btn-link btn" data-sreset>Újrakezdés</button></div></div>`
        ),

        /* ---------- 5. Oltóhatások ---------- */
        sec('oltohatasok', 'Oltóhatások', 5, 'Három <span class="fire-text">fő hatás.</span>',
          'Minden oltóanyag valamilyen <b>oltóhatással</b> dolgozik. Három fő hatás van — mindegyiknek vannak alhatásai. Ez a ZH egyik kedvenc bejelölős kérdése.',
          `<div class="tree reveal">
            <div class="branch" style="--c:#ff5a1f"><div class="root"><b>HŰTŐHATÁS</b><span>az égő anyag és környezete hőmérsékletét a gyulladási hőmérséklete alá csökkentjük</span></div>
              <ul><li>Párolgási hatás<small>1 l vízből 1750 l vízgőz, ehhez 2684 kJ hő kell</small></li><li class="weak">Szublimációs hatás<small>köztes halmazállapot kihagyása (pl. CO₂-oltó) — nem jelentős</small></li><li class="weak">Bomlási hatás<small>az oltóanyag alkotórészeire bomlik, hőelvonással jár — nem jelentős</small></li><li>Kiegyenlítő hatás<small>éghető folyadékok rétegei közti hőmérséklet-különbség — keverés</small></li><li>Gátló hatás<small>az oltóanyag rossz hővezető, így megakadályozza a hő terjedését</small></li></ul></div>
            <div class="branch" style="--c:#3ea2ff"><div class="root"><b>FOJTÓHATÁS</b><span>az oltóanyag gőz-, gáz-, köd-, porfelhőként elzárja az égésteret, az éghető anyagot a levegőtől</span></div>
              <ul><li>Kiszorító hatás<small>a levegő kiszorítása az égéstérből (pl. vízgőz)</small></li><li>Elválasztó hatás<small>megakadályozza az éghető anyag ismételt kijutását az égéstérbe (pl. oltóhab)</small></li><li>Takaró hatás<small>az éghető anyag felszínén ellenhatást fejt ki a képződő gázokkal szemben</small></li><li>Emulgáló hatás<small>a víz és olajok keveredése habosodást eredményez, amely a felületen hat</small></li></ul></div>
            <div class="branch" style="--c:#30d158"><div class="root"><b>ANTIKATALITIKUS</b><span>(inhibíciós) az oltóanyag az égés láncolatába beépülve megszakítja az égést</span></div>
              <ul><li>Homogén inhibíció<small>a hőtől felbomló oltóanyag szabad ionjai az O₂ helyére épülnek be a láncba</small></li><li>Heterogén inhibíció<small>kettős hatás: a részecskék falat alkotnak + homogén inhibíció — oltóporokra jellemző</small></li></ul></div>
          </div>` +
          def('Hűtőhatás', 'A hűtőhatással <mark>csökkentjük</mark> a tűz fészkében és annak környezetében levő <mark>hőmérsékletet</mark>, az égő anyag hőmérsékletét lehűti, illetőleg megakadályozhatjuk, hogy a <mark>gyulladási hőmérséklet</mark> ott kialakuljon.') +
          `<div class="stage dark reveal"><div class="stage-body calc">
              <canvas class="beaker" data-steam aria-label="Víz elpárolgása"></canvas>
              <div>
                <span class="tag" style="display:inline-block;font-size:12px;font-weight:600;padding:4px 10px;border-radius:99px;background:rgba(255,255,255,.08);color:#a1a1a6">Párolgási hatás</span>
                <div class="o2-read" style="margin-top:14px" data-o="vol">1<small>liter</small></div>
                <p style="color:#a1a1a6;margin:8px 0 0">elnyelt hő: <b style="color:#fff" data-o="kj">0 kJ</b></p>
                <div class="mini-cta"><button class="btn btn-fire" data-boil>Párologtasd el</button></div>
                <p style="color:#a1a1a6;font-size:14px;margin-top:18px">A víz elpárolgása közben rengeteg hőt von el a tűztől (hűt), a keletkező gőz pedig <b style="color:#fff">kiszorítja a levegőt</b> (fojt). Ezért a víz kétféleképpen is olt.</p>
              </div>
            </div><div class="stage-cap"><span>1 l víz → 1750 l vízgőz · 2684 kJ</span><span>3. diasor, 15. dia</span></div></div>` +
          def('Fojtóhatás', 'Az oltóanyag <mark>gőz-, gáz-, köd- vagy porfelhőként</mark>, vagy annak rétegeként <mark>elzárja</mark> az égési fészket, illetőleg az éghető anyagot <mark>a levegőtől</mark>.') +
          `<div class="stage dark reveal">
            <div class="stage-body" style="padding-bottom:0">
              <div class="seg" data-cseg><button class="on" data-c="free">Láncreakció</button><button data-c="homo">Homogén inhibíció</button><button data-c="hetero">Heterogén inhibíció (por)</button></div>
              <canvas class="heat-canvas" data-chain style="margin-top:14px" aria-label="Égési láncreakció és inhibíció"></canvas>
            </div>
            <div class="stage-body" style="padding-top:8px"><div class="tri-status burn" data-o="cinfo" style="margin:0"></div></div>
          </div>` +
          def('Antikatalitikus oltóhatás', 'Ennél az oltóhatásnál az oltóanyag az <mark>égés láncolatába beépülve</mark> <mark>antikatalizátorként</mark> (kémiai folyamatot gátló tényezőként) az égést <mark>megszakítja</mark>. Másképpen: a hő hatására az oltóanyagból olyan gőzök képződnek, amelyek a tűz fészkében az égési reakció láncolatát felbontják.') +
          def('Homogén és heterogén inhibíció', '<b>Homogén inhibíciós hatás:</b> az oltóanyag a hő hatására <mark>felbomlik</mark>, a keletkező <mark>szabad ionok beépülnek az égés láncolatába – az O₂ helyére –</mark> és az égési láncreakciót megszakítják. <b>Heterogén inhibíciós hatás (kettős hatás):</b> az oltóanyag-részecskék a lángtérbe jutva <mark>falat alkotnak</mark>, amibe az éghető részecskék beleütköznek, valamint homogén inhibíció is létrejön — <mark>oltóporokra jellemző</mark>.') +
          def('Falhatás (tesztbank)', 'A láncreakciót tovább vivő atomok, molekulák a <mark>por felületének ütközve elvesztik energiájukat</mark>, ezzel tehát <mark>heterogén inhibíciót</mark> fejtenek ki a porrészecskék.') +
          note('<b>Bejelölős ZH-kérdés: „Jelölje be a fő oltóhatásokat!”</b> → <b>hőhatás (hűtőhatás), fojtóhatás, antikatalitikus (inhibíciós) oltóhatás</b>. A párolgási, kiszorító, elválasztó, szublimációs, gátló, bomlási, kiegyenlítő csak <i>alhatás</i>. A tesztbank egyik változatának kulcsa az <b>emulgáló hatást</b> is bejelöli — a diasor szerint ez a fojtóhatás alhatása.', 'warn') +
          note('Igaz/hamis csapda: <i>„Az inert gázok kémiai úton gátolják az égést.”</i> → <b>HAMIS</b>. Az inert gázok (CO₂, N₂) fő oltóhatása a <b>fojtóhatás, ezen belül a kiszorító hatás</b>. Kémiai úton (antikatalitikusan) a halogéntartalmú gázok gátolnak.', 'danger')
        ),

        /* ---------- 6. Oltóanyag megválasztása ---------- */
        sec('oltoanyag', 'Az oltóanyag megválasztása', 6, 'Mivel oltsunk? <span class="fire-text">Attól függ.</span>',
          'A diasor öt szempontot sorol fel. A következő leckékben jönnek maguk az oltóanyagok: víz, oltógázok, porok, habok.',
          `<div class="crit">
            ${[['01', 'Az égő anyag fizikai-kémiai tulajdonságai', 'pl. vízzel tilos alkálifémet vagy feszültség alatti berendezést oltani'], ['02', 'A rendelkezésre álló oltóanyag', 'azzal oltasz, ami ott van'], ['03', 'A tűz helyzetéből adódó taktikai lehetőségek', 'hozzáférés, távolság, zárt vagy nyílt tér'], ['04', 'A felhasználandó oltóanyag értéke', 'mennyibe kerül az oltás'], ['05', 'A keletkező másodlagos károk mértéke', 'pl. a víz többet árt az irattárnak, mint a tűz']].map(([n, t, s], i) => `<div class="crit-row reveal" style="--d:${i * 0.07}s"><span>${n}</span><div><b>${t}</b><small>${s}</small></div></div>`).join('')}
          </div>` +
          note('A szürke magyarázó példák saját kiegészítések — a ZH-n az öt szempont felsorolása elég.')
        )
      ].join('');

      initArea(root);
      initZones(root);
      initGas(root);
      initSorter(root);
      initSteam(root);
      initChain(root);
      return [];
    },

    quiz: [
      { type: 'cloze', text: 'A tűz az emberi élet, egészség veszélyeztetésével, az anyagi javak pusztulásával járó, az ember által nem kívánt, időben és térben nem [korlátozott] és nem [ellenőrzött] égési folyamat. Megszüntetése [szervezett] tűzoltással lehetséges.', why: '3. diasor, 2. dia.' },
      { type: 'mc', q: 'Mekkora a „közepes tűz” területe?', opts: ['100 m² alatt', '100–1000 m²', '1000 m² felett', '500–5000 m²'], a: 1, fixed: true, why: 'Kis tűz: 100 m² alatt; közepes: 100–1000 m²; nagy: 1000 m² felett.', src: '3. diasor, 5. dia' },
      { type: 'multi', q: 'Mely kategóriák tartoznak az éghető anyag halmazállapota szerinti felosztáshoz?', opts: ['Porok', 'Légnemű anyagok', 'Zárt tűz', 'Különböző halmazállapotú anyagok együttes égése', 'Terjedő tűz'], a: [0, 1, 3], why: 'Szilárd, folyékony, légnemű anyagok, porok, különböző halmazállapotú anyagok együttes égése. A zárt és a terjedő más felosztás.' },
      { type: 'cloze', text: 'Az égés zónája: a tér azon része, ahol lejátszódik az égést [megelőző] folyamat, valamint maga az [égés].', why: 'Tesztbank / 3. diasor, 5. dia.', src: 'tesztbank' },
      { type: 'mc', q: 'Mi jellemzi az égés zónáját?', opts: ['A hőfeszültség: 1 m³-ből 1 s alatt felszabaduló hő (W)', 'Az oxigénhiány és a mérgező gázok', 'A gyulladási hőmérsékletig növekvő hőmérséklet', 'A semleges zóna'], a: 0, why: 'Az égés zónájának jellemzője a hőfeszültség. A mérgező, oxigénhiányos gáz a füstzóna; a növekvő hőmérséklet a hőterhelésnek kitett zóna.' },
      { type: 'cloze', text: 'Hőterhelésnek kitett zóna: a tűz hatására a közelben található éghető anyagok már [kémiai] változásokat szenvednek, azaz előkészülnek a [meggyulladásra]. Itt a hőmérséklet magas és fokozatosan növekvő egészen a [gyulladási] hőmérsékletig emelkedik.', why: 'Tesztbank.', src: 'tesztbank' },
      { type: 'tf', q: 'A füstzóna gázai magas hőmérsékletűek, mérgezőek és oxigénhiányosak is lehetnek.', a: true, why: 'Szó szerint így a 6. dián.' },
      { type: 'cloze', text: 'A gázcsere a tűz során létrejövő [fizikai] jelenség (légáramlás, szél), amely a felhevült levegő és a tüzet tápláló hűvösebb levegő [sűrűségkülönbsége|sűrűség-különbsége|sűrűségkülönbség] miatt alakul ki.', why: '3. diasor, 7. dia (a tesztbankban „légáramlás” néven).' },
      { type: 'mc', q: 'Mi a röptűz?', opts: ['Szél hatására a tűzből elszálló égő részek új tüzet okoznak', 'Zárt térben a füstgázok hirtelen begyulladása', 'Repülőgép-tűz', 'A láng felső, legforróbb része'], a: 0, why: 'A diasor a nyílt terület gázcseréjénél, szél esetén mutatja a röptűz kialakulását.' },
      { type: 'mc', q: 'Zárt helyiségben hol áramlik ki a forró füstgáz?', opts: ['A felső, magas nyomású térben', 'Az alsó, alacsony nyomású térben', 'A semleges zónában', 'Mindenhol egyformán'], a: 0, fixed: true, why: 'Felül túlnyomás → kiáramlás; alul depresszió → friss levegő be. A kettő között a semleges zóna (0 pont).' },
      { type: 'mc', q: 'Melyik az OXIGÉN megszüntetésének módja?', opts: ['Az égő terek lezárása, elárasztása, feltöltése', 'Az éghető anyag eltávolítása', 'Az égő anyag gyulladáspont alá hűtése', 'Az éghető anyag tűzhöz jutásának megakadályozása'], a: 0, why: 'Oxigén: lezárás, elárasztás/feltöltés.' },
      { type: 'multi', q: 'Jelölje be a fő oltóhatásokat!', opts: ['párolgási hatás', 'kiszorító hatás', 'elválasztó hatás', 'antikatalitikus (inhibíciós) oltóhatás', 'hőhatás', 'fojtóhatás', 'szublimációs hatás'], a: [3, 4, 5], fixed: true, why: 'Fő oltóhatás: hő(hűtő)hatás, fojtóhatás, antikatalitikus. A többi alhatás.', src: 'tesztbank' },
      { type: 'multi', q: 'Jelölje be a fő oltóhatásokat!', opts: ['elválasztó hatás', 'gátló hatás', 'kiszorító hatás', 'hőhatás', 'bomlási hatás', 'párolgási hatás', 'antikatalitikus (inhibíciós) oltóhatás', 'fojtóhatás'], a: [3, 6, 7], fixed: true, why: 'Ugyanaz a három: hőhatás, fojtóhatás, antikatalitikus.', src: 'tesztbank, 2. változat' },
      { type: 'tf', q: 'Az inert gázok kémiai úton gátolják az égést.', a: false, why: 'Hamis. Az inert gázok fő oltóhatása a fojtóhatás, ezen belül a kiszorító hatás.', src: 'tesztes ZH, 7. kérdés' },
      { type: 'mc', q: 'Az inert gázok fő oltóhatása:', opts: ['Hűtő hatás', 'Fojtóhatás, kiszorító hatás', 'Antikatalitikus hatás'], a: 1, fixed: true, why: 'Semleges vagy inert gázok jellemző oltóhatása a fojtó hatás, ezen belül a kiszorító hatás.', src: 'tesztes ZH, 9. kérdés' },
      { type: 'cloze', text: 'Semleges vagy inert gázok jellemző oltóhatása a [fojtó|fojtó hatás|fojtóhatás] hatás, ezen belül a [kiszorító] hatás.', why: 'Tesztbank.', src: 'tesztbank' },
      { type: 'cloze', text: 'Párolgási hatás: 1 l vízből [1750] l vízgőz keletkezik, ehhez [2684] kJ hőenergia szükséges.', why: '3. diasor, 15. dia.' },
      { type: 'mc', q: 'Melyik a fojtóhatás alhatása?', opts: ['Elválasztó hatás', 'Kiegyenlítő hatás', 'Szublimációs hatás', 'Homogén inhibíció'], a: 0, why: 'Fojtó: kiszorító, elválasztó, takaró, emulgáló. A kiegyenlítő és a szublimációs a hűtőhatáshoz, a homogén inhibíció az antikatalitikushoz tartozik.' },
      { type: 'mc', q: 'Melyik alhatás „nem jelentős” a diasor szerint?', opts: ['Szublimációs hatás', 'Párolgási hatás', 'Kiszorító hatás', 'Elválasztó hatás'], a: 0, why: 'A szublimációs és a bomlási hatás „nem jelentős”.' },
      { type: 'cloze', text: 'Antikatalitikus oltóhatás: az oltóanyag az égés [láncolatába] beépülve [antikatalizátorként] az égést megszakítja.', why: 'Tesztbank.', src: 'tesztbank' },
      { type: 'mc', q: 'Mi a heterogén inhibíció?', opts: ['A részecskék falat alkotnak a lángtérben + homogén inhibíció is létrejön', 'Az oltóanyag szabad ionjai az O₂ helyére épülnek be', 'A levegő kiszorítása az égéstérből', 'Az égő anyag lehűtése'], a: 0, why: 'Kettős hatás, oltóporokra jellemző. A b) a homogén inhibíció.' },
      { type: 'cloze', text: 'Falhatás: a láncreakciót tovább vivő atomok, molekulák a por felületének ütközve elvesztik [energiájukat], ezzel tehát [heterogén] inhibíciót fejtenek ki a por részecskék.', why: 'Tesztbank.', src: 'tesztbank' },
      { type: 'cloze', text: 'Az égést kémiai úton fékező gázok elsődleges oltóhatása az [antikatalitikus|antikatalikus|inhibíciós] oltóhatás.', why: 'Tesztbank (ott „antikatalikus” elírással is).', src: 'tesztbank' },
      { type: 'multi', q: 'Melyek az oltóanyag megválasztásának szempontjai?', opts: ['Az égő anyag fizikai-kémiai tulajdonságai', 'A keletkező másodlagos károk mértéke', 'Az oltóanyag színe', 'A felhasználandó oltóanyag értéke', 'A tűz helyzetéből adódó taktikai lehetőségek'], a: [0, 1, 3, 4], why: 'Öt szempont: tulajdonságok, rendelkezésre álló oltóanyag, taktikai lehetőségek, érték, másodlagos károk.' }
    ],

    cards: [
      { term: 'Tűz (3. diasor)', def: 'Az emberi élet, egészség veszélyeztetésével, anyagi javak pusztulásával járó, <mark>nem kívánt</mark>, időben és térben <mark>nem korlátozott</mark> és <mark>nem ellenőrzött</mark> égési folyamat. <mark>Megszüntetése szervezett tűzoltással lehetséges.</mark>' },
      { term: 'A tűz osztályozása', def: 'Környezet: <mark>nyílt, zárt</mark>. Halmazállapot: <mark>szilárd, folyékony, légnemű, porok, vegyes</mark>. Fejlődés: <mark>terjedő, nem terjedő</mark>. Terület: <mark>kis &lt;100 m², közepes 100–1000 m², nagy &gt;1000 m²</mark>.' },
      { term: 'Az égés zónája', def: 'Ahol az égést közvetlenül <mark>megelőző</mark>, illetve az égési folyamatok végbemennek (a láng zónája). Jellemzője a <mark>hőfeszültség</mark>: 1 m³-ből 1 s alatt felszabaduló hő (W).' },
      { term: 'Hőterhelésnek kitett zóna', def: 'Az éghető anyagok <mark>kémiai változást</mark> szenvednek, <mark>előkészülnek a meggyulladásra</mark>; a hőmérséklet a <mark>gyulladási hőmérsékletig</mark> nő. A tűz <mark>terjedési lehetőségének</mark> zónája.' },
      { term: 'Füstzóna', def: 'Éghető gőzök-gázok, tökéletlen és tökéletes égés <mark>forró égéstermékei</mark>. <mark>Magas hőmérsékletű, mérgező, oxigénhiányos</mark> lehet; nyílt és zárt térben másképp alakul.' },
      { term: 'Gázcsere', def: 'A tűz során létrejövő <mark>fizikai jelenség</mark> (légáramlás, szél), a felhevült, szennyezett levegő és a tápláló hűvösebb levegő <mark>sűrűségkülönbsége</mark> miatt.' },
      { term: 'Gázcsere zárt térben', def: 'Felül <mark>magas nyomású tér</mark> (füst ki), alul <mark>alacsony nyomású tér</mark> (levegő be), köztük a <mark>semleges zóna</mark> (0 pont). H₁ = H / ((A₁/A₂)²·T<sub>ép</sub>/T<sub>kö</sub> + 1).' },
      { term: 'Az égés megszüntetése', def: 'Az égés valamelyik feltételének megszüntetése. <mark>Éghető anyag</mark>: tűzhöz jutás megakadályozása, éghető / égő anyag eltávolítása. <mark>Oxigén</mark>: lezárás, elárasztás, feltöltés. <mark>Gyulladási hőmérséklet</mark>: hűtés.' },
      { term: 'Fő oltóhatások', def: '<mark>Hűtőhatás (hőhatás)</mark>, <mark>fojtóhatás</mark>, <mark>antikatalitikus (inhibíciós)</mark> oltóhatás.' },
      { term: 'Hűtőhatás + alhatásai', def: 'Az égő anyag és környezete hőmérsékletét a <mark>gyulladási hőmérséklete alá</mark> csökkentjük. Alhatások: <mark>párolgási</mark> (1 l → 1750 l gőz, 2684 kJ), szublimációs*, bomlási*, <mark>kiegyenlítő</mark>, <mark>gátló</mark>. (*nem jelentős)' },
      { term: 'Fojtóhatás + alhatásai', def: 'Gőz-, gáz-, köd-, porfelhőként <mark>elzárja</mark> az égésteret a levegőtől. Alhatások: <mark>kiszorító</mark> (vízgőz), <mark>elválasztó</mark> (hab), <mark>takaró</mark>, <mark>emulgáló</mark>.' },
      { term: 'Antikatalitikus hatás', def: 'Az oltóanyag az égés <mark>láncolatába beépülve antikatalizátorként</mark> megszakítja az égést. <mark>Homogén</mark>: szabad ionok az O₂ helyére. <mark>Heterogén</mark>: fal + homogén — oltóporok.' },
      { term: 'Falhatás', def: 'A láncreakciót vivő részecskék a <mark>por felületének ütközve elvesztik energiájukat</mark> → <mark>heterogén inhibíció</mark>.' },
      { term: 'Inert gázok', def: 'CO₂, N₂. Fő oltóhatás: <mark>fojtóhatás, ezen belül kiszorító hatás</mark>. NEM kémiai úton gátolnak (azok a halogéntartalmú gázok: antikatalitikus).' },
      { term: 'Oltóanyag megválasztása', def: '1) az égő anyag <mark>fizikai-kémiai tulajdonságai</mark> 2) a <mark>rendelkezésre álló</mark> oltóanyag 3) <mark>taktikai lehetőségek</mark> 4) az oltóanyag <mark>értéke</mark> 5) <mark>másodlagos károk</mark> mértéke.' }
    ]
  };

  /* ================= Interaktív elemek ================= */

  function initArea(root) {
    const cv = $('[data-area2]', root), inp = $('[data-in="a"]', root);
    const st = { A: 60, shown: 60, cells: [] };
    for (let i = 0; i < 900; i++) st.cells.push({ a: Math.random() * Math.PI * 2, r: Math.sqrt(Math.random()), s: Math.random() * 10 });
    const CMP = [[30, 'kb. egy garzonlakás'], [90, 'kb. egy családi ház egy szintje'], [200, 'kb. egy tornaterem fele'], [450, 'kb. egy kosárlabdapálya'], [1200, 'kb. egy kisebb raktárcsarnok'], [4000, 'kb. egy nagy áruház alapterülete'], [1e9, 'kb. egy focipálya vagy több']];
    const upd = () => {
      st.A = Math.round(Math.pow(10, 1 + (+inp.value / 1000) * 3));
      $('[data-o="a"]', root).innerHTML = st.A.toLocaleString('hu-HU') + '<small>m²</small>';
      $('[data-o="cmp"]', root).textContent = CMP.find((c) => st.A <= c[0])[1];
      const [c, l, col] = st.A < 100 ? ['Kis tűz', '100 m² alatt', '#ffb340'] : st.A <= 1000 ? ['Közepes tűz', '100–1000 m²', '#ff7a3d'] : ['Nagy tűz', '1000 m² felett', '#ff4a3a'];
      const cat = $('[data-o="cat"]', root); cat.textContent = c; cat.style.color = col;
      $('[data-o="lim"]', root).textContent = l;
    };
    inp.oninput = upd; upd();
    TM.scene(cv, (g, w, h, t, dt) => {
      g.clearRect(0, 0, w, h);
      st.shown = lerp(st.shown, st.A, Math.min(1, dt * 4));
      // perspektivikus padló-rács: 1 cella = 10×10 m (100 m²)
      const cx = w / 2, cy = h * 0.55, maxR = Math.min(w, h) * 0.46;
      const scale = maxR / Math.sqrt(10000 / Math.PI); // px / m
      g.save(); g.translate(cx, cy); g.scale(1, 0.55);
      g.strokeStyle = 'rgba(255,255,255,.07)'; g.lineWidth = 1;
      const step = 10 * scale;
      if (step > 3) for (let x = -maxR * 1.2; x <= maxR * 1.2; x += step) { g.beginPath(); g.moveTo(x, -maxR * 1.2); g.lineTo(x, maxR * 1.2); g.stroke(); g.beginPath(); g.moveTo(-maxR * 1.2, x); g.lineTo(maxR * 1.2, x); g.stroke(); }
      [100, 1000].forEach((a) => { const r = Math.sqrt(a / Math.PI) * scale; g.setLineDash([6, 6]); g.strokeStyle = 'rgba(255,255,255,.35)'; g.beginPath(); g.arc(0, 0, r, 0, 7); g.stroke(); g.setLineDash([]); });
      const R = Math.sqrt(st.shown / Math.PI) * scale;
      const gl = g.createRadialGradient(0, 0, 0, 0, 0, R * 1.3);
      gl.addColorStop(0, 'rgba(255,200,90,.55)'); gl.addColorStop(0.6, 'rgba(255,90,30,.4)'); gl.addColorStop(1, 'rgba(255,40,10,0)');
      g.fillStyle = gl; g.beginPath(); g.arc(0, 0, R * 1.3, 0, 7); g.fill();
      g.globalCompositeOperation = 'lighter';
      const n = Math.min(st.cells.length, 60 + Math.round(R * 2));
      for (let i = 0; i < n; i++) {
        const c = st.cells[i], rr = c.r * R, x = Math.cos(c.a) * rr, y = Math.sin(c.a) * rr;
        const f = 0.5 + 0.5 * Math.sin(t * 8 + c.s * 3);
        g.fillStyle = heatColor(0.6 + f * 0.35 * (1 - c.r * 0.5), 0.35);
        g.beginPath(); g.arc(x, y, 3 + f * 5, 0, 7); g.fill();
      }
      g.globalCompositeOperation = 'source-over';
      g.restore();
      g.font = '600 12px Inter, sans-serif'; g.fillStyle = 'rgba(255,255,255,.55)'; g.textAlign = 'left';
      { const r1 = Math.sqrt(100 / Math.PI) * scale, r2 = Math.sqrt(1000 / Math.PI) * scale; g.textAlign = 'center'; g.fillText('100 m²', cx, cy - r1 * 0.55 - 8); g.textAlign = 'left'; g.fillText('1000 m²', cx + r2 * 0.75, cy + r2 * 0.55 * 0.75 + 14); }
      g.textAlign = 'center'; g.fillText('egy rácskocka = 10 × 10 m', cx, h - 10);
    });
  }

  function initZones(root) {
    const cv = $('[data-zones]', root), info = $('[data-o="zinfo"]', root);
    const TXT = ['Kattints egy zónára! A láng körül előkészülnek az anyagok, a mennyezet alatt gyűlik a füst.', '<b>1 · Az égés zónája</b> — itt ég a láng. Jellemzője a hőfeszültség (W / m³).', '<b>2 · Hőterhelésnek kitett zóna</b> — a kanapé még nem ég, de már bomlik, füstöl: előkészül a gyulladásra. Itt terjed a tűz.', '<b>3 · Füstzóna</b> — forró, mérgező, oxigénhiányos égéstermékek gyűlnek a mennyezet alatt, és lefelé terjednek.'];
    const st = { z: 0, smoke: [], layer: 0, t0: 0 };
    const fl = new TM.Flame({ w: 50, h: 140, rate: 300 });
    const set = (z) => { st.z = z; info.innerHTML = TXT[z]; $$('[data-zseg] button', root).forEach((b) => b.classList.toggle('on', +b.dataset.z === z)); };
    $$('[data-zseg] button', root).forEach((b) => b.onclick = () => set(+b.dataset.z));
    set(0);
    TM.scene(cv, (g, w, h, t, dt) => {
      g.clearRect(0, 0, w, h);
      const L = w * 0.06, R = w * 0.94, T = h * 0.06, B = h * 0.9;
      const fx = L + (R - L) * 0.3, sofaX = L + (R - L) * 0.6;
      // szoba
      g.fillStyle = '#0e0e10'; g.fillRect(L, T, R - L, B - T);
      g.strokeStyle = 'rgba(255,255,255,.25)'; g.lineWidth = 2; g.strokeRect(L, T, R - L, B - T);
      // füstréteg nő (és újraindul)
      st.layer = (st.layer + dt * 0.035) % 1.15;
      const lay = Math.min(1, st.layer) * (B - T) * 0.42;
      const sg = g.createLinearGradient(0, T, 0, T + lay + 30);
      sg.addColorStop(0, 'rgba(90,86,84,.85)'); sg.addColorStop(0.8, 'rgba(70,66,64,.55)'); sg.addColorStop(1, 'rgba(70,66,64,0)');
      g.fillStyle = sg; g.fillRect(L + 1, T + 1, R - L - 2, lay + 30);
      for (let i = 0; i < 12; i++) { const x = L + ((i * 97 + t * 25) % (R - L)), y = T + lay * (0.4 + 0.5 * Math.sin(i + t * 0.6)); g.fillStyle = 'rgba(110,105,100,.12)'; g.beginPath(); g.arc(x, y, 30, 0, 7); g.fill(); }
      // füstoszlop
      if (Math.random() < dt * 30) st.smoke.push({ x: fx + (Math.random() - 0.5) * 20, y: B - 150, l: 1, r: 8 });
      for (const s of st.smoke) { s.y -= 70 * dt; s.r += 14 * dt; if (s.y < T + lay * 0.6 + 10) { s.x += (s.x > fx ? 1 : -1) * 80 * dt; s.y = Math.max(s.y, T + 12); } s.l -= dt * 0.35; g.fillStyle = `rgba(100,96,92,${s.l * 0.25})`; g.beginPath(); g.arc(s.x, s.y, s.r, 0, 7); g.fill(); }
      st.smoke = st.smoke.filter((s) => s.l > 0);
      // kanapé: hőterhelés alatt melegszik, füstölög
      const heat = 0.35 + 0.25 * Math.sin(t * 1.2);
      g.fillStyle = `rgb(${95 + heat * 120 | 0},${62 + heat * 40 | 0},${48})`;
      g.beginPath(); g.roundRect(sofaX, B - 46, 120, 46, 8); g.fill(); g.beginPath(); g.roundRect(sofaX, B - 78, 30, 78, 8); g.fill();
      for (let i = 0; i < 3; i++) { const p = (t * 0.6 + i / 3) % 1; g.fillStyle = `rgba(160,155,150,${(1 - p) * 0.35})`; g.beginPath(); g.arc(sofaX + 30 + i * 30 + Math.sin(t * 2 + i) * 6, B - 50 - p * 60, 5 + p * 10, 0, 7); g.fill(); }
      // tűz
      g.fillStyle = '#4a2d18'; g.beginPath(); g.roundRect(fx - 40, B - 22, 80, 22, 4); g.fill();
      fl.x = fx; fl.y = B - 22; fl.h = (B - T) * 0.45; fl.o2 = 0.7; fl.step(dt, t); fl.draw(g);
      // zónakiemelés
      const zones = [
        null,
        { draw: () => { g.beginPath(); g.ellipse(fx, B - fl.h * 0.45, 70, fl.h * 0.62, 0, 0, 7); }, c: '#ff9f0a', lbl: '1 · égés zónája', lx: fx, ly: B - fl.h * 1.1 },
        { draw: () => { g.beginPath(); g.ellipse(fx + 40, B - 60, (R - L) * 0.42, 110, 0, 0, 7); }, c: '#ff5a1f', lbl: '2 · hőterhelésnek kitett zóna', lx: sofaX + 60, ly: B - 130 },
        { draw: () => { g.beginPath(); g.rect(L + 6, T + 6, R - L - 12, Math.max(30, lay)); }, c: '#a1a1a6', lbl: '3 · füstzóna', lx: (L + R) / 2, ly: T + 30 }
      ];
      zones.forEach((z, i) => {
        if (!z || (st.z && st.z !== i)) return;
        g.save(); z.draw(); g.setLineDash([7, 6]); g.lineDashOffset = -t * 20; g.strokeStyle = z.c; g.lineWidth = st.z === i ? 2.5 : 1.5; g.stroke();
        if (st.z === i) { g.fillStyle = z.c.length === 7 ? z.c + '22' : z.c; g.fill(); }
        g.restore();
        g.font = '700 13px Inter, sans-serif'; g.textAlign = 'center'; g.fillStyle = z.c; g.fillText(z.lbl, z.lx, z.ly);
      });
    });
  }

  function initGas(root) {
    const cv = $('[data-gas]', root), ctl = $('[data-roomctl]', root), info = $('[data-ginfo]', root);
    const INFO = {
      open: [['Nyílt terület', 'A tűz minden irányból szívja a friss levegőt, a forró gáz függőlegesen felszáll.'], ['Miért?', 'A felhevült levegő ritkább (kisebb sűrűségű), felhajtóerő hat rá.'], ['Következmény', 'Minél nagyobb a tűz, annál erősebb a beáramlás — „szívja” a levegőt.']],
      wind: [['Szél', 'A szél megdönti a lángot és a füstoszlopot, a szél irányába hajtja a tüzet.'], ['Röptűz', 'Az elszálló égő részek, szikrák a szél irányában új tüzeket gyújtanak.'], ['Veszély', 'A tűz „ugrik”: a fő tűztől távol is keletkezhet új tűzfészek.']],
      room: [['Felül: magas nyomású tér', 'A forró, könnyű füstgáz a felső nyíláson áramlik ki.'], ['Alul: alacsony nyomású tér', 'A hideg, friss levegő az alsó nyíláson áramlik be.'], ['Semleges zóna (0 pont)', 'Ahol a belső és külső nyomás egyenlő: itt nincs áramlás.']]
    };
    const st = { m: 'open', ps: [], embers: [], spots: [], ar: 1, tin: 600, h1: 0.3, h1s: 0.3 };
    const fl = new TM.Flame({ w: 60, h: 150, rate: 320 });
    const calc = () => {
      const r = (st.tin + 273) / 293;
      st.h1 = 1 / (st.ar * st.ar * r + 1);
      $('[data-o="ar"]', root).textContent = st.ar.toFixed(1).replace('.', ',');
      $('[data-o="tin"]', root).textContent = st.tin + ' °C';
      $('[data-o="h1"]', root).textContent = st.h1.toFixed(2).replace('.', ',') + ' H';
    };
    $('[data-in="ar"]', root).oninput = (e) => { st.ar = +e.target.value; calc(); };
    $('[data-in="tin"]', root).oninput = (e) => { st.tin = +e.target.value; calc(); };
    calc();
    const set = (m) => {
      st.m = m; st.ps = []; st.embers = []; st.spots = [];
      ctl.style.display = m === 'room' ? '' : 'none';
      info.innerHTML = INFO[m].map(([a, b]) => `<div><b>${a}</b>${b}</div>`).join('');
      $$('[data-gseg] button', root).forEach((b) => b.classList.toggle('on', b.dataset.g === m));
    };
    $$('[data-gseg] button', root).forEach((b) => b.onclick = () => set(b.dataset.g));
    set('open');
    const arrow = (g, x1, y1, x2, y2, c) => { g.strokeStyle = c; g.fillStyle = c; g.lineWidth = 2; g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.stroke(); const a = Math.atan2(y2 - y1, x2 - x1); g.beginPath(); g.moveTo(x2, y2); g.lineTo(x2 - Math.cos(a - 0.4) * 10, y2 - Math.sin(a - 0.4) * 10); g.lineTo(x2 - Math.cos(a + 0.4) * 10, y2 - Math.sin(a + 0.4) * 10); g.fill(); };
    TM.scene(cv, (g, w, h, t, dt) => {
      g.clearRect(0, 0, w, h);
      g.font = '600 12px Inter, sans-serif'; g.textAlign = 'center';
      if (st.m === 'open' || st.m === 'wind') {
        const wind = st.m === 'wind' ? 1 : 0;
        const gx = w * (wind ? 0.3 : 0.5), gy = h * 0.82;
        g.fillStyle = '#1a1a1c'; g.fillRect(0, gy, w, h - gy);
        // beáramló levegő
        if (Math.random() < dt * 40) {
          const side = wind ? -1 : Math.random() < 0.5 ? -1 : 1;
          st.ps.push({ x: side < 0 ? 0 : w, y: gy - 6 - Math.random() * 40, hot: 0, l: 1 });
        }
        for (const p of st.ps) {
          const dx = gx - p.x;
          if (!p.hot) { p.x += Math.sign(dx) * (90 + wind * 60) * dt; p.y += (gy - 12 - p.y) * dt * 0.5; if (Math.abs(dx) < 30) p.hot = 1; }
          else { p.y -= 120 * dt; p.x += (wind * 110 + Math.sin(t * 3 + p.y * 0.05) * 15) * dt; p.l -= dt * 0.35; }
          g.fillStyle = p.hot ? `rgba(${200 - (1 - p.l) * 90 | 0},${110 - (1 - p.l) * 20 | 0},${80},${p.l * 0.6})` : 'rgba(90,180,255,.75)';
          g.beginPath(); g.arc(p.x, p.y, p.hot ? 4 + (1 - p.l) * 10 : 2.6, 0, 7); g.fill();
        }
        st.ps = st.ps.filter((p) => p.l > 0 && p.y > -30 && p.x < w + 30);
        g.save(); g.translate(gx, gy); g.transform(1, 0, -wind * 0.55, 1, 0, 0);
        fl.x = 0; fl.y = 0; fl.w = 70; fl.h = h * 0.38; fl.o2 = 1; fl.step(dt, t); fl.draw(g); g.restore();
        g.fillStyle = '#e5251b'; g.beginPath(); g.ellipse(gx, gy + 2, 70, 9, 0, 0, 7); g.fill();
        if (wind) {
          for (let i = 0; i < 5; i++) { const y = h * (0.15 + i * 0.12), off = ((t * 120 + i * 77) % (w * 0.4)); arrow(g, off, y, off + 50, y, 'rgba(255,255,255,.35)'); }
          if (Math.random() < dt * 5) st.embers.push({ x: gx, y: gy - h * 0.3, vx: 70 + Math.random() * 90, vy: -30 - Math.random() * 50, l: 1 });
          for (const e of st.embers) {
            e.vy += 85 * dt; e.x += e.vx * dt; e.y += e.vy * dt; e.l -= dt * 0.1;
            g.fillStyle = `rgba(255,170,60,${Math.min(1, e.l + 0.2)})`; g.beginPath(); g.arc(e.x, e.y, 2.5, 0, 7); g.fill();
            if (e.y >= gy && !e.done) { e.done = 1; if (st.spots.length < 6 && e.x < w - 20) st.spots.push({ x: e.x, p: 0, f: new TM.Flame({ w: 16, h: 40, rate: 120 }) }); }
          }
          st.embers = st.embers.filter((e) => !e.done && e.l > 0);
          for (const s of st.spots) { s.p = Math.min(1, s.p + dt * 0.25); s.f.x = s.x; s.f.y = gy; s.f.power = s.p; s.f.h = 30 + s.p * 50; s.f.step(dt, t); s.f.draw(g); }
          if (st.spots.length) { g.fillStyle = '#ffb340'; g.fillText('röptűz: új tűzfészkek a szél irányában', w * 0.72, gy + 26); }
          if (st.spots.length >= 6 && st.spots.every((s) => s.p >= 1) && Math.random() < dt * 0.2) st.spots = [];
          g.fillStyle = '#a1a1a6'; g.fillText('szél →', 40, h * 0.1);
        } else {
          arrow(g, 30, gy - 20, gx - 110, gy - 20, 'rgba(90,180,255,.6)'); arrow(g, w - 30, gy - 20, gx + 110, gy - 20, 'rgba(90,180,255,.6)');
          g.fillStyle = '#5ac8fa'; g.fillText('friss levegő', 90, gy - 32); g.fillText('friss levegő', w - 90, gy - 32);
          g.fillStyle = '#ff9a5c'; g.fillText('forró gáz felszáll', gx, h * 0.08);
        }
      } else {
        const L = w * 0.13, R = w * 0.55, B = h * 0.9, T = h * 0.2, H = B - T;
        st.h1s = lerp(st.h1s, st.h1, Math.min(1, dt * 4));
        const ny = B - st.h1s * H;
        const a1 = clamp(st.ar / (st.ar + 1), 0.15, 0.85) * H * 0.5, a2 = clamp(1 / (st.ar + 1), 0.15, 0.85) * H * 0.5;
        // ház
        g.strokeStyle = 'rgba(255,255,255,.45)'; g.lineWidth = 3;
        g.beginPath(); g.moveTo(L - 20, T); g.lineTo((L + R) / 2, T - h * 0.13); g.lineTo(R + 20, T); g.stroke();
        g.beginPath(); g.moveTo(L, T); g.lineTo(R, T); g.moveTo(L, T); g.lineTo(L, B); g.lineTo(R, B);
        g.moveTo(R, B); g.lineTo(R, B - a1); g.moveTo(R, T + a2); g.lineTo(R, T); g.stroke();
        // belső hő
        const hg = g.createLinearGradient(0, T, 0, B); hg.addColorStop(0, heatColor(0.45 + st.tin / 2500, 0.35)); hg.addColorStop(1, 'rgba(255,90,30,0.05)');
        g.fillStyle = hg; g.fillRect(L + 2, T + 2, R - L - 4, B - T - 4);
        fl.x = L + (R - L) * 0.4; fl.y = B - 2; fl.w = 46; fl.h = H * 0.42; fl.o2 = 0.8; fl.step(dt, t); fl.draw(g);
        // áramlás
        if (Math.random() < dt * 30) st.ps.push({ k: 'in', x: R + 90, y: B - Math.random() * a1, l: 1 });
        if (Math.random() < dt * 30) st.ps.push({ k: 'out', x: R - 10, y: T + Math.random() * a2, l: 1 });
        for (const p of st.ps) {
          if (p.k === 'in') { p.x -= 110 * dt; if (p.x < fl.x + 20) { p.y -= 80 * dt; } p.l -= dt * 0.25; g.fillStyle = `rgba(90,180,255,${p.l})`; g.beginPath(); g.arc(p.x, p.y, 2.6, 0, 7); g.fill(); }
          else { p.x += 120 * dt; p.y -= 12 * dt; p.l -= dt * 0.5; g.fillStyle = `rgba(150,140,135,${p.l * 0.7})`; g.beginPath(); g.arc(p.x, p.y, 4 + (1 - p.l) * 9, 0, 7); g.fill(); }
        }
        st.ps = st.ps.filter((p) => p.l > 0);
        // semleges zóna
        g.setLineDash([6, 6]); g.strokeStyle = '#30d158'; g.lineWidth = 2; g.beginPath(); g.moveTo(L - 30, ny); g.lineTo(R + 120, ny); g.stroke(); g.setLineDash([]);
        g.textAlign = 'left'; g.fillStyle = '#30d158'; g.fillText('0 pont — semleges zóna', R + 24, ny - 8);
        g.fillStyle = '#ff9a5c'; g.fillText('magas nyomású tér → füst ki', R + 24, T + 14);
        g.fillStyle = '#5ac8fa'; g.fillText('alacsony nyomású tér ← levegő be', R + 24, B - 6);
        // H, H1 méretvonal
        g.strokeStyle = 'rgba(255,255,255,.5)'; g.lineWidth = 1; g.fillStyle = '#fff';
        g.beginPath(); g.moveTo(L - 40, B); g.lineTo(L - 40, T); g.stroke(); g.fillText('H', L - 60, (B + T) / 2);
        g.beginPath(); g.moveTo(L - 18, B); g.lineTo(L - 18, ny); g.stroke(); g.fillText('H₁', L - 14, (B + ny) / 2 + 4);
        g.textAlign = 'center'; g.fillStyle = '#a1a1a6'; g.fillText('A₂', R + 12, T + a2 / 2); g.fillText('A₁', R + 12, B - a1 / 2);
      }
    });
  }

  function initSorter(root) {
    const host = $('[data-sorter]', root);
    const ITEMS = [['Elzárod a gázvezeték főcsapját.', 'fuel', 'Az éghető anyag tűzhöz jutásának megakadályozása.'], ['Kihúzod az égő raklapot a raktárból.', 'fuel', 'Az égő anyag eltávolítása.'], ['Elhordod a szénabálákat a tűz útjából.', 'fuel', 'Az éghető anyag eltávolítása.'], ['Becsukod az égő szoba ajtaját és ablakát.', 'o2', 'Az égő tér lezárása.'], ['Az égő tartályt CO₂-vel árasztod el.', 'o2', 'Az égő tér elárasztása, feltöltése.'], ['Fedőt teszel az égő olajos lábasra.', 'o2', 'Lezárás: nem jut hozzá levegő.'], ['Vízzel locsolod az égő fát.', 'heat', 'Az égő anyag gyulladáspont alá hűtése.'], ['A szomszédos tartályt vízsugárral hűtöd.', 'heat', 'Hűtés: ne érje el a gyulladási hőmérsékletet.'], ['Pokróccal letakarod a lángoló ruhát.', 'o2', 'Elzárja a levegőtől (fojtás).']];
    const LBL = { fuel: 'Éghető anyag', o2: 'Oxigén', heat: 'Hőmérséklet' };
    let score = 0;
    const render = () => {
      score = 0; $('[data-o="sscore"]', root).textContent = '0 / 9 helyes';
      host.innerHTML = ITEMS.map(([q], i) => `<div class="srow" data-i="${i}"><span>${q}</span><div class="sbtns">${Object.keys(LBL).map((k) => `<button data-k="${k}">${LBL[k]}</button>`).join('')}</div><small></small></div>`).join('');
      $$('.srow', host).forEach((row) => $$('button', row).forEach((b) => b.onclick = () => {
        if (row.dataset.done) return;
        const [, ans, why] = ITEMS[+row.dataset.i];
        row.dataset.done = 1;
        const ok = b.dataset.k === ans;
        b.classList.add(ok ? 'ok' : 'bad');
        if (!ok) $(`button[data-k="${ans}"]`, row).classList.add('ok');
        $('small', row).textContent = (ok ? '✓ ' : '✗ ') + why;
        if (ok) score++;
        $('[data-o="sscore"]', root).textContent = `${score} / 9 helyes`;
        if ($$('.srow[data-done]', host).length === 9 && score >= 8) { const r = host.getBoundingClientRect(); TM.sparks(r.left + r.width / 2, r.bottom - 40, 80); }
      }));
    };
    $('[data-sreset]', root).onclick = render;
    render();
  }

  function initSteam(root) {
    const cv = $('[data-steam]', root), btn = $('[data-boil]', root);
    const st = { k: 0, run: false };
    btn.onclick = () => { st.k = 0; st.run = true; btn.textContent = 'Újra'; };
    TM.scene(cv, (g, w, h, t, dt) => {
      g.clearRect(0, 0, w, h);
      if (st.run) st.k = Math.min(1, st.k + dt * 0.32);
      const e = 1 - Math.pow(1 - st.k, 3);
      const vol = 1 + 1749 * e;
      $('[data-o="vol"]', root).innerHTML = Math.round(vol).toLocaleString('hu-HU') + '<small>liter</small>';
      $('[data-o="kj"]', root).textContent = Math.round(2684 * e).toLocaleString('hu-HU') + ' kJ';
      const base = Math.min(w, h) * 0.07;
      const side = base * Math.cbrt(vol);
      const cx = w / 2, by = h * 0.92;
      // gőzkocka (izometrikus)
      const iso = (s, col, a) => {
        const d = s * 0.45;
        g.fillStyle = `rgba(${col},${a})`; g.strokeStyle = `rgba(${col},${Math.min(1, a * 2.4)})`; g.lineWidth = 1.5;
        g.beginPath(); g.rect(cx - s / 2, by - s, s, s); g.fill(); g.stroke();
        g.beginPath(); g.moveTo(cx - s / 2, by - s); g.lineTo(cx - s / 2 + d, by - s - d * 0.6); g.lineTo(cx + s / 2 + d, by - s - d * 0.6); g.lineTo(cx + s / 2, by - s); g.closePath(); g.fill(); g.stroke();
        g.beginPath(); g.moveTo(cx + s / 2, by - s); g.lineTo(cx + s / 2 + d, by - s - d * 0.6); g.lineTo(cx + s / 2 + d, by - d * 0.6); g.lineTo(cx + s / 2, by); g.closePath(); g.fill(); g.stroke();
      };
      if (st.k > 0) {
        const s = Math.min(side, h * 0.8);
        iso(s, '210,220,235', 0.08);
        for (let i = 0; i < 18 * e; i++) { const x = cx - s / 2 + ((i * 53.3) % s), y = by - s * (0.2 + ((i * 0.37 + t * 0.15) % 0.8)); g.fillStyle = 'rgba(230,235,245,.08)'; g.beginPath(); g.arc(x + Math.sin(t + i) * 8, y, 18, 0, 7); g.fill(); }
        if (side > h * 0.8) { g.fillStyle = '#a1a1a6'; g.font = '600 12px Inter, sans-serif'; g.textAlign = 'center'; g.fillText('(a gőzkocka már nem fér ki — 12× akkora élű, mint a vízé)', cx, 18); }
      }
      iso(base * (1 - e * 0.98), '62,162,255', 0.55);
      g.fillStyle = '#fff'; g.font = '700 12px Inter, sans-serif'; g.textAlign = 'center';
      if (e < 0.5) g.fillText('1 l víz', cx, by + 16);
    });
  }

  function initChain(root) {
    const cv = $('[data-chain]', root), info = $('[data-o="cinfo"]', root);
    const TXT = {
      free: '<b>Láncreakció:</b> a gyökök (narancs) éghető molekulákkal (szürke) ütközve újabb gyököket hoznak létre — a reakció önmagát gerjeszti, a láng erősödik.',
      homo: '<b>Homogén inhibíció:</b> a felbomló oltóanyag szabad ionjai (zöld) befogják a gyököket — beépülnek az O₂ helyére. A lánc megszakad, a láng gyengül.',
      hetero: '<b>Heterogén inhibíció (kettős hatás):</b> a porszemcsék falat alkotnak — a gyökök beléjük ütközve elvesztik energiájukat (falhatás), és közben homogén inhibíció is történik.'
    };
    const st = { m: 'free', R: [], F: [], I: [], P: [], glow: 0.5 };
    const reset = () => {
      st.R = Array.from({ length: 12 }, () => ({ x: Math.random(), y: Math.random(), a: Math.random() * 7 }));
      st.F = Array.from({ length: 70 }, () => ({ x: Math.random(), y: Math.random(), a: Math.random() * 7 }));
      st.I = st.m === 'free' ? [] : Array.from({ length: st.m === 'homo' ? 40 : 24 }, () => ({ x: Math.random(), y: Math.random(), a: Math.random() * 7 }));
      st.P = st.m === 'hetero' ? Array.from({ length: 9 }, (_, i) => ({ x: 0.1 + (i % 3) * 0.4 + Math.random() * 0.08, y: 0.15 + Math.floor(i / 3) * 0.35 + Math.random() * 0.08 })) : [];
    };
    const set = (m) => { st.m = m; info.innerHTML = TXT[m]; info.className = 'tri-status ' + (m === 'free' ? 'burn' : 'out'); $$('[data-cseg] button', root).forEach((b) => b.classList.toggle('on', b.dataset.c === m)); reset(); };
    $$('[data-cseg] button', root).forEach((b) => b.onclick = () => set(b.dataset.c));
    set('free');
    const move = (p, sp, dt) => { p.a += (Math.random() - 0.5) * 3 * dt; p.x += Math.cos(p.a) * sp * dt; p.y += Math.sin(p.a) * sp * dt; if (p.x < 0 || p.x > 1) { p.a = Math.PI - p.a; p.x = clamp(p.x, 0, 1); } if (p.y < 0 || p.y > 1) { p.a = -p.a; p.y = clamp(p.y, 0, 1); } };
    TM.scene(cv, (g, w, h, t, dt) => {
      g.clearRect(0, 0, w, h);
      const n = st.R.length;
      st.glow = lerp(st.glow, clamp(n / 50, 0, 1), Math.min(1, dt * 2));
      const gl = g.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) * 0.6);
      gl.addColorStop(0, `rgba(255,110,30,${0.32 * st.glow})`); gl.addColorStop(1, 'rgba(255,60,10,0)');
      g.fillStyle = gl; g.fillRect(0, 0, w, h);
      const X = (p) => 20 + p.x * (w - 40), Y = (p) => 20 + p.y * (h - 60);
      for (const f of st.F) { move(f, 0.05, dt); g.fillStyle = 'rgba(160,160,165,.55)'; g.beginPath(); g.arc(X(f), Y(f), 3.5, 0, 7); g.fill(); }
      for (const p of st.P) { g.fillStyle = 'rgba(245,245,247,.9)'; g.beginPath(); g.arc(X(p), Y(p), 16, 0, 7); g.fill(); g.strokeStyle = 'rgba(255,255,255,.25)'; g.lineWidth = 6; g.beginPath(); g.arc(X(p), Y(p), 22, 0, 7); g.stroke(); }
      for (const i of st.I) { move(i, 0.12, dt); g.fillStyle = '#30d158'; g.beginPath(); g.arc(X(i), Y(i), 4, 0, 7); g.fill(); }
      const born = [];
      for (const r of st.R) {
        move(r, 0.32, dt);
        // elágazás: éghető molekulával ütközve
        for (const f of st.F) if (!f.used && Math.hypot(X(f) - X(r), Y(f) - Y(r)) < 8) { f.used = 1; if (st.R.length + born.length < 80 && Math.random() < (st.m === 'free' ? 1 : 0.35)) born.push({ x: r.x, y: r.y, a: r.a + 2 }); }
        for (const i of st.I) if (!i.used && Math.hypot(X(i) - X(r), Y(i) - Y(r)) < 10) { i.used = 1; r.dead = 1; }
        for (const p of st.P) if (Math.hypot(X(p) - X(r), Y(p) - Y(r)) < 20) { r.dead = 1; g.strokeStyle = 'rgba(255,255,255,.8)'; g.lineWidth = 2; g.beginPath(); g.arc(X(p), Y(p), 24, 0, 7); g.stroke(); }
        g.fillStyle = '#ff9f0a'; g.beginPath(); g.arc(X(r), Y(r), 4, 0, 7); g.fill();
        g.fillStyle = 'rgba(255,159,10,.18)'; g.beginPath(); g.arc(X(r), Y(r), 11, 0, 7); g.fill();
      }
      st.R = st.R.filter((r) => !r.dead).concat(born);
      st.F.forEach((f) => { if (f.used && Math.random() < dt * 0.4) { f.used = 0; f.x = Math.random(); f.y = Math.random(); } });
      st.I = st.I.filter((i) => !i.used);
      if (st.m !== 'free' && st.I.length < 14 && Math.random() < dt * 6) st.I.push({ x: Math.random(), y: Math.random(), a: Math.random() * 7 });
      if (st.m === 'free' && st.R.length < 6) st.R.push({ x: Math.random(), y: Math.random(), a: 0 });
      if (st.R.length > 70) st.R.splice(0, st.R.length - 70);
      if (st.m !== 'free' && !st.R.length && Math.random() < dt * 0.3) reset();
      g.font = '600 13px Inter, sans-serif'; g.textAlign = 'left'; g.fillStyle = '#fff';
      g.fillText(`aktív gyökök: ${st.R.length}`, 20, h - 14);
      g.textAlign = 'right'; g.fillStyle = '#a1a1a6';
      g.fillText(st.m === 'free' ? '● gyök   ● éghető molekula' : st.m === 'homo' ? '● gyök   ● inhibitor-ion' : '● gyök   ○ porszemcse (fal)   ● ion', w - 20, h - 14);
    });
  }

  TM.register(lesson);
})();
