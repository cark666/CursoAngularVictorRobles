'use strict'

var moongose = require('mongoose')
var Schema = moongose.Schema;

var ArtistSchema = Schema({
name:String,
description:String,
image:String,

});

module.exports = moongose.model('Artist',ArtistSchema);