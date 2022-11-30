'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
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
      this.hasMany(models.Comment, {
        foreignKey: 'postId',
        sourceKey: 'postId',
      });
      this.hasMany(models.PostImg, {
        foreignKey: 'postId',
        sourceKey: 'postId',
      });
      this.hasMany(models.PostLike, {
        foreignKey: 'postId',
        sourceKey: 'postId',
      });
    }
  }
  Post.init(
    {
      postId: {
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
      groupUserId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'GroupUser',
          key: 'groupUserId',
        },
      },
      content: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      category: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      commentCount: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      likeCount: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
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
      modelName: 'Post',
    },
  );
  return Post;
};
