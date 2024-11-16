const express = require('express');
const app = express();
const productRoutes = require('./routes/productRoutes');
const stockRoutes = require('./routes/stockRoutes');

app.use(express.json());
app.use('/products', productRoutes);
app.use('/stocks', stockRoutes);

module.exports = app;
