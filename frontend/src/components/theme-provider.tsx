import { createContext, useContext, useEffect, useState } from "react"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: string // Alterado para string genérica
  storageKey?: string
}

type ThemeProviderState = {
  theme: string // Alterado para string genérica
  setTheme: (theme: string) => void // Alterado para string genérica
}

const initialState: ThemeProviderState = {
  theme: "system", // Mantém "system" como padrão inicial
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "system", // Mantém "system"
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<string>( // Usa string genérica
    () => localStorage.getItem(storageKey) || defaultTheme
  )

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove("light", "dark") // Remove ambos para garantir

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme) // Adiciona light ou dark
  }, [theme])

  const value = {
    theme,
    setTheme: (theme: string) => { // Aceita string genérica
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}