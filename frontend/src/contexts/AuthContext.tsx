import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
// import api from '@/services/api'; // <--- Esta linha foi removida (estava a causar um aviso no build)

// --- 1. ATUALIZAR O TIPO DO CONTEXTO ---
interface AuthContextType {
  isAuthenticated: boolean;
  userType: 'trainer' | 'student' | null;
  logoUrl: string | null;
  primaryColor: string | null;
  login: (token: string, userType: 'trainer' | 'student', logoUrl?: string, primaryColor?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<'trainer' | 'student' | null>(null);

  // --- 2. ADICIONAR ESTADOS PARA O BRANDING ---
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [primaryColor, setPrimaryColor] = useState<string | null>(null);

  // --- 3. ATUALIZAR O useEffect PARA CARREGAR TUDO ---
  useEffect(() => {
    // Tenta carregar o token de treinador ou aluno
    const trainerToken = localStorage.getItem('trainerAuthToken');
    const studentToken = localStorage.getItem('studentAuthToken');
    const storedLogo = localStorage.getItem('appLogoUrl');
    const storedColor = localStorage.getItem('appPrimaryColor');

    const token = trainerToken || studentToken;
    const type = trainerToken ? 'trainer' : studentToken ? 'student' : null;

    if (token && type) {
      setIsAuthenticated(true);
      setUserType(type);
      
      // Aplicar branding guardado
      if (storedLogo) setLogoUrl(storedLogo);
      if (storedColor) {
        setPrimaryColor(storedColor);
        // Aplica a cor ao CSS root (para o tailwind usar)
        document.documentElement.style.setProperty('--primary', storedColor);
      }
    }
  }, []);

  // --- 4. ATUALIZAR A FUNÇÃO LOGIN PARA ACEITAR 4 ARGUMENTOS ---
  const login = (token: string, type: 'trainer' | 'student', logo?: string, color?: string) => {
    // Guardar o token
    localStorage.setItem(
      type === 'trainer' ? 'trainerAuthToken' : 'studentAuthToken',
      token
    );
    setUserType(type);
    setIsAuthenticated(true);

    // Guardar o branding
    if (logo) {
      localStorage.setItem('appLogoUrl', logo);
      setLogoUrl(logo);
    }
    if (color) {
      localStorage.setItem('appPrimaryColor', color);
      setPrimaryColor(color);
      // Aplica a cor imediatamente
      document.documentElement.style.setProperty('--primary', color);
    }
  };

  // --- 5. ATUALIZAR O LOGOUT PARA LIMPAR TUDO ---
  const logout = () => {
    localStorage.removeItem('trainerAuthToken');
    localStorage.removeItem('studentAuthToken');
    localStorage.removeItem('appLogoUrl');
    localStorage.removeItem('appPrimaryColor'); // Limpar branding
    
    setIsAuthenticated(false);
    setUserType(null);
    setLogoUrl(null); // Limpar estado
    setPrimaryColor(null);
    
    // Resetar a cor para o padrão
    document.documentElement.style.removeProperty('--primary');
  };

  // --- 6. PASSAR OS NOVOS VALORES ---
  const value = {
    isAuthenticated,
    userType,
    logoUrl,
    primaryColor,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};