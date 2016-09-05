var userController = require('./userController.js');


module.exports = function (app) {
  // app === userRouter injected from middlware.js
  console.log("I am in user userRouter app: ")
  app.get('/request-token', userController.signin);
  app.get('/timeline', userController.getUserTimeline);
  app.post('/access-token', userController.getAccessToken);
  app.get('/signedin', userController.checkAuth);
};
