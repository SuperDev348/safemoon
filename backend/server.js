const express = require('express');
const logger = require('morgan');
const cors = require('cors');
// const session = require('express-session')
const auth=require('./routes/auth');
const coin = require('./routes/coin');
const users = require('./routes/users');
const price = require('./routes/price');
const wallet = require('./routes/wallet');

const bodyParser = require('body-parser');
const mongoose = require('./config/database'); //database configuration
const { authenticate, authError } = require('./app/middleware');
const Config= require('./config/config');
const { port, secretKey } = Config;
// store price every 30s
const priceController = require('./app/api/controllers/price');
setInterval(function () {
  priceController.createPrice()
}, 30000)
const walletController = require('./app/api/controllers/wallet');
const coinController = require('./app/api/controllers/coin');
// const wallets = walletController.getAll()
setInterval(function () {
  walletController.getAll().then((wallets) => {
    for (let wallet of wallets) {
      coinController.create(wallet.walletId)
    }
  })
}, 30000)

const app = express();

app.set('secretKey', secretKey); // jwt secret token

// connection to mongodb
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(logger('dev'));
// Set body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors({ origin: '*' }));

app.get('/api', function(req, res){
res.json({"status" : "Server Running ...."});
});

// public route

app.use('/api/auth', auth);
// private route
//app.use('/api', [authenticate, authError]);
app.use('/api/users',[authenticate, authError], users);
app.use('/api/coin', coin);
app.use('/api/price', price);
app.use('/api/wallet', wallet);
// handle errors
app.use(function(err, req, res, next) {
	console.log(err);
	
  if(err.status === 404)
  	res.status(404).json({message: "Not found"});
  else	
    res.status(500).json({message: "Something looks wrong :( !!!"});
});

app.listen(port, function(){
	console.log('server listening on port ',port);
});