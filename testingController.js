define(['app', 'angular', 'gessCmnModule'], function(app, angular, gessCmnModule) {
  app.controller("TestingController", ['MessageHandler','$scope','$http', 'fileUpload','$httpBackend', function(MessageHandler,$scope,$http, fileUpload,$httpBackend) {

	// Accordion
	  $scope.myFunction = function (id) {
	      var x = document.getElementById(id);
	      if (x.className.indexOf("w3-show") == -1) {
	          x.className += " w3-show";
	          x.previousElementSibling.className += " w3-theme-d1";
	      } else { 
	          x.className = x.className.replace("w3-show", "");
	          x.previousElementSibling.className = 
	          x.previousElementSibling.className.replace(" w3-theme-d1", "");
	      }
	  }
	  $scope.ListDisplay = [] ;
	  $scope.show = false ;
	  $scope.showFive = false ;
	  $scope.showTwo = false ;
	  //display list video
	  $scope.display = function () {
		  $scope.show = true ;
		 
		  if($scope.numberPerPage == "25"){
			  $scope.showTwo = true ;
			   fillList(25 , 1);
		  }else if($scope.numberPerPage == "10"){ 
			  $scope.showFive = true ;
			  $scope.showTwo = true ;
			   fillList(10 , 1);
		  }
		 
	  }
	  $.getJSON("appResources/JSON.json", function(json) {
		    console.log(json.data[0]); 
		    $scope.objects = json.data;
		   
		});

	function fillList(size , index){
		for(i = 0  ; i < size ; i++  ){
			$scope.ListDisplay[i] = $scope.objects[i + (index - 1)*size];
		}
	}
	 
	
  }]);
  
 
  
});
