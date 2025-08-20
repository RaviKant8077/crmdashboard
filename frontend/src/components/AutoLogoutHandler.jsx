import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const AutoLogoutHandler = ({ inactivityTimeout = 30 * 60 * 1000, gracePeriod = 5 * 60 * 1000 }) => {
  const { logout } = useAuth();
  
  let inactivityTimer;
  let graceTimer;
  let lastActivityTime = Date.now();
  let isInGracePeriod = false;

  const resetActivityTimer = () => {
    lastActivityTime = Date.now();
    
    if (isInGracePeriod) {
      clearTimeout(graceTimer);
      isInGracePeriod = false;
    }
    
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(handleInactivity, inactivityTimeout);
  };

  const handleInactivity = () => {
    // Start grace period
    isInGracePeriod = true;
    graceTimer = setTimeout(() => {
      // Only logout if still in grace period
      if (isInGracePeriod) {
        logout();
        window.location.href = '/login';
      }
    }, gracePeriod);
  };

  const handleVisibilityChange = () => {
    if (document.hidden) {
      // Tab/window is hidden, start inactivity timer
      resetActivityTimer();
    } else {
      // Tab/window is visible, check if we should reset
      const timeSinceLastActivity = Date.now() - lastActivityTime;
      
      if (timeSinceLastActivity >= inactivityTimeout) {
        // User is back but was inactive, check grace period
        if (!isInGracePeriod) {
          handleInactivity();
        }
      } else {
        // User is back within timeout, reset everything
        resetActivityTimer();
      }
    }
  };

  const handleUserActivity = () => {
    resetActivityTimer();
  };

  useEffect(() => {
    // Set up event listeners
    const events = ['mousedown', 'keydown', 'touchstart', 'scroll'];
    
    events.forEach(event => {
      window.addEventListener(event, handleUserActivity);
    });
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Start initial timer
    resetActivityTimer();

    return () => {
      // Clean up
      events.forEach(event => {
        window.removeEventListener(event, handleUserActivity);
      });
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearTimeout(inactivityTimer);
      clearTimeout(graceTimer);
    };
  }, []);

  return null;
};

export default AutoLogoutHandler;
