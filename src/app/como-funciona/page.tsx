import Link from 'next/link';

export default function ComoFunciona() {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-ifood-red">Como Funciona</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <p className="text-lg mb-6">
          O iFood Perfeito é uma ferramenta de análise e otimização para estabelecimentos no iFood. 
          Nosso objetivo é ajudar você a aumentar suas vendas e visibilidade na plataforma através 
          de recomendações personalizadas baseadas em análises detalhadas do seu perfil.
        </p>
        
        <h2 className="text-2xl font-semibold mb-4 text-ifood-red">Processo de Análise</h2>
        
        <div className="space-y-8">
          <div className="flex items-start">
            <div className="bg-ifood-red rounded-full w-10 h-10 flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">
              1
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Coleta de Dados</h3>
              <p className="text-gray-700">
                Você fornece o link do seu estabelecimento no iFood. Nossa tecnologia coleta 
                automaticamente todas as informações relevantes, como nome, categoria, avaliações, 
                tempo de entrega, cardápio completo, fotos e promoções ativas.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-ifood-red rounded-full w-10 h-10 flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">
              2
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Análise do Perfil</h3>
              <p className="text-gray-700">
                Analisamos seu perfil completo, verificando se o nome é claro e memorável, 
                se o logotipo é de alta qualidade, se as informações básicas estão completas 
                e se as fotos do estabelecimento são atrativas e representativas.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-ifood-red rounded-full w-10 h-10 flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">
              3
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Análise do Cardápio</h3>
              <p className="text-gray-700">
                Avaliamos a estrutura e organização do seu cardápio, os títulos e descrições dos produtos, 
                a estratégia de precificação, as opções de personalização e adicionais, e a qualidade das 
                fotos dos produtos.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-ifood-red rounded-full w-10 h-10 flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">
              4
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Análise de SEO e Visibilidade</h3>
              <p className="text-gray-700">
                Verificamos se você está utilizando as palavras-chave corretas para o seu nicho, 
                se as tags e categorização estão adequadas, e se as promoções e destaques estão 
                configurados de forma estratégica.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-ifood-red rounded-full w-10 h-10 flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">
              5
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Análise Competitiva</h3>
              <p className="text-gray-700">
                Comparamos seu estabelecimento com concorrentes diretos na mesma região, 
                identificando pontos fortes e diferenciais, comparando preços e apresentação, 
                e identificando oportunidades de diferenciação.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-ifood-red rounded-full w-10 h-10 flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">
              6
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Geração de Relatório</h3>
              <p className="text-gray-700">
                Com base em todas as análises, geramos um relatório detalhado com pontuação geral, 
                pontos fortes, áreas críticas para melhoria, recomendações práticas e um plano de 
                implementação priorizado.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-ifood-light-gray rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-ifood-red">Benefícios</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center mb-3">
              <svg className="h-6 w-6 text-ifood-red mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <h3 className="font-semibold">Aumento de Visibilidade</h3>
            </div>
            <p className="text-gray-700">
              Otimize seu perfil para aparecer mais frequentemente nas buscas e recomendações do iFood.
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center mb-3">
              <svg className="h-6 w-6 text-ifood-red mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <h3 className="font-semibold">Maior Taxa de Conversão</h3>
            </div>
            <p className="text-gray-700">
              Transforme mais visualizações em pedidos com descrições atrativas e fotos de qualidade.
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center mb-3">
              <svg className="h-6 w-6 text-ifood-red mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <h3 className="font-semibold">Aumento do Ticket Médio</h3>
            </div>
            <p className="text-gray-700">
              Estratégias para aumentar o valor médio dos pedidos através de combos e adicionais.
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center mb-3">
              <svg className="h-6 w-6 text-ifood-red mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <h3 className="font-semibold">Melhoria nas Avaliações</h3>
            </div>
            <p className="text-gray-700">
              Aumente a satisfação dos clientes com uma apresentação clara e expectativas bem definidas.
            </p>
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-6 text-ifood-red">Pronto para otimizar seu estabelecimento?</h2>
        <Link href="/" className="btn-primary inline-block px-8 py-3">
          Começar Análise Agora
        </Link>
      </div>
    </div>
  );
} 