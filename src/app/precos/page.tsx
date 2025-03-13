import Link from 'next/link';

export default function Precos() {
  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center text-ifood-red">Planos e Preços</h1>
      <p className="text-lg text-center mb-12 max-w-3xl mx-auto">
        Escolha o plano ideal para o seu estabelecimento e comece a otimizar sua presença no iFood hoje mesmo.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Plano Básico */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 transition-transform hover:scale-105">
          <div className="p-6 bg-gray-50">
            <h2 className="text-2xl font-bold text-center mb-2">Básico</h2>
            <p className="text-center text-gray-600 mb-4">Análise inicial do seu estabelecimento</p>
            <div className="text-center">
              <span className="text-4xl font-bold">R$97</span>
              <span className="text-gray-600">/único</span>
            </div>
          </div>
          
          <div className="p-6">
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Análise completa do perfil</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Relatório de pontos fortes e fracos</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>10 recomendações práticas</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Entrega em até 48 horas</span>
              </li>
              <li className="flex items-start text-gray-400">
                <svg className="h-6 w-6 text-gray-300 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>Análise de concorrentes</span>
              </li>
              <li className="flex items-start text-gray-400">
                <svg className="h-6 w-6 text-gray-300 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>Consultoria personalizada</span>
              </li>
            </ul>
            
            <div className="mt-8">
              <Link href="/" className="block text-center py-3 px-4 bg-gray-200 hover:bg-gray-300 rounded-md font-medium transition-colors">
                Selecionar Plano
              </Link>
            </div>
          </div>
        </div>
        
        {/* Plano Premium */}
        <div className="bg-white rounded-lg shadow-xl overflow-hidden border-2 border-ifood-red transform scale-105 z-10">
          <div className="p-1 bg-ifood-red">
            <p className="text-white text-center text-sm font-medium">MAIS POPULAR</p>
          </div>
          <div className="p-6 bg-gray-50">
            <h2 className="text-2xl font-bold text-center mb-2">Premium</h2>
            <p className="text-center text-gray-600 mb-4">Análise completa com consultoria</p>
            <div className="text-center">
              <span className="text-4xl font-bold">R$197</span>
              <span className="text-gray-600">/único</span>
            </div>
          </div>
          
          <div className="p-6">
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Análise completa do perfil</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Relatório de pontos fortes e fracos</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>20 recomendações práticas</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Entrega em até 24 horas</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Análise de 3 concorrentes</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Sessão de consultoria (30 min)</span>
              </li>
            </ul>
            
            <div className="mt-8">
              <Link href="/" className="block text-center py-3 px-4 bg-ifood-red hover:bg-ifood-red-dark text-white rounded-md font-medium transition-colors">
                Selecionar Plano
              </Link>
            </div>
          </div>
        </div>
        
        {/* Plano Empresarial */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 transition-transform hover:scale-105">
          <div className="p-6 bg-gray-50">
            <h2 className="text-2xl font-bold text-center mb-2">Empresarial</h2>
            <p className="text-center text-gray-600 mb-4">Solução completa para seu negócio</p>
            <div className="text-center">
              <span className="text-4xl font-bold">R$497</span>
              <span className="text-gray-600">/único</span>
            </div>
          </div>
          
          <div className="p-6">
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Análise completa do perfil</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Relatório de pontos fortes e fracos</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>30+ recomendações práticas</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Entrega prioritária (12h)</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Análise de 5 concorrentes</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>3 sessões de consultoria (1h cada)</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Implementação assistida</span>
              </li>
            </ul>
            
            <div className="mt-8">
              <Link href="/" className="block text-center py-3 px-4 bg-gray-200 hover:bg-gray-300 rounded-md font-medium transition-colors">
                Selecionar Plano
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-16 bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Perguntas Frequentes</h2>
        
        <div className="space-y-6 max-w-3xl mx-auto">
          <div>
            <h3 className="text-lg font-semibold mb-2">Quanto tempo leva para receber minha análise?</h3>
            <p className="text-gray-700">
              O tempo de entrega varia de acordo com o plano escolhido. O plano Básico tem entrega em até 48 horas, 
              o Premium em até 24 horas, e o Empresarial em até 12 horas. Em períodos de alta demanda, 
              podemos ter pequenos atrasos, mas você será notificado.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Como são realizadas as sessões de consultoria?</h3>
            <p className="text-gray-700">
              As sessões de consultoria são realizadas por videoconferência (Zoom ou Google Meet) 
              com um de nossos especialistas em otimização de perfis no iFood. Você receberá um link 
              para agendar sua sessão após a conclusão da análise.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Posso solicitar reembolso se não ficar satisfeito?</h3>
            <p className="text-gray-700">
              Sim, oferecemos garantia de satisfação de 7 dias. Se você não estiver satisfeito com a análise 
              recebida, entre em contato conosco explicando os motivos e processaremos seu reembolso integral.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Vocês implementam as mudanças sugeridas?</h3>
            <p className="text-gray-700">
              No plano Empresarial, oferecemos implementação assistida, onde guiamos você durante todo o processo 
              de implementação das recomendações. Nos outros planos, fornecemos instruções detalhadas para que 
              você mesmo possa implementar as mudanças.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">Ainda tem dúvidas?</h2>
        <p className="mb-6">Entre em contato conosco e teremos prazer em ajudar.</p>
        <Link href="/contato" className="inline-block py-3 px-6 bg-ifood-red hover:bg-ifood-red-dark text-white rounded-md font-medium transition-colors">
          Fale Conosco
        </Link>
      </div>
    </div>
  );
} 