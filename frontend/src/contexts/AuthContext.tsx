import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Interface unificada para os dados de marca e pagamento
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
  branding: BrandingData; // Objeto único com tudo
  isLoading: boolean;
  login: (token: string, userType: 'trainer' | 'student', branding: BrandingData) => void;
  logout: () => void;
  updateBranding: (newBranding: BrandingData) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper HEX -> HSL
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
  const cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin;
  let h = 0, s = 0, l = 0;

  if (delta === 0) h = 0;
  else if (cmax === r) h = ((g - b) / delta) % 6;
  else if (cmax === g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);
  if (h < 0) h += 360;
  l = (cmax + cmin) / 2;
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return `${h} ${s}% ${l}%`;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<'trainer' | 'student' | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [branding, setBranding] = useState<BrandingData>({});

  const applyThemeColors = (pColor?: string, sColor?: string) => {
    try {
      if (pColor) {
        const hslPrimary = hexToHSL(pColor);
        document.documentElement.style.setProperty('--primary', hslPrimary);
        document.documentElement.style.setProperty('--ring', hslPrimary);
        document.documentElement.style.setProperty('--sidebar-primary', hslPrimary);
        document.documentElement.style.setProperty('--sidebar-ring', hslPrimary);
      }
      if (sColor) {
        const hslSecondary = hexToHSL(sColor);
        document.documentElement.style.setProperty('--secondary', hslSecondary);
        document.documentElement.style.setProperty('--sidebar-accent', hslSecondary);
      }
    } catch (e) {
      console.error("Erro ao aplicar cores:", e);
    }
  };

  useEffect(() => {
    const checkAuth = () => {
      const trainerToken = localStorage.getItem('trainerAuthToken');
      const studentToken = localStorage.getItem('studentAuthToken');
      
      // Carrega Branding do LocalStorage
      const storedBrandingJSON = localStorage.getItem('appBranding');
      const storedBranding: BrandingData = storedBrandingJSON ? JSON.parse(storedBrandingJSON) : {};

      const token = trainerToken || studentToken;
      const type = trainerToken ? 'trainer' : studentToken ? 'student' : null;

      if (token && type) {
        setIsAuthenticated(true);
        setUserType(type);
        setBranding(storedBranding);
        applyThemeColors(storedBranding.primary_color, storedBranding.secondary_color);
      }
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  const login = (token: string, type: 'trainer' | 'student', newBranding: BrandingData) => {
    localStorage.setItem(type === 'trainer' ? 'trainerAuthToken' : 'studentAuthToken', token);
    setUserType(type);
    setIsAuthenticated(true);
    updateBranding(newBranding);
  };

  const updateBranding = (newBranding: BrandingData) => {
    // Mescla com o que já existe para não perder dados parciais
    setBranding(prev => {
      const updated = { ...prev, ...newBranding };
      localStorage.setItem('appBranding', JSON.stringify(updated));
      applyThemeColors(updated.primary_color, updated.secondary_color);
      return updated;
    });
  };

  const logout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setUserType(null);
    setBranding({});
    
    document.documentElement.style.removeProperty('--primary');
    document.documentElement.style.removeProperty('--secondary');
    document.documentElement.style.removeProperty('--ring');
    document.documentElement.style.removeProperty('--sidebar-primary');
    document.documentElement.style.removeProperty('--sidebar-accent');

    window.location.href = '/'; 
  };

  const value = {
    isAuthenticated,
    userType,
    branding, // Expõe todo o objeto (logo, cores, pix, link)
    isLoading,
    login,
    logout,
    updateBranding,
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