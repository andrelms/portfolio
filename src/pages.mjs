// Páginas do site. Cada função retorna { path, title, description, body, graph, ... }.
import { site, waLink } from '../site.config.mjs';
import { services, serviceBySlug } from './content/services.mjs';
import { cases, caseBySlug } from './content/cases.mjs';
import {
  esc, abs, icon, brand, heroVideo, brandEmbroidery, portrait, breadcrumbHtml, breadcrumbLd, faqLd, faqHtml, ctaBand,
  orgId, personId, websiteId,
} from './templates.mjs';

const fmtDate = (iso) =>
  new Date(iso + 'T12:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });

const webPage = (path, name, description, type = 'WebPage', extra = {}) => ({
  '@type': type,
  '@id': `${abs(path)}#webpage`,
  url: abs(path),
  name,
  description,
  inLanguage: site.lang,
  isPartOf: { '@id': websiteId },
  about: { '@id': orgId },
  breadcrumb: path === '/' ? undefined : { '@id': `${abs(path)}#breadcrumb` },
  ...extra,
});

const pageHero = ({ crumbs, eyebrow, h1, lead, actions = true, msg }) => `
<section class="page-hero">
  <div class="container">
    ${breadcrumbHtml(crumbs)}
    ${eyebrow ? `<span class="eyebrow">${esc(eyebrow)}</span>` : ''}
    <h1>${h1}</h1>
    ${lead ? `<p class="lead">${lead}</p>` : ''}
    ${actions ? `<div class="cta-row">
      <a class="btn btn-primary" href="${waLink(msg)}" target="_blank" rel="noopener">${brand('whatsapp')}Solicitar diagnóstico</a>
      <a class="btn btn-ghost" href="/cases/">Ver cases ${icon('arrow')}</a>
    </div>` : ''}
  </div>
</section>`;

const serviceCard = (s, h = 'h3') => `
<article class="card reveal">
  <div class="icon">${icon(s.icon)}</div>
  <${h}>${esc(s.name)}</${h}>
  <p>${esc(s.short)}</p>
  <a class="card-link stretched" href="/servicos/${s.slug}/">Saiba mais<span class="sr-only"> sobre ${esc(s.name)}</span> ${icon('arrow')}</a>
</article>`;

const caseCard = (c, { full = false, h = 'h3' } = {}) => `
<article class="card case reveal" id="${c.slug}">
  <div class="case-top"><span>${esc(c.sector)}</span><span>${esc(c.period)}</span></div>
  <div class="case-metric">${esc(c.metric)}</div>
  <div class="case-metric-label">${esc(c.metricLabel)}</div>
  <${h}>${esc(c.title)}</${h}>
  <div class="case-client">${esc(c.client)}</div>
  ${full ? `<dl>
    <div><dt>Desafio</dt><dd>${esc(c.challenge)}</dd></div>
    <div><dt>Solução</dt><dd>${esc(c.solution)}</dd></div>
    <div><dt>Resultado</dt><dd>${esc(c.result)}</dd></div>
  </dl>` : `<p>${esc(c.result)}</p>`}
  <ul class="tags">${c.tags.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
  ${full ? `<a class="card-link" href="/servicos/${c.service}/">Serviço: ${esc(serviceBySlug[c.service].name)} ${icon('arrow')}</a>` : ''}
</article>`;

const postCard = (p) => `
<article class="card post-card reveal">
  <span class="cat">${esc(p.category)}</span>
  <h3>${esc(p.title)}</h3>
  <p>${esc(p.excerpt)}</p>
  <p style="margin-top:14px"><time datetime="${p.date}">${fmtDate(p.date)}</time> · ${p.readingTime} min de leitura</p>
  <a class="card-link stretched" href="/blog/${p.slug}/">Ler artigo<span class="sr-only">: ${esc(p.title)}</span> ${icon('arrow')}</a>
</article>`;

const process = [
  { t: 'Diagnóstico', d: 'Entendo o negócio, as decisões que precisam de dados, as fontes disponíveis e os gargalos atuais.' },
  { t: 'Arquitetura e plano', d: 'Desenho a solução, priorizo entregas por impacto e defino indicadores de sucesso do projeto.' },
  { t: 'Entrega em sprints', d: 'Ciclos curtos com valor visível, validação de números com a sua equipe e ajustes contínuos.' },
  { t: 'Treinamento e autonomia', d: 'Documentação, capacitação e sustentação para que a sua empresa não dependa de mim.' },
];

const homeFaq = [
  { q: 'O que faz uma consultoria de dados?', a: 'Uma consultoria de dados ajuda a empresa a organizar, integrar e analisar suas informações para decidir melhor. Isso inclui dashboards em Power BI, engenharia de dados (pipelines e Lakehouse), automação de processos e soluções de inteligência artificial.' },
  { q: 'Vocês atendem apenas em Porto Alegre?', a: 'Não. A André Machado Consultoria fica em Porto Alegre (RS) e atende presencialmente a capital e a região metropolitana, mas a maior parte dos projetos é conduzida de forma remota para empresas de todo o Brasil.' },
  { q: 'Qual o tamanho de empresa ideal para contratar?', a: 'Atendo desde empresas médias que querem sair das planilhas até grandes organizações com milhões de registros e múltiplos sistemas. O escopo e o investimento são dimensionados para cada realidade.' },
  { q: 'Como funciona o primeiro contato?', a: 'Você me chama no WhatsApp ou por e-mail, agendamos uma conversa de cerca de 30 minutos para entender o desafio e, em seguida, envio uma proposta com escopo, prazos e investimento.' },
  { q: 'A consultoria segue a LGPD?', a: 'Sim. Todos os projetos consideram a Lei Geral de Proteção de Dados: controle de acesso por perfil, minimização e anonimização de dados sensíveis, rastreabilidade e acordos de confidencialidade.' },
];

// =====================================================================
export function homePage({ posts }) {
  const path = '/';
  const title = 'Consultoria Power BI, Dados e IA em Porto Alegre | André Machado';
  const description =
    'Consultoria de dados em Porto Alegre: Power BI, Databricks, Microsoft Fabric, migração Qlik → Power BI e IA generativa. 15+ anos de experiência.';
  const featuredCases = ['infinilabs-dell-lakehouse', 'dufrio-supply-chain', 'eichenberg-lobato-honorarios'].map((s) => caseBySlug[s]);

  const body = `
<section class="hero" aria-labelledby="hero-title">
  <div class="container hero-grid">
    <div>
      <span class="eyebrow">Consultoria de dados · Porto Alegre</span>
      <h1 id="hero-title">Consultoria em Power BI, Dados e IA <span class="serif">que vira decisão.</span></h1>
      <p class="lead">Dados confiáveis, painéis que a diretoria usa e IA que tira o trabalho repetitivo do caminho.</p>
      <div class="cta-row">
        <a class="btn btn-primary" href="${waLink()}" target="_blank" rel="noopener">${brand('whatsapp')}Agendar uma conversa</a>
        <a class="btn btn-ghost" href="/cases/">Ver resultados ${icon('arrow')}</a>
      </div>
      <ul class="hero-trust">
        <li>${icon('pin')}Porto Alegre · RS</li>
        <li>${icon('globe')}Atendimento em todo o Brasil</li>
      </ul>
    </div>
    <div class="portrait">
      <div class="portrait-frame">
        ${heroVideo()}
        <div class="portrait-caption"><strong>André Machado</strong><span>Especialista em Ciência de Dados e IA · PUCRS</span></div>
      </div>
    </div>
  </div>
</section>

<section class="trust" aria-label="Experiência em projetos">
  <div class="container trust-inner">
    <span class="trust-label">Experiência em projetos com</span>
    <ul class="trust-list">
      <li>Dell Technologies (parceria)</li><li>Unimed Porto Alegre</li><li>Sistema FIERGS</li><li>Refrigeração Dufrio</li><li>Futuro Previdência</li><li>Eichenberg &amp; Lobato</li>
    </ul>
  </div>
</section>

<section class="section" id="servicos" aria-labelledby="servicos-title">
  <div class="container">
    <div class="section-head">
      <span class="eyebrow">O que eu entrego</span>
      <h2 id="servicos-title">Serviços de dados de ponta a ponta, <span class="serif">do dado bruto à decisão</span></h2>
      <p>Da fundação de dados ao painel na mesa da diretoria — e à IA que automatiza o trabalho repetitivo. Um único responsável técnico, com visão de negócio.</p>
    </div>
    <div class="grid grid-3">${services.map((s) => serviceCard(s)).join('')}</div>
  </div>
</section>

<section class="section section-alt" aria-labelledby="numeros-title">
  <div class="container">
    <div class="section-head center">
      <span class="eyebrow">Resultados</span>
      <h2 id="numeros-title">Números de quem já fez <span class="serif">em produção</span></h2>
    </div>
    <div class="stats reveal">
      <div class="stat"><b>15+</b><span>anos de carreira entre áreas de negócio, BI e engenharia de dados</span></div>
      <div class="stat"><b>~1,5 bi</b><span>de linhas migradas para arquitetura Lakehouse Bronze/Silver/Gold</span></div>
      <div class="stat"><b>+10 mil</b><span>processos jurídicos identificados para recuperação de honorários</span></div>
      <div class="stat"><b>7</b><span>setores atendidos: saúde, finanças, jurídico, varejo, indústria, educação e tecnologia</span></div>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="cases-title">
  <div class="container">
    <div class="section-head">
      <span class="eyebrow">Cases</span>
      <h2 id="cases-title">Projetos que geraram <span class="serif">impacto mensurável</span></h2>
      <p>Uma amostra de desafios reais resolvidos com dados. Veja todos na página de cases.</p>
    </div>
    <div class="grid grid-3">${featuredCases.map((c) => caseCard(c)).join('')}</div>
    <p style="margin-top:32px"><a class="btn btn-ghost" href="/cases/">Ver todos os cases ${icon('arrow')}</a></p>
  </div>
</section>

<section class="section section-alt" aria-labelledby="processo-title">
  <div class="container">
    <div class="section-head">
      <span class="eyebrow">Como trabalho</span>
      <h2 id="processo-title">Um método simples, <span class="serif">sem caixa-preta</span></h2>
      <p>Entregas curtas, números validados com a sua equipe e transferência de conhecimento do início ao fim.</p>
    </div>
    <ol class="steps">${process.map((p) => `<li class="step reveal"><h3>${p.t}</h3><p>${p.d}</p></li>`).join('')}</ol>
  </div>
</section>

<section class="section" aria-labelledby="sobre-title">
  <div class="container split">
    <div>
      <div class="split-media reveal">${portrait({ alt: 'Retrato de André Machado, fundador da André Machado Consultoria', sizes: '(max-width: 920px) 90vw, 460px' })}</div>
    </div>
    <div>
      <span class="eyebrow">Quem conduz os projetos</span>
      <h2 id="sobre-title" style="font-size:clamp(1.9rem,3.4vw,2.7rem)">Prazer, sou o André. <span class="serif gold">Dados, negócio e propósito.</span></h2>
      <p class="prose-lg">Comecei na área comercial e financeira, passei por BI em empresas de varejo, saúde, jurídico e indústria e hoje lidero projetos de engenharia de dados e IA. Essa trajetória me permite falar a língua da diretoria e a do time técnico — e traduzir uma na outra.</p>
      <ul class="checklist">
        <li>${icon('check')}Especialista em Ciência de Dados e IA pela PUCRS e bacharel em Administração</li>
        <li>${icon('check')}Experiência com Databricks, Microsoft Fabric, Power BI, Azure e GCP</li>
        <li>${icon('check')}Projetos em ambientes regulados: saúde, financeiro (BACEN) e dados sensíveis (LGPD)</li>
      </ul>
      <a class="btn btn-ghost" href="/sobre/">Conheça minha trajetória ${icon('arrow')}</a>
    </div>
  </div>
</section>

<section class="section section-alt" aria-labelledby="faq-title">
  <div class="container">
    <div class="section-head center">
      <span class="eyebrow">Dúvidas frequentes</span>
      <h2 id="faq-title">Perguntas <span class="serif">frequentes</span></h2>
    </div>
    ${faqHtml(homeFaq, 'center')}
  </div>
</section>
${ctaBand()}`;

  return {
    path, title, description, body, preloadPortrait: true, priority: 1.0, changefreq: 'weekly',
    graph: [webPage(path, title, description, 'WebPage', { primaryImageOfPage: abs('/og/default.png') }), faqLd(homeFaq, abs(path))],
  };
}

// =====================================================================
export function servicesHub() {
  const path = '/servicos/';
  const title = 'Serviços de Consultoria em Dados, Power BI e IA | André Machado';
  const description =
    'Serviços da André Machado Consultoria: Power BI, engenharia de dados, migração Qlik → Power BI, IA generativa, automação Python e treinamentos.';
  const crumbs = [{ name: 'Início', path: '/' }, { name: 'Serviços', path }];
  const body = `
${pageHero({ crumbs, eyebrow: 'Serviços', h1: 'Serviços de consultoria em dados, BI e inteligência artificial', lead: 'Escolha por onde começar — ou deixe que eu ajude a priorizar no diagnóstico. Todos os serviços podem ser contratados separadamente ou combinados em um programa de dados.' })}
<section class="section">
  <div class="container">
    <div class="grid grid-3">${services.map((s) => serviceCard(s, 'h2')).join('')}</div>
  </div>
</section>
<section class="section section-alt" aria-labelledby="processo-title">
  <div class="container">
    <div class="section-head">
      <span class="eyebrow">Como funciona</span>
      <h2 id="processo-title">Do diagnóstico à autonomia da sua equipe</h2>
    </div>
    <ol class="steps">${process.map((p) => `<li class="step reveal"><h3>${p.t}</h3><p>${p.d}</p></li>`).join('')}</ol>
  </div>
</section>
${ctaBand()}`;
  return {
    path, title, description, body, priority: 0.9, changefreq: 'monthly',
    graph: [
      webPage(path, title, description, 'CollectionPage', {
        mainEntity: { '@type': 'ItemList', itemListElement: services.map((s, i) => ({ '@type': 'ListItem', position: i + 1, url: abs(`/servicos/${s.slug}/`), name: s.name })) },
      }),
      breadcrumbLd(crumbs, abs(path)),
    ],
  };
}

// =====================================================================
export function servicePage(s, { posts }) {
  const path = `/servicos/${s.slug}/`;
  const url = abs(path);
  const crumbs = [{ name: 'Início', path: '/' }, { name: 'Serviços', path: '/servicos/' }, { name: s.name, path }];
  const msg = `Olá, André! Vim pelo site e tenho interesse em ${s.name}.`;
  const relatedPosts = posts.filter((p) => p.service === s.slug);
  const body = `
${pageHero({ crumbs, eyebrow: s.kicker, h1: esc(s.h1), lead: esc(s.lead), msg })}
<section class="section">
  <div class="container layout-aside">
    <div>
      <div class="prose-lg">${s.intro.map((p) => `<p>${esc(p)}</p>`).join('')}</div>

      <h2 class="sub-h2">Problemas que resolvo</h2>
      <ul class="pain-list">${s.pains.map((p) => `<li>${icon('alert')}${esc(p)}</li>`).join('')}</ul>

      <h2 class="sub-h2">O que está incluído</h2>
      <div class="grid grid-2">${s.deliverables
        .map((d) => `<div class="card deliv reveal"><h3>${icon('check')}${esc(d.t)}</h3><p>${esc(d.d)}</p></div>`)
        .join('')}</div>

      <h2 class="sub-h2">Tecnologias</h2>
      <ul class="stack">${s.stack.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>

      <h2 class="sub-h2">Como funciona</h2>
      <ol class="steps steps-2">${process.map((p) => `<li class="step"><h3>${p.t}</h3><p>${p.d}</p></li>`).join('')}</ol>
    </div>
    <aside class="aside-card" aria-label="Fale sobre ${esc(s.name)}">
      <h2>Vamos conversar sobre ${esc(s.name.toLowerCase().replace('ia generativa', 'IA generativa').replace('power bi', 'Power BI').replace('qlik', 'Qlik').replace('python', 'Python'))}?</h2>
      <p>Uma conversa de 30 minutos, sem compromisso, para entender o seu cenário.</p>
      <a class="btn btn-primary" href="${waLink(msg)}" target="_blank" rel="noopener">${brand('whatsapp')}WhatsApp</a>
      <a class="btn btn-ghost" href="mailto:${site.email}?subject=${encodeURIComponent(s.name + ' — contato pelo site')}">${icon('mail')}E-mail</a>
      <ul>
        <li>${icon('pin')}Porto Alegre e todo o Brasil (remoto)</li>
        <li>${icon('clock')}Resposta em até 1 dia útil</li>
        <li>${icon('shield')}Confidencialidade e LGPD</li>
      </ul>
    </aside>
  </div>
</section>

<section class="section section-alt" aria-labelledby="cases-title">
  <div class="container">
    <div class="section-head">
      <span class="eyebrow">Experiência comprovada</span>
      <h2 id="cases-title">Projetos relacionados</h2>
    </div>
    <div class="grid grid-3">${s.cases.map((c) => caseCard(caseBySlug[c])).join('')}</div>
  </div>
</section>

<section class="section" aria-labelledby="faq-title">
  <div class="container">
    <div class="section-head">
      <span class="eyebrow">FAQ</span>
      <h2 id="faq-title">Perguntas frequentes sobre ${esc(s.name.replace('Migração Qlik → Power BI', 'migração de Qlik para Power BI'))}</h2>
    </div>
    ${faqHtml(s.faq)}
  </div>
</section>

<section class="section section-alt" aria-labelledby="rel-title">
  <div class="container">
    <div class="section-head">
      <h2 id="rel-title">Serviços complementares</h2>
    </div>
    <div class="grid grid-3">${s.related.map((r) => serviceCard(serviceBySlug[r])).join('')}</div>
    ${relatedPosts.length ? `<div class="section-head" style="margin:56px 0 24px"><h2>Leia também</h2></div><div class="grid grid-3">${relatedPosts.map(postCard).join('')}</div>` : ''}
  </div>
</section>
${ctaBand({ msg })}`;

  return {
    path, title: s.title, description: s.description, body, ogImage: `/og/servico-${s.slug}.png`, priority: 0.9, changefreq: 'monthly',
    graph: [
      webPage(path, s.title, s.description, 'WebPage', { mainEntity: { '@id': `${url}#service` } }),
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: s.name,
        serviceType: s.name,
        description: s.description,
        url,
        provider: { '@id': orgId },
        areaServed: [{ '@type': 'City', name: 'Porto Alegre' }, { '@type': 'Country', name: 'Brasil' }],
        availableChannel: { '@type': 'ServiceChannel', serviceUrl: url, servicePhone: site.phoneE164, availableLanguage: 'pt-BR' },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: `Entregas — ${s.name}`,
          itemListElement: s.deliverables.map((d) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: d.t, description: d.d } })),
        },
      },
      breadcrumbLd(crumbs, url),
      faqLd(s.faq, url),
    ],
  };
}

