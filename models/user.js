'use strict';
const crypto = require('crypto')

module.exports = (sequelize, DataTypes) => {
  const Op = sequelize.Op;
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    deposit: DataTypes.INTEGER,
    role: DataTypes.STRING,
    salt: DataTypes.STRING
  }, {
      hooks: {
        beforeValidate: (user, options) => {
          if (user.username.length < 2 || user.username.length > 20) {
            throw new Error('username must have 2 - 20 length');
          }
          if (user.email.length > 30 || user.email.length < 3) {
            throw new Error('email must have 3 - 30 length');
          }

          return User
            .findOne({ where: { id: { [Op.ne]: user.id }, email: user.email } })
            .then(data => {
              if (data) {
                throw 'email have been already taken!';
              }
              else {
                return User.findOne({ where: { id: { [Op.ne]: user.id }, username: user.username } });
              }
            })
            .then(data => {
              if (data) {
                throw 'username have been already taken!';
              }
              else {
                return User.findOne({ where: { id: user.id } })
              }
            })
            .then(data => {
                if(!data.salt){
                  let secret = (Math.floor(Math.random() * 10000) + 1).toString();
                const hash =
                  crypto
                    .createHmac('sha256', secret.toString())
                    .update(`${user.password}`)
                    .digest('hex');
                user.password = hash;
                user.salt = secret;                
              }
              return user;
            })
            .catch(err => {
              throw err;
            })
        }
      }
    });
  User.associate = function (models) {
    User.hasMany(models.FoodTransaction);
    User.belongsToMany(models.Food, { through: models.FoodTransaction, foreignKey: 'UserId' });
  };

  return User;
};