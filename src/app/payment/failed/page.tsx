'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { XCircle } from 'lucide-react';

export default function PaymentFailedPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [errorCode, setErrorCode] = useState<string | null>(null);

  useEffect(() => {
    // Obter o ID do pagamento e código de erro da URL
    const paymentIdFromUrl = searchParams.get('payment_id');
    const errorCodeFromUrl = searchParams.get('error_code');
    
    if (paymentIdFromUrl) {
      setPaymentId(paymentIdFromUrl);
    }
    
    if (errorCodeFromUrl) {
      setErrorCode(errorCodeFromUrl);
    }
  }, [searchParams]);

  const getErrorMessage = () => {
    switch (errorCode) {
      case 'card_declined':
        return 'Seu cartão foi recusado. Por favor, tente outro método de pagamento.';
      case 'expired_card':
        return 'Seu cartão está expirado. Por favor, use um cartão válido.';
      case 'insufficient_funds':
        return 'Seu cartão não possui fundos suficientes. Por favor, tente outro método de pagamento.';
      case 'processing_error':
        return 'Ocorreu um erro ao processar o pagamento. Por favor, tente novamente mais tarde.';
      default:
        return 'Ocorreu um erro ao processar o pagamento. Por favor, tente novamente.';
    }
  };

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
            <XCircle className="w-10 h-10 text-red-600" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Pagamento não Concluído
        </h1>
        
        <p className="text-gray-600 mb-6">
          {getErrorMessage()}
        </p>
        
        {paymentId && (
          <div className="bg-gray-50 p-4 rounded-md mb-6">
            <p className="text-sm text-gray-500">
              ID do Pagamento: <span className="font-medium">{paymentId}</span>
            </p>
            {errorCode && (
              <p className="text-sm text-gray-500 mt-1">
                Código de Erro: <span className="font-medium">{errorCode}</span>
              </p>
            )}
          </div>
        )}
        
        <div className="flex flex-col space-y-3">
          <button
            onClick={() => router.push('/analysis')}
            className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
          >
            Tentar Novamente
          </button>
          
          <button
            onClick={() => window.location.href = 'mailto:suporte@ifoodperfeito.com.br?subject=Problema%20com%20Pagamento'}
            className="w-full bg-white text-gray-700 border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors"
          >
            Contatar Suporte
          </button>
        </div>
      </div>
    </div>
  );
} 