'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function UserInfoPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [skipInfo, setSkipInfo] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [analysisStatus, setAnalysisStatus] = useState<'processing' | 'completed' | 'error'>('processing');
  const [progress, setProgress] = useState(0);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const analysisId = searchParams?.get('analysisId');
  
  useEffect(() => {
    if (!analysisId) {
      router.push('/');
      return;
    }
    
    // Simular progresso da análise
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setAnalysisStatus('completed');
          return 100;
        }
        return prev + 5;
      });
    }, 1000);
    
    // Verificar status da análise
    const checkAnalysisStatus = async () => {
      try {
        const response = await fetch(`/api/analysis-status?id=${analysisId}`);
        
        if (!response.ok) {
          throw new Error('Erro ao verificar status da análise');
        }
        
        const data = await response.json();
        
        if (data.status === 'completed') {
          setAnalysisStatus('completed');
          setProgress(100);
          clearInterval(interval);
        } else if (data.status === 'error') {
          setAnalysisStatus('error');
          clearInterval(interval);
        }
      } catch (err) {
        console.error('Erro ao verificar status:', err);
      }
    };
    
    // Verificar status a cada 5 segundos
    const statusInterval = setInterval(checkAnalysisStatus, 5000);
    
    return () => {
      clearInterval(interval);
      clearInterval(statusInterval);
    };
  }, [analysisId, router]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (skipInfo) {
      router.push(`/preview?analysisId=${analysisId}`);
      return;
    }
    
    // Validar email
    if (!email.includes('@') || !email.includes('.')) {
      setError('Por favor, insira um email válido');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      const response = await fetch('/api/save-user-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          analysisId,
          name,
          email,
          whatsapp
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao salvar informações');
      }
      
      // Redirecionar para a página de prévia
      router.push(`/preview?analysisId=${analysisId}`);
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro ao salvar suas informações');
      setIsSubmitting(false);
    }
  };
  
  const formatWhatsapp = (value: string) => {
    // Remover caracteres não numéricos
    const numbers = value.replace(/\D/g, '');
    
    // Aplicar máscara (XX) XXXXX-XXXX
    if (numbers.length <= 2) {
      return numbers;
    } else if (numbers.length <= 7) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    } else {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
    }
  };
  
  const handleWhatsappChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWhatsapp(formatWhatsapp(e.target.value));
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <h1 className="text-2xl font-bold mb-2 text-center">Analisando seu estabelecimento</h1>
            <p className="text-gray-600 mb-6 text-center">
              Estamos processando sua análise. Enquanto isso, preencha suas informações para receber o relatório.
            </p>
            
            {/* Barra de progresso */}
            <div className="mb-8">
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className="bg-ifood-red h-4 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-2 text-sm text-gray-600">
                <span>Coletando dados</span>
                <span>Analisando</span>
                <span>Gerando relatório</span>
              </div>
            </div>
            
            {/* Status da análise */}
            <div className="mb-8 text-center">
              {analysisStatus === 'processing' && (
                <div className="flex items-center justify-center text-gray-700">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-ifood-red" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processando sua análise...
                </div>
              )}
              
              {analysisStatus === 'completed' && (
                <div className="text-green-600 font-medium">
                  Análise concluída! Preencha suas informações para continuar.
                </div>
              )}
              
              {analysisStatus === 'error' && (
                <div className="text-red-600 font-medium">
                  Ocorreu um erro ao processar sua análise. Por favor, tente novamente.
                </div>
              )}
            </div>
            
            {/* Formulário de informações */}
            {error && (
              <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
                <p className="font-medium">Erro</p>
                <p>{error}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                  Nome completo
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ifood-red focus:border-ifood-red"
                  disabled={skipInfo}
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                  E-mail <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ifood-red focus:border-ifood-red"
                  required={!skipInfo}
                  disabled={skipInfo}
                />
                <p className="mt-1 text-sm text-gray-500">
                  Utilizaremos para enviar seu relatório
                </p>
              </div>
              
              <div className="mb-6">
                <label htmlFor="whatsapp" className="block text-gray-700 font-medium mb-2">
                  WhatsApp
                </label>
                <input
                  type="tel"
                  id="whatsapp"
                  value={whatsapp}
                  onChange={handleWhatsappChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ifood-red focus:border-ifood-red"
                  placeholder="(00) 00000-0000"
                  disabled={skipInfo}
                />
              </div>
              
              <div className="mb-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={skipInfo}
                    onChange={() => setSkipInfo(!skipInfo)}
                    className="h-5 w-5 text-ifood-red focus:ring-ifood-red border-gray-300 rounded"
                  />
                  <span className="ml-2 text-gray-700">Não quero informar meus dados agora</span>
                </label>
              </div>
              
              <button
                type="submit"
                className="w-full bg-ifood-red hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
                disabled={isSubmitting || analysisStatus === 'error'}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enviando...
                  </span>
                ) : (
                  'Ver prévia da análise'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 