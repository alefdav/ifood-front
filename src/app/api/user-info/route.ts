import { NextResponse } from 'next/server';
import { analysisDatabase } from '@/lib/database';
import { dynamic } from '../route-config';

export { dynamic };

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const analysisId = searchParams.get('analysisId');
    
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
    
    // Se não houver informações do usuário, retornar objeto vazio
    if (!analysis.userInfo) {
      return NextResponse.json({});
    }
    
    // Retornar informações do usuário
    return NextResponse.json({
      name: analysis.userInfo.name || '',
      email: analysis.userInfo.email || '',
      whatsapp: analysis.userInfo.whatsapp || ''
    });
    
  } catch (error) {
    console.error('Erro ao obter informações do usuário:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
} 