// =====================================================================
export function casesPage() {
  const path = '/cases/';
  const title = 'Cases de Power BI, Engenharia de Dados e IA | André Machado';
  const description =
    'Cases reais: 1,5 bilhão de linhas migradas para Databricks, supply chain em tempo real (30 min), +10 mil processos identificados e projetos de IA.';
  const crumbs = [{ name: 'Início', path: '/' }, { name: 'Cases', path }];
  const body = `
${pageHero({ crumbs, eyebrow: 'Cases e resultados', h1: 'Cases de dados, BI e IA com resultados mensuráveis', lead: 'Projetos conduzidos por André Machado ao longo da carreira, em empresas de saúde, tecnologia, varejo, jurídico, financeiro, indústria e educação.', actions: false })}
<section class="section">
  <div class="container">
    <div class="grid grid-2">${cases.map((c) => caseCard(c, { full: true, h: 'h2' })).join('')}</div>
    <p class="form-note" style="margin-top:28px">Os projetos foram realizados por André Machado como profissional ou consultor nas empresas citadas. Marcas pertencem aos seus respectivos titulares.</p>
  </div>
</section>
${ctaBand({ title: 'Seu projeto pode ser o próximo case.' })}`;
  return {
    path, title, description, body, ogImage: '/og/cases.png', priority: 0.8, changefreq: 'monthly',
    graph: [
      webPage(path, title, description, 'CollectionPage', {
        mainEntity: { '@type': 'ItemList', itemListElement: cases.map((c, i) => ({ '@type': 'ListItem', position: i + 1, url: `${abs(path)}#${c.slug}`, name: c.title })) },
      }),
      breadcrumbLd(crumbs, abs(path)),
    ],
  };
}

