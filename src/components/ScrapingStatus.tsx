'use client';

import { useState, useEffect } from 'react';

interface ScrapingStatusProps {
  analysisId: string;
  onComplete?: () => void;
}

export default function ScrapingStatus({ analysisId, onComplete }: ScrapingStatusProps) {
  const [status, setStatus] = useState<'processing' | 'completed' | 'failed'>('processing');
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!analysisId) return;

    const checkStatus = async () => {
      try {
        const response = await fetch(`/api/analysis-status?id=${analysisId}`);
        
        if (!response.ok) {
          throw new Error('Erro ao verificar status');
        }
        
        const data = await response.json();
        
        setStatus(data.status);
        if (data.progress !== undefined) {
          setProgress(data.progress);
        }
        
        if (data.error) {
          setError(data.error);
        }
        
        if (data.status === 'completed' && onComplete) {
          onComplete();
        }
      } catch (error) {
        console.error('Erro ao verificar status:', error);
      }
    };

    // Verificar status imediatamente
    checkStatus();
    
    // Verificar status a cada 3 segundos
    const interval = setInterval(checkStatus, 3000);
    
    // Limpar intervalo quando o componente for desmontado
    return () => clearInterval(interval);
  }, [analysisId, onComplete]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Status da Análise</h2>
      
      {status === 'processing' && (
        <div>
          <div className="flex items-center mb-2">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-ifood-red" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="font-medium">Processando análise...</span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div 
              className="bg-ifood-red h-2.5 rounded-full transition-all duration-300" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          <p className="text-gray-600 text-sm">
            Estamos analisando o cardápio do seu estabelecimento. Isso pode levar alguns minutos.
          </p>
        </div>
      )}
      
      {status === 'completed' && (
        <div className="text-green-600 flex items-center">
          <svg className="h-6 w-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <span className="font-medium">Análise concluída com sucesso!</span>
        </div>
      )}
      
      {status === 'failed' && (
        <div className="text-red-600">
          <div className="flex items-center mb-2">
            <svg className="h-6 w-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span className="font-medium">Falha na análise</span>
          </div>
          
          {error && (
            <p className="text-red-600 text-sm mt-2">{error}</p>
          )}
          
          <p className="text-gray-600 text-sm mt-4">
            Tente novamente mais tarde ou entre em contato com o suporte.
          </p>
        </div>
      )}
    </div>
  );
} 