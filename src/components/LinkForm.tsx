'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LinkForm() {
  const router = useRouter();
  const [link, setLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!link) {
      setError('Por favor, insira o link do seu estabelecimento no iFood');
      return;
    }
    
    if (!link.includes('ifood.com.br')) {
      setError('Por favor, insira um link válido do iFood');
      return;
    }
    
    setError('');
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ link }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Erro ao processar a solicitação');
      }
      
      // Redirecionar para a página de preview
      router.push('/preview');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocorreu um erro ao processar sua solicitação. Tente novamente.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="ifood-link" className="block text-gray-700 text-sm font-bold mb-2">
            Link do seu estabelecimento no iFood
          </label>
          <input
            id="ifood-link"
            type="url"
            placeholder="https://www.ifood.com.br/delivery/sao-paulo-sp/seu-restaurante"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="input-primary"
            disabled={isLoading}
          />
          {error && <p className="text-ifood-red text-xs italic mt-1">{error}</p>}
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="btn-primary w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analisando...
              </span>
            ) : (
              'Analisar Cardápio'
            )}
          </button>
        </div>
      </form>
    </div>
  );
} 