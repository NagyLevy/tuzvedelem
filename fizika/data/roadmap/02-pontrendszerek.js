/* Roadmap — Pontrendszerek, ütközések. Forrás: PróbaZH, GYF feladatsor, tanári megoldások. */
window.FIZ_ROADMAP = (window.FIZ_ROADMAP || []).concat([{
  id: 'pontrendszerek',
  nev: 'Pontrendszerek, ütközések',
  leckek: ['5'],
  perc: 90,
  lenyeg: 'Szinte minden feladat a lendületmegmaradásra épül: az össz-lendület ($m_1v_1+m_2v_2$) az ütközés előtt és után ugyanannyi. A ZH-n azt kell eldöntened, hogy az ütközés rugalmas (két kész képlet) vagy rugalmatlan (közös sebesség), és ha a feladat folytatódik (emelkedés, kilendülés, súrlódás), ott energiával számolsz tovább.',

  elmelet: [
    {
      k: 'Mit nevezünk külső és belső erőknek?',
      v: 'Egy több testből álló mechanikai rendszer egyes elemeinek egymásra gyakorolt erőhatását belső erőnek, egy a rendszerhez nem tartozó test által kifejtett erőhatást pedig külső erőnek nevezzük.',
      forras: 'PróbaZH',
      trukk: 'Belső = a rendszer tagjai hatnak egymásra. Külső = a rendszerhez nem tartozó test hat. A kérdés két fogalmat kér, mindkettőt írd le.'
    },
    {
      k: 'Fogalmazza meg az impulzustételt pontrendszerekre!',
      v: 'Egy mechanikai rendszer össz-impulzusának idő szerinti differenciálhányadosa egyenlő a rendszerre ható külső erők eredőjével.',
      forras: 'PróbaZH',
      trukk: 'Három kulcsszó, egyik se maradjon ki: össz-impulzus, idő szerinti differenciálhányados, külső erők eredője. A belső erők nem szerepelnek a tételben.'
    },
    {
      k: 'Mit nevezünk mechanikai szempontból zárt rendszernek?',
      v: 'Egy több testből álló mechanikai rendszert zártnak nevezünk, ha nem hatnak rá külső erők, vagy a külső erők eredője nulla.',
      forras: 'PróbaZH',
      trukk: 'Két eset van, „vagy”-gyal összekötve: nincs külső erő, VAGY a külső erők eredője nulla. A második felét sokan lehagyják.'
    },
    {
      k: 'Mikor nevezünk egy ütközést tökéletesen rugalmasnak?',
      v: 'Ha az ütközésben résztvevő testek mozgási energiáinak összege az ütközés során nem változik.',
      forras: 'PróbaZH',
      trukk: 'Kulcsszó: a mozgási energiák ÖSSZEGE nem változik. Nem az egyes testek energiája marad ugyanannyi, hanem az összeg.'
    },
    {
      k: 'Egy lövedék lefékeződése a ballisztikus ingában tökéletesen rugalmas, vagy tökéletesen rugalmatlan ütközésnek tekinthető? Válaszát indokolja!',
      v: 'Tökéletesen rugalmatlannak tekinthető, mivel az ütközés végeztével a lövedék megáll a ballisztikus inga testében, azaz ugyanakkora sebességgel mozognak tovább.',
      forras: 'PróbaZH',
      trukk: 'Előbb a döntés (rugalmatlan), utána az indok: a lövedék bennmarad, ezért közös sebességgel mennek tovább. Indoklás nélkül a válasz nem teljes.'
    },
    {
      k: 'A Nap körül keringő Földet és Föld körül keringő Holdat tekintsünk három tömegpontból álló pontrendszernek. Mondjon két-két példát az említett pontrendszerrel kapcsolatos külső, illetve belső erőre!',
      v: 'A belső erők a rendszer egyes elemei között hatnak, pl. a Föld–Hold vagy a Nap–Hold gravitációs erők. A külső erők kívülről érik a rendszer egyes elemeit, pl. a Mars gravitációs ereje a Földre vagy a Holdra.',
      forras: 'MINTA vizsga',
      trukk: 'A rendszer tagjai: Nap, Föld, Hold. Ami köztük hat, az belső erő. Ami másik égitesttől jön (pl. a Marstól), az külső. Két-két példát kér a kérdés: a Mars ereje a Földre az egyik, a Holdra a másik külső példa.'
    }
  ],

  receptek: [
    {
      cim: 'Tökéletesen rugalmatlan ütközés',
      mikor: 'A testek az ütközés után együtt mozognak: összekapcsolódnak, a lövedék belefúródik vagy bennmarad.',
      lepesek: [
        'Jelölj ki pozitív irányt. A szembe jövő test sebessége negatív, az álló testé $0$.',
        'Írd fel a lendületmegmaradást: előtte két külön test, utána egy közös, $m_1+m_2$ tömegű test $v^{\\prime}$ sebességgel.',
        'Fejezd ki, amit kérdeznek: $v^{\\prime} = \\dfrac{m_1v_1+m_2v_2}{m_1+m_2}$, vagy ha a lövedék sebessége kell: $v_1 = \\dfrac{m_1+m_2}{m_1}\\,v^{\\prime}$.',
        'Ha energiaveszteséget kérnek: számold ki a mozgási energiát előtte ($E_k$) és utána ($E_v$), és hasonlítsd össze a kettőt.'
      ],
      tex: 'm_1 v_1 + m_2 v_2 = (m_1+m_2)\\,v^{\\prime}'
    },
    {
      cim: 'Tökéletesen rugalmas ütközés (két képlet)',
      mikor: 'A szöveg kimondja, hogy az ütközés (tökéletesen) rugalmas, és a két test külön mozog tovább.',
      lepesek: [
        'Írd ki az adatokat előjellel: $m_1$, $v_1$, $m_2$, $v_2$. Szemben mozgó testnél az egyik sebesség negatív.',
        'Írd le a két képletet betűkkel. A második az elsőből úgy jön ki, hogy az 1-es és 2-es indexet felcseréled.',
        'Helyettesíts be, és számold ki külön a két tagot.',
        'Értelmezd az előjelet: a negatív eredmény azt jelenti, hogy a test visszapattan (a negatív irányba megy).'
      ],
      tex: '\\begin{aligned} v_1^{\\prime} &= \\frac{m_1-m_2}{m_1+m_2}\\,v_1 + \\frac{2m_2}{m_1+m_2}\\,v_2 \\\\ v_2^{\\prime} &= \\frac{m_2-m_1}{m_1+m_2}\\,v_2 + \\frac{2m_1}{m_1+m_2}\\,v_1 \\end{aligned}'
    },
    {
      cim: 'Ballisztikus inga, lövedék és emelkedés',
      mikor: 'A lövedék bennmarad egy felfüggesztett (vagy alulról meglőtt) testben, és az kilendül vagy felemelkedik $h$ magasra.',
      lepesek: [
        'Bontsd két szakaszra: 1. ütközés (lendületmegmaradás), 2. lengés vagy emelkedés (energiamegmaradás).',
        'Ha szög van megadva, előbb számold ki a magasságot: $h = l(1-\\cos\\alpha)$.',
        'Emelkedés: $\\frac{1}{2}(m_1+m_2)v_0^2 = (m_1+m_2)gh$, ebből az ütközés utáni közös sebesség $v_0 = \\sqrt{2gh}$.',
        'Ütközés: $m_1v_1 = (m_1+m_2)v_0$, ebből $v_1$ kifejezhető.'
      ],
      tex: 'v_1 = \\frac{m_1+m_2}{m_1}\\sqrt{2gh},\\qquad h = l(1-\\cos\\alpha)'
    },
    {
      cim: 'Lövedék a hasábban, utána súrlódás',
      mikor: 'A lövedék bennmarad az asztalon fekvő hasábban, a hasáb pedig $s$ út megtétele után megáll.',
      lepesek: [
        'Két szakasz: 1. ütközés (lendületmegmaradás), 2. csúszás megállásig (munkatétel).',
        'Ütközés: $v^{\\prime} = \\dfrac{m_1v_1+m_2v_2}{m_1+m_2}$. Ez lesz a csúszás kezdősebessége: $v_0 = v^{\\prime}$.',
        'Csúszás: $-F_s\\cdot s = \\frac{1}{2}(m_1+m_2)v^2 - \\frac{1}{2}(m_1+m_2)v_0^2$, ahol a végsebesség $v = 0$.',
        'Ha a súrlódási erő a kérdés, $F_s$-t fejezed ki. Ha a lövedék sebessége, akkor visszafelé haladsz: előbb $v_0$, aztán $v_1$.'
      ],
      tex: 'F_s\\cdot s = \\frac{1}{2}(m_1+m_2)\\,v_0^2'
    },
    {
      cim: 'Lendületmegmaradás kocsin (ledobás, rácsúszás, szétlökés)',
      mikor: 'Egy kocsiról ledobnak valamit, egy test rácsúszik a kocsira, vagy két testet szétlök egy rugó, és a súrlódástól eltekintünk.',
      lepesek: [
        'Mondd ki: vízszintes irányban nincs külső erő, ezért a vízszintes össz-lendület megmarad.',
        'Írd fel az össz-lendületet az esemény előtt ($p_1$): minden test tömege szorozva a saját sebességével.',
        'Írd fel az esemény után ($p_2$). Minden sebességet a talajhoz képest adj meg: ha a test a kocsihoz képest $u$ sebességgel megy, akkor a talajhoz képest $v_{\\text{kocsi}}+u$.',
        'Tedd egyenlővé: $p_1 = p_2$, és fejezd ki az ismeretlen sebességet.'
      ],
      tex: 'p_1 = p_2'
    },
    {
      cim: 'Rakéta tolóereje',
      mikor: 'Adott a kiáramló gáz $u$ sebessége és a rakéta tömege; a kérdés a másodpercenként kiáramló gáz tömege.',
      lepesek: [
        'A gáz lendületváltozása $\\Delta t = 1\\,\\mathrm{s}$ alatt: $\\Delta p_{\\text{gáz}} = M_{\\text{gáz}}\\cdot u$. A rakétáé ugyanekkora.',
        'A tolóerő az időegységre jutó lendületváltozás: $F = \\dfrac{\\Delta p}{\\Delta t}$.',
        'A felemelkedés feltétele: a tolóerő legalább akkora, mint a rakéta súlya ($M_{\\text{rak}}\\cdot g$).',
        'Fejezd ki $M_{\\text{gáz}}$-t, és helyettesíts be.'
      ],
      tex: '\\frac{M_{\\text{gáz}}\\cdot u}{\\Delta t} \\geq M_{\\text{rak}}\\cdot g'
    }
  ],

  tippek: [
    'Előjelek: mindig jelölj ki pozitív irányt (pl. jobbra). A szembe mozgó test sebességét negatív előjellel írd be. Ha az eredmény negatív, a test a negatív irányba mozog.',
    'Rugalmas vagy rugalmatlan? „Belefúródik”, „bennmarad”, „összekapcsolódik” → rugalmatlan, egy közös sebesség. „Rugalmas”, „tökéletesen rugalmas” → a két kész képlet.',
    'Átváltás: $10\\,\\mathrm{g} = 0{,}01\\,\\mathrm{kg}$, $40\\,\\mathrm{cm/s} = 0{,}4\\,\\mathrm{m/s}$, $1\\,\\mathrm{t} = 1000\\,\\mathrm{kg}$. Az $\\frac{m_1+m_2}{m_1}$ hányadosba grammot is írhatsz (a tanár is így tesz: $\\frac{10+10000}{10}$), de akkor mindkét tömeget grammban.',
    'Ballisztikus inga = két szakasz. Ütközés: lendületmegmaradás. Lengés: energiamegmaradás. Az ütközésre ne energiát írj fel, mert az rugalmatlan.',
    'Szögből magasság: $h = l(1-\\cos\\alpha)$. A számológép legyen fok (DEG) módban. Ha a kitérés $90^{\\circ}$, akkor $h = l$.',
    'Tiki-taki inga = három szakasz: lengés lefelé (energia → $v_1$), rugalmas ütközés (két képlet), lengés felfelé (energia → magasság).',
    'A rugalmas képleteknél, ha az egyik test áll ($v_2 = 0$), a második tag kiesik. Ha a két tömeg egyenlő, a testek egyszerűen sebességet cserélnek.',
    'A teljes levezetést írd le: képlet betűkkel → behelyettesítés → eredmény mértékegységgel. A végén ellenőrizd: az össz-lendület előtte és utána ugyanannyi-e.'
  ],

  feladatok: [
    {
      id: 'zh6',
      cim: 'Utolérő golyó, rugalmas ütközés',
      forras: 'PróbaZH 6. feladat · 1,5 pont',
      zh: true,
      szoveg: '1 kg tömegű, 2 m/s sebességű golyót utolért egy 2 kg tömegű, 4 m/s sebességű golyó. Határozzuk meg a golyók rugalmas ütközés utáni sebességét!',
      adatok: ['m_1 = 1\\,\\mathrm{kg}', 'v_1 = 2\\,\\mathrm{m/s}', 'm_2 = 2\\,\\mathrm{kg}', 'v_2 = 4\\,\\mathrm{m/s}'],
      tipp: 'A két golyó ugyanabba az irányba megy, ezért mindkét sebesség pozitív. Rugalmas ütközés: a két kész képletet kell felírnod.',
      lepesek: [
        {
          cim: 'Melyik elvet használjuk',
          szoveg: 'Az ütközés rugalmas, tehát a két golyó külön mozog tovább, és a mozgási energiák összege nem változik. Erre az esetre van két kész képlet, ezeket használjuk. Az 1-es golyó a lassabb, elöl haladó, a 2-es az utolérő. Egy irányba mennek, ezért mindkét sebesség pozitív.'
        },
        {
          cim: 'Az első golyó sebessége',
          szoveg: 'Felírod a képletet betűkkel, aztán behelyettesítesz. A nevező mindkét tagban $m_1+m_2 = 3$.',
          tex: 'v_1^{\\prime} = \\frac{m_1-m_2}{m_1+m_2}\\,v_1 + \\frac{2m_2}{m_1+m_2}\\,v_2',
          be: 'v_1^{\\prime} = \\frac{1-2}{1+2}\\cdot 2 + \\frac{2\\cdot 2}{1+2}\\cdot 4 = -\\frac{2}{3} + \\frac{16}{3}',
          er: 'v_1^{\\prime} = 4{,}67\\,\\mathrm{m/s}'
        },
        {
          cim: 'A második golyó sebessége',
          szoveg: 'Ugyanaz a képlet, csak az 1-es és a 2-es index helyet cserél.',
          tex: 'v_2^{\\prime} = \\frac{m_2-m_1}{m_1+m_2}\\,v_2 + \\frac{2m_1}{m_1+m_2}\\,v_1',
          be: 'v_2^{\\prime} = \\frac{2-1}{1+2}\\cdot 4 + \\frac{2\\cdot 1}{1+2}\\cdot 2 = \\frac{4}{3} + \\frac{4}{3}',
          er: 'v_2^{\\prime} = 2{,}67\\,\\mathrm{m/s}'
        },
        {
          cim: 'Ellenőrzés lendülettel',
          szoveg: 'Ez nem része a tanári megoldásnak, de gyorsan kiszűri a számolási hibát: az össz-lendület előtte és utána ugyanannyi kell legyen.',
          tex: 'm_1v_1 + m_2v_2 = m_1v_1^{\\prime} + m_2v_2^{\\prime}',
          be: '1\\cdot 2 + 2\\cdot 4 = 10 \\qquad 1\\cdot 4{,}67 + 2\\cdot 2{,}67 = 10{,}01',
          er: '10\\,\\mathrm{kg\\,m/s} \\approx 10{,}01\\,\\mathrm{kg\\,m/s}',
          megj: 'A kis eltérés csak a kerekítésből jön.'
        }
      ],
      valasz: 'v_1^{\\prime} = 4{,}67\\,\\mathrm{m/s},\\quad v_2^{\\prime} = 2{,}67\\,\\mathrm{m/s}',
      megj: 'Mindkét eredmény pozitív: mindkét golyó az eredeti irányba megy tovább. Az elöl haladó golyó felgyorsul (2 → 4,67 m/s), az utolérő lelassul (4 → 2,67 m/s).'
    },
    {
      id: 'zh7',
      cim: 'Ballisztikus inga: homokzsák és puskagolyó',
      forras: 'PróbaZH 7. feladat · 2 pont',
      zh: true,
      szoveg: '10 kg tömegű homokzsák 2 m hosszú fonálon függ. Egy 10 g tömegű puskagolyó behatol a homokzsákba, és ennek hatására a fonál 10°-os szöggel kitér. Mekkora volt a golyó sebessége?',
      adatok: ['m_1 = 10\\,\\mathrm{g} = 0{,}01\\,\\mathrm{kg}', 'm_2 = 10\\,\\mathrm{kg} = 10000\\,\\mathrm{g}', 'l = 2\\,\\mathrm{m}', '\\alpha = 10^{\\circ}', 'g = 10\\,\\mathrm{m/s^2}'],
      tipp: 'Két szakasz van: a golyó becsapódik (ütközés), aztán a zsák a golyóval együtt kilendül. Visszafelé gondolkodj: a kitérésből megvan a magasság, abból a közös sebesség, abból a golyó sebessége.',
      lepesek: [
        {
          cim: 'Két szakaszra bontás',
          szoveg: 'A golyó bennmarad a zsákban, ez tökéletesen rugalmatlan ütközés: itt a lendület marad meg. Utána a zsák a golyóval együtt fellendül: itt a mechanikai energia marad meg. A közös sebességet közvetlenül az ütközés után $v_0$ jelöli.'
        },
        {
          cim: 'Lengés: energiamegmaradás',
          szoveg: 'Az ütközés utáni mozgási energia a legmagasabb ponton teljesen helyzeti energiává alakul. Az $(m_1+m_2)$ tömeg kiesik.',
          tex: '\\frac{1}{2}(m_1+m_2)\\,v_0^2 = (m_1+m_2)\\,g\\,h \\quad\\Rightarrow\\quad v_0 = \\sqrt{2gh}'
        },
        {
          cim: 'Ütközés: lendületmegmaradás',
          szoveg: 'Ütközés előtt csak a golyó mozog, utána a golyó és a zsák együtt megy $v_0$ sebességgel. Ebből kifejezed a golyó $v_1$ sebességét, és beírod a $v_0 = \\sqrt{2gh}$ eredményt.',
          tex: 'm_1 v_1 = (m_1+m_2)\\,v_0 \\quad\\Rightarrow\\quad v_1 = \\frac{m_1+m_2}{m_1}\\,v_0 = \\frac{m_1+m_2}{m_1}\\sqrt{2gh}'
        },
        {
          cim: 'Emelkedés a szögből',
          szoveg: 'A magasság nincs megadva, csak a szög. A kitért zsák $l\\cos\\alpha$ mélyen van a felfüggesztés alatt, eredetileg $l$ mélyen volt. A különbség az emelkedés.',
          tex: 'h = l\\,(1-\\cos\\alpha)',
          be: 'h = 2\\cdot(1-\\cos 10^{\\circ})',
          er: 'h = 0{,}03\\,\\mathrm{m}'
        },
        {
          cim: 'A golyó sebessége',
          szoveg: 'Most már minden adat megvan. A tömegek hányadosába a tanár grammban ír be mindent ($10\\,\\mathrm{g}$ és $10000\\,\\mathrm{g}$), ez így rendben van, mert a mértékegység kiesik.',
          tex: 'v_1 = \\frac{m_1+m_2}{m_1}\\sqrt{2gh}',
          be: 'v_1 = \\frac{10+10000}{10}\\cdot\\sqrt{20\\cdot 0{,}03}',
          er: 'v_1 = 775\\,\\mathrm{m/s}'
        }
      ],
      valasz: 'v_1 = 775\\,\\mathrm{m/s}',
      megj: 'A tanár a kerekített $h = 0{,}03\\,\\mathrm{m}$ értékkel számol, így jön ki a 775 m/s. Kerekítés nélkül $h = 0{,}0304\\,\\mathrm{m}$, ezzel $v_1 \\approx 780\\,\\mathrm{m/s}$ (saját számolás). A tanári megoldásban 775 m/s szerepel.'
    },
    {
      id: 'zh8',
      cim: 'Pályakocsiról lelökött síndarab',
      forras: 'PróbaZH 8. feladat · 1,5 pont',
      zh: true,
      szoveg: 'A rakománnyal együtt 1 tonna tömegű vasúti pályakocsi vízszintes pályán 10 m/s sebességgel halad. Mozgás közben a kocsin ülő emberek lelöknek egy 100 kg tömegű síndarabot, amely függőlegesen esik a talpfákra. Mekkora sebességgel halad tovább a pályakocsi, ha a súrlódástól eltekintünk?',
      adatok: ['M = 1\\,\\mathrm{t} = 1000\\,\\mathrm{kg}', 'm = 100\\,\\mathrm{kg}', 'v_1 = 10\\,\\mathrm{m/s}'],
      tipp: 'Írd fel a kocsi és a síndarab együttes lendületét a ledobás előtt és után. A függőlegesen eső sín mozgásirányú sebessége nulla.',
      lepesek: [
        {
          cim: 'Melyik elvet használjuk',
          szoveg: 'A súrlódástól eltekintünk, tehát a mozgás irányában nem hat külső erő a kocsi + síndarab rendszerre. Ezért a mozgásirányú össz-lendület megmarad. A tanár jelölése: $M$ a kocsi, $m$ a síndarab tömege.'
        },
        {
          cim: 'Lendület a ledobás előtt',
          szoveg: 'A ledobás előtt a kocsi és rajta a síndarab együtt megy $v_1$ sebességgel.',
          tex: 'p_1 = (M+m)\\cdot v_1',
          be: 'p_1 = (1000+100)\\cdot 10',
          er: 'p_1 = 11000\\,\\mathrm{kg\\,m/s}'
        },
        {
          cim: 'Lendület a ledobás után',
          szoveg: 'A síndarab függőlegesen esik a talpfákra, tehát a mozgásirányú sebessége $0$. Így csak a kocsinak marad mozgásirányú lendülete, az új $v_2$ sebességgel.',
          tex: 'p_2 = M\\cdot v_2 + m\\cdot 0',
          be: 'p_2 = 1000\\cdot v_2'
        },
        {
          cim: 'A két lendület egyenlő',
          szoveg: 'A lendületmegmaradás törvénye értelmében a két lendület egyenlő. Ebből $v_2$ egy osztással kijön.',
          tex: 'p_1 = p_2',
          be: '11000 = 1000\\cdot v_2',
          er: 'v_2 = 11\\,\\mathrm{m/s}'
        }
      ],
      valasz: 'v_2 = 11\\,\\mathrm{m/s}',
      megj: 'A kocsi gyorsul, mert a síndarab a lendületét „otthagyja” a kocsinak. Figyelem: a szöveg szerint az 1 tonna a rakománnyal együtt értendő, a tanár viszont a kocsit $M = 1000\\,\\mathrm{kg}$-nak veszi, és ehhez adja hozzá a $100\\,\\mathrm{kg}$-os síndarabot (összesen 1100 kg). Ha az 1 tonnában a sín is benne van, akkor $1000\\cdot 10 = 900\\cdot v_2$, vagyis $v_2 \\approx 11{,}1\\,\\mathrm{m/s}$ (saját számolás). A tanári megoldás eredménye 11 m/s.'
    },
    {
      id: 'gyf-rl1',
      cim: 'Összekapcsolódó vasúti kocsik',
      forras: 'GYF Tökéletesen rugalmatlan ütközések 1. · tanári megoldás',
      szoveg: 'Kocsi rendezésnél $m_1$ tömegű, $v_1$ sebességgel haladó vasúti kocsi $m_2$ tömegű nyugvó kocsiba ütközik. Az ütközésnél az automatikusan működő kapcsoló a két kocsit összekapcsolja. Milyen sebességgel mozog az összekapcsolódott két kocsi? Mennyi az ütközés során fellépő energiaveszteség? ($m_1=m_2$, $v_1=1{,}2\\,\\mathrm{m/s}$)',
      adatok: ['m_1 = m', 'm_2 = m', 'v_1 = 1{,}2\\,\\mathrm{m/s}', 'v_2 = 0'],
      tipp: 'A kocsik összekapcsolódnak, tehát közös sebességgel mennek tovább. A tömeget nem ismered, de mindenhol kiesik.',
      lepesek: [
        {
          cim: 'Melyik elvet használjuk',
          szoveg: 'A két kocsi összekapcsolódik, ez tökéletesen rugalmatlan ütközés: utána egy közös $v^{\\prime}$ sebességük van. Az ütközésre a lendületmegmaradást írjuk fel.',
          tex: 'm_1 v_1 + m_2 v_2 = (m_1+m_2)\\cdot v^{\\prime}'
        },
        {
          cim: 'A közös sebesség',
          szoveg: 'Kifejezed $v^{\\prime}$-t, és beírod, hogy mindkét tömeg $m$, a második kocsi pedig áll. Az $m$ kiesik.',
          tex: 'v^{\\prime} = \\frac{m_1 v_1 + m_2 v_2}{m_1+m_2}',
          be: 'v^{\\prime} = \\frac{1{,}2\\,m + 0\\cdot m}{2m}',
          er: 'v^{\\prime} = 0{,}6\\,\\mathrm{m/s}'
        },
        {
          cim: 'Mozgási energia előtte és utána',
          szoveg: 'Az ütközés előtt csak az első kocsi mozog ($E_k$, kezdeti energia). Utána a két kocsi együtt, $2m$ tömeggel megy $v^{\\prime}$ sebességgel ($E_v$, végső energia).',
          tex: 'E_k = \\frac{1}{2}\\,m\\,v_1^2 \\qquad E_v = \\frac{1}{2}\\cdot 2m\\cdot v^{\\prime 2}'
        },
        {
          cim: 'A két energia aránya',
          szoveg: 'Mivel a tömeg ismeretlen, a tanár az arányt számolja ki: a végső energia hányad része a kezdetinek. Az $m$ itt is kiesik.',
          tex: '\\frac{E_v}{E_k} = \\frac{2m\\,v^{\\prime 2}}{m\\,v_1^2}',
          be: '\\frac{E_v}{E_k} = 2\\cdot\\left(\\frac{0{,}6}{1{,}2}\\right)^2',
          er: '\\frac{E_v}{E_k} = 0{,}5 \\quad (50\\,\\%)'
        }
      ],
      valasz: 'v^{\\prime} = 0{,}6\\,\\mathrm{m/s},\\quad \\frac{E_v}{E_k} = 0{,}5\\ (50\\,\\%)',
      megj: 'Az arány azt jelenti, hogy a mozgási energiának csak a fele marad meg, a másik fele (50%) az ütközésben elvész. Joule-ban: $E_k - E_v = 0{,}72\\,m - 0{,}36\\,m = 0{,}36\\,m$, ahol $m$ a kocsi tömege kg-ban (saját számolás).'
    },
    {
      id: 'gyf-rg3',
      cim: 'Szemben mozgó golyók rugalmas ütközése',
      forras: 'GYF Tökéletesen rugalmas ütközések 3. · tanári megoldás',
      szoveg: 'Két tökéletesen rugalmas golyó egymással szemben mozog. Az egyik tömege 2 kg, sebessége 8 m/s, a másik tömege 3 kg, sebessége 6 m/s. Határozza meg a centrális ütközés utáni sebességüket!',
      adatok: ['m_1 = 2\\,\\mathrm{kg}', 'v_1 = 8\\,\\mathrm{m/s}', 'm_2 = 3\\,\\mathrm{kg}', 'v_2 = -6\\,\\mathrm{m/s}'],
      tipp: 'A golyók szemben mozognak, ezért az egyik sebességet negatív előjellel kell beírni. Utána a két rugalmas képlet jön.',
      lepesek: [
        {
          cim: 'Irány és elv',
          szoveg: 'Az ütközés tökéletesen rugalmas, tehát a két kész képletet használjuk. A pozitív irány legyen az első golyó mozgásiránya. A második golyó szembe jön, ezért az ő sebessége negatív: $v_2 = -6\\,\\mathrm{m/s}$.'
        },
        {
          cim: 'Az első golyó sebessége',
          szoveg: 'Behelyettesítesz a képletbe. Figyelj: a második tagban a $v_2$ negatív, ezért az egész tag negatív lesz.',
          tex: 'v_1^{\\prime} = \\frac{m_1-m_2}{m_1+m_2}\\,v_1 + \\frac{2m_2}{m_1+m_2}\\,v_2',
          be: 'v_1^{\\prime} = \\frac{2-3}{5}\\cdot 8 - \\frac{6}{5}\\cdot 6 = -\\frac{8}{5} - \\frac{36}{5}',
          er: 'v_1^{\\prime} = -8{,}8\\,\\mathrm{m/s}'
        },
        {
          cim: 'A második golyó sebessége',
          szoveg: 'A másik képlet, felcserélt indexekkel. Itt az első tag lesz negatív a $v_2$ előjele miatt.',
          tex: 'v_2^{\\prime} = \\frac{m_2-m_1}{m_1+m_2}\\,v_2 + \\frac{2m_1}{m_1+m_2}\\,v_1',
          be: 'v_2^{\\prime} = -\\frac{3-2}{5}\\cdot 6 + \\frac{4}{5}\\cdot 8 = -\\frac{6}{5} + \\frac{32}{5} = \\frac{26}{5}',
          er: 'v_2^{\\prime} = 5{,}2\\,\\mathrm{m/s}'
        },
        {
          cim: 'Az előjelek értelmezése',
          szoveg: 'Az első golyó sebessége negatív lett: visszapattan, az eredeti irányával ellentétesen megy $8{,}8\\,\\mathrm{m/s}$-mal. A másodiké pozitív lett: ő is megfordul, és $5{,}2\\,\\mathrm{m/s}$-mal megy. Ellenőrzés lendülettel (saját ellenőrzés): előtte és utána is $-2\\,\\mathrm{kg\\,m/s}$.',
          tex: 'm_1v_1 + m_2v_2 = m_1v_1^{\\prime} + m_2v_2^{\\prime}',
          be: '2\\cdot 8 + 3\\cdot(-6) = -2 \\qquad 2\\cdot(-8{,}8) + 3\\cdot 5{,}2 = -2'
        }
      ],
      valasz: 'v_1^{\\prime} = -8{,}8\\,\\mathrm{m/s},\\quad v_2^{\\prime} = 5{,}2\\,\\mathrm{m/s}',
      megj: 'Mindkét golyó visszapattan: mindkettő sebességének előjele megfordult az ütközés előttihez képest.'
    },
    {
      id: 'gyf-rl5',
      cim: 'Lövedék a hasábban, csúszás megállásig',
      forras: 'GYF Tökéletesen rugalmatlan ütközések 5. · tanári megoldás',
      szoveg: 'Tegyük fel, hogy 0,70 N erő szükséges ahhoz, hogy az 5 kg tömegű hasábot állandó sebességgel végigtoljuk az asztalon. Egy 20 g tömegű lövedék a hasábba csapódik és benn is marad. Mekkora volt a sebessége, ha a becsapódás után a hasáb 1,5 m-t csúszik a megállásig?',
      adatok: ['F = 0{,}70\\,\\mathrm{N}', 'm_1 = 20\\,\\mathrm{g} = 0{,}02\\,\\mathrm{kg}', 'm_2 = 5\\,\\mathrm{kg}', 'v_2 = 0', 's = 1{,}5\\,\\mathrm{m}'],
      tipp: 'Visszafelé haladj: a csúszás hosszából megvan a hasáb sebessége közvetlenül a becsapódás után, abból pedig a lövedék sebessége. Előbb azonban kell a súrlódási erő.',
      lepesek: [
        {
          cim: 'Két szakaszra bontás',
          szoveg: 'Először a lövedék becsapódik és bennmarad: ez tökéletesen rugalmatlan ütközés, itt a lendület marad meg. Utána a hasáb a lövedékkel együtt csúszik, és a súrlódás megállítja: ide a munkatétel kell. A csúszás $v_0$ kezdősebessége ugyanaz, mint az ütközés utáni közös $v^{\\prime}$ sebesség.'
        },
        {
          cim: 'A súrlódási erő',
          szoveg: 'Ha a hasábot állandó sebességgel toljuk, a gyorsulása nulla. Ekkor a tolóerő éppen kiegyenlíti a súrlódási erőt.',
          tex: 'v = \\text{áll.} \\;\\Rightarrow\\; a = 0 \\;\\Rightarrow\\; F_s = F',
          er: 'F_s = 0{,}7\\,\\mathrm{N}'
        },
        {
          cim: 'Munkatétel a csúszásra',
          szoveg: 'A súrlódási erő munkája negatív, és ez egyenlő a mozgási energia megváltozásával. A végén a hasáb áll ($v = 0$), ezért az első tag nulla. Ebből kifejezed a $v_0$ kezdősebességet.',
          tex: '-F_s\\cdot s = \\frac{1}{2}(m_1+m_2)\\,v^2 - \\frac{1}{2}(m_1+m_2)\\,v_0^2 \\quad\\Rightarrow\\quad v_0 = \\sqrt{\\frac{2\\cdot F_s\\cdot s}{m_1+m_2}}',
          be: 'v_0 = \\sqrt{\\frac{2\\cdot 0{,}7\\cdot 1{,}5}{5{,}02}}',
          er: 'v_0 = 0{,}65\\,\\mathrm{m/s}'
        },
        {
          cim: 'Ütközés: a lövedék sebessége',
          szoveg: 'Az ütközésre a lendületmegmaradás igaz. A hasáb előtte állt ($v_2 = 0$), a közös sebesség pedig $v^{\\prime} = v_0 = 0{,}65\\,\\mathrm{m/s}$. Ebből kifejezed $v_1$-et.',
          tex: 'v^{\\prime} = \\frac{m_1 v_1 + m_2 v_2}{m_1+m_2} \\quad\\Rightarrow\\quad v_1 = \\frac{m_1+m_2}{m_1}\\cdot v^{\\prime}',
          be: 'v_1 = \\frac{5{,}02}{0{,}02}\\cdot 0{,}65',
          er: 'v_1 = 163\\,\\mathrm{m/s}'
        }
      ],
      valasz: 'v_1 = 163\\,\\mathrm{m/s}',
      megj: 'A tanár a kerekített $v_0 = 0{,}65\\,\\mathrm{m/s}$ értékkel számol tovább, így jön ki a 163 m/s. Kerekítés nélkül $v_0 = 0{,}647\\,\\mathrm{m/s}$, ezzel $v_1 \\approx 162\\,\\mathrm{m/s}$ (saját számolás). Mindkettő elfogadható, a különbség csak kerekítés.'
    },
    {
      id: 'gyf-rl6',
      cim: 'Alulról meglőtt test emelkedése',
      forras: 'GYF Tökéletesen rugalmatlan ütközések 6. · tanári megoldás',
      szoveg: 'Egy 2 kg tömegű test nyugszik egy asztalon egy kisméretű lyuk fölött. A lyukon keresztül egy 15,0 g tömegű lövedéket lövünk a hasábba, amely benne marad. Mekkora a lövedék sebessége, ha a hasáb 1,30 m magasra emelkedik?',
      adatok: ['m_1 = 15\\,\\mathrm{g} = 0{,}015\\,\\mathrm{kg}', 'm_2 = 2\\,\\mathrm{kg} = 2000\\,\\mathrm{g}', 'v_2 = 0', 'h = 1{,}30\\,\\mathrm{m}', 'g = 10\\,\\mathrm{m/s^2}'],
      tipp: 'Ugyanaz a gondolat, mint a ballisztikus ingánál, csak függőlegesen: ütközés (lendület), utána emelkedés (energia).',
      lepesek: [
        {
          cim: 'Ütközés: lendületmegmaradás',
          szoveg: 'A lövedék bennmarad a testben, ez tökéletesen rugalmatlan ütközés. A lendület megmarad: előtte csak a lövedék mozog, utána a test és a lövedék együtt megy felfelé $v^{\\prime}$ sebességgel.',
          tex: 'm_1 v_1 = (m_1+m_2)\\,v^{\\prime} \\quad\\Rightarrow\\quad v^{\\prime} = \\frac{m_1 v_1}{m_1+m_2}'
        },
        {
          cim: 'Emelkedés: energiamegmaradás',
          szoveg: 'Az ütközés után a test a lövedékkel együtt felfelé repül, és $h$ magasságban megáll. A mozgási energia teljesen helyzeti energiává alakul. Az $(m_1+m_2)$ kiesik.',
          tex: '\\frac{1}{2}(m_1+m_2)\\,v^{\\prime 2} = (m_1+m_2)\\,g\\,h \\quad\\Rightarrow\\quad v^{\\prime} = \\sqrt{2gh}'
        },
        {
          cim: 'A két eredmény összekapcsolása',
          szoveg: 'A $v^{\\prime}$-re két kifejezésed van, ezek egyenlők. Ebből kifejezed a lövedék $v_1$ sebességét.',
          tex: '\\frac{m_1 v_1}{m_1+m_2} = \\sqrt{2gh} \\quad\\Rightarrow\\quad v_1 = \\frac{m_1+m_2}{m_1}\\sqrt{2gh}'
        },
        {
          cim: 'Behelyettesítés',
          szoveg: 'A tömegek hányadosába grammban írsz be mindent ($15\\,\\mathrm{g}$ és $2000\\,\\mathrm{g}$), a gyök alá SI-ben.',
          tex: 'v_1 = \\frac{m_1+m_2}{m_1}\\sqrt{2gh}',
          be: 'v_1 = \\frac{2015}{15}\\cdot\\sqrt{2\\cdot 10\\cdot 1{,}3}',
          er: 'v_1 = 685\\,\\mathrm{m/s}'
        }
      ],
      valasz: 'v_1 = 685\\,\\mathrm{m/s}',
      megj: 'Részeredmény, ha külön is ki akarod számolni: $v^{\\prime} = \\sqrt{26} \\approx 5{,}1\\,\\mathrm{m/s}$ (saját számolás).'
    },
    {
      id: 'gyf-pr4',
      cim: 'Kiskocsira rácsúszó test',
      forras: 'GYF Pontrendszerek 4. · tanári megoldás',
      szoveg: 'Megfelelően hajlított lejtőről vízszintes irányú $v_1=3\\,\\mathrm{m/s}$ sebességgel $m_1$ tömegű test csúszik rá a nyugalomban levő $m_2=2m_1$ tömegű kiskocsi lapjára. Mekkora sebességet ér el a kiskocsi, ha elég hosszú ahhoz, hogy a test a kocsiról ne csússzon le? Mekkora sebességet ér el a kiskocsi, ha a test a kiskocsit a kocsihoz viszonyított $u=1{,}2\\,\\mathrm{m/s}$ sebességgel hagyja el. A kocsi a talajon ellenállás nélkül mozoghat.',
      adatok: ['v_1 = 3\\,\\mathrm{m/s}', 'm_2 = 2m_1', 'u = 1{,}2\\,\\mathrm{m/s}'],
      tipp: 'Mindkét kérdésnél a test + kocsi össz-lendülete marad meg. A B) részben a test sebességét a talajhoz képest kell felírni: kocsi sebessége + $u$.',
      lepesek: [
        {
          cim: 'Melyik elvet használjuk',
          szoveg: 'A kocsi ellenállás nélkül mozoghat, ezért a test + kocsi rendszerre vízszintesen nem hat külső erő. A vízszintes össz-lendület megmarad. Kezdetben csak a test mozog, a lendület $m_1 v_1$.'
        },
        {
          cim: 'A) A test a kocsin marad',
          szoveg: 'Ha a test nem csúszik le, a végén a kocsival együtt, közös $V$ sebességgel megy. Ez olyan, mint egy tökéletesen rugalmatlan ütközés. Beírod, hogy $m_2 = 2m_1$, így $m_1+m_2 = 3m_1$, és az $m_1$ kiesik.',
          tex: 'm_1 v_1 = (m_1+m_2)\\cdot V \\quad\\Rightarrow\\quad V = \\frac{m_1}{m_1+m_2}\\cdot v_1',
          be: 'V = \\frac{m_1}{3m_1}\\cdot v_1 = \\frac{v_1}{3} = \\frac{3}{3}',
          er: 'V = 1\\,\\mathrm{m/s}'
        },
        {
          cim: 'B) A test elhagyja a kocsit',
          szoveg: 'Most a kocsi sebessége a végén $v_2^{\\prime}$. A test a kocsihoz képest $u$ sebességgel megy előre, tehát a talajhoz képest $v_2^{\\prime}+u$ a sebessége. A lendületmegmaradásba ezt kell beírni.',
          tex: 'm_1 v_1 = m_2 v_2^{\\prime} + m_1\\,(v_2^{\\prime} + u)'
        },
        {
          cim: 'B) Behelyettesítés és rendezés',
          szoveg: 'Beírod a számokat és azt, hogy $m_2 = 2m_1$. Az $1{,}2\\,m_1$ tagot átviszed a bal oldalra, a jobb oldalon összevonod a $v_2^{\\prime}$-s tagokat. Az $m_1$ kiesik.',
          tex: '3m_1 = 2m_1 v_2^{\\prime} + m_1 v_2^{\\prime} + 1{,}2\\,m_1 \\quad\\Rightarrow\\quad 1{,}8\\,m_1 = 3m_1 v_2^{\\prime}',
          be: 'v_2^{\\prime} = \\frac{1{,}8}{3}',
          er: 'v_2^{\\prime} = 0{,}6\\,\\mathrm{m/s}'
        }
      ],
      valasz: 'V = 1\\,\\mathrm{m/s},\\quad v_2^{\\prime} = 0{,}6\\,\\mathrm{m/s}',
      megj: 'A B) esetben a kocsi lassabb (0,6 m/s), mert a test a kocsinál gyorsabban megy tovább ($0{,}6+1{,}2 = 1{,}8\\,\\mathrm{m/s}$), és több lendületet visz magával. Ellenőrzés (saját számolás): $2m_1\\cdot 0{,}6 + m_1\\cdot 1{,}8 = 3m_1$, ami egyezik a kezdeti $m_1\\cdot 3$ lendülettel.'
    },
    {
      id: 'gyf-pr3',
      cim: 'Rakéta: mennyi gáz kell másodpercenként',
      forras: 'GYF Pontrendszerek 3. · tanári megoldás',
      szoveg: 'Rakéta hajtóművéből $u=2000\\,\\mathrm{m/s}$ sebességgel áramlik ki a hajtógáz. Másodpercenként hány kg gáz kiáramlása szükséges, hogy az $M_{\\text{rakéta}}=12000\\,\\mathrm{kg}$ tömegű rakéta felemelkedhessék?',
      adatok: ['u = 2000\\,\\mathrm{m/s}', 'M_{\\text{rak}} = 12000\\,\\mathrm{kg}', '\\Delta t = 1\\,\\mathrm{s}', 'g = 10\\,\\mathrm{m/s^2}'],
      tipp: 'A tolóerő az 1 másodperc alatt kiáramló gáz lendületéből jön. Ennek legalább akkorának kell lennie, mint a rakéta súlya.',
      lepesek: [
        {
          cim: 'A gáz lendületváltozása',
          szoveg: 'Itt a lendület a kulcs. Az 1 másodperc alatt kiáramló $M_{\\text{gáz}}$ tömegű gáz $u$ sebességre tesz szert, tehát ennyi a lendületváltozása. A rakéta lendületváltozása ugyanekkora (ellentétes irányban).',
          tex: '\\Delta p_{\\text{gáz}} = M_{\\text{gáz}}\\cdot u \\qquad \\Delta p_{\\text{rakéta}} = \\Delta p_{\\text{gáz}}'
        },
        {
          cim: 'A tolóerő',
          szoveg: 'A rakétára ható erő az időegységre jutó lendületváltozás. Az idő itt $1\\,\\mathrm{s}$, mert a másodpercenkénti gáztömeget keressük.',
          tex: 'F_{\\text{rakéta}} = \\frac{\\Delta p_{\\text{rak}}}{\\Delta t} = \\frac{M_{\\text{gáz}}\\cdot u}{1\\,\\mathrm{s}}'
        },
        {
          cim: 'A felemelkedés feltétele',
          szoveg: 'A rakéta akkor tud felemelkedni, ha a tolóerő legalább akkora, mint a súlya. Ebből kifejezed a gáz tömegét.',
          tex: '\\frac{M_{\\text{gáz}}\\cdot u}{1\\,\\mathrm{s}} \\geq M_{\\text{rak}}\\cdot g \\quad\\Rightarrow\\quad M_{\\text{gáz}} \\geq \\frac{M_{\\text{rak}}\\cdot g\\cdot 1\\,\\mathrm{s}}{u}'
        },
        {
          cim: 'Behelyettesítés',
          szoveg: 'A számlálóban és a nevezőben három-három nullával egyszerűsíthetsz.',
          tex: 'M_{\\text{gáz}} \\geq \\frac{M_{\\text{rak}}\\cdot g\\cdot 1\\,\\mathrm{s}}{u}',
          be: 'M_{\\text{gáz}} \\geq \\frac{12000\\cdot 10}{2000}',
          er: 'M_{\\text{gáz}} \\geq 60\\,\\mathrm{kg}'
        }
      ],
      valasz: 'M_{\\text{gáz}} \\geq 60\\,\\mathrm{kg}\\ \\text{(másodpercenként)}',
      megj: 'Tehát másodpercenként legalább 60 kg gáznak kell kiáramlania.'
    },
    {
      id: 'gyf-pr2',
      cim: 'Tiki-taki inga rugalmas ütközéssel',
      forras: 'GYF Pontrendszerek 2. · tanári megoldás',
      szoveg: 'Egymás mellett azonos $l$ hosszúságú könnyű rúdra felfüggesztett $m_1$ ill. $m_2$ tömegű golyók egymást érik (tiki-taki). Az $m_1$ tömegű golyót 90°-kal kitérített helyzetből elengedve, a két golyó tökéletesen rugalmasan ütközik. Milyen magasra emelkedik a megütött ill. az ütköző golyó? ($m_1=2m_2$)',
      adatok: ['m_1 = 2m_2', 'v_2 = 0', '\\alpha = 90^{\\circ} \\;\\Rightarrow\\; h = l'],
      tipp: 'Három szakasz: az $m_1$ golyó lelendül (energia), ütközik (rugalmas képletek), aztán mindkét golyó fellendül (energia). Számok nincsenek, mindent $l$-lel fejezz ki.',
      lepesek: [
        {
          cim: 'Lelendülés: energiamegmaradás',
          szoveg: 'Az $m_1$ golyó $90^{\\circ}$-os kitérésből indul, tehát $l$ magasról lendül le. A helyzeti energiája az alsó pontig mozgási energiává alakul. Ebből megvan az ütközés előtti $v_1$ sebessége. A másik golyó áll: $v_2 = 0$.',
          tex: 'm_1\\,g\\,l = \\frac{1}{2}\\,m_1 v_1^2 \\quad\\Rightarrow\\quad v_1 = \\sqrt{2gl}'
        },
        {
          cim: 'Az ütköző golyó sebessége',
          szoveg: 'Az ütközés tökéletesen rugalmas, ezért a rugalmas képletet használod. Mivel $v_2 = 0$, a második tag kiesik. Beírod, hogy $m_1 = 2m_2$.',
          tex: 'v_1^{\\prime} = \\frac{m_1-m_2}{m_1+m_2}\\cdot v_1',
          be: 'v_1^{\\prime} = \\frac{2m_2-m_2}{3m_2}\\cdot v_1',
          er: 'v_1^{\\prime} = \\frac{1}{3}\\,v_1'
        },
        {
          cim: 'A megütött golyó sebessége',
          szoveg: 'A másik rugalmas képlet, szintén $v_2 = 0$-val.',
          tex: 'v_2^{\\prime} = \\frac{2m_1}{m_1+m_2}\\cdot v_1',
          be: 'v_2^{\\prime} = \\frac{4m_2}{3m_2}\\cdot v_1',
          er: 'v_2^{\\prime} = \\frac{4}{3}\\,v_1'
        },
        {
          cim: 'Az ütköző golyó emelkedése',
          szoveg: 'Az ütközés után az $m_1$ golyó mozgási energiája helyzeti energiává alakul. A tömeg kiesik. A végén beírod, hogy $v_1^2 = 2gl$, így a $g$ is kiesik.',
          tex: 'm_1\\,g\\,h_1^{\\prime} = \\frac{1}{2}\\,m_1 v_1^{\\prime 2} \\quad\\Rightarrow\\quad h_1^{\\prime} = \\frac{v_1^{\\prime 2}}{2g}',
          be: 'h_1^{\\prime} = \\frac{1}{2g}\\cdot\\frac{1}{9}\\,v_1^2 = \\frac{1}{18g}\\cdot 2gl',
          er: 'h_1^{\\prime} = \\frac{1}{9}\\,l'
        },
        {
          cim: 'A megütött golyó emelkedése',
          szoveg: 'Ugyanez az $m_2$ golyóra, a $v_2^{\\prime} = \\frac{4}{3}v_1$ sebességgel. A négyzetre emelésnél $\\left(\\frac{4}{3}\\right)^2 = \\frac{16}{9}$.',
          tex: 'm_2\\,g\\,h_2^{\\prime} = \\frac{1}{2}\\,m_2 v_2^{\\prime 2} \\quad\\Rightarrow\\quad h_2^{\\prime} = \\frac{v_2^{\\prime 2}}{2g}',
          be: 'h_2^{\\prime} = \\frac{1}{2g}\\cdot\\frac{16}{9}\\,v_1^2 = \\frac{16}{18g}\\cdot 2gl',
          er: 'h_2^{\\prime} = \\frac{16}{9}\\,l'
        }
      ],
      valasz: 'h_1^{\\prime} = \\frac{1}{9}\\,l,\\quad h_2^{\\prime} = \\frac{16}{9}\\,l',
      megj: 'Az ütköző ($m_1$) golyó $\\frac{1}{9}l$, a megütött ($m_2$) golyó $\\frac{16}{9}l$ magasra emelkedik. Ne lepődj meg, hogy $h_2^{\\prime}$ nagyobb, mint $l$: a golyó rúdon függ, így a felfüggesztés szintje fölé is fellendülhet (saját megjegyzés). Energia-ellenőrzés $m_1 = 2m_2$-vel (saját számolás): $2m_2\\,g\\,l = 2m_2\\,g\\cdot\\frac{l}{9} + m_2\\,g\\cdot\\frac{16\\,l}{9}$, mert $\\frac{2}{9}+\\frac{16}{9} = 2$. A tanár lapján az $m_2 g h_2^{\\prime} = \\frac{1}{2}m_2 v_2^{\\prime}$ sorból lemaradt a négyzet, de a következő sorban már helyesen, négyzettel számol.'
    }
  ],

  gyakorlo: [
    {
      id: 'gy-pr1',
      forras: 'GYF Pontrendszerek 1. · végeredmény a feladatsorból',
      szoveg: 'Sík talajon álló $m_1=0{,}2\\,\\mathrm{kg}$, illetve $m_2=0{,}3\\,\\mathrm{kg}$ tömegű kiskocsik közé összenyomott rugót helyezünk, és a kocsikat fonállal egymáshoz kötjük. Az összekötő fonalat elégetve, a rugó a kocsikat szétlöki, és ezek egymástól $t=5\\,\\mathrm{s}$ alatt $l=0{,}6\\,\\mathrm{m}$ távolságra jutnak. Mekkora sebességhez jutottak a kocsik? Mennyi energia tárolódott az összenyomott rugóban?',
      valasz: 'v_1 = 7{,}2\\,\\mathrm{cm/s},\\quad v_2 = 4{,}8\\,\\mathrm{cm/s},\\quad E = 8{,}64\\cdot 10^{-4}\\,\\mathrm{J}',
      tipp: 'Lendületmegmaradás kocsin (szétlökés): kezdetben minden áll, ezért $m_1v_1 = m_2v_2$. A kocsik távolodnak egymástól, így $v_1+v_2 = \\frac{l}{t}$. A rugó energiája a két kocsi mozgási energiájának összege.'
    },
    {
      id: 'gy-rg1',
      forras: 'GYF Tökéletesen rugalmas ütközések 1. · tanári megoldás',
      szoveg: '$m_1=0{,}2\\,\\mathrm{kg}$ tömegű, $v_1=2\\,\\mathrm{m/s}$ sebességgel haladó golyó $m_2=0{,}3\\,\\mathrm{kg}$ tömegű nyugvó golyóba ütközik. Az ütközés tökéletesen rugalmas. Számítsuk ki a golyók ütközés utáni sebességét.',
      valasz: 'v_1^{\\prime} = -0{,}4\\,\\mathrm{m/s},\\quad v_2^{\\prime} = 1{,}6\\,\\mathrm{m/s}',
      tipp: 'Rugalmas ütközés két képlettel. Mivel $v_2 = 0$, mindkét képletből csak a $v_1$-es tag marad. A negatív $v_1^{\\prime}$ azt jelenti, hogy a könnyebb golyó visszapattan.'
    },
    {
      id: 'gy-rg2',
      forras: 'GYF Tökéletesen rugalmas ütközések 2. · tanári megoldás',
      szoveg: 'Egy 0,4 kg tömegű, 3 m/s sebességű test tökéletesen rugalmasan és centrálisan ütközik egy kezdetben nyugvó 0,6 kg tömegű testtel. Határozzuk meg a testek ütközés utáni sebességét!',
      valasz: 'v_1^{\\prime} = -0{,}6\\,\\mathrm{m/s},\\quad v_2^{\\prime} = 2{,}4\\,\\mathrm{m/s}',
      tipp: 'Rugalmas ütközés két képlettel, $v_2 = 0$. Itt $m_1+m_2 = 1\\,\\mathrm{kg}$, ezért a nevezővel nem is kell számolni.'
    },
    {
      id: 'gy-rg4',
      forras: 'GYF Tökéletesen rugalmas ütközések 4. · tanári megoldás',
      szoveg: 'Két egyenlő tömegű, azonos golyó tökéletesen rugalmasan, centrálisan és egyenesen ütközik. Az egyik kezdeti sebessége 0,75 m/s, a másiké -0,43 m/s. Mekkora lesz az egyes golyók ütközés utáni sebessége?',
      valasz: 'v_1^{\\prime} = -0{,}43\\,\\mathrm{m/s},\\quad v_2^{\\prime} = 0{,}75\\,\\mathrm{m/s}',
      tipp: 'Rugalmas ütközés két képlettel, $m_1 = m_2 = m$. Az első tag nulla ($m-m = 0$), a második tag szorzója $\\frac{2m}{2m} = 1$. A golyók sebességet cserélnek.'
    },
    {
      id: 'gy-rl2',
      forras: 'GYF Tökéletesen rugalmatlan ütközések 2. · tanári megoldás',
      szoveg: 'Egy 1 kg tömegű golyó jobbra mozog 12 m/s sebességgel és tökéletesen rugalmatlanul ütközik egy 2 kg tömegű 12 m/s sebességgel balra mozgó másik golyóval. Mekkora az ütközés utáni összlendületük? Mekkora és milyen irányú az ütközés utáni sebességük?',
      valasz: 'p^{\\prime} = -12\\,\\mathrm{kg\\,m/s},\\quad v^{\\prime} = -4\\,\\mathrm{m/s}\\ \\text{(balra)}',
      tipp: 'Tökéletesen rugalmatlan ütközés. A pozitív irány jobbra mutat, ezért $v_2 = -12\\,\\mathrm{m/s}$. Az ütközés utáni összlendület ugyanannyi, mint előtte: $p^{\\prime} = m_1v_1+m_2v_2$, a közös sebesség pedig $v^{\\prime} = \\frac{p^{\\prime}}{m_1+m_2}$.'
    },
    {
      id: 'gy-rl3',
      forras: 'GYF Tökéletesen rugalmatlan ütközések 3. · tanári megoldás',
      szoveg: 'Egy 8 g tömegű, vízszintesen mozgó lövedék egy 9 kg tömegű fahasábba fúródik. A hasáb szabadon mozoghat, sebessége a becsapódás után 40 cm/s. Határozza meg a lövedék becsapódás előtti sebességét!',
      valasz: 'v_1 = 450{,}4\\,\\mathrm{m/s}',
      tipp: 'Tökéletesen rugalmatlan ütközés, a hasáb áll ($v_2 = 0$): $m_1v_1 = (m_1+m_2)v^{\\prime}$. Váltsd át: $40\\,\\mathrm{cm/s} = 0{,}4\\,\\mathrm{m/s}$. A tömegek hányadosa grammban: $\\frac{9008}{8}$.'
    },
    {
      id: 'gy-rl4',
      forras: 'GYF Tökéletesen rugalmatlan ütközések 4. · tanári megoldás',
      szoveg: 'Egy 20 g tömegű, 50 m/s vízszintes sebességű lövedék egy asztalon nyugvó 1000 g tömegű hasábba csapódik. A lövedék az ütközés után a hasábban marad. Határozza meg a hasáb ütközés utáni sebességét! Mekkora a súrlódási erő az asztal és a hasáb között, ha a hasáb a megállásig 1,5 m utat tesz meg?',
      valasz: 'v^{\\prime} = 0{,}98\\,\\mathrm{m/s},\\quad F_s = 0{,}33\\,\\mathrm{N}',
      tipp: 'Lövedék a hasábban, utána súrlódás. Előbb lendületmegmaradással a közös sebesség ($\\frac{20\\cdot 50}{1020}$), utána munkatétel: $F_s = \\frac{1}{2s}(m_1+m_2)v_0^2$. A munkatételbe a tömeget kg-ban írd: $1{,}02\\,\\mathrm{kg}$.'
    },
    {
      id: 'gy-bi3',
      forras: 'GYF Ballisztikus inga 3. · végeredmény a feladatsorból',
      szoveg: '$l=1\\,\\mathrm{m}$ hosszú fonálon $m=2{,}5\\,\\mathrm{kg}$ tömegű homokkal töltött doboz függ. A dobozba oldalról $m_1=5\\,\\mathrm{g}$ tömegű lövedéket lövünk. A lövedék behatol a dobozba és benn marad. A doboz kilendül nyugalmi helyzetéből annyira, hogy a fonál eredeti függőleges helyzetével $\\alpha=18{,}2^{\\circ}$-os szöget zár be. Mekkora volt a lövedék sebessége?',
      valasz: 'v_1 = 501\\,\\mathrm{m/s}',
      tipp: 'Ballisztikus inga, ugyanúgy megy, mint a PróbaZH 7. feladata: $h = l(1-\\cos\\alpha)$, majd $v_1 = \\frac{m_1+m}{m_1}\\sqrt{2gh}$. A tömegek hányadosa grammban: $\\frac{5+2500}{5}$.'
    }
  ]
}]);
