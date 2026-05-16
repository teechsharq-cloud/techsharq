import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [lang, setLang] = useState('uz');

  useEffect(() => {
    // <html> tegiga data-theme atributini yozamiz
    document.documentElement.setAttribute('data-theme', lang);
  }, [lang]);

  return (
    <ThemeContext.Provider value={{ lang, setLang }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);