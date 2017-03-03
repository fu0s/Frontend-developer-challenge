define(['app', 'angular', 'gessCmnModule'], function(app, angular, gessCmnModule) {
  app.controller("TestingController", ['MessageHandler','$scope','$http', 'fileUpload','$httpBackend', function(MessageHandler,$scope,$http, fileUpload,$httpBackend) {

	  
	  $.getJSON("appResources/JSON.json", function(json) {
		    console.log(json.data); 
		    $scope.objects = json.data;
		   
		});
	
	 
	  //display list video
	  $scope.display = function () {
		  fillList($scope.numberPerPage , 1);
		  getTotalPages($scope.numberPerPage , $scope.objects.length);
	  }
	  //go to page
	  $scope.goTo = function(index ){
		 
		  if(index == 0){
			 
			  var j = 0 ;
			  for(i=1 ; i < $scope.pages.length ; i++){
				  if($scope.pages[i].clicked == true){
					  $scope.pages[i].clicked = false ;
					  $scope.pages[i].paginationClass = "w3-hover-black"
					  j=i-1;
				  }
			  }
			  if(j==0){
				  j = 1 ;
			  }
			  $scope.pages[j]=pageClicked( j , true);
			  $scope.pages[j].paginationClass = "w3-hover-black w3-red";
			  fillList($scope.numberPerPage , j);
		  }else if (index == ($scope.totalPages + 1) ){
			  
			  var j = 0 ;
			  for(i=1 ; i < $scope.pages.length - 1 ; i++){
				  if($scope.pages[i].clicked == true){
					  $scope.pages[i].clicked = false ;
					  $scope.pages[i].paginationClass = "w3-hover-black"
					  j=i+1;
				  }
			  }
			  if(j==($scope.totalPages + 1)){
				  j = $scope.totalPages  ;
			  }
			  $scope.pages[j]=pageClicked( j , true);
			  $scope.pages[j].paginationClass = "w3-hover-black w3-red";
			  fillList($scope.numberPerPage , j);
		  }else {
			  
			  for(i=1 ; i < $scope.pages.length ; i++){
				  if($scope.pages[i].clicked == true){
					  $scope.pages[i].clicked = false ;
					  $scope.pages[i].paginationClass = "w3-hover-black"
				  }
			  }
			  $scope.pages[index]=pageClicked( index , true);
			  $scope.pages[index].paginationClass = "w3-hover-black w3-red";
			  fillList($scope.numberPerPage , index);
		  }
	  }
	function fillList(size , index){
		 $scope.ListDisplay = [] ;
		if($scope.objects.length > 1){
			for(i = 0  ; i < size ; i++  ){
				$scope.ListDisplay[i] = $scope.objects[i + (index - 1)*size];
			}
		}
		else{
			alert("Object is NULL");
		}
		
	}
	
	function getTotalPages(numberPerPage , size){
		$scope.pages = [] ;
		$scope.totalPages = size / numberPerPage ;
		$scope.pages[0]=pageClicked( ">>" , false);
		for(i = 0  ; i < $scope.totalPages ; i++  ){
			$scope.pages[i+1]=pageClicked( i+1 , false);
		}
		$scope.pages[$scope.totalPages + 1]=pageClicked( "<<" , false);
	}
	
	function pageClicked ( number, clicked){
		var page = {
			    number: number,
			    clicked: clicked,
				paginationClass: "w3-hover-black",
			  };
		
		return page ;
		
	}
	 
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
	
  }]);
  
  app.directive('pagesDirective', function($compile) {
	    return {
	    	scope: {
	            key: '=',
	            
	        },
	     template: '<div  ng-repeat="page in key track by $index"><br>'
		        	+'<li><a ng-click="goTo($index)" ng-class="page.paginationClass" >{{page.number}}</a></li>'
		        	+'</div>    ',
	      replace: true,
	      link: function($scope, element) {
	    	  $scope.$watch('pages', function() {
		    	 
		        var el = angular.element('<span/>');
		       
		        $compile(el)($scope);
		        element.empty();
		        element.append(el);
		     
		        },true)
		       
	           
	      }
	    }
	  });
  
});
