'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Schedule.init({
    scheduleId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    title: {
      allowNull: false,
      type:DataTypes.STRING
    },
    description: {
      allowNull: false,
      type:DataTypes.STRING
    },
    start: {
      allowNull: false,
      type:DataTypes.STRING
    },
    end: {
      allowNull: false,
      type:DataTypes.STRING
    },
    colorId: {
      allowNull: false,
      type:DataTypes.INTEGER,
      references: {
        model: "Color",
        key: "colorId",
      }
    },
    groupUserId:{
      allowNull: false,
      type:DataTypes.INTEGER,
      references: {
        model: "GroupUser",
        key: "groupuserId",
      }
    },
    groupId:{
      allowNull: false,
      type:DataTypes.INTEGER,
      references: {
        model: "Group",
        key: "groupId",
      }
    },
  }, {
    sequelize,
    modelName: 'Schedule',
  });
  return Schedule;
};