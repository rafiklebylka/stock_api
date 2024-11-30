const ProductModel = require('../models/productModel');

class ProductController {
    async createProduct(req, res) {
        try {
            const product = await ProductModel.create(req.body);
            res.status(201).json(product);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getProduct(req, res) {
        try {
            const product = await ProductModel.getById(req.params.id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json(product);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateProduct(req, res) {
        try {
            const product = await ProductModel.update(req.params.id, req.body);
            res.json(product);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteProduct(req, res) {
        try {
            await ProductModel.delete(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async listProducts(req, res) {
        try {
            const { 
                page = 1, 
                limit = 10, 
                sortBy, 
                sortOrder,
                ...filters
            } = req.query;
      
            const result = await ProductModel.getAllProducts({
                page: parseInt(page),
                limit: parseInt(limit),
                sortBy,
                sortOrder,
                filters
            });
      
            res.json(result);
        } catch (error) {
            // Delegate to error handling middleware
            throw error;
        }
    }
}

module.exports = new ProductController();