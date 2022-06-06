const  {Router} = require('express');
const { check } = require('express-validator');
const { cargarArchivo, actualizarIMG, showImg, actualizarIMGCloudinary } = require('../controllers/upload');
const { coleccionesPermitidas } = require('../helpers');
const { validarArchivoSubir, validarCampos} = require('../middlwares');


const router = Router();
router.post('/',validarArchivoSubir,cargarArchivo);

router.put('/:coleccion/:id',[
    validarArchivoSubir,
    check('id', 'El id debe de ser de mongo').isMongoId(),
    check('coleccion').custom( c=> coleccionesPermitidas(c,['usuarios','productos'])),
    validarCampos
],actualizarIMGCloudinary);

router.get('/:coleccion/:id',[
    check('id', 'El id debe de ser de mongo').isMongoId(),
    check('coleccion').custom( c=> coleccionesPermitidas(c,['usuarios','productos'])),
    validarCampos
], showImg)

module.exports = router;