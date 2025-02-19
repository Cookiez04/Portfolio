import { useEffect, useRef } from 'react';
import styled from 'styled-components';

const Canvas = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  opacity: 0.4;
  pointer-events: none;
`;

const Background = ({ mousePosition }) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  
  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = 1; // Fixed size for minimalism
      this.originalY = y;
      // Super slow vertical movement only
      this.offset = 0;
      this.speed = Math.random() * 0.2 - 0.1; // Tiny speed value
    }

    update() {
      // Simple vertical floating motion
      this.offset += this.speed * 0.05; // Further slow down the movement
      this.y = this.originalY + Math.sin(this.offset) * 20; // Maximum 20px movement
    }

    draw(ctx) {
      ctx.fillStyle = '#6b5ce7'; // Using theme accent color
      ctx.fillRect(this.x, this.y, this.size, this.size);
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = particlesRef.current;

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Create particles in a grid pattern for minimalism
      const particleGap = 50; // Space between particles
      const rows = Math.floor(canvas.height / particleGap);
      const cols = Math.floor(canvas.width / particleGap);
      
      particles = [];
      for(let i = 0; i < rows; i++) {
        for(let j = 0; j < cols; j++) {
          particles.push(new Particle(
            j * particleGap + particleGap/2,
            i * particleGap + particleGap/2
          ));
        }
      }
      
      particlesRef.current = particles;
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(15, 15, 15, 0.9)'; // Nearly solid background
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => {
      init();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <Canvas ref={canvasRef} />;
};

export default Background; 