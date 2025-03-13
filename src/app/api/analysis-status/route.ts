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
    
    return NextResponse.json({
      id: analysis.id,
      status: analysis.status,
      updatedAt: analysis.updatedAt
    });
    
  } catch (error) {
    console.error('Erro ao verificar status da análise:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
} 