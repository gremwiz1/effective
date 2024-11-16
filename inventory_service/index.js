const app = require('./app');
const sequelize = require('./config/database');

sequelize.sync().then(() => {
  app.listen(3001, () => console.log('Inventory Service запущен на порту 3001'));
});
