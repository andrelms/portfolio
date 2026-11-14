export default {
  slug: 'migracao-qlik-para-power-bi-guia',
  title: 'Migração de Qlik para Power BI: guia completo em 7 etapas',
  metaTitle: 'Migração de Qlik para Power BI: Guia em 7 Etapas (2026)',
  description:
    'Como migrar do Qlik Sense ou QlikView para o Power BI sem perder regras de negócio nem confiança nos números. Etapas, riscos, checklist e erros comuns.',
  date: '2026-11-14',
  updated: '2026-11-14',
  category: 'Power BI',
  service: 'migracao-qlik-para-power-bi',
  excerpt:
    'Inventário, tradução de set analysis para DAX, reconciliação de números e adoção: o método que uso para migrar painéis em produção sem surpresas.',
  body: `
<p>Migrar de <strong>Qlik para Power BI</strong> virou pauta em muitas empresas: integração nativa com o Microsoft 365, licenciamento competitivo e a chegada do Microsoft Fabric pesam na decisão. Mas quem já tentou sabe que não se trata de “refazer as telas”. Este guia reúne o método que aplico em migrações de painéis em produção — em operações de saúde e em ambientes parceiros da Dell Technologies — para trocar de plataforma sem perder regras de negócio nem a confiança dos usuários.</p>

<h2 id="por-que-migrar">Por que tantas empresas estão migrando do Qlik para o Power BI?</h2>
<ul>
  <li><strong>Ecossistema Microsoft:</strong> integração com Teams, Excel, SharePoint e Azure, e autenticação única com o Entra ID.</li>
  <li><strong>Custo total:</strong> para empresas que já pagam Microsoft 365, o Power BI costuma reduzir o custo por usuário.</li>
  <li><strong>Microsoft Fabric:</strong> engenharia, data warehouse e BI na mesma plataforma, com Direct Lake para grandes volumes.</li>
  <li><strong>Mercado de profissionais:</strong> é mais fácil contratar e treinar pessoas em Power BI e DAX.</li>
</ul>

<h2 id="etapas">As 7 etapas de uma migração bem-sucedida</h2>

<h3>1. Inventário e uso real</h3>
<p>Liste todos os aplicativos Qlik, suas fontes, donos, frequência de atualização e — principalmente — <em>quem usa e com que frequência</em>. É comum descobrir que 30% a 40% dos apps quase não são acessados. Eles podem ser aposentados em vez de migrados.</p>

<h3>2. Priorização por valor e complexidade</h3>
<p>Classifique cada app numa matriz de impacto × complexidade. Comece por um painel relevante, mas de complexidade moderada: ele vira a vitrine da migração e ajuda a calibrar estimativas.</p>

<h3>3. Engenharia reversa das regras</h3>
<p>O conhecimento crítico está nos <strong>scripts de carga</strong> e nas <strong>expressões com set analysis</strong>. Documente cada transformação, filtro implícito e associação. Essa etapa evita o pior cenário: números diferentes sem ninguém saber por quê.</p>

<h3>4. Modelagem e tradução para DAX</h3>
<p>O Qlik trabalha com um modelo associativo; o Power BI performa melhor em <strong>star schema</strong>. Por isso, em vez de copiar a estrutura, redesenhe fatos e dimensões. Expressões como <code>Sum({&lt;Ano={2025}&gt;} Valor)</code> viram medidas com <code>CALCULATE</code> e filtros explícitos. Sempre que possível, mova transformações pesadas para Dataflows, SQL ou para a camada de engenharia (Databricks, Fabric), deixando o modelo leve.</p>

<h3>5. Reconciliação automatizada de números</h3>
<p>Esse é o critério de aceite. Para cada indicador, compare Qlik × Power BI no mesmo recorte (período, filial, produto). Uma planilha ou notebook de reconciliação com tolerâncias definidas acelera a validação e cria um registro de auditoria.</p>

<h3>6. Governança no Power BI Service</h3>
<p>Organize workspaces por domínio, publique via <strong>apps</strong>, configure Row-Level Security, gateways e um fluxo de deploy entre desenvolvimento, homologação e produção. Migrar sem governança só transfere a bagunça de lugar.</p>

<h3>7. Treinamento, adoção e desligamento</h3>
<p>Treine usuários finais e desenvolvedores, mantenha um período curto de convivência entre as plataformas e defina uma data para desligar cada app Qlik. Sem data de corte, as duas ferramentas convivem para sempre — e o custo também.</p>

<h2 id="riscos">Principais riscos (e como evitá-los)</h2>
<table>
  <thead><tr><th>Risco</th><th>Como mitigar</th></tr></thead>
  <tbody>
    <tr><td>Números divergentes</td><td>Reconciliação por indicador antes de cada go-live</td></tr>
    <tr><td>Regras escondidas nos scripts</td><td>Engenharia reversa documentada e validada com os donos do negócio</td></tr>
    <tr><td>Performance ruim</td><td>Star schema, transformações fora do modelo e Direct Lake/Import bem dimensionados</td></tr>
    <tr><td>Baixa adoção</td><td>Redesenho focado em decisão, treinamento e campeões por área</td></tr>
    <tr><td>Prazos de renovação</td><td>Plano de ondas alinhado ao contrato de licenciamento</td></tr>
  </tbody>
</table>

<h2 id="checklist">Checklist rápido</h2>
<ul>
  <li>Inventário completo com uso real de cada app</li>
  <li>Regras de negócio documentadas e aprovadas</li>
  <li>Modelo star schema e medidas DAX documentadas</li>
  <li>Planilha de reconciliação por indicador</li>
  <li>Workspaces, apps, RLS e gateways configurados</li>
  <li>Plano de treinamento e data de desligamento do Qlik</li>
</ul>

<h2 id="conclusao">Conclusão</h2>
<p>Uma migração de Qlik para Power BI bem feita é uma oportunidade de <strong>modernizar a arquitetura de dados</strong>, simplificar painéis e corrigir inconsistências antigas. O segredo está menos na ferramenta e mais no método: inventário, regras documentadas, reconciliação e adoção.</p>
<p>Se você está avaliando essa migração, conheça a <a href="/servicos/migracao-qlik-para-power-bi/">consultoria de migração Qlik → Power BI</a> ou <a href="/contato/">fale comigo</a> para um diagnóstico do seu ambiente.</p>
`,
};

