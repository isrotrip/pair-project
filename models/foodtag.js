'use strict';
module.exports = (sequelize, DataTypes) => {
  const Foodtag = sequelize.define('Foodtag', {
    tagId: DataTypes.INTEGER,
    foodId: DataTypes.INTEGER
  }, {});
  Foodtag.associate = function(models) {
    
  };
  return Foodtag;
};