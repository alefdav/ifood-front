'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthContext';

export default function AnalyzePage() {
  const [link, setLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  useEffect(() => {
    // Redirecionar para login se não estiver autenticado
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [authLoading, isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Limpar erros anteriores
    setError('');
    
    // Validar link
    if (!link.trim()) {
      setError('Por favor, insira um link do iFood');
      return;
    }
    
    if (!link.includes('ifood.com.br')) {
      setError('Por favor, insira um link válido do iFood');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Enviar para API
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ link }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao analisar estabelecimento');
      }
      
      // Redirecionar para página de resultados
      router.push('/results');
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro ao analisar o estabelecimento');
    } finally {
      setIsLoading(false);
    }
  };

  // Renderizar tela de carregamento enquanto verifica autenticação
  if (authLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ifood-red"></div>
      </div>
    );
  }

  // Não renderizar nada se não estiver autenticado (será redirecionado)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold mb-2 text-center text-gray-800">Analisar Estabelecimento</h1>
          <p className="text-gray-600 mb-8 text-center">
            Cole o link do estabelecimento no iFood para obter uma análise completa
          </p>
          
          {error && (
            <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
              <p className="font-medium">Erro</p>
              <p>{error}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="ifood-link" className="block text-gray-700 font-medium mb-2">
                Link do iFood
              </label>
              <input
                type="url"
                id="ifood-link"
                placeholder="https://www.ifood.com.br/restaurante/..."
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ifood-red focus:border-ifood-red"
                required
              />
              <p className="mt-2 text-sm text-gray-500">
                Ex: https://www.ifood.com.br/restaurante/nome-do-restaurante
              </p>
            </div>
            
            <button
              type="submit"
              className="w-full bg-ifood-red hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analisando...
                </span>
              ) : (
                'Analisar Estabelecimento'
              )}
            </button>
          </form>
          
          <div className="mt-8 border-t border-gray-200 pt-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Como funciona?</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-ifood-red rounded-full p-2 text-white">
                  <span className="font-bold">1</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-md font-medium text-gray-800">Cole o link do estabelecimento</h3>
                  <p className="text-sm text-gray-600">
                    Copie o link do estabelecimento diretamente do iFood e cole no campo acima.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-ifood-red rounded-full p-2 text-white">
                  <span className="font-bold">2</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-md font-medium text-gray-800">Nossa IA analisa os dados</h3>
                  <p className="text-sm text-gray-600">
                    Nosso sistema coleta e analisa informações como avaliações, preços, tempo de entrega e muito mais.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-ifood-red rounded-full p-2 text-white">
                  <span className="font-bold">3</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-md font-medium text-gray-800">Receba um relatório detalhado</h3>
                  <p className="text-sm text-gray-600">
                    Você receberá uma análise completa com pontos fortes, fracos e recomendações para melhorar o desempenho.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 