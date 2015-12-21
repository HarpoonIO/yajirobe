(function() {

  var app = angular.module('myApp.Controllers', []);

  app.controller('MainController', ['$scope', function($scope) {
    $scope.message = "test...";
  }]);

  app.controller('HeadController', ['$scope', function($scope) {
    $scope.title = "TerrificTanks";
  }]);

})();
