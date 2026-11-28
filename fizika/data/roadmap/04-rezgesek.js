/* Roadmap — Rezgések. Forrás: PróbaZH, MINTA vizsga, GYF feladatsor, tanári megoldások. */
window.FIZ_ROADMAP = (window.FIZ_ROADMAP || []).concat([{
  id: 'rezgesek',
  nev: 'Rezgések',
  leckek: ['4'],
  perc: 100,
  lenyeg: 'Szinte minden feladat a körfrekvencián fordul meg: $\\omega = 2\\pi f = \\dfrac{2\\pi}{T} = \\sqrt{\\dfrac{D}{m}}$. Ha ez megvan, a többi (energia, $v_{max}$, $a_{max}$, elválás, csillapítás) már csak behelyettesítés.',

  elmelet: [
    {
      k: 'Mi határozza meg egy harmonikus rezgőmozgás frekvenciáját?',
      v: 'A harmonikus rezgőmozgás frekvenciáját a rugóállandó és a ráakasztott, majd rezgésbe hozott test tömege együttesen határozza meg: $\\omega = 2\\pi f = \\sqrt{\\dfrac{D}{m}}$.',
      forras: 'PróbaZH',
      trukk: 'Két kulcsszó kell: <b>rugóállandó</b> és <b>tömeg</b>. Írd mellé a képletet is, abban is csak $D$ és $m$ van.'
    },
    {
      k: 'Mi a harmonikus rezgőmozgás kialakulásának erőtani feltétele?',
      v: '1. Legyen egy olyan pont, ahol a test erőmentes állapotban van, tehát $F(x_0) = 0$. 2. Ha a testet ebből a helyzetéből kimozdítjuk, akkor az egyensúlyi, erőmentes hely irányába visszatérítő erő, vagy erők hassanak rá.',
      forras: 'PróbaZH',
      trukk: 'Két feltétel van, számozva írd le: (1) van egyensúlyi hely, $F(x_0)=0$; (2) kimozdítva <b>visszatérítő erő</b> hat. Egyik se maradjon ki.'
    },
    {
      k: 'Milyen feltételek mellett lesz egy toronydaru kötele lengéseinek harmonikus rezgőmozgás jellege?',
      v: 'Abban az esetben, ha a toronydaru kötele kis kitérésű lengéseket végez.',
      forras: 'PróbaZH',
      trukk: 'A kötélen lógó teher egy fonálinga. Kulcsszó: <b>kis kitérés</b>.'
    },
    {
      k: 'Egy test egyszerre végez egymásra merőleges irányokban azonos frekvenciájú és amplitúdójú harmonikus rezgőmozgást. Milyen feltételek mellett oltja ki egymást a két rezgés, azaz mikor lesz az eredő amplitúdó nulla?',
      v: 'Egymásra merőleges irányú rezgések soha nem oltják ki egymást.',
      forras: 'PróbaZH',
      trukk: 'Beugratós kérdés. A válasz: <b>soha</b>. Ne kezdj el feltételt keresni.'
    },
    {
      k: 'Mi a rezonanciakatasztrófa és mi a kialakulásának a feltétele?',
      v: 'Ha egy rezgő rendszert kívülről hosszan tartó periodikus erőhatás éri, akkor idővel a rezgő rendszer nem a sajátfrekvenciáján, hanem a külső hatás frekvenciáján fog rezegni. A kialakuló gerjesztett rezgőmozgás amplitúdója függ a gerjesztő hatás frekvenciájától. Amikor a gerjesztő frekvencia éppen megegyezik a sajátfrekvenciával, a rezgés amplitúdója olyan nagy is lehet, hogy a rezgő rendszerben maradandó károsodások alakulhatnak ki. Ebben az esetben beszélünk rezonanciakatasztrófáról.',
      forras: 'PróbaZH',
      trukk: 'Három lépésben mondd el: (1) tartós periodikus külső erő, a rendszer a <b>külső erő frekvenciáján</b> rezeg; (2) az amplitúdó a gerjesztő frekvenciától függ; (3) feltétel: <b>gerjesztő frekvencia = sajátfrekvencia</b>, ekkor akkora az amplitúdó, hogy <b>maradandó károsodás</b> lehet.'
    },
    {
      k: 'Mikor lesz két harmonikus rezgőmozgás eredője is harmonikus?',
      v: 'Csak abban az esetben, ha a frekvenciájuk megegyezik.',
      forras: 'MINTA vizsga',
      trukk: 'Kulcsszó: <b>azonos frekvencia</b>. A „csak” szót is írd le.'
    }
  ],

  receptek: [
    {
      cim: 'Kitérés–idő függvény: időpont, kitérés, legnagyobb sebesség és gyorsulás',
      mikor: 'A feladat amplitúdót, rezgésidőt vagy frekvenciát ad, és egy időpontot, kitérést, $v_{max}$-ot vagy $a_{max}$-ot kérdez.',
      lepesek: [
        'Írd fel a kitérést: $x(t) = A\\sin\\omega t$, ahol $\\omega = 2\\pi f = \\dfrac{2\\pi}{T}$.',
        'Írd be a feltételt (pl. $x = A/2$), és egyszerűsíts $A$-val.',
        'Oldd meg a szögre ($\\omega t$), radiánban. Ebből jön $t$ vagy $x$.',
        'Ha a maximumok kellenek: $v_{max} = A\\omega$, $a_{max} = A\\omega^2$. A hányadosuk éppen $\\omega$.'
      ],
      tex: 'x(t) = A\\sin\\omega t,\\qquad v_{max} = A\\omega,\\qquad a_{max} = A\\omega^2'
    },
    {
      cim: 'Rugón rezgő test: rugóállandó, periódusidő, energia',
      mikor: 'Rugóra akasztott (vagy rugón ülő) test: megnyúlás, tömeg, periódusidő vagy frekvencia szerepel, és $D$-t, $T$-t, süllyedést vagy energiát kérdeznek.',
      lepesek: [
        'Ha megnyúlás van megadva: egyensúlyban a rugóerő tartja a súlyt, $D\\,\\Delta l = mg$.',
        'Ha $T$ vagy $f$ van megadva: $\\omega = 2\\pi f = \\dfrac{2\\pi}{T} = \\sqrt{\\dfrac{D}{m}}$, ebből $D = m\\omega^2$.',
        'Periódusidő: $T = \\dfrac{2\\pi}{\\sqrt{D/m}}$. Sokszor elég a $D/m$ hányados, a tömeg külön nem kell.',
        'Energia: $E = \\dfrac{1}{2}DA^2$, az amplitúdó méterben.'
      ],
      tex: '\\omega = \\sqrt{\\frac{D}{m}},\\qquad D\\,\\Delta l = mg,\\qquad E = \\frac{1}{2}DA^2'
    },
    {
      cim: 'Rezgő lapon lévő test: elválás és megcsúszás',
      mikor: 'Egy test rezgő lapon vagy deszkán fekszik, és azt kérdezik, mikor „zörög”, mikor válik el, vagy mikor csúszik meg.',
      lepesek: [
        'A legnagyobb gyorsulás a szélső helyzetben van: $a_{max} = A\\omega^2$.',
        'Függőleges rezgés (elválás): a testet lefelé legfeljebb $g$ gyorsítja, a határ $A\\omega^2 = g$.',
        'Vízszintes rezgés (megcsúszás): a testet csak a tapadási erő gyorsítja, a határ $A\\omega^2 = \\mu_0 g$.',
        'Írd be: $\\omega = 2\\pi f$, és fejezd ki a kérdezett mennyiséget.'
      ],
      tex: 'A\\omega^2 = g \\qquad\\text{vagy}\\qquad A\\omega^2 = \\mu_0\\, g'
    },
    {
      cim: 'Rugó és energiamegmaradás (ráejtett test, lejtő)',
      mikor: 'A test elengedés után rugót nyom össze vagy nyújt meg, és a legnagyobb összenyomódást vagy megnyúlást kérdezik.',
      lepesek: [
        'A kezdő és a legszélső helyzetben is áll a test, mozgási energia nincs.',
        'A helyzeti energia csökkenése rugalmas energiává alakul: $mg\\cdot(\\text{süllyedés}) = \\dfrac{1}{2}Dx^2$.',
        'A süllyedésbe az $x$ is beleszámít: ejtésnél $h + x$, lejtőn $h = x\\sin\\alpha$.',
        'Oldd meg $x$-re (ejtésnél másodfokú egyenlet, a pozitív gyök kell).',
        'Ha azt kérdezik, hol áll meg végül a test: ott erőegyensúly van, $Dx_1 = mg\\sin\\alpha$.'
      ],
      tex: '\\frac{1}{2}Dx^2 = mg\\,(h + x)'
    },
    {
      cim: 'Kis rezgések periódusideje $F(x)$-ből',
      mikor: 'Az erő képlettel van megadva, $F(x)$, és egyensúlyi helyet, rezgést, periódusidőt kérdeznek.',
      lepesek: [
        'Egyensúlyi helyek: oldd meg az $F(x) = 0$ egyenletet.',
        'Deriváld az erőt: $\\dfrac{dF}{dx}$.',
        'Helyettesítsd be az egyensúlyi helyeket. Rezgés ott alakulhat ki, ahol a derivált negatív.',
        'Körfrekvencia: $\\omega = \\sqrt{-\\dfrac{1}{m}\\dfrac{dF}{dx}\\Big|_{x_0}}$, majd $T = \\dfrac{2\\pi}{\\omega}$.'
      ],
      tex: '\\omega = \\sqrt{-\\frac{1}{m}\\left.\\frac{dF(x)}{dx}\\right|_{x_0}},\\qquad T = \\frac{2\\pi}{\\omega}'
    },
    {
      cim: 'Csillapított rezgés: csillapítási tényező és sajátfrekvencia',
      mikor: 'Az amplitúdó adott idő alatt adott részére csökken, és $\\beta$-t, időt vagy a sajátfrekvenciát kérdezik.',
      lepesek: [
        'Írd fel: $A(t) = A_0\\,e^{-\\beta t}$, és írd be a megadott arányt és időt.',
        'Egyszerűsíts $A_0$-lal, majd vedd mindkét oldal természetes logaritmusát ($\\ln$).',
        'Fejezd ki $\\beta$-t (vagy ha $\\beta$ már megvan, a $t$-t).',
        'Sajátfrekvencia: a megfigyelt periódusidőből $\\omega_{cs} = \\dfrac{2\\pi}{T}$, majd $\\omega_0 = \\sqrt{\\omega_{cs}^2 + \\beta^2}$ és $f_0 = \\dfrac{\\omega_0}{2\\pi}$.'
      ],
      tex: 'A(t) = A_0\\,e^{-\\beta t},\\qquad \\omega_{cs}^2 = \\omega_0^2 - \\beta^2'
    }
  ],

  tippek: [
    'Az alapképlet, amit fejből tudni kell: $\\omega = 2\\pi f = \\dfrac{2\\pi}{T}$, rugón rezgő testre $\\omega = \\sqrt{\\dfrac{D}{m}}$.',
    'A számológép legyen <b>radián</b> módban, ha $\\sin$, $\\operatorname{tg}$ vagy ezek inverze kell. A $\\sin\\omega t = 0{,}5$ megoldása $\\dfrac{\\pi}{6}$, nem $30$.',
    'Legnagyobb sebesség: $v_{max} = A\\omega$. Legnagyobb gyorsulás: $a_{max} = A\\omega^2$. Ha mindkettő adott, oszd el őket: $\\dfrac{a_{max}}{v_{max}} = \\omega$.',
    'Rugóra akasztott testnél $D = \\dfrac{mg}{\\Delta l}$. Sokszor elég a $\\dfrac{D}{m}$ hányados, a tömeget nem is kell tudni.',
    'Csillapításnál $\\omega_{cs}^2 = \\omega_0^2 - \\beta^2$. A megfigyelt periódusidő a csillapított rezgésé ($\\omega_{cs}$). A saját körfrekvencia ($\\omega_0$) ennél mindig nagyobb.',
    'Rugóra eső testnél a test $h + x$ utat süllyed, nem csak $h$-t. Az $x$ az egyenlet mindkét oldalán szerepel, ezért másodfokú egyenlet lesz.',
    'Fonálinga: $T = 2\\pi\\sqrt{\\dfrac{l}{g}}$. Más égitesten csak a $g$ értéke változik.',
    'A teljes levezetést le kell írni: képlet → behelyettesítés → eredmény mértékegységgel. Az amplitúdót és a megnyúlást előbb váltsd át méterbe.'
  ],

  feladatok: [
    {
      id: 'zh6', cim: 'Rezgő test mechanikai energiája', forras: 'PróbaZH 6. feladat · 1,5 pont', zh: true,
      szoveg: '3 kg tömegű test 10 cm amplitúdóval, 10 Hz frekvenciával harmonikus rezgőmozgást végez. Mekkora a mechanikai energiája?',
      adatok: ['m = 3\\,\\mathrm{kg}', 'A = 10\\,\\mathrm{cm} = 0{,}1\\,\\mathrm{m}', 'f = 10\\,\\mathrm{Hz}'],
      tipp: 'Az energia képletében a rugóállandó ($D$) szerepel, de a feladat frekvenciát és tömeget ad. Előbb ezekből fejezd ki $D$-t.',
      lepesek: [
        {
          cim: 'Az energia képlete',
          szoveg: 'A harmonikus rezgőmozgás mechanikai energiáját a rugóállandóból és az amplitúdóból számoljuk. Az amplitúdó megvan, a $D$ még hiányzik.',
          tex: 'E = \\frac{1}{2} D A^2'
        },
        {
          cim: 'Rugóállandó a frekvenciából',
          szoveg: 'A körfrekvenciát kétféleképpen írhatod fel: a frekvenciával és a rugóállandóval. A kettőt egyenlővé téve, négyzetre emelve megkapod $D$-t.',
          tex: '\\omega = 2\\pi f = \\sqrt{\\frac{D}{m}} \\;\\Rightarrow\\; D = 4\\pi^2 f^2 m',
          be: 'D = 4\\pi^2 \\cdot 10^2 \\cdot 3',
          er: 'D \\approx 11\\,844\\,\\mathrm{N/m}',
          megj: 'A tanár megoldásában ez a sor így áll: $D = 4\\pi f^2 m = 4\\pi\\cdot 10^2\\cdot 3 = 3768$. Ez elírás: a $\\pi$ négyzete lemaradt. Helyesen $D \\approx 11\\,844\\,\\mathrm{N/m}$ (saját számolás).'
        },
        {
          cim: 'Az energia kiszámítása',
          szoveg: 'Most már minden adat megvan. Az amplitúdót méterben írd be.',
          tex: 'E = \\frac{1}{2} D A^2',
          be: 'E = 0{,}5 \\cdot 11\\,844 \\cdot 0{,}1^2',
          er: 'E \\approx 59{,}2\\,\\mathrm{J}',
          megj: 'A tanár sora: $E = 0{,}5\\cdot 3768\\cdot 0{,}1^2 = 18{,}84\\,\\mathrm{J}$. Ez az előző lépés elírását viszi tovább.'
        }
      ],
      valasz: 'E \\approx 59{,}2\\,\\mathrm{J}',
      megj: 'A tanári megoldókulcs végeredménye $18{,}84\\,\\mathrm{J}$, mert a rugóállandónál $4\\pi$ szerepel $4\\pi^2$ helyett. A módszer ugyanaz, a helyes érték $E \\approx 59{,}2\\,\\mathrm{J}$ (saját számolás). Ellenőrzés: $v_{max} = A\\omega = 0{,}1\\cdot 62{,}8 = 6{,}28\\,\\mathrm{m/s}$, és $\\frac{1}{2}mv_{max}^2 = 0{,}5\\cdot 3\\cdot 6{,}28^2 \\approx 59{,}2\\,\\mathrm{J}$ (saját számolás).'
    },
    {
      id: 'zh7', cim: 'Csillapított rezgés: csillapítási tényező és sajátfrekvencia', forras: 'PróbaZH 7. feladat · 2 pont', zh: true,
      szoveg: 'Egy csillapított rezgőmozgás megfigyelésekor a következőket vették észre:<br>1. két egymást követő, azonos irányban történő maximális kitérés aránya 0,4<br>2. a rezgések periódusideje T = 0,5 s.<br>Határozza meg a csillapítási tényező értékét, valamint a rezgések sajátfrekvenciáját!',
      adatok: ['\\dfrac{A}{A_0} = 0{,}4', 'T = 0{,}5\\,\\mathrm{s}'],
      tipp: 'Két egymást követő, azonos irányú legnagyobb kitérés között éppen egy periódus telik el. Tehát $0{,}5\\,\\mathrm{s}$ alatt az amplitúdó a $0{,}4$-szeresére csökken.',
      lepesek: [
        {
          cim: 'Az amplitúdó csökkenése',
          szoveg: 'A csillapított rezgés amplitúdója időben exponenciálisan csökken. A feladat szerint $0{,}5\\,\\mathrm{s}$ elteltével az amplitúdó a kezdeti $0{,}4$-szerese. Ezt írd be a képletbe.',
          tex: 'A = A_0\\,e^{-\\beta t}',
          be: '0{,}4\\,A_0 = A_0\\,e^{-0{,}5\\beta}'
        },
        {
          cim: 'Csillapítási tényező',
          szoveg: 'Egyszerűsíts $A_0$-lal, aztán vedd mindkét oldal természetes logaritmusát. Így a kitevő „lejön”, és $\\beta$ kifejezhető.',
          tex: '\\ln 0{,}4 = -0{,}5\\,\\beta \\;\\Rightarrow\\; \\beta = -\\frac{\\ln 0{,}4}{0{,}5}',
          be: '\\beta = -\\frac{-0{,}916}{0{,}5}',
          er: '\\beta = 1{,}83\\,\\mathrm{1/s}'
        },
        {
          cim: 'A csillapított rezgés körfrekvenciája',
          szoveg: 'A megadott periódusidő a csillapított rezgésé. Ebből számold ki a csillapított rezgés körfrekvenciáját.',
          tex: '\\omega_{cs} = \\frac{2\\pi}{T}',
          be: '\\omega_{cs} = \\frac{6{,}28}{0{,}5}',
          er: '\\omega_{cs} = 12{,}56\\,\\mathrm{1/s}',
          megj: 'A tanár $\\pi = 3{,}14$-gyel számol. Pontosabb $\\pi$-vel $12{,}57\\,\\mathrm{1/s}$ jön ki (saját számolás), a végeredmény ettől nem változik.'
        },
        {
          cim: 'Saját körfrekvencia',
          szoveg: 'A csillapítás lassítja a rezgést: $\\omega_{cs}^2 = \\omega_0^2 - \\beta^2$. Ezt rendezd át a csillapítás nélküli (saját) körfrekvenciára.',
          tex: '\\omega_0 = \\sqrt{\\omega_{cs}^2 + \\beta^2}',
          be: '\\omega_0 = \\sqrt{12{,}56^2 + 1{,}83^2}',
          er: '\\omega_0 = 12{,}69\\,\\mathrm{1/s}'
        },
        {
          cim: 'Sajátfrekvencia',
          szoveg: 'A kérdés frekvenciát kér, nem körfrekvenciát. Oszd el $2\\pi$-vel.',
          tex: 'f_0 = \\frac{\\omega_0}{2\\pi}',
          be: 'f_0 = \\frac{12{,}69}{6{,}28}',
          er: 'f_0 = 2{,}02\\,\\mathrm{Hz}'
        }
      ],
      valasz: '\\beta = 1{,}83\\,\\mathrm{1/s},\\qquad f_0 = 2{,}02\\,\\mathrm{Hz}',
      megj: 'Ugyanez a feladat szerepel a gyakorló feladatsorban is (GYF Csillapított 2.). A csillapított rezgés frekvenciája $f = 1/T = 2\\,\\mathrm{Hz}$, a sajátfrekvencia ennél egy kicsit nagyobb.'
    },
    {
      id: 'zh8', cim: 'Fonálinga lengésideje a Holdon', forras: 'PróbaZH 8. feladat · 1,5 pont', zh: true,
      szoveg: 'Mekkora lenne az 1 méter hosszú fonálinga lengésideje a Holdon, ha ott a nehézségi gyorsulás a földi érték hatodrésze?',
      adatok: ['l = 1\\,\\mathrm{m}', 'g_{H} = \\dfrac{g}{6}'],
      tipp: 'A fonálinga lengésidejének képletében csak a hossz és a nehézségi gyorsulás szerepel. Előbb számold ki a holdi $g$ értékét.',
      lepesek: [
        {
          cim: 'A fonálinga lengésideje',
          szoveg: 'A fonálinga lengésidejét a fonál hossza és a nehézségi gyorsulás adja meg. A Holdon ugyanez a képlet érvényes, csak a $g$ helyére a holdi értéket kell írni.',
          tex: 'T = 2\\pi\\sqrt{\\frac{l}{g}}'
        },
        {
          cim: 'Nehézségi gyorsulás a Holdon',
          szoveg: 'A holdi nehézségi gyorsulás a földi érték hatodrésze.',
          tex: 'g_{H} = \\frac{g}{6}',
          be: 'g_{H} = \\frac{9{,}81}{6}',
          er: 'g_{H} = 1{,}64\\,\\mathrm{m/s^2}',
          megj: 'A tanár itt $1{,}64$-gyel számol, ami $g = 9{,}81\\,\\mathrm{m/s^2}$-ből jön. Ha $g = 10\\,\\mathrm{m/s^2}$-tel számolsz, $g_H = 1{,}67\\,\\mathrm{m/s^2}$ és $T = 4{,}87\\,\\mathrm{s}$, ami kerekítve ugyanúgy $4{,}9\\,\\mathrm{s}$ (saját számolás).'
        },
        {
          cim: 'Behelyettesítés',
          szoveg: 'Írd be a hosszt és a holdi nehézségi gyorsulást.',
          tex: 'T = 2\\pi\\sqrt{\\frac{l}{g_{H}}}',
          be: 'T = 2\\pi\\sqrt{\\frac{1}{1{,}64}}',
          er: 'T = 4{,}9\\,\\mathrm{s}'
        }
      ],
      valasz: 'T = 4{,}9\\,\\mathrm{s}'
    },
    {
      id: 'minta13', cim: 'Gépkocsi rugózása: mennyit süllyed az utasoktól?', forras: 'MINTA vizsga 13. · 2 pont', zh: true,
      szoveg: 'Egy 1200 kg-os gépkocsi üresen 0,60 s periódusidővel rugózik. Mennyivel süllyednek le a kerekeket tartó rugók, ha hat, egyenként 80 kg-os személy ül be a kocsiba? A süllyedést ahhoz a szinthez képest adjuk meg, mielőtt az emberek beültek a gépkocsiba.',
      adatok: ['M = 1200\\,\\mathrm{kg}', 'T = 0{,}60\\,\\mathrm{s}', 'm = 80\\,\\mathrm{kg}\\ (6\\ \\text{utas})', 'g = 10\\,\\mathrm{m/s^2}'],
      tipp: 'A periódusidőből és a kocsi tömegéből megkapod a rugóállandót. Utána két egyensúlyt kell felírni: üres kocsira és utasokkal teli kocsira.',
      lepesek: [
        {
          cim: 'Rugóállandó a periódusidőből',
          szoveg: 'A kocsi a rugókon harmonikus rezgőmozgást végez. Ilyenkor a körfrekvencia négyzete a rugóállandó és a tömeg hányadosa. Az üres kocsi tömege és periódusideje adott, ebből kijön a rugóállandó.',
          tex: '\\omega^2 = \\left(\\frac{2\\pi}{T}\\right)^2 = \\frac{D}{M} \\;\\Rightarrow\\; D = M\\left(\\frac{2\\pi}{T}\\right)^2',
          be: 'D = 1200\\cdot\\left(\\frac{2\\pi}{0{,}60}\\right)^2',
          er: 'D = 1{,}32\\cdot 10^5\\,\\mathrm{N/m}',
          megj: 'A tanár ebben a sorban kis $m$-mel jelöli a kocsi tömegét, később nagy $M$-mel. Itt végig $M$ a kocsi, $m$ egy utas tömege.'
        },
        {
          cim: 'Összenyomódás üres kocsival',
          szoveg: 'Egyensúlyban a rugóerő éppen a kocsi súlyát tartja. Ebből megvan, mennyire nyomja össze a rugókat az üres kocsi.',
          tex: 'D\\,x_0 = Mg \\;\\Rightarrow\\; x_0 = \\frac{Mg}{D}',
          be: 'x_0 = \\frac{1200\\cdot 10}{1{,}32\\cdot 10^5}',
          er: 'x_0 = 0{,}09\\,\\mathrm{m}',
          megj: 'Három tizedesre $x_0 = 0{,}091\\,\\mathrm{m}$ (saját számolás). A tanár $0{,}09\\,\\mathrm{m}$-re kerekít.'
        },
        {
          cim: 'Összenyomódás utasokkal',
          szoveg: 'Ha beül a hat utas, a rugóknak a kocsi és az utasok együttes súlyát kell tartaniuk. Ez az összenyomódás a rugó összenyomatlan állapotához képest értendő.',
          tex: 'D\\,x = (M + 6m)\\,g \\;\\Rightarrow\\; x = \\frac{(M + 6m)\\,g}{D}',
          be: 'x = \\frac{(1200 + 6\\cdot 80)\\cdot 10}{1{,}32\\cdot 10^5}',
          er: 'x = 0{,}127\\,\\mathrm{m}'
        },
        {
          cim: 'A süllyedés',
          szoveg: 'A kérdés a két helyzet különbsége: mennyivel megy lejjebb a kocsi ahhoz képest, ahol üresen állt.',
          tex: '\\Delta x = x - x_0',
          be: '\\Delta x = 0{,}127 - 0{,}09 = 0{,}037\\,\\mathrm{m}',
          er: '\\Delta x = 3{,}7\\,\\mathrm{cm}',
          megj: 'Kerekítés nélkül számolva $\\Delta x = \\dfrac{6mg}{D} = \\dfrac{4800}{1{,}32\\cdot 10^5} \\approx 0{,}036\\,\\mathrm{m} = 3{,}6\\,\\mathrm{cm}$ (saját számolás). A tanár $3{,}7\\,\\mathrm{cm}$-e abból jön, hogy $x_0$-t $0{,}09$-re kerekítette.'
        }
      ],
      valasz: '\\Delta x \\approx 3{,}7\\,\\mathrm{cm}',
      megj: 'A tanári végeredmény $3{,}7\\,\\mathrm{cm}$. A részeredmények kerekítése nélkül $3{,}6\\,\\mathrm{cm}$ jön ki (saját számolás). Az eltérés csak kerekítés, a módszer ugyanaz.'
    },
    {
      id: 'gyf-h1', cim: 'Mennyi idő alatt ér a test A/2 kitérésig?', forras: 'GYF Harmonikus rezgés 1.',
      szoveg: 'Mennyi idő alatt ér a rezgőmozgást végző test az egyensúlyi helyzetből A/2 távolságra, ha 1,5 s a rezgésideje?',
      adatok: ['x = \\dfrac{A}{2}', 'T = 1{,}5\\,\\mathrm{s}'],
      tipp: 'Írd fel a kitérés–idő függvényt, és tedd egyenlővé $A/2$-vel. Az amplitúdó ki fog esni.',
      lepesek: [
        {
          cim: 'Kitérés–idő függvény',
          szoveg: 'A test az egyensúlyi helyzetből indul, ezért a kitérését szinuszfüggvény írja le. A körfrekvencia helyére $\\dfrac{2\\pi}{T}$ kerül, mert a rezgésidő adott.',
          tex: 'x(t) = A\\cdot\\sin\\left(\\frac{2\\pi}{T}\\cdot t\\right)'
        },
        {
          cim: 'A feltétel beírása',
          szoveg: 'Azt az időpontot keressük, amikor a kitérés éppen $A/2$. Az $A$ mindkét oldalon szerepel, egyszerűsíts vele.',
          tex: '\\frac{A}{2} = A\\cdot\\sin\\left(\\frac{2\\pi}{T}\\cdot t\\right)',
          er: '0{,}5 = \\sin\\left(\\frac{2\\pi}{T}\\cdot t\\right)'
        },
        {
          cim: 'A szög meghatározása',
          szoveg: 'A szinusz értéke $\\dfrac{\\pi}{6}$-nál $0{,}5$. Radiánban számolj, mert a képletben $2\\pi$ van.',
          tex: '\\frac{\\pi}{6} = \\frac{2\\pi}{T}\\cdot t'
        },
        {
          cim: 'Az idő kifejezése',
          szoveg: 'Oszd el mindkét oldalt $\\dfrac{2\\pi}{T}$-vel. A $\\pi$ kiesik.',
          tex: 't = \\frac{T}{12}',
          be: 't = \\frac{1{,}5}{12}',
          er: 't = 0{,}125\\,\\mathrm{s}'
        }
      ],
      valasz: 't = 0{,}125\\,\\mathrm{s}',
      megj: 'Az eredmény $T/12$, nem $T/8$: a fél amplitúdóig tartó út nem a negyed periódus fele.'
    },
    {
      id: 'gyf-h3', cim: 'Rezgésszám a legnagyobb sebességből és gyorsulásból', forras: 'GYF Harmonikus rezgés 3.',
      szoveg: 'Rezgőmozgást végző test legnagyobb sebessége 5 m/s, legnagyobb gyorsulása 15 m/s². Mekkora a test rezgésszáma?',
      adatok: ['v_{max} = 5\\,\\mathrm{m/s}', 'a_{max} = 15\\,\\mathrm{m/s^2}'],
      tipp: 'Írd fel egymás alá a legnagyobb sebesség és a legnagyobb gyorsulás képletét. Mi történik, ha elosztod őket egymással?',
      lepesek: [
        {
          cim: 'A két maximum képlete',
          szoveg: 'A harmonikus rezgésnél a legnagyobb sebesség és a legnagyobb gyorsulás is az amplitúdóból és a körfrekvenciából számolható. Két egyenlet, két ismeretlen ($A$ és $\\omega$).',
          tex: 'v_{max} = A\\cdot\\omega,\\qquad a_{max} = A\\cdot\\omega^2'
        },
        {
          cim: 'Osztás: kiesik az amplitúdó',
          szoveg: 'Ha a gyorsulást elosztod a sebességgel, az $A$ kiesik, és éppen a körfrekvencia marad.',
          tex: '\\frac{a_{max}}{v_{max}} = \\omega',
          be: '\\omega = \\frac{15}{5}',
          er: '\\omega = 3\\,\\mathrm{1/s}'
        },
        {
          cim: 'Rezgésszám',
          szoveg: 'A rezgésszám (frekvencia) a körfrekvenciából $2\\pi$-vel osztva kapható meg.',
          tex: '2\\pi f = \\omega \\;\\Rightarrow\\; f = \\frac{\\omega}{2\\pi}',
          be: 'f = \\frac{3}{6{,}28}',
          er: 'f = 0{,}48\\,\\mathrm{Hz}'
        }
      ],
      valasz: 'f = 0{,}48\\,\\mathrm{Hz}'
    },
    {
      id: 'gyf-h4', cim: 'Rugón két teher, az egyik leesik', forras: 'GYF Harmonikus rezgés 4.',
      szoveg: 'Egy rugón két egyenlő tömegű teher függ. A rugó megnyúlása a terhelés hatására 2 cm. Az egyik teher hirtelen leesik. Mekkora amplitúdójú és mekkora periódusú rezgést végez a másik?',
      adatok: ['x = 2\\,\\mathrm{cm} = 0{,}02\\,\\mathrm{m}\\ (2m\\ \\text{teherrel})', 'g = 10\\,\\mathrm{m/s^2}'],
      tipp: 'Se a tömeg, se a rugóállandó nincs megadva, de a hányadosuk a megnyúlásból kijön. A periódusidőhöz csak ez a hányados kell.',
      lepesek: [
        {
          cim: 'Egyensúly két teherrel',
          szoveg: 'Amíg mindkét teher a rugón lóg, a rugóerő a két teher súlyát tartja. Ebből a $D/m$ hányados kifejezhető. Erre lesz szükség a periódusidőhöz.',
          tex: '2mg = D\\cdot x \\;\\Rightarrow\\; \\frac{D}{m} = \\frac{2g}{x}',
          be: '\\frac{D}{m} = \\frac{20}{0{,}02}',
          er: '\\frac{D}{m} = 1000\\,\\mathrm{1/s^2}'
        },
        {
          cim: 'Periódusidő egy teherrel',
          szoveg: 'A leesés után egyetlen, $m$ tömegű teher rezeg a rugón. A körfrekvenciája $\\sqrt{D/m}$, ebből jön a periódusidő.',
          tex: '\\frac{2\\pi}{T} = \\omega = \\sqrt{\\frac{D}{m}} \\;\\Rightarrow\\; T = \\frac{2\\pi}{\\sqrt{D/m}}',
          be: 'T = \\frac{6{,}28}{\\sqrt{1000}}',
          er: 'T = 0{,}20\\,\\mathrm{s}'
        },
        {
          cim: 'Amplitúdó',
          szoveg: 'Egy teher fele akkora erővel húzza a rugót, ezért az új egyensúlyi megnyúlás $1\\,\\mathrm{cm}$. A megmaradt teher a $2\\,\\mathrm{cm}$-es megnyúlásból, álló helyzetből indul, ez a rezgés alsó szélső helyzete. Az amplitúdó a szélső és az egyensúlyi helyzet távolsága.',
          tex: 'A = x - \\frac{x}{2}',
          be: 'A = 2\\,\\mathrm{cm} - 1\\,\\mathrm{cm}',
          er: 'A = 1\\,\\mathrm{cm}',
          megj: 'A tanárnál az $A = 1\\,\\mathrm{cm}$ csak az ábrán szerepel, külön számolási sor nincs hozzá.'
        }
      ],
      valasz: 'A = 1\\,\\mathrm{cm},\\qquad T = 0{,}20\\,\\mathrm{s}'
    },
    {
      id: 'gyf-h5', cim: 'Rezgő fémlap: mikor kezd zörögni a kocka?', forras: 'GYF Harmonikus rezgés 5.',
      szoveg: 'Egy vízszintes fémlap függőleges irányú 1 cm amplitúdójú rezgést tud végezni. Erre a fémlapra egy kockát helyezünk. A fémlap rezgéseinek számát zérusról indulva fokozatosan növeljük. Bizonyos rezgésszám elérése esetén a kocka „zörögni kezd” a fémlapon. Mekkora ez a rezgésszám?',
      adatok: ['A = 1\\,\\mathrm{cm} = 0{,}01\\,\\mathrm{m}', 'g = 10\\,\\mathrm{m/s^2}'],
      tipp: 'A kocka akkor zörög, ha elválik a laptól. Gondold végig: legfeljebb mekkora gyorsulással tud a kocka lefelé indulni?',
      lepesek: [
        {
          cim: 'Az elválás feltétele',
          szoveg: 'A kockát lefelé csak a nehézségi erő gyorsítja, tehát legfeljebb $g$ gyorsulással tud lefelé mozogni. Ha a lap legnagyobb gyorsulása eléri a $g$-t, a kocka már nem tudja követni, elválik tőle és zörög. A határesetben a kettő éppen egyenlő.',
          tex: 'a_{max} \\geq g \\;\\Rightarrow\\; A\\cdot\\omega^2 = g'
        },
        {
          cim: 'Körfrekvencia',
          szoveg: 'Fejezd ki a körfrekvenciát, és írd a helyére a $2\\pi f$-et, mert rezgésszámot kérdeznek.',
          tex: '\\omega = 2\\pi f = \\sqrt{\\frac{g}{A}}'
        },
        {
          cim: 'Rezgésszám',
          szoveg: 'Oszd el $2\\pi$-vel, és helyettesíts be. Az amplitúdó méterben kell.',
          tex: 'f = \\frac{1}{2\\pi}\\cdot\\sqrt{\\frac{g}{A}}',
          be: 'f = \\frac{1}{6{,}28}\\cdot\\sqrt{\\frac{10}{0{,}01}}',
          er: 'f = 5{,}04\\,\\mathrm{Hz}',
          megj: 'Pontosabb $\\pi$-vel $f = 5{,}03\\,\\mathrm{Hz}$ (saját számolás). A tanár $5{,}04\\,\\mathrm{Hz}$-e a $6{,}28$-as kerekítésből adódik.'
        }
      ],
      valasz: 'f \\approx 5{,}04\\,\\mathrm{Hz}',
      megj: 'A tanári eredmény $5{,}04\\,\\mathrm{Hz}$, kerekítés nélkül $5{,}03\\,\\mathrm{Hz}$ (saját számolás). Csak kerekítési eltérés.'
    },
    {
      id: 'gyf-h6', cim: 'Rugóra ejtett golyó: legnagyobb összenyomódás', forras: 'GYF Harmonikus rezgés 6.',
      szoveg: 'Egy $5{,}5\\cdot 10^3$ N/m rugóállandójú rugóra 5 kg tömegű golyót ejtünk. Az elengedés pillanatában a golyó alja 2 m-rel van magasabban, mint a rugó felső széle. Legfeljebb mekkora lehet a rugó összenyomódása?',
      adatok: ['D = 5500\\,\\mathrm{N/m}', 'm = 5\\,\\mathrm{kg}', 'h = 2\\,\\mathrm{m}', 'g = 10\\,\\mathrm{m/s^2}'],
      tipp: 'Az elengedéskor és a legnagyobb összenyomódáskor is áll a golyó. Hasonlítsd össze a két helyzet energiáját. Figyelj: mennyit süllyed összesen a golyó?',
      lepesek: [
        {
          cim: 'Energiamegmaradás',
          szoveg: 'Az elengedés pillanatában és a legnagyobb összenyomódásnál is áll a golyó, mozgási energia nincs. A helyzeti energia csökkenése teljesen a rugó rugalmas energiájává alakul. A golyó összesen $h + x$ utat süllyed, mert a rugó összenyomódása közben is lefelé megy.',
          tex: '\\frac{1}{2} D x^2 = m g\\,(h + x)'
        },
        {
          cim: 'Behelyettesítés',
          szoveg: 'Írd be az adatokat, és szorozd meg mindkét oldalt 2-vel, hogy eltűnjön a tört.',
          tex: '\\frac{1}{2}\\cdot 5500\\cdot x^2 = 5\\cdot 10\\cdot(2 + x)',
          er: '5500\\,x^2 = 100\\,(2 + x)'
        },
        {
          cim: 'Másodfokú egyenlet',
          szoveg: 'Egyszerűsíts 100-zal, és rendezz mindent egy oldalra.',
          tex: '55x^2 = 2 + x',
          er: '55x^2 - x - 2 = 0'
        },
        {
          cim: 'Megoldóképlet',
          szoveg: 'A megoldóképletből két gyök jön ki. Az összenyomódás csak pozitív lehet, ezért a pluszjeles gyök kell.',
          tex: 'x_{1,2} = \\frac{1 \\pm \\sqrt{1 + 8\\cdot 55}}{110}',
          be: 'x = \\frac{1 + 21}{110} = \\frac{22}{110}',
          er: 'x = 0{,}2\\,\\mathrm{m}'
        }
      ],
      valasz: 'x = 0{,}2\\,\\mathrm{m}'
    },
    {
      id: 'gyf-h7', cim: 'Vízszintesen rezgő deszka: tapadási súrlódási tényező', forras: 'GYF Harmonikus rezgés 7.',
      szoveg: 'Egy deszka 0,5 1/s frekvenciájú rezgést végez vízszintes síkban. A rajta levő test akkor kezd csúszni, ha az amplitúdó eléri a 0,6 m értéket. Mekkora a teher és a deszka közötti tapadási súrlódási tényező?',
      adatok: ['f = 0{,}5\\,\\mathrm{1/s}', 'A = 0{,}6\\,\\mathrm{m}', 'g = 10\\,\\mathrm{m/s^2}'],
      tipp: 'Gondold végig, melyik erő viszi magával a testet a deszkával együtt. Ennek az erőnek van egy legnagyobb értéke.',
      lepesek: [
        {
          cim: 'Mi gyorsítja a testet?',
          szoveg: 'A test együtt rezeg a deszkával. Vízszintesen egyetlen erő hat rá: a tapadási súrlódási erő. Ez adja a rezgéshez szükséges gyorsulást.',
          tex: 'm\\,a = F_{ts}'
        },
        {
          cim: 'A megcsúszás határa',
          szoveg: 'A legnagyobb gyorsulás a szélső helyzetben kell: $a_{max} = A\\omega^2$. A tapadási erő legfeljebb $\\mu_0 mg$ lehet. A test akkor kezd csúszni, amikor a szükséges erő éppen eléri ezt a legnagyobb értéket. A tömeg kiesik.',
          tex: 'm\\,a_{max} = \\mu_0\\cdot m g \\;\\Rightarrow\\; A\\cdot\\omega^2 = \\mu_0\\, g'
        },
        {
          cim: 'Tapadási súrlódási tényező',
          szoveg: 'Fejezd ki $\\mu_0$-t, és írd be, hogy $\\omega = 2\\pi f$, tehát $\\omega^2 = 4\\pi^2 f^2$.',
          tex: '\\mu_0 = \\frac{A\\cdot\\omega^2}{g} = \\frac{A\\cdot 4\\pi^2\\cdot f^2}{g}',
          be: '\\mu_0 = \\frac{0{,}6\\cdot 4\\pi^2\\cdot 0{,}5^2}{10}',
          er: '\\mu_0 = 0{,}59'
        }
      ],
      valasz: '\\mu_0 = 0{,}59'
    },
    {
      id: 'gyf-h8', cim: 'Lejtőn rugóhoz erősített test', forras: 'GYF Harmonikus rezgés 8.',
      szoveg: 'Az $\\alpha = 30^\\circ$ hajlásszögű lejtőn m = 3 kg tömegű test van egy D = 80 N/m rugóállandójú rugóhoz erősítve. Kezdetben a testet úgy tartjuk, hogy a rugó erőmentes legyen, azután hirtelen elengedjük. A súrlódás igen kicsiny. Milyen mélységig megy le a test a lejtőn? Hol áll meg a test, ha végül is az igen csekély súrlódás megállítja?',
      adatok: ['\\alpha = 30^\\circ', 'm = 3\\,\\mathrm{kg}', 'D = 80\\,\\mathrm{N/m}', 'g = 10\\,\\mathrm{m/s^2}'],
      tipp: 'Két külön kérdés van. A legmélyebb pontot energiával keresd (ott a test egy pillanatra megáll). A végső megállás helye az egyensúlyi hely, azt erőkkel keresd.',
      lepesek: [
        {
          cim: 'A) Energiamegmaradás',
          szoveg: 'A test álló helyzetből indul, és a legmélyebb ponton megint megáll egy pillanatra. A súrlódás elhanyagolható, ezért a helyzeti energia csökkenése teljesen a rugó rugalmas energiájává alakul. A rugó megnyúlása ugyanannyi, mint a lejtőn megtett út ($x$).',
          tex: 'm g h = \\frac{1}{2} D x^2'
        },
        {
          cim: 'Magasság és lejtő menti út',
          szoveg: 'A süllyedés ($h$) és a lejtőn megtett út ($x$) között a lejtő szöge teremt kapcsolatot. Írd be $h$ helyére, és ossz $x$-szel (ez megtehető, mert $x \\neq 0$).',
          tex: '\\sin\\alpha = \\frac{h}{x} \\;\\Rightarrow\\; m g\\cdot x\\cdot\\sin\\alpha = \\frac{1}{2} D x^2',
          er: 'm g \\sin\\alpha = \\frac{1}{2} D x'
        },
        {
          cim: 'A legmélyebb pont',
          szoveg: 'Fejezd ki $x$-et, és helyettesíts be. A hozzá tartozó függőleges süllyedés $h = x\\sin\\alpha$.',
          tex: 'x = \\frac{2 m g \\sin\\alpha}{D}',
          be: 'x = \\frac{2\\cdot 3\\cdot 10\\cdot 0{,}5}{80}',
          er: 'x = 0{,}375\\,\\mathrm{m},\\qquad h = x\\cdot\\sin\\alpha = 0{,}188\\,\\mathrm{m}'
        },
        {
          cim: 'B) Végső megállás: erőegyensúly',
          szoveg: 'A csekély súrlódás lassan elfogyasztja a rezgés energiáját. A test végül ott áll meg, ahol a rá ható erők kiegyenlítik egymást: a rugóerő éppen akkora, mint a súly lejtő irányú összetevője.',
          tex: 'D\\cdot x_1 = m g\\cdot\\sin\\alpha \\;\\Rightarrow\\; x_1 = \\frac{m g\\cdot\\sin\\alpha}{D}',
          be: 'x_1 = \\frac{3\\cdot 10\\cdot 0{,}5}{80}',
          er: 'x_1 = 0{,}188\\,\\mathrm{m},\\qquad h_1 = x_1\\cdot\\sin\\alpha = 0{,}094\\,\\mathrm{m}',
          megj: 'Az $x_1$ éppen a fele az $x$-nek: az egyensúlyi hely a két szélső helyzet között középen van.'
        }
      ],
      valasz: 'x = 0{,}375\\,\\mathrm{m}\\ (h = 0{,}188\\,\\mathrm{m}),\\qquad x_1 = 0{,}188\\,\\mathrm{m}\\ (h_1 = 0{,}094\\,\\mathrm{m})'
    },
    {
      id: 'gyf-k1', cim: 'Kis rezgések: egyensúlyi helyek és periódusidő F(x)-ből', forras: 'GYF Kis amplitúdójú rezgések 1.',
      szoveg: 'Egy egyenes mentén mozgó testre ható erőt a következő függvény adja meg: $F(x) = \\left(\\dfrac{x}{2}\\right)^2 - 16$. Mely x értékeknél lehet a test nyugalomban? Melyik egyensúlyi hely körül alakulhat ki rezgés? Mekkora lesz a rezgés periódusideje? (A test tömege legyen 1 kg.)',
      adatok: ['F(x) = \\left(\\dfrac{x}{2}\\right)^2 - 16', 'm = 1\\,\\mathrm{kg}'],
      tipp: 'Nyugalomban ott lehet a test, ahol az erő nulla. Utána deriváld az erőt: a derivált előjele megmondja, melyik hely körül lehet rezgés.',
      lepesek: [
        {
          cim: 'Egyensúlyi helyek',
          szoveg: 'A test ott lehet nyugalomban, ahol nem hat rá erő. Oldd meg az $F(x) = 0$ egyenletet. Négyzetes egyenlet, ezért két megoldása van.',
          tex: 'F(x) = 0 \\;\\Rightarrow\\; \\left(\\frac{x}{2}\\right)^2 = 16 \\;\\Rightarrow\\; \\frac{x}{2} = \\pm 4',
          er: 'x_1 = 8,\\qquad x_2 = -8'
        },
        {
          cim: 'Az erő deriváltja',
          szoveg: 'A rezgéshez az kell, hogy az egyensúlyi hely közelében visszatérítő erő hasson. Ezt az erő deriváltja mutatja meg. Bontsd fel a zárójelet, úgy könnyebb deriválni.',
          tex: 'F(x) = \\frac{1}{4}x^2 - 16 \\;\\Rightarrow\\; \\frac{dF(x)}{dx} = \\frac{x}{2}'
        },
        {
          cim: 'Melyik hely körül lehet rezgés?',
          szoveg: 'Helyettesítsd be a két egyensúlyi helyet a deriváltba. Rezgés ott alakulhat ki, ahol a derivált negatív: ott hat visszatérítő erő, és ott lesz a gyök alatt pozitív szám. Az $x_1 = 8$ helyen a derivált $+4$, ott nincs rezgés.',
          tex: '\\left.\\frac{dF(x)}{dx}\\right|_{x_0 = -8} = \\frac{-8}{2}',
          er: '\\left.\\frac{dF(x)}{dx}\\right|_{x_0 = -8} = -4 \\;\\Rightarrow\\; \\text{rezgés: } x_2 = -8'
        },
        {
          cim: 'Körfrekvencia',
          szoveg: 'A kis rezgések körfrekvenciáját az erő deriváltja és a tömeg adja meg. A mínusz előjel miatt a gyök alatt pozitív szám áll.',
          tex: '\\omega = \\sqrt{-\\frac{1}{m}\\left.\\frac{dF(x)}{dx}\\right|_{x_0 = -8}}',
          be: '\\omega = \\sqrt{-\\frac{1}{1}\\cdot(-4)}',
          er: '\\omega = 2\\,\\mathrm{1/s}'
        },
        {
          cim: 'Periódusidő',
          szoveg: 'A körfrekvenciából a periódusidő a szokásos módon számolható.',
          tex: 'T = \\frac{2\\pi}{\\omega}',
          be: 'T = \\frac{2\\pi}{2} = \\pi',
          er: 'T = 3{,}14\\,\\mathrm{s}'
        }
      ],
      valasz: 'x_1 = 8,\\; x_2 = -8;\\qquad x_0 = -8:\\; T = \\pi = 3{,}14\\,\\mathrm{s}',
      megj: 'A feladatlap szövegéből az erőfüggvény képlete kiesett. Az $F(x) = \\left(\\dfrac{x}{2}\\right)^2 - 16$ alakot a tanár kézzel írt megoldásából vettük. A tanár a rezgés helyét indoklás nélkül adja meg ($x_2 = -8$); az előjeles indoklás a körfrekvencia képletéből következik.'
    }
  ],

  gyakorlo: [
    {
      id: 'gy-h2', forras: 'GYF Harmonikus rezgés 2.',
      szoveg: 'Harmonikus rezgőmozgás amplitúdója 10 cm, rezgésideje 1,57 s. Mekkora kitérése mellett egyezik meg a gyorsulás és a sebesség számértéke?',
      valasz: 'x = -2{,}43\\,\\mathrm{cm}',
      tipp: 'Kitérés–idő recept. Írd fel: $a(t) = v(t)$, azaz $-A\\omega^2\\sin\\omega t = A\\omega\\cos\\omega t$. Ebből $\\operatorname{tg}\\omega t = -\\dfrac{1}{\\omega} = -\\dfrac{T}{2\\pi} = -0{,}25$, vagyis $\\omega t = -0{,}245$ (radián). Végül $x = A\\sin\\omega t$. A tanár eredménye $-2{,}43\\,\\mathrm{cm}$; kerekítés nélkül $-2{,}42\\,\\mathrm{cm}$ jön ki (saját számolás).'
    },
    {
      id: 'gy-k2', forras: 'GYF Kis amplitúdójú rezgések 2.',
      szoveg: 'Egy m = 1 kg tömegű test, mely pontszerűnek tekinthető, az $F(x) = 16\\left(e^{-(x-2)} - 1\\right)$ erő hatására mozog. Határozza meg az egyensúlyi helyzet körül kialakuló kis rezgések periódusidejét.',
      valasz: 'T = \\frac{\\pi}{2} = 1{,}57\\,\\mathrm{s}',
      tipp: 'Kis rezgések recept. $F(x) = 0$-ból $x_0 = 2$. A derivált $-16\\,e^{-(x-2)}$, ennek értéke $x_0 = 2$-nél $-16$. Innen $\\omega = 4\\,\\mathrm{1/s}$.'
    },
    {
      id: 'gy-cs1', forras: 'GYF Csillapított rezgés 1.',
      szoveg: 'Egy csillapított rezgőmozgás amplitúdója 25 s alatt csökken a felére. Mekkora a csillapítási tényező?',
      valasz: '\\beta = \\frac{\\ln 2}{25} = 2{,}77\\cdot 10^{-2}\\,\\mathrm{1/s}',
      tipp: 'Csillapított recept. $\\dfrac{A_0}{2} = A_0\\,e^{-25\\beta}$, egyszerűsíts $A_0$-lal, majd $\\ln$: $\\ln\\dfrac{1}{2} = -\\ln 2 = -25\\beta$.'
    },
    {
      id: 'gy-cs3', forras: 'GYF Csillapított rezgés 3.',
      szoveg: 'Egy csillapított rezgőmozgás amplitúdója kezdetben 13 cm. 20 s múlva már csak 9 cm. Mekkora a csillapítási tényező? A kezdettől számítva mennyi idő múlva csökken az amplitúdó 5 mm alá?',
      valasz: '\\beta = 1{,}84\\cdot 10^{-2}\\,\\mathrm{1/s},\\qquad t = 177\\,\\mathrm{s}',
      tipp: 'Csillapított recept kétszer. Előbb $9 = 13\\,e^{-20\\beta}$-ból $\\beta = -\\dfrac{1}{20}\\ln\\dfrac{9}{13}$. Utána $0{,}5 = 13\\,e^{-\\beta t}$-ből $t = -\\dfrac{1}{\\beta}\\ln\\dfrac{0{,}5}{13}$. Az 5 mm-t váltsd át: $0{,}5\\,\\mathrm{cm}$.'
    }
  ]
}]);
