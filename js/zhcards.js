/* ZH-kártyák: csak a két ismert ZH („A” és „B” csoport) kérdései, villámkártyán. */
(function () {
  'use strict';
  const TM = window.TM;
  const CARDS = [
    { term: '„A” 1. — A munkavédelem tagozódás szerinti szintjei', def: '<mark>Munkabiztonság</mark> · <mark>Munkaegészségügy</mark> (foglalkozás-egészségügy) · <mark>Munkahigiénia</mark>' },
    { term: '„A” 1. — A munkavédelem résztvevői', def: '<mark>Állam</mark> · <mark>Munkáltató</mark> · <mark>Munkavállaló</mark>' },
    { term: '„B” 1. — A munkavédelem gyakorlati területei', def: '• <mark>egészséges munkahelyek</mark> kialakítása (műszaki és higiéniai követelmények)<br>• <mark>munkaeszközök</mark><br>• <mark>veszélyes anyagok</mark><br>• <mark>munkaszervezés és munkaidő</mark><br>• <mark>kiemelt csoportok</mark> védelme<br>• <mark>munkavédelmi szervezet</mark><br><small>(Ha a szakterületeket kérik: munkabiztonság, munkaegészségügy [munkahigiéné + foglalkozás-eü.], szociális munkavédelem.)</small>' },
    { term: '„A”/„B” 2. — Melyik a helyes?<br><small>a) 13 tf% → tökéletes, CO₂ · b) 16 tf% → tökéletlen, CO · c) 20 tf% → tökéletes, CO</small>', def: '<mark>b)</mark> 16 tf% O₂ → tökéletlen égés, CO<br><br>a) rossz: 14% alatt megszűnik az égés<br>c) rossz: tökéletes égésnél CO₂ keletkezik' },
    { term: 'O₂-határok (a 2. kérdéshez)', def: '<mark>18% felett</mark> tökéletes → CO₂<br><mark>14–18%</mark> tökéletlen → CO<br><mark>14% alatt</mark> megszűnik<br>(levegő: 21% O₂)' },
    { term: '„A”/„B” 3. — Az égés fogalma', def: 'Égésnek azt a <mark>kémiai folyamatot</mark> nevezzük, melynek során az éghető anyag <mark>megfelelő hőmérsékleten</mark> a levegő <mark>oxigénjével egyesül</mark>, <mark>hő</mark> és legtöbb esetben <mark>fény</mark> formájában energiát szolgáltat.' },
    { term: '„A”/„B” 3. — Az égés feltételei', def: '<mark>Éghető anyag</mark> + <mark>oxigén</mark> + <mark>gyújtóforrás</mark> (megfelelő hőmérséklet)<br>— <mark>azonos térben és időben</mark>' },
    { term: '„A” 4. — Egészítse ki!<br><small>A munkavédelem a … munkavégzésre vonatkozó biztonsági és … követelmények, továbbá … törvénykezési, szervezési, … előírások rendszere, valamint mindezek végrehajtása.</small>', def: '1. <mark>szervezett</mark><br>2. <mark>egészségügyi</mark><br>3. <mark>intézményi</mark>' },
    { term: '„B” 4. — Egészítse ki! (A munkavédelem feladatai, célja)<br><small>Az egészséget nem veszélyeztető … munkavégzés biztosítása a … megelőzése érdekében, valamint a természet és az épített környezet megóvása.</small>', def: '1. <mark>biztonságos</mark><br>2. <mark>foglalkozási megbetegedések, balesetek, mérgezések</mark>' },
    { term: '„A”/„B” 5. — A hőátadás formái', def: '<mark>Hővezetés</mark> (kondukció)<br><mark>Hőáramlás</mark> (konvekció)<br><mark>Hősugárzás</mark> (radiáció)' },
    { term: '5. — Hővezetés (kondukció)', def: 'Melegebbről a hidegebb felé, <mark>részecskéről részecskére</mark>, <mark>anyagáramlás nélkül</mark>. Anyaghoz kötött — <mark>légüres térben nem</mark> jön létre.' },
    { term: '5. — Hőáramlás (konvekció)', def: '<mark>Folyadékokra és gázokra</mark> jellemző, a hőt <mark>a közeg részecskéi viszik</mark>, <mark>anyagáramlással</mark> jár, a teljes hőkiegyenlítődésig tart.' },
    { term: '5. — Hősugárzás (radiáció)', def: '<mark>Elektromágneses sugárzás</mark>, közvetítő <mark>anyag nem szükséges</mark>, a köztes tér <mark>nem melegszik fel</mark> észrevehetően.' }
  ];
  TM.zhCards = function (app) {
    const v = TM.h(`<div class="zh"><div class="zh-top"><div class="zh-score"><b>ZH-kártyák</b><small>csak a két ismert ZH („A” és „B”) — koppints a kártyára a fordításhoz</small></div></div><div data-host></div></div>`);
    app.replaceChildren(v);
    TM.flashcards(v.querySelector('[data-host]'), CARDS);
    return () => {};
  };
})();
