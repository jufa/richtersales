var express = require('express');
var request = require('request');
var rsutils = require('richtersales-utils');

var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  // get orders:
    var orderUrl = 'https://eb269bfed4883478fcf75acac385014d:b4baf3405ca909e683fb80892511a914@jufa-development-shop.myshopify.com/admin/orders.json';
    var orderObject = rsutils.retrieveOrders(request, response, orderUrl);    
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});

