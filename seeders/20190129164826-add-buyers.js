'use strict';
const fs = require('fs');
const crypto = require('crypto');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const buyerLists = [];
    let readData = fs.readFileSync('./files/buyers.csv', {encoding: 'utf-8'});
    readData = readData.split('\n');
    readData.forEach(data => {
      const randomMoney = Math.floor(Math.random()*1000000 + 10000);
      data = data.split(',');
      let secret = (Math.floor(Math.random()*10000)+1).toString();
        const hash =
        crypto
          .createHmac('sha256', secret)
          .update(data[1])
          .digest('hex');
        data[1] = hash;
        data[4] = secret;
      buyerLists.push({ 
        username: data[0],
        password: data[1],
        email: data[2],
        address: data[3],
        salt: data[4],
        deposit: randomMoney,
        createdAt: new Date,
        updatedAt: new Date
      })
    });
    return queryInterface.bulkInsert('Buyers', buyerLists);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Buyers', null, {});
  }
};
