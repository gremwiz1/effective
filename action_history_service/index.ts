import app from './app';
import sequelize from './config/database';

sequelize.sync().then(() => {
  app.listen(3002, () => console.log('Action History Service запущен на порту 3002'));
});
