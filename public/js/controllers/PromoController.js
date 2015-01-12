angular.module('PromoController', []).controller('PromoController', function($scope, $log, PromoService) {
    
    $scope.promoPlatform = "";
    $scope.promoName = "";
    $scope.promoDateString = "";
    $scope.promoDate = new Date();
    $scope.promoDetails = "";
    $scope.status = "";
    $scope.alertClass = "";
    
    $scope.platformList = [{
      id: 0,
      label: 'none specified',
      group: 'other'
    }, {
      id: 1,
      label: 'facebook post',
      group: 'social media'
    }, {
      id: 2,
      label: 'facebook ad',
      group: 'social media'
    }, {
      id: 3,
      label: 'Twitter tweet',
      group: 'Social Media'
    }, {
      id: 4,
      label: 'Pinterest Post',
      group: 'Social Media'
    }, {
      id: 5,
      label: 'Live Event',
      group: 'MS media'
    }, {
      id: 6,
      label: 'YouTube video',
      group: 'Social Media'
    }, {
      id: 7,
      label: 'TV Spot',
      group: 'MS media'
    }
            
  ];

$scope.promoFormSubmit = function() {
    //send it to the promo webservice via promoController:
    var promo = {};
    promo.name = $scope.promoName;
    promo.platform = $scope.promoPlatform.label;
    promo.details = $scope.promoDetails;
    promo.date = new Date($scope.promoDateString);  
    
     var promise = PromoService.addPromo(promo);
     promise.then(
          function(payload) { 
              $scope.status = "Promo Added!";
              $scope.alertClass = "alert-success";
          },
          function(errorPayload) {
              $scope.status = "There was a problem saving this promo!";
              $scope.alertClass = "alert-danger";
          });
    
  };
    
});                                        