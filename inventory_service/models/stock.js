const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Stock = sequelize.define('Stock', {
  product_id: { type: DataTypes.INTEGER, allowNull: false },
  shop_id: { type: DataTypes.INTEGER, allowNull: false },
  on_shelf: { type: DataTypes.INTEGER, allowNull: false },
  in_order: { type: DataTypes.INTEGER, allowNull: false },
});

// Метод для определения ассоциаций
Stock.associate = (models) => {
  Stock.belongsTo(models.Product, { foreignKey: 'product_id' });
};

module.exports = Stock;
