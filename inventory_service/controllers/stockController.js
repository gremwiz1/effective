const Stock = require('../models/stock');

exports.createStock = async (req, res) => {
  try {
    const stock = await Stock.create(req.body);
    res.status(201).json(stock);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
