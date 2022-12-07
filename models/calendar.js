'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Calendar extends Model {
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
    }
  }
  Calendar.init(
    {
      calendarId: {
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
      calendarName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'Calendar',
    },
  );
  return Calendar;
};
