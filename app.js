require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose'); 
const authRouter = require('./routes/authRouter');
const adminRouter = require('./routes/adminRouter');
const adminAuth = require('./middelwares/adminAuth');


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const DB = process.env.DBURL || 'mongodb://localhost:27017/ecommerce';
mongoose.connect(DB)
    .then(() => console.log('Database connected'))
    .catch(err => console.log(err));


app.use('/auth', authRouter);
app.use('/admin', adminAuth, adminRouter);


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`app started on port ${port}`);
});
