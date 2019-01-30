const express = require('express');
const session = require('express-session');

//req routes
const home = require('./routes/home/index.js');
const login = require('./routes/login/login.js');
const register = require('./routes/register/register.js');
const buy = require('./routes/buy/buy.js');
const deposit = require('./routes/deposit/deposit.js');
const editUser = require('./routes/editUser/editUser.js');
const checkTransaction = require('./routes/checkTransaction/checkTransaction.js');

//req helpers
const checkAvailable = require('./helpers/checkAvailable.js');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(session({'secret': 'hacktiv8'}));

//set helpers
app.locals.checkAvailable = checkAvailable;

//use routes
app.use('/', home);
app.use('/login', login);
app.use('/register', register);
app.use('/buy', buy);
app.use('/deposit', deposit);
app.use('/editUser', editUser);
app.use('/checkTransaction', checkTransaction);

app.listen(port, () => {
  console.log(`the connection is on the port ${port}`);
})