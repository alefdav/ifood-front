'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle } from 'lucide-react';

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Obter o ID do pagamento da URL
    const paymentIdFromUrl = searchParams.get('payment_id');
    
    if (paymentIdFromUrl) {
      setPaymentId(paymentIdFromUrl);
    }
    
    // Iniciar contagem regressiva para redirecionamento
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Redirecionar para a página do relatório completo
          router.push(`/report/full?payment_id=${paymentIdFromUrl}`);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [searchParams, router]);

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Pagamento Confirmado!
        </h1>
        
        <p className="text-gray-600 mb-6">
          Obrigado pela sua compra. Seu relatório completo está sendo preparado e estará disponível em instantes.
        </p>
        
        <div className="bg-gray-50 p-4 rounded-md mb-6">
          <p className="text-sm text-gray-500">
            ID do Pagamento: <span className="font-medium">{paymentId}</span>
          </p>
        </div>
        
        <p className="text-gray-600 mb-2">
          Você será redirecionado para o relatório em <span className="font-bold">{countdown}</span> segundos.
        </p>
        
        <button
          onClick={() => router.push(`/report/full?payment_id=${paymentId}`)}
          className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
        >
          Ver Relatório Agora
        </button>
      </div>
    </div>
  );
} 