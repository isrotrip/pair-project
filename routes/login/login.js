const router = require('express').Router();
const Model = require('../../models');
const crypto = require('crypto');

router
  .route('/')
  .get((req, res) => {
    let err = req.query.error ? req.query.error : undefined;
    let msg = req.query.msg ? req.query.msg : undefined;
    res.render('./login/login.ejs', {err: err, msg: msg});
  })
  .post((req, res, next) => {
    Model
      .User
      .findOne({where: {username: req.body.username}})
      .then(user => {
        if(user){
          const hash =
          crypto
            .createHmac('sha256', user.dataValues.salt.toString())
            .update(`${req.body.password}`)
            .digest('hex');
          if(hash === user.password){
            req.session.userLogIn = user;
            res.redirect('/?msg=Login Success')
          }
          else{
            res.redirect('/login/?error=Wrong Password');
          }
        }
        else {
          res.redirect('/login/?error=Wrong Username');
        }
      })
      .catch(err => {
        res.send(err);
      })
  })


module.exports = router;