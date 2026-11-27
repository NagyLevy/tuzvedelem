# Claude-nak — átadó a Fizika elméleti felkészítőhöz

> Új Claude Code munkamenetben írd: „olvasd el a `fizika/Claude-nak.md`-t, és folytasd”. Itt van minden, ami a folytatáshoz kell.

## Kinek és miért

- **Klasszikus fizika** (Dr. Giczi Ferenc, Széchenyi István Egyetem). **ZH: 2026-11-30, hétfő.** Cél: a 10 pontból legalább 7, hogy meglegyen a megajánlott jegy.
- Ez az első kör, és csak az elméleti részt fedi le: 10 fejezet (3a–10), mindegyik a diasor alapján.
- Hangnem: magyar, rövid mondatok, egyszerű szavak. A tartalomnak pontosnak kell lennie.
- Design: „Apple prémium”, sok animáció. A tokenek és a szabályok a `DESIGN.md`-ben vannak.

## Szigorú szabályok (a tulajdonostól)

- **Ne találj ki fizikai tartalmat.** Csak az kerülhet be, ami a diákon vagy a segédleten (`puska_klasszfiz.pdf`) szerepel.
- Saját számolást és saját szemléltetést jelölj: „(saját számolás)”, „(saját szemléltetés)”.
- **A rejtett diák (show=0) kimaradnak**, kivéve azt a képletet, amelyik rajta van a puskán. Ami kimaradt, azt a lecke `hianyzik` mezőjébe írd.
- A puskán lévő képlet jele `puska: true`. Ami nincs a puskán, az „Fejben tartsd”.
- **Push csak a tulajdonos kifejezett igenje után.** Előtte mutasd meg, mi kerül fel és hova. A `main`-re merge-elni külön igen kell.

## Hol van

- Repo: https://github.com/NagyLevy/tuzvedelem. Az app a `fizika/` almappában van, az ág neve **`fizika-elmelet`**.
- A GitHub Pages a `main`-ről megy, a cím: `https://nagylevy.github.io/tuzvedelem/fizika/`.
- Nincs build, sima `<script>` tagekből áll. Helyi futtatás:
  ```
  python -m http.server 8765 --bind 127.0.0.1
  ```
  A repo gyökeréből indítsd, aztán nyisd meg: http://127.0.0.1:8765/fizika/
- A diák forrása a repón kívül, a `D:\fizika` mappában van: pptx-ek, `10-Optika.pdf` és `puska_klasszfiz.pdf`.

## Felépítés

```
fizika/
  index.html          váz + script-sorrend (?v=N cache-busting: módosítás után emeld!)
  DESIGN.md           design-szabályok (Claude Design vászonból)
  css/fizika.css      teljes stílus, tokenek a :root-on, világos mód
  js/fx.js            FX.words / reveal / rings / konfetti
  js/abrak.js         FIZ_ABRAK — 22 interaktív canvas-ábra + window.FIZK rajzsegédek (arrow, txt, line, wl…)
  js/videok.js        FIZ_VIDEOK — 12 jelenetekre bontott animáció (felirat + hu-HU felolvasás)
  js/app.js           hash-router, nézetek: főoldal, lecke, sztori (Fókusz mód), videók, képletlap, puska-dekóder, térkép
  data/temak.js       FIZ_TEMAK — 10 fejezet: id, név, szín, diaszám
  data/leckek/*.js    FIZ_LECKEK — leckénként: egyMondat, kepletek, kartyak, csapdak, hianyzik, abrak, videok
  data/puska.js       FIZ_PUSKA — a segédlet 36 képlete jelmagyarázattal, lecke-id-hoz kötve (null = nincs az előadásban)
  tools/check.mjs     validátor: TeX (KaTeX), bol-hivatkozások, puska-séma, létező ábra/videó kulcsok
```

## Sémák

- **Képlet:** `{nev, tex, jel, mikor?, puska, bol?}`. A `bol` ugyanazon lecke `nev`-eire hivatkozik, ebből épül a Térkép.
- **Puska:** `{sz, nev, tex, jelek:[{s,d}], lecke}`.
- **Ábra:** `FIZ_ABRAK[k] = {cim, leiras, mount(body, out) → cleanup}`. A `scene()` segéd animál, és a látótéren kívül megáll.
- **Videó:** `{cim, tema, hossz, jelenetek:[{t, cim, szoveg}], rajz(ctx, t, W, H, C)}`.
- **TeX JS-stringben:** dupla visszaper kell (`\\frac`). A `<` helyett `\\lt` kell, mert különben HTML-tagnak látszik.

## Ellenőrzés

```
node fizika/tools/check.mjs
```

A repo gyökeréből futtasd. Elvárt kimenet: `OK: 10 lecke, 108 képlet, 36 puska-képlet, 22 ábra, 12 videó`.

## Nyitott / jelölt dolgok

- **Mach-kúp:** a puskán rajta van, a látható diákon nincs (`lecke: null`, a 9-es lecke `hianyzik` mezőjében is jelölve).
- **Nagyító:** az optika diás példája $d_0=0{,}15$ m-rel számol, máshol $d_0=0{,}25$ m szerepel. A `csapdak` mezőben jelölve.
- **Az optika forrása** Horváth A. beamer-PDF-je (75 frame), nem Giczi-diasor.
- **A puska termodinamika része** nem tartozik a ZH-leckékhez, ezért kimaradt.
- **Következő kör:** gyakorló (számolós) rész. A videókat Drive-ról nem lehet letölteni, ezért a videók programozott canvas-animációk.
