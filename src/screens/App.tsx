import React from 'react';
import { ThemeProvider } from 'styled-components';
import useRoute from '../routes/useRoute';
import theme from './theme';

const App:React.FC = () => {
  const route = useRoute();
  return (
    <ThemeProvider theme={theme}>
      {route}
    </ThemeProvider>
  );
}

export default App;