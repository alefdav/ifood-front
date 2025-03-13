'use client';

// Configuração para desabilitar a exportação estática
export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { downloadReportPDF, startDownload } from '@/lib/report/download';
import { CheckCircle, XCircle, AlertCircle, Loader2, Download } from 'lucide-react';

export default function FullReportPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [analysisId, setAnalysisId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [reportData, setReportData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  useEffect(() => {
    // Obter o ID da análise da URL
    const idFromUrl = searchParams.get('id');
    
    if (idFromUrl) {
      setAnalysisId(idFromUrl);
      fetchFullReport(idFromUrl);
    } else {
      setError('ID da análise não encontrado');
      setIsLoading(false);
    }
  }, [searchParams]);

  const fetchFullReport = async (id: string) => {
    try {
      // Em um cenário real, você faria uma chamada para a API para obter o relatório completo
      console.log('Obtendo relatório completo para a análise:', id);
      
      // Simular um carregamento
      setTimeout(() => {
        setReportData({
          basic_info: {
            name: 'Restaurante Exemplo',
            main_category: 'Brasileira',
            address: 'Rua Exemplo, 123',
            time_on_platform: '2 anos',
            operating_hours: 'Seg-Dom: 11h às 23h',
          },
          overall_score: 7.5,
          category_scores: {
            menu: 8.0,
            service: 7.0,
            pricing: 6.5,
            visibility: 8.5,
          },
          strengths: [
            'Cardápio variado com opções para diferentes públicos',
            'Bom atendimento e tempo de resposta rápido',
            'Fotos de qualidade dos pratos',
            'Boa presença em categorias populares',
          ],
          weaknesses: [
            'Preços acima da média para a região',
            'Tempo de entrega longo em horários de pico',
            'Poucas promoções em comparação com concorrentes',
            'Baixa taxa de resposta a avaliações negativas',
          ],
          menu_analysis: {
            stats: {
              total_items: 45,
              average_price: 32.50,
              most_expensive_item: 'Picanha Completa',
              most_expensive_price: 89.90,
              cheapest_item: 'Refrigerante Lata',
              cheapest_price: 5.90,
            },
            strengths: [
              'Boa variedade de pratos principais',
              'Opções vegetarianas disponíveis',
              'Combos com bom custo-benefício',
            ],
            weaknesses: [
              'Poucos itens de sobremesa',
              'Preços de bebidas acima da média',
              'Falta de opções para crianças',
            ],
          },
          ratings_analysis: {
            stats: {
              average_rating: 4.2,
              total_ratings: 342,
              five_star_percentage: 45.3,
              one_star_percentage: 8.2,
            },
            relevant_comments: [
              'Comida sempre chega quente e bem embalada',
              'Demorou mais de 1 hora para entregar',
              'Melhor hambúrguer da região!',
              'Preço um pouco salgado, mas vale a pena pela qualidade',
            ],
          },
          recommendations: [
            'Implementar promoções em dias de menor movimento para aumentar o volume de pedidos',
            'Reduzir o tempo de preparo em 15% para melhorar a satisfação do cliente',
            'Adicionar mais opções de sobremesas ao cardápio',
            'Responder a todas as avaliações negativas com soluções concretas',
            'Criar combos especiais para o almoço com preços mais acessíveis',
          ],
          action_plan: {
            short_term: [
              'Revisar processos de preparo para reduzir tempo de entrega',
              'Implementar sistema de resposta automática para avaliações',
              'Criar 3 novas promoções para dias de menor movimento',
            ],
            medium_term: [
              'Desenvolver linha de sobremesas exclusivas',
              'Treinar equipe para melhorar tempo de resposta',
              'Revisar precificação de itens menos populares',
            ],
            long_term: [
              'Expandir cardápio com novas categorias',
              'Implementar programa de fidelidade',
              'Desenvolver estratégia de marketing digital específica',
            ],
          },
        });
        setIsLoading(false);
      }, 1500);
    } catch (err) {
      console.error('Erro ao obter relatório completo:', err);
      setError(err instanceof Error ? err.message : 'Erro ao obter relatório completo');
      setIsLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!analysisId || !reportData) return;
    
    try {
      setIsDownloading(true);
      
      // Gerar um ID de relatório baseado no nome do restaurante
      const reportId = `report_${reportData.basic_info.name.toLowerCase().replace(/\s+/g, '_')}`;
      
      // Baixar o PDF
      const pdfBlob = await downloadReportPDF(reportId, analysisId);
      
      // Iniciar o download no navegador
      startDownload(pdfBlob, `Relatório_${reportData.basic_info.name}.pdf`);
    } catch (err) {
      console.error('Erro ao baixar PDF:', err);
      alert('Não foi possível baixar o relatório. Por favor, tente novamente mais tarde.');
    } finally {
      setIsDownloading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-12 px-4 flex flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
        <h2 className="text-xl font-semibold mb-2">Carregando seu relatório</h2>
        <p className="text-gray-500">Por favor, aguarde enquanto preparamos seu relatório completo...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-red-700 mb-2">Erro ao carregar relatório</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => router.push('/analysis')}
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90"
          >
            Voltar para a análise
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-primary">Relatório Completo</h1>
          <div className="flex items-center gap-3">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              Versão Completa
            </span>
            <button
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 flex items-center gap-2"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Baixando...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" />
                  Baixar PDF
                </>
              )}
            </button>
          </div>
        </div>

        {/* Informações Básicas */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">1. Informações Básicas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Dados do Restaurante</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Nome</p>
                  <p className="font-medium">{reportData.basic_info.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Categoria Principal</p>
                  <p className="font-medium">{reportData.basic_info.main_category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Endereço</p>
                  <p className="font-medium">{reportData.basic_info.address}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Tempo no iFood</p>
                  <p className="font-medium">{reportData.basic_info.time_on_platform}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Horário de Funcionamento</p>
                  <p className="font-medium">{reportData.basic_info.operating_hours}</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-3">Pontuação Geral</h3>
              <div className="flex items-center mb-4">
                <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-white text-3xl font-bold">
                  {reportData.overall_score}
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">de 10 pontos possíveis</p>
                </div>
              </div>
              <h4 className="text-md font-medium mb-2">Pontuação por Categoria</h4>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Cardápio</span>
                    <span className="text-sm font-medium">{reportData.category_scores.menu}/10</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary rounded-full h-2"
                      style={{ width: `${reportData.category_scores.menu * 10}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Atendimento</span>
                    <span className="text-sm font-medium">{reportData.category_scores.service}/10</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary rounded-full h-2"
                      style={{ width: `${reportData.category_scores.service * 10}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Preços</span>
                    <span className="text-sm font-medium">{reportData.category_scores.pricing}/10</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary rounded-full h-2"
                      style={{ width: `${reportData.category_scores.pricing * 10}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Visibilidade</span>
                    <span className="text-sm font-medium">{reportData.category_scores.visibility}/10</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary rounded-full h-2"
                      style={{ width: `${reportData.category_scores.visibility * 10}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pontos Fortes e Fracos */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">2. Pontos Fortes e Fracos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-3 text-green-700">Pontos Fortes</h3>
              <ul className="space-y-2">
                {reportData.strengths.map((strength: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-green-200 text-green-800 text-xs font-medium mr-2 mt-0.5">
                      {index + 1}
                    </span>
                    <span className="text-gray-800">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-3 text-red-700">Pontos Fracos</h3>
              <ul className="space-y-2">
                {reportData.weaknesses.map((weakness: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-red-200 text-red-800 text-xs font-medium mr-2 mt-0.5">
                      {index + 1}
                    </span>
                    <span className="text-gray-800">{weakness}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Análise do Cardápio */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">3. Análise do Cardápio</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Estatísticas do Cardápio</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Total de Itens</p>
                    <p className="font-medium">{reportData.menu_analysis.stats.total_items}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Preço Médio</p>
                    <p className="font-medium">R$ {reportData.menu_analysis.stats.average_price.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Item Mais Caro</p>
                    <p className="font-medium">
                      {reportData.menu_analysis.stats.most_expensive_item} - R${' '}
                      {reportData.menu_analysis.stats.most_expensive_price.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Item Mais Barato</p>
                    <p className="font-medium">
                      {reportData.menu_analysis.stats.cheapest_item} - R${' '}
                      {reportData.menu_analysis.stats.cheapest_price.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-3">Análise Qualitativa</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-md font-medium mb-2 text-green-700">Pontos Fortes</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {reportData.menu_analysis.strengths.map((item: string, index: number) => (
                      <li key={index} className="text-gray-800">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-md font-medium mb-2 text-red-700">Pontos Fracos</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {reportData.menu_analysis.weaknesses.map((item: string, index: number) => (
                      <li key={index} className="text-gray-800">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Análise de Avaliações */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">4. Análise de Avaliações</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Estatísticas de Avaliações</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Avaliação Média</p>
                    <p className="font-medium">{reportData.ratings_analysis.stats.average_rating}/5.0</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total de Avaliações</p>
                    <p className="font-medium">{reportData.ratings_analysis.stats.total_ratings}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Avaliações 5 estrelas</p>
                    <p className="font-medium">{reportData.ratings_analysis.stats.five_star_percentage}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Avaliações 1 estrela</p>
                    <p className="font-medium">{reportData.ratings_analysis.stats.one_star_percentage}%</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-3">Comentários Relevantes</h3>
              <div className="space-y-3">
                {reportData.ratings_analysis.relevant_comments.map((comment: string, index: number) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-gray-800 italic">"{comment}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Recomendações */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">5. Recomendações</h2>
          <div className="bg-blue-50 p-6 rounded-lg mb-6">
            <h3 className="text-lg font-medium mb-3 text-blue-700">Recomendações Principais</h3>
            <ul className="space-y-3">
              {reportData.recommendations.map((recommendation: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-200 text-blue-800 text-sm font-medium mr-3 mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-gray-800">{recommendation}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Plano de Ação */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">6. Plano de Ação</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-3 text-green-700">Curto Prazo (1-30 dias)</h3>
              <ul className="space-y-2">
                {reportData.action_plan.short_term.map((action: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-green-200 text-green-800 text-xs font-medium mr-2 mt-0.5">
                      {index + 1}
                    </span>
                    <span className="text-gray-800">{action}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-amber-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-3 text-amber-700">Médio Prazo (1-3 meses)</h3>
              <ul className="space-y-2">
                {reportData.action_plan.medium_term.map((action: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-amber-200 text-amber-800 text-xs font-medium mr-2 mt-0.5">
                      {index + 1}
                    </span>
                    <span className="text-gray-800">{action}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-3 text-blue-700">Longo Prazo (3+ meses)</h3>
              <ul className="space-y-2">
                {reportData.action_plan.long_term.map((action: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-200 text-blue-800 text-xs font-medium mr-2 mt-0.5">
                      {index + 1}
                    </span>
                    <span className="text-gray-800">{action}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Rodapé */}
        <div className="mt-12 pt-6 border-t text-center">
          <p className="text-gray-500 text-sm">
            Relatório gerado pelo iFood Perfeito em {new Date().toLocaleDateString()}
          </p>
          <p className="text-gray-500 text-sm mt-1">
            Para mais informações ou suporte, entre em contato conosco em suporte@ifoodperfeito.com.br
          </p>
        </div>
      </div>
    </div>
  );
} 