import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  userType: 'trainer' | 'student' | null;
  logoUrl: string | null;
  primaryColor: string | null;
  login: (token: string, userType: 'trainer' | 'student', logoUrl?: string, primaryColor?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// --- FUNÇÃO AUXILIAR: Converte HEX (#ffffff) para HSL (0 0% 100%) ---
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
  let h = 0,
    s = 0,
    l = 0;

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

  // Retorna no formato que o Tailwind espera (sem 'hsl()', apenas números)
  return `${h} ${s}% ${l}%`;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<'trainer' | 'student' | null>(null);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [primaryColor, setPrimaryColor] = useState<string | null>(null);

  // Função para aplicar a cor ao CSS
  const applyThemeColor = (colorHex: string) => {
    try {
      const hslValue = hexToHSL(colorHex);
      document.documentElement.style.setProperty('--primary', hslValue);
      // Opcional: Ajustar também o 'ring' para foco
      document.documentElement.style.setProperty('--ring', hslValue);
    } catch (e) {
      console.error("Erro ao converter cor HEX para HSL:", e);
    }
  };

  useEffect(() => {
    const trainerToken = localStorage.getItem('trainerAuthToken');
    const studentToken = localStorage.getItem('studentAuthToken');
    const storedLogo = localStorage.getItem('appLogoUrl');
    const storedColor = localStorage.getItem('appPrimaryColor');

    const token = trainerToken || studentToken;
    const type = trainerToken ? 'trainer' : studentToken ? 'student' : null;

    if (token && type) {
      setIsAuthenticated(true);
      setUserType(type);
      
      if (storedLogo) setLogoUrl(storedLogo);
      if (storedColor) {
        setPrimaryColor(storedColor);
        applyThemeColor(storedColor); // Aplica convertendo para HSL
      }
    }
  }, []);

  const login = (token: string, type: 'trainer' | 'student', logo?: string, color?: string) => {
    localStorage.setItem(
      type === 'trainer' ? 'trainerAuthToken' : 'studentAuthToken',
      token
    );
    setUserType(type);
    setIsAuthenticated(true);

    if (logo) {
      localStorage.setItem('appLogoUrl', logo);
      setLogoUrl(logo);
    }
    if (color) {
      localStorage.setItem('appPrimaryColor', color);
      setPrimaryColor(color);
      applyThemeColor(color); // Aplica convertendo para HSL
    }
  };

  const logout = () => {
    localStorage.removeItem('trainerAuthToken');
    localStorage.removeItem('studentAuthToken');
    localStorage.removeItem('appLogoUrl');
    localStorage.removeItem('appPrimaryColor');
    
    setIsAuthenticated(false);
    setUserType(null);
    setLogoUrl(null);
    setPrimaryColor(null);
    
    // Remove a propriedade inline para voltar à cor definida no index.css
    document.documentElement.style.removeProperty('--primary');
    document.documentElement.style.removeProperty('--ring');
  };

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