// =====================================================================
export function aboutPage() {
  const path = '/sobre/';
  const title = 'Sobre André Machado, Consultor de Dados e IA em Porto Alegre';
  const description =
    'André Luis Machado Silveira: 15+ anos entre negócio e dados, especialista em Ciência de Dados e IA (PUCRS), Databricks, Power BI e LLMs.';
  const crumbs = [{ name: 'Início', path: '/' }, { name: 'Sobre', path }];
  const timeline = [
    ['2025 — 2026', 'Infinilabs · parceria Dell Technologies', 'Business Analytics: migração de SAP, Oracle, Azure e SharePoint para Databricks; Lakehouse Bronze/Silver/Gold; Microsoft Fabric e Direct Lake.'],
    ['2025', 'Unimed Porto Alegre', 'Business Analytics: migração de dashboards em produção de Qlik para Power BI e governança com Dataflows.'],
    ['2024 — hoje', 'André Machado Consultoria', 'Fundação da consultoria (CNPJ ativo desde janeiro de 2024): projetos de dados, IA e treinamentos.'],
    ['2024', 'Quattrus Consultoria · Linha por Linha Dados', 'MVP com LLMs em GCP, chatbots e automação Python; Big Data com 86 milhões de linhas do ENEM.'],
    ['2022 — 2023', 'Sistema FIERGS', 'Analista corporativo e especialista de dados: BI, integridade de KPIs e LGPD para 4.000+ colaboradores.'],
    ['2022 — 2023', 'PUCRS — Escola Politécnica', 'Especialização em Ciência de Dados e IA (364 h). TCC sobre o impacto de IAs como o ChatGPT — nota 9,5.'],
    ['2021 — 2022', 'Futuro Previdência', 'Analista de dados no financeiro: crédito consignado, BACEN, APIs e automação.'],
    ['2021', 'Refrigeração Dufrio', 'Analista de BI: supply chain em tempo quase real para 4 CDs e 20+ lojas.'],
    ['2018 — 2020', 'Eichenberg & Lobato Advogados', 'Analista de relatórios: +10 mil processos identificados para honorários via Power BI.'],
    ['2015 — 2019', 'UNIASSELVI · Ball Corporation · Grupo Volpato', 'Bacharelado em Administração (Prouni integral) e estágios com SAP e indicadores.'],
    ['2008 — 2014', 'Banco Cacique · Agiplan · Tramonto Fiat', 'Carreira comercial e de crédito — reconhecido como top performer em receita.'],
  ];
  const body = `
${pageHero({ crumbs, eyebrow: 'Sobre', h1: 'André Machado: dados, negócio e propósito', lead: 'Consultor sênior de dados e IA, fundador da André Machado Consultoria, em Porto Alegre (RS).', actions: false })}
<section class="section">
  <div class="container split">
    <div class="split-media">${portrait({ eager: true, alt: 'André Luis Machado Silveira, consultor sênior de dados e inteligência artificial', sizes: '(max-width: 920px) 90vw, 460px' })}</div>
    <div class="prose-lg">
      <h2 style="font-size:clamp(1.7rem,3vw,2.3rem)">Do balcão de crédito ao Lakehouse</h2>
      <p>Sou <strong>André Luis Machado Silveira</strong>. Comecei a carreira em 2008 vendendo crédito e carros — e foi ali que aprendi o que mais importa em qualquer projeto de dados: entender quem decide, o que precisa decidir e quanto custa errar.</p>
      <p>Desde então, construí mais de 15 anos de experiência passando por áreas comerciais, financeiras e de BI, até liderar migrações de bilhões de linhas para arquiteturas modernas em Databricks e Microsoft Fabric e criar soluções com modelos de linguagem (LLMs).</p>
      <p>Em 2024 fundei a <strong>André Machado Consultoria</strong> para levar essa combinação de visão de negócio e profundidade técnica a empresas que querem decidir melhor com dados — com transparência, método e transferência de conhecimento.</p>
      <div class="cta-row" style="margin-top:24px">
        <a class="btn btn-primary" href="${site.social.linkedin}" target="_blank" rel="noopener me">${brand('linkedin')}Ver LinkedIn</a>
        <a class="btn btn-ghost" href="${site.social.portfolio}" target="_blank" rel="noopener me">Portfólio completo ${icon('arrow')}</a>
      </div>
      <figure style="margin:28px 0 0;max-width:420px;border-radius:16px;overflow:hidden;border:1px solid var(--line-2)">
        ${brandEmbroidery({ sizes: '(max-width: 920px) 90vw, 420px' })}
      </figure>
    </div>
  </div>
</section>

<section class="section section-alt" aria-labelledby="form-title">
  <div class="container">
    <div class="section-head"><span class="eyebrow">Formação e credenciais</span><h2 id="form-title">Formação</h2></div>
    <div class="grid grid-2">
      <div class="card"><div class="icon">${icon('cap')}</div><h3>Especialização em Ciência de Dados e Inteligência Artificial</h3><p>PUCRS — Escola Politécnica · 2022–2023 · 364 horas. TCC: “O impacto das IAs como o ChatGPT na sociedade e iniciativas de regulamentação” (nota 9,5).</p></div>
      <div class="card"><div class="icon">${icon('doc')}</div><h3>Bacharelado em Administração</h3><p>UNIASSELVI · 2015–2019 · bolsa integral Prouni. Base em finanças, processos e gestão — a ponte entre dados e negócio.</p></div>
    </div>
    <h3 style="margin:40px 0 16px">Certificações e cursos</h3>
    <ul class="stack">
      <li>Agile Management, Data Analytics e Marketing Intelligence</li><li>Design Thinking para Disrupção e Experiência do Cliente</li><li>Data Science e IA aplicados a Marketing e Vendas</li><li>Inteligência Artificial e Marketing Digital</li><li>Aprender para Liderar</li><li>Produtividade, Gestão do Tempo e Propósito</li>
    </ul>
  </div>
</section>

<section class="section" aria-labelledby="traj-title">
  <div class="container">
    <div class="section-head"><span class="eyebrow">Trajetória</span><h2 id="traj-title">Uma carreira construída <span class="serif">linha a linha</span></h2></div>
    <ol class="grid grid-2" style="list-style:none;padding:0;margin:0">
      ${timeline.map(([y, org, d]) => `<li class="card reveal"><div class="case-top"><span>${esc(y)}</span></div><h3>${esc(org)}</h3><p>${esc(d)}</p></li>`).join('')}
    </ol>
  </div>
</section>

<section class="section section-alt" aria-labelledby="stack-title">
  <div class="container">
    <div class="section-head"><span class="eyebrow">Stack técnico</span><h2 id="stack-title">Ferramentas que domino</h2></div>
    <ul class="stack">${['Power BI', 'DAX', 'Power Query', 'Microsoft Fabric', 'Direct Lake', 'Databricks', 'Spark', 'Qlik', 'Python', 'SQL', 'PostgreSQL', 'BigQuery', 'SQL Server', 'Azure', 'Google Cloud', 'Oracle Cloud', 'SAP', 'Dynamics 365', 'Gemini', 'ChatGPT API', 'LLMs / RAG', 'Playwright', 'Selenium', 'Supabase', 'React / TypeScript', 'Git', 'VBA', 'Excel avançado']
      .map((t) => `<li>${t}</li>`).join('')}</ul>
  </div>
</section>
${ctaBand()}`;
  return {
    path, title, description, body, ogImage: '/og/sobre.png', ogType: 'profile', priority: 0.8, changefreq: 'monthly',
    graph: [webPage(path, title, description, 'ProfilePage', { mainEntity: { '@id': personId } }), breadcrumbLd(crumbs, abs(path))],
  };
}

