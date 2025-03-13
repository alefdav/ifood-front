import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { analysisDatabase } from '@/lib/database';

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
    
    // Gerar ID único para a análise
    const analysisId = uuidv4();
    
    // Armazenar dados iniciais da análise
    analysisDatabase[analysisId] = {
      id: analysisId,
      link,
      status: 'processing',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    // Em um cenário real, aqui iniciaríamos o processo de scraping e análise
    // Por exemplo, chamar um serviço Python via API ou fila de mensagens
    
    // Simular início do processo de análise
    setTimeout(() => {
      analysisDatabase[analysisId].status = 'completed';
      analysisDatabase[analysisId].updatedAt = new Date().toISOString();
      
      // Dados simulados da análise
      analysisDatabase[analysisId].results = {
        restaurantName: 'Restaurante Exemplo',
        restaurantImage: 'https://via.placeholder.com/150',
        overallScore: 7.2,
        categories: [
          { name: 'Cardápio', score: 8.5 },
          { name: 'Fotos', score: 6.0 },
          { name: 'Preços', score: 7.8 },
          { name: 'Avaliações', score: 6.5 }
        ],
        strengths: [
          'Boas avaliações de atendimento',
          'Cardápio bem organizado',
          'Tempo de entrega competitivo'
        ],
        weaknesses: [
          'Poucas fotos dos pratos',
          'Descrições incompletas dos itens',
          'Preços acima da média da região'
        ],
        recommendations: [
          {
            title: 'Adicionar mais fotos dos pratos principais',
            description: 'Estabelecimentos com fotos de qualidade têm 35% mais chances de conversão.',
            priority: 'alta'
          },
          {
            title: 'Melhorar descrições dos pratos',
            description: 'Descrições detalhadas aumentam as vendas em até 25%.',
            priority: 'média'
          },
          {
            title: 'Revisar estratégia de preços',
            description: 'Seus preços estão 15% acima da média da região para itens similares.',
            priority: 'alta'
          },
          {
            title: 'Implementar promoções em horários específicos',
            description: 'Análise de dados mostra oportunidade de aumento de vendas em horários ociosos.',
            priority: 'média'
          },
          {
            title: 'Otimizar tempo de preparo',
            description: 'Reduzir o tempo de preparo pode melhorar seu posicionamento no app.',
            priority: 'baixa'
          }
        ]
      };
    }, 10000); // Simular 10 segundos de processamento
    
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