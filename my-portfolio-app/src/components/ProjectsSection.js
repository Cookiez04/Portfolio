import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ArrowUpRight, CaretLeft, CaretRight } from '@phosphor-icons/react';
import kiezzfields1 from './assets/KiezzFields/Screenshot 2025-02-19 213458.png';
import kiezzfields2 from './assets/KiezzFields/Screenshot 2025-02-19 213804.png';
import kiezzfields3 from './assets/KiezzFields/Screenshot 2025-02-19 213925.png';
import kiezztech1 from './assets/KiezzTech/Screenshot 2025-02-19 214022.png';
import kiezztech2 from './assets/KiezzTech/Screenshot 2025-02-19 214137.png';
import kiezztech3 from './assets/KiezzTech/Screenshot 2025-02-19 214217.png';
import valentine1 from './assets/Valentine/Screenshot 2025-02-19 214344.png';
import valentine2 from './assets/Valentine/Screenshot 2025-02-19 214501.png';
import valentine3 from './assets/Valentine/Screenshot 2025-02-19 214545.png';

const ProjectsContainer = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  padding: 4rem 10%;
  position: relative;
`;

const ProjectsHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;

  h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    background: linear-gradient(45deg, ${({ theme }) => theme.accent}, ${({ theme }) => theme.accentSecondary});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    color: ${({ theme }) => theme.textSecondary};
    font-size: 1.1rem;
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const ProjectCard = styled(motion.div)`
  background: rgba(107, 92, 231, 0.05);
  border: 1px solid rgba(107, 92, 231, 0.1);
  border-radius: 15px;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 2rem;
  padding: 2rem;
  transition: all 0.3s ease;
  position: relative;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      800px circle at var(--mouse-x) var(--mouse-y),
      rgba(107, 92, 231, 0.06),
      transparent 40%
    );
    z-index: 0;
    opacity: 0;
    transition: opacity 0.3s;
    pointer-events: none;
  }

  &:hover {
    background: rgba(107, 92, 231, 0.08);
    border-color: rgba(107, 92, 231, 0.2);
    transform: translateY(-5px);

    &::before {
      opacity: 1;
    }
  }
`;

const ProjectImage = styled.div`
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.2);
  aspect-ratio: 16/9;
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      45deg,
      rgba(107, 92, 231, 0.1),
      rgba(107, 92, 231, 0.05)
    );
    z-index: 1;
    pointer-events: none;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .placeholder, .illustration {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: linear-gradient(
      45deg,
      rgba(107, 92, 231, 0.1),
      rgba(107, 92, 231, 0.05)
    );
    color: ${({ theme }) => theme.accent};
    font-size: 1.2rem;
    text-align: center;
    padding: 2rem;
  }
`;

const ProjectInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  position: relative;
  z-index: 2;

  h3 {
    font-size: 1.8rem;
    color: ${({ theme }) => theme.text};
    margin-bottom: 0.5rem;
  }

  p {
    color: ${({ theme }) => theme.textSecondary};
    line-height: 1.6;
    margin-bottom: 1rem;
  }
`;

const TagContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
`;

const Tag = styled.span`
  background: ${({ $type }) => {
    switch ($type) {
      case 'demo':
        return 'rgba(107, 92, 231, 0.1)';
      case 'personal':
        return 'rgba(72, 199, 142, 0.1)';
      case 'work':
        return 'rgba(0, 184, 212, 0.1)';
      case 'client':
        return 'rgba(255, 159, 67, 0.1)';
      case 'html':
        return 'rgba(229, 77, 38, 0.1)';
      case 'css':
        return 'rgba(38, 77, 228, 0.1)';
      case 'javascript':
        return 'rgba(247, 223, 30, 0.1)';
      case 'php':
        return 'rgba(119, 123, 179, 0.1)';
      case 'mysql':
        return 'rgba(0, 117, 143, 0.1)';
      case 'xampp':
        return 'rgba(251, 123, 42, 0.1)';
      case 'interactive':
        return 'rgba(255, 99, 132, 0.1)';
      default:
        return 'rgba(107, 92, 231, 0.1)';
    }
  }};
  color: ${({ $type }) => {
    switch ($type) {
      case 'demo':
        return '#6b5ce7';
      case 'personal':
        return '#48c78e';
      case 'work':
        return '#00B8D4';
      case 'client':
        return '#ff9f43';
      case 'html':
        return '#E44D26';
      case 'css':
        return '#264DE4';
      case 'javascript':
        return '#F7DF1E';
      case 'php':
        return '#777BB3';
      case 'mysql':
        return '#00758F';
      case 'xampp':
        return '#FB7B2A';
      case 'interactive':
        return '#FF6384';
      default:
        return '#6b5ce7';
    }
  }};
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.85rem;
  font-weight: 500;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: auto;
  position: relative;
  z-index: 3;
