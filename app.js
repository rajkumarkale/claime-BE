var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var cors = require('cors');

// var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');

// var Users = require('./config/userModal');
var config = require('./config/config');
mongoose.connect(config.database);
var auth = require('./auth');
var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// app.set('superSecret', config.secret);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


//app.options('*', cors())
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// app.use(cors({
//   "origin": "*",
//   "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
//   "preflightContinue": false,
//   "optionsSuccessStatus": 204
// }))

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-methods',' GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers','Content-Type');
  next();
})
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', auth);
app.use('/', index);
app.use('/', users);



// //verify routes with token
// app.use(function (req, res, next) {
//   var token = req.body.token || req.query.token || req.headers['x-access-token'];
//   if (token) {
//     jwt.verify(token, app.get('superSecret'), function (err, decoded) {
//       if (err) {
//         return res.json({ success: false, message: 'failed login' });
//       } else {
//         req.decoded = decoded;
//         next();
//       }
//     });
//   } else {
//     return res.status(403).send({
//       success: false,
//       message: 'failed login'
//     })
//   }
// })

// //Authenticate user
// app.post('/authenticate', function (req, res) {
//   Users.getUsersByEmail(req.body.email, function (err, users) {
//     if (err) {
//       console.lo(err)
//       throw err;
//     }

//     if (!users) {
//       res.json({ success: false, message: 'Authentication Fail' });
//     } else if (users) {
//       if (users.password != req.body.password) {
//         res.json({ success: false, message: 'Authentication Fail' })
//       } else {
//         var token = jwt.sign(users, app.get('superSecret'), {
//           expiresIn: 1440
//         });
//         res.json({
//           success: true,
//           message: 'Enjoy token',
//           token: token
//         });
//       }
//     }
//   })
// })

app.get('/test', function (req, res) {
  res.send('working fine');
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
