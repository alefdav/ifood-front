/**
 * Módulo de web scraper para extrair dados de estabelecimentos no iFood
 * 
 * Este módulo utiliza técnicas de web scraping para coletar informações
 * de estabelecimentos no iFood a partir da URL fornecida.
 */

import { JSDOM } from 'jsdom';
import axios from 'axios';

export interface EstablishmentData {
  name: string;
  category: string;
  rating: number;
  deliveryTime: number;
  deliveryFee: number;
  imageUrl: string;
  menuCategories: MenuCategory[];
  address: string;
  openingHours: string;
}

export interface MenuCategory {
  name: string;
  items: MenuItem[];
}

export interface MenuItem {
  name: string;
  description: string;
  price: number;
  imageUrl: string | null;
  hasCustomization: boolean;
}

/**
 * Extrai dados de um estabelecimento no iFood a partir da URL
 * @param url URL do estabelecimento no iFood
 * @returns Dados estruturados do estabelecimento
 */
export async function scrapeEstablishment(url: string): Promise<EstablishmentData> {
  try {
    // Validar URL
    if (!url.includes('ifood.com.br')) {
      throw new Error('URL inválida. Por favor, forneça um link válido do iFood.');
    }

    // Em um cenário real, faríamos a requisição HTTP e parseamento do HTML
    // Por enquanto, vamos simular o processo com dados mockados
    
    // Simular tempo de processamento
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Dados simulados
    const mockData: EstablishmentData = {
      name: extractEstablishmentName(url),
      category: 'Comida Brasileira',
      rating: 4.2,
      deliveryTime: 38,
      deliveryFee: 6.99,
      imageUrl: 'https://static.ifood-static.com.br/image/upload/t_high/logosgde/logo-restaurante-exemplo.jpg',
      address: 'Av. Exemplo, 123 - Bairro, Cidade - UF',
      openingHours: 'Seg-Sex: 11:00-22:00, Sáb-Dom: 11:00-23:00',
      menuCategories: [
        {
          name: 'Pratos Principais',
          items: [
            {
              name: 'Prato Especial da Casa',
              description: 'Arroz, feijão, filé mignon, batata frita e salada.',
              price: 32.90,
              imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/prato-especial.jpg',
              hasCustomization: true
            },
            {
              name: 'Feijoada Completa',
              description: 'Feijoada tradicional com arroz, couve, farofa e laranja.',
              price: 28.90,
              imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/feijoada.jpg',
              hasCustomization: false
            }
          ]
        },
        {
          name: 'Bebidas',
          items: [
            {
              name: 'Refrigerante 350ml',
              description: 'Lata 350ml (Coca-Cola, Guaraná, Sprite)',
              price: 5.90,
              imageUrl: null,
              hasCustomization: true
            },
            {
              name: 'Suco Natural',
              description: 'Suco de fruta natural (laranja, limão, abacaxi)',
              price: 8.90,
              imageUrl: null,
              hasCustomization: true
            }
          ]
        }
      ]
    };
    
    return mockData;
  } catch (error) {
    console.error('Erro ao extrair dados do estabelecimento:', error);
    throw error;
  }
}

/**
 * Extrai o nome do estabelecimento a partir da URL
 * @param url URL do estabelecimento no iFood
 * @returns Nome do estabelecimento
 */
function extractEstablishmentName(url: string): string {
  try {
    // Em um cenário real, extrairíamos o nome do estabelecimento da URL
    // Por exemplo: https://www.ifood.com.br/delivery/cidade/restaurante-exemplo
    
    const urlParts = url.split('/');
    const lastPart = urlParts[urlParts.length - 1];
    
    // Converter formato-url para Nome Estabelecimento
    const name = lastPart
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    return name || 'Restaurante Exemplo';
  } catch (error) {
    console.error('Erro ao extrair nome do estabelecimento:', error);
    return 'Restaurante Exemplo';
  }
}

