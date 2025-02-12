const jwt = require('jsonwebtoken');
const product = require('../database/product');
const users = require('../database/user');
const cart = require('../database/cart');

async function cartItems(req, res) {
    try {
        const cart_items = await cart.find({ user_id: req.user.id });
        res.status(200).send(cart_items.length? cart_items:'Empty cart');
    } catch(err) {
        res.status(400).send(err.message);
    }
};

async function addToCart(req, res) {
    if (!req.body.product_id) {
        return res.status(400).send('invalid request');
    }

    try {
        const product_id = req.body.product_id;
        const quantity = req.body.quantity? req.body.quantity:1;
        
        const product_quantity = (await product.find({ id: product_id }))[0];
        if (!product_quantity) {
            return res.status(400).json({
                "error": "invalid product"
             });
        }

        if (product_quantity.stock_quantity < quantity) {
            return res.status(409).json({
               "error": "not enough stock",
               "message": `only ${product_quantity.stock_quantity} in stock`
            });
        }

        const id = req.user.id;
        const item = await cart.find({ user_id: id, product_id: product_id });

        if (item.length) {
            await cart.updateOne({ 
                user_id: id,
                product_id: product_id 
            }, {
                $inc: {
                    quantity: quantity
                }
            });
        } else {
            await cart.create({
                user_id: id,
                product_id, product_id,
                quantity: quantity
            });
        }
        
        await product.updateOne({ 
            id: product_id 
        }, {
            $inc: {
                stock_quantity: -quantity
            }
        });

        res.status(201).send('added to cart');
    } catch(err) {
        res.status(400).send(err.message);
    }
};

async function deleteFromCart(req, res) {
    if (!req.body.product_id) {
        return res.status(400).send('invalid request');
    }

    try {
        const product_id = req.body.product_id;
        const quantity = req.body.quantity? req.body.quantity:1;
        const id = req.user.id;

        const product_quantity = (await cart.find({ user_id: id, product_id: product_id }))[0];
        if (!product_quantity) {
            return res.status(400).json({
                "error": "invalid request"
             });
        }

        if (product_quantity.quantity < quantity) {
            return res.status(409).json({
               "error": "you can't delete more than you have",
               "message": `only ${product_quantity.quantity} in cart`
            });
        }

        if (quantity == product_quantity.quantity) {
            await cart.deleteOne({ 
                user_id: id,
                product_id: product_id 
            });
        } else {
            await cart.updateOne({ 
                user_id: id,
                product_id: product_id 
            }, {
                $inc: {
                    quantity: -quantity
                }
            });
        }
        
        await product.updateOne({ 
            id: product_id 
        }, {
            $inc: {
                stock_quantity: quantity
            }
        });

        res.status(200).send('deleted from cart');
    } catch(err) {
        res.status(400).send(err.message);
    }
};

module.exports = {
    cartItems,
    addToCart,
    deleteFromCart
};