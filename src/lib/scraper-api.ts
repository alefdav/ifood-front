/**
 * Serviço de integração com a API de scraping do iFood
 * 
 * Este módulo fornece funções para interagir com a API de scraping
 * que extrai dados de estabelecimentos no iFood.
 */

import axios from 'axios';

// URL base da API de scraping
const SCRAPER_API_BASE_URL = process.env.SCRAPER_API_URL || 'http://localhost:8000';

/**
 * Interface para o resultado da raspagem de dados
 */
export interface ScrapingResult {
  restaurantName: string;
  restaurantImage: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: string;
  categories: {
    name: string;
    items: {
      name: string;
      description: string;
      price: number;
      imageUrl: string | null;
      hasCustomization: boolean;
    }[];
  }[];
  address: string;
  openingHours: string;
  [key: string]: any;
}

/**
 * Inicia uma nova tarefa de raspagem de dados
 * @param url URL do estabelecimento no iFood
 * @returns ID da tarefa de raspagem
 */
export async function startScraping(url: string): Promise<string> {
  try {
    const response = await axios.post(`${SCRAPER_API_BASE_URL}/api/v1/scrape`, {
      url,
      options: {
        waitForSelectors: true,
        extractImages: true,
        extractPrices: true,
        extractDescriptions: true
      }
    });

    return response.data.task_id;
  } catch (error: any) {
    console.error('Erro ao iniciar raspagem:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Erro ao iniciar raspagem de dados');
  }
}

/**
 * Verifica o status de uma tarefa de raspagem
 * @param taskId ID da tarefa de raspagem
 * @returns Status da tarefa
 */
export async function checkScrapingStatus(taskId: string): Promise<{
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress?: number;
  message?: string;
}> {
  try {
    const response = await axios.get(`${SCRAPER_API_BASE_URL}/api/v1/status/${taskId}`);
    return response.data;
  } catch (error: any) {
    console.error('Erro ao verificar status da raspagem:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Erro ao verificar status da raspagem');
  }
}

/**
 * Obtém os resultados de uma tarefa de raspagem
 * @param taskId ID da tarefa de raspagem
 * @returns Resultados da raspagem
 */
export async function getScrapingResults(taskId: string): Promise<ScrapingResult> {
  try {
    const response = await axios.get(`${SCRAPER_API_BASE_URL}/api/v1/results/${taskId}`);
    return response.data;
  } catch (error: any) {
    console.error('Erro ao obter resultados da raspagem:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Erro ao obter resultados da raspagem');
  }
}

/**
 * Verifica a saúde do serviço de raspagem
 * @returns Status de saúde do serviço
 */
export async function checkScraperHealth(): Promise<boolean> {
  try {
    const response = await axios.get(`${SCRAPER_API_BASE_URL}/health`);
    return response.data.status === 'ok';
  } catch (error) {
    console.error('Serviço de raspagem indisponível');
    return false;
  }
} 