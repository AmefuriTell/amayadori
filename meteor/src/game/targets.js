// 的にする都市（北半球の上から見下ろすので、北半球の都市だけ。経度で当たり外れを決める）。
export const TARGETS = [
  { name: "東京", latitude: 35.7, longitude: 139.7 },
  { name: "ロンドン", latitude: 51.5, longitude: -0.1 },
  { name: "ニューヨーク", latitude: 40.7, longitude: -74.0 },
  { name: "カイロ", latitude: 30.0, longitude: 31.2 },
  { name: "ムンバイ", latitude: 19.1, longitude: 72.9 },
  { name: "メキシコシティ", latitude: 19.4, longitude: -99.1 },
  { name: "ホノルル", latitude: 21.3, longitude: -157.9 },
  { name: "レイキャビク", latitude: 64.1, longitude: -21.9 },
  { name: "シンガポール", latitude: 1.3, longitude: 103.8 },
  { name: "アンカレッジ", latitude: 61.2, longitude: -149.9 },
];

// 前と違う的を選ぶ（random は 0 以上 1 未満を返す関数。試験で決まった値を渡せるように）。
export function nextTarget(previous, random = Math.random) {
  const choices = TARGETS.filter((target) => target !== previous);
  return choices[Math.floor(random() * choices.length)];
}

// 北極を真ん中にした正距方位図法の、地球の半径を 1 とした位置（数学の向き。南半球は赤道＝縁に寄せる）。
export function polarPoint(latitude, longitude) {
  const rho = (90 - Math.max(0, latitude)) / 90;
  const angle = (longitude * Math.PI) / 180;
  return { x: rho * Math.cos(angle), y: rho * Math.sin(angle) };
}
