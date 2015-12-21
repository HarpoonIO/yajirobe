'use strict';

(function () {
  var app = angular.module('myApp', ['ngRoute', 'myApp.Controllers']);

  app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when("/test", {
      templateUrl: "Angular/Views/mainView.html",
      controller: "MainController"
    }).otherwise({
      templateUrl: "Angular/Views/mainView.html",
      controller: "MainController" 
    });
  }]);



})();