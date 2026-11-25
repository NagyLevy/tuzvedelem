/* 10. lecke — Közigazgatás és önkormányzatok (forrás: Közigazgatási jogi alapismeretek pdf + kurzus 6. lecke) */
window.JOG_LECKEK = (window.JOG_LECKEK || []).concat([{
  id: 'kozig',
  perc: 6,
  egyMondat: 'A közigazgatás az állam „végrehajtó karja”: <b>közhatalommal</b>, <b>alá-fölérendeltségben</b> intézi az ügyeidet (engedély, igazolvány, bírság) — a <b>Kormány</b> a csúcsa, alul pedig a <b>jegyző</b> és az <b>önkormányzatok</b> dolgoznak.',
  kartyak: [
    { k: 'Fogalom', cim: 'Mi a közigazgatási jog?', html: '<ul><li>A <b>közjog</b> része: az állam közhatalmát megvalósító közigazgatás és a <b>polgárok</b> közti viszonyok szabálya.</li><li><b>Alárendelt</b> viszony (hatóság ↔ ügyfél), célja a <b>közérdek</b>.</li><li>A legszerteágazóbb jogág, <b>nem kodifikálható</b> egyetlen törvénybe; sok szabálya rendeletben van.</li><li>3 része: <b>anyagi jog</b> (mit), <b>eljárásjog</b> (hogyan — pl. Ákr., 2016. évi CL. tv.), <b>szervezeti jog</b> (ki).</li></ul>' },
    { k: 'Szabályozás', cim: 'Ex lege vs. jogalkalmazáson alapuló', html: '<ul><li><b>Ex lege</b>: az állam bízik benned, hogy magadtól betartod — és ellenőriz (pl. <b>KRESZ</b>, <b>adóbevallás</b>).</li><li><b>Jogalkalmazáson alapuló</b>: csak <b>hatósági döntés</b> után teheted meg (pl. <b>építési engedély</b>).</li></ul>', hasonlat: 'Ex lege = önkiszolgáló bolt, néha ellenőriznek. Jogalkalmazás = pult, ahol előbb engedélyt kérsz.' },
    { k: 'Szintek', cim: 'Központi, területi, helyi', html: '<ul><li><b>Központi</b>: egész ország.</li><li><b>Területi</b>: <b>régiók, megyék (vármegyék), járások</b>.</li><li><b>Helyi</b>: községek, városok.</li></ul><p>Két alrendszer: <b>államigazgatás</b> és <b>önkormányzati igazgatás</b>.</p>' },
    { k: '4 elv', cim: 'Szervezési elvek', html: '<ul><li><b>Centralizáció</b>: egy központ + alárendelt szervek.</li><li><b>Decentralizáció</b>: <b>önálló</b> szervek (helyi önkormányzat, köztestület).</li><li><b>Dekoncentráció</b>: központi feladatot <b>önkormányzattal nem rendelkező</b>, a központ által irányított szervre bíznak (pl. megyei kormányhivatal).</li><li><b>Integráció</b>: szervek összevonása (pl. APEH + VPOP = <b>NAV</b>).</li></ul>', hasonlat: 'Dekoncentráció = a központ fiókot nyit vidéken, de ő mondja meg, mit csináljon. Decentralizáció = a helyiek maguk döntenek.' },
    { k: 'Központi szervek', cim: 'A Kormány és alatta', html: '<ul><li><b>Kormány</b>: a közigazgatás legfőbb szerve; irányítja a minisztereket, a kormányhivatalokon át <b>törvényességi felügyeletet</b> gyakorol az önkormányzatok felett.</li><li>Közvetlenül alatta: <b>minisztériumok</b>, <b>kormányzati főhivatalok</b> (pl. KSH).</li><li>Közvetve: <b>rendvédelmi szervek</b> (rendőrség, katasztrófavédelem — a BM-en át).</li><li>Miniszter alatt: <b>központi hivatalok</b> (pl. NÉBIH, fogyasztóvédelmi hatóság).</li><li>Kormánytól <b>független</b> (OGY-nek felel): <b>autonóm</b> szervek (GVH, NAIH, NVI…) és <b>önálló szabályozó szervek</b> (NMHH, MEKH, SZTFH, OAH — ezek rendeletet is alkothatnak).</li></ul>' },
    { k: 'Területi, helyi', cim: 'Kormányhivatal, járási hivatal, jegyző', html: '<ul><li><b>Fővárosi és vármegyei kormányhivatal</b>: a Kormány általános hatáskörű területi szerve; vezetője a <b>kormánymegbízott</b>.</li><li>Alatta: <b>járási</b> (fővárosi kerületi) hivatalok.</li><li>Helyi szinten nincs külön államigazgatási szerv: a feladatokat főként a <b>jegyző</b>, kivételesen a <b>polgármester</b> látja el.</li></ul>' },
    { k: 'Önkormányzat', cim: 'Helyi önkormányzat', html: '<ul><li>Az önkormányzás joga a <b>település választópolgárainak közösségét</b> illeti meg.</li><li>Lényege: <b>önálló döntés a helyi közügyekben</b> (helyben megoldható, a lakosságot érintő ügyek).</li><li>3 típus: <b>települési</b>, <b>területi</b> (vármegyei), <b>fővárosi</b>.</li><li>Kötelező feladatok pl.: <b>közvilágítás</b>, <b>köztemető</b>, <b>helyi közutak</b>, településüzemeltetés.</li><li>A <b>polgármestert közvetlenül</b> választják a választópolgárok (településmérettől függetlenül).</li><li>Rendeletet alkothat (eredeti és származékos jogkörben).</li></ul>' },
    { k: 'Köztestület', cim: 'Köztestületek', html: '<p>Törvény hozza létre, <b>személyi alapon</b> szerveződik, önkormányzattal bír: pl. <b>Magyar Ügyvédi Kamara</b>, <b>Kereskedelmi és Iparkamara</b>, <b>Magyar Olimpiai Bizottság</b>.</p>' },
    { k: 'Tevékenység', cim: 'Milyen hatalommal dolgozik?', html: '<ul><li><b>Közhatalom</b>: mindenkire kötelező döntés, állami kényszerrel → <b>jogalkotás</b> (rendelet) és <b>hatósági tevékenység</b> (engedély, felügyelet, nyilvántartás, erkölcsi bizonyítvány, személyi igazolvány).</li><li><b>Igazgatási hatalom</b>: <b>belső igazgatás</b> és alárendelt szervek <b>irányítása</b>.</li><li><b>Tulajdonosi hatalom</b>: közintézetek (iskola, kórház, múzeum) és állami cégek fenntartása.</li><li><b>Nem hatalmi</b>: döntés-előkészítés, adatgyűjtés, szerződések.</li></ul>' }
  ],
  szamok: [
    { v: '3', l: 'szint: központi, területi, helyi' },
    { v: '4', l: 'szervezési elv (centralizáció, decentralizáció, dekoncentráció, integráció)' },
    { v: '3', l: 'önkormányzattípus: települési, területi, fővárosi' },
    { v: '2016', l: 'az általános közigazgatási rendtartás (Ákr.) éve' }
  ],
  csapdak: [
    '<b>Dekoncentráció ≠ decentralizáció.</b> Dekoncentrált szervnek <b>nincs önkormányzata</b>, a központ irányítja.',
    'A polgármestert egy kis (pl. 900 fős) községben is <b>közvetlenül</b> választják.',
    'Az önkormányzatok felett a <b>kormányhivatal</b> gyakorol <b>törvényességi felügyeletet</b> — nem irányítja őket.',
    'Az autonóm és önálló szabályozó szervek <b>nem a Kormánynak</b>, hanem az <b>Országgyűlésnek</b> felelnek.',
    'A <b>jogalkotás</b> általános szabályt hoz (rendelet), a <b>hatósági</b> tevékenység egyedi ügyben dönt (engedély).'
  ],
  mini: ['k2047B420', 'j103', 'k7FDA84B8']
}]);
