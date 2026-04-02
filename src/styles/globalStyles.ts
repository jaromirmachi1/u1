import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@500;700;800&family=Inter:wght@300;400;500;600&family=Playfair+Display:wght@500;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; }
  html, body, #root { margin: 0; min-height: 100%; }

  body {
    font-family: ${({ theme }) => theme.fonts.sans};
    color: ${({ theme }) => theme.colors.ink};
    background:
      radial-gradient(circle at 12% 16%, rgba(140, 124, 255, 0.18), transparent 34%),
      radial-gradient(circle at 90% 22%, rgba(255, 125, 150, 0.14), transparent 36%),
      radial-gradient(circle at 48% 88%, rgba(90, 242, 201, 0.12), transparent 40%),
      ${({ theme }) => theme.colors.paper};
    line-height: 1.6;
    letter-spacing: 0.01em;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    overflow-x: hidden;
  }

  body::before {
    content: '';
    position: fixed;
    inset: 0;
    pointer-events: none;
    opacity: 0.18;
    background-image: linear-gradient(transparent 97%, rgba(0, 0, 0, 0.08) 98%);
    background-size: 100% 36px;
    z-index: -1;
  }

  img { max-width: 100%; display: block; }
  a { color: inherit; text-decoration: none; }
  h1, h2, h3, h4, p { margin: 0; }
`
