/* Témakörök — az előadások sorrendjében. A kérdések `t` mezője ezekre az id-kre mutat.
   c = a téma színe (gyűrű, kártyák), g = a téma ikonja (egy emoji, a kártyákon). */
window.JOG_TEMAK = [
  { id: 'alap',       no: 1,  title: 'Jogtani alapfogalmak',          short: 'Alapfogalmak',  c: '#0a84ff', g: '⚖️', lead: 'Mi a jog, hogyan épül fel egy szabály, mi a jogviszony.' },
  { id: 'alkotmany',  no: 2,  title: 'Alkotmány, jogforrások, választás', short: 'Alkotmány',  c: '#5e5ce6', g: '📜', lead: 'Az Alaptörvény, a jogszabályok ranglétrája és a választások.' },
  { id: 'allamszerv', no: 3,  title: 'Országgyűlés, köztársasági elnök, Kormány', short: 'Államszervezet', c: '#bf5af2', g: '🏛️', lead: 'Ki hoz törvényt, ki az államfő, ki kormányoz — és hány évre.' },
  { id: 'birosag',    no: 4,  title: 'Bíróságok, ügyészség, AB, alapjogok', short: 'Bíróságok',  c: '#ff375f', g: '👩‍⚖️', lead: 'Az igazságszolgáltatás, az Alkotmánybíróság és az ombudsman.' },
  { id: 'munka',      no: 5,  title: 'Munkajog',                        short: 'Munkajog',      c: '#ff9f0a', g: '💼', lead: 'Munkaszerződés, próbaidő, felmondás, végkielégítés, szabadság.' },
  { id: 'polgari1',   no: 6,  title: 'Polgári jog I. — személyek, cégek, öröklés', short: 'Polgári I.', c: '#30d158', g: '👤', lead: 'Jogképesség, cselekvőképesség, gazdasági társaságok, öröklés.' },
  { id: 'polgari2',   no: 7,  title: 'Polgári jog II. — tulajdon, szerződés, kár', short: 'Polgári II.', c: '#34c759', g: '🤝', lead: 'Tulajdon, szerződések, szerződésszegés, kártérítés.' },
  { id: 'bunteto',    no: 8,  title: 'Büntetőjog',                      short: 'Büntetőjog',    c: '#ff453a', g: '🚔', lead: 'Bűncselekmény, büntetés, felelősség — és ami kizárja.' },
  { id: 'nemzetkozi', no: 9,  title: 'Nemzetközi jog és EU-jog',        short: 'Nemzetközi',    c: '#64d2ff', g: '🌍', lead: 'ENSZ, nemzetközi szerződések, az EU intézményei és jogforrásai.' },
  { id: 'kozig',      no: 10, title: 'Közigazgatás',                    short: 'Közigazgatás',  c: '#ffd60a', g: '🏢', lead: 'Központi és helyi szervek, önkormányzatok, hatósági eljárás.' },
  { id: 'fogyaszto',  no: 11, title: 'Fogyasztóvédelem (bónusz)',       short: 'Fogyasztóvéd.', c: '#ac8e68', g: '🛒', lead: 'Csak a kurzusanyagban van — néhány kérdés erejéig.' }
];
