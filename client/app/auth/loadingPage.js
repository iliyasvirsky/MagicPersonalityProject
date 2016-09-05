angular.module('MP.loadingPage', [])

.controller('loadingPageController', function ($scope, $window, $location, Auth, YouTube) {

    var randomtext = ``;
    var screen_name = '';

    // var watsonData ={};

	$scope.$on('$viewContentLoaded', function() {
		var url = window.location.search.substring(1);
		var arrayUrl = url.split('=');
    	var oauth_token = arrayUrl[1].slice(0,(arrayUrl[1].lastIndexOf('&')));
    	var oauth_verifier = arrayUrl[2];
    	Auth.getAccessToken({oauth_token : oauth_token, oauth_verifier : oauth_verifier})
    		.then(function(userInfo){
                console.log("got getAccessToken userInfo: ",userInfo)
                screen_name = userInfo.screenName;
                return userInfo;
    		})
            .then(function(resp){
                console.log("About to call getUserTimeline")
                return Auth.getUserTimeline();
            })
            .then(function(userTimeline){
                return Auth.twitToWatson(JSON.stringify(userTimeline), screen_name);
            })
            .then(function(watData){

                 $location.path('/links');
            })
    		.catch(function(error){
    			console.log('error in loadingPageController: ',error);
                var signInUrl = location.protocol + '//' + "localhost"  + 
                            location.host.slice(location.host.lastIndexOf(':'));
                // window.location = signInUrl;
    		});
	});

});


