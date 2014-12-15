angular.module('SalesController', []).controller('SalesController', function($scope, $log, SalesService) {


    //helper function:
    function rgbToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }
    
    var promise = SalesService.getData();
     promise.then(
          function(payload) { 

              $scope.salesData = payload.data;

			  //parse date data so we hide sales on duplicate days
			  var prevDate='',
			      date='';
			
			  for (var i=0; i < payload.data.length; i++) {
					date = Date.parse(payload.data[i].date).toString('MMM dd');
					if (date === prevDate ) {
						payload.data[i].printDate = '';
					} else {
						payload.data[i].printDate = date;
						prevDate = date;
					}
			  }

               var x = d3.scale.linear()
                        .domain([0, d3.max($scope.salesData)])
                        .range([0, 800])
                        

               var bars = d3.select(".bars")
         			.selectAll("div")
                  	.data($scope.salesData)
                  	.enter();

				var labels = d3.select(".labels")
		  			.selectAll("div")
             		.data($scope.salesData)
		           	.enter();

				bars.append("div")
				  .attr("class","chart-bar")
                  .style("width","400px")
                  .transition()
                  .delay(function(d, i) { return i*100; })
                  .style("width", function(d) { return d.qty * 20 + "px"; })
                  .text(function(d) { return d.qty>3?d.qty+' items':d.qty; });
                  
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
				
	
	
					//.append("div")
	              //.text(function(d) { return d>3?d+' items':d.qty; });
				
    		
          },
          function(errorPayload) {
              $log.error('failure loading sales data', errorPayload);
          });


});