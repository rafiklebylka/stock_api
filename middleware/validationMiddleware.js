const { body, param, validationResult } = require('express-validator');

class ValidationMiddleware {
    // Validation rules for creating a product
    createProductValidation() {
        return [
        body('name').notEmpty().withMessage('Product name is required'),
        body('name.en').optional().isString().withMessage('English name must be a string'),
        
        body('pricing.basePrice')
            .notEmpty().withMessage('Base price is required')
            .isFloat({ min: 0 }).withMessage('Base price must be a positive number'),
        
        body('pricing.currency')
            .optional()
            .isString()
            .isLength({ min: 3, max: 3 }).withMessage('Currency must be a 3-letter code'),
        
        body('categories.primary')
            .notEmpty().withMessage('Primary category is required'),
        
        body('inventory.trackingMethod')
            .optional()
            .isIn(['by_variant', 'total_stock']).withMessage('Invalid tracking method'),
        
        // Validate variants if present
        body('inventory.variants.*.attributes.color')
            .optional()
            .isString().withMessage('Color must be a string'),
        
        body('inventory.variants.*.stockInfo.currentStock')
            .optional()
            .isInt({ min: 0 }).withMessage('Current stock must be a non-negative integer')
        ];
    }

    // Validation for product ID parameter
    productIdValidation() {
        return [
        param('id')
            .notEmpty().withMessage('Product ID is required')
            .isString().withMessage('Product ID must be a string')
        ];
    }

    // Middleware to handle validation errors
    handleValidationErrors(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                errors: errors.array().map(err => ({
                field: err.path,
                message: err.msg
                }))
            });
        }
        next();
    }
}

module.exports = new ValidationMiddleware();