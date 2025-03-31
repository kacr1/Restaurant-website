import React from 'react';
import { FaRegClock, FaUtensils, FaWineGlassAlt, FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './Specials.css';

const Specials = () => {
  const specials = [
    {
      title: "Midnight Tasting Menu",
      description: "Our signature 5-course gastronomic journey through the chef's latest creations, featuring moonlit market ingredients and paired with artisan cocktails. Each course tells a story of nocturnal flavors.",
      price: "$95",
      duration: "2 hours",
      type: "tasting",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
      featured: true
    },
    {
      title: "Chef's Moonlight Selection",
      description: "Seasonal dishes crafted exclusively for late-night dining, available only after 11pm. Experience the magic of midnight gastronomy with ingredients at their peak lunar freshness.",
      price: "$65",
      duration: "1.5 hours",
      type: "chef",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      title: "Starlight Wine Pairing",
      description: "An exquisite 4-course menu with premium wine selections from our sommelier. Each pairing is designed to elevate both food and wine under the celestial inspiration.",
      price: "$120",
      duration: "2.5 hours",
      type: "wine",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      featured: true
    }
  ];

  const getSpecialIcon = (type) => {
    switch(type) {
      case 'tasting': return <FaUtensils />;
      case 'chef': return <FaRegClock />;
      case 'wine': return <FaWineGlassAlt />;
      default: return <FaUtensils />;
    }
  };

  return (
    <section id="specials" className="specials-section">
      {/* Floating decorations */}
      <div className="floating-decoration"></div>
      <div className="floating-decoration"></div>
      <div className="floating-decoration"></div>
      
      <div className="container">
        <div className="section-header">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Moonlight Specials
          </motion.h2>
          <motion.p 
            className="section-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Exclusive culinary experiences available only during select evenings
          </motion.p>
        </div>
        
        <div className="specials-grid">
          {specials.map((special, index) => (
            <motion.div 
              key={index}
              className="special-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ scale: 1.02 }}
            >
              {special.featured && (
                <div className="featured-badge">
                  <FaStar /> Chef's Recommendation
                </div>
              )}
              <div 
                className="special-image"
                style={{ backgroundImage: `url(${special.image})` }}
              >
                <div className="image-overlay"></div>
              </div>
              <div className="special-content">
                <div className="special-badge">
                  {getSpecialIcon(special.type)}
                </div>
                <h3>{special.title}</h3>
                <p>{special.description}</p>
                <div className="special-meta">
                  <span className="price">{special.price}</span>
                  <span className="duration">
                    <FaRegClock /> {special.duration}
                  </span>
                </div>
                <motion.button 
                  className="btn-gold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Reserve Experience
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Specials;