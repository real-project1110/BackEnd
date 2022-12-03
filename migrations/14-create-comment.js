'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Comments', {
      commentId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      groupId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'GroupLists',
          key: 'groupId',
        },
        onDelete: 'cascade',
      },
      groupUserId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'GroupUsers',
          key: 'groupUserId',
        },
        onDelete: 'cascade',
      },
      postId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Posts',
          key: 'postId',
        },
        onDelete: 'cascade',
      },
      comment: {
        type: Sequelize.STRING,
      },
      likeCount: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Comments');
  },
};
