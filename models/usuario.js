const {Schema, model}= require('mongoose');

const UsuarioSchema = Schema({
    nombre:{
        type:String,
        required:[ true, "EL nombre es obligatorio"]
    },
    correo:{
        type: String,
        required:[true, "El correo es obligatorio"],
        unique:true
    },
    password:{
        type: String,
        required: [true,"La contraseña es obligatoria"]
    },
    img: {
        type: String,
    },
    rol:{
        type: String,
        required: true,
        emun: ["Admin_Rol", "User_Rol"]
    },
    estado:{
        type: Boolean,
        default:true,
    },
    google:{
        type:Boolean,
        default:false
    }
})

UsuarioSchema.methods.toJSON = function(){
    const { __v, password,_id, ...Usuario }= this.toObject();
    Usuario.uid= _id;
    return Usuario;
}

module.exports = model('Usuario', UsuarioSchema)