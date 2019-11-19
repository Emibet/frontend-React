import { createGlobalStyle } from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const GlobalStyle = createGlobalStyle`
  body {
    @import url('https://fonts.googleapis.com/css?family=Tomorrow');
    font-family: 'Tomorrow', sans-serif;
  }
`;
