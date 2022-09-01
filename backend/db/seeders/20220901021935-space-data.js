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
    return queryInterface.bulkInsert('Spaces', [
      { name: 'Food', icon: 'https://cdn.iconscout.com/icon/premium/png-256-thumb/pet-food-2384782-1995078.png', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Humans', icon: 'https://img.freepik.com/vector-premium/personas-mascotas-caracter-dueno-mascota-perro-hombre-ama-su-animal-lindo-adorable-animal-domestico_93083-1789.jpg?w=2000', description: 'The humans in our lives can be difficult to understand at times. This is a space for pups to better understand our beloved humans!', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Advice', icon: 'https://media.istockphoto.com/vectors/cute-little-dog-wondering-cartoon-character-vector-id1026093846?k=20&m=1026093846&s=612x612&w=0&h=9Cw3V06qAvIBnRcghl_iXNPr7ahQqSdxUX5eKulI74I=', description: 'Need help making a decision? Or simply need someone to tell you if your outfit looks good? This is the space for your pressing questions!', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Biology', icon: 'https://image.shutterstock.com/image-vector/biology-research-vector-workspace-science-260nw-360465005.jpg', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Fashion and Style', icon: 'https://fashionmagazine.com/wp-content/uploads/2020/12/TikaTheIggy-Web01-480x320-c-top.jpg', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Video Games', icon: 'https://image.shutterstock.com/image-vector/cute-dog-gaming-vector-icon-260nw-1741212953.jpg', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Travel', icon: 'https://assets.traveltriangle.com/blog/wp-content/uploads/2019/07/Dog-cover.jpg', createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Spaces', null, []);
  }
};
