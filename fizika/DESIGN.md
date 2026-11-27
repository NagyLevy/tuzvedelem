# Fizika — design rendszer

Forrás: a Claude Design vászon (Main, Lecke, Videó, Puska artboardok). A tokenek a `css/fizika.css` elején élnek; ez a fájl a szabályokat rögzíti.

## Szín
- Alap sötét (`--bg #07070A`), világos mód `:root[data-theme="light"]`. A téma a `localStorage['fiz.theme']`-ben marad.
- `--accent #0A84FF`, link `--link`. Minden nézetnek van témaszíne: `--c` (a router állítja a téma `szin` mezőjéből).
- Jelölés: **Puskán** = `--puska` (türkiz), **Fejben tartsd** = `--fejben` (narancs). Csak erre a két jelentésre használd őket.
- Fejezetszínek: 3a `#5E9EFF`, 3b `#FF9F45`, 4 `#3DD6C4`, 5 `#B18CFF`, 6 `#FF6B8A`, 6a `#7FD45A`, 7 `#FFC94D`, 8 `#4CC3FF`, 9 `#FF7FD1`, 10 `#9EA8FF`.
- Vászon (canvas) színek mindig `FIZ.colors()`-ból jönnek, és `fiz:theme` eseményre újrarajzolódnak.

## Betű
- Szöveg: Inter. Címek: Inter Tight (`--display`), szoros betűköz. Képletek: KaTeX; hasonlatok dőlt Source Serif 4 (`--math`).
- Hero: `.h-hero` clamp 56–112px. Leckecím: `.h1`. Szekciócím: `.h2`.

## Forma és mozgás
- Kártya sugár: 32 / 24 / 20px (`--r-l/m/s`), 1px `--line` keret, üveges `--card` háttér.
- Görbe: `--ease` (belépés), `--spring` (gomb, pötty). Belépő animáció: `.reveal` → `.in`, címek `.word-rise`.
- `prefers-reduced-motion`: minden animáció kikapcsol, a videók nem indulnak maguktól.

## Komponensek
- `.kk` képletkártya: név, Puskán/Fejben jelvény, display képlet, jelek jelentése, „mikor kell”.
- `.mk` magyarázókártya: címke, cím, szöveg, dőlt hasonlat.
- `.csapda`: narancs figyelmeztető sor.
- `.stage`: interaktív ábra csúszkákkal és élő kimenettel.
- `.video`: canvas jelenetlejátszó felirattal, jelenetchipekkel, hu-HU felolvasással.
- `.story`: Fókusz mód, teljes képernyő, sávok fent, lépésenkénti felfedés.
- `.tema`: főoldali fejezetkártya, haladásgyűrűvel.

## Elrendezés
- `.wrap` max 1180px, 24px oldalmargó (mobilon 16px). Rács: `.grid` + `--min` oszlopszélesség.
- 375px-en nincs vízszintes görgetés; hosszú képlet a saját dobozában görget.
