import { useState } from 'react';

export function useEditorTheme() {
  const [theme, setTheme] = useState('vs-dark');
  
  return {
    theme,
    setTheme,
  };
}