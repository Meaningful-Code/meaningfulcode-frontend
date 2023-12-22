import React from 'react';
import { Theme, createTheme } from '@mui/material/styles';

export default function createDefaultTheme(): Theme {
    return createTheme({
    palette: {
      primary: { main: '#35b87b', contrastText: '#fff' },
      secondary: { main: '#4461ad', contrastText: '#fff' },
      neutral: { main: '#808080', contrastText: '#000' },
    },
    typography: {
      h1: { fontSize: '2em' },
      h2: { fontSize: '1.7em' },
      h3: { fontSize: '1.5em' },
    },
  });
}
