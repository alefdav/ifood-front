import { NextResponse } from 'next/server';
import { scrapeEstablishment, generateRecommendations } from '@/lib/scraper';

export async function POST(request: Request) {
  try {
    // Extrair o link do corpo da requisição
    const body = await request.json();
    const { link } = body;

    // Validar o link
    if (!link) {
      return NextResponse.json(
        { error: 'Link não fornecido' },
        { status: 400 }
      );
    }

    if (!link.includes('ifood.com.br')) {
      return NextResponse.json(
        { error: 'Link inválido. Por favor, forneça um link válido do iFood' },
        { status: 400 }
      );
    }

    // Extrair dados do estabelecimento usando o scraper
    const establishmentData = await scrapeEstablishment(link);
    
    // Gerar recomendações baseadas nos dados
    const analysis = generateRecommendations(establishmentData);
    
    // Calcular pontuação geral (0-100)
    const score = calculateScore(establishmentData, analysis);
    
    // Construir resposta
    const response = {
      establishment: {
        name: establishmentData.name,
        category: establishmentData.category,
        rating: establishmentData.rating,
        deliveryTime: establishmentData.deliveryTime,
        deliveryFee: establishmentData.deliveryFee,
        imageUrl: establishmentData.imageUrl,
        address: establishmentData.address,
        openingHours: establishmentData.openingHours
      },
      analysis: {
        score,
        strengths: analysis.strengths,
        weaknesses: analysis.weaknesses,
        recommendations: analysis.recommendations
      }
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Erro ao processar análise:', error);
    return NextResponse.json(
      { error: 'Erro ao processar a análise. Por favor, tente novamente.' },
      { status: 500 }
    );
  }
}

/**
 * Calcula uma pontuação geral (0-100) baseada nos dados e análise
 */
function calculateScore(
  data: any,
  analysis: { strengths: string[]; weaknesses: string[]; recommendations: any[] }
): number {
  // Base score
  let score = 70;
  
  // Ajustar com base na avaliação (0-20 pontos)
  score += Math.min(20, Math.max(0, (data.rating - 3) * 10));
  
  // Ajustar com base nos pontos fortes (até +10 pontos)
  score += Math.min(10, analysis.strengths.length * 2);
  
  // Ajustar com base nos pontos fracos (até -20 pontos)
  score -= Math.min(20, analysis.weaknesses.length * 3);
  
  // Ajustar com base nas recomendações de alta prioridade (até -10 pontos)
  const highPriorityRecs = analysis.recommendations.filter(rec => rec.priority === 'Alta').length;
  score -= Math.min(10, highPriorityRecs * 2);
  
  // Garantir que a pontuação esteja entre 0 e 100
  return Math.max(0, Math.min(100, Math.round(score)));
} 