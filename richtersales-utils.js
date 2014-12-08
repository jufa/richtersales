//server side
var request = require('request');


module.exports = {
    getProductDetails:function (orderRequest, orderResponse, dataUrl) {
        request({
            url: dataUrl,
            json: true
        }, function (dataError, dataResponse, dataBody) {
            if (!dataError && dataResponse.statusCode === 200) {
                orderResponse.setHeader('Content-Type', 'application/json');
                orderResponse.send(dataBody);
            }
        });
    },
     
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


