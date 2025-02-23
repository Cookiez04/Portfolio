import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const CubeContainer = styled(motion.div)`
  width: 100%;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1000px;
  position: relative;
  user-select: none;
`;

const Tutorial = styled(motion.div)`
  position: absolute;
  bottom: 30px;
  left: 10%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 100;
  gap: 8px;
`;

const TutorialText = styled.div`
  font-family: 'Caveat', cursive;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.accent};
  display: flex;
  align-items: center;
  gap: 8px;
  text-shadow: 0 0 10px rgba(107, 92, 231, 0.3);
  opacity: 0.9;
  white-space: nowrap;
  
  span {
    font-weight: 600;
  }

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const CurvedArrow = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10 30C15 30 20 20 25 10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      style={{ filter: 'drop-shadow(0 0 8px rgba(107, 92, 231, 0.3))' }}
    />
    <path
      d="M22 10L25 10L25 13"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ filter: 'drop-shadow(0 0 8px rgba(107, 92, 231, 0.3))' }}
    />
  </svg>
);

const TutorialButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.accent};
  cursor: pointer;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.9;
  transition: all 0.2s ease;
  padding: 0;
  pointer-events: auto;
  
  &:hover {
    opacity: 1;
    transform: scale(1.05);
  }

  svg {
    width: ${({ $isHelp }) => $isHelp ? '18px' : '16px'};
    height: ${({ $isHelp }) => $isHelp ? '18px' : '16px'};
  }
`;

const CubeWrapper = styled.div`
  width: 200px;
  height: 200px;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.5s;
  cursor: grab;
  touch-action: none;

  &:active {
    cursor: grabbing;
  }

  @media (max-width: 768px) {
    width: 180px;
    height: 180px;
  }

  @media (max-width: 480px) {
    width: 160px;
    height: 160px;
  }
`;

const Face = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: rgba(107, 92, 231, 0.1);
  border: 1px solid rgba(107, 92, 231, 0.3);
  backdrop-filter: blur(5px);
  font-size: 1.2rem;
  color: white;
  text-align: center;
  padding: 20px;
  backface-visibility: visible;
  transition: all 0.3s ease;
  user-select: none;

  &:hover {
    background: rgba(107, 92, 231, 0.2);
    border-color: rgba(107, 92, 231, 0.5);
  }

  h3 {
    margin-bottom: 10px;
    color: ${({ theme }) => theme.accent};
    font-size: 1.4rem;
    pointer-events: none;
  }

  p {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.textSecondary};
    pointer-events: none;
  }
`;

const FrontFace = styled(Face)`
  transform: translateZ(100px);
`;

const BackFace = styled(Face)`
  transform: rotateY(180deg) translateZ(100px);
`;

const RightFace = styled(Face)`
  transform: rotateY(90deg) translateZ(100px);
`;

const LeftFace = styled(Face)`
  transform: rotateY(-90deg) translateZ(100px);
`;

const TopFace = styled(Face)`
  transform: rotateX(90deg) translateZ(100px);
`;

const BottomFace = styled(Face)`
  transform: rotateX(-90deg) translateZ(100px);
