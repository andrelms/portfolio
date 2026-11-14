// Componentes e layout base (HTML semântico, schema.org, meta tags).
import { site, waLink } from '../site.config.mjs';

export const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const abs = (p = '/') => (p.startsWith('http') ? p : site.url + p);

// ---------- Ícones (stroke, 24x24) ----------
const paths = {
  chart: '<path d="M3 3v18h18"/><rect x="7" y="12" width="3" height="6" rx="1"/><rect x="12" y="8" width="3" height="10" rx="1"/><rect x="17" y="4" width="3" height="14" rx="1"/>',
  layers: '<path d="m12 2 9 5-9 5-9-5 9-5z"/><path d="m3 12 9 5 9-5"/><path d="m3 17 9 5 9-5"/>',
  migrate: '<path d="M4 7h11l-3-3"/><path d="M20 17H9l3 3"/><rect x="2" y="10" width="7" height="4" rx="1"/><rect x="15" y="10" width="7" height="4" rx="1"/>',
  spark: '<path d="M12 3v3M12 18v3M3 12h3M18 12h3"/><path d="M12 7.5 13.6 10.4 16.5 12l-2.9 1.6L12 16.5l-1.6-2.9L7.5 12l2.9-1.6z"/><path d="m5.6 5.6 1.4 1.4M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4"/>',
  bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z"/>',
  cap: '<path d="m2 9 10-5 10 5-10 5-10-5z"/><path d="M6 11v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5"/><path d="M22 9v6"/>',
  arrow: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  alert: '<circle cx="12" cy="12" r="9"/><path d="M12 8v4M12 16h.01"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>',
  pin: '<path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
  doc: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
};
export const icon = (name, cls = '') =>
  `<svg${cls ? ` class="${cls}"` : ''} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${paths[name] || ''}</svg>`;

const brandPaths = {
  whatsapp: '<path fill="currentColor" d="M17.5 14.4c-.3-.1-1.8-.9-2-1s-.5-.1-.7.1-.8 1-1 1.2-.4.2-.7.1a8.2 8.2 0 0 1-4-3.5c-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6a1.2 1.2 0 0 0-.9.4 3.7 3.7 0 0 0-1.1 2.7 6.5 6.5 0 0 0 1.3 3.4 14.8 14.8 0 0 0 5.7 5c2.1.9 2.9 1 4 .8a3.4 3.4 0 0 0 2.2-1.6 2.8 2.8 0 0 0 .2-1.6c-.1-.1-.3-.2-.6-.3zM12 21.8a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4a9.8 9.8 0 1 1 8.3 4.6zm8.4-18.3A11.8 11.8 0 0 0 1.8 17.8L.1 24l6.4-1.7a11.8 11.8 0 0 0 5.6 1.4A11.8 11.8 0 0 0 20.4 3.5z"/>',
  linkedin: '<path fill="currentColor" d="M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.3V9h3.4v1.6h.1a3.8 3.8 0 0 1 3.4-1.9c3.6 0 4.3 2.4 4.3 5.5zM5.3 7.4a2.1 2.1 0 1 1 0-4.1 2.1 2.1 0 0 1 0 4.1zM7.1 20.5H3.6V9h3.5zM22.2 0H1.8A1.8 1.8 0 0 0 0 1.7v20.6A1.8 1.8 0 0 0 1.8 24h20.4a1.8 1.8 0 0 0 1.8-1.7V1.7A1.8 1.8 0 0 0 22.2 0z"/>',
  github: '<path fill="currentColor" d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.6-1.4-1.4-1.8-1.4-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.6 1.6.2 2.8.1 3.2.8.8 1.3 1.9 1.3 3.1 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3"/>',
  youtube: '<path fill="currentColor" d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8zM9.6 15.6V8.4l6.3 3.6z"/>',
};
export const brand = (name) => `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${brandPaths[name]}</svg>`;

