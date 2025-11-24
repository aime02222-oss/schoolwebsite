import { useState, useEffect } from 'react';
import { 
  FiUser, 
  FiUsers, 
  FiUserCheck, 
  FiBook, 
  FiFileText,
  FiChevronRight
} from 'react-icons/fi';
import { IconType } from 'react-icons';
import './ContactNav.css';

// Define the shape of each section
interface Section {
  id: 'currentStudent' | 'joinUs' | 'parent' | 'teacher' | 'reportCard';
  label: string;
}

// Define props for ContactNav
interface ContactNavProps {
  scrollToSection: (id: string) => void;
  sections: Section[];
  activeSection: string;
  sectionConfig: Section[];
}

const ContactNav = ({ scrollToSection, sections, activeSection, sectionConfig }: ContactNavProps) => {
  const [isSticky, setIsSticky] = useState(false);

  // Map icons for each section type
  const iconMap: Record<string, IconType> = {
    currentStudent: FiUser,
    joinUs: FiUsers,
    parent: FiUserCheck,
    teacher: FiBook,
    reportCard: FiFileText
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`contact-sidebar-nav ${isSticky ? 'sticky' : ''}`}>
      <nav className="sidebar-nav">
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="logo-icon">
              <FiUsers />
            </div>
            <div className="logo-text">
              <h3>Contact Forms</h3>
              <p>Get in touch with us</p>
            </div>
          </div>
        </div>

        <div className="sidebar-content">
          <ul className="sidebar-menu">
            {sectionConfig.map((section: Section) => {
              const IconComponent = iconMap[section.id] || FiUser;
              return (
                <li key={section.id} className="menu-item">
                  <button
                    className={`menu-button ${activeSection === section.id ? 'active' : ''}`}
                    onClick={() => scrollToSection(section.id)}
                  >
                    <div className="button-content">
                      <div className="icon-wrapper">
                        <IconComponent className="menu-icon" />
                      </div>
                      <span className="menu-label">{section.label}</span>
                      <FiChevronRight className="menu-arrow" />
                    </div>
                    <div className="active-indicator"></div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="sidebar-footer">
          <div className="contact-help">
            <div className="help-icon">💬</div>
            <div className="help-text">
              <p>Need help?</p>
              <span>We're here for you</span>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default ContactNav;
