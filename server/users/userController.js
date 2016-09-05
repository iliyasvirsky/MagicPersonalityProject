var User = require('./userModel.js'),
    Q    = require('q'),
    jwt  = require('jwt-simple');

module.exports = {

  userAccessToken: '',

  signin: function (req, res, next) {
    console.log("i am in userController")
    User.requestToken()
      .then(function (requestToken) {
        res.send(requestToken);
      })
      .catch(function (error) {
        next(error);
      });
  },

  checkAuth: function (req, res, next) {
    // checking to see if the user is authenticated
    // grab the token in the header is any
    // then decode the token, which we end up being the user object
    // check to see if that user exists in the database
    var token = req.headers['x-access-token'];
    if (!token) {
      next(new Error('No token'));
    } else {
      var user = jwt.decode(token, 'secret');
      // var findUser = Q.nbind(User.findOne, User);
      User.findByUsername({username: user.username})
        .then(function (foundUser) {
          if (foundUser) {
            res.status(200).send();
          } else {
            res.status(401).send();
          }
        })
        .catch(function (error) {
          next(error);
        });
    }
  },

  getAccessToken: function (req, res, next) {
    console.log("i am in userController getAccessToken")
    User.accessToken(req.body.oauth_verifier)
      .then(function (accessToken) {
        //user credentials have been verified by twitter 
        // res.cookie('sessionId', accessToken);
        // res.send(accessToken);
        return accessToken
      })
      .then(function(accessToken){
        this.userAccessToken = accessToken;
        return User.verifyCredentials();
      })
      .then(function(user){
        return User.createSession(user.id, user.screen_name);
      })
      .then(function(session){
        res.cookie('sessionId', session.sessionId);
        res.send(session);
      })
      .catch(function (error) {
        next(error);
      });
  },

  getUserTimeline: function (req, res, next) {
    console.log("i am in userController getUserTimeline")
    User.timeLine()
      .then(function (userTimeline) {
        res.send(userTimeline);
      })
      .catch(function (error) {
        next(error);
      });
  },
};
