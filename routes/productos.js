const { Router } = require('express');
const { check } = require('express-validator');


const { validarJwt } = require('../middlwares/validar-jwt');
const { validarCampos } = require('../middlwares/Validar_Campos');
const { crearProducto, getProducts, getProductsById, updateProduct, deleteProduct } = require('../controllers/productos');
const { existeProducto } = require('../helpers/db-Validators');
const router = Router();

//Obtenemos todos lo productos
router.get('/',getProducts)
//Obtenemos el producto
router.get('/:id',[
    check('id',"No es un id valido").isMongoId(),
    check('id').custom(existeProducto)
],getProductsById)
//Creamos el producto
router.post('/', 
[validarJwt,
    check('nombre', "El nombre es obligatorio").not().isEmpty(),
    check('categoria', "la categoria es obligatoria").not().isEmpty(),
    check('categoria', "No es un id valido de la categoria").isMongoId(),
    validarCampos
], crearProducto)
//Actualizamos el producto
router.put('/:id',[
    validarJwt,
    check('id',"No es un id valido").isMongoId(),
    check('id').custom(existeProducto)
],updateProduct)
// eliminamos el producto
router.delete('/:id',[
    validarJwt,
    check('id',"No es un id valido").isMongoId(),
    check('id').custom(existeProducto)
],deleteProduct)
module.exports = router