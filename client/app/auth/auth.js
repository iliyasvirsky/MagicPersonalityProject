// do not tamper with this code in here, study it, but do not touch
// this Auth controller is responsible for our client side authentication
// in our signup/signin forms using the injected Auth service
angular.module('MP.auth', [])

.controller('AuthController', function ($scope, $window, $location, Auth) {
  $scope.user = {};

  $scope.signin = function () {
    Auth.signin($scope.user)
      .then(function (token) {
        window.location = `https://api.twitter.com/oauth/authenticate?oauth_token=${token}`
      })
      .catch(function (error) {
        console.error(error);
      });
  };

});
