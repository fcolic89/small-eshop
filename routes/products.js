const express = require('express');
const Joi = require('joi');
const { setPage } = require('../middleware/setPage')
const productsService = require('../service/products.js');

const router = express.Router();

const cartSchema = Joi.object({
    productId: Joi.string().required(),
    quantity: Joi.number().optional()
})


router.get('', setPage, (req, res) => {
    productsService.getProducts(req, res); 
});

router.get('/:id', (req, res) => {
    productsService.findProduct(req, res);
});

router.post('/cart-add', (req, res) => {
    const {error} = cartSchema.validate(req.body);
    if(error){
        return res.status(400).send(error);
    }
    productsService.addProduct(req, res);
});
router.post('/cart-remove', (req, res) => {
    const {error} = cartSchema.validate(req.body);
    if(error){
        return res.status(400).send(error);
    }
    productsService.removeProduct(req, res);
});

module.exports = router;
