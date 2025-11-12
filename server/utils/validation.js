// Input validation and sanitization utilities

/**
 * Validate and sanitize email
 */
exports.sanitizeEmail = (email) => {
  if (!email || typeof email !== 'string') {
    return null;
  }
  // Convert to lowercase and trim
  const sanitized = email.toLowerCase().trim();
  
  // Validate email format - using a simple but safe regex
  // This regex is not vulnerable to ReDoS attacks
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(sanitized)) {
    return null;
  }
  
  return sanitized;
};

/**
 * Sanitize string input (prevent injection)
 */
exports.sanitizeString = (input, maxLength = 500) => {
  if (!input || typeof input !== 'string') {
    return '';
  }
  
  // Remove any special characters that could be used for injection
  let sanitized = input.trim();
  
  // Limit length
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength);
  }
  
  return sanitized;
};

/**
 * Sanitize search query
 */
exports.sanitizeSearchQuery = (query) => {
  if (!query || typeof query !== 'string') {
    return '';
  }
  
  // Remove special regex characters to prevent regex injection
  const sanitized = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  
  return sanitized.trim();
};

/**
 * Validate ObjectId
 */
exports.isValidObjectId = (id) => {
  const mongoose = require('mongoose');
  return mongoose.Types.ObjectId.isValid(id);
};

/**
 * Sanitize pagination parameters
 */
exports.sanitizePagination = (page, limit, maxLimit = 100) => {
  const sanitizedPage = Math.max(1, parseInt(page) || 1);
  const sanitizedLimit = Math.min(
    maxLimit,
    Math.max(1, parseInt(limit) || 20)
  );
  
  return {
    page: sanitizedPage,
    limit: sanitizedLimit,
    skip: (sanitizedPage - 1) * sanitizedLimit
  };
};

/**
 * Sanitize file path
 */
exports.sanitizeFilePath = (filePath) => {
  if (!filePath || typeof filePath !== 'string') {
    throw new Error('Invalid file path');
  }
  
  // Remove any path traversal attempts
  const sanitized = filePath.replace(/\.\./g, '');
  
  // Ensure path doesn't contain dangerous characters
  if (/[;<>|&$`]/.test(sanitized)) {
    throw new Error('Invalid characters in file path');
  }
  
  return sanitized;
};

/**
 * Validate request body fields
 */
exports.validateRequiredFields = (body, requiredFields) => {
  const missing = [];
  
  for (const field of requiredFields) {
    if (!body[field]) {
      missing.push(field);
    }
  }
  
  if (missing.length > 0) {
    return {
      valid: false,
      message: `Missing required fields: ${missing.join(', ')}`
    };
  }
  
  return { valid: true };
};

/**
 * Sanitize MongoDB query object
 */
exports.sanitizeMongoQuery = (queryObj) => {
  const sanitized = {};
  
  for (const [key, value] of Object.entries(queryObj)) {
    // Skip if key starts with $ (MongoDB operators)
    if (key.startsWith('$')) {
      continue;
    }
    
    // Sanitize value
    if (typeof value === 'string') {
      sanitized[key] = value.trim();
    } else if (typeof value === 'object' && value !== null) {
      // Recursively sanitize nested objects
      sanitized[key] = exports.sanitizeMongoQuery(value);
    } else {
      sanitized[key] = value;
    }
  }
  
  return sanitized;
};
