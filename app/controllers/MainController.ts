module Controllers{
    export class MainController {
        constructor($window, $scope, $http, logService:LogService, ipLocationService : IPLocationService){
            $scope.vm = this;
            $scope.ScreenWidth = $window.innerWidth;
            $scope.ScreenHeight = $window.innerHeight;
            
            console.log("Loading remote data");
            loadRemoteData();
            
            function loadRemoteData() {
                console.log("Accesing to Geo Location Service");
                
                ipLocationService.GetLocation("").then(
                    function(geoLocationResult) {
                        applyRemoteData(geoLocationResult);
                    }
                );
            }
            
            function applyRemoteData(geoLocationResult) {
                console.log("Applying Data : " + geoLocationResult.country_name + " - " + geoLocationResult.city);
                $scope.GeoLocationResult = geoLocationResult;
            }
        }
    }
}