// =====================================================================
export function blogIndex({ posts }) {
  const path = '/blog/';
  const title = 'Blog sobre Power BI, Engenharia de Dados e IA | André Machado';
  const description =
    'Artigos práticos sobre Power BI, migração Qlik, arquitetura Lakehouse, Databricks, Microsoft Fabric e inteligência artificial para empresas.';
  const crumbs = [{ name: 'Início', path: '/' }, { name: 'Blog', path }];
  const body = `
${pageHero({ crumbs, eyebrow: 'Blog', h1: 'Blog: Power BI, engenharia de dados e IA na prática', lead: 'Guias diretos, escritos a partir de projetos reais, para gestores e times de dados.', actions: false })}
<section class="section">
  <div class="container">
    <div class="grid grid-3">${posts.map((p) => postCard(p).replace('<h3>', '<h2 style="font-size:1.2rem">').replace('</h3>', '</h2>')).join('')}</div>
  </div>
</section>
${ctaBand()}`;
  return {
    path, title, description, body, ogImage: '/og/blog.png', priority: 0.7, changefreq: 'weekly',
    graph: [
      webPage(path, title, description, 'CollectionPage'),
      { '@type': 'Blog', '@id': `${abs(path)}#blog`, name: `Blog — ${site.name}`, url: abs(path), publisher: { '@id': orgId }, inLanguage: site.lang,
        blogPost: posts.map((p) => ({ '@id': `${abs(`/blog/${p.slug}/`)}#article` })) },
      breadcrumbLd(crumbs, abs(path)),
    ],
  };
}

