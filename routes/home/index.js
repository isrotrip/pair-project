const router = require('express').Router();
const Model = require('../../models');

router.get('/', (req,res) => {
  let err = req.query.error ? req.query.error : undefined;
  let msg = req.query.msg ? req.query.msg : undefined;
  Model
    .Food
    .findAll()
    .then(foods => {
      let uniqueObj = {};
        foods.forEach(food => {
          uniqueObj[food.originMadeFrom] ? uniqueObj[food.originMadeFrom]++ : uniqueObj[food.originMadeFrom] = 1;
        })
      const filter = Object.keys(uniqueObj);
      const values = Object.values(uniqueObj);
      res.render('./home/index.ejs', {err: err, msg: msg, data: foods, filter: filter, selected: undefined, values: values});
    })
    .catch(err => {
      res.send(err);
    })
})

module.exports = router;