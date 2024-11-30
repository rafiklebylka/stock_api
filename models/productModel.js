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

    async getAllProducts() {
        const snapshot = await this.collection.get();
        return snapshot.docs.map(doc => ({ 
            id: doc.id, 
            ...doc.data() 
        }));
    }
}

module.exports = new ProductModel();