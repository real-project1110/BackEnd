'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Schedules', {
      scheduleId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      start: {
        type: Sequelize.STRING,
      },
      end: {
        type: Sequelize.STRING,
      },
      color: {
        type: Sequelize.STRING,
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
      groupId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'GroupLists',
          key: 'groupId',
        },
        onDelete: 'cascade',
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
    await queryInterface.dropTable('Schedules');
  },
};
