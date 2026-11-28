# Claude-nak — átadó a Fizika elméleti felkészítőhöz

> Új Claude Code munkamenetben írd: „olvasd el a `fizika/Claude-nak.md`-t, és folytasd”. Itt van minden, ami a folytatáshoz kell.

## Kinek és miért

- **Klasszikus fizika** (Dr. Giczi Ferenc, Széchenyi István Egyetem). **ZH: 2026-11-30, hétfő.** Cél: a 10 pontból legalább 7, hogy meglegyen a megajánlott jegy.
- Első kör: az elméleti rész, 10 fejezet (3a–10), mindegyik a diasor alapján.
- Második kör: **Tanulás** (ismétlős kártyák, kvíz, próba-ZH) és **ZH Roadmap** (vezetett felkészülés a tanár feladatsoraiból és próba-ZH-iból, lépésenként levezetett megoldásokkal).
- A hétfői ZH-ban kinematika, dinamika és hőtan nincs külön számonkérve. Az optika csak elméleti kérdés.
- Hangnem: magyar, rövid mondatok, egyszerű szavak. A tartalomnak pontosnak kell lennie.
- Design: „Apple prémium”, sok animáció. A tokenek és a szabályok a `DESIGN.md`-ben vannak.

## Szigorú szabályok (a tulajdonostól)

- **Ne találj ki fizikai tartalmat.** Csak az kerülhet be, ami a diákon vagy a segédleten (`puska_klasszfiz.pdf`) szerepel, a Roadmapben pedig az, ami a tanár feladatsoraiban, megoldásaiban és próba-ZH-iban van.
- Saját számolást és saját szemléltetést jelölj: „(saját számolás)”, „(saját szemléltetés)”.
- **A rejtett diák (show=0) kimaradnak**, kivéve azt a képletet, amelyik rajta van a puskán. Ami kimaradt, azt a lecke `hianyzik` mezőjébe írd.
- A puskán lévő képlet jele `puska: true`. Ami nincs a puskán, az „Fejben tartsd”.
- **Push csak a tulajdonos kifejezett igenje után.** Előtte mutasd meg, mi kerül fel és hova. A `main`-re merge-elni külön igen kell.

## Hol van

- Repo: https://github.com/NagyLevy/tuzvedelem. Az app a `fizika/` almappában van, a munkaág neve **`fizika-redesign`**.
- A GitHub Pages a `main`-ről megy, a cím: `https://nagylevy.github.io/tuzvedelem/fizika/`.
- Nincs build, sima `<script>` tagekből áll. Helyi futtatás:
  ```
  python -m http.server 8765 --bind 127.0.0.1
  ```
  A repo gyökeréből indítsd, aztán nyisd meg: http://127.0.0.1:8765/fizika/
- A diák forrása a repón kívül, a `D:\fizika` mappában van: pptx-ek, `10-Optika.pdf` és `puska_klasszfiz.pdf`. Ugyanitt vannak a feladatsorok, a megoldások és a próba-ZH-k (a Roadmap forrása).

## Felépítés

```
fizika/
  index.html          váz + script-sorrend (?v=N cache-busting: módosítás után emeld!)
  DESIGN.md           design-szabályok (Claude Design vászonból)
  css/fizika.css      teljes stílus, tokenek a :root-on, világos mód
  js/fx.js            FX.words / reveal / rings / konfetti
  js/abrak.js         FIZ_ABRAK — 22 interaktív canvas-ábra + window.FIZK rajzsegédek (arrow, txt, line, wl…)
  js/videok.js        FIZ_VIDEOK — 12 jelenetekre bontott animáció (felirat + hu-HU felolvasás)
  js/tanul.js         FIZ_TANUL — ismétlős kártyák (Leitner-dobozok) és a leckékből generált kvízkérdések
  js/app.js           hash-router, nézetek: főoldal, lecke, sztori (Fókusz mód), tanulás, kártya, kvíz, videók, képletlap, puska-dekóder, térkép, roadmap
  data/temak.js       FIZ_TEMAK — 10 fejezet: id, név, szín, diaszám
  data/leckek/*.js    FIZ_LECKEK — leckénként: egyMondat, kepletek, kartyak, csapdak, hianyzik, abrak, videok
  data/puska.js       FIZ_PUSKA — a segédlet 36 képlete jelmagyarázattal, lecke-id-hoz kötve (null = nincs az előadásban)
  data/roadmap/*.js   FIZ_ROADMAP — 8 állomás: elméleti kérdések, receptek, tippek, levezetett és gyakorló feladatok
  tools/check.mjs     validátor: TeX (KaTeX), bol-hivatkozások, puska-séma, létező ábra/videó kulcsok, roadmap-séma
```

