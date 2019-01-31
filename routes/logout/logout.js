const router = require('express').Router();

router.get('/', (req, res) => {
  if(req.session.userLogIn){
    req.session.userLogIn = null;
    res.redirect('/?msg=Logout Success');
  }
  else{
    res.redirect('/?error=You haven\'t login yet');
  }
})

module.exports = router;