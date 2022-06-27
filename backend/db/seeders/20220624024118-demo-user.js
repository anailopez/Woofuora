'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        username: 'Goldie',
        email: 'goldie@pupmail.com',
        hashedPassword: bcrypt.hashSync('password'),
        icon: 'https://static.wikia.nocookie.net/animalcrossing/images/8/83/Goldie_NH.png/revision/latest?cb=20200625095858',
        bio: "Hi, I'm Goldie! :)"
      },
      {
        username: 'Bones',
        email: 'bones@pupmail.com',
        hashedPassword: bcrypt.hashSync('password2'),
        icon: 'https://static.wikia.nocookie.net/animalcrossing/images/2/2b/Bones_NH.png/revision/latest?cb=20200803113508',
        bio: 'Napping is when I do my best thinking'
      },
      {
        username: 'Cookie',
        email: 'cookie@pupmail.com',
        hashedPassword: bcrypt.hashSync('password3'),
        icon: 'https://static.wikia.nocookie.net/animalcrossing/images/d/d9/Cookie_NH.png/revision/latest?cb=20200802135053',
        bio: "I think it's fab to show off your individuality through fashion!"
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
