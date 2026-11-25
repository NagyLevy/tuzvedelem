# Claude-nak — átadó a Jogi ismeretek ZH-gyakorlóhoz

> Ezt a fájlt másold be egy új Claude Code munkamenet elejére (vagy írd neki: „olvasd el a `Jog/Claude-nak.md`-t, és folytasd”).
> Minden, amit tudnod kell a folytatáshoz, itt van.

## Kinek és miért

- Egyetemi ZH-gyakorló a **Jogi ismeretek** tárgyhoz (Széchenyi István Egyetem, DKNB_JETM001, 2026/27 ősz).
- **Az elővizsga 2026-11-26-án van, feleletválasztós.** A felhasználó egy előadáson sem volt bent, ezért a tanulásnak nagyon egyszerűnek kell lennie.
- Hangnem: magyar, laikusnak szóló („laymans terms”), rövid, de tartalmilag pontos. Hasonlatokkal.
- Design: „Apple prémium” — üveghatás, nagy tipográfia, rugós animációk, sötét és világos mód, mobilbarát.

## Hol van

- Repo: https://github.com/NagyLevy/tuzvedelem. Az app a **`Jog/`** almappában van; a gyökér a meglévő Tűzvédelem-oldal, azt csak indokolt esetben módosítsd.
- Ág: **`jog-gyakorlo`**. A `main`-re merge-elni csak a tulajdonos kérésére szabad. A GitHub Pages a `main`-ről megy, a cím `https://nagylevy.github.io/tuzvedelem/Jog/`.
- Nincs build. Sima `<script>` tagek, ezért `file://`-ról is fut. Helyi szerver:
  ```
  python -m http.server 8765 --directory <repo gyökér>
  ```
  majd nyisd meg: http://localhost:8765/Jog/index.html

## Felépítés

```
Jog/
  index.html          oldalváz + script-sorrend (?v=N cache-busting: módosítás után emeld!)
  css/jog.css         teljes design (tokenek a :root-on, sötét mód, animációk)
  js/fx.js            FX.words (szavanként felúszó cím), FX.reveal (görgetésre megjelenés), FX.rings, konfetti
  js/app.js           hash-router + összes nézet + kvízmotor + localStorage
  data/temak.js       JOG_TEMAK — 11 téma: id, szín, ikon, rövid név
  data/jogteszt-1..3.js  JOG_TESZT — a jogteszt.pdf mind a 215 kérdése (n: 1–215)
  data/kurzus.js      JOG_KURZUS — 159 kérdés a COEDU kurzus önellenőrzőiből (GENERÁLT, ne kézzel szerkeszd)
  data/kurzus-x.js    JOG_KURZUS_X — kézzel írt magyarázat mind a 159 kurzus-kérdéshez ({id: 'szöveg'} vagy {x, old})
  data/zhminta.js     JOG_ZHMINTA — egy korábbi éles ZH 15 kérdése (fotóról). Éles formátum: 15 kérdés, 3 válasz, 1 jó; 8 pont = 2-es
  data/parbajok.js    JOG_PARBAJ — 33 összekeverhető fogalompár: {id, t, a:[név, lényeg], b:[név, lényeg], s:[[állítás, 'a'|'b', miért?]]}
  podcast/            NotebookLM-források leckénként + összefoglaló (Suits-stílus), 00-UTMUTATO.md
  data/animaciok.js   JOG_ANIM — animált „videó” ábrák leckénként (piramis / lanc / nyil típus, lépésenkénti narrációval)
  data/leckek/01-alap.js … 11-fogyaszto.js   JOG_LECKEK — a 11 lecke
  tools/parse_course.py  a kurzus-zip lesson*.html fájljaiból generálja a kurzus.js-t
  source/             minden eredeti anyag (diák, pdf-ek, jogteszt.pdf, kurzus-zip, .impera)
```

**Témák id-i** (a kérdések `t` mezője ezekre mutat):
`alap, alkotmany, allamszerv, birosag, munka, polgari1, polgari2, bunteto, nemzetkozi, kozig, fogyaszto`

### Kérdés-séma

