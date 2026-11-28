/* Roadmap — Merev testek. Forrás: PróbaZH, MINTA vizsga, GYF feladatsor, tanári megoldások. */
window.FIZ_ROADMAP = (window.FIZ_ROADMAP || []).concat([{
  id: 'merev',
  nev: 'Merev testek',
  leckek: ['6', '6a'],
  perc: 120,
  lenyeg: 'Három dolgot kell tudnod: <b>súlypontot</b> számolni (forgatónyomatékkal vagy koordinátákkal), <b>forgómozgást</b> leírni ($\\omega = 2\\pi f$, $\\varphi = \\omega_0 t + \\frac{1}{2}\\beta t^2$, $M = \\Theta\\beta$), és a <b>tehetetlenségi nyomatékkal</b> számolni (pontokra $\\Theta = \\sum m_i l_i^2$, forgási energia $\\frac{1}{2}\\Theta\\omega^2$). A próba-ZH 5 elméleti kérdésből (1–1 pont) és 3 számolásból (2 + 1,5 + 1,5 pont) állt.',

  elmelet: [
    {
      k: 'Fogalmazza meg az eltolási tételt!',
      v: 'A merev testre ható erő támadáspontja a testben a hatásvonal bármely más pontjába áthelyezhető anélkül, hogy az erő hatása megváltozna.',
      forras: 'PróbaZH',
      trukk: 'Három kulcsszó: <b>támadáspont</b>, <b>hatásvonal</b>, <b>a hatás nem változik</b>. Az eltolás a hatásvonal mentén történik — ez a szó ne maradjon ki.'
    },
    {
      k: 'Mondjon példát arra, amikor egy merevtestnek 2 transzlációs és 1 rotációs szabadsági foka van!',
      v: 'Egy guruló forgószék a vízszintes síkban, két irányban (x, y) tud transzlációs mozgást végezni és a z-tengely körül tud elfordulni.',
      forras: 'PróbaZH',
      trukk: 'Ne csak a példát írd le: nevezd meg mindhárom szabadsági fokot is (elmozdulás x irányban, elmozdulás y irányban, elfordulás a z-tengely körül).'
    },
    {
      k: 'Mit nevezünk erőpárnak? Írja le röviden, hogyan helyettesítene egy erőpárt egyetlen erővel!',
      v: 'Két antiparalel, egyenlő nagyságú és különböző hatásvonalú erőt erőpárnak nevezzük. Az erőpár nem helyettesíthető egyetlen erővel.',
      forras: 'PróbaZH',
      trukk: 'Beugrató a kérdés második fele: a helyes válasz az, hogy <b>sehogy</b>. A meghatározásban három jelző kell: antiparalel (párhuzamos, de ellentétes irányú), egyenlő nagyságú, különböző hatásvonalú.'
    },
    {
      k: 'Mit nevezünk súlypontnak? Hol van egy homogén anyageloszlású, állandó keresztmetszetű rúd súlypontja?',
      v: 'A súlypontjában alátámasztott merev test bármely helyzetben egyensúlyban van. Egy homogén anyageloszlású, állandó keresztmetszetű rúd súlypontja a geometriai középpontjában van.',
      forras: 'PróbaZH',
      trukk: 'Két kérdés, két mondat. Az elsőben a kulcs: <b>alátámasztva bármely helyzetben egyensúly</b>. A másodikban: <b>geometriai középpont</b>.'
    },
    {
      k: 'Egy elhanyagolható tömegű rúd végeire m, illetve 2m tömegű kisméretű gömböt rögzítek. Kiszámolom az így létrehozott merevtest súlypontján, majd a rúd felezőpontján átmenő, a rúdra merőlegesen álló forgástengelyekre a rendszer tehetetlenségi nyomatékát. Melyik tehetetlenségi nyomaték lesz a nagyobb? Válaszát indokolja!',
      v: 'Steiner-tétele értelmében $\\Theta_F = \\Theta_S + m \\cdot s^2$. Mivel $m \\cdot s^2 \\gt 0$, ezért a rúd felezőpontján átmenő forgástengelyre vonatkozó tehetetlenségi nyomaték a nagyobb: $\\Theta_S \\lt \\Theta_F$.',
      forras: 'PróbaZH',
      trukk: 'Három dolog kell a pontért: a <b>Steiner-tétel</b> neve, a képlet, és a kimondott eredmény ($\\Theta_S \\lt \\Theta_F$). A két tömeg nem egyforma, ezért a súlypont nem a felezőpontban van — ettől tér el a két tengely.'
    },
    {
      k: 'Fogalmazza meg a merev testek egyensúlyának a feltételét!',
      v: 'A merev testre ható erők vektori eredője és az erők forgatónyomatékainak vektori eredője is legyen nulla.',
      forras: 'MINTA vizsga',
      trukk: 'Két feltétel van, és mindkettő kell: az <b>erők</b> eredője nulla ÉS a <b>forgatónyomatékok</b> eredője nulla. A „vektori” szót is írd oda.'
    }
  ],

  receptek: [
    {
      cim: 'Súlypont két testnél (forgatónyomatékkal)',
      mikor: 'Két test (két lemez, két gömb, két rúd) érintkezik vagy össze van kötve, és a közös súlypont a kérdés.',
      lepesek: [
        'Helyettesítsd mindkét testet a saját közepébe tett tömegponttal, és írd fel a két pont $d$ távolságát.',
        'A közös súlypont a két pontot összekötő szakaszon van: az egyiktől $x$, a másiktól $d - x$ távolságra.',
        'Írd fel, hogy a két súlyerő forgatónyomatéka a súlypontra egyenlő. A $g$ kiesik.',
        'A tömegeket fejezd ki a mérettel: lemeznél terület, gömbnél térfogat · sűrűség, rúdnál hossz. Az egységnyi darab tömege kiesik.',
        'Rendezd $x$-re, és írd oda, melyik ponttól mérted.'
      ],
      tex: 'm_1 g\\,x = m_2 g\\,(d - x)'
    },
    {
      cim: 'Súlypont koordinátákkal (összetett alakzat, kivágás)',
      mikor: 'Több darabból álló alakzat (L betű, tömegpontok egy négyzet csúcsain) vagy olyan lemez, amelyből hiányzik egy rész.',
      lepesek: [
        'Vegyél fel koordináta-rendszert: az origó legyen egy sarokban, a tengelyek az élek mentén.',
        'Bontsd a testet egyszerű darabokra. Írd fel mindegyik tömegét és a közepének koordinátáit (táblázatban a legátláthatóbb).',
        'Számold ki külön $x_s$-t és külön $y_s$-t a képlettel.',
        'Kivágásnál vagy a megmaradt darabokkal számolj (így tesz a tanár), vagy a teljes testből vond le a kivágott részt negatív tömegként.'
      ],
      tex: 'x_s = \\frac{\\sum m_i x_i}{\\sum m_i},\\qquad y_s = \\frac{\\sum m_i y_i}{\\sum m_i}'
    },
    {
      cim: 'Egyenletesen lassuló forgás (leálló kerék)',
      mikor: 'Fordulatszám, leállási idő vagy a megállásig megtett fordulatok száma adott; a szöggyorsulás, a fordulatok száma vagy a fékező forgatónyomaték a kérdés.',
      lepesek: [
        'Fordulatszámból szögsebesség: $\\omega_0 = 2\\pi f$. Fordulatokból szög: $\\varphi = n \\cdot 2\\pi$.',
        'Megállás: $\\omega = 0$, tehát $0 = \\omega_0 + \\beta t$.',
        'Ha az idő adott: $\\beta = -\\frac{\\omega_0}{t}$, majd $\\varphi = \\omega_0 t + \\frac{1}{2}\\beta t^2$ és $n = \\frac{\\varphi}{2\\pi}$.',
        'Ha a fordulatok száma adott: a $t = -\\frac{\\omega_0}{\\beta}$ behelyettesítésével $\\varphi = -\\frac{1}{2}\\cdot\\frac{\\omega_0^2}{\\beta}$, ebből megvan a $\\beta$.',
        'Forgatónyomaték: $M = \\Theta \\cdot \\beta$. Lassításnál negatív.'
      ],
      tex: '\\omega = \\omega_0 + \\beta t,\\qquad \\varphi = \\omega_0 t + \\frac{1}{2}\\beta t^2,\\qquad M = \\Theta\\beta'
    },
    {
      cim: 'Tehetetlenségi nyomaték pontszerű testekre, Steiner-tétel',
      mikor: 'Elhanyagolható tömegű rúdon kis testek ülnek, és egy adott tengelyre kell a $\\Theta$; vagy két párhuzamos tengelyt kell összehasonlítani.',
      lepesek: [
        'Írd fel minden test távolságát a forgástengelytől ($l_i$).',
        'Add össze: $\\Theta = \\sum m_i l_i^2$.',
        'Ha a súlyponton átmenő tengely kell, előbb keresd meg a súlypontot (forgatónyomatékkal), és onnan mérd a távolságokat.',
        'Ha két tengelyt kell összehasonlítani, hivatkozz a Steiner-tételre: a súlyponton átmenő tengelyhez képest a másikra $m \\cdot s^2$-tel nagyobb a $\\Theta$.'
      ],
      tex: '\\Theta = \\sum m_i l_i^2,\\qquad \\Theta_F = \\Theta_S + m \\cdot s^2'
    },
    {
      cim: 'Korongra csavart fonál: haladás + forgás',
      mikor: 'Egy korong kerületére fonál van csavarva, a végén test lóg (vagy lejtőn csúszik); a gyorsulás, a szöggyorsulás vagy a végsebesség a kérdés.',
      lepesek: [
        'Rajzold be az erőket: a testre a súlyerő és a $K$ fonálerő hat (lejtőn a súrlódás is), a korongot a $K$ fonálerő forgatja.',
        'Korong (forgás): $\\Theta\\beta = K \\cdot R$, ahol $\\Theta = \\frac{1}{2} m R^2$.',
        'Test (haladás): $m_1 a = m_1 g - K$.',
        'A fonál miatt $a = R\\beta$. Ezzel a korong egyenlete: $K = \\frac{1}{2} m a$.',
        'Ejtsd ki a $K$-t, számold ki az $a$-t, majd $\\beta = \\frac{a}{R}$ és $v = \\sqrt{2 a s}$.'
      ],
      tex: '\\Theta\\beta = K R,\\qquad m_1 a = m_1 g - K,\\qquad a = R\\beta'
    },
    {
      cim: 'Energiamegmaradás forgással (gördülés, eldőlő rúd)',
      mikor: 'Magasság adott és a végsebesség a kérdés, idő nem szerepel: lejtőn legördülő korong, eldőlő rúd.',
      lepesek: [
        'Kezdetben helyzeti energia van: $m g h$, ahol $h$ a <b>súlypont</b> süllyedése (eldőlő rúdnál $\\frac{L}{2}$).',
        'A végén: gördülő korongnál haladási és forgási energia együtt; a végpontja körül elforduló rúdnál $\\frac{1}{2}\\Theta\\omega^2$.',
        'Írd be a $\\Theta$-t (korong: $\\frac{1}{2} m R^2$, rúd a végpontjára: $\\frac{1}{3} m L^2$) és a $v = R\\omega$ (rúdnál $v = L\\omega$) kapcsolatot.',
        'A tömeg kiesik. Rendezd $v$-re, és helyettesíts be.'
      ],
      tex: 'm g h = \\frac{1}{2} m v^2 + \\frac{1}{2}\\Theta\\omega^2'
    }
  ],

  tippek: [
    'Fordulatszámból szögsebesség: $\\omega = 2\\pi f$. Szögből fordulatok száma: $n = \\frac{\\varphi}{2\\pi}$. Megállásnál $\\omega = 0$, a $\\beta$ és az $M$ negatív (lassítás).',
    'Súlypontnál a tömeg a mérettel arányos: rúdnál a hosszal, lemeznél a területtel (az $R$ és $\\frac{R}{2}$ sugarú lemez tömege $4 : 1$), gömbnél a térfogat · sűrűséggel. Az egységnyi darab tömege mindig kiesik.',
    'A súlypont helyénél mindig írd oda, <b>honnan mérted</b> az $x$-et (pl. a nagy lemez középpontjától), vagy add meg a koordináta-rendszert.',
    'Kivágás = negatív tömeg: teljes test mínusz a kivágott rész. Ugyanazt kapod, mint ha a megmaradt darabokat adnád össze.',
    'Ha a fonál nem csúszik a korongon, vagy a test csúszás nélkül gördül: $v = R\\omega$ és $a = R\\beta$. Ezzel tudod összekötni a haladást a forgással.',
    'Forgási energia: $\\frac{1}{2}\\Theta\\omega^2$. Gördülő testnél a haladási ($\\frac{1}{2} m v^2$) és a forgási energia is kell.',
    'Ezeket tudd fejből: korong a középpontjára $\\Theta = \\frac{1}{2} m R^2$; rúd a közepére $\\frac{1}{12} m L^2$, a végpontjára $\\frac{1}{3} m L^2$; pontszerű testekre $\\Theta = \\sum m_i l_i^2$.',
    'A teljes levezetést le kell írni: képlet → behelyettesítés → eredmény mértékegységgel. A tanár $g = 10\\,\\mathrm{m/s^2}$-tel számol.'
  ],

  feladatok: [
    {
      id: 'zh6',
      cim: 'Két érintkező körlemez súlypontja',
      forras: 'PróbaZH 6. feladat · 2 pont',
      zh: true,
      szoveg: 'Határozzuk meg az egymással érintkező $R$ és $R/2$ sugarú lemezek súlypontját!',
      adatok: ['R_1 = R', 'R_2 = \\frac{R}{2}', 'd = R + \\frac{R}{2} = \\frac{3R}{2}'],
      tipp: 'Képzeld a két lemezt a középpontjukba tett tömegpontnak. Mekkora a két középpont távolsága, és hogyan aránylik a két tömeg?',
      lepesek: [
        {
          cim: 'Ábra és elv',
          szoveg: 'Bal oldalon van a nagy ($R$ sugarú, $M$ tömegű) lemez, jobbról érinti a kicsi ($\\frac{R}{2}$ sugarú, $m$ tömegű). A két középpont távolsága $R + \\frac{R}{2} = \\frac{3R}{2}$. A közös súlypont a két középpontot összekötő szakaszon van, a nagy lemez középpontjától $x$ távolságra. Az elv: a merev test súlyának a súlypontra vonatkozó forgatónyomatéka a test bármely helyzetében zérus. Ezért a két súlyerő forgatónyomatéka a súlypontra egyenlő.',
          tex: 'M g\\,x = m g\\left(\\frac{3R}{2} - x\\right)'
        },
        {
          cim: 'A két lemez tömege',
          szoveg: 'A lemez homogén, ezért a tömege a területével arányos. Jelöld a lemez $1\\,\\mathrm{m^2}$ nagyságú darabjának tömegét $m_0$-lal. A kör területe $r^2\\pi$.',
          tex: 'M = m_0 \\cdot R^2 \\cdot \\pi,\\qquad m = m_0 \\cdot \\left(\\frac{R}{2}\\right)^2 \\cdot \\pi',
          megj: 'A nagy lemez tömege tehát négyszerese a kicsinek.'
        },
        {
          cim: 'Behelyettesítés, egyszerűsítés',
          szoveg: 'Írd be a tömegeket a nyomatéki egyenletbe. Mindkét oldalon ott van $m_0$, $\\pi$, $g$ és $R^2$, ezekkel egyszerűsíthetsz. A jobb oldalon marad egy $\\frac{1}{4}$-es szorzó.',
          tex: 'm_0 \\cdot R^2 \\cdot \\pi \\cdot g \\cdot x = m_0 \\cdot \\left(\\frac{R}{2}\\right)^2 \\cdot \\pi \\cdot g \\cdot \\left(\\frac{3R}{2} - x\\right)',
          er: 'x = \\frac{1}{4} \\cdot \\left(\\frac{3R}{2} - x\\right)'
        },
        {
          cim: 'Rendezés x-re',
          szoveg: 'Szorozz 4-gyel, vidd át az $x$-et a bal oldalra, majd ossz 5-tel.',
          tex: '4x = \\frac{3R}{2} - x \\;\\Rightarrow\\; 5x = \\frac{3R}{2}',
          er: 'x = \\frac{3}{10} \\cdot R'
        }
      ],
      valasz: 'x = \\frac{3}{10}R = 0{,}3\\,R',
      megj: 'A súlypont a nagy lemez középpontjától $0{,}3R$-re van a kis lemez felé, tehát még a nagy lemezen belül. Ugyanez a feladat a GYF Súlypont 4. feladata.'
    },
    {
      id: 'zh7',
      cim: 'Leálló rulettkerék',
      forras: 'PróbaZH 7. feladat · 1,5 pont',
      zh: true,
      szoveg: 'Egy rulettkerék 0,80 1/s-os fordulatszámról 20 s alatt leáll. Állandó lassulást feltételezve mekkora a szöggyorsulás? A folyamat alatt hányat fordul a kerék?',
      adatok: ['f = 0{,}80\\,\\mathrm{1/s}', 't = 20\\,\\mathrm{s}', '\\omega = 0'],
      tipp: 'A fordulatszámból előbb szögsebességet kell csinálnod. Utána ugyanúgy számolsz, mint egy egyenletesen lassuló autónál, csak $v$ helyett $\\omega$, $a$ helyett $\\beta$, $s$ helyett $\\varphi$ áll.',
      lepesek: [
        {
          cim: 'Kezdeti szögsebesség',
          szoveg: 'A képletekben szögsebesség szerepel, nem fordulatszám. Egy fordulat $2\\pi$ radián, ezért a fordulatszámot $2\\pi$-vel szorzod.',
          tex: '\\omega_0 = 2\\pi f',
          be: '\\omega_0 = 6{,}28 \\cdot 0{,}80',
          er: '\\omega_0 \\approx 5{,}02\\,\\mathrm{1/s}'
        },
        {
          cim: 'Szöggyorsulás',
          szoveg: 'Állandó lassulásnál a szögsebesség egyenletesen változik: $\\omega = \\omega_0 + \\beta t$. A kerék megáll, tehát a végén $\\omega = 0$. Ebből kifejezed a $\\beta$-t.',
          tex: '0 = \\omega_0 + \\beta \\cdot t \\;\\Rightarrow\\; \\beta = -\\frac{\\omega_0}{t} = -\\frac{2\\pi f}{t}',
          be: '\\beta = -\\frac{6{,}28 \\cdot 0{,}80}{20}',
          er: '\\beta = -0{,}25\\,\\mathrm{1/s^2}',
          megj: 'A negatív előjel azt jelenti, hogy a kerék lassul.'
        },
        {
          cim: 'Az elfordulás szöge',
          szoveg: 'Az elfordulás szögét radiánban a $\\varphi(t)$ képlet adja. A $\\beta$ negatív, ezért a második tag levonódik.',
          tex: '\\varphi(t) = \\omega_0 \\cdot t + \\frac{1}{2}\\beta \\cdot t^2',
          be: '\\varphi = 6{,}28 \\cdot 0{,}8 \\cdot 20 - \\frac{1}{2} \\cdot 0{,}25 \\cdot 20^2',
          er: '\\varphi = 50{,}26\\,\\mathrm{rad}',
          megj: 'A tanár eredménye 50,26 rad. Kerekítés nélkül ($\\beta = -0{,}2513\\,\\mathrm{1/s^2}$) 50,27 rad jön ki; ha a kerekített $-0{,}25$-tel számolsz, akkor $100{,}48 - 50 = 50{,}48$ rad (saját számolás). A fordulatok száma mindegyikkel 8.'
        },
        {
          cim: 'Fordulatok száma',
          szoveg: 'Egy teljes fordulat $2\\pi$ radián, ezért a szöget elosztod $2\\pi$-vel.',
          tex: 'n = \\frac{\\varphi}{2\\pi}',
          be: 'n = \\frac{50{,}26}{6{,}28}',
          er: 'n = 8'
        }
      ],
      valasz: '\\beta = -0{,}25\\,\\mathrm{1/s^2},\\qquad n = 8',
      megj: 'Mindkét kérdésre válaszolj: a szöggyorsulásra és a fordulatok számára is.'
    },
    {
      id: 'zh8',
      cim: 'Fékező forgatónyomaték',
      forras: 'PróbaZH 8. feladat · 1,5 pont',
      zh: true,
      szoveg: 'Egy 0,015 kgm² tehetetlenségi nyomatékú, 500 g tömegű kerék kezdetben 30 1/s-os fordulatszámmal forog. 163 teljes fordulat után leáll. Mekkora forgatónyomaték lassította?',
      adatok: ['\\Theta = 0{,}015\\,\\mathrm{kg\\,m^2}', 'm = 0{,}5\\,\\mathrm{kg}', 'f_0 = 30\\,\\mathrm{1/s}', 'n = 163', '\\omega = 0'],
      tipp: 'A forgatónyomatékhoz $M = \\Theta\\beta$ kell, tehát a szöggyorsulást keresed. Idő nincs megadva, csak a fordulatok száma: az időt ki kell ejtened a két mozgásegyenletből.',
      lepesek: [
        {
          cim: 'Kezdeti szögsebesség',
          szoveg: 'A cél az $M = \\Theta \\cdot \\beta$ képlet, ehhez a szöggyorsulás kell. Először a fordulatszámból szögsebességet számolsz. Érdemes a $\\pi$-t betűként megtartani, mert később egyszerűsödik.',
          tex: '\\omega_0 = 2\\pi \\cdot f_0',
          be: '\\omega_0 = 2\\pi \\cdot 30',
          er: '\\omega_0 = 60\\pi\\,\\mathrm{1/s}'
        },
        {
          cim: 'Szögelfordulás a megállásig',
          szoveg: 'Egy fordulat $2\\pi$ radián, a kerék 163-at fordul.',
          tex: '\\varphi = n \\cdot 2\\pi',
          be: '\\varphi = 163 \\cdot 2\\pi',
          er: '\\varphi = 326\\pi\\,\\mathrm{rad}'
        },
        {
          cim: 'Az idő kiejtése',
          szoveg: 'A megállás feltétele: $0 = \\omega_0 + \\beta t$, ebből $t = -\\frac{\\omega_0}{\\beta}$. Ezt írd be a $\\varphi(t) = \\omega_0 t + \\frac{1}{2}\\beta t^2$ képletbe. Így olyan összefüggést kapsz, amelyben nincs idő.',
          tex: 't = -\\frac{\\omega_0}{\\beta}',
          be: '\\varphi = -\\frac{\\omega_0^2}{\\beta} + \\frac{1}{2}\\beta \\cdot \\left(\\frac{\\omega_0}{\\beta}\\right)^2',
          er: '\\varphi = -\\frac{1}{2} \\cdot \\frac{\\omega_0^2}{\\beta}'
        },
        {
          cim: 'Szöggyorsulás',
          szoveg: 'Az előző összefüggést rendezd $\\beta$-ra, és helyettesíts be. Az egyik $\\pi$ kiesik.',
          tex: '\\beta = -\\frac{1}{2} \\cdot \\frac{\\omega_0^2}{\\varphi}',
          be: '\\beta = -\\frac{1}{2} \\cdot \\frac{(60\\pi)^2}{326\\pi}',
          er: '\\beta = -17{,}35\\,\\mathrm{1/s^2}'
        },
        {
          cim: 'Forgatónyomaték',
          szoveg: 'A forgómozgás alapegyenlete szerint a forgatónyomaték a tehetetlenségi nyomaték és a szöggyorsulás szorzata.',
          tex: 'M = \\Theta \\cdot \\beta',
          be: 'M = -0{,}015 \\cdot 17{,}35',
          er: 'M = -0{,}26\\,\\mathrm{Nm}'
        }
      ],
      valasz: 'M = -0{,}26\\,\\mathrm{Nm}',
      megj: 'A negatív előjel azt jelenti, hogy a forgatónyomaték fékez. Az 500 g tömeget a tanár megoldása nem használja: a tehetetlenségi nyomaték közvetlenül adott.'
    },
    {
      id: 'minta12',
      cim: 'A nap hossza és a Föld forgási energiája',
      forras: 'MINTA vizsga 12. · 2 pont',
      zh: true,
      szoveg: 'Hány perccel változna meg a nap hossza, ha a Föld forgási energiája 20%-kal csökkenne?',
      adatok: ['E = 0{,}8 \\cdot E_0', 'T_0 = 24\\,\\mathrm{h} = 1440\\,\\mathrm{perc}'],
      tipp: 'Írd fel a forgási energiát a periódusidővel ($\\omega = \\frac{2\\pi}{T}$), egyszer most, egyszer a csökkenés után. A két kifejezést oszd el egymással: a $\\Theta$ kiesik.',
      lepesek: [
        {
          cim: 'Forgási energia most',
          szoveg: 'A Föld merev testként forog, forgási energiája $\\frac{1}{2}\\Theta\\omega^2$. A nap hossza a forgás periódusideje ($T_0$), ezért a szögsebességet a periódusidővel írod fel: $\\omega_0 = \\frac{2\\pi}{T_0}$.',
          tex: 'E_0 = \\frac{1}{2}\\Theta\\omega_0^2 = \\frac{1}{2}\\Theta\\frac{4\\pi^2}{T_0^2}'
        },
        {
          cim: 'Forgási energia a csökkenés után',
          szoveg: 'A 20%-os csökkenés után az energia a régi 0,8-szerese. A Föld tehetetlenségi nyomatéka ($\\Theta$) ugyanaz marad, csak a periódusidő változik $T$-re.',
          tex: 'E = 0{,}8 \\cdot E_0 = \\frac{1}{2}\\Theta\\omega^2 = \\frac{1}{2}\\Theta\\frac{4\\pi^2}{T^2}'
        },
        {
          cim: 'A két energia hányadosa',
          szoveg: 'Oszd el a két energiát egymással. A $\\frac{1}{2}\\Theta \\cdot 4\\pi^2$ kiesik, csak a periódusidők aránya marad. Ebből kifejezed az új periódusidőt.',
          tex: '\\frac{E}{E_0} = 0{,}8 = \\left(\\frac{T_0}{T}\\right)^2 \\;\\Rightarrow\\; T = \\frac{T_0}{\\sqrt{0{,}8}}',
          be: 'T = \\frac{1440}{\\sqrt{0{,}8}}',
          er: 'T \\approx 1610\\,\\mathrm{perc}'
        },
        {
          cim: 'A nap hosszának változása',
          szoveg: 'A változás az új és a régi periódusidő különbsége. A végeredmény percben kell, ezért $T_0$-t percben írod be: $24 \\cdot 60 = 1440$ perc.',
          tex: '\\Delta T = T - T_0 = T_0\\left(\\frac{1}{\\sqrt{0{,}8}} - 1\\right)',
          be: '\\Delta T = 1440 \\cdot \\left(\\frac{1}{\\sqrt{0{,}8}} - 1\\right)',
          er: '\\Delta T = 170\\,\\mathrm{perc}'
        }
      ],
      valasz: '\\Delta T = 170\\,\\mathrm{perc}',
      megj: 'A nap 170 perccel <b>hosszabb</b> lenne: kisebb forgási energiával a Föld lassabban forog. A tanári megoldásban két elírás van ($E = 08E_0$ és $\\frac{1_0}{\\sqrt{0{,}8}}$), helyesen $0{,}8E_0$ és $\\frac{1}{\\sqrt{0{,}8}}$.'
    },
    {
      id: 'gyf-s2',
      cim: 'L betű súlypontja',
      forras: 'GYF Súlypont 2.',
      szoveg: 'Hol van a homogén anyageloszlású, állandó keresztmetszetű 30 cm és 20 cm hosszú rudakból készült L betű súlypontja?',
      adatok: ['l_1 = 20\\,\\mathrm{cm}\\ (\\text{vízszintes rúd})', 'l_2 = 30\\,\\mathrm{cm}\\ (\\text{függőleges rúd})'],
      tipp: 'Tedd az origót az L betű sarkába. Mindkét rudat helyettesítsd a közepébe tett tömegponttal; a tömeg a hosszal arányos.',
      lepesek: [
        {
          cim: 'Koordináta-rendszer és elv',
          szoveg: 'Az origó az L betű sarkában van, ahol a két rúd találkozik. A 20 cm-es rúd az $x$ tengelyen fekszik (jobbra), a 30 cm-es az $y$ tengelyen áll (felfelé). Egy homogén rúd súlypontja a közepén van, ezért mindkét rudat a közepébe tett tömegponttal helyettesíted: $P_1(10;\\,0)$ és $P_2(0;\\,15)$. A tömeg a hosszal arányos: ha 1 cm rúd tömege $m$, akkor $m_1 = 20m$ és $m_2 = 30m$.'
        },
        {
          cim: 'A súlypont képlete',
          szoveg: 'Tömegpontok súlypontját a tömegekkel súlyozott átlag adja. Ezt külön írod fel az $x$ és külön az $y$ koordinátára.',
          tex: '\\underline{r}_s = \\frac{m_1 \\underline{r}_1 + m_2 \\underline{r}_2}{m_1 + m_2}'
        },
        {
          cim: 'Az x koordináta',
          szoveg: 'A függőleges rúd közepének $x$ koordinátája 0, ezért az a tag kiesik. Az $m$ egyszerűsödik.',
          tex: 'x_s = \\frac{m_1 x_1 + m_2 x_2}{m_1 + m_2}',
          be: 'x_s = \\frac{20m \\cdot 10 + 30m \\cdot 0}{50m} = \\frac{200m}{50m}',
          er: 'x_s = 4\\,\\mathrm{cm}'
        },
        {
          cim: 'Az y koordináta',
          szoveg: 'Itt a vízszintes rúd tagja esik ki, mert a közepének $y$ koordinátája 0.',
          tex: 'y_s = \\frac{m_1 y_1 + m_2 y_2}{m_1 + m_2}',
          be: 'y_s = \\frac{20m \\cdot 0 + 30m \\cdot 15}{50m} = \\frac{450m}{50m}',
          er: 'y_s = 9\\,\\mathrm{cm}'
        }
      ],
      valasz: 'S(4\\,\\mathrm{cm};\\ 9\\,\\mathrm{cm})',
      megj: 'A tanár lapján a végeredmény mellett nincs mértékegység; a koordináták cm-ben értendők, az L sarkától mérve. Azt, hogy melyik rúd áll függőlegesen, a tanár választotta (a feladat szövege nem mondja meg). A súlypont a két rúd felezőpontját összekötő szakaszon van, nem magán a rúdon.'
    },
    {
      id: 'gyf-s6',
      cim: 'Négyzetlemez, amelynek hiányzik a negyede',
      forras: 'GYF Súlypont 6.',
      szoveg: 'Vékony lemezből készült 4 m oldalhosszúságú négyzet egyik negyede hiányzik. Hol van a tömegközéppontja?',
      adatok: ['a = 4\\,\\mathrm{m}'],
      tipp: 'Oszd a négyzetet négy kis négyzetre. Három megmaradt, mindegyik ugyanakkora tömegű, és mindegyik súlypontja a saját közepén van.',
      lepesek: [
        {
          cim: 'Ábra és elv',
          szoveg: 'Az origó a nagy négyzet bal alsó sarkában van, az $x$ tengely jobbra, az $y$ tengely felfelé mutat. A 4 m-es négyzetet négy 2 m oldalú kis négyzetre osztod; a jobb felső hiányzik. A megmaradt három kis négyzet egyforma, legyen mindegyik tömege $m$. A súlypontjuk a közepükön van: bal alsó $(1;\\,1)$, jobb alsó $(3;\\,1)$, bal felső $(1;\\,3)$. A lemezt ezzel a három tömegponttal helyettesíted.',
          tex: '\\underline{r}_s = \\frac{\\sum m_i \\underline{r}_i}{\\sum m_i}'
        },
        {
          cim: 'Az x koordináta',
          szoveg: 'A három tömegpont $x$ koordinátája 1, 3 és 1. Az össztömeg $3m$, az $m$ kiesik.',
          tex: 'x_s = \\frac{m_1 x_1 + m_2 x_2 + m_3 x_3}{m_1 + m_2 + m_3}',
          be: 'x_s = \\frac{m \\cdot 1 + m \\cdot 3 + m \\cdot 1}{3m} = \\frac{5m}{3m}',
          er: 'x_s = \\frac{5}{3}\\,\\mathrm{m} \\approx 1{,}67\\,\\mathrm{m}'
        },
        {
          cim: 'Az y koordináta',
          szoveg: 'Az $y$ koordináták 1, 1 és 3, tehát ugyanaz jön ki. Ez nem véletlen: az alakzat szimmetrikus az átlóra.',
          tex: 'y_s = \\frac{m_1 y_1 + m_2 y_2 + m_3 y_3}{m_1 + m_2 + m_3}',
          be: 'y_s = \\frac{m \\cdot 1 + m \\cdot 1 + m \\cdot 3}{3m} = \\frac{5m}{3m}',
          er: 'y_s = \\frac{5}{3}\\,\\mathrm{m} \\approx 1{,}67\\,\\mathrm{m}'
        }
      ],
      valasz: 'S\\left(\\frac{5}{3}\\,\\mathrm{m};\\ \\frac{5}{3}\\,\\mathrm{m}\\right)',
      megj: 'A tanár lapján nincs mértékegység; a koordináták méterben értendők, a bal alsó saroktól mérve. Ellenőrzés negatív tömeggel (saját számolás): a teljes négyzet tömege $4m$ a $(2;\\,2)$ pontban, a kivágott negyed $-m$ a $(3;\\,3)$ pontban, így $x_s = \\frac{4m \\cdot 2 - m \\cdot 3}{4m - m} = \\frac{5}{3}$.'
    },
    {
      id: 'gyf-d1',
      cim: 'Két test a rúdon: tehetetlenségi nyomaték',
      forras: 'GYF Dinamika 1.',
      szoveg: '$L = 0{,}8$ m hosszúságú elhanyagolható tömegű rúd két végére kisméretű $m_1 = 2$ kg, ill. $m_2 = 3$ kg tömegű testet erősítünk. Mekkora az így készített merev test tehetetlenségi nyomatéka olyan forgástengelyre vonatkozólag, mely a rúdra merőleges és az $m_1$ tömegű testtől $d = 0{,}2$ m távolságra van? Mekkora a tehetetlenségi nyomaték, ha a tengely a súlyponton megy keresztül?',
      adatok: ['L = 0{,}8\\,\\mathrm{m}', 'm_1 = 2\\,\\mathrm{kg}', 'm_2 = 3\\,\\mathrm{kg}', 'd = 0{,}2\\,\\mathrm{m}'],
      tipp: 'Pontszerű testeknél $\\Theta = \\sum m_i l_i^2$. Csak azt kell tudnod, milyen messze van a két test a tengelytől. A második kérdéshez előbb a súlypont helye kell.',
      lepesek: [
        {
          cim: 'Ábra és elv',
          szoveg: 'Vízszintes rúd, bal végén az $m_1$, jobb végén az $m_2$ test. A forgástengely merőleges a rúdra, és az $m_1$-től $d$ távolságra metszi. A rúd tömege elhanyagolható, a testek kicsik, ezért a tehetetlenségi nyomaték a tömegpontok képletével számolható: minden tömeget megszorzol a tengelytől mért távolsága négyzetével. A távolságok: $l_1 = d = 0{,}2$ m és $l_2 = L - d = 0{,}6$ m.',
          tex: '\\Theta = \\sum m_i l_i^2'
        },
        {
          cim: 'A) Tengely az m₁-től 0,2 m-re',
          szoveg: 'Behelyettesítesz a két testre, és összeadod a két tagot.',
          tex: '\\Theta = m_1 l_1^2 + m_2 l_2^2',
          be: '\\Theta = 2 \\cdot 0{,}2^2 + 3 \\cdot 0{,}6^2 = 0{,}08 + 1{,}08',
          er: '\\Theta = 1{,}16\\,\\mathrm{kg\\,m^2}'
        },
        {
          cim: 'B) A súlypont helye',
          szoveg: 'Most a tengely a súlyponton megy át, ezért előbb azt kell megkeresni. A súlypontra a két súlyerő forgatónyomatéka egyenlő. Itt $l_1$ már a súlypont távolsága az $m_1$-től. A $g$ kiesik.',
          tex: 'm_1 g\\,l_1 = m_2 g\\,(L - l_1) \\;\\Rightarrow\\; l_1 = \\frac{m_2}{m_1 + m_2} \\cdot L',
          be: 'l_1 = \\frac{3}{5} \\cdot 0{,}8',
          er: 'l_1 = 0{,}48\\,\\mathrm{m},\\qquad l_2 = 0{,}32\\,\\mathrm{m}',
          megj: 'A súlypont a nehezebb testhez van közelebb.'
        },
        {
          cim: 'B) Tengely a súlyponton át',
          szoveg: 'Ugyanaz a képlet, csak az új távolságokkal.',
          tex: '\\Theta_S = m_1 l_1^2 + m_2 l_2^2',
          be: '\\Theta_S = 2 \\cdot 0{,}48^2 + 3 \\cdot 0{,}32^2',
          er: '\\Theta_S = 0{,}768\\,\\mathrm{kg\\,m^2}'
        }
      ],
      valasz: '\\Theta = 1{,}16\\,\\mathrm{kg\\,m^2},\\qquad \\Theta_S = 0{,}768\\,\\mathrm{kg\\,m^2}',
      megj: 'A súlyponton átmenő tengelyre kisebb az érték, ahogy a Steiner-tétel mondja. Ellenőrzés Steiner-tétellel (saját számolás): a két tengely távolsága $s = 0{,}48 - 0{,}2 = 0{,}28$ m, az össztömeg 5 kg, így $0{,}768 + 5 \\cdot 0{,}28^2 = 0{,}768 + 0{,}392 = 1{,}16\\,\\mathrm{kg\\,m^2}$. A tanár lapján az A) résznél egy áthúzott 2,2 is látszik; a helyes érték 1,16.'
    },
    {
      id: 'gyf-d3',
      cim: 'Korongra csavart fonálon lógó test',
      forras: 'GYF Dinamika 3.',
      szoveg: 'Vízszintes tengely körül forgatható $m$ tömegű, $R = 0{,}2$ m sugarú korong kerületére csavart fonal végére $m_1$ tömegű testet függesztünk. Mekkora a korong szöggyorsulása, ha $m_1 = m/2$? A fonál végére függesztett test az elengedésekor $h = 0{,}9$ m magasan van a talaj felett. Mekkora sebességgel éri el a test a talajt?',
      adatok: ['R = 0{,}2\\,\\mathrm{m}', 'm_1 = \\frac{m}{2}', 'h = 0{,}9\\,\\mathrm{m}', 'g = 10\\,\\mathrm{m/s^2}'],
      tipp: 'Két test mozog: a korong forog, a lógó test halad. Mindkettőre írj fel egy egyenletet, és kösd össze őket azzal, hogy $a = R\\beta$.',
      lepesek: [
        {
          cim: 'Ábra és a két egyenlet',
          szoveg: 'A korong a középpontján átmenő vízszintes tengely körül forog. A kerületéről fonál lóg le, a végén az $m_1$ test. A test lefelé gyorsul ($a$), közben a korong $\\beta$ szöggyorsulással forog. A testre lefelé az $m_1 g$ súlyerő, felfelé a $K$ fonálerő hat. A korongot a $K$ fonálerő forgatja, erőkarja $R$. A korongra a forgómozgás alapegyenletét, a testre Newton II. törvényét írod fel.',
          tex: '\\Theta \\cdot \\beta = M,\\qquad m_1 a = m_1 g - K'
        },
        {
          cim: 'A korong egyenlete',
          szoveg: 'A korong tehetetlenségi nyomatéka $\\Theta = \\frac{1}{2} m R^2$, a forgatónyomaték $M = K \\cdot R$. Egy $R$-rel egyszerűsítesz. A fonál nem csúszik a korongon, ezért a test gyorsulása $a = R \\cdot \\beta$.',
          tex: '\\frac{1}{2} m R^2 \\cdot \\beta = K \\cdot R',
          er: 'm \\cdot a = 2K'
        },
        {
          cim: 'A test egyenlete és a gyorsulás',
          szoveg: 'Írd be, hogy $m_1 = \\frac{m}{2}$, és szorozz 2-vel: $m a = m g - 2K$. A korong egyenletéből $2K = m a$, ezt beírod. A tömeg kiesik.',
          tex: '\\frac{m}{2} \\cdot a = \\frac{m}{2} g - K \\;\\Rightarrow\\; 2 m a = m g',
          be: 'a = \\frac{g}{2} = \\frac{10}{2}',
          er: 'a = 5\\,\\mathrm{m/s^2}'
        },
        {
          cim: 'Szöggyorsulás',
          szoveg: 'A gyorsulásból a szöggyorsulást az $a = R\\beta$ kapcsolat adja.',
          tex: '\\beta = \\frac{a}{R} = \\frac{g}{2R}',
          be: '\\beta = \\frac{10}{0{,}4}',
          er: '\\beta = 25\\,\\mathrm{1/s^2}'
        },
        {
          cim: 'Sebesség a talajnál',
          szoveg: 'A test nyugalomból indul, és állandó $a$ gyorsulással $h$ utat tesz meg. A $h = \\frac{1}{2} a t^2$ és a $v = a t$ egyenletekből az idő kiejthető.',
          tex: 'v = \\sqrt{2 a h}',
          be: 'v = \\sqrt{2 \\cdot 5 \\cdot 0{,}9} = \\sqrt{9}',
          er: 'v = 3\\,\\mathrm{m/s}'
        }
      ],
      valasz: '\\beta = 25\\,\\mathrm{1/s^2},\\qquad v = 3\\,\\mathrm{m/s}',
      megj: 'Figyelj: a gyök alatt $a$ áll, nem $g$. A test nem szabadon esik, mert a korongot is fel kell pörgetnie.'
    },
    {
      id: 'gyf-d5',
      cim: 'Lejtőn csúszó test és korong',
      forras: 'GYF Dinamika 5.',
      szoveg: '$\\alpha = 21{,}8^\\circ$ hajlásszögű lejtőn $h = 0{,}8$ m magasságból $m_1 = m/2$ tömegű test csúszhat le. A testhez a lejtő tetején megerősített, vízszintes tengely körül forgatható korong kerületére csavart fonál végét kötjük. A korong tömege $m$, sugara $R = 5$ cm. Mekkora sebességgel ér a lejtő aljára a test, ha a csúszási súrlódási együttható $\\mu = 0{,}2$? Mekkora a korong szöggyorsulása?',
      adatok: ['\\alpha = 21{,}8^\\circ', 'h = 0{,}8\\,\\mathrm{m}', 'm_1 = \\frac{m}{2}', 'R = 0{,}05\\,\\mathrm{m}', '\\mu = 0{,}2', 'g = 10\\,\\mathrm{m/s^2}'],
      tipp: 'Ugyanaz, mint a lógó testnél, csak a testet most a súlyerő lejtőirányú összetevője húzza, és a súrlódás is fékezi. A korong egyenlete nem változik.',
      lepesek: [
        {
          cim: 'Ábra és a két egyenlet',
          szoveg: 'A lejtő tetején van a korong ($m$, $R$), a kerületére csavart fonál a lejtővel párhuzamosan fut le a testhez. A test $a$ gyorsulással csúszik lefelé. A lejtő mentén lefelé húzza a súlyerő lejtőirányú összetevője ($m_1 g \\sin\\alpha$), felfelé fékezi az $F_s = \\mu\\, m_1 g \\cos\\alpha$ súrlódási erő és a $K$ fonálerő. A korongot a $K$ fonálerő forgatja. A korongra a forgómozgás alapegyenletét, a testre Newton II. törvényét írod fel.',
          tex: '\\Theta \\cdot \\beta = K \\cdot R,\\qquad m_1 a = m_1 g \\sin\\alpha - \\mu\\, m_1 g \\cos\\alpha - K'
        },
        {
          cim: 'A fonálerő a korong egyenletéből',
          szoveg: 'A korongra $\\Theta = \\frac{1}{2} m R^2$. Egy $R$-rel egyszerűsítesz, és beírod, hogy $R \\cdot \\beta = a$ (a fonál nem csúszik a korongon).',
          tex: '\\frac{1}{2} m R^2 \\cdot \\beta = K \\cdot R',
          er: 'K = \\frac{1}{2} m a'
        },
        {
          cim: 'A gyorsulás',
          szoveg: 'A test egyenletébe beírod a $K$-t és azt, hogy $m_1 = \\frac{m}{2}$. Így minden tagban $\\frac{m}{2}$ áll, ezzel egyszerűsítesz: $2a = g(\\sin\\alpha - \\mu\\cos\\alpha)$.',
          tex: 'a = \\frac{g}{2}\\,(\\sin\\alpha - \\mu \\cdot \\cos\\alpha)',
          be: 'a = 5 \\cdot (\\sin 21{,}8^\\circ - 0{,}2 \\cdot \\cos 21{,}8^\\circ) = 5 \\cdot (0{,}3714 - 0{,}2 \\cdot 0{,}9285)',
          er: 'a = 0{,}93\\,\\mathrm{m/s^2}'
        },
        {
          cim: 'Szöggyorsulás',
          szoveg: 'A korong szöggyorsulása az $a = R\\beta$ kapcsolatból jön. A sugarat méterben írd be.',
          tex: '\\beta = \\frac{a}{R}',
          be: '\\beta = \\frac{0{,}93}{0{,}05}',
          er: '\\beta = 18{,}6\\,\\mathrm{1/s^2}'
        },
        {
          cim: 'A lejtőn megtett út',
          szoveg: 'A test nem $h$ utat tesz meg, hanem a lejtő hosszát. A derékszögű háromszögben $\\sin\\alpha = \\frac{h}{s}$.',
          tex: 's = \\frac{h}{\\sin\\alpha}',
          be: 's = \\frac{0{,}8}{\\sin 21{,}8^\\circ}',
          er: 's = 2{,}15\\,\\mathrm{m}'
        },
        {
          cim: 'Sebesség a lejtő alján',
          szoveg: 'A test nyugalomból indul, állandó $a$ gyorsulással $s$ utat tesz meg.',
          tex: 'v = \\sqrt{2 a s}',
          be: 'v = \\sqrt{2 \\cdot 0{,}93 \\cdot 2{,}15}',
          er: 'v = 2\\,\\mathrm{m/s}'
        }
      ],
      valasz: 'v = 2\\,\\mathrm{m/s},\\qquad \\beta = 18{,}6\\,\\mathrm{1/s^2}',
      megj: 'A tanár a kerekített $a = 0{,}93\\,\\mathrm{m/s^2}$-tel számol tovább, ezért $\\beta = 18{,}6\\,\\mathrm{1/s^2}$. Kerekítés nélkül $a = 0{,}928\\,\\mathrm{m/s^2}$ és $\\beta = 18{,}57\\,\\mathrm{1/s^2}$ (saját számolás); a sebesség így is 2,00 m/s.'
    },
    {
      id: 'gyf-d6',
      cim: 'Lejtőn legördülő korong sebessége',
      forras: 'GYF Dinamika 6.',
      szoveg: '$\\alpha$ hajlásszögű lejtőn $R$ sugarú, $m$ tömegű korong csúszás nélkül gördül. Mekkora sebességgel éri el a lejtő alját a $h = 1{,}2$ m magasságból legördülő korong?',
      adatok: ['h = 1{,}2\\,\\mathrm{m}', 'g = 10\\,\\mathrm{m/s^2}'],
      tipp: 'Csak a magasság adott, idő nem kell: energiával számolj. A gördülő korongnak haladási és forgási energiája is van.',
      lepesek: [
        {
          cim: 'Energiamegmaradás',
          szoveg: 'A korong $h$ magasról indul, a lejtő alján $v$ sebességgel halad és közben $\\omega$ szögsebességgel forog. A tanár az energiamegmaradást írja fel: a kezdeti helyzeti energia a lejtő alján haladási és forgási energia lesz.',
          tex: 'm g h = \\frac{1}{2} m v^2 + \\frac{1}{2}\\Theta \\cdot \\omega^2'
        },
        {
          cim: 'A forgási energia átírása',
          szoveg: 'A korongra $\\Theta = \\frac{1}{2} m R^2$. Csúszás nélküli gördülésnél $v = \\omega \\cdot R$, ezért $R^2\\omega^2 = v^2$. Így a forgási energia a haladási energia fele.',
          tex: '\\frac{1}{2} \\cdot \\frac{1}{2} m R^2 \\cdot \\omega^2 = \\frac{1}{4} m v^2',
          er: 'm g h = \\frac{3}{4} m v^2'
        },
        {
          cim: 'A sebesség',
          szoveg: 'A tömeg kiesik. Rendezd $v$-re, és helyettesíts be.',
          tex: 'v = \\sqrt{\\frac{4}{3} g h}',
          be: 'v = \\sqrt{\\frac{4}{3} \\cdot 10 \\cdot 1{,}2} = \\sqrt{16}',
          er: 'v = 4\\,\\mathrm{m/s}'
        }
      ],
      valasz: 'v = 4\\,\\mathrm{m/s}',
      megj: 'Az $\\alpha$, az $R$ és az $m$ nem kell a végeredményhez: mind kiesik, csak a $h$ számít.'
    },
    {
      id: 'gyf-d8',
      cim: 'Eldőlő rúd felső végének sebessége',
      forras: 'GYF Dinamika 8.',
      szoveg: '$L$ hosszúságú homogén vékony rúd vízszintes talajon függőleges helyzetben áll. A rúd eldől úgy, hogy eközben a rúd alsó vége a talajon nem csúszik meg. Mekkora sebességgel csapódik a talajhoz a rúd felső vége?',
      adatok: ['L = 2\\,\\mathrm{m}\\ (\\text{a tanár választása})', 'g = 10\\,\\mathrm{m/s^2}'],
      tipp: 'Az alsó vég nem csúszik, tehát a rúd e pont körül fordul el. Nézd meg, mennyit süllyed a súlypont, és ez az energia mivé alakul.',
      lepesek: [
        {
          cim: 'Ábra és elv',
          szoveg: 'A rúd függőlegesen áll, az alsó vége a talajon van, és nem csúszik meg. Ezért a rúd az alsó végpontja körül fordul el negyed fordulatot, amíg a talajra nem fekszik. A rúd súlypontja a közepén van, kezdetben $\\frac{L}{2}$ magasan; a végén a talajon. A tanár az energiamegmaradást írja fel: a súlypont süllyedéséből származó helyzeti energia forgási energia lesz.',
          tex: 'm g \\frac{L}{2} = \\frac{1}{2}\\Theta \\cdot \\omega^2'
        },
        {
          cim: 'A rúd tehetetlenségi nyomatéka',
          szoveg: 'A forgástengely a rúd végpontján megy át, erre a tengelyre a homogén rúd tehetetlenségi nyomatéka $\\frac{1}{3} m L^2$. Beírod, és szorzol 2-vel.',
          tex: '\\Theta = \\frac{1}{3} m L^2',
          er: 'm g L = \\frac{1}{3} m \\left(L^2 \\cdot \\omega^2\\right)'
        },
        {
          cim: 'A felső vég sebessége',
          szoveg: 'A felső vég $L$ sugarú körön mozog, ezért a sebessége $v = L \\cdot \\omega$, vagyis $L^2\\omega^2 = v^2$. A tömeg kiesik.',
          tex: 'g L = \\frac{1}{3} v^2',
          er: 'v = \\sqrt{3 g L}'
        },
        {
          cim: 'Számérték L = 2 m-rel',
          szoveg: 'A feladat nem ad számot, a tanár $L = 2$ m-rel számol.',
          tex: 'v = \\sqrt{3 g L}',
          be: 'v = \\sqrt{3 \\cdot 10 \\cdot 2} = \\sqrt{60}',
          er: 'v = 7{,}75\\,\\mathrm{m/s} = 27{,}9\\,\\mathrm{km/h}'
        }
      ],
      valasz: 'v = \\sqrt{3 g L}',
      megj: 'A feladat szövegében nincs számadat a rúd hosszára; az $L = 2$ m a tanár saját választása, ezzel $v = 7{,}75$ m/s. A ZH-n a betűs végeredmény ($v = \\sqrt{3gL}$) a lényeg.'
    },
    {
      id: 'gyf-d10',
      cim: 'Két golyó a rúdon: lengésidő',
      forras: 'GYF Dinamika 10.',
      szoveg: 'Súlytalan merev rúd hossza 3 m. Végeire 1 kg tömegű, kisméretű golyókat erősítettek. Az egész rendszer a felső végétől 1 m-re levő vízszintes tengely körül kis kitérésű lengéseket végez. Mekkora a lengésidő?',
      adatok: ['L = 3\\,\\mathrm{m}', 'm = 1\\,\\mathrm{kg}', 'l_1 = 2\\,\\mathrm{m}\\ (\\text{alsó golyó})', 'l_2 = 1\\,\\mathrm{m}\\ (\\text{felső golyó})', 'g = 10\\,\\mathrm{m/s^2}'],
      tipp: 'Írd fel a forgómozgás alapegyenletét a kitérített rúdra. Ha a végén $\\frac{d^2\\varphi}{dt^2} = -(\\text{szám}) \\cdot \\varphi$ alakot kapsz, az a szám éppen $\\omega^2$.',
      lepesek: [
        {
          cim: 'Ábra és elv',
          szoveg: 'A rúd az $O$ ponton átmenő vízszintes tengely körül lenghet. Az $O$ pont a felső végtől 1 m-re van: a felső golyó 1 m-re van $O$ fölött, az alsó 2 m-re $O$ alatt. A rudat a függőlegestől $\\varphi$ szöggel kitéríted. Mindkét golyóra lefelé $mg$ súlyerő hat. A mozgást a forgómozgás alapegyenlete írja le, ahol $\\beta = \\frac{d^2\\varphi}{dt^2}$ a szöggyorsulás.',
          tex: '\\Theta \\cdot \\beta = M'
        },
        {
          cim: 'Tehetetlenségi nyomaték',
          szoveg: 'A rúd súlytalan, a golyók kicsik, ezért a tömegpontok képletével számolsz. A távolságokat az $O$ tengelytől méred.',
          tex: '\\Theta = m \\cdot l_1^2 + m \\cdot l_2^2',
          be: '\\Theta = m \\cdot 2^2 + m \\cdot 1^2',
          er: '\\Theta = 5\\,m'
        },
        {
          cim: 'Forgatónyomaték',
          szoveg: 'A súlyerők erőkarja a tengelytől mért vízszintes távolság: az alsó golyónál $k_1 = 2 \\cdot \\sin\\varphi$, a felsőnél $k_2 = 1 \\cdot \\sin\\varphi$. A két golyó a tengely két oldalán van, ezért a nyomatékaik ellentétesek. Az alsó golyóé a nagyobb, és ez visszafelé forgat: ezért negatív az előjel.',
          tex: 'M = -(m g \\cdot k_1 - m g \\cdot k_2)',
          be: 'M = -m g \\cdot (2 \\cdot \\sin\\varphi - 1 \\cdot \\sin\\varphi)',
          er: 'M = -m g \\cdot \\sin\\varphi'
        },
        {
          cim: 'Mozgásegyenlet kis szögre',
          szoveg: 'Beírod a $\\Theta$-t és az $M$-et az alapegyenletbe, a tömeg kiesik. Kis kitérésnél $\\sin\\varphi \\approx \\varphi$. A $g = 10$ értékkel $\\frac{g}{5} = 2$.',
          tex: '5m \\cdot \\frac{d^2\\varphi}{dt^2} = -m g \\cdot \\sin\\varphi',
          be: '\\frac{d^2\\varphi}{dt^2} = -\\frac{g}{5} \\cdot \\varphi = -\\frac{10}{5} \\cdot \\varphi',
          er: '\\frac{d^2\\varphi}{dt^2} = -2 \\cdot \\varphi'
        },
        {
          cim: 'Lengésidő',
          szoveg: 'Ez ugyanolyan alakú, mint a harmonikus rezgés egyenlete: $\\frac{d^2x}{dt^2} = -\\omega^2 x$. A kettőt összehasonlítva $\\omega^2 = 2$, tehát $\\omega = \\sqrt{2}$. A lengésidő az $\\omega = \\frac{2\\pi}{T}$ kapcsolatból jön.',
          tex: '\\frac{2\\pi}{T} = \\sqrt{2} \\;\\Rightarrow\\; T = \\frac{2\\pi}{\\sqrt{2}}',
          be: 'T = \\sqrt{2} \\cdot \\pi',
          er: 'T = 4{,}44\\,\\mathrm{s}'
        }
      ],
      valasz: 'T = \\sqrt{2} \\cdot \\pi = 4{,}44\\,\\mathrm{s}',
      megj: 'A tanár a mértékegységeket menet közben nem írja ki: a $\\Theta = 5m$-ben az 5 valójában $5\\,\\mathrm{m^2}$, a 2 pedig $2\\,\\mathrm{1/s^2}$. A golyók tömege kiesik, a lengésidő nem függ tőle.'
    }
  ],

  gyakorlo: [
    {
      id: 'gy-s1',
      forras: 'GYF Súlypont 1.',
      szoveg: 'Hol van a homogén anyageloszlású, állandó keresztmetszetű 40 cm és 50 cm hosszú rudakból készült T betű súlypontja?',
      valasz: 'x = \\frac{125}{9}\\,\\mathrm{cm} = 13{,}89\\,\\mathrm{cm}',
      tipp: 'Súlypont forgatónyomatékkal. A tanárnál a 40 cm-es rúd a T teteje ($m_1 = 40m$), az 50 cm-es a szára ($m_2 = 50m$); a két rúd közepe 25 cm-re van egymástól, így $40x = 50(25 - x)$. Az $x$-et a felső rúd közepétől méred a szár mentén lefelé.'
    },
    {
      id: 'gy-s3',
      forras: 'GYF Súlypont 3.',
      szoveg: 'Egy $a$ hosszúságú négyzet csúcspontjaiba rendre $m$, $2m$, $3m$ és $4m$ tömegű tömegpontokat helyezek el. Határozza meg a pontrendszer súlypontját!',
      valasz: 'x_s = \\frac{5}{10}a = \\frac{a}{2},\\qquad y_s = \\frac{7}{10}a',
      tipp: 'Súlypont koordinátákkal. Az origó az $m$ tömegnél van, a többi sorban: $2m$ az $(a;\\,0)$, $3m$ az $(a;\\,a)$, $4m$ a $(0;\\,a)$ pontban. Készíts táblázatot: $\\sum m_i = 10m$, $\\sum m_i x_i = 5ma$, $\\sum m_i y_i = 7ma$.'
    },
    {
      id: 'gy-s4',
      forras: 'GYF Súlypont 4.',
      szoveg: 'Határozzuk meg az egymással érintkező $R$ és $R/2$ sugarú lemezek súlypontját!',
      valasz: 'x = \\frac{3R}{10} = 0{,}3\\,R',
      tipp: 'Ez szó szerint a PróbaZH 6. feladata. Takard le a megoldást, és írd le fejből a teljes levezetést; az $x$-et a nagy lemez középpontjától méred.'
    },
    {
      id: 'gy-s5',
      forras: 'GYF Súlypont 5.',
      szoveg: 'Határozzuk meg az egymást érintő tömör homogén alumínium és rézgömbök közös súlypontját, ha az alumínium gömb sugara 6 cm, a rézé 2,5 cm! $\\rho_{Al} = 2{,}7\\,\\mathrm{kg/dm^3}$, $\\rho_{Cu} = 8{,}96\\,\\mathrm{kg/dm^3}$.',
      valasz: 'x = 1{,}65\\,\\mathrm{cm}',
      tipp: 'Súlypont forgatónyomatékkal: $m_{Al}\\,x = m_{Cu}\\,(d - x)$, ahol $d = 8{,}5$ cm a középpontok távolsága, a tömeg pedig $\\frac{4\\pi}{3}R^3\\rho$. Csak a sugarak és a sűrűségek aránya kell, ezért nem kell átváltanod. Az $x$-et az alumíniumgömb középpontjától méred.'
    },
    {
      id: 'gy-d4',
      forras: 'GYF Dinamika 4.',
      szoveg: 'Vízszintes tengely körül forgatható korong kerületén átvetett fonál egyik végére $m_1$, másik végére $m_2$ tömegű testet függesztünk. Mekkora szöggyorsulással forog a korong, ha a korong tömege $m$, $m_1 = m$ és $m_2 = m/2$? (A fonál nem nyúlik és a korong kerületén nem csúszik.) A fonál végére függesztett testek szintkülönbsége indításkor $h = 40$ cm. Mekkora a korong szögsebessége akkor, amikor a két test azonos szintbe kerül? (A korong sugara $R = 10$ cm.)',
      valasz: '\\beta = 25\\,\\mathrm{1/s^2},\\qquad \\omega = 10\\,\\mathrm{1/s}',
      tipp: 'Haladás + forgás, de a két fonálágban más az erő: $\\Theta\\beta = (K_1 - K_2)R$, $m_1 a = m_1 g - K_1$, $m_2 a = K_2 - m_2 g$, és $a = R\\beta$. Ebből $a = \\frac{g}{4} = 2{,}5\\,\\mathrm{m/s^2}$. Azonos szintig mindkét test csak $\\frac{h}{2}$ utat tesz meg: $v = \\sqrt{2a \\cdot \\frac{h}{2}} = 1$ m/s, és $\\omega = \\frac{v}{R}$.'
    }
  ]
}]);
