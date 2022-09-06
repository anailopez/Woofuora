'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Questions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ownerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Users' }
      },
      spaceId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'Spaces' }
      },
      title: {
        type: Sequelize.STRING(300),
        allowNull: false
      },
      description: {
        type: Sequelize.STRING(2000),
        allowNull: true
      },
      image: {
        type: Sequelize.STRING(500),
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Questions');
  }
};