```js
{ n: 7,                 // csak a jogtesztnél (a bankban 'j7' id-vel); kurzusnál id: 'k5B303A23'
  t: 'birosag',         // téma id
  q: 'Kérdés…',
  o: ['A opció', 'B opció', …],
  a: [2],               // a helyes opciók indexei; ha több elem van, többválaszos (checkbox + „Ellenőrzés”)
  x: 'Magyarázat laikusnak, 1–3 mondat.',
  old: 'A régi teszt még X-et jelölte, mert …'   // opcionális: ha a mai jog eltér a régi tesztkulcstól
}
```

- Az opciókat a kvíz összekeveri, ezért a kérdés és a magyarázat **ne hivatkozzon betűre** („a B válasz…”).
- Az `old` szöveg a kijelzésben „Régen:” előtagot kap, kivéve, ha maga is „Régen / A régi / évszám” szóval kezdődik.

### Lecke-séma

```js
window.JOG_LECKEK = (window.JOG_LECKEK || []).concat([{
  id: 'munka', perc: 6,
  egyMondat: 'Az egész téma egy mondatban (HTML, <b> kiemelés).',
  kartyak: [{ k: 'címke', cim: 'Kártya címe', html: '<ul><li>…</li></ul>', hasonlat: 'opcionális' }],
  szamok:  [{ v: '30 nap', l: 'mire vonatkozik' }],   // → Számok oldal + villámkártyák
  csapdak: ['Tipikus beugrató, HTML'],
  mini:    ['j123', 'k5B303A23', 'j7']                // 3 kérdés-id a lecke végi mini-kvízhez, a saját témájából
}]);
```

### Nézetek (hash-router, `js/app.js`)

| Hash | Mi |
|---|---|
| `#/` | Áttekintés: hero, statisztika, téma-gyűrűk, módok |
| `#/leckek`, `#/lecke/:id` | Lecke: Egy mondatban → 🎬 animált ábrák → kártyák → 🔢 Számok → ⚠️ Csapdák → 📋 Mit kérdeznek? (a téma összes kérdése a jó válasszal) → mini-kvíz |
| `#/sztori/:id` | **Fókusz mód (ADHD-barát)**: a lecke teljes képernyős, Instagram-sztori-szerű diákra bontva (intro → animációk → kártyák, a pontok koppintásra egyenként → minden 2. kártya után gyors kérdés → számok felpörögve → csapdák rázkódva → 2 záró kérdés → konfetti). Szóköz/→ tovább, ← vissza, Esc bezár, 1–5 válasz. A `.story` overlay a `document.body`-ba kerül (a `.view` transform-animációja miatt), a cleanup eltávolítja. |
| `#/gyakorlas` | módválasztó (forrás: mind / jogteszt / kurzus) |
| `#/kviz?mode=mix\|hibak\|teszt&t=<téma>&src=` | kvíz azonnali visszajelzéssel, magyarázattal és „Nem érted? → lecke” linkkel |
| `#/zh` | ZH-szimuláció az éles formátumban: 15 kérdés témakvóta szerint (`QUOTA`), 3 válasz (a jó + 2 véletlen rossz), 20 perc, visszajelzés nélkül, jegy az éles ponthatárral (`ZH_CUTS`: 8/10/12/14 pont) |
| `#/grind`, `#/grind?go=1&t=` | **🔥 Grind** — a fő gyakorló mód a ZH előtt. A bank ismétlődés nélküli, átalakítható része (`GPOOL`, ~383 kérdés) az éles formában: 3 válasz (a jó + 2 véletlen rossz; többválaszosnál véletlenül választott jó, a többi „Ez is jó lett volna”). Sorrend (`gOrder`): témák a ZH-súly (`GW`) szerint összefésülve, témán belül előbb a valódi ZH, aztán a rövid kérdések. 7 kérdéses aktív halmaz: rossz → 3 kérdés múlva vissza; jó egyszer → 7 múlva; elsőre jó → 25 múlva megerősítés; kétszer egymás után jó → „megy” (`S.g[id]` 0/1/2). Jó válasz után magától lapoz, 20-anként körzáró, becsült ZH-pont: 15·(k + (1−k)/3). |
| `#/kviz?mode=minta` | ⭐ Valódi ZH-minta: egy korábbi éles ZH 15 kérdése (`data/zhminta.js`, `JOG_ZHMINTA`, id `z1…z15`, `src: 'zh'`), azonnali magyarázattal. Az edző ezzel kezd. |
| `#/kartya?t=` | villámkártyák (Szóköz = fordít, ← nem tudtam, → tudtam) |
| `#/szamok` | az összes szám témánként + 🪜 évszám-létra (megbízatási idők, rigmussal) |
| `#/most` | **Edző – „Mit csináljak most?”**: egyetlen javaslat (`coachPick`): ① ha sok esedékes ismétlés van → `#/kviz?mode=most`; ② különben az első még át nem vett lecke fókusz módban; ③ ha minden téma ≥85% → ZH; ④ különben a leggyengébb téma, váltakozva kvíz (10) / párbaj / igaz-hamis. Alatta: ZH-visszaszámlálás, napi sorozat, XP, mai adag, témasávok a leggyengébbtől. |
| `#/kviz?mode=most` | ismétlés: esedékes kérdések (ismétlési rendszer), kiegészítve hibákkal és új kérdésekkel (10) |
| `#/kviz?...&n=10` | bármely kvíz levágása n kérdésre |
| `#/parbaj`, `#/parbaj/:id` | **Párbaj**: két összekeverhető fogalom egymás mellett, az állításokat a jó oldalra kell húzni (húzás / koppintás / ←→). Legjobb eredmény: `S.pb[id]`. |
| `#/villam?t=` | **Igaz vagy hamis?**: 20 kártya a kérdésbankból (kérdés + egy opció, 50% eséllyel jó); jobbra = jó válasz, balra = nem. A „mindkettő / A és B” típusú opciójú kérdések kimaradnak. Rossz válasz → `record(id, false)`. |
| `#/osszefoglalo` | egyoldalas, nyomtatható összefoglaló: évszám-létra + témánként egy mondat, számok, csapdák, párbaj-párok |

