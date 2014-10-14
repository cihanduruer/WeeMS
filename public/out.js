var services = angular.module('services', []);
var directives = angular.module('directives', []);
var testme;
(function (testme) {
    testme.html = '<div>Hey wazzup.</div>';
})(testme || (testme = {}));
var Controllers;
(function (Controllers) {
    var MainController = (function () {
        function MainController($window, $scope, $http, logService, ipLocationService) {
            $scope.vm = this;
            $scope.ScreenWidth = $window.innerWidth;
            $scope.ScreenHeight = $window.innerHeight;

            console.log("Loading remote data");
            loadRemoteData();

            function loadRemoteData() {
                console.log("Accesing to Geo Location Service");

                ipLocationService.GetLocation("").then(function (geoLocationResult) {
                    applyRemoteData(geoLocationResult);
                });
            }

            function applyRemoteData(geoLocationResult) {
                console.log("Applying Data : " + geoLocationResult.country_name + " - " + geoLocationResult.city);
                $scope.GeoLocationResult = geoLocationResult;
            }
        }
        return MainController;
    })();
    Controllers.MainController = MainController;
})(Controllers || (Controllers = {}));
directives.directive('testme', function () {
    return {
        restrict: 'EAC',
        template: testme.html
    };
});
var IPLocationService = (function () {
    function IPLocationService($http, $q) {
        this.$http = null;
        this.$q = null;
        console.log("IPLocation Service Constructor");
        this.$http = $http;
        this.$q = $q;
    }
    IPLocationService.prototype.GetLocation = function (IPAddress) {
        console.log("Making a request");
        var request = this.$http({
            method: "get",
            url: "http://freegeoip.net/json/" + IPAddress
        });

        return (request.then(this.handleSuccess, this.handleError));
    };

    IPLocationService.prototype.handleSuccess = function (response) {
        console.log("Request is succeded");
        return (response.data);
    };

    IPLocationService.prototype.handleError = function (response) {
        console.log("Request didn't succeded");
        if (!angular.isObject(response.data) || !response.data.message) {
            return (this.$q.reject("An unknown error occurred."));
        }

        return (this.$q.reject(response.data.message));
    };
    return IPLocationService;
})();

services.service('ipLocationService', IPLocationService);
var LogService = (function () {
    function LogService() {
    }
    LogService.prototype.log = function (msg) {
        console.log(msg);
    };
    return LogService;
})();

services.service('logService', LogService);
angular.module('controllers', []).controller(Controllers);
var app = angular.module('MyApp', ['ngRoute', 'controllers', 'services', 'directives']);

app.config([
    '$routeProvider',
    function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'partials/index',
            controller: 'MainController'
        }).otherwise({
            redirectTo: '/'
        });
    }
]).config([
    '$locationProvider',
    function ($locationProvider) {
        $locationProvider.html5Mode(true);
    }
]);
//# sourceMappingURL=out.js.map
