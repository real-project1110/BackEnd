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
      comment: {
        type: Sequelize.STRING,
      },
       createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
<<<<<<< HEAD
        defaultValue: Sequelize.fn('NOW'),
=======
        defaultValue: Sequelize.fn("NOW"),
>>>>>>> 83a610d4126d7f447f81c82f1026dce5ecc90bbe
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
<<<<<<< HEAD
        defaultValue: Sequelize.fn('NOW'),
=======
        defaultValue: Sequelize.fn("NOW"),
>>>>>>> 83a610d4126d7f447f81c82f1026dce5ecc90bbe
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Comments');
  },
};
