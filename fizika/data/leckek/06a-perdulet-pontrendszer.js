/* 6a — Perdület pontrendszerekre. Forrás: 6a-Perdület pontrendszerekre.ppt, 2–9. dia. */
window.FIZ_LECKEK = (window.FIZ_LECKEK || []).concat([{
  id: '6a',
  perc: 4,
  forras: '6a-Perdület pontrendszerekre, 2–9. dia',
  egyMondat: 'Ugyanaz, mint a lendületnél: a rendszer teljes perdületét csak a <b>külső erők forgatónyomatéka</b> változtatja. Ha ez nulla, a perdület állandó.',
  kepletek: [
    { nev: 'Perdület tömegpontra', tex: '\\underline{N} = \\underline{r}\\times\\underline{p} = m(\\underline{r}\\times\\underline{v}),\\quad N = r\\,p\\sin\\varphi', jel: 'Ismétlés a 3a-ból. Iránya merőleges az $\\underline{r}$, $\\underline{p}$ síkjára.', puska: true },
    { nev: 'Perdülettétel tömegpontra', tex: '\\frac{d\\underline{N}}{dt} = \\underline{r}\\times\\underline{F} = \\underline{M}', jel: 'A $\\frac{d\\underline{r}}{dt}\\times\\underline{p}$ tag nulla, mert $\\underline{v}\\parallel\\underline{p}$.', puska: true, bol: ['Perdület tömegpontra'] },
    { nev: 'Rendszer teljes perdülete', tex: '\\underline{N} = \\sum(\\underline{r}_i\\times\\underline{p}_i) = \\sum m_i(\\underline{r}_i\\times\\underline{v}_i)', jel: 'Más néven teljes impulzusmomentum.', puska: true, bol: ['Perdület tömegpontra'] },
    { nev: 'Perdülettétel pontrendszerre', tex: '\\frac{d}{dt}\\sum(\\underline{r}_i\\times\\underline{p}_i) = \\sum(\\underline{r}_i\\times\\underline{F}_i),\\quad \\frac{d\\underline{N}}{dt} = \\underline{M}', jel: '$\\underline{M}$ a külső erők forgatónyomatékának eredője. A puskán: $\\underline{N}\'=\\underline{M}^{(k)}$.', puska: true, bol: ['Rendszer teljes perdülete', 'Perdülettétel tömegpontra'] },
    { nev: 'Perdületmegmaradás pontrendszerre', tex: '\\underline{M} = \\sum\\underline{r}_i\\times\\underline{F}_i = 0 \\;\\Rightarrow\\; \\underline{N} = \\sum m_i(\\underline{r}_i\\times\\underline{v}_i) = \\text{áll.}', jel: 'Nincs külső erő, vagy a forgatónyomatékaik eredője nulla.', puska: false, bol: ['Perdülettétel pontrendszerre'] }
  ],
  kartyak: [
    { k: 'Párhuzam', cim: 'Lendület ↔ perdület', html: '<ul><li>$\\frac{d\\underline{p}}{dt}=\\underline{F}$ ↔ $\\frac{d\\underline{N}}{dt}=\\underline{M}$.</li><li>Pontrendszerre mindkettőben csak a <b>külső</b> erők számítanak.</li><li>Megmaradás: $\\sum\\underline{F}=0$ ↔ $\\sum\\underline{M}=0$.</li></ul>' },
    { k: 'Tétel', cim: 'Perdülettétel pontrendszerre', html: '<ul><li>A rendszer perdületének deriváltja = a külső erők forgatónyomatékának eredője.</li><li>Merev testre, $z$ tengely körül ebből lesz $\\Theta\\beta=M_z$ (6. lecke).</li></ul>', hasonlat: 'Piruettező korcsolyázó: behúzza a karját, $\\Theta$ csökken, így $\\omega$ nő, mert $N=\\Theta\\omega$ állandó. (Általános példa, nem a diákról.)' }
  ],
  csapdak: [
    'A belső erők forgatónyomatékai kiesnek. A tételbe csak a külső erők kellenek.',
    'Perdületmegmaradáshoz nem kell, hogy az erő nulla legyen. Elég, ha a forgatónyomatéka nulla (pl. centrális erő).'
  ],
  hianyzik: [],
  abrak: [],
  videok: []
}]);
