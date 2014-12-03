var nvd3 = require('nvd3');

var createSimpleGraphHtml(dataJson) {
    var html = '';
    return html;
}

module.exports = {
    retrieveOrders:function (orderRequest, orderResponse, dataUrl) {
        console.log('app.retrieveOrders...');
        request({
            url: dataUrl,
            json: true
        }, function (dataError, dataResponse, dataBody) {
            if (!dataError && dataResponse.statusCode === 200) {
                processOrderResponse(orderRequest, orderResponse, dataError, dataResponse, dataBody);
            }
        });
    }
};
