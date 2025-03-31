// src/hooks/useAOS.js
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

/**
 * Custom hook for initializing and managing AOS (Animate On Scroll)
 * @param {Object} options - Configuration options for AOS
 * @param {number} [options.duration=800] - Animation duration in milliseconds
 * @param {string} [options.easing='ease-in-out-cubic'] - Animation easing function
 * @param {boolean} [options.once=true] - Whether animation should run only once
 * @param {number} [options.offset=100] - Offset (in px) from the original trigger point
 * @param {number} [options.delay=0] - Delay animation (in ms)
 * @param {string} [options.anchorPlacement='top-bottom'] - Anchor placement for trigger point
 * @param {boolean} [options.disable=false] - Disable AOS initialization
 * @param {boolean} [options.startEvent='DOMContentLoaded'] - Event to initialize AOS
 */
const useAOS = (options = {}) => {
  useEffect(() => {
    // Skip initialization if disabled
    if (options.disable) return;

    // Default configuration merged with custom options
    const config = {
      duration: 800,
      easing: 'ease-in-out-cubic',
      once: true,
      offset: 100,
      delay: 0,
      anchorPlacement: 'top-bottom',
      mirror: false,
      startEvent: 'DOMContentLoaded',
      ...options
    };

    // Initialize AOS
    AOS.init(config);

    // Refresh AOS on certain events
    const handleRefresh = () => {
      if (AOS) {
        AOS.refresh();
      }
    };

    // Events that might require AOS refresh
    const refreshEvents = [
      'load',
      'resize',
      'orientationchange',
      'animationend',
      'transitionend'
    ];

    // Add event listeners
    refreshEvents.forEach(event => {
      window.addEventListener(event, handleRefresh);
    });

    // Cleanup function
    return () => {
      // Remove event listeners
      refreshEvents.forEach(event => {
        window.removeEventListener(event, handleRefresh);
      });

      // Reset AOS completely
      if (AOS) {
        AOS.refreshHard();
      }
    };
  }, [options]); // Re-run effect if options change

  // Function to manually refresh AOS
  const refreshAOS = () => {
    if (AOS) {
      AOS.refresh();
    }
  };

  // Return refresh function if needed
  return { refreshAOS };
};

export default useAOS;