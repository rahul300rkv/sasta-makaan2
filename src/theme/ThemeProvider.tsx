import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";
type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default to "system", or whatever was last stored
  const [theme, setTheme] = useState<Theme>(
    (() => (localStorage.getItem("theme") as Theme) || "system")()
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "system") {
      // Automatically detects and sets OS theme
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.className = isDark ? "dark" : "light";
    } else {
      document.documentElement.className = theme;
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
