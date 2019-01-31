const router = require('express').Router();
const Model = require('../../models');

router.get('/', (req, res) => {
    // Model.FoodTransaction.findAll()
    Model.FoodTransaction.findOne({
        where: {
            Id: 1
        }
    })
        .then(function (datas) {
            res.send(datas)
            // res.render('./checkTransaction/checkTransaction.ejs', { data: datas })
            // res.send(datas)
        }).catch(function (err) {
            res.send(err)
        })
})

module.exports = router;