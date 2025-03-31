import React, { useState, useEffect } from 'react';
import './Gallery.css';
import { 
  FaSearchPlus, 
  FaHeart, 
  FaRegHeart,
  FaUtensils,
  FaWineGlassAlt,
  FaCookieBite,
  FaGlassCheers,
  FaIceCream,
  FaStar
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Lightbox from 'yet-another-react-lightbox';
import "yet-another-react-lightbox/styles.css";
import useAOS from "../../hooks/useAOS";

const Gallery = () => {
  useAOS(); // Initialize animation on scroll

  const [galleryItems, setGalleryItems] = useState([
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
      alt: "Elegant restaurant interior with warm lighting and comfortable seating",
      title: "Elegant Dining",
      subtitle: "Our main dining area with ambient lighting",
      category: "ambiance",
      liked: false,
      featured: true
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5",
      alt: "Professional chef carefully preparing food in our kitchen",
      title: "Master Chefs",
      subtitle: "Passion and precision in every dish",
      category: "chefs",
      liked: false,
      featured: false
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1544025162-d76694265947",
      alt: "Perfectly cooked steak with seasonal vegetables",
      title: "Signature Dishes",
      subtitle: "Our award-winning 28-day aged ribeye",
      category: "food",
      liked: false,
      featured: true
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
      alt: "Artisan wood-fired pizza with fresh ingredients",
      title: "Wood-fired Pizza",
      subtitle: "Authentic Italian recipe with local twist",
      category: "food",
      liked: false,
      featured: false
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187",
      alt: "Colorful fresh salad with edible flowers",
      title: "Seasonal Salads",
      subtitle: "Farm-to-table ingredients daily",
      category: "food",
      liked: false,
      featured: false
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187",
      alt: "Craft cocktail with unique garnishes at our bar",
      title: "Mixology Magic",
      subtitle: "Signature cocktails by our award-winning mixologist",
      category: "drinks",
      liked: false,
      featured: true
    },
    {
      id: 7,
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
      alt: "Homemade pasta with truffle sauce",
      title: "Artisan Pasta",
      subtitle: "Handmade daily with organic flour",
      category: "food",
      liked: false,
      featured: false
    },
    {
      id: 8,
      image: "https://images.unsplash.com/photo-1559847844-5315695dadae",
      alt: "Decadent chocolate dessert platter",
      title: "Sweet Finales",
      subtitle: "Executive pastry chef's creations",
      category: "desserts",
      liked: false,
      featured: true
    }
  ]);

  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading for demo purposes
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const toggleLike = (id) => {
    setGalleryItems(galleryItems.map(item => 
      item.id === id ? {...item, liked: !item.liked} : item
    ));
  };

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  const filteredItems = activeFilter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'food': return <FaUtensils />;
      case 'drinks': return <FaGlassCheers />;
      case 'desserts': return <FaIceCream />;
      case 'chefs': return <FaCookieBite />;
      default: return <FaWineGlassAlt />;
    }
  };

  const galleryVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.3 }
    },
    hover: {
      y: -10,
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const filterVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  if (isLoading) {
    return (
      <section id="gallery" className="gallery-section">
        <div className="container">
          <div className="section-header">
            <div className="skeleton-title"></div>
            <div className="skeleton-subtitle"></div>
          </div>
          <div className="gallery-grid">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="skeleton-item"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="gallery" className="gallery-section">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <h2 className="section-title">Our Culinary Gallery</h2>
          <p className="section-subtitle">
            A visual journey through our restaurant's ambiance, exquisite dishes, and memorable experiences
          </p>
          
          <motion.div 
            className="gallery-filters"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {['all', 'food', 'drinks', 'desserts', 'ambiance'].map((filter) => (
              <motion.button
                key={filter}
                className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter)}
                variants={filterVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {filter === 'food' && <FaUtensils />}
                {filter === 'drinks' && <FaGlassCheers />}
                {filter === 'desserts' && <FaIceCream />}
                {filter === 'all' ? 'All Photos' : filter.charAt(0).toUpperCase() + filter.slice(1)}
              </motion.button>
            ))}
          </motion.div>
        </div>
        
        <div className="gallery-grid">
          <AnimatePresence>
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  className={`gallery-item ${item.featured ? 'featured' : ''}`}
                  variants={galleryVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  whileHover="hover"
                  layout
                >
                  {item.featured && (
                    <div className="featured-badge">
                      <FaStar /> Featured
                    </div>
                  )}
                  
                  <img 
                    src={item.image} 
                    alt={item.alt} 
                    loading="lazy" 
                    onClick={() => openLightbox(index)}
                  />
                  
                  <div className="gallery-overlay">
                    <div className="action-buttons">
                      <button 
                        className="like-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLike(item.id);
                        }}
                        aria-label={item.liked ? "Remove from favorites" : "Add to favorites"}
                      >
                        {item.liked ? <FaHeart className="liked" /> : <FaRegHeart />}
                      </button>
                      
                      <button 
                        className="zoom-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          openLightbox(index);
                        }}
                        aria-label="Zoom in"
                      >
                        <FaSearchPlus />
                      </button>

                      
                    </div>
                    
                    <div className="gallery-category">
                      {getCategoryIcon(item.category)}
                    </div>
                  </div>
                  
                  <div className="gallery-caption">
                    <h3 className="caption-title">{item.title}</h3>
                    <p className="caption-subtitle">{item.subtitle}</p>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                className="no-results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p>No photos found in this category</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {lightboxOpen && (
        <Lightbox
          mainSrc={filteredItems[currentImageIndex].image}
          nextSrc={filteredItems[(currentImageIndex + 1) % filteredItems.length]?.image}
          prevSrc={filteredItems[(currentImageIndex + filteredItems.length - 1) % filteredItems.length]?.image}
          onCloseRequest={closeLightbox}
          onMovePrevRequest={() => setCurrentImageIndex((currentImageIndex + filteredItems.length - 1) % filteredItems.length)}
          onMoveNextRequest={() => setCurrentImageIndex((currentImageIndex + 1) % filteredItems.length)}
          imageTitle={filteredItems[currentImageIndex].title}
          imageCaption={filteredItems[currentImageIndex].subtitle}
          enableZoom={true}
          imageLoadErrorMessage="Unable to load this image"
          prevLabel="Previous photo"
          nextLabel="Next photo"
          zoomInLabel="Zoom in"
          zoomOutLabel="Zoom out"
          closeLabel="Close lightbox"
        />
      )}
    </section>
  );
};

export default Gallery;