export const logoMark = `<svg class="brand-mark" viewBox="0 0 64 64" aria-hidden="true" focusable="false"><polygon points="32,6 54.5,19 32,32 9.5,19" fill="#313f50"/><polygon points="9.5,19 32,32 32,58 9.5,45" fill="#202a36"/><polygon points="32,32 54.5,19 54.5,45 32,58" fill="#151c25"/><path d="M32 6 54.5 19v26L32 58 9.5 45V19z" fill="none" stroke="#c9a84c" stroke-opacity=".55" stroke-width="1.5" stroke-linejoin="round"/><path d="M32 32V58M9.5 19 32 32 54.5 19" fill="none" stroke="#080b0f" stroke-width="1.8" stroke-linejoin="round"/><path d="M20.8 25.5 32 19l11.2 6.5v13L32 45l-11.2-6.5z" fill="none" stroke="#e8c97a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><circle cx="32" cy="19" r="3.6" fill="#e8c97a"/><circle cx="20.8" cy="38.5" r="3.6" fill="#e8c97a"/><circle cx="43.2" cy="38.5" r="3.6" fill="#e8c97a"/></svg>`;

// ---------- Imagem responsiva do fundador ----------
export const heroVideo = () => `
<video autoplay muted loop playsinline preload="metadata" poster="/assets/img/andre-hero-9x16-poster.jpg" width="540" height="960" aria-label="André Machado em seu escritório, consultor de dados e IA">
  <source src="/assets/video/andre-hero-9x16.mp4" type="video/mp4">
</video>`;

export const heroPortrait = ({ sizes = '(max-width: 920px) 92vw, 520px', alt } = {}) => `
<picture>
  <source type="image/avif" srcset="/assets/img/andre-hero-16x9-640.avif 640w, /assets/img/andre-hero-16x9.avif 960w" sizes="${sizes}">
  <source type="image/webp" srcset="/assets/img/andre-hero-16x9-640.webp 640w, /assets/img/andre-hero-16x9.webp 960w" sizes="${sizes}">
  <img src="/assets/img/andre-hero-16x9.jpg" width="960" height="540" alt="${esc(alt || 'André Machado, consultor de dados e IA em Porto Alegre')}" fetchpriority="high" decoding="async">
</picture>`;

export const brandEmbroidery = ({ sizes = '(max-width: 920px) 92vw, 460px' } = {}) => `
<picture>
  <source type="image/avif" srcset="/assets/img/marca-bordada-andre-machado-480.avif 480w, /assets/img/marca-bordada-andre-machado.avif 800w" sizes="${sizes}">
  <source type="image/webp" srcset="/assets/img/marca-bordada-andre-machado-480.webp 480w, /assets/img/marca-bordada-andre-machado.webp 800w" sizes="${sizes}">
  <img src="/assets/img/marca-bordada-andre-machado.jpg" width="800" height="504" alt="Marca bordada André Machado — Data &amp; Analytics com cubo isométrico" loading="lazy" decoding="async">
</picture>`;

export const portrait = ({ eager = false, sizes = '(max-width: 920px) 90vw, 440px', alt, cls = '' } = {}) => `
<picture>
  <source type="image/avif" srcset="/assets/img/andre-machado-consultor-dados-360.avif 360w, /assets/img/andre-machado-consultor-dados.avif 600w" sizes="${sizes}">
  <source type="image/webp" srcset="/assets/img/andre-machado-consultor-dados-360.webp 360w, /assets/img/andre-machado-consultor-dados.webp 600w" sizes="${sizes}">
  <img${cls ? ` class="${cls}"` : ''} src="/assets/img/andre-machado-consultor-dados.jpg" width="600" height="720" alt="${esc(alt || 'André Machado, consultor de dados e IA em Porto Alegre')}" ${eager ? 'fetchpriority="high" decoding="async"' : 'loading="lazy" decoding="async"'}>
</picture>`;

