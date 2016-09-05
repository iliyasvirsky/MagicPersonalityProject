var youTubeController = require('./youTubeController.js');


module.exports = function (app) {
  // app === userRouter injected from middlware.js
  console.log("I am in user userRouter app: ")
  app.post('/request-videos', youTubeController.getMyVideos);
};
