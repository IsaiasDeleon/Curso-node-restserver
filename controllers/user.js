
const { response } = require('express');

const userGet = ( req, res = response)=>{

    const {q, nombre = "no name", api, page = 1, limit} = req.query
    res.json({
        msg:'get API -Controlador',
        q,
        nombre,
        api,
        page,
        limit
    })
}

const userPut =( req, res) => {
    const id = req.params.id;
    res.json({
        msg:"put API -Controlador",
        id
    });
}
const userPost =( req, res) => {
    const {name, edad} = req.body;

    res.json({
        msg:"post API -Controlador",
        name,
        edad
    });
}
const userDelete =( req, res) => {
    res.json({
        msg:"delete API -Controlador"
    });
}
const userPatch =( req, res) => {
    res.json({
        msg:"patch API -Controlador"
    });
}


module.exports={
    userGet,
    userPut,
    userPost,
    userDelete,
    userPatch
}
