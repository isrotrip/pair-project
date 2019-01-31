const router = require('express').Router();
const Model = require('../../models');

router.get('/', (req, res, next) => {
    
  if(req.session.userLogIn){
      next()
  }
  else {
      res.redirect('/?error=You must login first'); 
  }    
  },function(req,res){
  Model.User.findOne({
    where: {
        id:req.session.userLogIn.id
    }
})
    .then(function (data) {
        res.render('./delete/delete.ejs',{ data: data })
    })
    .catch(function (err) {
        res.send(err)
    })
})

router.post('/', (req, res, next) => {
  if(req.session.userLogIn){
      next()
  }
  else {
      res.redirect('/?error=You must login first'); 
  }    
  },function(req,res){
  Model.User.destroy({
    where: {
        id: req.session.userLogIn.id
    }
})
    .then(function (datas) {
      req.session.userLogIn = null;
      res.redirect('./?msg=Your account has been deleted');
    })
    .catch(function (err) {
      res.send(err)
    })


})

 
module.exports=router
