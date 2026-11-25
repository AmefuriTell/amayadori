// e2e の問題（本物の bank に頼らない）。1 つ選ぶ・複数選ぶ・確信が低い、を 1 問ずつ。
const base = {
  task: '1.4', domain: 1, services: ['AWS CodeDeploy'],
  explanation: { summary: '要約', per_choice: {} },
  references: [{ url: 'https://docs.aws.amazon.com/codedeploy/latest/userguide/welcome.html', quote: 'CodeDeploy is a deployment service.' }],
  low_confidence: false,
};
const choices = (n) => ['A', 'B', 'C', 'D', 'E'].slice(0, n).map((k) => ({ key: k, text: `Choice ${k} text for the question that is long enough to wrap on a phone screen.` }));
const jaChoices = (n) => choices(n).map((c) => ({ ...c, text_ja: `選択肢 ${c.key} の日本語の文。スマートフォンの画面で折り返すくらいの長さにしておく。` }));
const per = (n) => Object.fromEntries(['A', 'B', 'C', 'D', 'E'].slice(0, n).map((k) => [k, `解説 ${k}`]));

export const DATA = {
  exam: 'DOP-C02',
  domains: { 1: { name: 'SDLC Automation', weight: 0.22 }, 6: { name: 'Security and Compliance', weight: 0.17 } },
  count: 3,
  questions: [
    { ...base, id: 'q-1.4-0001', type: 'single', select_count: 1, stem: 'First question stem. Which solution meets the requirements with the LEAST operational effort?', stem_ja: '1 問目の問題文。最も運用の手間が少ない方法はどれですか。', choices: jaChoices(4), answer: ['B'], explanation: { summary: '要約 1', per_choice: per(4) }, note: '試験の時点では古い名前の可能性がある。A long note that should wrap on a narrow phone screen without overflowing.' },
    { ...base, id: 'q-1.4-0002', type: 'multi', select_count: 2, stem: 'Second question stem. Which steps should be taken? (Choose TWO.)', stem_ja: '2 問目の問題文。どの手順を取るべきですか。（2 つ選択してください。）', choices: jaChoices(5), answer: ['A', 'D'], explanation: { summary: '要約 2', per_choice: per(5) } },
    { ...base, id: 'q-1.4-0003', type: 'single', select_count: 1, stem: 'Third question stem. Which option is the MOST cost-effective?', choices: choices(4), answer: ['C'], explanation: { summary: '要約 3', per_choice: per(4) }, low_confidence: true },
  ],
};

// 事典（A-0013）。fixtures の問題の services は 'AWS CodeDeploy' だけ
export const GLOSSARY = {
  names: { 'AWS CodeDeploy': 'codedeploy', 'Amazon S3': 's3' },
  pages: {
    codedeploy: {
      id: 'codedeploy', name: 'AWS CodeDeploy', reading: 'コードデプロイ', summary: 'アプリの新しい版をサーバーへ自動で配るサービス。',
      features: [{ title: 'Blue/Green', text: '新しい版を横に用意してから切り替える。スマートフォンの画面で折り返すくらいの長さにしておく。' }],
      exam_points: ['止まる時間を減らすデプロイの方法を選ぶ問題で使う。'],
      compare: [{ with: 'AWS CodePipeline', text: 'CodePipeline は流れ全体、CodeDeploy は配る所。' }],
      references: [{ url: 'https://docs.aws.amazon.com/codedeploy/latest/userguide/welcome.html', quote: 'CodeDeploy is a deployment service.' }],
    },
    s3: {
      id: 's3', name: 'Amazon S3', reading: 'エススリー', summary: 'データを保存するサービス。',
      features: [{ title: '保存', text: 'どんな量でも保存できる。' }], exam_points: ['複製の問題で出る。'], compare: [],
      references: [{ url: 'https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html', quote: 'Amazon S3 is an object storage service.' }],
    },
  },
};

// 構成図（A-0014）。1 問目にだけ付ける
export const DIAGRAM_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 120" width="300"><g data-service="AWS CodeDeploy" role="button" tabindex="0"><rect x="10" y="10" width="120" height="50" fill="#eef3fb"/><svg width="24" height="24" viewBox="0 0 64 64" x="14" y="14" data-testid="icon"><path d="M0,0 h64 v64 h-64 Z" fill="#C925D1"/></svg><text x="20" y="40">CodeDeploy</text></g><g data-service="AWS Unknown" role="button" tabindex="0"><rect x="160" y="10" width="120" height="50" fill="#eef3fb"/><text x="170" y="40">Unknown</text></g></svg>';
export const DATA_WITH_DIAGRAM = { ...DATA, questions: DATA.questions.map((q, i) => (i === 0 ? { ...q, diagram: { alt: '1 問目の構成図の説明。CodeDeploy で配る。' } } : q)) };
