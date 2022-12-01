'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChattingList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.GroupUser, {
        foreignKey: 'groupUserId',
        targetKey: 'groupUserId',
      });
      this.belongsTo(models.ChattingRoom, {
        foreignKey: 'roomId',
        targetKey: 'roomId',
      });
    }
  }
  ChattingList.init(
    {
      chattingId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      roomId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'ChattingRoom',
          key: 'roomId',
        },
      },
      groupUserId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'GroupUser',
          key: 'groupUserId',
        },
      },
      message: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'ChattingList',
    },
  );
  return ChattingList;
};
