const express = require('express');
const ProductController = require('../controllers/productController');
const ValidationMiddleware = require('../middleware/validationMiddleware');

const router = express.Router();

router.post('/', 
    ValidationMiddleware.createProductValidation(),
    ValidationMiddleware.handleValidationErrors,
    ProductController.createProduct
);

router.get('/', ProductController.listProducts);

router.get('/:id', 
    ValidationMiddleware.productIdValidation(),
    ValidationMiddleware.handleValidationErrors,
    ProductController.getProduct
);

router.put('/:id', 
    ValidationMiddleware.productIdValidation(),
    ValidationMiddleware.createProductValidation(),
    ValidationMiddleware.handleValidationErrors,
    ProductController.updateProduct
);

router.delete('/:id', 
    ValidationMiddleware.productIdValidation(),
    ValidationMiddleware.handleValidationErrors,
    ProductController.deleteProduct
);

module.exports = router;