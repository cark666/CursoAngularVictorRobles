'use strict'

var moongose = require('mongoose')
var Schema = moongose.Schema;

var SongSchema = Schema({
number:Number,
name:String,
duration:String,
file:String,
album:{type: Schema.ObjectId, ref:'Album'},


});

module.exports = moongose.model('Song',SongSchema);