/* 6 — Merev testek. Forrás: 6-Merev testek.ppt, 3–61. dia. */
window.FIZ_LECKEK = (window.FIZ_LECKEK || []).concat([{
  id: '6',
  perc: 12,
  forras: '6-Merev testek, 3–61. dia',
  egyMondat: 'A merev test haladhat és foroghat. Forgásnál minden haladó mennyiségnek van párja: tömeg → <b>tehetetlenségi nyomaték</b> $\\Theta$, erő → forgatónyomaték $M$, és a mozgásegyenlet $\\Theta\\beta = M_z$.',
  kepletek: [
    { nev: 'Forgatónyomaték (erőkar)', tex: 'M_z = \\pm F\\cdot k,\\quad k = r\\sin\\vartheta,\\quad M = rF\\sin\\vartheta', jel: '$k$ erőkar: a tengely és a hatásvonal távolsága. Vektorként $\\underline{M}=\\underline{r}\\times\\underline{F}$.', mikor: 'Csak az az erő forgat, amelynek hatásvonala nem párhuzamos a tengellyel és nem metszi azt.', puska: true },
    { nev: 'Egyensúly feltétele', tex: '\\underline{F} = \\sum\\underline{F}_i = 0,\\quad \\underline{M} = \\sum\\underline{M}_i = 0', jel: 'Erők eredője és forgatónyomatékok eredője is nulla.', puska: false },
    { nev: 'Súlypont (tömegközéppont)', tex: '\\underline{r}_s = \\frac{\\sum m_i\\underline{r}_i}{\\sum m_i} = \\frac{\\int\\rho(\\underline{r})\\,\\underline{r}\\,dV}{m}', jel: '$\\rho$ sűrűség. Két testre: $x_{12}=\\frac{m_1x_1+m_2x_2}{m_1+m_2}$.', mikor: 'A súlypontjában alátámasztott test bármely helyzetben egyensúlyban van.', puska: true },
    { nev: 'Tehetetlenségi nyomaték', tex: '\\Theta = \\sum m_i l_i^2 = \\int\\rho\\, l^2\\,dV', jel: '$l_i$ a pont távolsága a forgástengelytől. Egység: kg·m².', puska: true },
    { nev: 'Nevezetes Θ-k', tex: '\\Theta_{\\text{abroncs}} = mR^2,\\quad \\Theta_{\\text{korong}} = \\tfrac12 mR^2,\\quad \\Theta_{\\text{gömb}} = \\tfrac25 mR^2', jel: 'Tömegközépponton átmenő szimmetriatengelyre. Téglatest: $\\frac{1}{12}m(a^2+b^2)$. A henger (korong) $\\frac12 mR^2$-ét a dia levezeti.', puska: true, bol: ['Tehetetlenségi nyomaték'] },
    { nev: 'Steiner-tétel', tex: '\\Theta_A = \\Theta_S + m\\cdot s^2', jel: '$\\Theta_S$ a tömegközépponton átmenő tengelyre, $s$ a két párhuzamos tengely távolsága.', mikor: 'Rúd a végén: $\\frac{1}{12}mL^2+m\\left(\\frac L2\\right)^2=\\frac13 mL^2$.', puska: false, bol: ['Tehetetlenségi nyomaték'] },
    { nev: 'Perdület tengely körül', tex: 'N_z = \\omega_z\\sum m_i l_i^2 = \\Theta\\,\\omega_z', jel: 'Egy pontra $N_{iz}=m_iv_il_i=m_il_i^2\\omega$.', puska: true, bol: ['Tehetetlenségi nyomaték'] },
    { nev: 'Forgás mozgásegyenlete', tex: '\\frac{dN_z}{dt} = M_z \\;\\Rightarrow\\; \\Theta\\frac{d^2\\varphi}{dt^2} = M_z,\\quad \\Theta\\beta = M_z', jel: '$\\beta$ itt szöggyorsulás (1/s²). Ha $M_z=0$: $\\omega$ állandó.', mikor: 'A haladó $ma=F$ forgó párja.', puska: true, bol: ['Perdület tengely körül'] },
    { nev: 'Egyenletesen gyorsuló forgás', tex: '\\omega(t) = \\omega_0 + \\beta t,\\quad \\varphi(t) = \\tfrac12\\beta t^2 \\;(\\varphi_0=0,\\ \\omega_0=0)', jel: '$M_z$ állandó, így $\\beta=M_z/\\Theta$ is.', puska: false, bol: ['Forgás mozgásegyenlete'] },
    { nev: 'Forgási energia', tex: 'E_{kin} = \\tfrac12\\Theta\\omega^2', jel: 'Levezetés: $\\frac12\\sum m_iv_i^2$, és $v_i=\\omega l_i$.', puska: true, bol: ['Tehetetlenségi nyomaték'] },
    { nev: 'Fizikai inga', tex: 'T = 2\\pi\\sqrt{\\frac{\\Theta}{mgs}}', jel: '$\\Theta$ a felfüggesztési tengelyre, $s$ a tengely és a súlypont távolsága. Kis kitérésre.', mikor: 'Rúd a végén lengetve: $T=2\\pi\\sqrt{\\frac{2L}{3g}}$.', puska: false, bol: ['Forgás mozgásegyenlete', 'Steiner-tétel'] }
  ],
  kartyak: [
    { k: 'Kinematika', cim: 'Hat szabadsági fok', html: '<ul><li>A helyzetet 3 nem egy egyenesbe eső pont adja meg: 9 adat.</li><li>A távolságok állandók, így csak 6 független.</li><li>3 haladó (transzlációs) és 3 forgó (rotációs) szabadsági fok.</li></ul>' },
    { k: 'Mozgás', cim: 'Haladás és forgás', html: '<ul><li>Haladás: az irányítás nem változik, minden pont sebessége ugyanaz. Elég egy pont (pl. tömegközéppont) mozgása.</li><li>Forgás: a tengely pontjai állnak, a többiek körívet írnak le.</li><li>A pontok sebessége forgásnál nem ugyanaz: $v_i=\\omega l_i$.</li></ul>' },
    { k: 'Erők', cim: 'Eltolási tétel, erőpár', html: '<ul><li>Az erő a hatásvonala mentén bárhová eltolható, a hatása nem változik.</li><li>Két egyenlő, ellentétes erő egyensúlyban van, ha a hatásvonaluk egybeesik.</li><li>Erőpár: két antiparalel, egyenlő erő különböző hatásvonalon. Nem helyettesíthető egyetlen erővel.</li></ul>' },
    { k: 'Redukálás', cim: 'Tetszőleges erőrendszer', html: '<ul><li>Helyettesíthető egy $O$ pontban ható $\\underline{F}=\\sum\\underline{F}_i$ erővel és egy $\\underline{M}=\\sum\\underline{M}_i$ nyomatékú erőpárral.</li><li>Egyensúly: mindkettő nulla.</li><li>Rögzített pont körül elég: $\\sum\\underline{M}_i=0$.</li></ul>' },
    { k: 'Analógia', cim: 'Haladó ↔ forgó', html: '<ul><li>$x\\leftrightarrow\\varphi$, $v\\leftrightarrow\\omega$, $a\\leftrightarrow\\beta$.</li><li>$m\\leftrightarrow\\Theta$, $F\\leftrightarrow M_z$, $p=mv\\leftrightarrow N_z=\\Theta\\omega$.</li><li>$ma=F\\leftrightarrow\\Theta\\beta=M_z$, $\\frac12 mv^2\\leftrightarrow\\frac12\\Theta\\omega^2$.</li></ul>', hasonlat: 'Ha egy forgós képlet nem jut eszedbe, írd fel a haladó párját, és cseréld ki a betűket.' },
    { k: 'Példa', cim: 'Korong fonállal', html: '<ul><li>$F=0{,}157$ N, $m=1$ kg, $R=0{,}1$ m: $\\Theta=\\frac12 mR^2=0{,}005$.</li><li>$M_z=FR=0{,}0157$, $\\beta=M_z/\\Theta\\approx\\pi$ 1/s².</li><li>2 s alatt: $\\varphi=\\frac12\\beta t^2=2\\pi$, $\\omega=\\beta t=6{,}28$ 1/s.</li></ul>' }
  ],
  csapdak: [
    'A $\\beta$ itt szöggyorsulás. A rezgéstanban ugyanez a betű a csillapítási tényező. Ne keverd.',
    'A $\\Theta$ mindig egy adott tengelyre vonatkozik. A puska táblázata a tömegközépponton átmenő szimmetriatengelyre szól. Más tengelyhez Steiner kell (nincs a puskán).',
    'Fordulatszámból $\\omega=2\\pi f$, és a perc → másodperc átváltás kell (diás példa: 360 1/min → $\\omega_0=37{,}68$ 1/s).',
    'A puskán a $\\Theta_z$ képletében $\\sqrt{x_i^2+y_i^2}$ áll, de a definíció $l_i^2$. A tengelytől mért távolság négyzete kell: $l_i^2=x_i^2+y_i^2$ (saját észrevétel, ellenőrizd).',
    'Fizikai ingánál $s$ a súlypont távolsága a tengelytől, nem a rúd hossza.'
  ],
  hianyzik: [],
  abrak: ['forgas', 'steiner'],
  videok: ['forgas']
}]);
