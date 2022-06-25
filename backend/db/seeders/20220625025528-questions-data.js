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
    return queryInterface.bulkInsert('Questions', [
      { ownerId: '2', title: "Does anyone else's owner say that their paws smell like Doritos?", description: "I clean my paws all the time but my owner still says they smell like Doritos... Is is just me? Any other doggies experience this?", createdAt: new Date(), updatedAt: new Date() },
      { ownerId: '1', title: "Why does napping in the sun feel SO GOOD?", description: "I nap all over my human's house but a nap by the window under direct sunlight justs hits different!", createdAt: new Date(), updatedAt: new Date() },
      { ownerId: '3', title: "What do y'all like better: Greenies or Dentastix?", description: "My human is convinced she needs to buy me some of those teeth-cleaning treats (even though I brush my teeth aaaall the time) and she wants me to choose which ones I'd like. Any suggestions?", createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Questions', null, []);
  }
};
