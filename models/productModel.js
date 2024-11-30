const { firestore } = require('../config/firebaseConfig');

class ProductModel {
    constructor() {
        this.collection = firestore.collection('products');
    }

    async create(productData) {
        // Validate product data
        const docRef = await this.collection.add(productData);
        return { id: docRef.id, ...productData };
    }

    async getById(productId) {
        const doc = await this.collection.doc(productId).get();
        return doc.exists ? { id: doc.id, ...doc.data() } : null;
    }

    async update(productId, updateData) {
        await this.collection.doc(productId).update(updateData);
        return this.getById(productId);
    }

    async delete(productId) {
        await this.collection.doc(productId).delete();
        return { message: 'Product deleted successfully' };
    }

    async getAllProducts(options = {}) {
        const { 
            page = 1, 
            limit = 10, 
            sortBy = 'createdAt', 
            sortOrder = 'desc',
            filters = {}
        } = options;
    
        // Calculate offset
        const offset = (page - 1) * limit;
    
        // Base query
        let query = this.collection;
    
        // Apply filters
        Object.entries(filters).forEach(([key, value]) => {
            query = query.where(key, '==', value);
        });
    
        // Sort and paginate
        query = query.orderBy(sortBy, sortOrder)
                    .offset(offset)
                    .limit(limit);
                
        // Execute query
        const snapshot = await query.get();
        const products = snapshot.docs.map(doc => ({ 
            id: doc.id, 
            ...doc.data() 
        }));
    
        // Get total count for pagination metadata
        const totalCountSnapshot = await this.collection.count().get();
        const totalCount = totalCountSnapshot.data().count;
    
        return {
            products,
            pagination: {
                currentPage: page,
                pageSize: limit,
                totalItems: totalCount,
                totalPages: Math.ceil(totalCount / limit)
            }
        };
    }
}

module.exports = new ProductModel();