import React from 'react';
import { Icon } from '@iconify/react';

interface SocialIconsProps {
  className?: string;
  iconColor?: string;
  hoverColor?: string;
  bgColor?: string;
  hoverBgColor?: string;
  size?: number;
}

const SocialIcons: React.FC<SocialIconsProps> = ({ 
  className = "",
  iconColor = "var(--primary-color)",
  hoverColor = "var(--light-color)",
  bgColor = "transparent",
  hoverBgColor = "var(--primary-color)",
  size = 24
}) => {
  return (
    <div className={`social-links ${className}`}>
      <ul className="list-unstyled d-flex gap-3">
        <li>
          <a href="https://www.facebook.com/profile.php?id=100094691762231" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <Icon 
              icon="ri:facebook-fill" 
              className="social-icon facebook" 
              width={size} 
              height={size}
              style={{ color: iconColor }}
            />
          </a>
        </li>
        {/* <li>
          <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <Icon 
              icon="ri:twitter-fill" 
              className="social-icon twitter" 
              width={size} 
              height={size}
              style={{ color: iconColor }}
            />
          </a>
        </li> */}
        {/* <li>
          <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <Icon 
              icon="ri:instagram-line" 
              className="social-icon instagram" 
              width={size} 
              height={size}
              style={{ color: iconColor }}
            />
          </a>
        </li> */}
        <li>
          <a href="#" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
            <Icon 
              icon="ri:youtube-fill" 
              className="social-icon youtube" 
              width={size} 
              height={size}
              style={{ color: iconColor }}
            />
          </a>
        </li>
        <li>
          <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Icon 
              icon="ri:linkedin-fill" 
              className="social-icon linkedin" 
              width={size} 
              height={size}
              style={{ color: iconColor }}
            />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SocialIcons;