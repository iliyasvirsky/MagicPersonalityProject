// example module for interacting with watson backend from the frontend

angular.module('MP.watson', [])

.controller('watController',  function ($scope, Wat) {
  
  $scope.data = {};

  $scope.data.test = "initial data"

  $scope.getWat = function (bigData){
    Wat.callWat(bigData).then((watsonData) =>{
      $scope.data = watsonData;
    })
  };

  // initiate the call once you have the data
  // $scope.getWat('very long text');

  $scope.watApiTest = function (bigData){

    Wat.getWatsonDataTest(bigData).then((watsonData) =>{
      $scope.data.test = watsonData;
    })
  };

  // $scope.watApiTest('very long text');
});