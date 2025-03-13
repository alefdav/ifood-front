# Arquitetura do Projeto - iFood Perfeito

Este documento descreve a arquitetura técnica do projeto iFood Perfeito, fornecendo uma visão geral dos componentes, fluxos de dados e decisões de design.

## Visão Geral

O iFood Perfeito é uma aplicação web que analisa estabelecimentos do iFood para fornecer insights e recomendações aos proprietários. A arquitetura segue um modelo cliente-servidor com uma interface de usuário React/Next.js no frontend e APIs RESTful no backend.

## Diagrama de Arquitetura

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Cliente Web    │────▶│  Next.js API    │────▶│  Serviço de     │
│  (Next.js)      │     │  Routes         │     │  Scraping       │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
         │                      │                       │
         │                      │                       │
         ▼                      ▼                       ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Armazenamento  │◀───▶│  Serviço de     │◀───▶│  Serviço de     │
│  (Simulado)     │     │  Análise        │     │  Geração PDF    │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                               │
                               │
                               ▼
                        ┌─────────────────┐
                        │                 │
                        │  Integração     │
                        │  Pagamento      │
                        │  (Simulada)     │
                        │                 │
                        └─────────────────┘
```

## Componentes Principais

### 1. Frontend (Next.js)

O frontend é construído com Next.js e React, utilizando Tailwind CSS para estilização. Segue uma arquitetura baseada em componentes com as seguintes páginas principais:

- **Página Inicial**: Captura o link do iFood para análise
- **Página de Informações do Usuário**: Coleta dados do usuário durante a análise
- **Página de Prévia**: Mostra uma prévia limitada da análise
- **Página de Pagamento**: Processa o pagamento para acesso ao relatório completo
- **Página de Sucesso**: Confirma o pagamento e fornece acesso ao relatório

### 2. Backend (API Routes do Next.js)

As APIs são implementadas como rotas API do Next.js, seguindo princípios RESTful:

- **/api/start-analysis**: Inicia o processo de análise
- **/api/analysis-status**: Verifica o status da análise
- **/api/save-user-info**: Salva informações do usuário
- **/api/analysis-preview**: Fornece uma prévia da análise
- **/api/process-payment**: Processa o pagamento
- **/api/purchase-details**: Retorna detalhes da compra
- **/api/user-info**: Retorna informações do usuário
- **/api/register-download**: Registra downloads do relatório
- **/api/download-report**: Fornece o relatório completo

### 3. Serviços (Simulados)

Atualmente, os seguintes serviços são simulados com dados mockados:

- **Serviço de Scraping**: Simulação da extração de dados do iFood
- **Serviço de Análise**: Simulação da análise dos dados coletados
- **Serviço de Geração de PDF**: Simulação da criação de relatórios em PDF
- **Integração de Pagamento**: Simulação do processamento de pagamentos

### 4. Armazenamento de Dados

O armazenamento é atualmente simulado em memória usando objetos JavaScript. Os principais tipos de dados incluem:

- **Análises**: Informações sobre análises iniciadas
- **Usuários**: Dados dos usuários que solicitaram análises
- **Pagamentos**: Registros de transações de pagamento
- **Downloads**: Registros de downloads de relatórios

## Fluxos de Dados

### Fluxo Principal

1. O usuário insere um link do iFood na página inicial
2. O frontend envia o link para `/api/start-analysis`
3. A API inicia o processo de análise (simulado) e retorna um ID de análise
4. O usuário é redirecionado para a página de informações do usuário
5. As informações do usuário são enviadas para `/api/save-user-info`
6. O usuário é redirecionado para a página de prévia
7. A prévia é obtida de `/api/analysis-preview`
8. O usuário opta por comprar o relatório completo
9. O pagamento é processado via `/api/process-payment`
10. Após o pagamento, o usuário é redirecionado para a página de sucesso
11. O relatório completo pode ser baixado via `/api/download-report`

## Decisões de Design

### Arquitetura Monolítica

O projeto utiliza uma arquitetura monolítica com Next.js para simplificar o desenvolvimento inicial. Isso permite:

- Desenvolvimento rápido e iterativo
- Implantação simplificada
- Menor complexidade operacional

### Simulação de Serviços

Os serviços de backend são atualmente simulados para permitir o desenvolvimento da interface do usuário e fluxos de trabalho sem dependências externas. Isso facilita:

- Prototipagem rápida
- Testes de fluxos de usuário
- Demonstração de conceitos

### Armazenamento em Memória

O armazenamento em memória é usado para simplificar o desenvolvimento inicial. Isso permite:

- Configuração zero de banco de dados
- Iteração rápida
- Foco no desenvolvimento da interface e experiência do usuário

## Considerações para Produção

Para uma versão de produção, as seguintes mudanças seriam necessárias:

### 1. Implementação Real de Serviços

- **Web Scraping**: Implementar um serviço real para extrair dados do iFood
- **Análise de Dados**: Desenvolver algoritmos reais para análise
- **Geração de PDF**: Implementar biblioteca real para geração de relatórios

### 2. Persistência de Dados

- Substituir o armazenamento em memória por um banco de dados real (MongoDB, PostgreSQL, etc.)
- Implementar camadas de acesso a dados e modelos

### 3. Segurança

- Implementar autenticação e autorização
- Adicionar proteção contra ataques comuns (CSRF, XSS, etc.)
- Implementar HTTPS e cabeçalhos de segurança

### 4. Escalabilidade

- Considerar a separação de serviços em microsserviços
- Implementar cache para melhorar o desempenho
- Configurar balanceamento de carga

## Tecnologias Utilizadas

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Next.js API Routes
- **Tipagem**: TypeScript
- **Estilização**: Tailwind CSS
- **Ícones**: Heroicons
- **Geração de IDs**: UUID

## Evolução Futura da Arquitetura

À medida que o projeto cresce, a arquitetura pode evoluir para:

1. **Arquitetura de Microsserviços**:
   - Serviço de Scraping independente
   - Serviço de Análise separado
   - Serviço de Geração de PDF dedicado

2. **Infraestrutura Serverless**:
   - Funções Lambda para processamento assíncrono
   - API Gateway para gerenciamento de APIs
   - S3 para armazenamento de relatórios

3. **Processamento em Tempo Real**:
   - Implementação de filas para processamento assíncrono
   - Notificações em tempo real para usuários
   - Análise contínua de estabelecimentos 