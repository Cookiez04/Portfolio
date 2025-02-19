import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    line-height: 1.6;
    overflow-x: hidden;
  }

  /* Custom Scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.backgroundSecondary};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.accentPrimary};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.accentSecondary};
  }

  /* Selection */
  ::selection {
    background: ${({ theme }) => theme.accentPrimary};
    color: ${({ theme }) => theme.background};
  }

  /* Smooth Scrolling */
  html {
    scroll-behavior: smooth;
  }

  /* Links */
  a {
    color: inherit;
    text-decoration: none;
    transition: ${({ theme }) => theme.transition};
  }

  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    line-height: 1.2;
    margin-bottom: ${({ theme }) => theme.spacing.medium};
  }

  p {
    margin-bottom: ${({ theme }) => theme.spacing.medium};
  }
`;

export default GlobalStyles; 