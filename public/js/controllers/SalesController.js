angular.module('SalesController', []).controller('SalesController', function($scope, $log, SalesService, PromoService) {


    //helper function:
    function rgbToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }
    
    function renderChart() {
        
     //parse date data so we hide sales on duplicate days
          var prevDate='',
              date='';

          for (var i=0; i < $scope.salesData.length; i++) {
                date = new Date($scope.salesData[i].date).toString('MMM dd yyyy');
                if (date === prevDate ) {
                    $scope.salesData[i].printDate = '';
                } else {
                    $scope.salesData[i].printDate = date;
                    prevDate = date;
                }
          }


        var x = d3.scale.linear()
                .domain([0, d3.max($scope.salesData)])
                .range([0, 800]);

       var bars = d3.select(".bars")
            .selectAll("div")
            .data($scope.salesData)
            .enter();

        var labels = d3.select(".labels")
            .selectAll("div")
            .data($scope.salesData)
            .enter();

        bars.append("div")
          .attr("class", function(d) {
            if(d.qty !== undefined) {
                return "chart-bar"; 
            } else if(d.name !== undefined){
                return "chart-promo";
            }
        })
          .style("width","400px")
          .transition()
          .delay(function(d, i) { return i*100; })
          .style("width", function(d) { 
            if(d.qty !== undefined) {
                return d.qty * 20 + "px"; 
            } else if(d.name !== undefined){
                return '100%';
            }

          })
          .text(function(d) { 
            if(d.qty !== undefined) {
                return d.qty>3?d.qty+' items':d.qty; 
            } else if (d.name !== undefined) {
                return '( '+d.platform+' )'+d.name+' ';
            }
          });

          /*
          .style("background-color", function(d) { 
             var colorMagnitude = Math.min(255,d.qty*20+50);
             return rgbToHex(colorMagnitude*0.5, colorMagnitude, colorMagnitude); 
          })
          */


        labels.append("div")
              .attr("class",function(d) {
                  return d.printDate === "" ? "chart-label" : "chart-label top-bar";
               })
              .text(function(d) {
                    return d.printDate; 
         });
    }
    
    var startTime = new Date().getTime();
    var promise = SalesService.getData();
    
    promise.then(
          function(payload) { 
              $scope.queryTime = new Date().getTime() - startTime ;
              $scope.salesData = payload.data;

          },
          function(errorPayload) {
              $log.error('failure loading sales data', errorPayload);
          });
    
    promise.then(
        function(payload){
            var promoPromise = PromoService.getPromos();
            return promoPromise;
        },
        function(errorPayload) {
            $log.error('failure loading sales data', errorPayload);
        })
    .then(
        function(payload){
            $scope.promos = payload.data;
            //go through all these and update:
            $scope.salesData = SalesService.mergeChartDataWithPromoData( $scope.salesData, $scope.promos );
            renderChart();
        
        },
        function(errorPayload) {
            $log.error('failure loading promo data', errorPayload);
        });
        
});