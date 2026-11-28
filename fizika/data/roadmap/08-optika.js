/* Roadmap — Optika (csak elmélet). Forrás: PróbaZH, MINTA vizsga, tanári megoldások. */
window.FIZ_ROADMAP = (window.FIZ_ROADMAP || []).concat([{
  id: 'optika',
  nev: 'Optika',
  leckek: ['10'],
  perc: 25,
  lenyeg: 'Optikából a ZH-ban csak elméleti kérdés lesz. Négy rövid választ kell szó szerint tudnod, és két szerkesztést kell tudnod lerajzolni a nevezetes sugármenetekkel: mindkettőnél <b>látszólagos kép</b> keletkezik.',

  elmelet: [
    {
      k: 'Van-e eltérés a vörös és a kék színű fény terjedési sebessége között üvegben? Ha igen, milyen mértékű az eltérés?',
      v: 'Igen, van. Mindössze azonban csak 3–4%.',
      forras: 'PróbaZH 1. · 1 pont',
      trukk: 'Két kérdés van egyben, mindkettőre válaszolj: <b>igen</b>, és a szám: <b>3–4%</b>.'
    },
    {
      k: 'Miért nehéz közönséges fényforrással interferenciát létrehozni? Miért könnyű egy He-Ne lézerrel?',
      v: 'A közönséges fényforrásokból származó fénynek kicsi a koherenciahossza, mindössze 0,1 mm nagyságrendű. Ha a két fénysugár által a forrástól az interferencia helyéig megtett utak különbsége ennél nagyobb, már nem kapunk tartós interferenciaképet. A He-Ne lézer fényének koherenciahossza nagy, ezért vele könnyű.',
      forras: 'PróbaZH 2. · 1 pont',
      trukk: 'A kulcsszó a <b>koherenciahossz</b>: közönséges fényforrásnál kicsi (kb. 0,1 mm), lézernél nagy. A tanár gépelt mintaválasza csak a közönséges fényforrásról szól; a lézeres mondat a kérdés második felére felel.'
    },
    {
      k: 'Miért rontja a fényelhajlás az optikai eszközök felbontóképességét?',
      v: 'Az egyes tárgypontokból induló fénysugarak képe nem egy pont lesz, hanem egy nagyobb kiterjedésű fényfolt, ami a kép elmosódottságát eredményezi.',
      forras: 'PróbaZH 3. · 1 pont',
      trukk: 'Lánc: tárgy<b>pont</b> → nem pont, hanem <b>fényfolt</b> → <b>elmosódott</b> kép.'
    },
    {
      k: 'A nevezetes sugármenetek felhasználásával szerkessze meg egy gyűjtőlencse által létrehozott képet egy fókuszponton belül elhelyezett tárgyról!',
      v: 'Rajzot kell készíteni. <ol><li>Húzd meg az optikai tengelyt, rajzold rá a gyűjtőlencsét, és jelöld be mindkét oldalán a fókuszpontot ($F$), a lencsétől egyforma távolságra.</li><li>A tárgyat (a tengelyre merőleges nyíl) a lencse és az egyik fókuszpont <b>közé</b> rajzold.</li><li>Első sugár: a tárgy csúcsából a tengellyel párhuzamosan a lencséig. A lencse után a túloldali fókuszponton megy át.</li><li>Második sugár: a tárgy csúcsából a lencse közepén át, egyenesen, törés nélkül.</li><li>A két sugár a lencse után széttart, nem találkozik. Hosszabbítsd meg őket szaggatott vonallal visszafelé, a tárgy oldalára. Ahol a meghosszabbítások metszik egymást, ott van a kép csúcsa.</li><li>Innen húzz merőlegest a tengelyre: ez a kép. Szaggatott vonallal rajzold.</li></ol>A kép <b>látszólagos</b>, egyenes állású, nagyított, és a tárggyal azonos oldalon van.',
      forras: 'PróbaZH 4. · 1 pont',
      trukk: 'Ugyanaz a logika, mint a MINTA vizsga tükrös ábráján: a sugarak széttartanak, ezért a <b>meghosszabbításuk</b> adja a képet. Figyelem: a tanári megoldólapon ennél a kérdésnél az ábra helye üres, ezért a lépések a nevezetes sugármenetek alapján készült saját leírás.'
    },
    {
      k: 'Mire következtethetünk abból, ha egy lencse fókusztávolsága negatív?',
      v: 'A lencse egy szórólencse, ami mindig látszólagos képet ad.',
      forras: 'PróbaZH 5. · 1 pont',
      trukk: 'Két állítás kell: negatív $f$ → <b>szórólencse</b>, és: <b>mindig látszólagos</b> a kép.'
    },
    {
      k: 'A nevezetes sugármenetek felhasználásával szerkesszen meg egy olyan képalkotást, amikor egy homorú tükör látszólagos képet állít elő!',
      v: 'Rajzot kell készíteni. A tanár ábrája szerint: <ol><li>Húzd meg az optikai tengelyt, és rajzold rá a homorú tükröt. A tükör és a tengely metszéspontja $O$. A tükör előtt a tengelyen jelöld be a fókuszpontot ($F$).</li><li>A tárgyat ($T$, az $AB$ nyíl: $B$ a tengelyen, $A$ a csúcsa) a fókuszpont és a tükör <b>közé</b> rajzold.</li><li>Első sugár: $A$-ból a tengellyel párhuzamosan a tükörig. Visszaverődés után a fókuszponton ($F$) megy át.</li><li>Második sugár: $A$-ból az $O$ pontba. Itt a tengelyre szimmetrikusan verődik vissza: a beesési és a visszaverődési szög egyenlő (az ábrán ezt az $O$ pontnál szögjelölés mutatja).</li><li>A két visszavert sugár a tükör előtt széttart, nem találkozik. Hosszabbítsd meg őket szaggatott vonallal a tükör <b>mögé</b>. A meghosszabbítások az $A^{\\prime}$ pontban metszik egymást.</li><li>$A^{\\prime}$-ből húzz merőlegest a tengelyre, a talppont $B^{\\prime}$. Az $A^{\\prime}B^{\\prime}$ szaggatott nyíl a kép ($K$).</li></ol>A kép <b>látszólagos</b>, a tükör mögött van, egyenes állású és nagyobb a tárgynál.',
      forras: 'MINTA vizsga 10. · 1 pont',
      trukk: 'A lényeg egyetlen dolog: a tárgy a fókuszpont és a tükör <b>között</b> legyen, ahogy a tanár ábráján. A kép a tükör <b>mögé</b> kerül, szaggatott vonallal.'
    }
  ],

  receptek: [
    {
      cim: 'Látszólagos kép szerkesztése homorú tükörrel',
      mikor: 'A kérdés homorú tükröt és látszólagos képet említ, és szerkesztést (rajzot) kér.',
      lepesek: [
        'Tengely, tükör ($O$), előtte a fókuszpont ($F$). A tárgy ($AB$) az $F$ és az $O$ <b>között</b> álljon.',
        'Első sugár: $A$-ból a tengellyel párhuzamosan a tükörig, onnan az $F$ ponton át verődik vissza.',
        'Második sugár: $A$-ból az $O$ pontba, onnan a tengelyre szimmetrikusan verődik vissza.',
        'A két visszavert sugarat hosszabbítsd meg szaggatottan a tükör mögé. A metszéspont $A^{\\prime}$, a kép $A^{\\prime}B^{\\prime}$.',
        'Írd oda: a kép látszólagos, egyenes állású, nagyított.'
      ],
      tex: 't \\lt f \\;\\Rightarrow\\; k \\lt 0'
    },
    {
      cim: 'Gyűjtőlencse, tárgy a fókuszon belül',
      mikor: 'A kérdés gyűjtőlencsét és fókuszponton belüli tárgyat említ, és szerkesztést (rajzot) kér.',
      lepesek: [
        'Tengely, lencse, mindkét oldalon fókuszpont ($F$). A tárgy a lencse és az egyik $F$ <b>között</b> álljon.',
        'Első sugár: a tárgy csúcsából a tengellyel párhuzamosan a lencséig, utána a túloldali $F$ ponton megy át.',
        'Második sugár: a tárgy csúcsából a lencse közepén át, egyenesen.',
        'A két sugarat hosszabbítsd meg szaggatottan visszafelé, a tárgy oldalára. A metszéspont a kép csúcsa.',
        'Írd oda: a kép látszólagos, egyenes állású, nagyított, a tárggyal azonos oldalon van.'
      ],
      tex: 't \\lt f \\;\\Rightarrow\\; k \\lt 0'
    }
  ],

  tippek: [
    'Szerkesztéshez elég <b>két</b> nevezetes sugár, mindkettő a tárgy csúcsából indul. A tanár ábráján is kettő van.',
    'Látszólagos képnél a valódi sugarak nem találkoznak. A meghosszabbításukat és magát a képet is <b>szaggatott</b> vonallal rajzold, ahogy a tanár ábráján látod.',
    'Tegyél nyilat a sugarakra, és betűzd meg az ábrát: $F$, $O$, tárgy ($T$, $AB$), kép ($K$, $A^{\\prime}B^{\\prime}$).',
    'Mindkét szerkesztés kulcsa ugyanaz: a tárgy a fókuszponton <b>belül</b> van. Ezt a rajzon jól láthatóan jelöld.',
    'A rövid válaszoknál a kulcsszó és a szám hozza a pontot: 3–4%, koherenciahossz (0,1 mm), fényfolt, szórólencse.'
  ],

  feladatok: [],
  gyakorlo: []
}]);
