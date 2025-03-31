import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from './AppContext';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Loader from '../Loader/Loader';
import CartSidebar from '../cartSidebar/cartSidebar';
import { FaBell } from 'react-icons/fa';
import { GiShoppingCart } from 'react-icons/gi';

const AppLayout = ({ children }) => {
  const {
    isLoading,
    darkMode,
    isCartOpen,
    cartItemCount,
    notifications,
    toggleCart,
    toggleDarkMode,
    isScrolled,
    cartItems,
    cartTotal,
    updateQuantity,
    removeFromCart,
    clearCart,
    addToCart
  } = useApp();

  // State to track if a notification is currently being shown
  const [showingNotification, setShowingNotification] = useState(false);

  // Filter out duplicate notifications
  const uniqueNotifications = notifications.reduce((acc, current) => {
    const x = acc.find(item => 
      item.item?.id === current.item?.id && 
      item.type === current.type
    );
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);

  if (isLoading) return <Loader />;

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <Header 
        cartItemCount={cartItemCount} 
        toggleCart={toggleCart}
        isScrolled={isScrolled}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
      
      <CartSidebar 
        isOpen={isCartOpen} 
        toggleCart={toggleCart}
        cartItems={cartItems}
        cartTotal={cartTotal}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        addToCart={addToCart}
      />
      
      {cartItemCount > 0 && (
        <motion.button
          className="floating-cart-btn"
          onClick={toggleCart}
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Open cart"
        >
          <GiShoppingCart />
          <span className="cart-count">{cartItemCount}</span>
        </motion.button>

        
      )}
      
      <div className="notification-container">
        <AnimatePresence>
          {uniqueNotifications.map((notification, index) => (
            <motion.div
              key={`notification-${notification.id}`}
              className={`cart-notification ${notification.type}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              style={{ bottom: `${index * 60 + 20}px` }}
              onAnimationStart={() => setShowingNotification(true)}
              onAnimationComplete={() => setShowingNotification(false)}
            >
              <FaBell className="notification-icon" />
              <span>
                {notification.type === 'added' && `${notification.item?.name} added to cart`}
                {notification.type === 'updated' && `${notification.item?.name} quantity updated`}
                {notification.type === 'removed' && `${notification.item?.name} removed from cart`}
                {notification.type === 'cleared' && 'Cart cleared successfully'}
              </span>
            </motion.div>



          ))}
        </AnimatePresence>
      </div>
      
      <main>{children}</main>
      <Footer darkMode={darkMode} />
    </div>
  );
};

export default AppLayout;