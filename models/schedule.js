'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
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
      this.belongsTo(models.GroupUser, {
        foreignKey: 'groupUserId',
        targetKey: 'groupUserId',
      });
    }
  }
  Schedule.init(
    {
      scheduleId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      description: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      start: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      end: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      color: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      groupUserId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'GroupUser',
          key: 'groupuserId',
        },
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
    },
    {
      sequelize,
      modelName: 'Schedule',
    },
  );
  return Schedule;
};
