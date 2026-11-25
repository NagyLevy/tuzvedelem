/* 5. lecke — Munkajog (forrás: Munkajogi alapismeretek pptx + kurzus 18. lecke; Mt. = 2012. évi I. törvény) */
window.JOG_LECKEK = (window.JOG_LECKEK || []).concat([{
  id: 'munka',
  perc: 7,
  egyMondat: 'A munkajog szerint a munkaviszony egy <b>írásbeli munkaszerződéssel</b> jön létre a munkáltató és a munkavállaló között, és a törvény (Mt.) <b>a gyengébb felet, a munkavállalót védi</b>: próbaidő, felmondási idő, végkielégítés, szabadság.',
  kartyak: [
    { k: 'Jellege', cim: 'Vegyes jogág', html: '<ul><li><b>Magánjogi</b> jelleg: a munkaviszony létrejötte, módosítása, megszüntetése a <b>felek akaratán</b> múlik.</li><li><b>Közjogi</b> jelleg: a kiszolgáltatottabb <b>munkavállaló védelme</b>.</li><li>Forrása: a <b>Munka Törvénykönyve (2012. évi I. tv., Mt.)</b> + a Ptk.; a közszférában külön törvények.</li><li><b>Kollektív szerződés</b>: a <b>munkáltató és a szakszervezet</b> között.</li></ul>' },
    { k: 'Alanyok', cim: 'Munkáltató és munkavállaló', html: '<ul><li><b>Munkáltató</b>: bármely jogképes személy — <b>természetes vagy jogi személy</b>.</li><li><b>Munkavállaló</b>: <b>csak természetes személy</b> (lehet külföldi is).</li><li>Életkor: főszabály <b>16 év</b>. <b>15 éves tanuló</b> iskolai szünetben. 16 alatt: kulturális, művészeti, sport, reklám munka gyámhatósági engedéllyel.</li><li><b>Fiatal munkavállaló</b>: 18 év alatti. Cselekvőképesség <b>nem feltétel</b>.</li></ul>', hasonlat: 'Egy cég lehet főnök, de dolgozó csak ember lehet.' },
    { k: 'Keletkezés', cim: 'Munkaszerződés', html: '<ul><li>Kötelező <b>írásba foglalni</b> (a munkáltató gondoskodik róla). Ha mégsem, az érvénytelenségre csak a <b>munkavállaló</b> hivatkozhat, <b>30 napon</b> belül.</li><li><b>Keletkezés</b> = aláírás napja. <b>Kezdet</b> = munkába lépés napja. A kettő között lényeges változás esetén bármelyik fél <b>elállhat</b>.</li><li>A munkáltató <b>7 napon belül</b> írásban tájékoztat a munkafeltételekről.</li></ul>' },
    { k: 'Tartalom', cim: 'Mi KELL bele a szerződésbe?', html: '<ul><li><b>Kötelező</b>: felek adatai, <b>munkakör</b>, <b>alapbér</b>, <b>munkavégzés helye</b>.</li><li><b>Természetes</b> (magától benne van, ha nem írnak mást): <b>határozatlan idő</b>, <b>teljes munkaidő (napi 8 óra)</b>, felmondási idő, szabadság.</li><li><b>Lehetséges</b> (ha akarják): pl. <b>próbaidő</b>.</li></ul>', hasonlat: 'Mint egy pizza: a tészta és a sajt kötelező, a paradicsom alapból rajta van, a gomba extra.' },
    { k: 'Próbaidő', cim: 'Próbaidő: max. 3 hónap', html: '<ul><li>Legfeljebb <b>3 hónap</b> (kollektív szerződés szerint max. <b>6 hónap</b>).</li><li>Ha rövidebbre kötötték, <b>egyszer meghosszabbítható</b> a maximumig.</li><li>Alatta <b>bármelyik fél, bármikor, indokolás nélkül, azonnali hatállyal</b> megszüntetheti.</li></ul>' },
    { k: 'Kötelezettségek', cim: 'Ki mit köteles?', html: '<ul><li><b>Munkáltató</b>: foglalkoztat, <b>bért fizet</b>, biztosítja a feltételeket, megtéríti az indokolt költségeket, egészséges és biztonságos munkahely.</li><li><b>Munkavállaló</b>: rendelkezésre áll munkára képes állapotban, elvárható gondossággal dolgozik, <b>követi az utasításokat</b> (megtagadhatja, ha jogszabályba ütközik vagy életét veszélyezteti), együttműködik.</li><li><b>Kiküldetés</b> = munkavégzés <b>más helyen</b> (a munkáltató érdekében).</li></ul>' },
    { k: 'Vége', cim: 'Megszűnés vs. megszüntetés', html: '<p><b>Megszűnik</b> (magától): munkavállaló <b>halála</b>, munkáltató <b>jogutód nélküli megszűnése</b>, <b>határozott idő lejárta</b>, munkáltató jogállásváltozása.</p><p><b>Megszüntetik</b> (nyilatkozat kell, <b>írásban</b>): <b>közös megegyezés</b>, <b>felmondás</b>, <b>azonnali hatályú felmondás</b>.</p><p>A munkáltató <b>csődje</b> vagy felszámolás indulása önmagában <b>nem</b> szünteti meg.</p>' },
    { k: 'Felmondás', cim: 'Rendes felmondás', html: '<ul><li>Egyoldalú nyilatkozat, <b>felmondási idővel</b>.</li><li>A <b>munkáltató mindig indokol</b> (a munkavállaló magatartásával, képességével vagy a munkáltató működésével). A munkavállaló csak határozott idejűnél.</li><li>Indok: <b>világos, valós, okszerű</b>.</li><li>Felmondási tilalom pl. szülési szabadság alatt.</li></ul>' },
    { k: 'Felmondási idő', cim: '30 nap, ami nőhet', html: '<ul><li>Főszabály <b>30 nap</b>. Munkáltatói felmondásnál a <b>munkáltatónál töltött idővel nő</b> (max. +60 nap). Megállapodással legfeljebb <b>6 hónap</b>.</li><li>Munkáltatói felmondásnál legalább a felmondási idő <b>felére fel kell menteni</b> a munka alól (fizetéssel).</li></ul>' },
    { k: 'Végkielégítés', cim: 'Mikor jár végkielégítés?', html: '<ul><li>Feltétel: legalább <b>3 év</b> munkaviszony az adott munkáltatónál, <b>és</b>: munkáltatói felmondás / munkáltató jogutód nélküli megszűnése / jogállásváltozás / munkavállaló indokolt azonnali felmondása.</li><li>Mértéke: <b>3 év → 1 havi</b> távolléti díj, lépcsőzetesen nő, <b>25 év → 6 havi</b>.</li><li><b>Nem jár</b>: határozott idő lejártakor, saját rendes felmondásnál.</li></ul>' },
    { k: 'Azonnali', cim: 'Azonnali hatályú felmondás 3 esete', html: '<ul><li><b>Indokolt</b> (bármelyik fél): a másik szándékosan/súlyos gondatlansággal lényeges kötelezettséget szeg (pl. ittasan dolgozik), vagy lehetetlenné teszi a munkaviszonyt. Határidő: tudomástól <b>15 nap</b>, legfeljebb az októl <b>1 év</b>.</li><li><b>Próbaidő alatt</b>: bárki, indok nélkül.</li><li><b>Határozott idejűnél</b>: csak a munkáltató, indok nélkül, <b>12 havi</b> távolléti díj kártalanítással (vagy a hátralévő időre járóval).</li></ul>' },
    { k: 'Szabadság, idő', cim: 'Munkaidő és szabadság', html: '<ul><li>Teljes napi munkaidő: <b>8 óra</b>.</li><li>Alapszabadság: évi <b>20 munkanap</b> + pótszabadság (életkor, gyerek után).</li></ul>' },
    { k: 'Kár', cim: 'Kártérítés a munkaviszonyban', html: '<ul><li><b>Munkáltató</b>: <b>objektív</b> felelősség — vétkességtől függetlenül felel a munkavállaló kárért (mentesül, ha ellenőrzési körén kívüli, előre nem látható ok okozta).</li><li><b>Munkavállaló</b>: <b>gondatlanságnál</b> legfeljebb <b>4 havi</b> távolléti díjig felel (KSZ szerint max. 8); szándékosnál a teljes kárért.</li></ul>' },
    { k: 'Vita', cim: 'Munkaügyi jogvita vs. érdekvita', html: '<ul><li><b>Jogvita</b>: meglévő jogról, igényről (pl. ki nem fizetett bér). Bíróság: első fokon <b>törvényszék</b>.</li><li><b>Érdekvita</b>: jövőbeli feltételekről (pl. béremelés). Kollektív eszköze a <b>sztrájk</b>.</li><li>Jogvita alanya lehet: munkavállaló, munkáltató, <b>üzemi tanács</b>, <b>szakszervezet</b>.</li></ul>' }
  ],
  szamok: [
    { v: '16', l: 'év — a munkavállalás főszabály szerinti alsó korhatára' },
    { v: '15', l: 'éves tanuló dolgozhat iskolai szünetben' },
    { v: '3 hónap', l: 'a próbaidő maximuma (KSZ szerint 6 hónap)' },
    { v: '30 nap', l: 'a felmondási idő főszabálya' },
    { v: '6 hónap', l: 'a felmondási idő felső határa megállapodással' },
    { v: '3 év', l: 'munkaviszony kell legalább a végkielégítéshez' },
    { v: '6 havi', l: 'a végkielégítés maximuma (25 év után)' },
    { v: '20', l: 'munkanap az éves alapszabadság' },
    { v: '8 óra', l: 'a teljes napi munkaidő' },
    { v: '15 nap', l: 'alatt kell élni az azonnali felmondással a tudomásszerzéstől' },
    { v: '4 havi', l: 'távolléti díj — a munkavállaló felelősségének határa gondatlanságnál' },
    { v: '7 nap', l: 'alatt kell írásban tájékoztatni a munkafeltételekről' }
  ],
  csapdak: [
    '<b>Jogi személy csak munkáltató</b> lehet. Munkavállaló csak természetes személy.',
    'A <b>próbaidő</b> nem kötelező elem — „lehetséges” tartalom. A munkaidő-beosztás sem kötelező.',
    'A határozott idő <b>lejártakor nem jár végkielégítés</b>.',
    'A munkáltató <b>csődje / felszámolása</b> önmagában <b>nem</b> szünteti meg a munkaviszonyt — csak a jogutód nélküli <b>megszűnése</b>.',
    'A régi név „rendkívüli felmondás” — ma <b>azonnali hatályú felmondás</b>.',
    'A munkáltató felelőssége <b>objektív</b> (nem kell vétkesség), a munkavállalóé <b>vétkességi</b> és korlátozott.'
  ],
  mini: ['j19', 'j26', 'j97']
}]);
