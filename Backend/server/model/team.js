//model/comments.js

'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TeamSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  description: String,
  admin: String,
});

module.exports = mongoose.model('Team', TeamSchema);