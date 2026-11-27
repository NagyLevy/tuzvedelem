/* 3a — Lendület, perdület. Forrás: 3a-Lendület, Perdület.ppt, 2–15. dia. Jelölés a diák szerint: vektor = aláhúzott betű. */
window.FIZ_LECKEK = (window.FIZ_LECKEK || []).concat([{
  id: '3a',
  perc: 6,
  forras: '3a-Lendület, Perdület, 2–15. dia',
  egyMondat: 'A lendület $\\underline{p}=m\\underline{v}$ megmondja, mennyi „mozgás” van egy testben. A perdület $\\underline{N}=\\underline{r}\\times\\underline{p}$ azt, hogy ez a mozgás mennyire kering egy pont körül. Az erő a lendületet, a forgatónyomaték a perdületet változtatja.',
  kepletek: [
    { nev: 'Lendület', tex: '\\underline{p} = m\\underline{v}', jel: '$m$ tömeg, $\\underline{v}$ sebesség (vektor). Egység: kg·m/s.', mikor: 'Mindig, ha mozgó test „lökéséről” van szó.', puska: true },
    { nev: 'Impulzustétel', tex: '\\frac{d\\underline{p}}{dt} = \\underline{F}', jel: 'A lendület idő szerinti deriváltja az erő.', mikor: 'Ez a Newton II. általános alakja.', puska: true, bol: ['Lendület'] },
    { nev: 'Átlagos erő rövid ütközésnél', tex: '\\underline{F}_{\\text{átl}} = \\frac{\\Delta\\underline{p}}{\\Delta t}', jel: '$\\Delta p$ a lendület változása, $\\Delta t$ az erőhatás ideje.', mikor: 'Ütközés, fékezés, rövid lökés: „mekkora átlagos erő hatott?”', puska: false, bol: ['Impulzustétel'] },
    { nev: 'Lendületmegmaradás', tex: '\\frac{d\\underline{p}}{dt} = \\underline{F} = 0 \\;\\Rightarrow\\; \\underline{p} = \\text{áll.}', jel: 'Ha az erők eredője nulla, a lendület nem változik.', puska: false, bol: ['Impulzustétel'] },
    { nev: 'Perdület (vektor)', tex: '\\underline{N} = \\underline{r}\\times\\underline{p} = m(\\underline{r}\\times\\underline{v})', jel: '$\\underline{r}$ helyvektor az origótól, $\\underline{p}$ lendület. Iránya merőleges az $\\underline{r}$ és $\\underline{p}$ síkjára.', puska: true, bol: ['Lendület'] },
    { nev: 'Perdület nagysága', tex: 'N = r\\cdot p\\cdot\\sin\\varphi', jel: '$\\varphi$ az $\\underline{r}$ és $\\underline{p}$ közti szög.', mikor: 'Ha számmal kell kiszámolni a perdületet.', puska: false, bol: ['Perdület (vektor)'] },
    { nev: 'Forgatónyomaték', tex: '\\underline{M} = \\underline{r}\\times\\underline{F},\\quad M = r\\cdot F\\cdot\\sin\\alpha', jel: '$\\underline{F}$ a testre ható erő, $\\alpha$ az $\\underline{r}$ és $\\underline{F}$ közti szög. Iránya merőleges az $\\underline{r}$, $\\underline{F}$ síkjára.', puska: true },
    { nev: 'Perdülettétel tömegpontra', tex: '\\frac{d\\underline{N}}{dt} = \\underline{M}', jel: 'A perdület deriváltja egyenlő a ráható erők forgatónyomatékával.', mikor: 'Levezetés: $\\frac{d\\underline{r}}{dt}\\times\\underline{p}=\\underline{v}\\times m\\underline{v}=0$, ezért csak $\\underline{r}\\times\\underline{F}$ marad.', puska: true, bol: ['Perdület (vektor)', 'Forgatónyomaték', 'Impulzustétel'] },
    { nev: 'Perdületmegmaradás', tex: '\\underline{M} = \\underline{r}\\times\\underline{F} = 0 \\;\\Rightarrow\\; \\underline{N} = m(\\underline{r}\\times\\underline{v}) = \\text{áll.}', jel: '$M=0$, ha $\\underline{F}=0$, vagy ha $\\underline{F}$ és $\\underline{r}$ párhuzamos (centrális erő).', puska: false, bol: ['Perdülettétel tömegpontra'] }
  ],
  kartyak: [
    { k: 'Definíció', cim: 'Lendület', html: '<ul><li>Az $m$ tömegű, $\\underline{v}$ sebességű pont lendülete $\\underline{p}=m\\underline{v}$.</li><li>Vektor: iránya a sebességé.</li><li>Más neve: impulzus.</li></ul>', hasonlat: 'Egy lassú kamiont és egy gyors golyót is nehéz megállítani. Mindkettőnek nagy a lendülete.' },
    { k: 'Tétel', cim: 'Az erő változtatja a lendületet', html: '<ul><li>$\\frac{\\Delta\\underline{p}}{\\Delta t}=\\underline{F}_{\\text{átl}}$, és $\\Delta t\\to 0$ esetén $\\frac{d\\underline{p}}{dt}=\\underline{F}$.</li><li>Ez a tömegpontra vonatkozó impulzustétel.</li><li>Ha az erők eredője nulla, a lendület állandó: lendületmegmaradás.</li></ul>' },
    { k: 'Alkalmazás', cim: 'Rövid ideig tartó erőhatások', html: '<ul><li>Ütközésnél az erő időbeli lefutását nem ismerjük, csak az átlagát.</li><li>$F_{\\text{átl}}=\\frac{\\Delta p}{\\Delta t}$: ugyanaz a $\\Delta p$ rövidebb idő alatt nagyobb erőt jelent.</li><li>Diás példa: 80 kg, 0,3 s alatt 5 m/s-ra gyorsul: $F=\\frac{80\\cdot 5}{0{,}3}=1333\\,\\text{N}$.</li></ul>', hasonlat: 'Ezért puha a légzsák: megnyújtja a $\\Delta t$-t, így kisebb az erő.' },
    { k: 'Definíció', cim: 'Perdület', html: '<ul><li>Azt méri, mennyire kering, forog egy test mozgása az origó körül.</li><li>$\\underline{N}=\\underline{r}\\times\\underline{p}$, nagysága $N=r\\,p\\sin\\varphi$.</li><li>Iránya merőleges az $\\underline{r}$ és $\\underline{p}$ síkjára.</li></ul>' },
    { k: 'Tétel', cim: 'A forgatónyomaték változtatja a perdületet', html: '<ul><li>$\\underline{M}=\\underline{r}\\times\\underline{F}$, nagysága $M=rF\\sin\\alpha$.</li><li>$\\frac{d\\underline{N}}{dt}=\\underline{M}$: a lendület–erő pár forgó megfelelője.</li><li>Levezetésben a $\\frac{d\\underline{r}}{dt}\\times\\underline{p}$ tag nulla, mert $\\underline{v}\\parallel\\underline{p}$.</li></ul>' },
    { k: 'Megmaradás', cim: 'Centrális erő', html: '<ul><li>Centrális az erő, ha egyenese mindig párhuzamos a test helyvektorának egyenesével.</li><li>Ekkor $\\underline{M}=\\underline{r}\\times\\underline{F}=0$, tehát a perdület állandó.</li><li>Példa a diáról: bolygók mozgása a Nap körül.</li></ul>', hasonlat: 'A bolygó közel a Naphoz gyorsabb, távol lassabb: $r$ nő, $v$ csökken, a szorzat marad.' }
  ],
  csapdak: [
    'A lendület vektor. Visszapattanásnál a $\\Delta p$ előjele számít: $0-mv$ negatív, ez fékezőerőt jelent.',
    'Perdületnél az $\\underline{r}\\times\\underline{p}$ sorrend számít. Fordítva az előjel megfordul.',
    'Centrális erőnél nem a lendület, hanem a perdület marad meg. A lendület iránya változik a pályán.',
    'Az átlagos erő képlete ($\\Delta p/\\Delta t$) nincs a puskán. A puskán csak $\\underline{p}\'=\\underline{F}$ van.'
  ],
  hianyzik: [],
  abrak: ['utkozes', 'centralis'],
  videok: ['perdulet']
}]);
