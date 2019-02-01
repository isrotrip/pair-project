const express = require('express');
const router = express.Router();
const Model = require('../../models');

router.get('/', (req, res, next) => {
    if(req.session.userLogIn){
        if(req.session.userLogIn.role === 'owner'){
            next();
        }
        else{
            res.redirect('/?error=Only owners that can access this feature');
        }
    }
    else{
        res.redirect('/?error=Only owner that can access this feature');
    }
    }, function (req, res) {
    Model.Food.findAll({ order: [['id']] })
        .then(function (data) {
            res.render('./food/allfoods.ejs', { data: data })
        })
        .catch(function (err) {
            res.send(err)
        })
})

router.get('/edit/:id', function (req, res) {
    Model.Food.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(function (datas) {

            res.render('./food/idfoods.ejs', { data: [datas] })

        })
        .catch(function (err) {
            res.send(err)
        })
})


router.post('/edit/:id', function (req, res) {
    var datafoods = {
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
            res.send(err)
        })
})

router.get('/delete/:id', function (req, res) {
    Model.Food.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(function (data) {
            res.redirect('/foods')
        })
        .catch(function (err) {
            res.send(err)
        })
})

router.get('/add', function (req, res) {
    res.render('./food/addfoods.ejs')
})


router.post('/add', function (req, res) {
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
            res.send(err)
        })
})

module.exports = router