// ---------- Navegação ----------
export const nav = [
  { href: '/servicos/', label: 'Serviços' },
  { href: '/cases/', label: 'Cases' },
  { href: '/sobre/', label: 'Sobre' },
  { href: '/blog/', label: 'Blog' },
  { href: '/contato/', label: 'Contato' },
];

const header = (path) => `
<a class="skip" href="#conteudo">Pular para o conteúdo</a>
<header class="site-header">
  <div class="container nav">
    <a class="brand" href="/" aria-label="${esc(site.name)} —  página inicial">
      ${logoMark}
      <span class="brand-text"><strong>André Machado</strong><span>Consultoria</span></span>
    </a>
    <button class="menu-toggle" type="button" aria-controls="menu" aria-expanded="false" aria-label="Abrir menu">${icon('menu')}</button>
    <nav aria-label="Principal">
      <ul class="menu" id="menu">
        ${nav
          .map((n) => {
            const current = path === n.href || (n.href !== '/' && path.startsWith(n.href));
            return `<li><a href="${n.href}"${current ? ' aria-current="page"' : ''}>${n.label}</a></li>`;
          })
          .join('')}
        <li class="nav-cta"><a class="btn btn-primary btn-sm" href="${waLink()}" target="_blank" rel="noopener">${brand('whatsapp')}Falar no WhatsApp</a></li>
      </ul>
    </nav>
  </div>
</header>`;

const footer = (services) => `
<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-about">
        <a class="brand" href="/" aria-label="${esc(site.name)}">${logoMark}<span class="brand-text"><strong>André Machado</strong><span>Consultoria</span></span></a>
        <p>Consultoria de dados, Power BI, engenharia de dados e IA generativa. ${esc(site.slogan)}</p>
        <div class="social">
          <a href="${site.social.linkedinCompany}" target="_blank" rel="noopener" aria-label="LinkedIn da empresa">${brand('linkedin')}</a>
          <a href="${site.social.github}" target="_blank" rel="noopener" aria-label="GitHub">${brand('github')}</a>
          <a href="${site.social.youtube}" target="_blank" rel="noopener" aria-label="YouTube">${brand('youtube')}</a>
          <a href="${waLink()}" target="_blank" rel="noopener" aria-label="WhatsApp">${brand('whatsapp')}</a>
        </div>
      </div>
      <div>
        <h2>Serviços</h2>
        <ul>${services.map((s) => `<li><a href="/servicos/${s.slug}/">${esc(s.name)}</a></li>`).join('')}</ul>
      </div>
      <div>
        <h2>Empresa</h2>
        <ul>
          <li><a href="/sobre/">Sobre André Machado</a></li>
          <li><a href="/cases/">Cases e resultados</a></li>
          <li><a href="/blog/">Blog</a></li>
          <li><a href="/contato/">Contato</a></li>
          <li><a href="/politica-de-privacidade/">Política de privacidade</a></li>
        </ul>
      </div>
      <div>
        <h2>Contato</h2>
        <address>
          <a href="tel:${site.phoneE164}">${site.phoneDisplay}</a><br>
          <a href="mailto:${site.email}">${site.email}</a><br>
          ${site.address.neighborhood}, ${site.address.city} —  ${site.address.state}<br>
          CEP ${site.address.postalCode}<br>
          Atendimento em todo o Brasil
        </address>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© ${new Date().getFullYear()} ${esc(site.name)} · ${esc(site.legalName)} · CNPJ ${site.cnpj}</span>
      <span>Porto Alegre · RS · Brasil</span>
    </div>
  </div>
</footer>
<a class="wa-float" href="${waLink()}" target="_blank" rel="noopener" aria-label="Conversar no WhatsApp">${brand('whatsapp')}</a>`;

export const breadcrumbHtml = (items) => `
<nav class="breadcrumb" aria-label="Você está em">
  <ol>${items
    .map((it, i) =>
      i === items.length - 1
        ? `<li><span aria-current="page">${esc(it.name)}</span></li>`
        : `<li><a href="${it.path}">${esc(it.name)}</a></li>`
    )
    .join('')}</ol>
</nav>`;

