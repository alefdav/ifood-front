# Guia de Implementação do Serviço de Scraping - iFood Perfeito

Este documento fornece orientações para a implementação do serviço de scraping que extrairá dados de estabelecimentos do iFood para análise.

## Visão Geral

O serviço de scraping é um componente crítico do sistema iFood Perfeito, responsável por extrair dados relevantes de páginas de estabelecimentos no iFood. Esses dados serão posteriormente analisados para gerar insights e recomendações.

## Requisitos Técnicos

### Tecnologias Recomendadas

- **Linguagem**: Python 3.8+
- **Frameworks de Scraping**:
  - Scrapy
  - BeautifulSoup
  - Selenium (para conteúdo dinâmico)
- **Gerenciamento de Requisições**:
  - Requests
  - aiohttp (para scraping assíncrono)
- **Processamento de Dados**:
  - Pandas
  - NumPy

### Infraestrutura

- Serviço independente executado em contêiner Docker
- API RESTful para comunicação com o sistema principal
- Sistema de filas para processamento assíncrono (opcional)

## Dados a Serem Extraídos

### Informações Básicas do Estabelecimento

- Nome do estabelecimento
- Endereço
- Categoria(s)
- Horário de funcionamento
- Tempo médio de entrega
- Taxa de entrega
- Valor mínimo do pedido

### Avaliações e Feedback

- Nota média geral
- Número total de avaliações
- Distribuição de notas (5 estrelas, 4 estrelas, etc.)
- Comentários recentes (últimos 20-30)
- Temas comuns em comentários negativos

### Cardápio

- Categorias de produtos
- Itens populares
- Faixa de preços
- Promoções ativas
- Opções de personalização

### Concorrência

- Estabelecimentos similares na mesma região
- Comparativo de preços (quando possível)
- Diferenças em avaliações

## Arquitetura Proposta

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  API Gateway    │────▶│  Controlador    │────▶│  Gerenciador    │
│                 │     │  de Scraping    │     │  de Tarefas     │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                                        │
                                                        │
                                                        ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Processador    │◀───▶│  Scrapers       │◀───▶│  Proxy          │
│  de Dados       │     │  Especializados │     │  Manager        │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        │
        │
        ▼
┌─────────────────┐
│                 │
│  Armazenamento  │
│  de Dados       │
│                 │
└─────────────────┘
```

### Componentes

1. **API Gateway**: Interface para receber solicitações de scraping do sistema principal
2. **Controlador de Scraping**: Gerencia o fluxo de trabalho de scraping
3. **Gerenciador de Tarefas**: Distribui e monitora tarefas de scraping
4. **Scrapers Especializados**: Módulos específicos para diferentes tipos de dados
5. **Proxy Manager**: Gerencia rotação de IPs para evitar bloqueios
6. **Processador de Dados**: Limpa, normaliza e estrutura os dados extraídos
7. **Armazenamento de Dados**: Persiste os dados extraídos para análise

## Implementação

### 1. Configuração do Ambiente

```python
# requirements.txt
scrapy==2.6.1
beautifulsoup4==4.11.1
selenium==4.4.3
webdriver-manager==3.8.3
requests==2.28.1
aiohttp==3.8.3
pandas==1.5.0
numpy==1.23.3
fastapi==0.85.0
uvicorn==0.18.3
pydantic==1.10.2
```

### 2. Estrutura de Diretórios

```
scraping_service/
├── api/
│   ├── __init__.py
│   ├── main.py
│   └── endpoints/
│       └── scraping.py
├── core/
│   ├── __init__.py
│   ├── config.py
│   └── exceptions.py
├── scrapers/
│   ├── __init__.py
│   ├── base.py
│   ├── establishment.py
│   ├── menu.py
│   ├── reviews.py
│   └── competitors.py
├── processors/
│   ├── __init__.py
│   ├── cleaner.py
│   └── analyzer.py
├── utils/
│   ├── __init__.py
│   ├── proxy.py
│   └── browser.py
├── models/
│   ├── __init__.py
│   └── data_models.py
├── storage/
│   ├── __init__.py
│   └── repository.py
├── Dockerfile
├── docker-compose.yml
└── README.md
```

### 3. Exemplo de Implementação da API

```python
# api/main.py
from fastapi import FastAPI
from api.endpoints import scraping

app = FastAPI(title="iFood Scraping Service")

app.include_router(scraping.router, prefix="/api/v1")

@app.get("/health")
def health_check():
    return {"status": "healthy"}
```

```python
# api/endpoints/scraping.py
from fastapi import APIRouter, HTTPException, BackgroundTasks
from pydantic import BaseModel, HttpUrl
from uuid import uuid4
from scrapers.establishment import EstablishmentScraper
from storage.repository import ScrapingRepository

