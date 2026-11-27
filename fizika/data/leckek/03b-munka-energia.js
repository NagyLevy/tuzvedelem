/* 3b — Munka, energia. Forrás: 3b-Munka, Energia.ppt, 2–21. dia. */
window.FIZ_LECKEK = (window.FIZ_LECKEK || []).concat([{
  id: '3b',
  perc: 8,
  forras: '3b-Munka, Energia, 2–21. dia',
  egyMondat: 'A munka az erő és az elmozdulás irányba eső szorzata: $W=F\\,s\\cos\\alpha$. Az energia munkavégző képesség. A munkatétel szerint az eredő erő munkája pont a mozgási energia változása.',
  kepletek: [
    { nev: 'Munka (állandó erő)', tex: 'W = \\underline{F}\\cdot\\Delta\\underline{s} = F\\,\\Delta s\\cos\\alpha', jel: '$\\alpha$ az erő és az elmozdulás közti szög. 1 J = 1 Nm.', mikor: 'Nulla, ha a test nem mozog, vagy a mozgás merőleges az erőre.', puska: true },
    { nev: 'Munka komponensekkel', tex: '\\Delta W = F_x\\Delta x + F_y\\Delta y + F_z\\Delta z', jel: 'A skaláris szorzat kiírva.', puska: false, bol: ['Munka (állandó erő)'] },
    { nev: 'Változó erő munkája', tex: 'W = \\int_A^B \\underline{F}\\,d\\underline{s} \\approx \\sum_{i=1}^{n} F_{s_i}\\Delta s_i', jel: '$F_s$ az erő elmozdulás irányú komponense. A görbe alatti terület.', puska: false, bol: ['Munka (állandó erő)'] },
    { nev: 'Emelési munka', tex: 'W_{em} = F_1 h = mgh', jel: '$h$ az emelés magassága, $g\\approx 10$ m/s² a diákon.', puska: true },
    { nev: 'Potenciálos erő', tex: 'W = V(\\underline{r}_A) - V(\\underline{r}_B),\\quad F_x = -\\frac{\\partial V}{\\partial x}', jel: '$V$ potenciálfüggvény. A munka csak a kezdő- és végponttól függ.', mikor: 'Nehézségi erőnél $V=mgz$.', puska: true },
    { nev: 'Gyorsítási munka', tex: 'W = \\frac{1}{2}mv^2', jel: 'Nyugvó testet $v$ sebességre gyorsító erő munkája.', mikor: 'Levezetés: $W=F s=(ma)\\cdot\\frac12 at^2=\\frac12 m(at)^2$.', puska: false, bol: ['Munka (állandó erő)'] },
    { nev: 'Feszítési munka', tex: 'W = \\int_0^{x_0} Dx\\,dx = D\\frac{x_0^2}{2}', jel: '$D$ rugóállandó, $x_0$ a megnyúlás. A háromszög területe az $F$–$x$ grafikonon.', puska: true, bol: ['Változó erő munkája'] },
    { nev: 'Mechanikai energiák', tex: 'E_{pot} = mgh,\\quad E_{pot} = \\frac12 Dx^2,\\quad E_{kin} = \\frac12 mv^2', jel: 'Felemelt test, megnyújtott rugó, mozgó test.', puska: false, bol: ['Emelési munka', 'Feszítési munka', 'Gyorsítási munka'] },
    { nev: 'Munkatétel', tex: 'W = Fs = \\frac12 mv_2^2 - \\frac12 mv_1^2', jel: 'Az eredő erő munkája = a mozgási energia megváltozása.', mikor: 'Ha az erő munkáját nehéz közvetlenül kiszámolni.', puska: false, bol: ['Gyorsítási munka'] },
    { nev: 'Mechanikai energia megmaradása', tex: '\\frac12 mv_1^2 + mgz_1 = \\frac12 mv_2^2 + mgz_2', jel: 'Csak konzervatív (potenciálos) erők esetén. Rugóval: $\\frac12 mv^2+\\frac12 Dx^2=$ áll.', puska: false, bol: ['Munkatétel', 'Potenciálos erő'] },
    { nev: 'Súrlódási munka', tex: 'W_{súrl} = F_{súrl}\\cdot s = \\mu\\cdot N\\cdot s', jel: 'A dián $N$ a nyomóerő. A puskán ugyanez: $S=\\mu K$, $W=-s\\mu K$.', mikor: 'Zárt görbén sem nulla: a súrlódás nem konzervatív.', puska: true }
  ],
  kartyak: [
    { k: 'Definíció', cim: 'Munka', html: '<ul><li>Állandó erő, irányában $s$ elmozdulás: $W=F\\cdot s$.</li><li>Általánosan csak az elmozdulás irányú komponens számít: $F_s=F\\cos\\alpha$.</li><li>A test tömege és az elmozdulás ideje közömbös.</li></ul>', hasonlat: 'Fonálon lengő testnél a fonálerő mindig merőleges a mozgásra. Munkája nulla.' },
    { k: 'Változó erő', cim: 'Munka = görbe alatti terület', html: '<ul><li>Az utat kis $\\Delta s_i$ darabokra vágjuk, mindegyiken állandónak vesszük az erőt.</li><li>Összeg, majd határérték: $W=\\int_A^B F_s\\,ds$.</li><li>Rugónál ez egy háromszög: $W=D\\frac{x_0^2}{2}$.</li></ul>' },
    { k: 'Potenciál', cim: 'Nem függ az úttól', html: '<ul><li>A nehézségi erő munkája csak a magasságkülönbségtől függ: $W_g=mgh$.</li><li>Bármely zárt görbén a munkája nulla. Ez a potenciálos erő.</li><li>Ilyenkor van $V(\\underline{r})$, és $W=V(\\underline{r}_A)-V(\\underline{r}_B)$.</li></ul>' },
    { k: 'Tétel', cim: 'Munkatétel', html: '<ul><li>A tömegpont mozgási energiájának változása = az eredő erő munkája.</li><li>$W=\\frac12 mv_2^2-\\frac12 mv_1^2$.</li><li>Diás példa: autó 20 → 15 m/s, 130 m, 1200 kg: $W=-105000$ J, $F=-808$ N.</li></ul>' },
    { k: 'Megmaradás', cim: 'Mechanikai energia', html: '<ul><li>Ha csak potenciálos erők hatnak, a mozgási és helyzeti energia összege állandó.</li><li>Ezek a konzervatív erők: nehézségi és rugalmas erő.</li><li>$E=\\frac12 mv^2+mgh=$ áll., illetve $E=\\frac12 mv^2+\\frac12 Dx^2=$ áll.</li></ul>', hasonlat: 'Feldobott kő: felfelé a mozgási energia helyzetivé alakul, lefelé vissza.' },
    { k: 'Kivétel', cim: 'Súrlódás', html: '<ul><li>$W_{súrl}=\\mu N s$.</li><li>Zárt görbe mentén sem nulla.</li><li>Ezért a súrlódás nem konzervatív: mechanikai energiát visz el.</li></ul>' }
  ],
  csapdak: [
    'Az $\\alpha$ az erő és az elmozdulás közti szög, nem a lejtő szöge. Mindig rajzold le.',
    'Fékezésnél a munka negatív. A diás példákban $W=-105000$ J és $W=-1500$ J jön ki.',
    'Rugónál a következő 5 cm-hez nem $\\frac12 D(0{,}05)^2$ kell, hanem $W_2-W_1$ (a diás példa: 0,1 − 0,025 = 0,075 J).',
    'A $\\frac12 mv^2$ önmagában nincs kiírva a puskán (csak a teljesítmény képletében bújik meg). Tudd fejből.',
    'Energiamegmaradás csak súrlódás nélkül igaz. Súrlódásnál a munkatételt használd.'
  ],
  hianyzik: [],
  abrak: ['munka-szog', 'energia-palya'],
  videok: ['energia']
}]);
