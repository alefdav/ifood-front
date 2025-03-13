'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import LinkForm from '@/components/LinkForm';
import Image from 'next/image';

export default function HomePage() {
  const [link, setLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

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
      // Iniciar o processo de análise
      const response = await fetch('/api/start-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ link }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao iniciar análise');
      }
      
      const data = await response.json();
      
      // Redirecionar para a página de coleta de dados do usuário
      router.push(`/user-info?analysisId=${data.analysisId}`);
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro ao iniciar a análise');
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Otimize seu restaurante no <span className="text-ifood-red">iFood</span>
          </h1>
          <p className="text-xl text-gray-600">
            Análise profissional do seu estabelecimento com recomendações personalizadas para aumentar suas vendas
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-8">
              <h2 className="text-2xl font-bold mb-6">Analise seu estabelecimento</h2>
              
              {error && (
                <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
                  <p className="font-medium">Erro</p>
                  <p>{error}</p>
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="ifood-link" className="block text-gray-700 font-medium mb-2">
                    Link do seu estabelecimento no iFood
                  </label>
                  <input
                    type="url"
                    id="ifood-link"
                    placeholder="https://www.ifood.com.br/restaurante/seu-restaurante"
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
                      Iniciando análise...
                    </span>
                  ) : (
                    'Analisar meu estabelecimento'
                  )}
                </button>
              </form>
            </div>
            
            <div className="md:w-1/2 bg-gray-50 p-8">
              <h3 className="text-xl font-semibold mb-4">O que você receberá:</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Análise completa do seu estabelecimento</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Identificação de pontos fortes e fracos</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Recomendações personalizadas para melhorar seu desempenho</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Relatório em PDF com todas as informações</span>
                </li>
              </ul>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-blue-800 font-medium">Prévia gratuita + Análise completa por apenas R$ 19,90</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-8">Como funciona</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-ifood-red rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Insira o link</h3>
              <p className="text-gray-600">Cole o link do seu estabelecimento no iFood para iniciar a análise</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-ifood-red rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">Receba a prévia</h3>
              <p className="text-gray-600">Nossa IA analisa seu estabelecimento e gera uma prévia gratuita</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-ifood-red rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Análise completa</h3>
              <p className="text-gray-600">Obtenha o relatório completo com todas as recomendações personalizadas</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 