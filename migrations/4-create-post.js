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
      title: {
        type: Sequelize.STRING,
      },
      content: {
        type: Sequelize.STRING,
      },
      postImg: {
        type: Sequelize.STRING,
      },
      category: {
        type: Sequelize.INTEGER,
      },
      commentCount: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('Posts');
  },
};
