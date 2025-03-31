import React, { useState, useEffect } from 'react';
import { 
  FaHome, FaUtensils, FaInfoCircle, 
  FaCalendarAlt, FaStar, FaEnvelope,
  FaUser, FaMoon, FaSun
} from 'react-icons/fa';
import { GiGalaxy } from 'react-icons/gi';
import { motion, AnimatePresence } from 'framer-motion';
import User from './user.jsx';
import './header.css';

const Header = ({ darkMode, toggleDarkMode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(true);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { icon: <FaHome />, text: 'Home', href: '#', delay: 0.3 },
    { icon: <FaUtensils />, text: 'Menu', href: '#menu', delay: 0.4 },
    { icon: <FaInfoCircle />, text: 'About', href: '#about', delay: 0.5 },
    { icon: <FaCalendarAlt />, text: 'Reservations', href: '#reservations', delay: 0.6 },
    { icon: <FaStar />, text: 'Reviews', href: '#reviews', delay: 0.7 },
    { icon: <FaEnvelope />, text: 'Contact', href: '#contact', delay: 0.8 }
  ];

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(prev => !prev);
    if (hasNotifications) setHasNotifications(false);
  };

  return (
    <>
      <AnimatePresence>
        {isUserDropdownOpen && (
          <motion.div
            className="blur-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsUserDropdownOpen(false)}
          />
        )}
      </AnimatePresence>

      <header className={`site-header ${isScrolled ? 'scrolled' : ''} ${darkMode ? 'dark' : ''}`}>
        {/* Cosmic Background Elements */}
        <div className="cosmic-elements">
          {[...Array(12)].map((_, i) => (
            <div 
              key={i}
              className="cosmic-particle"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                animationDuration: `${Math.random() * 20 + 10}s`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>

        {/* Golden Accent */}
        <div className="golden-accent"></div>

        <nav className="header-container">
          <motion.a 
            href="#" 
            className="logo"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, type: 'spring' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="logo-icon-container"
              animate={{ rotate: isUserDropdownOpen ? 360 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <GiGalaxy className="logo-icon" />
            </motion.div>
            <div className="logo-text-container">
              <span className="logo-text">Cosmic Bites</span>
              <span className="logo-subtext">Intergalactic Cuisine</span>
            </div>
            <div className="logo-glow"></div>
          </motion.a>
          
          <div className="nav-links">
            {navLinks.map((link, index) => (
              <motion.a
                key={`nav-${index}`}
                href={link.href}
                className="nav-link"
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: link.delay,
                  type: 'spring',
                  stiffness: 300,
                  damping: 20
                }}
              >
                <span className="nav-icon">{link.icon}</span>
                <span className="nav-text">{link.text}</span>
                {hoveredItem === index && (
                  <motion.span 
                    className="nav-hover-effect"
                    layoutId="navHover"
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  />
                )}
              </motion.a>
            ))}
            
            <div className="header-actions">
              {/* <motion.button 
                className="action-btn theme-toggle"
                onClick={toggleDarkMode}
                aria-label="Toggle dark mode"
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.95 }}
              >
                {darkMode ? (
                  <FaSun className="sun-icon" />
                ) : (
                  <FaMoon className="moon-icon" />
                )}
              </motion.button> */}
              
              <div className="user-container">
                <motion.button 
                  className={`action-btn user-btn ${isUserDropdownOpen ? 'active' : ''}`}
                  onClick={toggleUserDropdown}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="User menu"
                >
                  <FaUser className="user-icon" />
                  {hasNotifications && (
                    <motion.span 
                      className="notification-badge"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring' }}
                    />
                  )}
                </motion.button>
                
                <AnimatePresence>
                  {isUserDropdownOpen && (
                    <User onClose={() => setIsUserDropdownOpen(false)} darkMode={darkMode} />
                  )}
                </AnimatePresence>

                
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default React.memo(Header);
