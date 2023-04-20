import React from 'react';

// This file exports two different themes, light and dark, as objects with specific color values
export type Theme = {
  backgroundColor: string;
  textColor: string;
  buttonColor: string;
  borderColor: string;
  buttonText: string;
  buttonTextColor: string;
  cardColor: string;
  linkColor: string; 
  pickerColor: string;
};

export const LightTheme: Theme = {
  backgroundColor: '#ffffff',
  textColor: '#000000',
  buttonColor: '#0275d8',
  borderColor: '#cccccc',
  buttonText: '#ffffff',
  buttonTextColor: '#000000',
  cardColor: '#ffffff',
  linkColor: '#0275d8',
  pickerColor: '#111',
};

export const DarkTheme: Theme = {
  backgroundColor: '#121212',
  textColor: '#ffffff',
  buttonColor: '#0275d8',
  borderColor: '#fff',
  buttonText: '#ffffff',
  buttonTextColor: '#000000',
  cardColor: '#2c2c2c',
  linkColor: '#0275d8',
  pickerColor: '#ffffff',
};


// This context is used to store the currently selected theme and the function to toggle it
export const ThemeContext = React.createContext<{
  theme: Theme;
  toggleTheme: () => void;
}>({
  theme: LightTheme,
  toggleTheme: () => {},
});
