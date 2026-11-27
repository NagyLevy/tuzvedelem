/* 9 — Hangtan. Forrás: 9-Hangtan.ppt, 2–39. dia (a rejtett diák kimaradnak). */
window.FIZ_LECKEK = (window.FIZ_LECKEK || []).concat([{
  id: '9',
  perc: 9,
  forras: '9-Hangtan, 2–39. dia',
  egyMondat: 'A hang mechanikai hullám, a hallható tartomány <b>20–20 000 Hz</b>. Hangszerekben állóhullámok alakulnak ki. Mozgó forrásnál vagy megfigyelőnél a hallott frekvencia eltolódik: ez a <b>Doppler-hatás</b>.',
  kepletek: [
    { nev: 'Hangköz, oktáv', tex: '\\text{hangköz} = \\frac{f_2}{f_1},\\qquad \\frac{f_2}{f_1} = \\frac{2}{1}\\;\\text{(oktáv)}', jel: 'A hangmagasság objektív mértéke a frekvencia. Hallás: 10 oktáv, zene: 7, beszéd: 1.', puska: false },
    { nev: 'Húr sajátfrekvenciái', tex: '\\lambda_n = \\frac{2l}{n},\\quad f_n = \\frac{n}{2l}\\sqrt{\\frac{F}{q\\rho}} = n\\cdot f_1', jel: '$l$ húrhossz, $F$ feszítőerő, $q$ keresztmetszet, $\\rho$ sűrűség. Alaphang: $f_1=\\frac{1}{2l}\\sqrt{\\frac{F}{q\\rho}}$.', mikor: 'Felhangok: $f_n=n\\cdot f_1$, ezek a harmonikus felhangok.', puska: false, bol: ['Hangköz, oktáv'] },
    { nev: 'Nyitott síp', tex: 'f_n = n\\cdot\\frac{c}{2l} = n\\cdot f_1,\\quad n = 1,2,3,\\dots', jel: 'Mindkét vég nyitott: két végén duzzadóhely.', puska: false },
    { nev: 'Zárt síp', tex: 'f_n = (2n-1)\\cdot\\frac{c}{4l} = (2n-1)\\cdot f_1,\\quad n = 1,2,3,\\dots', jel: 'Csak páratlan felhangok. Az alaphang egy oktávval mélyebb, mint az azonos hosszú nyitott sípé.', puska: false, bol: ['Nyitott síp'] },
    { nev: 'Doppler: mozgó megfigyelő', tex: "f' = f\\left(1 \\pm \\frac{v_m}{c}\\right)", jel: '$v_m$ a megfigyelő sebessége. $+$ ha közeledik, $-$ ha távolodik.', mikor: 'A közeledő megfigyelő egységnyi idő alatt több rezgést fog fel.', puska: true },
    { nev: 'Doppler: mozgó forrás', tex: "\\lambda' = \\lambda - v_fT,\\quad f' = \\frac{f}{1 \\mp \\frac{v_f}{c}}", jel: '$v_f$ a forrás sebessége. $-$ ha közeledik (nő a frekvencia), $+$ ha távolodik.', mikor: 'Közeledő forrásnál az azonos fázisú pontok távolsága csökken.', puska: true },
    { nev: 'Doppler: általános (puska)', tex: "f' = f\\,\\frac{c + v_m}{c - v_f}", jel: 'A két eset összevonva, közeledő irányra pozitív sebességekkel.', puska: true, bol: ['Doppler: mozgó megfigyelő', 'Doppler: mozgó forrás'] },
    { nev: 'Hangtér: kitérés és sebesség', tex: 'Z(x,t) = A\\sin\\omega\\left(t-\\frac{x}{c}\\right),\\quad v = v_{max}\\cos\\omega\\left(t-\\frac{x}{c}\\right),\\quad v_{max} = \\omega A', jel: 'A részecskék kitérése és sebessége.', puska: false },
    { nev: 'Hangintenzitás', tex: 'I = \\frac{P}{q} = \\bar\\varepsilon c = \\frac12\\rho_0c\\,\\omega^2A^2 = \\frac12\\rho_0c\\,v_{max}^2', jel: '$P$ teljesítmény, $q$ felület. Hangerősség = hangintenzitás.', mikor: 'Pontforrás minden irányba: $q=4\\pi r^2$ (gömbfelület).', puska: true, bol: ['Hangtér: kitérés és sebesség'] },
    { nev: 'Hangintenzitás-szint', tex: 'n = 10\\cdot\\lg\\frac{I}{I_0}\\;\\text{dB},\\quad I_0 = 10^{-12}\\,\\frac{\\text{W}}{\\text{m}^2}', jel: 'Hallásküszöb: $I_0$, 0 dB. Fájdalomküszöb: $10$ W/m², 130 dB.', mikor: '+10 dB = tízszeres intenzitás.', puska: true, bol: ['Hangintenzitás'] },
    { nev: 'Hangosság (phon)', tex: 'H = 10\\cdot\\lg\\frac{I}{I_0}', jel: 'Annyi phon, ahány dB-es az ugyanolyan hangosnak hallott 1000 Hz-es tiszta hang.', mikor: 'Suttogás 20, beszélgetés 50, utca 70, repülőmotor 120 phon.', puska: false, bol: ['Hangintenzitás-szint'] }
  ],
  kartyak: [
    { k: 'Alap', cim: 'Mi a hang?', html: '<ul><li>Forrás → közeg → érzékszerv.</li><li>Hallható: 20–20 000 Hz. Alatta infrahang, felette ultrahang.</li><li>Hullámhossz a hallható tartományban: 17 m és 1,7 cm között.</li></ul>' },
    { k: 'Zene', cim: 'Hangmagasság, hangszín, hangerő', html: '<ul><li>Magasság: a frekvencia. Magasabb hang = nagyobb frekvencia.</li><li>Hangszín: az alaphang $f$ és a $2f, 3f,\\dots$ felhangok aránya, a spektrum.</li><li>Hangerő: az intenzitás.</li></ul>', hasonlat: 'Zongora és hegedű ugyanazon az A hangon: ugyanaz az alaphang, más felhangok. Ezért szól másképp.' },
    { k: 'Hangforrás', cim: 'Sajátrezgések', html: '<ul><li>A rugalmas testben a visszaverődő hullámok interferenciájából állóhullámok lesznek.</li><li>Ezek frekvenciái a sajátfrekvenciák.</li><li>A hangvilla rossz hangsugárzó, ezért kell alá rezonátor doboz.</li></ul>' },
    { k: 'Terjedés', cim: 'Visszaverődés, törés, elhajlás', html: '<ul><li>Visszhang: legalább 0,1 s késés kell, ez min. 17 m távolság.</li><li>Törés: $\\frac{\\sin\\alpha}{\\sin\\beta}=\\frac{c_1}{c_2}$. Diás példa: CO₂-lencse, 260 és 340 m/s.</li><li>Elhajlás: a hang behatol a geometriai árnyékba.</li></ul>' },
    { k: 'Doppler', cim: 'Ki mozog?', html: '<ul><li>Megfigyelő mozog: $f\'=f(1\\pm v_m/c)$.</li><li>Forrás mozog: $f\'=f/(1\\mp v_f/c)$.</li><li>Diás feladatok: 400 Hz, 72 km/h = 20 m/s, $c=340$. Megfigyelő: ≈423,5 Hz. Forrás: 425 Hz, $\\lambda\'=0{,}8$ m. (Saját számolás.)</li></ul>', hasonlat: 'Elhúzó mentőautó: közeledve magasabb, távolodva mélyebb a sziréna.' },
    { k: 'Decibel', cim: 'Logaritmikus skála', html: '<ul><li>$n=10\\lg(I/I_0)$.</li><li>Diás feladat: 10 m-re 90 dB. $I=10^{-3}$ W/m², $P=I\\cdot4\\pi r^2\\approx1{,}26$ W. (Saját számolás.)</li><li>1000 Hz-en a legérzékenyebb a hallás.</li></ul>' }
  ],
  csapdak: [
    'km/h → m/s: osztani 3,6-tal. 72 km/h = 20 m/s.',
    'Doppler-előjelek: közeledésnél mindig nő a hallott frekvencia. Ebből ellenőrizd az előjelet.',
    'Zárt sípnál $\\frac{c}{4l}$ és csak páratlan felhangok. Az „első felhang” zárt sípnál $3f_1$, nyitottnál $2f_1$.',
    'A dB-képletben tízes alapú log van, és intenzitás, nem amplitúdó.',
    'Pontforrásnál a felület gömb: $4\\pi r^2$, nem $r^2\\pi$.'
  ],
  hianyzik: ['A 14., 15., 18., 19., 20. és 40. dia rejtett, kimaradt. A puskán szereplő Mach-kúp ($\\sin\\Theta=c/v_f$) a látható diákon nincs.'],
  abrak: ['doppler', 'sip', 'decibel'],
  videok: ['doppler']
}]);
