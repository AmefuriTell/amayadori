// 読み上げ（A-0009）の画面に頼らない部分: 読む文と設定。声を出すのは main.js（ブラウザの speechSynthesis）。
export const SPEECH_KEY = 'dop:v1:speech';
export const RATES = [0.8, 1, 1.2, 1.5];

export function parseSpeech(raw) {
  try {
    const v = JSON.parse(raw);
    return { on: v?.on === true, rate: RATES.includes(v?.rate) ? v.rate : 1 };
  } catch {
    return { on: false, rate: 1 };
  }
}

// 日本語の声が英語のつづりのまま読みがちな名前の読み方。長い物から当てる
const READINGS = {
  StackSets: 'スタックセッツ', StackSet: 'スタックセット', CodeDeploy: 'コードデプロイ', CodeBuild: 'コードビルド',
  CodePipeline: 'コードパイプライン', CodeArtifact: 'コードアーティファクト', CodeCommit: 'コードコミット',
  CloudWatch: 'クラウドウォッチ', CloudTrail: 'クラウドトレイル', CloudFormation: 'クラウドフォーメーション',
  CloudFront: 'クラウドフロント', EventBridge: 'イベントブリッジ', GuardDuty: 'ガードデューティー',
  DynamoDB: 'ダイナモディービー', ElastiCache: 'エラスティキャッシュ', AppConfig: 'アップコンフィグ',
  OpsCenter: 'オプスセンター', OpsItem: 'オプスアイテム', Lambda: 'ラムダ', Macie: 'メイシー', Aurora: 'オーロラ',
  Firehose: 'ファイアホース', Kinesis: 'キネシス', Fargate: 'ファーゲート', Organizations: 'オーガニゼーションズ',
  Inspector: 'インスペクター', Detective: 'ディテクティブ', Beanstalk: 'ビーンストーク', Elastic: 'エラスティック',
  Synthetics: 'シンセティクス', Insights: 'インサイツ', Route: 'ルート', Backup: 'バックアップ', Config: 'コンフィグ',
  buildspec: 'ビルドスペック', Parquet: 'パーケイ', JMeter: 'ジェイメーター', Docker: 'ドッカー', GitHub: 'ギットハブ',
  git: 'ギット', Git: 'ギット', npm: 'エヌピーエム', Amazon: 'アマゾン', Webhook: 'ウェブフック', canary: 'カナリア', Canary: 'カナリア',
};
const KEYS = Object.keys(READINGS).sort((a, b) => b.length - a.length);
const WORD = new RegExp(`(?<![A-Za-z])(${KEYS.join('|')})(?![A-Za-z])`, 'g');
const AREA = { us: 'ユーエス', eu: 'イーユー', ap: 'エーピー', ca: 'シーエー', sa: 'エスエー', me: 'エムイー', af: 'エーエフ', il: 'アイエル', mx: 'エムエックス' };
const DIR = { east: 'イースト', west: 'ウエスト', north: 'ノース', south: 'サウス', central: 'セントラル', northeast: 'ノースイースト', southeast: 'サウスイースト', northwest: 'ノースウエスト', southwest: 'サウスウエスト' };
const REGION = /\b(us|eu|ap|ca|sa|me|af|il|mx)-(northeast|southeast|northwest|southwest|east|west|north|south|central)-(\d)\b/g;

/** 声に出す形にする（日本語の時だけ読み方を置き換える） */
export function toSpoken(text, lang) {
  let s = String(text ?? '');
  if (lang === 'ja') {
    s = s.replace(REGION, (_, a, d, n) => `${AREA[a]} ${DIR[d]} ${n}`).replace(WORD, (w) => READINGS[w]);
  }
  return s.replace(/\s+/g, ' ').trim();
}

/** 問題の段: [{ text, lang }] */
export function questionScript(view) {
  const lang = view.lang;
  const label = lang === 'ja' ? (k) => `選択肢 ${k}。` : (k) => `${k}. `;
  return [
    { text: toSpoken(view.stem, lang), lang },
    ...view.choices.map((c) => ({ text: `${label(c.key)}${toSpoken(c.text, lang)}`, lang })),
  ];
}

/** 答えた後の段（解説は日本語） */
export function answerScript(q, ok, skipped = false) {
  return [{ text: toSpoken(`${skipped ? '分からない' : ok ? '正解' : '不正解'}。正解は ${q.answer.join(' と ')}。${q.explanation.summary}`, 'ja'), lang: 'ja' }];
}
