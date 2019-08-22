'use strict'
var moongose = require('mongoose')
var app = require('./app')
var port = process.env.port || 3977
moongose.connect('mongodb://localhost:27017/curso_mean2', { useNewUrlParser: true },(err,res)=>{
 if(err){

    throw err;
 }
 else{

    console.log('Mongo Correcto');
    app.listen(port,function(){

console.log('server musica escuchando en localhost:' + port )


    });
 }



});