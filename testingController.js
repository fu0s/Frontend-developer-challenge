define(['app', 'angular', 'gessCmnModule'], function(app, angular, gessCmnModule) {
  app.controller("TestingController", ['MessageHandler','$scope','$http', 'fileUpload','$httpBackend', function(MessageHandler,$scope,$http, fileUpload,$httpBackend) {

	
	  
	  $.getJSON("appResources/JSON.json", function(json) {
		    console.log(json.data); 
		    $scope.objects = json.data;
		   
		});
	
	  //initialization
	  $scope.likesFilter = "No";
	  //display list video
	  $scope.display = function () {
		  fillList($scope.numberPerPage , 1);
		  if($scope.searchText == null){
			  getTotalPages($scope.numberPerPage , $scope.objects.length);

		  }else {
			  getTotalPages($scope.numberPerPage , $scope.ListRecherche.length);

		  }
		  $scope.pages[1]=pageClicked( 1 , true);
		  $scope.pages[1].paginationClass = "w3-hover-black w3-red";
		 
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
		  }else if (index == $scope.totalPages + 1 ){
			  
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
		 $scope.ListRecherche = [] ;
		if($scope.objects.length > 1){
			if($scope.likesFilter == "Yes"){
				//sorting function : a-b for ascending order and b-a for descending order
				 $scope.objects.sort(function(a, b) {
					    return parseFloat(b.metadata.connections.likes.total) - parseFloat(a.metadata.connections.likes.total);
					});
			  }else{
				  $.getJSON("appResources/JSON.json", function(json) {
					    console.log(json.data); 
					    $scope.objects = json.data;
					   
					});
			  }
			 if($scope.searchText == null){
				 for(i = 0  ; i < size ; i++  ){
						$scope.ListDisplay[i] = $scope.objects[i + (index - 1)*size];
					}
			  }else{
				  $scope.ListRecherche = [];
				  var j = 0 ;
				  for(i = 0  ; i < $scope.objects.length ; i++  ){
					  if($scope.objects[i].description != null){
						  var n = $scope.objects[i].description.search($scope.searchText);
					  }
					  if(n != -1){
						  $scope.ListRecherche[j] = $scope.objects[i];
						  j=j+1;
					  }	
					}
				  var newSize = 0 ;
				  if($scope.ListRecherche.length < size){
					  newSize = $scope.ListRecherche.length ;
				  }else{
					  newSize = size
				  }
				  for(i = 0  ; i < newSize ; i++  ){
						if($scope.ListRecherche[i + (index - 1)*size] != null)$scope.ListDisplay[i] = $scope.ListRecherche[i + (index - 1)*size];
						 
					}
			  }
			
			 
		}
		else{
			alert("Object is NULL");
		}
		
	}
	
	function getTotalPages(numberPerPage , size){
		$scope.pages      = [] ;
		$scope.totalPages = 0;
		var totalPages    = 0;
		totalPages = size / numberPerPage ; /* (size / numberPerPage).toFixed(0) */
		$scope.totalPages = setTotalPages(totalPages);
		$scope.pages[0]=pageClicked( ">>" , false);
		var i=0;
		while(i < $scope.totalPages){
		
			$scope.pages[i+1]=pageClicked( i+1 , false);
			i = i+1 ;
		}
		$scope.pages[i + 1]=pageClicked( "<<" , false);
	}
	
	function pageClicked ( number, clicked){
		var page = {
			    number: number,
			    clicked: clicked,
				paginationClass: "w3-hover-black",
			  };
		
		return page ;
		
	}
	
	function setTotalPages(x){
		var i = 0 ;
		while (i<x){
			i = i + 1 ;
		}
		
		return i ;
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
