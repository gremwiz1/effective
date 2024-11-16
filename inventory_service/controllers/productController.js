const Product = require('../models/product');
const axios = require('axios');

exports.createProduct = async (req, res) => {
  const { plu, name } = req.body;

  if (!plu || !name) {
    return res.status(400).json({ error: 'PLU и название товара обязательны для заполнения' });
  }

  try {
    const product = await Product.create({ plu, name });

    await axios.post('http://localhost:3002/actions', {
      product_id: product.id,
      action: 'create',
      plu: product.plu,
      shop_id: null,
      date: new Date()
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getProducts = async (req, res) => {
  const { name, plu } = req.query;

  try {
    const filterOptions = {};

    if (name) {
      filterOptions.name = { $like: `%${name}%` };
    }
    if (plu) {
      filterOptions.plu = plu;
    }

    const products = await Product.findAll({ where: filterOptions });
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
