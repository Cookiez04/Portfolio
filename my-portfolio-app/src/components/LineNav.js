import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useScroll } from 'framer-motion';

const NavContainer = styled(motion.nav)`
  position: fixed;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  display: flex;
  gap: 40px;
  padding: 20px;
`;

const MorseSection = styled(motion.div)`
  position: relative;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  
  &::after {
    content: attr(data-text);
    position: absolute;
    top: -25px;
    left: 50%;
    transform: translateX(-50%);
    color: ${({ theme }) => theme.text};
    font-size: 14px;
    white-space: nowrap;
    opacity: 0;
    transition: opacity 0.3s ease;
    letter-spacing: 1px;
  }

  &:hover::after {
    opacity: 1;
  }
`;

const Dot = styled(motion.div)`
  width: 4px;
  height: 4px;
  background: ${({ theme }) => theme.accent};
  border-radius: 50%;
`;

const Dash = styled(motion.div)`
  width: 12px;
  height: 4px;
  background: ${({ theme }) => theme.accent};
  border-radius: 2px;
`;

const sections = [
  { 
    id: 'home',
    label: 'HOME',
    pattern: ['dot', 'dot', 'dot', 'dot'] // H in morse is ....
  },
  {
    id: 'about',
    label: 'ABOUT',
    pattern: ['dot', 'dash', 'dot', 'dot'] // A in morse is .-..
  },
  {
    id: 'projects',
    label: 'PROJECTS',
    pattern: ['dot', 'dash', 'dash', 'dot'] // P in morse is .--.
  },
  {
    id: 'contact',
    label: 'CONTACT',
    pattern: ['dash', 'dot', 'dash', 'dot'] // C in morse is -.-.
  }
];

const MorseNav = () => {
  const [activeSection, setActiveSection] = useState('home');
  const { scrollYProgress } = useScroll();

  const handleSectionClick = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      sections.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            setActiveSection(id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderMorseElement = (type, index, isActive) => {
    const Element = type === 'dot' ? Dot : Dash;
    return (
      <Element
        key={index}
        initial={{ opacity: 0.3 }}
        animate={{ 
          opacity: isActive ? 1 : 0.3,
          scale: isActive ? 1.2 : 1
        }}
        transition={{
          duration: 0.2,
          delay: index * 0.1
        }}
      />
    );
  };

  return (
    <NavContainer>
      {sections.map(({ id, label, pattern }) => (
        <MorseSection
          key={id}
          data-text={label}
          onClick={() => handleSectionClick(id)}
          whileHover={{ y: -2 }}
        >
          {pattern.map((type, index) => 
            renderMorseElement(type, index, activeSection === id)
          )}
        </MorseSection>
      ))}
    </NavContainer>
  );
};

export default MorseNav; 