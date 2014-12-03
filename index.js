var express = require('express');
var request = require('request');

var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  // get orders:
    var orderUrl = 'https://eb269bfed4883478fcf75acac385014d:b4baf3405ca909e683fb80892511a914@jufa-development-shop.myshopify.com/admin/orders.json';
    var orderObject = app.retrieveOrders(request, response, orderUrl);    
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});

app.retrieveOrders = function (orderRequest, orderResponse, dataUrl) {
    console.log('app.retrieveOrders...');
    request({
        url: dataUrl,
        json: true
    }, function (dataError, dataResponse, dataBody) {
        if (!dataError && dataResponse.statusCode === 200) {
            app.processOrderResponse(orderRequest, orderResponse, dataError, dataResponse, dataBody);
        }
    });
};

app.processOrderResponse = function (orderRequest, orderRepsonse, dataError, dataResponse, dataBody) {
    var orderObject = dataBody;
    var resp = '';
    var order, i;
    if(orderObject !== undefined){
        resp = '<h1>Orders Received</h1><ul>';
        for (i = 0; i < orderObject.orders.length; i++){
            order = orderObject.orders[i];
            resp += '<li>' + order.created_at + app.getLineItems(order) + '</li>';
        }
        resp += '</ul>';
    } else {
        resp = '<h1>No Orders Found</h1>';
    }
    orderRepsonse.send(resp);
};

//return the <ul> line items of a order
app.getLineItems = function(orderJson) {
    if (orderJson === undefined) return null;
    var orderHtml = '<ul>';
    var i;
    for (i = 0; i < orderJson.line_items.length; i++) {
        orderHtml += '<li>' + orderJson.line_items[i].name + '[' + orderJson.line_items[i].fulfillable_quantity + ']' + '</li>';
    }
    orderHtml+='</ul>';
    return orderHtml;
};