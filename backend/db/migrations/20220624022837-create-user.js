'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
      },
      email: {
        type: Sequelize.STRING(250),
        allowNull: false,
        unique: true
      },
      hashedPassword: {
        type: Sequelize.STRING.BINARY,
        allowNull: false
      },
      icon: {
        type: Sequelize.STRING,
        allowNull: true
      },
      bio: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};
