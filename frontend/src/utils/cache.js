import { encryptData, decryptData, getEncryptionStatus } from './encryption';

// Simple in-memory cache with expiration and encryption support
class CacheManager {
  constructor() {
    this.cache = new Map();
    this.defaultTTL = 5 * 60 * 1000; // 5 minutes default TTL
  }

  // Set cache item with optional encryption and TTL
  set(key, value, ttl = this.defaultTTL) {
    try {
      let dataToStore = value;
      
      const { storageEncryption } = getEncryptionStatus();
      
      if (storageEncryption) {
        dataToStore = encryptData(value);
      }
      
      const cacheItem = {
        data: dataToStore,
        expiresAt: Date.now() + ttl,
        encrypted: storageEncryption
      };
      
      this.cache.set(key, cacheItem);
      return true;
    } catch (error) {
      console.error('Cache set error:', error);
      return false;
    }
  }

  // Get cache item with decryption if needed
  get(key) {
    try {
      const cacheItem = this.cache.get(key);
      
      if (!cacheItem) {
        return null;
      }
      
      // Check if expired
      if (Date.now() > cacheItem.expiresAt) {
        this.cache.delete(key);
        return null;
      }
      
      let data = cacheItem.data;
      
      if (cacheItem.encrypted) {
        data = decryptData(data);
      }
      
      return data;
    } catch (error) {
      console.error('Cache get error:', error);
      this.cache.delete(key); // Remove corrupted cache entry
      return null;
    }
  }

  // Remove cache item
  delete(key) {
    return this.cache.delete(key);
  }

  // Clear all cache
  clear() {
    this.cache.clear();
  }

  // Check if key exists and is not expired
  has(key) {
    const item = this.get(key);
    return item !== null;
  }

  // Get all cache keys
  keys() {
    return Array.from(this.cache.keys());
  }

  // Get cache size
  size() {
    return this.cache.size;
  }

  // Clean up expired items
  cleanup() {
    const now = Date.now();
    let removedCount = 0;
    
    for (const [key, item] of this.cache.entries()) {
      if (now > item.expiresAt) {
        this.cache.delete(key);
        removedCount++;
      }
    }
    
    if (removedCount > 0) {
      console.log(`Cache cleanup: removed ${removedCount} expired items`);
    }
    
    return removedCount;
  }

  // Set default TTL
  setDefaultTTL(ttl) {
    this.defaultTTL = ttl;
  }
}

// Global cache instance
export const cache = new CacheManager();

// API response cache with request deduplication
export const apiCache = {
  pendingRequests: new Map(),
  
  // Cache API response with deduplication
  async getCachedResponse(key, apiCall, ttl = 300000) { // 5 minutes default
    // Check if request is already pending
    if (this.pendingRequests.has(key)) {
      return this.pendingRequests.get(key);
    }
    
    // Check cache first
    const cached = cache.get(key);
    if (cached !== null) {
      return cached;
    }
    
    // Make API call and cache result
    try {
      const promise = apiCall();
      this.pendingRequests.set(key, promise);
      
      const result = await promise;
      cache.set(key, result, ttl);
      
      return result;
    } catch (error) {
      throw error;
    } finally {
      this.pendingRequests.delete(key);
    }
  },
  
  // Invalidate cache for specific key
  invalidate(key) {
    cache.delete(key);
    this.pendingRequests.delete(key);
  },
  
  // Invalidate cache for multiple keys with pattern
  invalidatePattern(pattern) {
    const keys = cache.keys();
    keys.forEach(key => {
      if (key.includes(pattern)) {
        this.invalidate(key);
      }
    });
  }
};

// Batch multiple API calls into a single request
export const batchApiCalls = (requests, batchEndpoint, batchKey = 'batch') => {
  return async () => {
    try {
      const response = await fetch(batchEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          [batchKey]: requests.map(req => ({
            method: req.method || 'GET',
            url: req.url,
            data: req.data,
            headers: req.headers
          }))
        })
      });
      
      if (!response.ok) {
        throw new Error(`Batch request failed: ${response.status}`);
      }
      
      const results = await response.json();
      return results;
    } catch (error) {
      console.error('Batch API call failed:', error);
      
      // Fallback to individual requests if batch fails
      const individualResults = await Promise.all(
        requests.map(req => 
          fetch(req.url, {
            method: req.method || 'GET',
            headers: req.headers,
            body: req.data ? JSON.stringify(req.data) : undefined
          }).then(res => res.json())
        )
      );
      
      return individualResults;
    }
  };
};

// Auto cleanup expired cache items every minute
setInterval(() => {
  cache.cleanup();
}, 60000);

export default cache;
