const router = require('express').Router();
const Model = require('../../models');

router.get('/', (req, res) => {
    res.render('./register/register.ejs')
})

router.post('/', function (req, res) {
    let databaru = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        address: req.body.address,
        deposit: req.body.deposit
    }
    Model.User.create(databaru)
        .then(function (data) {
            res.redirect('/')

        })
        .catch(function (err) {
            res.send('NOT FOUND')
        })
})



module.exports = router;