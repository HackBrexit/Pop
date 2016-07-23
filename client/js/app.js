var popApp = angular.module("popApp", ["ngRoute"]);

popApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'partials/login.html',
        controller: 'LoginCtrl'
      }).
      when('/register', {
        templateUrl: 'partials/register.html',
        controller: 'RegisterCtrl'
      }).
      otherwise({
        redirectTo: '/home'
      });
}]);
