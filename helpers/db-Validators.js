const   Role = require('../models/rol')
const Usuario = require('../models/usuario');
const validarRol = async (rol='') => {
    const existeRol = await Role.findOne({rol})
    if(!existeRol){
        throw new Error(`El rol ${ rol } no esta registrado en la db`)
    }
}
const EmailExist = async ( correo = '')=>{
    const existeEmail = await Usuario.findOne({correo})
    if(existeEmail){
        throw new Error(`El correo: ${ correo } ya esta registrado en la db`)
    }
    
}
const ExisteUsuairoPorId = async ( id = '')=>{
    const existeId = await Usuario.findById(id)
    if(!existeId){
        throw new Error(`El id no existe: ${ id } `)
    }
    
}
module.exports = {
     validarRol,
     EmailExist,
     ExisteUsuairoPorId
}