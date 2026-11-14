import fs from 'node:fs';
import path from 'node:path';
import { site } from '../site.config.mjs';

const dist = path.join(process.cwd(), 'dist');
const errors = [];
const warnings = [];

function walk(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}

const htmlFiles = walk(dist);
const seenTitles = new Map();
const seenDescs = new Map();

for (const file of htmlFiles) {
  const rel = path.relative(dist, file).replace(/\\/g, '/');
  const html = fs.readFileSync(file, 'utf8');
  const is404 = rel === '404.html';

  // 1. Title & Description
  const titleMatch = html.match(/<title>(.*?)<\/title>/);
  const descMatch = html.match(/<meta name="description" content="([^"]*)"/);
  if (!titleMatch || !titleMatch[1].trim()) errors.push(`${rel}: sem <title>`);
  else {
    const t = titleMatch[1];
    if (t.length > 68) warnings.push(`${rel}: <title> longo (${t.length} chars): ${t}`);
    if (seenTitles.has(t)) errors.push(`${rel}: <title> duplicado com ${seenTitles.get(t)}`);
    seenTitles.set(t, rel);
  }
  if (!descMatch || !descMatch[1].trim()) errors.push(`${rel}: sem meta description`);
  else {
    const d = descMatch[1];
    if (!is404 && (d.length < 70 || d.length > 160)) warnings.push(`${rel}: meta description (${d.length} chars)`);
    if (seenDescs.has(d)) errors.push(`${rel}: meta description duplicada com ${seenDescs.get(d)}`);
    seenDescs.set(d, rel);
  }

  // 2. Single H1
  const h1s = [...html.matchAll(/<h1[\s>]/g)];
  if (h1s.length !== 1) errors.push(`${rel}: esperado 1 <h1>, encontrado ${h1s.length}`);

  // 3. Canonical & OG & JSON-LD
  if (!is404) {
    const can = html.match(/<link rel="canonical" href="([^"]+)"/);
    if (!can || !can[1].startsWith(site.url)) errors.push(`${rel}: canonical inválido`);
    if (!html.includes('property="og:image"')) errors.push(`${rel}: sem og:image`);
  }
  const ldMatches = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (!ldMatches.length) errors.push(`${rel}: sem JSON-LD`);
  for (const m of ldMatches) {
    try { JSON.parse(m[1]); } catch (e) { errors.push(`${rel}: JSON-LD inválido: ${e.message}`); }
  }

  // 4. Imagens com alt e dimensões
  for (const img of html.matchAll(/<img\b([^>]*)>/g)) {
    const attrs = img[1];
    if (!/\balt="/.test(attrs)) errors.push(`${rel}: <img> sem atributo alt`);
    if (!/\bwidth="/.test(attrs) || !/\bheight="/.test(attrs)) warnings.push(`${rel}: <img> sem width/height explícito`);
  }

  // 5. Mojibake / encoding UTF-8 corrompido
  const badEnc = html.match(/Ã[§£¡©ª³ºµ]|â€|\uFFFD/g);
  if (badEnc) errors.push(`${rel}: possível erro de encoding UTF-8 (${[...new Set(badEnc)].join(', ')})`);

  // 6. Links internos e assets locais existem em dist/
  for (const ref of html.matchAll(/\b(?:href|src)="(\/[^"#?]+)(?:[#?][^"]*)?"/g)) {
    const target = ref[1];
    const diskPath = target.endsWith('/')
      ? path.join(dist, target.slice(1), 'index.html')
      : path.join(dist, target.slice(1));
    if (!fs.existsSync(diskPath)) {
      errors.push(`${rel}: referência quebrada -> ${target}`);
    }
  }
}

// 6. Arquivos raiz essenciais
for (const reqFile of ['robots.txt', 'sitemap.xml', 'blog/rss.xml', 'manifest.webmanifest', 'favicon.ico', 'favicon.svg', 'apple-touch-icon.png', 'og/default.png']) {
  if (!fs.existsSync(path.join(dist, reqFile))) errors.push(`Arquivo obrigatório ausente em dist/: ${reqFile}`);
}

console.log(`Verificação SEO: ${htmlFiles.length} HTMLs analisados.`);
if (warnings.length) {
  console.log(`\nAvisos (${warnings.length}):`);
  for (const w of warnings) console.log('  ⚠', w);
}
if (errors.length) {
  console.error(`\nErros (${errors.length}):`);
  for (const e of errors) console.error('  ✖', e);
  process.exit(1);
}
console.log('Tudo OK: 0 erros.');