export function postPage(p, { posts }) {
  const path = `/blog/${p.slug}/`;
  const url = abs(path);
  const crumbs = [{ name: 'Início', path: '/' }, { name: 'Blog', path: '/blog/' }, { name: p.title, path }];
  const toc = [...p.body.matchAll(/<h2 id="([^"]+)">(.*?)<\/h2>/g)].map((m) => ({ id: m[1], t: m[2] }));
  const others = posts.filter((x) => x.slug !== p.slug).slice(0, 2);
  const svc = serviceBySlug[p.service];
  const body = `
<article itemscope itemtype="https://schema.org/BlogPosting">
  <header class="page-hero">
    <div class="container">
      ${breadcrumbHtml(crumbs)}
      <span class="eyebrow">${esc(p.category)}</span>
      <h1 itemprop="headline">${esc(p.title)}</h1>
      <p class="lead">${esc(p.description)}</p>
      <div class="post-meta">
        <span class="author"><img src="/assets/img/andre-machado-consultor-dados-360.webp" width="36" height="36" alt="" loading="lazy">Por <a href="/sobre/" rel="author">André Machado</a></span>
        <span>Publicado em <time datetime="${p.date}" itemprop="datePublished">${fmtDate(p.date)}</time></span>
        ${p.updated !== p.date ? `<span>Atualizado em <time datetime="${p.updated}" itemprop="dateModified">${fmtDate(p.updated)}</time></span>` : ''}
        <span>${p.readingTime} min de leitura</span>
      </div>
    </div>
  </header>
  <div class="section" style="padding-top:56px">
    <div class="container">
      <div class="layout-aside">
        <div class="prose" itemprop="articleBody">
          ${toc.length > 2 ? `<nav class="toc" aria-label="Neste artigo"><strong>Neste artigo</strong><ol>${toc.map((t) => `<li><a href="#${t.id}">${t.t}</a></li>`).join('')}</ol></nav>` : ''}
          ${p.body}
          <div class="author-box">
            <img src="/assets/img/andre-machado-consultor-dados-360.webp" width="84" height="84" alt="André Machado" loading="lazy">
            <div><strong>André Machado</strong><p>Consultor sênior de dados e IA, especialista em Ciência de Dados e IA pela PUCRS e fundador da André Machado Consultoria, em Porto Alegre. <a href="/sobre/">Saiba mais</a>.</p></div>
          </div>
        </div>
        <aside class="aside-card" aria-label="Serviço relacionado">
          <h2>${esc(svc.name)}</h2>
          <p>${esc(svc.short)}</p>
          <a class="btn btn-primary" href="/servicos/${svc.slug}/">Conhecer o serviço</a>
          <a class="btn btn-ghost" href="${waLink(`Olá, André! Li o artigo "${p.title}" e gostaria de conversar.`)}" target="_blank" rel="noopener">${brand('whatsapp')}Tirar uma dúvida</a>
        </aside>
      </div>
    </div>
  </div>
</article>
${others.length ? `<section class="section section-alt" aria-labelledby="mais-title"><div class="container"><div class="section-head"><h2 id="mais-title">Continue lendo</h2></div><div class="grid grid-3">${others.map(postCard).join('')}</div></div></section>` : ''}
${ctaBand()}`;
  return {
    path, title: p.metaTitle || p.title, description: p.description, body, ogImage: `/og/blog-${p.slug}.png`, ogType: 'article', article: p,
    priority: 0.7, changefreq: 'monthly', lastmod: p.updated,
    graph: [
      webPage(path, p.title, p.description, 'WebPage', { mainEntity: { '@id': `${url}#article` } }),
      {
        '@type': 'BlogPosting',
        '@id': `${url}#article`,
        headline: p.title,
        description: p.description,
        url,
        mainEntityOfPage: { '@id': `${url}#webpage` },
        image: abs(`/og/blog-${p.slug}.png`),
        datePublished: `${p.date}T09:00:00-03:00`,
        dateModified: `${p.updated}T09:00:00-03:00`,
        author: { '@id': personId },
        publisher: { '@id': orgId },
        articleSection: p.category,
        wordCount: p.wordCount,
        inLanguage: site.lang,
        about: { '@id': `${abs(`/servicos/${p.service}/`)}#service` },
      },
      breadcrumbLd(crumbs, url),
    ],
  };
}

