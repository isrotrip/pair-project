var express = require('express')
const app = express()
var router = express.Router()
const ejs = require('ejs')
app.set('view engine', 'ejs')
const Model = require('../models')

router.get('/foods', function (req, res) {
    Model.Food.findAll({ order: [['id']] })
        .then(function (data) {
            // res.send(data)
            res.render('allfoods.ejs', { data: data })
        })
        .catch(function (err) {
            res.send('NOT FOUND')
        })
})
router.get('/foods/edit/:id', function (req, res) {
    Model.Food.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(function (datas) {

            res.render('idfoods.ejs', { data: [datas] })

        })
        .catch(function (err) {
            res.send('NOT FOUND')
        })
})


router.post('/foods/edit/:id', function (req, res) {
    var datafoods = {
        // FirstName: req.body.FirstName,
        name: req.body.name,
        originMadeFrom: req.body.originMadeFrom,
        price: req.body.price,
        uniqueness: req.body.uniqueness,
        rating: req.body.rating
    }
    Model.Food.update(datafoods, {
        where: {
            id: req.params.id
        }
    })
        .then(function () {
            res.redirect('/foods')
        })
        .catch(function (err) {
            res.send('tidak valid')
        })
    // res.send(datateachers)
})
router.get('/foods/delete/:id', function (req, res) {
    Model.Food.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(function (data) {
            res.redirect('/foods')
        })
        .catch(function (err) {
            res.send('NOT FOUND')
        })
})

router.get('/foods/add', function (req, res) {

    res.render('addfoods.ejs')
})


router.post('/foods/add', function (req, res) {
    var fooddata = {
        name: req.body.name,
        originMadeFrom: req.body.originMadeFrom,
        price: req.body.price,
        uniqueness: req.body.uniqueness,
        rating: 0

    }
    Model.Food.create(fooddata)
        .then(function (data) {
            res.redirect('/foods')
        })
        .catch(function (err) {
            res.send('NOT FOUND')
        })
    // res.send(fooddata)
})



module.exports = router