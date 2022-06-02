const { response }= require('express')
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuario');
const { jsonWebToken } = require('../helpers/generar-jwt');
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

module.exports={
    login
}