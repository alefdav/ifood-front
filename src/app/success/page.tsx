'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface AnalysisData {
  id: string;
  restaurantName: string;
  restaurantImage: string;
  email: string;
  purchaseDate: string;
  downloadUrl: string;
}

export default function SuccessPage() {
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [downloadStarted, setDownloadStarted] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const analysisId = searchParams?.get('analysisId');
  
  useEffect(() => {
    if (!analysisId) {
      router.push('/');
      return;
    }
    
    const fetchPurchaseData = async () => {
      try {
        const response = await fetch(`/api/purchase-details?id=${analysisId}`);
        
        if (!response.ok) {
          throw new Error('Erro ao carregar dados da compra');
        }
        
        const data = await response.json();
        setAnalysisData(data);
        setIsLoading(false);
      } catch (err: any) {
        setError(err.message || 'Ocorreu um erro ao carregar os detalhes da compra');
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
        email: 'cliente@exemplo.com',
        purchaseDate: new Date().toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        downloadUrl: '/api/download-report?id=' + analysisId
      };
      
      setAnalysisData(mockData);
      setIsLoading(false);
    }, 1500);
    
  }, [analysisId, router]);
  
  const handleDownload = () => {
    if (!analysisData) return;
    
    setDownloadStarted(true);
    
    // Simular download do arquivo
    // Em produção, isso seria um link real para o PDF
    window.open(analysisData.downloadUrl, '_blank');
    
    // Registrar o download
    fetch('/api/register-download', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        analysisId,
      }),
    }).catch(err => {
      console.error('Erro ao registrar download:', err);
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[60vh]">
        <svg className="animate-spin h-12 w-12 text-ifood-red mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <h2 className="text-xl font-semibold text-gray-700">Carregando detalhes da sua compra...</h2>
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
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Erro ao carregar detalhes</h2>
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
            <p className="text-gray-600 mb-6">Não foi possível encontrar os detalhes da sua compra.</p>
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
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-10 w-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Pagamento confirmado!</h1>
              <p className="text-gray-600">
                Seu relatório completo está pronto para download
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 relative rounded-lg overflow-hidden mr-4">
                  <Image 
                    src={analysisData.restaurantImage} 
                    alt={analysisData.restaurantName}
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">{analysisData.restaurantName}</h2>
                  <p className="text-sm text-gray-500">Análise completa</p>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">ID da compra</p>
                    <p className="font-medium">{analysisData.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Data</p>
                    <p className="font-medium">{analysisData.purchaseDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Valor</p>
                    <p className="font-medium">R$ 19,90</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">E-mail</p>
                    <p className="font-medium">{analysisData.email}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Próximos passos</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-ifood-red rounded-full flex items-center justify-center text-white font-bold mr-3 flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium">Baixe seu relatório completo</h4>
                    <p className="text-gray-600 text-sm mb-2">
                      Clique no botão abaixo para baixar o PDF com a análise completa do seu estabelecimento.
                    </p>
                    <button
                      onClick={handleDownload}
                      className={`inline-flex items-center px-4 py-2 rounded-lg ${
                        downloadStarted 
                          ? 'bg-green-100 text-green-800 border border-green-200' 
                          : 'bg-ifood-red hover:bg-red-700 text-white'
                      } transition duration-300`}
                    >
                      {downloadStarted ? (
                        <>
                          <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          Download iniciado
                        </>
                      ) : (
                        <>
                          <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                          </svg>
                          Baixar relatório completo (PDF)
                        </>
                      )}
                    </button>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-ifood-red rounded-full flex items-center justify-center text-white font-bold mr-3 flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium">Verifique seu e-mail</h4>
                    <p className="text-gray-600 text-sm">
                      Enviamos uma cópia do relatório para <span className="font-medium">{analysisData.email}</span>. 
                      Verifique sua caixa de entrada e pasta de spam.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-ifood-red rounded-full flex items-center justify-center text-white font-bold mr-3 flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium">Implemente as recomendações</h4>
                    <p className="text-gray-600 text-sm">
                      Siga o plano de ação detalhado no relatório para melhorar seu desempenho no iFood.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-8">
              <div className="flex items-start">
                <svg className="h-6 w-6 text-blue-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <div>
                  <h4 className="font-medium text-blue-800 mb-1">Precisa de ajuda?</h4>
                  <p className="text-blue-700 text-sm">
                    Se tiver dúvidas sobre o relatório ou como implementar as recomendações, 
                    entre em contato conosco pelo e-mail <span className="font-medium">suporte@ifoodperfeito.com.br</span>
                  </p>
                </div>
              </div>
            </div>
            
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
                onClick={handleDownload}
                className="inline-flex items-center justify-center px-6 py-3 bg-ifood-red hover:bg-red-700 text-white font-bold rounded-lg transition duration-300"
              >
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                </svg>
                Baixar relatório
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 