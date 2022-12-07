'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostLike extends Model {
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
    }
  }
  PostLike.init(
    {
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
    },
    {
      sequelize,
      modelName: 'PostLike',
    },
  );
  PostLike.removeAttribute('id');
  return PostLike;
};
