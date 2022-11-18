'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GroupUser extends Model {
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
      this.belongsTo(models.GroupList, {
        foreignKey: 'groupId',
        targetKey: 'groupId',
      });
      this.hasMany(models.Post, {
        foreignKey: 'groupUserId',
        sourceKey: 'groupUserId',
      });
      this.hasMany(models.Comment, {
        foreignKey: 'groupUserId',
        sourceKey: 'groupUserId',
      });
    }
  }
  GroupUser.init(
    {
      groupUserId: {
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
      groupId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Group',
          key: 'groupId',
        },
        onDelete: 'cascade',
      },
      groupUserNickname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      groupAvatarImg: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      statusMessage: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'GroupUser',
      timestamps: false,
    },
  );
  return GroupUser;
};
