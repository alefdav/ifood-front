# Sistema de Autenticação - iFood Perfeito

## Visão Geral

O sistema de autenticação do iFood Perfeito foi implementado utilizando React Context API para gerenciar o estado global de autenticação em toda a aplicação. A implementação atual é uma simulação que utiliza localStorage para persistir os dados do usuário entre sessões, mas está estruturada de forma a facilitar a integração com um backend real no futuro.

## Componentes Principais

### 1. Contexto de Autenticação (`AuthContext.tsx`)

- Gerencia o estado global de autenticação
- Fornece funções para login, registro, logout e atualização de perfil
- Utiliza um reducer para manipular o estado de forma previsível
- Expõe um hook `useAuth()` para acesso fácil ao contexto em qualquer componente

### 2. Serviço de Autenticação (`authService.ts`)

- Implementa a lógica de comunicação com o "backend" (simulado)
- Funções para login, registro, logout e atualização de perfil
- Gerencia o armazenamento local dos dados do usuário
- Simula atrasos de rede para uma experiência mais realista

### 3. Tipos e Interfaces (`types.ts`)

- Define a estrutura de dados para usuários, credenciais e respostas
- Garante consistência de tipos em toda a aplicação
- Facilita a manutenção e evolução do sistema

## Páginas Implementadas

### 1. Login (`/login`)

- Formulário para entrada de email e senha
- Validação de campos
- Feedback visual durante o processo de login
- Opção para login com Google e Facebook (simulado)
- Link para recuperação de senha

### 2. Registro (`/register`)

- Formulário para criação de nova conta
- Validação de campos, incluindo força da senha
- Feedback visual durante o processo de registro
- Termos de serviço e política de privacidade

### 3. Recuperação de Senha (`/forgot-password`)

- Formulário para solicitar redefinição de senha
- Simulação de envio de email
- Feedback visual durante o processo

### 4. Perfil do Usuário (`/perfil`)

- Visualização e edição de informações pessoais
- Alteração de senha
- Feedback visual durante as atualizações

### 5. Dashboard (`/dashboard`)

- Página protegida que requer autenticação
- Exibe informações personalizadas para o usuário
- Mostra histórico de análises realizadas

## Proteção de Rotas

Todas as páginas que requerem autenticação implementam:

1. Verificação de estado de autenticação
2. Redirecionamento para login se não autenticado
3. Exibição de indicador de carregamento durante a verificação

## Fluxo de Autenticação

1. O usuário acessa a página de login ou registro
2. Após autenticação bem-sucedida, o estado é atualizado no contexto
3. Os dados do usuário são armazenados no localStorage
4. O usuário é redirecionado para o dashboard
5. Em visitas subsequentes, o sistema verifica o localStorage para restaurar a sessão

## Próximos Passos

1. **Integração com Backend Real**: Substituir as simulações por chamadas de API reais
2. **Autenticação com JWT**: Implementar autenticação baseada em tokens JWT
3. **Refresh Tokens**: Adicionar suporte para renovação automática de tokens
4. **Autenticação Social**: Implementar login real com Google, Facebook, etc.
5. **Verificação de Email**: Adicionar processo de verificação de email após registro
6. **Controle de Acesso Baseado em Funções**: Implementar diferentes níveis de acesso baseados no papel do usuário 