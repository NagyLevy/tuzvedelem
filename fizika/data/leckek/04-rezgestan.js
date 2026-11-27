/* 4 — Rezgéstan. Forrás: 4-Rezgéstan.ppt, 2–57. dia. A diák a rugóállandót D-vel jelölik. */
window.FIZ_LECKEK = (window.FIZ_LECKEK || []).concat([{
  id: '4',
  perc: 12,
  forras: '4-Rezgéstan, 2–57. dia',
  egyMondat: 'Rezgés: a test újra meg újra visszatér ugyanoda, mert egy <b>visszatérítő erő</b> az egyensúlyi helyzet felé húzza. Ha ez az erő arányos a kitéréssel ($F=-Dx$), a mozgás harmonikus: $x(t)=A\\sin(\\omega t+\\alpha)$, és $\\omega=\\sqrt{D/m}$.',
  kepletek: [
    { nev: 'Harmonikus rezgés', tex: 'x(t) = A\\sin(\\omega t + \\alpha)', jel: '$A$ amplitúdó, $\\omega$ körfrekvencia, $\\alpha$ kezdőfázis, $\\omega t+\\alpha$ a fázis.', mikor: 'Ez a kitérés–idő függvény. A puskán a kezdőfázis jele $\\varphi_0$.', puska: true },
    { nev: 'Periódus, frekvencia', tex: 'T = \\frac{2\\pi}{\\omega},\\quad f = \\frac{1}{T},\\quad \\omega = 2\\pi f', jel: '$T$ periódusidő (s), $f$ frekvencia (Hz).', puska: true },
    { nev: 'Sebesség és gyorsulás', tex: 'v = A\\omega\\cos(\\omega t+\\alpha),\\quad a = -A\\omega^2\\sin(\\omega t+\\alpha) = -\\omega^2 x', jel: 'Deriválással jön. A gyorsulás mindig a kitéréssel ellentétes.', mikor: 'Maximumok: $v_{max}=A\\omega$, $a_{max}=A\\omega^2$.', puska: false, bol: ['Harmonikus rezgés'] },
    { nev: 'Rugós rezgés körfrekvenciája', tex: 'ma = -Dx \\;\\Rightarrow\\; \\omega = \\sqrt{\\frac{D}{m}}', jel: '$D$ rugóállandó (N/m), $m$ tömeg.', mikor: 'A puskán csak $\\omega=\\sqrt{D/m}$ van. Az $ma=-Dx$ levezetést fejből tudd.', puska: true, bol: ['Sebesség és gyorsulás'] },
    { nev: 'Rezgés energiája', tex: 'E = \\frac12 mv^2 + \\frac12 Dx^2 = \\frac12 DA^2', jel: 'Mozgási + rugalmas energia. Összege állandó.', puska: true, bol: ['Rugós rezgés körfrekvenciája'] },
    { nev: 'Matematikai inga', tex: '\\omega = \\sqrt{\\frac{g}{l}},\\quad T_0 = 2\\pi\\sqrt{\\frac{l}{g}}', jel: '$l$ fonálhossz, $g$ nehézségi gyorsulás. Csak kis kitérésre ($\\sin\\varphi\\approx\\varphi$).', mikor: 'A tömegtől független. Alkalmas $g$ mérésére.', puska: true },
    { nev: 'Kis rezgések egyensúly körül', tex: '\\omega = \\sqrt{-\\frac{1}{m}\\left(\\frac{dF}{dx}\\right)_{x=x_0}}', jel: '$x_0$ egyensúlyi hely: $F(x_0)=0$. Rezgés csak ott, ahol $F$ monoton csökken ($dF/dx\\lt 0$).', mikor: 'Ha $F(x)$ adott képlettel, és a rezgés idejét kérdezik.', puska: true, bol: ['Rugós rezgés körfrekvenciája'] },
    { nev: 'Csillapított rezgés', tex: 'x(t) = A_0e^{-\\beta t}\\sin(\\omega_{cs}t+\\varphi_0),\\quad \\omega_{cs}=\\sqrt{\\omega_0^2-\\beta^2}', jel: '$\\beta = \\frac{C}{2m}$ csillapítási tényező, $C$ a közegellenállás együtthatója, $\\omega_0$ a csillapítatlan körfrekvencia.', mikor: 'Amplitúdó: $A(t)=A_0e^{-\\beta t}$.', puska: true },
    { nev: 'Gerjesztett rezgés amplitúdója', tex: 'A_g = \\frac{a_0}{\\sqrt{(\\omega_0^2-\\omega_g^2)^2 + 4\\beta^2\\omega_g^2}}', jel: '$a_0=F_0/m$, $\\omega_g$ a gerjesztő körfrekvencia.', mikor: 'Rezonancia: $\\omega_g\\approx\\omega_0$ közelében nagy az $A_g$.', puska: true, bol: ['Csillapított rezgés'] },
    { nev: 'Egyirányú, azonos frekvenciájú rezgések eredője', tex: 'A = \\sqrt{A_1^2 + A_2^2 + 2A_1A_2\\cos(\\varphi_1-\\varphi_2)},\\quad \\operatorname{tg}\\varphi = \\frac{A_1\\sin\\varphi_1 + A_2\\sin\\varphi_2}{A_1\\cos\\varphi_1 + A_2\\cos\\varphi_2}', jel: 'Azonos fázis: $A=A_1+A_2$. Ellentétes ($\\varphi_1=\\varphi_2+\\pi$): $A=|A_1-A_2|$.', puska: true },
    { nev: 'Lebegés', tex: 'T_l = \\frac{2\\pi}{\\omega_1-\\omega_2} = \\frac{1}{\\nu_1-\\nu_2},\\quad \\nu_l = \\nu_1 - \\nu_2', jel: 'Két közeli frekvenciájú rezgés összege. A burkoló lassan, a rezgés gyorsan változik.', puska: false },
    { nev: 'Merőleges rezgések eredője', tex: '\\frac{x^2}{A_1^2} + \\frac{y^2}{A_2^2} - \\frac{2xy}{A_1A_2}\\cos\\delta = \\sin^2\\delta', jel: '$\\delta=\\varphi_2-\\varphi_1$. Ellipszis. $A_1=A_2$, $\\delta=0$: egyenes $y=x$. $\\delta=\\pi/2$: kör.', mikor: 'Ha $\\omega_1/\\omega_2=p/q$, Lissajous-görbe.', puska: false }
  ],
  kartyak: [
    { k: 'Definíció', cim: 'Mikor rezeg egy test?', html: '<ul><li>Ha mozgása során többször visszatér a tér egy adott pontjába.</li><li>Kell egy erőmentes pont: $\\sum F_i(x_0)=0$.</li><li>Kell visszatérítő erő: az erőfüggvény az egyensúly környékén monoton fogyó.</li></ul>', hasonlat: 'Golyó egy tál alján: kilököd, visszagurul. Golyó egy domb tetején: kilököd, elgurul. Csak az első rezeg.' },
    { k: 'Kép', cim: 'A kör árnyéka', html: '<ul><li>Az egyenletes körmozgás vetülete harmonikus rezgés.</li><li>A sugár hossza az amplitúdó, a szögsebesség az $\\omega$.</li><li>Ezért szerepel $\\sin$ és $2\\pi$ a képletekben.</li></ul>' },
    { k: 'Dinamika', cim: 'Honnan jön az $\\omega=\\sqrt{D/m}$?', html: '<ul><li>Newton II. a rugóra: $ma=-Dx$.</li><li>Harmonikus rezgésnél $a=-\\omega^2x$.</li><li>A kettőt összevetve: $m\\omega^2=D$, tehát $\\omega=\\sqrt{D/m}$.</li></ul>' },
    { k: 'Inga', cim: 'Matematikai inga', html: '<ul><li>Mozgásegyenlet: $\\ddot\\varphi=-\\frac{g}{l}\\sin\\varphi$.</li><li>Kis szögnél $\\sin\\varphi\\approx\\varphi$, így harmonikus: $\\omega=\\sqrt{g/l}$.</li><li>Diás példa: 1,2 perc alatt 9 lengés, $T=8$ s, $l=\\left(\\frac{T_0}{2\\pi}\\right)^2 g=16{,}2$ m.</li></ul>' },
    { k: 'Csillapítás', cim: 'Csillapított rezgés', html: '<ul><li>Rugóerő mellett közegellenállás: $F=-Cv$.</li><li>$\\ddot x+2\\beta\\dot x+\\omega_0^2x=0$, ahol $\\beta=\\frac{C}{2m}$.</li><li>Az amplitúdó exponenciálisan csökken: $A_0e^{-\\beta t}$. Ha $\\beta\\ge\\omega_0$, nincs lengés.</li></ul>' },
    { k: 'Gerjesztés', cim: 'Gerjesztett rezgés, rezonancia', html: '<ul><li>Külső periodikus erő: $F_0\\sin\\omega_g t$.</li><li>Az elején tranziens, aztán a test a gerjesztő $\\omega_g$-vel rezeg $A_g$ amplitúdóval.</li><li>Ha $\\omega_g\\approx\\omega_0$ és kicsi a csillapítás, az $A_g$ nagyon nagy: rezonancia.</li></ul>', hasonlat: 'Hinta: ha jó ütemben löksz, egyre magasabbra megy. A diák a Tacoma-híd leszakadását hozzák példának.' },
    { k: 'Összeadás', cim: 'Rezgések eredője', html: '<ul><li>Azonos irány, azonos $\\omega$: forgó vektorok összege, ugyanaz az $\\omega$.</li><li>Kissé eltérő $\\omega$: lebegés, $\\nu_l=\\nu_1-\\nu_2$.</li><li>Merőleges irány: ellipszis, kör, egyenes, vagy Lissajous-görbe.</li></ul>' }
  ],
  csapdak: [
    'A rugóállandó jele a diákon és a puskán $D$, nem $k$. A $k$ a hullámtanban hullámszám.',
    '$\\omega$ (rad/s) és $f$ (Hz) nem ugyanaz: $\\omega=2\\pi f$. A diás feladatban a „95 Hz körfrekvencia” valójában $\\omega$.',
    'Az inga képlete csak kis kitérésre igaz. A periódus nem függ a tömegtől.',
    'Kis rezgésnél csak ott lehet rezgés, ahol $dF/dx\\lt 0$. A diás példában $x=2$ nem jó, csak $x=-2$.',
    'Lebegési frekvencia a különbség: $\\nu_1-\\nu_2$, nem a fele.'
  ],
  hianyzik: [],
  abrak: ['rugo', 'csillapitott', 'rezonancia', 'eredo'],
  videok: ['kor-arnyek', 'inga']
}]);
