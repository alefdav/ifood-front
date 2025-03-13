import { NextResponse } from 'next/server';
import { analysisDatabase } from '@/lib/database';
import { dynamic } from '../route-config';

export { dynamic };

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { analysisId, name, email } = body;
    
    if (!analysisId) {
      return NextResponse.json(
        { message: 'ID da análise não fornecido' },
        { status: 400 }
      );
    }
    
    if (!email) {
      return NextResponse.json(
        { message: 'E-mail é obrigatório' },
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
    
    // Registrar informações do usuário
    analysisDatabase[analysisId].userInfo = {
      name,
      email,
      savedAt: new Date().toISOString()
    };
    
    // Gerar URL para download do relatório
    analysisDatabase[analysisId].reportUrl = `/api/download-report?id=${analysisId}`;
    
    return NextResponse.json({
      message: 'Informações registradas com sucesso',
      analysisId,
      reportUrl: analysisDatabase[analysisId].reportUrl
    });
    
  } catch (error) {
    console.error('Erro ao processar informações:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
} 