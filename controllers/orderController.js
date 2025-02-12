const cart = require('../database/cart');
const orderItems = require('../database/orderItems');
const orders = require('../database/orders');
const product = require('../database/product');
const user = require('../database/user');

async function createOrder(req, res) {
    try {
        const { country, city, area, street_name, building } = req.body;
        if (!country || !city || !area || !street_name || !building) {
            return res.status(400).send("invalid address");
        }

        const items = await cart.find({ user_id: req.user.id });
        if (!items.length) {
            return res.status(204).send("no items in cart");
        }

        const order_id = (await orders.find()).length+1;
        await orders.create({
            user_id: req.user.id,
            order_id: order_id,
            country: country,
            city: city,
            area: area,
            street_name: street_name,
            building: building
        });

        let cost = 0;
        for (item of items) {
            await orderItems.create({
                id: order_id,
                product_id: item.product_id,
                quantity: item.quantity
            });
            cost = item.quantity * (await product.find({ id: item.product_id }))[0].price;
        }

        await cart.deleteMany({ user_id: req.user.id });
        
        res.status(200).json({
            'message': `order created go to Checkout`,
            'total cost': cost
        });
    } catch(err) {
        res.status(400).send(err.message);
    }
};

async function getOrders(req, res) {
    try {
        const id = req.user.id;
        const order_id = (await orders.find({ user_id: id }))[0];
        if (!order_id) {
            return res.status(409).send('No orders');
        }

        const order = await orderItems.find({ id: order_id.order_id });
        res.status(200).send(order);
    } catch(err) {
        res.status(400).send(err.message);
    }
};

async function deleteOrder(req, res) {
    try {
        const id = req.user.id;
        const order_id = (await orders.find({ user_id: id }))[0];
        if (!order_id) {
            return res.status(409).send('No orders');
        }
        
        await orderItems.deleteMany({ id: order_id.order_id });
        await orders.deleteMany({ user_id: id });

        res.status(200).send("order is deleted");
    } catch(err) {
        res.status(400).send(err.message);
    }
};


// TO DO WITH PAYMENT METHODE
async function checkoutOrder(req, res) {

};

module.exports = {
    createOrder,
    getOrders,
    deleteOrder,
    checkoutOrder
};