// Adat-ellenőrző: node fizika/tools/check.mjs  → „OK: …” vagy hibalista és 1-es kilépési kód.
// Egyszer kell: cd fizika/tools && npm i katex@0.16.11 --no-save
import { readFileSync, readdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const katex = createRequire(import.meta.url)('katex');

const ctx = { window: {}, console };
ctx.window.window = ctx.window;
vm.createContext(ctx);
const load = (rel) => vm.runInContext(readFileSync(path.join(root, rel), 'utf8'), ctx, { filename: rel });
load('data/temak.js');
readdirSync(path.join(root, 'data/leckek')).filter((f) => f.endsWith('.js')).sort().forEach((f) => load('data/leckek/' + f));
load('data/puska.js');
load('js/abrak.js');
load('js/videok.js');

const W = ctx.window;
const hibak = [];
const TEMAK = W.FIZ_TEMAK || [];
const LECKEK = W.FIZ_LECKEK || [];
const PUSKA = W.FIZ_PUSKA || [];
const ABRAK = W.FIZ_ABRAK || {};
const VIDEOK = W.FIZ_VIDEOK || {};
let kepletDb = 0;

const tex = (t, hol) => {
  try { katex.renderToString(t, { throwOnError: true, strict: 'ignore' }); }
  catch (e) { hibak.push(`${hol}: hibás TeX „${t}” → ${e.message.split('\n')[0]}`); }
};
// $…$ és $$…$$ a szövegekben
const inline = (s, hol) => {
  if (typeof s !== 'string') return;
  const re = /\$\$([\s\S]+?)\$\$|\$([^$]+?)\$/g;
  let m;
  while ((m = re.exec(s))) tex(m[1] || m[2], hol);
  if ((s.replace(/\$\$[\s\S]+?\$\$/g, '').match(/\$/g) || []).length % 2) hibak.push(`${hol}: páratlan számú $ jel`);
};

if (TEMAK.length !== 10) hibak.push(`10 téma kell, van: ${TEMAK.length}`);
TEMAK.forEach((t) => {
  const n = LECKEK.filter((l) => l.id === t.id).length;
  if (n !== 1) hibak.push(`téma ${t.id}: ${n} lecke (1 kell)`);
});
const nevek = new Set();
LECKEK.forEach((l) => {
  const h = `lecke ${l.id}`;
  if (!TEMAK.some((t) => t.id === l.id)) hibak.push(`${h}: nincs ilyen téma`);
  for (const k of ['perc', 'forras', 'egyMondat', 'kepletek', 'kartyak', 'csapdak', 'abrak', 'videok']) {
    if (l[k] === undefined) hibak.push(`${h}: hiányzó mező: ${k}`);
  }
  inline(l.egyMondat, h + ' egyMondat');
  (l.kepletek || []).forEach((k, i) => {
    const hk = `${h} képlet #${i + 1} (${k.nev})`;
    kepletDb++;
    if (!k.tex || !k.nev || !k.jel) hibak.push(`${hk}: tex/nev/jel kell`);
    if (typeof k.puska !== 'boolean') hibak.push(`${hk}: puska: true/false kell`);
    if (k.tex) tex(k.tex, hk);
    inline(k.jel, hk); inline(k.mikor, hk);
    nevek.add(k.nev);
  });
  (l.kartyak || []).forEach((c, i) => { inline(c.html, `${h} kártya #${i + 1}`); inline(c.hasonlat, `${h} kártya #${i + 1}`); });
  (l.csapdak || []).forEach((c, i) => inline(c, `${h} csapda #${i + 1}`));
  (l.abrak || []).forEach((a) => { if (!ABRAK[a]) hibak.push(`${h}: nincs ilyen ábra: ${a}`); });
  (l.videok || []).forEach((v) => { if (!VIDEOK[v]) hibak.push(`${h}: nincs ilyen videó: ${v}`); });
});
LECKEK.forEach((l) => (l.kepletek || []).forEach((k) => (k.bol || []).forEach((b) => {
  if (!nevek.has(b)) hibak.push(`lecke ${l.id} „${k.nev}”: a bol hivatkozás nem létezik: ${b}`);
})));
PUSKA.forEach((p, i) => {
  const h = `puska #${i + 1} (${p.nev})`;
  if (!p.tex || !p.nev || !Array.isArray(p.jelek) || !p.jelek.length) hibak.push(`${h}: tex/nev/jelek kell`);
  if (p.tex) tex(p.tex, h);
  if (p.lecke && !TEMAK.some((t) => t.id === p.lecke)) hibak.push(`${h}: nincs ilyen lecke: ${p.lecke}`);
  (p.jelek || []).forEach((j) => { tex(j.s, h + ' jel'); inline(j.d, h + ' jel'); });
});
Object.entries(VIDEOK).forEach(([k, v]) => {
  if (!v.cim || !Array.isArray(v.jelenetek) || !v.jelenetek.length || typeof v.rajz !== 'function') hibak.push(`videó ${k}: cim/jelenetek/rajz kell`);
  (v.jelenetek || []).forEach((j, i) => inline(j.szoveg, `videó ${k} jelenet #${i + 1}`));
});
Object.entries(ABRAK).forEach(([k, a]) => { if (!a.cim || typeof a.mount !== 'function') hibak.push(`ábra ${k}: cim/mount kell`); });

// Roadmap: állomások, elméleti kérdések, levezetett és gyakorló feladatok
readdirSync(path.join(root, 'data/roadmap')).filter((f) => f.endsWith('.js')).sort().forEach((f) => load('data/roadmap/' + f));
const ROAD = W.FIZ_ROADMAP || [];
let elmDb = 0, felDb = 0, gyDb = 0;
// HTML-be kerülő szöveg: a $…$ közti „<betű” címkének látszana a böngészőben
const html = (s, hol) => {
  if (s === undefined) return;
  if (typeof s !== 'string') { hibak.push(`${hol}: szöveg kell`); return; }
  inline(s, hol);
  (s.match(/\$\$[\s\S]+?\$\$|\$[^$]+?\$/g) || []).forEach((m) => { if (/<[a-zA-Z/!]/.test(m)) hibak.push(`${hol}: „<” a képletben, írd \\lt-vel: ${m}`); });
};
const rIds = new Set();
ROAD.forEach((s) => {
  const h = `roadmap ${s.id}`;
  if (rIds.has(s.id)) hibak.push(`${h}: ismétlődő állomás-azonosító`);
  rIds.add(s.id);
  for (const k of ['nev', 'leckek', 'perc', 'lenyeg', 'elmelet', 'receptek', 'tippek', 'feladatok', 'gyakorlo']) {
    if (s[k] === undefined) hibak.push(`${h}: hiányzó mező: ${k}`);
  }
  (s.leckek || []).forEach((l) => { if (!TEMAK.some((t) => t.id === l)) hibak.push(`${h}: nincs ilyen lecke: ${l}`); });
  html(s.lenyeg, h + ' lenyeg');
  (s.elmelet || []).forEach((e, i) => {
    const he = `${h} elmélet #${i + 1}`;
    elmDb++;
    if (!e.k || !e.v) hibak.push(`${he}: k/v kell`);
    html(e.k, he); html(e.v, he); html(e.trukk, he);
  });
  (s.receptek || []).forEach((r, i) => {
    const hr = `${h} recept #${i + 1}`;
    if (!r.cim || !Array.isArray(r.lepesek) || !r.lepesek.length) hibak.push(`${hr}: cim/lepesek kell`);
    html(r.cim, hr); html(r.mikor, hr);
    (r.lepesek || []).forEach((x) => html(x, hr));
    if (r.tex) tex(r.tex, hr);
  });
  (s.tippek || []).forEach((t, i) => html(t, `${h} tipp #${i + 1}`));
  const fIds = new Set();
  (s.feladatok || []).forEach((f) => {
    const hf = `${h} feladat ${f.id}`;
    felDb++;
    if (!f.id || fIds.has(f.id)) hibak.push(`${hf}: hiányzó vagy ismétlődő id`);
    fIds.add(f.id);
    if (!f.cim || !f.szoveg || !f.valasz || !Array.isArray(f.lepesek) || !f.lepesek.length) hibak.push(`${hf}: cim/szoveg/lepesek/valasz kell`);
    html(f.cim, hf); html(f.szoveg, hf); html(f.tipp, hf); html(f.megj, hf);
    (f.adatok || []).forEach((a) => tex(a, hf + ' adat'));
    (f.lepesek || []).forEach((l, i) => {
      const hl = `${hf} lépés #${i + 1}`;
      if (!l.cim) hibak.push(`${hl}: cim kell`);
      html(l.cim, hl); html(l.szoveg, hl); html(l.megj, hl);
      for (const k of ['tex', 'be', 'er']) if (l[k]) tex(l[k], `${hl} ${k}`);
    });
    if (f.valasz) tex(f.valasz, hf + ' valasz');
  });
  const gIds = new Set();
  (s.gyakorlo || []).forEach((g) => {
    const hg = `${h} gyakorló ${g.id}`;
    gyDb++;
    if (!g.id || gIds.has(g.id)) hibak.push(`${hg}: hiányzó vagy ismétlődő id`);
    gIds.add(g.id);
    if (!g.szoveg || !g.valasz) hibak.push(`${hg}: szoveg/valasz kell`);
    html(g.szoveg, hg); html(g.tipp, hg);
    if (g.valasz) tex(g.valasz, hg + ' valasz');
  });
});

if (hibak.length) { console.log(hibak.join('\n')); console.log(`HIBA: ${hibak.length}`); process.exit(1); }
console.log(`OK: ${LECKEK.length} lecke, ${kepletDb} képlet, ${PUSKA.length} puska-képlet, ${Object.keys(ABRAK).length} ábra, ${Object.keys(VIDEOK).length} videó · roadmap: ${ROAD.length} állomás, ${elmDb} elméleti kérdés, ${felDb} levezetés, ${gyDb} gyakorló`);
