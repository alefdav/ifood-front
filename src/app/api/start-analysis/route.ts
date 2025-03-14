import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { analysisDatabase } from '@/lib/database';
import { dynamic } from '../route-config';
import { startScraping, checkScraperHealth } from '@/lib/scraper-api';

export { dynamic };

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { link } = body;
    
    // Validar o link
    if (!link || !link.includes('ifood.com.br')) {
      return NextResponse.json(
        { message: 'Link inválido. Por favor, forneça um link válido do iFood.' },
        { status: 400 }
      );
    }
    
    // Verificar se o serviço de raspagem está disponível
    const isScraperHealthy = await checkScraperHealth().catch(() => false);
    if (!isScraperHealthy) {
      return NextResponse.json(
        { message: 'Serviço de raspagem temporariamente indisponível. Tente novamente mais tarde.' },
        { status: 503 }
      );
    }
    
    // Gerar ID único para a análise
    const analysisId = uuidv4();
    
    // Iniciar a raspagem de dados
    let scrapingTaskId;
    try {
      scrapingTaskId = await startScraping(link);
    } catch (error: any) {
      return NextResponse.json(
        { message: error.message || 'Erro ao iniciar raspagem de dados' },
        { status: 500 }
      );
    }
    
    // Armazenar dados iniciais da análise
    analysisDatabase[analysisId] = {
      id: analysisId,
      link,
      scrapingTaskId,
      status: 'processing',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    return NextResponse.json({ 
      message: 'Análise iniciada com sucesso',
      analysisId 
    });
    
  } catch (error) {
    console.error('Erro ao iniciar análise:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
} 