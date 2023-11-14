const Product = require('../database/models/productModel');

async function getProducts(req, res){
    try{
        let limit = Number(req.query.size);
        let skip = (Number(req.query.page)-1)*Number(req.query.size);
        let name = req.query.name || '';
        let desc = req.query.desc || '';
        let category = req.query.cat || '';
        let sort = req.query.sort === 'desc' ? -1 : 1;
          
        let productList = await Product.find({
            name: {"$regex": name, "$options": "i"},
            description: {"$regex": desc, "$options": "i"},
            $or: [
                { category: {"$regex": category, "$options": "i"} },
                { subcategory: {"$regex": category, "$options": "i"} },
            ]
        })
            .limit(limit)
            .skip(skip)
            .sort({price: sort});

        res.send(productList);
    }catch(err){
        res.status(500).json({message: 'An error occurred while getting products! ' + err});
    }
} 

async function findProduct(req, res){
    try{
        let product = await Product.findOne({id: req.params.id});
        if(!product){
            return res.status(404).json({message: `Product with id ${req.params.id} was not found.`});
        }
        return res.send(product);

    }catch(err){
        res.status(500).json({message: 'An error occurred while getting product! ' + err});
    }
}

async function addProduct(req, res){
    try{
        const productId = req.body.id;
        const productQuantity = req.body.quantity || 1;

        const product = await Product.findOne({id: productId});
        if(!product){
            return res.status(404).json({message: `Product with id ${productId} not found`});
        }

        const cart = req.cookies.cart;
        if(cart === undefined){
           res.cookie('cart', [{productId: productId, quantity: productQuantity}]);
        }
        else{
            let found = false;
            for(const product of cart){
                if(product.productId === productId){
                    found = true;
                    product.quantity += productQuantity;
                    break;
                }
            }
            if(!found){
                cart.push({productId: productId, quantity: productQuantity});
            }

            res.cookie('cart', cart);
        }
        // console.log(cart);
        res.json({message: 'Product added successfully!'});

    }catch(err){
        res.status(500).json({message: 'An error occurred while adding product to cart! '+ err});
    }
}

async function removeProduct(req, res){
    try{
        const productId = req.body.id;
        
        const cart = req.cookies.cart;
        if(cart === undefined){
            return res.status(400).json({message: 'No items to remove! The cart is empty.'});
        }
        else{
            let found = false;
            for(let i = 0; i < cart.length; i++){
                if(cart[i].productId === productId){
                    if(cart[i].quantity == 1){
                        cart.splice(i,1);
                    }
                    else{
                        cart[i].quantity--;
                    }
                    found = true;
                    break;
                }
            }
            if(found){
                res.cookie('cart', cart);
            }
            else{
                return res.status(400).json(`Product not removed! Product with id ${productId} was not in the cart`);
            }
        }
        // console.log(cart);
        res.json({message: 'Product removed successfully!'});

    }catch(err){
        res.status(500).json({message: 'An error occurred while removing product from cart! '+ err});
    }
}

module.exports = {
    getProducts,
    findProduct,
    addProduct,
    removeProduct
}
