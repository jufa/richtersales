var express = require('express');
var request = require('request');

var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.send('Hello RichterSales!');
  // get orders:
    urderUrl = 'https://eb269bfed4883478fcf75acac385014d:b4baf3405ca909e683fb80892511a914@jufa-development-shop.myshopify.com/admin/orders.json';
    //app.retrieveOrders(orderUrl);
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});


app.retrieveOrders(url){
    request({
        url: url,
        json: true
    }, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            response.send('Orders Retrieved:\n---\n'+body) // Print the json response
        }
    })
}