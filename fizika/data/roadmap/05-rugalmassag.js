/* Roadmap — Rugalmasságtan. Forrás: PróbaZH, MINTA vizsga, GYF feladatsor, tanári megoldások. */
window.FIZ_ROADMAP = (window.FIZ_ROADMAP || []).concat([{
  id: 'rugalmassag',
  nev: 'Rugalmasságtan',
  leckek: ['7'],
  perc: 80,
  lenyeg: 'Szinte minden számolás egyetlen képletre épül: $\\Delta l = \\frac{1}{E}\\,\\frac{F}{A}\\,l_0$. Ezt rendezed a keresett mennyiségre, a keresztmetszetet $A = r^2\\pi$-vel számolod, és nagyon figyelsz a mértékegységekre. Mellette 5 rövid elméleti kérdés jön (mindegyik 1 pont), ezeket szó szerint érdemes tudni.',

  elmelet: [
    {
      k: 'Miért használhatjuk a torzió mértékének meghatározásához is a nyírási modulust?',
      v: 'Mindkét deformáció esetében ugyanaz a fizikai jelenség játszódik le, az egymással párhuzamos kristálysíkok mozdulnak el. Nyírás esetében a kristálysíkok egy meghatározott irányba (transzlációsan) mozdulnak el, csavarás, azaz torzió esetében pedig elfordulnak egymáson.',
      forras: 'PróbaZH',
      trukk: 'Kulcsszó: <b>párhuzamos kristálysíkok elmozdulnak</b>. Nyírás = eltolódnak, torzió = elfordulnak. Mindkét felet írd le.'
    },
    {
      k: 'Mit fejez ki a Poisson-szám és mi a mértékegysége?',
      v: 'Nyújtási deformáció esetén megadja a relatív keresztmetszetváltozásnak és a relatív hosszváltozásnak az arányát. Mivel arányszám, nincs mértékegysége.',
      forras: 'PróbaZH',
      trukk: 'Két kérdés van egyben, két válasz kell: (1) relatív keresztmetszetváltozás osztva relatív hosszváltozással, (2) arányszám, tehát nincs mértékegysége.'
    },
    {
      k: 'Egy acélrudat a végénél fogva $\\omega$ szögsebességgel megforgatunk. Kell-e számolni az acélrúd hosszváltozásával? Ha igen, hogyan változik? Válaszát indokolja!',
      v: 'Az acélrúd forgatásakor megnyúlik, noha kis szögsebességek esetén a megnyúlás is kicsi lesz. A rúd megforgatásakor minden egyes térfogateleme egyenletes körmozgást végez. Tekintsük a rúd forgástengelytől távoli végén lévő térfogatelemet, amelynek a tömegét jelöljük $\\Delta m$-mel. A $\\Delta m$ egyenletes körmozgásának a dinamikai feltétele, hogy hasson rá a körpálya középpontja felé, tehát a forgástengely felé ható centripetális erő. Ezt az erőt közvetlenül a rúdnak az a része fejti ki, amelyik érintkezik a $\\Delta m$-mel. Newton III. törvénye értelmében a $\\Delta m$ ugyanolyan nagyságú és ellentétes irányú erőt fejt ki a rúd vele érintkező végére. Ez az erő fogja a rudat nyújtani – illetve a rúd tetszőleges térfogatelemére ható erők összege.',
      forras: 'PróbaZH',
      trukk: 'Válasz: <b>igen, megnyúlik</b>. Az indoklás lánca: körmozgás → centripetális erő kell → ezt a rúd fejti ki → Newton III. miatt az ellenerő nyújtja a rudat. Az indoklás nélkül nem jár a pont.'
    },
    {
      k: 'Toronyugráshoz készülődő versenyző kiáll a rugalmas ugródeszka végére. Az ugródeszka 0,5 cm-t hajlik meg. Mekkora lenne az ugródeszka lehajlása, ha 15%-kal hosszabb lenne?',
      v: 'Hajlítási deformáció esetén a lehajlás mértéke arányos az ugródeszka hosszának a köbével. Ha az ugródeszka hossza $L$ helyett $1{,}15L$, akkor a lehajlás $(1{,}15L)^3$-nel, azaz $1{,}52L^3$-nel lesz arányos. A lehajlás tehát 0,5 cm helyett $1{,}52\\cdot 0{,}5 = 0{,}76$ cm lesz.',
      forras: 'PróbaZH',
      trukk: 'A lehajlás a hossz <b>köbével</b> arányos. Ne 15%-kal növeld a lehajlást: $1{,}15^3 \\approx 1{,}52$, ezzel szorozd a 0,5 cm-t.'
    },
    {
      k: 'Mit nevezünk szakítószilárdságnak?',
      v: 'A szakítószilárdság nyújtási deformáció esetén egy rúd elszakításához szükséges erőhatásnak és a rúd nyújtatlan állapotban mért keresztmetszetének a hányadosa.',
      forras: 'PróbaZH',
      trukk: 'Erő osztva keresztmetszettel, de a <b>nyújtatlan</b> (eredeti) keresztmetszettel. Ez a szó ne maradjon ki. Képlettel: $\\sigma_{sz} = \\frac{F_{max}}{A}$.'
    },
    {
      k: 'A rugalmas lehajlás mértékét meghatározó összefüggésben a Young-modulus szerepel. Mi lehet a magyarázata?',
      v: 'Egy rúd rugalmas lehajlásakor a neutrális réteg feletti anyagrétegek megnyúlnak, az alattiak pedig összenyomódnak. A Young-modulus pedig éppen az anyagok nyújtási rugalmassági modulusa.',
      forras: 'MINTA vizsga',
      trukk: 'Kulcsszó: <b>neutrális réteg</b>. Felette megnyúlás, alatta összenyomódás → a lehajlás valójában nyújtás, ezért Young-modulus.'
    }
  ],

  receptek: [
    {
      cim: 'Huzal megnyúlása (alapképlet)',
      mikor: 'Drót, huzal vagy rúd van, és a hossz, az átmérő, az erő, a megnyúlás és a Young-modulus közül négy adott, egy a kérdés.',
      lepesek: [
        'Írd fel az alapképletet: $\\Delta l = \\frac{1}{E}\\,\\frac{F}{A}\\,l_0$.',
        'Számold ki a keresztmetszetet: $A = r^2\\pi = \\frac{d^2}{4}\\pi$. Az átmérőt felezni kell!',
        'Rendezd a képletet a keresett mennyiségre: $F = \\frac{\\Delta l}{l_0}EA$, $\\;l_0 = \\Delta l\\,\\frac{EA}{F}$, $\\;A = \\frac{F}{E}\\,\\frac{l_0}{\\Delta l}$, $\\;E = \\frac{F}{A}\\,\\frac{l_0}{\\Delta l}$.',
        'Egységek: $E$ N/mm²-ben, $A$ mm²-ben, $l_0$ és $\\Delta l$ egyformán mm-ben. Ha test lóg a dróton, $F = mg$.',
        'Helyettesíts be, és írd ki az eredményt mértékegységgel.'
      ],
      tex: '\\Delta l = \\frac{1}{E}\\,\\frac{F}{A}\\,l_0'
    },
    {
      cim: 'Szakítószilárdság, legnagyobb teher, biztonság',
      mikor: 'A feladat szakítószilárdságot ($\\sigma_{sz}$) ad meg, és azt kérdezi, mekkora erőt vagy tömeget bír ki a huzal, vagy hányszoros a biztonság.',
      lepesek: [
        'Feszültség: $\\sigma = \\frac{F}{A}$. A huzal akkor szakad, ha $\\sigma$ eléri $\\sigma_{sz}$-t.',
        'Legnagyobb erő: $F_{max} = \\sigma_{sz}\\cdot A$. Lógó testnél $F_{max} = m_{max}\\,g$.',
        'Ha $k$-szoros biztonság kell, a megengedett feszültség $\\sigma_{max} = \\frac{\\sigma_{sz}}{k}$.',
        'Ha a biztonság a kérdés: számold ki a tényleges $\\sigma = \\frac{F}{A}$ feszültséget, a biztonság $\\frac{\\sigma_{sz}}{\\sigma}$.'
      ],
      tex: 'F_{max} = \\sigma_{sz}\\cdot A'
    },
    {
      cim: 'Huzal mint rugó',
      mikor: 'A feladat az erő és a megnyúlás közötti arányossági tényezőt (rugóállandót) kérdezi.',
      lepesek: [
        'Rendezd az alapképletet erőre: $F = \\frac{EA}{l_0}\\,\\Delta l$.',
        'Hasonlítsd össze a rugó képletével: $F = D\\,\\Delta l$. Ebből $D = \\frac{EA}{l_0}$.',
        'Ha $E$ N/mm²-ben, $A$ mm²-ben van, akkor $EA$ N-ban jön ki. Ezt $l_0$-lal méterben osztva $D$ N/m-ben adódik.',
        'Az arányosság határa: $F_{max} = \\sigma\\cdot A$, ahol $\\sigma$ a megadott határfeszültség.'
      ],
      tex: 'D = \\frac{E\\,A}{l_0}'
    },
    {
      cim: 'Sorba és párhuzamosan kötött huzalok',
      mikor: 'Két különböző anyagú (acél és réz) drót tart egy testet: egymás végére kötve (soros) vagy egymás mellett lógva (párhuzamos).',
      lepesek: [
        '<b>Soros</b> (egymás végén): mindkét drótot ugyanaz az $mg$ erő húzza. A megnyúlások összeadódnak: $\\Delta l = \\Delta l_{Ac} + \\Delta l_{\\text{Ré}}$.',
        '<b>Párhuzamos</b> (egymás mellett): a megnyúlás közös, az erők adódnak össze: $F_{Fe} + F_{Cu} = mg$.',
        'Párhuzamosnál írd fel mindkét erőt a közös megnyúlással: $F = \\frac{\\Delta l}{l_0}EA$, add össze, és fejezd ki $\\Delta l$-t.',
        'A lenti két képlet akkor igaz, ha a két drót hossza és keresztmetszete egyforma (a feladatokban így van).'
      ],
      tex: '\\Delta l_{soros} = \\left(\\frac{1}{E_1}+\\frac{1}{E_2}\\right)\\frac{F}{A}\\,l_0 \\qquad \\Delta l_{parh} = \\frac{1}{E_1+E_2}\\,\\frac{F}{A}\\,l_0'
    },
    {
      cim: 'Mozgó teher: gyorsuló vagy körbe forgatott test',
      mikor: 'A teher nem nyugalomban lóg: a daru gyorsítva emeli, vagy a huzal végén körbe forgatják.',
      lepesek: [
        'Először dinamikából keresd meg a huzalt húzó erőt.',
        'Gyorsítva emelt teher: $m\\,a = F - mg$, tehát a kötélerő nagyobb a súlynál.',
        'Körbe forgatott test: a huzal adja a centripetális erőt, $F_{cp} = m\\,\\omega^2 R$, ahol $\\omega = 2\\pi f$ és $R = l_0 + \\Delta l$.',
        'Ezt az erőt tedd be az alapképletbe ($\\Delta l$), vagy hasonlítsd össze a megengedett erővel ($F_{max} = \\sigma_{max}A$).'
      ],
      tex: 'm\\,a = F - m\\,g \\qquad F_{cp} = m\\,\\omega^2\\,(l_0+\\Delta l)'
    },
    {
      cim: 'Lehajlás és csavarás (torzió)',
      mikor: 'Egyik végén befogott lemez vagy rúd hajlik le, illetve tengely csavarodik el átvitt teljesítmény hatására.',
      lepesek: [
        'Lehajlás (egyik vég befogva, a másik végén $F$ erő): $s = \\frac{4}{E}\\,\\frac{l^3}{a\\,b^3}\\,F$, ahol $a$ a szélesség, $b$ a vastagság.',
        'Rezgésidőhöz: fejezd ki $F$-et $s$-sel. Az erő arányos a kitéréssel, ebből $\\omega = \\sqrt{\\frac{E}{4}\\,\\frac{a\\,b^3}{l^3\\,m}}$ és $T = \\frac{2\\pi}{\\omega}$.',
        'Csavarás: előbb a forgatónyomaték kell. Forgásnál $P = M\\,\\omega$, tehát $M = \\frac{P}{\\omega}$, ahol $\\omega = 2\\pi f$.',
        'Elcsavarodás: $\\varphi = \\frac{2}{\\pi G}\\,\\frac{l}{R^4}\\,M$. Az eredmény radián.',
        'Ezeknél a tanár mindent SI-ben számol: $2\\cdot 10^5$ N/mm² $= 2\\cdot 10^{11}$ N/m², a hosszak méterben.'
      ],
      tex: 's = \\frac{4}{E}\\,\\frac{l^3}{a\\,b^3}\\,F \\qquad \\varphi = \\frac{2}{\\pi G}\\,\\frac{l}{R^4}\\,M'
    }
  ],

  tippek: [
    'A feladat szinte mindig <b>átmérőt</b> ad meg. A keresztmetszethez sugár kell: $A = r^2\\pi = \\frac{d^2}{4}\\pi$. Ha elfelejted felezni, négyszeres lesz a hiba.',
    'Kétféleképp számolhatsz jól. (1) $E$ N/mm²-ben és $A$ mm²-ben: ekkor $E\\cdot A$ rögtön N. (2) Minden SI-ben. A kettőt ne keverd! Átváltás: $1\\,\\mathrm{mm^2} = 10^{-6}\\,\\mathrm{m^2}$, $\\;1\\,\\mathrm{N/mm^2} = 1\\,\\mathrm{MPa} = 10^{6}\\,\\mathrm{Pa}$.',
    'A $\\frac{\\Delta l}{l_0}$ relatív megnyúlásnak nincs mértékegysége, de csak akkor jó, ha a két hossz ugyanabban az egységben van (például $\\frac{1\\,\\mathrm{mm}}{2000\\,\\mathrm{mm}}$).',
    'Tanári állandók, ha a feladat nem adja meg: $E_{\\text{acél}} = 2\\cdot 10^{5}\\,\\mathrm{N/mm^2}$, $E_{\\text{réz}} = 1{,}2\\cdot 10^{5}\\,\\mathrm{N/mm^2}$, $g = 10\\,\\mathrm{m/s^2}$. Lógó test súlya: $F = mg$.',
    'Soros kötés: az erő közös, a <b>megnyúlások</b> adódnak össze. Párhuzamos kötés: a megnyúlás közös, az <b>erők</b> adódnak össze.',
    'A saját súlya alatt lógó huzal megnyúlása <b>fele</b> annak, mintha a teljes súlya a végén lógna: $\\Delta l = \\frac{1}{2}\\,\\frac{1}{E}\\,\\frac{G}{A}\\,l_0$.',
    'Arányosságok az elméleti kérdésekhez: a lehajlás a hossz köbével arányos ($s \\sim l^3$), az elcsavarodás a sugár negyedik hatványával fordítva arányos ($\\varphi \\sim \\frac{1}{R^4}$).',
    'Mindig írd le a teljes levezetést: képlet betűkkel → behelyettesítés számokkal → eredmény mértékegységgel. A pont nagy része erre jár, nem csak a végeredményre.'
  ],

  feladatok: [
    {
      id: 'zh6',
      cim: 'Rézdrót megnyújtásához szükséges erő',
      forras: 'PróbaZH 6. feladat · 1,5 pont',
      zh: true,
      szoveg: 'A 2 m hosszú, 2 mm átmérőjű rézdrótot 1 mm-el akarjuk megnyújtani. Milyen nagyságú húzóerő szükséges ehhez, ha a réz Young modulusa 117600 MPa?',
      adatok: ['l_0 = 2\\,\\mathrm{m} = 2000\\,\\mathrm{mm}', 'd = 2\\,\\mathrm{mm}', '\\Delta l = 1\\,\\mathrm{mm}', 'E = 117\\,600\\,\\mathrm{MPa}', 'F = \\,?'],
      tipp: 'Az alapképletben minden ismert, csak az erő nem. Előbb váltsd át a Young-modulust N/mm²-be, és számold ki a keresztmetszetet.',
      lepesek: [
        {
          cim: 'Melyik képlet kell?',
          szoveg: 'Drótot nyújtunk, és az erő a kérdés. Ehhez a megnyúlás alapképlete kell. Ezt rendezzük át az erőre: szorzunk $E$-vel és $A$-val, osztunk $l_0$-lal.',
          tex: '\\Delta l = \\frac{1}{E}\\,\\frac{F}{A}\\,l_0 \\quad\\Rightarrow\\quad F = \\frac{\\Delta l}{l_0}\\,E\\,A'
        },
        {
          cim: 'A Young-modulus átváltása',
          szoveg: 'A drót méretei mm-ben vannak, ezért $E$-t N/mm²-be váltjuk. Mivel $1\\,\\mathrm{Pa} = 1\\,\\mathrm{N/m^2}$, a mega pedig $10^6$, ezért 1 MPa éppen 1 N/mm².',
          tex: '1\\,\\mathrm{MPa} = 10^{6}\\,\\mathrm{N/m^2} = 1\\,\\mathrm{N/mm^2}',
          be: 'E = 117\\,600\\,\\mathrm{MPa} = 1{,}176\\cdot 10^{11}\\,\\mathrm{N/m^2}',
          er: 'E = 1{,}176\\cdot 10^{5}\\,\\mathrm{N/mm^2}'
        },
        {
          cim: 'A keresztmetszet',
          szoveg: 'A drót keresztmetszete kör. Az átmérő 2 mm, tehát a sugár 1 mm. A területet mm²-ben hagyjuk, mert $E$ is N/mm²-ben van.',
          tex: 'A = r^2\\pi',
          be: 'A = 1^2\\cdot 3{,}14',
          er: 'A = 3{,}14\\,\\mathrm{mm^2}'
        },
        {
          cim: 'A húzóerő',
          szoveg: 'Behelyettesítünk. A $\\frac{\\Delta l}{l_0}$ törtben mindkét hossz mm-ben legyen: 1 mm és 2000 mm. Az N/mm² és a mm² szorzata N.',
          tex: 'F = \\frac{\\Delta l}{l_0}\\,E\\,A',
          be: 'F = \\frac{1}{2000}\\cdot 1{,}176\\cdot 10^{5}\\cdot 3{,}14',
          er: 'F = 184{,}6\\,\\mathrm{N}'
        }
      ],
      valasz: 'F = 184{,}6\\,\\mathrm{N}'
    },
    {
      id: 'zh8',
      cim: 'Mekkora tömeget bír el a zongorahúr?',
      forras: 'PróbaZH 8. feladat · 1,5 pont',
      zh: true,
      szoveg: 'Az acél zongorahúr szakítószilárdsága 350 MPa. A 0,5 mm átmérőjű acélhuzal egyik végét felfüggesztjük, a másik végére pedig egy m tömegű testet akasztunk. Mekkora lehet maximum a test tömege, ha nem szeretnénk, hogy az acélhuzal elszakadjon?',
      adatok: ['\\sigma_{sz} = 350\\,\\mathrm{MPa}', 'd = 0{,}5\\,\\mathrm{mm}', 'g = 10\\,\\mathrm{m/s^2}', 'm_{max} = \\,?'],
      tipp: 'Írd le, mit jelent a szakítószilárdság: erő osztva keresztmetszettel. Az erő itt a test súlya.',
      lepesek: [
        {
          cim: 'Mit jelent a szakítószilárdság?',
          szoveg: 'A szakítószilárdság az elszakításhoz szükséges erő és a nyújtatlan keresztmetszet hányadosa. A huzalt a test súlya húzza, tehát a legnagyobb erő $F_{max} = m_{max}\\,g$.',
          tex: '\\frac{F_{max}}{A} = \\sigma_{sz} \\quad\\Rightarrow\\quad \\frac{m_{max}\\cdot g}{A} = \\sigma_{sz}'
        },
        {
          cim: 'Átváltás SI-be',
          szoveg: 'A tanár itt mindent SI-ben számol. A MPa-t N/m²-be váltjuk. Az átmérő 0,5 mm, a sugár ennek a fele: 0,25 mm, ezt méterbe váltjuk.',
          be: '\\sigma_{sz} = 350\\,\\mathrm{MPa} = 350\\cdot 10^{6}\\,\\mathrm{N/m^2}',
          er: 'r = 0{,}25\\,\\mathrm{mm} = 2{,}5\\cdot 10^{-4}\\,\\mathrm{m}'
        },
        {
          cim: 'A keresztmetszet',
          szoveg: 'A huzal keresztmetszete kör, a területe $r^2\\pi$. A $\\pi$-t ne hagyd ki!',
          tex: 'A = r^2\\pi',
          be: 'A = \\left(2{,}5\\cdot 10^{-4}\\right)^2\\cdot 3{,}14',
          er: 'A = 1{,}963\\cdot 10^{-7}\\,\\mathrm{m^2}',
          megj: 'Ugyanez mm²-ben: $A = 0{,}25^2\\cdot 3{,}14 = 0{,}1963\\,\\mathrm{mm^2}$.'
        },
        {
          cim: 'A legnagyobb tömeg',
          szoveg: 'Az első lépés egyenletét $m_{max}$-ra rendezzük: szorzunk $A$-val, osztunk $g$-vel. Utána behelyettesítünk.',
          tex: 'm_{max} = \\sigma_{sz}\\cdot\\frac{A}{g}',
          be: 'm_{max} = 350\\cdot 10^{6}\\cdot\\frac{1{,}963\\cdot 10^{-7}}{10}',
          er: 'm_{max} = 6{,}87\\,\\mathrm{kg}',
          megj: 'Ellenőrzés N/mm²-ben: $F_{max} = 350\\cdot 0{,}1963 =68{,}7\\,\\mathrm{N}$, ebből $m_{max} = 6{,}87\\,\\mathrm{kg}$.'
        }
      ],
      valasz: 'm_{max} = 6{,}87\\,\\mathrm{kg} \\quad \\text{(a tanári megoldásban: } 2{,}19\\,\\mathrm{kg}\\text{)}',
      megj: 'Eltérés a tanári megoldástól: a tanár sora $m_{max} = \\sigma_{sz}\\cdot\\frac{A}{g} = 350\\cdot 10^{6}\\cdot\\frac{(2{,}5\\cdot 10^{-4})^2}{10} = 2{,}19\\,\\mathrm{kg}$. Ebben a keresztmetszet helyén csak $r^2$ áll, a $\\pi$ kimaradt. $A = r^2\\pi$-vel számolva $m_{max} = 6{,}87\\,\\mathrm{kg}$ (saját számolás). A módszer és a képlet ugyanaz, mint a tanáré.'
    },
    {
      id: 'gyf4',
      cim: 'Lámpa huzala: keresztmetszet és biztonság',
      forras: 'GYF Rugalmasság 4.',
      szoveg: 'Mekkora keresztmetszetű acélhuzal szükséges a 30 kg tömegű világítótest felfüggesztéséhez, ha a felfüggesztőhuzal hossza 1,8 m, és a biztonsági okból a megnyúlás nem lépheti túl a 0,2 mm-t? Hányszoros biztonságot jelent a megnyúlásnak megadott 0,2 mm-es maximális értéke, ha az acél szakítószilárdsága 400 N/mm²?',
      adatok: ['m = 30\\,\\mathrm{kg}', 'l_0 = 1{,}8\\,\\mathrm{m} = 1800\\,\\mathrm{mm}', '\\Delta l = 0{,}2\\,\\mathrm{mm}', 'E = 2\\cdot 10^{5}\\,\\mathrm{N/mm^2}', '\\sigma_{sz} = 400\\,\\mathrm{N/mm^2}', 'A = \\,?'],
      tipp: 'Az alapképletből most a keresztmetszet az ismeretlen. A biztonsághoz hasonlítsd össze a huzalban ébredő feszültséget a szakítószilárdsággal.',
      lepesek: [
        {
          cim: 'Melyik képlet kell?',
          szoveg: 'A megnyúlás adott, a keresztmetszet a kérdés. Az alapképletet $A$-ra rendezzük: $A$ és $\\Delta l$ helyet cserél.',
          tex: '\\Delta l = \\frac{1}{E}\\,\\frac{F}{A}\\,l_0 \\quad\\Rightarrow\\quad A = \\frac{F}{E}\\cdot\\frac{l_0}{\\Delta l}'
        },
        {
          cim: 'A húzóerő',
          szoveg: 'A huzalt a lámpa súlya húzza.',
          tex: 'F = m\\,g',
          be: 'F = 30\\cdot 10',
          er: 'F = 300\\,\\mathrm{N}'
        },
        {
          cim: 'A szükséges keresztmetszet',
          szoveg: 'Behelyettesítünk. $E$ N/mm²-ben van, ezért $A$ mm²-ben jön ki. A két hossz legyen egyformán mm-ben: 1800 mm és 0,2 mm.',
          tex: 'A = \\frac{F}{E}\\cdot\\frac{l_0}{\\Delta l}',
          be: 'A = \\frac{300}{2\\cdot 10^{5}}\\cdot\\frac{1800}{0{,}2}',
          er: 'A = 13{,}5\\,\\mathrm{mm^2}'
        },
        {
          cim: 'A huzalban ébredő feszültség',
          szoveg: 'A feszültség az erő és a keresztmetszet hányadosa. Ennyi terhelés jut 1 mm²-re.',
          tex: '\\sigma = \\frac{F}{A}',
          be: '\\sigma = \\frac{300}{13{,}5}',
          er: '\\sigma = 22{,}2\\,\\mathrm{N/mm^2}'
        },
        {
          cim: 'Hányszoros a biztonság?',
          szoveg: 'A huzal 400 N/mm²-nél szakadna el. Megnézzük, ez hányszorosa a tényleges feszültségnek.',
          tex: '\\text{biztonság} = \\frac{\\sigma_{sz}}{\\sigma}',
          be: '\\frac{\\sigma_{sz}}{\\sigma} = \\frac{400}{22{,}2}',
          er: '\\frac{\\sigma_{sz}}{\\sigma} = 18'
        }
      ],
      valasz: 'A = 13{,}5\\,\\mathrm{mm^2}, \\quad 18\\text{-szoros biztonság}',
      megj: 'A feladat nem adja meg az acél Young-modulusát. A tanár a szokásos $E = 2\\cdot 10^{5}\\,\\mathrm{N/mm^2}$ értékkel számol.'
    },
    {
      id: 'gyf5',
      cim: 'Young-modulus mérése',
      forras: 'GYF Rugalmasság 5.',
      szoveg: 'Kísérletben azt találjuk, hogy 1,57 m hosszú, 0,4 mm átmérőjű huzal 24 N húzóerő hatására 1,5 mm-rel nyúlik meg. Mennyi a rugalmassági modulus?',
      adatok: ['l_0 = 1{,}57\\,\\mathrm{m} = 1570\\,\\mathrm{mm}', 'd = 0{,}4\\,\\mathrm{mm}', 'F = 24\\,\\mathrm{N}', '\\Delta l = 1{,}5\\,\\mathrm{mm}', 'E = \\,?'],
      tipp: 'Az alapképletben most $E$ az ismeretlen. Rendezd rá, és számolj végig mm-ben.',
      lepesek: [
        {
          cim: 'Melyik képlet kell?',
          szoveg: 'Ismerjük az erőt, a méreteket és a megnyúlást. Az alapképletből így $E$ kifejezhető: $E$ és $\\Delta l$ helyet cserél.',
          tex: '\\Delta l = \\frac{1}{E}\\,\\frac{F}{A}\\,l_0 \\quad\\Rightarrow\\quad E = \\frac{F}{A}\\cdot\\frac{l_0}{\\Delta l}'
        },
        {
          cim: 'A keresztmetszet',
          szoveg: 'Az átmérő 0,4 mm, a sugár 0,2 mm. A területet mm²-ben számoljuk. A tanár két tizedesre kerekít.',
          tex: 'A = r^2\\pi',
          be: 'A = 0{,}2^2\\cdot\\pi',
          er: 'A = 0{,}13\\,\\mathrm{mm^2}',
          megj: 'Pontosabban $A = 0{,}1256\\,\\mathrm{mm^2}$. Ez a kerekítés a végeredményen is meglátszik.'
        },
        {
          cim: 'A rugalmassági modulus',
          szoveg: 'Behelyettesítünk. Mivel $A$ mm²-ben van, $E$ N/mm²-ben jön ki. A két hossz mm-ben: 1570 mm és 1,5 mm.',
          tex: 'E = \\frac{F}{A}\\cdot\\frac{l_0}{\\Delta l}',
          be: 'E = \\frac{24}{0{,}13}\\cdot\\frac{1570}{1{,}5}',
          er: 'E = 1{,}93\\cdot 10^{5}\\,\\mathrm{N/mm^2}'
        }
      ],
      valasz: 'E = 1{,}93\\cdot 10^{5}\\,\\mathrm{N/mm^2}',
      megj: 'A tanár a keresztmetszetet 0,13 mm²-re kerekítette, így kapott $1{,}93\\cdot 10^{5}$-t. Kerekítés nélkül ($A = 0{,}1256\\,\\mathrm{mm^2}$) $E = 2{,}0\\cdot 10^{5}\\,\\mathrm{N/mm^2}$ jön ki (saját számolás). Tanulság: a részeredményt ne kerekítsd túl korán.'
    },
    {
      id: 'gyf6',
      cim: 'Acéldrót mint rugó',
      forras: 'GYF Rugalmasság 6.',
      szoveg: '240 N/mm² húzófeszültségig a húzóerő arányos a megnyúlással. Számítsuk ki az arányossági tényező értékét 100 cm hosszú és 0,2 mm átmérőjű acéldrót esetében! Mekkora erőhatásig érvényes az arányos összefüggés?',
      adatok: ['\\sigma = 240\\,\\mathrm{N/mm^2}', 'l_0 = 100\\,\\mathrm{cm} = 1\\,\\mathrm{m}', 'd = 0{,}2\\,\\mathrm{mm}', 'E = 2\\cdot 10^{5}\\,\\mathrm{N/mm^2}', 'D = \\,?', 'F_{max} = \\,?'],
      tipp: 'Az arányossági tényező ugyanaz, mint a rugóállandó: $F = D\\,\\Delta l$. Rendezd az alapképletet erőre, és olvasd le, mi áll $\\Delta l$ előtt.',
      lepesek: [
        {
          cim: 'A drót úgy viselkedik, mint egy rugó',
          szoveg: 'Az alapképletet erőre rendezzük. Azt kapjuk, hogy az erő egy állandószor a megnyúlás. A rugónál ugyanez $F = D\\,\\Delta l$. A kettőt összehasonlítva megvan $D$.',
          tex: 'F = \\frac{E\\,A}{l_0}\\cdot\\Delta l \\quad\\text{és}\\quad F = D\\cdot\\Delta l \\quad\\Rightarrow\\quad D = \\frac{E\\,A}{l_0}'
        },
        {
          cim: 'A keresztmetszet',
          szoveg: 'Az átmérő 0,2 mm, a sugár 0,1 mm. A területet mm²-ben számoljuk.',
          tex: 'A = r^2\\pi',
          be: 'A = 0{,}1^2\\cdot\\pi',
          er: 'A = 3{,}14\\cdot 10^{-2}\\,\\mathrm{mm^2}'
        },
        {
          cim: 'Az arányossági tényező',
          szoveg: 'Az $E\\cdot A$ szorzat N-ban jön ki (N/mm² szorozva mm²-rel). A hosszt méterben írjuk be (1 m), így $D$ mértékegysége N/m lesz.',
          tex: 'D = \\frac{E\\,A}{l_0}',
          be: 'D = \\frac{2\\cdot 10^{5}\\cdot 3{,}14\\cdot 10^{-2}}{1}',
          er: 'D = 6280\\,\\mathrm{N/m}'
        },
        {
          cim: 'Meddig érvényes az arányosság?',
          szoveg: 'Az arányosság 240 N/mm² feszültségig igaz. A feszültség $\\sigma = \\frac{F}{A}$, ebből a legnagyobb erő a feszültség és a keresztmetszet szorzata.',
          tex: 'F_{max} = \\sigma\\cdot A',
          be: 'F_{max} = 240\\cdot 3{,}14\\cdot 10^{-2}',
          er: 'F_{max} = 7{,}5\\,\\mathrm{N}'
        }
      ],
      valasz: 'D = 6280\\,\\mathrm{N/m}, \\quad F_{max} = 7{,}5\\,\\mathrm{N}'
    },
    {
      id: 'gyf8',
      cim: 'Egymás mellett lógó acél- és rézdrót',
      forras: 'GYF Rugalmasság 8.',
      szoveg: 'Egy 12 kg tömegű testet 0,5 mm² keresztmetszetű, 1,5 m hosszúságú, egymás mellett lógó acél és rézdrótra függesztünk. Mennyi a megnyúlás?',
      adatok: ['m = 12\\,\\mathrm{kg}', 'A = 0{,}5\\,\\mathrm{mm^2}', 'l_0 = 1{,}5\\,\\mathrm{m} = 1500\\,\\mathrm{mm}', 'E_{Fe} = 2\\cdot 10^{5}\\,\\mathrm{N/mm^2}', 'E_{Cu} = 1{,}2\\cdot 10^{5}\\,\\mathrm{N/mm^2}', '\\Delta l = \\,?'],
      tipp: 'A két drót egymás mellett lóg, tehát egyformán nyúlnak meg. A súlyt viszont megosztva tartják. Ezt a két dolgot írd fel egyenlettel.',
      lepesek: [
        {
          cim: 'Mi közös, mi adódik össze?',
          szoveg: 'Ez párhuzamos kötés. A két drót egyforma hosszú és ugyanahhoz a testhez van kötve, ezért a megnyúlásuk egyenlő. A test súlyát ketten együtt tartják, ezért a két erő összege $mg$.',
          tex: '\\Delta l_{Fe} = \\Delta l_{Cu} = \\Delta l \\qquad F_{Fe} + F_{Cu} = m\\,g'
        },
        {
          cim: 'A két erő a megnyúlással',
          szoveg: 'Az alapképletet erőre rendezzük, és felírjuk mindkét drótra. A megnyúlás, a hossz és a keresztmetszet közös, csak $E$ más.',
          tex: 'F_{Fe} = \\frac{\\Delta l}{l_0}\\,E_{Fe}\\,A \\qquad F_{Cu} = \\frac{\\Delta l}{l_0}\\,E_{Cu}\\,A'
        },
        {
          cim: 'Összeadás és rendezés',
          szoveg: 'A két erőt összeadjuk, az összeg $mg$. A közös tagokat kiemeljük, majd kifejezzük $\\Delta l$-t. A két Young-modulus összeadódik.',
          tex: '\\frac{\\Delta l}{l_0}\\left(E_{Fe}+E_{Cu}\\right)A = m\\,g \\quad\\Rightarrow\\quad \\Delta l = \\frac{1}{E_{Fe}+E_{Cu}}\\cdot\\frac{m\\,g}{A}\\cdot l_0'
        },
        {
          cim: 'Behelyettesítés',
          szoveg: 'A súly $mg = 12\\cdot 10 = 120$ N. $E$ N/mm²-ben, $A$ mm²-ben van. A hosszt mm-ben írjuk be (1500 mm), így a megnyúlás is mm-ben jön ki.',
          tex: '\\Delta l = \\frac{1}{E_{Fe}+E_{Cu}}\\cdot\\frac{m\\,g}{A}\\cdot l_0',
          be: '\\Delta l = \\frac{1}{3{,}2\\cdot 10^{5}}\\cdot\\frac{120}{0{,}5}\\cdot 1500',
          er: '\\Delta l = 1{,}125\\,\\mathrm{mm}'
        }
      ],
      valasz: '\\Delta l = 1{,}125\\,\\mathrm{mm}',
      megj: 'A soros párja (a két drót egymás végén) a gyakorlók között van: GYF 7. Ott az erő közös, és a megnyúlások adódnak össze.'
    },
    {
      id: 'gyf12',
      cim: 'Saját súlya alatt megnyúló huzal',
      forras: 'GYF Rugalmasság 11–12.',
      szoveg: 'Mennyivel nyúlik meg csupán a részecskéire ható nehézségi erő következtében az M tömegű, l hosszúságú, felső végén rögzített, függőlegesen lefelé lógó huzal?',
      adatok: ['G = M\\,g', 'l_0 = l', 'E,\\ A \\ \\text{(a huzal Young-modulusa és keresztmetszete)}', '\\Delta l = \\,?'],
      tipp: 'A tanár trükkje: képzeld a huzal súlyát $n$ egyforma kis súlynak, amelyek egyenlő közökben lógnak a dróton (ez a 11. feladat). Aztán legyen $n$ nagyon nagy.',
      lepesek: [
        {
          cim: 'Az ötlet: n darab kis súly',
          szoveg: 'A huzal súlya nem a végén hat, hanem el van osztva a hossza mentén. Ezért a huzalt $n$ egyenlő, $\\frac{l_0}{n}$ hosszú szakaszra bontjuk, és minden szakasz végére $\\frac{G}{n}$ súlyt képzelünk. Minden szakaszra az alapképletet használjuk.',
          tex: '\\Delta l = \\frac{1}{E}\\,\\frac{F}{A}\\,l_0 \\quad\\text{szakaszonként:}\\quad l_0 \\to \\frac{l_0}{n},\\quad F \\to k\\cdot\\frac{G}{n}'
        },
        {
          cim: 'Melyik szakaszt mennyi súly húzza?',
          szoveg: 'Egy szakaszt az összes alatta lógó súly húzza. A legalsót 1 darab, a fölötte lévőt 2 darab, a legfelsőt mind az $n$ darab $\\frac{G}{n}$ súly. Ezeket a megnyúlásokat összeadjuk.',
          tex: '\\Delta l = \\frac{1}{E\\,A}\\cdot\\frac{l_0}{n}\\cdot\\frac{G}{n}\\cdot\\left(1+2+3+\\dots+n\\right)'
        },
        {
          cim: 'Az összeg kiszámítása',
          szoveg: 'Az első $n$ egész szám összege $\\frac{n(n+1)}{2}$. Ezt beírjuk, és egy $n$-nel egyszerűsítünk.',
          tex: '\\Delta l = \\left(\\frac{1}{E}\\,\\frac{G}{A}\\,l_0\\right)\\cdot\\frac{n(n+1)}{2n^2} = \\frac{1}{2}\\left(\\frac{1}{E}\\,\\frac{G}{A}\\,l_0\\right)\\cdot\\frac{n+1}{n}',
          megj: 'Ez a GYF 11. feladat eredménye ($n$ darab súly). Próba: $n=1$-re visszaadja az alapképletet, $n=2$-re a $\\frac{3}{4}$-es szorzót (GYF 10.).'
        },
        {
          cim: 'Végtelen sok kis darab',
          szoveg: 'A valódi huzalban a súly folytonosan oszlik el. Ez annak felel meg, hogy $n$ minden határon túl nő. Ekkor $\\frac{n+1}{n}$ értéke 1-hez tart.',
          tex: 'n \\to \\infty: \\quad \\frac{n+1}{n} \\to 1 \\quad\\Rightarrow\\quad \\Delta l = \\frac{1}{2}\\left(\\frac{1}{E}\\,\\frac{G}{A}\\,l_0\\right)'
        },
        {
          cim: 'A feladat betűivel',
          szoveg: 'Beírjuk, hogy a súly $G = Mg$, a hossz pedig $l$. A megnyúlás éppen a fele annak, mintha a teljes súly a huzal végén lógna.',
          tex: '\\Delta l = \\frac{1}{2}\\cdot\\frac{1}{E}\\cdot\\frac{M\\,g}{A}\\cdot l'
        }
      ],
      valasz: '\\Delta l = \\frac{1}{2}\\cdot\\frac{1}{E}\\cdot\\frac{M\\,g}{A}\\cdot l',
      megj: 'A feladat nem ad meg számokat, az eredmény képlet. A tanár a 11. és a 12. feladatot egyben oldja meg: a 12. a 11. határesete ($n \\to \\infty$).'
    },
    {
      id: 'gyf14',
      cim: 'Daru kábele: mekkora gyorsulással indítható a teher?',
      forras: 'GYF Rugalmasság 14.',
      szoveg: 'Emelődaru acélkábelén függő 1 tonna tömegű terhet emel. Mekkora gyorsulással indítható a teher, ha a kábel szakadása ellen 8-szoros biztonságot kell tartani? (A kábel átmérője 18 mm és a szakítási szilárdság 400 N/mm².)',
      adatok: ['m = 1\\,\\mathrm{t} = 1000\\,\\mathrm{kg}', 'd = 18\\,\\mathrm{mm}', '\\sigma_{sz} = 400\\,\\mathrm{N/mm^2}', '\\text{biztonság: } 8\\text{-szoros}', 'g = 10\\,\\mathrm{m/s^2}', 'a = \\,?'],
      tipp: 'Két rész: (1) rugalmasságtanból mekkora erőt bír a kábel 8-szoros biztonsággal, (2) dinamikából ekkora kötélerő mekkora gyorsulást ad a tehernek.',
      lepesek: [
        {
          cim: 'A megengedett feszültség',
          szoveg: 'A 8-szoros biztonság azt jelenti, hogy a kábelben a szakítószilárdságnak csak a nyolcada léphet fel. Ebből kapjuk majd a legnagyobb kötélerőt: $F_{max} = \\sigma_{max}\\cdot A$.',
          tex: '\\sigma_{max} = \\frac{\\sigma_{sz}}{8}',
          be: '\\sigma_{max} = \\frac{400}{8}',
          er: '\\sigma_{max} = 50\\,\\mathrm{N/mm^2}'
        },
        {
          cim: 'A kábel keresztmetszete',
          szoveg: 'Az átmérő 18 mm, a sugár 9 mm. A területet mm²-ben számoljuk, mert a feszültség N/mm²-ben van.',
          tex: 'A = r^2\\pi',
          be: 'A = 9^2\\cdot\\pi = 81\\cdot\\pi',
          er: 'A = 254\\,\\mathrm{mm^2}'
        },
        {
          cim: 'A legnagyobb kötélerő',
          szoveg: 'A megengedett feszültséget megszorozzuk a keresztmetszettel. N/mm² szorozva mm²-rel: az eredmény N.',
          tex: 'F_{max} = \\sigma_{max}\\cdot A',
          be: 'F_{max} = 50\\cdot 254',
          er: 'F_{max} = 12\\,700\\,\\mathrm{N}'
        },
        {
          cim: 'Newton II. törvénye a teherre',
          szoveg: 'A teherre felfelé a kötélerő, lefelé a súlya hat. A kettő különbsége gyorsítja felfelé. Osztunk $m$-mel, és behelyettesítünk (itt már minden SI-ben van).',
          tex: 'm\\,a = F_{max} - m\\,g \\quad\\Rightarrow\\quad a = \\frac{F_{max}}{m} - g',
          be: 'a = \\frac{12\\,700}{1000} - 10',
          er: 'a = 2{,}7\\,\\mathrm{m/s^2}'
        }
      ],
      valasz: 'a = 2{,}7\\,\\mathrm{m/s^2}'
    },
    {
      id: 'gyf15',
      cim: 'Körbe forgatott test huzalának megnyúlása',
      forras: 'GYF Rugalmasság 15.',
      szoveg: '$l_0 = 0{,}5$ m hosszúságú acélhuzal végére kötött $m = 0{,}4$ kg tömegű, pontszerűnek tekinthető testet forgatunk körbe, $f = 10$ 1/s fordulatszámmal. Mennyi a huzal megnyúlása, ha átmérője $d = 1$ mm?',
      adatok: ['l_0 = 0{,}5\\,\\mathrm{m}', 'm = 0{,}4\\,\\mathrm{kg}', 'f = 10\\,\\mathrm{Hz}', 'd = 1\\,\\mathrm{mm}', 'E = 2\\cdot 10^{5}\\,\\mathrm{N/mm^2}', '\\Delta l = \\,?'],
      tipp: 'A huzalt a centripetális erő feszíti. Vigyázz: a körpálya sugara a már megnyúlt huzal hossza, ezért $\\Delta l$ az egyenlet mindkét oldalán megjelenik.',
      lepesek: [
        {
          cim: 'Mi húzza a huzalt?',
          szoveg: 'A test körmozgást végez, ehhez centripetális erő kell. Ezt a huzal fejti ki, tehát a huzalt ekkora erő feszíti. A kör sugara a megnyúlt huzal hossza. A nehézségi erővel a tanár itt nem számol.',
          tex: 'F_{cp} = m\\,\\omega^2 R, \\qquad R = l_0 + \\Delta l'
        },
        {
          cim: 'Beírás az alapképletbe',
          szoveg: 'Az alapképletben az erő helyére a centripetális erőt írjuk. Így $\\Delta l$ a bal és a jobb oldalon is szerepel.',
          tex: '\\Delta l = \\frac{1}{E}\\,\\frac{F_{cp}}{A}\\,l_0 = \\frac{l_0}{E\\,A}\\cdot m\\,\\omega^2\\left(l_0+\\Delta l\\right)'
        },
        {
          cim: 'Rövidítés: az α szám',
          szoveg: 'A sok betűt egy $\\alpha$ számba fogjuk össze, ahol $\\omega = 2\\pi f$. A számláló SI-ben N-ban jön ki. A nevező $E\\cdot A$: N/mm² szorozva mm²-rel ($A = \\frac{d^2\\pi}{4} = 0{,}785\\,\\mathrm{mm^2}$), ez is N. Így $\\alpha$-nak nincs mértékegysége.',
          tex: '\\alpha = \\frac{l_0\\,m\\,\\omega^2}{E\\,A} = \\frac{l_0\\,m\\,(2\\pi f)^2}{E\\cdot\\frac{d^2\\pi}{4}}',
          be: '\\alpha = \\frac{0{,}5\\cdot 0{,}4\\cdot(2\\cdot 3{,}14\\cdot 10)^2}{2\\cdot 10^{5}\\cdot 0{,}785} = \\frac{788{,}8}{157\\,000}',
          er: '\\alpha = 5{,}024\\cdot 10^{-3}'
        },
        {
          cim: 'Az egyenlet megoldása',
          szoveg: 'Az $\\alpha$-val az egyenlet rövid. A $\\Delta l$-es tagokat egy oldalra visszük, kiemelünk, és osztunk. A hosszt mm-ben írjuk be (500 mm), így a megnyúlás is mm.',
          tex: '\\Delta l = \\alpha\\,l_0 + \\alpha\\,\\Delta l \\quad\\Rightarrow\\quad \\Delta l\\,(1-\\alpha) = \\alpha\\,l_0 \\quad\\Rightarrow\\quad \\Delta l = \\frac{\\alpha}{1-\\alpha}\\cdot l_0',
          be: '\\Delta l = \\frac{5{,}024\\cdot 10^{-3}}{1-5{,}024\\cdot 10^{-3}}\\cdot 500',
          er: '\\Delta l = 2{,}52\\,\\mathrm{mm}'
        }
      ],
      valasz: '\\Delta l = 2{,}52\\,\\mathrm{mm}',
      megj: 'Ez a feladat a próba-ZH 3. elméleti kérdésének (forgatott acélrúd megnyúlik) számolós párja.'
    },
    {
      id: 'gyf17',
      cim: 'Lemezrugó végén rezgő test rezgésideje',
      forras: 'GYF Rugalmasság 17.',
      szoveg: 'Acéllemezrugó egyik végét satuba szorítjuk, másik végéhez egy 0,4 kg tömegű testet erősítünk. A test tömegéhez képest a lemez tömege elhanyagolható. A lemezrugó végét – a testtel együtt – oldalt kissé kitérítve magára hagyjuk. Határozzuk meg a kis kitérések esetén létrejövő harmonikus rezgőmozgás rezgésidejét! A lemez hossza 10 cm, szélessége 1 cm, vastagsága 0,5 mm.',
      adatok: ['m = 0{,}4\\,\\mathrm{kg}', 'l = 10\\,\\mathrm{cm} = 0{,}1\\,\\mathrm{m}', 'a = 1\\,\\mathrm{cm} = 0{,}01\\,\\mathrm{m}', 'b = 0{,}5\\,\\mathrm{mm}', 'E = 2\\cdot 10^{5}\\,\\mathrm{N/mm^2} = 2\\cdot 10^{11}\\,\\mathrm{N/m^2}', 'T = \\,?'],
      tipp: 'A lehajlás képletéből fejezd ki az erőt. Ha az erő arányos a kitéréssel, az harmonikus rezgés, és a szorzóból kiolvasható $\\omega$.',
      lepesek: [
        {
          cim: 'A lehajlás képlete',
          szoveg: 'Az egyik végén befogott, a másik végén $F$ erővel terhelt lemez lehajlására ezt a képletet használjuk. Itt $l$ a hossz, $a$ a szélesség, $b$ a vastagság. Ebből fejezzük ki az erőt.',
          tex: 's = \\frac{4}{E}\\cdot\\frac{l^3}{a\\,b^3}\\cdot F \\quad\\Rightarrow\\quad F = \\frac{E}{4}\\cdot\\frac{a\\,b^3}{l^3}\\cdot s'
        },
        {
          cim: 'A mozgásegyenlet',
          szoveg: 'A kitérített lemez ekkora erővel húzza vissza a testet, ezért van a mínusz jel. Newton II. törvényét írjuk fel, a gyorsulás a kitérés második deriváltja. (A képletben az $a$ betű a szélesség, nem a gyorsulás!)',
          tex: 'm\\cdot\\frac{d^2 s}{dt^2} = -\\frac{E}{4}\\cdot\\frac{a\\,b^3}{l^3}\\cdot s \\quad\\Rightarrow\\quad \\frac{d^2 s}{dt^2} = -\\frac{E}{4}\\cdot\\frac{a\\,b^3}{l^3\\,m}\\cdot s'
        },
        {
          cim: 'A körfrekvencia kiolvasása',
          szoveg: 'A harmonikus rezgés egyenlete $\\frac{d^2 x}{dt^2} = -\\omega^2 x$. A két egyenlet ugyanolyan alakú, tehát a kitérés előtti szorzó éppen $\\omega^2$.',
          tex: '\\omega = \\sqrt{\\frac{E}{4}\\cdot\\frac{a\\,b^3}{l^3\\,m}}'
        },
        {
          cim: 'Behelyettesítés SI-ben',
          szoveg: 'Itt mindent SI-ben írunk be: $E = 2\\cdot 10^{11}$ N/m², $a = 0{,}01$ m. A $\\frac{b}{l}$ hányadost a tanár mm-ben írja: 0,5 mm és 100 mm (az arány így is jó, mert azonos egység).',
          tex: '\\omega = \\sqrt{\\frac{E}{4}\\cdot\\frac{a}{m}\\cdot\\left(\\frac{b}{l}\\right)^3}',
          be: '\\omega = \\sqrt{\\frac{2\\cdot 10^{11}}{4}\\cdot\\frac{0{,}01}{0{,}4}\\cdot\\left(\\frac{0{,}5}{100}\\right)^3} = \\sqrt{156{,}25}',
          er: '\\omega = 12{,}5\\,\\mathrm{\\frac{1}{s}}'
        },
        {
          cim: 'A rezgésidő',
          szoveg: 'A rezgésidő és a körfrekvencia kapcsolata: $T = \\frac{2\\pi}{\\omega}$.',
          tex: 'T = \\frac{2\\pi}{\\omega}',
          be: 'T = \\frac{2\\cdot 3{,}14}{12{,}5}',
          er: 'T = 0{,}50\\,\\mathrm{s}'
        }
      ],
      valasz: 'T = 0{,}50\\,\\mathrm{s}'
    },
    {
      id: 'gyf18',
      cim: 'Motortengely elcsavarodása a teljesítményből',
      forras: 'GYF Rugalmasság 18.',
      szoveg: 'Mennyivel csavarodik el a 8 cm hosszú, 2 cm átmérőjű motortengely, amely $30\\,\\mathrm{s^{-1}}$ fordulatszám mellett 40 LE teljesítményt visz át? 1 LE = 735,5 W. Az anyag nyírási vagy torziómodulusa G = 80 000 N/mm².',
      adatok: ['l = 8\\,\\mathrm{cm} = 0{,}08\\,\\mathrm{m}', 'd = 2\\,\\mathrm{cm} \\;\\Rightarrow\\; R = 0{,}01\\,\\mathrm{m}', 'f = 30\\,\\mathrm{\\frac{1}{s}}', 'P = 40\\,\\mathrm{LE}', 'G = 80\\,000\\,\\mathrm{N/mm^2} = 8\\cdot 10^{10}\\,\\mathrm{N/m^2}', '\\varphi = \\,?'],
      tipp: 'Az elcsavarodás képletéhez forgatónyomaték kell. Azt a teljesítményből és a szögsebességből kapod meg: $P = M\\,\\omega$.',
      lepesek: [
        {
          cim: 'Teljesítmény forgó mozgásnál',
          szoveg: 'Haladó mozgásnál $W = F\\cdot s$, ebből $P = F\\cdot v$. Forgó mozgásnál az erő helyére a forgatónyomaték, a sebesség helyére a szögsebesség kerül. Ebből számoljuk ki a tengelyt csavaró forgatónyomatékot.',
          tex: 'P = F\\cdot v \\;\\;\\to\\;\\; P = M\\cdot\\omega \\quad\\Rightarrow\\quad M = \\frac{P}{\\omega}'
        },
        {
          cim: 'A teljesítmény wattban',
          szoveg: 'A lóerőt wattra váltjuk, mert SI-ben számolunk.',
          be: 'P = 40\\cdot 735{,}5',
          er: 'P = 29\\,420\\,\\mathrm{W}'
        },
        {
          cim: 'A szögsebesség',
          szoveg: 'A fordulatszámból szögsebességet számolunk.',
          tex: '\\omega = 2\\pi\\cdot f',
          be: '\\omega = 2\\cdot 3{,}14\\cdot 30',
          er: '\\omega = 188{,}4\\,\\mathrm{\\frac{1}{s}}'
        },
        {
          cim: 'A forgatónyomaték',
          szoveg: 'A teljesítményt elosztjuk a szögsebességgel.',
          tex: 'M = \\frac{P}{\\omega}',
          be: 'M = \\frac{29\\,420}{188{,}4}',
          er: 'M = 156{,}2\\,\\mathrm{N\\,m}',
          megj: 'A tanár lapján az $M$ mellett nincs mértékegység. A forgatónyomaték mértékegysége N·m.'
        },
        {
          cim: 'Az elcsavarodás szöge',
          szoveg: 'Most jön a csavarás képlete. Mindent SI-ben írunk be: $G = 8\\cdot 10^{10}$ N/m², $l = 0{,}08$ m. $R$ a sugár, tehát az átmérő fele: 0,01 m, és $R^4 = 10^{-8}\\,\\mathrm{m^4}$. Az eredmény radián.',
          tex: '\\varphi = \\frac{2}{\\pi\\cdot G}\\cdot\\frac{l}{R^4}\\cdot M',
          be: '\\varphi = \\frac{2}{\\pi\\cdot 8\\cdot 10^{10}}\\cdot\\frac{0{,}08}{10^{-8}}\\cdot 156{,}2',
          er: '\\varphi = 9{,}95\\cdot 10^{-3}\\,\\mathrm{rad}'
        },
        {
          cim: 'Átváltás fokba',
          szoveg: 'A radiánt fokba váltjuk: szorzunk $\\frac{180^\\circ}{\\pi}$-vel.',
          tex: '\\varphi^\\circ = \\varphi\\cdot\\frac{180^\\circ}{\\pi}',
          be: '\\varphi^\\circ = 9{,}95\\cdot 10^{-3}\\cdot\\frac{180^\\circ}{3{,}14}',
          er: '\\varphi = 0{,}57^\\circ'
        }
      ],
      valasz: '\\varphi = 9{,}95\\cdot 10^{-3}\\,\\mathrm{rad} = 0{,}57^\\circ'
    }
  ],

  gyakorlo: [
    {
      id: 'gy1',
      forras: 'GYF Rugalmasság 2.',
      szoveg: 'Mekkora erő nyújtja meg a 14,13 m hosszú, 3 mm átmérőjű acéldrótot 8 mm-rel? (E = 200000 N/mm²)',
      valasz: 'F = 800\\,\\mathrm{N}',
      tipp: 'Alapképlet erőre rendezve: $F = \\frac{\\Delta l}{l_0}EA$. $A = \\frac{d^2}{4}\\pi = 7{,}065\\,\\mathrm{mm^2}$, a hossz mm-ben: 14 130 mm.'
    },
    {
      id: 'gy2',
      forras: 'GYF Rugalmasság 3.',
      szoveg: 'Milyen hosszú rézdrótot nyújt meg a rá függesztett 94,2 N súlyú test 0,2 cm-rel? (E = 120000 N/mm², a drót átmérője 2 mm.)',
      valasz: 'l_0 = 8000\\,\\mathrm{mm} = 8\\,\\mathrm{m}',
      tipp: 'Alapképlet hosszra rendezve: $l_0 = \\Delta l\\,\\frac{EA}{F}$. $\\Delta l = 2$ mm, $A = 3{,}14\\,\\mathrm{mm^2}$; a hossz mm-ben jön ki.'
    },
    {
      id: 'gy3',
      forras: 'GYF Rugalmasság 7.',
      szoveg: 'Egy 1,57 m hosszú, 1 mm átmérőjű acéldrót végéhez erősített ugyanilyen hosszú és átmérőjű rézdrót végére 7,5 kg tömegű testet függesztünk. Mennyi a teljes megnyúlás?',
      valasz: '\\Delta l = 2\\,\\mathrm{mm}',
      tipp: 'Soros kötés: mindkét drótot $mg = 75$ N húzza, a megnyúlások összeadódnak: $\\Delta l = \\left(\\frac{1}{E_{Ac}}+\\frac{1}{E_{\\text{Ré}}}\\right)\\frac{mg}{A}\\,l_0$, ahol $A = 0{,}785\\,\\mathrm{mm^2}$, $l_0 = 1570$ mm.'
    },
    {
      id: 'gy4',
      forras: 'GYF Rugalmasság 9.',
      szoveg: 'Felső végénél rögzített $l_0$ hosszúságú acéldrót végére $G$ súlyú testet függesztünk. Mennyivel nyúlik meg a drót?',
      valasz: '\\Delta l = \\frac{1}{E}\\cdot\\frac{G}{A}\\cdot l_0',
      tipp: 'Ez maga az alapképlet, az erő a súly: $F = G$. $A$ a drót keresztmetszete, $E$ a Young-modulusa.'
    },
    {
      id: 'gy5',
      forras: 'GYF Rugalmasság 10.',
      szoveg: 'Egy $l_0$ hosszúságú, felső végénél rögzített drót közepéhez és végéhez egyenlő, $G_1$ súlyú testeket rögzítünk. Mennyivel nyúlik meg a drót alsó és felső fele? Mekkora a drót teljes megnyúlása? Hasonlítsuk össze a teljes megnyúlást az előző feladatban kapott eredménnyel, ha $2G_1 = G$!',
      valasz: '\\Delta l_{\\text{felső}} = \\frac{1}{E\\,A}\\cdot G\\cdot\\frac{l_0}{2}, \\quad \\Delta l_{\\text{alsó}} = \\frac{1}{E\\,A}\\cdot\\frac{G}{2}\\cdot\\frac{l_0}{2}, \\quad \\Delta l = \\frac{3}{4}\\left(\\frac{1}{E}\\,\\frac{G}{A}\\,l_0\\right)',
      tipp: 'Bontsd a drótot két $\\frac{l_0}{2}$ hosszú félre. A felső felet mindkét súly húzza ($2\\cdot\\frac{G}{2}$), az alsót csak az egyik ($\\frac{G}{2}$). A két megnyúlást add össze: az előző feladat eredményének $\\frac{3}{4}$-e.'
    },
    {
      id: 'gy6',
      forras: 'GYF Rugalmasság 11.',
      szoveg: 'Egy $l$ hosszúságú, felső végén rögzített drótra egyenlő közökben $n$ darab egyenlő súlyú ($nG_n = G$) testet erősítünk. Mekkora a drót teljes megnyúlása?',
      valasz: '\\Delta l = \\frac{1}{2}\\left(\\frac{1}{E}\\,\\frac{G}{A}\\,l\\right)\\cdot\\frac{n+1}{n}',
      tipp: 'Bontsd $n$ darab $\\frac{l}{n}$ hosszú szakaszra. Alulról a $k$-adik szakaszt $k$ darab $\\frac{G}{n}$ súly húzza. Összeg: $1+2+\\dots+n = \\frac{n(n+1)}{2}$. A levezetés a kidolgozott GYF 11–12. feladatban van.'
    }
  ]
}]);
