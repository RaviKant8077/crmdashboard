import CryptoJS from 'crypto-js';

// Feature flags - set these to true to enable encryption features
// In production, these should be controlled via environment variables
const ENABLE_API_ENCRYPTION = true;
const ENABLE_STORAGE_ENCRYPTION = false;

// Encryption key - in production, this should be stored in environment variables
// and rotated regularly. For now, we'll use a placeholder.
const ENCRYPTION_KEY = typeof process !== 'undefined' && process.env ? process.env.REACT_APP_ENCRYPTION_KEY : 'default-insecure-key-for-development';

// List of sensitive fields that should be encrypted when feature is enabled
const SENSITIVE_FIELDS = [
  'password', 'token', 'email', 'phone', 'address', 'ssn', 
  'creditCard', 'bankAccount', 'salary', 'personalInfo'
];

// Encrypt data (only if encryption is enabled)
export const encryptData = (data) => {
  if (!ENABLE_API_ENCRYPTION && !ENABLE_STORAGE_ENCRYPTION) {
    return data; // Return original data if encryption is disabled
  }
  
  try {
    if (typeof data === 'object') {
      data = JSON.stringify(data);
    }
    
    const encrypted = CryptoJS.AES.encrypt(data, ENCRYPTION_KEY).toString();
    return encrypted;
  } catch (error) {
    console.warn('Encryption failed, falling back to plain text:', error);
    return data; // Fallback to original data
  }
};

// Decrypt data (only if encryption is enabled)
export const decryptData = (encryptedData) => {
  if (!ENABLE_API_ENCRYPTION && !ENABLE_STORAGE_ENCRYPTION) {
    return encryptedData; // Return original data if encryption is disabled
  }
  
  try {
    // Check if data appears to be encrypted
    if (!isEncrypted(encryptedData)) {
      return encryptedData; // Not encrypted, return as-is
    }
    
    const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    
    // Try to parse as JSON, if it fails return as string
    try {
      return JSON.parse(decrypted);
    } catch {
      return decrypted;
    }
  } catch (error) {
    console.warn('Decryption failed, falling back to plain text:', error);
    return encryptedData; // Fallback to original data
  }
};

// Encrypt sensitive fields in an object (selective encryption)
export const encryptSensitiveFields = (data, customSensitiveFields = []) => {
  if (!ENABLE_API_ENCRYPTION) return data;
  if (!data || typeof data !== 'object') return data;
  
  const fieldsToEncrypt = [...SENSITIVE_FIELDS, ...customSensitiveFields];
  const encryptedData = { ...data };
  
  fieldsToEncrypt.forEach(field => {
    if (encryptedData[field] !== undefined && encryptedData[field] !== null) {
      encryptedData[field] = encryptData(encryptedData[field]);
    }
  });
  
  return encryptedData;
};

// Decrypt sensitive fields in an object
export const decryptSensitiveFields = (data, customSensitiveFields = []) => {
  if (!ENABLE_API_ENCRYPTION) return data;
  if (!data || typeof data !== 'object') return data;
  
  const fieldsToDecrypt = [...SENSITIVE_FIELDS, ...customSensitiveFields];
  const decryptedData = { ...data };
  
  fieldsToDecrypt.forEach(field => {
    if (decryptedData[field] !== undefined && decryptedData[field] !== null) {
      decryptedData[field] = decryptData(decryptedData[field]);
    }
  });
  
  return decryptedData;
};

// Check if data appears to be encrypted
export const isEncrypted = (data) => {
  if (typeof data !== 'string') return false;
  
  // Simple heuristic: encrypted data typically has specific patterns
  return data.includes('U2FsdGVkX1') || // Common CryptoJS prefix
         data.includes('$') || // Common encryption format
         (data.length > 50 && data.includes('/') && data.includes('+'));
};

// Utility to toggle encryption features (for testing)
export const setEncryptionEnabled = (apiEncryption, storageEncryption) => {
  ENABLE_API_ENCRYPTION = apiEncryption;
  ENABLE_STORAGE_ENCRYPTION = storageEncryption;
  console.log(`API Encryption: ${ENABLE_API_ENCRYPTION}, Storage Encryption: ${ENABLE_STORAGE_ENCRYPTION}`);
};

// Get current encryption status
export const getEncryptionStatus = () => ({
  apiEncryption: ENABLE_API_ENCRYPTION,
  storageEncryption: ENABLE_STORAGE_ENCRYPTION
});
