import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { EnvelopeSimple, GithubLogo, LinkedinLogo, Phone, Copy, Check } from '@phosphor-icons/react';

const ContactContainer = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  padding: 4rem 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

  @media (max-width: 768px) {
    padding: 4rem 1rem;
    min-height: calc(100vh - 60px); /* Account for any potential browser chrome */
  }
`;

const Terminal = styled(motion.div)`
  width: 100%;
  max-width: 800px;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  border: 1px solid rgba(107, 92, 231, 0.1);
  padding: 2rem;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 1.5rem 0.35rem;
    width: 100%;
    max-width: 100%;
    margin: 0;
    border-radius: 10px;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 40px;
    background: rgba(107, 92, 231, 0.1);
    border-radius: 15px 15px 0 0;

    @media (max-width: 768px) {
      border-radius: 10px 10px 0 0;
    }
  }
`;

const TerminalHeader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0 1rem;

  &::before {
    content: '● ● ●';
    color: ${({ theme }) => theme.accent};
    letter-spacing: 5px;
    font-size: 0.8rem;
    opacity: 0.7;
  }
`;

const TerminalBody = styled.div`
  margin-top: 20px;
  font-family: 'Fira Code', monospace;
  padding: 0 0.5rem;

  @media (max-width: 768px) {
    margin-top: 25px;
  }
`;

const TerminalLine = styled(motion.div)`
  display: flex;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.text};
  word-break: break-word;
  flex-wrap: wrap;
  gap: 0.5rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const Prompt = styled.span`
  color: ${({ theme }) => theme.accent};
  margin-right: 0.5rem;
  white-space: nowrap;
`;

const ContactGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 1rem;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0.25rem;
    padding: 0;
  }

  @media (max-width: 380px) {
    gap: 0.2rem;
  }
`;

const ContactOption = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(107, 92, 231, 0.1);
  border-radius: 8px;
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  width: 100%;

  @media (max-width: 768px) {
    padding: 0.4rem;
    gap: 0.25rem;
    min-height: 42px;
  }

  @media (max-width: 380px) {
    padding: 0.3rem;
    gap: 0.2rem;
    min-height: 38px;
  }

  &:hover {
    background: rgba(107, 92, 231, 0.15);
    transform: translateY(-2px);
  }

  svg {
    width: 24px;
    height: 24px;
    color: ${({ theme }) => theme.accent};
    flex-shrink: 0;

    @media (max-width: 768px) {
      width: 16px;
      height: 16px;
    }

    @media (max-width: 380px) {
      width: 14px;
      height: 14px;
    }
  }
`;

const ContactText = styled.div`
  flex: 1;
  min-width: 0;
  overflow: hidden;
  padding-right: 0.15rem;

  h4 {
    font-size: 1rem;
    margin-bottom: 0.25rem;
    white-space: nowrap;
  }

  p {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.textSecondary};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  @media (max-width: 768px) {
    h4 {
      font-size: 0.75rem;
      margin-bottom: 0.05rem;
    }
    p {
      font-size: 0.65rem;
    }
  }

  @media (max-width: 380px) {
    h4 {
      font-size: 0.7rem;
      margin-bottom: 0;
    }
    p {
      font-size: 0.6rem;
    }
  }
