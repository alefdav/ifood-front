/**
 * Configuração e utilitários do Stripe para o frontend
 */

// Função para iniciar um pagamento
export async function iniciarPagamento({
  amount,
  description,
  customerEmail,
  customerName,
  metadata,
  returnUrl,
}: {
  amount: number;
  description: string;
  customerEmail: string;
  customerName: string;
  metadata?: Record<string, any>;
  returnUrl: string;
}): Promise<{
  paymentId: string;
  checkoutUrl: string;
  status: string;
}> {
  try {
    // URL do serviço de pagamento
    const paymentServiceUrl = process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL || 'http://localhost:8003';
    
    // Fazer requisição para o serviço de pagamento
    const response = await fetch(`${paymentServiceUrl}/api/v1/create-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        currency: 'brl',
        description,
        customer_email: customerEmail,
        customer_name: customerName,
        metadata,
        return_url: returnUrl,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Erro ao iniciar pagamento');
    }

    const data = await response.json();
    return {
      paymentId: data.payment_id,
      checkoutUrl: data.checkout_url,
      status: data.status,
    };
  } catch (error) {
    console.error('Erro ao iniciar pagamento:', error);
    throw error;
  }
}

/**
 * Verifica o status de um pagamento
 * @param paymentId ID do pagamento a ser verificado
 * @returns Objeto com informações do status do pagamento
 */
export async function verificarStatusPagamento(paymentId: string): Promise<{
  status: 'pending' | 'completed' | 'failed';
  metadata?: Record<string, any>;
}> {
  try {
    // Em um ambiente real, faríamos uma chamada para o serviço de pagamento
    // Exemplo: const response = await fetch(`/api/payments/${paymentId}`);
    
    // Simulação para fins de demonstração
    console.log(`Verificando status do pagamento: ${paymentId}`);
    
    // Simular um atraso de rede
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Simulação de resposta baseada no ID do pagamento
    // Em um cenário real, isso viria da API
    if (paymentId.includes('success')) {
      return {
        status: 'completed',
        metadata: {
          restaurantId: 'rest123',
          userEmail: 'cliente@exemplo.com',
          reportType: 'full',
          purchaseDate: new Date().toISOString()
        }
      };
    } else if (paymentId.includes('pending')) {
      return {
        status: 'pending',
        metadata: {
          restaurantId: 'rest123',
          userEmail: 'cliente@exemplo.com',
          reportType: 'full'
        }
      };
    } else {
      return {
        status: 'failed',
        metadata: {
          restaurantId: 'rest123',
          userEmail: 'cliente@exemplo.com',
          reportType: 'full',
          errorCode: 'payment_failed'
        }
      };
    }
  } catch (error) {
    console.error('Erro ao verificar status do pagamento:', error);
    throw new Error('Não foi possível verificar o status do pagamento');
  }
}

// Função para reembolsar um pagamento
export async function reembolsarPagamento(paymentId: string): Promise<{
  paymentId: string;
  refundId: string;
  status: string;
  amount: number;
  refundedAt: string;
}> {
  try {
    // URL do serviço de pagamento
    const paymentServiceUrl = process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL || 'http://localhost:8003';
    
    // Fazer requisição para o serviço de pagamento
    const response = await fetch(`${paymentServiceUrl}/api/v1/refund`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        payment_id: paymentId,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Erro ao reembolsar pagamento');
    }

    const data = await response.json();
    return {
      paymentId: data.payment_id,
      refundId: data.refund_id,
      status: data.status,
      amount: data.amount,
      refundedAt: data.refunded_at,
    };
  } catch (error) {
    console.error('Erro ao reembolsar pagamento:', error);
    throw error;
  }
}

/**
 * Cria uma sessão de pagamento
 * @param data Dados para criação da sessão de pagamento
 * @returns URL da sessão de pagamento e ID da sessão
 */
export async function criarSessaoPagamento(data: {
  amount: number;
  currency: string;
  metadata: Record<string, any>;
  returnUrl: string;
}): Promise<{ url: string; sessionId: string }> {
  try {
    // Em um ambiente real, faríamos uma chamada para o serviço de pagamento
    // Exemplo: const response = await fetch('/api/payments/create-session', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data)
    // });
    
    // Simulação para fins de demonstração
    console.log('Criando sessão de pagamento:', data);
    
    // Simular um atraso de rede
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Gerar um ID de sessão aleatório
    const sessionId = `sess_${Math.random().toString(36).substring(2, 15)}`;
    
    // Em um cenário real, o Stripe retornaria a URL de checkout
    // Aqui estamos simulando com uma URL que inclui o ID da sessão
    // e redireciona para nossa página de relatório com um status simulado
    const paymentStatus = Math.random() > 0.3 ? 'success' : 'pending';
    const url = `${data.returnUrl}?payment_id=${paymentStatus}_${sessionId}`;
    
    return {
      url,
      sessionId
    };
  } catch (error) {
    console.error('Erro ao criar sessão de pagamento:', error);
    throw new Error('Não foi possível criar a sessão de pagamento');
  }
} 