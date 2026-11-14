import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { services } from '../src/content/services.mjs';
import { site } from '../site.config.mjs';

const root = process.cwd();
const imgDir = path.join(root, 'public/assets/img');
const ogDir = path.join(root, 'public/og');
fs.mkdirSync(imgDir, { recursive: true });
fs.mkdirSync(ogDir, { recursive: true });

const escXml = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// 1. Retrato responsivo (5:6) a partir de assets-src/andre-original.png (1024x572)
// Recorte centralizado 5:6 (477x572) focado no retrato executivo, sem bordas laterais.
const srcPortrait = path.join(root, 'assets-src/andre-original.png');
const meta = await sharp(srcPortrait).metadata();
const cropW = Math.min(meta.width, Math.round((meta.height * 5) / 6));
const cropLeft = Math.max(0, Math.round((meta.width - cropW) / 2));

const basePortrait = sharp(srcPortrait).extract({
  left: cropLeft,
  top: 0,
  width: cropW,
  height: meta.height,
});

await basePortrait.clone().resize(600, 720).avif({ quality: 68 }).toFile(path.join(imgDir, 'andre-machado-consultor-dados.avif'));
await basePortrait.clone().resize(360, 432).avif({ quality: 66 }).toFile(path.join(imgDir, 'andre-machado-consultor-dados-360.avif'));
await basePortrait.clone().resize(600, 720).webp({ quality: 82 }).toFile(path.join(imgDir, 'andre-machado-consultor-dados.webp'));
await basePortrait.clone().resize(360, 432).webp({ quality: 80 }).toFile(path.join(imgDir, 'andre-machado-consultor-dados-360.webp'));
await basePortrait.clone().resize(600, 720).jpeg({ quality: 84, mozjpeg: true }).toFile(path.join(imgDir, 'andre-machado-consultor-dados.jpg'));

// 1b. Retrato 16:9 do topo (a partir de andre-source-2.jpg 1280x720, cortando 1088x612 do topo-esquerda para remover a marca d'água no canto inferior direito)
const srcHero = path.join(root, 'assets-src/andre-source-2.jpg');
const baseHero = sharp(srcHero).extract({ left: 0, top: 0, width: 1088, height: 612 });
await baseHero.clone().resize(960, 540).avif({ quality: 68 }).toFile(path.join(imgDir, 'andre-hero-16x9.avif'));
await baseHero.clone().resize(640, 360).avif({ quality: 66 }).toFile(path.join(imgDir, 'andre-hero-16x9-640.avif'));
await baseHero.clone().resize(960, 540).webp({ quality: 82 }).toFile(path.join(imgDir, 'andre-hero-16x9.webp'));
await baseHero.clone().resize(640, 360).webp({ quality: 80 }).toFile(path.join(imgDir, 'andre-hero-16x9-640.webp'));
await baseHero.clone().resize(960, 540).jpeg({ quality: 84, mozjpeg: true }).toFile(path.join(imgDir, 'andre-hero-16x9.jpg'));

// 1c. Marca bordada (1024x1024 -> recorte 920x580 centrado no bordado, removendo marca d'água no canto)
const srcBrand = path.join(root, 'assets-src/marca-bordada.jpg');
const baseBrand = sharp(srcBrand).extract({ left: 48, top: 210, width: 920, height: 580 });
await baseBrand.clone().resize(800, 504).avif({ quality: 68 }).toFile(path.join(imgDir, 'marca-bordada-andre-machado.avif'));
await baseBrand.clone().resize(480, 303).avif({ quality: 66 }).toFile(path.join(imgDir, 'marca-bordada-andre-machado-480.avif'));
await baseBrand.clone().resize(800, 504).webp({ quality: 82 }).toFile(path.join(imgDir, 'marca-bordada-andre-machado.webp'));
await baseBrand.clone().resize(480, 303).webp({ quality: 80 }).toFile(path.join(imgDir, 'marca-bordada-andre-machado-480.webp'));
await baseBrand.clone().resize(800, 504).jpeg({ quality: 84, mozjpeg: true }).toFile(path.join(imgDir, 'marca-bordada-andre-machado.jpg'));

