import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import api from '@/services/api'; // <<< GARANTA QUE ESTA LINHA EXISTA E SEJA A ÚNICA DEFINIÇÃO DE 'api'

// Definindo os tipos para o nosso contexto
interface AuthContextType {
  isAuthenticated: boolean;
  userType: 'trainer' | 'student' | null;
  login: (token: string, type: 'trainer' | 'student', branding?: any) => void;
  logout: () => void;
}

// Criando o contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// O Provedor que vai envolver nossa aplicação
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userType, setUserType] = useState<'trainer' | 'student' | null>(null);

  // Verifica se já existe um token no localStorage quando o app carrega
  useEffect(() => {
    const trainerToken = localStorage.getItem('trainerAuthToken');
    const studentToken = localStorage.getItem('studentAuthToken');

    if (trainerToken) {
      setIsAuthenticated(true);
      setUserType('trainer');
    } else if (studentToken) {
      setIsAuthenticated(true);
      setUserType('student');
    }
  }, []);

  const login = (token: string, type: 'trainer' | 'student', branding?: any) => {
    localStorage.setItem(`${type}AuthToken`, token);
    if (type === 'student' && branding) {
      localStorage.setItem('brandingLogo', branding.logo_url || '');
      localStorage.setItem('brandingColor', branding.primary_color || '#4f46e5'); // Cor padrão do seu design
    }
    setIsAuthenticated(true);
    setUserType(type);
  };

  const logout = () => {
    localStorage.removeItem('trainerAuthToken');
    localStorage.removeItem('studentAuthToken');
    localStorage.removeItem('brandingLogo');
    localStorage.removeItem('brandingColor');
    setIsAuthenticated(false);
    setUserType(null);
    // Idealmente, redirecionar para a página de login aqui
    // window.location.href = '/login'; // Ou use useNavigate se estiver dentro de um componente roteado
  };

  // Note que 'api' ainda não está sendo usado aqui dentro. O aviso ts(6133) é esperado.
  return (
    <AuthContext.Provider value={{ isAuthenticated, userType, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook customizado para facilitar o uso do contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};