`;

const ProjectLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.accent};
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  background: rgba(107, 92, 231, 0.1);
  transition: all 0.2s ease;
  position: relative;
  z-index: 3;
  cursor: pointer;

  svg {
    transition: transform 0.2s ease;
  }

  &:hover {
    background: rgba(107, 92, 231, 0.15);
    color: ${({ theme }) => theme.accentSecondary};

    svg {
      transform: translate(2px, -2px);
    }
  }
`;

const ComingSoonCard = styled(ProjectCard)`
  position: relative;
  background: rgba(107, 92, 231, 0.02);
  border-style: dashed;
  cursor: pointer;

  &:hover {
    background: rgba(107, 92, 231, 0.05);
  }
`;

const IllustrationWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    45deg,
    rgba(107, 92, 231, 0.05),
    rgba(251, 123, 42, 0.05)
  );
  padding: 2rem;
  position: relative;
  overflow: hidden;

  svg {
    width: 80%;
    height: auto;
    max-height: 60%;
    margin-bottom: 1rem;
    opacity: 0.9;
    filter: drop-shadow(0 4px 20px rgba(0, 0, 0, 0.1));

    @media (max-width: 768px) {
      width: 60%;
      max-height: 60%;
      margin-bottom: 0;
      transform: scale(1.2) translateY(-2.5rem);
    }
  }

  p {
    color: ${({ theme }) => theme.accent};
    font-size: 1.1rem;
    text-align: center;
    margin: 0.5rem 0;
    font-weight: 500;

    @media (max-width: 768px) {
      display: none;
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle at center,
      rgba(251, 123, 42, 0.03) 0%,
      transparent 50%
    );
    animation: rotate 30s linear infinite;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @media (max-width: 768px) {
    padding: 1rem;
    padding-bottom: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 200px;
  }
`;

const OfferLetterIllustration = () => (
  <IllustrationWrapper>
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="15" y="20" width="70" height="60" rx="4" fill="rgba(251, 123, 42, 0.1)" stroke="#FB7B2A" strokeWidth="2"/>
      <path d="M25 40L75 40" stroke="#FB7B2A" strokeWidth="2" strokeLinecap="round"/>
      <path d="M25 50L65 50" stroke="#FB7B2A" strokeWidth="2" strokeLinecap="round"/>
      <path d="M25 60L55 60" stroke="#FB7B2A" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="75" cy="65" r="15" fill="rgba(107, 92, 231, 0.1)" stroke="#6b5ce7" strokeWidth="2"/>
      <path d="M70 65L73 68L80 62" stroke="#6b5ce7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    <p>Offer Letter Generation</p>
    <p>Built with XAMPP Stack</p>
  </IllustrationWrapper>
);

const FileSystemIllustration = () => (
  <IllustrationWrapper>
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 30H80V75C80 77 78 79 76 79H24C22 79 20 77 20 75V30Z" fill="rgba(251, 123, 42, 0.1)" stroke="#FB7B2A" strokeWidth="2"/>
      <path d="M20 30V25C20 23 22 21 24 21H45L50 30H20Z" fill="rgba(251, 123, 42, 0.1)" stroke="#FB7B2A" strokeWidth="2"/>
      <rect x="30" y="40" width="40" height="8" rx="2" fill="rgba(107, 92, 231, 0.1)" stroke="#6b5ce7" strokeWidth="2"/>
      <rect x="30" y="55" width="40" height="8" rx="2" fill="rgba(107, 92, 231, 0.1)" stroke="#6b5ce7" strokeWidth="2"/>
      <rect x="30" y="70" width="25" height="8" rx="2" fill="rgba(107, 92, 231, 0.1)" stroke="#6b5ce7" strokeWidth="2"/>
    </svg>
    <p>File Management System</p>
    <p>Built with XAMPP Stack</p>
  </IllustrationWrapper>
);

const ImageProgress = styled.div`
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.75rem;
  z-index: 2;
  backdrop-filter: blur(8px);
  padding: 0.5rem 0.75rem;
  border-radius: 20px;
  background: rgba(0, 0, 0, 0.2);
`;

const ProgressDot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ $active }) => 
    $active ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.3)'};
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: scale(1.2);
    background: rgba(255, 255, 255, 0.8);
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.1) 0%,
    transparent 40%,
    transparent 60%,
    rgba(0, 0, 0, 0.2) 100%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1;
  pointer-events: none;

  ${ProjectImage}:hover & {
    opacity: 1;
  }
`;

const ThumbnailGrid = styled.div`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  display: grid;
  grid-template-columns: repeat(3, 36px);
  gap: 0.75rem;
  z-index: 2;
  opacity: 0;
  transform: translateX(20px);
  transition: all 0.3s ease;
  backdrop-filter: blur(8px);
  padding: 0.75rem;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.2);

  ${ProjectImage}:hover & {
    opacity: 1;
    transform: translateX(0);
  }
`;

const Thumbnail = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid ${({ $active }) => 
    $active ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.3)'};
  transition: all 0.3s ease;
  opacity: ${({ $active }) => $active ? 1 : 0.7};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:hover {
    transform: scale(1.1);
    border-color: rgba(255, 255, 255, 0.95);
    opacity: 1;
  }
`;

const ImageNavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%) scale(0.9);
  background: rgba(0, 0, 0, 0.2);
  border: none;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 2;
  backdrop-filter: blur(8px);

  ${ProjectImage}:hover & {
    opacity: 1;
    transform: translateY(-50%) scale(1);
  }

  &:hover {
    background: rgba(107, 92, 231, 0.8);
    transform: translateY(-50%) scale(1.1);
  }

  &.prev {
    left: 1.5rem;
  }

  &.next {
    right: 1.5rem;
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;

const projectsData = [
  {
    title: "Portfolio Website",
    description: "A modern, interactive portfolio website built with React and Styled Components. Features smooth animations, interactive 3D elements, and responsive design. Showcases my projects and skills with a minimalist aesthetic.",
    type: "personal",
    tags: ["react", "javascript", "styled-components"],
    illustration: () => (
      <IllustrationWrapper>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="15" y="15" width="70" height="70" rx="8" fill="rgba(107, 92, 231, 0.1)" stroke="#6b5ce7" strokeWidth="2"/>
          <rect x="25" y="25" width="50" height="20" rx="4" fill="rgba(107, 92, 231, 0.05)" stroke="#6b5ce7" strokeWidth="2"/>
          <rect x="25" y="55" width="20" height="20" rx="4" fill="rgba(107, 92, 231, 0.05)" stroke="#6b5ce7" strokeWidth="2"/>
          <rect x="55" y="55" width="20" height="20" rx="4" fill="rgba(107, 92, 231, 0.05)" stroke="#6b5ce7" strokeWidth="2"/>
          <circle cx="35" cy="35" r="4" fill="#6b5ce7"/>
          <path d="M65 31L65 39" stroke="#6b5ce7" strokeWidth="2" strokeLinecap="round"/>
          <path d="M61 35L69 35" stroke="#6b5ce7" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <p>Portfolio Website</p>
        <p>Built with React</p>
      </IllustrationWrapper>
    ),
    link: "https://kiezz.vercel.app/"
  },
  {
    title: "Valentine's Invitation",
    description: "An interactive valentine's proposal website featuring password protection, animations, and virtual flowers. A personal project combining creativity with web development.",
    type: "personal",
    tags: ["interactive", "javascript"],
    images: [valentine1, valentine2, valentine3],
    link: "https://very-secret-invitations.vercel.app/"
  },
  {
    title: "Offer Letter Generation System",
    description: "A XAMPP-based system for UTeM's School of Graduate Studies that automates the generation of offer letters. Features student information management and documentation capabilities.",
    type: "work",
    tags: ["php", "mysql", "xampp"],
    illustration: OfferLetterIllustration,
    link: null
  },
  {
    title: "File Management System",
    description: "A LAN-based file management system for UTeM's School of Graduate Studies. Features file sharing, categorization, reporting, and user management with admin controls.",
    type: "work",
    tags: ["php", "mysql", "xampp"],
    illustration: FileSystemIllustration,
    link: null
  },
  {
    title: "KiezzFields",
    description: "A modern agriculture magazine website showcasing clean design and smooth interactions. Features latest news, market trends, and agricultural insights in a user-friendly interface.",
    type: "demo",
    tags: ["html", "css", "javascript"],
    images: [kiezzfields1, kiezzfields2, kiezzfields3],
    link: "https://kiezzfields.vercel.app/"
  },
  {
    title: "KiezzTech",
    description: "A tech company landing page demonstrating professional web design capabilities. Showcases services, portfolio, and company information with modern aesthetics.",
    type: "demo",
    tags: ["html", "css", "javascript"],
    images: [kiezztech1, kiezztech2, kiezztech3],
    link: "https://kiezztech.vercel.app/"
  }
];

const ProjectsSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState({});

  const handleMouseMove = (e, card) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const cycleImage = (projectTitle) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [projectTitle]: ((prev[projectTitle] || 0) + 1) % 3
    }));
  };

  const handleImageNav = (e, projectTitle, direction) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => {
      const current = prev[projectTitle] || 0;
      const total = 3; // Since we have 3 images per project
      return {
        ...prev,
        [projectTitle]: (current + direction + total) % total
      };
    });
  };

  return (
    <ProjectsContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <ProjectsHeader>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Featured Projects
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          A collection of projects I've worked on
        </motion.p>
      </ProjectsHeader>

      <ProjectsGrid>
        {projectsData.map((project, index) => (
          <ProjectCard
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
          >
            <ProjectImage 
              onClick={() => project.images && cycleImage(project.title)}
              style={{ cursor: project.images ? 'pointer' : 'default' }}
            >
              {project.images ? (
                <>
                  <img 
                    src={project.images[currentImageIndex[project.title] || 0]} 
                    alt={`${project.title} preview ${currentImageIndex[project.title] || 0 + 1}`}
                  />
                  <ImageOverlay />
                  <ImageProgress>
                    {[0, 1, 2].map((i) => (
                      <ProgressDot
                        key={i}
                        $active={(currentImageIndex[project.title] || 0) === i}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex(prev => ({
                            ...prev,
                            [project.title]: i
                          }));
                        }}
                      />
                    ))}
                  </ImageProgress>
                  <ThumbnailGrid>
                    {project.images.map((img, i) => (
                      <Thumbnail
                        key={i}
                        $active={(currentImageIndex[project.title] || 0) === i}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex(prev => ({
                            ...prev,
                            [project.title]: i
                          }));
                        }}
                      >
                        <img src={img} alt={`${project.title} thumbnail ${i + 1}`} />
                      </Thumbnail>
                    ))}
                  </ThumbnailGrid>
                  <ImageNavButton
                    className="prev"
                    onClick={(e) => handleImageNav(e, project.title, -1)}
                    aria-label="Previous image"
                  >
                    <CaretLeft weight="bold" />
                  </ImageNavButton>
                  <ImageNavButton
                    className="next"
                    onClick={(e) => handleImageNav(e, project.title, 1)}
                    aria-label="Next image"
                  >
                    <CaretRight weight="bold" />
                  </ImageNavButton>
                </>
              ) : project.illustration ? (
                <project.illustration />
              ) : (
                <div className="placeholder">
                  {project.title}
                  <br />
                  Backend Project
                </div>
              )}
            </ProjectImage>
            <ProjectInfo>
              <TagContainer>
                <Tag $type={project.type}>
                  {project.type.charAt(0).toUpperCase() + project.type.slice(1)}
                </Tag>
                {project.tags.map(tag => (
                  <Tag key={tag} $type={tag.toLowerCase()}>
                    {tag.charAt(0).toUpperCase() + tag.slice(1)}
                  </Tag>
                ))}
              </TagContainer>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              {project.link && (
                <ProjectLinks>
                  <ProjectLink href={project.link} target="_blank" rel="noopener noreferrer">
                    Visit Site
                    <ArrowUpRight weight="bold" />
                  </ProjectLink>
                </ProjectLinks>
              )}
            </ProjectInfo>
          </ProjectCard>
        ))}
        
        <ComingSoonCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: projectsData.length * 0.1 }}
        >
          <ProjectInfo style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
            <TagContainer style={{ justifyContent: 'center' }}>
              <Tag $type="client">Client Projects</Tag>
            </TagContainer>
            <h3>Coming Soon...</h3>
            <p>Maybe you could be the first? 😉</p>
          </ProjectInfo>
        </ComingSoonCard>
      </ProjectsGrid>
    </ProjectsContainer>
  );
};

export default ProjectsSection; 