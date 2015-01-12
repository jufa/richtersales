//server side
var request = require('request');

// models  =================================================
var PromoModel     = require('./app/models/PromoModel');

module.exports = {

    getProductDetails: function (orderRequest, orderResponse, dataUrl) {
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
     
    retrieveOrders: function (orderRequest, orderResponse, dataUrl) {
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
    },
    
    addPromo: function (request, response) {
        var promo;
        //todo: any reason we have to be pulling these painfully from the body?
        promo = new PromoModel({
            name: request.body.name,
            date: request.body.date,
            details: request.body.details,
            platform: request.body.platform
        });
        promo.save(function(err) {
            if (!err) {
                return true;
            } else {
                //todo: console log is not error handling! Add something real here as soon as we know what that is.
                console.log(err);
                return false;
            }
        });      
        
        return response.send(promo);
    },
    
    retrievePromos: function (req, res) {
        //.find({}).sort({date: 'descending'}).exec(function(err, docs) { ... })
        return PromoModel.find({}).sort({date: 'descending'}).exec(function (err, data) {
            if (!err) {
                    res.jsonp(data);
            } else {
                    //TODO: you call this error handling?
                    console.log(err);
            }
        });
    }
};


