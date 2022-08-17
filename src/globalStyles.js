import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: #171928;
    font-family: Inter;
  }
  h5, h4, h3, h2, h1 {
    margin: 0;
    font-family: Inter;
    font-weight: normal;
  }
`;

export default GlobalStyle