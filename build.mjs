import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { site } from './site.config.mjs';
import { services } from './src/content/services.mjs';
import { layout, esc, abs } from './src/templates.mjs';
import {
  homePage,
  servicesHub,
  servicePage,
  casesPage,
  aboutPage,
  blogIndex,
  postPage,
  contactPage,
  privacyPage,
  notFoundPage,
} from './src/pages.mjs';

const root = process.cwd();
const dist = path.join(root, 'dist');
fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(path.join(dist, 'assets'), { recursive: true });

// 1. Copia public/ → dist/
function copyDir(src, dst) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dst, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dst, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}
copyDir(path.join(root, 'public'), dist);

// 2. Minifica CSS (inline) e gera JS com hash
const rawCss = fs.readFileSync(path.join(root, 'src/assets/main.css'), 'utf8');
const css = rawCss
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/\s+/g, ' ')
  .replace(/\s*([{:;,}])\s*/g, '$1')
  .replace(/;}/g, '}')
  .trim();

const rawJs = fs.readFileSync(path.join(root, 'src/assets/main.js'), 'utf8');
const jsHash = crypto.createHash('sha256').update(rawJs).digest('hex').slice(0, 8);
const jsFile = `main.${jsHash}.js`;
fs.writeFileSync(path.join(dist, 'assets', jsFile), rawJs);

// 3. Carrega posts e calcula wordCount + readingTime
const postsDir = path.join(root, 'src/content/posts');
const posts = [];
for (const file of fs.readdirSync(postsDir).filter((f) => f.endsWith('.mjs'))) {
  const { default: p } = await import(`file://${path.join(postsDir, file)}`);
  const plain = p.body.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const wordCount = plain ? plain.split(' ').length : 0;
  const readingTime = Math.max(1, Math.round(wordCount / 200));
  posts.push({ ...p, wordCount, readingTime });
}
posts.sort((a, b) => (b.date > a.date ? 1 : -1));

// 4. Monta todas as páginas
const pages = [
  homePage({ posts }),
  servicesHub(),
  ...services.map((s) => servicePage(s, { posts })),
  casesPage(),
  aboutPage(),
  blogIndex({ posts }),
  ...posts.map((p) => postPage(p, { posts })),
  contactPage(),
  privacyPage(),
  notFoundPage(),
];

for (const pg of pages) {
  const html = layout({ ...pg, services, css, jsFile });
  const relFile = pg.file || (pg.path === '/' ? 'index.html' : path.join(pg.path.slice(1), 'index.html'));
  const outFile = path.join(dist, relFile);
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, html, 'utf8');
}

// 5. sitemap.xml
const today = new Date().toISOString().slice(0, 10);
const sitemapItems = pages
  .filter((p) => p.sitemap !== false)
  .map((p) => {
    const loc = abs(p.path);
    const lastmod = p.lastmod || today;
    const priority = (p.priority ?? 0.5).toFixed(1);
    const changefreq = p.changefreq || 'monthly';
    return `  <url>
    <loc>${esc(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .join('\n');

fs.writeFileSync(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapItems}
</urlset>
`,
  'utf8'
);

// 6. robots.txt
fs.writeFileSync(
  path.join(dist, 'robots.txt'),
  `User-agent: *
Allow: /

Sitemap: ${site.url}/sitemap.xml
`,
  'utf8'
);

// 7. blog/rss.xml
const rssItems = posts
  .map(
    (p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${esc(abs(`/blog/${p.slug}/`))}</link>
      <guid isPermaLink="true">${esc(abs(`/blog/${p.slug}/`))}</guid>
      <pubDate>${new Date(`${p.date}T09:00:00-03:00`).toUTCString()}</pubDate>
      <description>${esc(p.description)}</description>
      <category>${esc(p.category)}</category>
    </item>`
  )
  .join('\n');

fs.mkdirSync(path.join(dist, 'blog'), { recursive: true });
fs.writeFileSync(
  path.join(dist, 'blog/rss.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Blog — ${esc(site.name)}</title>
    <link>${esc(abs('/blog/'))}</link>
    <atom:link href="${esc(abs('/blog/rss.xml'))}" rel="self" type="application/rss+xml"/>
    <description>${esc(site.description)}</description>
    <language>pt-BR</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${rssItems}
  </channel>
</rss>
`,
  'utf8'
);

// 8. manifest.webmanifest
fs.writeFileSync(
  path.join(dist, 'manifest.webmanifest'),
  JSON.stringify(
    {
      name: site.name,
      short_name: site.shortName,
      description: site.description,
      start_url: '/',
      display: 'standalone',
      background_color: site.themeColor,
      theme_color: site.themeColor,
      lang: site.lang,
      icons: [
        { src: '/assets/img/logo-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/assets/img/logo-512.png', sizes: '512x512', type: 'image/png' },
      ],
    },
    null,
    2
  ) + '\n',
  'utf8'
);

// 9. llms.txt — resumo para buscadores com IA (Google AI Overviews, ChatGPT, Perplexity)
fs.writeFileSync(
  path.join(dist, 'llms.txt'),
  `# ${site.name}

> ${site.description}

Fundador: ${site.founder.name} (${site.founder.jobTitle}). Sede em ${site.address.city}/${site.address.state}, atendimento em todo o Brasil. CNPJ ${site.cnpj}. Contato: ${site.phoneDisplay} · ${site.email}.

## Serviços
${services.map((s) => `- [${s.name}](${abs(`/servicos/${s.slug}/`)}): ${s.short}`).join('\n')}

## Páginas principais
- [Cases e resultados](${abs('/cases/')})
- [Sobre André Machado](${abs('/sobre/')})
- [Contato](${abs('/contato/')})

## Artigos
${posts.map((p) => `- [${p.title}](${abs(`/blog/${p.slug}/`)}): ${p.description}`).join('\n')}
`,
  'utf8'
);

console.log(`Build concluído: ${pages.length} páginas geradas em dist/ (CSS inline ${(css.length / 1024).toFixed(1)} KB, JS ${jsFile}).`);

