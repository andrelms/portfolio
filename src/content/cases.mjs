// Projetos e resultados — baseados na trajetória profissional de André Machado.
// Mantenha apenas informações públicas/autorizadas pelos clientes.

export const cases = [
  {
    slug: 'infinilabs-dell-lakehouse',
    client: 'Infinilabs · parceria Dell Technologies',
    sector: 'Tecnologia',
    period: '2025 — 2026',
    metric: '~1,5 bi',
    metricLabel: 'linhas migradas para Lakehouse',
    title: 'Migração de 20+ anos de dados para Databricks e Microsoft Fabric',
    challenge:
      'Ambientes analíticos espalhados entre SAP, Oracle, Azure e SharePoint, com painéis em Qlik e mais de duas décadas de histórico.',
    solution:
      'Arquitetura Lakehouse em camadas Bronze/Silver/Gold no Databricks, fontes via Dataflows e Direct Lake no Microsoft Fabric e transição de Qlik para Power BI, com rituais ágeis diários.',
    result:
      'Cerca de 1,5 bilhão de linhas migradas com governança, documentação e versionamento — uma base única para BI e IA.',
    tags: ['Databricks', 'Microsoft Fabric', 'Direct Lake', 'Power BI', 'Azure'],
    service: 'engenharia-de-dados',
  },
  {
    slug: 'unimed-qlik-power-bi',
    client: 'Unimed Porto Alegre',
    sector: 'Saúde',
    period: '2025',
    metric: 'Sprint a sprint',
    metricLabel: 'migração de painéis em produção',
    title: 'Migração de dashboards Qlik para Power BI em operação de saúde',
    challenge:
      'Painéis críticos em produção no Qlik e conexões diretas com Databricks, gerando dependência técnica e dificuldade de governança.',
    solution:
      'Migração incremental para Power BI, troca das conexões diretas por Dataflows e visualizações escaláveis e otimizadas.',
    result:
      'Painéis migrados sem interrupção da operação, com menos dependências técnicas e governança aprimorada.',
    tags: ['Qlik → Power BI', 'Dataflows', 'Databricks', 'Agile'],
    service: 'migracao-qlik-para-power-bi',
  },
  {
    slug: 'dufrio-supply-chain',
    client: 'Refrigeração Dufrio',
    sector: 'Varejo & Distribuição',
    period: '2021',
    metric: '30 min',
    metricLabel: 'atualização do supply chain em 4 CDs',
    title: 'Supply chain em tempo quase real para 4 centros de distribuição',
    challenge:
      'Milhares de pedidos diários em 4 CDs, mais de 2 mil funcionários e 20 lojas, sem visão consolidada e atualizada da operação.',
    solution:
      'Ciclo completo de BI — extração do Dynamics 365/SQL Server, modelagem e visualização — com KPIs de planejamento, vendas, logística, serviços e pessoas.',
    result:
      'Pedidos rastreados e atualizados a cada 30 minutos, com indicadores reportados em nível executivo.',
    tags: ['Power BI', 'SQL Server', 'Dynamics 365', 'ERP'],
    service: 'consultoria-power-bi',
  },
  {
    slug: 'eichenberg-lobato-honorarios',
    client: 'Eichenberg & Lobato Advogados',
    sector: 'Jurídico',
    period: '2018 — 2020',
    metric: '+10 mil',
    metricLabel: 'processos identificados para honorários',
    title: 'BI jurídico que encontrou receita escondida na carteira de processos',
    challenge:
      'Dados de processos dispersos entre ERP, XMLs públicos e controles manuais, sem visibilidade de oportunidades de recuperação.',
    solution:
      'Ciclo completo de BI com SQL, APIs do Banco Central e automação VBA para limpeza, cruzamento e análise dos processos.',
    result:
      'Mais de 10 mil processos passíveis de honorários identificados via Power BI — impacto direto no fluxo de caixa.',
    tags: ['Power BI', 'SQL', 'Excel', 'VBA', 'APIs Banco Central'],
    service: 'consultoria-power-bi',
  },
  {
    slug: 'futuro-previdencia-consignado',
    client: 'Futuro Previdência',
    sector: 'Financeiro',
    period: '2021 — 2022',
    metric: 'R$ milhões',
    metricLabel: 'em crédito consignado monitorados',
    title: 'Monitoramento de crédito consignado e adequação regulatória BACEN',
    challenge:
      'Carteira de crédito consignado em todo o Brasil, migração de sistema e exigências regulatórias do Banco Central.',
    solution:
      'Dashboards em tempo real integrando APIs e SharePoint (crédito, inadimplência, financeiro e produção), automações VBA e chatbot integrado ao WhatsApp.',
    result:
      'Milhões em crédito monitorados, centenas de dados validados na migração e processos de CRM/SAC adequados ao BACEN.',
    tags: ['Power BI', 'SharePoint', 'VBA', 'BACEN'],
    service: 'consultoria-power-bi',
  },
  {
    slug: 'quattrus-mvp-llm',
    client: 'Quattrus Consultoria Estratégica',
    sector: 'Consultoria',
    period: '2024',
    metric: 'MVP',
    metricLabel: 'com LLMs em produção',
    title: 'MVP de IA generativa com chatbot e extração inteligente de dados',
    challenge:
      'Necessidade de um produto com IA para autoatendimento, classificação de perfil e geração de insights a partir de documentos.',
    solution:
      'Infraestrutura de LLMs em GCP e ChatGPT API, chatbot com recomendações e análise de sentimentos, extração drag-and-drop e geração automática de PPTs com Python.',
    result:
      'MVP funcional entregue, dashboards legados automatizados e métricas em produção revisadas via SQL no Azure.',
    tags: ['LLMs', 'GCP', 'ChatGPT API', 'Python', 'Azure SQL'],
    service: 'inteligencia-artificial-para-empresas',
  },
  {
    slug: 'insightful-data-explorer',
    client: 'Projeto próprio · Insightful Data Explorer',
    sector: 'Dados / RH',
    period: '2025',
    metric: 'IA + OCR',
    metricLabel: 'para convenções coletivas',
    title: 'Plataforma de dados: coleta, OCR e IA sobre convenções coletivas',
    challenge:
      'Departamentos de pessoal e escritórios precisam acompanhar centenas de convenções e acordos coletivos publicados em portais diferentes.',
    solution:
      'Web scraping do MTE Mediador e de sindicatos, OCR de convenções, classificação automática e comparação inteligente de CCTs/ACTs com IA generativa.',
    result:
      'Plataforma de dados que transforma documentos dispersos em informação comparável e pesquisável, com dashboards e chat de consulta.',
    tags: ['IA generativa', 'OCR', 'Playwright', 'Supabase', 'React'],
    service: 'inteligencia-artificial-para-empresas',
  },
  {
    slug: 'linha-por-linha-enem',
    client: 'Linha por Linha Dados',
    sector: 'Educação',
    period: '2024',
    metric: '86 mi',
    metricLabel: 'linhas de microdados do ENEM',
    title: 'Big Data educacional: 15 anos de microdados do ENEM',
    challenge:
      'Analisar 86 milhões de registros de inscritos em 15 anos de ENEM para gerar recortes demográficos, socioeconômicos e de desempenho.',
    solution:
      'Tratamento com Python, modelagem e dashboards em Power BI, além de um aplicativo de formulários com níveis de acesso em NoCode.',
    result:
      'Painéis exploratórios de grande volume com navegação rápida e responsiva em desktop e mobile.',
    tags: ['Big Data', 'Python', 'Power BI', 'NoCode'],
    service: 'engenharia-de-dados',
  },
  {
    slug: 'fiergs-bi-corporativo',
    client: 'Sistema FIERGS',
    sector: 'Indústria / Entidade',
    period: '2022 — 2023',
    metric: '4.000+',
    metricLabel: 'colaboradores atendidos pelo BI',
    title: 'BI corporativo com KPIs íntegros e conformidade LGPD',
    challenge:
      'Integridade de KPIs entre sistemas legados e novos em uma organização com mais de 4 mil colaboradores e dados sensíveis.',
    solution:
      'Módulo de BI no backlog gerencial, dashboards Power BI, notebooks Python e perfis hierárquicos de acesso.',
    result:
      'Indicadores confiáveis entre sistemas e tratamento de dados sensíveis em conformidade com a LGPD.',
    tags: ['Power BI', 'Python', 'LGPD', 'Excel'],
    service: 'treinamento-power-bi-in-company',
  },
];

export const caseBySlug = Object.fromEntries(cases.map((c) => [c.slug, c]));

