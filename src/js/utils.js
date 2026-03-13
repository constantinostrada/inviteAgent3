/**
 * Utility functions for InviteAgent3
 */

// DOM utility functions
export const DOM = {
  /**
   * Select a single element
   * @param {string} selector - CSS selector
   * @returns {Element|null}
   */
  select: (selector) => document.querySelector(selector),

  /**
   * Select multiple elements
   * @param {string} selector - CSS selector
   * @returns {NodeList}
   */
  selectAll: (selector) => document.querySelectorAll(selector),

  /**
   * Create an element with optional attributes and content
   * @param {string} tag - HTML tag name
   * @param {Object} attributes - Element attributes
   * @param {string} content - Element content
   * @returns {Element}
   */
  create: (tag, attributes = {}, content = '') => {
    const element = document.createElement(tag);
    
    Object.entries(attributes).forEach(([key, value]) => {
      if (key === 'className') {
        element.className = value;
      } else {
        element.setAttribute(key, value);
      }
    });

    if (content) {
      element.innerHTML = content;
    }

    return element;
  },

  /**
   * Add event listener to element(s)
   * @param {Element|NodeList|string} target - Target element(s) or selector
   * @param {string} event - Event type
   * @param {Function} handler - Event handler
   */
  on: (target, event, handler) => {
    if (typeof target === 'string') {
      target = DOM.selectAll(target);
    }
    
    if (target.length) {
      target.forEach(el => el.addEventListener(event, handler));
    } else if (target.addEventListener) {
      target.addEventListener(event, handler);
    }
  },

  /**
   * Remove event listener from element(s)
   * @param {Element|NodeList|string} target - Target element(s) or selector
   * @param {string} event - Event type
   * @param {Function} handler - Event handler
   */
  off: (target, event, handler) => {
    if (typeof target === 'string') {
      target = DOM.selectAll(target);
    }
    
    if (target.length) {
      target.forEach(el => el.removeEventListener(event, handler));
    } else if (target.removeEventListener) {
      target.removeEventListener(event, handler);
    }
  },

  /**
   * Toggle class on element
   * @param {Element} element - Target element
   * @param {string} className - Class name to toggle
   */
  toggleClass: (element, className) => {
    element.classList.toggle(className);
  },

  /**
   * Add class to element
   * @param {Element} element - Target element
   * @param {string} className - Class name to add
   */
  addClass: (element, className) => {
    element.classList.add(className);
  },

  /**
   * Remove class from element
   * @param {Element} element - Target element
   * @param {string} className - Class name to remove
   */
  removeClass: (element, className) => {
    element.classList.remove(className);
  },

  /**
   * Check if element has class
   * @param {Element} element - Target element
   * @param {string} className - Class name to check
   * @returns {boolean}
   */
  hasClass: (element, className) => {
    return element.classList.contains(className);
  }
};

// String utility functions
export const StringUtils = {
  /**
   * Capitalize first letter of string
   * @param {string} str - Input string
   * @returns {string}
   */
  capitalize: (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },

  /**
   * Convert string to kebab-case
   * @param {string} str - Input string
   * @returns {string}
   */
  toKebabCase: (str) => {
    return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
  },

  /**
   * Convert string to camelCase
   * @param {string} str - Input string
   * @returns {string}
   */
  toCamelCase: (str) => {
    return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
  },

  /**
   * Truncate string to specified length
   * @param {string} str - Input string
   * @param {number} length - Maximum length
   * @param {string} suffix - Suffix to add when truncated
   * @returns {string}
   */
  truncate: (str, length = 100, suffix = '...') => {
    if (str.length <= length) return str;
    return str.substring(0, length) + suffix;
  },

  /**
   * Generate random string
   * @param {number} length - String length
   * @returns {string}
   */
  random: (length = 8) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
};

