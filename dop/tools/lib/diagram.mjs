// 構成図（P-015）: 図の元（Mermaid ＋ サービスの印）を SVG にする。
// 図の元の書き方: サービスの箱は  P@{ svc: "AWS CodePipeline", label: "パイプライン" }  と書く。
//   アイコンがあれば公式のアイコン付きの箱に、無ければ四角の箱にする。押すと事典（共通）を開けるよう data-service を付ける。
// ほかは普通の Mermaid の flowchart（subgraph・線・線の文字）。
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { CODE, readJSON } from './io.mjs';

const SVC = /(\b[A-Za-z][A-Za-z0-9_]*)@\{\s*svc:\s*"([^"]+)"\s*(?:,\s*label:\s*"([^"]*)"\s*)?\}/g;

export function iconMap() {
  return readJSON(path.join(CODE, 'config', 'icon-map.json'), { map: {} }).map;
}

const ICON_DIR = () => path.join(CODE, 'assets', 'aws-icons');
const slug = (file) => file.toLowerCase();

/** 図の元 → Mermaid と、箱の id → サービス名 */
export function preprocess(source, map = iconMap(), hasIcon = (f) => fs.existsSync(path.join(ICON_DIR(), `${f}.svg`))) {
  const nodes = {};
  const unknown = [];
  const mermaid = source.replace(SVC, (_, id, svc, label) => {
    nodes[id] = svc;
    const text = (label ?? svc).replace(/"/g, "'");
    const file = map[svc];
    if (file && hasIcon(file)) return `${id}@{ icon: "aws:${slug(file)}", form: "rounded", label: "${text}", pos: "b", h: 48 }`;
    if (!file) unknown.push(svc);
    return `${id}["${text}"]:::svcbox`;
  });
  const hasBoxClass = /classDef\s+svcbox\b/.test(mermaid);
  return {
    mermaid: hasBoxClass || !/:::svcbox/.test(mermaid) ? mermaid : `${mermaid}\n  classDef svcbox fill:#eef3fb,stroke:#2e6bd1,stroke-width:1.5px;`,
    nodes,
    unknown,
  };
}

/** assets/aws-icons/*.svg → Mermaid に渡す iconify の形 */
export function iconPack() {
  const icons = {};
  const dir = ICON_DIR();
  if (fs.existsSync(dir)) {
    for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.svg'))) {
      const svg = fs.readFileSync(path.join(dir, f), 'utf8');
      const vb = svg.match(/viewBox="0 0 (\d+) (\d+)"/);
      const body = svg.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
      icons[slug(f.replace(/\.svg$/, ''))] = { body, width: Number(vb?.[1] ?? 64), height: Number(vb?.[2] ?? 64) };
    }
  }
  return { prefix: 'aws', icons };
}

/** 公式のアイコンを掃除して写す（title・id を外す。図に何個も入れた時に id がぶつからないように） */
// rect は path に直す（Mermaid の「箱の中の rect を塗る」設定がアイコンの背景まで塗り替えるため）
export function cleanIcon(svg) {
  return svg.replace(/<\?xml[^>]*>\s*/, '').replace(/<title>[\s\S]*?<\/title>\s*/g, '').replace(/\s(id|xmlns:xlink)="[^"]*"/g, '')
    .replace(/<rect\b([^>]*?)\/?>(\s*<\/rect>)?/g, (_, attrs) => {
      const n = (k) => Number(attrs.match(new RegExp(`\\b${k}="([\\d.]+)"`))?.[1] ?? 0);
      const rest = attrs.replace(/\s(x|y|width|height)="[^"]*"/g, '');
      return `<path${rest} d="M${n('x')},${n('y')} h${n('width')} v${n('height')} h-${n('width')} Z"/>`;
    })
    .trim() + '\n';
}

function mermaidLib() {
  const file = path.join(CODE, 'node_modules', 'mermaid', 'dist', 'mermaid.min.js');
  if (!fs.existsSync(file)) throw new Error('mermaid が無い。dop/ で npm install を呼ぶ（devDependencies）');
  return fs.readFileSync(file, 'utf8');
}

/**
 * 図をまとめて描く。[{ id, source }] → [{ id, svg, png?, nodes, unknown, error }]
 * png: preview に入れたファイルの場所（検証役が見る）
 */
export async function renderAll(list, { previewDir } = {}) {
  const { chromium } = createRequire(import.meta.url)('playwright');
  const browser = await chromium.launch();
  const out = [];
  try {
    const page = await browser.newPage({ viewport: { width: 420, height: 900 }, deviceScaleFactor: 2 });
    await page.setContent('<html><body style="margin:0;background:#fff;font-family:sans-serif"><div id="d" style="width:400px"></div></body></html>');
    await page.addScriptTag({ content: mermaidLib() });
    await page.evaluate((pack) => {
      window.mermaid.registerIconPacks([{ name: 'aws', icons: pack }]);
      window.mermaid.initialize({
        startOnLoad: false, securityLevel: 'strict', theme: 'base',
        themeVariables: { fontFamily: 'sans-serif', fontSize: '14px', primaryColor: '#eef3fb', primaryBorderColor: '#2e6bd1', lineColor: '#4b5563', clusterBkg: '#f7f8fc', clusterBorder: '#c7cfe0', edgeLabelBackground: '#ffffff' },
        flowchart: { htmlLabels: true, wrappingWidth: 160, useMaxWidth: true },
      });
    }, iconPack());
    for (const { id, source } of list) {
      const pre = preprocess(source);
      const rid = `dg-${id.replace(/[^A-Za-z0-9]/g, '-')}`;
      try {
        const svg = await page.evaluate(async ([code, rid, nodes]) => {
          const { svg } = await window.mermaid.render(rid, code);
          const host = document.getElementById('d');
          host.innerHTML = svg;
          const root = host.querySelector('svg');
          for (const g of root.querySelectorAll('g[id*="flowchart-"]')) {
            const m = g.id.match(/(?:^|-)flowchart-(.+)-\d+$/);
            if (m && nodes[m[1]]) { g.setAttribute('data-service', nodes[m[1]]); g.setAttribute('role', 'button'); g.setAttribute('tabindex', '0'); }
          }
          // XML として書き出す。outerHTML は <br> のような HTML の形になり、
          // <img> で読むと壊れた画像になる（講義の図は <img> で出す）
          const xml = new XMLSerializer().serializeToString(root);
          if (new DOMParser().parseFromString(xml, 'image/svg+xml').querySelector('parsererror')) throw new Error('SVG が XML として読めない');
          return xml;
        }, [pre.mermaid, rid, pre.nodes]);
        let png;
        if (previewDir) {
          fs.mkdirSync(previewDir, { recursive: true });
          png = path.join(previewDir, `${id}.png`);
          await page.locator('#d > svg').screenshot({ path: png });
        }
        out.push({ id, svg, png, nodes: pre.nodes, unknown: pre.unknown, error: null });
      } catch (e) {
        out.push({ id, svg: null, nodes: pre.nodes, unknown: pre.unknown, error: String(e.message ?? e).split('\n').slice(0, 3).join(' ') });
      }
    }
  } finally {
    await browser.close();
  }
  return out;
}