/**
 * Analisa a estrutura do cardápio e identifica problemas
 * @param menuCategories Categorias do cardápio
 * @returns Lista de problemas identificados
 */
export function analyzeMenu(menuCategories: MenuCategory[]): string[] {
  const issues: string[] = [];
  
  // Verificar se há categorias suficientes
  if (menuCategories.length < 3) {
    issues.push('Cardápio com poucas categorias. Recomenda-se organizar em mais seções para melhor navegação.');
  }
  
  // Verificar itens sem imagem
  const totalItems = menuCategories.reduce((acc, category) => acc + category.items.length, 0);
  const itemsWithoutImage = menuCategories.reduce((acc, category) => {
    return acc + category.items.filter(item => !item.imageUrl).length;
  }, 0);
  
  if (itemsWithoutImage / totalItems > 0.3) {
    issues.push(`${itemsWithoutImage} itens sem imagem. Adicionar fotos pode aumentar as conversões em até 30%.`);
  }
  
  // Verificar descrições curtas ou ausentes
  const itemsWithShortDescription = menuCategories.reduce((acc, category) => {
    return acc + category.items.filter(item => !item.description || item.description.length < 20).length;
  }, 0);
  
  if (itemsWithShortDescription > 0) {
    issues.push(`${itemsWithShortDescription} itens com descrições curtas ou ausentes. Descrições detalhadas ajudam o cliente a tomar decisões.`);
  }
  
  return issues;
}

/**
 * Gera recomendações baseadas nos dados do estabelecimento
 * @param data Dados do estabelecimento
 * @returns Lista de recomendações
 */
export function generateRecommendations(data: EstablishmentData): {
  strengths: string[];
  weaknesses: string[];
  recommendations: Array<{category: string; priority: string; description: string}>;
} {
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const recommendations: Array<{category: string; priority: string; description: string}> = [];
  
  // Analisar avaliação
  if (data.rating >= 4.5) {
    strengths.push(`Excelente avaliação (${data.rating}). Continue mantendo a qualidade.`);
  } else if (data.rating >= 4.0) {
    strengths.push(`Boa avaliação (${data.rating}). Há espaço para melhorias.`);
  } else {
    weaknesses.push(`Avaliação abaixo da média (${data.rating}). Necessita atenção imediata.`);
    recommendations.push({
      category: 'Avaliações',
      priority: 'Alta',
      description: 'Implementar programa de melhoria de qualidade e responder a avaliações negativas'
    });
  }
  
  // Analisar tempo de entrega
  if (data.deliveryTime <= 30) {
    strengths.push(`Tempo de entrega rápido (${data.deliveryTime} min).`);
  } else if (data.deliveryTime <= 45) {
    // Tempo aceitável, não comentamos
  } else {
    weaknesses.push(`Tempo de entrega elevado (${data.deliveryTime} min).`);
    recommendations.push({
      category: 'Operação',
      priority: 'Média',
      description: 'Otimizar processos internos para reduzir tempo de preparo'
    });
  }
  
  // Analisar cardápio
  const menuIssues = analyzeMenu(data.menuCategories);
  if (menuIssues.length > 0) {
    weaknesses.push(...menuIssues);
    
    recommendations.push({
      category: 'Cardápio',
      priority: 'Alta',
      description: 'Adicionar imagens para todos os produtos principais'
    });
    
    recommendations.push({
      category: 'Descrições',
      priority: 'Alta',
      description: 'Melhorar descrições dos produtos, incluindo ingredientes e diferenciais'
    });
  }
  
  // Adicionar recomendações gerais
  recommendations.push({
    category: 'SEO',
    priority: 'Média',
    description: 'Adicionar palavras-chave relevantes ao perfil e descrições dos produtos'
  });
  
  recommendations.push({
    category: 'Promoções',
    priority: 'Média',
    description: 'Criar combos promocionais para aumentar o ticket médio'
  });
  
  return {
    strengths,
    weaknesses,
    recommendations
  };
} 