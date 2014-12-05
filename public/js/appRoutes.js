angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/sales.html',
			controller: ''
		})
        .when('/sales', {
            templateUrl: 'views/sales.html',
            controller: ''
        })    
        .otherwise({
            redirectTo: '/'
        });
	$locationProvider.html5Mode(true);

}]);