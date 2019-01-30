'use strict';

const fs = require('fs')

module.exports = {
  up: (queryInterface, Sequelize) => {
    let data = fs.readFileSync('./files/data.csv', { encoding: 'utf-8' })
    data = data.split('\n').slice(1)
    let hasil = []
    for (var i = 0; i < data.length - 1; i++) {
      data[i] = data[i].split(',')
      hasil.push({
        name: data[i][0],
        originMadeFrom: data[i][1],
        price: data[i][2],
        rating: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }

    return queryInterface.bulkInsert('Food', hasil, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Food', null, {});
  }
};
