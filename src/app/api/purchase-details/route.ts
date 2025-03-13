import { NextResponse } from 'next/server';
import { analysisDatabase } from '@/lib/database';
import { dynamic } from '../route-config';

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
    
    // Retornar detalhes da análise
    return NextResponse.json({
      id: analysis.id,
      restaurantName: analysis.results.restaurantName,
      restaurantImage: analysis.results.restaurantImage,
      email: analysis.userInfo ? analysis.userInfo.email : '',
      downloadUrl: analysis.reportUrl
    });
    
  } catch (error) {
    console.error('Erro ao obter detalhes da análise:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
} 