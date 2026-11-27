/* 10 — Optika. Forrás: 10-Optika.pdf (Horváth András, SZE), 75 frame. A beamer-PDF szövegrétegéből és képeiből. */
window.FIZ_LECKEK = (window.FIZ_LECKEK || []).concat([{
  id: '10',
  perc: 14,
  forras: '10-Optika (Horváth A.), 2–75. frame',
  egyMondat: 'A fény transzverzális <b>elektromágneses hullám</b>, ezért minden hullámtani szabály igaz rá. Ha a tárgyak sokkal nagyobbak a hullámhossznál, sugarakkal számolunk: lencse, tükör, távcső, mikroszkóp. Kulcs: $\\frac1f=\\frac1k+\\frac1t$.',
  kepletek: [
    { nev: 'Fénysebesség közegben', tex: 'c = 299\\,792\\,458\\;\\tfrac{\\text{m}}{\\text{s}},\\qquad c_{közeg} = \\frac{c}{n}', jel: '$n$ a vákuumra vonatkozó törésmutató. Víz: $n=1{,}333$, $c_{víz}=2{,}25\\cdot10^8$ m/s.', mikor: 'Látható tartomány: 380–760 nm.', puska: false },
    { nev: 'Kétréses erősítés és kioltás', tex: '\\sin\\alpha_n = n\\frac{\\lambda}{a}\\;\\text{(erősítés)},\\qquad \\sin\\beta_n = \\left(n+\\tfrac12\\right)\\frac{\\lambda}{a}\\;\\text{(kioltás)}', jel: '$a$ a rések távolsága. Útkülönbség: $\\Delta s=s_1-s_2\\approx a\\sin\\alpha$. Csak $|s_1-s_2|\\lt l_k$ (koherenciahossz) esetén.', mikor: 'Ernyőn a távolság: $\\tan\\alpha=d/h$.', puska: false },
    { nev: 'Optikai rács', tex: '\\sin\\alpha_n = n\\frac{\\lambda}{a}', jel: '$a$ rácsállandó (két rés távolsága), $n$ egész. Erősítési irányok, mint 2 résnél, máshol kioltás.', mikor: 'Diás példa: 2000 rés/cm, $\\tan\\alpha_1=0{,}12$ → $\\lambda\\approx600$ nm.', puska: true, bol: ['Kétréses erősítés és kioltás'] },
    { nev: 'Elhajlás széles résen', tex: '\\sin\\varphi = \\frac{\\lambda}{d}', jel: '$d$ a rés szélessége, $\\varphi$ az első sötét csík szögtávolsága a középvonaltól.', mikor: 'Ha $d\\gg\\lambda$, $\\varphi\\approx0$: nem látszik.', puska: true },
    { nev: 'Brewster-szög', tex: '\\operatorname{tg}\\alpha_B = n', jel: 'Ekkor a visszavert és a megtört sugár merőleges ($\\alpha_B+\\beta=90°$), és a visszavert fény teljesen polarizált.', mikor: 'Levezetés: Snellius + $\\sin(90°-\\alpha_B)=\\cos\\alpha_B$.', puska: false },
    { nev: 'Lencse fókusztávolsága', tex: '\\frac1f = (n-1)\\left(\\frac{1}{r_1}+\\frac{1}{r_2}\\right)', jel: '$n$ a lencse anyagának a környezetre vonatkozó törésmutatója, $r_1$, $r_2$ görbületi sugarak. $f\\lt 0$: szórólencse.', mikor: 'Sík oldal: $r=\\infty$, azaz $1/r=0$.', puska: true },
    { nev: 'Leképezési törvény', tex: '\\frac1f = \\frac1k + \\frac1t,\\qquad N = \\frac{K}{T} = \\frac{k}{t}', jel: '$t$ tárgytávolság, $k$ képtávolság, $T$ tárgyméret, $K$ képméret, $N$ nagyítás.', mikor: '$t>f$: $k>0$, valódi kép. $t\\lt f$: $k\\lt 0$, látszólagos kép.', puska: true, bol: ['Lencse fókusztávolsága'] },
    { nev: 'Gömbtükör', tex: 'f = \\frac{R}{2}', jel: '$R$ a görbületi sugár. A leképezési egyenletek ugyanazok, mint a lencsénél.', puska: true, bol: ['Leképezési törvény'] },
    { nev: 'Felbontóképesség', tex: '\\sin\\varphi = 1{,}22\\frac{\\lambda}{D}', jel: '$D$ a lencse (objektív) átmérője. A pontszerű forrás képe egy $\\varphi$ szögméretű korong.', mikor: 'Szem, 2 mm pupilla, 550 nm: $\\varphi\\approx1\'$.', puska: true },
    { nev: 'Egyszerű nagyító', tex: 'N_l = \\frac{d_0}{t},\\qquad N_{l,m} = 1 + \\frac{d_0}{f}', jel: '$d_0=0{,}25$ m a tisztánlátás távolsága. Szögnagyítás: $N_l=\\alpha/\\alpha_0$.', mikor: 'A diás példa $d_0=0{,}15$ m-rel számol (8×: $f=21{,}4$ mm).', puska: true, bol: ['Leképezési törvény'] },
    { nev: 'Távcső objektív képe', tex: 'K = f\\operatorname{tg}\\alpha,\\qquad \\operatorname{tg}\\alpha = \\frac{T}{t}', jel: '$t\\gg f$, ezért $k\\approx f$: a kép a fókuszsíkban van. $\\alpha$ a tárgy látószöge.', mikor: 'Diás példa: Hold 0,5°, $f=1$ m → $K=8{,}7$ mm.', puska: false, bol: ['Leképezési törvény'] },
    { nev: 'Kepler-távcső nagyítása', tex: 'N = \\frac{\\beta}{\\alpha} = \\frac{f_1}{f_2}', jel: '$f_1$ objektív, $f_2$ ókulár fókusztávolsága. Szögnagyítás. A Newton-féle tükrös távcsőnél ugyanígy.', puska: true, bol: ['Távcső objektív képe'] },
    { nev: 'Távcső felbontása és nagyítási határai', tex: '\\varphi \\approx \\frac{0{,}138\'\'}{D},\\qquad N_{max} \\approx 430\\,D,\\qquad N_{min} = \\frac{D}{8\\,\\text{mm}}', jel: '$D$ méterben (a $\\varphi$ és $N_{max}$ képletben). $N_{max}$: a nagyított $\\varphi$ elérje a szem 60″-ét. $N_{min}$: a kilépő nyaláb ne legyen szélesebb a 8 mm-es pupillánál.', mikor: 'Diás példa: $D=50$ mm → $N_{max}=21{,}5$, $N_{min}=6{,}25$.', puska: true, bol: ['Felbontóképesség', 'Kepler-távcső nagyítása'] },
    { nev: 'Mikroszkóp nagyítása', tex: 'N = N_1N_2 = \\left(\\frac{l-f_2}{f_1}-1\\right)\\left(1+\\frac{d_0}{f_2}\\right) \\approx \\frac{d_0(l-f_2)}{f_1f_2}', jel: '$f_1$ objektív, $f_2$ ókulár, $l$ a két lencse távolsága. Nagy nagyításhoz kicsi fókusztávolságok kellenek.', mikor: 'Felbontási határ: $d_{min}=0{,}61\\frac{\\lambda}{\\sin\\alpha}\\approx\\lambda$.', puska: true, bol: ['Egyszerű nagyító', 'Leképezési törvény'] }
  ],
  kartyak: [
    { k: 'Alap', cim: 'Mi a fény?', html: '<ul><li>Transzverzális elektromágneses hullám: az elektromos és a mágneses tér hullámzik.</li><li>Nem kell hozzá közeg. $c\\approx3\\cdot10^8$ m/s, $\\lambda\\lt 10^{-6}$ m.</li><li>Diszperzió: a törésmutató kissé függ a hullámhossztól (ibolyára 1–3%-kal nagyobb).</li></ul>' },
    { k: 'Interferencia', cim: 'Miért nem látjuk mindennap?', html: '<ul><li>A fényt sok atom egymástól függetlenül bocsátja ki, véletlen fázisugrásokkal.</li><li>Koherenciahossz: amin belül egyetlen harmonikus hullám. Hagyományos forrásnál $\\lt 0{,}1$ mm.</li><li>Lézernél ez sokkal nagyobb, ezért ott látszik az interferencia.</li></ul>' },
    { k: 'Polarizáció', cim: 'Polarizált fény előállítása', html: '<ul><li>Polarizációs szűrő: csak az egyik irányt engedi át.</li><li>Visszaverődés: a felülettel párhuzamos komponens több. Brewster-szögnél teljesen polarizált.</li><li>Az égbolt kékje és bizonyos lézerek is polarizáltak.</li></ul>', hasonlat: 'Kötél egy keskeny résen át: csak a rés irányú rezgés jut túl.' },
    { k: 'Geometriai optika', cim: 'Nevezetes sugármenetek', html: '<ul><li>Tengellyel párhuzamos → a lencse után a fókuszon át.</li><li>Fókuszon át → utána a tengellyel párhuzamos.</li><li>Középponton át → irányváltozás nélkül.</li></ul>' },
    { k: 'Kép', cim: 'Valódi vagy látszólagos?', html: '<ul><li>Valódi: a sugarak tényleg találkoznak. Ernyőre vetíthető.</li><li>Látszólagos: csak egy pontból látszanak jönni (síktükör, nagyító).</li><li>Szórólencse valódi tárgyról csak látszólagos képet ad.</li></ul>' },
    { k: 'Eszközök', cim: 'Szem, fényképezőgép, vetítő', html: '<ul><li>Szem: valódi kép a retinán, fókuszálás a szemlencse $f$-jével, 550 nm-en a legérzékenyebb.</li><li>Fényképezőgép: fókuszálás a lencse–film távolsággal. Diás példa: $f=35$, $k_{max}=38$ mm → $t_{min}=443$ mm.</li><li>Vetítő: diás példa $k=9$ m, $T=36$ mm, $K=3$ m → $t=108$ mm, $f=106{,}7$ mm.</li></ul>' },
    { k: 'Távcső', cim: 'Kepler, Galilei, Newton', html: '<ul><li>Kepler: gyűjtő ókulár, fordított kép. A legtöbb távcső ilyen.</li><li>Galilei: szóró ókulár, egyenes állású kép, kis nagyítás (színházi látcső).</li><li>Newton: homorú tükör objektív, segédtükör vezeti ki a fényt.</li></ul>' }
  ],
  csapdak: [
    'Szögnagyítás ≠ képméret-arány. Távcsőnél és nagyítónál a látószögek aránya számít.',
    'Látszólagos képnél $k\\lt 0$. Ne dobd el az előjelet.',
    'A nagyítós diás példa $d_0=0{,}15$ m-rel számol, máshol $d_0=0{,}25$ m szerepel. A ZH-ban a megadott értéket használd (saját észrevétel).',
    'A $430D$ és $0{,}138\'\'/D$ képletben $D$ méterben van, az $N_{min}=D/8$ mm-ben milliméterben.',
    'Rácsnál $a$ = 1 / (rések száma egységnyi hosszon). 2000 rés/cm → $a=5\\cdot10^{-6}$ m.'
  ],
  hianyzik: ['A forrás egy beamer-PDF, nem a Giczi-féle diasor. A puska színtáblázata és törésmutató-táblázata a 5–6. frame-en is szerepel.'],
  abrak: ['lencse', 'racs', 'tavcso'],
  videok: ['lencse', 'interferencia']
}]);
