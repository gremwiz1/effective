const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./product');

const Stock = sequelize.define('Stock', {
  product_id: { type: DataTypes.INTEGER, references: { model: Product, key: 'id' } },
  shop_id: { type: DataTypes.INTEGER, allowNull: false },
  on_shelf: { type: DataTypes.INTEGER, defaultValue: 0 },
  in_order: { type: DataTypes.INTEGER, defaultValue: 0 },
});

module.exports = Stock;
