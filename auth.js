var express = require('express');
var jwt = require('jsonwebtoken');
// var mongoose = require('mongoose');
var config = require('./config/config');
// mongoose.connect(config.database);
var Users = require('./config/userModal');
var app = express();
var router = express.Router();

app.set('superSecret', config.secret);

//verify routes with token
// router.use(function (req, res, next) {
//     var token = req.body.token || req.query.token || req.headers['x-access-token'];
//     if (token) {
//         jwt.verify(token, app.get('superSecret'), function (err, decoded) {
//             if (err) {
//                 return res.json({ success: false, message: 'failed login' });
//             } else {
//                 req.decoded = decoded;
//                 next();
//             }
//         });
//     } else {
//         return res.status(403).send({
//             success: false,
//             message: 'Authentication Fail (Middleware Message)'
//         })
//     }
// })

// //Authenticate user
router.post('/login', function (req, res) {
    // var test = JSON.parse(req.body);
    // console.log(test);
    Users.getUsersByEmail(req.body.email, function (err, users) {
        if (err) {
            console.lo(err)
            throw err;
        }

        if (!users) {
            res.json({ success: false, message: 'Authentication Fail' });
        } else if (users) {
            if (users.password != req.body.password) {
                res.json({ success: false, message: 'Authentication Fail' })
            } else {
                var token = jwt.sign(users, app.get('superSecret'), {
                    expiresIn: 1440
                });
                res.json({
                    success: true,
                    message: 'Enjoy token',
                    token: token
                });
            }
        }
    })
})

module.exports = router;