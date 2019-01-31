const router = require('express').Router();
const Model = require('../../models');

router.post('/', (req, res) => {
  let err = req.query.error ? req.query.error : undefined;
  let msg = req.query.msg ? req.query.msg : undefined;
  let filteredFoods = [];
  Model
    .Food
    .findAll({where: {
      originMadeFrom: req.body.type
    }})
    .then(foods => {
      filteredFoods = foods;
      return Model.Food.findAll()
    })
    .then(foods => {
      let uniqueObj = {};
        foods.forEach(food => {
          uniqueObj[food.originMadeFrom] = 0;
        })
      const filter = Object.keys(uniqueObj);
      res.render('./home/index.ejs', {err: err, msg: msg, data: filteredFoods, filter: filter, selected : req.body.type});
    })
    .catch(err => {
      res.send(err);
    })
})
  
module.exports = router;