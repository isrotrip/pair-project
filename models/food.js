'use strict';
module.exports = (sequelize, DataTypes) => {
  const Food = sequelize.define('Food', {
    name: DataTypes.STRING,
    originMadeFrom: DataTypes.STRING,
    price: DataTypes.INTEGER,
    uniqueness: DataTypes.STRING,
    rating: DataTypes.INTEGER
  }, {});
  Food.associate = function(models) {
    // associations can be defined here
  };
  return Food;
};