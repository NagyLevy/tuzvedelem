/* Animált ábrák („videók”) a leckékhez, lecke-id szerint. A lecke oldalán a kártyák előtt jelennek meg.
   tipus: 'piramis' (fentről lefelé), 'lanc' (folyamat), 'nyil' (from → t, a nyílon: via).
   Minden lépés: t = felirat, s = kis alcím, c = narráció (ezt olvassa a néző, amíg a lépés kiemelve van). */
window.JOG_ANIM = {
  alap: [
    { cim: 'Hogyan épül fel egy jogszabály?', tipus: 'lanc', intro: 'Minden jogi norma 3 részből áll. Nézzük egy KRESZ-szabályon.',
      lepesek: [
        { t: 'Hipotézis', s: '„HA …”', c: 'A <b>hipotézis</b> a feltétel: <i>mikor</i> kell alkalmazni a szabályt. Pl. „<b>Ha</b> lakott területen autót vezetsz…”' },
        { t: 'Diszpozíció', s: '„AKKOR …”', c: 'A <b>diszpozíció</b> a magatartási szabály: mit kell vagy mit tilos tenni. „…<b>akkor</b> legfeljebb 50 km/h-val mehetsz.”' },
        { t: 'Szankció', s: '„KÜLÖNBEN …”', c: 'A <b>szankció</b> a hátrányos következmény, ha megszeged: „…<b>különben</b> bírságot kapsz.” Emiatt <b>szankcionált</b> a jog.' }
      ] },
    { cim: 'Mit csinál a bíró egy ügyben? (jogalkalmazás)', tipus: 'lanc',
      lepesek: [
        { t: 'Elsődleges áttekintés', s: 'milyen szabályok jöhetnek szóba', c: 'Először <b>átnézi a szabályokat</b>: nagyjából milyen jogszabályok vonatkozhatnak az ügyre.' },
        { t: 'Tényállás megállapítása', s: 'mi történt?', c: 'Megállapítja a <b>történeti tényállást</b>: mi történt pontosan.' },
        { t: 'Bizonyítás', s: 'tanúk, iratok, szakértő', c: 'A <b>bizonyítási eljárásban</b> kiderül, mi igaz ebből.' },
        { t: 'Értelmezés', s: 'mit jelent a szabály szövege?', c: 'A jogszabályt <b>értelmezi</b> (nyelvtani, logikai = alsó szint; rendszertani, történeti = felső szint).' },
        { t: 'Érdemi döntés', s: 'ítélet', c: 'Végül meghozza az <b>érdemi döntést</b>. Ha nincs szabály az esetre, az <b>joghézag</b>.' }
      ] }
  ],

  alkotmany: [
    { cim: 'A jogszabályok ranglétrája', tipus: 'piramis', intro: 'Fentről lefelé: az alacsonyabb szint soha nem ütközhet a magasabbal.',
      lepesek: [
        { t: 'Alaptörvény', s: '2012. január 1. óta', c: 'A csúcs az <b>Alaptörvény</b>. Módosításához az <b>összes</b> képviselő 2/3-a kell.' },
        { t: 'Törvény', s: 'csak az Országgyűlés', c: '<b>Törvényt</b> csak az OGY alkothat. A sarkalatos (jelenlévők 2/3-a) és az egyszerű (jelenlévők több mint fele) törvény <b>ugyanazon a szinten</b> van!' },
        { t: 'Kormányrendelet', s: '= MNB elnökének rendelete', c: 'Alatta a <b>Kormány rendelete</b>. Vele egy szinten van az MNB elnökének rendelete.' },
        { t: 'Miniszterelnöki és miniszteri rendelet', s: '= önálló szabályozó szerv vezetőjének rendelete', c: 'Ezután a <b>miniszterelnök</b> és a <b>miniszterek</b> rendeletei, velük egy szinten a 4 önálló szabályozó szervé (NMHH, MEKH, SZTFH, OAH).' },
        { t: 'Önkormányzati rendelet', s: 'csak a településen érvényes', c: 'Legalul a <b>helyi önkormányzati rendelet</b>: csak az adott településen érvényes, és nem ütközhet egyik fentebbivel sem.' }
      ] },
    { cim: 'Hogyan lesz a javaslatból törvény?', tipus: 'lanc',
      lepesek: [
        { t: 'Kezdeményezés', s: 'KE, Kormány, OGY-bizottság, bármely képviselő', c: 'Törvényt <b>kezdeményezhet</b> a köztársasági elnök, a Kormány, egy országgyűlési bizottság vagy bármely képviselő.' },
        { t: 'Vita az OGY-ben', s: 'bizottságok + plenáris ülés', c: 'Az OGY megvitatja, módosító javaslatokat tesznek, majd jön a <b>zárószavazás</b>.' },
        { t: 'Szavazás', s: 'egyszerű: >½ · sarkalatos: ⅔ (jelenlévők)', c: 'Egyszerű törvényhez a <b>jelenlévők több mint fele</b>, sarkalatoshoz a <b>jelenlévők 2/3-a</b> kell.' },
        { t: 'Házelnök aláírja', s: '5 napon belül', c: 'Az OGY elnöke 5 napon belül aláírja, és megküldi a köztársasági elnöknek.' },
        { t: 'Köztársasági elnök', s: '5 nap: aláír · AB-hez küld · visszaküld (1×)', c: 'A KE 5 napon belül <b>aláírja</b>. Ha alaptörvény-ellenesnek tartja, az <b>AB-hez küldi</b> (előzetes normakontroll); ha csak nem ért vele egyet, <b>egyszer</b> visszaküldheti (politikai vétó). Megtagadni nem tudja.' },
        { t: 'Kihirdetés', s: 'Magyar Közlöny', c: 'Végül <b>kihirdetik a Magyar Közlönyben</b>, és a megadott napon hatályba lép (felkészülési idővel!).' }
      ] },
    { cim: 'Országos népszavazás lépésről lépésre', tipus: 'lanc',
      lepesek: [
        { t: 'Ki kezdeményezheti?', s: 'KE, Kormány, 100 000 választópolgár', c: 'Kezdeményezheti a <b>köztársasági elnök</b>, a <b>Kormány</b> vagy legalább <b>100 000</b> választópolgár.' },
        { t: 'Elrendelés', s: '≥200 000: kötelező · 100–200 ezer: OGY dönt', c: '<b>200 000</b> aláírás felett az OGY <b>köteles</b> elrendelni; 100–200 ezer között <b>szabadon dönt</b>.' },
        { t: 'Miről nem lehet?', s: 'pl. Alaptörvény-módosítás, költségvetés, adók', c: 'Csak az <b>OGY hatáskörébe</b> tartozó kérdésről lehet, és például az <b>Alaptörvény módosításáról nem</b>.' },
        { t: 'Érvényes', s: 'az összes választópolgár > fele szavazott', c: '<b>Érvényes</b>, ha az összes választópolgár több mint fele érvényesen szavazott.' },
        { t: 'Eredményes', s: 'az érvényes szavazatok > fele azonos', c: '<b>Eredményes</b>, ha az érvényes szavazatok több mint fele ugyanazt a választ adta. Ilyenkor kötelező az OGY-re.' }
      ] }
  ],

  allamszerv: [
    { cim: 'Ki kit választ, és hány évre?', tipus: 'nyil', intro: 'Csak az Országgyűlést választja közvetlenül a nép, a többiek tőle kapják a megbízatásukat.',
      lepesek: [
        { from: 'Nép', via: 'választás', t: 'Országgyűlés', s: '199 képviselő · 4 év', c: 'A <b>nép</b> 4 évente közvetlenül választja a <b>199 képviselőt</b> (106 egyéni + 93 listás).' },
        { from: 'OGY', via: 'titkos, ⅔', t: 'Köztársasági elnök', s: '5 év · 1× újraválasztható', c: 'Az OGY <b>titkos szavazással</b> választja a KE-t <b>5 évre</b>: 1. fordulóban az összes képviselő 2/3-a kell, utána a két legjobb közt a több szavazat dönt.' },
        { from: 'OGY', via: 'KE javasol, >½', t: 'Miniszterelnök', s: 'az összes képviselő több mint fele', c: 'A <b>miniszterelnököt</b> a KE javaslatára az OGY választja, az <b>összes</b> képviselő több mint felével.' },
        { from: 'KE', via: 'MI javasol', t: 'Miniszterek', s: 'kinevezés, nem választás!', c: 'A <b>minisztereket nem választják</b>: a miniszterelnök javaslatára a <b>KE nevezi ki</b> őket.' },
        { from: 'OGY', via: '⅔', t: 'Alkotmánybírák (15)', s: '9 év (2026 óta, előtte 12)', c: 'A <b>15 alkotmánybírót</b> az OGY 2/3-dal választja <b>9 évre</b>. Az AB elnökét ma már a tagok maguk választják, 3 évre.' },
        { from: 'OGY', via: '⅔', t: 'Kúria elnöke', s: '6 év', c: 'A <b>Kúria elnökét</b> a KE javaslatára az OGY 2/3-dal választja, <b>6 évre</b>. (A sima bírákat a KE nevezi ki.)' },
        { from: 'OGY', via: '⅔', t: 'Legfőbb ügyész', s: '9 év', c: 'A <b>legfőbb ügyészt</b> a KE javaslatára az OGY 2/3-dal választja, <b>9 évre</b>.' },
        { from: 'OGY', via: '⅔', t: 'Ombudsman (AJBH)', s: '6 év', c: 'Az <b>alapvető jogok biztosát</b> a KE javaslatára az OGY 2/3-dal választja, <b>6 évre</b>.' },
        { from: 'OGY', via: '⅔', t: 'ÁSZ elnöke', s: '12 év', c: 'Az <b>Állami Számvevőszék elnökét</b> 2/3-dal, <b>12 évre</b> választják. Csak az elnököt és az alelnököket, nem az összes számvevőt!' }
      ] },
    { cim: 'Konstruktív bizalmatlansági indítvány', tipus: 'lanc', intro: 'Így lehet leváltani a miniszterelnököt, de csak úgy, ha rögtön van helyette másik.',
      lepesek: [
        { t: 'Indítvány', s: 'a képviselők 1/5-e', c: 'A képviselők legalább <b>egyötöde</b> írásban indítványozza a bizalmatlanságot.' },
        { t: 'Új jelölt', s: 'kötelező megnevezni', c: '<b>Konstruktív</b> = az indítványban <b>meg kell nevezni az új miniszterelnök-jelöltet</b>.' },
        { t: 'Szavazás', s: 'az összes képviselő > fele', c: 'Ha az <b>összes</b> képviselő több mint fele megszavazza…' },
        { t: 'Csere', s: 'a régi MI megbukik, az új megválasztva', c: '…a régi miniszterelnök megbízatása megszűnik, és <b>a jelölt egyben megválasztott miniszterelnök</b> lesz. Kormányválság nincs.' }
      ] }
  ],

  birosag: [
    { cim: 'A bíróságok 4 szintje', tipus: 'piramis', intro: 'Fentről lefelé: K-Í-T-J. A legtöbb ügy alul indul.',
      lepesek: [
        { t: 'Kúria', s: 'legfelső · jogegység · elnöke: 6 év', c: 'A <b>Kúria</b> a legfőbb bírói szerv: felülvizsgálat és <b>jogegységi határozat</b>, ami minden bíróságot köt.' },
        { t: 'Ítélőtáblák (5)', s: 'Budapest, Győr, Pécs, Szeged, Debrecen', c: 'Az <b>5 ítélőtábla</b> másodfokon dönt, ha az ügy a törvényszéken indult.' },
        { t: 'Törvényszékek (19 + 1)', s: 'megyeszékhelyek + Fővárosi Törvényszék', c: 'A <b>törvényszék</b> első fokon a súlyosabb ügyekben dönt, másodfokon a járásbíróságok ügyeiben.' },
        { t: 'Járásbíróságok', s: 'Budapesten: kerületi bíróságok', c: 'A <b>járásbíróság</b> a legalsó szint: <b>csak első fokon</b>, polgári és büntető ügyekben.' }
      ] },
    { cim: 'Egy per útja', tipus: 'lanc',
      lepesek: [
        { t: 'Első fok', s: 'pl. járásbíróság', c: 'A per <b>első fokon</b> indul, többnyire a járásbíróságon. Ítélet születik.' },
        { t: 'Fellebbezés', s: 'rendes jogorvoslat', c: 'Ha bármelyik fél <b>fellebbez</b>, megnyílik a <b>másodfok</b> (itt a törvényszéken).' },
        { t: 'Jogerő', s: 'nincs több rendes jogorvoslat', c: 'A másodfokú döntéssel (vagy ha senki sem fellebbez) az ítélet <b>jogerős</b>, és végre lehet hajtani.' },
        { t: 'Felülvizsgálat a Kúrián', s: 'rendkívüli jogorvoslat', c: 'Jogerős döntés ellen már csak <b>rendkívüli</b> jogorvoslat van: <b>felülvizsgálat</b> a Kúrián, vagy perújítás.' },
        { t: 'Alkotmányjogi panasz', s: 'Alkotmánybíróság', c: 'Ha az ítélet az <b>Alaptörvényben</b> biztosított jogodat sérti, alkotmányjogi panasszal az <b>AB-hez</b> fordulhatsz, ami megsemmisítheti az ítéletet.' }
      ] },
    { cim: 'Ki kéri az AB-t, és mikor?', tipus: 'nyil',
      lepesek: [
        { from: 'KE / OGY', via: 'kihirdetés előtt', t: 'Előzetes normakontroll', s: 'még ki nem hirdetett törvény', c: '<b>Előzetes</b>: a törvény már elfogadott, de még <b>nincs kihirdetve</b>. Főleg a KE kéri.' },
        { from: '¼ képviselő', via: 'hatályos szabály', t: 'Utólagos normakontroll', s: '+ Kormány, ombudsman, Kúria elnöke, legfőbb ügyész', c: '<b>Utólagos</b>: már hatályos jogszabályt vizsgál. Kérheti a képviselők <b>negyede</b>, a Kormány, az ombudsman, a Kúria elnöke és a legfőbb ügyész.' },
        { from: 'Bíró', via: 'folyamatban lévő per', t: 'Konkrét normakontroll', s: 'a per felfüggesztésével', c: 'A <b>bíró</b> felfüggeszti a pert, és kéri az AB-t, ha szerinte az alkalmazandó szabály alaptörvény-ellenes.' },
        { from: 'Érintett', via: 'jogerős ítélet után', t: 'Alkotmányjogi panasz', s: 'megsemmisítheti az ítéletet', c: 'Az <b>érintett személy</b> a jogerős ítélet után fordulhat az AB-hez, ha az Alaptörvényben biztosított joga sérült.' }
      ] }
  ],

  munka: [
    { cim: 'Egy munkaviszony élete', tipus: 'lanc',
      lepesek: [
        { t: 'Munkaszerződés', s: 'írásban · munkakör, alapbér, munkavégzés helye', c: 'A szerződést <b>írásban</b> kötik. Kötelező elemei: <b>munkakör, alapbér, munkavégzés helye</b> (és a felek adatai).' },
        { t: 'Keletkezés → kezdet', s: 'a kettő közt nem lehet meghiúsítani', c: 'A munkaviszony a szerződéssel <b>keletkezik</b>, de az első munkanappal <b>kezdődik</b>. A kettő között egyik fél sem hiúsíthatja meg.' },
        { t: 'Próbaidő', s: 'max. 3 hónap (KSZ: 6) · 1× hosszabbítható', c: 'A <b>próbaidő</b> nem kötelező. Legfeljebb 3 hónap, és <b>egyszer</b> hosszabbítható. Alatta bármelyik fél azonnal, indoklás nélkül kiléphet.' },
        { t: 'Munka', s: '8 óra/nap · 20 nap alapszabadság', c: 'Teljes munkaidő: napi <b>8 óra</b>. Alapszabadság: <b>20 munkanap</b>, ami a korral nő.' },
        { t: 'Megszüntetés', s: 'közös megegyezés · felmondás · azonnali', c: 'A felek megszüntethetik <b>közös megegyezéssel</b>, <b>felmondással</b> vagy <b>azonnali hatályú felmondással</b>. (A halál és a határozott idő lejárta: <b>megszűnés</b>.)' },
        { t: 'Felmondási idő', s: '30 nap · ebből a fele felmentés', c: 'Munkáltatói felmondásnál a felmondási idő főszabályként <b>30 nap</b>, és ennek <b>a felére</b> fel kell menteni a munka alól.' },
        { t: 'Végkielégítés', s: '3 év után · max. 6 havi', c: '<b>Végkielégítés</b> legalább <b>3 év</b> után jár (munkáltatói felmondásnál), és legfeljebb 6 havi (25 év után).' }
      ] }
  ],

  polgari1: [
    { cim: 'Mikor mit tehetsz egyedül? (cselekvőképesség)', tipus: 'lanc', intro: 'Jogképes mindenki a születésétől. A cselekvőképesség viszont az életkorral nő.',
      lepesek: [
        { t: '0–14 év: cselekvőképtelen', s: 'a szülő nyilatkozik helyette', c: '14 év alatt <b>cselekvőképtelen</b>: a nevében a törvényes képviselő (szülő) jár el. Apró, mindennapi ügyleteket (pl. egy csoki) azért megköthet.' },
        { t: '14–18 év: korlátozottan cselekvőképes', s: 'a nagyobb ügyekhez szülői jóváhagyás', c: '14–18 között <b>korlátozottan</b> cselekvőképes: apróságokat, a saját keresetével kapcsolatos ügyeket és a csak előnyös szerződéseket maga intézi, a többihez kell a szülő.' },
        { t: '18 év: nagykorú', s: 'teljesen cselekvőképes', c: '<b>18 évesen</b> nagykorú és teljesen cselekvőképes. Kivétel: aki <b>16 felett gyámhatósági engedéllyel</b> házasodik, már ekkor nagykorú lesz.' },
        { t: 'Bíróság korlátozhatja', s: 'gondnokság', c: 'Nagykorúnál a cselekvőképességet <b>csak bíróság</b> korlátozhatja (gondnokság alá helyezés). Lemondani róla nem lehet.' }
      ] },
    { cim: 'Ki örököl?', tipus: 'lanc', intro: 'Első kérdés mindig: van-e érvényes végrendelet?',
      lepesek: [
        { t: 'Végrendelet', s: 'elsőbbsége van', c: 'Ha van <b>végrendelet</b>, az az első. (Közvégrendelet: közjegyző előtt. Magán: saját kézzel írva és aláírva, vagy 2 tanúval.)' },
        { t: 'Gyermekek + házastárs', s: 'a gyermekek fejenként egyenlően', c: 'Végrendelet nélkül elsősorban a <b>gyermekek</b> örökölnek, egyenlő arányban, a <b>házastárs</b> mellett.' },
        { t: 'Házastárs + szülők', s: 'ha nincs leszármazó', c: 'Ha <b>nincs leszármazó</b>, a házastárs mellett a <b>szülők</b> is örökölnek.' },
        { t: 'Szülők egyenlően', s: 'ha házastárs sincs', c: 'Ha házastárs sincs, a <b>szülők fejenként egyenlő arányban</b> örökölnek; utánuk a távolabbi rokonok.' },
        { t: 'Az állam', s: 'szükségképpeni örökös', c: 'Ha senki sincs, az <b>állam</b> örököl, mert ő nem utasíthatja vissza. Az egészet a <b>közjegyző</b> intézi a hagyatéki eljárásban.' }
      ] },
    { cim: 'Ki mennyit kockáztat? (társasági formák)', tipus: 'lanc',
      lepesek: [
        { t: 'Kkt. — közkereseti társaság', s: 'minden tag KORLÁTLANUL felel', c: '<b>Kkt.</b>: ha a cég nem tud fizetni, minden tag a <b>saját vagyonával</b> is felel.' },
        { t: 'Bt. — betéti társaság', s: 'beltag korlátlanul · kültag nem', c: '<b>Bt.</b>: legalább egy <b>beltag korlátlanul</b> felel, a <b>kültag</b> csak a befizetett hozzájárulásával kockáztat.' },
        { t: 'Kft. — korlátolt felelősségű', s: 'törzstőke min. 3 M Ft', c: '<b>Kft.</b>: a tag csak a <b>törzsbetétjéig</b> kockáztat. Lehet egyszemélyes is.' },
        { t: 'Rt. — részvénytársaság', s: 'Zrt. min. 5 M Ft · Nyrt. min. 20 M Ft', c: '<b>Rt.</b>: a tőke részvényekre oszlik, a részvényes csak a részvénye értékéig kockáztat. A <b>Zrt.</b> lehet egyszemélyes, az <b>Nyrt.</b> a tőzsdén van.' }
      ] }
  ],

  polgari2: [
    { cim: 'Egy szerződés élete', tipus: 'lanc',
      lepesek: [
        { t: 'Ajánlat + elfogadás', s: 'szóban, írásban, ráutaló magatartással', c: 'A szerződés a felek <b>egybehangzó akaratnyilatkozatával</b> jön létre. Jognyilatkozat lehet szóbeli, írásbeli vagy <b>ráutaló magatartás</b>. A hallgatás nem elfogadás.' },
        { t: 'Érvényes?', s: 'semmis vagy megtámadható', c: '<b>Semmis</b> (eleve érvénytelen): színlelt, uzsorás, alakiság nélküli, érthetetlen feltételű. <b>Megtámadható</b> (meg kell támadni): megtévesztés, tévedés, feltűnő értékaránytalanság.' },
        { t: 'Hatályos?', s: 'csak érvényes lehet hatályos', c: 'Csak <b>érvényes</b> szerződés lehet <b>hatályos</b>, de nem minden érvényes az: például egy feltétel még nem következett be.' },
        { t: 'Biztosítékok', s: 'foglaló, kötbér', c: '<b>Foglaló</b>: teljesítéskor beszámít; aki hibás, elveszti, illetve a kétszeresét adja vissza. <b>Kötbér</b>: csak írásban köthető ki.' },
        { t: 'Teljesítés vagy szerződésszegés', s: 'késedelem, hibás teljesítés, lehetetlenülés', c: 'Ha valaki nem teljesít: <b>szerződésszegés</b>. Késedelembe a jogosult is eshet; ha a teljesítés <b>lehetetlenné</b> válik, a szerződés megszűnik.' },
        { t: 'Megszűnés', s: 'felmondás: előre · elállás/felbontás: visszamenőleg', c: '<b>Felmondás</b>: a jövőre szűnik meg, az addigiakat teljesíteni kell. <b>Elállás (felbontás)</b>: <b>visszamenőleg</b>, mintha meg sem kötötték volna.' }
      ] },
    { cim: 'Hogyan lesz valami a tiéd? (tulajdonszerzés)', tipus: 'nyil',
      lepesek: [
        { from: 'Eladó', via: 'adásvétel', t: 'Származékos szerzés', s: 'a jog az előzőtől „száll át”', c: '<b>Származékos</b> szerzés: az előző tulajdonostól kapod (adásvétel, ajándék, öröklés). Senki nem adhat át több jogot, mint amennyi neki van.' },
        { from: 'Ingatlan', via: '+ bejegyzés', t: 'Ingatlan-nyilvántartás', s: 'szerződés + földhivatal', c: '<b>Ingatlannál</b> nem elég a szerződés: be kell <b>jegyezni az ingatlan-nyilvántartásba</b>.' },
        { from: 'Fa, állat', via: 'termék', t: 'Termék, termény, szaporulat', s: 'az előadás szerint: származékos', c: 'A <b>termék, termény és szaporulat</b> elsajátítása az előadás szerint <b>származékos</b> szerzésmód.' },
        { from: 'Birtoklás', via: 'ingó 10 · ingatlan 15 év', t: 'Elbirtoklás', s: 'eredeti szerzés', c: '<b>Elbirtoklás</b>: aki sajátjaként szakadatlanul birtokolja, ingónál <b>10</b>, ingatlannál <b>15 év</b> után tulajdonos lesz. Ez <b>eredeti</b> szerzés.' },
        { from: 'Senkié', via: 'birtokba vétel', t: 'Gazdátlan dolog', s: 'eredeti szerzés', c: 'A <b>gazdátlan</b> (senkinek nem a tulajdonában lévő) dolgot birtokba vétellel szerezheted meg. A <b>talált</b> dolog nem ilyen: vissza kell adni, vagy le kell adni a jegyzőnél.' }
      ] },
    { cim: 'Mikor kell kártérítést fizetni?', tipus: 'lanc',
      lepesek: [
        { t: 'Kár', s: 'értékcsökkenés · elmaradt haszon · költségek', c: 'Kell egy <b>kár</b>: ami tönkrement (értékcsökkenés), ami elmaradt (haszon), és amibe a kár elhárítása került.' },
        { t: 'Jogellenesség', s: 'kivéve: beleegyezés, szükséghelyzet, jogos védelem', c: 'Minden károkozás <b>jogellenes</b>, kivéve: a károsult beleegyezett, <b>arányos</b> szükséghelyzet, jogos védelem.' },
        { t: 'Okozati összefüggés', s: 'a tett okozta a kárt', c: 'A magatartás és a kár között <b>okozati összefüggés</b> kell.' },
        { t: 'Felróhatóság', s: 'a károkozónak kell kimentenie magát', c: 'A károkozó akkor mentesül, ha bizonyítja, hogy <b>úgy járt el, ahogy az az adott helyzetben általában elvárható</b>.' },
        { t: 'Teljes kártérítés', s: 'eredeti állapot · nem gazdagodhat', c: 'A kártérítés helyreállítja az <b>eredeti állapotot</b>, de a károsult nem gazdagodhat belőle. A szándékos károkozásért való felelősség nem zárható ki.' }
      ] }
  ],

  bunteto: [
    { cim: 'A bűncselekmény 4 szakasza', tipus: 'lanc', intro: 'Egy bankrablás példáján.',
      lepesek: [
        { t: 'Előkészület', s: 'csak ha a törvény külön bünteti', c: '<b>Előkészület</b>: megszerzi a fegyvert, megrajzolja a tervet. Csak akkor büntetendő, ha a törvény <b>kifejezetten</b> kimondja.' },
        { t: 'Kísérlet', s: 'elkezdi, de nem fejezi be', c: '<b>Kísérlet</b>: betöri az ajtót, de megszólal a riasztó, és elmenekül.' },
        { t: 'Befejezett', s: 'a tényállás megvalósult', c: '<b>Befejezett</b>: elviszi a pénzt. A tényállás minden eleme megvalósult.' },
        { t: 'Bevégzett', s: 'minden következmény beállt', c: '<b>Bevégzett</b>: a cselekmény minden további következménye is bekövetkezett.' }
      ] },
    { cim: 'Szándék vagy gondatlanság?', tipus: 'lanc', intro: 'Ugyanaz a helyzet: valaki gyorsan hajt egy zebra felé.',
      lepesek: [
        { t: 'Egyenes szándék', s: 'KÍVÁNJA az eredményt', c: '<b>Egyenes szándék</b>: kifejezetten el akarja ütni. <b>Kívánja</b> az eredményt.' },
        { t: 'Eshetőleges szándék', s: 'BELENYUGSZIK', c: '<b>Eshetőleges szándék</b>: látja, hogy elütheti, de „nem érdekli”. <b>Belenyugszik</b>.' },
        { t: 'Tudatos gondatlanság', s: 'látja, de BÍZIK', c: '<b>Tudatos gondatlanság</b>: látja a veszélyt, de <b>könnyelműen bízik</b> abban, hogy jó sofőr, és nem lesz baj.' },
        { t: 'Hanyag gondatlanság', s: 'NEM LÁTJA, pedig kéne', c: '<b>Hanyag gondatlanság</b>: észre sem veszi a zebrát, mert nem figyel, pedig kellett volna.' }
      ] },
    { cim: 'A büntetőeljárás útja', tipus: 'lanc',
      lepesek: [
        { t: 'Feljelentés', s: '3 napon belül döntés', c: 'Feljelentés után a hatóság <b>3 napon belül</b> dönt arról, hogy elrendeli-e a nyomozást.' },
        { t: 'Nyomozás', s: 'rendőrség, NAV, ügyészség', c: 'A <b>nyomozás</b> felderíti a tényeket és a bizonyítékokat. A végén az aktát vádemelési javaslattal küldik az ügyésznek.' },
        { t: 'Vádemelés', s: 'az ügyész a vádirattal', c: 'Az <b>ügyész</b> a <b>vádirat</b> benyújtásával emel vádat. Bíróság csak vád alapján járhat el (<b>vádelv</b>).' },
        { t: 'Bírósági tárgyalás', s: 'első fok → fellebbezés → másodfok', c: 'A <b>bíróság</b> dönt. Fellebbezés esetén másodfok jön. Addig él az <b>ártatlanság vélelme</b>.' },
        { t: 'Jogerős ítélet', s: '→ végrehajtás (Bv. tv.)', c: 'A <b>jogerős</b> ítélettel válik valaki bűnössé. Ezután jön a büntetés-végrehajtás. Rendkívüli jogorvoslat csak ezután van.' }
      ] }
  ],

  nemzetkozi: [
    { cim: 'Ki kicsoda az EU-ban?', tipus: 'nyil', intro: 'A 3 „Tanács” a leggyakoribb csapda. Figyeld, ki ül bennük!',
      lepesek: [
        { from: 'Állam- és kormányfők', via: 'irány', t: 'Európai Tanács', s: 'legfelső politikai irányítás', c: 'Az <b>Európai Tanácsban</b> az <b>állam- és kormányfők</b> ülnek. Ez a legmagasabb szintű politikai irányítás.' },
        { from: 'Miniszterek', via: 'jogalkotás', t: 'Európai Unió Tanácsa', s: 'a tagállamok érdekei', c: 'Az <b>EU Tanácsában</b> (Miniszterek Tanácsa) a szakminiszterek ülnek, a <b>tagállamok</b> érdekeit képviselik, és a Parlamenttel együtt alkotnak jogot.' },
        { from: 'Uniós polgárok', via: '5 évente', t: 'Európai Parlament', s: 'közvetlen választás · HU: 21 hely', c: 'Az <b>Európai Parlamentet</b> 5 évente <b>közvetlenül</b> választják az uniós polgárok.' },
        { from: 'Biztosok', via: 'javaslat', t: 'Európai Bizottság', s: 'a szerződések őre · Brüsszel', c: 'Az <b>Európai Bizottság</b> javasolja a jogszabályokat, végrehajt, és a <b>szerződések őre</b>. Az EU egészének érdekét képviseli.' },
        { from: 'Bírák', via: 'ítélkezés', t: 'EU Bírósága', s: 'Luxembourg', c: 'Az <b>Európai Unió Bírósága</b> Luxembourgban van.' },
        { from: '⚠️ Nem EU!', via: 'emberi jogok', t: 'Európa Tanács', s: 'Strasbourg · 46 tag', c: 'Az <b>Európa Tanács</b> NEM uniós szerv: külön nemzetközi szervezet, emberi jogokkal foglalkozik (Strasbourg).' }
      ] },
    { cim: 'Rendelet vagy irányelv?', tipus: 'lanc',
      lepesek: [
        { t: 'Bizottság javasol', s: 'kezdeményezés', c: 'A rendes jogalkotási eljárásban az <b>Európai Bizottság</b> javasol.' },
        { t: 'Parlament + Tanács dönt', s: 'egyenrangú társ-jogalkotók', c: 'Az <b>EP</b> és az <b>EU Tanácsa</b> együtt, egyenrangúan fogadja el. A Tanácsban minősített többség: a tagállamok <b>55%-a</b>, akik a lakosság <b>65%-át</b> adják.' },
        { t: 'Rendelet', s: 'közvetlenül alkalmazandó', c: '<b>Rendelet</b>: minden részében kötelező, és <b>közvetlenül</b> alkalmazandó minden tagállamban. Nem kell átültetni.' },
        { t: 'Irányelv', s: 'a cél kötelező, a tagállam ülteti át', c: '<b>Irányelv</b>: csak a <b>cél</b> kötelező, a tagállam saját jogszabállyal ülteti át.' },
        { t: 'Határozat', s: 'a címzettjére kötelező', c: '<b>Határozat</b>: csak a <b>címzettjére</b> kötelező. A vélemény és az ajánlás nem kötelező.' }
      ] }
  ],

  kozig: [
    { cim: 'A közigazgatás szintjei', tipus: 'piramis',
      lepesek: [
        { t: 'Kormány', s: 'a közigazgatás legfőbb szerve', c: 'A csúcson a <b>Kormány</b> áll, alatta a <b>minisztériumok</b>, kormányhivatalok (pl. KSH) és a rendvédelmi szervek. Ez a <b>központi</b> szint.' },
        { t: 'Fővárosi és vármegyei kormányhivatal', s: 'vezetője a kormánymegbízott', c: 'A <b>területi</b> szinten a kormányhivatal a Kormány általános hatáskörű szerve. Ez <b>dekoncentrált</b> szerv: a központ irányítja.' },
        { t: 'Járási (kerületi) hivatal', s: 'a kormányhivatal része', c: 'A <b>járási hivatalok</b> intézik a legtöbb mindennapi ügyet (okmányok, igazolványok).' },
        { t: 'Helyi szint: jegyző, önkormányzat', s: 'települések', c: 'Helyben nincs külön állami szerv: az ügyeket főleg a <b>jegyző</b> intézi. Mellette ott az <b>önkormányzat</b>, amely önállóan dönt a helyi ügyekben, és a kormányhivatal csak <b>törvényességi</b> felügyeletet gyakorol felette.' }
      ] }
  ],

  fogyaszto: [
    { cim: 'Hibás a termék. Mit tehetsz?', tipus: 'lanc',
      lepesek: [
        { t: 'Panasz a boltban', s: 'szóbeli: azonnal · írásbeli: 30 nap', c: 'A <b>szóbeli</b> panaszt azonnal ki kell vizsgálni. Az <b>írásbelire 30 napon belül</b> írásban, érdemben kell válaszolni.' },
        { t: 'Jótállás vagy szavatosság', s: 'jótállás min. 1 év · kellékszavatosság 2 év', c: 'A <b>jótállás</b> legalább <b>1 év</b> a teljesítéstől; a fogyasztói <b>kellékszavatosság 2 év</b>.' },
        { t: 'Elutasítás', s: 'írásban, tájékoztatással', c: 'Ha elutasítják, <b>írásban</b> meg kell mondaniuk, hová fordulhatsz: hatósághoz vagy békéltető testülethez.' },
        { t: 'Békéltető testület', s: 'peren kívül · minőség, biztonság', c: 'A <b>békéltető testület</b> peren kívül rendezi a vitát (minőség, biztonságosság, termékfelelősség; az árazás nem).' },
        { t: 'Hatóság / bíróság', s: 'kormányhivatal · különös: MEKH, MNB…', c: 'A <b>fogyasztóvédelmi hatóság</b> a kormányhivatal. Különös hatáskörű pl. a <b>MEKH</b> (energia). Végső esetben a bíróság dönt.' }
      ] }
  ]
};
