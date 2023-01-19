import { CSSReset } from '@chakra-ui/react';
import { Global, css } from '@emotion/react';

import { AuthProvider } from '@/lib/auth';
import customTheme from '@/styles/theme';
import { ChakraBaseProvider } from '@chakra-ui/react';

const GlobalStyle = ({ children }) => {
  return (
    <>
      <CSSReset />
      <Global
        styles={css`
          html {
            min-width: 360px;
            scroll-behavior: smooth;
          }

          #__next {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }
        `}
      />
      {children}
    </>
  );
};

const App = ({ Component, pageProps }) => {
  return (
    <ChakraBaseProvider theme={customTheme}>
      <AuthProvider>
        <GlobalStyle />
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraBaseProvider>
  );
};

export default App;