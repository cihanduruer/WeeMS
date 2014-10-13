/*make a req to http://freegeoip.net/json/85.215.64.2*/

class IPLocationService{
	$http = null;
	$q = null;
	constructor($http, $q){
		console.log("IPLocation Service Constructor");
		this.$http = $http;
		this.$q = $q;
	}
    GetLocation(IPAddress:any){
		console.log("Making a request");
		var request = this.$http({
                        method: "get",
                        url: "http://freegeoip.net/json/" + IPAddress
                    });
					
		return(request.then( this.handleSuccess, this.handleError ) );	
    }
	
	handleSuccess(response) {
		console.log("Request is succeded");
		return( response.data );
	}
	
	handleError(response) {
		console.log("Request didn't succeded");
        if (!angular.isObject( response.data ) || ! response.data.message) {
            return(this.$q.reject( "An unknown error occurred." ) );
        }

        // Otherwise, use expected error message.
        return(this.$q.reject( response.data.message ) );
	}
}

services.service('ipLocationService',IPLocationService);