angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/pulse.html',
			controller: ''
		})
        .when('/sales', {
            templateUrl: 'views/sales.html',
            controller: ''
        })    
        .when('/pulse', {
            templateUrl: 'views/pulse.html',
            controller: ''
        })
        .when('/block', {
            templateUrl: 'views/block.html',
            controller: ''
        }) 
        .otherwise({
            redirectTo: '/'
        });
	$locationProvider.html5Mode(true);

}]);




