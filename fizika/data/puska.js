/* A ZH-n használható segédlet (puska_klasszfiz.pdf) képletei, jelmagyarázattal.
   sz: a puska szakasza. lecke: melyik leckében van szó róla (null: nincs az előadásban). */
window.FIZ_PUSKA = [
  /* Tömegpontok mozgása */
  { sz: 'Tömegpontok', nev: 'Sebesség, gyorsulás', tex: '\\underline{v} = \\frac{d\\underline{r}}{dt} = \\underline{r}\',\\quad \\underline{a} = \\frac{d\\underline{v}}{dt} = \\underline{r}\'\'', lecke: null,
    jelek: [{ s: '\\underline{r}', d: 'helyvektor' }, { s: "'", d: 'idő szerinti derivált' }, { s: '\\bar{\\underline{v}}', d: 'átlagsebesség: $\\Delta\\underline{r}/\\Delta t$' }] },
  { sz: 'Tömegpontok', nev: 'Egyenletesen gyorsuló mozgás', tex: 'x(t) = x_0 + v_{x,0}t + \\frac{a_x}{2}t^2,\\quad v_x(t) = v_{x,0} + a_xt', lecke: null,
    jelek: [{ s: 'x_0', d: 'kezdőhely' }, { s: 'v_{x,0}', d: 'kezdősebesség' }, { s: 'a_x', d: 'állandó gyorsulás' }] },
  { sz: 'Tömegpontok', nev: 'Egyenletes körmozgás', tex: 'v = R\\omega,\\quad a = R\\omega^2 = \\frac{v^2}{R},\\quad T = \\frac{2\\pi}{\\omega}', lecke: '4',
    jelek: [{ s: 'R', d: 'pályasugár' }, { s: '\\omega', d: 'szögsebesség (1/s)' }, { s: 'a', d: 'centripetális gyorsulás' }] },
  { sz: 'Tömegpontok', nev: 'Lendület', tex: '\\underline{p} = m\\underline{v},\\quad \\underline{p}\' = \\underline{F}', lecke: '3a',
    jelek: [{ s: '\\underline{p}', d: 'lendület (impulzus)' }, { s: "\\underline{p}'", d: 'a lendület időderiváltja = az eredő erő (impulzustétel)' }] },
  { sz: 'Tömegpontok', nev: 'Perdület, forgatónyomaték', tex: '\\underline{N} = \\underline{r}\\times\\underline{p} = m\\,\\underline{r}\\times\\underline{v},\\quad \\underline{M} = \\underline{r}\\times\\underline{F},\\quad \\underline{N}\' = \\underline{M}', lecke: '3a',
    jelek: [{ s: '\\underline{N}', d: 'perdület (impulzusmomentum)' }, { s: '\\underline{M}', d: 'forgatónyomaték' }, { s: '\\times', d: 'vektoriális szorzat, nagysága $rF\\sin\\alpha$' }] },
  { sz: 'Tömegpontok', nev: 'Munka, teljesítmény', tex: 'W = \\underline{F}\\Delta\\underline{r} = F\\Delta r\\cos\\alpha,\\quad P = W\' = \\underline{F}\\,\\underline{v} = \\left(\\tfrac12 mv^2\\right)\' = E_m\'', lecke: '3b',
    jelek: [{ s: '\\alpha', d: 'az erő és az elmozdulás szöge' }, { s: 'P', d: 'teljesítmény' }, { s: "E_m'", d: 'a mozgási energia időderiváltja' }] },
  { sz: 'Tömegpontok', nev: 'Potenciál', tex: 'W(\\underline{r}_1,\\underline{r}_2) = V(\\underline{r}_1) - V(\\underline{r}_2),\\quad F_x = -\\frac{\\partial V}{\\partial x}', lecke: '3b',
    jelek: [{ s: 'V', d: 'potenciális (helyzeti) energia' }, { s: 'W(\\underline{r}_1,\\underline{r}_2)', d: 'a munka 1-ből 2-be, úttól független' }] },

  /* Nevezetes erőfajták */
  { sz: 'Erőfajták', nev: 'Gravitáció', tex: '\\underline{F} = m\\underline{g},\\quad V = mgz;\\qquad \\underline{F} = -\\gamma\\frac{m_1m_2}{r^2}\\frac{\\underline{r}}{r},\\quad V = \\gamma\\frac{m_1m_2}{r}', lecke: '3b',
    jelek: [{ s: 'z', d: 'magasság' }, { s: '\\gamma', d: 'gravitációs állandó' }, { s: '\\frac{\\underline{r}}{r}', d: 'egységvektor' }] },
  { sz: 'Erőfajták', nev: 'Rugalmas erő', tex: 'F = -D\\cdot x,\\quad V = \\tfrac12 Dx^2', lecke: '4',
    jelek: [{ s: 'D', d: 'rugóállandó (N/m)' }, { s: 'x', d: 'megnyúlás az egyensúlytól' }] },
  { sz: 'Erőfajták', nev: 'Súrlódás', tex: 'S = \\mu K,\\quad W = -s\\cdot\\mu K,\\quad S_{0,max} = \\mu_0K', lecke: '3b',
    jelek: [{ s: 'S', d: 'csúszási súrlódási erő' }, { s: 'K', d: 'nyomóerő (a diákon $N$)' }, { s: '\\mu,\\ \\mu_0', d: 'csúszási és tapadási súrlódási együttható' }, { s: 's', d: 'megtett út' }] },
  { sz: 'Erőfajták', nev: 'Közegellenállás', tex: '\\underline{F}_k = -C\\underline{v};\\qquad \\underline{F}_k = -\\tfrac12 C_dA\\varrho v\\underline{v}', lecke: '4',
    jelek: [{ s: 'C', d: 'kis sebességnél az ellenállási együttható' }, { s: 'C_d', d: 'alaktényező: gömb 0,47, kúp 0,50, kocka 1,05, „csepp” 0,04' }, { s: 'A,\\ \\varrho', d: 'homlokfelület, a közeg sűrűsége' }] },

  /* Pontrendszerek */
  { sz: 'Pontrendszerek', nev: 'Tömegközéppont és tétele', tex: '\\underline{r}_0 = \\frac{\\sum m_i\\underline{r}_i}{m_0},\\quad m_0 = \\sum m_i,\\quad \\sum\\underline{F}_i^{(k)} = \\left(\\sum m_i\\underline{v}_i\\right)\' = m_0\\underline{r}_0\'\'', lecke: '5',
    jelek: [{ s: '\\underline{r}_0', d: 'tömegközéppont' }, { s: 'm_0', d: 'össztömeg' }, { s: '^{(k)}', d: 'csak a külső erők' }] },
  { sz: 'Pontrendszerek', nev: 'Perdülettétel pontrendszerre', tex: '\\underline{N} = \\sum\\underline{r}_i\\times\\underline{p}_i,\\quad \\underline{N}\' = \\sum\\underline{r}_i\\times\\underline{F}_i^{(k)} = \\underline{M}^{(k)}', lecke: '6a',
    jelek: [{ s: '\\underline{M}^{(k)}', d: 'a külső erők forgatónyomatékának eredője' }] },
  { sz: 'Pontrendszerek', nev: 'Forgás z-tengely körül', tex: '\\Theta_z = \\sum m_il_i^2,\\quad N_z = \\Theta_z\\omega,\\quad N_z\' = M_z,\\quad E_z = \\tfrac12\\Theta_z\\omega^2', lecke: '6',
    jelek: [{ s: '\\Theta_z', d: 'tehetetlenségi nyomaték' }, { s: 'l_i', d: 'a pont távolsága a tengelytől. (A puskán $\\sqrt{x_i^2+y_i^2}$ áll, $l_i^2=x_i^2+y_i^2$.)' }, { s: "N_z'=M_z", d: 'forgás mozgásegyenlete: $\\Theta\\beta=M_z$' }] },
  { sz: 'Pontrendszerek', nev: 'Nevezetes Θ-k', tex: '\\Theta_{abroncs} = mR^2,\\quad \\Theta_{korong} = \\tfrac12 mR^2,\\quad \\Theta_{gömb} = \\tfrac25 mR^2,\\quad \\Theta_{tégla} = \\tfrac1{12}m(a^2+b^2)', lecke: '6',
    jelek: [{ s: '\\Theta', d: 'tömegközépponton átmenő szimmetriatengelyre' }, { s: 'a,\\ b', d: 'a tengelyre merőleges élek' }] },

  /* Deformálható testek */
  { sz: 'Deformálható testek', nev: 'Nyújtás', tex: 'F = E\\frac{A}{l_0}\\Delta l,\\quad \\sigma = \\varepsilon E,\\quad \\sigma = \\frac{F}{A},\\quad \\varepsilon = \\frac{\\Delta l}{l_0},\\quad \\frac{\\Delta d}{d_0} = -\\mu\\varepsilon', lecke: '7',
    jelek: [{ s: 'E', d: 'Young-modulus' }, { s: '\\sigma,\\ \\varepsilon', d: 'húzófeszültség, relatív megnyúlás' }, { s: '\\mu', d: 'Poisson-szám (itt nem súrlódás!)' }] },
  { sz: 'Deformálható testek', nev: 'Kompresszió, nyírás', tex: '\\frac{\\Delta V}{V_0} = -\\kappa\\Delta p,\\qquad \\gamma = \\frac1G\\frac{F}{A},\\quad \\sigma_{ny} = \\gamma G', lecke: '7',
    jelek: [{ s: '\\kappa', d: 'kompresszibilitás' }, { s: '\\gamma', d: 'nyírási szög (itt nem gravitációs állandó!)' }, { s: 'G', d: 'nyírási (torziós) modulus' }] },
  { sz: 'Deformálható testek', nev: 'Csavarás, hajlítás', tex: '\\varphi = \\frac{2}{\\pi G}\\frac{l}{R^4}M,\\qquad s = \\frac{1}{3E}\\frac{l^3}{I}F', lecke: '7',
    jelek: [{ s: '\\varphi', d: 'elcsavarodási szög (kör keresztmetszet)' }, { s: 's', d: 'lehajlás, egyik végén befogott rúd' }, { s: 'I', d: 'felületi nyomaték (diákon $T$)' }] },
  { sz: 'Deformálható testek', nev: 'Felületi nyomaték', tex: 'I_{téglalap} = \\frac{ab^3}{12},\\quad I_{cső} = \\frac{\\pi}{4}(R^4 - r^4)', lecke: '7',
    jelek: [{ s: 'b', d: 'a hajlítás irányú vastagság' }, { s: 'R,\\ r', d: 'külső és belső sugár. Tömör hengernél $r=0$.' }] },

  /* Rezgések */
  { sz: 'Rezgések', nev: 'Harmonikus rezgés', tex: 'x(t) = A\\sin(\\omega t + \\varphi_0),\\quad \\omega = \\sqrt{D/m},\\quad E = \\frac{DA^2}{2},\\quad T = \\frac{2\\pi}{\\omega},\\quad f = \\frac1T', lecke: '4',
    jelek: [{ s: 'A', d: 'amplitúdó' }, { s: '\\varphi_0', d: 'kezdőfázis (diákon $\\alpha$)' }, { s: 'E', d: 'a rezgés teljes energiája' }] },
  { sz: 'Rezgések', nev: 'Kis rezgések, inga', tex: '\\omega = \\sqrt{-\\frac1m\\frac{dF}{dx}},\\qquad \\omega = \\sqrt{g/l}', lecke: '4',
    jelek: [{ s: '\\frac{dF}{dx}', d: 'az erő deriváltja az egyensúlyi helyen (negatív kell)' }, { s: 'l', d: 'ingahossz' }] },
  { sz: 'Rezgések', nev: 'Csillapodó rezgés', tex: 'ma = -Dx - Cv,\\quad \\omega_0 = \\sqrt{D/m},\\quad \\beta = \\frac{C}{2m};\\quad x(t) = A_0e^{-\\beta t}\\sin(\\omega_{cs}t+\\varphi_0),\\quad \\omega_{cs} = \\sqrt{\\omega_0^2-\\beta^2}', lecke: '4',
    jelek: [{ s: '\\beta', d: 'csillapítási tényező (itt nem szöggyorsulás!)' }, { s: '\\omega_{cs}', d: 'csillapított körfrekvencia, ha $\\omega_0>\\beta$' }] },
  { sz: 'Rezgések', nev: 'Gerjesztett rezgés', tex: 'A_g = \\frac{a_0}{\\sqrt{(\\omega_0^2-\\omega_g^2)^2 + 4\\beta^2\\omega_g^2}},\\quad \\operatorname{tg}\\delta = \\frac{2\\beta\\omega_g}{\\omega_0^2-\\omega_g^2}', lecke: '4',
    jelek: [{ s: 'a_0', d: '$F_0/m$, a gerjesztő erő amplitúdója osztva a tömeggel' }, { s: '\\omega_g', d: 'gerjesztő körfrekvencia' }, { s: '\\delta', d: 'fáziskésés a gerjesztéshez képest' }] },
  { sz: 'Rezgések', nev: 'Egyirányú rezgések eredője', tex: 'A = \\sqrt{A_1^2+A_2^2+2A_1A_2\\cos(\\varphi_1-\\varphi_2)},\\quad \\operatorname{tg}\\varphi = \\frac{A_1\\sin\\varphi_1+A_2\\sin\\varphi_2}{A_1\\cos\\varphi_1+A_2\\cos\\varphi_2}', lecke: '4',
    jelek: [{ s: '\\varphi_1,\\ \\varphi_2', d: 'a két rezgés fázisa (azonos $\\omega$)' }] },

  /* Hullám, hang */
  { sz: 'Hullám, hang', nev: 'Hullám alapképletek', tex: 'Z(x,t) = f(x-vt),\\quad v = \\lambda f,\\quad f = 1/T', lecke: '8',
    jelek: [{ s: 'Z', d: 'kitérés' }, { s: 'v', d: 'terjedési sebesség (diákon $c$)' }, { s: '\\lambda', d: 'hullámhossz' }] },
  { sz: 'Hullám, hang', nev: 'Harmonikus hullám', tex: 'k = \\frac{2\\pi}{\\lambda},\\quad \\omega = \\frac{2\\pi}{T},\\quad Z(x,t) = A\\sin(kx-\\omega t)', lecke: '8',
    jelek: [{ s: 'k', d: 'hullámszám (nem rugóállandó!)' }] },
  { sz: 'Hullám, hang', nev: 'Húron terjedő hullám', tex: 'v = \\sqrt{F_h/\\mu}', lecke: '8',
    jelek: [{ s: 'F_h', d: 'húrt feszítő erő' }, { s: '\\mu', d: 'egységnyi hossz tömege: $q\\rho$ (nem Poisson-szám!)' }] },
  { sz: 'Hullám, hang', nev: 'Két forrás interferenciája', tex: 'd_1 - d_2 = n\\lambda\\;\\text{(erősítés)},\\qquad d_1 - d_2 = (n+\\tfrac12)\\lambda\\;\\text{(gyengítés)}', lecke: '8',
    jelek: [{ s: 'd_1,\\ d_2', d: 'a két forrástól mért távolság (diákon $s_1$, $s_2$)' }, { s: 'n', d: 'egész szám' }] },
  { sz: 'Hullám, hang', nev: 'Törési törvény', tex: '\\frac{\\sin\\alpha}{\\sin\\beta} = \\frac{v_1}{v_2} = n_{2,1}', lecke: '8',
    jelek: [{ s: '\\alpha,\\ \\beta', d: 'beesési és törési szög a merőlegestől' }, { s: 'n_{2,1}', d: 'a 2. közeg 1.-re vonatkozó törésmutatója' }] },
  { sz: 'Hullám, hang', nev: 'Doppler-effektus', tex: "f' = f\\frac{c + v_m}{c - v_f}", lecke: '9',
    jelek: [{ s: 'v_m', d: 'megfigyelő sebessége, közeledés pozitív' }, { s: 'v_f', d: 'forrás sebessége, közeledés pozitív' }, { s: 'c', d: 'hangsebesség' }] },
  { sz: 'Hullám, hang', nev: 'Mach-kúp', tex: '\\sin\\Theta = \\frac{c}{v_f}', lecke: null,
    jelek: [{ s: '\\Theta', d: 'a kúp fél nyílásszöge (nem tehetetlenségi nyomaték!)' }, { s: 'v_f', d: 'hangsebesség fölötti forrás' }] },
  { sz: 'Hullám, hang', nev: 'Hangintenzitás és -szint', tex: 'I = P/A,\\quad n = 10\\lg(I/I_0),\\quad I_0 = 10^{-12}\\,\\text{W/m}^2', lecke: '9',
    jelek: [{ s: 'A', d: 'felület (pontforrásnál $4\\pi r^2$; nem amplitúdó!)' }, { s: 'n', d: 'szint decibelben' }, { s: 'I_0', d: 'hallásküszöb' }] },

  /* Optika */
  { sz: 'Optika', nev: 'Optikai rács, rés', tex: '\\sin\\alpha_n = n\\frac{\\lambda}{a},\\qquad \\sin\\varphi = \\frac{\\lambda}{d}', lecke: '10',
    jelek: [{ s: 'a', d: 'rácsállandó (rések távolsága)' }, { s: 'd', d: 'résszélesség' }, { s: '\\varphi', d: 'az első sötét csík iránya' }] },
  { sz: 'Optika', nev: 'Lencsék, tükrök, leképezés', tex: '\\frac1f = (n-1)\\left(\\frac1{r_1}+\\frac1{r_2}\\right),\\quad f = \\frac R2,\\quad \\frac1f = \\frac1k + \\frac1t,\\quad N = \\frac kt = \\frac KT', lecke: '10',
    jelek: [{ s: 'n', d: 'törésmutató' }, { s: 'r_1,\\ r_2,\\ R', d: 'görbületi sugarak' }, { s: 'k,\\ t', d: 'kép- és tárgytávolság' }, { s: 'K,\\ T', d: 'kép- és tárgyméret (nem periódusidő!)' }] },
  { sz: 'Optika', nev: 'Nagyító, mikroszkóp', tex: 'N_{l,m} = 1 + \\frac{d_0}{f},\\qquad N = N_1N_2 = \\left(\\frac{l-f_2}{f_1}-1\\right)\\left(1+\\frac{d_0}{f_2}\\right)', lecke: '10',
    jelek: [{ s: 'd_0', d: 'tisztánlátás távolsága, 0,25 m' }, { s: 'f_1,\\ f_2', d: 'objektív, ókulár' }, { s: 'l', d: 'a két lencse távolsága' }] },
  { sz: 'Optika', nev: 'Kepler-távcső', tex: 'N = \\frac{f_1}{f_2},\\quad \\varphi = 1{,}22\\frac{\\lambda}{D} \\approx \\frac{0{,}138\'\'}{D},\\quad N_{max} \\approx 430D,\\quad N_{min} = \\frac{D}{8\\,\\text{mm}}', lecke: '10',
    jelek: [{ s: 'D', d: 'objektívátmérő (méterben, kivéve $N_{min}$)' }, { s: '\\varphi', d: 'felbontóképesség' }] }
];
