'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthContext';

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading, updateProfile } = useAuth();
  const router = useRouter();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    // Redirecionar para login se não estiver autenticado
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
    
    // Preencher os campos com os dados do usuário
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
    }
  }, [isLoading, isAuthenticated, router, user]);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsUpdating(true);
    setMessage({ type: '', text: '' });
    
    try {
      // Simulação de atualização de perfil
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Atualizar perfil (função simulada)
      if (updateProfile) {
        await updateProfile({ name, email });
      }
      
      setMessage({ 
        type: 'success', 
        text: 'Perfil atualizado com sucesso!' 
      });
    } catch (error: any) {
      setMessage({ 
        type: 'error', 
        text: error.message || 'Erro ao atualizar perfil' 
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsUpdating(true);
    setMessage({ type: '', text: '' });
    
    // Validar senhas
    if (newPassword !== confirmPassword) {
      setMessage({ 
        type: 'error', 
        text: 'As senhas não coincidem' 
      });
      setIsUpdating(false);
      return;
    }
    
    if (newPassword.length < 8) {
      setMessage({ 
        type: 'error', 
        text: 'A nova senha deve ter pelo menos 8 caracteres' 
      });
      setIsUpdating(false);
      return;
    }
    
    try {
      // Simulação de atualização de senha
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Atualizar senha (função simulada)
      // Aqui seria implementada a lógica real de atualização de senha
      
      setMessage({ 
        type: 'success', 
        text: 'Senha atualizada com sucesso!' 
      });
      
      // Limpar campos de senha
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      setMessage({ 
        type: 'error', 
        text: error.message || 'Erro ao atualizar senha' 
      });
    } finally {
      setIsUpdating(false);
    }
  };

  // Renderizar tela de carregamento enquanto verifica autenticação
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ifood-red"></div>
      </div>
    );
  }

  // Não renderizar nada se não estiver autenticado (será redirecionado)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Meu Perfil</h1>
        
        {message.text && (
          <div className={`mb-6 p-4 rounded-md ${
            message.type === 'success' 
              ? 'bg-green-100 text-green-800 border border-green-400' 
              : 'bg-red-100 text-red-800 border border-red-400'
          }`}>
            {message.text}
          </div>
        )}
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Informações Pessoais</h2>
          </div>
          
          <form onSubmit={handleProfileUpdate} className="p-6">
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                Nome completo
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-primary"
                required
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-primary"
                required
              />
            </div>
            
            <button
              type="submit"
              className="btn-primary"
              disabled={isUpdating}
            >
              {isUpdating ? 'Atualizando...' : 'Atualizar Perfil'}
            </button>
          </form>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Alterar Senha</h2>
          </div>
          
          <form onSubmit={handlePasswordUpdate} className="p-6">
            <div className="mb-4">
              <label htmlFor="current-password" className="block text-gray-700 font-medium mb-2">
                Senha atual
              </label>
              <input
                type="password"
                id="current-password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="input-primary"
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="new-password" className="block text-gray-700 font-medium mb-2">
                Nova senha
              </label>
              <input
                type="password"
                id="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="input-primary"
                required
              />
              <p className="mt-1 text-sm text-gray-500">
                Mínimo de 8 caracteres
              </p>
            </div>
            
            <div className="mb-6">
              <label htmlFor="confirm-password" className="block text-gray-700 font-medium mb-2">
                Confirmar nova senha
              </label>
              <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input-primary"
                required
              />
            </div>
            
            <button
              type="submit"
              className="btn-primary"
              disabled={isUpdating}
            >
              {isUpdating ? 'Atualizando...' : 'Alterar Senha'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 