//model/comments.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsersSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  fullname: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  nickname: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  teamname: [String],
  role: [Number],
  active: [Boolean],
});

module.exports = mongoose.model('User', UsersSchema);