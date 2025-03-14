import { NextResponse } from 'next/server';
import { analysisDatabase } from '@/lib/database';
import { dynamic } from '../route-config';
import { checkScrapingStatus } from '@/lib/scraper-api';

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
    
    // Verificar o status da raspagem
    if (analysis.scrapingTaskId) {
      try {
        const scrapingStatus = await checkScrapingStatus(analysis.scrapingTaskId);
        
        // Atualizar o status da análise com base no status da raspagem
        if (scrapingStatus.status === 'completed' && analysis.status !== 'completed') {
          analysis.status = 'completed';
          analysis.updatedAt = new Date().toISOString();
        } else if (scrapingStatus.status === 'failed' && analysis.status !== 'failed') {
          analysis.status = 'failed';
          analysis.updatedAt = new Date().toISOString();
          analysis.error = scrapingStatus.message || 'Falha na raspagem de dados';
        } else if (scrapingStatus.status === 'processing' && analysis.status !== 'processing') {
          analysis.status = 'processing';
          analysis.updatedAt = new Date().toISOString();
        }
        
        // Adicionar informações de progresso, se disponíveis
        if (scrapingStatus.progress !== undefined) {
          analysis.progress = scrapingStatus.progress;
        }
      } catch (error: any) {
        console.error('Erro ao verificar status da raspagem:', error);
        // Não falhar a requisição se houver erro ao verificar o status da raspagem
      }
    }
    
    return NextResponse.json({
      id: analysis.id,
      status: analysis.status,
      progress: analysis.progress,
      error: analysis.error,
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