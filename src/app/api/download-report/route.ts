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
    
    // Em um cenário real, aqui geramos o PDF com base nos dados da análise
    // Por exemplo:
    // const pdfBuffer = await generatePDF({
    //   restaurantName: analysis.results.restaurantName,
    //   overallScore: analysis.results.overallScore,
    //   categories: analysis.results.categories,
    //   strengths: analysis.results.strengths,
    //   weaknesses: analysis.results.weaknesses,
    //   recommendations: analysis.results.recommendations
    // });
    
    // return new Response(pdfBuffer, {
    //   headers: {
    //     'Content-Type': 'application/pdf',
    //     'Content-Disposition': `attachment; filename="Analise_${analysis.results.restaurantName.replace(/\s+/g, '_')}.pdf"`
    //   }
    // });
    
    // Como não podemos gerar um PDF real neste exemplo, retornamos um JSON com os dados
    // Em produção, isso seria substituído pelo código acima
    return NextResponse.json({
      message: 'Simulação de download do relatório',
      analysisData: {
        id: analysis.id,
        restaurantName: analysis.results.restaurantName,
        restaurantImage: analysis.results.restaurantImage,
        overallScore: analysis.results.overallScore,
        categories: analysis.results.categories,
        strengths: analysis.results.strengths,
        weaknesses: analysis.results.weaknesses,
        recommendations: analysis.results.recommendations,
        generatedAt: new Date().toISOString(),
        userInfo: analysis.userInfo ? {
          name: analysis.userInfo.name,
          email: analysis.userInfo.email
        } : null
      }
    });
    
  } catch (error) {
    console.error('Erro ao gerar relatório para download:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
} 