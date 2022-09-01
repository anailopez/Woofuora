'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reply = sequelize.define('Reply', {
    content: DataTypes.STRING,
    answerId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  Reply.associate = function(models) {
    // associations can be defined here
  };
  return Reply;
};