/**
 * Serviço de autenticação simulado
 * 
 * Em uma implementação real, este serviço se comunicaria com um backend
 * para autenticação e gerenciamento de usuários.
 */

import { 
  User, 
  UserRole, 
  LoginCredentials, 
  RegisterData, 
  AuthResponse 
} from './types';

// Simulação de banco de dados de usuários
const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Usuário Teste',
    email: 'teste@exemplo.com',
    role: UserRole.USER,
    createdAt: new Date('2023-01-01'),
    establishmentId: '123'
  },
  {
    id: '2',
    name: 'Admin',
    email: 'admin@ifoodperfeito.com.br',
    role: UserRole.ADMIN,
    createdAt: new Date('2023-01-01')
  }
];

// Chave para armazenamento no localStorage
const AUTH_TOKEN_KEY = 'ifood_perfeito_auth_token';
const USER_KEY = 'ifood_perfeito_user';

/**
 * Simula o login de um usuário
 * @param credentials Credenciais de login
 * @returns Resposta de autenticação
 */
export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  // Simular tempo de processamento
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Verificar credenciais
  const user = MOCK_USERS.find(u => u.email === credentials.email);
  
  if (!user) {
    throw new Error('Usuário não encontrado');
  }
  
  // Em uma implementação real, verificaríamos a senha
  if (credentials.password !== '123456') {
    throw new Error('Senha incorreta');
  }
  
  // Gerar token simulado
  const token = `mock-token-${user.id}-${Date.now()}`;
  
  // Salvar no localStorage
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  
  return { user, token };
}

/**
 * Simula o registro de um novo usuário
 * @param data Dados de registro
 * @returns Resposta de autenticação
 */
export async function register(data: RegisterData): Promise<AuthResponse> {
  // Simular tempo de processamento
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Verificar se o email já existe
  const existingUser = MOCK_USERS.find(u => u.email === data.email);
  
  if (existingUser) {
    throw new Error('Este email já está em uso');
  }
  
  // Criar novo usuário
  const newUser: User = {
    id: `${MOCK_USERS.length + 1}`,
    name: data.name,
    email: data.email,
    role: UserRole.USER,
    createdAt: new Date(),
    establishmentId: data.establishmentName ? `est-${Date.now()}` : undefined
  };
  
  // Em uma implementação real, adicionaríamos ao banco de dados
  MOCK_USERS.push(newUser);
  
  // Gerar token simulado
  const token = `mock-token-${newUser.id}-${Date.now()}`;
  
  // Salvar no localStorage
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(newUser));
  
  return { user: newUser, token };
}

/**
 * Simula o logout de um usuário
 */
export function logout(): void {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

/**
 * Verifica se o usuário está autenticado
 * @returns Usuário autenticado ou null
 */
export function getCurrentUser(): User | null {
  const userJson = typeof window !== 'undefined' ? localStorage.getItem(USER_KEY) : null;
  
  if (!userJson) {
    return null;
  }
  
  try {
    const user = JSON.parse(userJson) as User;
    return user;
  } catch (error) {
    console.error('Erro ao parsear usuário:', error);
    return null;
  }
}

/**
 * Verifica se o token de autenticação existe
 * @returns Token de autenticação ou null
 */
export function getAuthToken(): string | null {
  return typeof window !== 'undefined' ? localStorage.getItem(AUTH_TOKEN_KEY) : null;
}

/**
 * Simula a atualização do perfil do usuário
 * @param data Dados a serem atualizados
 */
export async function updateProfile(data: Partial<User>): Promise<void> {
  // Simular tempo de processamento
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Obter usuário atual
  const currentUser = getCurrentUser();
  
  if (!currentUser) {
    throw new Error('Usuário não autenticado');
  }
  
  // Atualizar usuário no "banco de dados"
  const userIndex = MOCK_USERS.findIndex(u => u.id === currentUser.id);
  
  if (userIndex >= 0) {
    MOCK_USERS[userIndex] = {
      ...MOCK_USERS[userIndex],
      ...data
    };
  }
  
  // Atualizar no localStorage
  const updatedUser = {
    ...currentUser,
    ...data
  };
  
  localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
} 