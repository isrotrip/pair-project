const router = require('express').Router();
const Model = require('../../models');

router.get('/', (req, res) => {
    let err = req.query.error ? req.query.error : undefined;
    let msg = req.query.msg ? req.query.msg : undefined;
    res.render('./register/register.ejs', {err: err, msg: msg});
})

router.post('/', function (req, res) {
    let databaru = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        address: req.body.address,
        deposit: 0,
        role: 'buyer'
    }
    Model.User.create(databaru)
        .then(function (data) {
            res.redirect('/?msg=Register Success!');
        })
        .catch(function (err) {
            res.redirect(`/register/?error=${err}`);
        })
})



module.exports = router;