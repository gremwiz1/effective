const app = require('./app');
const sequelize = require('./config/database');

const Product = require('./models/product');
const Stock = require('./models/stock');

// Передаем все модели в associate для установки ассоциаций
Product.associate({ Stock });
Stock.associate({ Product });

sequelize.sync().then(() => {
  app.listen(3001, () => console.log('Inventory Service запущен на порту 3001'));
});
