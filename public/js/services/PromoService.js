//public/js/services/PromoService.js

angular.module('PromoService', []).factory('PromoService', ['$http', '$log', '$q', function( $http, $log, $q) {   
    
                                                            
        var getPromos = function() {
            
            var apiPromise = $http.get('/api/promotions/');
            
            return apiPromise;
            
        };
    
    
        var addPromo = function(promo) {
            
            var apiPromise = $http.post('/api/promotions/',promo);
            
            return apiPromise;
            
        };
    
        
        // a factory has to return something to passinternal Angular assertions
        // see: https://docs.angularjs.org/error/$injector/undef
        var methods = {};
        methods.getPromos = getPromos;
        methods.addPromo = addPromo;
        return methods;                           
    
}]);