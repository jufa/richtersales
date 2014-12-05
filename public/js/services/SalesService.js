//public/js/services/SalesService.js


angular.module('SalesService', []).factory('SalesService', ['$http', '$log', '$q', function( $http, $log, $q ) {
    
    //testing
    var getDummyData = function () {
        var data = [];    
        var i,val;

        for (i=0; i<100; i++){
            val = Math.random() * Math.random();
            data.push(Math.floor(val*42));
        }

        return data;
    };
    
    
    /**
     * helper function to process a single order line item from the api:
     * @returns int
     */
    var getLineItems = function(orderJson) {
        
        $log.info('getLineItems : '+orderJson);
        var i;
        var totalQuantity = 0;
        if (orderJson === undefined) return null;
        for (i=0; i<orderJson.line_items.length; i++) {
            totalQuantity += orderJson.line_items[i].quantity;
        }
        
        return totalQuantity;// orderJson.line_items.length;  
        
    };
    
    
    /**
     * take data from the webservice and parse it so our controller 
     * doesn't have to have parsing code in it: Proper separation of concerns.
     *
     * @returns array of int needed for the charting
     *
     */
    
    var parseApiData = function(data) {
        
        var orderObject = data;
        var order;  
        var chartData = [];

        for (var i = 0; i < orderObject.orders.length; i++){
            order = orderObject.orders[i];
            chartData.push(getLineItems(order));
        }

        return chartData;

    };
    
    
    /**
     * go get data from our webservice and process the result.
     * Proper separation of concerns requires we sepearate data procesing from the Controller module
     *
     * @returns array of int needed for the charting
     *
     */
    var getJsonData = function() {
        
        
        $log.info('SalesService::getJsonData');
        
        var deferred = $q.defer();
        
        var apiPromise = $http.get('/api/sales');
       
        apiPromise.success(function(data) { 
            deferred.resolve({data: parseApiData(data)});
        });
       
       apiPromise.error(function(msg, code) {
          $log.error(msg, code);
       });
        
        return deferred.promise; 
        
    };
    
                                                          
    
    return {     
        
        getData:function(){
            $log.info('SalesService::getData');
            var chartDataPromise = getJsonData();
            return chartDataPromise;
        }
    };

}]);
