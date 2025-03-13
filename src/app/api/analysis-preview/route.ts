import { NextResponse } from 'next/server';
import { analysisDatabase } from '@/lib/database';

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
    
    // Retornar dados da análise para a prévia
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
    
  } catch (error) {
    console.error('Erro ao obter prévia da análise:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
} 