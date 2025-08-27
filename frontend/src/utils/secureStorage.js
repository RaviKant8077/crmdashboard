import { encryptData, decryptData, ENABLE_STORAGE_ENCRYPTION } from './encryption';

// Secure storage wrapper with encryption support
export const secureStorage = {
  // Set item with optional encryption
  setItem: (key, value) => {
    try {
      let dataToStore = value;
      
      if (ENABLE_STORAGE_ENCRYPTION) {
        dataToStore = encryptData(value);
      }
      
      localStorage.setItem(key, dataToStore);
      return true;
    } catch (error) {
      console.error('Secure storage setItem error:', error);
      
      // Fallback to plain localStorage if encryption fails
      try {
        localStorage.setItem(key, value);
        return true;
      } catch (fallbackError) {
        console.error('Fallback storage setItem error:', fallbackError);
        return false;
      }
    }
  },

  // Get item with optional decryption
  getItem: (key) => {
    try {
      const storedValue = localStorage.getItem(key);
      
      if (storedValue === null) {
        return null;
      }
      
      if (ENABLE_STORAGE_ENCRYPTION) {
        return decryptData(storedValue);
      }
      
      // Try to parse JSON for non-encrypted values
      try {
        return JSON.parse(storedValue);
      } catch {
        return storedValue;
      }
    } catch (error) {
      console.error('Secure storage getItem error:', error);
      
      // Fallback to plain localStorage if decryption fails
      try {
        const fallbackValue = localStorage.getItem(key);
        try {
          return JSON.parse(fallbackValue);
        } catch {
          return fallbackValue;
        }
      } catch (fallbackError) {
        console.error('Fallback storage getItem error:', fallbackError);
        return null;
      }
    }
  },

  // Remove item
  removeItem: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Secure storage removeItem error:', error);
      return false;
    }
  },

  // Clear all items
  clear: () => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Secure storage clear error:', error);
      return false;
    }
  },

  // Get item length
  length: () => {
    try {
      return localStorage.length;
    } catch (error) {
      console.error('Secure storage length error:', error);
      return 0;
    }
  },

  // Get key by index
  key: (index) => {
    try {
      return localStorage.key(index);
    } catch (error) {
      console.error('Secure storage key error:', error);
      return null;
    }
  }
};

// Session storage wrapper (similar to secureStorage but for sessionStorage)
export const secureSessionStorage = {
  setItem: (key, value) => {
    try {
      let dataToStore = value;
      
      if (ENABLE_STORAGE_ENCRYPTION) {
        dataToStore = encryptData(value);
      }
      
      sessionStorage.setItem(key, dataToStore);
      return true;
    } catch (error) {
      console.error('Secure sessionStorage setItem error:', error);
      return false;
    }
  },

  getItem: (key) => {
    try {
      const storedValue = sessionStorage.getItem(key);
      
      if (storedValue === null) {
        return null;
      }
      
      if (ENABLE_STORAGE_ENCRYPTION) {
        return decryptData(storedValue);
      }
      
      try {
        return JSON.parse(storedValue);
      } catch {
        return storedValue;
      }
    } catch (error) {
      console.error('Secure sessionStorage getItem error:', error);
      return null;
    }
  },

  removeItem: (key) => {
    try {
      sessionStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Secure sessionStorage removeItem error:', error);
      return false;
    }
  },

  clear: () => {
    try {
      sessionStorage.clear();
      return true;
    } catch (error) {
      console.error('Secure sessionStorage clear error:', error);
      return false;
    }
  }
};

// Utility to migrate from localStorage to secureStorage
export const migrateToSecureStorage = () => {
  if (!ENABLE_STORAGE_ENCRYPTION) {
    console.log('Storage encryption is disabled, migration not needed');
    return;
  }

  try {
    const keys = Object.keys(localStorage);
    let migratedCount = 0;

    keys.forEach(key => {
      const value = localStorage.getItem(key);
      
      // Check if value is already encrypted
      if (value && typeof value === 'string' && 
          (value.includes('U2FsdGVkX1') || value.includes('$'))) {
        // Already encrypted, skip
        return;
      }

      // Encrypt and store back
      const encryptedValue = encryptData(value);
      localStorage.setItem(key, encryptedValue);
      migratedCount++;
    });

    console.log(`Migrated ${migratedCount} items to secure storage`);
  } catch (error) {
    console.error('Migration to secure storage failed:', error);
  }
};

// Check if storage is available
export const isStorageAvailable = (type = 'localStorage') => {
  try {
    const storage = window[type];
    const test = '__storage_test__';
    storage.setItem(test, test);
    storage.removeItem(test);
    return true;
  } catch (error) {
    return false;
  }
};
