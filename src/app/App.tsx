import { Navigate, Route, Routes } from 'react-router-dom'
import styled from 'styled-components'
import { Footer } from '../components/layout/Footer'
import { Navbar } from '../components/layout/Navbar'
import { IntroOverlay } from '../components/motion/IntroOverlay'
import { useLenis } from '../hooks/useLenis'
import { ArticlePage } from '../pages/ArticlePage'
import { HomePage } from '../pages/HomePage'
import { MinimalPage } from '../pages/MinimalPage'

const Shell = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.white};
`

const Main = styled.main`
  overflow: clip;
`

const App = () => {
  useLenis()

  return (
    <Shell>
      <IntroOverlay />
      <Navbar />
      <Main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/articles/:id" element={<ArticlePage />} />
          <Route path="/projects" element={<MinimalPage title="Projects" />} />
          <Route path="/articles" element={<MinimalPage title="Articles" />} />
          <Route path="/career" element={<MinimalPage title="Career" />} />
          <Route path="/media" element={<MinimalPage title="Media" />} />
          <Route path="/about" element={<MinimalPage title="About" />} />
          <Route path="/sustainability" element={<MinimalPage title="Sustainability" />} />
          <Route path="/future" element={<MinimalPage title="Future" />} />
          <Route path="/privacy" element={<MinimalPage title="Privacy Policy" />} />
          <Route path="/terms" element={<MinimalPage title="Terms of Use" />} />
          <Route path="/transparency" element={<MinimalPage title="Transparency Statement" />} />
          <Route path="/cookies" element={<MinimalPage title="Cookie Management" />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Main>
      <Footer />
    </Shell>
  )
}

export default App
