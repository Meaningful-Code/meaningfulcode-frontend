import { Theme, createTheme } from '@mui/material/styles';

export default function createDefaultTheme(): Theme {
    return createTheme({
    palette: {
      primary: { main: '#3c9d76', contrastText: '#fff' },
      secondary: { main: '#1f647d', contrastText: '#fff' },
      neutral: { main: '#9b9c98', contrastText: '#000' },
    },
    typography: {
      h1: { fontSize: '2em' },
      h2: { fontSize: '1.7em' },
      h3: { fontSize: '1.5em' },
    },
  });
}