// =====================================================================
export function contactPage() {
  const path = '/contato/';
  const title = 'Contato | André Machado Consultoria em Dados — Porto Alegre';
  const description =
    'Fale com André Machado Consultoria: WhatsApp (51) 99883-7555, e-mail e LinkedIn. Consultoria de dados, Power BI e IA em Porto Alegre e em todo o Brasil.';
  const crumbs = [{ name: 'Início', path: '/' }, { name: 'Contato', path }];
  const body = `
${pageHero({ crumbs, eyebrow: 'Contato', h1: 'Vamos conversar sobre o seu projeto de dados', lead: 'Conte rapidamente o seu desafio. Respondo em até 1 dia útil com os próximos passos.', actions: false })}
<section class="section">
  <div class="container contact-grid">
    <div>
      <h2 style="font-size:1.5rem">Canais diretos</h2>
      <ul class="contact-list">
        <li>${brand('whatsapp').replace('<svg', '<svg style="color:#25d366"')}<div><small>WhatsApp</small><a href="${waLink()}" target="_blank" rel="noopener">${site.phoneDisplay}</a></div></li>
        <li>${icon('mail')}<div><small>E-mail</small><a href="mailto:${site.email}">${site.email}</a></div></li>
        <li>${brand('linkedin')}<div><small>LinkedIn</small><a href="${site.social.linkedinCompany}" target="_blank" rel="noopener">André Machado Consultoria</a></div></li>
        <li>${icon('pin')}<div><small>Localização</small><span>${site.address.neighborhood}, ${site.address.city} — ${site.address.state}, CEP ${site.address.postalCode}<br>Atendimento presencial com agendamento e remoto em todo o Brasil</span></div></li>
        <li>${icon('clock')}<div><small>Horário</small><span>${site.openingHours.days}, das 9h às 18h</span></div></li>
      </ul>
      <p class="form-note">${esc(site.name)} · ${esc(site.legalName)} · CNPJ ${site.cnpj}</p>
    </div>
    <form class="form" id="contact-form" data-wa="${site.whatsapp}" action="mailto:${site.email}" method="post" enctype="text/plain">
      <h2 style="font-size:1.4rem;margin:0">Envie sua mensagem</h2>
      <div class="row">
        <div class="field"><label for="f-nome">Nome *</label><input id="f-nome" name="nome" autocomplete="name" required></div>
        <div class="field"><label for="f-empresa">Empresa</label><input id="f-empresa" name="empresa" autocomplete="organization"></div>
      </div>
      <div class="field"><label for="f-email">E-mail *</label><input id="f-email" name="email" type="email" autocomplete="email" required></div>
      <div class="field"><label for="f-assunto">Interesse</label>
        <select id="f-assunto" name="assunto">${services.map((s) => `<option>${esc(s.name)}</option>`).join('')}<option>Outro assunto</option></select>
      </div>
      <div class="field"><label for="f-msg">Mensagem *</label><textarea id="f-msg" name="mensagem" required placeholder="Ex.: Temos relatórios em Qlik e queremos migrar para Power BI até o fim do trimestre."></textarea></div>
      <button class="btn btn-primary" type="submit">${brand('whatsapp')}Enviar pelo WhatsApp</button>
      <p class="form-note">Ao enviar, a mensagem é aberta no seu WhatsApp — nenhum dado é armazenado neste site. Veja a <a href="/politica-de-privacidade/">política de privacidade</a>.</p>
    </form>
  </div>
</section>`;
  return {
    path, title, description, body, ogImage: '/og/contato.png', priority: 0.8, changefreq: 'yearly',
    graph: [webPage(path, title, description, 'ContactPage', { mainEntity: { '@id': orgId } }), breadcrumbLd(crumbs, abs(path))],
  };
}

