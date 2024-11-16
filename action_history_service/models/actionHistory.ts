import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class ActionHistory extends Model {}

ActionHistory.init({
  product_id: { type: DataTypes.INTEGER, allowNull: false },
  shop_id: { type: DataTypes.INTEGER, allowNull: false },
  plu: { type: DataTypes.STRING, allowNull: false }, 
  action: { type: DataTypes.STRING, allowNull: false },
  date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, { sequelize, modelName: 'ActionHistory' });

export default ActionHistory;
