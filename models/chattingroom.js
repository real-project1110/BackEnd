'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChattingRoom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.GroupList, {
        foreignKey: 'groupId',
        targetKey: 'groupId',
      });
      this.hasMany(models.ChattingList, {
        foreignKey: roomId,
        sourceKey: roomId,
      });
    }
  }
  ChattingRoom.init(
    {
      roomId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      groupId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'GroupList',
          key: 'groupId',
        },
        onDelete: 'cascade',
      },
      groupUserIds: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'ChattingRoom',
    },
  );
  return ChattingRoom;
};
