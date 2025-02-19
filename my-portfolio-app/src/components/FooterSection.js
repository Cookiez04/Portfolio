import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Code, Heart, FacebookLogo, InstagramLogo, TiktokLogo } from '@phosphor-icons/react';

const FooterContainer = styled.footer`
  width: 100%;
  padding: 3rem 10%;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(107, 92, 231, 0.1);
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      ${({ theme }) => theme.accent},
      transparent
    );
    opacity: 0.3;
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const FooterSection = styled.div`
  h3 {
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
    color: ${({ theme }) => theme.accent};
    position: relative;
    display: inline-block;

    @media (max-width: 768px) {
      font-size: 1rem;
      margin-bottom: 1rem;
    }

    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 100%;
      height: 2px;
      background: linear-gradient(
        90deg,
        ${({ theme }) => theme.accent},
        transparent
      );
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 0.5rem;
    margin-top: 0.75rem;
  }
`;

const SocialLink = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.textSecondary};
  text-decoration: none;
  transition: all 0.3s ease;
  padding: 0.5rem;
  border-radius: 8px;
  background: rgba(107, 92, 231, 0.1);
  font-size: 0.9rem;

  @media (max-width: 768px) {
    padding: 0.35rem 0.5rem;
    font-size: 0.8rem;
    gap: 0.35rem;
    flex: 1;
    justify-content: center;
    min-width: 100px;
  }

  &:hover {
    color: ${({ theme }) => theme.accent};
    background: rgba(107, 92, 231, 0.15);
    transform: translateY(-2px);
  }

  svg {
    width: 20px;
    height: 20px;

    @media (max-width: 768px) {
      width: 16px;
      height: 16px;
    }
  }
`;

const FooterText = styled.p`
  color: ${({ theme }) => theme.textSecondary};
  line-height: 1.6;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
    margin-bottom: 0.75rem;
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(107, 92, 231, 0.1);
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    margin-top: 2rem;
    padding-top: 1.5rem;
    font-size: 0.8rem;
    gap: 0.35rem;
  }

  svg {
    color: ${({ theme }) => theme.accent};

    @media (max-width: 768px) {
      width: 16px;
      height: 16px;
    }
  }
`;

const FooterComponent = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3>About</h3>
          <FooterText>
            A passionate web developer crafting beautiful and functional digital experiences. 
            Specializing in modern web technologies and creative solutions.
          </FooterText>
        </FooterSection>
        <FooterSection>
          <h3>Social Media</h3>
          <FooterText>
            Follow me on social media to see more of my journey and connect with me!
          </FooterText>
          <SocialLinks>
            <SocialLink 
              href="https://www.facebook.com/profile.php?id=61550680696968"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FacebookLogo weight="bold" />
              Facebook
            </SocialLink>
            <SocialLink 
              href="https://www.instagram.com/cookedkiezz"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <InstagramLogo weight="bold" />
              Instagram
            </SocialLink>
            <SocialLink 
              href="https://www.tiktok.com/@kiezzfeels"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <TiktokLogo weight="bold" />
              TikTok
            </SocialLink>
          </SocialLinks>
        </FooterSection>
      </FooterContent>
      <Copyright>
        <Code weight="bold" />
        <span>with</span>
        <Heart weight="fill" />
        <span>by Kiezz © {currentYear}</span>
      </Copyright>
    </FooterContainer>
  );
};

export default FooterComponent; 