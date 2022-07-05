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
    return queryInterface.bulkInsert('Answers', [
      { userId: '1', questionId: '1', body: "Yes, my owner totally says the same about my paws! Well actually, she says they smell like Fritos LOL", createdAt: new Date(), updatedAt: new Date() },
      { userId: '2', questionId: '2', body: "I don't know why this is but I agree! Napping in the sun is THE BEST FEELING. Any scientist doggies out there know the reason why?", createdAt: new Date(), updatedAt: new Date() },
      { userId: '1', questionId: '3', body: "I think Greenies are sooooo yummy! My owner used to buy Dentastix but when she switched to Greenies I was like WOW what an upgrade! (no shade to Dentastix lol) :)", createdAt: new Date(), updatedAt: new Date() },
      { userId: '3', questionId: '2', body: "The vet once told my human that napping in the sun regulates our temperature and gives us tons of vitamin D. Get that vitamin D boosted, y'all!", createdAt: new Date(), updatedAt: new Date() },
      { userId: '1', questionId: '4', body: "Oh no! I usually hide before my human gets home when something like this happens!", image: "https://www.petplace.com/static/99b6f1da8726bc694218f907b60ef896/c23ac/shutterstock_1521897122.jpg", createdAt: new Date(), updatedAt: new Date() },
      { userId: '4', questionId: '6', body: "I always hit my human with one of these and it does the trick 99% of the time: ", image: "https://d1dd4ethwnlwo2.cloudfront.net/wp-content/uploads/2019/06/PuppyDogEyes1.jpg", createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Answers', null, []);
  }
};
