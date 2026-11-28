/* Roadmap — Hullámtan. Forrás: PróbaZH, GYF feladatsor, tanári megoldások. */
window.FIZ_ROADMAP = (window.FIZ_ROADMAP || []).concat([{
  id: 'hullamtan',
  nev: 'Hullámtan',
  leckek: ['8'],
  perc: 70,
  lenyeg: 'Szinte minden számolás a hullámfüggvényből indul: $Z(x,t) = A\\sin 2\\pi\\left(\\frac{t}{T}-\\frac{x}{\\lambda}\\right)$, mellé kell a $c = f\\cdot\\lambda$ és az $f = \\frac{1}{T}$. A ZH-n 5 rövid elméleti kérdés (1-1 pont) és 3 számolós feladat várható: hullámfüggvény leolvasása, húr terjedési sebessége, húrdarab energiája.',
  elmelet: [
    {
      k: 'Harmonikus hullámok esetén hogyan nevezzük az azonos fázisban rezgő pontok legkisebb távolságát?',
      v: 'Az azonos fázisban rezgő pontok legkisebb távolsága a hullámhossz.',
      forras: 'PróbaZH 1. kérdés · 1 pont',
      trukk: 'Egy szó a lényeg: <b>hullámhossz</b> ($\\lambda$). Írd le teljes mondatban, a „legkisebb távolság” és az „azonos fázis” szavakkal együtt.'
    },
    {
      k: 'Kétszeresére növelve a hullám intenzitását, hogyan változik a hullám amplitúdója?',
      v: 'Mivel a hullám intenzitása $I = \\frac{1}{2}\\rho\\omega^2A^2c$, ezért az amplitúdó $\\sqrt{2} = 1{,}41$-szeresére nő.',
      forras: 'PróbaZH 2. kérdés · 1 pont',
      trukk: 'A képletben az amplitúdó a négyzeten van ($A^2$). Ezért az intenzitás 2-szerese csak $\\sqrt{2}$-szeres amplitúdót jelent. Írd le a képletet is, ne csak a számot.'
    },
    {
      k: 'Szilárd anyagban mind transzverzális, mind longitudinális hullámok terjedhetnek. Mi a magyarázata?',
      v: 'A szilárd anyagokat felépítő atomok, ionok stb. között olyan jelentős erőhatások működnek, hogy ha egy atomot akár longitudinális, akár transzverzális irányba kimozdítunk az egyensúlyi helyzetéből, ugyanabba az irányba maguk után húzzák a szomszédjukat, azok is kimozdulnak ugyanabba (transzverzális vagy longitudinális) irányba.',
      forras: 'PróbaZH 3. kérdés · 1 pont',
      trukk: 'Három kulcsszó: <b>jelentős erőhatások</b> az atomok között → a kimozdított atom <b>maga után húzza a szomszédját</b> → ez <b>mindkét irányú</b> kimozdításra igaz.'
    },
    {
      k: 'Mondjon egy egyszerű eljárást arra, hogyan tudná polarizálni az ultrahangokat!',
      v: 'Az ultrahangok longitudinális hullámok, ahol nincs értelme polarizációról beszélni.',
      forras: 'PróbaZH 4. kérdés · 1 pont',
      trukk: 'Beugratós kérdés: ne keress eljárást. A válasz kulcsszava: <b>longitudinális</b> → nincs értelme polarizációról beszélni.'
    },
    {
      k: 'Fogalmazza meg a Huygens – Fresnel elvet!',
      v: 'Egy hullámfelület minden pontjából elemi gömbhullámok indulnak ki, és egy későbbi időpontban a hullámtérben megfigyelhető hatást az egyik ismert hullámfelületből kiinduló elemi hullámok interferenciája adja meg.',
      forras: 'PróbaZH 5. kérdés · 1 pont',
      trukk: 'Két fele van, mindkettő kell: (1) minden pontból <b>elemi gömbhullámok</b> indulnak, (2) a későbbi hatást ezek <b>interferenciája</b> adja. Az „interferencia” szó ne maradjon ki.'
    }
  ],
  receptek: [
    {
      cim: 'Hullámfüggvény felírása adatokból, kitérés számolása',
      mikor: 'Megadják a frekvenciát, a hullámhosszt (vagy a terjedési sebességet) és az amplitúdót, és a hullámfüggvényt vagy egy pont kitérését kérik.',
      lepesek: [
        'Számold ki a periódusidőt: $T = \\frac{1}{f}$.',
        'Ha nincs megadva a hullámhossz, számold ki: $\\lambda = \\frac{c}{f}$.',
        'Írd be az $A$, $T$, $\\lambda$ értékét az általános alakba.',
        'Ha kitérést kérnek: írd be az $x$ és a $t$ értékét is, és számold ki a szinuszt <b>radián módban</b>.',
        'Ha a legnagyobb sebességet és gyorsulást kérik: $v_{max} = A\\cdot\\omega$, $a_{max} = A\\cdot\\omega^2$, ahol $\\omega = 2\\pi f$.'
      ],
      tex: 'Z(x,t) = A\\sin 2\\pi\\left(\\frac{t}{T}-\\frac{x}{\\lambda}\\right)'
    },
    {
      cim: 'Hullámfüggvény leolvasása',
      mikor: 'Megadnak egy kész hullámfüggvényt számokkal, és az amplitúdót, frekvenciát, hullámhosszt, sebességet kérik.',
      lepesek: [
        'Írd fel az általános alakot, és hasonlítsd össze a megadott függvénnyel.',
        'A szinusz előtti szám az amplitúdó: $A$.',
        'Ha a $2\\pi$ ki van emelve: a $t$ alatt $T$ áll, az $x$ alatt $\\lambda$ áll.',
        'Ha nincs kiemelve $2\\pi$: a $t$ szorzója $\\frac{2\\pi}{T} = 2\\pi f$, az $x$ szorzója $\\frac{2\\pi}{\\lambda}$. Ebből $f$ és $\\lambda$ kifejezhető.',
        'A sebesség a végén: $c = f\\cdot\\lambda$.'
      ],
      tex: 'A\\sin 2\\pi\\left(\\frac{t}{T}-\\frac{x}{\\lambda}\\right) = A\\sin\\left(\\frac{2\\pi}{T}\\,t-\\frac{2\\pi}{\\lambda}\\,x\\right)'
    },
    {
      cim: 'Interferencia: erősítés vagy kioltás',
      mikor: 'Két azonos hullámforrás van, és megadják egy pont távolságát mindkét forrástól ($s_1$, $s_2$).',
      lepesek: [
        'Ha nincs megadva a hullámhossz: $\\lambda = \\frac{c}{f}$.',
        'Számold ki az útkülönbséget: $s_1 - s_2$ (a nagyobból vond ki a kisebbet).',
        'Próbáld az erősítés feltételét: $s_1 - s_2 = n\\cdot\\lambda$. Ha $n$ egész, erősítési hely.',
        'Ha nem jön ki egész $n$, próbáld a kioltást: $s_1 - s_2 = n\\cdot\\lambda + \\frac{\\lambda}{2}$. Ha így $n$ egész, kioltási hely.'
      ],
      tex: 's_1 - s_2 = n\\cdot\\lambda \\ \\ (\\text{erősítés}), \\qquad s_1 - s_2 = n\\cdot\\lambda + \\frac{\\lambda}{2} \\ \\ (\\text{kioltás})'
    },
    {
      cim: 'Terjedési sebesség húron és szilárd anyagban',
      mikor: 'Feszítőerő és lineáris tömegsűrűség szerepel (húr), vagy Young-modulus és sűrűség (szilárd anyag).',
      lepesek: [
        'Húr: $c = \\sqrt{\\frac{F}{\\mu}}$. A feszítőerő a ráakasztott súlyra ható gravitációs erő.',
        'Szilárd anyag: $c = \\sqrt{\\frac{E}{\\rho}}$.',
        'Ha a húron félhullámok alakulnak ki: a félhullámok száma szorozva $\\frac{\\lambda}{2}$-vel a húr hossza. Ebből megvan $\\lambda$.',
        'A sebességet a $c = f\\cdot\\lambda$ összefüggésből is megkapod. Ezután a húr képletéből kifejezhető a keresett mennyiség, például $\\mu = \\frac{F}{c^2}$.'
      ],
      tex: 'c = \\sqrt{\\frac{F}{\\mu}}, \\qquad c = \\sqrt{\\frac{E}{\\rho}}, \\qquad c = f\\cdot\\lambda'
    },
    {
      cim: 'Két hullám együttállása',
      mikor: 'Két különböző hullám egy pillanatban ugyanott hullámtarajt mutat, és azt kérdezik, mikor és milyen távolságban ismétlődik ez meg.',
      lepesek: [
        'Számold ki mindkét hullámra: $T = \\frac{1}{f}$ és $\\lambda = \\frac{c}{f}$.',
        'Időben: $t = n\\cdot T_1 = m\\cdot T_2$. Keresd a legkisebb egész $n$, $m$ párt.',
        'Térben: $d = n\\cdot\\lambda_1 = m\\cdot\\lambda_2$. Itt is a legkisebb egész $n$, $m$ pár kell.',
        'Az arányt írd fel törtként és egyszerűsíts: például $\\frac{m}{n} = \\frac{0{,}72}{0{,}48} = \\frac{3}{2}$.'
      ],
      tex: 't = n\\cdot T_1 = m\\cdot T_2, \\qquad d = n\\cdot\\lambda_1 = m\\cdot\\lambda_2'
    },
    {
      cim: 'Húrdarab energiája',
      mikor: 'Megadják a hullám frekvenciáját, amplitúdóját és a húr egy darabjának tömegét, az energiát kérik.',
      lepesek: [
        'Írd fel az energiasűrűséget: $\\varepsilon = \\frac{\\Delta E}{\\Delta V} = 2\\pi^2f^2A^2\\cdot\\rho$.',
        'Szorozd a térfogattal. Mivel $\\rho\\cdot\\Delta V = m$, ezért $\\Delta E = 2\\pi^2f^2A^2\\cdot m$.',
        'Váltsd át: mm → m, g → kg.',
        'Helyettesíts be, és írd ki az eredményt joule-ban.'
      ],
      tex: '\\Delta E = \\varepsilon\\cdot\\Delta V = 2\\pi^2f^2A^2\\cdot m'
    }
  ],
  tippek: [
    'A szinusz argumentumából olvass: ha <b>nincs</b> kiemelve $2\\pi$, akkor a $t$ szorzója $\\omega = 2\\pi f$, az $x$ szorzója $\\frac{2\\pi}{\\lambda}$. Ha a $2\\pi$ <b>ki van emelve</b>, akkor $\\frac{t}{T}$ és $\\frac{x}{\\lambda}$ áll a zárójelben.',
    'A három alapösszefüggés, amit kívülről tudnod kell: $f = \\frac{1}{T}$, $c = f\\cdot\\lambda$, $\\omega = 2\\pi f$.',
    'Erősítés: $s_1 - s_2 = n\\cdot\\lambda$. Kioltás: $s_1 - s_2 = n\\cdot\\lambda + \\frac{\\lambda}{2}$. Az $n$ egész szám, lehet $0$ is.',
    'A számológép legyen <b>radián</b> módban, amikor a hullámfüggvénybe helyettesítesz. Fok módban rossz eredményt kapsz.',
    'Váltsd át az adatokat számolás előtt: mm → m (például $0{,}16\\,\\mathrm{mm} = 0{,}16\\cdot 10^{-3}\\,\\mathrm{m}$), g → kg, cm → m. Nézd meg, a feladat miben méri az $x$-et (a GYF 2.-ben cm-ben).',
    'Ne keverd: $v_{max} = A\\cdot\\omega$ a húr egy pontjának legnagyobb sebessége, a $c = f\\cdot\\lambda$ pedig a hullám terjedési sebessége. Két külön dolog.',
    'A terjedési sebességet a tanár hol $c$-vel, hol $v$-vel jelöli. Ugyanazt jelenti.',
    'A teljes levezetést le kell írni: képlet betűkkel → behelyettesítés számokkal → eredmény mértékegységgel.'
  ],
  feladatok: [
    {
      id: 'zh6',
      cim: 'Hullámfüggvény leolvasása',
      forras: 'PróbaZH 6. feladat · 2 pont',
      zh: true,
      szoveg: 'Egy húron terjedő hullám az alábbi hullámfüggvénnyel írható le: $Z(x,t) = 0{,}02\\sin(30t - 4{,}0x)$. Határozzuk meg az amplitúdóját, frekvenciáját, sebességét és hullámhosszát!',
      adatok: ['Z(x,t) = 0{,}02\\sin(30t - 4{,}0x)'],
      tipp: 'Írd a megadott függvény alá az általános alakot, és nézd meg, melyik szám minek felel meg. A $t$ és az $x$ szorzójára figyelj.',
      lepesek: [
        {
          cim: 'Általános alak felírása',
          szoveg: 'Az egyenes mentén terjedő harmonikus hullám függvényének van egy általános alakja. Ezzel hasonlítjuk össze a megadott függvényt. Ha a $2\\pi$-vel beszorzol, látszik, hogy a $t$ szorzója $\\frac{2\\pi}{T}$, az $x$ szorzója $\\frac{2\\pi}{\\lambda}$.',
          tex: 'Z(x,t) = A\\sin 2\\pi\\left(\\frac{t}{T}-\\frac{x}{\\lambda}\\right) = A\\sin\\left(\\frac{2\\pi}{T}\\,t-\\frac{2\\pi}{\\lambda}\\,x\\right)'
        },
        {
          cim: 'Amplitúdó',
          szoveg: 'Az amplitúdó a szinusz előtt álló szám. Ezt csak le kell olvasni.',
          tex: 'A = 0{,}02\\,\\mathrm{m}',
          er: 'A = 0{,}02\\,\\mathrm{m}',
          megj: 'A ZH-lapon a függvény mellett nincs mértékegység. A tanár méterben adja meg az eredményt.'
        },
        {
          cim: 'Frekvencia',
          szoveg: 'A $t$ szorzója a megadott függvényben $30$. Az általános alakban ez $\\frac{2\\pi}{T}$, ami ugyanaz, mint $2\\pi f$. Ebből kifejezed az $f$-et.',
          tex: '\\frac{2\\pi}{T} = 2\\pi f = 30',
          be: 'f = \\frac{30}{2\\pi}',
          er: 'f = 4{,}78\\,\\mathrm{Hz}'
        },
        {
          cim: 'Hullámhossz',
          szoveg: 'Az $x$ szorzója a megadott függvényben $4{,}0$. Az általános alakban ez $\\frac{2\\pi}{\\lambda}$. Ebből kifejezed a $\\lambda$-t.',
          tex: '\\frac{2\\pi}{\\lambda} = 4{,}0',
          be: '\\lambda = \\frac{2\\pi}{4{,}0}',
          er: '\\lambda = 1{,}57\\,\\mathrm{m}'
        },
        {
          cim: 'Terjedési sebesség',
          szoveg: 'A feladat a sebességet is kéri. Ezt a frekvencia és a hullámhossz szorzata adja.',
          tex: 'c = f\\cdot\\lambda',
          be: 'c = 4{,}78\\cdot 1{,}57',
          er: 'c = 7{,}5\\,\\mathrm{m/s}',
          megj: 'A gépelt tanári megoldásban a sebesség nincs kiszámolva. Ez a sor saját számolás, a tanár GYF 8. feladatbeli módszerével ($v = f\\cdot\\lambda$).'
        }
      ],
      valasz: 'A = 0{,}02\\,\\mathrm{m},\\ f = 4{,}78\\,\\mathrm{Hz},\\ \\lambda = 1{,}57\\,\\mathrm{m},\\ c = 7{,}5\\,\\mathrm{m/s}',
      megj: 'Vigyázz: a GYF 8. feladat majdnem ugyanez, de ott $0{,}4x$ áll a függvényben. Ott $\\lambda = 15{,}7\\,\\mathrm{m}$ és a sebesség $75\\,\\mathrm{m/s}$. Mindig a kapott lapról olvasd le a számokat.'
    },
    {
      id: 'zh7',
      cim: 'Húr lineáris tömegsűrűsége',
      forras: 'PróbaZH 7. feladat · 1,5 pont',
      zh: true,
      szoveg: 'Egy vízszintesen kifeszített 200 cm hosszú huzalt 800 g tömegű súllyal húzunk. A húron 3 db félhullám alakul ki 480 Hz-es frekvencián. Mekkora a húr lineáris tömegsűrűsége (kg/m)?',
      adatok: ['l = 200\\,\\mathrm{cm} = 2\\,\\mathrm{m}', 'm = 800\\,\\mathrm{g} = 0{,}8\\,\\mathrm{kg}', '3\\ \\text{félhullám}', 'f = 480\\,\\mathrm{Hz}', '\\mu = \\,?'],
      tipp: 'A húron a terjedési sebesség a feszítőerőtől és a lineáris tömegsűrűségtől függ. A sebességet a félhullámok számából és a frekvenciából tudod kiszámolni.',
      lepesek: [
        {
          cim: 'Melyik összefüggés kell',
          szoveg: 'Kifeszített huzalon a hullám terjedési sebessége a feszítőerőtől ($F$) és a lineáris tömegsűrűségtől ($\\mu$, az egységnyi hosszú huzal tömege) függ. Ebből kell majd a $\\mu$. Előbb az $F$-et és a $c$-t kell megtudnod.',
          tex: 'c = \\sqrt{\\frac{F}{\\mu}}'
        },
        {
          cim: 'Feszítőerő',
          szoveg: 'A huzalt a ráakasztott 800 g-os súly feszíti. A feszítőerő az erre ható gravitációs erő. A tanár közelítőleg 8 N-nal számol.',
          tex: 'F = m\\cdot g',
          be: 'F \\approx 0{,}8\\cdot 10',
          er: 'F \\approx 8\\,\\mathrm{N}'
        },
        {
          cim: 'Hullámhossz a félhullámokból',
          szoveg: 'A 200 cm hosszú huzalon 3 félhullámból álló állóhullám alakul ki. Tehát három darab fél hullámhossz éppen 2 m.',
          tex: '3\\cdot\\frac{\\lambda}{2} = 2\\,\\mathrm{m}',
          be: '\\lambda = \\frac{2\\cdot 2}{3}',
          er: '\\lambda = \\frac{4}{3}\\,\\mathrm{m}'
        },
        {
          cim: 'Terjedési sebesség',
          szoveg: 'Harmonikus hullámra a sebesség a frekvencia és a hullámhossz szorzata.',
          tex: 'c = f\\cdot\\lambda',
          be: 'c = 480\\cdot\\frac{4}{3}',
          er: 'c = 640\\,\\mathrm{m/s}'
        },
        {
          cim: 'Lineáris tömegsűrűség',
          szoveg: 'Az első lépés képletét négyzetre emeled, és kifejezed belőle a $\\mu$-t. Utána behelyettesíted az $F$-et és a $c$-t.',
          tex: 'c^2 = \\frac{F}{\\mu} \\ \\Rightarrow\\ \\mu = \\frac{F}{c^2}',
          be: '\\mu = \\frac{8}{640^2}',
          er: '\\mu = 1{,}95\\cdot 10^{-5}\\,\\mathrm{kg/m}'
        }
      ],
      valasz: '\\mu = 1{,}95\\cdot 10^{-5}\\,\\mathrm{kg/m}',
      megj: 'A tanár $g \\approx 10\\,\\mathrm{m/s^2}$-tel számol ($F \\approx 8\\,\\mathrm{N}$), ezt kövesd. Ha $g = 9{,}81\\,\\mathrm{m/s^2}$-tel számolnál: $F = 7{,}85\\,\\mathrm{N}$ és $\\mu = 1{,}92\\cdot 10^{-5}\\,\\mathrm{kg/m}$ (saját számolás).'
    },
    {
      id: 'zh8',
      cim: 'Húrdarab energiája',
      forras: 'PróbaZH 8. feladat · 1,5 pont',
      zh: true,
      szoveg: 'Egy húron terjedő 120 Hz-es hullám amplitúdója 0,16 mm. Mekkora az energiája a húr egy 80 g-os részének?',
      adatok: ['f = 120\\,\\mathrm{Hz}', 'A = 0{,}16\\,\\mathrm{mm} = 0{,}16\\cdot 10^{-3}\\,\\mathrm{m}', 'm = 80\\,\\mathrm{g} = 80\\cdot 10^{-3}\\,\\mathrm{kg}', '\\Delta E = \\,?'],
      tipp: 'A harmonikus hullám energiasűrűségéből indulj. A sűrűség szorozva a térfogattal éppen a megadott tömeg.',
      lepesek: [
        {
          cim: 'Energiasűrűség felírása',
          szoveg: 'A harmonikus hullám energiasűrűsége megmondja, mennyi energia jut egységnyi térfogatra. Ebből indulunk, mert ebben szerepel a frekvencia és az amplitúdó.',
          tex: '\\varepsilon = \\frac{\\Delta E}{\\Delta V} = 2\\pi^2f^2A^2\\cdot\\rho'
        },
        {
          cim: 'Energia a tömeggel kifejezve',
          szoveg: 'Az energiát úgy kapod, hogy az energiasűrűséget megszorzod a térfogattal. A sűrűség és a térfogat szorzata a tömeg ($\\rho\\cdot\\Delta V = m$). Így a képletben már csak ismert adatok maradnak.',
          tex: '\\Delta E = \\varepsilon\\cdot\\Delta V = 2\\pi^2f^2A^2\\cdot\\rho\\cdot\\Delta V = 2\\pi^2f^2A^2\\cdot m'
        },
        {
          cim: 'Átváltás',
          szoveg: 'Az amplitúdót méterbe, a tömeget kilogrammba kell átváltani. Különben nem joule jön ki.',
          tex: 'A = 0{,}16\\,\\mathrm{mm} = 0{,}16\\cdot 10^{-3}\\,\\mathrm{m}, \\qquad m = 80\\,\\mathrm{g} = 80\\cdot 10^{-3}\\,\\mathrm{kg}'
        },
        {
          cim: 'Behelyettesítés',
          szoveg: 'Most minden számot beírsz a képletbe. Figyelj, hogy a frekvencia és az amplitúdó is négyzeten van.',
          tex: '\\Delta E = 2\\pi^2f^2A^2\\cdot m',
          be: '\\Delta E = 2\\pi^2\\cdot 120^2\\cdot\\left(0{,}16\\cdot 10^{-3}\\right)^2\\cdot 80\\cdot 10^{-3}',
          er: '\\Delta E = 5{,}82\\cdot 10^{-4}\\,\\mathrm{J}'
        }
      ],
      valasz: '\\Delta E = 5{,}82\\cdot 10^{-4}\\,\\mathrm{J}',
      megj: 'Ugyanez a feladat a GYF 9. Ott a tanár kézzel így írta fel: $E = \\frac{1}{2}m\\omega^2A^2$. Mivel $\\omega = 2\\pi f$, ez ugyanaz a képlet, és ugyanaz az eredmény jön ki.'
    },
    {
      id: 'gyf1',
      cim: 'Hullámfüggvény felírása, legnagyobb sebesség és gyorsulás',
      forras: 'GYF Hullámtan 1.',
      szoveg: 'A végtelen húron terjedő transzverzális hullám frekvenciája 50 Hz, hullámhossza 0,4 m és amplitúdója 5 mm. Írja fel a hullámfüggvényt. Adja meg a húr tetszőleges pontjának legnagyobb sebességét! Adja meg a húr tetszőleges pontjának legnagyobb gyorsulását!',
      adatok: ['f = 50\\,\\mathrm{Hz}', '\\lambda = 0{,}4\\,\\mathrm{m}', 'A = 5\\,\\mathrm{mm} = 5\\cdot 10^{-3}\\,\\mathrm{m}'],
      tipp: 'Az általános alakba három szám kell: $A$, $T$, $\\lambda$. Kettő megvan, a $T$-t a frekvenciából számolod.',
      lepesek: [
        {
          cim: 'Általános alak',
          szoveg: 'A hullámfüggvény általános alakjába kell beírni az adatokat. Ebben az amplitúdó, a periódusidő és a hullámhossz szerepel.',
          tex: 'Z(x,t) = A\\cdot\\sin 2\\pi\\left(\\frac{t}{T}-\\frac{x}{\\lambda}\\right)'
        },
        {
          cim: 'Periódusidő és átváltás',
          szoveg: 'A periódusidő a frekvencia reciproka. Az amplitúdót közben átváltod méterbe.',
          tex: 'T = \\frac{1}{f}',
          be: 'T = \\frac{1}{50}',
          er: 'T = 0{,}02\\,\\mathrm{s}, \\qquad A = 5\\cdot 10^{-3}\\,\\mathrm{m}'
        },
        {
          cim: 'Hullámfüggvény számokkal',
          szoveg: 'Beírod a három számot az általános alakba. Az $x$ és a $t$ betű marad, mert ez egy függvény.',
          er: 'Z(x,t) = 5\\cdot 10^{-3}\\cdot\\sin 2\\pi\\left(\\frac{t}{0{,}02}-\\frac{x}{0{,}4}\\right)'
        },
        {
          cim: 'Legnagyobb sebesség',
          szoveg: 'A húr minden pontja harmonikus rezgést végez. A rezgő pont legnagyobb sebessége az amplitúdó és a körfrekvencia szorzata.',
          tex: 'v_{max} = A\\cdot\\omega = A\\cdot 2\\pi\\cdot f',
          be: 'v_{max} = 5\\cdot 10^{-3}\\cdot\\pi\\cdot 100',
          er: 'v_{max} = 1{,}57\\,\\mathrm{m/s}'
        },
        {
          cim: 'Legnagyobb gyorsulás',
          szoveg: 'A legnagyobb gyorsulásnál a körfrekvencia a négyzeten van.',
          tex: 'a_{max} = A\\cdot\\omega^2 = A\\cdot(2\\pi\\cdot f)^2',
          be: 'a_{max} = 5\\cdot 10^{-3}\\cdot(\\pi\\cdot 100)^2',
          er: 'a_{max} = 493\\,\\mathrm{m/s^2}'
        }
      ],
      valasz: 'Z(x,t) = 5\\cdot 10^{-3}\\sin 2\\pi\\left(\\frac{t}{0{,}02}-\\frac{x}{0{,}4}\\right),\\quad v_{max} = 1{,}57\\,\\mathrm{m/s},\\quad a_{max} = 493\\,\\mathrm{m/s^2}'
    },
    {
      id: 'gyf2',
      cim: 'Frekvencia és sebesség leolvasása (kiemelt 2π)',
      forras: 'GYF Hullámtan 2.',
      szoveg: 'Mi a frekvenciája és a terjedési sebessége a $Z(x,t) = 4\\sin 2\\pi\\left(\\frac{t}{0{,}02}-\\frac{x}{400}\\right)$ függvénnyel megadott hullámnak? (Az időt másodpercben, az x-et cm-ben mérjük.)',
      adatok: ['Z(x,t) = 4\\sin 2\\pi\\left(\\frac{t}{0{,}02}-\\frac{x}{400}\\right)', 't\\ [\\mathrm{s}],\\quad x\\ [\\mathrm{cm}]'],
      tipp: 'Itt a $2\\pi$ ki van emelve, ezért a $t$ alatt közvetlenül a $T$, az $x$ alatt a $\\lambda$ áll. Nézd meg, miben mérjük az $x$-et.',
      lepesek: [
        {
          cim: 'Összehasonlítás az általános alakkal',
          szoveg: 'A megadott függvény pontosan olyan alakú, mint az általános alak. A $t$ alatti szám a periódusidő, az $x$ alatti szám a hullámhossz.',
          tex: 'Z(x,t) = A\\sin 2\\pi\\left(\\frac{t}{T}-\\frac{x}{\\lambda}\\right)',
          er: 'T = 0{,}02\\,\\mathrm{s}, \\qquad \\lambda = 400\\,\\mathrm{cm}'
        },
        {
          cim: 'Hullámhossz méterben',
          szoveg: 'Az $x$-et cm-ben mérjük, ezért a 400 is cm. Ezt átváltod méterbe.',
          er: '\\lambda = 400\\,\\mathrm{cm} = 4\\,\\mathrm{m}'
        },
        {
          cim: 'Frekvencia',
          szoveg: 'A frekvencia a periódusidő reciproka.',
          tex: 'f = \\frac{1}{T}',
          be: 'f = \\frac{1}{0{,}02}',
          er: 'f = 50\\,\\mathrm{Hz}'
        },
        {
          cim: 'Terjedési sebesség',
          szoveg: 'A sebesség a frekvencia és a hullámhossz szorzata.',
          tex: 'c = f\\cdot\\lambda',
          be: 'c = 50\\cdot 4',
          er: 'c = 200\\,\\mathrm{m/s}'
        }
      ],
      valasz: 'f = 50\\,\\mathrm{Hz},\\ c = 200\\,\\mathrm{m/s}',
      megj: 'A txt-forrásból a $\\pi$ jel kiesett a függvényből. A tanári megoldás szerint a függvényben $\\sin 2\\pi(\\dots)$ áll.'
    },
    {
      id: 'gyf3',
      cim: 'Kitérés adott helyen és időben',
      forras: 'GYF Hullámtan 3.',
      szoveg: 'Fonal vége A=2 cm amplitúdóval másodpercenként 5 harmonikus rezgést végez. Mekkora a fonal rezgésben tartott végétől x=1,2 m távolságban levő pontjának kitérése a rezgés kezdetétől eltelt t=1,5 s múlva? A rezgés terjedési sebessége v=20 m/s.',
      adatok: ['A = 2\\,\\mathrm{cm}', 'f = 5\\,\\mathrm{Hz}', 'x = 1{,}2\\,\\mathrm{m}', 't = 1{,}5\\,\\mathrm{s}', 'v = 20\\,\\mathrm{m/s}'],
      tipp: 'Előbb írd fel a hullámfüggvényt számokkal (ehhez $T$ és $\\lambda$ kell), csak utána írd be az $x$-et és a $t$-t.',
      lepesek: [
        {
          cim: 'Melyik összefüggés kell',
          szoveg: 'Egy pont kitérését adott időben a hullámfüggvény adja meg. Ehhez az amplitúdó mellé a periódusidő és a hullámhossz kell. Ezeket számoljuk ki először.',
          tex: 'Z(x,t) = A\\cdot\\sin 2\\pi\\left(\\frac{t}{T}-\\frac{x}{\\lambda}\\right)'
        },
        {
          cim: 'Periódusidő',
          szoveg: 'Másodpercenként 5 rezgés azt jelenti, hogy a frekvencia 5 Hz. A periódusidő ennek a reciproka.',
          tex: 'T = \\frac{1}{f}',
          be: 'T = \\frac{1}{5}',
          er: 'T = 0{,}2\\,\\mathrm{s}'
        },
        {
          cim: 'Hullámhossz',
          szoveg: 'A hullámhossz a terjedési sebesség és a frekvencia hányadosa. A feladat a terjedési sebességet $v$-vel jelöli.',
          tex: '\\lambda = \\frac{v}{f}',
          be: '\\lambda = \\frac{20}{5}',
          er: '\\lambda = 4\\,\\mathrm{m}'
        },
        {
          cim: 'Hullámfüggvény számokkal',
          szoveg: 'Beírod az $A$, $T$, $\\lambda$ értékét. Az amplitúdó cm-ben marad, ezért a kitérés is cm-ben jön ki.',
          er: 'Z(x,t) = 2\\cdot\\sin 2\\pi\\left(\\frac{t}{0{,}2}-\\frac{x}{4}\\right)'
        },
        {
          cim: 'Hely és idő behelyettesítése',
          szoveg: 'Most beírod az $x = 1{,}2\\,\\mathrm{m}$ és a $t = 1{,}5\\,\\mathrm{s}$ értéket. A szinuszt radián módban számold.',
          tex: 'Z(x = 1{,}2;\\ t = 1{,}5) = 2\\cdot\\sin 2\\pi\\left(\\frac{1{,}5}{0{,}2}-\\frac{1{,}2}{4}\\right)',
          be: 'Z = 2\\cdot\\sin 2\\pi\\,(7{,}5 - 0{,}3)',
          er: 'Z = 1{,}89\\,\\mathrm{cm}',
          megj: 'A tanár kézírásában $1{,}89\\,\\mathrm{cm}$ olvasható. Pontosan számolva: $2\\cdot\\sin(2\\pi\\cdot 7{,}2) = 2\\cdot 0{,}951 = 1{,}90\\,\\mathrm{cm}$ (saját számolás).'
        }
      ],
      valasz: 'Z(x = 1{,}2;\\ t = 1{,}5) \\approx 1{,}9\\,\\mathrm{cm}',
      megj: 'A tanári lapon $1{,}89\\,\\mathrm{cm}$ szerepel, a pontos érték $1{,}90\\,\\mathrm{cm}$ (saját számolás). A ZH-n azt írd, amit a számológéped radián módban kiad.'
    },
    {
      id: 'gyf4',
      cim: 'Interferencia: erősítés vagy kioltás',
      forras: 'GYF Hullámtan 4.',
      szoveg: 'Teljesen sima vízfelületen két pontszerű rezgéskeltővel, egymástól nem nagy távolságban, 12 Hz frekvenciájú, azonos fázisállapotú és amplitúdójú hullámokat gerjesztettek. A hullámok terjedési sebessége 1,2 m/s. Milyen jelenség figyelhető meg a vízfelület azon helyén, amely az egyik rezgéskeltőtől 15 cm, a másiktól 25 cm távolságra van, illetve amely az egyik rezgéskeltőtől 17 cm, a másiktól 22 cm távolságra van?',
      adatok: ['f = 12\\,\\mathrm{Hz}', 'v = 1{,}2\\,\\mathrm{m/s}', 's_1 = 25\\,\\mathrm{cm},\\ s_2 = 15\\,\\mathrm{cm}', 's_1 = 22\\,\\mathrm{cm},\\ s_2 = 17\\,\\mathrm{cm}'],
      tipp: 'Minden az útkülönbségen múlik. Előbb számold ki a hullámhosszt, aztán nézd meg, hányszor fér bele az útkülönbségbe.',
      lepesek: [
        {
          cim: 'Hullámhossz',
          szoveg: 'Az erősítés és a kioltás feltételében a hullámhossz szerepel. Ezt a sebességből és a frekvenciából számolod, és átváltod cm-be, mert a távolságok is cm-ben vannak.',
          tex: '\\lambda = \\frac{v}{f}',
          be: '\\lambda = \\frac{1{,}2}{12}',
          er: '\\lambda = 0{,}1\\,\\mathrm{m} = 10\\,\\mathrm{cm}'
        },
        {
          cim: 'A két feltétel',
          szoveg: 'Ha az útkülönbség a hullámhossz egész számú többszöröse, a két hullám erősíti egymást. Ha ehhez képest még egy fél hullámhossz a különbség, kioltják egymást. Az $n$ egész szám.',
          tex: 's_1 - s_2 = n\\cdot\\lambda \\ \\ (\\text{erősítés}), \\qquad s_1 - s_2 = n\\cdot\\lambda + \\frac{\\lambda}{2} \\ \\ (\\text{kioltás})'
        },
        {
          cim: 'Első pont: 25 cm és 15 cm',
          szoveg: 'Kiszámolod az útkülönbséget, és beírod az erősítés feltételébe. Egész $n$ jön ki, tehát ez erősítési hely.',
          tex: 's_1 - s_2 = n\\cdot\\lambda',
          be: '25 - 15 = n\\cdot 10',
          er: 'n = 1 \\ \\Rightarrow\\ \\text{erősítési hely}'
        },
        {
          cim: 'Második pont: 22 cm és 17 cm',
          szoveg: 'Az útkülönbség most 5 cm. Ez nem egész számú többszöröse a 10 cm-nek, tehát nem erősítés. A kioltás feltétele viszont $n = 0$-ra teljesül, mert az 5 cm éppen fél hullámhossz.',
          tex: 's_1 - s_2 = n\\cdot\\lambda + \\frac{\\lambda}{2}',
          be: '22 - 17 = n\\cdot 10 + 5',
          er: 'n = 0 \\ \\Rightarrow\\ \\text{kioltási hely}',
          megj: 'Ez a rész a tanári lapon nincs megoldva (saját számolás), a tanár GYF 7. feladatbeli módszerével.'
        }
      ],
      valasz: '\\text{1. pont: erősítés } (n = 1), \\qquad \\text{2. pont: kioltás } (n = 0)',
      megj: 'A tanári lapon csak az első pont (25 cm és 15 cm) megoldása szerepel. A második pont eredménye (kioltás) saját számolás.'
    },
    {
      id: 'gyf5',
      cim: 'Terjedési sebesség vasban',
      forras: 'GYF Hullámtan 5.',
      szoveg: 'Mennyi a deformáció terjedése vasban, ha a Young-modulus $2\\cdot 10^{11}\\,\\mathrm{N/m^2}$ és a vas sűrűsége $7{,}8\\cdot 10^{3}\\,\\mathrm{kg/m^3}$?',
      adatok: ['E = 2\\cdot 10^{11}\\,\\mathrm{N/m^2}', '\\rho = 7{,}8\\cdot 10^{3}\\,\\mathrm{kg/m^3}'],
      tipp: 'Young-modulus és sűrűség van megadva: ebből a kettőből egy gyökös képlet adja a terjedési sebességet.',
      lepesek: [
        {
          cim: 'Melyik összefüggés kell',
          szoveg: 'A deformáció terjedése itt a terjedési sebességet jelenti. Szilárd anyagban ezt a Young-modulus és a sűrűség hányadosának négyzetgyöke adja. A tanár $c_l$-lel jelöli.',
          tex: 'c_l = \\sqrt{\\frac{E}{\\rho}}'
        },
        {
          cim: 'Behelyettesítés',
          szoveg: 'Mindkét adat SI-egységben van, nem kell átváltani. Figyelj a tízes kitevők beütésére a számológépen.',
          tex: 'c_l = \\sqrt{\\frac{E}{\\rho}}',
          be: 'c_l = \\sqrt{\\frac{2\\cdot 10^{11}}{7{,}8\\cdot 10^{3}}}',
          er: 'c_l = 5064\\,\\mathrm{m/s}'
        },
        {
          cim: 'Átváltás km/s-ba',
          szoveg: 'A tanár az eredményt km/s-ban is megadja. Ehhez 1000-rel osztasz.',
          er: 'c_l = 5{,}064\\,\\mathrm{km/s}'
        }
      ],
      valasz: 'c_l = 5064\\,\\mathrm{m/s} = 5{,}064\\,\\mathrm{km/s}',
      megj: 'A txt-forrásban a kitevők elcsúsztak (2*1011, 7,8*103). Helyesen: $2\\cdot 10^{11}$ és $7{,}8\\cdot 10^{3}$.'
    },
    {
      id: 'gyf6',
      cim: 'Két vízhullám együttállása',
      forras: 'GYF Hullámtan 6.',
      szoveg: 'Két párhuzamos vályúban egy-egy vízhullám halad. Frekvenciájuk és sebességük rendre 5 Hz, ill. 10 Hz és 3,6 m/s, ill. 4,8 m/s. Egy adott pillanatban mindkét vályúban ugyanazon pontban hullámtaraj figyelhető meg. Mikor ismétlődik meg ez a jelenség ugyanazon pontban? Milyen távolságban ismétlődik ez ugyanabban a pillanatban?',
      adatok: ['f_1 = 5\\,\\mathrm{Hz},\\ v_1 = 3{,}6\\,\\mathrm{m/s}', 'f_2 = 10\\,\\mathrm{Hz},\\ v_2 = 4{,}8\\,\\mathrm{m/s}'],
      tipp: 'Egy pontban a taraj periódusidőnként tér vissza, egy pillanatban pedig hullámhosszanként ismétlődik. Mindkét hullámra számold ki a $T$-t és a $\\lambda$-t.',
      lepesek: [
        {
          cim: 'Periódusidők',
          szoveg: 'Egy adott pontban a hullámtaraj mindig egy periódusidő múlva jelenik meg újra. Ezért először a két periódusidő kell.',
          tex: 'T = \\frac{1}{f}',
          be: 'T_1 = \\frac{1}{5}, \\qquad T_2 = \\frac{1}{10}',
          er: 'T_1 = 0{,}2\\,\\mathrm{s}, \\qquad T_2 = 0{,}1\\,\\mathrm{s}'
        },
        {
          cim: 'Hullámhosszak',
          szoveg: 'Egy adott pillanatban a tarajok egymástól egy hullámhossznyira vannak. Ezért a két hullámhossz is kell.',
          tex: '\\lambda = \\frac{v}{f}',
          be: '\\lambda_1 = \\frac{3{,}6}{5}, \\qquad \\lambda_2 = \\frac{4{,}8}{10}',
          er: '\\lambda_1 = 0{,}72\\,\\mathrm{m}, \\qquad \\lambda_2 = 0{,}48\\,\\mathrm{m}'
        },
        {
          cim: 'A) Feltétel időben',
          szoveg: 'A jelenség akkor ismétlődik meg ugyanott, amikor mindkét hullámból egész számú periódus telt el. Az $n$ és az $m$ egész szám.',
          tex: 't = n\\cdot T_1 = m\\cdot T_2',
          be: 'n\\cdot 0{,}2 = m\\cdot 0{,}1',
          er: '\\frac{m}{n} = \\frac{0{,}2}{0{,}1} = \\frac{2}{1}'
        },
        {
          cim: 'A) Az idő kiszámítása',
          szoveg: 'A legkisebb egész megoldás: $n = 1$, $m = 2$. Ezt visszaírod a feltételbe.',
          tex: 't = n\\cdot T_1 = m\\cdot T_2',
          be: 't = 1\\cdot 0{,}2 = 2\\cdot 0{,}1',
          er: 't = 0{,}2\\,\\mathrm{s}'
        },
        {
          cim: 'B) Feltétel térben',
          szoveg: 'Ugyanabban a pillanatban ott lesz megint mindkét vályúban taraj, ahová mindkét hullámból egész számú hullámhossz fér. Az arányt törtként írod fel, és egyszerűsítesz.',
          tex: 'd = n\\cdot\\lambda_1 = m\\cdot\\lambda_2',
          be: 'n\\cdot 0{,}72 = m\\cdot 0{,}48',
          er: '\\frac{m}{n} = \\frac{0{,}72}{0{,}48} = \\frac{3}{2}'
        },
        {
          cim: 'B) A távolság kiszámítása',
          szoveg: 'A legkisebb egész megoldás: $n = 2$, $m = 3$. Ezt visszaírod a feltételbe.',
          tex: 'd = n\\cdot\\lambda_1 = m\\cdot\\lambda_2',
          be: 'd = 2\\cdot 0{,}72 = 3\\cdot 0{,}48',
          er: 'd = 1{,}44\\,\\mathrm{m}'
        }
      ],
      valasz: 't = 0{,}2\\,\\mathrm{s},\\quad d = 1{,}44\\,\\mathrm{m}'
    }
  ],
  gyakorlo: [
    {
      id: 'gyf7',
      forras: 'GYF Hullámtan 7.',
      szoveg: 'Víz felszínén két, egymástól d távolságban levő, teljesen egyforma és azonos körülmények között működő hullámkeltővel felületi hullámokat hozunk létre. Az egyes hullámforrások által keltett hullámok hullámhossza 6 cm. Mit tapasztalunk abban a pontban, amely az egyik gerjesztési helytől 12 cm, a másiktól pedig 9 cm-re van?',
      valasz: 's_1 - s_2 = 12 - 9 = 3\\,\\mathrm{cm} = n\\cdot 6 + 3 \\ \\Rightarrow\\ n = 0,\\ \\text{kioltás}',
      tipp: 'Interferencia-recept. Előbb próbáld az erősítést ($3 = n\\cdot 6$: egész $n$-re nem teljesül), utána a kioltást ($3 = n\\cdot 6 + 3$: $n = 0$-ra teljesül).'
    },
    {
      id: 'gyf8',
      forras: 'GYF Hullámtan 8.',
      szoveg: 'Egy húron terjedő hullám a következő hullámfüggvénnyel írható le: $Z(x,t) = 0{,}02\\sin(30t - 0{,}4x)\\,\\mathrm{m}$. Határozza meg az amplitúdóját, frekvenciáját, sebességét és hullámhosszát.',
      valasz: 'A = 0{,}02\\,\\mathrm{m},\\ f = 4{,}78\\,\\mathrm{Hz},\\ \\lambda = 15{,}7\\,\\mathrm{m},\\ v = 75\\,\\mathrm{m/s}',
      tipp: 'Leolvasás-recept, ugyanaz, mint a PróbaZH 6. feladat, csak itt az $x$ szorzója $0{,}4$: $2\\pi f = 30$, $\\frac{2\\pi}{\\lambda} = 0{,}4$, a végén $v = f\\cdot\\lambda$.'
    },
    {
      id: 'gyf9',
      forras: 'GYF Hullámtan 9.',
      szoveg: 'Egy húron terjedő 120 Hz-es hullám amplitúdója 0,160 mm. Mekkora energia tárolódik a húr egy 80 g-os részében?',
      valasz: 'E = 5{,}82\\cdot 10^{-4}\\,\\mathrm{J}',
      tipp: 'Energia-recept, ugyanaz, mint a PróbaZH 8. feladat. A tanár kézzel így számolta: $E = \\frac{1}{2}m\\omega^2A^2 = \\frac{1}{2}\\cdot 0{,}08\\cdot\\left(1{,}6\\cdot 10^{-4}\\cdot 2\\pi\\cdot 120\\right)^2$. Váltsd át: mm → m, g → kg.'
    }
  ]
}]);