- Haladás: `localStorage['jog.v1']` = `{seen:{id:{ok,bad,last}}, wrong:[id…], best, flash, srs:{id:{b,due}}, xp, days:{'ÉÉÉÉ-HH-NN':n}, story:{témaId:ts}, pb:{párId:%}, coachN}`.
- Ismétlési rendszer (`record`): rossz → 2 perc; jó → 10 p, 1 ó, 5 ó, 1 nap, 3 nap fokozatok (`IV`); elsőre eltalált kérdés rögtön az 1 órás fokra. `dueIds()` = esedékesek.
- XP: kvíz-válasz 10, párbaj / igaz-hamis 5 (`bump`); `S.days` a napi sorozathoz (`dayStreak`).
- Hangos mód: `localStorage['jog.tts']`, böngésző `speechSynthesis` hu-HU hanggal (`TTS.say`). Fókusz módban a dia címét, minden ütemet és az animációk narrációját felolvassa (ilyenkor az animáció lassabban lép); párbajban és igaz-hamisban az állítást.
- Fókusz mód eleje: „Tippelj!” előzetes kérdés (pretest-hatás); a végén `S.story[id]` jelzi, hogy a lecke át van véve.
- Téma: `localStorage['jog.theme']`.
- Billentyűk: 1–9 vagy A–I = válasz, Enter / → = tovább.

## Eldöntött tartalmi szabályok (fontos!)

1. **A mai hatályos jog a helyes válasz.** Ha a régi jogteszt-kulcs mást jelölt, a kérdés `old` mezőben megkapja a régi választ és az okát.
2. **A 2026-os, „hatályosított” előadásdia a mérvadó** (`source/Alkotmanybirosag-…_2026_hatalyositott.pptx`):
   - AB-tagok: **9 évre** (a 2026. július 19. előtt választottak 12 évre), 2/3-dal választja az OGY. Az AB **elnökét maga az AB** választja, 3 évre.
   - Kúria elnöke és OBH elnöke: **6 év**. Legfőbb ügyész: **9 év**. Ombudsman (AJBH): **6 év**.
   - Új szerv: NVVH (lásd a dián).
