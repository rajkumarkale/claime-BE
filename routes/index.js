var express = require('express');
var router = express.Router();

// var mongoose = require('mongoose');
// var uri = 'mongodb://claime:claime@ds145148.mlab.com:45148/claim';
// mongoose.connect(uri);
Users = require('./../config/userModal');


// Get all ther users
router.get('/api/user', function (req, res, next) {
  Users.getUsers(function (err, users) {
    if (err) {
      throw err
    }
    res.json(users);
  });
  next();
})


// Create new users
router.post('/api/user', function (req, res) {
  var userObj = new Users({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })
  Users.addUsers(userObj, function (err, user) {
    if (err) {
      throw err
      res.end();
    }
    res.send(user);
  });
  next();
})



// Login
router.post('/api/login', function (req, res, next) {
  var email = req.body.email;
  Users.getUsersByEmail(req.body.email, function (err, users) {
    if (err) {
      console.lo(err)
      throw err;
      // res.end();
    }



  })
  next();
})


module.exports = router;
