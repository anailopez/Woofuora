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
      { ownerId: '2', spaceId: '3', title: "Does anyone else's human say that their paws smell like Doritos?", description: "I clean my paws all the time but my human still says they smell like Doritos... Is is just me? Any other doggies experience this?", createdAt: new Date(), updatedAt: new Date() },
      { ownerId: '1', spaceId: '4', title: "Why does napping in the sun feel SO GOOD?", description: "I nap all over my human's house but a nap by the window under direct sunlight just hits different", image: "https://img.freepik.com/free-photo/jack-russell-terrier-is-sleeping-sun-light-near-window_87910-6486.jpg?w=2000", createdAt: new Date(), updatedAt: new Date() },
      { ownerId: '3', spaceId: '1', title: "What do y'all like better: Greenies or Dentastix?", description: "My human is convinced she needs to buy me some of those teeth-cleaning treats (even though I brush my teeth aaaall the time) and she wants me to choose which ones I'd like. Any suggestions?", createdAt: new Date(), updatedAt: new Date() },
      { ownerId: '5', spaceId: '1', title: "I ripped my brand new toy! HELP!", description: "My human just gave me a new stuffed toy and I got a little carried away playing with it... there's stuffing all over the house and she'll be home soon, what do I do?!", image: "https://i.pinimg.com/736x/b6/f8/f4/b6f8f47fddee8143ec50417d80c83cd6.jpg", createdAt: new Date(), updatedAt: new Date() },
      { ownerId: '4', spaceId: '2', title: "Why am I not allowed on the couch?", description: "All of the humans in the house get to sit on the couch, but they tell me I'm not allowed up there. :( Anyone else experience this?", createdAt: new Date(), updatedAt: new Date() },
      { ownerId: '5', spaceId: '2', title: "Anyone know of a good trick to get your human to give you more food?", createdAt: new Date(), updatedAt: new Date() }
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
