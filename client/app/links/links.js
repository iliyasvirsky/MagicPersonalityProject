angular.module('MP.links', ['chart.js'])

.controller('LinksController', function ($scope, $location, $sce, YouTube, Wat) {
  $scope.data = {};
  $scope.youTubeurls =[];
  $scope.descPara = '';
  $scope.likes =[];
  $scope.dislikes =[];
  $scope.links =[];

  var queries = {
    'Openness'          : 'Blues, Jazz, Classical, folk',
    'Conscientiousness' : 'Country, Religious, Pop',
    'Extraversion'      : 'Rap, Hip-Hop, Funk, Electronic, Dance',
    'Agreeableness'     : 'Country, Religious, Pop',
    'Emotional range'   : 'Blues, Jazz, Classical, folk'
  }

  $scope.labels =["Openness", "Conscientiousness", "Extraversion", "Agreeableness", "Emotional range"];

  $scope.data = [[]];

  $scope.logout = function (){
    // TODO: the code below seems like a hack, try to implement this in a better way
    var signInUrl = location.protocol + '//' + "localhost"  + 
                    location.host.slice(location.host.lastIndexOf(':'));
    window.location = signInUrl;
  };

  $scope.getYouTubeData = function (){

    var watData = Wat.retrieveWatsonData();
    console.log('watData : ',watData);
    var big5 = watData.allTraits[2];
    var maxPercent = 0;
    var saveId;



    for (var i = 0; i < big5.length; i++) {
      $scope.data[0].push(Number(Number(big5[i][1]).toFixed(2))*10);
      console.log('$scope.data[0]: ', $scope.data[0])
      if (big5[i][1] > maxPercent){
          maxPercent = big5[i][1];
          saveId = i;
      }
    }
    var strongTrait = big5[saveId][0];
    $scope.descPara = watData.primaryTraits[strongTrait].descParagraf;
    $scope.likes = watData.primaryTraits[strongTrait].likes;
    $scope.dislikes = watData.primaryTraits[strongTrait].dislikes;
    $scope.links = watData.primaryTraits[strongTrait].links[0];
    var query = {query:queries[strongTrait], numResults:3};
    YouTube.getYouTubeData(query)
    .then((videosData) =>{
      for (var i = 0; i < videosData.items.length; i++) {
        var tempUrl = `https://www.youtube.com/embed/${videosData.items[i].id.videoId}?autoplay`;
        $scope.youTubeurls.push($sce.trustAsResourceUrl(tempUrl));
      }
      console.log("youtube data back $scope.urls: ", $scope.youTubeurls);

    })
  };

  $scope.getYouTubeData();
});