`;

const CopyButton = styled(motion.button)`
  background: none;
  border: none;
  padding: 0.5rem;
  color: ${({ theme }) => theme.textSecondary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
  transition: all 0.3s ease;
  flex-shrink: 0;

  &:hover {
    opacity: 1;
    color: ${({ theme }) => theme.accent};
  }

  svg {
    width: 20px;
    height: 20px;

    @media (max-width: 768px) {
      width: 12px;
      height: 12px;
    }

    @media (max-width: 380px) {
      width: 10px;
      height: 10px;
    }
  }

  @media (max-width: 768px) {
    padding: 0.15rem;
  }

  @media (max-width: 380px) {
    padding: 0.1rem;
  }
`;

const Caret = styled(motion.span)`
  display: inline-block;
  width: 8px;
  height: 16px;
  background-color: ${({ theme }) => theme.accent};
  margin-left: 4px;
`;

const ContactSection = () => {
  const [displayedLines, setDisplayedLines] = useState([]);
  const [isTyping, setIsTyping] = useState(true);
  const [copiedStates, setCopiedStates] = useState({});

  const contactInfo = {
    email: 'zuhairyee131104@gmail.com',
    phone: '+60-11 5760 3537',
    github: {
      display: 'github.com/Cookiez04',
      url: 'github.com/Cookiez04'
    },
    linkedin: {
      display: 'linkedin.com/in/cookiez',
      url: 'linkedin.com/in/ahmad-zuhairy-38006b337'
    }
  };

  const lines = [
    { prompt: 'visitor@cookiez:~$', text: 'echo "Hello! 👋"' },
    { prompt: '>', text: "I'm always open to new opportunities and collaborations." },
    { prompt: 'visitor@cookiez:~$', text: './show_contact_info.sh' },
  ];

  useEffect(() => {
    if (displayedLines.length < lines.length && isTyping) {
      const timer = setTimeout(() => {
        setDisplayedLines(prev => [...prev, lines[prev.length]]);
        if (displayedLines.length === lines.length - 1) {
          setIsTyping(false);
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [displayedLines, isTyping]);

  const handleCopy = (key, value) => {
    navigator.clipboard.writeText(value);
    setCopiedStates({ ...copiedStates, [key]: true });
    setTimeout(() => {
      setCopiedStates({ ...copiedStates, [key]: false });
    }, 2000);
  };

  return (
    <ContactContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Terminal
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <TerminalHeader />
        <TerminalBody>
          {displayedLines.map((line, index) => (
            <TerminalLine
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Prompt>{line.prompt}</Prompt>
              <span>{line.text}</span>
            </TerminalLine>
          ))}
          {!isTyping && (
            <ContactGrid
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <ContactOption as="div">
                <EnvelopeSimple weight="bold" />
                <ContactText>
                  <h4>Email</h4>
                  <p>{contactInfo.email}</p>
                </ContactText>
                <CopyButton
                  onClick={() => handleCopy('email', contactInfo.email)}
                  whileTap={{ scale: 0.95 }}
                >
                  <AnimatePresence mode="wait">
                    {copiedStates.email ? (
                      <motion.div
                        key="check"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <Check weight="bold" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="copy"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <Copy weight="bold" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CopyButton>
              </ContactOption>
              <ContactOption as="div">
                <Phone weight="bold" />
                <ContactText>
                  <h4>Phone</h4>
                  <p>{contactInfo.phone}</p>
                </ContactText>
                <CopyButton
                  onClick={() => handleCopy('phone', contactInfo.phone)}
                  whileTap={{ scale: 0.95 }}
                >
                  <AnimatePresence mode="wait">
                    {copiedStates.phone ? (
                      <motion.div
                        key="check"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <Check weight="bold" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="copy"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <Copy weight="bold" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CopyButton>
              </ContactOption>
              <ContactOption href={`https://${contactInfo.github.url}`} target="_blank" rel="noopener noreferrer">
                <GithubLogo weight="bold" />
                <ContactText>
                  <h4>GitHub</h4>
                  <p>{contactInfo.github.display}</p>
                </ContactText>
              </ContactOption>
              <ContactOption href={`https://${contactInfo.linkedin.url}`} target="_blank" rel="noopener noreferrer">
                <LinkedinLogo weight="bold" />
                <ContactText>
                  <h4>LinkedIn</h4>
                  <p>{contactInfo.linkedin.display}</p>
                </ContactText>
              </ContactOption>
            </ContactGrid>
          )}
          {isTyping && (
            <Caret
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          )}
        </TerminalBody>
      </Terminal>
    </ContactContainer>
  );
};

export default ContactSection; 