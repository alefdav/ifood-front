'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth/AuthContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold text-ifood-red">
            iFood Perfeito
          </Link>
          
          {/* Menu para desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-ifood-red transition-colors">
              Início
            </Link>
            <Link href="/como-funciona" className="text-gray-700 hover:text-ifood-red transition-colors">
              Como Funciona
            </Link>
            <Link href="/precos" className="text-gray-700 hover:text-ifood-red transition-colors">
              Preços
            </Link>
            <Link href="/contato" className="text-gray-700 hover:text-ifood-red transition-colors">
              Contato
            </Link>
            
            {isAuthenticated ? (
              <div className="relative group">
                <button 
                  className="flex items-center text-gray-700 hover:text-ifood-red transition-colors"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <span className="mr-1">{user?.name?.split(' ')[0] || 'Usuário'}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <Link 
                      href="/dashboard" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link 
                      href="/perfil" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Meu Perfil
                    </Link>
                    <button 
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sair
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/login" className="text-gray-700 hover:text-ifood-red transition-colors">
                  Entrar
                </Link>
                <Link href="/register" className="btn-primary">
                  Registrar
                </Link>
              </div>
            )}
          </nav>
          
          {/* Botão de menu para mobile */}
          <button 
            className="md:hidden text-gray-700 hover:text-ifood-red"
            onClick={toggleMenu}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              )}
            </svg>
          </button>
        </div>
        
        {/* Menu mobile */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-ifood-red transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Início
              </Link>
              <Link 
                href="/como-funciona" 
                className="text-gray-700 hover:text-ifood-red transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Como Funciona
              </Link>
              <Link 
                href="/precos" 
                className="text-gray-700 hover:text-ifood-red transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Preços
              </Link>
              <Link 
                href="/contato" 
                className="text-gray-700 hover:text-ifood-red transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contato
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link 
                    href="/dashboard" 
                    className="text-gray-700 hover:text-ifood-red transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    href="/perfil" 
                    className="text-gray-700 hover:text-ifood-red transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Meu Perfil
                  </Link>
                  <button 
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="text-left text-gray-700 hover:text-ifood-red transition-colors"
                  >
                    Sair
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Link 
                    href="/login" 
                    className="text-gray-700 hover:text-ifood-red transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Entrar
                  </Link>
                  <Link 
                    href="/register" 
                    className="btn-primary inline-block text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Registrar
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
} 