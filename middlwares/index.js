

const ValidaJWT = require('../middlwares/validar-jwt');
const ValidaCampos =  require('../middlwares/Validar_Campos');
const ValidaRoles = require('../middlwares/validar_Roles');
const valiarArchivo = require('../middlwares/validar-archivo')
module.exports={
    ...ValidaCampos,
    ...ValidaJWT,
    ...ValidaRoles,
    ...valiarArchivo
}