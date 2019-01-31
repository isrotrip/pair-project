const router = require('express').Router();
const Model = require('../../models');

router.get('/:id', function (req, res) {
    // res.send('ok')
    Model.User.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(function (datas) {
            res.render('./editUser/editUser.ejs', { data: [datas] })
            // res.send(datas)
        })
        .catch(function (err) {
            res.send('NOT FOUND')
        })
})

router.post('/:id', function (req, res) {
    var dataUser = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        address: req.body.address,
        newpassword: req.body.newpassword,
    }
    Model.User.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(function (data) {
            return Model.User.update(dataUser)
            // res.send(data)
        })
        .then(function (data) {
            res.send('masuk')
        })
        .catch(function (err) {
            res.send(err)
        })
    // res.send(dataUser)
})



module.exports = router;