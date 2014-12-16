
// server.js

// modules =================================================
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');

//app libs:
var rsutils = require('./richtersales-utils');

// configuration ===========================================
    
// config files
//var db = require('./config/db');

var dataSourceJson = 'https://eb269bfed4883478fcf75acac385014d:b4baf3405ca909e683fb80892511a914@jufa-development-shop.myshopify.com/admin/orders.json';
var productDataJson = 'https://eb269bfed4883478fcf75acac385014d:b4baf3405ca909e683fb80892511a914@jufa-development-shop.myshopify.com/admin/products/';

// set our port
var port = process.env.PORT || 8080; 
//app.set('port', port);

// connect to our mongoDB database 
// (uncomment after you enter in your own credentials in config/db.js)
// mongoose.connect(db.url); 

// get all data/stuff of the body (POST) parameters
// parse application/json 
app.use(bodyParser.json()); 

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override')); 

//provide route middleware for robots.txt as per http://stackoverflow.com/questions/15119760
app.use(function (req, res, next) {
    if ('/robots.txt' == req.url) {
        res.type('text/plain')
        res.send("User-agent: *\nDisallow: /");
    } else {
        next();
    }
});

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public')); 

// routes ==================================================
require('./app/routes')(app); // configure our routes

//TO do: move these to routes:

// server routes ===========================================================
// handle things like api calls
// authentication routes

// frontend routes =========================================================
// route to handle all angular requests

// get an instance of router
var router = express.Router();

// home page route (http://localhost:8080)
// about page route (http://localhost:8080/about)
router.get('/api', function(req, res) {
    res.send('Richtersales API root. <a href = "http://en.wikipedia.org/wiki/RSDL" >RSDL</a> ');	
});

router.get('/api/sales', function(request, response) {
  // get orders:
    var orderUrl = dataSourceJson;
    var orderObject = rsutils.retrieveOrders(request, response, orderUrl);    
});

router.get('/api/product/:product_id', function(request, response) {
  // get product details:
  var productUrl = productDataJson + request.params.product_id + '.json';
  var productDetails = rsutils.getProductDetails(request, response, productUrl);
});


router.get('/api/**', function(req, res) {
    res.send('Richtersales API root. <a href = "http://en.wikipedia.org/wiki/RSDL" >RSDL</a> ');	
});

router.get('/robots.txt', function(req, res) {
    res.send('');	
});

router.get('/**', function(req, res) {
   res.sendfile('./public/index.html');	
});



// apply the routes to our application
app.use('/', router);

/*
app.get('*', function(req, res) {
    res.sendfile('./public/index.html');
});
*/


// start app ===============================================
// startup our app at http://localhost:8080

/*

*/


app.listen(port);               

// expose app           
exports = module.exports = app;                         



