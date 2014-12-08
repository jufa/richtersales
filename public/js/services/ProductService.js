angular.module('ProductService', []).factory('ProductService', ['$http', '$log', '$q', function( $http, $log, $q ) {

    
        
    /**
     * take data from the webservice and parse it so our controller 
     * doesn't have to have parsing code in it: Proper separation of concerns.
     *
     * @returns array of int needed for the charting
     *
     */
    
    var parseProductData = function(data) {
        
        var productObject = data;
        
        //get name:
        productObject.name = data.product.title;
        
        //get medium image using what we know of Shopify image storage methods (CAUTION!)
        productObject.image = data.product.image.src ;
        var tmp = productObject.image.split('.jpg');
        tmp[0]+='_medium.jpg';
        productObject.image = tmp[0];

        return productObject;

    };
    
    
    
    /**
     * go get data from our webservice and find the top 3 sales items using horrible JSON data parsing for now
     * Proper separation of concerns requires we sepearate data procesing from the Controller module
     *
     * @returns object containing product data we care about.
     *
     */
    var getProductData = function (productId) {
        //$log.info('ProductService::getProductData with id:',productId);
        
        var deferred = $q.defer();
        
        var apiPromise = $http.get('/api/product/'+productId);
       
        apiPromise.success(function(data) { 
            //$log.info( 'ProductService::getProductData returning promise with: ',parseProductData(data));
            deferred.resolve({data: parseProductData(data)});
        });
       
       apiPromise.error(function(msg, code) {
          $log.error(msg, code);
       });
        
        return deferred.promise; 
    };
    
    
    //Public interface:
    return {     
    
        //returns: promise.data = {some product KV pairs as detailed below}
        getProduct:function(productId){
            //$log.info('ProductService::getProduct with id: ',productId);
            var promise = getProductData(productId);
            return promise;        
        }
    };

}]);
                                                                