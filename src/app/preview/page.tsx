'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface AnalysisData {
  id: string;
  restaurantName: string;
  restaurantImage: string;
  overallScore: number;
  categories: {
    name: string;
    score: number;
  }[];
  strengths: string[];
  weaknesses: string[];
  recommendations: {
    title: string;
    description: string;
    priority: 'alta' | 'média' | 'baixa';
    blurred?: boolean;
  }[];
}

export default function PreviewPage() {
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const analysisId = searchParams?.get('analysisId');
  
  useEffect(() => {
    if (!analysisId) {
      router.push('/');
      return;
    }
    
    const fetchAnalysisData = async () => {
      try {
        const response = await fetch(`/api/analysis-preview?id=${analysisId}`);
        
        if (!response.ok) {
          throw new Error('Erro ao carregar dados da análise');
        }
        
        const data = await response.json();
        
        // Simular dados para a prévia
        const previewData: AnalysisData = {
          ...data,
          // Borrar algumas recomendações para a versão prévia
          recommendations: data.recommendations.map((rec: any, index: number) => ({
            ...rec,
            blurred: index > 1 // Apenas as duas primeiras recomendações são mostradas claramente
          }))
        };
        
        setAnalysisData(previewData);
        setIsLoading(false);
      } catch (err: any) {
        setError(err.message || 'Ocorreu um erro ao carregar a análise');
        setIsLoading(false);
      }
    };
    
    // Simular carregamento dos dados
    setTimeout(() => {
      // Dados simulados para demonstração
      const mockData: AnalysisData = {
        id: analysisId || '123456',
        restaurantName: 'Restaurante Exemplo',
        restaurantImage: 'https://via.placeholder.com/150',
        overallScore: 7.2,
        categories: [
          { name: 'Cardápio', score: 8.5 },
          { name: 'Fotos', score: 6.0 },
          { name: 'Preços', score: 7.8 },
          { name: 'Avaliações', score: 6.5 }
        ],
        strengths: [
          'Boas avaliações de atendimento',
          'Cardápio bem organizado',
          'Tempo de entrega competitivo'
        ],
        weaknesses: [
          'Poucas fotos dos pratos',
          'Descrições incompletas dos itens',
          'Preços acima da média da região'
        ],
        recommendations: [
          {
            title: 'Adicionar mais fotos dos pratos principais',
            description: 'Estabelecimentos com fotos de qualidade têm 35% mais chances de conversão.',
            priority: 'alta'
          },
          {
            title: 'Melhorar descrições dos pratos',
            description: 'Descrições detalhadas aumentam as vendas em até 25%.',
            priority: 'média'
          },
          {
            title: 'Revisar estratégia de preços',
            description: 'Seus preços estão 15% acima da média da região para itens similares.',
            priority: 'alta',
            blurred: true
          },
          {
            title: 'Implementar promoções em horários específicos',
            description: 'Análise de dados mostra oportunidade de aumento de vendas em horários ociosos.',
            priority: 'média',
            blurred: true
          },
          {
            title: 'Otimizar tempo de preparo',
            description: 'Reduzir o tempo de preparo pode melhorar seu posicionamento no app.',
            priority: 'baixa',
            blurred: true
          }
        ]
      };
      
      setAnalysisData(mockData);
      setIsLoading(false);
    }, 1500);
    
  }, [analysisId, router]);
  
  const handleGetFullReport = () => {
    setShowPaymentModal(true);
  };
  
  const handlePayment = () => {
    // Aqui seria implementada a integração com o Stripe
    // Por enquanto, apenas redirecionamos para a página de pagamento simulada
    router.push(`/payment?analysisId=${analysisId}`);
  };
  
  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-yellow-600';
    return 'text-red-600';
  };
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'alta': return 'bg-red-100 text-red-800';
      case 'média': return 'bg-yellow-100 text-yellow-800';
      case 'baixa': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[60vh]">
        <svg className="animate-spin h-12 w-12 text-ifood-red mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <h2 className="text-xl font-semibold text-gray-700">Carregando sua análise...</h2>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="text-center">
            <svg className="h-16 w-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Erro ao carregar análise</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <Link href="/" className="inline-block bg-ifood-red hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300">
              Voltar para o início
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  if (!analysisData) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="text-center">
            <svg className="h-16 w-16 text-yellow-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Nenhum resultado encontrado</h2>
            <p className="text-gray-600 mb-6">Não foi possível encontrar a análise solicitada.</p>
            <Link href="/" className="inline-block bg-ifood-red hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300">
              Voltar para o início
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Cabeçalho */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Prévia da Análise</h1>
              <div className="text-sm bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
                Versão Prévia
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="w-24 h-24 relative rounded-lg overflow-hidden">
                <Image 
                  src={analysisData.restaurantImage} 
                  alt={analysisData.restaurantName}
                  width={96}
                  height={96}
                  className="object-cover"
                />
              </div>
              
              <div className="flex-1">
                <h2 className="text-xl font-bold mb-2">{analysisData.restaurantName}</h2>
                
                <div className="flex items-center mb-4">
                  <div className="text-3xl font-bold mr-3 flex items-center">
                    <span className={getScoreColor(analysisData.overallScore)}>
                      {analysisData.overallScore.toFixed(1)}
                    </span>
                    <span className="text-gray-400 text-lg">/10</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    Pontuação geral
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {analysisData.categories.map((category, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-sm text-gray-500 mb-1">{category.name}</div>
                      <div className={`text-lg font-bold ${getScoreColor(category.score)}`}>
                        {category.score.toFixed(1)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Pontos fortes e fracos */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Pontos Fortes
              </h3>
              
              <ul className="space-y-3">
                {analysisData.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <svg className="h-5 w-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                Pontos Fracos
              </h3>
              
              <ul className="space-y-3">
                {analysisData.weaknesses.map((weakness, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="h-5 w-5 text-red-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>{weakness}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        {/* Recomendações */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="p-6">
            <h3 className="text-lg font-bold mb-4">Recomendações</h3>
            
            <div className="space-y-4">
              {analysisData.recommendations.map((recommendation, index) => (
                <div 
                  key={index} 
                  className={`p-4 border rounded-lg ${recommendation.blurred ? 'relative' : ''}`}
                >
                  {recommendation.blurred && (
                    <div className="absolute inset-0 bg-white bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg">
                      <div className="text-center p-4">
                        <svg className="h-8 w-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                        </svg>
                        <p className="text-gray-600 font-medium">Disponível na versão completa</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-start">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h4 className="font-semibold">{recommendation.title}</h4>
                        <span className={`ml-3 text-xs px-2 py-1 rounded-full ${getPriorityColor(recommendation.priority)}`}>
                          Prioridade {recommendation.priority}
                        </span>
                      </div>
                      <p className="text-gray-600">{recommendation.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">Esta é apenas uma prévia.</span> O relatório completo inclui:
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Todas as recomendações detalhadas (total de {analysisData.recommendations.length})</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Análise comparativa com concorrentes</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Plano de ação detalhado para implementação</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>PDF completo para download e compartilhamento</span>
                </li>
              </ul>
              
              <button
                onClick={handleGetFullReport}
                className="w-full bg-ifood-red hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
              >
                Obter relatório completo por R$ 19,90
              </button>
            </div>
          </div>
        </div>
        
        {/* Botões de navegação */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <Link 
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition duration-300"
          >
            <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Voltar para o início
          </Link>
          
          <button
            onClick={handleGetFullReport}
            className="inline-flex items-center justify-center px-6 py-3 bg-ifood-red hover:bg-red-700 text-white font-bold rounded-lg transition duration-300"
          >
            Obter relatório completo
            <svg className="h-5 w-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </button>
        </div>
      </div>
      
      {/* Modal de pagamento */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Obter relatório completo</h3>
                <button 
                  onClick={() => setShowPaymentModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              
              <div className="mb-6">
                <p className="text-gray-600 mb-4">
                  Você está prestes a adquirir o relatório completo de análise para:
                </p>
                <div className="bg-gray-50 p-3 rounded-lg flex items-center">
                  <div className="w-12 h-12 relative rounded overflow-hidden mr-3">
                    <Image 
                      src={analysisData.restaurantImage} 
                      alt={analysisData.restaurantName}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium">{analysisData.restaurantName}</div>
                    <div className="text-sm text-gray-500">ID: {analysisData.id}</div>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-b py-4 my-4">
                <div className="flex justify-between mb-2">
                  <span>Relatório completo</span>
                  <span>R$ 19,90</span>
                </div>
                <div className="text-sm text-gray-500">
                  Pagamento único, sem assinaturas
                </div>
              </div>
              
              <div className="mt-6">
                <button
                  onClick={handlePayment}
                  className="w-full bg-ifood-red hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
                >
                  Prosseguir para pagamento
                </button>
                
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="w-full mt-3 text-gray-600 hover:text-gray-800 font-medium py-2"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 