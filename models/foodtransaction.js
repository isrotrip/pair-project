'use strict';
module.exports = (sequelize, DataTypes) => {
  const FoodTransaction = sequelize.define('FoodTransaction', {
    FoodId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    userRating: DataTypes.INTEGER,
    amount: DataTypes.INTEGER
  }, {});

  FoodTransaction.associate = function (models) {
    FoodTransaction.belongsTo(models.User)
    FoodTransaction.belongsTo(models.Food)
  };

  return FoodTransaction;
};