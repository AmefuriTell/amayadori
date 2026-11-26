// 図の下書きの読みにくさの検査（線のラベルの長さ・同じ 2 箱の間の複数の線・subgraph の題の長さ）
import fs from 'node:fs';
for (const f of process.argv.slice(2)) {
  for (const d of JSON.parse(fs.readFileSync(f)).diagrams) {
    const out = [];
    const pairs = {};
    for (const line of d.source.split('\n')) {
      const m = line.match(/^\s*(\w+)\s*(?:--|==|-\.)\s*"([^"]*)"\s*(?:-->|==>|\.->|---|\.-)\s*(\w+)/) || line.match(/^\s*(\w+)\s*(?:-->|==>|-\.->|---|-\.-|<==>)\s*()(\w+)/);
      if (m) {
        const [, a, label, b] = m;
        if ([...label].length > 15) out.push(`線ラベル ${[...label].length} 字: ${label}`);
        const k = [a, b].sort().join('|');
        pairs[k] = (pairs[k] ?? 0) + 1;
      }
      const s = line.match(/subgraph \w+\["([^"]*)"\]/);
      if (s && [...s[1]].length > 12) out.push(`題 ${[...s[1]].length} 字: ${s[1]}`);
    }
    for (const [k, n] of Object.entries(pairs)) if (n > 1) out.push(`同じ箱の間に ${n} 本: ${k}`);
    if (out.length) console.log(d.id, '\n  ' + out.join('\n  '));
  }
}
