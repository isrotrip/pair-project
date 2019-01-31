const router = require('express').Router();
const Model = require('../../models');

router.get('/:id', (req, res) => {
    // res.send('ok')
    Model.User.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(function (datas) {
            res.render('./editUser/editUser.ejs', { data: [datas] })
        })
        .catch(function (err) {
            res.send('NOT FOUND')
        })
})

router.post('/:id', function (req, res) {
    var dataUser = {
        deposit: Number(req.body.deposit)
    }
    Model.User.update(dataUser, {
        where: {
            id: req.params.id
        }
    })
        .then(function () {

            res.send('ok')
        })
        .catch(function (err) {
            res.send(err)
        })
    // res.send(dataUser)
})



module.exports = router;