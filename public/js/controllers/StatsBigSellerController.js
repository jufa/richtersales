angular.module('StatsBigSellerController', []).controller('StatsBigSellerController', function($q, $scope, $log, SalesService, ProductService) {

    
    var promise = SalesService.getTopSellers();
    var topSellersData;
    var max = 10;
    var startTime = new Date().getTime();

    
     promise.then(
          function(payload) { 
              topSellersData = payload.data;
              return promise;
          })
     .then(
         function(payload) {
             
             // now that the top sellers are loaded in from their webservice, 
             // let us get some product data and populate the top three with image url and names, too:
             // see: http://blog.xebia.com/2014/02/23/promises-and-design-patterns-in-angularjs/
             
             // for now lets get the top 3 products. we will query the service in parallel and 
             // listen for alll threee promises to return:
             
             //TODO: wouldnt it be nice to specify the top sellers max as a passed param to
             // getTopSellers(max). Yes it would, we will partially implement this:
             
             var promises = [];
             if( max > payload.data.length) max = payload.data.length;
             for (var i = 0; i < max; i++) {
                 var p = ProductService.getProduct(payload.data[i].product_id);
                 promises.push(p);
             }
         
             return $q.all(promises);
        
         })
     .then(
        function(payload){
            var tmp = [];
            var i=0;
            angular.forEach(payload, function(eachPayload) {
                //add some specif sales from our first query:
                eachPayload.data.product_id = topSellersData[i].product_id;
                eachPayload.data.quantity = topSellersData[i].quantity;
                tmp.push(eachPayload.data);
                i++;
            });
            //$log.info('combined result?:',tmp);
            $scope.queryTime = new Date().getTime() - startTime;
            $scope.topSellers = tmp; 
        });
});