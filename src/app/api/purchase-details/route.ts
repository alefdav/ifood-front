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
    
    if (!analysis.payment || analysis.payment.status !== 'completed') {
      return NextResponse.json(
        { message: 'Pagamento não encontrado ou não concluído' },
        { status: 400 }
      );
    }
    
    // Retornar detalhes da compra
    return NextResponse.json({
      id: analysis.id,
      restaurantName: analysis.results.restaurantName,
      restaurantImage: analysis.results.restaurantImage,
      email: analysis.payment.email || (analysis.userInfo ? analysis.userInfo.email : ''),
      purchaseDate: analysis.payment.paidAt,
      downloadUrl: analysis.reportUrl
    });
    
  } catch (error) {
    console.error('Erro ao obter detalhes da compra:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
} 