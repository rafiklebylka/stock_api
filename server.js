const express = require('express');
require('dotenv').config();

const productRoutes = require('./routes/productRoutes');
const ValidationMiddleware = require('./middleware/validationMiddleware');
const ErrorMiddleware = require('./middleware/errorMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Logging middleware (optional but recommended)
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Routes
app.use('/api/products', productRoutes);

// 404 Handler
app.use(ErrorMiddleware.handle404);

// Error handling middleware (must be last)
app.use(ErrorMiddleware.handleErrors);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down gracefully');
    server.close(() => {
        console.log('Process terminated');
        process.exit(0);
     });   
});