`;

const QuestionIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 9C9 7.34315 10.3431 6 12 6C13.6569 6 15 7.34315 15 9C15 10.6569 13.6569 12 12 12V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 17H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const HelpButton = styled(motion.button)`
  position: absolute;
  bottom: 30px;
  right: 30px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(15, 15, 15, 0.85);
  border: 1px solid rgba(107, 92, 231, 0.3);
  backdrop-filter: blur(10px);
  color: ${({ theme }) => theme.accentPrimary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  padding: 0;

  &:hover {
    background: rgba(15, 15, 15, 0.95);
    transform: scale(1.05);
  }

  svg {
    width: 20px;
    height: 20px;
  }

  @media (max-width: 768px) {
    bottom: 20px;
  }

  @media (max-width: 480px) {
    bottom: -20px;
  }
`;

const TutorialPopup = styled(motion.div)`
  position: absolute;
  bottom: 90px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(15, 15, 15, 0.95);
  padding: 16px 24px;
  border-radius: 16px;
  color: ${({ theme }) => theme.text};
  border: 1px solid rgba(107, 92, 231, 0.3);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 280px;
  max-width: 90%;

  @media (max-width: 768px) {
    bottom: 80px;
  }

  @media (max-width: 480px) {
    bottom: 40px;
  }
`;

const TutorialItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.9rem;

  span {
    color: ${({ theme }) => theme.accent};
    font-weight: 500;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: -12px;
  right: -12px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${({ theme }) => theme.accent};
  border: none;
  color: ${({ theme }) => theme.background};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }

  svg {
    width: 14px;
    height: 14px;
  }
`;

const SkillCube = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
  const [showTutorial, setShowTutorial] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [hasBeenShown, setHasBeenShown] = useState(false);
  const intersectionRef = useRef(null);
  const cubeRef = useRef(null);
  const lastTapRef = useRef(0);

  useEffect(() => {
    // Set up intersection observer to detect when cube is in view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasBeenShown) {
          setShowTutorial(true);
          setHasBeenShown(true);
          // Start the minimize timer only on first appearance
          setTimeout(() => {
            setIsMinimized(true);
          }, 5000);
        }
      },
      { threshold: 0.5 }
    );

    if (intersectionRef.current) {
      observer.observe(intersectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasBeenShown]);

  useEffect(() => {
    if (!isDragging) {
      const interval = setInterval(() => {
        setRotation(prev => ({
          x: prev.x,
          y: prev.y + 0.5
        }));
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isDragging]);

  const handleStart = (clientX, clientY) => {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTapRef.current;
    
    if (tapLength < 300 && tapLength > 0) {
      // Double tap detected
      setRotation({ x: 0, y: 0 });
      setIsDragging(false);
      lastTapRef.current = 0; // Reset last tap
      return;
    }
    
    lastTapRef.current = currentTime;
    setIsDragging(true);
    setLastPosition({
      x: clientX,
      y: clientY
    });
  };

  const handleMove = (clientX, clientY) => {
    if (isDragging) {
      const deltaX = clientX - lastPosition.x;
      const deltaY = clientY - lastPosition.y;
      
      // Calculate the effective rotation direction based on current orientation
      const normalizedX = ((rotation.x % 360) + 360) % 360;
      const isUpsideDown = normalizedX > 90 && normalizedX < 270;
      
      setRotation(prev => ({
        x: prev.x - deltaY * 0.5,
        y: prev.y + (isUpsideDown ? -deltaX : deltaX) * 0.5
      }));

      setLastPosition({
        x: clientX,
        y: clientY
      });
    }
  };

  const handleEnd = () => {
    setIsDragging(false);
  };

  // Mouse event handlers
  const handleMouseDown = (e) => {
    e.preventDefault();
    handleStart(e.clientX, e.clientY);
  };

  const handleMouseMove = (e) => {
    handleMove(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  // Touch event handlers
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    handleStart(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e) => {
    if (isDragging) {
      const touch = e.touches[0];
      handleMove(touch.clientX, touch.clientY);
    }
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  const handleDoubleClick = (e) => {
    e.preventDefault();
    setRotation({ x: 0, y: 0 });
  };

  useEffect(() => {
    if (cubeRef.current) {
      const cube = cubeRef.current;
      
      // Add event listeners
      cube.addEventListener('touchstart', handleTouchStart);
      cube.addEventListener('touchmove', handleTouchMove);
      cube.addEventListener('touchend', handleTouchEnd);
      
      // Add mouse event listeners to document for better drag handling
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        // Clean up event listeners
        cube.removeEventListener('touchstart', handleTouchStart);
        cube.removeEventListener('touchmove', handleTouchMove);
        cube.removeEventListener('touchend', handleTouchEnd);
        
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, rotation]);

  return (
    <CubeContainer
      ref={intersectionRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <AnimatePresence>
        {showTutorial && (
          <Tutorial
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <TutorialText>
              <span>Drag</span> to rotate
              <CurvedArrow />
            </TutorialText>
            <TutorialText>
              <span>Double tap</span> to reset
            </TutorialText>
          </Tutorial>
        )}
      </AnimatePresence>
      
      <CubeWrapper
        ref={cubeRef}
        onMouseDown={handleMouseDown}
        onDoubleClick={handleDoubleClick}
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
        }}
      >
        <FrontFace data-face="front">
          <h3>Frontend</h3>
          <p>React</p>
          <p>CSS • Styled Components</p>
        </FrontFace>
        <BackFace data-face="back">
          <h3>Backend</h3>
          <p>PHP • MySQL</p>
          <p>Python • Automation</p>
        </BackFace>
        <RightFace data-face="right">
          <h3>Tools</h3>
          <p>Git • GitHub</p>
          <p>VS Code • Canva</p>
        </RightFace>
        <LeftFace data-face="left">
          <h3>Design</h3>
          <p>UI/UX Design</p>
          <p>Responsive Design</p>
        </LeftFace>
        <TopFace data-face="top">
          <h3>Skills</h3>
          <p>Problem Solving</p>
          <p>Automation</p>
        </TopFace>
        <BottomFace data-face="bottom">
          <h3>Experience</h3>
          <p>Web Development</p>
          <p>Project Management</p>
        </BottomFace>
      </CubeWrapper>
    </CubeContainer>
  );
};

export default SkillCube; 