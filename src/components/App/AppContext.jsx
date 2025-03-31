import React, { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [rawCartItems, setRawCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Memoized cart values
  const cartItems = useMemo(() => [...rawCartItems], [rawCartItems]);
  const cartItemCount = useMemo(() => (
    cartItems.reduce((total, item) => total + item.quantity, 0)
  ), [cartItems]);
  const cartTotal = useMemo(() => (
    cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)
  ), [cartItems]);

  // Effects
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Notification system
  const addNotification = useCallback((item, type) => {
    const id = uuidv4();
    const newNotification = {
      id,
      item,
      type,
      timestamp: Date.now()
    };

    setNotifications(prev => [...prev, newNotification]);
    
    const timer = setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Cart functions
  const addToCart = useCallback((item) => {
    setRawCartItems(prev => {
      const existingItem = prev.find(i => i.id === item.id);
      const updatedItems = existingItem
        ? prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)
        : [...prev, { ...item, quantity: 1 }];
      
      addNotification(item, existingItem ? 'updated' : 'added');
      return updatedItems;
    });
  }, [addNotification]);

  const removeFromCart = useCallback((id) => {
    setRawCartItems(prev => {
      const itemToRemove = prev.find(item => item.id === id);
      if (itemToRemove) addNotification(itemToRemove, 'removed');
      return prev.filter(item => item.id !== id);
    });
  }, [addNotification]);

  const updateQuantity = useCallback((id, quantity) => {
    setRawCartItems(prev => {
      if (quantity < 1) {
        const itemToRemove = prev.find(item => item.id === id);
        if (itemToRemove) addNotification(itemToRemove, 'removed');
        return prev.filter(item => item.id !== id);
      }
      return prev.map(item => item.id === id ? { ...item, quantity } : item);
    });
  }, [addNotification]);

  const clearCart = useCallback(() => {
    if (rawCartItems.length > 0) addNotification(null, 'cleared');
    setRawCartItems([]);
  }, [rawCartItems, addNotification]);

  const toggleCart = useCallback(() => {
    setIsCartOpen(prev => {
      if (!prev) document.body.style.overflow = 'hidden';
      else document.body.style.overflow = '';
      return !prev;
    });
  }, []);

  const toggleDarkMode = useCallback(() => {
    setDarkMode(prev => {
      const newMode = !prev;
      document.documentElement.classList.toggle('dark-mode', newMode);
      localStorage.setItem('darkMode', newMode);
      return newMode;
    });
  }, []);

  // Initialize dark mode
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedMode);
    document.documentElement.classList.toggle('dark-mode', savedMode);
  }, []);

  // Cart change effects
  useEffect(() => {
    if (cartItemCount > 0) {
      window.dispatchEvent(new CustomEvent('cartUpdated'));
    }
  }, [cartItemCount]);

  const value = {
    isLoading,
    isScrolled,
    darkMode,
    cartItems,
    cartItemCount,
    cartTotal,
    isCartOpen,
    notifications,
    setIsLoading,
    toggleDarkMode,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart,
    addNotification
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = React.useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};