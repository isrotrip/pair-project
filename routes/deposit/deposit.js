const router = require('express').Router();
const Model = require('../../models');
const isOwner = require('../../helpers/userRole');


router.get('/', (req, res, next) => {
    if(isOwner(req.session.userLogIn, 'owner')){
        next()
    }
    else {
        res.redirect('/?error=only owner who can access deposits'); 
    }
    },
    (req, res) => {
        let err = req.query.error ? req.query.error : undefined;
        let msg = req.query.msg ? req.query.msg : undefined;
        Model
          .User
          .findAll({where: {role: 'buyer'}})
          .then(buyers => {
              res.render('./deposit/deposit-list.ejs', {buyers: buyers, err: err, msg: msg})
          })
          .catch(err => {
              res.send(err);
          });
    })

router.get('/:id', (req, res, next) => {
    if(isOwner(req.session.userLogIn, 'owner')){
        next()
    }
    else {
        res.redirect('/?error=only owner who can access deposits'); 
    }}, 
    (req, res)  => {
    Model.User.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(function (datas) {
            res.render('./deposit/deposit.ejs', { data: [datas] })
        })
        .catch(function (err) {
            res.send(err)
        })
})

router.post('/:id', function (req, res) {
    Model.User.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(function (user) {
        const update = {deposit: (user.deposit + Number(req.body.deposit))}
        return Model.User.update(update, {where:{id: user.id}});
    })
    .then(() => {
        res.redirect('/deposit/?msg=deposit added successfully');
    })
    .catch(function (err) {
        res.send(err)
    })
})



module.exports = router;