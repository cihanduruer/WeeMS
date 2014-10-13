/// <reference path="./reference.ts" />

var app = angular.module('MyApp',['ngRoute','controllers','services','directives']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'partials/index',
        controller: 'MainController'
    }).otherwise({
        redirectTo: '/'
    });
}]).config(['$locationProvider', function($locationProvider) {
    $locationProvider.html5Mode(true);
}]);