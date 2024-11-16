const Stock = require('../models/stock');
const Product = require('../models/product');
const axios = require('axios');

exports.createStock = async (req, res) => {
  const { product_id, shop_id, on_shelf, in_order } = req.body;

  if (!product_id || !shop_id) {
    return res.status(400).json({ error: 'product_id и shop_id обязательны для заполнения' });
  }

  try {
    const stock = await Stock.create({
      product_id,
      shop_id,
      on_shelf: on_shelf || 0,
      in_order: in_order || 0
    });

    // Получаем товар для получения его PLU
    const product = await Product.findByPk(product_id);
    if (!product) {
      return res.status(404).json({ error: 'Товар не найден' });
    }

    await axios.post('http://localhost:3002/actions', {
      product_id: stock.product_id,
      shop_id: stock.shop_id,
      plu: product.plu,
      action: 'create_stock',
      date: new Date()
    });

    res.status(201).json(stock);
  } catch (error) {
    console.error("Ошибка создания остатка:", error);
    res.status(400).json({ error: error.message || "Ошибка при создании остатка" });
  }
};

exports.increaseStock = async (req, res) => {
  const { stockId, increaseOnShelf, increaseInOrder } = req.body;

  try {

     // Находим запись об остатке
     const stock = await Stock.findByPk(stockId);
     if (!stock) {
       return res.status(404).json({ error: 'Остаток не найден' });
     }
     
    stock.on_shelf += increaseOnShelf || 0;
    stock.in_order += increaseInOrder || 0;
    await stock.save();

    // Получаем товар для получения его PLU
    const product = await Product.findByPk(stock.product_id);
    if (!product) {
      return res.status(404).json({ error: 'Товар не найден' });
    }
    
    await axios.post('http://localhost:3002/actions', {
      product_id: stock.product_id,
      shop_id: stock.shop_id,
      plu: product.plu,
      action: 'increase_stock',
      date: new Date()
    });

    res.status(200).json(stock);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.decreaseStock = async (req, res) => {
  const { stockId, decreaseOnShelf, decreaseInOrder } = req.body;

  try {
    const stock = await Stock.findByPk(stockId);

    if (!stock) {
      return res.status(404).json({ error: 'Stock not found' });
    }

    stock.on_shelf = Math.max(0, stock.on_shelf - (decreaseOnShelf || 0));
    stock.in_order = Math.max(0, stock.in_order - (decreaseInOrder || 0));
    await stock.save();

    // Получаем товар для получения его PLU
    const product = await Product.findByPk(stock.product_id);
    if (!product) {
      return res.status(404).json({ error: 'Товар не найден' });
    }

    await axios.post('http://localhost:3002/actions', {
      product_id: stock.product_id,
      shop_id: stock.shop_id,
      plu: product.plu,
      action: 'decrease_stock',
      date: new Date()
    });

    res.status(200).json(stock);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getStocks = async (req, res) => {
  const { plu, shop_id, on_shelf_min, on_shelf_max, in_order_min, in_order_max } = req.query;

  try {
    const filterOptions = {
      where: {},
      include: [{ model: Product, attributes: ['plu'] }]
    };

    if (plu) {
      filterOptions.include[0].where = { plu };
    }
    if (shop_id) {
      filterOptions.where.shop_id = shop_id;
    }
    if (on_shelf_min || on_shelf_max) {
      filterOptions.where.on_shelf = {};
      if (on_shelf_min) filterOptions.where.on_shelf.$gte = on_shelf_min;
      if (on_shelf_max) filterOptions.where.on_shelf.$lte = on_shelf_max;
    }
    if (in_order_min || in_order_max) {
      filterOptions.where.in_order = {};
      if (in_order_min) filterOptions.where.in_order.$gte = in_order_min;
      if (in_order_max) filterOptions.where.in_order.$lte = in_order_max;
    }
    
    const stocks = await Stock.findAll(filterOptions);
    res.status(200).json(stocks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
