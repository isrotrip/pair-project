'use strict';
module.exports = (sequelize, DataTypes) => {
  const Food = sequelize.define('Food', {
    name: DataTypes.STRING,
    originMadeFrom: DataTypes.STRING,
    price: DataTypes.INTEGER,
    rating: DataTypes.INTEGER
  }, {});
  Food.associate = function (models) {
    Food.hasMany(models.FoodTransaction);
    Food.belongsToMany(models.User, {through: models.FoodTransaction, foreignKey: 'FoodId'});
    Food.belongsToMany(models.Tag, {through: models.Foodtag, foreignKey: 'foodId'});
  };
  return Food;
};