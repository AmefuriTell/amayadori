// icon-map に無い svc の箱を、サービス名入りの普通の箱に直す
import fs from 'node:fs';
const map = JSON.parse(fs.readFileSync(new URL('../../config/icon-map.json', import.meta.url))).map;
let total = 0;
for (const f of process.argv.slice(2)) {
  const j = JSON.parse(fs.readFileSync(f));
  let n = 0;
  for (const d of j.diagrams) {
    d.source = d.source.replace(/(\w+)@\{\s*svc:\s*"([^"]+)",\s*label:\s*"([^"]*)"\s*\}/g, (all, id, svc, label) => {
      if (map[svc]) return all;
      n++;
      return `${id}["${svc}<br/>${label}"]`;
    });
  }
  if (n) fs.writeFileSync(f, JSON.stringify(j, null, 2) + '\n');
  total += n;
  console.log(f, n);
}
console.log('total', total);
