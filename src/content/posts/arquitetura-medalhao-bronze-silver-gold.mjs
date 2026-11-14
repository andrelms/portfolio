export default {
  slug: 'arquitetura-medalhao-bronze-silver-gold',
  title: 'Arquitetura Medalhão (Bronze, Silver e Gold): o que é e quando usar',
  metaTitle: 'Arquitetura Medalhão Bronze, Silver e Gold: o que é e quando usar',
  description:
    'Entenda a arquitetura medalhão do Lakehouse: o papel das camadas Bronze, Silver e Gold, exemplos no Databricks e Microsoft Fabric, boas práticas e erros comuns.',
  date: '2026-11-14',
  updated: '2026-11-14',
  category: 'Engenharia de Dados',
  service: 'engenharia-de-dados',
  excerpt:
    'Bronze, Silver e Gold explicados sem jargão: como organizar o Lakehouse para ter dados confiáveis para BI e IA — com lições de uma migração de 1,5 bilhão de linhas.',
  body: `
<p>A <strong>arquitetura medalhão</strong> é hoje o padrão mais adotado para organizar dados em um <em>Lakehouse</em> — seja no Databricks, no Microsoft Fabric ou em outras plataformas. A ideia é simples: os dados passam por camadas de qualidade crescente, como medalhas de <strong>bronze</strong>, <strong>prata (silver)</strong> e <strong>ouro (gold)</strong>. Neste artigo explico cada camada com exemplos práticos e as lições que aprendi migrando mais de 20 anos de histórico (cerca de 1,5 bilhão de linhas) para essa arquitetura.</p>

<h2 id="o-que-e">O que é arquitetura medalhão?</h2>
<p>É um padrão de design de dados em que cada camada tem uma responsabilidade clara. Em vez de transformar tudo de uma vez — e perder a capacidade de auditar ou reprocessar —, você guarda o dado bruto, depois o dado limpo e, por fim, o dado pronto para o negócio.</p>

<h2 id="camadas">As três camadas</h2>

<h3>Bronze: o dado como ele chegou</h3>
<p>A camada Bronze armazena os dados <strong>brutos</strong>, exatamente como vieram das fontes (ERP, CRM, planilhas, APIs, arquivos). Acrescentam-se apenas metadados de ingestão, como data de carga e origem.</p>
<ul>
  <li>Permite reprocessar tudo se uma regra mudar</li>
  <li>Serve de trilha de auditoria</li>
  <li>Não deve ser consumida diretamente por relatórios</li>
</ul>

<h3>Silver: o dado limpo e conformado</h3>
<p>Na Silver os dados são <strong>limpos, tipados, deduplicados e padronizados</strong>. Clientes de sistemas diferentes são unificados, datas e moedas seguem um padrão e regras de qualidade são aplicadas.</p>
<ul>
  <li>Chaves e nomenclaturas consistentes entre fontes</li>
  <li>Testes de qualidade (nulos, duplicidades, domínios válidos)</li>
  <li>Base para cientistas de dados e analistas avançados</li>
</ul>

<h3>Gold: o dado pronto para decisão</h3>
<p>A Gold reúne tabelas <strong>orientadas ao negócio</strong>: fatos e dimensões em star schema, agregações e indicadores com definição única. É a camada que alimenta o Power BI, os modelos de IA e as APIs.</p>
<ul>
  <li>KPIs com uma única definição corporativa</li>
  <li>Performance otimizada para consumo</li>
  <li>Governança e controle de acesso por domínio</li>
</ul>

<h2 id="exemplo">Exemplo prático: vendas de um varejista</h2>
<table>
  <thead><tr><th>Camada</th><th>O que contém</th></tr></thead>
  <tbody>
    <tr><td>Bronze</td><td>Arquivos diários de pedidos do ERP, cadastro de clientes do CRM e planilha de metas, sem alteração</td></tr>
    <tr><td>Silver</td><td>Pedidos deduplicados, clientes unificados por CPF/CNPJ, produtos com categoria padronizada</td></tr>
    <tr><td>Gold</td><td>Fato de vendas, dimensões de cliente, produto, loja e calendário; tabela de metas × realizado</td></tr>
  </tbody>
</table>

<h2 id="databricks-fabric">Databricks ou Microsoft Fabric?</h2>
<p>Ambos suportam muito bem a arquitetura medalhão com tabelas <strong>Delta</strong>. O Fabric se destaca pela integração com o Power BI via <strong>Direct Lake</strong>, que lê as tabelas Gold sem precisar importar os dados. O Databricks brilha em grandes volumes, engenharia avançada e machine learning. Em vários projetos os dois convivem: engenharia no Databricks e consumo analítico no Fabric/Power BI.</p>

<h2 id="boas-praticas">Boas práticas</h2>
<ul>
  <li><strong>Cargas incrementais</strong> desde o início, para controlar custo e tempo</li>
  <li><strong>Reconciliação</strong> de totais entre origem e Gold a cada carga</li>
  <li><strong>Documentação e versionamento</strong> das transformações (Git)</li>
  <li><strong>Catálogo e linhagem</strong> para saber de onde vem cada número</li>
  <li><strong>Controle de acesso</strong> e mascaramento de dados sensíveis (LGPD)</li>
</ul>

<h2 id="erros">Erros comuns</h2>
<ul>
  <li>Ligar relatórios direto na Bronze “só por enquanto”</li>
  <li>Criar uma Gold por relatório, multiplicando definições do mesmo KPI</li>
  <li>Pular a Silver e concentrar toda a lógica na Gold</li>
  <li>Não planejar retenção e custos de armazenamento</li>
</ul>

<h2 id="conclusao">Conclusão</h2>
<p>A arquitetura medalhão traz <strong>rastreabilidade, qualidade e reuso</strong> — exatamente o que falta quando cada relatório tem sua própria lógica. Ela também prepara a empresa para projetos de IA, que dependem de dados confiáveis.</p>
<p>Quer desenhar ou revisar o Lakehouse da sua empresa? Veja como funciona a <a href="/servicos/engenharia-de-dados/">consultoria em engenharia de dados</a> ou <a href="/contato/">agende uma conversa</a>.</p>
`,
};

