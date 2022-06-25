'use strict';
module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answer', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    questionId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {});
  Answer.associate = function (models) {
    // associations can be defined here
    Answer.belongsTo(models.Question, { foreignKey: 'questionId' });
    Answer.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return Answer;
};
