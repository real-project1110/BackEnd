'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GroupList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: 'userId',
        targetKey: 'userId',
      });
      this.hasMany(models.GroupUser, {
        foreignKey: 'groupId',
        sourceKey: 'groupId',
      });
      this.hasMany(models.Calendar, {
        foreignKey: 'groupId',
        sourceKey: 'groupId',
      });
      this.hasMany(models.Post, {
        foreignKey: 'groupId',
        sourceKey: 'groupId',
      });
    }
  }
  GroupList.init(
    {
      groupId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'User',
          key: 'userId',
        },
      },
      groupName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      groupImg: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      userCount: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: 'GroupList',
      timestamps: false,
    },
  );
  return GroupList;
};
