
const { response, request } = require("express")
const { header } = require("express/lib/request")
const { json } = require("express/lib/response")
const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuario');

const validarJwt = async(req = request, res= response,next)=>{

    const token = req.header('x-token')
    if(!token){
        return res.status(401).json({
            msg:"No e sun token valido"
        })
    }
    try {
        const {uid}=jwt.verify( token , process.env.SECRETKEY)
        //leer el usuadio que corresponde al uid
        
        const name = await Usuario.findById(uid);
       if( !name ){
        return res.status(401).json({
            msg: "Token no valido - el usuario no existe"
        })
       }
        //verificar si el uid tiene estado true
       if(!name.estado){
           return res.status(401).json({
               msg: "Token no valido - usuario dado de baja"
           })
       }
     
        req.usuario=name;
        req.uid = uid;
   
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg:"Token no valido"
        })
    }
    
   

   
}

module.exports={
    validarJwt
}