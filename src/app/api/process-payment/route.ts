import { NextResponse } from 'next/server';
import { analysisDatabase } from '@/lib/database';

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
    
    // Em um cenário real, aqui seria feita a integração com o Stripe
    // Por exemplo:
    // const paymentIntent = await stripe.paymentIntents.create({
    //   amount: 1990, // R$ 19,90 em centavos
    //   currency: 'brl',
    //   payment_method_types: ['card'],
    //   receipt_email: email,
    //   metadata: {
    //     analysisId,
    //     restaurantName: analysis.results.restaurantName
    //   }
    // });
    
    // Simular processamento de pagamento
    // Registrar informações de pagamento
    analysisDatabase[analysisId].payment = {
      status: 'completed',
      amount: 1990, // R$ 19,90 em centavos
      currency: 'BRL',
      paymentMethod: 'card',
      name,
      email,
      paidAt: new Date().toISOString()
    };
    
    // Gerar URL para download do relatório
    analysisDatabase[analysisId].reportUrl = `/api/download-report?id=${analysisId}`;
    
    // Em um cenário real, aqui enviaríamos um e-mail com o relatório
    // Por exemplo:
    // await sendEmail({
    //   to: email,
    //   subject: `Relatório de Análise - ${analysis.results.restaurantName}`,
    //   text: `Olá ${name},\n\nSeu pagamento foi processado com sucesso. Acesse o relatório completo em: ${process.env.BASE_URL}/success?analysisId=${analysisId}`,
    //   attachments: [
    //     {
    //       filename: `Analise_${analysis.results.restaurantName.replace(/\s+/g, '_')}.pdf`,
    //       path: `/tmp/reports/${analysisId}.pdf`
    //     }
    //   ]
    // });
    
    return NextResponse.json({
      message: 'Pagamento processado com sucesso',
      analysisId,
      reportUrl: analysisDatabase[analysisId].reportUrl
    });
    
  } catch (error) {
    console.error('Erro ao processar pagamento:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
} 