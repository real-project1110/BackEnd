'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    this.belongsTo(models.User,{
      foreignKey:'userId',
      targetKey:'userId',
    })
    this.belongsTo(models.GroupList,{
      foreignKey:'groupId',
      targetKey:'groupId',
    });

    }
  }
  Invite.init({
    inviteId: {
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
      onDelete: 'cascade',
    },
    groupId:{
      allowNull:false,
      type:DataTypes.INTEGER,
      references:{
        model : 'GroupList',
        key :'groupId',
      },
      onDelete: 'cascade',
    },
  }, {
    sequelize,
    modelName: 'Invite',
  });
  return Invite;
};