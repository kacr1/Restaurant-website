import React, { useState, useEffect, useRef } from 'react';
import { 
  FaTimes, FaMinus, FaPlus, FaTrash, FaArrowRight, FaStar, FaCheck, 
  FaRocket, FaShoppingBag, FaGift, FaRegSmileWink 
} from 'react-icons/fa';
import { 
  GiMoonBats, GiStarsStack, GiGalaxy, GiBlackHoleBolas, 
  GiSpiralArrow, GiOrbital, GiCometSpark, GiRingedPlanet,
  GiMeteorImpact, GiSpaceSuit, GiAstronautHelmet, GiSpaceship
} from 'react-icons/gi';
import { motion, AnimatePresence } from 'framer-motion';
import './cartSidebar.css';

const CosmicCart = ({ 
  isOpen, 
  toggleCart, 
  cartItems = [], 
  updateQuantity, 
  removeFromCart,
  clearCart,
  addToCart,
  cartTotal
}) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutProgress, setCheckoutProgress] = useState(0);
  const [couponCode, setCouponCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [shakeCart, setShakeCart] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showGiftPrompt, setShowGiftPrompt] = useState(false);
  const [giftMessage, setGiftMessage] = useState('');
  const [activeTab, setActiveTab] = useState('cart');
  const sidebarRef = useRef(null);

  // Cosmic-themed recommended items
  const recommendedItems = [
    {
      id: 'rec1-nebula-elixir',
      name: 'Nebula Elixir',
      price: 12.99,
      description: 'Sparkling cosmic beverage with stardust infusion',
      image: <GiCometSpark className="recommended-icon" />,
      category: 'beverages'
    },
    {
      id: 'rec2-galactic-truffles',
      name: 'Galactic Truffles',
      price: 9.99,
      description: 'Dark chocolate with cosmic dust filling',
      image: <GiOrbital className="recommended-icon" />,
      category: 'snacks'
    },
    {
      id: 'rec3-supernova-sorbet',
      name: 'Supernova Sorbet',
      price: 7.99,
      description: 'Explosive fruit flavors with edible glitter',
      image: <GiStarsStack className="recommended-icon" />,
      category: 'desserts'
    },
    {
      id: 'rec4-planetary-popcorn',
      name: 'Planetary Popcorn',
      price: 5.99,
      description: 'Orb-shaped popcorn with cosmic seasoning',
      image: <GiRingedPlanet className="recommended-icon" />,
      category: 'snacks'
    },
    {
      id: 'rec5-meteor-mints',
      name: 'Meteor Mints',
      price: 4.99,
      description: 'Cratered mints with cooling star dust',
      image: <GiMeteorImpact className="recommended-icon" />,
      category: 'candies'
    }
  ];

  // Categories for recommendations
  const categories = [
    { id: 'all', name: 'All Cosmic Goods', icon: <GiGalaxy /> },
    { id: 'snacks', name: 'Space Snacks', icon: <GiOrbital /> },
    { id: 'beverages', name: 'Stellar Drinks', icon: <GiCometSpark /> },
    { id: 'desserts', name: 'Galactic Desserts', icon: <GiStarsStack /> },
    { id: 'candies', name: 'Meteor Candies', icon: <GiMeteorImpact /> }
  ];

  const [activeCategory, setActiveCategory] = useState('all');

  // Filter recommended items by category
  const filteredRecommendations = activeCategory === 'all' 
    ? recommendedItems 
    : recommendedItems.filter(item => item.category === activeCategory);

  // Show recommendations when cart is empty
  useEffect(() => {
    if (cartItems.length === 0 && isOpen) {
      const timer = setTimeout(() => setShowRecommendations(true), 1500);
      return () => clearTimeout(timer);
    } else {
      setShowRecommendations(false);
    }
  }, [cartItems.length, isOpen]);

  // Cart shake animation when items are added
  useEffect(() => {
    const handleItemAdded = () => {
      setShakeCart(true);
      const timer = setTimeout(() => setShakeCart(false), 1000);
      return () => clearTimeout(timer);
    };

    window.addEventListener('itemAddedToCart', handleItemAdded);
    return () => window.removeEventListener('itemAddedToCart', handleItemAdded);
  }, []);

  // Calculate total with optional discount
  const calculateTotal = () => {
    const subtotal = cartItems.reduce((total, item) => 
      total + (item.price * item.quantity), 0);
    return (discountApplied ? subtotal * 0.9 : subtotal).toFixed(2);
  };

  // Handle checkout process with animation
  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    
    setIsCheckingOut(true);
    const interval = setInterval(() => {
      setCheckoutProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsCheckingOut(false);
            setCheckoutProgress(0);
            setShowSuccess(true);
            setTimeout(() => {
              setShowSuccess(false);
              toggleCart();
              clearCart();
            }, 2000);
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    return () => clearInterval(interval);
  };

  // Apply cosmic coupon code
  const applyCoupon = () => {
    if (couponCode.toLowerCase() === 'cosmic20') {
      setDiscountApplied(true);
      window.dispatchEvent(new CustomEvent('itemAddedToCart'));
    }
  };

  // Add recommended item to cart
  const addRecommendedItem = (item) => {
    addToCart({ ...item, quantity: 1 });
    setShowRecommendations(false);
    window.dispatchEvent(new CustomEvent('itemAddedToCart'));
  };

  // Toggle favorite status
  const toggleFavorite = (id) => {
    updateQuantity(id, {
      isFavorite: !cartItems.find(item => item.id === id)?.isFavorite
    });
  };

  // Handle quantity changes with validation
  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(id, newQuantity);
  };

  // Handle gift wrapping option
  const handleGiftOption = () => {
    setShowGiftPrompt(true);
  };

  // Submit gift message
  const submitGiftMessage = () => {
    // In a real app, you would save this with the order
    setShowGiftPrompt(false);
    setGiftMessage('');
    window.dispatchEvent(new CustomEvent('itemAddedToCart'));
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              className="cart-overlay" 
              onClick={toggleCart}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
            
            <motion.div 
              className={`cart-sidebar ${shakeCart ? 'shake' : ''}`}
              ref={sidebarRef}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 120 }}
            >
              <div className="cosmic-background">
                <div className="stars"></div>
                <div className="twinkling"></div>
                <div className="clouds"></div>
                <div className="shooting-stars"></div>
              </div>
              
              <div className="cart-header">
                <div className="cart-title">
                  <GiMoonBats className="title-icon" />
                  <h3>Your Cosmic Order</h3>
                  <div className="item-count-container">
                    <div className="item-count-orb">
                      <span className="item-count-number">{cartItems.length}</span>
                      <div className="item-count-glow"></div>
                      <div className="item-count-particles">
                        {[...Array(Math.min(cartItems.length, 10))].map((_, i) => (
                          <div key={i} className="particle" style={{
                            '--angle': `${(i * 36)}deg`,
                            '--delay': `${i * 0.1}s`
                          }}></div>
                        ))}
                      </div>
                    </div>
                    <span className="item-count-label">
                      {cartItems.length === 1 ? 'cosmic item' : 'cosmic items'}
                    </span>
                  </div>
                </div>
                <motion.button 
                  className="close-cart" 
                  onClick={toggleCart}
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Close cart"
                >
                  <FaTimes />
                </motion.button>
              </div>
              
              <div className="cart-tabs">
                <button 
                  className={`cart-tab ${activeTab === 'cart' ? 'active' : ''}`}
                  onClick={() => setActiveTab('cart')}
                >
                  <FaShoppingBag /> Your Cart
                </button>
                <button 
                  className={`cart-tab ${activeTab === 'recommendations' ? 'active' : ''}`}
                  onClick={() => setActiveTab('recommendations')}
                >
                  <GiStarsStack /> Cosmic Picks
                </button>
              </div>
              
              <div className="cart-scroll-area">
                {activeTab === 'cart' ? (
                  cartItems.length === 0 ? (
                    <div className="empty-cart">
                      <GiGalaxy className="empty-icon" />
                      <h4>Your cart is empty</h4>
                      <p>Explore our cosmic menu to add stellar items</p>
                      <motion.button 
                        className="continue-shopping"
                        onClick={() => setActiveTab('recommendations')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Explore Cosmic Picks
                      </motion.button>
                    </div>
                  ) : (
                    <>
                      <motion.div 
                        className="cart-items-list"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {cartItems.map((item) => (
                          <motion.div 
                            className={`cart-item ${item.isFavorite ? 'favorite' : ''}`}
                            key={`cart-${item.id}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: 50 }}
                            transition={{ duration: 0.3 }}
                            layout
                          >
                            <div className="cart-item-image">
                              <div className="placeholder-image">
                                <GiBlackHoleBolas className="item-icon" />
                              </div>
                              <button 
                                className={`favorite-btn ${item.isFavorite ? 'active' : ''}`}
                                onClick={() => toggleFavorite(item.id)}
                                aria-label={item.isFavorite ? "Remove from favorites" : "Add to favorites"}
                              >
                                <FaStar />
                              </button>
                              {item.isFavorite && (
                                <div className="favorite-glow"></div>
                              )}
                            </div>
                            <div className="cart-item-details">
                              <h4>{item.name}</h4>
                              <p>{item.description || 'Delicious cosmic treat'}</p>
                              <div className="cart-item-price">
                                ${(item.price * item.quantity).toFixed(2)}
                                {item.quantity > 1 && (
                                  <span className="unit-price"> (${item.price.toFixed(2)} each)</span>
                                )}
                              </div>
                              <div className="cart-item-actions">
                                <div className="cart-item-quantity">
                                  <button 
                                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                    aria-label="Decrease quantity"
                                    disabled={item.quantity <= 1}
                                  >
                                    <FaMinus />
                                  </button>
                                  <span>{item.quantity}</span>
                                  <button 
                                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                    aria-label="Increase quantity"
                                  >
                                    <FaPlus />
                                  </button>
                                </div>
                                <motion.button 
                                  className="remove-item"
                                  onClick={() => removeFromCart(item.id)}
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  aria-label="Remove item from cart"
                                >
                                  <FaTrash />
                                </motion.button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                      
                      {cartItems.length > 3 && (
                        <motion.div 
                          className="quick-summary"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                          onClick={() => sidebarRef.current.scrollTo({ top: 0, behavior: 'smooth' })}
                        >
                          <GiSpiralArrow className="spiral-icon" />
                          <span>Scroll up to review items</span>
                        </motion.div>
                      )}
                    </>
                  )
                ) : (
                  <div className="recommendations-container">
                    <div className="category-tabs">
                      {categories.map(category => (
                        <button
                          key={category.id}
                          className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
                          onClick={() => setActiveCategory(category.id)}
                        >
                          <span className="category-icon">{category.icon}</span>
                          <span className="category-name">{category.name}</span>
                        </button>
                      ))}
                    </div>
                    
                    <div className="recommended-items-grid">
                      {filteredRecommendations.map((item) => (
                        <motion.div 
                          className="recommended-item-card"
                          key={`rec-${item.id}`}
                          whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(252, 163, 17, 0.3)' }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => addRecommendedItem(item)}
                        >
                          <div className="recommended-item-image">
                            {item.image}
                          </div>
                          <div className="recommended-item-details">
                            <h6>{item.name}</h6>
                            <p>{item.description}</p>
                            <div className="recommended-item-footer">
                              <div className="recommended-item-price">
                                ${item.price.toFixed(2)}
                              </div>
                              <motion.button 
                                className="add-recommended"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                aria-label={`Add ${item.name} to cart`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  addRecommendedItem(item);
                                }}
                              >
                                <FaPlus />
                              </motion.button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {activeTab === 'cart' && cartItems.length > 0 && (
                <div className="cart-footer">
                  <div className="cart-options">
                    <motion.button 
                      className="gift-option"
                      onClick={handleGiftOption}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FaGift /> Gift Wrap
                    </motion.button>
                    
                    <div className="coupon-section">
                      <input 
                        type="text" 
                        placeholder="Enter cosmic coupon code" 
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && applyCoupon()}
                        aria-label="Coupon code"
                        disabled={discountApplied}
                      />
                      <motion.button 
                        onClick={applyCoupon}
                        disabled={discountApplied}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Apply coupon"
                      >
                        {discountApplied ? (
                          <>
                            <FaCheck /> Applied!
                          </>
                        ) : 'Apply'}
                      </motion.button>
                    </div>
                  </div>
                  
                  <div className="cart-summary">
                    <div className="summary-row">
                      <span>Subtotal:</span>
                      <span>${cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}</span>
                    </div>
                    {discountApplied && (
                      <div className="summary-row discount">
                        <span>Discount (10%):</span>
                        <span>-${(cartItems.reduce((total, item) => total + (item.price * item.quantity), 0) * 0.1).toFixed(2)}</span>
                      </div>
                    )}
                    <div className="summary-row">
                      <span>Shipping:</span>
                      <span className="free-shipping">FREE</span>
                    </div>
                    <div className="summary-row total">
                      <span>Total:</span>
                      <span className="total-amount">${calculateTotal()}</span>
                    </div>
                  </div>
                  
                  {isCheckingOut ? (
                    <div className="checkout-progress">
                      <div className="progress-bar">
                        <motion.div 
                          className="progress-fill"
                          initial={{ width: 0 }}
                          animate={{ width: `${checkoutProgress}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                      <div className="progress-text">
                        <GiSpaceship className="spinning-star" />
                        <span>Warping your order through space...</span>
                        <span className="progress-percent">{checkoutProgress}%</span>
                      </div>
                    </div>
                  ) : (
                    <motion.button 
                      className="checkout-btn"
                      onClick={handleCheckout}
                      whileHover={{ 
                        scale: 1.02,
                        boxShadow: "0 0 20px rgba(252, 163, 17, 0.7)"
                      }}
                      whileTap={{ scale: 0.98 }}
                      aria-label="Proceed to checkout"
                    >
                      <span>Launch Order</span>
                      <FaRocket />
                    </motion.button>
                  )}
                </div>
              )}

              <AnimatePresence>
                {showGiftPrompt && (
                  <motion.div 
                    className="gift-message-modal"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                  >
                    <div className="gift-message-content">
                      <h4><FaGift /> Cosmic Gift Wrapping</h4>
                      <p>Add a special message for the recipient:</p>
                      <textarea
                        value={giftMessage}
                        onChange={(e) => setGiftMessage(e.target.value)}
                        placeholder="Your cosmic message..."
                        rows="3"
                      />
                      <div className="gift-message-actions">
                        <button 
                          className="cancel-gift"
                          onClick={() => setShowGiftPrompt(false)}
                        >
                          Cancel
                        </button>
                        <button 
                          className="submit-gift"
                          onClick={submitGiftMessage}
                        >
                          Add Gift Wrap (+$2.99)
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {showSuccess && (
                  <motion.div 
                    className="checkout-success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <GiAstronautHelmet className="success-icon" />
                    <h4>Order Warped Successfully!</h4>
                    <p>Your cosmic delights are on their way</p>
                    <motion.div
                      className="success-astronaut"
                      animate={{
                        y: [0, -10, 0],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    >
                      <GiSpaceSuit />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default React.memo(CosmicCart);