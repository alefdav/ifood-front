'use client';

import { useState } from 'react';
import { criarSessaoPagamento } from '@/lib/payment/stripe';
import { Loader2 } from 'lucide-react';

interface PaymentButtonProps {
  amount: number;
  currency?: string;
  metadata: Record<string, any>;
  returnUrl: string;
  className?: string;
  children: React.ReactNode;
}

export function PaymentButton({
  amount,
  currency = 'BRL',
  metadata,
  returnUrl,
  className = '',
  children
}: PaymentButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePayment = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Criar sessão de pagamento
      const { url } = await criarSessaoPagamento({
        amount,
        currency,
        metadata,
        returnUrl
      });

      // Redirecionar para a página de pagamento
      window.location.href = url;
    } catch (err) {
      console.error('Erro ao processar pagamento:', err);
      setError(err instanceof Error ? err.message : 'Erro ao processar pagamento');
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <button
        onClick={handlePayment}
        disabled={isLoading}
        className={`flex items-center justify-center px-4 py-2 rounded-md bg-primary text-white font-medium hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed ${className}`}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Processando...
          </>
        ) : (
          children
        )}
      </button>
      
      {error && (
        <div className="mt-2 text-sm text-red-600">
          {error}
        </div>
      )}
    </div>
  );
} 