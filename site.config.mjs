// ============================================================================
//  CONFIGURAÇÃO CENTRAL DO SITE — altere aqui e rode `npm run build`.
//  Todos os títulos, canonicals, sitemap, schema.org e rodapé usam estes dados.
// ============================================================================

export const site = {
  // Endereço público (sem barra no final). Canonicals, sitemap.xml, Open Graph e JSON-LD dependem dele.
  // Quando o domínio próprio (andremachadoconsultoria.com.br) estiver no ar, troque aqui e rode o build.
  url: process.env.SITE_URL || 'https://portfolio-andre-free.vercel.app',

  name: 'André Machado Consultoria',
  shortName: 'André Machado',
  legalName: 'ANDRE LUIS MACHADO SILVEIRA',
  cnpj: '53.407.721/0001-87',
  foundingDate: '2024-01-08',
  slogan: 'Dados que viram decisão.',
  description:
    'Consultoria de dados em Porto Alegre: Power BI, engenharia de dados (Databricks, Microsoft Fabric), migração Qlik → Power BI, IA generativa e treinamentos in company. Atendimento em todo o Brasil.',
  locale: 'pt_BR',
  lang: 'pt-BR',
  themeColor: '#080b0f',

  // Contato (NAP — mantenha idêntico ao Perfil da Empresa no Google)
  phoneDisplay: '(51) 99883-7555',
  phoneE164: '+5551998837555',
  whatsapp: '5551998837555',
  email: 'andrelms_@hotmail.com',
  address: {
    neighborhood: 'Partenon',
    city: 'Porto Alegre',
    state: 'RS',
    stateName: 'Rio Grande do Sul',
    postalCode: '91530-010',
    country: 'BR',
  },
  openingHours: { days: 'Segunda a sexta', opens: '09:00', closes: '18:00' },

  founder: {
    name: 'André Luis Machado Silveira',
    alternateName: 'André Machado',
    jobTitle: 'Consultor Sênior de Dados & IA',
    image: '/assets/img/andre-machado-consultor-dados.jpg',
  },

  social: {
    linkedinCompany: 'https://www.linkedin.com/company/andremachado',
    linkedin: 'https://www.linkedin.com/in/andreluismachadosilveira/',
    github: 'https://github.com/andrelms',
    youtube: 'https://www.youtube.com/@andrelms',
    portfolio: 'https://portfolio-andre-free.vercel.app/',
  },

  // Cole aqui o código de verificação do Google Search Console / Bing (opcional).
  verification: {
    google: '',
    bing: '',
  },
};

export const waLink = (msg = 'Olá, André! Vim pelo site e gostaria de conversar sobre um projeto de dados.') =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`;

