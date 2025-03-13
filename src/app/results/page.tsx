'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type Recommendation = {
  category: string;
  priority: string;
  description: string;
};

type AnalysisData = {
  establishment: {
    name: string;
    category: string;
    rating: number;
    deliveryTime: number;
    deliveryFee: number;
    imageUrl: string;
    address: string;
    openingHours: string;
  };
  analysis: {
    score: number;
    strengths: string[];
    weaknesses: string[];
    recommendations: Recommendation[];
  };
};

export default function ResultsPage() {
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        // Em uma implementação real, buscaríamos os resultados da análise usando o ID
        // Por enquanto, vamos simular com dados estáticos
        
        // Simulando um tempo de carregamento
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Dados simulados
        const mockData: AnalysisData = {
          establishment: {
            name: 'Restaurante Exemplo',
            category: 'Comida Brasileira',
            rating: 4.2,
            deliveryTime: 38,
            deliveryFee: 6.99,
            imageUrl: 'https://static.ifood-static.com.br/image/upload/t_high/logosgde/logo-restaurante-exemplo.jpg',
            address: 'Av. Exemplo, 123 - Bairro, Cidade - UF',
            openingHours: 'Seg-Sex: 11:00-22:00, Sáb-Dom: 11:00-23:00'
          },
          analysis: {
            score: 68,
            strengths: [
              'Fotos de alta qualidade para a maioria dos produtos principais',
              'Boa variedade de opções',
              'Tempo de entrega competitivo para a região'
            ],
            weaknesses: [
              'Descrições de produtos incompletas e pouco atrativas',
              'Estrutura de personalização confusa e limitada',
              'Uso insuficiente de palavras-chave relevantes para o nicho'
            ],
            recommendations: [
              {
                category: 'Descrições',
                priority: 'Alta',
                description: 'Reescrever títulos e descrições dos 10 produtos mais vendidos'
              },
              {
                category: 'Estrutura',
                priority: 'Alta',
                description: 'Reorganizar a estrutura do cardápio em categorias mais específicas'
              },
              {
                category: 'Personalização',
                priority: 'Alta',
                description: 'Reestruturar o sistema de personalização e adicionais'
              },
              {
                category: 'SEO',
                priority: 'Média',
                description: 'Adicionar palavras-chave relevantes ao perfil e descrições'
              },
              {
                category: 'Fotos',
                priority: 'Média',
                description: 'Adicionar fotos para todos os produtos secundários'
              },
              {
                category: 'Promoções',
                priority: 'Média',
                description: 'Criar combos promocionais para aumentar o ticket médio'
              }
            ]
          }
        };
        
        setAnalysisData(mockData);
      } catch (err) {
        console.error('Erro ao buscar resultados:', err);
        setError('Não foi possível carregar os resultados da análise. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-ifood-red mb-4"></div>
        <p className="text-lg">Carregando resultados da análise...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
        </div>
        <Link href="/" className="btn-primary">
          Voltar para a página inicial
        </Link>
      </div>
    );
  }

  if (!analysisData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          <p>Nenhum resultado encontrado. Tente realizar uma nova análise.</p>
        </div>
        <Link href="/" className="btn-primary">
          Voltar para a página inicial
        </Link>
      </div>
    );
  }

  const { establishment, analysis } = analysisData;
  const scoreColor = analysis.score >= 80 ? 'text-green-600' : analysis.score >= 60 ? 'text-yellow-600' : 'text-red-600';

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-ifood-red">Relatório de Análise</h1>
        <Link href="/" className="text-ifood-red hover:text-ifood-dark-red">
          Nova Análise
        </Link>
      </div>

      {/* Resumo do estabelecimento */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            {establishment.imageUrl && (
              <div className="relative w-full h-48 rounded-lg overflow-hidden">
                <Image 
                  src={establishment.imageUrl} 
                  alt={establishment.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg"
                />
              </div>
            )}
          </div>
          <div className="md:w-2/3">
            <h2 className="text-2xl font-semibold mb-2">{establishment.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Categoria:</p>
                <p className="font-medium">{establishment.category}</p>
              </div>
              <div>
                <p className="text-gray-600">Avaliação:</p>
                <p className="font-medium flex items-center">
                  {establishment.rating} 
                  <span className="text-yellow-400 ml-1">★</span>
                </p>
              </div>
              <div>
                <p className="text-gray-600">Tempo de Entrega:</p>
                <p className="font-medium">{establishment.deliveryTime} min</p>
              </div>
              <div>
                <p className="text-gray-600">Taxa de Entrega:</p>
                <p className="font-medium">R$ {establishment.deliveryFee.toFixed(2)}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-gray-600">Endereço:</p>
                <p className="font-medium">{establishment.address}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-gray-600">Horário de Funcionamento:</p>
                <p className="font-medium">{establishment.openingHours}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pontuação geral */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8 text-center">
        <h2 className="text-xl font-semibold mb-4">Pontuação Geral</h2>
        <div className="flex justify-center items-center">
          <div className={`text-5xl font-bold ${scoreColor}`}>
            {analysis.score}
          </div>
          <div className="text-2xl font-bold text-gray-400 ml-1">/100</div>
        </div>
        <p className="mt-2 text-gray-600">
          {analysis.score >= 80 
            ? 'Excelente! Seu perfil está bem otimizado.' 
            : analysis.score >= 60 
              ? 'Bom, mas há espaço para melhorias significativas.' 
              : 'Necessita de atenção imediata para melhorar o desempenho.'}
        </p>
      </div>

      {/* Pontos fortes e fracos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-green-600">Pontos Fortes</h2>
          <ul className="space-y-2">
            {analysis.strengths.map((strength, index) => (
              <li key={index} className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>{strength}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-red-600">Pontos Fracos</h2>
          <ul className="space-y-2">
            {analysis.weaknesses.map((weakness, index) => (
              <li key={index} className="flex items-start">
                <svg className="h-5 w-5 text-red-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>{weakness}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recomendações */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Recomendações</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoria
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prioridade
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Descrição
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {analysis.recommendations.map((recommendation, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {recommendation.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      recommendation.priority === 'Alta' 
                        ? 'bg-red-100 text-red-800' 
                        : recommendation.priority === 'Média' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-green-100 text-green-800'
                    }`}>
                      {recommendation.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {recommendation.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Próximos passos */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Próximos Passos</h2>
        <ol className="list-decimal list-inside space-y-2 ml-4">
          <li>Implemente as recomendações de <strong>alta prioridade</strong> nos próximos 7-14 dias</li>
          <li>Monitore o desempenho do seu estabelecimento por 2-3 semanas</li>
          <li>Implemente as recomendações de <strong>média prioridade</strong> nas semanas seguintes</li>
          <li>Realize uma nova análise após 30 dias para verificar o progresso</li>
        </ol>
      </div>

      {/* Botões de ação */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
        <Link href="/precos" className="btn-secondary">
          Ver Planos de Consultoria
        </Link>
        <Link href="/" className="btn-primary">
          Realizar Nova Análise
        </Link>
      </div>
    </div>
  );
} 