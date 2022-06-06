const   Role = require('../models/rol')
const Usuario = require('../models/usuario');
const Categoria = require('../models/categoria');
const { Producto } = require('../models');
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
const existeCategoria = async ( id= '')=>{
    const existeId = await Categoria.findById(id)
    if(!existeId){
        throw new Error(`El id no existe: ${ id } `)
    }
}
const existeProducto = async ( id = "")=>{
    const existeId = await Producto.findById(id)
    if(!existeId){
        throw new Error(`El id no existe: ${ id } `)
    }
}
const coleccionesPermitidas = async (coleccion='', colecciones='')=>{
    const incluida = colecciones.includes(coleccion);
    if(!incluida){
        throw new Error(`La colección ${coleccion} no es permitida, ${colecciones}`)
    }
    return true;

}
module.exports = {
     validarRol,
     EmailExist,
     ExisteUsuairoPorId,
     existeCategoria,
     existeProducto,
     coleccionesPermitidas
}