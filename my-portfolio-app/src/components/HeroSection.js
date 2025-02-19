import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const HeroContainer = styled(motion.div)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0 10%;
  position: relative;
  overflow: hidden;
  margin-top: 4vh;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      45deg,
      rgba(107, 92, 231, 0.01) 0%,
      transparent 100%
    );
    z-index: 0;
  }

  @media (max-width: 768px) {
    margin-top: 15vh;
    padding: 0 5%;
    align-items: center;
  }

  @media (max-width: 480px) {
    margin-top: 12vh;
    padding: 0 4%;
  }
`;

const Grid = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: linear-gradient(rgba(107, 92, 231, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(107, 92, 231, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
  opacity: 0.5;
`;

const BrandName = styled(motion.h1)`
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.text};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  z-index: 1;

  span {
    display: inline-block;
    color: ${({ theme }) => theme.accent};
    opacity: 0.9;
  }

  @media (max-width: 768px) {
    font-size: 3rem;
    text-align: center;
    margin-bottom: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
`;

const Terminal = styled(motion.div)`
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 15px;
  width: 600px;
  max-width: 100%;
  border: 1px solid rgba(107, 92, 231, 0.1);
  z-index: 1;

  @media (max-width: 768px) {
    width: 100%;
    padding: 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const TerminalHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  opacity: 0.7;
  font-size: 0.8rem;

  &::before {
    content: '● ● ●';
    letter-spacing: 5px;
    margin-right: 1rem;
    color: ${({ theme }) => theme.accent};
  }

  @media (max-width: 480px) {
    margin-bottom: 0.75rem;
    font-size: 0.7rem;

    &::before {
      letter-spacing: 3px;
      margin-right: 0.5rem;
    }
  }
`;

const TerminalLine = styled(motion.div)`
  font-family: 'Fira Code', monospace;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: flex-start;
  color: ${({ theme }) => theme.text};
  opacity: ${({ $dim }) => ($dim ? 0.7 : 1)};
  font-size: 1rem;

  @media (max-width: 480px) {
    font-size: 0.9rem;
    margin-bottom: 0.4rem;
    flex-wrap: wrap;
  }

  @media (max-width: 360px) {
    font-size: 0.85rem;
  }
`;

const TerminalText = styled.span`
  position: relative;
  display: inline-block;
  word-break: break-word;
`;

const GlitchChar = styled.span`
  position: relative;
  display: inline-block;
  animation: ${({ $isGlitching }) => $isGlitching ? 'glitch 0.2s infinite' : 'none'};

  @keyframes glitch {
    0% {
      transform: translateX(0);
      opacity: 1;
    }
    25% {
      transform: translateX(-1px);
      opacity: 0.8;
      color: ${({ theme }) => theme.accent};
    }
    50% {
      transform: translateX(1px);
      opacity: 0.9;
    }
    75% {
      transform: translateX(-1px);
      opacity: 0.8;
      color: ${({ theme }) => theme.text};
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

const Prompt = styled.span`
  color: ${({ theme }) => theme.accent};
  margin-right: 1rem;
  white-space: nowrap;

  @media (max-width: 480px) {
    margin-right: 0.75rem;
    font-size: 0.9rem;
  }

  @media (max-width: 360px) {
    font-size: 0.85rem;
  }
`;

const Cursor = styled(motion.span)`
  display: inline-block;
  width: 8px;
  height: 1rem;
  background-color: ${({ theme }) => theme.accent};
  margin-left: 2px;
`;

const FinalPrompt = styled(motion.div)`
  font-family: 'Fira Code', monospace;
  display: flex;
  align-items: center;
  margin-top: 1rem;
  opacity: 0;
`;

const Caret = styled(motion.span)`
  display: inline-block;
  width: 8px;
  height: 16px;
  background-color: ${({ theme }) => theme.accent};
  margin-left: 4px;
  animation: blink 1s step-end infinite;

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
`;

const typewriterVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.1 } }
};

const HeroSection = () => {
  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [currentText, setCurrentText] = useState('');
  const [glitchingChars, setGlitchingChars] = useState(new Set());
  const [showFinalCaret, setShowFinalCaret] = useState(false);

  const lines = [
    { prompt: 'K i e z z@web:~$', text: 'echo $NAME' },
    { prompt: '>', text: 'Ahmad Zuhairy' },
    { prompt: 'K i e z z@web:~$', text: 'echo $ROLE' },
    { prompt: '>', text: 'Creative Frontend Developer' },
    { prompt: 'K i e z z@web:~$', text: 'cat about.txt' },
    { prompt: '>', text: 'Making the web less boring,' },
    { prompt: '>', text: 'one pixel at a time.' }
  ];

  // Function to randomly glitch characters
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      const newGlitchingChars = new Set();
      const allChars = displayedLines.reduce((acc, line) => 
        acc + line.text, '');
      
      for(let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * allChars.length);
        newGlitchingChars.add(randomIndex);
      }
      setGlitchingChars(newGlitchingChars);
    }, 2000);

    return () => clearInterval(glitchInterval);
  }, [displayedLines]);

  // Typewriter effect for current line
  useEffect(() => {
    if (currentLine < lines.length && isTyping) {
      if (currentText.length < lines[currentLine].text.length) {
        const timer = setTimeout(() => {
          setCurrentText(lines[currentLine].text.slice(0, currentText.length + 1));
        }, 50);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setDisplayedLines(prev => [...prev, {
            ...lines[currentLine],
            text: currentText
          }]);
          setCurrentLine(prev => prev + 1);
          setCurrentText('');
          
          // If this was the last line, show the final caret
          if (currentLine === lines.length - 1) {
            setIsTyping(false);
            setShowFinalCaret(true);
          }
        }, 500);
        return () => clearTimeout(timer);
      }
    }
  }, [currentLine, currentText, isTyping]);

  const renderText = (text, isCurrentLine = false) => {
    return text.split('').map((char, index) => {
      const globalIndex = displayedLines.reduce((acc, line) => 
        acc + line.text.length, 0) + index;
      const isGlitching = glitchingChars.has(globalIndex);
      
      return (
        <GlitchChar
          key={index}
          $isGlitching={isGlitching}
        >
          {char}
        </GlitchChar>
      );
    });
  };

  return (
    <HeroContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Grid />
      <BrandName>
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          K
        </motion.span>
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          i
        </motion.span>
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          e
        </motion.span>
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          z
        </motion.span>
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          z
        </motion.span>
      </BrandName>
      <Terminal
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <TerminalHeader />
        {displayedLines.map((line, index) => (
          <TerminalLine
            key={index}
            initial="hidden"
            animate="visible"
            variants={typewriterVariants}
            $dim={line.prompt === '>'}
          >
            <Prompt>{line.prompt}</Prompt>
            <TerminalText>
              {renderText(line.text)}
            </TerminalText>
          </TerminalLine>
        ))}
        {isTyping && currentLine < lines.length && (
          <TerminalLine $dim={lines[currentLine].prompt === '>'}>
            <Prompt>{lines[currentLine].prompt}</Prompt>
            <TerminalText>
              {renderText(currentText, true)}
              <Cursor
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            </TerminalText>
          </TerminalLine>
        )}
        {showFinalCaret && (
          <FinalPrompt
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Prompt>K i e z z@web:~$</Prompt>
            <Caret />
          </FinalPrompt>
        )}
      </Terminal>
    </HeroContainer>
  );
};

export default HeroSection; 