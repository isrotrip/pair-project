const router = require('express').Router();
const Model = require('../../models');

router.get('/', (req, res, next) => {
    if(req.session.userLogIn){
        next();
    }
    else{
        res.redirect('/?error=You must log in first');
    }
    }, (req,res) => {
        Model.FoodTransaction
            .findAll({
                where: {
                    UserId: req.session.userLogIn.id
                }
            })
            .then(function (datas) {
                res.render('./checkTransaction/checkTransaction.ejs', { data: datas })
            }).catch(function (err) {
                res.send(err)
            })
    }
    
)

module.exports = router;