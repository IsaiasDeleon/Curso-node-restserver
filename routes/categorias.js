const { Router } = require('express');
const { check } = require('express-validator');

const { validarJwt } = require('../middlwares/validar-jwt');
const { validarCampos } = require('../middlwares/Validar_Campos');
const { crearCategoria, getCategorias, getCategoriasByID, updateCategoria, DeleteCategoria } = require('../controllers/categorias');
const { existeCategoria } = require('../helpers/db-Validators');
const router = Router();
//{{url}}/api/categorias
//Obtener todas las categorias - publico 
router.get('/', getCategorias)
//Obtener una categoria por id - publico
router.get('/:id',
    [check('id', "No es un id valido").isMongoId(),
    check('id').custom(existeCategoria)], getCategoriasByID
)

//Crear categoria - privado - cualquier persona con un token valido 
router.post('/', [validarJwt,
    check('nombre', "El nombre es obligatorio").not().isEmpty(),
    validarCampos
], crearCategoria)
// actualizar
router.put('/:id', [
    validarJwt,
    check('id', "No es un id valido").isMongoId(),
    check('id').custom(existeCategoria),
    check('nombre', "El nombre es obligatorio").not().isEmpty(),
    validarCampos
],updateCategoria
)
//Borar una categoria -admin
router.delete('/:id', [
    validarJwt,
    check('id', "No es un id valido").isMongoId(),
    check('id').custom(existeCategoria),
],DeleteCategoria)
module.exports = router
