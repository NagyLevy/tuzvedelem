/* 6. lecke — Polgári jog I.: személyek, gazdasági társaságok, öröklés (forrás: Polgári jog I. pdf + kurzus 12. és 15. lecke; Ptk. = 2013. évi V. törvény) */
window.JOG_LECKEK = (window.JOG_LECKEK || []).concat([{
  id: 'polgari1',
  perc: 8,
  egyMondat: '<b>Jogképes mindenki</b> (jogai lehetnek), de <b>cselekvőképes</b> — azaz saját maga köthet szerződést — csak az, akinek elég a belátása: ez <b>életkortól</b> és a bíróság döntésétől függ.',
  kartyak: [
    { k: 'Polgári jog', cim: 'A mindennapok joga', html: '<ul><li>A személyek <b>vagyoni és egyes személyi</b> viszonyait szabályozza.</li><li><b>Mellérendelt</b>, egyenrangú felek, <b>diszpozitív</b> szabályok.</li><li>Fő forrása: <b>Ptk. — 2013. évi V. törvény</b>, 8 könyv (pl. 2. az ember, 3. jogi személy, 4. család, 5. dologi jog, 6. kötelmi jog, 7. öröklés).</li></ul>' },
    { k: 'Jogképesség', cim: 'Jogképes = jogai lehetnek', html: '<ul><li><b>Minden ember</b> jogképes — általános, egyenlő, feltétlen. A <b>jogi személyek</b> is jogképesek.</li><li>Kezdete: a <b>fogamzás</b> (ha élve születik) — vélelem: a születéstől visszaszámolt <b>300. nap</b>.</li><li>Vége: a <b>halál</b> (agyhalál, nem a szívleállás).</li><li><b>Holtnak nyilvánítás</b>: ha valaki eltűnt és <b>5 évig</b> semmi hír róla.</li></ul>', hasonlat: 'A jogképesség a bankszámla: mindenkinek van. A cselekvőképesség a bankkártya: azt nem mindenki használhatja egyedül.' },
    { k: 'Cselekvőképesség', cim: 'Saját nevedben szerződhetsz', html: '<p>Cselekvőképesség = <b>ügyleti képesség + vétőképesség</b>. Belátási képesség kell hozzá. A Ptk. szerint <b>mindenki cselekvőképes</b>, akit a törvény vagy a bíróság nem korlátoz.</p><p>Aki jogképes, attól <b>még nem biztos</b>, hogy maga köthet szerződést.</p>' },
    { k: '0–14 év', cim: 'Cselekvőképtelen kiskorú', html: '<ul><li>A <b>14 év alatti</b> cselekvőképtelen.</li><li>Jognyilatkozata <b>semmis</b> → helyette a <b>törvényes képviselő</b> (szülő) jár el.</li><li>Kivétel: <b>csekély jelentőségű, mindennapi</b> szerződések (pl. büfében vásárlás).</li></ul>' },
    { k: '14–18 év', cim: 'Korlátozottan cselekvőképes kiskorú', html: '<ul><li>Saját nevében nyilatkozhat, de érvényességéhez a <b>törvényes képviselő hozzájárulása</b> kell (addig <b>függő</b>).</li><li><b>Önállóan</b>: személyes jellegű nyilatkozat, <b>saját munkával szerzett jövedelem</b> felhasználása, <b>csak előnyt jelentő</b> szerződés, szokásos mértékű ajándék, mindennapi apró ügyletek.</li><li>Ha <b>16 évesen gyámhatósági engedéllyel házasságot köt</b> → <b>nagykorú</b> lesz.</li></ul>', hasonlat: 'Egy 17 éves megveheti a nyári melóból a telefont, de a lakásbérléshez kell a szülő aláírása.' },
    { k: '18+', cim: 'Nagykorú — és a gondnokság', html: '<ul><li><b>18 évesen</b> főszabály szerint teljesen cselekvőképes.</li><li><b>Részlegesen korlátozó gondnokság</b>: a belátás <b>nagymértékben csökkent</b> → bizonyos ügyekben kell a gondnok.</li><li><b>Teljesen korlátozó gondnokság</b>: a belátás <b>tartósan, teljes körűen hiányzik</b> → csak a gondnok nyilatkozhat (apró mindennapi ügyletek kivételével).</li><li>Mindkettőről a <b>bíróság</b> dönt.</li></ul>' },
    { k: 'Személyiségi jog', cim: 'Ha megsértik a jó híred', html: '<p>Kérheted: a jogsértés <b>megállapítását</b>, <b>abbahagyását</b>, <b>elégtételt</b> (pl. bocsánatkérés), a jogsértő állapot megszüntetését, és <b>sérelemdíjat</b> vagy kártérítést.</p>' },
    { k: 'Cégek', cim: 'Gazdasági társaságok: 4 forma', html: '<ul><li><b>Kkt.</b> — minden tag <b>korlátlanul és egyetemlegesen</b> felel. Min. <b>2</b> tag.</li><li><b>Bt.</b> — <b>beltag</b> korlátlanul felel, <b>kültag</b> nem (csak a befizetését kockáztatja). Min. <b>2</b> tag.</li><li><b>Kft.</b> — törzstőke (min. <b>3 millió Ft</b>), a tag <b>nem felel</b> a cég tartozásaiért. Alapíthatja <b>1</b> személy is.</li><li><b>Rt.</b> — részvényekből álló alaptőke: <b>Zrt.</b> (nincs a tőzsdén, min. 5 M Ft) és <b>Nyrt.</b> (tőzsdén, min. 20 M Ft). Alapíthatja <b>1</b> személy is.</li></ul><p><b>Formakényszer</b>: csak ezek közül lehet választani.</p>', hasonlat: 'Kkt.: ha a cég bukik, a házad is ráfizet. Kft.: csak amit beletettél.' },
    { k: 'Típusok', cim: 'Személyegyesítő vs. tőkeegyesítő', html: '<ul><li><b>Személyegyesítő</b>: Kkt., Bt. — az emberek számítanak, nincs minimumtőke.</li><li><b>Tőkeegyesítő</b>: Kft., Zrt., Nyrt. — a pénz számít, kötelező minimumtőke.</li><li>Vagyoni hozzájárulás: <b>pénzbeli</b> vagy <b>apport</b> (nem pénzbeli: autó, ingatlan, szellemi alkotás).</li></ul>' },
    { k: 'Alapítás', cim: 'Hogyan születik egy cég?', html: '<ul><li><b>Létesítő okirat</b> (társasági szerződés / alapító okirat / Rt.-nél alapszabály) — <b>írásban</b>, mindenki aláírja, <b>közjegyző</b> vagy <b>ügyvéd ellenjegyzi</b>.</li><li><b>30 napon</b> belül be kell jelenteni a cégbíróságnak; addig <b>előtársaság</b>.</li><li>A cég a <b>cégbírósági bejegyzés napján</b> jön létre (konstitutív).</li><li>Tartalom: cégnév, székhely, főtevékenység (<b>TEÁOR</b>), tagok, vagyoni hozzájárulás, vezető tisztségviselő, képviselet.</li></ul>' },
    { k: 'Szervek', cim: 'Ki mit csinál a cégben?', html: '<ul><li><b>Legfőbb szerv</b>: taggyűlés / közgyűlés — dönt.</li><li><b>Vezető tisztségviselő</b> (ügyvezető, igazgatóság): napi ügyek, <b>képviseli</b> a céget.</li><li><b>Felügyelőbizottság</b>: <b>belső</b> ellenőrzés — a vezetőket ellenőrzi.</li><li><b>Könyvvizsgáló</b>: <b>külső</b>, független — valós-e a beszámoló.</li></ul>' },
    { k: 'Megszűnés', cim: 'Végelszámolás, felszámolás, csőd', html: '<ul><li><b>Jogutóddal</b>: átalakulás, egyesülés (összeolvadás, beolvadás), szétválás (különválás, kiválás).</li><li><b>Végelszámolás</b>: a cég <b>fizetőképes</b>, a tagok szépen bezárják.</li><li><b>Felszámolás</b>: <b>fizetésképtelen</b> → a hitelezők kielégítése.</li><li><b>Csődeljárás</b> ≠ felszámolás: fizetési haladék, egyezségkötés — önmagában <b>nem szünteti meg</b> a céget.</li></ul>' },
    { k: 'Öröklés', cim: 'Öröklés: végrendelet vagy törvény', html: '<ul><li>A halál pillanatában <b>magától</b> (ipso iure) beáll. Örökhagyó csak <b>természetes személy</b>. Hagyatéki eljárás: <b>közjegyző</b>.</li><li>Ha van <b>végrendelet</b>, az az első. <b>Közvégrendelet</b>: közjegyző előtt. <b>Magánvégrendelet</b>: saját kézzel írva és aláírva, vagy <b>2 tanú</b> előtt aláírva. Szóban csak életveszélyben.</li><li>Bármikor visszavonható; az új felülírja a régit.</li></ul>' },
    { k: 'Törvényes öröklés', cim: 'Ki örököl, ha nincs végrendelet?', html: '<ol style="padding-left:20px;margin:6px 0"><li><b>Gyermekek</b> egyenlő részben (elhunyt gyerek helyén az unokák) + <b>házastárs</b>: haszonélvezet a közös lakáson + egy gyermekrész.</li><li>Nincs leszármazó: házastárs a lakást + a többi felét, a <b>szülők</b> a másik felét.</li><li>Aztán nagyszülők, dédszülők…</li><li>Végül az <b>állam</b> — ő nem utasíthatja vissza.</li></ol><p><b>Kitagadás</b>: indokolni kell, és kötelesrész sem jár. <b>Kizárás</b>: nem kell indokolni.</p>' }
  ],
  szamok: [
    { v: '14', l: 'év alatt cselekvőképtelen a kiskorú' },
    { v: '18', l: 'év — a nagykorúság' },
    { v: '16', l: 'éves kortól köthet házasságot gyámhatósági engedéllyel (→ nagykorú)' },
    { v: '300', l: 'nap — a fogamzás vélelmezett ideje a születés előtt' },
    { v: '5 év', l: 'eltűnés után lehet valakit holtnak nyilvánítani' },
    { v: '3 M Ft', l: 'a Kft. minimális törzstőkéje' },
    { v: '5 M Ft', l: 'a Zrt. minimális alaptőkéje' },
    { v: '20 M Ft', l: 'az Nyrt. minimális alaptőkéje' },
    { v: '30 nap', l: 'alatt kell bejelenteni az új céget a cégbíróságnak' },
    { v: '2', l: 'tanú kell a nem saját kézzel írt magánvégrendelethez' },
    { v: '1', l: 'személy is alapíthat Kft.-t vagy Zrt.-t' },
    { v: '8', l: 'könyvből áll a Ptk.' }
  ],
  csapdak: [
    '<b>Jogképes ≠ cselekvőképes.</b> A csecsemő jogképes (örökölhet), de nem cselekvőképes (nem köthet szerződést).',
    'A <b>17 éves</b> korlátozottan cselekvőképes, nem cselekvőképtelen.',
    'A cselekvőképtelen nyilatkozata <b>semmis</b> (nem csak megtámadható).',
    'Bt.: a <b>beltag</b> felel korlátlanul, a <b>kültag</b> nem. Könnyű megfordítani!',
    'A Bt.-nek és a Kkt.-nak <b>nincs</b> kötelező minimumtőkéje.',
    'A <b>csődeljárás</b> nem szünteti meg a céget — a <b>felszámolás</b> igen.',
    'A cég a <b>bejegyzés napján</b> jön létre, nem az okirat aláírásakor.'
  ],
  mini: ['j174', 'j74', 'j141']
}]);
