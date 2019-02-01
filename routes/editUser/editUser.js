const router = require('express').Router();
const Model = require('../../models');
const crypto = require('crypto');

router.get('/', (req, res, next) => {
    
    if(req.session.userLogIn){
        next()
    }
    else {
        res.redirect('/?error=You must login first'); 
    }    
    }, (req, res) => {
        let err = req.query.error ? req.query.error : undefined;
        let msg = req.query.msg ? req.query.msg : undefined;
    Model.User.findOne({
        where: {
            id: req.session.userLogIn.id
        }
    })
        .then(function (datas) {
            
            res.render('./editUser/editUser.ejs', { data: [datas] , err: err, msg: msg})
        })
        .catch(function (err) {
            res.send(err)
        })
})

router.post('/:id', (req, res, next) => {
    if(req.session.userLogIn){
        next()
    }
    else {
        res.redirect('/?error=You must login first'); 
    }    
    }, function (req, res) {
         
    Model
    .User
    .findOne({where: {username: req.body.username}})
    .then(user => {
        if(user){
            
        const hash =
        crypto
            .createHmac('sha256', user.salt)
            .update(`${req.body.password}`)
            .digest('hex');
        if(hash === user.dataValues.password){
            const hashNew =
        crypto
            .createHmac('sha256', user.salt)
            .update(`${req.body.newpassword}`)
            .digest('hex');
            user.username = req.body.username;
            user.password = hashNew;
            user.email = req.body.email;
            user.address = req.body.address;
            return user.save();
        }
        else{
            res.redirect('/editUser/?error=Wrong Password');
        }
    }})
    .then(() => {
        res.redirect('/?msg=Edit Success')
    })
    .catch(err => {
        res.send(err);
    })
})



module.exports = router;