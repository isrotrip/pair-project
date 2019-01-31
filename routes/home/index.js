const router = require('express').Router();
const Model = require('../../models');

router.get('/', (req,res) => {
  let err = req.query.error ? req.query.error : undefined;
  let msg = req.query.msg ? req.query.msg : undefined;
  Model
    .Food
    .findAll()
    .then(foods => {
      res.send(req.session.userLogIn)
      res.render('./home/index.ejs', {err: err, msg: msg});
    })
    .catch(err => {
      res.send(err);
    })
})

module.exports = router;