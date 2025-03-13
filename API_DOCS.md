# Documentação das APIs - iFood Perfeito

Este documento descreve as APIs disponíveis no projeto iFood Perfeito, suas funcionalidades, parâmetros e respostas.

## Visão Geral

O iFood Perfeito utiliza API Routes do Next.js para implementar um backend que gerencia o fluxo de análise de estabelecimentos no iFood. As APIs são responsáveis por:

1. Iniciar e verificar o status da análise
2. Salvar informações do usuário
3. Fornecer prévia da análise
4. Processar pagamentos
5. Gerenciar downloads do relatório

## Endpoints Disponíveis

### 1. Iniciar Análise

**Endpoint:** `/api/start-analysis`  
**Método:** POST  
**Descrição:** Inicia o processo de análise de um estabelecimento no iFood.

**Parâmetros:**
```json
{
  "link": "https://www.ifood.com.br/restaurante/exemplo"
}
```

**Resposta de Sucesso:**
```json
{
  "message": "Análise iniciada com sucesso",
  "analysisId": "uuid-gerado"
}
```

**Códigos de Erro:**
- 400: Link inválido
- 500: Erro interno do servidor

### 2. Verificar Status da Análise

**Endpoint:** `/api/analysis-status`  
**Método:** GET  
**Descrição:** Verifica o status atual de uma análise em andamento.

**Parâmetros:**
```
?id=uuid-da-analise
```

**Resposta de Sucesso:**
```json
{
  "id": "uuid-da-analise",
  "status": "processing|completed|error",
  "updatedAt": "2023-06-15T10:30:00Z"
}
```

**Códigos de Erro:**
- 400: ID da análise não fornecido
- 404: Análise não encontrada
- 500: Erro interno do servidor

### 3. Salvar Informações do Usuário

**Endpoint:** `/api/save-user-info`  
**Método:** POST  
**Descrição:** Salva as informações do usuário durante o processo de análise.

**Parâmetros:**
```json
{
  "analysisId": "uuid-da-analise",
  "name": "Nome do Usuário",
  "email": "usuario@exemplo.com",
  "whatsapp": "(00) 00000-0000"
}
```

**Resposta de Sucesso:**
```json
{
  "message": "Informações salvas com sucesso",
  "analysisId": "uuid-da-analise"
}
```

**Códigos de Erro:**
- 400: ID da análise não fornecido ou e-mail obrigatório não fornecido
- 404: Análise não encontrada
- 500: Erro interno do servidor

### 4. Obter Prévia da Análise

**Endpoint:** `/api/analysis-preview`  
**Método:** GET  
**Descrição:** Obtém a prévia da análise com informações limitadas.

**Parâmetros:**
```
?id=uuid-da-analise
```

**Resposta de Sucesso:**
```json
{
  "id": "uuid-da-analise",
  "restaurantName": "Restaurante Exemplo",
  "restaurantImage": "url-da-imagem",
  "overallScore": 7.2,
  "categories": [
    { "name": "Cardápio", "score": 8.5 },
    { "name": "Fotos", "score": 6.0 }
  ],
  "strengths": ["Ponto forte 1", "Ponto forte 2"],
  "weaknesses": ["Ponto fraco 1", "Ponto fraco 2"],
  "recommendations": [
    {
      "title": "Recomendação 1",
      "description": "Descrição da recomendação",
      "priority": "alta"
    }
  ]
}
```

**Códigos de Erro:**
- 400: ID da análise não fornecido ou análise não concluída
- 404: Análise não encontrada
- 500: Erro interno do servidor

### 5. Processar Pagamento

**Endpoint:** `/api/process-payment`  
**Método:** POST  
**Descrição:** Processa o pagamento para obter o relatório completo.

**Parâmetros:**
```json
{
  "analysisId": "uuid-da-analise",
  "name": "Nome do Titular",
  "email": "email@exemplo.com"
}
```

