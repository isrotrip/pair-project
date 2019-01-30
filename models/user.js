'use strict';
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
      beforeValidate:(user, options) => {
        return User
          .findOne({where: {id: {[Op.ne]: user.id}, email: user.email}})
          .then(data => {
            if(data){
              throw new Err('email sudah terdaftar!');
            }
            else {
              return User.findOne({where: {id: {[Op.ne]: user.id}, username: user.username}});
            }
          })
          .then(data => {
            if(data){
              throw new Err('username sudah terdaftar!');
            }
            else {
              let secret = (Math.floor(Math.random()*10000)+1).toString();
              const hash =
              crypto
                .createHmac('sha256', secret)
                .update(`${user.password}`)
                .digest('hex');
              user.password = hash;
              user.salt = secret;
            }
          })
          .catch(err => {
            throw err;
          })
      }
    }
  });
  User.associate = function(models) {
    User.hasMany(models.FoodTransaction);
    User.belongsToMany(models.Food, {through: models.FoodTransaction, foreignKey: 'UserId'});
  };
  return User;
};