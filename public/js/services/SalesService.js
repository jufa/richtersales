//public/js/services/SalesService.js


angular.module('SalesService', []).factory('SalesService', ['$http', '$log', '$q', function( $http, $log, $q ) {
    
    
    // helper for sorting:
    // TODO: why isnt the database API doing this for us, huh?!
    function SortByQtyFunction(b, a){
        var aQty = a.quantity;
        var bQty = b.quantity;
        return ((aQty < bQty) ? -1 : ((aQty > bQty) ? 1 : 0));
    }
    
    function sortByQty(array) {
        array.sort(SortByQtyFunction);
        return array;
    }
    
    
    

    
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
        
        //$log.info('getLineItems : '+orderJson);
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
        
        
        //$log.info('SalesService::getJsonData');
        
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
    
    
    
    
    
    /**
     * helper function to process a single order line item from the api:
     * @returns int
     */
    var updateTopSellersWithOrder = function(orderJson, topSellersData) {
        
        //$log.info('updateTopSellersWithOrder');
        
        var orderedProducts =[]; //[ {product_id:int, qty
        var i, j;//loops counters [int]
        var totalQuantity = 0;
        var match = false; // matching product flag BOOL
        var productId, qty; //hold current line item data
        
        if (orderJson === undefined) return null;
        if (topSellersData === undefined) topSellerData = [];
        
        for (i=0; i<orderJson.line_items.length; i++) {
            
            
            productId = orderJson.line_items[i].product_id;
            qty = orderJson.line_items[i].quantity;
            
            if(productId === undefined) continue;
            
            match = false;
            
            //run through our tally list and update quantities: if the 
            //TODO: This should be it's own function a tthe very least and ideally a DB query 
            //through Mongoose with its own api call /sales/top/[int]
            
            //$log.info('finding : ' + productId);
            
            for ( j = 0; j < topSellersData.length; j++){
                
                if( Number(topSellersData[j].product_id) === Number(productId) ) {
                    //$log.info('match: '+topSellersData[j].product_id, productId);
                    //foudn the product, add the order qty to its running total:
                    topSellersData[j].quantity = Number(topSellersData[j].quantity) + Number(qty);
                    match = true;
                }
            }
            //if(match===true)$log.info('found');
            if (match === false) {
                //$log.info('adding : ' + productId);
                //$log.info('no match, adding item'+ productId);
                //this item is not yet been seen in the data: add it:
                 topSellersData.push( {product_id: productId, quantity:qty} );
            }   
        }
        
       
        
        //return totalQuantity;// orderJson.line_items.length;  
        
    };
    
    
    
    
    
    /**
     * take data from the webservice and parse it so our controller 
     * doesn't have to have parsing code in it: Proper separation of concerns.
     *
     * @returns array of int needed for the charting
     *
     */
    
    var parseTopSellersData = function(data) {
        
        var orderObject = data;
        var order;  
        var topSellersData = [];

        for (var i = 0; i < orderObject.orders.length; i++){
            order = orderObject.orders[i];
            updateTopSellersWithOrder(order, topSellersData);
        }
        
        sortByQty(topSellersData);
        
        $log.info(topSellersData);
        
        //return the list of product_id and sales count

        return topSellersData;

    };
    
    
    
    
    
    
    
    /**
     * go get data from our webservice and find the top 3 sales items using horrible JSON data parsing for now
     * Proper separation of concerns requires we sepearate data procesing from the Controller module
     *
     * @returns array of top sellers object data
     *
     */
    var getTopSellersData = function () {
        //$log.info('SalesService::getTopSellersData');
        
        var deferred = $q.defer();
        
        var apiPromise = $http.get('/api/sales');
       
        apiPromise.success(function(data) { 
            deferred.resolve({data: parseTopSellersData(data)});
        });
       
       apiPromise.error(function(msg, code) {
          $log.error(msg, code);
       });
        
        return deferred.promise; 
    };
    
                                                          
    
    
    
    
    //Public interface:
    return {     
        
        getTopSellers:function(){
            //returns the top 3 sales items.
            //TODO:make 3 n, as in getTopSellers(n);
            //TODO: Move this to a MongooseDB query on the server side, so we are not always 
            //making this a big API call
            //returns: promise.data = array of {product_id:'', quanity:''}
            //$log.info('SalesService::getTopSellers');
            var promise = getTopSellersData();
            return promise;        
        },
        getData:function(){
            //$log.info('SalesService::getData');
            var chartDataPromise = getJsonData();
            return chartDataPromise;
        }
    };

}]);
