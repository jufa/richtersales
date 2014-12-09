angular.module('SalesController', []).controller('SalesController', function($scope, $log, SalesService) {


    var promise = SalesService.getData();
     promise.then(
          function(payload) { 

              $scope.salesData = payload.data;

               var x = d3.scale.linear()
                        .domain([0, d3.max($scope.salesData)])
                        .range([0, 800]);

               d3.select(".chart")
                  .selectAll("div")
                  .data($scope.salesData)
                  .enter().append("div")
                  .style("width", function(d) { return d * 20 + "px"; })
                  .text(function(d) { return d>3?d+' items':d; });    
          },
          function(errorPayload) {
              $log.error('failure loading sales data', errorPayload);
          });


});