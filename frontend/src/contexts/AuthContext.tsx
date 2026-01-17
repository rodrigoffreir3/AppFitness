import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import api from '../services/api';

export interface BrandingData {
  logo_url?: string;
  primary_color?: string;
  secondary_color?: string;
  payment_pix_key?: string;
  payment_link_url?: string;
  payment_instructions?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  userType: 'trainer' | 'student' | null;
  branding: BrandingData;
  isLoading: boolean;
  login: (token: string, userType: 'trainer' | 'student', branding: BrandingData) => void;
  logout: () => void;
  updateBranding: (newBranding: BrandingData) => void;
  logoUrl: string | null;
  primaryColor: string | null;
  // Funções de controle de tema
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
  r /= 255;
  g /= 255;
  b /= 255;
  const cmin = Math.min(r, g, b), cmax = Math.max(r, g, b), delta = cmax - cmin;
  let h = 0, s = 0, l = 0;
  if (delta === 0) h = 0;
  else if (cmax === r) h = ((g - b) / delta) % 6;
  else if (cmax === g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;
  h = Math.round(h * 60); if (h < 0) h += 360;
  l = (cmax + cmin) / 2;
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1); l = +(l * 100).toFixed(1);
  return `${h} ${s}% ${l}%`;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<'trainer' | 'student' | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [branding, setBranding] = useState<BrandingData>({});

  const applyThemeColors = (pColor?: string, sColor?: string) => {
    try {
      if (!pColor) {
        document.documentElement.style.removeProperty('--primary');
        document.documentElement.style.removeProperty('--ring');
        document.documentElement.style.removeProperty('--sidebar-primary');
        document.documentElement.style.removeProperty('--sidebar-ring');
      } else {
        const hslPrimary = hexToHSL(pColor);
        document.documentElement.style.setProperty('--primary', hslPrimary);
        document.documentElement.style.setProperty('--ring', hslPrimary);
        document.documentElement.style.setProperty('--sidebar-primary', hslPrimary);
        document.documentElement.style.setProperty('--sidebar-ring', hslPrimary);
      }
      
      if (!sColor) {
        document.documentElement.style.removeProperty('--secondary');
        document.documentElement.style.removeProperty('--sidebar-accent');
      } else {
        const hslSecondary = hexToHSL(sColor);
        document.documentElement.style.setProperty('--secondary', hslSecondary);
        document.documentElement.style.setProperty('--sidebar-accent', hslSecondary);
      }
    } catch (e) {
      console.error("Erro ao aplicar cores:", e);
    }
  };

  const clearThemeColors = () => applyThemeColors(undefined, undefined);
  const restoreThemeColors = () => applyThemeColors(branding.primary_color, branding.secondary_color);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedType = localStorage.getItem('userType') as 'trainer' | 'student' | null;
        
        // Tenta recuperar branding local primeiro
        const storedBrandingJSON = localStorage.getItem('appBranding');
        let storedBranding: BrandingData = {};
        if (storedBrandingJSON && storedBrandingJSON !== "undefined") {
            try { storedBranding = JSON.parse(storedBrandingJSON); } catch(e) { /* ignore */ }
        }

        let token = null;
        if (storedType === 'trainer') {
            token = localStorage.getItem('trainerAuthToken');
        } else if (storedType === 'student') {
            token = localStorage.getItem('studentAuthToken');
        }

        if (token && storedType) {
          setIsAuthenticated(true);
          setUserType(storedType);
          
          // ATUALIZADO: Se for aluno, tentamos buscar o perfil para pegar as cores atualizadas do banco
          if (storedType === 'student') {
             try {
                 // Configura api para usar o token (interceptor já deve fazer isso se token estiver no localStorage)
                 const response = await api.get('/students/me/profile');
                 const profile = response.data;
                 storedBranding = {
                     logo_url: profile.brand_logo_url,
                     primary_color: profile.brand_primary_color,
                     secondary_color: profile.brand_secondary_color,
                     payment_pix_key: profile.payment_pix_key,
                     payment_link_url: profile.payment_link_url,
                     payment_instructions: profile.payment_instructions
                 };
                 // Atualiza localStorage
                 localStorage.setItem('appBranding', JSON.stringify(storedBranding));
             } catch (err) {
                 console.warn("Não foi possível atualizar branding do aluno:", err);
             }
          }

          setBranding(storedBranding);
          applyThemeColors(storedBranding.primary_color, storedBranding.secondary_color);
        } else {
          logout(false); 
        }
      } catch (err) {
        console.error("Erro na inicialização da auth:", err);
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
    
    // Salva Branding
    localStorage.setItem('appBranding', JSON.stringify(newBranding));
    
    setUserType(type);
    setIsAuthenticated(true);
    setBranding(newBranding);
    applyThemeColors(newBranding.primary_color, newBranding.secondary_color);

    // FORÇA O REDIRECIONAMENTO COM RELOAD
    if (type === 'student') {
        window.location.href = '/student/dashboard';
    } else {
        window.location.href = '/trainer/dashboard';
    }
  };

  const updateBranding = (newBranding: BrandingData) => {
    setBranding(prev => {
      const updated = { ...prev, ...newBranding };
      localStorage.setItem('appBranding', JSON.stringify(updated));
      applyThemeColors(updated.primary_color, updated.secondary_color);
      return updated;
    });
  };

  const logout = (redirect = true) => {
    localStorage.clear();
    setIsAuthenticated(false);
    setUserType(null);
    setBranding({});
    
    document.documentElement.style.removeProperty('--primary');
    document.documentElement.style.removeProperty('--secondary');
    document.documentElement.style.removeProperty('--ring');
    document.documentElement.style.removeProperty('--sidebar-primary');
    document.documentElement.style.removeProperty('--sidebar-accent');

    if (redirect) window.location.href = '/'; 
  };

  const value = {
    isAuthenticated,
    userType,
    branding,
    isLoading,
    login,
    logout: () => logout(true),
    updateBranding,
    logoUrl: branding.logo_url || null,
    primaryColor: branding.primary_color || null,
    clearThemeColors,
    restoreThemeColors,
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