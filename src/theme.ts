import { createTheme } from '@mui/material/styles'

// Create a theme instance without function properties
const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0a0a0a',
      paper: '#171717',
    },
    text: {
      primary: '#ededed',
    },
  },
  typography: {
    fontFamily: 'var(--font-geist-sans), Arial, sans-serif',
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          color: '#000000',
        },
      },
    },
  },
})

export default theme 
