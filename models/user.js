'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.GroupList, {
        foreignKey: 'userId',
        sourceKey: 'userId',
      });
      this.hasMany(models.GroupUser, {
        foreignKey: 'userId',
        sourceKey: 'userId',
      });
    }
  }
  User.init(
    {
      userId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      nickname: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      refreshToken: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      avatarImg: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      currentPage: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      snsId : {
        type: DataTypes.STRING,
        allowNull: true,
      },
      provider : {
        type: DataTypes.STRING,
        allowNull : true,
      },
    },
    {
      sequelize,
      modelName: 'User',
      timestamps: false,
    },
  );
  return User;
};
