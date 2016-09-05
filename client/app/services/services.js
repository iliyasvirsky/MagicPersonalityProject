angular.module('MP.services', [])


.factory('YouTube', function ($http) {

  var personalityTrait = {trail: ''};

  function getYouTubeData(query){
    console.log('2. I am in services-> getYouTubeData ')
    return $http({
      method: 'POST',
      url:'api/youtube/request-videos',
      data: query
    }).then((videosData) => {
        return videosData.data;
    })
  };

  function setTrait (trait){
    personalityTrait.trait = trait;

  }

  function getTrait (trait){
    return personalityTrait.trait;

  }
   return {
    getYouTubeData: getYouTubeData,
    setTrait: setTrait,
    getTrait: getTrait
  };

})
.factory('Wat', function ($http) {

  var watData = {data: ''};

  console.log("this is wat service")
  function getWatsonDataTest(){
    return $http({
      method: 'GET',
      url:'api/wat/watsonTest'
    }).then((resp) => {
        watData.data = resp.data;
        return resp.data;
    })
  };

  function getWatsonData(content){
    // console.log('I am in getWatsonData, content: ',content)
    return $http({
      method: 'POST',
      url:'api/wat/watson',
      data: content
    }).then((resp) => {
        watData.data = resp.data;
        return resp.data;
    })
  };

  function retrieveWatsonData (){
    return watData.data;

  }
   return {
    getWatsonDataTest : getWatsonDataTest,
    getWatsonData     : getWatsonData,
    retrieveWatsonData: retrieveWatsonData
  };

})
.factory('Auth', function ($http, $location, $window, Wat, YouTube) {
  // Don't touch this Auth service!!!
  // it is responsible for authenticating our user
  // by exchanging the user's username and password
  // for a JWT from the server
  // that JWT is then stored in localStorage as 'com.shortly'
  // after you signin/signup open devtools, click resources,
  // then localStorage and you'll see your token from the server
  var signin = function (user) {
    console.log("I am in services signin")
    return $http({
      method: 'GET',
      url: '/api/users/request-token',
    })
    .then(function (resp) {
      console.log('resp in signin services : ',resp)
      // $location.path('/loggingin');
      return resp.data;
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.shortly');
  };

  var signout = function () {
    $window.localStorage.removeItem('com.shortly');
    $location.path('/signin');
  };

  var getAccessToken = function (data) {
    console.log('getAccessToken data: ',data);
    return $http({
      method: 'POST',
      url: '/api/users/access-token',
      data: data
    })
    .then(function (resp) {
      // $location.path('/loggingin');
      return resp.data;
    })
    .catch(function(error){
      return error;
    })
  };

  var getUserTimeline = function () {
    console.log('I am in getUserTimeline ');
    return $http({
      method: 'GET',
      url: '/api/users/timeline'
    })
    .then(function (resp) {
      console.log('resp.data in services:', resp.data)
      return resp.data;
    })
    .catch(function(error){
      return error;
    })
  };

  var twitToWatson = function (userTimeline, screen_name) {
    // console.log('I am in twitToWatson: ',userTimeline);
    return Wat.getWatsonData({data: userTimeline, screen_name: screen_name})
    // return Wat.getWatsonDataTest()
    .then(function (watData) {
      console.log('resp in twitToWatson:', watData)
      return watData;
    })
    .catch(function(error){
      console.log('error in services/twitToWatson:', error)
      return error;
    })
  };

  return {
    signin: signin,
    isAuth: isAuth,
    signout: signout,
    getAccessToken: getAccessToken,
    getUserTimeline: getUserTimeline,
    twitToWatson: twitToWatson

  };
});
