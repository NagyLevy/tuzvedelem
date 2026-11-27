/* 8 — Hullámtan, mechanikai hullámok. Forrás: 8-Hullámtan.ppt, 2–42. dia (a rejtett diák kimaradnak). */
window.FIZ_LECKEK = (window.FIZ_LECKEK || []).concat([{
  id: '8',
  perc: 11,
  forras: '8-Hullámtan, 2–42. dia',
  egyMondat: 'A hullám egy <b>zavar tovaterjedése</b> a közegben. Nem a részecskék mennek tova, hanem a rezgésállapot, az energia és az impulzus. Alapképlet: $c=f\\cdot\\lambda$.',
  kepletek: [
    { nev: 'Hullámterjedés leírása', tex: 'Z(x,t) = f(x \\pm vt)', jel: 'Egyenes mentén haladó zavar. Periodikus hullámnál $f$ periodikus függvény.', puska: true },
    { nev: 'Terjedési sebesség', tex: 'c = \\frac{\\lambda}{T} = f\\cdot\\lambda', jel: '$\\lambda$ hullámhossz, $T$ periódusidő, $f$ frekvencia. A puskán $v=\\lambda f$, $f=1/T$.', mikor: 'Szinte minden hullámos feladat ezzel indul.', puska: true },
    { nev: 'Harmonikus hullám', tex: 'Z(x,t) = A\\sin\\left(\\omega\\left(t-\\frac{x}{c}\\right)+\\alpha\\right) = A\\sin(\\omega t - kx + \\alpha)', jel: '$\\omega=\\frac{2\\pi}{T}$ körfrekvencia, $k=\\frac{2\\pi}{\\lambda}$ hullámszám. Időben és térben is periodikus.', mikor: 'A puskán: $Z(x,t)=A\\sin(kx-\\omega t)$. Ugyanaz a hullám, csak más fázis-előjellel.', puska: true, bol: ['Terjedési sebesség'] },
    { nev: 'Gömbhullám', tex: 'Z(r,t) = \\frac{A}{r}\\sin\\left(\\omega\\left(t-\\frac{r}{c}\\right)+\\alpha\\right)', jel: 'Pontszerű forrás. Az amplitúdó $1/r$ szerint csökken. Síkhullámnál $x$ helyett $\\underline{e}\\cdot\\underline{r}$.', puska: false, bol: ['Harmonikus hullám'] },
    { nev: 'Interferencia: erősítés és kioltás', tex: 's_2 - s_1 = n\\cdot\\lambda \\;\\text{(erősítés)},\\qquad s_2 - s_1 = n\\cdot\\lambda + \\frac{\\lambda}{2} \\;\\text{(kioltás)}', jel: '$s_1$, $s_2$ a két forrástól mért távolság, $n$ egész. Erősítésnél $\\Delta\\varphi=0,2\\pi,4\\pi,\\dots$', mikor: 'Két azonos fázisú, azonos frekvenciájú forrás. A puskán $d_1-d_2$ a jel.', puska: true, bol: ['Terjedési sebesség'] },
    { nev: 'Törési törvény', tex: '\\frac{\\sin\\alpha}{\\sin\\beta} = \\frac{c_1}{c_2} = n_{21}', jel: '$\\alpha$ beesési, $\\beta$ törési szög a beesési merőlegestől. A megtört sugár a beesési síkban van.', mikor: 'Visszaverődésnél: a visszaverődés szöge = beesési szög.', puska: true },
    { nev: 'Rugalmas hullám szilárd testben', tex: 'c_l = \\sqrt{\\frac{E}{\\rho}},\\quad c_{tr} = \\sqrt{\\frac{G}{\\rho}}', jel: '$c_l$ longitudinális, $c_{tr}$ transzverzális. $c_l>c_{tr}$, kb. $c_l\\approx 2c_{tr}$.', mikor: 'Szilárd testben mindkettő terjed.', puska: false },
    { nev: 'Transzverzális hullám húrban', tex: 'c_{tr} = \\sqrt{\\frac{F}{q\\rho}}', jel: '$F$ feszítőerő, $q$ keresztmetszet, $\\rho$ sűrűség. A puskán $v=\\sqrt{F_h/\\mu}$, ahol $\\mu=q\\rho$ az egységnyi hossz tömege.', puska: true },
    { nev: 'Hullám folyadékban és gázban', tex: 'v_f = \\sqrt{\\frac{1}{\\chi\\rho}},\\quad v_{gáz} = \\sqrt{\\frac{c_p}{c_v}RT}', jel: 'Csak longitudinális hullám terjed. $\\chi$ kompresszibilitás: $-\\frac{\\Delta V}{V}=\\chi\\Delta p$.', mikor: 'Gázban első közelítésben független a nyomástól. $v_{levegő}=331{,}5$ m/s.', puska: false },
    { nev: 'Energiasűrűség', tex: '\\bar\\varepsilon = \\frac{\\Delta E}{\\Delta V} = \\frac12\\rho\\omega^2A^2 = 2\\pi^2\\rho\\nu^2A^2', jel: 'Egy részecske energiája $E=\\frac12 m\\omega^2A^2$. Arányos a sűrűséggel, a frekvencia és az amplitúdó négyzetével.', puska: false },
    { nev: 'Intenzitás', tex: 'P = \\bar\\varepsilon\\, q\\, c,\\quad I = \\frac{P}{q} = \\bar\\varepsilon\\, c = 2\\pi^2\\rho\\nu^2A^2c', jel: '$P$ az energiaáramlás teljesítménye, $q$ a felület. A puskán (hangtan): $I=P/A$.', puska: true, bol: ['Energiasűrűség'] },
    { nev: 'Állóhullám: két rögzített vagy két szabad vég', tex: 'l = n\\cdot\\frac{\\lambda_n}{2}', jel: 'Csomópontok nyugalomban, duzzadóhelyek max. amplitúdóval. $n$ a duzzadóhelyek száma rögzített végeknél.', puska: false, bol: ['Terjedési sebesség'] },
    { nev: 'Állóhullám: egy rögzített, egy szabad vég', tex: 'l = n\\cdot\\frac{\\lambda_n}{2} + \\frac{\\lambda_n}{4}', jel: 'A szabad végen duzzadóhely, a rögzítetten csomópont.', puska: false, bol: ['Állóhullám: két rögzített vagy két szabad vég'] }
  ],
  kartyak: [
    { k: 'Fogalom', cim: 'Mi a hullám?', html: '<ul><li>Kiterjedt közegben létrejött zavar helyének tovaterjedése.</li><li>A részecskék az egyensúlyi helyük körül rezegnek. Átlagos elmozdulásuk nulla.</li><li>Transzverzális: merőleges rezgés. Longitudinális: terjedés irányú rezgés.</li></ul>', hasonlat: 'Stadionhullám: mindenki a helyén áll fel és ül le, a hullám mégis körbemegy.' },
    { k: 'Képlet', cim: 'Időben és térben periodikus', html: '<ul><li>Egy pontot nézve: rezgés, periódusa $T$.</li><li>Egy pillanatot nézve: szinuszgörbe, periódusa $\\lambda$.</li><li>$\\omega=2\\pi/T$ és $k=2\\pi/\\lambda$ ugyanaz a szerkezet.</li></ul>' },
    { k: 'Interferencia', cim: 'Szuperpozíció', html: '<ul><li>Egy pontban a rezgésállapot az egyes hullámok összege.</li><li>Útkülönbség $n\\lambda$: erősítés. $n\\lambda+\\lambda/2$: kioltás.</li><li>Diás példa: 12 Hz, 1,2 m/s → $\\lambda=0{,}1$ m. 25−15 = 10 cm = $1\\lambda$: erősítés. 22−17 = 5 cm = $\\lambda/2$: kioltás. (Saját számolás a dia adataiból.)</li></ul>' },
    { k: 'Elv', cim: 'Huygens–Fresnel', html: '<ul><li>A hullámfelület minden pontjából elemi gömbhullámok indulnak.</li><li>Később a hatás ezek interferenciája.</li><li>Ez magyarázza a visszaverődést, a törést és az elhajlást.</li></ul>' },
    { k: 'Elhajlás', cim: 'Rés mérete számít', html: '<ul><li>$D\\gg\\lambda$: a hullám szinte egyenesen megy át.</li><li>$D\\approx\\lambda$: erősen elhajlik.</li><li>$D\\ll\\lambda$: a rés új pontforrásként viselkedik.</li></ul>' },
    { k: 'Állóhullám', cim: 'Csomó és duzzadóhely', html: '<ul><li>Visszaverődő és beeső hullám összege, alkalmas frekvenciánál.</li><li>Rögzített vég: csomópont. Szabad vég: duzzadóhely.</li><li>Diás példa: 75 cm, 5 m/s, 3 duzzadóhely → $\\lambda=0{,}5$ m, $f=10$ Hz. (Saját számolás.)</li></ul>' }
  ],
  csapdak: [
    'Rögzített végen a hullám ellentétes fázisban verődik vissza, szabad végen azonos fázisban (a diák animációja alapján).',
    'A húros képletben $q\\rho$ áll, nem csak $\\rho$. Átmérőből: $q=\\frac{d^2\\pi}{4}$.',
    'A pont max. sebessége $A\\omega$, nem $c$. A diás húros példában $v_{max}=A\\omega\\approx1{,}57$ m/s, $a_{max}=A\\omega^2\\approx493$ m/s² (saját számolás: 5 mm, 50 Hz).',
    'Az intenzitás az amplitúdó négyzetével arányos. Kétszeres amplitúdó → négyszeres intenzitás.',
    'Folyadékban és gázban nincs transzverzális hullám (nincs számottevő nyíróerő).'
  ],
  hianyzik: ['A 14., 15., 22., 27. és 34. dia rejtett, kimaradt. A 38. és 43. dia videó volt, a PDF-ben üres.'],
  abrak: ['hullam', 'interferencia', 'allohullam'],
  videok: ['hullam-terjedes', 'allohullam']
}]);
