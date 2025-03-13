'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AnalysisPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [restaurantId, setRestaurantId] = useState('');
  const [previewData, setPreviewData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetPreview = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !name || !restaurantId) {
      setError('Por favor, preencha todos os campos');
      return;
    }
    
    try {
      setIsLoading(true);
      setError(null);
      
      // Em um cenário real, você faria uma chamada para a API
      // Exemplo: const response = await fetch(`/api/analysis/preview?restaurant_id=${restaurantId}`);
      
      // Simulando um atraso de rede
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Dados simulados para demonstração
      setPreviewData({
        basic_info: {
          name: 'Restaurante Exemplo',
          main_category: 'Brasileira',
          address: 'Rua Exemplo, 123',
        },
        overall_score: 7.5,
        strengths: [
          'Cardápio variado com opções para diferentes públicos',
          'Bom atendimento e tempo de resposta rápido',
        ],
        weaknesses: [
          'Preços acima da média para a região',
          'Tempo de entrega longo em horários de pico',
        ],
      });
    } catch (err) {
      console.error('Erro ao obter preview:', err);
      setError(err instanceof Error ? err.message : 'Erro ao obter preview da análise');
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewFullReport = () => {
    // Redirecionar para a página de relatório completo
    router.push(`/report/full?id=${restaurantId}`);
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center text-primary mb-8">
        Análise de Restaurante no iFood
      </h1>
      
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Informações do Restaurante</h2>
          
          <form onSubmit={handleGetPreview} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Seu Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="seu@email.com"
                required
              />
            </div>
            
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Seu Nome
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Seu nome completo"
                required
              />
            </div>
            
            <div>
              <label htmlFor="restaurantId" className="block text-sm font-medium text-gray-700 mb-1">
                ID do Restaurante no iFood
              </label>
              <input
                type="text"
                id="restaurantId"
                value={restaurantId}
                onChange={(e) => setRestaurantId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Ex: 123456"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Você pode encontrar o ID do restaurante na URL da página do restaurante no iFood.
              </p>
            </div>
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                {error}
              </div>
            )}
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Analisando...' : 'Obter Preview da Análise'}
            </button>
          </form>
        </div>
        
        {previewData && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Preview da Análise</h2>
              <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                Versão Preview
              </span>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">Informações Básicas</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Nome</p>
                  <p className="font-medium">{previewData.basic_info.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Categoria Principal</p>
                  <p className="font-medium">{previewData.basic_info.main_category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Endereço</p>
                  <p className="font-medium">{previewData.basic_info.address}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Pontuação Geral</p>
                  <p className="font-medium">{previewData.overall_score}/10</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-medium mb-3 text-green-700">Pontos Fortes</h3>
                <ul className="list-disc list-inside space-y-1">
                  {previewData.strengths.map((strength: string, index: number) => (
                    <li key={index} className="text-gray-800">
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-3 text-red-700">Pontos Fracos</h3>
                <ul className="list-disc list-inside space-y-1">
                  {previewData.weaknesses.map((weakness: string, index: number) => (
                    <li key={index} className="text-gray-800">
                      {weakness}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h3 className="text-lg font-medium mb-3">Relatório Completo</h3>
              <p className="text-gray-700 mb-4">
                O relatório completo inclui análise detalhada do cardápio, avaliações, preços, concorrência, 
                e um plano de ação personalizado para melhorar seu desempenho no iFood.
              </p>
              
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-md mb-4">
                <p className="text-amber-800">
                  <strong>Nota:</strong> Esta é apenas uma prévia. O relatório completo contém análises mais 
                  detalhadas e recomendações específicas para o seu restaurante.
                </p>
              </div>
              
              <button
                onClick={handleViewFullReport}
                className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
              >
                Ver Relatório Completo
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 