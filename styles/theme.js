import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    common: {
      textWhite: "#ffffff",
      backgroundDark: "#0D1323",
      error: "#ff1744"
    },
    primary: {
      main: '#2237F0',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
    overrides: {
      
    }
  },
});

export default theme;