'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    deposit: DataTypes.NUMBER,
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
  User.associate = function(models) {
    User.hasMany(models.FoodTransaction);
  };
  return User;
};