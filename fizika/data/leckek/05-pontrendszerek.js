/* 5 — Pontrendszerek. Forrás: 5-Pontrendszerek.ppt, 2–25. dia. */
window.FIZ_LECKEK = (window.FIZ_LECKEK || []).concat([{
  id: '5',
  perc: 9,
  forras: '5-Pontrendszerek, 2–25. dia',
  egyMondat: 'Több tömegpontnál a <b>belső erők kiejtik egymást</b> ($\\underline{F}_{12}=-\\underline{F}_{21}$). Ezért a rendszer összlendületét csak a külső erők változtatják, és a tömegközéppont úgy mozog, mintha minden tömeg ott lenne.',
  kepletek: [
    { nev: 'Impulzustétel pontrendszerre', tex: '\\frac{d}{dt}\\sum\\underline{p}_i = \\sum\\underline{F}_i', jel: '$\\underline{F}_i$ csak a külső erők. A belső erők párban kiesnek. A puskán: $\\sum\\underline{F}_i^{(k)}=\\left(\\sum m_i\\underline{v}_i\\right)\'$.', puska: true },
    { nev: 'Impulzusmegmaradás', tex: '\\sum\\underline{F}_i = 0 \\;\\Rightarrow\\; \\sum\\underline{p}_i = \\text{állandó}', jel: 'Zárt rendszer: nincs külső erő, vagy eredőjük nulla.', mikor: 'Ütközés, szétlökés, robbanás.', puska: false, bol: ['Impulzustétel pontrendszerre'] },
    { nev: 'Tömegközéppont', tex: '\\underline{r}_s = \\frac{1}{m}\\sum m_i\\underline{r}_i,\\quad m = \\sum m_i', jel: '$m$ a rendszer teljes tömege. A puskán $\\underline{r}_0$ a jele.', puska: true },
    { nev: 'Tömegközéppont-tétel', tex: 'm\\frac{d^2\\underline{r}_s}{dt^2} = \\underline{F}', jel: '$\\underline{F}$ a külső erők eredője. A puskán: $\\sum\\underline{F}^{(k)}=m_0\\underline{r}_0\'\'$.', mikor: 'A belső erők a tömegközéppont mozgását nem befolyásolják.', puska: true, bol: ['Impulzustétel pontrendszerre', 'Tömegközéppont'] },
    { nev: 'Rugalmas ütközés: megmaradások', tex: 'm_1\\underline{v}_1\' + m_2\\underline{v}_2\' = m_1\\underline{v}_1 + m_2\\underline{v}_2,\\quad \\tfrac12 m_1v_1\'^2 + \\tfrac12 m_2v_2\'^2 = \\tfrac12 m_1v_1^2 + \\tfrac12 m_2v_2^2', jel: 'Vesszős = ütközés utáni. Lendület és mozgási energia is megmarad.', puska: false, bol: ['Impulzusmegmaradás'] },
    { nev: 'Rugalmas ütközés utáni sebességek', tex: 'v_1\' = \\frac{m_1-m_2}{m_1+m_2}v_1 + \\frac{2m_2}{m_1+m_2}v_2,\\quad v_2\' = \\frac{m_2-m_1}{m_1+m_2}v_2 + \\frac{2m_1}{m_1+m_2}v_1', jel: 'Egyenes, centrális ütközés. Az előjel az irányt jelöli.', mikor: '$m_1=m_2$: sebességet cserélnek. $m_2=\\infty$, $v_2=0$: $v_1\'=-v_1$ (visszapattan).', puska: false, bol: ['Rugalmas ütközés: megmaradások'] },
    { nev: 'Rugalmatlan ütközés', tex: 'v_1\' = v_2\' = \\frac{m_1v_1 + m_2v_2}{m_1+m_2}', jel: 'Együtt mennek tovább. Csak a lendület marad meg, energia vész el.', puska: false, bol: ['Impulzusmegmaradás'] },
    { nev: 'Ballisztikus inga', tex: 'm_1v_1 = (m_1+m_2)v_0,\\quad h = l(1-\\cos\\alpha),\\quad v_1 = \\frac{m_1+m_2}{m_1}\\sqrt{2gh}', jel: '$m_1$ lövedék, $m_2$ inga, $\\alpha$ kitérési szög, $l$ fonálhossz.', mikor: 'Két lépés: rugalmatlan ütközés (lendület), utána emelkedés (energia: $v_0=\\sqrt{2gh}$).', puska: false, bol: ['Rugalmatlan ütközés'] },
    { nev: 'Súllyal mozgatott kocsi', tex: 'a = \\frac{m_1}{m_1+m_2}g,\\quad F\' = m_1g\\left(1-\\frac{m_1}{m_1+m_2}\\right)', jel: '$m_1$ a lógó test, $m_2$ a kocsi, $F\'$ a fonálerő. Súrlódás nincs.', mikor: 'Kiinduló egyenletek: $m_1a=m_1g-F\'$ és $m_2a=F\'$.', puska: false },
    { nev: 'Állócsigán átvetett fonál', tex: 'a = \\frac{m_1-m_2}{m_1+m_2}g,\\quad F\' = m_1g\\left(1-\\frac{m_1-m_2}{m_1+m_2}\\right)', jel: '$m_1>m_2$, a csiga tömege elhanyagolható.', mikor: 'Kiinduló egyenletek: $m_1a=m_1g-F\'$ és $m_2a=F\'-m_2g$.', puska: false }
  ],
  kartyak: [
    { k: 'Alap', cim: 'Belső és külső erők', html: '<ul><li>Minden pontra: $m_i\\ddot{\\underline{r}}_i=\\underline{F}_i$.</li><li>Belső erő: a rendszer pontjai egymásra hatnak. Párban: $\\underline{F}_{12}=-\\underline{F}_{21}$.</li><li>Összeadáskor kiesnek, csak a külső erők maradnak.</li></ul>', hasonlat: 'Hiába tolod belülről az autó műszerfalát, az autó nem indul el.' },
    { k: 'Megmaradás', cim: 'Szétlökött kocsik', html: '<ul><li>Előtte minden áll: összlendület 0.</li><li>Utána is 0: $m_1v_1+m_2v_2=0$, tehát ellentétes irányba mennek.</li><li>A könnyebb gyorsabb. Diás példa: 0,2 és 0,3 kg, $v_1=0{,}072$, $v_2=0{,}048$ m/s.</li></ul>' },
    { k: 'Tétel', cim: 'Tömegközéppont', html: '<ul><li>Úgy mozog, mintha a teljes tömeg benne lenne, és minden külső erő rá hatna.</li><li>A belső erők nem befolyásolják.</li><li>A dia példája: a tűzijáték szétrobban, de a darabok tömegközéppontja tovább repül a pályán.</li></ul>' },
    { k: 'Ütközés', cim: 'Rugalmas vagy rugalmatlan?', html: '<ul><li>Lendület mindig megmarad.</li><li>Tökéletesen rugalmas: a mozgási energia is megmarad.</li><li>Tökéletesen rugalmatlan: együtt mennek tovább, energia vész el. Diás példa: azonos tömegeknél a fele.</li></ul>' },
    { k: 'Kötött rendszer', cim: 'Fonállal kötött testek', html: '<ul><li>Minden testre külön Newton II., a fonálerő $F\'$ belső erő.</li><li>Nyújthatatlan fonál: azonos gyorsulás.</li><li>Ha a kocsit rögzítjük, $a=0$ és $F\'=m_1g$. Ha szabadon mozog, $F\'<m_1g$.</li></ul>' }
  ],
  csapdak: [
    'Ütközési képletekben a sebesség előjeles. Szemben mozgó golyóknál az egyik negatív (diás példa: $-6$ m/s).',
    'Rugalmatlan ütközésnél az energia nem marad meg. Ballisztikus ingánál a lendületmegmaradás az ütközésre kell, az energia csak utána.',
    'A ballisztikus ingás diás feladat végeredménye a dián 501000 m/s. Saját számolásom szerint a képletbe helyettesítve 501 m/s jön ki. Ezt ellenőrizd (feltételezés: elírás a dián).',
    'Csigánál a fonálerő nem $m_1g$, ha a rendszer gyorsul.'
  ],
  hianyzik: ['A 13. dia (mechanikai energia megmaradása konzervatív rendszerben) csak egy mondat, külön képlet nélkül.'],
  abrak: ['utkozes2'],
  videok: ['utkozes']
}]);