**Resposta de Sucesso:**
```json
{
  "message": "Pagamento processado com sucesso",
  "analysisId": "uuid-da-analise",
  "reportUrl": "/api/download-report?id=uuid-da-analise"
}
```

**Códigos de Erro:**
- 400: ID da análise não fornecido ou e-mail obrigatório não fornecido
- 404: Análise não encontrada
- 500: Erro interno do servidor

### 6. Obter Detalhes da Compra

**Endpoint:** `/api/purchase-details`  
**Método:** GET  
**Descrição:** Obtém os detalhes de uma compra realizada.

**Parâmetros:**
```
?id=uuid-da-analise
```

**Resposta de Sucesso:**
```json
{
  "id": "uuid-da-analise",
  "restaurantName": "Restaurante Exemplo",
  "restaurantImage": "url-da-imagem",
  "email": "email@exemplo.com",
  "purchaseDate": "2023-06-15T10:30:00Z",
  "downloadUrl": "/api/download-report?id=uuid-da-analise"
}
```

**Códigos de Erro:**
- 400: ID da análise não fornecido ou pagamento não concluído
- 404: Análise não encontrada
- 500: Erro interno do servidor

### 7. Obter Informações do Usuário

**Endpoint:** `/api/user-info`  
**Método:** GET  
**Descrição:** Obtém as informações do usuário associadas a uma análise.

**Parâmetros:**
```
?analysisId=uuid-da-analise
```

**Resposta de Sucesso:**
```json
{
  "name": "Nome do Usuário",
  "email": "usuario@exemplo.com",
  "whatsapp": "(00) 00000-0000"
}
```

**Códigos de Erro:**
- 400: ID da análise não fornecido
- 404: Análise não encontrada
- 500: Erro interno do servidor

### 8. Registrar Download

**Endpoint:** `/api/register-download`  
**Método:** POST  
**Descrição:** Registra o download do relatório completo.

**Parâmetros:**
```json
{
  "analysisId": "uuid-da-analise"
}
```

**Resposta de Sucesso:**
```json
{
  "message": "Download registrado com sucesso",
  "downloadCount": 1
}
```

**Códigos de Erro:**
- 400: ID da análise não fornecido ou pagamento não concluído
- 404: Análise não encontrada
- 500: Erro interno do servidor

### 9. Download do Relatório

**Endpoint:** `/api/download-report`  
**Método:** GET  
**Descrição:** Gera e fornece o relatório completo para download.

**Parâmetros:**
```
?id=uuid-da-analise
```

**Resposta de Sucesso:**
Em um ambiente de produção, retornaria um arquivo PDF. Na implementação atual, retorna um JSON com os dados do relatório:

```json
{
  "message": "Simulação de download do relatório",
  "analysisData": {
    "id": "uuid-da-analise",
    "restaurantName": "Restaurante Exemplo",
    "restaurantImage": "url-da-imagem",
    "overallScore": 7.2,
    "categories": [...],
    "strengths": [...],
    "weaknesses": [...],
    "recommendations": [...],
    "generatedAt": "2023-06-15T10:30:00Z",
    "purchaseInfo": {
      "customerName": "Nome do Cliente",
      "customerEmail": "cliente@exemplo.com",
      "purchaseDate": "2023-06-15T10:30:00Z"
    }
  }
}
```

**Códigos de Erro:**
- 400: ID da análise não fornecido ou pagamento não concluído
- 404: Análise não encontrada
- 500: Erro interno do servidor

## Implementação

Todas as APIs utilizam um banco de dados em memória simulado (`analysisDatabase`) para armazenar e recuperar informações. Em um ambiente de produção, isso seria substituído por um banco de dados real.

## Próximos Passos

1. Implementar autenticação e autorização para as APIs
2. Adicionar validação mais robusta de parâmetros
3. Implementar rate limiting para prevenir abusos
4. Adicionar logs detalhados para monitoramento
5. Implementar testes automatizados para as APIs 