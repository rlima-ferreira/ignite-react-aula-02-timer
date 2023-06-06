import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Router from './Router';
import CycleProvider from './contexts/CycleContext';
import { GlobalStyle } from './styles/globals';
import { defaultTheme } from './styles/themes/default';

export default function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CycleProvider>
          <Router />
          <GlobalStyle />
        </CycleProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
