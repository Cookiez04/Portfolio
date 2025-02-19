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
  gap: 60px;
  padding: 20px 30px;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(107, 92, 231, 0.1);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.4);
    border-color: rgba(107, 92, 231, 0.2);
    transform: translateX(-50%) translateY(-2px);
    box-shadow: 0 8px 32px rgba(107, 92, 231, 0.1);
  }

  @media (max-width: 768px) {
    gap: 30px;
    padding: 12px 20px;
    width: 90%;
    top: 20px;
  }

  @media (max-width: 480px) {
    gap: 15px;
    padding: 10px 15px;
    width: 95%;
    top: 15px;
  }

  @media (max-width: 360px) {
    gap: 10px;
    padding: 8px 12px;
  }
`;

const MorseSection = styled(motion.div)`
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 10px;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 120%;
    height: 130%;
    background: rgba(107, 92, 231, 0.03);
    border-radius: 12px;
    transform: translate(-50%, -50%) scale(0.8);
    opacity: 0;
    transition: all 0.3s ease;
    z-index: -1;
  }

  &:hover::before {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  
  &::after {
    content: attr(data-text);
    position: absolute;
    top: -35px;
    left: 50%;
    transform: translateX(-50%);
    color: ${({ theme }) => theme.text};
    font-size: 14px;
    font-weight: 500;
    white-space: nowrap;
    opacity: 0;
    transition: all 0.3s ease;
    letter-spacing: 1px;
    text-shadow: 0 0 10px rgba(107, 92, 231, 0.3);
  }

  &:hover::after {
    opacity: 1;
    transform: translateX(-50%) translateY(-5px);
  }

  @media (max-width: 768px) {
    gap: 6px;
    padding: 6px;
  }

  @media (max-width: 480px) {
    gap: 4px;
    padding: 4px;
  }

  @media (max-width: 360px) {
    gap: 3px;
    padding: 3px;
  }
`;

const Dot = styled(motion.div)`
  width: 6px;
  height: 6px;
  background: ${({ theme }) => theme.accent};
  border-radius: 50%;
  box-shadow: 0 0 10px ${({ theme }) => theme.accent};
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: ${({ theme }) => theme.accent};
    transform: translate(-50%, -50%);
    opacity: 0.2;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 0.2;
    }
    50% {
      transform: translate(-50%, -50%) scale(2.5);
      opacity: 0;
    }
    100% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 0.2;
    }
  }

  @media (max-width: 768px) {
    width: 4px;
    height: 4px;
  }

  @media (max-width: 480px) {
    width: 3px;
    height: 3px;
  }
`;

const Dash = styled(motion.div)`
  width: 16px;
  height: 6px;
  background: ${({ theme }) => theme.accent};
  border-radius: 3px;
  box-shadow: 0 0 10px ${({ theme }) => theme.accent};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: 0.5s;
  }

  &:hover::before {
    left: 100%;
  }

  @media (max-width: 768px) {
    width: 12px;
    height: 4px;
  }

  @media (max-width: 480px) {
    width: 9px;
    height: 3px;
  }

  @media (max-width: 360px) {
    width: 8px;
    height: 3px;
  }
`;

const sections = [
  { 
    id: 'home',
    label: 'HOME',
    pattern: ['dot', 'dot', 'dot', 'dot']
  },
  {
    id: 'about',
    label: 'ABOUT',
    pattern: ['dot', 'dash', 'dot', 'dot']
  },
  {
    id: 'projects',
    label: 'PROJECTS',
    pattern: ['dot', 'dash', 'dash', 'dot']
  },
  {
    id: 'contact',
    label: 'CONTACT',
    pattern: ['dash', 'dot', 'dash', 'dot']
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
          scale: isActive ? 1.2 : 1,
          filter: isActive ? 'brightness(1.2)' : 'brightness(1)'
        }}
        transition={{
          duration: 0.3,
          delay: index * 0.1,
          type: "spring",
          stiffness: 200,
          damping: 10
        }}
        whileHover={{
          scale: 1.3,
          opacity: 0.8,
          transition: {
            type: "spring",
            stiffness: 400,
            damping: 10
          }
        }}
      />
    );
  };

  return (
    <NavContainer>
      {sections.map((section) => (
        <MorseSection
          key={section.id}
          onClick={() => handleSectionClick(section.id)}
          data-text={section.label}
          whileHover={{ scale: 1.05 }}
        >
          {section.pattern.map((type, index) =>
            renderMorseElement(type, index, activeSection === section.id)
          )}
        </MorseSection>
      ))}
    </NavContainer>
  );
};

export default MorseNav; 