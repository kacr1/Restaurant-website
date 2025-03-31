import React, { useState } from 'react';
import './Events.css';
import { 
  FaCalendarAlt, 
  FaClock, 
  FaMusic, 
  FaUtensils, 
  FaGlassCheers,
  FaMapMarkerAlt,
  FaUserAlt,
  FaArrowRight,
  FaRegHeart,
  FaHeart
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Events = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Live Jazz Night",
      date: "15 June 2023",
      day: "15",
      month: "June",
      time: "8:00 PM - 11:00 PM",
      description: "Enjoy an evening of smooth jazz with our special menu featuring wine pairings. Featuring the renowned Miles Davis Quartet with special guest vocalist Ella Fitzgerald.",
      type: "music",
      featured: true,
      location: "Main Dining Room",
      capacity: "60 seats",
      price: "$75 per person",
      liked: false
    },
    {
      id: 2,
      title: "Wine Tasting Experience",
      date: "22 June 2023",
      day: "22",
      month: "June",
      time: "6:30 PM - 9:30 PM",
      description: "Sample rare vintages with our sommelier and chef's pairing bites. Includes selections from Napa Valley, Bordeaux, and Tuscany.",
      type: "wine",
      featured: false,
      location: "Wine Cellar",
      capacity: "25 seats",
      price: "$120 per person",
      liked: false
    },
    {
      id: 3,
      title: "Chef's Table Experience",
      date: "29 June 2023",
      day: "29",
      month: "June",
      time: "7:00 PM - 10:00 PM",
      description: "Exclusive 5-course tasting menu with the executive chef. Watch as our culinary team prepares each course right before your eyes.",
      type: "food",
      featured: true,
      location: "Chef's Counter",
      capacity: "8 seats",
      price: "$195 per person",
      liked: false
    }
  ]);

  const [activeFilter, setActiveFilter] = useState('all');
  const [expandedEvent, setExpandedEvent] = useState(null);

  const getEventIcon = (type) => {
    switch(type) {
      case 'music': return <FaMusic className="event-icon" />;
      case 'wine': return <FaGlassCheers className="event-icon" />;
      case 'food': return <FaUtensils className="event-icon" />;
      default: return <FaCalendarAlt className="event-icon" />;
    }
  };

  const toggleLike = (id) => {
    setEvents(events.map(event => 
      event.id === id ? {...event, liked: !event.liked} : event
    ));
  };

  const toggleExpandEvent = (id) => {
    setExpandedEvent(expandedEvent === id ? null : id);
  };

  const filteredEvents = activeFilter === 'all' 
    ? events 
    : events.filter(event => event.type === activeFilter);

  const eventVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    },
    hover: {
      y: -10,
      transition: { duration: 0.2 }
    }
  };

  return (
    <section id="events" className="events-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Upcoming Events</h2>
          <p className="section-subtitle">Experience unforgettable evenings at our restaurant</p>
          
          <div className="event-filters">
            <button 
              className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All Events
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'music' ? 'active' : ''}`}
              onClick={() => setActiveFilter('music')}
            >
              Music Nights
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'wine' ? 'active' : ''}`}
              onClick={() => setActiveFilter('wine')}
            >
              Wine Tastings
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'food' ? 'active' : ''}`}
              onClick={() => setActiveFilter('food')}
            >
              Dining Experiences
            </button>
          </div>
        </div>
        
        <div className="events-grid">
          <AnimatePresence>
            {filteredEvents.map(event => (
              <motion.div
                key={event.id}
                className={`event-card ${event.featured ? 'featured' : ''}`}
                variants={eventVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                layout
              >
                <div className="event-badge">
                  {getEventIcon(event.type)}
                </div>
                
                <button 
                  className="like-btn"
                  onClick={() => toggleLike(event.id)}
                  aria-label={event.liked ? "Remove from favorites" : "Add to favorites"}
                >
                  {event.liked ? <FaHeart className="liked" /> : <FaRegHeart />}
                </button>
                
                <div className="event-date">
                  <span className="date-day">{event.day}</span>
                  <span className="date-month">{event.month}</span>
                </div>
                
                <div className="event-content">
                  <h3>{event.title}</h3>
                  <div className="event-meta">
                    <span><FaClock /> {event.time}</span>
                    <span><FaMapMarkerAlt /> {event.location}</span>
                  </div>
                  
                  <p className="event-description">
                    {expandedEvent === event.id 
                      ? event.description 
                      : `${event.description.substring(0, 100)}...`}
                  </p>
                  
                  {expandedEvent === event.id && (
                    <div className="event-details">
                      <p><FaUserAlt /> Capacity: {event.capacity}</p>
                      <p>Price: {event.price}</p>
                    </div>
                  )}
                  
                  <div className="event-actions">
                    <button 
                      className="btn btn-primary"
                      onClick={() => {/* Reserve functionality */}}
                    >
                      Reserve Now <FaArrowRight />
                    </button>
                    <button 
                      className="read-more"
                      onClick={() => toggleExpandEvent(event.id)}
                    >
                      {expandedEvent === event.id ? 'Show Less' : 'Read More'}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="events-cta">
          <p>Interested in hosting a private event or need more information?</p>
          <motion.button 
            className="btn btn-outline"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Our Events Team
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default Events;