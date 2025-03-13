# Guia de Contribuição - iFood Perfeito

Obrigado pelo interesse em contribuir com o projeto iFood Perfeito! Este documento fornece diretrizes e instruções para ajudar você a contribuir de forma eficaz.

## Configuração do Ambiente de Desenvolvimento

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Git

### Passos para Configuração

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/ifood-perfeito.git
   cd ifood-perfeito
   ```

2. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn install
   ```

3. Execute o servidor de desenvolvimento:
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

4. Acesse a aplicação em `http://localhost:3000`

## Estrutura do Projeto

```
Ifood Perfeito/
├── public/            # Arquivos estáticos
├── src/
│   ├── app/           # Páginas da aplicação
│   │   ├── api/       # Rotas da API
│   │   ├── payment/   # Página de pagamento
│   │   ├── preview/   # Página de prévia da análise
│   │   ├── success/   # Página de sucesso após pagamento
│   │   ├── user-info/ # Página de coleta de informações
│   │   └── page.tsx   # Página inicial
│   ├── components/    # Componentes reutilizáveis
│   └── lib/           # Utilitários e funções auxiliares
├── package.json       # Dependências do projeto
└── tailwind.config.js # Configuração do Tailwind CSS
```

## Fluxo de Trabalho para Contribuições

1. Crie uma nova branch para sua contribuição:
   ```bash
   git checkout -b feature/nome-da-feature
   ```

2. Faça suas alterações seguindo as convenções de código do projeto.

3. Teste suas alterações localmente.

4. Commit suas alterações com mensagens claras e descritivas:
   ```bash
   git commit -m "Adiciona funcionalidade X que resolve o problema Y"
   ```

5. Envie suas alterações para o repositório:
   ```bash
   git push origin feature/nome-da-feature
   ```

6. Abra um Pull Request descrevendo suas alterações.

## Convenções de Código

### Estilo de Código

- Use TypeScript para todos os arquivos de código.
- Siga as convenções de nomenclatura:
  - PascalCase para componentes e interfaces
  - camelCase para variáveis, funções e métodos
  - kebab-case para nomes de arquivos
- Mantenha a indentação consistente (2 espaços).
- Use ponto e vírgula no final das declarações.

### Componentes React

- Use componentes funcionais com hooks.
- Organize os imports na seguinte ordem:
  1. Imports do React e Next.js
  2. Imports de bibliotecas externas
  3. Imports de componentes internos
  4. Imports de utilitários e tipos
- Defina tipos para props usando interfaces TypeScript.

### API Routes

- Mantenha cada rota em um arquivo separado.
- Implemente tratamento de erros adequado.
- Valide os parâmetros de entrada.
- Retorne respostas com códigos de status HTTP apropriados.

## Áreas para Contribuição

### Funcionalidades Prioritárias

1. **Web Scraping**: Implementar um serviço real para extrair dados do iFood.
2. **Algoritmos de Análise**: Desenvolver algoritmos para analisar os dados coletados.
3. **Geração de PDF**: Implementar a geração de relatórios em PDF.
4. **Integração com Stripe**: Implementar a integração real com o Stripe.
5. **Banco de Dados**: Substituir o armazenamento em memória por um banco de dados real.

### Melhorias Gerais

- Otimização de performance
- Melhorias de acessibilidade
- Testes automatizados
- Documentação adicional

## Testes

Atualmente, o projeto não possui testes automatizados. Contribuições para adicionar testes são muito bem-vindas!

### Tipos de Testes a Implementar

- Testes unitários para componentes e funções
- Testes de integração para APIs
- Testes end-to-end para fluxos completos

## Documentação

A documentação é uma parte crucial do projeto. Ao contribuir, considere:

- Atualizar o README.md quando necessário
- Adicionar comentários em código complexo
- Criar ou atualizar documentação específica para novas funcionalidades

## Comunicação

Para dúvidas ou discussões sobre o projeto:

- Abra uma issue no GitHub
- Entre em contato pelo email: contato@ifoodperfeito.com.br

## Licença

Ao contribuir para este projeto, você concorda que suas contribuições serão licenciadas sob a mesma licença do projeto (MIT). 