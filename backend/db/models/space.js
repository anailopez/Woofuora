'use strict';
module.exports = (sequelize, DataTypes) => {
  const Space = sequelize.define('Space', {
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    icon: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: true
    }
  }, {});
  Space.associate = function (models) {
    // associations can be defined here
    Space.hasMany(models.Question, { foreignKey: 'spaceId' });
    Space.belongsTo(models.User, { foreignKey: 'ownerId' });
  };
  return Space;
};
