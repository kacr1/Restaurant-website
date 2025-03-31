import React, { useContext, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBell } from 'react-icons/fa';
import { AppContext } from './AppContext';

export const AppNotifications = () => {
  const { notifications } = useContext(AppContext);

  // Deduplicate notifications - only show the latest of each unique item+type
  const uniqueNotifications = useMemo(() => {
    const seen = new Map();
    return notifications
      .slice() // Create a copy to avoid mutating the original array
      .reverse() // Process from newest to oldest
      .filter(notification => {
        const key = `${notification.item?.id}-${notification.type}`;
        if (!seen.has(key)) {
          seen.set(key, true);
          return true;
        }
        return false;
      })
      .reverse(); // Restore original order
  }, [notifications]);

  return (
    <div className="notification-container">
      <AnimatePresence>
        {uniqueNotifications.map((notification, index) => (
          <motion.div
            key={`${notification.id}-${notification.timestamp}`}
            className={`cart-notification ${notification.type}`}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.8 }}
            transition={{ 
              type: 'spring',
              damping: 25,
              stiffness: 300
            }}
            style={{ bottom: `${index * 60 + 20}px` }}
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
  );
};