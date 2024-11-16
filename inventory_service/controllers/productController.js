const Product = require('../models/product');
const axios = require('axios');

exports.createProduct = async (req, res) => {
  const { plu, name } = req.body;

  if (!plu || !name) {
    return res.status(400).json({ error: 'PLU и название товара обязательны для заполнения' });
  }

  try {

     // Проверяем, существует ли продукт с таким PLU
     const existingProduct = await Product.findOne({ where: { plu } });
     if (existingProduct) {
       return res.status(400).json({ error: `Продукт с PLU ${plu} уже существует` });
     }

    const product = await Product.create({ plu, name });

    await axios.post('http://localhost:3002/actions', {
      product_id: product.id,
      action: 'create',
      plu: product.plu,
      date: new Date()
    });

    res.status(201).json(product);
  } catch (error) {
    console.error("Ошибка создания продукта:", error); 
    res.status(400).json({ error: error.message || "Request failed with status code 400" });
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
