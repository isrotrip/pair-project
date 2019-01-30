'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    name: DataTypes.STRING
  }, {});
  Tag.associate = function(models) {
    Tag.belongsToMany(models.Food, {through: models.Foodtag, foreignKey: 'tagId'});
  };
  return Tag;
};