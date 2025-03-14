import { NextResponse } from 'next/server';
import { analysisDatabase } from '@/lib/database';
import { dynamic } from '../route-config';
import { getScrapingResults } from '@/lib/scraper-api';
import { analyzeMenu, generateRecommendations } from '@/lib/scraper';

export { dynamic };

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { message: 'ID da análise não fornecido' },
        { status: 400 }
      );
    }
    
    const analysis = analysisDatabase[id];
    
    if (!analysis) {
      return NextResponse.json(
        { message: 'Análise não encontrada' },
        { status: 404 }
      );
    }
    
    if (analysis.status !== 'completed') {
      return NextResponse.json(
        { message: 'Análise ainda não foi concluída' },
        { status: 400 }
      );
    }
    
    // Se os resultados já estiverem armazenados, retorná-los
    if (analysis.results) {
      return NextResponse.json({
        id: analysis.id,
        restaurantName: analysis.results.restaurantName,
        restaurantImage: analysis.results.restaurantImage,
        overallScore: analysis.results.overallScore,
        categories: analysis.results.categories,
        strengths: analysis.results.strengths,
        weaknesses: analysis.results.weaknesses,
        recommendations: analysis.results.recommendations
      });
    }
    
    // Caso contrário, obter os resultados da raspagem
    try {
      const scrapingResults = await getScrapingResults(analysis.scrapingTaskId);
      
      // Processar os resultados da raspagem para gerar a análise
      const menuAnalysis = analyzeMenu(scrapingResults.categories);
      const recommendations = generateRecommendations({
        name: scrapingResults.restaurantName,
        category: '',
        rating: scrapingResults.rating || 0,
        deliveryTime: typeof scrapingResults.deliveryTime === 'string' 
          ? parseInt(scrapingResults.deliveryTime.replace(/\D/g, '')) || 0 
          : scrapingResults.deliveryTime || 0,
        deliveryFee: typeof scrapingResults.deliveryFee === 'string'
          ? parseFloat(scrapingResults.deliveryFee.replace(/[^\d,]/g, '').replace(',', '.')) || 0
          : scrapingResults.deliveryFee || 0,
        imageUrl: scrapingResults.restaurantImage || '',
        menuCategories: scrapingResults.categories.map(cat => ({
          name: cat.name,
          items: cat.items
        })),
        address: scrapingResults.address || '',
        openingHours: scrapingResults.openingHours || ''
      });
      
      // Calcular pontuação geral com base nas categorias
      const categoryScores = [
        { name: 'Cardápio', score: menuAnalysis.length > 0 ? 7.5 : 5.0 },
        { name: 'Fotos', score: scrapingResults.categories.some(cat => 
          cat.items.some(item => item.imageUrl)) ? 8.0 : 4.0 },
        { name: 'Preços', score: 7.0 },
        { name: 'Avaliações', score: scrapingResults.rating ? scrapingResults.rating * 2 : 5.0 }
      ];
      
      const overallScore = categoryScores.reduce((sum, cat) => sum + cat.score, 0) / categoryScores.length;
      
      // Armazenar os resultados processados
      analysis.results = {
        restaurantName: scrapingResults.restaurantName,
        restaurantImage: scrapingResults.restaurantImage,
        overallScore: parseFloat(overallScore.toFixed(1)),
        categories: categoryScores,
        strengths: recommendations.strengths,
        weaknesses: recommendations.weaknesses,
        recommendations: recommendations.recommendations.map(rec => ({
          title: rec.description,
          description: `Prioridade ${rec.priority}: Categoria ${rec.category}`,
          priority: rec.priority
        }))
      };
      
      // Retornar os resultados processados
      return NextResponse.json({
        id: analysis.id,
        restaurantName: analysis.results.restaurantName,
        restaurantImage: analysis.results.restaurantImage,
        overallScore: analysis.results.overallScore,
        categories: analysis.results.categories,
        strengths: analysis.results.strengths,
        weaknesses: analysis.results.weaknesses,
        recommendations: analysis.results.recommendations
      });
      
    } catch (error: any) {
      console.error('Erro ao obter resultados da raspagem:', error);
      return NextResponse.json(
        { message: 'Erro ao processar resultados da análise' },
        { status: 500 }
      );
    }
    
  } catch (error) {
    console.error('Erro ao obter prévia da análise:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
} 