import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import GlobalStyles from './styles/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import { darkTheme } from './styles/theme';
import Background from './components/Background';
import MorseNav from './components/MorseNav';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import FooterComponent from './components/FooterSection';
import CookieEasterEgg from './components/CookieEasterEgg';

// Styled Components
const AppContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

const Section = styled.section`
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10%;
`;

const MainContent = styled(motion.main)`
  width: 100%;
  position: relative;
  z-index: 1;
`;

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const updateMousePosition = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyles />
      <AppContainer onMouseMove={updateMousePosition}>
        <Background mousePosition={mousePosition} />
        <MorseNav />
        <CookieEasterEgg />
        <MainContent
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Section id="home">
            <HeroSection />
          </Section>
          <Section id="about">
            <AboutSection />
          </Section>
          <Section id="projects">
            <ProjectsSection />
          </Section>
          <Section id="contact">
            <ContactSection />
          </Section>
          <FooterComponent />
        </MainContent>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
