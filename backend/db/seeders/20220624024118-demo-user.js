'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        username: 'Goldie',
        email: 'goldie@pupmail.com',
        hashedPassword: bcrypt.hashSync('password'),
        icon: '/media/icons/default-icon.png',
        bio: "Hi, I'm Goldie! :)"
      },
      {
        username: 'Bones',
        email: 'bones@pupmail.com',
        hashedPassword: bcrypt.hashSync('password2'),
        icon: '/media/icons/default-icon.png',
        bio: 'Napping is when I do my best thinking'
      },
      {
        username: 'Cookie',
        email: 'cookie@pupmail.com',
        hashedPassword: bcrypt.hashSync('password3'),
        icon: '/media/icons/default-icon.png',
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
