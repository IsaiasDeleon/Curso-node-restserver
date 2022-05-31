const  {Router} = require('express');
const { check } = require('express-validator');
const { userGet, userPost, userPut, userDelete, userPatch } = require('../controllers/user');
const { validarRol, EmailExist,ExisteUsuairoPorId } = require('../helpers/db-Validators');
const {validarCampos} =  require('../middlwares/Validar_Campos')



const router = Router();

router.get('/', userGet)
router.put('/:id',[
    check('id',"No es un id valido").isMongoId(),
    check('id').custom(ExisteUsuairoPorId),
    check("rol").custom(validarRol),
    validarCampos
], userPut)
router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es valido').isEmail(),
    check("correo").custom(EmailExist),
    check('password', 'El password debe de ser más de 6 letras').isLength({min:6}),
    
    //check("rol", "no es un rol valido").isIn(["Admin_Rol","User_Rol"]),
    check("rol").custom(validarRol),
    validarCampos,
],userPost)
router.delete('/:id',[
    check('id',"No es un id valido").isMongoId(),
    check('id').custom(ExisteUsuairoPorId),
    validarCampos
],
userDelete)
router.patch('/',userPatch)


module.exports = router;