3. Egyéb, az előadáshoz igazított tények:
   - Munkaszerződés kötelező elemei: felek adatai, munkakör, alapbér, munkavégzés helye.
   - Termék, termény, szaporulat elsajátítása = **származékos** szerzésmód.
   - Elbirtoklás: ingó 10 év, ingatlan 15 év.
   - Az előadás szerint az **Alaptörvény „nem jogszabály”** (a jogszabályok fölött áll).
   - j97 → a:[0,1,2] (az előadás szerint).
   - j211 → a Statútum 38. cikkére szűkítve; a magyarázat jelzi, hogy az előadás tágabb listát ad.
4. A **kurzus-kérdések kulcsát nem írjuk át** (a ZH valószínűleg abból jön). Ahol a mai jog eltér (k7F0315A5, k343A5A6D), a `kurzus-x.js` `old` mezője jelzi.
5. A kurzus fogyasztóvédelmi önellenőrzője a régi szabályt kérdezi (6 hónapos vélelem a jótállásnál). Ez a lecke csapdái közt szerepel.

## A .impera fájlok

- `source/*.impera` (3 db): az Impera nevű tesztelő app titkosított kérdéscsomagjai (a Moodle „Proszeminárium” kurzusból, valószínűleg minta-ZH-k).
- **Nem törtük fel, és ne is próbáld** (jelszót se fejts vissza).
- Ha a felhasználó megnyitja őket az Impera appban, és bemásolja vagy képernyőképen megmutatja a kérdéseket, akkor ezeket kell felvinni:
  - új fájlba, pl. `data/impera.js`, `src: 'impera'` mezővel és `i…` id-kkel;
  - a bankba és a forrásválasztóba be kell kötni (`app.js`: BANK összeállítás és a gyakorlás-nézet src-gombjai).

## Ellenőrzés módosítás után

```bash
node --check Jog/js/app.js
```

Gyors adat-validáció böngésző-konzolból (az oldalon):

```js
[...JOG_TESZT, ...JOG_KURZUS].filter(q => !q.o || !q.a.length || q.a.some(i => i >= q.o.length) || !JOG_TEMAK.some(t => t.id === q.t)).length  // 0 kell
JOG_LECKEK.flatMap(l => l.mini).filter(id => !(/^j\d+$/.test(id) ? JOG_TESZT.some(q => 'j' + q.n === id) : JOG_KURZUS.some(q => q.id === id))).length  // 0 kell
```

Utolsó állapot (2026-11-25):
- 215 + 159 kérdés, 0 hibás, a 11 lecke kész.
- Böngészőben végigtesztelve: főoldal, lecke, kvíz, többválaszos, Hibáim, ZH-szimuláció, villámkártya, Számok, mobil, sötét és világos mód. Konzolhiba nincs.
- Utána: edző (`#/most`), ismétlés-mód, párbaj (húzással is), igaz-hamis, összefoglaló, évszám-létra, hangos mód, tipp-kérdés — asztalon, mobilon, sötétben tesztelve, konzolhiba nincs.

## Ami még hátravan / ötletek

- [ ] **.impera kérdések felvitele**, ha a felhasználó átadja a szövegüket (lásd fent).
- [ ] Merge `jog-gyakorlo` → `main`, hogy élesben is elérhető legyen (csak a tulajdonos kérésére!).
- [ ] Opcionális: témánkénti ZH-szimuláció; PWA/offline.
- [ ] Ha a felhasználó NotebookLM-ből mp3-at ad, leckénként beágyazható (Podcast → kvíz folyamat).
- [ ] A `D:\jog\Jogi-ismeretek-ZH-kérdések-2026.pdf` NEM megbízható (ismeretlen, valószínűleg AI-generált): nem importáljuk, legfeljebb ötletnek, a diákkal ellenőrizve.
- [ ] Ha a felhasználó új diát vagy minta-ZH-t hoz, a tényeket a 2. pont szerint egyeztesd, és ahol eltér, `old` megjegyzést írj.

## Munkastílus, amit a felhasználó kért

- Magyarul válaszolj, röviden.
- A felhasználó ADHD-s: minden tanulós tartalom legyen animált, rövid adagokban, egyszerre egy dolog (lásd Fókusz mód).
- Commit üzenet végére: `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>` (vagy amelyik modell vagy).
- `main`-re pusholni vagy merge-elni csak kérésre.