## Sémák

- **Képlet:** `{nev, tex, jel, mikor?, puska, bol?}`. A `bol` ugyanazon lecke `nev`-eire hivatkozik, ebből épül a Térkép.
- **Puska:** `{sz, nev, tex, jelek:[{s,d}], lecke}`.
- **Ábra:** `FIZ_ABRAK[k] = {cim, leiras, mount(body, out) → cleanup}`. A `scene()` segéd animál, és a látótéren kívül megáll.
- **Videó:** `{cim, tema, hossz, jelenetek:[{t, cim, szoveg}], rajz(ctx, t, W, H, C)}`.
- **Roadmap-állomás:** `{id, nev, leckek, perc, lenyeg, elmelet:[{k, v, forras, trukk?}], receptek:[{cim, mikor, lepesek, tex?}], tippek, feladatok, gyakorlo:[{id, forras, szoveg, valasz, tipp?}]}`.
- **Levezetett feladat:** `{id, cim, forras, zh?, szoveg, adatok, tipp?, lepesek:[{cim, szoveg?, tex?, be?, er?, megj?}], valasz, megj?}`. A `tex` az általános képlet, a `be` a behelyettesítés, az `er` a részeredmény mértékegységgel.
- **Útvonalak:** `#/roadmap`, `#/roadmap/<állomás-id>`, `#/roadmap/elmelet` (`?nem=1`: csak ami még nem megy), `#/roadmap/zh`.
- **Tárolás (localStorage):** `fiz.v1` (olvasás), `fiz.tanul.v1` (kártyák, kvíz), `fiz.road.v1` (roadmap-pipák), `fiz.theme`, `fiz.tts`.
- **TeX JS-stringben:** dupla visszaper kell (`\\frac`). A `<` helyett `\\lt` kell, mert különben HTML-tagnak látszik.

## Ellenőrzés

```
node fizika/tools/check.mjs
```

A repo gyökeréből futtasd. Elvárt kimenet: `OK: 10 lecke, 108 képlet, 36 puska-képlet, 22 ábra, 12 videó · roadmap: 8 állomás, 48 elméleti kérdés, 71 levezetés, 35 gyakorló`.

## Nyitott / jelölt dolgok

- **Mach-kúp:** a puskán rajta van, a látható diákon nincs (`lecke: null`, a 9-es lecke `hianyzik` mezőjében is jelölve).
- **Nagyító:** az optika diás példája $d_0=0{,}15$ m-rel számol, máshol $d_0=0{,}25$ m szerepel. A `csapdak` mezőben jelölve.
- **Az optika forrása** Horváth A. beamer-PDF-je (75 frame), nem Giczi-diasor.
- **A puska termodinamika része** nem tartozik a ZH-leckékhez, ezért kimaradt.
- **Roadmap, tanári elírások:** a Rezgések ZH 6-nál ($4\pi$ a $4\pi^2$ helyett) és a Rugalmasság ZH 8-nál (kimaradt $\pi$) a helyes érték szerepel, a tanár eredménye megjegyzésben. A Rugalmasság ZH 7 kimaradt („nem vettük”). A Hangtanhoz nincs gyakorló, mert a feladatsor nem ad végeredményt.
- A tanár $g = 10\ \mathrm{m/s^2}$-tel számol, a Roadmap is.
- A videókat Drive-ról nem lehet letölteni, ezért a videók programozott canvas-animációk.
