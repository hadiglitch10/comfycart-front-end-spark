const jwt = require('jsonwebtoken');

// Middleware to verify the JWT token
const authMiddleware = (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization token required' });
    }

    // Extract the token
    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Authorization token required' });
    }

    // Verify token
    const decoded = jwt.verify(token, "sdmniefnjfbdcjnad");
    
    // Add user data to request
    req.user = {
      id: decoded.id,
      name: decoded.name
    };

    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    } else if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = authMiddleware; 