'use strict';
module.exports = (sequelize, DataTypes) => {
  const Space = sequelize.define('Space', {
    name: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    icon: {
      type: DataTypes.STRING(500),
      allowNull: false
    }
  }, {});
  Space.associate = function (models) {
    // associations can be defined here
    Space.hasMany(models.Question, { foreignKey: 'spaceId' })
  };
  return Space;
};