// ---------- schema.org ----------
export const orgId = `${site.url}/#organization`;
export const personId = `${site.url}/#andre-machado`;
export const websiteId = `${site.url}/#website`;

export const baseGraph = (services) => [
  {
    '@type': ['ProfessionalService', 'Organization'],
    '@id': orgId,
    name: site.name,
    legalName: site.legalName,
    alternateName: ['André Machado', 'Andre Machado Consultoria'],
    description: site.description,
    slogan: site.slogan,
    url: site.url + '/',
    logo: { '@type': 'ImageObject', url: abs('/assets/img/logo-512.png'), width: 512, height: 512 },
    image: abs('/og/default.png'),
    email: site.email,
    telephone: site.phoneE164,
    taxID: site.cnpj,
    foundingDate: site.foundingDate,
    founder: { '@id': personId },
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
      streetAddress: `Bairro ${site.address.neighborhood}`,
    },
    areaServed: [
      { '@type': 'City', name: 'Porto Alegre' },
      { '@type': 'State', name: 'Rio Grande do Sul' },
      { '@type': 'Country', name: 'Brasil' },
    ],
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: site.openingHours.opens,
      closes: site.openingHours.closes,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      telephone: site.phoneE164,
      email: site.email,
      areaServed: 'BR',
      availableLanguage: ['Portuguese', 'English'],
    },
    knowsAbout: ['Power BI', 'Excel Avançado', 'VBA', 'Business Intelligence', 'Engenharia de Dados', 'Databricks', 'Microsoft Fabric', 'Lakehouse', 'Qlik', 'Inteligência Artificial', 'LLMs', 'Python', 'Automação de processos', 'LGPD'],
    sameAs: [site.social.linkedinCompany, site.social.github, site.social.youtube],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Serviços de dados e IA',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', '@id': `${site.url}/servicos/${s.slug}/#service`, name: s.name, url: `${site.url}/servicos/${s.slug}/` },
      })),
    },
  },
  {
    '@type': 'Person',
    '@id': personId,
    name: site.founder.name,
    alternateName: site.founder.alternateName,
    jobTitle: site.founder.jobTitle,
    image: abs(site.founder.image),
    url: `${site.url}/sobre/`,
    worksFor: { '@id': orgId },
    alumniOf: [
      { '@type': 'CollegeOrUniversity', name: 'Pontifícia Universidade Católica do Rio Grande do Sul (PUCRS)' },
      { '@type': 'CollegeOrUniversity', name: 'Centro Universitário Leonardo da Vinci (UNIASSELVI)' },
    ],
    hasCredential: [
      { '@type': 'EducationalOccupationalCredential', name: 'Especialização em Ciência de Dados e Inteligência Artificial', credentialCategory: 'Pós-graduação lato sensu', recognizedBy: { '@type': 'CollegeOrUniversity', name: 'PUCRS' } },
      { '@type': 'EducationalOccupationalCredential', name: 'Bacharelado em Administração', credentialCategory: 'Graduação', recognizedBy: { '@type': 'CollegeOrUniversity', name: 'UNIASSELVI' } },
    ],
    knowsAbout: ['Power BI', 'DAX', 'Excel Avançado', 'VBA', 'Databricks', 'Microsoft Fabric', 'Python', 'SQL', 'Azure', 'Google Cloud', 'LLMs', 'Ciência de Dados'],
    homeLocation: { '@type': 'Place', name: 'Porto Alegre, RS, Brasil' },
    sameAs: [site.social.linkedin, site.social.github, site.social.youtube],
  },
  {
    '@type': 'WebSite',
    '@id': websiteId,
    url: site.url + '/',
    name: site.name,
    description: site.description,
    inLanguage: site.lang,
    publisher: { '@id': orgId },
  },
];

