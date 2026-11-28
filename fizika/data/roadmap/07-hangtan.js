/* Roadmap — Hangtan. Forrás: PróbaZH, MINTA vizsga, GYF feladatsor, tanári megoldások. */
window.FIZ_ROADMAP = (window.FIZ_ROADMAP || []).concat([{
  id: 'hangtan',
  nev: 'Hangtan',
  leckek: ['9'],
  perc: 70,
  lenyeg: 'Négy számolós típus jön elő: decibel ↔ intenzitás ($n = 10\\,\\lg\\frac{I}{I_0}$), síp és fal előtti állóhullám (fél és negyed hullámhosszak), Doppler-effektus, két hangszóró interferenciája. Mindegyik 2–5 soros, ha tudod, melyik képlettel kell kezdeni.',

  elmelet: [
    {
      k: 'Mondjon olyan hangforrást, amely transzverzális hanghullámokat állít elő!',
      v: 'Nincs olyan hangforrás, amely transzverzális hullámokat kelt.',
      forras: 'PróbaZH 1. · 1 pont',
      trukk: 'Beugratós kérdés: ne keress példát. A jó válasz az, hogy ilyen hangforrás nincs (a hang levegőben longitudinális hullám).'
    },
    {
      k: 'Egy síp egyik végén zárt, a másik végén nyitott. Mit értünk ez alatt?',
      v: 'Hangtanilag azt jelenti, hogy a sípban kialakuló állóhullámnak az egyik végén csomópontja, a másik végén pedig duzzadóhelye lesz.',
      forras: 'PróbaZH 2. · 1 pont',
      trukk: 'Három kulcsszó kell: <b>állóhullám</b>, <b>csomópont</b> az egyik végen, <b>duzzadóhely</b> a másikon.'
    },
    {
      k: 'Mi határozza meg egy hangszeren megszólaló hang hangszínét?',
      v: 'Az alaphang mellett kialakuló felhangok frekvencia- és intenzitáseloszlása.',
      forras: 'PróbaZH 3. · 1 pont',
      trukk: 'Hangszín = <b>felhangok</b>. Ne csak ennyit írj: a felhangok <b>frekvencia- és intenzitáseloszlása</b> a teljes válasz.'
    },
    {
      k: 'Mit tekintünk hallásküszöbnek és fájdalomküszöbnek?',
      v: 'A hallható hangok intenzitástartományának alsó és felső határa.',
      forras: 'PróbaZH 4. · 1 pont',
      trukk: 'Hallásküszöb = alsó határ, fájdalomküszöb = felső határ. A kulcsszó: <b>intenzitástartomány</b>.'
    },
    {
      k: 'Mikor növekszik meg a hang frekvenciája, ha a hangforrás közeledik a megfigyelőhöz, vagy fordítva, a megfigyelő közeledik a forráshoz?',
      v: 'Mindkét esetben növekszik.',
      forras: 'PróbaZH 5. · 1 pont',
      trukk: 'Ne válassz a kettő közül. Közeledésnél mindig nő az észlelt frekvencia, akármelyik mozog.'
    },
    {
      k: 'Mit tapasztalunk Doppler-effektus esetén?',
      v: 'Az észlelt hang frekvenciája magasabb vagy alacsonyabb lesz attól függően, hogy a hangforrás és az észlelő közeledik, vagy távolodik egymástól.',
      forras: 'MINTA vizsga 8. · 1 pont',
      trukk: 'Párosítsd: közeledés → magasabb, távolodás → alacsonyabb frekvencia. Az <b>észlelt</b> szó ne maradjon ki.'
    },
    {
      k: 'Mi lehet a fizikai magyarázata annak, hogy azonos hangmagasságú hangok eltérő hangérzetet keltenek attól függően, hogy milyen hangszeren (pl. orgonán vagy harsonán) szólalnak meg, noha mindkettő pl. sípos hangszer?',
      v: 'A hangszereken a hang magasságát meghatározó alaphang mellett a felhangok is megszólalnak. A hangérzetet a felhangok relatív intenzitáseloszlása határozza meg.',
      forras: 'MINTA vizsga 9. · 1 pont',
      trukk: 'Ugyanaz a gondolat, mint a hangszínes kérdésnél: alaphang → hangmagasság, <b>felhangok relatív intenzitáseloszlása</b> → hangérzet.'
    }
  ],

  receptek: [
    {
      cim: 'Decibel ↔ intenzitás, több hangforrás',
      mikor: 'A feladat dB-ben ad meg hangot, és intenzitás kell, vagy több hangforrás szól egyszerre.',
      lepesek: [
        'Minden dB-értéket válts át intenzitásra: $I = I_0\\cdot 10^{n/10}$, ahol $I_0 = 10^{-12}\\,\\mathrm{W/m^2}$.',
        'Ha több forrás szól együtt (és nincs interferencia), az <b>intenzitásokat</b> add össze: $I = I_1 + I_2$.',
        'Az összeget váltsd vissza decibelre: $n = 10\\,\\lg\\frac{I}{I_0}$.'
      ],
      tex: 'n = 10\\,\\lg\\frac{I}{I_0},\\qquad I = I_1 + I_2'
    },
    {
      cim: 'Amplitúdó a hangintenzitásból',
      mikor: 'A levegőrészecskék rezgésének amplitúdóját kérdezik, és adott a dB-érték, a frekvencia, a sűrűség és a hangsebesség.',
      lepesek: [
        'A dB-értékből számold ki az intenzitást: $I = I_0\\cdot 10^{n/10}$.',
        'Írd fel a kapcsolatot: $I = \\frac{1}{2}\\rho\\,\\omega^2 A^2 c$.',
        'Fejezd ki az amplitúdót, és helyettesíts be. A körfrekvencia $\\omega = 2\\pi f$.'
      ],
      tex: 'I = \\frac{1}{2}\\rho\\,\\omega^2 A^2 c \\;\\Rightarrow\\; A = \\frac{1}{\\omega}\\sqrt{\\frac{2I}{\\rho c}}'
    },
    {
      cim: 'Mindkét végén nyitott síp sajátfrekvenciái',
      mikor: 'Adott a síp hossza és a hangsebesség, az alaphang és a felhangok frekvenciája a kérdés.',
      lepesek: [
        'Írd fel az állóhullám feltételét: $l = n\\cdot\\frac{\\lambda_n}{2}$.',
        'Alaphang: $n = 1$, első felhang: $n = 2$. Számold ki a hullámhosszt: $\\lambda_n = \\frac{2l}{n}$.',
        'A frekvencia: $f_n = \\frac{c}{\\lambda_n}$. A hosszt méterben írd be.'
      ],
      tex: 'l = n\\cdot\\frac{\\lambda_n}{2},\\qquad f_n = \\frac{c}{\\lambda_n}'
    },
    {
      cim: 'Állóhullám fal előtt',
      mikor: 'Hangszóró áll egy fallal szemben, és a szöveg elhalkulási (kioltási) helyekről vagy csomópontokról beszél.',
      lepesek: [
        'Rajzold le: a falnál csomópont van, a hangszórónál duzzadóhely.',
        'Két szomszédos csomópont távolsága $\\frac{\\lambda}{2}$, csomópont és szomszédos duzzadóhely távolsága $\\frac{\\lambda}{4}$.',
        'Ha a fal és a hangszóró között $k$ csomópont van: $d = k\\cdot\\frac{\\lambda}{2} + \\frac{\\lambda}{4}$.',
        'A hullámhossz és a frekvencia kapcsolata: $c = f\\cdot\\lambda$.'
      ],
      tex: 'd = k\\cdot\\frac{\\lambda}{2} + \\frac{\\lambda}{4},\\qquad c = f\\cdot\\lambda'
    },
    {
      cim: 'Doppler két mért frekvenciából',
      mikor: 'Álló megfigyelő mellett elhalad egy hangforrás, és adott a közeledő ($f^{\\prime}$) és a távolodó ($f^{\\prime\\prime}$) forrás észlelt frekvenciája.',
      lepesek: [
        'Írd fel a két esetet: $f^{\\prime} = \\frac{f}{1-\\frac{v_f}{c}}$ és $f^{\\prime\\prime} = \\frac{f}{1+\\frac{v_f}{c}}$.',
        'Szorozz át a nevezőkkel: $f = f^{\\prime}\\left(1-\\frac{v_f}{c}\\right) = f^{\\prime\\prime}\\left(1+\\frac{v_f}{c}\\right)$.',
        'Ebből a forrás sebessége: $v_f = \\frac{f^{\\prime}-f^{\\prime\\prime}}{f^{\\prime}+f^{\\prime\\prime}}\\cdot c$.',
        'Az eredeti frekvencia: $f = f^{\\prime}\\left(1-\\frac{v_f}{c}\\right)$.'
      ],
      tex: 'v_f = \\frac{f^{\\prime}-f^{\\prime\\prime}}{f^{\\prime}+f^{\\prime\\prime}}\\cdot c,\\qquad f = f^{\\prime}\\left(1-\\frac{v_f}{c}\\right)'
    },
    {
      cim: 'Két hangszóró interferenciája',
      mikor: 'Két hangszóró azonos frekvenciájú hangot ad, és a szöveg erősítési helyekről beszél egy távoli vonal (kerítés) mentén.',
      lepesek: [
        'Erősítés ott van, ahol az útkülönbség a hullámhossz egész számú többszöröse: $s_1 - s_2 = n\\cdot\\lambda$.',
        'A felező merőlegesen $n = 0$. A szomszédos erősítési helyen $n = 1$, tehát $s_1 - s_2 = \\lambda$.',
        'Az $s_1$ és $s_2$ utat Pitagorasz-tétellel számold ki a két derékszögű háromszögből.',
        'A frekvencia: $f = \\frac{c}{\\lambda}$.'
      ],
      tex: 's_1 - s_2 = n\\cdot\\lambda,\\qquad f = \\frac{c}{\\lambda}'
    }
  ],

  tippek: [
    'A hallásküszöb intenzitása $I_0 = 10^{-12}\\,\\mathrm{W/m^2}$. A feladat szövege nem adja meg, fejből kell tudni.',
    'Decibeleket soha ne adj össze. $60\\,\\mathrm{dB}$ és $50\\,\\mathrm{dB}$ együtt $60{,}4\\,\\mathrm{dB}$, nem $110\\,\\mathrm{dB}$. Az intenzitások adódnak össze.',
    'Gyors átváltás: $60\\,\\mathrm{dB} \\to 10^{-6}\\,\\mathrm{W/m^2}$, $50\\,\\mathrm{dB} \\to 10^{-7}\\,\\mathrm{W/m^2}$. A kitevő: $\\frac{n}{10} - 12$.',
    'A tanár $\\log$-ot ír, ez 10-es alapú logaritmus ($\\lg$). A számológépen a <b>log</b> gomb kell, nem az <b>ln</b>.',
    'A hangsebességet mindig a feladat szövegéből vedd ($340$ vagy $330\\,\\mathrm{m/s}$). Ha nincs megadva, a tanár $c = 330\\,\\mathrm{m/s}$-mal számol.',
    'Az amplitúdós képletbe $\\omega = 2\\pi f$ kerül, nem $f$. Ezt a legkönnyebb elrontani.',
    'Fal előtti állóhullám: a falnál csomópont, a hangszórónál duzzadóhely. Csomóponttól csomópontig $\\frac{\\lambda}{2}$, csomóponttól duzzadóhelyig $\\frac{\\lambda}{4}$.',
    'Doppler-ellenőrzés: az eredeti frekvencia a két mért érték közé esik ($184 \\lt 200 \\lt 219$). Sebesség átváltása: $1\\,\\mathrm{m/s} = 3{,}6\\,\\mathrm{km/h}$.'
  ],

  feladatok: [
    {
      id: 'zh6',
      cim: 'Nyitott orgonasíp alaphangja és első felhangja',
      forras: 'PróbaZH 6. feladat · 1,5 pont',
      zh: true,
      szoveg: 'Egy 31 cm hosszú orgonasíp mindkét végén nyitott. Mekkora az alaphang és az első felhang frekvenciája, ha a hangsebesség 340 m/s?',
      adatok: ['l = 31\\,\\mathrm{cm} = 0{,}31\\,\\mathrm{m}', 'c = 340\\,\\mathrm{m/s}'],
      tipp: 'A sípban állóhullám alakul ki. Gondold végig, hány fél hullámhossz fér a síp hosszába az alaphangnál, és hány az első felhangnál.',
      lepesek: [
        {
          cim: 'Az állóhullám feltétele',
          szoveg: 'A síp mindkét vége nyitott, vagyis a két vég egyforma. Ilyenkor a síp hosszába a fél hullámhossz egész számú többszöröse fér bele. Az alaphangnál $n = 1$, az első felhangnál $n = 2$.',
          tex: 'l = n\\cdot\\frac{\\lambda_n}{2}'
        },
        {
          cim: 'Az alaphang hullámhossza',
          szoveg: 'Az alaphangnál $n = 1$, tehát a síp hossza éppen egy fél hullámhossz. A hullámhossz a síp hosszának kétszerese.',
          tex: '\\lambda_1 = 2l',
          be: '\\lambda_1 = 2\\cdot 0{,}31',
          er: '\\lambda_1 = 0{,}62\\,\\mathrm{m}'
        },
        {
          cim: 'Az alaphang frekvenciája',
          szoveg: 'A hullámhosszból a frekvenciát a hangsebességgel kapod meg.',
          tex: 'f_1 = \\frac{c}{\\lambda_1}',
          be: 'f_1 = \\frac{340}{0{,}62}',
          er: 'f_1 = 548\\,\\mathrm{Hz}'
        },
        {
          cim: 'Az első felhang hullámhossza',
          szoveg: 'Az első felhangnál $n = 2$, tehát a sípba két fél hullámhossz fér. A hullámhossz most éppen a síp hossza.',
          tex: '\\lambda_2 = \\frac{2l}{2}',
          be: '\\lambda_2 = \\frac{2\\cdot 0{,}31}{2}',
          er: '\\lambda_2 = 0{,}31\\,\\mathrm{m}'
        },
        {
          cim: 'Az első felhang frekvenciája',
          szoveg: 'Ugyanaz a képlet, csak az új hullámhosszal. A hullámhossz a fele lett, ezért a frekvencia a kétszerese.',
          tex: 'f_2 = \\frac{c}{\\lambda_2}',
          be: 'f_2 = \\frac{340}{0{,}31}',
          er: 'f_2 = 1096\\,\\mathrm{Hz}',
          megj: 'A tanár $1096\\,\\mathrm{Hz}$-et ír (ez $2\\cdot 548$). Pontosan $\\frac{340}{0{,}31} = 1096{,}8$, kerekítve $1097\\,\\mathrm{Hz}$ (saját számolás). Mindkettő elfogadható.'
        }
      ],
      valasz: 'f_1 = 548\\,\\mathrm{Hz},\\quad f_2 = 1096\\,\\mathrm{Hz}'
    },
    {
      id: 'zh7',
      cim: 'Levegőrészecskék amplitúdója 60 dB-nél',
      forras: 'PróbaZH 7. feladat · 2 pont',
      zh: true,
      szoveg: 'Mekkora a rezgő levegőrészecskék amplitúdója azon a helyen, ahol 60 dB hangintenzitás szintet mérünk? A hang frekvenciája 800 Hz, a levegő sűrűsége 1,29 kg/m³, a hangsebesség 330 m/s.',
      adatok: ['n = 60\\,\\mathrm{dB}', 'f = 800\\,\\mathrm{Hz}', '\\rho = 1{,}29\\,\\mathrm{kg/m^3}', 'c = 330\\,\\mathrm{m/s}', 'I_0 = 10^{-12}\\,\\mathrm{W/m^2}'],
      tipp: 'Két lépcső van. Előbb a decibelből intenzitást kell csinálni, utána az intenzitásból amplitúdót.',
      lepesek: [
        {
          cim: 'Decibelből intenzitás',
          szoveg: 'Az amplitúdós képletben intenzitás szerepel, nem decibel. Ezért először a $60\\,\\mathrm{dB}$-nek megfelelő intenzitást számoljuk ki. A hallásküszöb $I_0 = 10^{-12}\\,\\mathrm{W/m^2}$.',
          tex: 'n = 10\\,\\lg\\frac{I}{I_0}',
          be: '60 = 10\\,\\lg\\frac{I}{10^{-12}}'
        },
        {
          cim: 'Az intenzitás kifejezése',
          szoveg: 'Ossz 10-zel: a logaritmus értéke 6. Ez azt jelenti, hogy $I$ a hallásküszöb $10^6$-szorosa.',
          tex: 'I = I_0\\cdot 10^{n/10}',
          be: 'I = 10^{-12}\\cdot 10^{6}',
          er: 'I = 10^{-6}\\,\\mathrm{W/m^2}'
        },
        {
          cim: 'Intenzitás és amplitúdó kapcsolata',
          szoveg: 'A hangintenzitás és a levegőrészecskék rezgési amplitúdója között ez az összefüggés áll fenn. Ebből kell majd $A$-t kifejezni.',
          tex: 'I = \\frac{1}{2}\\rho\\,\\omega^2 A^2 c'
        },
        {
          cim: 'A körfrekvencia',
          szoveg: 'A képletben $\\omega$ van, a feladat viszont $f$-et ad meg. A kettő között $2\\pi$ a váltószám.',
          tex: '\\omega = 2\\pi f',
          be: '\\omega = 2\\pi\\cdot 800',
          er: '\\omega \\approx 5027\\,\\mathrm{1/s}'
        },
        {
          cim: 'Az amplitúdó kiszámítása',
          szoveg: 'Rendezd a képletet $A^2$-re: $A^2 = \\frac{2I}{\\rho\\,\\omega^2 c}$. Gyököt vonva megkapod az amplitúdót.',
          tex: 'A = \\frac{1}{\\omega}\\sqrt{\\frac{2I}{\\rho c}}',
          be: 'A = \\frac{1}{2\\pi\\cdot 800}\\sqrt{\\frac{2\\cdot 10^{-6}}{1{,}29\\cdot 330}}',
          er: 'A = 1{,}36\\cdot 10^{-8}\\,\\mathrm{m}'
        }
      ],
      valasz: 'A = 1{,}36\\cdot 10^{-8}\\,\\mathrm{m}',
      megj: 'Az $I_0 = 10^{-12}\\,\\mathrm{W/m^2}$ értéket a feladat nem adja meg, a tanár megoldása fejből használja.'
    },
    {
      id: 'zh8',
      cim: 'Sípoló vonat: sebesség és eredeti frekvencia',
      forras: 'PróbaZH 8. feladat · 1,5 pont',
      zh: true,
      szoveg: 'Egy vonat sípol mialatt áthalad egy vasúti kereszteződésen. A kereszteződésben álló megfigyelő méri mind a közeledő, mind a távolodó vonat füttyének frekvenciáját. A közeledő vonat füttyének 219 Hz, a távolodónak 184 Hz a frekvenciája. A hangsebesség 340 m/s. Határozza meg a fütty eredeti frekvenciáját és a vonat sebességét!',
      adatok: ['f^{\\prime} = 219\\,\\mathrm{Hz}', 'f^{\\prime\\prime} = 184\\,\\mathrm{Hz}', 'c = 340\\,\\mathrm{m/s}'],
      tipp: 'Két ismeretlen van (az eredeti frekvencia és a vonat sebessége), és két mért frekvencia. Írd fel a Doppler-képletet külön a közeledő és külön a távolodó vonatra.',
      lepesek: [
        {
          cim: 'Melyik Doppler-eset?',
          szoveg: 'A hangforrás (a vonat) mozog, a megfigyelő áll. Ilyenkor a közeledő forrás hangját magasabbnak ($f^{\\prime}$), a távolodóét mélyebbnek ($f^{\\prime\\prime}$) halljuk. A vonat sebessége $v_f$, az eredeti frekvencia $f$.',
          tex: 'f^{\\prime} = \\frac{f}{1-\\frac{v_f}{c}},\\qquad f^{\\prime\\prime} = \\frac{f}{1+\\frac{v_f}{c}}'
        },
        {
          cim: 'Átszorzás a nevezőkkel',
          szoveg: 'Mindkét egyenletből fejezd ki az eredeti $f$-et. A két kifejezés egyenlő, mert a vonat sípja ugyanaz.',
          tex: 'f = f^{\\prime}\\left(1-\\frac{v_f}{c}\\right) = f^{\\prime\\prime}\\left(1+\\frac{v_f}{c}\\right)'
        },
        {
          cim: 'Rendezés a sebességre',
          szoveg: 'Bontsd fel a zárójeleket, és gyűjtsd egy oldalra a $\\frac{v_f}{c}$-t tartalmazó tagokat. Így már csak $v_f$ az ismeretlen.',
          tex: 'f^{\\prime}-f^{\\prime\\prime} = \\left(f^{\\prime}+f^{\\prime\\prime}\\right)\\cdot\\frac{v_f}{c} \\;\\Rightarrow\\; v_f = \\frac{f^{\\prime}-f^{\\prime\\prime}}{f^{\\prime}+f^{\\prime\\prime}}\\cdot c'
        },
        {
          cim: 'A vonat sebessége',
          szoveg: 'Helyettesítsd be a két mért frekvenciát és a hangsebességet. Az eredményt 3,6-del szorozva kapod km/h-ban.',
          tex: 'v_f = \\frac{f^{\\prime}-f^{\\prime\\prime}}{f^{\\prime}+f^{\\prime\\prime}}\\cdot c',
          be: 'v_f = \\frac{219-184}{219+184}\\cdot 340',
          er: 'v_f = 29{,}5\\,\\mathrm{m/s} = 106{,}3\\,\\mathrm{km/h}'
        },
        {
          cim: 'A fütty eredeti frekvenciája',
          szoveg: 'Most már ismered a sebességet. Írd vissza a közeledő vonatra felírt egyenletbe.',
          tex: 'f = f^{\\prime}\\left(1-\\frac{v_f}{c}\\right)',
          be: 'f = 219\\cdot\\left(1-\\frac{29{,}5}{340}\\right)',
          er: 'f = 200\\,\\mathrm{Hz}',
          megj: 'Ellenőrzés a távolodó vonattal: $184\\cdot\\left(1+\\frac{29{,}5}{340}\\right) \\approx 200\\,\\mathrm{Hz}$. Stimmel.'
        }
      ],
      valasz: 'v_f = 29{,}5\\,\\mathrm{m/s} = 106{,}3\\,\\mathrm{km/h},\\quad f = 200\\,\\mathrm{Hz}'
    },
    {
      id: 'minta14',
      cim: 'Két hangforrás együtt: hány decibel?',
      forras: 'MINTA vizsga 14. · 2 pont',
      zh: true,
      szoveg: 'Egy hangforrás hangját önmagában 60 dB-esnek, egy másikét 50 dB-esnek halljuk. Feltéve, hogy nem lép föl közöttük interferencia (frekvenciájuk nem egyenlő), hány decibeles hangot hallunk, ha egyszerre szól mindkettő?',
      adatok: ['n_1 = 60\\,\\mathrm{dB}', 'n_2 = 50\\,\\mathrm{dB}', 'I_0 = 10^{-12}\\,\\mathrm{W/m^2}'],
      tipp: 'A decibeleket nem lehet összeadni. Mi az a mennyiség, ami két hangforrásnál tényleg összeadódik?',
      lepesek: [
        {
          cim: 'Mit adunk össze?',
          szoveg: 'Ha nincs interferencia, a két hang <b>intenzitása</b> adódik össze, nem a decibelértékük. Ezért mindkét dB-értéket előbb intenzitásra váltjuk az $n = 10\\,\\lg\\frac{I}{I_0}$ összefüggéssel.',
          tex: 'n = 10\\,\\lg\\frac{I}{I_0} \\;\\Rightarrow\\; I = I_0\\cdot 10^{n/10}'
        },
        {
          cim: 'A 60 dB-es hang intenzitása',
          szoveg: 'A kitevő $\\frac{60}{10} = 6$, ezt szorozzuk a hallásküszöbbel.',
          tex: 'I_1 = I_0\\cdot 10^{n_1/10}',
          be: 'I_1 = 10^{-12}\\cdot 10^{6}',
          er: 'I_1 = 10^{-6}\\,\\mathrm{W/m^2}'
        },
        {
          cim: 'Az 50 dB-es hang intenzitása',
          szoveg: 'Ugyanígy, most a kitevő $\\frac{50}{10} = 5$. Ez a hang tizedakkora intenzitású, mint az előző.',
          tex: 'I_2 = I_0\\cdot 10^{n_2/10}',
          be: 'I_2 = 10^{-12}\\cdot 10^{5}',
          er: 'I_2 = 10^{-7}\\,\\mathrm{W/m^2}'
        },
        {
          cim: 'Az együttes intenzitás',
          szoveg: 'Add össze a két intenzitást. Figyelj a kitevőkre: $10^{-7} = 0{,}1\\cdot 10^{-6}$.',
          tex: 'I = I_1 + I_2',
          be: 'I = 10^{-6} + 10^{-7}',
          er: 'I = 1{,}1\\cdot 10^{-6}\\,\\mathrm{W/m^2}'
        },
        {
          cim: 'Vissza decibelre',
          szoveg: 'Az együttes intenzitást visszaváltjuk hangintenzitásszintre.',
          tex: 'n = 10\\,\\lg\\frac{I}{I_0}',
          be: 'n = 10\\,\\lg\\frac{1{,}1\\cdot 10^{-6}}{10^{-12}}',
          er: 'n = 60{,}4\\,\\mathrm{dB}',
          megj: 'A halkabb forrás alig emel a hangosabbon: $60\\,\\mathrm{dB}$-ből csak $60{,}4\\,\\mathrm{dB}$ lett.'
        }
      ],
      valasz: 'n = 60{,}4\\,\\mathrm{dB}'
    },
    {
      id: 'gyf1',
      cim: 'Két hangszóró a kerítés előtt',
      forras: 'GYF Hangtan 1. · tanári megoldás',
      szoveg: 'Egy kerítéstől 10 m-re két hangszóró van felállítva egymástól 5 m-es távolságban. A hangszórók azonos frekvenciájú hangot adnak ki. Azt tapasztaljuk, hogy a kerítésnél a két hangszóró felező merőlegesének vonalában a hangok erősítik egymást, és lassan mozogva a kerítés mellett 1,2 m-rel arrébb is erősítést kapunk. Mekkora a hang frekvenciája?',
      adatok: ['\\text{kerítés távolsága: } 10\\,\\mathrm{m}', '\\text{hangszórók távolsága: } 5\\,\\mathrm{m}', '\\text{elmozdulás a kerítés mentén: } 1{,}2\\,\\mathrm{m}', 'c = 330\\,\\mathrm{m/s}'],
      tipp: 'Erősítés ott van, ahol a két hangszórótól mért út különbsége a hullámhossz egész számú többszöröse. Rajzolj két derékszögű háromszöget.',
      lepesek: [
        {
          cim: 'Az erősítés feltétele',
          szoveg: 'Az elrendezés: alul egy vonalon a két hangszóró ($H_1$ balra, $H_2$ jobbra), felül, 10 m-re a kerítés. A felező merőlegesen a két út egyforma, itt $n = 0$. A szomszédos erősítési helyen ($n = 1$) az útkülönbség pontosan egy hullámhossz.',
          tex: 's_1 - s_2 = n\\cdot\\lambda \\;\\Rightarrow\\; s_1 - s_2 = 1\\cdot\\lambda'
        },
        {
          cim: 'A háromszögek vízszintes befogói',
          szoveg: 'A hangszórók a felező merőlegestől 2,5–2,5 m-re vannak. Az $n = 1$ pont 1,2 m-rel arrébb van, a $H_2$ felé. Ha innen merőlegest húzol a hangszórók vonalára, az a $H_1$-től $2{,}5 + 1{,}2 = 3{,}7\\,\\mathrm{m}$-re, a $H_2$-től $2{,}5 - 1{,}2 = 1{,}3\\,\\mathrm{m}$-re ér le. A másik befogó mindkét háromszögben 10 m.'
        },
        {
          cim: 'Az út a távolabbi hangszórótól',
          szoveg: 'Az $s_1$ a $H_1$ hangszórót köti össze az $n = 1$ ponttal. Ez egy derékszögű háromszög átfogója, Pitagorasz-tétellel számoljuk.',
          tex: 's_1^2 = 10^2 + 3{,}7^2',
          be: 's_1^2 = 113{,}69',
          er: 's_1 = 10{,}66\\,\\mathrm{m}'
        },
        {
          cim: 'Az út a közelebbi hangszórótól',
          szoveg: 'Ugyanez a $H_2$ hangszóróra, a rövidebb befogóval.',
          tex: 's_2^2 = 10^2 + 1{,}3^2',
          be: 's_2^2 = 101{,}69',
          er: 's_2 = 10{,}08\\,\\mathrm{m}'
        },
        {
          cim: 'A hullámhossz',
          szoveg: 'Az első lépés szerint a két út különbsége éppen a hullámhossz.',
          tex: '\\lambda = s_1 - s_2',
          be: '\\lambda = 10{,}66 - 10{,}08',
          er: '\\lambda = 0{,}58\\,\\mathrm{m}'
        },
        {
          cim: 'A frekvencia',
          szoveg: 'A hullámhosszból a frekvenciát a hangsebességgel kapod. A tanár $c = 330\\,\\mathrm{m/s}$-mal számol.',
          tex: 'f = \\frac{c}{\\lambda}',
          be: 'f = \\frac{330}{0{,}58}',
          er: 'f = 569\\,\\mathrm{Hz}'
        }
      ],
      valasz: 'f = 569\\,\\mathrm{Hz}',
      megj: 'A feladat szövege nem adja meg a hangsebességet, a tanár $c = 330\\,\\mathrm{m/s}$-ot használ. Kerekítés nélkül $\\lambda = 0{,}5784\\,\\mathrm{m}$ és $f \\approx 570{,}5\\,\\mathrm{Hz}$ jön ki (saját számolás). Az eltérés csak a két tizedesre kerekített utakból adódik.'
    },
    {
      id: 'gyf2',
      cim: 'Hangszóró a fal előtt: 3 elhalkulási hely',
      forras: 'GYF Hangtan 2. · tanári megoldás',
      szoveg: 'Egy hangszóró egy nagy falfelülettel szembefordítva 75 Hz-es hangot ad. A fal és a hangszóró között 3 helyen halkul el a hang. (A falat tökéletesen visszaverőnek tételezzük fel.) Milyen messze van a hangszóró a faltól? Milyen messze kell vinni, hogy 4 kioltási hely legyen?',
      adatok: ['f = 75\\,\\mathrm{Hz}', 'c = 330\\,\\mathrm{m/s}'],
      tipp: 'A falról visszaverődő hang állóhullámot hoz létre. Ahol elhalkul a hang, ott csomópont van. Rakd össze a távolságot fél és negyed hullámhosszakból.',
      lepesek: [
        {
          cim: 'Az állóhullám képe',
          szoveg: 'A hang visszaverődik a falról, ezért a hangszóró és a fal között állóhullám alakul ki. A tanár ábrája szerint a falnál csomópont van (ott a burkoló összezár), a hangszórónál duzzadóhely (ott a burkoló nyitott). A kettő között három csomópont van: ez a három elhalkulási hely.'
        },
        {
          cim: 'A hullámhossz',
          szoveg: 'A távolságot hullámhosszakban fogjuk megadni, ezért először a hullámhossz kell. A tanár $c = 330\\,\\mathrm{m/s}$-mal számol.',
          tex: '\\lambda = \\frac{c}{f}',
          be: '\\lambda = \\frac{330}{75}',
          er: '\\lambda = 4{,}4\\,\\mathrm{m}'
        },
        {
          cim: 'A hangszóró távolsága a faltól',
          szoveg: 'Két szomszédos csomópont távolsága fél hullámhossz. A faltól a harmadik (a hangszóróhoz legközelebbi) csomópontig ezért $3\\cdot\\frac{\\lambda}{2}$ az út. Innen a hangszóróig, vagyis a duzzadóhelyig még negyed hullámhossz van.',
          tex: 'd = 3\\cdot\\frac{\\lambda}{2} + \\frac{\\lambda}{4}',
          be: 'd = 6{,}6 + 1{,}1',
          er: 'd = 7{,}7\\,\\mathrm{m}'
        },
        {
          cim: 'Négy kioltási hely (saját számolás)',
          szoveg: 'Ugyanaz a módszer, csak most négy csomópont van a fal és a hangszóró között. Eggyel több fél hullámhossz fér be.',
          tex: 'd_4 = 4\\cdot\\frac{\\lambda}{2} + \\frac{\\lambda}{4}',
          be: 'd_4 = 8{,}8 + 1{,}1',
          er: 'd_4 = 9{,}9\\,\\mathrm{m}',
          megj: 'Ez a rész nincs megoldva a tanári lapon (saját számolás). A hangszórót $\\frac{\\lambda}{2} = 2{,}2\\,\\mathrm{m}$-rel kell távolabb vinni a faltól.'
        }
      ],
      valasz: 'd = 7{,}7\\,\\mathrm{m},\\quad d_4 = 9{,}9\\,\\mathrm{m}',
      megj: 'A feladat nem adja meg a hangsebességet, a tanár $c = 330\\,\\mathrm{m/s}$-ot használ. A $d_4 = 9{,}9\\,\\mathrm{m}$ nem a tanár eredménye, hanem saját számolás a tanár módszerével.'
    },
    {
      id: 'gyf3',
      cim: 'Hangsebesség mérése állóhullámmal',
      forras: 'GYF Hangtan 3. · tanári megoldás',
      szoveg: 'Szeretnénk megmérni a hang terjedési sebességét. Ehhez a következő berendezést használjuk: Egy hangszórót elhelyezünk egy falfelülettel szembefordítva, attól 2 m távolságban. A hangszóró által kibocsátott hang frekvenciáját változtatni tudjuk, és kikeressük azt a frekvenciát, amikor a hangszóró és a fal között egy csomóponttal rendelkező állóhullámok alakulnak ki. Hol lesz csomópont illetve duzzadóhely a hangszóró és a fal között? Azt tapasztaljuk, hogy a keresett állóhullám 124 Hz esetén alakul ki. Számítsuk ki ebből a hang terjedési sebességét!',
      adatok: ['d = 2\\,\\mathrm{m}', 'f = 124\\,\\mathrm{Hz}'],
      tipp: 'Ugyanaz az elrendezés, mint az előző feladatban, csak most egy csomópont van a fal és a hangszóró között, és a hangsebesség az ismeretlen.',
      lepesek: [
        {
          cim: 'Az állóhullám képe',
          szoveg: 'A tanár ábrája: balra a hangszóró, ott a burkoló nyitott (duzzadóhely). Jobbra a fal, ott a burkoló összezár (csomópont). A kettő között egyetlen csomópont van.'
        },
        {
          cim: 'A távolság hullámhosszakban',
          szoveg: 'A faltól a közbenső csomópontig fél hullámhossz az út. Innen a hangszóróig (duzzadóhelyig) még negyed hullámhossz. A kettő összege a 2 m-es távolság.',
          tex: 'd = \\frac{\\lambda}{2} + \\frac{\\lambda}{4} = \\frac{3\\lambda}{4}'
        },
        {
          cim: 'A hullámhossz',
          szoveg: 'Fejezd ki a hullámhosszt a távolságból.',
          tex: '\\lambda = \\frac{4}{3}\\cdot d',
          be: '\\lambda = \\frac{4}{3}\\cdot 2',
          er: '\\lambda = \\frac{8}{3}\\,\\mathrm{m} \\approx 2{,}67\\,\\mathrm{m}'
        },
        {
          cim: 'A hangsebesség',
          szoveg: 'A hangsebesség a frekvencia és a hullámhossz szorzata.',
          tex: 'c = f\\cdot\\lambda',
          be: 'c = 124\\cdot\\frac{8}{3}',
          er: 'c = 331\\,\\mathrm{m/s}'
        },
        {
          cim: 'Hol van csomópont és duzzadóhely?',
          szoveg: 'Csomópont van a falnál és a faltól $\\frac{\\lambda}{2} = 1{,}33\\,\\mathrm{m}$-re. Duzzadóhely van a hangszórónál (a faltól 2 m-re) és a két csomópont között félúton, a faltól $\\frac{\\lambda}{4} = 0{,}67\\,\\mathrm{m}$-re.',
          megj: 'A tanár erre a kérdésre csak az ábrával válaszolt. A méterben megadott helyek az ábra alapján készültek (saját számolás).'
        }
      ],
      valasz: 'c = 331\\,\\mathrm{m/s}'
    }
  ],

  gyakorlo: []
}]);
