class ErrorMiddleware {
    // Central error handling middleware
    static handleErrors(err, req, res, next) {
      // Log error for internal tracking
      console.error('Unhandled Error:', err);
  
      // Categorize and handle different types of errors
      if (err.name === 'ValidationError') {
        // Mongoose-style validation errors
        return res.status(400).json({
          message: 'Validation Error',
          errors: Object.values(err.errors).map(e => e.message)
        });
      }
  
      if (err.name === 'FirebaseError') {
        // Specific Firebase-related errors
        return res.status(500).json({
          message: 'Firebase Database Error',
          error: err.message
        });
      }
  
      if (err.code === 'ECONNREFUSED') {
        // Database connection errors
        return res.status(503).json({
          message: 'Service Unavailable',
          error: 'Database connection failed'
        });
      }
  
      // Generic server error
      res.status(500).json({
        message: 'Internal Server Error',
        error: process.env.NODE_ENV === 'production' 
          ? 'An unexpected error occurred' 
          : err.message
      });
    }
  
    // 404 Not Found middleware
    static handle404(req, res, next) {
      res.status(404).json({
        message: 'Endpoint Not Found',
        path: req.originalUrl,
        method: req.method
      });
    }
  }
  
  module.exports = ErrorMiddleware;