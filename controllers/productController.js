const products = require("../database/product")

async function getProduct(req, res) {
    try {
        let name = "";
        let category = "";
        if (req.body) {
            if (req.body.name) name = req.body.name;
            if (req.body.category) category = req.body.category;
        }

        let product;
        if (category.length) product = await products.find({ category: category });
        else product = await products.find();

        let ans = [];
        for (let i of product) {
            if (i.name.includes(name)) {
                ans.push(i);
            }
        }

        if (!ans.length) {
            res.status(204).send('No products');
        } else {
            res.status(200).send(ans);
        }
    } catch(err) {
        res.status(400).send(err.message);
    }
};

async function addProduct(req, res) {
    if (!req.body) {
        return res.status(400).send('Invalid request');
    }

    try {
        const { name, category, price, quantity } = req.body;
        if (!name || !category || !price || !quantity) {
            return res.status(400).send('Invalid product data');
        }

        const updated = await products.updateOne(
            { 
                name: name, 
                category: category 
            }, 
            { 
                $inc: { 
                    stock_quantity: quantity 
                }
            }
        );
        
        if (!updated.modifiedCount) {
            await products.create({
                id: (await products.find()).length+1,
                name: name,
                category: category,
                price: price,
                stock_quantity: quantity
            });
        }
        
        res.status(201).send('product added');

    } catch(err) {
        console.log(err);
        res.status(400).send(err.message);
    }
};

async function deleteProduct(req, res) {
    if (!req || !req.params.produtId) {
        return res.status(400).send('Invalid Request');
    }
    try {
        const deleted = await products.deleteOne({ id: req.params.produtId });
        if (deleted.deletedCount) {
            res.status(202).send('Product deleted successflly');
        } else {
            res.status(404).send('Product not deleted');
        }
    } catch(err) {
        res.status(400).send(err.message);
    }
};

module.exports = {
    getProduct,
    addProduct,
    deleteProduct
};