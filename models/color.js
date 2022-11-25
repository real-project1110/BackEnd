'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Color extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Color.init({
    colorId: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
    color: {
    allowNull: false,
    type: DataTypes.STRING,
    },
    status: {
      allowNull: false,
      type: DataTypes.STRING,
      },
      groupId:{
        type: DataTypes.INTEGER
      }
  }, {
    sequelize,
    modelName: 'Color',
  });
  return Color;
};