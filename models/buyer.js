'use strict';
const crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
  const Buyer = sequelize.define('Buyer', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    deposit: DataTypes.INTEGER,
    salt: DataTypes.STRING
  }, {
    hooks: {
      beforeValidate:(user, options) => {
        let secret = (Math.floor(Math.random()*10000)+1).toString();
        const hash =
        crypto
          .createHmac('sha256', secret)
          .update(`${user.password}`)
          .digest('hex');
        user.password = hash;
        user.salt = secret;
      }
    }
  });

  Buyer.associate = function(models) {
    Buyer.hasMany(models.FoodTransaction);
  };
  
  return Buyer;
};