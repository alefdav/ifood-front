import { NextResponse } from 'next/server';
import { analysisDatabase } from '@/lib/database';
import { dynamic } from '../route-config';

export { dynamic };

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { analysisId } = body;
    
    if (!analysisId) {
      return NextResponse.json(
        { message: 'ID da análise não fornecido' },
        { status: 400 }
      );
    }
    
    const analysis = analysisDatabase[analysisId];
    
    if (!analysis) {
      return NextResponse.json(
        { message: 'Análise não encontrada' },
        { status: 404 }
      );
    }
    
    // Registrar download
    if (!analysis.downloads) {
      analysis.downloads = [];
    }
    
    analysis.downloads.push({
      timestamp: new Date().toISOString(),
      ip: request.headers.get('x-forwarded-for') || 'unknown'
    });
    
    return NextResponse.json({
      message: 'Download registrado com sucesso',
      downloadCount: analysis.downloads.length
    });
    
  } catch (error) {
    console.error('Erro ao registrar download:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
} 