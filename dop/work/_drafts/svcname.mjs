// icon-map に無い svc の箱のラベルに、サービス名が無ければ頭に足す
import fs from 'node:fs';
const map = JSON.parse(fs.readFileSync(new URL('../../config/icon-map.json', import.meta.url))).map;
for (const f of process.argv.slice(2)) {
  const j = JSON.parse(fs.readFileSync(f));
  let n = 0;
  for (const d of j.diagrams) {
    d.source = d.source.replace(/@\{\s*svc:\s*"([^"]+)",\s*label:\s*"([^"]*)"\s*\}/g, (all, svc, label) => {
      if (map[svc] || label.startsWith(svc)) return all;
      n++;
      return `@{ svc: "${svc}", label: "${svc}<br/>${label}" }`;
    });
  }
  if (n) fs.writeFileSync(f, JSON.stringify(j, null, 2) + '\n');
  if (n) console.log(f, n);
}