router = APIRouter()

class ScrapingRequest(BaseModel):
    url: HttpUrl
    depth: int = 1  # 1: básico, 2: detalhado, 3: completo

class ScrapingResponse(BaseModel):
    task_id: str
    status: str

# Armazenamento em memória para tarefas (substituir por DB em produção)
tasks = {}

@router.post("/scrape", response_model=ScrapingResponse)
async def start_scraping(request: ScrapingRequest, background_tasks: BackgroundTasks):
    task_id = str(uuid4())
    tasks[task_id] = {"status": "pending", "result": None}
    
    # Adicionar tarefa em background
    background_tasks.add_task(run_scraping, task_id, request.url, request.depth)
    
    return {"task_id": task_id, "status": "pending"}

@router.get("/status/{task_id}", response_model=dict)
async def get_status(task_id: str):
    if task_id not in tasks:
        raise HTTPException(status_code=404, detail="Tarefa não encontrada")
    
    return tasks[task_id]

async def run_scraping(task_id: str, url: str, depth: int):
    try:
        tasks[task_id]["status"] = "processing"
        
        # Iniciar scraper
        scraper = EstablishmentScraper(url, depth)
        result = await scraper.scrape()
        
        # Salvar resultado
        repository = ScrapingRepository()
        saved_id = await repository.save(result)
        
        tasks[task_id]["status"] = "completed"
        tasks[task_id]["result"] = {
            "data_id": saved_id,
            "summary": result.get_summary()
        }
    except Exception as e:
        tasks[task_id]["status"] = "failed"
        tasks[task_id]["error"] = str(e)
```

### 4. Exemplo de Scraper Base

```python
# scrapers/base.py
from abc import ABC, abstractmethod
from utils.proxy import ProxyManager
from utils.browser import BrowserManager

class BaseScraper(ABC):
    def __init__(self, url, depth=1):
        self.url = url
        self.depth = depth
        self.proxy_manager = ProxyManager()
        self.browser_manager = BrowserManager()
        
    async def setup(self):
        """Configurar recursos necessários para o scraping"""
        self.proxy = await self.proxy_manager.get_proxy()
        self.browser = await self.browser_manager.get_browser()
        
    async def cleanup(self):
        """Liberar recursos após o scraping"""
        await self.browser_manager.release_browser(self.browser)
        
    @abstractmethod
    async def scrape(self):
        """Implementar lógica de scraping específica"""
        pass
    
    async def handle_pagination(self, page_url):
        """Lidar com paginação quando necessário"""
        pass
    
    async def extract_data(self, html_content):
        """Extrair dados do conteúdo HTML"""
        pass
```

### 5. Exemplo de Scraper de Estabelecimento

```python
# scrapers/establishment.py
from scrapers.base import BaseScraper
from bs4 import BeautifulSoup
from models.data_models import Establishment, Address, Rating
import logging

logger = logging.getLogger(__name__)

class EstablishmentScraper(BaseScraper):
    async def scrape(self):
        try:
            await self.setup()
            
            # Navegar para a URL
            await self.browser.goto(self.url)
            
            # Aguardar carregamento do conteúdo
            await self.browser.wait_for_selector('.restaurant-name')
            
            # Obter conteúdo HTML
            html_content = await self.browser.content()
            
            # Extrair dados
            data = await self.extract_data(html_content)
            
            # Se depth > 1, extrair dados adicionais
            if self.depth > 1:
                # Extrair avaliações
                reviews_html = await self.get_reviews_content()
                data.reviews = await self.extract_reviews(reviews_html)
                
                # Extrair menu completo
                menu_html = await self.get_menu_content()
                data.menu = await self.extract_menu(menu_html)
            
            # Se depth > 2, extrair dados de concorrentes
            if self.depth > 2:
                competitors_data = await self.get_competitors_data()
                data.competitors = competitors_data
            
            await self.cleanup()
            return data
            
        except Exception as e:
            logger.error(f"Erro ao fazer scraping do estabelecimento: {str(e)}")
            await self.cleanup()
            raise
    
    async def extract_data(self, html_content):
        soup = BeautifulSoup(html_content, 'html.parser')
        
        # Extrair dados básicos
        name = soup.select_one('.restaurant-name').text.strip()
        category = soup.select_one('.restaurant-category').text.strip()
        
        # Extrair endereço
        address_elem = soup.select_one('.restaurant-address')
        address = Address(
            street=address_elem.select_one('.street').text.strip(),
            number=address_elem.select_one('.number').text.strip(),
            neighborhood=address_elem.select_one('.neighborhood').text.strip(),
            city=address_elem.select_one('.city').text.strip(),
            state=address_elem.select_one('.state').text.strip()
        )
        
        # Extrair avaliação
        rating_elem = soup.select_one('.restaurant-rating')
        rating = Rating(
            average=float(rating_elem.select_one('.average').text.strip()),
            count=int(rating_elem.select_one('.count').text.strip().replace(',', ''))
        )
        
        # Extrair horários
        hours = []
        for hour_elem in soup.select('.working-hours .hour'):
            hours.append(hour_elem.text.strip())
        
        # Extrair informações de entrega
        delivery_time = soup.select_one('.delivery-time').text.strip()
        delivery_fee = soup.select_one('.delivery-fee').text.strip()
        min_order = soup.select_one('.min-order').text.strip()
        
        # Criar objeto de estabelecimento
        establishment = Establishment(
            name=name,
            category=category,
            address=address,
            rating=rating,
            working_hours=hours,
            delivery_time=delivery_time,
            delivery_fee=delivery_fee,
            min_order=min_order
        )
        
        return establishment
    
    # Métodos adicionais para extrair outros dados...
