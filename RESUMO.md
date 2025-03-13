# Resumo do Projeto iFood Perfeito

## Visão Geral

O iFood Perfeito é uma aplicação web que permite aos proprietários de restaurantes analisar seu desempenho no iFood e receber recomendações personalizadas para melhorar suas vendas. A aplicação utiliza técnicas de web scraping e inteligência artificial para coletar e analisar dados do estabelecimento.

## Fluxo Principal

1. **Captura do Link**: O usuário insere o link do seu estabelecimento no iFood na página inicial.
2. **Processamento da Análise**: A aplicação inicia o processo de análise e redireciona o usuário para a página de coleta de informações.
3. **Coleta de Dados do Usuário**: Enquanto a análise é processada, o usuário pode fornecer nome, e-mail e WhatsApp (opcional).
4. **Prévia da Análise**: Após a conclusão da análise, o usuário é redirecionado para a página de prévia, onde pode visualizar uma versão limitada do relatório.
5. **Pagamento**: Para obter o relatório completo, o usuário realiza o pagamento de R$ 19,90.
6. **Download do Relatório**: Após o pagamento, o usuário pode baixar o relatório completo em PDF e também o recebe por e-mail.

## Componentes Principais

### Páginas

1. **Página Inicial (Home)**: Formulário para inserir o link do estabelecimento no iFood.
2. **Página de Coleta de Informações (User Info)**: Formulário para coletar dados do usuário enquanto a análise é processada.
3. **Página de Prévia (Preview)**: Exibe uma versão limitada do relatório de análise.
4. **Página de Pagamento (Payment)**: Formulário para processar o pagamento do relatório completo.
5. **Página de Sucesso (Success)**: Exibe informações sobre a compra e permite o download do relatório.

### APIs

1. **start-analysis**: Inicia o processo de análise do estabelecimento.
2. **analysis-status**: Verifica o status da análise em andamento.
3. **save-user-info**: Salva as informações do usuário.
4. **analysis-preview**: Obtém a prévia da análise.
5. **process-payment**: Processa o pagamento do relatório completo.
6. **purchase-details**: Obtém os detalhes da compra.
7. **user-info**: Obtém as informações do usuário.
8. **register-download**: Registra o download do relatório.
9. **download-report**: Gera e fornece o relatório em PDF para download.

## Tecnologias Utilizadas

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: API Routes do Next.js
- **Armazenamento**: Simulação em memória (em produção seria um banco de dados)
- **Pagamentos**: Integração com Stripe (simulada)
- **Análise de Dados**: Serviço Python para web scraping e análise (simulado)

## Simulações Implementadas

Para fins de demonstração, o projeto implementa simulações para:

1. **Processamento de Análise**: Simula o tempo de processamento da análise.
2. **Dados da Análise**: Gera dados fictícios para o relatório.
3. **Processamento de Pagamento**: Simula a integração com o Stripe.
4. **Geração de PDF**: Simula a geração e download do relatório em PDF.

## Próximos Passos

1. **Web Scraping Real**: Implementar a coleta real de dados do iFood usando Python.
2. **Algoritmos de Análise**: Desenvolver algoritmos baseados em dados reais para gerar recomendações precisas.
3. **Integração com Stripe**: Implementar a integração real com o Stripe para processamento de pagamentos.
4. **Geração de PDF**: Implementar a geração real de PDF para o relatório completo.
5. **Banco de Dados**: Substituir o armazenamento em memória por um banco de dados real.
6. **Envio de E-mail**: Implementar o envio real de e-mails com o relatório anexado.
7. **Autenticação**: Adicionar sistema de autenticação para usuários recorrentes.

## Conclusão

O iFood Perfeito oferece uma solução completa para proprietários de restaurantes que desejam melhorar seu desempenho no iFood. A aplicação combina análise de dados, recomendações personalizadas e um fluxo de usuário intuitivo para fornecer valor real aos seus usuários. 