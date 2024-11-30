function validateProduct(productData) {
    // Add comprehensive validation logic
    const errors = [];
  
    if (!productData.name) {
        errors.push('Product name is required');
    }
  
    if (!productData.pricing || !productData.pricing.basePrice) {
         errors.push('Base price is required');
    }
  
    if (errors.length > 0) {
        throw new Error(errors.join(', '));
    }
}
  
module.exports = { validateProduct };