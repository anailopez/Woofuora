'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Replies', [
      { content: "I think I'll do the same.. Thank you!!!", answerId: '5', userId: '5', createdAt: new Date(), updatedAt: new Date() },
      { content: 'Ooooh I like this! Will be trying this soon, thank you!', answerId: '6', userId: '5', createdAt: new Date(), updatedAt: new Date() },
      { content: "LOL I thought my paws smelling like Doritos was a me problem!! Good to know I'm not alone!", answerId: '1', userId: '3', createdAt: new Date(), updatedAt: new Date() }
    ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Replies', null, [])
  }
};
