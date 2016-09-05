var db = require('../db');

var util = require('../config/utility');
var crypto = require('crypto');


var Link = module.exports;

Link.all = function () {

  return db.collection('links').find({});
  };

Link.create = function (incomingAttrs) {
  // Copy to avoid mutation
  var attrs = Object.assign({}, incomingAttrs);

  var titlePromise = attrs.title
    ? Promise.resolve(attrs.title)
    : util.getUrlTitle(attrs.url);

  return titlePromise
    .then(function (title) {

      attrs.title = title;
      attrs.visits = 0;

      // Create shortlink token
      var shasum = crypto.createHash('sha1');
      shasum.update( attrs.url );
      attrs.code = shasum.digest('hex').slice(0, 5);


      return db.collection('links').insert(attrs);
          })
    .then(function (results) {
      attrs.id = results.id;
      return attrs;
    });
};

Link.findByUrl = function (url) {

  return db.collection('links').findOne({ url: url });
  };

Link.findByCode = function (code) {

  return db.collection('links').findOne({ code: code });
  };

Link.save = function (link_id) {
    return db.collection('links')
        .update(
            { _id: link_id },
            { $inc: { visits: 1 } }
        )
};