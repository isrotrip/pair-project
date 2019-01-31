'use strict';
const crypto = require('crypto')

module.exports = (sequelize, DataTypes) => {
  const Op = sequelize.Op;
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      isEmail: {
        args: true,
        msg: 'email format is wrong!'
      }
    },
    address: DataTypes.STRING,
    deposit: DataTypes.INTEGER,
    role: DataTypes.STRING,
    salt: DataTypes.STRING
  }, {
      hooks: {
        beforeValidate: (user, options) => {
          if (user.username.length < 6 && user.username.length > 20) {
            return new Error('password must have 6 - 20 length');
          }
          if (user.email.length > 30 && user.email.length < 8) {
            return new Error('password must have 8 - 30 length');
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
                return user.findOne({ where: { id: user.id } })
              }
            })
            .then(data => {
              let secret = '';
              if (data.salt) {
                secret = data.salt;
              }
              else {
                secret = (Math.floor(Math.random() * 10000) + 1).toString();
              }

              const hash =
                crypto
                  .createHmac('sha256', secret)
                  .update(`${user.password}`)
                  .digest('hex');
              user.password = hash;
              user.salt = secret;
            })
            .catch(err => {
              throw err;
            })
        },
        afterValidate: (user, options) => {
          return Model.User.findOne()
            .then(function (data) {
              console.log(data.password, user.password)
              if (data.password !== user.password) {
                throw 'wrong password'
              }
            })
            .catch(function (err) {
              throw err
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