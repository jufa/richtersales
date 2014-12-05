//server side
var request = require('request');

var processOrderResponse = function (orderRequest, orderRepsonse, dataError, dataResponse, dataBody) {
    var orderObject = dataBody;
    var resp = '';
    var order, i;
    if(orderObject !== undefined){
        resp = '<h1>Orders Received</h1><ul>';
        for (i = 0; i < orderObject.orders.length; i++){
            order = orderObject.orders[i];
            resp += '<li>' + order.created_at + getLineItems(order) + '</li>';
        }
        resp += '</ul>';
    } else {
        resp = '<h1>No Orders Found</h1>';
    }
    orderRepsonse.send(resp);
};

    //return the <ul> line items of a order
var getLineItems = function(orderJson) {
    if (orderJson === undefined) return null;
    var orderHtml = '<ul>';
    var i;
    for (i = 0; i < orderJson.line_items.length; i++) {
        orderHtml += '<li>' + orderJson.line_items[i].name + '[' + orderJson.line_items[i].quantity + ']' + '</li>';
    }
    orderHtml+='</ul>';
    return orderHtml;
};

//returns out Json data as parsed from shopify web service
var parseJson = function(orderJson) {
    var jsonString = '';
    
    if (orderJson === undefined) return jsonString;
    var i;
    for (i = 0; i < orderJson.line_items.length; i++) {
        //;
    }
    jsonString = orderJson;
    return jsonString;
};

module.exports = {
    retrieveOrders:function (orderRequest, orderResponse, dataUrl) {
        request({
            url: dataUrl,
            json: true
        }, function (dataError, dataResponse, dataBody) {
            if (!dataError && dataResponse.statusCode === 200) {
                //processOrderResponse(orderRequest, orderResponse, dataError, dataResponse, dataBody);
                orderResponse.setHeader('Content-Type', 'application/json');
               
               // orderResponse.send(parseJson(dataBody).stringify({ a: 1 }));
                 orderResponse.send(dataBody);
            }
        });
    }
};