// 2. Favicons & App Icons (Cubo isométrico adaptado à paleta do site: grafite/navy + dourado)
const cubeInner = `<polygon points="32,6 54.5,19 32,32 9.5,19" fill="#313f50"/>
  <polygon points="9.5,19 32,32 32,58 9.5,45" fill="#202a36"/>
  <polygon points="32,32 54.5,19 54.5,45 32,58" fill="#151c25"/>
  <path d="M32 6 54.5 19v26L32 58 9.5 45V19z" fill="none" stroke="#c9a84c" stroke-opacity="0.55" stroke-width="1.5" stroke-linejoin="round"/>
  <path d="M32 32V58M9.5 19 32 32 54.5 19" fill="none" stroke="#080b0f" stroke-width="1.8" stroke-linejoin="round"/>
  <path d="M20.8 25.5 32 19l11.2 6.5v13L32 45l-11.2-6.5z" fill="none" stroke="#e8c97a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="32" cy="19" r="3.6" fill="#e8c97a"/>
  <circle cx="20.8" cy="38.5" r="3.6" fill="#e8c97a"/>
  <circle cx="43.2" cy="38.5" r="3.6" fill="#e8c97a"/>`;

const brandSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">${cubeInner}</svg>`;

fs.writeFileSync(path.join(root, 'public/favicon.svg'), brandSvg);
await sharp(Buffer.from(brandSvg)).resize(180, 180).png().toFile(path.join(root, 'public/apple-touch-icon.png'));
await sharp(Buffer.from(brandSvg)).resize(192, 192).png().toFile(path.join(imgDir, 'logo-192.png'));
await sharp(Buffer.from(brandSvg)).resize(512, 512).png().toFile(path.join(imgDir, 'logo-512.png'));

// ICO 32x32 (PNG encapsulado em cabeçalho ICO padrão)
const png32 = await sharp(Buffer.from(brandSvg)).resize(32, 32).png().toBuffer();
const icoHeader = Buffer.alloc(22);
icoHeader.writeUInt16LE(0, 0); // reserved
icoHeader.writeUInt16LE(1, 2); // type = 1 (icon)
icoHeader.writeUInt16LE(1, 4); // count = 1
icoHeader.writeUInt8(32, 6); // width
icoHeader.writeUInt8(32, 7); // height
icoHeader.writeUInt8(0, 8); // color palette
icoHeader.writeUInt8(0, 9); // reserved
icoHeader.writeUInt16LE(1, 10); // planes
icoHeader.writeUInt16LE(32, 12); // bpp
icoHeader.writeUInt32LE(png32.length, 14); // size
icoHeader.writeUInt32LE(22, 18); // offset
fs.writeFileSync(path.join(root, 'public/favicon.ico'), Buffer.concat([icoHeader, png32]));

// 3. Gerador de imagens Open Graph (1200x630 PNG)
function wrapLines(text, maxChars = 34, maxLines = 3) {
  const words = text.split(/\s+/);
  const lines = [];
  let cur = '';
  for (const w of words) {
    if ((cur + ' ' + w).trim().length <= maxChars) {
      cur = (cur + ' ' + w).trim();
    } else {
      if (cur) lines.push(cur);
      cur = w;
      if (lines.length === maxLines - 1) break;
    }
  }
  if (cur && lines.length < maxLines) lines.push(cur);
  return lines;
}

const thumbBuf = await basePortrait.clone().resize(300, 360).png().toBuffer();
const thumbDataUri = `data:image/png;base64,${thumbBuf.toString('base64')}`;

