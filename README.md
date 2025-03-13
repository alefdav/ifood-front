# iFood Perfeito

Plataforma de análise e otimização para restaurantes no iFood.

## Visão Geral

O iFood Perfeito é uma plataforma que ajuda restaurantes a melhorar seu desempenho no iFood através de análises detalhadas, insights baseados em dados e recomendações personalizadas.

## Funcionalidades Principais

- **Web Scraping**: Coleta de dados de restaurantes no iFood
- **Análise de Dados**: Processamento e análise de dados coletados
- **IA Avançada**: Geração de insights e recomendações usando IA
- **Relatórios Detalhados**: Relatórios completos com pontos fortes, fracos e plano de ação
- **Integração de Pagamentos**: Sistema de pagamento para acesso a relatórios completos

## Estrutura do Projeto

O projeto está organizado em serviços independentes:

- **Serviço de Web Scraping**: Coleta dados do iFood
- **Serviço de IA**: Analisa os dados e gera insights
- **Serviço de PDF**: Gera relatórios em PDF
- **Serviço de Pagamento**: Processa pagamentos via Stripe
- **Frontend**: Interface de usuário em Next.js

## Fluxo de Pagamento

O sistema implementa um fluxo completo de pagamento:

1. O usuário solicita uma análise na página principal
2. Uma prévia da análise é exibida gratuitamente
3. O usuário pode comprar o relatório completo
4. Após o pagamento, o relatório completo é disponibilizado
5. O usuário pode baixar o relatório em PDF

Para mais detalhes, consulte a [documentação do fluxo de pagamento](docs/payment-flow.md).

## Tecnologias Utilizadas

- **Frontend**: Next.js, React, TypeScript, TailwindCSS
- **Backend**: Python, FastAPI, Node.js
- **IA**: OpenAI API, NumPy, Pandas
- **Pagamentos**: Stripe
- **Infraestrutura**: Docker, Docker Compose

## Instalação e Execução

### Pré-requisitos

- Node.js 18+
- Python 3.10+
- Docker e Docker Compose

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/ifood-perfeito.git
cd ifood-perfeito
```

2. Instale as dependências do frontend:
```bash
cd frontend
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

4. Inicie os serviços com Docker Compose:
```bash
docker-compose up -d
```

5. Inicie o frontend:
```bash
npm run dev
```

## Documentação

- [Fluxo de Pagamento](docs/payment-flow.md)
- [Integração de Pagamento - Resumo](docs/payment-integration-summary.md)
- [API de Web Scraping](docs/web-scraping-api.md)
- [API de IA](docs/ai-api.md)
- [API de PDF](docs/pdf-api.md)

## Contribuição

Contribuições são bem-vindas! Por favor, leia as [diretrizes de contribuição](CONTRIBUTING.md) antes de enviar pull requests.

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes. 