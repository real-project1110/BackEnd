'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ChattingLists', {
      chattingId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      roomId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'ChattingRooms',
          key: 'roomId',
        },
      },
      groupUserId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'GroupUsers',
          key: 'groupUserId',
        },
      },
      message: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ChattingLists');
  },
};
