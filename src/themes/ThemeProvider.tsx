import React from 'react';
import { DarkTheme, LightTheme, ThemeContext } from './ThemeContext';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Set LightTheme as the initial theme
  const [theme, setTheme] = React.useState(LightTheme);

   // Define toggleTheme function to toggle between Light and Dark themes
  const toggleTheme = () => {
    setTheme(theme === LightTheme ? DarkTheme : LightTheme);
  };

  return (
    // Provide the current theme and toggleTheme function to child components via ThemeContext
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
