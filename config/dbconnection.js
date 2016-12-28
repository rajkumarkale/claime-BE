
var util = require('util');
var mongoose=require('mongoose');

//var uri = 'mongodb://claime:claime@ds145148.mlab.com:45148/claim';
var uri = 'mongodb://127.0.0.1:27017/User';

mongoose.connect(uri);
 mongoose.connection.once('connected',function(){
     console.log('db connected');
 })

var db=mongoose.connection;
db.on('error',console.error.bind(console,'connnection error'));
 db.once('open',function(){
     console.log('success');
 })


