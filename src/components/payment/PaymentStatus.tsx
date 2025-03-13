'use client';

import { useEffect, useState } from 'react';
import { verificarStatusPagamento } from '@/lib/payment/stripe';
import { CheckCircle, XCircle, AlertCircle, Loader2 } from 'lucide-react';

interface PaymentStatusProps {
  paymentId: string;
  onStatusChange?: (status: 'pending' | 'completed' | 'failed') => void;
  className?: string;
}

export function PaymentStatus({
  paymentId,
  onStatusChange,
  className = '',
}: PaymentStatusProps) {
  const [status, setStatus] = useState<'pending' | 'completed' | 'failed' | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (paymentId) {
      checkPaymentStatus();
    }
  }, [paymentId]);

  const checkPaymentStatus = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const paymentData = await verificarStatusPagamento(paymentId);
      setStatus(paymentData.status);

      // Notificar o componente pai sobre a mudança de status
      if (onStatusChange) {
        onStatusChange(paymentData.status);
      }

      // Se o pagamento ainda estiver pendente, verificar novamente após 5 segundos
      if (paymentData.status === 'pending') {
        setTimeout(() => {
          checkPaymentStatus();
        }, 5000);
      }
    } catch (err) {
      console.error('Erro ao verificar status do pagamento:', err);
      setError(err instanceof Error ? err.message : 'Erro ao verificar status do pagamento');
    } finally {
      setIsLoading(false);
    }
  };

  const renderStatus = () => {
    if (isLoading) {
      return (
        <div className="flex items-center text-gray-600">
          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          <span>Verificando status...</span>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center text-red-600">
          <AlertCircle className="w-5 h-5 mr-2" />
          <span>{error}</span>
        </div>
      );
    }

    switch (status) {
      case 'completed':
        return (
          <div className="flex items-center text-green-600">
            <CheckCircle className="w-5 h-5 mr-2" />
            <span>Pagamento confirmado</span>
          </div>
        );
      case 'pending':
        return (
          <div className="flex items-center text-amber-600">
            <AlertCircle className="w-5 h-5 mr-2" />
            <span>Pagamento pendente</span>
          </div>
        );
      case 'failed':
        return (
          <div className="flex items-center text-red-600">
            <XCircle className="w-5 h-5 mr-2" />
            <span>Pagamento falhou</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center text-gray-600">
            <AlertCircle className="w-5 h-5 mr-2" />
            <span>Status desconhecido</span>
          </div>
        );
    }
  };

  return (
    <div className={`payment-status ${className}`}>
      {renderStatus()}
    </div>
  );
} 