const mongoose = require('mongoose');
const { Schema, model } = mongoose;


const productSchema = new Schema({
    id: {type: String, required: true},
    name: {type: String, required: true},
    description: {type: String, required: true},
    features: {type: String, required: true},
    price: {type: Number, required: true},
    keywords: {type: String, required: true},
    url: {type: String, required: true},
    category: {type: String, required: true},
    subcategory: {type: String, required: true},
    images: {type: [String], required: true},
}, { optimisticConcurrency: true });

const Product = model('Product', productSchema);
module.exports = Product;
