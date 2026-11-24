// Páginas de serviço — cada uma mira um cluster de palavras-chave com intenção comercial.
// Texto escrito para pessoas primeiro (E-E-A-T), com termos de busca naturais.

export const services = [
  {
    slug: 'consultoria-power-bi',
    icon: 'chart',
    name: 'Consultoria em Power BI',
    short: 'Dashboards executivos, DAX avançado e modelagem que aguenta crescer.',
    title: 'Consultoria Power BI em Porto Alegre e Remoto | André Machado',
    description:
      'Consultoria em Power BI: dashboards executivos, DAX avançado, modelagem star schema, Dataflows e Direct Lake. Projetos em Porto Alegre e em todo o Brasil.',
    h1: 'Consultoria em Power BI para decisões rápidas e confiáveis',
    kicker: 'Business Intelligence',
    lead:
      'Transformo planilhas, ERPs e bancos de dados em painéis de Power BI que a diretoria realmente usa — com números que batem, atualização automática e governança de acesso.',
    intro: [
      'Muita empresa já tem Power BI, mas convive com relatórios lentos, indicadores que não conferem entre áreas e uma dependência enorme de exportações manuais para Excel. O problema quase nunca é a ferramenta: é a modelagem, a origem dos dados e a falta de um desenho claro de quais decisões cada painel precisa apoiar.',
      'Há mais de 15 anos trabalho entre o negócio e a tecnologia — da área comercial e financeira à engenharia de dados. Por isso começo cada projeto pelas perguntas de negócio e só depois desenho o modelo, as medidas DAX e o visual. O resultado são dashboards enxutos, rápidos e auditáveis.',
    ],
    pains: [
      'Relatórios que demoram minutos para abrir ou atualizar',
      'KPIs diferentes para a mesma métrica em cada área',
      'Horas por semana gastas consolidando planilhas manualmente',
      'Medidas DAX que ninguém mais consegue manter',
      'Falta de controle sobre quem vê quais dados (RLS)',
      'Licenciamento e workspaces desorganizados no Power BI Service',
    ],
    deliverables: [
      { t: 'Diagnóstico e mapa de KPIs', d: 'Entrevistas com gestores, inventário de fontes e definição única de cada indicador.' },
      { t: 'Modelagem star schema', d: 'Fatos e dimensões otimizados, calendário corporativo e relacionamentos sem ambiguidade.' },
      { t: 'DAX avançado e performance', d: 'Medidas documentadas, inteligência de tempo e otimização com VertiPaq Analyzer e DAX Studio.' },
      { t: 'Dashboards executivos', d: 'Layout orientado a decisão, storytelling visual, drill-through e versões mobile.' },
      { t: 'Atualização automática', d: 'Dataflows, gateway, Direct Lake (Microsoft Fabric) e agendamentos monitorados.' },
      { t: 'Segurança e governança', d: 'Row-Level Security, perfis hierárquicos de acesso, workspaces e conformidade com a LGPD.' },
    ],
    stack: ['Power BI Desktop', 'Power BI Service', 'DAX', 'Power Query (M)', 'Dataflows', 'Microsoft Fabric', 'Direct Lake', 'SQL Server', 'Excel avançado'],
    cases: ['dufrio-supply-chain', 'eichenberg-lobato-honorarios', 'futuro-previdencia-consignado'],
    faq: [
      {
        q: 'Quanto tempo leva um projeto de Power BI?',
        a: 'Um primeiro painel executivo com fontes já acessíveis costuma ficar pronto entre 2 e 6 semanas. Projetos com várias fontes, regras de negócio complexas ou necessidade de data warehouse são entregues em sprints, com valor visível a cada ciclo.',
      },
      {
        q: 'Vocês trabalham com o Power BI que a minha empresa já tem?',
        a: 'Sim. Posso auditar e otimizar relatórios existentes — modelagem, DAX, performance e governança — ou construir do zero. Também oriento sobre o licenciamento mais adequado (Pro, Premium Per User ou capacidade Fabric).',
      },
      {
        q: 'A consultoria em Power BI é presencial ou remota?',
        a: 'As duas. Atendo presencialmente em Porto Alegre e região metropolitana e remotamente empresas de todo o Brasil, com reuniões online e acesso seguro ao ambiente do cliente.',
      },
      {
        q: 'Quais fontes de dados podem ser conectadas ao Power BI?',
        a: 'Praticamente qualquer uma: ERPs (SAP, Dynamics 365, TOTVS), bancos SQL Server, PostgreSQL, Oracle e BigQuery, SharePoint, planilhas, APIs REST (inclusive do Banco Central) e plataformas como Databricks e Microsoft Fabric.',
      },
    ],
    related: ['migracao-qlik-para-power-bi', 'engenharia-de-dados', 'treinamento-power-bi-in-company'],
  },
  {
    slug: 'engenharia-de-dados',
    icon: 'layers',
    name: 'Engenharia de Dados',
    short: 'Lakehouse Bronze/Silver/Gold com Databricks e Microsoft Fabric.',
    title: 'Engenharia de Dados: Databricks, Fabric e Lakehouse | André Machado',
    description:
      'Engenharia de dados com Databricks, Microsoft Fabric, Azure e GCP. Arquitetura Lakehouse Bronze/Silver/Gold, pipelines ETL/ELT e migração de sistemas legados.',
    h1: 'Engenharia de Dados e Lakehouse para empresas que cresceram além das planilhas',
    kicker: 'Data Engineering',
    lead:
      'Desenho e construo a fundação de dados da sua empresa: pipelines confiáveis, arquitetura medalhão (Bronze, Silver e Gold) e uma única fonte da verdade para BI, analytics e IA.',
    intro: [
      'Quando os dados vivem espalhados entre SAP, Oracle, SharePoint, planilhas e sistemas antigos, todo novo relatório vira um projeto. A engenharia de dados resolve isso na raiz: centraliza, padroniza, versiona e documenta as informações para que qualquer área consuma dados prontos e confiáveis.',
      'Liderei a migração de ambientes analíticos com mais de 20 anos de histórico — cerca de 1,5 bilhão de linhas — para Databricks, em parceria com a Dell Technologies, usando arquitetura em camadas e entrega via Dataflows e Direct Lake no Microsoft Fabric.',
    ],
    pains: [
      'Dados duplicados e inconsistentes entre sistemas',
      'Cargas noturnas que falham sem ninguém perceber',
      'Sistemas legados caros e difíceis de consultar',
      'Relatórios conectados direto em produção, derrubando o ERP',
      'Nenhuma documentação ou linhagem dos dados',
      'Base pouco preparada para projetos de IA',
    ],
    deliverables: [
      { t: 'Arquitetura de referência', d: 'Desenho do Lakehouse, escolha de plataforma (Databricks, Fabric, BigQuery) e estimativa de custos de nuvem.' },
      { t: 'Camadas Bronze, Silver e Gold', d: 'Ingestão bruta, limpeza e conformidade, e tabelas de negócio prontas para consumo.' },
      { t: 'Pipelines ETL/ELT', d: 'Orquestração, cargas incrementais, tratamento de falhas e alertas.' },
      { t: 'Migração de legados', d: 'SAP, Oracle, SQL Server, Azure e SharePoint migrados com reconciliação linha a linha.' },
      { t: 'Qualidade e governança', d: 'Testes de dados, catálogo, controle de acesso, rastreabilidade e LGPD.' },
      { t: 'Documentação e handover', d: 'Dicionário de dados, versionamento e transferência de conhecimento para o time interno.' },
    ],
    stack: ['Databricks', 'Microsoft Fabric', 'Azure', 'Google Cloud (GCP)', 'BigQuery', 'PostgreSQL', 'SQL Server', 'Python', 'PySpark', 'SQL', 'Delta Lake'],
    cases: ['infinilabs-dell-lakehouse', 'unimed-qlik-power-bi', 'linha-por-linha-enem'],
    faq: [
      {
        q: 'O que é arquitetura medalhão (Bronze, Silver e Gold)?',
        a: 'É uma forma de organizar o Lakehouse em três camadas: Bronze guarda os dados brutos como chegaram; Silver traz dados limpos, padronizados e validados; Gold reúne tabelas de negócio prontas para BI e IA. Isso dá rastreabilidade, reprocessamento fácil e consistência.',
      },
      {
        q: 'Databricks ou Microsoft Fabric: qual escolher?',
        a: 'Depende do ecossistema e do volume. Fabric integra nativamente com Power BI e Microsoft 365 e simplifica a operação; Databricks é muito forte em grandes volumes, engenharia avançada e machine learning. Muitas vezes os dois convivem bem — e ajudo a decidir com base em custo e maturidade.',
      },
      {
        q: 'É possível migrar dados de sistemas antigos sem parar a operação?',
        a: 'Sim. A migração é feita em paralelo ao ambiente atual, com cargas incrementais e reconciliação de totais entre origem e destino. A virada acontece só depois que os números conferem.',
      },
      {
        q: 'Minha empresa é média. Engenharia de dados faz sentido?',
        a: 'Faz, desde que dimensionada. Para empresas médias, uma arquitetura enxuta em nuvem com poucos pipelines bem feitos já elimina retrabalho e prepara a base para crescer — sem custos de grande corporação.',
      },
    ],
    related: ['consultoria-power-bi', 'migracao-qlik-para-power-bi', 'inteligencia-artificial-para-empresas'],
  },
  {
    slug: 'migracao-qlik-para-power-bi',
    icon: 'migrate',
    name: 'Migração Qlik → Power BI',
    short: 'Troque de plataforma sem perder histórico, regras nem confiança.',
    title: 'Migração de Qlik para Power BI sem retrabalho | André Machado',
    description:
      'Migração de Qlik Sense e QlikView para Power BI em sprints: inventário, tradução para DAX, reconciliação de números e treinamento da equipe.',
    h1: 'Migração de Qlik para Power BI, sprint a sprint e sem surpresas',
    kicker: 'Modernização analítica',
    lead:
      'Conduzo a migração de dashboards Qlik Sense e QlikView para Power BI com inventário completo, reconciliação de números e adoção pelos usuários — o mesmo método aplicado em operações de saúde e tecnologia de grande porte.',
    intro: [
      'Migrar de Qlik para Power BI não é “redesenhar telas”. Scripts de carga, expressões de set analysis e associações implícitas precisam ser traduzidos para Power Query, modelagem e DAX — e cada número precisa bater com o que o usuário está acostumado a ver.',
      'Já conduzi migrações de painéis em produção na Unimed Porto Alegre e em um ambiente analítico parceiro da Dell Technologies, aproveitando o momento para mover conexões diretas para Dataflows e camadas governadas, reduzindo dependências técnicas.',
    ],
    pains: [
      'Custos crescentes de licenciamento Qlik',
      'Medo de perder regras de negócio escondidas nos scripts',
      'Usuários resistentes à mudança de ferramenta',
      'Painéis legados sem documentação',
      'Necessidade de integrar com Microsoft 365 e Teams',
      'Prazos de renovação de contrato apertados',
    ],
    deliverables: [
      { t: 'Inventário e priorização', d: 'Levantamento de apps, uso real, fontes e regras — o que migrar, o que aposentar e o que redesenhar.' },
      { t: 'Tradução de regras', d: 'Scripts Qlik reescritos em Power Query/SQL e set analysis convertido em medidas DAX.' },
      { t: 'Reconciliação de números', d: 'Comparação automatizada Qlik × Power BI por indicador antes de cada go-live.' },
      { t: 'Redesenho de UX', d: 'Aproveitamos a migração para simplificar telas e focar nas decisões-chave.' },
      { t: 'Governança no Power BI Service', d: 'Workspaces, apps, RLS, gateways e ciclo de deploy entre ambientes.' },
      { t: 'Treinamento e adoção', d: 'Capacitação de usuários e desenvolvedores para garantir uso desde o primeiro dia.' },
    ],
    stack: ['Qlik Sense', 'QlikView', 'Power BI', 'DAX', 'Power Query', 'Dataflows', 'Databricks', 'Microsoft Fabric', 'SQL'],
    cases: ['unimed-qlik-power-bi', 'infinilabs-dell-lakehouse'],
    faq: [
      {
        q: 'Quanto tempo leva migrar do Qlik para o Power BI?',
        a: 'Depende do número e da complexidade dos aplicativos. Em geral organizo a migração em sprints de duas semanas, entregando painéis prontos e validados a cada ciclo, para que os usuários comecem a usar o Power BI logo no início.',
      },
      {
        q: 'Os números vão bater com os do Qlik?',
        a: 'Esse é o critério de aceite. Cada indicador é reconciliado entre as duas plataformas antes da publicação, e eventuais diferenças são documentadas e explicadas — às vezes a migração revela erros antigos no próprio Qlik.',
      },
      {
        q: 'Dá para reaproveitar os scripts de carga do Qlik?',
        a: 'A lógica sim, o código não diretamente. As regras são traduzidas para Power Query, SQL ou camadas de engenharia (Dataflows, Databricks, Fabric), o que costuma deixar a solução mais governada e reutilizável.',
      },
    ],
    related: ['consultoria-power-bi', 'engenharia-de-dados', 'treinamento-power-bi-in-company'],
  },
  {
    slug: 'inteligencia-artificial-para-empresas',
    icon: 'spark',
    name: 'IA Generativa para Empresas',
    short: 'Agentes, chatbots e leitura automática de documentos com LLMs.',
    title: 'IA Generativa e LLMs para Empresas | André Machado Consultoria',
    description:
      'IA generativa para empresas: chatbots com LLMs, agentes, OCR e classificação automática de documentos, análise de contratos e convenções coletivas.',
    h1: 'Inteligência Artificial generativa aplicada ao seu negócio',
    kicker: 'IA & LLMs',
    lead:
      'Coloco a IA para trabalhar em processos reais: atendimento, leitura de documentos, classificação, análise de cláusulas e geração de relatórios — com segurança, custo previsível e validação humana onde importa.',
    intro: [
      'IA generativa entrega valor quando resolve um gargalo concreto e mensurável. Meu trabalho é identificar esses pontos, prototipar rápido (MVP) e levar para produção com dados confiáveis, controle de custos e respeito à LGPD.',
      'Sou especialista em Ciência de Dados e Inteligência Artificial pela PUCRS, com TCC sobre o impacto de IAs como o ChatGPT e iniciativas de regulamentação. Na prática, já desenvolvi MVPs com LLMs em GCP, chatbots de autoatendimento com análise de sentimentos e plataformas de IA para o direito do trabalho.',
    ],
    pains: [
      'Equipe gastando horas lendo e classificando documentos',
      'Atendimento repetitivo que poderia ser automatizado',
      'Dúvidas sobre segurança e privacidade ao usar IA',
      'Pilotos de IA que nunca chegaram à produção',
      'Informação presa em PDFs, e-mails e imagens',
      'Dificuldade em medir o retorno da IA',
    ],
    deliverables: [
      { t: 'Discovery de casos de uso', d: 'Mapeamento de processos, estimativa de ganho e priorização por impacto × esforço.' },
      { t: 'MVP com LLMs', d: 'Protótipo funcional em semanas com Gemini, GPT ou modelos open source.' },
      { t: 'Agentes e chatbots', d: 'Assistentes com base de conhecimento (RAG), integração com WhatsApp e sistemas internos.' },
      { t: 'Documentos inteligentes', d: 'OCR, extração estruturada, classificação e comparação de contratos, CCTs e ACTs.' },
      { t: 'Validação e qualidade', d: 'Validação cruzada entre modelos, métricas de acurácia e revisão humana nos pontos críticos.' },
      { t: 'Governança de IA', d: 'Políticas de uso, privacidade, LGPD, rastreabilidade e controle de custos por requisição.' },
    ],
    stack: ['Gemini API', 'OpenAI / ChatGPT API', 'LLMs open source', 'RAG', 'Python', 'OCR / Docling', 'Jina AI', 'Supabase', 'GCP', 'Azure'],
    cases: ['insightful-data-explorer', 'quattrus-mvp-llm'],
    faq: [
      {
        q: 'Meus dados ficam seguros usando IA generativa?',
        a: 'Sim, com a arquitetura certa. Uso APIs corporativas que não treinam modelos com seus dados, anonimização quando necessário, controle de acesso e registro de uso, sempre alinhado à LGPD.',
      },
      {
        q: 'Preciso de muitos dados para começar um projeto de IA?',
        a: 'Para IA generativa, normalmente não. Modelos de linguagem já vêm treinados; o trabalho é conectá-los aos seus documentos e processos (RAG, prompts estruturados, ferramentas). Dá para começar com um MVP enxuto e evoluir.',
      },
      {
        q: 'Quanto custa manter uma solução de IA em produção?',
        a: 'O custo depende do volume de uso e do modelo escolhido. No projeto, estimo o custo por documento ou por conversa e escolho o modelo com melhor relação custo × qualidade — muitas vezes combinando modelos menores e maiores.',
      },
    ],
    related: ['automacao-de-processos-python', 'engenharia-de-dados', 'consultoria-power-bi'],
  },
  {
    slug: 'automacao-de-processos-python',
    icon: 'bolt',
    name: 'Automação com Python',
    short: 'Robôs, web scraping, Excel/VBA e rotinas que devolvem horas ao seu time.',
    title: 'Automação de Processos com Python e Web Scraping | André Machado',
    description:
      'Automação de processos com Python, VBA e IA: web scraping, relatórios e PPTs automáticos, integrações via API e eliminação de tarefas manuais.',
    h1: 'Automação de processos com Python: menos tarefa manual, mais análise',
    kicker: 'Automação & Scraping',
    lead:
      'Automatizo rotinas repetitivas — coleta de dados em portais, consolidação de planilhas, geração de relatórios e apresentações — para que sua equipe gaste tempo analisando, não copiando e colando.',
    intro: [
      'Toda empresa tem processos que consomem horas por semana e seguem sempre os mesmos passos. Com Python, VBA e, quando faz sentido, IA, esses fluxos viram robôs confiáveis que rodam sozinhos, registram o que fizeram e avisam quando algo sai do padrão.',
      'Já construí web scraping institucional em portais como o MTE Mediador e sites de sindicatos, automações que geram apresentações PowerPoint a partir de dados, rotinas VBA para operações financeiras e integrações com APIs do Banco Central.',
    ],
    pains: [
      'Relatórios montados manualmente toda semana',
      'Dados que precisam ser copiados de sites e portais',
      'Planilhas gigantes com macros frágeis',
      'Erros humanos em tarefas repetitivas',
      'Sistemas que não conversam entre si',
      'Equipe sobrecarregada com tarefas operacionais',
    ],
    deliverables: [
      { t: 'Mapeamento de processos', d: 'Identificação de rotinas automatizáveis e cálculo de horas economizadas.' },
      { t: 'Web scraping', d: 'Coleta estruturada e resiliente com Playwright e Selenium, respeitando termos de uso.' },
      { t: 'Relatórios automáticos', d: 'Geração de Excel, PDF e PowerPoint diretamente dos dados, em vários idiomas.' },
      { t: 'Integrações via API', d: 'Conexão entre ERP, CRM, SharePoint, Banco Central e outros sistemas.' },
      { t: 'Pipelines com IA', d: 'Extração adaptativa de documentos e classificação automática com LLMs.' },
      { t: 'Monitoramento', d: 'Logs, alertas e agendamento em nuvem para rodar sem intervenção.' },
    ],
    stack: ['Python', 'Pandas', 'Excel avançado', 'VBA', 'Playwright', 'Selenium', 'APIs REST', 'SharePoint', 'Supabase', 'Azure', 'GCP'],
    cases: ['insightful-data-explorer', 'quattrus-mvp-llm', 'eichenberg-lobato-honorarios'],
    faq: [
      {
        q: 'Que tipo de processo pode ser automatizado com Python?',
        a: 'Qualquer tarefa digital repetitiva e com regras claras: baixar e consolidar arquivos, coletar dados de sites, preencher planilhas, gerar relatórios e apresentações, enviar e-mails, conciliar valores e integrar sistemas.',
      },
      {
        q: 'Web scraping é legal?',
        a: 'Coletar dados públicos é uma prática comum, desde que respeite os termos de uso dos sites, a LGPD e não sobrecarregue os servidores. Avalio cada caso e priorizo APIs oficiais quando existem.',
      },
      {
        q: 'Preciso de servidor para rodar as automações?',
        a: 'Não necessariamente. Dependendo do caso, as automações rodam em uma máquina da empresa, em funções de nuvem de baixo custo ou em plataformas como Azure e GCP com agendamento e monitoramento.',
      },
    ],
    related: ['inteligencia-artificial-para-empresas', 'consultoria-power-bi', 'engenharia-de-dados'],
  },
  {
    slug: 'treinamento-power-bi-in-company',
    icon: 'cap',
    name: 'Treinamento Power BI e Excel In Company',
    short: 'Capacitação prática em Power BI, DAX, Excel avançado e dados para equipes.',
    title: 'Treinamento Power BI e Excel Avançado In Company | André Machado',
    description:
      'Treinamento in company de Power BI, DAX, Power Query e Excel avançado. Turmas presenciais em Porto Alegre ou online, com dados da sua empresa.',
    h1: 'Treinamento de Power BI in company, com os dados da sua empresa',
    kicker: 'Capacitação',
    lead:
      'Capacito sua equipe para criar, manter e interpretar relatórios com autonomia. Turmas presenciais em Porto Alegre ou online, com conteúdo sob medida e exercícios em cima dos seus próprios dados.',
    intro: [
      'Ferramenta sem capacitação vira licença parada. Os treinamentos são desenhados a partir do nível da turma e dos objetivos da empresa — do analista que está começando no Power BI ao desenvolvedor que precisa dominar DAX e modelagem.',
      'Treinamento em informática é a atividade principal da André Machado Consultoria. Uni a experiência prática de projetos em empresas como Sistema FIERGS, Unimed e Dufrio a uma didática direta, com casos reais e material de apoio para consulta depois do curso.',
    ],
    pains: [
      'Equipe dependente de uma única pessoa para relatórios',
      'Licenças de Power BI pagas e pouco usadas',
      'Relatórios criados sem padrão nem boas práticas',
      'Gestores que não sabem interpretar os painéis',
      'Excel usado como banco de dados',
      'Cursos genéricos que não se aplicam à realidade da empresa',
    ],
    deliverables: [
      { t: 'Power BI Essencial', d: 'Power Query, modelagem, visuais e publicação no Power BI Service.' },
      { t: 'DAX e modelagem avançada', d: 'Contextos, CALCULATE, inteligência de tempo, star schema e performance.' },
      { t: 'Excel avançado para análise', d: 'Tabelas dinâmicas, Power Query no Excel, fórmulas modernas e automação.' },
      { t: 'Cultura de dados para gestores', d: 'Como ler indicadores, fazer as perguntas certas e decidir com dados.' },
      { t: 'IA no dia a dia', d: 'Uso produtivo e seguro de IA generativa para análise e produtividade.' },
      { t: 'Mentoria pós-curso', d: 'Acompanhamento para tirar dúvidas e revisar os primeiros projetos da equipe.' },
    ],
    stack: ['Power BI', 'DAX', 'Power Query', 'Excel', 'SQL', 'Python', 'Microsoft Fabric', 'IA generativa'],
    cases: ['fiergs-bi-corporativo', 'unimed-qlik-power-bi'],
    faq: [
      {
        q: 'O treinamento é presencial ou online?',
        a: 'Os dois formatos estão disponíveis. Turmas presenciais acontecem na sua empresa em Porto Alegre e região; turmas online atendem equipes de qualquer cidade, ao vivo e com gravação opcional.',
      },
      {
        q: 'Qual a carga horária do curso de Power BI?',
        a: 'Os formatos mais comuns vão de 8 a 24 horas, divididas em encontros de 3 a 4 horas. A carga é ajustada ao nível da turma e aos objetivos definidos no diagnóstico inicial.',
      },
      {
        q: 'É possível usar os dados da empresa no treinamento?',
        a: 'Sim, e é o recomendado. Trabalhar com dados reais (ou anonimizados) acelera o aprendizado e já deixa a equipe com os primeiros relatórios encaminhados ao final do curso.',
      },
      {
        q: 'Os participantes recebem certificado?',
        a: 'Sim. Cada participante recebe certificado de conclusão emitido pela André Machado Consultoria (CNPJ 53.407.721/0001-87), com carga horária e conteúdo programático.',
      },
    ],
    related: ['consultoria-power-bi', 'migracao-qlik-para-power-bi', 'inteligencia-artificial-para-empresas'],
  },
];

export const serviceBySlug = Object.fromEntries(services.map((s) => [s.slug, s]));

