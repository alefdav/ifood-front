'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { verificarStatusPagamento } from '@/lib/payment/stripe';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export default function PaymentResultPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'failed' | 'canceled'>('loading');
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const success = searchParams.get('success');
    const sessionId = searchParams.get('session_id');

    if (success === 'true' && sessionId) {
      checkPaymentStatus(sessionId);
    } else {
      setStatus('canceled');
    }
  }, [searchParams]);

  const checkPaymentStatus = async (paymentId: string) => {
    try {
      // Verificar o status do pagamento
      const paymentData = await verificarStatusPagamento(paymentId);
      setPaymentDetails(paymentData);

      // Atualizar o status com base no status do pagamento
      if (paymentData.status === 'completed') {
        setStatus('success');
      } else if (paymentData.status === 'failed') {
        setStatus('failed');
      } else if (paymentData.status === 'canceled') {
        setStatus('canceled');
      } else {
        // Se ainda estiver pendente, verificar novamente após 3 segundos
        setTimeout(() => checkPaymentStatus(paymentId), 3000);
      }
    } catch (err) {
      console.error('Erro ao verificar status do pagamento:', err);
      setError(err instanceof Error ? err.message : 'Erro ao verificar status do pagamento');
      setStatus('failed');
    }
  };

  const handleViewReport = () => {
    // Redirecionar para a página do relatório completo
    if (paymentDetails?.paymentId) {
      router.push(`/report/full?payment_id=${paymentDetails.paymentId}`);
    }
  };

  const handleTryAgain = () => {
    // Redirecionar para a página de análise
    router.push('/analysis');
  };

  return (
    <div className="container max-w-md mx-auto py-12">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex flex-col items-center justify-center text-center">
          {status === 'loading' && (
            <>
              <Loader2 className="h-16 w-16 text-primary animate-spin mb-4" />
              <h1 className="text-2xl font-bold mb-2">Processando seu pagamento</h1>
              <p className="text-gray-500 mb-4">
                Estamos verificando o status do seu pagamento. Por favor, aguarde...
              </p>
            </>
          )}

          {status === 'success' && (
            <>
              <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
              <h1 className="text-2xl font-bold mb-2">Pagamento confirmado!</h1>
              <p className="text-gray-500 mb-6">
                Seu pagamento foi processado com sucesso. Agora você pode acessar o relatório completo.
              </p>
              <Button onClick={handleViewReport} className="w-full bg-primary">
                Ver relatório completo
              </Button>
            </>
          )}

          {status === 'failed' && (
            <>
              <XCircle className="h-16 w-16 text-red-500 mb-4" />
              <h1 className="text-2xl font-bold mb-2">Pagamento falhou</h1>
              <p className="text-gray-500 mb-6">
                Houve um problema ao processar seu pagamento. Por favor, tente novamente.
              </p>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <Button onClick={handleTryAgain} className="w-full">
                Tentar novamente
              </Button>
            </>
          )}

          {status === 'canceled' && (
            <>
              <AlertCircle className="h-16 w-16 text-amber-500 mb-4" />
              <h1 className="text-2xl font-bold mb-2">Pagamento cancelado</h1>
              <p className="text-gray-500 mb-6">
                Você cancelou o processo de pagamento. Você pode tentar novamente quando quiser.
              </p>
              <Button onClick={handleTryAgain} className="w-full">
                Tentar novamente
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
} 