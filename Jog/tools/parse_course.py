import re, html, json, sys
src, out = sys.argv[1], sys.argv[2]
LESSON_TOPIC = {1:'alap',2:'alap',3:'alkotmany',4:'allamszerv',6:'kozig',7:'nemzetkozi',8:'nemzetkozi',9:'bunteto',
                12:'polgari1',13:'polgari2',14:'polgari2',15:'polgari2',18:'munka',19:'fogyaszto'}
def clean(s):
    s = re.sub(r'<br\s*/?>', ' ', s); s = re.sub(r'<[^>]+>', '', s)
    return re.sub(r'\s+', ' ', html.unescape(s)).strip()
qs, skipped = [], 0
for n, topic in LESSON_TOPIC.items():
    t = open(f'{src}/lesson{n}.html', encoding='utf8').read()
    for m in re.finditer(r'<tr id="([0-9A-F]{8})">(.*?)</tr>\s*(?=<tr id=|</table>\s*</td>|$)', t, re.S):
        pass
    for block in re.split(r'(?=<tr id="[0-9A-F]{8}">)', t)[1:]:
        jm = re.search(r"ValasztosJavit\('([0-9A-F]{8})','([yn]+)'\)", block)
        if not jm: skipped += 1; continue
        q = re.search(r'class="test_question[^"]*">(.*?)</div>', block, re.S)
        opts = [clean(o) for o in re.findall(r'<td class="lesson_plain">(.*?)</td>', block, re.S)]
        key = jm.group(2)
        if len(opts) != len(key): print('MISMATCH', n, jm.group(1), len(opts), key); continue
        qt = re.sub(r'^\d+\.\s*', '', clean(q.group(1)))
        tp = topic
        low = qt.lower() + ' ' + ' '.join(opts).lower()
        if n == 4:
            if re.search(r'alkotmánybíró|bíróság|ügyész|biztos|alapjog|alapvető jog', low): tp = 'birosag'
            elif re.search(r'választ|népszavaz', low): tp = 'alkotmany'
        if n == 15 and re.search(r'örök|végrendelet|hagyaték', low): tp = 'polgari1'
        qs.append({'id': 'k' + jm.group(1), 't': tp, 'src': 'kurzus', 'q': qt, 'o': opts,
                   'a': [i for i, c in enumerate(key) if c == 'y'], 'multi': 'type="checkbox"' in block})
print(len(qs), 'kérdés,', skipped, 'kihagyva')
from collections import Counter; print(Counter(q['t'] for q in qs))
open(out, 'w', encoding='utf8').write('/* Generált: COEDU "Jogi ismeretek" kurzus önellenőrző kérdései (source/Jogi ismeretek (DKLB_JETM001) (99).zip). Ne kézzel szerkeszd: tools/parse_course.py */\nwindow.JOG_KURZUS = ' + json.dumps(qs, ensure_ascii=False, indent=0) + ';\n')
