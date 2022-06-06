const { response } = require('express');
const { Producto, Categoria } = require('../models')

//Crer
const crearProducto = async ( req, res = response)=>{
    const nombre = req.body.nombre.toUpperCase();
    const { precio = 0, descripcion = "", disponible = true } = req.body
    const precio2 = Number(precio);
    const categoria = req.body.categoria;
    const categoriaDB = await Categoria.findOne({categoria});
    
    if(!categoriaDB){
        return res.status(400).json({
            msg:"El id de la categoria no se encuentra reivise silo introdujo correcto"
        })
    }
    const productoDB = await Producto.findOne({nombre});
    if(productoDB){
        return res.status(400).json({
            msg:`El producto ${productoDB.nombre}  ya existe`
        });
    }
    const data = {
        nombre, 
        usuario: req.usuario._id,
        precio:precio2,
        categoria,
        descripcion,
        disponible
    }
    const producto = new Producto(data);
    //Guardar DB
    await producto.save();
    res.status(201).json(producto)
}

const getProducts = async(req, res = response) =>{
    const {limite = 5}= req.query;
    const estatus = {estado:true}
    const [total,productos]= await Promise.all([
        Producto.countDocuments(estatus),
        Producto.find(estatus)
            .populate('usuario','nombre')
            .populate('categoria','nombre')
            .limit(Number(limite))
    ])
    res.json({
        total,
        productos
    })
}

const getProductsById = async (req, res = response)=>{
    const { id } = req.params;
    const producto = await Promise.all([ Producto.findById(id)])
    if(!producto){
        return res.status(400).json({
            msg: "El producto que busca no se encuentra en la DB"
        })
    }
    res.json({
        producto
    })
}
const updateProduct=async(req, res= response)=>{
    const { id } = req.params;
    const { nombre, precio, descripcion, disponible } = req.body;
    const nombreDB = await Producto.findOne({nombre})
    if(nombreDB){
        return res.status(400).json({
            msg:`La categoria ${nombreDB.nombre}  ya existe`
        })
    }
    const data = {
        nombre,
        precio,
        descripcion,
        disponible
    }
    await Producto.findByIdAndUpdate(id,data,{new:true});
    res.json({
        id
    })
}

const deleteProduct = async(req, res=response)=>{
    const { id } = req.params;
    await Producto.findByIdAndUpdate(id,{estado:false},{new:true})
    res.json({
        id
    })
}

module.exports={
    crearProducto,
    getProducts,
    getProductsById,
    updateProduct,
    deleteProduct
}