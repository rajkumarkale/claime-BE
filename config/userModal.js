'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = mongoose.Schema({
    name: String,
    email:String,
    password:String
})
var Users =module.exports=mongoose.model('Users',userSchema);

module.exports.getUsers=function(callback,limit){
	Users.find(callback).limit(limit)
}
module.exports.getUsersById=function(id,callback){
    Users.findById(id,callback);
}

module.exports.getUsersByEmail=function(userEmail,callback){
    Users.findOne({email:userEmail},callback);
}
module.exports.addUsers=function(user,callback){
	Users.create(user,callback) 
}
