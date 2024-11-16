const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  plu: { type: DataTypes.STRING, allowNull: false, unique: true },
  name: { type: DataTypes.STRING, allowNull: false },
});

// Метод для определения ассоциаций
Product.associate = (models) => {
  Product.hasMany(models.Stock, { foreignKey: 'product_id' });
};

module.exports = Product;
