// e2e の問題（本物の bank に頼らない）。1 つ選ぶ・複数選ぶ・確信が低い、を 1 問ずつ。
const base = {
  task: '1.4', domain: 1, services: ['AWS CodeDeploy'],
  explanation: { summary: '要約', per_choice: {} },
  references: [{ url: 'https://docs.aws.amazon.com/codedeploy/latest/userguide/welcome.html', quote: 'CodeDeploy is a deployment service.' }],
  low_confidence: false,
};
const choices = (n) => ['A', 'B', 'C', 'D', 'E'].slice(0, n).map((k) => ({ key: k, text: `Choice ${k} text for the question that is long enough to wrap on a phone screen.` }));
const per = (n) => Object.fromEntries(['A', 'B', 'C', 'D', 'E'].slice(0, n).map((k) => [k, `解説 ${k}`]));

export const DATA = {
  exam: 'DOP-C02',
  domains: { 1: { name: 'SDLC Automation', weight: 0.22 }, 6: { name: 'Security and Compliance', weight: 0.17 } },
  count: 3,
  questions: [
    { ...base, id: 'q-1.4-0001', type: 'single', select_count: 1, stem: 'First question stem. Which solution meets the requirements with the LEAST operational effort?', choices: choices(4), answer: ['B'], explanation: { summary: '要約 1', per_choice: per(4) }, note: '試験の時点では古い名前の可能性がある。A long note that should wrap on a narrow phone screen without overflowing.' },
    { ...base, id: 'q-1.4-0002', type: 'multi', select_count: 2, stem: 'Second question stem. Which steps should be taken? (Choose TWO.)', choices: choices(5), answer: ['A', 'D'], explanation: { summary: '要約 2', per_choice: per(5) } },
    { ...base, id: 'q-1.4-0003', type: 'single', select_count: 1, stem: 'Third question stem. Which option is the MOST cost-effective?', choices: choices(4), answer: ['C'], explanation: { summary: '要約 3', per_choice: per(4) }, low_confidence: true },
  ],
};
