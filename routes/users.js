var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/usernames', function (req, res, next) {
  res.send({"name":"raj","lastname":"kale"});
});
module.exports = router;
