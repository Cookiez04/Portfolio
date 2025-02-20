import styled from 'styled-components';
import { motion } from 'framer-motion';
import SkillCube from './SkillCube';

const AboutContainer = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 10%;
  position: relative;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const TextContent = styled.div`
  h2 {
    font-size: 2.5rem;
    margin-bottom: 2rem;
    background: linear-gradient(45deg, ${({ theme }) => theme.accent}, ${({ theme }) => theme.accentSecondary});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.6;
    color: ${({ theme }) => theme.textSecondary};
    margin-bottom: 1.5rem;
  }
`;

const ResumeButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(45deg, ${({ theme }) => theme.accent}, ${({ theme }) => theme.accentSecondary});
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  margin-top: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }

  svg {
    font-size: 1.2rem;
  }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 3rem;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const SkillCategory = styled(motion.div)`
  background: rgba(107, 92, 231, 0.05);
  border: 1px solid rgba(107, 92, 231, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(107, 92, 231, 0.1);
    border-color: rgba(107, 92, 231, 0.2);
    transform: translateY(-2px);
  }

  h3 {
    color: ${({ theme }) => theme.accent};
    font-size: 1.2rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    color: ${({ theme }) => theme.textSecondary};
    font-size: 0.95rem;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &:before {
      content: "•";
      color: ${({ theme }) => theme.accent};
      font-size: 1.2rem;
    }
  }
`;

const TimelineContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 4rem 0;
  position: relative;
`;

const TimelineWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const TimelineItem = styled(motion.div)`
  display: grid;
  grid-template-columns: minmax(160px, 200px) 1fr;
  gap: 2rem;
  padding: 0.5rem 0;
  position: relative;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding-left: 2rem;
  }

  &::before {
    content: "";
    position: absolute;
    left: 160px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: rgba(107, 92, 231, 0.1);

    @media (max-width: 768px) {
      left: 0;
    }
  }

  &::after {
    content: "";
    position: absolute;
    left: 156px;
    top: 10px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${({ theme }) => theme.accent};
    opacity: 0.5;
    transition: all 0.3s ease;

    @media (max-width: 768px) {
      left: -4px;
    }
  }

  &:hover::after {
    transform: scale(1.2);
    opacity: 1;
  }
`;

const TimelinePeriod = styled.span`
  color: ${({ theme }) => theme.accent};
  font-family: var(--font-mono, monospace);
  font-size: 0.9rem;
  padding-right: 1rem;
`;

const TimelineContent = styled.div`
  h3 {
    color: ${({ theme }) => theme.text};
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
  }

  .subtitle {
    color: ${({ theme }) => theme.accent};
    font-size: 0.95rem;
    margin-bottom: 0.75rem;
  }

  p {
    color: ${({ theme }) => theme.textSecondary};
    font-size: 0.95rem;
    line-height: 1.5;
  }
`;

const AboutSection = () => {
  const skillCategories = [
    {
      title: "Frontend",
      skills: [
        "React",
        "HTML5 & CSS3",
        "CSS & Styled Components",
        "Responsive Design",
        "JavaScript/ES6+"
      ]
    },
    {
      title: "Backend",
      skills: [
        "PHP & MySQL",
        "Python & Automation",
        "Database Management",
        "Joomla CMS"
      ]
    },
    {
      title: "Tools & Technologies",
      skills: [
        "Git & GitHub",
        "VS Code & Canva",
        "Command Line",
        "npm/yarn"
      ]
    },
    {
      title: "Design",
      skills: [
        "UI/UX Design",
        "Responsive Design",
        "Canva Pro",
        "Design Systems"
      ]
    },
    {
      title: "Core Skills",
      skills: [
        "Problem Solving",
        "Automation",
        "Clean Code",
        "Performance Optimization"
      ]
    },
    {
      title: "Professional Experience",
      skills: [
        "Web Development",
        "Project Management",
        "Social Media Management",
        "XAMPP Development"
      ]
    }
  ];

  const timelineData = [
    {
      period: "2020 - 2022",
      title: "SMK Selandar",
      subtitle: "Computer Science",
      description: "Laid the foundation in computer science fundamentals"
    },
    {
      period: "Nov 2022 - Feb 2024",
      title: "Universiti Teknologi MARA (UiTM)",
      subtitle: "Diploma in Computer Science",
      description: "Deepened knowledge in programming and web development"
    },
    {
      period: "Sep 2023 - Feb 2024",
      title: "Software Development Intern",
      subtitle: "UTeM",
      description: "Developed XAMPP-based applications including Offer Letter Generation and File Management System. Contributed to Joomla website development."
    }
  ];

  return (
    <AboutContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <TimelineContainer>
        <TimelineWrapper>
          {timelineData.map((item, index) => (
            <TimelineItem
              key={item.period}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <TimelinePeriod>{item.period}</TimelinePeriod>
              <TimelineContent>
                <h3>{item.title}</h3>
                <div className="subtitle">{item.subtitle}</div>
                <p>{item.description}</p>
              </TimelineContent>
            </TimelineItem>
          ))}
        </TimelineWrapper>
      </TimelineContainer>
      <ContentWrapper>
        <TextContent>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            About Me
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            I'm a creative web developer with a passion for building engaging digital experiences. 
            My style mostly includes clean, minimalist design with powerful functionality.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            I just wrapped up my internship at UTeM, where I got my hands dirty with XAMPP applications and some cool web projects.
            Outside of coding, I'm a bit of a movie buff, always on the hunt for good music, and enjoy putting my thoughts into words.
            I'm also planning to make a blog soon, so stay tuned!
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <ResumeButton 
              href="/resume/resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download Resume
            </ResumeButton>
          </motion.div>
        </TextContent>
        <SkillCube />
      </ContentWrapper>
      <SkillsGrid>
        {skillCategories.map((category, index) => (
          <SkillCategory
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <h3>{category.title}</h3>
            <ul>
              {category.skills.map(skill => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </SkillCategory>
        ))}
      </SkillsGrid>
    </AboutContainer>
  );
};

export default AboutSection; 