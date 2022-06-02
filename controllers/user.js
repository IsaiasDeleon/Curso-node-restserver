
const { response } = require('express');
const bcriptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const userGet = async(req, res = response) => {
    const { limite = 5, desde = 0 } = req.query
    const query = { estado : true};
    
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ])

    res.json({ total,usuarios })
}

const userPut = async (req, res) => {
    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;
    // validar contra la DB
    if (password) {
        // hash contraseña
        const salt = bcriptjs.genSaltSync();
        resto.password = bcriptjs.hashSync(password, salt)
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true })
    res.json({
        //msg:"put API -Controlador",
        id
    });
}
const userPost = async (req, res) => {
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });


    // hash contraseña
    const salt = bcriptjs.genSaltSync();
    usuario.password = bcriptjs.hashSync(password, salt)
    //Guardar DB


    await usuario.save();
    res.json({
        //msg:"post API -Controlador",
        usuario

    });
}
const userDelete = async(req, res) => {
    
    const { id } = req.params;
    //Eliminar de la db
    //const usuario= await Usuario.findByIdAndDelete(id);
    const usuario = await Usuario.findOneAndUpdate(id,{estado:false},{new:true})

    res.json({
        usuario,
        
    });
}
const userPatch = (req, res) => {
    res.json({
        msg: "patch API -Controlador"
    });
}


module.exports = {
    userGet,
    userPut,
    userPost,
    userDelete,
    userPatch
}
