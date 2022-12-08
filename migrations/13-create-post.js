'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Posts', {
      postId: {
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
      content: {
        type: Sequelize.STRING(1234),
        allowNull: true,
      },
      category: {
        type: Sequelize.INTEGER,
      },
      commentCount: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('Posts');
  },
};
