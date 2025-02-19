import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useMotionValue } from 'framer-motion';

const FloatingElement = styled(motion.div)`
  position: fixed;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 1000;
  opacity: 0.4;
  transition: opacity 0.3s ease;
  pointer-events: auto;
  filter: brightness(0.85) saturate(0.8);
  text-shadow: 0 0 10px rgba(107, 92, 231, 0.3);

  &:hover {
    opacity: 1;
    filter: brightness(1) saturate(1);
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

// Modern tech-themed elements that match dark theme
const elements = [
  { emoji: '💫', description: 'dizzy', rotation: -15 },      // Dynamic/motion
  { emoji: '💠', description: 'diamond', rotation: 10 },     // Premium/quality
  { emoji: '🔮', description: 'crystal', rotation: -8 },     // Mystical/future
  { emoji: '✨', description: 'sparkles', rotation: 12 }     // Magic/special
];

const elementPositions = [
  // Top right area
  { top: '30vh', right: '9vw' },
  // Top left area
  { top: '20vh', left: '5vw' },
  // Bottom right area
  { top: '79vh', right: '3vw' },
  // Bottom left area
  { bottom: '35vh', left: '8vw' }
];

const FloatingElements = () => {
  const [visibleElements, setVisibleElements] = useState([0, 1, 2, 3]);
  const [fallingElements, setFallingElements] = useState(new Set());
  const { scrollY } = useScroll();
  const elementRotations = [
    useMotionValue(0),
    useMotionValue(0),
    useMotionValue(0),
    useMotionValue(0)
  ];

  useEffect(() => {
    const unsubscribe = scrollY.onChange(latest => {
      elementRotations.forEach((rotation, index) => {
        if (visibleElements.includes(index)) {
          rotation.set(Math.sin(latest * 0.02) * 5);
        }
      });
    });
    return () => unsubscribe();
  }, [scrollY, visibleElements]);

  const handleElementClick = (index) => {
    setFallingElements(prev => new Set([...prev, index]));
    
    setTimeout(() => {
      setVisibleElements(prev => prev.filter(i => i !== index));
      setFallingElements(prev => {
        const newSet = new Set(prev);
        newSet.delete(index);
        return newSet;
      });
    }, 2000);
  };

  return (
    <>
      {visibleElements.map(index => (
        <FloatingElement
          key={index}
          style={{
            ...elementPositions[index],
            rotate: elementRotations[index],
            transform: `rotate(${elements[index].rotation}deg)`
          }}
          initial={{ scale: 1 }}
          whileHover={{ 
            scale: 1.2,
            rotate: 360,
            transition: { duration: 0.5 }
          }}
          animate={fallingElements.has(index) ? {
            y: window.innerHeight + 100,
            rotate: [elements[index].rotation, 360 + elements[index].rotation],
            x: Math.sin(Date.now()) * 50
          } : {
            y: 0,
            rotate: elements[index].rotation
          }}
          transition={fallingElements.has(index) ? {
            duration: 2,
            ease: [0.17, 0.67, 0.83, 0.67],
            rotate: { duration: 2, ease: "linear" }
          } : {
            type: "spring",
            stiffness: 200,
            damping: 10
          }}
          onClick={() => handleElementClick(index)}
        >
          {elements[index].emoji}
        </FloatingElement>
      ))}
    </>
  );
};

export default FloatingElements; 