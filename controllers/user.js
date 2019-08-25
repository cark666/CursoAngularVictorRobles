'use strict'
var User = require('../models/user');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');

function pruebas (req, res){
    res.status(200).send({
    message: 'probando user controller'
});

}

function saveUser(req,res){
var user = new User();
var params = req.body;
console.log(params);

user.name = params.name;
user.surname = params.surname;
user.email = params.email;
user.role = 'ROLE_ADMIN';
user.image = 'null';

if(params.password){
//encriptamos la contraseña  y guardamos datos
bcrypt.hash(params.password,null,null,function(err,hash){

user.password=hash;
if(user.name != null && user.surname != null && user.email != null){

//guardamos usuario
user.save((err,userStored) =>{

    if(err){

        res.status(500).send({message:'error al guardar USER'})

    }
    else{
if(!userStored){
    res.status(404).send({message:'no se ha guardado USER'})

}
else{

    res.status(200).send({user: userStored})
}
     }     
} );

}

else{
    res.status(200).send({message:'introduce todos los campos'})

}

});
}
else{

    res.status(200).send({message:'introduce la contraseña'})
}
};

function loginUser(req,res){
var params = req.body;
 var email = params.email  
 var password = params.password  
 User.findOne({email: email.toLowerCase()},(err,user) =>{
if(err){
    res.status(500).send({messge:'error en la peticion'});
}

else{

    if(!user){

        res.status(404).send({messge:'el usuario no existe'});

    }
    else{

        bcrypt.compare(password,user.password, (err,check) =>{

          if(check){
                //datos user logueado
            if(params.gethash){

                res.status(200).send({token: jwt.createToken(user)                
                });


            }
            else{ 
                res.status(200).send({user});

            }

          }
          
          else{

            res.status(404).send({messge:'el usuario no ha podido loguearse'});

          }




        });


    }


}

 });

}

function updateUser(req,res){
var userId = req.params.id;
var update = req.body;
User.findByIdAndUpdate(userId,update,(err,userUpdate)=> {
if(err){

    res.status(500).send({message:'Error al actualizar el usuario'})

}
else{
if(!userUpdate){
   
    res.status(404).send({message:'no se ha podido actualizar el usuario'}) 
}
else{ 
    res.status(200).send({user:userUpdate}) 


}

}


});


}

function uploadImages(req,res){
    console.log('llego')
var userId = req.params.id
var filename = 'No subido...'

if(req.files){
    
var file_path = req.files.image.path;
console.log(file_path)
}
else{
    res.status(200).send({message:'La imagen no se ha subido'})

}

}

module.exports = {
    pruebas,
    saveUser,
    loginUser,
    updateUser,
    uploadImages 
}