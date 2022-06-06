const path = require('path');
const fs = require('fs')

const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL)

const { response } = require("express");
const { subirArchivos } = require("../helpers");
const { Usuario, Producto } = require('../models');

const cargarArchivo = async (req, res = response) => {
  
  try {
    const Validos = ['text', 'md', 'php'];
    const nombre = await subirArchivos(req.files, Validos, "ArchivosP");
    res.json({
      nombre
    })
  } catch (msg) {
    res.status(400).json({ msg })
  }
}
const actualizarIMG = async (req, res = response) => {
 
  const { id, coleccion } = req.params;

  let modelo;
  switch (coleccion) {
    case 'usuarios':
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe el usuario con el id${id}`
        })
      }
      break;
    case 'productos':
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe el producto con el id${id}`
        })
      }
      break;
    default:
      return res.status(500).json({ msg: "Se me olvido hacer estp" })
  }
  //Limpiar imagenes previas
  if(modelo.img){
    const pathImagen = path.join(__dirname,'../uploads',coleccion,modelo.img);
    if(fs.existsSync(pathImagen)){
      fs.unlinkSync(pathImagen);
    }
  }

  const nombre = await subirArchivos(req.files, undefined, coleccion);
  modelo.img = nombre;
  console.log(modelo)
  await modelo.save();

  res.json({ modelo })
}

//opcion 2 hosting para guardar las imagenes
const actualizarIMGCloudinary = async (req, res = response) => {
 
  const { id, coleccion } = req.params;

  let modelo;
  switch (coleccion) {
    case 'usuarios':
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe el usuario con el id${id}`
        })
      }
      break;
    case 'productos':
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe el producto con el id${id}`
        })
      }
      break;
    default:
      return res.status(500).json({ msg: "Se me olvido hacer estp" })
  }
  //Limpiar imagenes previas
  if(modelo.img){
    const nombreArr = modelo.img.split('/');
    const nombre = nombreArr[nombreArr.length - 1];
    const [ public_id ] = nombre.split('.');
    cloudinary.uploader.destroy(public_id)
  }
  const { tempFilePath }= req.files.archivo;
  const {secure_url} = await cloudinary.uploader.upload( tempFilePath );
  modelo.img = secure_url;
  await modelo.save();

  res.json( modelo )
}


const showImg = async(req, res= response) =>{
  const { id, coleccion} = req.params;
  let modelo;
  switch ( coleccion ) {
    case 'usuarios':
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe el usuario con el id${id}`
        })
      }
      break;
    case 'productos':
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe el producto con el id${id}`
        })
      }
      break;
    default:
      return res.status(500).json({ msg: "Se me olvido hacer estp" })
  }
  //Limpiar imagenes previas
  if(modelo.img){
    const pathImagen = path.join(__dirname,'../uploads',coleccion,modelo.img);
    if(fs.existsSync(pathImagen)){
      return res.sendFile(pathImagen)
    }
  }else{
    const pathImagen = path.join(__dirname,'../assets',"no-image.jpg");
    res.sendFile(pathImagen)
    
  }


    
}

module.exports = {
  cargarArchivo,
  actualizarIMG,
  showImg,
  actualizarIMGCloudinary
}