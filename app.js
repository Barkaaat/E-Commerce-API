require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose'); 
const authRouter = require('./routes/authRouter');
const adminRouter = require('./routes/adminRouter');
const adminAuth = require('./middelwares/adminAuth');
const porductRouter = require('./routes/productRouter');
const cartRouter = require('./routes/cartRouter');
const orderRouter = require('./routes/orderRouter');


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const DB = process.env.DBURL || 'mongodb://localhost:27017/ecommerce';
mongoose.connect(DB)
    .then(() => console.log('Database connected'))
    .catch(err => console.log(err));


app.use('/api/v1/auth', authRouter);
app.use('/api/v1/admin', adminAuth, adminRouter);
app.use('/api/v1/products', porductRouter);
app.use('/api/v1/cart', cartRouter);
app.use('/api/v1/order', orderRouter);


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`app started on port ${port}`);
});
