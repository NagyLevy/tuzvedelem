/* Roadmap — Lendület és energia. Forrás: PróbaZH, GYF feladatsor, tanári megoldások. */
window.FIZ_ROADMAP = (window.FIZ_ROADMAP || []).concat([{
  id: 'lendulet',
  nev: 'Lendület és energia',
  leckek: ['3a', '3b'],
  perc: 90,
  lenyeg: 'Két eszközöd van. Ha az ütközés <b>ideje</b> adott, lendülettel számolj: $F_{\\text{átl}} = \\frac{\\Delta p}{\\Delta t}$. Ha <b>út vagy magasság</b> adott, munkával és energiával (munkatétel, energiamegmaradás). A próba-ZH-ban 5 pont elmélet és 5 pont számolás volt, ezért a definíciókat is pontosan tudni kell.',

  elmelet: [
    {
      k: 'Mit mond ki a lendület megmaradás tétele?',
      v: 'Ha a testre ható erők eredője nulla, a test lendülete nem változik.',
      forras: 'PróbaZH 1. kérdés · 1 pont',
      trukk: 'Egy mondat, két fele van: feltétel (az erők <b>eredője nulla</b>) és következmény (a <b>lendület nem változik</b>). A feltételt ne hagyd ki.'
    },
    {
      k: 'Mikor mondjuk, hogy egy erő centrális? Mondjon példát centrális erőre!',
      v: 'Egy tömegpontra ható erőt akkor nevezünk centrálisnak, ha a testre ható erőnek és a test helyvektorának egyenese mindig párhuzamos. A gravitációs erő centrális erő.',
      forras: 'PróbaZH 2. kérdés · 1 pont',
      trukk: 'Kulcsszavak: <b>erő egyenese</b>, <b>helyvektor egyenese</b>, <b>mindig párhuzamos</b>. A kérdés példát is kér: a gravitációs erőt írd oda, különben hiányos a válasz.'
    },
    {
      k: 'Hogyan tudjuk kiszámítani egy változó erő munkáját? Nem képletet kérek, hanem a képlet értelmezését!',
      v: 'A test által megtett utat, amely során a változó erő munkáját szeretnénk kiszámítani, olyan kicsi elemi szakaszokra osztjuk, amelyen belül az erő nem változik meg lényegesen. Ezen szakaszokon belül állandónak tekintjük az erő nagyságát, és kiszámítjuk az elemi munkavégzését: $\\Delta W = F \\cdot \\Delta s$. Végül az elemi munkavégzéseket összeadjuk.',
      forras: 'PróbaZH 3. kérdés · 1 pont',
      trukk: 'Három lépés, ebben a sorrendben: <b>felosztod</b> az utat kicsi szakaszokra → szakaszonként <b>állandó erővel</b> számolsz ($\\Delta W = F \\cdot \\Delta s$) → <b>összeadod</b>. Szöveggel magyarázz, mert a tanár nem képletet kér.'
    },
    {
      k: 'Mikor mondjuk egy erőtérre, hogy potenciálos?',
      v: 'Ha egy erőtér potenciálos, akkor található hozzá egy olyan $V(r)$ potenciálfüggvény, mely esetén tetszőleges pályán történő mozgásra teljesül, hogy az erő által végzett munka $W = V(r_A) - V(r_B)$.',
      forras: 'PróbaZH 4. kérdés · 1 pont',
      trukk: 'Három kulcsszó: <b>potenciálfüggvény</b>, <b>tetszőleges pálya</b>, a munka a <b>két végpont</b> potenciáljának különbsége. A képletet pontosan így írd le: $W = V(r_A) - V(r_B)$.'
    },
    {
      k: 'Miért konzervatív egy potenciálos erőtér?',
      v: 'Azért, mert potenciálos erőtérben mozgó test mechanikai energiája megmarad (konzerválódik).',
      forras: 'PróbaZH 5. kérdés · 1 pont',
      trukk: 'A szó maga segít: konzervatív = konzervál, vagyis megőriz. Amit megőriz: a <b>mechanikai energiát</b>.'
    },
    {
      k: 'Egy épület tetejéről függőlegesen fölfelé, majd vízszintesen hajítunk el egy-egy azonos méretű és kezdősebességű vasgolyót. A földet érő golyó sebessége azonos lesz. Adja meg a fizikai magyarázatot!',
      v: 'A függőlegesen fölfelé, majd vízszintesen elhajított testet ugyanabból a magasságból és egyforma sebességgel hajítottuk el, ezért ugyanakkora a helyzeti és mozgási energiája az elhajítás pillanatában. Következésképpen egyforma lesz az összes mechanikai energiája is. A mechanikai energia megmaradásának tétele értelmében egyforma lesz a mechanikai energiájuk a földet éréskor is. Ha a mechanikai energiájuk azonos, akkor azonos kell legyen a sebességük is.',
      forras: 'MINTA vizsga 3. kérdés · 1 pont',
      trukk: 'Láncban gondolkodj: azonos magasság és azonos kezdősebesség → azonos mechanikai energia induláskor → <b>energiamegmaradás</b> → azonos energia földet éréskor → azonos sebesség. A kulcsszó a mechanikai energia megmaradása.'
    }
  ],

  receptek: [
    {
      cim: 'Ütközés a talajjal: átlagos erő',
      mikor: 'Egy test leesik $h$ magasságból, és meg van adva, mennyi ideig tart az ütközés ($\\Delta t$). Az átlagos erőt (vagy az erőlökést) kérdezik.',
      lepesek: [
        'Becsapódási sebesség a szabadesésből: $v = \\sqrt{2gh}$.',
        'Lendület az ütközés előtt: $p_k = m v$. Válassz pozitív irányt, és figyelj az előjelre.',
        'Lendület az ütközés után: ha a test nem pattan vissza, $p_v = 0$. Ha visszapattan, a sebessége ellentétes irányú.',
        'Átlagos erő: a lendületváltozást ($p_v - p_k$) oszd el az ütközés idejével.'
      ],
      tex: 'F_{\\text{átl}} = \\frac{\\Delta p}{\\Delta t} = \\frac{p_v - p_k}{\\Delta t}'
    },
    {
      cim: 'Állandó erő munkája: erő · út · cos',
      mikor: 'Adott egy erő (vagy ki tudod számolni), az út, és az erő szöge a mozgás irányához képest.',
      lepesek: [
        'Válts át: az út méterben legyen (4 cm = 0,04 m).',
        'Ha az erő nincs megadva, de a sebesség állandó: az erők kiegyenlítik egymást. Vízszintesen $F \\cos\\alpha = F_s$, függőlegesen $N + F \\sin\\alpha = mg$, és $F_s = \\mu N$.',
        'Számold ki a munkát: csak az erő mozgásirányú része ($F \\cos\\alpha$) végez munkát.'
      ],
      tex: 'W = F \\cdot s \\cdot \\cos\\alpha'
    },
    {
      cim: 'Emelés, lejtőre feltolás',
      mikor: 'Egy testet lassan felemelünk, vagy súrlódás nélkül feltolunk egy $h$ magas lejtőre. A végzett munkát kérdezik.',
      lepesek: [
        'A végzett munka a helyzeti energia növekedésével egyenlő.',
        'Csak a $h$ magasság kell hozzá (méterben).',
        'Helyettesíts be: $g = 10\\,\\mathrm{m/s^2}$.'
      ],
      tex: 'W = E_h = m g h'
    },
    {
      cim: 'Munkatétel: fékezés, gyorsítás',
      mikor: 'Adott a kezdő- és a végsebesség, és az út vagy az erő. Tipikus: fékút, fékezőerő, lövedék a csőben vagy a fában. Idő nem szerepel.',
      lepesek: [
        'Írd fel: az erő munkája = a mozgási energia megváltozása.',
        'Fékezésnél az erő a mozgással ellentétes, a munkája negatív: $-F \\cdot s$.',
        'Ha a test megáll: $v = 0$. Ha állásból indul: $v_0 = 0$.',
        'Rendezd a keresett mennyiségre ($s$ vagy $F$). Ha a fékezőerő súrlódás: $F_s = \\mu m g$, és a tömeg kiesik.'
      ],
      tex: 'W = \\frac{1}{2} m v^2 - \\frac{1}{2} m v_0^2'
    },
    {
      cim: 'Mechanikai energia megmaradása',
      mikor: 'Nincs súrlódás. A test esik, eldobják vagy ingaként leng, és a sebességét kérdezik egy másik magasságban.',
      lepesek: [
        'Válassz nullszintet: legyen a legalsó pont.',
        'Írd fel az energiát fent és lent: helyzeti ($mgh$) + mozgási ($\\frac{1}{2} m v^2$).',
        'Tedd egyenlővé a kettőt. A tömeg minden tagban ott van, kiesik.',
        'Ingánál a magasságkülönbség: $h = l(1 - \\cos\\varphi)$.'
      ],
      tex: 'm g h + \\frac{1}{2} m v_1^2 = \\frac{1}{2} m v_2^2'
    },
    {
      cim: 'Rugó megnyújtásának munkája',
      mikor: 'Rugó, amelyet egy ráakasztott test adott hosszal nyújt meg. Azt kérdezik, mennyi munka kell a megnyújtásához.',
      lepesek: [
        'Válts át: g → kg, cm → m.',
        'Rugóállandó a ráakasztott testből: $D = \\frac{mg}{x}$.',
        'Munka a nyújtatlan állapottól $x$ megnyúlásig: $W = \\frac{1}{2} D x^2$.',
        'Két megnyúlás között: számold ki mindkettőig a munkát, és vond ki egymásból.'
      ],
      tex: 'D = \\frac{mg}{x}, \\qquad \\Delta W = \\frac{1}{2} D x_2^2 - \\frac{1}{2} D x_1^2'
    }
  ],

  tippek: [
    'A tanár mindenhol $g = 10\\,\\mathrm{m/s^2}$ értékkel számol. Te is ezt használd.',
    'Számolás előtt válts át mindent: cm → m (4 cm = 0,04 m), g → kg (80 g = 0,08 kg). A legtöbb hiba itt csúszik be.',
    'Írd le a teljes levezetést: képlet betűkkel → behelyettesítés számokkal → eredmény mértékegységgel. A puszta végeredmény kevés.',
    'Melyik eszköz kell? Ha <b>idő</b> ($\\Delta t$) szerepel: lendület. Ha <b>út vagy magasság</b>: munka és energia.',
    'Lendületnél az irány számít. Visszapattanásnál a két sebesség ellentétes előjelű, ezért $\\Delta p = m v_2 - (-m v_1) = m(v_2 + v_1)$. Össze kell adni, nem kivonni.',
    'A golyóra ható erő és a lapra ható erő ugyanakkora, csak ellentétes irányú. A negatív előjel irányt jelent, nem hibát.',
    'Fékezésnél a fékezőerő munkája negatív ($-F \\cdot s$), és a mozgási energia változása is negatív. Ha az egyik előjelet elhagyod, negatív út vagy erő jön ki.',
    'A rugó munkája a megnyúlás négyzetével nő. 10 cm-ről 20 cm-re nyújtásnál $\\frac{1}{2} D x_2^2 - \\frac{1}{2} D x_1^2$ a jó, nem $\\frac{1}{2} D (x_2 - x_1)^2$.'
  ],

  feladatok: [
    {
      id: 'zh5',
      cim: 'Agyaggolyó a lapon: átlagos erő',
      forras: 'PróbaZH 5. feladat · 2 pont',
      zh: true,
      szoveg: 'Vízszintes alapra h = 0,8 m magasságból m = 0,5 kg tömegű agyaggolyót ejtünk. Az agyaggolyó becsapódáskor ellapul, nem pattan vissza. Mekkora átlagos erőnek felel ez meg, ha feltételezzük, hogy az ütközés folyamata, azaz a golyó ellapulása 0,1 s alatt zajlik le?',
      adatok: ['h = 0{,}8\\,\\mathrm{m}', 'm = 0{,}5\\,\\mathrm{kg}', '\\Delta t = 0{,}1\\,\\mathrm{s}', 'g = 10\\,\\mathrm{m/s^2}'],
      tipp: 'Az ütközés ideje adott, tehát lendülettel dolgozz. Ehhez először a becsapódás sebessége kell.',
      lepesek: [
        {
          cim: 'Melyik elv kell?',
          szoveg: 'Meg van adva, mennyi ideig tart az ütközés. Ilyenkor az átlagos erőt a lendület változásából kapod: a lendületváltozást elosztod az idővel. Ehhez kell a golyó lendülete az ütközés előtt és után.',
          tex: 'F_{\\text{átlag}} = \\frac{\\Delta p}{\\Delta t}'
        },
        {
          cim: 'Becsapódási sebesség',
          szoveg: 'A golyó szabadon esik $h$ magasságból. A sebessége a talajnál csak a magasságtól függ.',
          tex: 'v = \\sqrt{2gh}',
          be: 'v = \\sqrt{2 \\cdot 10 \\cdot 0{,}8} = \\sqrt{16}',
          er: 'v = 4\\,\\mathrm{m/s}',
          megj: 'A képlet a szabadesésből jön: $h = \\frac{1}{2} g t^2$ és $v = g t$, ebből $v = \\sqrt{2gh}$.'
        },
        {
          cim: 'Lendület az ütközés előtt',
          szoveg: 'A lendület a tömeg és a sebesség szorzata.',
          tex: 'p = m v',
          be: 'p = 0{,}5 \\cdot 4',
          er: 'p = 2\\,\\mathrm{kg\\,m/s}'
        },
        {
          cim: 'Lendület az ütközés után',
          szoveg: 'A golyó ellapul és nem pattan vissza, tehát megáll. Az ütközés után a lendülete nulla. A lendületváltozás mindig: végső mínusz kezdeti.',
          tex: '\\Delta p = 0 - p',
          be: '\\Delta p = 0 - 2',
          er: '\\Delta p = -2\\,\\mathrm{kg\\,m/s}'
        },
        {
          cim: 'Átlagos erő',
          szoveg: 'A lendületváltozást elosztod az ütközés idejével.',
          tex: 'F_{\\text{átlag}} = \\frac{\\Delta p}{\\Delta t}',
          be: 'F_{\\text{átlag}} = \\frac{0 - 2}{0{,}1}',
          er: 'F_{\\text{átlag}} = -20\\,\\mathrm{N}'
        }
      ],
      valasz: 'F_{\\text{átlag}} = -20\\,\\mathrm{N}',
      megj: 'A negatív előjel azt jelenti, hogy a golyóra ható erő a golyó mozgásával ellentétes irányú: fékezi a golyót. A nagysága 20 N. A gyakorló feladatsor tanári megoldása szerint a lapra ugyanekkora, ellentétes irányú erő hat: $F_{\\text{átl; lap}} = -F_{\\text{átl; golyó}} = 20\\,\\mathrm{N}$. Ugyanez a feladat a GYF-ben (Lendület, erőlökés 4.) az erőlökést is kérdezi: az a lendületváltozással egyenlő, a golyóra $-2\\,\\mathrm{kg\\,m/s}$, a lapra $2\\,\\mathrm{kg\\,m/s}$ (saját számolás, a tanár külön nem írta ki).'
    },
    {
      id: 'zh6',
      cim: 'Láda feltolása a lejtőre',
      forras: 'PróbaZH 6. feladat · 1 pont',
      zh: true,
      szoveg: 'Egy 200 kg tömegű ládát tolunk lassan fölfelé egy 1,5 m magas lejtőre. Mennyi munkát végez a tolóerő, ha a súrlódás elhanyagolható?',
      adatok: ['m = 200\\,\\mathrm{kg}', 'h = 1{,}5\\,\\mathrm{m}', 'g = 10\\,\\mathrm{m/s^2}'],
      tipp: 'Súrlódás nincs, a láda lassan mozog. Gondold végig: mivé alakul a tolóerő munkája?',
      lepesek: [
        {
          cim: 'Melyik elv kell?',
          szoveg: 'A láda lassan mozog, és súrlódás nincs. A tolóerő munkája ezért a láda helyzeti energiáját növeli. A helyzeti energia definíció szerint azzal a munkával egyezik meg, amit az adott helyzeti energia eléréséhez végez az erő.',
          tex: 'W = E_h = m g h'
        },
        {
          cim: 'Behelyettesítés',
          szoveg: 'A lejtő hossza és szöge nincs megadva, de nem is kell. A képletben csak a magasság szerepel.',
          tex: 'E_h = m g h',
          be: 'E_h = 200 \\cdot 10 \\cdot 1{,}5',
          er: 'E_h = 3000\\,\\mathrm{J}'
        },
        {
          cim: 'A válasz kimondása',
          szoveg: 'A tolóerő által végzett munka megegyezik a láda helyzeti energiájával 1,5 m magasan.',
          er: 'W = 3000\\,\\mathrm{J}'
        }
      ],
      valasz: 'W = 3000\\,\\mathrm{J}',
      megj: 'A ZH-n az indoklást is írd le egy mondatban (a tolóerő munkája a helyzeti energiával egyenlő). A tanár mintamegoldása is ezt teszi.'
    },
    {
      id: 'zh7',
      cim: 'Rugó nyújtása 10 cm-ről 20 cm-re',
      forras: 'PróbaZH 7. feladat · 2 pont',
      zh: true,
      szoveg: 'Mekkora munkát végez a megnyújtó erő azon a rugón, amelyet egy 80 g tömegű test 4,0 cm-rel nyújt meg, mialatt megnyúlását 10 cm-ről 20 cm-re változtatja? Minden megnyúlás a nyújtatlan állapotból értendő.',
      adatok: ['m = 0{,}08\\,\\mathrm{kg}', 'x = 0{,}04\\,\\mathrm{m}', 'x_1 = 0{,}10\\,\\mathrm{m}', 'x_2 = 0{,}20\\,\\mathrm{m}', 'g = 10\\,\\mathrm{m/s^2}'],
      tipp: 'Először a rugóállandó kell. Azt a ráakasztott test adja meg: mekkora erő mekkora megnyúlást okoz?',
      lepesek: [
        {
          cim: 'Mi a terv?',
          szoveg: 'A rugó megnyújtásához végzett munka a nyújtatlan állapottól számítva $\\frac{1}{2} D x^2$. Ehhez kell a $D$ rugóállandó, amit a ráakasztott testből számolsz ki. Előbb válts át: 80 g = 0,08 kg, 4,0 cm = 0,04 m, 10 cm = 0,10 m, 20 cm = 0,20 m.',
          tex: 'W = \\frac{1}{2} D x^2'
        },
        {
          cim: 'A húzóerő',
          szoveg: 'A rugóra $F = D \\cdot x$ érvényes. Itt az $F$ húzóerő a 80 g tömegű testre ható gravitációs erő.',
          tex: 'F = m g',
          be: 'F = 0{,}08 \\cdot 10',
          er: 'F = 0{,}8\\,\\mathrm{N}'
        },
        {
          cim: 'A rugóállandó',
          szoveg: 'Az $F = D \\cdot x$ összefüggésből kifejezed a $D$-t. Ez az erő 4 cm megnyúlást okoz.',
          tex: 'D = \\frac{mg}{x}',
          be: 'D = \\frac{0{,}8}{0{,}04}',
          er: 'D = 20\\,\\mathrm{N/m}'
        },
        {
          cim: 'Munka 20 cm-ig',
          szoveg: 'Ennyi munka kell, hogy a rugót a nyújtatlan állapotból 20 cm-rel megnyújtsd.',
          tex: 'W_2 = \\frac{1}{2} D x_2^2',
          be: 'W_2 = \\frac{1}{2} \\cdot 20 \\cdot 0{,}20^2',
          er: 'W_2 = 0{,}4\\,\\mathrm{J}'
        },
        {
          cim: 'Munka az első 10 cm-en',
          szoveg: 'Ennyi munka kell az első 10 cm-es megnyújtáshoz. Ezt nem kérdezik, ezért le kell vonni.',
          tex: 'W_1 = \\frac{1}{2} D x_1^2',
          be: 'W_1 = \\frac{1}{2} \\cdot 20 \\cdot 0{,}10^2',
          er: 'W_1 = 0{,}1\\,\\mathrm{J}'
        },
        {
          cim: 'A két munka különbsége',
          szoveg: 'A 10 cm és 20 cm közötti nyújtás munkája: a teljes munka mínusz az első szakasz munkája.',
          tex: '\\Delta W = W_2 - W_1',
          be: '\\Delta W = 0{,}4 - 0{,}1',
          er: '\\Delta W = 0{,}3\\,\\mathrm{J}'
        }
      ],
      valasz: '\\Delta W = 0{,}3\\,\\mathrm{J}',
      megj: 'Figyeld meg: az első 10 cm-hez 0,1 J kell, a második 10 cm-hez 0,3 J. Ezért nem jó, ha a 10 cm különbséget írod a képletbe.'
    },
    {
      id: 'gyf-l5',
      cim: 'Visszapattanó acélgolyó: átlagos erő',
      forras: 'GYF · Lendület, erőlökés 5.',
      szoveg: 'Vízszintes acéllapra h = 125 cm magasságból acélgolyót ejtünk, mely a lapról visszapattanva h1 = 0,81·h magasra emelkedik. Mekkora átlagos erő lép fel a lap és a golyó között, ha az ütközés 0,01 s ideig tart? (Eddig marad érintkezésben a golyó a lappal.)',
      adatok: ['h = 1{,}25\\,\\mathrm{m}', 'h_1 = 0{,}81 \\cdot h', '\\Delta t = 0{,}01\\,\\mathrm{s}', 'm = 0{,}5\\,\\mathrm{kg}\\ \\text{(a tanári megoldásból)}', 'g = 10\\,\\mathrm{m/s^2}'],
      tipp: 'A golyó irányt vált. Jelölj ki pozitív irányt (felfelé), és a két sebességet előjellel írd fel.',
      lepesek: [
        {
          cim: 'Melyik elv kell?',
          szoveg: 'Megint adott az ütközés ideje, tehát az átlagos erőt a lendületváltozásból számolod. Most a golyó visszapattan: a lendülete irányt vált. A pozitív irány legyen felfelé. Válts át: 125 cm = 1,25 m.',
          tex: 'F_{\\text{átl; golyó}} = \\frac{\\Delta p_{\\text{golyó}}}{\\Delta t}'
        },
        {
          cim: 'Sebesség becsapódáskor',
          szoveg: 'A golyó $h$ magasságból esik, ugyanúgy, mint az agyaggolyós feladatban. Ez a sebesség lefelé mutat.',
          tex: 'v_1 = \\sqrt{2gh}',
          be: 'v_1 = \\sqrt{2 \\cdot 10 \\cdot 1{,}25} = \\sqrt{25}',
          er: 'v_1 = 5\\,\\mathrm{m/s}'
        },
        {
          cim: 'Sebesség visszapattanáskor',
          szoveg: 'A golyó $0{,}81h$ magasra emelkedik. Ugyanaz a képlet adja meg, mekkora sebességgel indul felfelé.',
          tex: 'v_2 = \\sqrt{2g(0{,}81h)}',
          be: 'v_2 = \\sqrt{2 \\cdot 10 \\cdot 0{,}81 \\cdot 1{,}25} = \\sqrt{20{,}25}',
          er: 'v_2 = 4{,}5\\,\\mathrm{m/s}',
          megj: 'A tanár a két sebességet nem számolta ki külön, hanem kiemelt: $v_1 + v_2 = \\sqrt{2gh}\\,(1 + \\sqrt{0{,}81})$. Ugyanaz jön ki.'
        },
        {
          cim: 'Lendületváltozás',
          szoveg: 'Ütközés előtt a golyó lefelé megy, ezért a lendülete negatív: $-m v_1$. Utána felfelé megy: $+m v_2$. Végső mínusz kezdeti: a két mínusz pluszt ad, a sebességek összeadódnak.',
          tex: '\\Delta p_{\\text{golyó}} = m v_2 - (-m v_1) = m(v_2 + v_1)',
          be: '\\Delta p_{\\text{golyó}} = 0{,}5 \\cdot (4{,}5 + 5)',
          er: '\\Delta p_{\\text{golyó}} = 4{,}75\\,\\mathrm{kg\\,m/s}'
        },
        {
          cim: 'Átlagos erő',
          szoveg: 'A lendületváltozást elosztod az ütközés idejével.',
          tex: 'F_{\\text{átl; golyó}} = \\frac{\\sqrt{2gh}\\,(1 + \\sqrt{0{,}81})}{\\Delta t} \\cdot m',
          be: 'F_{\\text{átl; golyó}} = \\frac{\\sqrt{2 \\cdot 10 \\cdot 1{,}25}\\,(1 + \\sqrt{0{,}81}) \\cdot 0{,}5}{0{,}01} = \\frac{4{,}75}{0{,}01}',
          er: 'F_{\\text{átl; golyó}} = 475\\,\\mathrm{N}'
        }
      ],
      valasz: 'F_{\\text{átl; golyó}} = 475\\,\\mathrm{N}',
      megj: 'A feladat szövege nem adja meg a golyó tömegét. A tanár a megoldásban $m = 0{,}5\\,\\mathrm{kg}$-mal számolt (a lapján: $950\\,\\mathrm{N} \\cdot 0{,}5 = 475\\,\\mathrm{N}$), ezt vettük át. Az eredmény pozitív: a golyóra felfelé hat az erő. Nagy az erő, mert az ütközés nagyon rövid, és a golyó vissza is pattan.'
    },
    {
      id: 'gyf-m2',
      cim: 'Láda húzása ferde erővel, súrlódással',
      forras: 'GYF · A munka 2.',
      szoveg: 'A csúszási súrlódási együttható egy 20 kg tömegű láda és a padló között 0,40. Mekkora a munkavégzése a húzóerőnek 8 m úton, ha a sebesség állandó? A húzóerő iránya a vízszinteshez képest 37°-os szögben ferdén fölfelé mutat.',
      adatok: ['m = 20\\,\\mathrm{kg}', '\\mu = 0{,}40', 's = 8\\,\\mathrm{m}', '\\alpha = 37^\\circ', 'g = 10\\,\\mathrm{m/s^2}'],
      tipp: 'A húzóerő nagysága nincs megadva. Az állandó sebességből tudod kiszámolni: az erők kiegyenlítik egymást.',
      lepesek: [
        {
          cim: 'Mi a terv?',
          szoveg: 'A munka: erő · út · a köztük lévő szög koszinusza. Csak a húzóerő vízszintes része ($F_x = F \\cos\\alpha$) végez munkát. Az utat és a szöget ismered, a húzóerőt nem. A sebesség állandó, tehát a gyorsulás nulla: az erők kiegyenlítik egymást. Ebből jön ki $F$.',
          tex: 'W = F_x \\cdot s = F \\cdot s \\cdot \\cos\\alpha'
        },
        {
          cim: 'Erők egyensúlya',
          szoveg: 'Vízszintesen: a húzóerő vízszintes része egyenlő a súrlódási erővel. Függőlegesen: a talaj nyomóereje ($N$) és a húzóerő függőleges része együtt tartja a súlyt.',
          tex: 'F \\cos\\alpha = F_s, \\qquad N + F \\sin\\alpha = m g'
        },
        {
          cim: 'A súrlódás beírása',
          szoveg: 'A súrlódási erő $F_s = \\mu N$. A nyomóerő a függőleges egyenletből: $N = mg - F \\sin\\alpha$. Vigyázz: a felfelé húzó erő csökkenti a nyomóerőt, ezért $N$ nem egyszerűen $mg$.',
          tex: 'F \\cos\\alpha = \\mu \\, (m g - F \\sin\\alpha)'
        },
        {
          cim: 'A húzóerő kifejezése',
          szoveg: 'Bontsd fel a zárójelet, vidd egy oldalra az $F$-et tartalmazó tagokat, és emeld ki az $F$-et.',
          tex: 'F \\, (\\mu \\sin\\alpha + \\cos\\alpha) = \\mu m g',
          be: 'F = \\frac{0{,}4 \\cdot 20 \\cdot 10}{0{,}4 \\cdot \\sin 37^\\circ + \\cos 37^\\circ} = \\frac{80}{1{,}039}',
          er: 'F \\approx 77\\,\\mathrm{N}',
          megj: 'Az $F$ számértékét a tanár külön nem írta ki, egyből a munka képletébe helyettesített (saját számolás).'
        },
        {
          cim: 'A munka',
          szoveg: 'A kifejezett $F$-et beírod a munka képletébe. A tanár így egyetlen képletet kap, és abba helyettesít be.',
          tex: 'W = \\mu m g s \\, \\frac{\\cos\\alpha}{\\mu \\sin\\alpha + \\cos\\alpha}',
          be: 'W = 0{,}4 \\cdot 20 \\cdot 10 \\cdot 8 \\cdot \\frac{\\cos 37^\\circ}{0{,}4 \\cdot \\sin 37^\\circ + \\cos 37^\\circ}',
          er: 'W = 492\\,\\mathrm{J}'
        }
      ],
      valasz: 'W = 492\\,\\mathrm{J}',
      megj: 'A számológép fok (DEG) módban legyen: $\\sin 37^\\circ \\approx 0{,}602$, $\\cos 37^\\circ \\approx 0{,}799$.'
    },
    {
      id: 'gyf-e5',
      cim: 'Lassuló autó: mekkora a fékezőerő?',
      forras: 'GYF · Munka, helyzeti és mozgási energia 5.',
      szoveg: 'Egy autó vezetője azt tapasztalja, hogy autójának sebessége 20 m/s-ról 15 m/s-ra csökken, mialatt 130 m-t gurul az úton. Milyen nagyságú erő fékezte az autót? (m = 1200 kg.)',
      adatok: ['v_0 = 20\\,\\mathrm{m/s}', 'v = 15\\,\\mathrm{m/s}', 's = 130\\,\\mathrm{m}', 'm = 1200\\,\\mathrm{kg}'],
      tipp: 'Két sebesség és az út adott, idő nincs. Ez a munkatétel esete.',
      lepesek: [
        {
          cim: 'Melyik elv kell?',
          szoveg: 'Az autó sebessége változik, és tudod, mekkora úton. Ilyenkor a munkatétel kell: a fékezőerő munkája egyenlő a mozgási energia megváltozásával. A fékezőerő a mozgással ellentétes, ezért a munkája negatív.',
          tex: 'W = -F \\cdot s = \\frac{1}{2} m v^2 - \\frac{1}{2} m v_0^2'
        },
        {
          cim: 'A mozgási energia változása',
          szoveg: 'A jobb oldalt számolod ki: végső mínusz kezdeti mozgási energia. Negatív lesz, mert az autó lassul.',
          tex: '\\frac{1}{2} m v^2 - \\frac{1}{2} m v_0^2 = \\frac{1}{2} m \\, (v^2 - v_0^2)',
          be: '\\frac{1}{2} \\cdot 1200 \\cdot (15^2 - 20^2) = 600 \\cdot (-175)',
          er: '-105\\,000\\,\\mathrm{J}'
        },
        {
          cim: 'A fékezőerő',
          szoveg: 'A bal oldalon $-F \\cdot s$ áll, ahol az út 130 m. Mindkét oldal negatív, az előjelek kiesnek. Osztasz az úttal.',
          tex: 'F = \\frac{\\frac{1}{2} m \\, (v_0^2 - v^2)}{s}',
          be: 'F = \\frac{105\\,000}{130}',
          er: 'F = 808\\,\\mathrm{N}'
        }
      ],
      valasz: 'F = 808\\,\\mathrm{N}',
      megj: 'Tanári elírás: a kézzel írt megoldásban „$-130\\,s = \\frac{1}{2} \\cdot 1200\\,(15^2 - 20^2)$” és „$s = 808\\,\\mathrm{m}$” áll. A 130 valójában az út, a 808 pedig a keresett erő newtonban. Helyesen: $F = 808\\,\\mathrm{N}$ (pontosabban 807,7 N, saját számolás).'
    },
    {
      id: 'gyf-e3',
      cim: 'Lövedék a pisztolycsőben',
      forras: 'GYF · Munka, helyzeti és mozgási energia 3.',
      szoveg: 'Egy pisztolyból egy 3 g tömegű lövedéket lövünk ki 400 m/s sebességgel. A pisztoly csöve 13 cm hosszú. Mennyi energiára tett szert a lövedék? Mekkora átlagos erő hatott a lövedékre a pisztoly csövében?',
      adatok: ['m = 0{,}003\\,\\mathrm{kg}', 'v_0 = 0', 'v = 400\\,\\mathrm{m/s}', 's = 0{,}13\\,\\mathrm{m}'],
      tipp: 'A lövedék állásból indul, és a cső hosszán gyorsul fel. Az erő munkája adja a mozgási energiáját.',
      lepesek: [
        {
          cim: 'Melyik elv kell?',
          szoveg: 'A lövedék a csőben 0-ról 400 m/s-ra gyorsul. A gyorsító erő munkája egyenlő a mozgási energia megváltozásával (munkatétel). Az erő itt a mozgás irányába mutat, a munka pozitív. Válts át: 3 g = 0,003 kg, 13 cm = 0,13 m.',
          tex: 'W = F \\cdot s = \\frac{1}{2} m v^2 - 0'
        },
        {
          cim: 'A lövedék energiája',
          szoveg: 'Az első kérdés a megszerzett energia. Ez a lövedék mozgási energiája a cső végén, mert állásból indult.',
          tex: 'E_m = \\frac{1}{2} m v^2',
          be: 'E_m = \\frac{1}{2} \\cdot 0{,}003 \\cdot 400^2',
          er: 'E_m = 240\\,\\mathrm{J}',
          megj: 'Ezt a számértéket a tanár külön nem írta ki, csak az erőt (saját számolás).'
        },
        {
          cim: 'Az átlagos erő',
          szoveg: 'A munkatételből kifejezed az erőt: osztasz az úttal, vagyis a cső hosszával.',
          tex: 'F = \\frac{m v^2}{2s}',
          be: 'F = \\frac{0{,}003 \\cdot 400^2}{2 \\cdot 0{,}13} = \\frac{480}{0{,}26}',
          er: 'F = 1846\\,\\mathrm{N}'
        }
      ],
      valasz: 'E_m = 240\\,\\mathrm{J}, \\quad F = 1846\\,\\mathrm{N}',
      megj: 'A 240 J saját számolás: a tanár lapján a lövedék energiája számmal nem szerepel, csak az $F = 1846\\,\\mathrm{N}$.'
    },
    {
      id: 'gyf-e7',
      cim: 'Lövedék a fahasábban: erő és idő',
      forras: 'GYF · Munka, helyzeti és mozgási energia 7.',
      szoveg: 'Egy 5,0 g tömegű 100 m/s sebességű lövedék 6,0 cm mélyen hatol be egy fahasábba. Feltételezve, hogy a lövedék egyenletesen lassult, határozza meg a lövedék lefékeződésének idejét és a fahasáb által a lövedékre kifejtett erőt!',
      adatok: ['m = 0{,}005\\,\\mathrm{kg}', 'v_0 = 100\\,\\mathrm{m/s}', 'v = 0', 's = 0{,}06\\,\\mathrm{m}'],
      tipp: 'Két lépcső: az erőt a munkatétel adja (az út ismert), az időt a lendület (ha az erő már megvan).',
      lepesek: [
        {
          cim: 'Mi a terv?',
          szoveg: 'Erőt és időt kérdeznek. Az út adott, ezért az erőt a munkatételből számolod. Ha megvan az erő, az idő a lendületváltozásból jön. Ez a feladat a két módszert kapcsolja össze. Válts át: 5,0 g = 0,005 kg, 6,0 cm = 0,06 m.',
          tex: 'F_{\\text{átl}} \\cdot s = \\frac{1}{2} m v^2 - \\frac{1}{2} m v_0^2'
        },
        {
          cim: 'A lövedék megáll',
          szoveg: 'A végén a lövedék áll, tehát $v = 0$, az első tag kiesik. A tanár itt az erőt előjelesen keresi ($+F_{\\text{átl}} \\cdot s$ alakban írja fel), ezért az erő negatívnak fog kijönni.',
          tex: 'F_{\\text{átl}} \\cdot s = -\\frac{1}{2} m v_0^2'
        },
        {
          cim: 'A fékezőerő',
          szoveg: 'Osztasz az úttal.',
          tex: 'F_{\\text{átl}} = -\\frac{m v_0^2}{2s}',
          be: 'F_{\\text{átl}} = -\\frac{0{,}005 \\cdot 100^2}{2 \\cdot 0{,}06} = -\\frac{50}{0{,}12}',
          er: 'F_{\\text{átl}} = -417\\,\\mathrm{N}'
        },
        {
          cim: 'Lendületváltozás',
          szoveg: 'Most jön az idő. Ehhez kell a lövedék lendületváltozása: végső mínusz kezdeti. A végső lendület nulla.',
          tex: '\\Delta p = m v - m v_0',
          be: '\\Delta p = 0 - 0{,}005 \\cdot 100',
          er: '\\Delta p = -0{,}5\\,\\mathrm{kg\\,m/s}'
        },
        {
          cim: 'A fékeződés ideje',
          szoveg: 'Az $F_{\\text{átl}} = \\frac{\\Delta p}{\\Delta t}$ összefüggésből kifejezed az időt. A két negatív előjel kiesik.',
          tex: '\\Delta t = \\frac{\\Delta p}{F_{\\text{átl}}}',
          be: '\\Delta t = \\frac{-0{,}5}{-417}',
          er: '\\Delta t = 0{,}0012\\,\\mathrm{s} = 1{,}2\\,\\mathrm{ms}'
        }
      ],
      valasz: 'F_{\\text{átl}} = -417\\,\\mathrm{N}, \\quad \\Delta t = 1{,}2\\,\\mathrm{ms}',
      megj: 'A negatív erő azt jelenti, hogy a fahasáb a mozgással ellentétes irányban hat a lövedékre. A nagysága 417 N.'
    },
    {
      id: 'gyf-me1',
      cim: 'Szikláról eldobott kő sebessége',
      forras: 'GYF · A mechanikai energia megmaradása 1.',
      szoveg: 'Egy folyó partján álló 20 m magas szikláról egy fiú követ dob a vízbe 15 m/s kezdősebességgel. Határozza meg a kő sebességét a vízbe történő becsapódás pillanatában!',
      adatok: ['h = 20\\,\\mathrm{m}', 'v_1 = 15\\,\\mathrm{m/s}', 'g = 10\\,\\mathrm{m/s^2}'],
      tipp: 'A dobás iránya nincs megadva. Energiával számolj: mennyi energiája van a kőnek fent, és mennyi lent?',
      lepesek: [
        {
          cim: 'Melyik elv kell?',
          szoveg: 'A feladat magasságot és sebességet ad meg, súrlódás nincs. Ilyenkor a mechanikai energia megmarad: a helyzeti és a mozgási energia összege fent ugyanannyi, mint lent.'
        },
        {
          cim: 'Energia fent és lent',
          szoveg: 'A nullszint a víz szintje. Fent a kőnek helyzeti és mozgási energiája is van. Lent, a víznél már csak mozgási.',
          tex: 'm g h + \\frac{1}{2} m v_1^2 = \\frac{1}{2} m v_2^2'
        },
        {
          cim: 'A tömeg kiesik',
          szoveg: 'Mindhárom tagban ott az $m$, ezért oszthatsz vele. Utána szorzol 2-vel, és gyököt vonsz. Ezért nem baj, hogy a kő tömege nincs megadva.',
          tex: 'v_2 = \\sqrt{v_1^2 + 2gh}'
        },
        {
          cim: 'Behelyettesítés',
          szoveg: 'Beírod a számokat.',
          tex: 'v_2 = \\sqrt{v_1^2 + 2gh}',
          be: 'v_2 = \\sqrt{15^2 + 2 \\cdot 10 \\cdot 20} = \\sqrt{625}',
          er: 'v_2 = 25\\,\\mathrm{m/s}'
        }
      ],
      valasz: 'v_2 = 25\\,\\mathrm{m/s}',
      megj: 'Ugyanez a gondolat áll a MINTA vizsga elméleti kérdése mögött: azonos magasságból, azonos kezdősebességgel eldobott golyók azonos sebességgel érnek földet.'
    },
    {
      id: 'gyf-me3',
      cim: 'Kitérített fonálinga: munka és sebesség',
      forras: 'GYF · A mechanikai energia megmaradása 3.',
      szoveg: 'Egy 2 m hosszú 0,8 kg tömegű fonálingát a függőlegessel 36,9° szöget bezáró helyzetig kitérítjük. Határozza meg, hogy mennyi munkát végeztünk ezalatt és az ingatest sebességét a nyugalmi helyzeten való áthaladáskor, amennyiben kezdősebesség nélkül elengedjük.',
      adatok: ['l = 2\\,\\mathrm{m}', 'm = 0{,}8\\,\\mathrm{kg}', '\\varphi = 36{,}9^\\circ', 'g = 10\\,\\mathrm{m/s^2}'],
      tipp: 'Rajzold le az ingát a két helyzetben. Először azt számold ki, mennyivel került magasabbra az ingatest.',
      lepesek: [
        {
          cim: 'Mi a terv?',
          szoveg: 'Kitérítéskor az ingatestet megemeled. A végzett munka a helyzeti energia növekedésével egyenlő. Elengedés után ez a helyzeti energia alakul mozgási energiává (energiamegmaradás). Mindkettőhöz kell a $h$ emelkedés.',
          tex: 'W = E_{pot} = m g h'
        },
        {
          cim: 'Az emelkedés magassága',
          szoveg: 'Alaphelyzetben a test $l$ mélyen lóg a felfüggesztés alatt. Kitérítve csak $l \\cos\\varphi$ mélyen van. A kettő különbsége az emelkedés.',
          tex: 'h = l - l \\cos\\varphi = l \\, (1 - \\cos\\varphi)',
          be: 'h = 2 \\cdot (1 - \\cos 36{,}9^\\circ)',
          er: 'h \\approx 0{,}40\\,\\mathrm{m}',
          megj: 'A $h$ számértékét a tanár külön nem írta ki, egyből a munka képletébe helyettesített (saját számolás).'
        },
        {
          cim: 'A végzett munka',
          szoveg: 'A munka a helyzeti energia növekedése. A $h$ helyére beírod az előző képletet.',
          tex: 'W = m g l \\, (1 - \\cos\\varphi)',
          be: 'W = 0{,}8 \\cdot 10 \\cdot 2 \\cdot (1 - \\cos 36{,}9^\\circ)',
          er: 'W = 3{,}21\\,\\mathrm{J}'
        },
        {
          cim: 'Energiamegmaradás lent',
          szoveg: 'Az inga kezdősebesség nélkül indul. A nyugalmi helyzetben (legalul) a teljes helyzeti energiája mozgási energiává alakult.',
          tex: 'E_m = \\frac{1}{2} m v^2 = E_{pot}'
        },
        {
          cim: 'A sebesség',
          szoveg: 'Kifejezed a sebességet: szorzol 2-vel, osztasz a tömeggel, gyököt vonsz.',
          tex: 'v = \\sqrt{\\frac{2 E_{pot}}{m}}',
          be: 'v = \\sqrt{\\frac{2 \\cdot 3{,}21}{0{,}8}}',
          er: 'v = 2{,}83\\,\\mathrm{m/s}'
        }
      ],
      valasz: 'W = 3{,}21\\,\\mathrm{J}, \\quad v = 2{,}83\\,\\mathrm{m/s}',
      megj: 'A számológép fok (DEG) módban legyen: $\\cos 36{,}9^\\circ \\approx 0{,}8$.'
    }
  ],

  gyakorlo: [
    {
      id: 'gy1',
      forras: 'GYF · Lendület, erőlökés 1.',
      szoveg: 'Mekkora az m = 5 kg tömegű test lendülete h = 12,5 m magasságú szabadesés után?',
      valasz: 'p = 79\\,\\mathrm{kg\\,m/s}',
      tipp: 'Szabadesés: $v = \\sqrt{2gh}$, utána $p = m v = m\\sqrt{2gh}$.'
    },
    {
      id: 'gy2',
      forras: 'GYF · Lendület, erőlökés 2.',
      szoveg: 'Mialatt egy 80 kg tömegű ember az autójában ülve a közlekedési lámpánál várakozott, valaki hátulról az autójának ütközött. Határozzuk meg az ülés által az autós hátára kifejtett átlagos erőt, ha az ütközés 0,3 s-ig tartott és ennek következtében 5 m/s sebességre gyorsult fel az autó!',
      valasz: 'F_{\\text{átl}} = 1333\\,\\mathrm{N}',
      tipp: 'Átlagos erő recept. Az autós állásból gyorsul fel: $F_{\\text{átl}} = \\frac{m v - 0}{\\Delta t}$.'
    },
    {
      id: 'gy3',
      forras: 'GYF · Lendület, erőlökés 3.',
      szoveg: 'Egy golfjátékos 80 m/s sebességgel üti el az 51 g tömegű golflabdát. Feltételezve, hogy a labda és az ütő 0,006 s-ig érintkezik, határozza meg a labda elütés utáni lendületét és az ütő által rá kifejtett erő átlagos nagyságát!',
      valasz: 'p = 4{,}08\\,\\mathrm{kg\\,m/s}, \\quad F_{\\text{átl}} = 680\\,\\mathrm{N}',
      tipp: 'Válts át: 51 g = 0,051 kg. A lendület $p = m v$, az erő $F_{\\text{átl}} = \\frac{m v - 0}{\\Delta t}$. A lendület számértékét a tanár külön nem írta ki, csak az erőt (a 4,08 saját számolás).'
    },
    {
      id: 'gy4',
      forras: 'GYF · A munka 1.',
      szoveg: 'Egy gyerek a vízszintessel 37°-os szöget bezáró, ferdén lefelé mutató 6 N nagyságú erővel, állandó sebességgel tol egy dobozt a padlón. A doboz elmozdulása a padlón 4 cm. Mennyi munkát végez a gyerek? Vajon több vagy kevesebb lesz a munkavégzés, ha a vízszintessel ugyanekkora szöget bezáró, ferdén fölfelé mutató erővel húzza a dobozt?',
      valasz: 'W = 0{,}19\\,\\mathrm{J}',
      tipp: 'Válts át: 4 cm = 0,04 m, majd $W = F \\cdot s \\cdot \\cos\\alpha$. A második kérdésre a tanár lapján nincs válasz. Saját gondolatmenet a GYF · A munka 2. megoldása alapján: fölfelé húzva kisebb a nyomóerő ($N = mg - F \\sin\\alpha$), így kisebb a súrlódás, tehát kevesebb munka kell.'
    },
    {
      id: 'gy5',
      forras: 'GYF · A munka 3.',
      szoveg: 'Mennyi munkát végzünk a nehézségi erő ellenében, ha egy 3 kg tömegű testet 40 cm magasra emelünk?',
      valasz: 'W = 12\\,\\mathrm{J}',
      tipp: 'Válts át: 40 cm = 0,4 m. Az emelőerő $F = mg$, a munka $W = F \\cdot h = mgh$.'
    },
    {
      id: 'gy6',
      forras: 'GYF · Munka, helyzeti és mozgási energia 1.',
      szoveg: 'Egy 1200 kg tömegű, 30 m/s sebességű autó fékezés közben csúszik a megállásig. Milyen hosszú csúszás után áll meg az autó, ha a csúszási súrlódási erő a csúszó kerekek és az úttest között 6000 N?',
      valasz: 's = 90\\,\\mathrm{m}',
      tipp: 'Munkatétel megállásig ($v = 0$): $-F_s \\cdot s = 0 - \\frac{1}{2} m v_0^2$. Ebből fejezd ki az utat.'
    },
    {
      id: 'gy7',
      forras: 'GYF · Munka, helyzeti és mozgási energia 4.',
      szoveg: 'Egy lövedék 153 m/s sebességgel csapódik egy deszkába és azon áthatolva 130 m/s sebességgel hagyja el. Egy másik, azonos tömegű és méretű lövedék 92 m/s sebességgel éri el a deszkát. Mekkora lesz a sebessége a deszkán való áthaladás után? Tegyük fel, hogy a lövedékre kifejtett fékezőerő független a sebességtől.',
      valasz: 'u_2 = 44{,}2\\,\\mathrm{m/s}',
      tipp: 'Munkatétel kétszer. A deszka mindkét lövedéken ugyanannyi munkát végez ($F \\cdot s$ ugyanaz), ezért $v_2^2 - v_1^2 = u_2^2 - u_1^2$. A tömeg kiesik. Nem a sebesség csökken ugyanannyival, hanem a mozgási energia!'
    },
    {
      id: 'gy8',
      forras: 'GYF · Munka, helyzeti és mozgási energia 6.',
      szoveg: 'Egy autó 25 m/s sebességgel halad az úttesten. A súrlódási együttható az autó és az úttest között 0,80. Milyen hosszú úton áll meg az autó, ha fékezés közben csúszik? (m = 1200 kg.)',
      valasz: 's = 39\\,\\mathrm{m}',
      tipp: 'Munkatétel, a fékezőerő a súrlódás: $F_s = \\mu m g$. A tömeg kiesik: $s = \\frac{v_0^2}{2 \\mu g}$.'
    },
    {
      id: 'gy9',
      forras: 'GYF · A mechanikai energia megmaradása 2.',
      szoveg: 'Egy 0,5 kg tömegű labda esése közben elhalad egy 1,5 m magas ablak előtt. Mennyivel növekedett a labda mozgási energiája az ablak előtti elhaladás közben? Mekkora volt a labda sebessége az ablak alsó szélénél, ha a felső szélét 3,0 m/s sebességgel érte el?',
      valasz: '\\Delta E_m = 7{,}5\\,\\mathrm{J}, \\quad v_2 = 6{,}24\\,\\mathrm{m/s}',
      tipp: 'Energiamegmaradás: a mozgási energia annyival nő, amennyivel a helyzeti csökken, $\\Delta E_m = mgh$. Utána $\\frac{1}{2} m v_2^2 = \\frac{1}{2} m v_1^2 + \\Delta E_m$.'
    }
  ]
}]);