// Array utility functions
export const ArrayUtils = {
  /**
   * Remove duplicates from array
   * @param {Array} arr - Input array
   * @returns {Array}
   */
  unique: (arr) => [...new Set(arr)],

  /**
   * Shuffle array
   * @param {Array} arr - Input array
   * @returns {Array}
   */
  shuffle: (arr) => {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  },

  /**
   * Group array by key
   * @param {Array} arr - Input array
   * @param {string} key - Key to group by
   * @returns {Object}
   */
  groupBy: (arr, key) => {
    return arr.reduce((groups, item) => {
      const group = item[key];
      if (!groups[group]) {
        groups[group] = [];
      }
      groups[group].push(item);
      return groups;
    }, {});
  },

  /**
   * Chunk array into smaller arrays
   * @param {Array} arr - Input array
   * @param {number} size - Chunk size
   * @returns {Array}
   */
  chunk: (arr, size) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  }
};

// Date utility functions
export const DateUtils = {
  /**
   * Format date to readable string
   * @param {Date|string} date - Date to format
   * @param {string} locale - Locale string
   * @returns {string}
   */
  format: (date, locale = 'en-US') => {
    const d = new Date(date);
    return d.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  },

  /**
   * Get relative time string (e.g., "2 hours ago")
   * @param {Date|string} date - Date to compare
   * @returns {string}
   */
  timeAgo: (date) => {
    const now = new Date();
    const past = new Date(date);
    const diffInMs = now - past;
    const diffInMins = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMins / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMins < 1) return 'just now';
    if (diffInMins < 60) return `${diffInMins} minute${diffInMins > 1 ? 's' : ''} ago`;
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    if (diffInDays < 30) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    
    return DateUtils.format(date);
  },

  /**
   * Check if date is today
   * @param {Date|string} date - Date to check
   * @returns {boolean}
   */
  isToday: (date) => {
    const today = new Date();
    const checkDate = new Date(date);
    return today.toDateString() === checkDate.toDateString();
  }
};

// Validation utility functions
export const Validator = {
  /**
   * Validate email address
   * @param {string} email - Email to validate
   * @returns {boolean}
   */
  email: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * Validate URL
   * @param {string} url - URL to validate
   * @returns {boolean}
   */
  url: (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Validate phone number (basic)
   * @param {string} phone - Phone number to validate
   * @returns {boolean}
   */
  phone: (phone) => {
    const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
  },

  /**
   * Check if string is not empty
   * @param {string} str - String to check
   * @returns {boolean}
   */
  required: (str) => {
    return typeof str === 'string' && str.trim().length > 0;
  },

  /**
   * Check minimum length
   * @param {string} str - String to check
   * @param {number} min - Minimum length
   * @returns {boolean}
   */
  minLength: (str, min) => {
    return typeof str === 'string' && str.length >= min;
  },

  /**
   * Check maximum length
   * @param {string} str - String to check
   * @param {number} max - Maximum length
   * @returns {boolean}
   */
  maxLength: (str, max) => {
    return typeof str === 'string' && str.length <= max;
  }
};

// Local storage utility functions
export const Storage = {
  /**
   * Set item in localStorage
   * @param {string} key - Storage key
   * @param {any} value - Value to store
   */
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  },

  /**
   * Get item from localStorage
   * @param {string} key - Storage key
   * @param {any} defaultValue - Default value if key doesn't exist
   * @returns {any}
   */
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return defaultValue;
    }
  },

  /**
   * Remove item from localStorage
   * @param {string} key - Storage key
   */
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  },

  /**
   * Clear all localStorage
   */
  clear: () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }
};

// Debounce function
export const debounce = (func, wait, immediate = false) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func(...args);
  };
};

// Throttle function
export const throttle = (func, limit) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// API utility functions
export const API = {
  /**
   * Make GET request
   * @param {string} url - Request URL
   * @param {Object} options - Request options
   * @returns {Promise}
   */
  get: async (url, options = {}) => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        ...options
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API GET error:', error);
      throw error;
    }
  },

  /**
   * Make POST request
   * @param {string} url - Request URL
   * @param {Object} data - Request data
   * @param {Object} options - Request options
   * @returns {Promise}
   */
  post: async (url, data, options = {}) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        body: JSON.stringify(data),
        ...options
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API POST error:', error);
      throw error;
    }
  }
};