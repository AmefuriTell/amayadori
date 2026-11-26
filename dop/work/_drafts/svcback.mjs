// icon-map に無いサービスの普通の箱を、名前入りの svc の箱に戻す（押すと事典が開くように）
import fs from 'node:fs';
const map = JSON.parse(fs.readFileSync(new URL('../../config/icon-map.json', import.meta.url))).map;
const qs = JSON.parse(fs.readFileSync(new URL('../../app/public/questions.json', import.meta.url)));
const list = Array.isArray(qs) ? qs : qs.questions;
const svcOf = Object.fromEntries(list.map((q) => [q.id, q.services ?? []]));
for (const f of process.argv.slice(2)) {
  const j = JSON.parse(fs.readFileSync(f));
  let n = 0;
  for (const d of j.diagrams) {
    const names = svcOf[d.id] ?? [];
    d.source = d.source.replace(/(\w+)\["([^"<]+)(<br\/>[^"]*)?"\]/g, (all, id, first, rest) => {
      if (map[first] || !names.includes(first)) return all;
      n++;
      return `${id}@{ svc: "${first}", label: "${first}${rest ?? ''}" }`;
    });
  }
  if (n) fs.writeFileSync(f, JSON.stringify(j, null, 2) + '\n');
  console.log(f, n);
}
