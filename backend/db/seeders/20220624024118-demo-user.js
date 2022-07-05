'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        username: 'Goldie',
        email: 'goldie@pupmail.com',
        hashedPassword: bcrypt.hashSync('password'),
        icon: 'https://64.media.tumblr.com/2206fc2e2cda85c2665272325f379abf/16269c81eb0192d2-9a/s500x750/697b78ed6b2250dcaa8253af6e6e5c5d6250e8ba.jpg',
        bio: "Hi, I'm Goldie! :) I love treats and meeting new pups!"
      },
      {
        username: 'Bones',
        email: 'bones@pupmail.com',
        hashedPassword: bcrypt.hashSync('password2'),
        icon: 'https://64.media.tumblr.com/3ae900cffded435d14722e7cebb02ece/16269c81eb0192d2-11/s540x810/0779b9b377475536095f1dd68ca3230bfea433ca.jpg',
        bio: 'Napping is when I do my best thinking'
      },
      {
        username: 'Cookie',
        email: 'cookie@pupmail.com',
        hashedPassword: bcrypt.hashSync('password3'),
        icon: 'https://64.media.tumblr.com/8a40cc9b1555965a53c8fbb582fcf7fb/16269c81eb0192d2-97/s540x810/50b895ea521320f56ee16e0cc088b2fe6421ba03.jpg',
        bio: "I think it's fab to show off your individuality through fashion!"
      },
      {
        username: 'Hershey',
        email: 'hershey@pupmail.com',
        hashedPassword: bcrypt.hashSync('password4'),
        icon: 'https://64.media.tumblr.com/5b4dfde14c191fa132c43d63d1056a80/16269c81eb0192d2-78/s540x810/b5a981349103aa1465834fdb9a4f11c393ed65cd.jpg',
        bio: "My one true passion in life is food"
      },
      {
        username: 'Peach',
        email: 'peach@pupmail.com',
        hashedPassword: bcrypt.hashSync('password5'),
        icon: 'https://64.media.tumblr.com/b847e91cdee999389fb6afc2cd0d22a4/16269c81eb0192d2-2a/s540x810/358aa1f6bcf77f6a24738fa04fff53a251b56578.jpg',
        bio: "I love my mom and getting lots of attention! :)"
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Goldie', 'Bones', 'Cookie', 'Hershey', 'Peach'] }
    }, {});
  }
};
