/* RAPID mód: rövid, kétgombos tippelős kérdések, azonnali továbblépés.
   Az elrontottak pár kérdés múlva visszajönnek, és el is mentődnek (legközelebb is előveszi őket).
   Vezérlés: ← / → , A / D, 1 / 2, kattintás, érintés. */
(function () {
  'use strict';
  const TM = window.TM;
  const { h, $, $$ } = TM;
  const KEY = 'tm-rapid-v1';
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } };
  const save = (s) => { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) { /* */ } };
  const strip = (s) => String(s).replace(/<[^>]+>/g, '');
  const rnd = (a) => a[(Math.random() * a.length) | 0];

  /* Gyors tények: rövid kérdés → jó válasz / csapda. */
  const FACTS = [
    ['egeselmelet', 'Tökéletes égés terméke?', 'CO₂', 'CO'], ['egeselmelet', 'Tökéletlen égés terméke?', 'CO', 'CO₂'],
    ['egeselmelet', 'O₂ a levegőben?', '21%', '78%'], ['egeselmelet', 'N₂ a levegőben?', '78%', '21%'],
    ['egeselmelet', 'Hány % O₂ felett tökéletes az égés?', '18%', '14%'], ['egeselmelet', 'Hány % O₂ alatt megszűnik az égés?', '14%', '18%'],
    ['egeselmelet', '16% O₂ mellett az égés…', 'tökéletlen, CO', 'tökéletes, CO₂'], ['egeselmelet', '13% O₂ mellett az égés…', 'megszűnik', 'tökéletes'],
    ['egeselmelet', '20% O₂ mellett keletkezik…', 'CO₂', 'CO'], ['egeselmelet', 'CO hány tf% felett halálos?', '0,4 tf%', '20 tf%'],
    ['egeselmelet', 'Hőforrás:', 'minden forrás, ahonnan hő szabadul fel', 'csak égési folyamat'],
    ['egeselmelet', 'A hőmérséklet SI-mértékegysége?', 'Kelvin (K)', 'Joule (J)'], ['egeselmelet', 'A hőmennyiség jele?', 'Q', 'c'],
    ['egeselmelet', 'Égéshő jele?', 'Hf', 'Q'], ['egeselmelet', 'Égéshő mértékegysége?', 'J/kg', 'J/kg·K'],
    ['egeselmelet', 'Fajlagos hőkapacitás jele?', 'c', 'Hf'], ['egeselmelet', 'Égéshőnél a kiinduló hőmérséklet?', '293 K', '273 K'],
    ['egeselmelet', 'Gyújtóforrás elvétele után kialszik:', 'lobbanáspont', 'gyulladási hőmérséklet'],
    ['egeselmelet', 'Gyújtóforrás elvétele után is ég:', 'gyulladási hőmérséklet', 'lobbanáspont'],
    ['egeselmelet', 'Melyik alacsonyabb?', 'lobbanáspont', 'gyulladási hőmérséklet'],
    ['egeselmelet', 'Vákuumban NEM jön létre:', 'hővezetés', 'hősugárzás'], ['egeselmelet', 'Anyagáramlással jár:', 'hőáramlás', 'hővezetés'],
    ['egeselmelet', 'Közvetítő anyag nem kell:', 'hősugárzás', 'hőáramlás'], ['egeselmelet', 'Égésterméket is szállít:', 'hőáramlás (konvekció)', 'hővezetés (kondukció)'],
    ['egeselmelet', 'Jó hővezető:', 'fém', 'porcelán'], ['egeselmelet', 'Hősugárzást jobban elnyeli:', 'fekete, durva felület', 'fényes, sima felület'],
    ['egeselmelet', 'Az égés feltételei mellé kell még:', 'azonos tér és idő', '21% oxigén'],
    ['egeselmelet', 'Az égés folyamata:', 'kémiai', 'fizikai'], ['egeselmelet', 'Gyors égés jellemzője:', 'fényjelenség', 'korrózió'],
    ['egeselmelet', 'Lassú égés példája:', 'korrózió', 'robbanás'], ['egeselmelet', 'Előre összekeveredett gáz + O₂ égése:', 'kinetikai', 'diffúz'],
    ['egeselmelet', 'Égés közben keveredik az O₂-vel:', 'diffúz', 'kinetikai'], ['egeselmelet', 'Láng nélküli égés:', 'izzó égés', 'diffúz égés'],
    ['egeselmelet', 'Legtöbbször melyik halmazállapot ég?', 'gőz / gáz', 'szilárd'],
    ['egeselmelet', 'Nehezen éghető anyag:', 'gyújtóforrás nélkül nem ég tovább', 'meg sem gyullad'],
    ['egeselmelet', 'A láng melyik zónájában ég el a H₂ és a CO?', 'III.', 'I.'], ['egeselmelet', 'Hol a legforróbb a láng?', 'a rétegvonalnál (külső zóna)', 'a láng közepén'],
    ['egeselmelet', 'A tűz környezet szerint:', 'zárt / nyílt', 'terjedő / nem terjedő'], ['egeselmelet', 'A tűz fejlődés szerint:', 'terjedő / nem terjedő', 'zárt / nyílt'],
    ['eges-tuzoltas', 'Kis tűz:', '100 m² alatt', '1000 m² alatt'], ['eges-tuzoltas', 'Közepes tűz:', '100–1000 m²', '1000–5000 m²'],
    ['eges-tuzoltas', 'Nagy tűz:', '1000 m² felett', '500 m² felett'], ['eges-tuzoltas', 'A tűz megszüntetése:', 'szervezett tűzoltással', 'csak vízzel'],
    ['eges-tuzoltas', 'Az égés zónájának jellemzője:', 'hőfeszültség', 'oxigénhiány'], ['eges-tuzoltas', 'Mérgező, oxigénhiányos lehet:', 'füstzóna', 'égés zónája'],
    ['eges-tuzoltas', 'Itt készülnek elő az anyagok a gyulladásra:', 'hőterhelésnek kitett zóna', 'füstzóna'],
    ['eges-tuzoltas', 'A gázcsere oka:', 'sűrűségkülönbség', 'nyomásnövelés'], ['eges-tuzoltas', 'Szélben elszálló égő részek új tüze:', 'röptűz', 'izzó égés'],
    ['eges-tuzoltas', 'Zárt térben felül:', 'magas nyomás, füst ki', 'alacsony nyomás, levegő be'], ['eges-tuzoltas', 'Ahol a nyomás egyenlő:', 'semleges zóna', 'füstzóna'],
    ['eges-tuzoltas', 'Melyik a FŐ oltóhatás?', 'fojtóhatás', 'kiszorító hatás'], ['eges-tuzoltas', 'Melyik a FŐ oltóhatás?', 'hűtőhatás', 'párolgási hatás'],
    ['eges-tuzoltas', 'Melyik a FŐ oltóhatás?', 'antikatalitikus hatás', 'elválasztó hatás'], ['eges-tuzoltas', 'Melyik a FŐ oltóhatás?', 'hőhatás', 'szublimációs hatás'],
    ['eges-tuzoltas', 'Inert gázok oltóhatása:', 'fojtó, kiszorító', 'kémiai gátlás'], ['eges-tuzoltas', 'Az inert gázok kémiai úton gátolják az égést.', 'Hamis', 'Igaz'],
    ['eges-tuzoltas', '1 l vízből mennyi gőz?', '1750 l', '175 l'], ['eges-tuzoltas', '1 l víz elpárologtatásához:', '2684 kJ', '572 kJ'],
    ['eges-tuzoltas', 'A párolgási hatás melyikhez tartozik?', 'hűtőhatás', 'fojtóhatás'], ['eges-tuzoltas', 'A kiszorító hatás melyikhez tartozik?', 'fojtóhatás', 'hűtőhatás'],
    ['eges-tuzoltas', 'Az elválasztó hatás (pl. hab) melyikhez tartozik?', 'fojtóhatás', 'hűtőhatás'], ['eges-tuzoltas', '„Nem jelentős” alhatás:', 'szublimációs', 'párolgási'],
    ['eges-tuzoltas', 'Szabad ionok az O₂ helyére épülnek:', 'homogén inhibíció', 'heterogén inhibíció'], ['eges-tuzoltas', 'Falhatás + homogén inhibíció:', 'heterogén inhibíció', 'kiszorító hatás'],
    ['eges-tuzoltas', 'Heterogén inhibíció jellemző:', 'oltóporokra', 'vízre'], ['eges-tuzoltas', 'Oxigén elvonása:', 'lezárás, elárasztás', 'hűtés'],
    ['eges-tuzoltas', 'Fedőt teszel az égő lábasra:', 'oxigén elvonása', 'éghető anyag eltávolítása'], ['eges-tuzoltas', 'Elzárod a gázcsapot:', 'éghető anyag', 'oxigén'],
    ['egestermekek', 'Sárga füst:', 'kén', 'foszfor'], ['egestermekek', 'Vörösesbarna füst:', 'nitrózus gázok (NOx)', 'kén'],
    ['egestermekek', 'Sűrű fehér füst:', 'foszfor', 'korom'], ['egestermekek', 'Fekete füst:', 'korom (műanyag, gumi, olaj)', 'víztartalmú anyag'],
    ['egestermekek', 'Világos füst:', 'nedves anyag, rövid égés', 'kén'], ['egestermekek', 'PVC égésekor keletkezik:', 'foszgén', 'ózon'],
    ['egestermekek', 'Tovább égni képes égéstermék:', 'tökéletlen', 'tökéletes'], ['egestermekek', 'Hess tétele: Q =', 'Q₁ + Q₂', 'Q₁ · Q₂'],
    ['viz', 'Mit TILOS vízzel oltani?', 'elektromos tűz', 'fa tüze'], ['viz', 'Mit TILOS vízzel oltani?', 'alkálifém (pl. Na) tüze', 'papír tüze'],
    ['viz', 'Víz legnagyobb sűrűsége:', '4 °C', '0 °C'], ['viz', 'Fagyáskor a víz térfogata:', '1/9-del nő', 'csökken'],
    ['viz', 'Kalcium-karbid + víz:', 'acetilén', 'oxigén'], ['viz', 'Víz bomlásakor robbanás:', '3000 °C', '1000 °C'],
    ['viz', 'Melyik létező vízsugár-fajta?', 'porlasztott', 'sűrített'], ['viz', 'Melyik létező vízsugár-fajta?', 'kötött', 'fojtott'], ['viz', 'Melyik létező vízsugár-fajta?', 'szórt', 'gőzölt'],
    ['viz', 'Inhibíciós hatása is van:', 'vízköd', 'kötött sugár'], ['viz', 'Porlasztott sugár cseppmérete:', '0,5–1 mm', '15–18 µm'],
    ['oltogaz-oltopor', 'Melyik inert (semleges) gáz?', 'CO₂, N₂', 'halon'], ['oltogaz-oltopor', 'Melyik gáz gátolja kémiai úton az égést?', 'halon', 'nitrogén'],
    ['oltogaz-oltopor', 'Halonból elég:', '2–3%', '25–30%'], ['oltogaz-oltopor', 'Halon elsődleges oltóhatása:', 'antikatalitikus', 'kiszorító'],
    ['oltogaz-oltopor', 'CO₂ halálos lehet:', '20 tf% felett', '2 tf% felett'], ['oltogaz-oltopor', 'Szárazjég hőmérséklete:', '−78 °C', '0 °C'],
    ['oltogaz-oltopor', 'CO₂-vel NEM oltható:', 'izzó, parázsló anyag', 'elektromos berendezés'], ['oltogaz-oltopor', 'Mit használnak hajtógázként?', 'nitrogén', 'halon'],
    ['oltogaz-oltopor', 'Inergen:', 'N₂ + Ar + CO₂', 'halon + víz'], ['oltogaz-oltopor', 'Por jó diszperzitása:', '15–18 µm', '0,5–1 mm'],
    ['oltogaz-oltopor', 'Por elektromos tűzre:', '1000 V-ig, 1 m-ről', '400 V-ig, 3 m-ről'], ['oltogaz-oltopor', '„A” tűzosztály:', 'szilárd anyag', 'gáz'],
    ['oltogaz-oltopor', '„B” tűzosztály:', 'folyadék', 'fém'], ['oltogaz-oltopor', '„C” tűzosztály:', 'gáz', 'folyadék'],
    ['oltogaz-oltopor', '„D” tűzosztály:', 'fém', 'gáz'], ['oltogaz-oltopor', '„E” tűzosztály:', 'feszültség alatti berendezés', 'szilárd anyag'],
    ['oltogaz-oltopor', 'NaHCO₃-por bomlik:', '40 °C felett', '400 °C felett'], ['oltogaz-oltopor', 'Por hatóanyag-tartalma:', '90–97%', '10–20%'],
    ['habok', 'Hk < 20:', 'nehézhab', 'könnyűhab'], ['habok', 'Hk 20–200:', 'középhab', 'nehézhab'], ['habok', 'Hk > 200:', 'könnyűhab', 'középhab'],
    ['habok', 'Habkiadósság:', 'hab térfogata / oldat térfogata', 'oldat / víz'], ['habok', 'Átlagos bekeverés:', '1–6%', '20–30%'],
    ['habok', 'Hab =', 'víz + habképző + levegő', 'víz + por + CO₂'], ['habok', 'Habtörés:', 'habmegsemmisülés', 'habképzés'],
    ['habok', 'Felületi feszültséget csökkent:', 'habképző anyag', 'nitrogén'], ['habok', '50%-os oldatkiválás:', 'félvízkiválás', 'habtörés'],
    ['habok', 'AFFF:', 'vizes filmképző', 'fehérje alapú'], ['habok', 'Melyik a hab fő oltóhatása?', 'takaró hatás', 'antikatalitikus'],
    ['kemiai-biztonsag', 'Kémiai biztonsági törvény:', '2000. évi XXV.', '1993. évi XCIII.'], ['kemiai-biztonsag', 'Xn jelentése:', 'ártalmas', 'irritatív'],
    ['kemiai-biztonsag', 'Xi jelentése:', 'irritatív', 'ártalmas'], ['kemiai-biztonsag', 'O jelentése:', 'oxidáló', 'robbanó'],
    ['kemiai-biztonsag', 'E jelentése:', 'robbanásveszélyes', 'környezeti veszély'], ['kemiai-biztonsag', 'N jelentése:', 'környezeti veszély', 'nagyon mérgező'],
    ['kemiai-biztonsag', 'T+ jelentése:', 'nagyon mérgező', 'tűzveszélyes'], ['kemiai-biztonsag', 'C jelentése:', 'maró', 'mérgező'],
    ['kemiai-biztonsag', 'R-mondat helyett most:', 'H-mondat', 'P-mondat'], ['kemiai-biztonsag', 'S-mondat helyett most:', 'P-mondat', 'H-mondat'],
    ['kemiai-biztonsag', 'CLP-piktogramok száma:', '9', '16'], ['kemiai-biztonsag', 'Súlyosabb jelzőszó:', 'Veszély!', 'Figyelem!'],
    ['kemiai-biztonsag', 'Biztonsági adatlap:', '16 pont', '9 pont'], ['kemiai-biztonsag', 'CLP =', 'a GHS uniós változata', 'a REACH része'],
    ['kemiai-biztonsag', 'REACH első betűje:', 'Registration', 'Risk'], ['kemiai-biztonsag', 'EINECS:', 'létező anyagok jegyzéke', 'új anyagok jegyzéke'],
    ['kemiai-biztonsag', 'Kockázat =', 'valószínűség és súlyosság', 'csak a súlyosság'], ['kemiai-biztonsag', 'Nagyon mérgező LD50:', '< 25 mg/kg', '> 2000 mg/kg'],
    ['munkavedelem-alapjai', 'Munkavédelmi törvény:', '1993. évi XCIII.', '2000. évi XXV.'], ['munkavedelem-alapjai', 'A munkavédelem … munkavégzésre vonatkozik:', 'szervezett', 'önkéntes'],
    ['munkavedelem-alapjai', 'Biztonsági és … követelmények:', 'egészségügyi', 'pénzügyi'], ['munkavedelem-alapjai', 'Törvénykezési, szervezési, … előírások:', 'intézményi', 'gazdasági'],
    ['munkavedelem-alapjai', 'Ki a munkavédelem résztvevője?', 'állam', 'szakszervezet'], ['munkavedelem-alapjai', 'Ki a munkavédelem résztvevője?', 'munkáltató', 'biztosító'],
    ['munkavedelem-alapjai', 'Ki a munkavédelem résztvevője?', 'munkavállaló', 'rendőrség'], ['munkavedelem-alapjai', 'Melyik tartozik a munkavédelem tagozódásához?', 'munkahigiénia', 'tűzvédelem'],
    ['munkavedelem-alapjai', 'Melyik tartozik a munkavédelem tagozódásához?', 'munkabiztonság', 'vagyonvédelem'], ['munkavedelem-alapjai', 'Melyik tartozik a munkavédelem tagozódásához?', 'munkaegészségügy', 'környezetvédelem'],
    ['munkavedelem-alapjai', 'Ki felel a munkavédelmi előírásokért?', 'munkáltató ÉS munkavállaló', 'csak a munkavállaló'],
    ['munkavedelem-alapjai', 'Első írásos munkavédelmi szabály:', 'Hammurabi', 'angol Gyártörvény'], ['munkavedelem-alapjai', 'A munkáltató előtérbe helyezi:', 'kollektív védelmet', 'egyéni védőeszközt'],
    ['munkavedelem-alapjai', 'Megtagadhatja a munkát, ha…', 'közvetlenül, súlyosan veszélyes', 'fárasztó'],
    ['munkavedelem-gyakorlat', 'Munkabaleset:', 'szervezett munkavégzés során', 'bárhol, bármikor'], ['munkavedelem-gyakorlat', 'Munkabaleset jellege:', 'hirtelen', 'tartós'],
    ['munkavedelem-gyakorlat', 'Foglalkozási megbetegedés jellege:', 'tartós', 'hirtelen'], ['munkavedelem-gyakorlat', 'Foglalkozási megbetegedés oka:', 'munkahelyi kóroki tényezők', 'csak a munkáltató hibája'],
    ['munkavedelem-gyakorlat', 'Hazafelé saját autóval baleset:', 'nem munkabaleset (úti)', 'munkabaleset'], ['munkavedelem-gyakorlat', 'Hallgató gyakorlaton megsérül:', 'munkabaleset', 'nem munkabaleset'],
    ['munkavedelem-gyakorlat', 'Melyik számít szervezett munkavégzésnek?', 'tanulói gyakorlat', 'baráti segítség'], ['munkavedelem-gyakorlat', 'Melyik számít szervezett munkavégzésnek?', 'közalkalmazotti jogviszony', 'szívességi munka'],
    ['munkavedelem-gyakorlat', 'Ki dönt a munkabaleseti jellegről?', 'munkáltató', 'sérült'], ['munkavedelem-gyakorlat', 'Munkabaleset elévül:', '3 év', '10 év'],
    ['munkavedelem-gyakorlat', 'Felnőtt nő max. emel:', '20 kg', '50 kg'], ['munkavedelem-gyakorlat', 'Felnőtt férfi max. emel:', '50 kg', '80 kg'],
    ['munkavedelem-gyakorlat', 'Csak gépi eszközzel:', '200 kg felett', '100 kg felett'], ['munkavedelem-gyakorlat', 'EVE 1. kategória:', 'kertészkesztyű', 'légzésvédő'],
    ['munkavedelem-gyakorlat', 'EVE 3. kategória:', 'légzésvédő, leesés elleni', 'napszemüveg'], ['munkavedelem-gyakorlat', 'Hallásvédő kategóriája:', '2.', '1.'],
    ['munkavedelem-gyakorlat', 'Pénzbeli megváltás a védelem helyett:', 'tilos', 'megengedett'], ['munkavedelem-gyakorlat', 'Melyik létező munkaköri orvosi vizsgálat?', 'soron kívüli', 'önkéntes'],
    ['kotelezettsegek', 'Előzetes oktatást tartja:', 'közvetlen munkahelyi vezető', 'hatóság'], ['kotelezettsegek', 'Évenkénti oktatást tartja:', 'munkavédelmi szakember', 'portás'],
    ['kotelezettsegek', 'Rendkívüli oktatás mikor?', 'baleset után', 'évente'], ['kotelezettsegek', 'Áramvédő kapcsoló ellenőrzése:', 'havonta', 'évente'],
    ['kotelezettsegek', 'Napi előzetes ellenőrzés:', 'munkavállaló', 'szakértő'], ['kotelezettsegek', 'EVE kiadásáért felel:', 'közvetlen vezető', 'gyártó'],
    ['kotelezettsegek', 'Alapkötelezettség:', 'a veszélyes helyettesítése', 'a kockázat áthárítása'], ['kotelezettsegek', 'EVE hazavihető?', 'csak írásbeli engedéllyel', 'bármikor']
  ];

  /* Több helyes válaszos kérdés → „Igaz vagy hamis?” állítás ({x} = a válaszlehetőség). */
  const MULTI = {
    'Milyen légzőszervre igen káros gázok lehetnek a füstben, ha az anyag klórt vagy nitrogént tartalmaz?': 'Klór- vagy nitrogéntartalmú anyag égésekor a füstben ez a légzőszervre igen káros gáz lehet: {x}',
    'Melyek a vízköd oltóhatásai?': 'A vízköd oltóhatása: {x}',
    'Melyek a víz mint oltóanyag előnyei?': 'A víz mint oltóanyag előnye: {x}',
    'Mire ALKALMATLAN a CO₂?': 'A CO₂ alkalmatlan erre: {x}',
    'Mikor NEM használható halon?': 'Halon NEM használható ebben az esetben: {x}',
    'Melyek a tűzoltóhabok fő oltóhatásai?': 'A tűzoltóhabok fő oltóhatása: {x}',
    'Mire NEM terjed ki a kémiai biztonsági törvény hatálya?': 'A kémiai biztonsági törvény hatálya NEM terjed ki erre: {x}',
    'Kik a munkavédelem résztvevői?': 'A munkavédelem résztvevője: {x}',
    'Mi a munkavédelem tagozódása?': 'A munkavédelem tagozódásához tartozik: {x}',
    'Melyek az Mvt. alapelvei?': 'Az Mvt. alapelve: {x}',
    'Milyen veszélyek fordulhatnak elő a munkahelyen?': 'Munkahelyen előforduló veszélyfajta: {x}',
    'Melyek tartoznak a szervezett munkavégzés jogviszonyai közé?': 'Szervezett munkavégzésnek számít: {x}',
    'Milyen munkaköri orvosi alkalmassági vizsgálatok vannak?': 'Létező munkaköri orvosi alkalmassági vizsgálat: {x}',
    'Melyek az alapvető munkavédelmi kötelezettségek?': 'Alapvető munkavédelmi kötelezettség: {x}',
    'Mely szabályzatok vonatkoznak egy létesítményre?': 'Létesítményre vonatkozó munkavédelmi szabályzat: {x}',
    'Mely anyagok számítanak veszélyes anyagnak?': 'Veszélyes anyagnak számít: {x}',
    'Mely kategóriák tartoznak az éghető anyag halmazállapota szerinti felosztáshoz?': 'Az éghető anyag halmazállapota szerinti tűz-kategória: {x}',
    'Jelölje be a fő oltóhatásokat!': 'Fő oltóhatás: {x}',
    'Melyek az oltóanyag megválasztásának szempontjai?': 'Az oltóanyag megválasztásának szempontja: {x}',
    'A tűz környezetétől függően lehet:': 'A tűz környezetétől függően lehet: {x}',
    'A tűz fejlődésének szempontjából lehet:': 'A tűz fejlődésének szempontjából lehet: {x}'
  };
  const cut = (txt, at, before, after) => {
    // szóhatáron vágott részlet a hiányzó szó körül
    let a = Math.max(0, at - before), b = Math.min(txt.length, at + after);
    if (a > 0) { const sp = txt.indexOf(' ', a); a = sp >= 0 && sp < at ? sp + 1 : a; }
    if (b < txt.length) { const sp = txt.lastIndexOf(' ', b); b = sp > at + 5 ? sp : b; }
    return (a > 0 ? '…' : '') + txt.slice(a, b).trim() + (b < txt.length ? '…' : '');
  };
  function buildItems() {
    const items = [];
    const add = (topic, q, right, wrong, why, src) => {
      if (!right || !wrong || TM.norm(right) === TM.norm(wrong)) return;
      items.push({ topic, q, r: strip(right), w: strip(wrong), why: why ? strip(why) : '', key: topic + '|' + q + '|' + strip(right) + '|' + strip(wrong) });
    };
    FACTS.concat(TM.extraFacts || []).forEach(([t, q, r, w]) => add(t, q, r, w, ''));
    const all = [];
    TM.lessons.forEach((l) => l.quiz.forEach((q) => all.push({ ...q, topic: l.id })));
    (TM.bank || []).forEach((q) => all.push(q));
    const clozeWords = {};
    all.filter((q) => q.type === 'cloze').forEach((q) => q.text.replace(/\[([^\]]+)\]/g, (m, x) => { (clozeWords[q.topic] = clozeWords[q.topic] || []).push(x.split('|')[0]); }));
    const allWords = [].concat(...Object.values(clozeWords));
    all.forEach((q) => {
      if (q.type === 'tf') add(q.topic, strip(q.q), q.a ? 'Igaz' : 'Hamis', q.a ? 'Hamis' : 'Igaz', q.why);
      else if (q.type === 'mc') q.opts.forEach((o, i) => { if (i !== q.a) add(q.topic, strip(q.q), q.opts[q.a], o, q.why); });
      else if (q.type === 'multi') q.opts.forEach((o, i) => {
        const tpl = MULTI[strip(q.q)];
        const text = tpl ? tpl.replace('{x}', strip(o)) + ' — igaz?' : `${strip(q.q)} → ${strip(o)}?`;
        add(q.topic, text, q.a.includes(i) ? 'Igaz' : 'Hamis', q.a.includes(i) ? 'Hamis' : 'Igaz', q.why);
      });
      else if (q.type === 'cloze') {
        const blanks = []; q.text.replace(/\[([^\]]+)\]/g, (m, x) => blanks.push(x.split('|')));
        blanks.forEach((alts, k) => {
          let n = -1;
          const full = q.text.replace(/\[([^\]]+)\]/g, (m, x) => (++n === k ? '_____' : x.split('|')[0]));
          const text = cut(full, full.indexOf('_____'), 90, 75);
          const pool = (clozeWords[q.topic] || []).concat(allWords).filter((w) => !alts.some((a) => TM.norm(a) === TM.norm(w)));
          const sameKind = pool.filter((w) => /\d/.test(w) === /\d/.test(alts[0]));
          add(q.topic, text, alts[0], rnd(sameKind.length ? sameKind : pool), q.why);
        });
      }
    });
    return items;
  }

  TM.rapid = function (app) {
    const ITEMS = buildItems();
    const S = Object.assign({ hard: {}, best: 0, total: 0, right: 0 }, load());
    let cur = null, side = 0, busy = false, streak = 0, n = 0, ok = 0, t0 = performance.now(), queue = [], last = [], sprint = null, alive = true;
    const topics = TM.plan.map((p) => p.id).filter((id) => ITEMS.some((i) => i.topic === id));
    let sel = topics.slice();

    const view = h(`<div class="rapid">
      <div class="r-top">
        <div class="r-stat"><b data-o="streak">0</b><small>sorozat</small></div>
        <div class="r-stat"><b data-o="acc">–</b><small>pontosság</small></div>
        <div class="r-stat"><b data-o="n">0</b><small>kérdés</small></div>
        <div class="r-stat"><b data-o="pm">–</b><small>/ perc</small></div>
        <div class="r-stat hard"><b data-o="hard">0</b><small>nehéz</small></div>
        <div class="r-stat"><b data-o="best">${S.best}</b><small>rekord</small></div>
      </div>
      <div class="r-sprint" data-sprintbar hidden><i></i></div>
      <div class="r-card" data-card>
        <div class="r-topic" data-o="topic"></div>
        <div class="r-q" data-o="q"></div>
        <div class="r-opts">
          <button class="r-opt" data-s="0"><span class="r-k">← · A · 1</span><b data-o="o0"></b></button>
          <button class="r-opt" data-s="1"><span class="r-k">→ · D · 2</span><b data-o="o1"></b></button>
        </div>
        <div class="r-why" data-o="why"></div>
      </div>
      <div class="r-bottom">
        <div class="seg" data-rmode><button class="on" data-m="all">Minden</button><button data-m="hard">Csak a nehezek</button><button data-m="sprint">⏱ 60 mp sprint</button></div>
        <details class="r-topics"><summary>Témák (${topics.length})</summary><div data-topics></div></details>
      </div>
    </div>`);
    app.replaceChildren(view);

    const hardCount = () => Object.keys(S.hard).filter((k) => S.hard[k] > 0).length;
    function hud() {
      $('[data-o="streak"]', view).textContent = streak;
      $('[data-o="n"]', view).textContent = n;
      $('[data-o="acc"]', view).textContent = n ? Math.round((ok / n) * 100) + '%' : '–';
      const min = (performance.now() - t0) / 60000;
      $('[data-o="pm"]', view).textContent = n > 2 ? Math.round(n / Math.max(min, 0.1)) : '–';
      $('[data-o="hard"]', view).textContent = hardCount();
      $('[data-o="best"]', view).textContent = S.best;
    }
    function topicsUI() {
      $('[data-topics]', view).innerHTML = topics.map((t) => { const p = TM.plan.find((x) => x.id === t); return `<label><input type="checkbox" data-t="${t}" ${sel.includes(t) ? 'checked' : ''}> ${p.no}. ${p.title}</label>`; }).join('');
      $$('[data-topics] input', view).forEach((c) => c.onchange = () => { sel = $$('[data-topics] input:checked', view).map((x) => x.dataset.t); if (!sel.length) { sel = [c.dataset.t]; c.checked = true; } queue = []; });
    }
    topicsUI();

    let mode = 'all';
    function pick() {
      const pool = ITEMS.filter((i) => sel.includes(i.topic));
      // visszatérő hibák: ütemezve
      const dueIdx = queue.findIndex((x) => x.at <= n);
      if (dueIdx >= 0) { const it = queue.splice(dueIdx, 1)[0].item; if (sel.includes(it.topic)) return it; }
      const hard = pool.filter((i) => S.hard[i.key] > 0 && !last.includes(i.key));
      if (mode === 'hard') { if (hard.length) return rnd(hard); TM.toast('Nincs több nehéz kérdés — szép! 🔥'); setMode('all'); }
      if (hard.length && Math.random() < 0.3) return rnd(hard);
      let it; let guard = 0;
      do { it = rnd(pool); } while (last.includes(it.key) && guard++ < 20);
      return it;
    }

    function show() {
      cur = pick(); last.push(cur.key); if (last.length > 12) last.shift();
      side = Math.random() < 0.5 ? 0 : 1;
      const p = TM.plan.find((x) => x.id === cur.topic);
      $('[data-o="topic"]', view).textContent = `${p ? p.no + '. ' + p.title : ''}${S.hard[cur.key] > 0 ? ' · 🔁 visszatérő' : ''}`;
      $('[data-o="q"]', view).textContent = cur.q;
      $('[data-o="o0"]', view).textContent = side === 0 ? cur.r : cur.w;
      $('[data-o="o1"]', view).textContent = side === 0 ? cur.w : cur.r;
      $('[data-o="why"]', view).textContent = '';
      const card = $('[data-card]', view); card.className = 'r-card in';
      $$('.r-opt', view).forEach((b) => b.className = 'r-opt');
      busy = false;
    }

    function answer(s) {
      if (busy || !cur) return;
      if (sprint && sprint.over) return;
      busy = true;
      const right = s === side;
      n++; S.total++;
      const btns = $$('.r-opt', view), card = $('[data-card]', view);
      btns[side].classList.add('ok');
      if (right) {
        ok++; S.right++; streak++; if (streak > S.best) S.best = streak;
        if (S.hard[cur.key] > 0) S.hard[cur.key]--;
        if (S.hard[cur.key] === 0) delete S.hard[cur.key];
        card.className = 'r-card good';
        if (streak && streak % 10 === 0) { const r = card.getBoundingClientRect(); TM.sparks(r.left + r.width / 2, r.top + 40, 40 + Math.min(streak, 50)); TM.toast(`🔥 ${streak}-es sorozat!`); }
        save(S); hud();
        setTimeout(show, 160);
      } else {
        btns[s].classList.add('bad');
        streak = 0;
        S.hard[cur.key] = Math.min(3, (S.hard[cur.key] || 0) + 2);
        queue.push({ item: cur, at: n + 3 }, { item: cur, at: n + 9 });
        card.className = 'r-card bad';
        $('[data-o="why"]', view).innerHTML = `<b>✔ ${cur.r}</b>${cur.why ? ' — ' + cur.why : ''}<span>Nyomj bármelyik gombot a folytatáshoz</span>`;
        save(S); hud();
        busy = 'wrong';
      }
    }
    function press(s) {
      if (busy === 'wrong') { busy = false; show(); return; }
      answer(s);
    }

    /* sprint */
    function startSprint() {
      n = 0; ok = 0; streak = 0; t0 = performance.now(); queue = [];
      sprint = { end: performance.now() + 60000, over: false };
      const bar = $('[data-sprintbar]', view); bar.hidden = false;
      const tick = () => {
        if (!alive || !sprint) return;
        const k = Math.max(0, (sprint.end - performance.now()) / 60000);
        $('i', bar).style.width = k * 100 + '%';
        if (k <= 0) {
          sprint.over = true;
          $('[data-o="q"]', view).innerHTML = `⏱ Vége! <span class="fire-text">${ok}</span> jó válasz ${n}-ből`;
          $('[data-o="why"]', view).innerHTML = '<span>Nyomj egy gombot az új sprinthez, vagy válts módot.</span>';
          busy = 'sprintEnd'; return;
        }
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick); hud(); show();
    }
    function setMode(m) {
      mode = m === 'sprint' ? 'all' : m;
      $$('[data-rmode] button', view).forEach((b) => b.classList.toggle('on', b.dataset.m === m));
      sprint = null; $('[data-sprintbar]', view).hidden = true;
      if (m === 'sprint') startSprint(); else { busy = false; show(); }
    }
    $$('[data-rmode] button', view).forEach((b) => b.onclick = () => setMode(b.dataset.m));

    const go = (s) => { if (busy === 'sprintEnd') { startSprint(); return; } press(s); };
    $$('.r-opt', view).forEach((b) => b.onclick = (e) => { e.stopPropagation(); go(+b.dataset.s); });
    $('[data-card]', view).addEventListener('click', () => { if (busy === 'wrong' || busy === 'sprintEnd') go(0); });
    const onKey = (e) => {
      if (e.target.tagName === 'INPUT') return;
      const k = e.key.toLowerCase();
      if (['arrowleft', 'a', '1', 'j'].includes(k)) { e.preventDefault(); go(0); }
      else if (['arrowright', 'd', '2', 'l'].includes(k)) { e.preventDefault(); go(1); }
      else if (k === ' ' || k === 'enter') { e.preventDefault(); if (busy === 'wrong' || busy === 'sprintEnd') go(0); }
    };
    const onMouse = (e) => { if (e.button === 3 || e.button === 4) { e.preventDefault(); if (e.type === 'mousedown') go(e.button === 4 ? 0 : 1); } };
    document.addEventListener('keydown', onKey); window.addEventListener('mousedown', onMouse); window.addEventListener('mouseup', onMouse);

    hud(); show();
    return () => { alive = false; document.removeEventListener('keydown', onKey); window.removeEventListener('mousedown', onMouse); window.removeEventListener('mouseup', onMouse); };
  };
  TM.rapidCount = () => buildItems().length;
  TM.rapidItems = buildItems;
})();
