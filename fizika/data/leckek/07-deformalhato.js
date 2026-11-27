/* 7 — Deformálható testek, szilárd testek rugalmassága. Forrás: 7-Deformálható testek.ppt, 2–24. dia. */
window.FIZ_LECKEK = (window.FIZ_LECKEK || []).concat([{
  id: '7',
  perc: 9,
  forras: '7-Szilárd testek rugalmassága, 2–24. dia',
  egyMondat: 'Kis terhelésnél az alakváltozás <b>arányos a deformáló erővel</b> (Hooke). Nyújtás, hajlítás, nyírás, csavarás: mindegyiknek van egy anyagállandója ($E$ vagy $G$), és egy képlete, ami a méretektől függ.',
  kepletek: [
    { nev: 'Hooke-törvény nyújtásra', tex: '\\Delta l = \\frac{1}{E}\\frac{F}{A}\\,l_0', jel: '$E$ Young-modulus (N/m²), $A$ keresztmetszet, $l_0$ eredeti hossz. $E_{acél}=2{,}14\\cdot10^{11}$ N/m². A puskán: $F=E\\frac{A}{l_0}\\Delta l$.', mikor: 'Nyújtás és összenyomás.', puska: true },
    { nev: 'Feszültség és relatív megnyúlás', tex: '\\varepsilon = \\frac{\\Delta l}{l_0},\\quad \\sigma = \\frac{F}{A},\\quad \\varepsilon = \\frac{1}{E}\\sigma', jel: '$\\varepsilon$ relatív megnyúlás (nincs mértékegysége), $\\sigma$ húzófeszültség. A puskán: $\\sigma=\\varepsilon E$.', puska: true, bol: ['Hooke-törvény nyújtásra'] },
    { nev: 'Harántösszehúzódás (Poisson)', tex: '\\mu = -\\frac{\\Delta d/d_0}{\\Delta l/l_0},\\quad \\frac{\\Delta d}{d_0} = -\\mu\\,\\varepsilon', jel: '$\\mu$ Poisson-szám, $\\mu\\le\\frac12$. Fémekre 0,3–0,4.', mikor: 'Ha az átmérő változását kérdezik.', puska: true, bol: ['Feszültség és relatív megnyúlás'] },
    { nev: 'Térfogati összenyomás', tex: '\\frac{\\Delta V}{V_0} = -\\kappa\\,\\Delta p', jel: '$\\kappa$ kompresszibilitás, $\\Delta p$ nyomásváltozás. Forrás: a puska és a rejtett 10. dia címe (a dia képlete kép).', puska: true },
    { nev: 'Hajlítás (befogott rúd)', tex: 's = \\frac{1}{3E}\\frac{l^3}{T}F,\\quad T = \\int y^2\\,dq', jel: '$s$ a vég lehajlása, $l$ hossz, $T$ felületi nyomaték. A puskán $I$ a jele.', mikor: 'Egyik végén befogott rúd, a másik végén $F$.', puska: true },
    { nev: 'Felületi nyomatékok', tex: 'T_{téglalap} = \\frac{1}{12}ab^3,\\quad T_{henger} = \\frac{\\pi}{4}R^4,\\quad T_{cső} = \\frac{\\pi}{4}(R_2^4 - R_1^4)', jel: '$a$ szélesség, $b$ vastagság (a hajlítás irányában).', puska: true, bol: ['Hajlítás (befogott rúd)'] },
    { nev: 'Hajlítás: téglalap keresztmetszet', tex: 's = \\frac{4}{E}\\frac{l^3}{ab^3}F', jel: 'Az előző kettőből: $T=\\frac{1}{12}ab^3$ behelyettesítve.', mikor: 'Diás példa: vonalzó, $E=2{,}86\\cdot10^3$ N/mm².', puska: false, bol: ['Hajlítás (befogott rúd)', 'Felületi nyomatékok'] },
    { nev: 'Végeken alátámasztott rúd', tex: "s' = \\frac{1}{48E}\\frac{l^3}{T}F", jel: 'Középen $F$ terhelés, két végén alátámasztva.', puska: false, bol: ['Hajlítás (befogott rúd)'] },
    { nev: 'Nyírás', tex: '\\gamma = \\frac{1}{G}\\frac{F}{A},\\quad \\sigma_{ny} = \\frac{F}{A}', jel: '$\\gamma$ a nyírási szög, $G$ nyírási (torziós) modulus, $G_{acél}=8{,}14\\cdot10^{10}$ N/m². A puskán: $\\sigma_{ny}=\\gamma G$.', puska: true },
    { nev: 'Csavarás (torzió)', tex: '\\varphi = \\frac{2}{\\pi G}\\frac{l}{R^4}M', jel: '$\\varphi$ elcsavarodási szög, $l$ hossz, $R$ sugár, $M$ forgatónyomaték.', mikor: 'A szög $R^4$-nel fordítva arányos: vékony drót nagyon érzékeny.', puska: true, bol: ['Nyírás'] },
    { nev: 'Torziós inga', tex: "M = \\frac{\\pi GR^4}{2l}\\varphi = D^*\\varphi,\\quad \\Theta\\frac{d^2\\varphi}{dt^2} = -D^*\\varphi,\\quad T = 2\\pi\\sqrt{\\frac{\\Theta}{D^*}}", jel: '$D^*$ direkciós nyomaték. Megoldás: $\\varphi(t)=\\varphi_0\\sin(\\omega t)$.', mikor: 'Alkalmas a tehetetlenségi nyomaték mérésére. Diás példa: $T=0{,}42$ s.', puska: false, bol: ['Csavarás (torzió)'] },
    { nev: 'Szakadás saját súly alatt', tex: '\\sigma_{max} = \\frac{mg}{A} = \\rho L g,\\quad L = \\frac{\\sigma_{max}}{\\rho g}', jel: '$\\sigma_{max}$ szakítószilárdság, $\\rho$ sűrűség. A keresztmetszet kiesik.', mikor: 'Diás példa: 400 N/mm², 8 kg/dm³ → 5000 m.', puska: false, bol: ['Feszültség és relatív megnyúlás'] }
  ],
  kartyak: [
    { k: 'Alap', cim: 'Rugalmas test', html: '<ul><li>A merev test idealizált határeset.</li><li>Rugalmas: a deformáló erőre belső erők lépnek fel, és visszaállítják az alakot.</li><li>Fenomenológiai leírás: folytonos anyag, anyagállandók. Homogén és izotrop testek.</li></ul>' },
    { k: 'Törvény', cim: 'Hooke (1676)', html: '<ul><li>Kis alakváltozásnál az alakváltozás arányos a deformáló erővel.</li><li>Van egy határ, ahol az arányosság megszűnik.</li><li>$\\varepsilon=\\frac1E\\sigma$: ugyanaz a rugótörvény, csak méretfüggetlenül.</li></ul>', hasonlat: 'Az $F=-Dx$ rugó egy drót: $D=EA/l_0$. (Saját összevetés, a két képlet alakjából.)' },
    { k: 'Hajlítás', cim: 'Neutrális réteg', html: '<ul><li>Hajlításnál a rúd egyik oldala nyúlik, a másik összenyomódik.</li><li>Közöttük a neutrális réteg nem változik.</li><li>A lehajlás $l^3$-bel nő, és a vastagság köbével ($b^3$) csökken.</li></ul>' },
    { k: 'Alakváltozások', cim: 'Négy fajta', html: '<ul><li>Nyújtás/összenyomás: $E$.</li><li>Hajlítás: $E$ és a felületi nyomaték $T$.</li><li>Nyírás és csavarás: $G$. A csavarás valójában nyírás.</li></ul>' },
    { k: 'Határok', cim: 'Feszültség–megnyúlás görbe', html: '<ul><li>A: arányossági határ. B: rugalmassági határ. C: folyási határ.</li><li>D: a fém ismét megszilárdul. E: max. feszültség. H: szakadás.</li><li>Szakítószilárdság: a szakításhoz kellő erő / eredeti keresztmetszet.</li></ul>' }
  ],
  csapdak: [
    'Mértékegység! Az $E$ sokszor N/mm²-ben van megadva ($2\\cdot10^5$ N/mm² $=2\\cdot10^{11}$ N/m²). A hosszakat is ugyanabban a rendszerben vedd.',
    'A keresztmetszet $A=\\frac{d^2\\pi}{4}$, ha az átmérő van megadva, nem $d^2\\pi$.',
    'Hajlításnál a $b$ a hajlítás irányú vastagság, és köbön van. Lapjára vagy élére hajlított vonalzó nagyon más.',
    'Csavarásnál $R^4$, nem $d^4$. Átmérőből előbb sugarat számolj.',
    'A puskán a felületi nyomaték jele $I$, a diákon $T$. Ne keverd a periódusidővel.'
  ],
  hianyzik: ['Az 5., 10., 17. és 22. dia rejtett a pptx-ben. Az 5. és 17. ismétlés. A 10. (térfogati összenyomás) és 22. (rugalmassági állandók összefüggése) képletei képek, nem olvashatók ki. A $\\kappa$ képletet a puskáról vettem.'],
  abrak: ['hooke', 'hajlitas'],
  videok: ['nyujtas']
}]);
