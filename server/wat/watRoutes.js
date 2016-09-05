var watController = require('./watController.js');


module.exports = function (app) {

  app.post('/watson', watController.getWatsonData);
  app.get('/watsonTest', watController.getWatsonDataTest);

};
