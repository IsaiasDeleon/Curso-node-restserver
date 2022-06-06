const { response } = require("express");
const { Categoria } = require('../models')

//obtener categorias - paginado - total - populate
const getCategorias = async(req, res = response)=>{
    const {limite = 5} = req.query; 
    const estatus = {estado:true}
    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(estatus),
        Categoria.find(estatus)
            .populate('usuario', 'nombre')
            .limit(Number(limite))
                
           
    ])
    res.json({
        total,
        categorias
    })
}

// obtener categoria - populate {}
const getCategoriasByID = async(req, res = response)=>{
    const { id } = req.params;
   
    const Cat = await Promise.all([
        Categoria.findById(id)
        //.populate('Usuario')    
    ])
    res.json({
        
        Cat
    })
}

const crearCategoria = async(req, res= response)=>{
    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({nombre});
    if(categoriaDB){
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre}  ya existe`
        });
    }
    //generar la data a guardar
    const data = {
        nombre,
        usuario:req.usuario._id
    }
    const categoria = new Categoria(data);
    // Guardar DB
    await categoria.save();
    res.status(201).json(categoria)
}

//actualizar categoria -validar nombre
const updateCategoria = async(req, res= response) =>{
    const { id } = req.params;
    const nombre = req.body.nombre.toUpperCase();
    const categoriaDB = await Categoria.findOne({nombre});
    if(categoriaDB){
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre}  ya existe`
        });
    }
    const data = {
        nombre,
        usuario:req.usuario._id
    }
    await Categoria.findByIdAndUpdate(id, data, { new: true })
    res.json({
        id
    });
}
//borrar categoria - estado : false
const DeleteCategoria = async (req, res = response)=>{
    const { id } = req.params;  
    await Categoria.findByIdAndUpdate(id, {estado:false}, { new: true })
    res.json({
        id
    });
}


module.exports={
    crearCategoria,
    getCategorias,
    getCategoriasByID,
    updateCategoria,
    DeleteCategoria
}