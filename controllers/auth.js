const { response }= require('express')
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuario');
const { jsonWebToken } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');
const { json } = require('express/lib/response');
const login = async(req, res= response)=>{
    const {correo, password} = req.body;
    try {
        // verificar si el email existe
        const usuario = await Usuario.findOne({correo});
        if(!usuario){
            return res.status(400).json({
                msg: "Usuario / Pasword no son correctos - correo"
            })
        }
        // si el usuario esta activo
        if(!usuario.estado){
            return res.status(400).json({
                msg: "Usuario / Pasword no son correctos - estado : false"
            })
        }
        // verificar la contraseña
        const validPass = bcryptjs.compareSync( password, usuario.password);
        if(!validPass){
            return res.status(400).json({
                msg: "Usuario / Pasword no son correctos - Password"
            })
        }
        // generar el jwt
        const token = await jsonWebToken(usuario.id)

        res.json({usuario,token})
    } catch (error) {
        console.log(error)
         res.status(500).json({
            msg:"Algo salio mal"
        })
    }

   
}

const googleSignIn = async ( req, res = response)=>{
    const { id_token } = req.body;
   try {
       const {nombre, img, correo} = await googleVerify(id_token)
       
       let usuario = await Usuario.findOne({correo});
       if(!usuario){
           //tengo que crearlo
        const data = {
            nombre,
            correo,
            password:'Se logeo con google',
            img,
            google:true,
            rol:'User_Rol'
        };
        usuario = new Usuario(data);
        await usuario.save();
       }
       // si el usuario en DB
       if( !usuario.estado ){
           return res.status(401).json({
               msg:"Hable con el administrador, usuario nloqueado"
           })
       }
       const token = await jsonWebToken(usuario.id)
    res.json({
       usuario,token
    }) 
   } catch (error) {
       res.status(400).json({
           ok: false,
           msg: "El token no se pudo verificar"
       })
   } 
    
}

module.exports={
    login,
    googleSignIn
}