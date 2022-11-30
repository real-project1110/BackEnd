'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChattingRoom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ChattingRoom.init({
    groupId: DataTypes.INTEGER,
    gorupUserId1: DataTypes.INTEGER,
    gorupUserId2: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ChattingRoom',
  });
  return ChattingRoom;
};