'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function PaymentPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const analysisId = searchParams?.get('analysisId');
  
  useEffect(() => {
    if (!analysisId) {
      router.push('/');
    }
    
    // Verificar se já temos informações do usuário
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`/api/user-info?analysisId=${analysisId}`);
        
        if (response.ok) {
          const data = await response.json();
          
          if (data.name || data.email) {
            setFormData(prev => ({
              ...prev,
              name: data.name || '',
              email: data.email || ''
            }));
          }
        }
      } catch (err) {
        console.error('Erro ao buscar informações do usuário:', err);
      }
    };
    
    fetchUserInfo();
  }, [analysisId, router]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'cardNumber') {
      // Formatar número do cartão: XXXX XXXX XXXX XXXX
      const formatted = value
        .replace(/\s/g, '')
        .replace(/\D/g, '')
        .replace(/(\d{4})(?=\d)/g, '$1 ')
        .trim()
        .slice(0, 19);
      
      setFormData({ ...formData, [name]: formatted });
    } else if (name === 'expiryDate') {
      // Formatar data de expiração: MM/YY
      const formatted = value
        .replace(/\D/g, '')
        .replace(/(\d{2})(?=\d)/g, '$1/')
        .trim()
        .slice(0, 5);
      
      setFormData({ ...formData, [name]: formatted });
    } else if (name === 'cvv') {
      // Limitar CVV a 3 ou 4 dígitos
      const formatted = value.replace(/\D/g, '').slice(0, 4);
      
      setFormData({ ...formData, [name]: formatted });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  
  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Por favor, insira o nome do titular do cartão');
      return false;
    }
    
    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setError('Por favor, insira um email válido');
      return false;
    }
    
    if (formData.cardNumber.replace(/\s/g, '').length < 16) {
      setError('Por favor, insira um número de cartão válido');
      return false;
    }
    
    if (!formData.expiryDate.includes('/') || formData.expiryDate.length < 5) {
      setError('Por favor, insira uma data de validade válida (MM/AA)');
      return false;
    }
    
    if (formData.cvv.length < 3) {
      setError('Por favor, insira um código de segurança válido');
      return false;
    }
    
    return true;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsProcessing(true);
    setError('');
    
    try {
      // Simular processamento de pagamento
      setTimeout(async () => {
        try {
          // Aqui seria a integração real com o Stripe
          // Por enquanto, apenas simulamos o sucesso do pagamento
          
          const response = await fetch('/api/process-payment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              analysisId,
              name: formData.name,
              email: formData.email,
              // Não enviamos dados sensíveis do cartão na requisição real
              // Isso seria tratado pelo Stripe
            }),
          });
          
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao processar pagamento');
          }
          
          setPaymentSuccess(true);
          
          // Redirecionar para a página de sucesso após 2 segundos
          setTimeout(() => {
            router.push(`/success?analysisId=${analysisId}`);
          }, 2000);
        } catch (err: any) {
          setError(err.message || 'Ocorreu um erro ao processar o pagamento');
          setIsProcessing(false);
        }
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro ao processar o pagamento');
      setIsProcessing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <h1 className="text-2xl font-bold mb-6 text-center">Finalizar Compra</h1>
            
            {paymentSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Pagamento processado com sucesso!</h2>
                <p className="text-gray-600 mb-6">Redirecionando para a página de download do relatório...</p>
                <div className="animate-pulse">
                  <svg className="h-8 w-8 text-ifood-red mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                  </svg>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-8 pb-4 border-b">
                  <div className="text-gray-600">
                    <div className="font-medium text-gray-800">Relatório completo</div>
                    <div className="text-sm">Análise detalhada do seu estabelecimento</div>
                  </div>
                  <div className="text-xl font-bold text-gray-800">R$ 19,90</div>
                </div>
                
                {error && (
                  <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
                    <p className="font-medium">Erro</p>
                    <p>{error}</p>
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-4">Informações pessoais</h3>
                    
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                          Nome completo
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ifood-red focus:border-ifood-red"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                          E-mail
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ifood-red focus:border-ifood-red"
                          required
                        />
                        <p className="mt-1 text-sm text-gray-500">
                          Enviaremos o relatório para este e-mail
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4">Informações de pagamento</h3>
                    
                    <div className="mb-4">
                      <label htmlFor="cardNumber" className="block text-gray-700 font-medium mb-2">
                        Número do cartão
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          placeholder="0000 0000 0000 0000"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ifood-red focus:border-ifood-red pl-12"
                          required
                        />
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                          <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiryDate" className="block text-gray-700 font-medium mb-2">
                          Data de validade
                        </label>
                        <input
                          type="text"
                          id="expiryDate"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          placeholder="MM/AA"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ifood-red focus:border-ifood-red"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="cvv" className="block text-gray-700 font-medium mb-2">
                          Código de segurança (CVV)
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          placeholder="123"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ifood-red focus:border-ifood-red"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Total</span>
                      <span className="font-bold">R$ 19,90</span>
                    </div>
                    <p className="text-sm text-gray-500">
                      Pagamento único, sem assinaturas ou cobranças recorrentes
                    </p>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-ifood-red hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processando pagamento...
                      </span>
                    ) : (
                      'Finalizar pagamento'
                    )}
                  </button>
                  
                  <div className="mt-4 text-center">
                    <Link 
                      href={`/preview?analysisId=${analysisId}`}
                      className="text-gray-600 hover:text-gray-800 text-sm"
                    >
                      Voltar para a prévia
                    </Link>
                  </div>
                  
                  <div className="mt-8 text-center">
                    <p className="text-sm text-gray-500 mb-2">Pagamento 100% seguro</p>
                    <div className="flex justify-center space-x-4">
                      <svg className="h-8 w-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"></path>
                      </svg>
                      <svg className="h-8 w-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm-1 14H5c-.55 0-1-.45-1-1V8h16v9c0 .55-.45 1-1 1z"></path>
                      </svg>
                      <svg className="h-8 w-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
                      </svg>
                    </div>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 