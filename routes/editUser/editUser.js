const router = require('express').Router();
const Model = require('../../models');
const isOwner = require('../../helpers/userRole');

router.get('/', (req, res, next) => {
    if(req.session.userLogIn){
        next()
    }
    else {
        res.redirect('/?error=you must login first'); 
    }    
    }, (req, res) => {
    Model.User.findOne({
        where: {
            id: req.session.userLogIn.id
        }
    })
        .then(function (datas) {
            res.render('./editUser/editUser.ejs', { data: [datas] })
            // res.send(datas)
        })
        .catch(function (err) {
            res.send(err)
        })
})

router.post('/:id', function (req, res) {
    const dataUser = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        address: req.body.address
    }
    Model.User.checkPassword(req.body.password, req.session.userLogIn.id)
        .then(function (status) {
            if(status){
                dataUser.password = req.body.newpassword;
                Model.User.update(dataUser, {where: {id: req.session.userLogIn.id}})
            }
        })
        .catch(function (err) {
            res.send(err)
        })
        //c5de18
    // res.send(dataUser)
})



module.exports = router;