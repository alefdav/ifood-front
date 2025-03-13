import { NextResponse } from 'next/server';
import { analysisDatabase } from '@/lib/database';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { analysisId, name, email, whatsapp } = body;
    
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
    
    // Salvar informações do usuário
    analysisDatabase[analysisId].userInfo = {
      name,
      email,
      whatsapp,
      savedAt: new Date().toISOString()
    };
    
    return NextResponse.json({
      message: 'Informações salvas com sucesso',
      analysisId
    });
    
  } catch (error) {
    console.error('Erro ao salvar informações do usuário:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
} 