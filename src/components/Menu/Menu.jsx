import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../App/AppContext';
import MenuItem from './MenuItem';
import './Menu.css';
import { FiSearch, FiX, FiCheck } from 'react-icons/fi';
import { GiMeal, GiWineBottle, GiCakeSlice } from 'react-icons/gi';
import { motion, AnimatePresence } from 'framer-motion';

const Menu = () => {
  const { addToCart } = useApp();
  const [activeTab, setActiveTab] = useState('dinner');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSticky, setIsSticky] = useState(false);
  const [localNotification, setLocalNotification] = useState(null);
  const controlsRef = useRef(null);
  
  // Enhanced menu data with more items and details
  const menuData = {
    dinner: [
      {
        id: 1,
        name: "Midnight Steak",
        price: 38,
        description: "Black Angus ribeye with our signature midnight spice rub, finished with truffle butter and gold leaf.",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947",
        tags: ["Chef's Signature", "Seasonal"],
        dietary: [],
        featured: true,
        prepTime: 20,
        calories: 650,
        rating: 4.8
      },
      {
        id: 2,
        name: "Moonlight Pasta",
        price: 24,
        description: "Handmade fettuccine with wild mushrooms, black truffle cream sauce, and shaved parmesan.",
        image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
        tags: ["Vegetarian", "Popular"],
        dietary: ["vegetarian"],
        prepTime: 15,
        calories: 420,
        rating: 4.6
      },
      {
        id: 3,
        name: "Starlight Salmon",
        price: 28,
        description: "Pan-seared salmon with lemon beurre blanc, asparagus, and herbed quinoa.",
        image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2",
        tags: ["Gluten Free", "Healthy"],
        dietary: ["gluten-free"],
        prepTime: 18,
        calories: 380,
        rating: 4.7
      },
      {
        id: 4,
        name: "Galaxy Burger",
        price: 22,
        description: "Wagyu beef patty with truffle aioli, caramelized onions, and aged cheddar on brioche.",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
        tags: ["Signature"],
        prepTime: 12,
        calories: 720,
        rating: 4.5
      }
    ],
    drinks: [
      {
        id: 5,
        name: "Midnight Martini",
        price: 14,
        description: "Premium gin shaken with blackberry liqueur, fresh lemon juice, and a hint of lavender.",
        image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87",
        tags: ["Signature Cocktail"],
        featured: true,
        prepTime: 5,
        rating: 4.9
      },
      {
        id: 6,
        name: "Lunar Eclipse",
        price: 12,
        description: "Dark rum, blood orange juice, pomegranate syrup, and a dash of bitters.",
        image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b",
        tags: ["Seasonal Special"],
        prepTime: 7,
        rating: 4.7
      },
      {
        id: 7,
        name: "Celestial Sangria",
        price: 10,
        description: "Red wine infused with seasonal fruits, citrus, and a touch of cinnamon.",
        image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187",
        tags: ["Seasonal", "Shareable"],
        prepTime: 10,
        rating: 4.6
      }
    ],
    desserts: [
      {
        id: 8,
        name: "Dark Moon Chocolate Cake",
        price: 12,
        description: "Flourless dark chocolate cake with raspberry coulis and vanilla bean ice cream.",
        image: "https://images.unsplash.com/photo-1559847844-5315695dadae",
        tags: ["Gluten Free", "Chef's Pick"],
        dietary: ["gluten-free"],
        featured: true,
        prepTime: 8,
        calories: 480,
        rating: 4.9
      },
      {
        id: 9,
        name: "Cosmic Crème Brûlée",
        price: 10,
        description: "Classic vanilla bean custard with caramelized sugar crust and edible gold flakes.",
        image: "https://images.unsplash.com/photo-1562440499-64c9a111f713",
        tags: ["Signature"],
        prepTime: 10,
        calories: 420,
        rating: 4.8
      }
    ]
  };

  // Handle adding items to cart with local notification
  const handleAddToCart = (item) => {
    addToCart(item);
    setLocalNotification(item);
    
    setTimeout(() => {
      setLocalNotification(null);
    }, 3000);
  };

  // Handle scroll for sticky header
  useEffect(() => {
    const handleScroll = () => {
      if (controlsRef.current) {
        const { top } = controlsRef.current.getBoundingClientRect();
        setIsSticky(top <= 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter items based on search query
  const filteredItems = menuData[activeTab]?.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  const clearSearch = () => setSearchQuery('');

  // Get icon for each tab
  const getTabIcon = (tab) => {
    switch(tab) {
      case 'dinner': return <GiMeal className="tab-icon" />;
      case 'drinks': return <GiWineBottle className="tab-icon" />;
      case 'desserts': return <GiCakeSlice className="tab-icon" />;
      default: return <GiMeal className="tab-icon" />;
    }
  };

  return (
    <section id="menu" className="menu-section">
      <div className="container">
        <div className="menu-header">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Moonlight Menu
          </motion.h2>
          <motion.p 
            className="section-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Our culinary team crafts each dish with seasonal ingredients and artistic presentation
          </motion.p>
        </div>
        
        <motion.div 
          ref={controlsRef} 
          className={`menu-controls ${isSticky ? 'sticky' : ''}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="menu-tabs">
            {Object.keys(menuData).map(tab => (
              <motion.button 
                key={tab}
                className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab(tab);
                  setSearchQuery('');
                }}
                aria-label={`View ${tab} menu`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {getTabIcon(tab)}
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </motion.button>
            ))}
          </div>
          
          <motion.div 
            className="menu-search"
            whileHover={{ scale: 1.02 }}
          >
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder={`Search ${activeTab} menu...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search menu items"
            />
            {searchQuery && (
              <motion.button 
                className="clear-search-btn" 
                onClick={clearSearch}
                aria-label="Clear search"
                whileHover={{ scale: 1.1 }}
              >
                <FiX />
              </motion.button>
            )}
          </motion.div>
        </motion.div>
        
        <div className="menu-grid">
          {filteredItems?.length > 0 ? (
            <AnimatePresence>
              {filteredItems.map((item, index) => (
                <MenuItem 
                  key={item.id} 
                  item={item} 
                  addToCart={handleAddToCart} 
                  delay={index * 100}
                />
              ))}
            </AnimatePresence>
          ) : (
            <motion.div 
              className="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p>No items found matching "{searchQuery}"</p>
              <motion.button 
                className="clear-search" 
                onClick={clearSearch}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Clear search and show all items"
              >
                Clear search
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Local Notification */}
      <AnimatePresence>
        {localNotification && (
          <motion.div
            className="cart-notification added"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: 'spring', damping: 25 }}
            role="alert"
            aria-live="polite"
          >
            <div className="notification-content">
              <FiCheck className="notification-icon" />
              <span>{localNotification.name} added to cart</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Menu;