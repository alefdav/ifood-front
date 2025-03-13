# Fluxo de Pagamento - iFood Perfeito

Este documento descreve o fluxo de pagamento implementado no projeto iFood Perfeito, detalhando como os pagamentos são processados, as páginas envolvidas e como integrar com o sistema.

## Visão Geral

O fluxo de pagamento do iFood Perfeito permite que os usuários comprem relatórios completos de análise de restaurantes. O processo é integrado com o Stripe para processamento seguro de pagamentos.

## Componentes Principais

### 1. PaymentButton

O componente `PaymentButton` é responsável por iniciar o processo de pagamento. Ele cria uma sessão de pagamento e redireciona o usuário para a página de checkout.

**Localização:** `src/components/payment/PaymentButton.tsx`

**Props:**
- `amount`: Valor do pagamento em centavos (ex: 9990 para R$ 99,90)
- `currency`: Moeda do pagamento (padrão: 'BRL')
- `metadata`: Dados adicionais sobre o pagamento (ex: ID do restaurante, email do usuário)
- `returnUrl`: URL para redirecionamento após o pagamento
- `className`: Classes CSS adicionais
- `children`: Conteúdo do botão

**Exemplo de uso:**
```tsx
<PaymentButton
  amount={9990}
  metadata={{
    restaurantId: 'rest123',
    userEmail: 'cliente@exemplo.com',
    reportType: 'full'
  }}
  returnUrl={`${window.location.origin}/report/full`}
>
  Comprar Relatório por R$ 99,90
</PaymentButton>
```

### 2. PaymentStatus

O componente `PaymentStatus` exibe o status atual de um pagamento e pode verificar periodicamente atualizações.

**Localização:** `src/components/payment/PaymentStatus.tsx`

**Props:**
- `paymentId`: ID do pagamento a ser verificado
- `onStatusChange`: Callback opcional chamado quando o status muda
- `className`: Classes CSS adicionais

**Exemplo de uso:**
```tsx
<PaymentStatus
  paymentId="payment_123"
  onStatusChange={(status) => {
    if (status === 'completed') {
      // Fazer algo quando o pagamento for concluído
    }
  }}
/>
```

### 3. Funções de API

#### verificarStatusPagamento

Verifica o status atual de um pagamento.

**Localização:** `src/lib/payment/stripe.ts`

**Parâmetros:**
- `paymentId`: ID do pagamento a ser verificado

**Retorno:**
```typescript
{
  status: 'pending' | 'completed' | 'failed';
  metadata?: Record<string, any>;
}
```

#### criarSessaoPagamento

Cria uma nova sessão de pagamento.

**Localização:** `src/lib/payment/stripe.ts`

**Parâmetros:**
```typescript
{
  amount: number;
  currency: string;
  metadata: Record<string, any>;
  returnUrl: string;
}
```

**Retorno:**
```typescript
{
  url: string;
  sessionId: string;
}
```

## Fluxo de Pagamento

1. **Início do Pagamento:**
   - O usuário clica no botão de pagamento na página de análise (`/analysis`)
   - O componente `PaymentButton` chama a função `criarSessaoPagamento`
   - O usuário é redirecionado para a página de checkout do Stripe

2. **Processamento do Pagamento:**
   - O usuário insere os dados de pagamento na página do Stripe
   - O Stripe processa o pagamento e redireciona o usuário de volta para a aplicação

3. **Resultado do Pagamento:**
   - **Sucesso:** O usuário é redirecionado para `/payment/success` e depois para `/report/full`
   - **Falha:** O usuário é redirecionado para `/payment/failed`

4. **Verificação do Status:**
   - Na página do relatório completo (`/report/full`), o componente `PaymentStatus` verifica se o pagamento foi concluído
   - Se o pagamento foi concluído, o relatório completo é exibido
   - Se o pagamento está pendente, o status é verificado periodicamente
   - Se o pagamento falhou, o usuário é informado e pode tentar novamente

## Páginas Relacionadas

### Página de Análise

**Localização:** `src/app/analysis/page.tsx`

Esta página permite que o usuário insira informações sobre o restaurante e visualize uma prévia da análise. Inclui o botão de pagamento para comprar o relatório completo.

### Página de Relatório Completo

**Localização:** `src/app/report/full/page.tsx`

Esta página exibe o relatório completo após a confirmação do pagamento. Verifica o status do pagamento e só exibe o conteúdo completo se o pagamento foi concluído.

### Página de Sucesso do Pagamento

**Localização:** `src/app/payment/success/page.tsx`

Página de confirmação exibida após um pagamento bem-sucedido. Redireciona automaticamente para a página do relatório completo.

### Página de Falha do Pagamento

**Localização:** `src/app/payment/failed/page.tsx`

Página exibida quando um pagamento falha. Mostra o erro específico e permite que o usuário tente novamente ou entre em contato com o suporte.

## Integração com Stripe (Produção)

Para integrar com o Stripe em produção:

1. Substitua as funções simuladas em `src/lib/payment/stripe.ts` por chamadas reais à API do Stripe
2. Configure as variáveis de ambiente:
   - `STRIPE_SECRET_KEY`: Chave secreta do Stripe
   - `STRIPE_WEBHOOK_SECRET`: Chave secreta para webhooks do Stripe
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Chave pública do Stripe

3. Implemente um endpoint de webhook para receber notificações do Stripe:
   ```typescript
   // src/app/api/webhooks/stripe/route.ts
   export async function POST(request: Request) {
     const body = await request.text();
     const signature = request.headers.get('stripe-signature');
     
     // Verificar assinatura e processar evento
     // ...
     
     return new Response(null, { status: 200 });
   }
   ```

## Considerações de Segurança

1. **Validação de Pagamentos:** Sempre verifique o status do pagamento no servidor antes de fornecer acesso ao conteúdo pago
2. **Proteção contra CSRF:** Inclua tokens anti-CSRF em todas as solicitações de pagamento
3. **Logs de Auditoria:** Mantenha logs detalhados de todas as transações de pagamento
4. **Timeout de Sessão:** Implemente um timeout para sessões de pagamento não concluídas

## Testes

Para testar o fluxo de pagamento:

1. **Ambiente de Desenvolvimento:**
   - As funções simuladas em `src/lib/payment/stripe.ts` permitem testar o fluxo sem integração real com o Stripe
   - IDs de pagamento que contêm "success" simulam pagamentos bem-sucedidos
   - IDs de pagamento que contêm "pending" simulam pagamentos pendentes
   - Outros IDs simulam pagamentos falhos

2. **Ambiente de Teste do Stripe:**
   - Use o modo de teste do Stripe com cartões de teste
   - Cartão de teste bem-sucedido: 4242 4242 4242 4242
   - Cartão de teste falho: 4000 0000 0000 0002 