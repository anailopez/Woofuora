'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reply = sequelize.define('Reply', {
    content: {
      type: DataTypes.STRING(2000),
      allowNull: false
    },
    answerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Reply.associate = function (models) {
    // associations can be defined here
    Reply.belongsTo(models.Answer, { foreignKey: 'answerId' });
    Reply.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return Reply;
};
