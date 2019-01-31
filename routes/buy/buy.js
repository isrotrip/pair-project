const router = require('express').Router();
const Model = require('../../models');

router.get('/', function (req, res, next) {
        if(req.session.userLogIn){
            next();
        } else {
            res.redirect('/?error=You must log in first');
        }
    }, (req, res) => {  
        Model.Food.findAll()
            .then(function (datas) {
                res.render('./buy/buy.ejs', { data: datas });
            })
            .catch(function (err) {
                res.send(err);
            })
})


router.post('/:id', function (req, res, next) {
    if(req.session.userLogIn){
        next();
    } else {
        res.redirect('/?error=You must log in first');
    }
    }, function (req, res) {
        req.body.rating
    let obj = {
        FoodId: req.params.id,
        UserId: req.session.userLogIn.id,
        userRating: Number(req.body.rating),
        amount: Number(req.body.amount)
    }
    let price = 0;
    let thisFood = {};
    let averageRating = 0;
    let totalTransaction = 0; 
    Model.Food.findOne({where: {id: obj.FoodId}})
        .then(food => {
            thisFood = food;
            price = food.price;
            if(price * obj.amount > req.session.userLogIn.deposit){
                throw 'Sorry your deposit doesn`t sufficient';
            }
            else {
                return Model.FoodTransaction.create(obj)
            }
        })
        .then(function (data) {
            totalTransaction = req.session.userLogIn.deposit - price * obj.amount;
            return Model.User.findOne({where: {id: req.session.userLogIn.id}});
        })
        .then(user => {
            user.deposit = totalTransaction
            return user.save();
        })
        .then(() => {
            return Model.FoodTransaction.findAll({where: {FoodId: req.params.id}})
        })
        .then(foodtransactions => {
            foodtransactions.forEach(foodtransaction => {
                averageRating += foodtransaction.userRating;
            })
            return thisFood.update({rating: averageRating/foodtransactions.length});
        })
        .then(() => {
            res.redirect('/buy/?msg=Sukses membeli makanan')
        })
        .catch(function (err) {
            res.send(err)
        })
})

module.exports = router;