// =====================================================================
export function privacyPage() {
  const path = '/politica-de-privacidade/';
  const title = 'Política de Privacidade | André Machado Consultoria';
  const description = 'Como a André Machado Consultoria trata dados pessoais neste site, em conformidade com a Lei Geral de Proteção de Dados (LGPD).';
  const crumbs = [{ name: 'Início', path: '/' }, { name: 'Política de privacidade', path }];
  const body = `
${pageHero({ crumbs, h1: 'Política de privacidade', lead: 'Transparência sobre o tratamento de dados pessoais, conforme a Lei nº 13.709/2018 (LGPD).', actions: false })}
<section class="section">
  <div class="container prose">
    <p><strong>Controlador:</strong> ${esc(site.legalName)} (${esc(site.name)}), CNPJ ${site.cnpj}, com sede em ${site.address.city}/${site.address.state}. Contato do encarregado: <a href="mailto:${site.email}">${site.email}</a>.</p>
    <h2>1. Dados coletados</h2>
    <p>Este site não possui formulários que armazenem dados em servidores próprios. Ao usar o formulário de contato, a mensagem é aberta diretamente no seu aplicativo de WhatsApp ou e-mail, e só é enviada se você confirmar.</p>
    <p>Podem ser coletados dados técnicos de navegação (como páginas acessadas, tipo de dispositivo e localização aproximada) por ferramentas de métricas, de forma agregada, para melhorar o conteúdo do site.</p>
    <h2>2. Finalidade</h2>
    <ul><li>Responder a solicitações de contato e propostas comerciais;</li><li>Executar contratos de prestação de serviços;</li><li>Melhorar a experiência e o desempenho do site.</li></ul>
    <h2>3. Compartilhamento</h2>
    <p>Os dados não são vendidos. Podem ser processados por provedores necessários à operação (hospedagem, e-mail, WhatsApp/Meta), que mantêm políticas próprias de privacidade.</p>
    <h2>4. Seus direitos</h2>
    <p>Você pode solicitar a qualquer momento confirmação, acesso, correção, anonimização, portabilidade ou exclusão dos seus dados, além de revogar consentimentos, pelo e-mail <a href="mailto:${site.email}">${site.email}</a>.</p>
    <h2>5. Segurança e retenção</h2>
    <p>Adotamos medidas técnicas e organizacionais para proteger os dados e os mantemos apenas pelo tempo necessário às finalidades informadas ou ao cumprimento de obrigações legais.</p>
    <h2>6. Atualizações</h2>
    <p>Esta política pode ser atualizada. Última revisão: ${fmtDate('2026-11-14')}.</p>
  </div>
</section>`;
  return {
    path, title, description, body, priority: 0.2, changefreq: 'yearly',
    graph: [webPage(path, title, description), breadcrumbLd(crumbs, abs(path))],
  };
}

export function notFoundPage() {
  const body = `
<section class="page-hero" style="border:0;min-height:60vh;display:flex;align-items:center">
  <div class="container">
    <span class="eyebrow">Erro 404</span>
    <h1>Página não encontrada</h1>
    <p class="lead">O endereço pode ter mudado ou não existe mais. Que tal começar por um destes caminhos?</p>
    <div class="cta-row">
      <a class="btn btn-primary" href="/">Ir para o início</a>
      <a class="btn btn-ghost" href="/servicos/">Ver serviços</a>
      <a class="btn btn-ghost" href="/contato/">Contato</a>
    </div>
  </div>
</section>`;
  return { path: '/404', file: '404.html', title: 'Página não encontrada | André Machado Consultoria', description: 'A página procurada não existe.', body, noindex: true, sitemap: false, graph: [] };
}

