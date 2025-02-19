import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ConstellationContainer = styled(motion.div)`
  width: 100%;
  height: 600px;
  position: relative;
  margin: 2rem 0;
`;

const Node = styled(motion.div)`
  position: absolute;
  width: 12px;
  height: 12px;
  background: radial-gradient(
    circle at center,
    ${({ theme }) => theme.accent} 0%,
    ${({ theme }) => theme.accent}40 40%,
    transparent 60%
  );
  border-radius: 50%;
  cursor: pointer;
  filter: drop-shadow(0 0 12px ${({ theme }) => theme.accent}80);
  z-index: 5;
  opacity: 0.9;
  transition: all 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.accent}40;
    border-radius: 50%;
    opacity: 0.5;
    animation: pulse 2s infinite;
    pointer-events: none;
  }

  &:hover {
    filter: drop-shadow(0 0 16px ${({ theme }) => theme.accent});
    background: radial-gradient(
      circle at center,
      ${({ theme }) => theme.accent} 0%,
      ${({ theme }) => theme.accent}60 30%,
      ${({ theme }) => theme.accent}20 60%,
      transparent 70%
    );
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 0.5;
    }
    50% {
      transform: scale(2.2);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 0.5;
    }
  }
`;

const NodeLabel = styled(motion.div)`
  position: absolute;
  white-space: nowrap;
  padding: 0.5rem 1rem;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 4px;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.text};
  pointer-events: none;
  z-index: 10;
`;

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
`;

// Define your tech stack with positions and connections
const techStack = [
  { 
    id: 'html', 
    label: 'HTML5',
    position: { x: 20, y: 30 },
    connections: ['css', 'js']
  },
  { 
    id: 'css', 
    label: 'CSS3',
    position: { x: 35, y: 20 },
    connections: ['html', 'js']
  },
  { 
    id: 'js', 
    label: 'JavaScript',
    position: { x: 50, y: 35 },
    connections: ['react', 'html', 'css']
  },
  { 
    id: 'react', 
    label: 'React.js',
    position: { x: 65, y: 25 },
    connections: ['js']
  },
  { 
    id: 'python', 
    label: 'Python',
    position: { x: 80, y: 40 },
    connections: ['automation']
  },
  { 
    id: 'automation', 
    label: 'Automation',
    position: { x: 70, y: 60 },
    connections: ['python']
  },
  { 
    id: 'design', 
    label: 'UI/UX Design',
    position: { x: 30, y: 70 },
    connections: ['css', 'html']
  }
];

const TechConstellation = () => {
  const [hoveredNode, setHoveredNode] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    
    // Set canvas size accounting for device pixel ratio
    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Draw connections
    const drawConnections = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const rect = canvas.getBoundingClientRect();

      techStack.forEach(tech => {
        tech.connections.forEach(connectionId => {
          const connectedTech = techStack.find(t => t.id === connectionId);
          if (connectedTech) {
            const startX = (tech.position.x / 100) * rect.width;
            const startY = (tech.position.y / 100) * rect.height;
            const endX = (connectedTech.position.x / 100) * rect.width;
            const endY = (connectedTech.position.y / 100) * rect.height;

            const isActive = hoveredNode === tech.id || hoveredNode === connectionId;
            
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.strokeStyle = isActive 
              ? `rgba(107, 92, 231, 0.5)` 
              : `rgba(107, 92, 231, 0.1)`;
            ctx.lineWidth = isActive ? 2 : 1;
            ctx.stroke();
          }
        });
      });
    };

    // Animation loop
    let animationFrameId;
    const animate = () => {
      drawConnections();
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [hoveredNode]);

  return (
    <ConstellationContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Canvas ref={canvasRef} />
      {techStack.map((tech) => (
        <Node
          key={tech.id}
          style={{
            left: `${tech.position.x}%`,
            top: `${tech.position.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
          onMouseEnter={() => setHoveredNode(tech.id)}
          onMouseLeave={() => setHoveredNode(null)}
          animate={{
            scale: hoveredNode === tech.id ? 1.5 : 1,
            filter: hoveredNode === tech.id 
              ? 'drop-shadow(0 0 12px rgba(107, 92, 231, 0.8))'
              : 'drop-shadow(0 0 8px rgba(107, 92, 231, 0.4))'
          }}
        >
          {hoveredNode === tech.id && (
            <NodeLabel
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                top: '100%',
                left: '50%',
                transform: 'translateX(-50%)'
              }}
            >
              {tech.label}
            </NodeLabel>
          )}
        </Node>
      ))}
    </ConstellationContainer>
  );
};

export default TechConstellation; 