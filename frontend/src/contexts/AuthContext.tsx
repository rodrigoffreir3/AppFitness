import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import api from '../services/api';

export interface BrandingData {
  logo_url?: string;
  primary_color?: string;
  secondary_color?: string;
  payment_pix_key?: string;
  payment_link_url?: string;
  payment_instructions?: string;
}

// 1. Definição do Usuário (Adicionado terms_accepted_at)
export interface User {
  id: string;
  name: string;
  email: string;
  terms_accepted_at?: string | null; // O campo crucial
}

interface AuthContextType {
  isAuthenticated: boolean;
  userType: 'trainer' | 'student' | null;
  user: User | null; // O usuário agora está disponível globalmente
  branding: BrandingData;
  isLoading: boolean;
  login: (token: string, userType: 'trainer' | 'student', branding: BrandingData) => void;
  logout: (redirect?: boolean) => void;
  updateBranding: (newBranding: BrandingData) => void;
  updateUser: (updates: Partial<User>) => void; // Função para atualizar o usuário localmente
  logoUrl: string | null;
  primaryColor: string | null;
  clearThemeColors: () => void;
  restoreThemeColors: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const hexToHSL = (hex: string): string => {
  let r = 0, g = 0, b = 0;
  if (hex.length === 4) {
    r = parseInt("0x" + hex[1] + hex[1]);
    g = parseInt("0x" + hex[2] + hex[2]);
    b = parseInt("0x" + hex[3] + hex[3]);
  } else if (hex.length === 7) {
    r = parseInt("0x" + hex[1] + hex[2]);
    g = parseInt("0x" + hex[3] + hex[4]);
    b = parseInt("0x" + hex[5] + hex[6]);
  }
  r /= 255; g /= 255; b /= 255;
  const cmin = Math.min(r, g, b), cmax = Math.max(r, g, b), delta = cmax - cmin;
  let h = 0, s = 0, l = (cmax + cmin) / 2;
  if (delta !== 0) {
    if (cmax === r) h = ((g - b) / delta) % 6;
    else if (cmax === g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;
    s = delta / (1 - Math.abs(2 * l - 1));
  }
  h = Math.round(h * 60); if (h < 0) h += 360;
  return `${h} ${+(s * 100).toFixed(1)}% ${+(l * 100).toFixed(1)}%`;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<'trainer' | 'student' | null>(null);
  const [user, setUser] = useState<User | null>(null); // Novo estado User
  const [isLoading, setIsLoading] = useState(true);
  const [branding, setBranding] = useState<BrandingData>({});

  const applyThemeColors = (pColor?: string, sColor?: string) => {
    try {
      const root = document.documentElement.style;
      if (!pColor) {
        ['--primary', '--ring', '--sidebar-primary', '--sidebar-ring'].forEach(p => root.removeProperty(p));
      } else {
        const hsl = hexToHSL(pColor);
        ['--primary', '--ring', '--sidebar-primary', '--sidebar-ring'].forEach(p => root.setProperty(p, hsl));
      }
      if (!sColor) {
        ['--secondary', '--sidebar-accent'].forEach(p => root.removeProperty(p));
      } else {
        const hsl = hexToHSL(sColor);
        ['--secondary', '--sidebar-accent'].forEach(p => root.setProperty(p, hsl));
      }
    } catch (e) {
      console.error("Erro ao aplicar cores:", e);
    }
  };

  const logout = (redirect = true) => {
    localStorage.clear();
    setIsAuthenticated(false);
    setUserType(null);
    setUser(null);
    setBranding({});
    ['--primary', '--secondary', '--ring', '--sidebar-primary', '--sidebar-accent'].forEach(p => document.documentElement.style.removeProperty(p));
    
    if (redirect) window.location.href = '/';
  };

  // Função para atualizar o usuário manualmente (ex: após aceitar termos)
  const updateUser = (updates: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...updates } : null);
  };

