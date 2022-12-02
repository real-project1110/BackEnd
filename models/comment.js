'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
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
      this.belongsTo(models.Post, {
        foreignKey: 'postId',
        targetKey: 'postId',
      });
      this.belongsTo(models.GroupList, {
        foreignKey: 'groupId',
        targetKey: 'groupId',
      });
      this.hasMany(models.CommentLike, {
        foreignKey: 'commentId',
        sourceKey: 'commentId',
      });
    }
  }
  Comment.init(
    {
      commentId: {
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
        onDelete: 'cascade',
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
      comment: {
        type: DataTypes.STRING,
        allowNull: false,
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
      modelName: 'Comment',
    },
  );
  return Comment;
};