```

### 6. Modelos de Dados

```python
# models/data_models.py
from pydantic import BaseModel
from typing import List, Optional, Dict
from datetime import datetime

class Address(BaseModel):
    street: str
    number: str
    neighborhood: str
    city: str
    state: str

class Rating(BaseModel):
    average: float
    count: int

class Review(BaseModel):
    author: str
    date: datetime
    rating: int
    comment: str
    likes: int = 0

class MenuItem(BaseModel):
    name: str
    description: Optional[str]
    price: float
    category: str
    is_popular: bool = False
    image_url: Optional[str]
    customizations: Optional[List[Dict]]

class Menu(BaseModel):
    categories: List[str]
    items: List[MenuItem]

class Competitor(BaseModel):
    name: str
    url: str
    rating: Optional[Rating]
    delivery_time: Optional[str]
    delivery_fee: Optional[str]

class Establishment(BaseModel):
    name: str
    category: str
    address: Address
    rating: Rating
    working_hours: List[str]
    delivery_time: str
    delivery_fee: str
    min_order: str
    menu: Optional[Menu]
    reviews: Optional[List[Review]]
    competitors: Optional[List[Competitor]]
    
    def get_summary(self):
        """Retorna um resumo dos dados do estabelecimento"""
        return {
            "name": self.name,
            "category": self.category,
            "rating": self.rating.average,
            "reviews_count": self.rating.count,
            "delivery_time": self.delivery_time,
            "delivery_fee": self.delivery_fee
        }
```

## Considerações Importantes

### Ética e Legalidade

- Respeite os termos de serviço do iFood
- Implemente delays entre requisições para não sobrecarregar o servidor
- Considere obter permissão formal do iFood para scraping em grande escala
- Não armazene dados sensíveis ou pessoais

### Robustez

- Implemente tratamento de erros abrangente
- Adicione retentativas com backoff exponencial
- Monitore falhas e ajuste a estratégia de scraping conforme necessário
- Implemente testes para verificar se os seletores ainda são válidos

### Manutenção

- O layout do site pode mudar, exigindo atualizações nos seletores
- Crie testes automatizados para detectar quando o scraping falha
- Implemente alertas para notificar quando o scraping não estiver funcionando
- Documente detalhadamente a implementação para facilitar a manutenção

## Integração com o Sistema Principal

### API de Comunicação

O serviço de scraping deve expor uma API RESTful com os seguintes endpoints:

- `POST /api/v1/scrape`: Inicia uma tarefa de scraping
- `GET /api/v1/status/{task_id}`: Verifica o status de uma tarefa
- `GET /api/v1/results/{data_id}`: Obtém os resultados de um scraping concluído

### Formato de Resposta

```json
{
  "task_id": "550e8400-e29b-41d4-a716-446655440000",
  "status": "completed",
  "result": {
    "data_id": "123456",
    "summary": {
      "name": "Restaurante Exemplo",
      "category": "Italiana",
      "rating": 4.7,
      "reviews_count": 253,
      "delivery_time": "30-45 min",
      "delivery_fee": "R$ 8,90"
    }
  }
}
```

## Próximos Passos

1. Implementar um protótipo básico do scraper
2. Testar com diferentes tipos de estabelecimentos
3. Refinar os seletores e a extração de dados
4. Implementar mecanismos de resiliência
5. Desenvolver a API de comunicação
6. Integrar com o sistema principal
7. Implementar monitoramento e logging
8. Documentar o serviço completamente 