export const breadcrumbLd = (items, url) => ({
  '@type': 'BreadcrumbList',
  '@id': `${url}#breadcrumb`,
  itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: abs(it.path) })),
});

export const faqLd = (faq, url) => ({
  '@type': 'FAQPage',
  '@id': `${url}#faq`,
  mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
});

export const faqHtml = (faq, cls = '') => `
<div class="faq ${cls}">
  ${faq
    .map(
      (f, i) => `<details${i === 0 ? ' open' : ''}><summary>${esc(f.q)}</summary><div class="answer"><p>${esc(f.a)}</p></div></details>`
    )
    .join('')}
</div>`;

export const ctaBand = ({ title = 'Vamos transformar seus dados em decisão?', text = 'Conte o seu desafio. Em uma conversa de 30 minutos, sem compromisso, eu indico o melhor caminho —  mesmo que não seja comigo.', msg } = {}) => `
<section class="section" aria-labelledby="cta-title">
  <div class="container">
    <div class="cta-band reveal">
      <div>
        <h2 id="cta-title">${title}</h2>
        <p>${text}</p>
      </div>
      <div class="cta-row">
        <a class="btn btn-primary" href="${waLink(msg)}" target="_blank" rel="noopener">${brand('whatsapp')}Conversar no WhatsApp</a>
        <a class="btn btn-ghost" href="/contato/">Outras formas de contato</a>
      </div>
    </div>
  </div>
</section>`;

// ---------- Layout ----------
export function layout({
  path,
  title,
  description,
  body,
  services,
  graph = [],
  ogImage = '/og/default.png',
  ogType = 'website',
  article,
  noindex = false,
  css,
  jsFile,
  preloadPortrait = false,
}) {
  const url = abs(path);
  const ld = { '@context': 'https://schema.org', '@graph': [...baseGraph(services), ...graph] };
  const v = site.verification;
  return `<!doctype html>
<html lang="${site.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
${noindex ? '<meta name="robots" content="noindex, follow">' : '<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">'}
${noindex ? '' : `<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="pt-BR" href="${url}">
<link rel="alternate" hreflang="x-default" href="${url}">`}
<meta name="author" content="${esc(site.founder.name)}">
<meta name="theme-color" content="${site.themeColor}">
<meta name="color-scheme" content="dark">
<meta name="format-detection" content="telephone=no">
<meta name="geo.region" content="BR-RS">
<meta name="geo.placename" content="Porto Alegre">
${v.google ? `<meta name="google-site-verification" content="${esc(v.google)}">` : ''}
${v.bing ? `<meta name="msvalidate.01" content="${esc(v.bing)}">` : ''}
<meta property="og:type" content="${ogType}">
<meta property="og:locale" content="${site.locale}">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${abs(ogImage)}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(title)}">
${article ? `<meta property="article:published_time" content="${article.date}T09:00:00-03:00">
<meta property="article:modified_time" content="${article.updated}T09:00:00-03:00">
<meta property="article:author" content="${abs('/sobre/')}">
<meta property="article:section" content="${esc(article.category)}">` : ''}
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${abs(ogImage)}">
<link rel="preload" href="/assets/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/cormorant-garamond.woff2" as="font" type="font/woff2" crossorigin>
${preloadPortrait ? '<link rel="preload" as="image" href="/assets/img/andre-hero-9x16-poster.jpg" fetchpriority="high">' : ''}
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/manifest.webmanifest">
<link rel="alternate" type="application/rss+xml" title="Blog —  ${esc(site.name)}" href="/blog/rss.xml">
<style>${css}</style>
<script src="/assets/${jsFile}" defer></script>
<script type="application/ld+json">${JSON.stringify(ld).replace(/</g, '\\u003c')}</script>
</head>
<body>
${header(path)}
<main id="conteudo">
${body}
</main>
${footer(services)}
</body>
</html>`;
}
