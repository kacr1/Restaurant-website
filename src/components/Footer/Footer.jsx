import React, { useState } from 'react';
import './Footer.css';
import { 
  FaInstagram, FaFacebookF, FaTwitter, 
  FaTiktok, FaMapMarkerAlt, FaPhone, 
  FaEnvelope, FaClock, FaUtensils, 
  FaArrowRight, FaRegCalendarAlt
} from 'react-icons/fa';
import { GiCoffeeCup, GiChefToque } from 'react-icons/gi';
import { MdDeliveryDining } from 'react-icons/md';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the email to your backend
    console.log('Subscribed with:', email);
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  const quickLinks = [
    { text: 'Home', href: '#', icon: <FaArrowRight /> },
    { text: 'Menu', href: '#menu', icon: <FaUtensils /> },
    { text: 'About', href: '#about', icon: <GiChefToque /> },
    { text: 'Events', href: '#events', icon: <FaRegCalendarAlt /> },
    { text: 'Gallery', href: '#gallery', icon: <FaInstagram /> },
    { text: 'Contact', href: '#contact', icon: <FaPhone /> },
    { text: 'Delivery', href: '#delivery', icon: <MdDeliveryDining /> }
  ];

  const socialLinks = [
    { platform: 'Instagram', icon: <FaInstagram />, href: '#', className: 'instagram' },
    { platform: 'Facebook', icon: <FaFacebookF />, href: '#', className: 'facebook' },
    { platform: 'Twitter', icon: <FaTwitter />, href: '#', className: 'twitter' },
    { platform: 'TikTok', icon: <FaTiktok />, href: '#', className: 'tiktok' }
  ];

  const contactInfo = [
    { icon: <FaMapMarkerAlt />, text: '123 Moonlight Ave, Night City' },
    { icon: <FaPhone />, text: '(555) 123-4567' },
    { icon: <FaEnvelope />, text: 'hello@midnight.cafe' }
  ];

  const hours = [
    { days: 'Sunday - Thursday', time: '6pm - 2am' },
    { days: 'Friday - Saturday', time: '6pm - 4am' },
    { days: 'Kitchen closes', time: '1 hour before' }
  ];

  const legalLinks = [
    { text: 'Privacy Policy', href: '#' },
    { text: 'Terms of Service', href: '#' },
    { text: 'Accessibility', href: '#' },
    { text: 'Careers', href: '#' }
  ];

  return (
    <footer id="contact" className="site-footer">
      <div className="footer-wave"></div>
      
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <div className="logo-wrapper">
              <GiCoffeeCup className="logo-icon" />
              <span className="logo-text">Midnight</span>
            </div>
            <p className="footer-tagline">
              Where night owls dine. Premium cuisine served until the early hours.
            </p>
            <div className="footer-social">
              <h4 className="social-title">Follow Our Journey</h4>
              <div className="social-links">
                {socialLinks.map((social, index) => (
                  <a 
                    key={index}
                    href={social.href} 
                    aria-label={social.platform}
                    className={`social-link ${social.className}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          <div className="footer-nav">
            <div className="footer-column">
              <h4 className="footer-heading">Quick Links</h4>
              <ul className="footer-menu">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="footer-link">
                      <span className="link-icon">{link.icon}</span>
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="footer-column">
              <h4 className="footer-heading">Contact Us</h4>
              <ul className="footer-contact">
                {contactInfo.map((contact, index) => (
                  <li key={index} className="contact-item">
                    <span className="contact-icon">{contact.icon}</span>
                    <span>{contact.text}</span>
                  </li>
                ))}
              </ul>
              <div className="map-embed">
                <iframe 
                  title="Restaurant Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.21557405404!2d-73.987844924164!3d40.74844097138992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ0JzU0LjQiTiA3M8KwNTknMTQuMiJX!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus" 
                  width="100%" 
                  height="150" 
                  style={{ border: 0, borderRadius: '8px' }} 
                  allowFullScreen="" 
                  loading="lazy"
                ></iframe>
              </div>
            </div>
            
            <div className="footer-column">
              <h4 className="footer-heading">Opening Hours</h4>
              <ul className="hours-list">
                {hours.map((hour, index) => (
                  <li key={index} className="hours-item">
                    <span className="hours-days">{hour.days}</span>
                    <span className="hours-time">{hour.time}</span>
                  </li>
                ))}
              </ul>
              <div className="emergency-contact">
                <h5 className="emergency-title">For Large Parties</h5>
                <p className="emergency-text">
                  <FaPhone className="emergency-icon" />
                  (555) 987-6543
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-newsletter">
          <h4 className="newsletter-title">Stay Updated with Our Specials</h4>
          {subscribed ? (
            <div className="subscription-success">
              Thank you for subscribing! Check your email for our welcome gift.
            </div>
          ) : (
            <form className="newsletter-form" onSubmit={handleSubmit}>
              <input 
                type="email" 
                placeholder="Your email address" 
                className="newsletter-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="newsletter-btn">
                <FaUtensils className="btn-icon" />
                Subscribe
              </button>
            </form>
          )}
          <p className="newsletter-note">
            Join our newsletter for exclusive offers, event invites, and seasonal menu previews.
          </p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container">
          <p className="copyright">
            &copy; {currentYear} Midnight Cafe. All rights reserved.
          </p>
          <div className="legal-links">
            {legalLinks.map((link, index) => (
              <a key={index} href={link.href} className="legal-link">
                {link.text}
              </a>
            ))}
          </div>
        </div>
      </div>
      
      {/* Back to Top Button */}
      <a href="#top" className="back-to-top" aria-label="Back to top">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 20L12 4M12 4L18 10M12 4L6 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </a>
    </footer>
  );
};

export default Footer;