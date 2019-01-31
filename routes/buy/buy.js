const router = require('express').Router();
const Model = require('../../models');

router.get('/', function (req, res) {

    Model.Food.findAll()
        .then(function (datas) {

            res.render('./buy/buy.ejs', { data: datas })
            // res.send(datas)
        })
        .catch(function (err) {
            res.send('NOT SOUND')
        })
})


router.get('/:id', function (req, res) {
    let obj = {
        FoodId: req.params.id,
        BuyerId: 0,
        buyerRating: 0,
        amount: 1

    }
    Model.FoodTransaction.create(obj)
        .then(function (data) {
            // res.send(data)
            res.redirect('/buy')

        })
        .catch(function (err) {
            res.send('NOT FOUND')
        })
    // res.send(obj)
})

module.exports = router;