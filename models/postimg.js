'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostImg extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Post, {
        foreignKey: 'postId',
        targetKey: 'postId',
      });
      this.belongsTo(models.GroupList, {
        foreignKey: 'groupId',
        targetKey: 'groupId',
      });
    }
  }
  PostImg.init(
    {
      postImgId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      postImg: {
        type: DataTypes.STRING,
      },
      postId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Post',
          key: 'postId',
        },
        onDelete: 'cascade',
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
      modelName: 'PostImg',
    },
  );
  return PostImg;
};
