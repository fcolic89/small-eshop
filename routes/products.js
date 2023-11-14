const express = require('express');
const router = express.Router();
const productsService = require('../service/products.js');

router.get('', (req, res) => {
    productsService.getProducts(req, res); 
});

router.get('/:id', (req, res) => {
    productsService.findProduct(req, res);
});

router.post('/cart-add', (req, res) => {
    productsService.addProduct(req, res);
});
router.post('/cart-remove', (req, res) => {
    productsService.removeProduct(req, res);
});

module.exports = router;
