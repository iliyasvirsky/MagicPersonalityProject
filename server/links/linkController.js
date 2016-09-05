var Link    = require('./linkModel.js'),
    Q       = require('q'),
    util    = require('../config/utils.js');


module.exports = {
  findUrl: function (req, res, next, code) {
    // var findLink = Q.nbind(Link.findOne, Link);
    Link.findByCode(code)
      .then(function (link) {
        if (link) {
          req.navLink = link;
          next();
        } else {
          next(new Error('Link not added yet'));
        }
      })
      .catch(function (error) {
        next(error);
      });
  },

  allLinks: function (req, res, next) {
  // var findAll = Q.nbind(Link.find, Link);
  console.log('getting links...')
  Link.all()
    .then(function (links) {
      res.json(links);
    })
    .catch(function (error) {
      next(error);
    });
  },

  newLink: function (req, res, next) {
    var url = req.body.url;
    console.log(req.body);
    if (!util.isValidUrl(url)) {
      return next(new Error('Not a valid url'));
    }

    var createLink = Q.nbind(Link.create, Link);
    var findLink = Q.nbind(Link.findOne, Link);

    Link.findByUrl(url)
      .then(function (match) {
        if (match) {
          res.send(match);
        } else {
          return  util.getUrlTitle(url);
        }
      })
      .then(function (title) {
        if (title) {
          var newLink = {
            url: url,
            visits: 0,
            base_url: req.headers.origin,
            title: title
          };
          return Link.create(newLink);
        }
      })
      .then(function (createdLink) {
        if (createdLink) {
          res.json(createdLink);
        }
      })
      .catch(function (error) {
        next(error);
      });
  },

  navToLink: function (req, res, next) {
    var link = req.navLink;
    console.log('link: ',link);
    Link.save(link._id)
      .then(function (savedLink) {
        res.redirect(link.url);
    })
      .catch(function (error) {
        next(error);
      });
  }

};
