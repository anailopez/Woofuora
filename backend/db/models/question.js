'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    spaceId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {});
  Question.associate = function (models) {
    // associations can be defined here
    Question.belongsTo(models.User, { foreignKey: 'ownerId' });
    Question.hasMany(models.Answer, { foreignKey: 'questionId', onDelete: 'CASCADE', hooks: true });
    Question.belongsTo(models.Space, { foreignKey: 'spaceId' })
  };

  return Question;
};