  useEffect(() => {
    const checkAuth = async () => {
      // --- CORREÇÃO CIRÚRGICA DO GOD MODE ---
      // O God Mode SÓ tem prioridade se o usuário estiver na rota /master!
      const isMasterRoute = window.location.pathname.includes('/master');
      if (isMasterRoute && localStorage.getItem('adminAuthToken')) {
        setIsLoading(false);
        return; 
      }

      try {
        const storedType = localStorage.getItem('userType') as 'trainer' | 'student' | null;
        let token = null;
        if (storedType === 'trainer') token = localStorage.getItem('trainerAuthToken');
        else if (storedType === 'student') token = localStorage.getItem('studentAuthToken');

        const cachedBrandingStr = localStorage.getItem('appBranding');
        if (cachedBrandingStr) {
            try {
                const cachedBranding = JSON.parse(cachedBrandingStr);
                setBranding(cachedBranding);
                applyThemeColors(cachedBranding.primary_color, cachedBranding.secondary_color);
            } catch (e) { /* ignore */ }
        }

        if (token && storedType) {
          try {
            const endpoint = storedType === 'trainer' ? '/trainers/me' : '/students/me/profile';
            const response = await api.get(endpoint);
            const data = response.data;

            // Mapeia Branding
            const updatedBranding: BrandingData = {
              logo_url: data.brand_logo_url || data.logo_url,
              primary_color: data.brand_primary_color || data.primary_color,
              secondary_color: data.brand_secondary_color || data.secondary_color,
              payment_pix_key: data.payment_pix_key,
              payment_link_url: data.payment_link_url,
              payment_instructions: data.payment_instructions
            };

            // Mapeia User (Aqui salvamos o terms_accepted_at!)
            const userData: User = {
                id: data.id,
                name: data.name,
                email: data.email,
                terms_accepted_at: data.terms_accepted_at // Pega do backend
            };

            setIsAuthenticated(true);
            setUserType(storedType);
            setBranding(updatedBranding);
            setUser(userData); // Atualiza estado
            
            localStorage.setItem('appBranding', JSON.stringify(updatedBranding));
            applyThemeColors(updatedBranding.primary_color, updatedBranding.secondary_color);
          } catch (err: any) {
            if (err.response?.status === 401 || err.response?.status === 404) {
              logout(false);
            }
          }
        }
      } catch (e) {
        console.error("Auth init error:", e);
        logout(false);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = (token: string, type: 'trainer' | 'student', newBranding: BrandingData) => {
    localStorage.removeItem('trainerAuthToken');
    localStorage.removeItem('studentAuthToken');
    localStorage.setItem(type === 'trainer' ? 'trainerAuthToken' : 'studentAuthToken', token);
    localStorage.setItem('userType', type);
    localStorage.setItem('appBranding', JSON.stringify(newBranding));
    
    setIsAuthenticated(true);
    setUserType(type);
    setBranding(newBranding);
    applyThemeColors(newBranding.primary_color, newBranding.secondary_color);
    
    // Força um reload para buscar os dados completos do usuário (/me) na próxima carga
    // ou você poderia fazer um fetch aqui, mas o reload garante estado limpo
    window.location.href = type === 'student' ? '/student/dashboard' : '/trainer/dashboard';
  };

  const updateBranding = (newBranding: BrandingData) => {
    setBranding(prev => {
      const updated = { ...prev, ...newBranding };
      localStorage.setItem('appBranding', JSON.stringify(updated));
      applyThemeColors(updated.primary_color, updated.secondary_color);
      return updated;
    });
  };

  const value = {
    isAuthenticated,
    userType,
    user, // Agora disponível
    branding,
    isLoading,
    login,
    logout,
    updateBranding,
    updateUser, // Agora disponível
    logoUrl: branding.logo_url || null,
    primaryColor: branding.primary_color || null,
    clearThemeColors: () => applyThemeColors(),
    restoreThemeColors: () => applyThemeColors(branding.primary_color, branding.secondary_color),
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