async function makeOg(filename, { kicker, title, subtitle }) {
  const lines = wrapLines(title, 25, 3);
  const titleTspans = lines
    .map((l, i) => `<tspan x="80" dy="${i === 0 ? 0 : 54}">${escXml(l)}</tspan>`)
    .join('');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#080b0f"/>
        <stop offset="100%" stop-color="#111820"/>
      </linearGradient>
      <radialGradient id="glow" cx="0.2" cy="0.2" r="0.7">
        <stop offset="0%" stop-color="#c9a84c" stop-opacity="0.18"/>
        <stop offset="100%" stop-color="#080b0f" stop-opacity="0"/>
      </radialGradient>
      <clipPath id="pclip"><rect x="820" y="120" width="300" height="360" rx="20"/></clipPath>
    </defs>
    <rect width="1200" height="630" fill="url(#bg)"/>
    <rect width="1200" height="630" fill="url(#glow)"/>
    <rect x="28" y="28" width="1144" height="574" rx="20" fill="none" stroke="#242c38" stroke-width="2"/>
    <g transform="translate(80,76)">
      <g transform="scale(0.82)">${cubeInner}</g>
      <text x="64" y="22" fill="#ffffff" font-family="Arial, sans-serif" font-size="22" font-weight="700">André Machado</text>
      <text x="64" y="43" fill="#c9a84c" font-family="Arial, sans-serif" font-size="12" letter-spacing="4">CONSULTORIA DE DADOS &amp; IA</text>
    </g>
    <text x="80" y="190" fill="#c9a84c" font-family="Arial, sans-serif" font-size="16" font-weight="700" letter-spacing="3">${escXml(kicker.toUpperCase())}</text>
    <text x="80" y="254" fill="#ffffff" font-family="Arial, sans-serif" font-size="44" font-weight="700">${titleTspans}</text>
    <text x="80" y="476" fill="#b9b1a4" font-family="Arial, sans-serif" font-size="20">${escXml(subtitle)}</text>
    <text x="80" y="556" fill="#8d877d" font-family="Arial, sans-serif" font-size="17">Porto Alegre · RS · Atendimento em todo o Brasil · CNPJ ${site.cnpj}</text>
    <rect x="808" y="108" width="300" height="360" rx="20" fill="none" stroke="#c9a84c" stroke-opacity="0.45" stroke-width="2"/>
    <image href="${thumbDataUri}" x="820" y="120" width="300" height="360" clip-path="url(#pclip)"/>
    <rect x="820" y="120" width="300" height="360" rx="20" fill="none" stroke="#2c3744" stroke-width="2"/>
  </svg>`;

  await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(path.join(ogDir, filename));
}

await makeOg('default.png', {
  kicker: 'Porto Alegre · Remoto Brasil',
  title: 'Power BI, Engenharia de Dados e IA',
  subtitle: 'Dashboards executivos, Databricks, Microsoft Fabric e automação.',
});
await makeOg('cases.png', {
  kicker: 'Portfólio de resultados',
  title: 'Cases de Dados, BI e IA em Produção',
  subtitle: '1,5 bi de linhas migradas, supply chain em 30 min e +10 mil processos.',
});
await makeOg('sobre.png', {
  kicker: 'Especialista PUCRS · 15+ anos',
  title: 'Sobre André Machado',
  subtitle: 'Consultor Sênior de Dados, Analytics e Inteligência Artificial.',
});
await makeOg('blog.png', {
  kicker: 'Artigos e guias técnicos',
  title: 'Blog: Dados, BI e IA na Prática',
  subtitle: 'Power BI, migração Qlik, Lakehouse e IA generativa para empresas.',
});
await makeOg('contato.png', {
  kicker: 'Diagnóstico sem compromisso',
  title: 'Fale com a André Machado Consultoria',
  subtitle: 'WhatsApp (51) 99883-7555 · Porto Alegre e todo o Brasil.',
});

for (const s of services) {
  await makeOg(`servico-${s.slug}.png`, {
    kicker: s.kicker,
    title: s.name,
    subtitle: s.short,
  });
}

const postsDir = path.join(root, 'src/content/posts');
for (const file of fs.readdirSync(postsDir).filter((f) => f.endsWith('.mjs'))) {
  const { default: post } = await import(`file://${path.join(postsDir, file)}`);
  await makeOg(`blog-${post.slug}.png`, {
    kicker: `Blog · ${post.category}`,
    title: post.title,
    subtitle: 'André Machado Consultoria · Porto Alegre & Brasil',
  });
}

console.log('Assets gerados com sucesso.');
