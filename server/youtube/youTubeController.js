var youTube = require('./youTubeModel.js');

module.exports = {
  getMyVideos: function (req, res, next) {
    console.log("i am in youTubeController")
    youTube.getVideos(req.body.query, req.body.numResults)
      .then(function (videosData) {
        res.send(videosData);
      })
      .catch(function (error) {
        next(error);
      });
  },
};
