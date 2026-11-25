// JSON Schema（draft 2020-12）のうち、schemas/ で使う語だけを確かめる小さな検査。
// 依存を増やさないために自前で持つ。使っていない語が schemas/ に増えたら unsupported として失敗させる。

const SUPPORTED = new Set([
  '$schema', '$id', '$comment', 'title', 'description', 'default',
  'type', 'enum', 'const', 'required', 'properties', 'additionalProperties', 'propertyNames',
  'items', 'minItems', 'maxItems', 'uniqueItems',
  'minLength', 'maxLength', 'pattern', 'format', 'minimum', 'maximum',
]);

const DATE = /^\d{4}-\d{2}-\d{2}$/;

function typeOf(v) {
  if (v === null) return 'null';
  if (Array.isArray(v)) return 'array';
  if (Number.isInteger(v)) return 'integer';
  return typeof v;
}

function typeMatches(want, v) {
  const got = typeOf(v);
  return want === got || (want === 'number' && got === 'integer');
}

/** @returns {{pointer: string, message: string}[]} */
export function validate(schema, value, pointer = '') {
  const errors = [];
  const err = (message, p = pointer) => errors.push({ pointer: p || '/', message });

  for (const key of Object.keys(schema)) {
    if (!SUPPORTED.has(key)) err(`スキーマの語 ${key} はこの検査では未対応`);
  }
  if (schema.type) {
    const types = [].concat(schema.type);
    if (!types.some((t) => typeMatches(t, value))) { err(`型が ${types.join('|')} でない（${typeOf(value)}）`); return errors; }
  }
  if (schema.enum && !schema.enum.some((e) => e === value)) err(`${JSON.stringify(value)} は ${JSON.stringify(schema.enum)} のどれでもない`);
  if ('const' in schema && schema.const !== value) err(`${JSON.stringify(schema.const)} でない`);

  if (typeof value === 'string') {
    if (schema.minLength !== undefined && [...value].length < schema.minLength) err(`${schema.minLength} 文字未満`);
    if (schema.maxLength !== undefined && [...value].length > schema.maxLength) err(`${schema.maxLength} 文字を超える（${[...value].length}）`);
    if (schema.pattern && !new RegExp(schema.pattern, 'u').test(value)) err(`形が /${schema.pattern}/ に合わない: ${value.slice(0, 60)}`);
    if (schema.format === 'date' && !DATE.test(value)) err('日付（YYYY-MM-DD）でない');
  }
  if (typeof value === 'number') {
    if (schema.minimum !== undefined && value < schema.minimum) err(`${schema.minimum} 未満`);
    if (schema.maximum !== undefined && value > schema.maximum) err(`${schema.maximum} を超える`);
  }
  if (Array.isArray(value)) {
    if (schema.minItems !== undefined && value.length < schema.minItems) err(`要素が ${schema.minItems} 個未満`);
    if (schema.maxItems !== undefined && value.length > schema.maxItems) err(`要素が ${schema.maxItems} 個を超える`);
    if (schema.uniqueItems && new Set(value.map((v) => JSON.stringify(v))).size !== value.length) err('要素が重複している');
    if (schema.items) value.forEach((v, i) => errors.push(...validate(schema.items, v, `${pointer}/${i}`)));
  }
  if (typeOf(value) === 'object') {
    for (const r of schema.required ?? []) if (!(r in value)) err(`${r} が無い`);
    for (const [k, v] of Object.entries(value)) {
      const p = `${pointer}/${k}`;
      if (schema.propertyNames) {
        const e = validate(schema.propertyNames, k, p);
        if (e.length) err(`鍵 ${k} が使えない: ${e[0].message}`, p);
      }
      if (schema.properties && k in schema.properties) errors.push(...validate(schema.properties[k], v, p));
      else if (schema.additionalProperties === false) err(`${k} はスキーマに無い項目`, p);
      else if (typeof schema.additionalProperties === 'object') errors.push(...validate(schema.additionalProperties, v, p));
    }
  }
  return errors;
}
