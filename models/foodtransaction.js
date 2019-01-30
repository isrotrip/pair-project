'use strict';
module.exports = (sequelize, DataTypes) => {
  const FoodTransaction = sequelize.define('FoodTransaction', {
    FoodId: DataTypes.INTEGER,
    BuyerId: DataTypes.INTEGER,
    buyerRating: DataTypes.INTEGER
  }, {});

  FoodTransaction.associate = function(models) {
    FoodTransaction.belongsTo(models.Buyer)
  };

  return FoodTransaction;
};