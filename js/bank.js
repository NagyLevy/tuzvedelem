/* Kérdésbank a még meg nem írt leckék témáihoz (3–10.), a Grind módhoz.
   Forrás: Kuti R. 4–11. diasora, tesztkérdés-bank, ZH-minták. Az 1–2. lecke kérdései a leckefájlokból jönnek. */
(function () {
  'use strict';
  const TM = window.TM;
  const B = (topic, list) => list.forEach((q) => TM.bank.push({ ...q, topic }));
  TM.bank = TM.bank || [];

  B('egestermekek', [
    { type: 'cloze', text: 'Égéstermékeknek nevezzük azokat a gáznemű, cseppfolyós és [szilárd] anyagokat, amelyek az éghető anyagok levegő [oxigénjével] történő elégésekor keletkeznek.', why: 'Tesztbank. Összetételük az éghető anyag összetételétől és az égés körülményeitől függ.', src: 'tesztbank' },
    { type: 'cloze', text: 'Tökéletes égéstermékek: ezek az égéstermékek további [éghető] alkotóelemet nem tartalmaznak, ezért önállóan égni nem képesek, az égést nem [táplálják].', why: 'Tesztbank.', src: 'tesztbank' },
    { type: 'mc', q: 'Mi jellemzi a tökéletlen égéstermékeket?', opts: ['Még tartalmaznak éghető alkotóelemet, kedvező esetben tovább égnek', 'Önállóan égni nem képesek', 'Csak CO₂-ből állnak', 'Mindig szilárdak'], a: 0, why: 'Tökéletlen égéstermék: további éghető alkotóelemet tartalmaz, megfelelő O₂ és gyújtóhatás esetén az égést táplálja.', src: 'tesztbank' },
    { type: 'mc', q: 'Mit mond ki Hess tétele?', opts: ['Az összes felszabaduló hő egyenlő a részreakciók hőinek összegével', 'A nitrogén nem ég', 'A CO mindig CO₂-vé ég', 'A füst szilárd részecskék eloszlása'], a: 0, why: 'Q = Q₁ + Q₂ (C → CO → CO₂).', src: '4. diasor' },
    { type: 'mc', q: 'Levegőben égéskor egy oxigénmolekulára hány nitrogén (+ egyéb) molekula jut?', opts: ['3,76', '1', '21', '0,79'], a: 0, why: '79/21 ≈ 3,76. C + O₂ + 3,76 N₂ = CO₂ + 3,76 N₂.', src: '4. diasor' },
    { type: 'mc', q: 'Mire utal a sárga füst?', opts: ['Kén vagy kéntartalmú anyagok égésére', 'Foszforra', 'Nitrózus gázokra', 'Kormot tartalmaz'], a: 0, why: 'Sárga = kén. Fehér sűrű = foszfor. Vörösesbarna = NOx. Fekete = korom.', src: '4. diasor' },
    { type: 'mc', q: 'Mire utal a vörösesbarna füst?', opts: ['Nitrózus gázokra (NOx)', 'Kénre', 'Nedves anyagra', 'Foszforra'], a: 0, why: 'Vörösesbarna = NOx, rendkívül veszélyes.', src: '4. diasor' },
    { type: 'mc', q: 'Mire utal a fekete füst?', opts: ['Kormot tartalmaz: éghető folyadék, gumi, műanyag ég', 'Nedves anyag, rövid égés', 'Foszfor', 'Kén'], a: 0, why: 'Fekete füst = korom; éghető folyadékok, gumi, műanyagok tüzei.', src: '4. diasor' },
    { type: 'mc', q: 'Milyen rendkívül mérgező gáz keletkezik a PVC égésekor?', opts: ['Foszgén (COCl₂)', 'Hélium', 'Metán', 'Ózon'], a: 0, why: 'Grammonként akár 2 mg foszgén; I. világháborús harcanyag volt.', src: '4. diasor' },
    { type: 'tf', q: 'A füst a gáznemű közegben lévő nagyon kicsi szilárd részecskék eloszlása.', a: true, why: 'Szó szerint a 4. diasor 2. diáján.' },
    { type: 'multi', q: 'Milyen légzőszervre igen káros gázok lehetnek a füstben, ha az anyag klórt vagy nitrogént tartalmaz?', opts: ['HCl (hidrogén-klorid)', 'HCN (hidrogén-cianid)', 'NH₃ (ammónia)', 'O₂ (oxigén)'], a: [0, 1, 2], why: 'HCl, HCN, NH₃.', src: '4. diasor' }
  ]);

  B('viz', [
    { type: 'cloze', text: 'A víz tűzoltó anyagként történő alkalmazása széles körben lehetséges, kivéve: [elektromos] tüzek, [alkálifémek|alkáli fémek] égése, ahol [termikus] bomlásra lehet számítani.', why: 'Tesztbank + 5. diasor.', src: 'tesztbank' },
    { type: 'cloze', text: 'A tűzoltás során vízsugár formájában alkalmazzuk, lehet [kötött], [porlasztott], vagy [szórt] sugár, valamint vízköd.', why: 'Tesztbank.', src: 'tesztbank' },
    { type: 'mc', q: 'Hány fokon a legnagyobb a víz sűrűsége?', opts: ['4 °C', '0 °C', '100 °C', '20 °C'], a: 0, why: '4 °C-on 1,0 kg/dm³.', src: '5. diasor' },
    { type: 'mc', q: 'Mennyivel nő a víz térfogata fagyáskor?', opts: ['1/9-ed résszel', 'A felével', '1/100-ad résszel', 'Nem változik'], a: 0, why: 'Fagyáskor 1/9-ed résszel nő.', src: '5. diasor' },
    { type: 'mc', q: 'Mi keletkezik, ha kalcium-karbidra víz kerül?', opts: ['Acetilén, ami robbanóképes és öngyulladhat', 'Oxigén', 'Szén-dioxid', 'Semmi'], a: 0, why: 'CaC₂ + 2H₂O = C₂H₂ + Ca(OH)₂; az acetilén 2,5–8,1% között robbanóképes.', src: '5. diasor' },
    { type: 'mc', q: 'Mi történik, ha nátrium vízzel érintkezik?', opts: ['Hidrogén szabadul fel, a hő meggyújtja a nátriumot és a hidrogént', 'Lehűl', 'Habot képez', 'Semmi'], a: 0, why: '2Na + 2H₂O = 2NaOH + H₂ + hő.', src: '5. diasor' },
    { type: 'mc', q: 'Hány °C-on következik be a víz termikus bomlásánál a robbanás?', opts: ['3000 °C', '100 °C', '1500 °C', '500 °C'], a: 0, why: '1500 °C: 0,033%, 2000 °C: 0,115%, 2500 °C: 10,1%, 3000 °C: robbanás.', src: '5. diasor' },
    { type: 'mc', q: 'Mekkorák a vízcseppek porlasztott sugárnál?', opts: ['0,5–1 mm', '5–10 mm', '15–18 µm', '1 cm'], a: 0, why: 'Porlasztott sugár: 0,5–1 mm.', src: '5. diasor' },
    { type: 'multi', q: 'Melyek a vízköd oltóhatásai?', opts: ['Hűtőhatás (nagy hűtőfelület)', 'Oxigénkiszorító fojtóhatás', 'Inhibíciós oltóhatás', 'Füstelnyomó képesség', 'Emulgáló hatás'], a: [0, 1, 2, 3], why: 'A vízköd hűt, fojt, inhibiál és a füstöt is leköti.', src: '5. diasor' },
    { type: 'tf', q: 'Nagy nyomású vízköddel feszültség alatti berendezések tüzei is olthatók.', a: true, why: 'Szervertermek, kapcsolóterek, telefonközpontok.' },
    { type: 'mc', q: 'Mi a felületi feszültség mértékegysége?', opts: ['N/m', 'J/kg', 'Pa', 'W'], a: 0, why: 'A felület egységnyi hosszúságában működő erő: N/m. Habképzővel csökkenthető.', src: '5. diasor' },
    { type: 'multi', q: 'Melyek a víz mint oltóanyag előnyei?', opts: ['Könnyen hozzáférhető', 'Olcsó', 'Az oltóhatások komplexen jelentkeznek', 'Feszültség alatti tüzeknél is mindig használható'], a: [0, 1, 2], why: 'Az elektromos tűz kivétel (csak speciális nagy nyomású vízköddel).' }
  ]);

  B('oltogaz-oltopor', [
    { type: 'cloze', text: 'Az oltógázok oltásmechanizmusuk szerint lehetnek: semleges, ún. „[inert]” gázok (CO2 és N2); az égést [kémiai] úton gátló gázok (halogén tartalmú vegyületek).', why: 'Tesztbank.', src: 'tesztbank' },
    { type: 'cloze', text: 'Semleges gázok, melyek az égési reakcióban nem vesznek részt, de az éghető gázok és a szükséges [oxigén] koncentrációját [felhígítják].', why: 'Tesztbank (14% alá).', src: 'tesztbank' },
    { type: 'mc', q: 'Mennyi halon elegendő az eredményes oltáshoz?', opts: ['2–3%', '25–30%', '40%', '14%'], a: 0, why: '2–3% halon — tízszer kevesebb, mint a semleges gázokhoz szükséges 25–30%.', src: '6. diasor' },
    { type: 'mc', q: 'Milyen koncentráció felett lehet halálos a CO₂?', opts: ['20 tf%', '0,4 tf%', '5 tf%', '80 tf%'], a: 0, why: 'A CO₂ 20 tf% felett halálos lehet. (A CO 0,4 tf% felett!)', src: '6. diasor' },
    { type: 'multi', q: 'Mire ALKALMATLAN a CO₂?', opts: ['Oxigénhordozó anyagok oltására', 'Izzó és parázsló anyagok oltására', 'Egyes fémtüzek (Mg, Na) oltására', 'Elektromos berendezések tüzeinél'], a: [0, 1, 2], why: 'Elektromos tüzeknél viszont előnyös.', src: '6. diasor' },
    { type: 'mc', q: 'Mire használják a nitrogént leggyakrabban a tűzoltásban?', opts: ['Hajtógázként porral oltó készülékekben', 'Önálló oltógázként lakásban', 'Habképzőként', 'Hűtőközegként'], a: 0, why: 'Önállóan ritkán (aknák, felszállóvezetékek), főleg hajtógáz.', src: '6. diasor' },
    { type: 'mc', q: 'Mi az Inergen összetétele?', opts: ['52% N₂ + 40% Ar + 8% CO₂', '100% CO₂', 'Halon + víz', '50% O₂ + 50% N₂'], a: 0, why: 'A H1301 halon helyettesítője.', src: '6. diasor' },
    { type: 'multi', q: 'Mikor NEM használható halon?', opts: ['Emberek jelenlétében', 'Izzó égésnél', 'Alkáli- és könnyűfémek tüzeinél', 'Számítógép-központok tüzeinél'], a: [0, 1, 2], why: 'Számítógép-központnál használható volt.', src: '6. diasor' },
    { type: 'cloze', text: 'A tűzoltópor [szilárd] halmazállapotú anyag, amely a tűzoltókészülékből [hajtógáz] hatására kiáramoltatva a levegőben heterodiszperz rendszert képezve az égési [láncreakciót] megszakítja.', why: 'Tesztbank.', src: 'tesztbank' },
    { type: 'cloze', text: 'Jó diszperzitás: a porszemcse optimális méretére utal ([15–18|15-18] mikrométer).', why: 'Tesztbank.', src: 'tesztbank' },
    { type: 'cloze', text: 'A tűzoltó porok [1000] V-ig [1] m távolságból alkalmazhatók elektromos tüzek oltására.', why: 'Tesztbank.', src: 'tesztbank' },
    { type: 'mc', q: 'Mi a „D” tűzosztály?', opts: ['Éghető fémek és ötvözeteik', 'Éghető gázok', 'Tűzveszélyes folyadékok', 'Feszültség alatti berendezések'], a: 0, why: 'A szilárd, B folyadék, C gáz, D fém, E feszültség alatt álló berendezés.', src: '6. diasor' },
    { type: 'mc', q: 'Mi a „B” tűzosztály?', opts: ['Tűzveszélyes folyadékok', 'Szilárd éghető anyagok', 'Éghető gázok', 'Éghető fémek'], a: 0, why: 'B = folyadékok.', src: '6. diasor' },
    { type: 'mc', q: 'Miért nem tárolható napon a NaHCO₃ alapú por?', opts: ['40 °C felett bomlik', 'Megolvad', 'Elektromosan vezet', 'Mérgező lesz'], a: 0, why: 'Stabilitási követelmény.', src: '6. diasor' },
    { type: 'mc', q: 'Mi az ABC-porok különleges oltóhatása?', opts: ['Fojtó-takaró hatás: olvadékkérget képeznek az égő felületen', 'Párolgási hatás', 'Emulgáló hatás', 'Kiegyenlítő hatás'], a: 0, why: 'Ammónium-szulfát/-foszfát; elzárja az éghető gőzök kijutását.', src: '6. diasor' }
  ]);

  B('habok', [
    { type: 'cloze', text: 'Habkiadósság: a képzett hab [térfogatának] és a habképzéshez szükséges [oldat] térfogatának hányadosa.', why: 'Tesztbank. Hk = VH / VF.', src: 'tesztbank' },
    { type: 'mc', q: 'Mekkora habkiadósságú a középhab?', opts: ['Hk 20–200', 'Hk < 20', 'Hk > 200', 'Hk 1–6'], a: 0, why: '< 20 nehézhab, 20–200 középhab, 200 felett könnyűhab.', src: 'tesztbank' },
    { type: 'mc', q: 'Hk = 15 milyen hab?', opts: ['Nehézhab', 'Középhab', 'Könnyűhab'], a: 0, fixed: true, why: '20 alatt nehézhab.' },
    { type: 'mc', q: 'Hk = 500 milyen hab?', opts: ['Nehézhab', 'Középhab', 'Könnyűhab'], a: 2, fixed: true, why: '200 felett könnyűhab.' },
    { type: 'cloze', text: 'Átlagos bekeverés: [1-6|1–6] % habképző anyag / víz dm³.', why: 'Tesztbank.', src: 'tesztbank' },
    { type: 'cloze', text: 'A tűzoltó hab olyan gázzal töltött [buborékokból] álló rendszer, amelynél a buborékokat egymástól [folyadékhártya] választja el.', why: 'Tesztbank.', src: 'tesztbank' },
    { type: 'cloze', text: 'Hab élettartam: a habszerkezet [kiszáradásáig|kiszáradásig], a buborékok [széthullásáig] eltelt időtartam.', why: 'Tesztbank.', src: 'tesztbank' },
    { type: 'cloze', text: 'Habtörés: [fizikai], [kémiai] hatásokra létrejövő habmegsemmisülés.', why: 'Tesztbank.', src: 'tesztbank' },
    { type: 'cloze', text: 'A habképző anyagok kis mennyiségben is képesek arra, hogy valamely folyadék [felületi] feszültségét csökkentsék.', why: 'Tesztbank (felületaktivitás).', src: 'tesztbank' },
    { type: 'multi', q: 'Melyek a tűzoltóhabok fő oltóhatásai?', opts: ['Takaró hatás', 'Elválasztó hatás', 'Hűtő hatás', 'Emulgeáló hatás', 'Antikatalitikus hatás'], a: [0, 1, 2, 3], why: '7. diasor: takaró, elválasztó, hűtő, emulgeáló.', src: '7. diasor' },
    { type: 'mc', q: 'Mi a tűzoltóhab három összetevője?', opts: ['Víz + habképző anyag + levegő', 'Víz + por + CO₂', 'Halon + víz + levegő', 'Víz + nitrogén + argon'], a: 0, why: '7. diasor, 2. dia.' },
    { type: 'mc', q: 'Mit jelent az AFFF jelölés?', opts: ['Vizes filmképző habképző anyag', 'Fehérje alapú habképző', 'Szintetikus detergens', 'Oltópor'], a: 0, why: 'P = protein, SYNDET = tenzid, AFFF = vizes filmképző, AFFF/ATC = kettős filmképző.', src: '7. diasor' },
    { type: 'mc', q: 'Mit nevezünk félvízkiválásnak?', opts: ['Az 50%-os oldatkiválást', 'A hab teljes összeomlását', 'A bekeverés felét', 'A visszagyulladást'], a: 0, why: 'A hab élettartama a vízkiválás időbeli lefutásával is jellemezhető.', src: '7. diasor' }
  ]);

  B('kemiai-biztonsag', [
    { type: 'mc', q: 'Melyik jogszabály a kémiai biztonság alapja?', opts: ['2000. évi XXV. törvény', '1993. évi XCIII. törvény', '1272/2008/EK rendelet', '44/2000. EüM rendelet'], a: 0, why: 'Az 1993. évi XCIII. a munkavédelmi törvény; az 1272/2008 a CLP.', src: '8. diasor' },
    { type: 'multi', q: 'Mire NEM terjed ki a kémiai biztonsági törvény hatálya?', opts: ['Gyógyszerek', 'Élelmiszerek', 'Kozmetikai termékek', 'Ipari oldószerek'], a: [0, 1, 2], why: 'Kivételek: gyógyszer, élelmiszer, takarmány, kozmetikum, radioaktív, növényvédő szer, pszichotróp, kábítószer, veszélyes hulladék.' },
    { type: 'mc', q: 'Mit jelent az „Xn” jelölés?', opts: ['Ártalmas', 'Irritatív', 'Nagyon mérgező', 'Környezeti veszély'], a: 0, why: 'Xn ártalmas, Xi irritatív, T+ nagyon mérgező, N környezeti veszély.', src: '8. diasor' },
    { type: 'mc', q: 'Mit jelent az „O” jelölés?', opts: ['Égést tápláló, oxidáló', 'Robbanásveszélyes', 'Maró', 'Mérgező'], a: 0, why: 'E robbanó, O oxidáló, F tűzveszélyes, C maró, T mérgező.', src: '8. diasor' },
    { type: 'mc', q: 'Mivé váltak a régi R-mondatok a CLP-ben?', opts: ['H-mondatokká (figyelmeztető)', 'P-mondatokká', 'EUH-mondatokká', 'S-mondatokká'], a: 0, why: 'R (risk) → H (hazard); S (safety) → P (precaution).', src: '8. diasor' },
    { type: 'mc', q: 'Mivé váltak a régi S-mondatok a CLP-ben?', opts: ['P-mondatokká (óvintézkedés)', 'H-mondatokká', 'R-mondatokká', 'Megszűntek'], a: 0, why: 'P101–501.', src: '8. diasor' },
    { type: 'mc', q: 'Hány veszélyt jelző piktogram van a CLP/GHS rendszerben?', opts: ['9', '5', '16', '12'], a: 0, why: 'GHS01–GHS09.', src: '8. diasor' },
    { type: 'mc', q: 'Melyik a súlyosabb jelzőszó a CLP-ben?', opts: ['Veszély! (Danger)', 'Figyelem! (Warning)'], a: 0, fixed: true, why: 'A „Veszély!” a súlyosabb kategóriáké.' },
    { type: 'mc', q: 'Mi a CLP?', opts: ['A GHS uniós változata (1272/2008/EK)', 'A REACH egyik része', 'Egy magyar törvény', 'Egy tűzoltóhab-típus'], a: 0, why: 'Hatályba lépett 2009. január 20-án.' },
    { type: 'mc', q: 'Mit jelent a REACH betűszó?', opts: ['Registration, Evaluation, Authorisation of Chemicals', 'Risk Evaluation And Chemical Hazards', 'Rapid Emergency And Chemical Help', 'Regulation of European Air Chemicals'], a: 0, why: 'Az EU 1907/2006/EK rendelete, 2007 júniusától hatályos.' },
    { type: 'mc', q: 'Hány pontban mutatja be a veszélyes anyagot a biztonsági adatlap?', opts: ['16', '9', '64', '10'], a: 0, why: 'A gyártó vagy importáló biztosítja.' },
    { type: 'mc', q: 'Mi az EINECS?', opts: ['Az 1981. szeptember 18-án piacon lévő létező anyagok jegyzéke', 'Az új anyagok jegyzéke', 'Egy veszélyjel', 'Egy hatóság'], a: 0, why: 'Az ELINCS az ezt követően törzskönyvezett új anyagoké.' },
    { type: 'cloze', text: 'Kockázat: a veszélyhelyzetben a sérülés vagy az egészségkárosodás [valószínűségének] és [súlyosságának] együttes hatása.', why: 'Mvt. 87. § 1/F. pont.' },
    { type: 'mc', q: 'Mi a „veszély” munkahelyi értelemben?', opts: ['Önmagában létező, nem aktív, csak potenciálisan károsító hatás', 'A sérülés valószínűsége és súlyossága', 'Egy baleset', 'Egy jogszabály'], a: 0, why: 'A kockázat a valószínűség × súlyosság.' },
    { type: 'mc', q: 'Melyik módszer koncentrál egyetlen következményre (meghibásodásra), és annak okait keresi?', opts: ['Hibafa-elemzés', 'Eseményfa-elemzés', 'HAZOP', 'Dow-index'], a: 0, why: 'Az eseményfa egy eseményre adott reakciók láncát vizsgálja.' }
  ]);

  B('munkavedelem-alapjai', [
    { type: 'cloze', text: 'A munkavédelem a [szervezett] munkavégzésre vonatkozó biztonsági és [egészségügyi] követelmények, továbbá a törvény céljának megvalósítására szolgáló törvénykezési, szervezési, [intézményi] előírások rendszere, valamint mindezek végrehajtása.', why: 'ZH „A” 4. feladat — szó szerint.', src: 'ZH „A”, 9. diasor' },
    { type: 'multi', q: 'Kik a munkavédelem résztvevői?', opts: ['Állam', 'Munkáltató', 'Munkavállaló', 'Szakszervezet', 'Biztosító'], a: [0, 1, 2], why: 'Állam, munkáltató, munkavállaló (ZH „A” 1.).' },
    { type: 'multi', q: 'Mi a munkavédelem tagozódása?', opts: ['Munkabiztonság', 'Munkaegészségügy (foglalkozás-egészségügy)', 'Munkahigiénia', 'Tűzvédelem'], a: [0, 1, 2], why: '9. diasor, 13. dia (ZH „A” 1.).' },
    { type: 'mc', q: 'Melyik a munkavédelmi törvény?', opts: ['1993. évi XCIII. törvény', '2000. évi XXV. törvény', '2012. évi I. törvény', '1272/2008/EK'], a: 0, why: 'Mvt. = 1993. évi XCIII. tv.' },
    { type: 'mc', q: 'Ki felelős a munkavédelmi előírások végrehajtásáért a munkahelyen?', opts: ['A munkáltató és a munkavállaló egyaránt', 'Csak a munkavállaló', 'Csak a munkavédelmi hatóság', 'Az állam'], a: 0, fixed: true, why: 'Tesztes ZH 4. kérdés.', src: 'tesztes ZH' },
    { type: 'mc', q: 'Mi az első ismert írásos „munkavédelmi” szabály?', opts: ['Hammurabi törvénye', 'Az angol Gyártörvény', 'Az Mvt.', 'A REACH'], a: 0, why: 'Hammurabi 229. §: a rosszul építő építőmestert, ha a ház megöli a háziurat, meg kell ölni.' },
    { type: 'multi', q: 'Melyek az Mvt. alapelvei?', opts: ['Szervezett keretek között munkát végzőre vonatkozik', 'A megelőzésre és a párbeszédre kell helyezni a hangsúlyt', 'A munkavégzés hatókörében tartózkodókra is kiterjed', 'Csak az állami szektorra vonatkozik'], a: [0, 1, 2], why: '9. diasor, 11. dia.' },
    { type: 'mc', q: 'Mit kell előtérbe helyeznie a munkáltatónak?', opts: ['A kollektív védelmet', 'Az egyéni védőeszközt', 'A pénzbeli megváltást', 'A gyorsaságot'], a: 0, why: 'A munkáltató kötelessége a kollektív védelem előtérbe helyezése.' },
    { type: 'mc', q: 'Mikor tagadhatja meg a munkavállaló a munkát?', opts: ['Ha az életét, egészségét, testi épségét közvetlenül és súlyosan veszélyeztetné', 'Ha fáradt', 'Ha nem tetszik neki a feladat', 'Soha'], a: 0, why: 'Munkajogi védelem.' },
    { type: 'multi', q: 'Milyen veszélyek fordulhatnak elő a munkahelyen?', opts: ['Fizikai', 'Kémiai', 'Biológiai', 'Pszichoszociális'], a: [0, 1, 2, 3], why: 'Mind a négy (9. diasor, 23. dia).' },
    { type: 'tf', q: 'Az állam feladata a munkavédelem országos programjának kialakítása.', a: true, why: 'Az állam feladatai közé tartozik.' }
  ]);

  B('munkavedelem-gyakorlat', [
    { type: 'cloze', text: 'Munkabalesetnek nevezzük azt a balesetet, amely a munkavállalót a [szervezett munkavégzés|szervezett munkavegzes] során vagy azzal összefüggésben éri.', why: 'Tesztes ZH 2. kérdés — ezt a kifejezést kérik.', src: 'tesztes ZH' },
    { type: 'mc', q: 'Melyik állítás jellemzi legjobban a foglalkozási megbetegedést?', opts: ['Mindig azonnali baleset következménye', 'A munkavégzés során fellépő kóroki tényezőkre vezethető vissza', 'Csak fizikai sérülést jelent', 'Csak a munkáltató hibájából következhet be'], a: 1, fixed: true, why: 'Tesztes ZH 1. kérdés.', src: 'tesztes ZH' },
    { type: 'mc', q: 'Párosítás: melyik a MUNKABALESET?', opts: ['A szervezett munkavégzés során bekövetkezett, hirtelen egészségkárosodás, sérülés', 'A munkavégzéssel kapcsolatos, tartósan fennálló egészségkárosodás'], a: 0, fixed: true, why: 'Munkabaleset = hirtelen; foglalkozási megbetegedés = tartós.', src: 'tesztes ZH 5.' },
    { type: 'mc', q: 'Párosítás: melyik a FOGLALKOZÁSI MEGBETEGEDÉS?', opts: ['A szervezett munkavégzés során bekövetkezett, hirtelen egészségkárosodás, sérülés', 'A munkavégzéssel kapcsolatos, tartósan fennálló egészségkárosodás'], a: 1, fixed: true, why: 'Tartósan fennálló = foglalkozási megbetegedés.', src: 'tesztes ZH 5.' },
    { type: 'multi', q: 'Melyek tartoznak a szervezett munkavégzés jogviszonyai közé?', opts: ['Munkaviszony', 'Közalkalmazotti jogviszony', 'Tanulói jogviszony a szakmai gyakorlat során', 'Baráti segítségnyújtás'], a: [0, 1, 2], fixed: true, why: 'A baráti segítség nem szervezett munkavégzés.', src: 'tesztes ZH 3.' },
    { type: 'tf', q: 'Ha a munkavállaló hazafelé a saját autójával balesetet szenved, az munkabaleset.', a: false, why: 'Úti (üzemi) baleset — kivéve, ha a munkáltató saját vagy bérelt járművével történt.' },
    { type: 'tf', q: 'A hallgatói jogviszonyban, gyakorlati képzés során bekövetkezett baleset munkabalesetnek minősül.', a: true, why: '10. diasor.' },
    { type: 'mc', q: 'Ki dönt a baleset munkabaleseti jellegéről?', opts: ['A munkáltató', 'A sérült', 'A mentők', 'A rendőrség'], a: 0, why: 'Ezért minden balesetet azonnal jelenteni kell.' },
    { type: 'mc', q: 'Hány év után évül el a munkabaleset?', opts: ['3 év', '1 év', '5 év', '10 év'], a: 0, why: '9. diasor, 26. dia.' },
    { type: 'mc', q: 'Segédeszköz nélkül mennyit emelhet legfeljebb egy felnőtt nő?', opts: ['20 kg', '50 kg', '10 kg', '30 kg'], a: 0, why: 'Felnőtt nő 20 kg, felnőtt férfi 50 kg.' },
    { type: 'mc', q: 'Milyen terhet csak szállító- vagy rakodóeszközzel szabad mozgatni?', opts: ['200 kg és nehezebb osztatlan terhet', '50 kg felett', '20 kg felett', '100 kg felett'], a: 0, why: '10. diasor.' },
    { type: 'mc', q: 'Melyik az egyéni védőeszköz 3. kategóriája?', opts: ['Komplex eszközök halálos vagy súlyos, visszafordíthatatlan károsodás ellen (pl. légzésvédő, leesés elleni)', 'Egyszerű, kis védelmi szintű eszközök (pl. kertészkesztyű)', 'Minden védősisak és hallásvédő', 'Sporteszközök'], a: 0, why: '1. kat.: egyszerű; 2. kat.: sisak, hallásvédő stb.; 3. kat.: komplex, életmentő.' },
    { type: 'mc', q: 'Melyik kategóriába tartozik minden hallásvédő eszköz?', opts: ['2. kategória', '1. kategória', '3. kategória'], a: 0, fixed: true, why: 'A 2. kategóriába: minden védősisak, arc- és szemvédő, hallásvédő.' },
    { type: 'multi', q: 'Milyen munkaköri orvosi alkalmassági vizsgálatok vannak?', opts: ['Előzetes', 'Időszakos', 'Soron kívüli', 'Záró', 'Önkéntes'], a: [0, 1, 2, 3], why: 'Előzetes, időszakos, soron kívüli, záró.' },
    { type: 'tf', q: 'A munkáltató a biztonságos munkavégzés követelményei helyett pénzbeli megváltást adhat.', a: false, why: 'Nem adhat pénzbeli vagy egyéb megváltást.' }
  ]);

  B('kotelezettsegek', [
    { type: 'multi', q: 'Melyek az alapvető munkavédelmi kötelezettségek?', opts: ['A veszélyek elkerülése', 'A veszélyek keletkezési helyükön történő leküzdése', 'A veszélyes helyettesítése veszélytelennel vagy kevésbé veszélyessel', 'A kockázat áthárítása a munkavállalóra'], a: [0, 1, 2], why: '11. diasor.' },
    { type: 'mc', q: 'Ki tartja az előzetes (munkába lépés előtti) munkavédelmi oktatást?', opts: ['A közvetlen munkahelyi vezető', 'A munkavédelmi hatóság', 'Az igazgató', 'A munkavállaló'], a: 0, why: 'Az ismétlődőt (évenkéntit) a munkavédelmi szakember, a rendkívülit ismét a közvetlen vezető.' },
    { type: 'mc', q: 'Ki tartja az ismétlődő (évenkénti) munkavédelmi oktatást?', opts: ['A munkavédelmi szakember', 'A közvetlen munkahelyi vezető', 'A portás', 'A munkaügy'], a: 0, why: '11. diasor.' },
    { type: 'mc', q: 'Mikor kell rendkívüli munkavédelmi oktatást tartani?', opts: ['Baleset, rendkívüli esemény után', 'Évente', 'Munkába lépés előtt', 'Soha'], a: 0, why: 'A közvetlen munkahelyi vezető tartja.' },
    { type: 'multi', q: 'Mely szabályzatok vonatkoznak egy létesítményre?', opts: ['Munkavédelmi szabályzat (MVSZ)', 'Munkahelyi kockázatértékelés', 'Egyéni védőeszközök juttatási rendje', 'Orvosi alkalmassági vizsgálatok rendje', 'Menetrend'], a: [0, 1, 2, 3], why: '+ műveleti utasítások.' },
    { type: 'mc', q: 'Milyen gyakran kell az áramvédő kapcsoló működőképességét ellenőrizni?', opts: ['Havonta', 'Évente', 'Naponta', '5 évente'], a: 0, why: 'Havi felülvizsgálat villamos szakember bevonásával.' },
    { type: 'mc', q: 'Ki végzi az előzetes ellenőrző felülvizsgálatot (naponta munkakezdés előtt)?', opts: ['A munkavállaló', 'A munkavédelmi szakértő', 'A hatóság', 'Az igazgató'], a: 0, why: 'Az időszakos a munkavédelmi szakember feladata.' },
    { type: 'mc', q: 'Ki felel az egyéni védőeszközök kiadásáért?', opts: ['A közvetlen munkahelyi vezető', 'A munkavállaló', 'A gyártó', 'Az állam'], a: 0, why: 'Kijelöli, kiadja, ellenőrzi a használatát.' },
    { type: 'tf', q: 'Súlyos mulasztás vagy közvetlen veszély esetén a munkahelyi vezető köteles a munkaeszköz használatát felfüggeszteni.', a: true, why: 'A veszély elhárításáig.' },
    { type: 'multi', q: 'Mely anyagok számítanak veszélyes anyagnak?', opts: ['Robbanó', 'Oxidáló', 'Gyúlékony', 'Maró', 'Fertőző'], a: [0, 1, 2, 3, 4], why: '+ mérgező, ingerlő, rákkeltő, egyéb egészségkárosító.' },
    { type: 'tf', q: 'Az egyéni védőeszközt írásbeli engedély nélkül is haza lehet vinni a munkahelyről.', a: false, why: 'Tilos elvinni, kivéve írásbeli engedéllyel.' }
  ]);
})();
