const {Schema, model} = require('mongoose');

const UsuarioModelo = Schema({
    nombre : {
        type: String,
        required: [true,'el nombre es de caracter obligatorio']
    },
    apellidos : {
        type: String
    },
    email: {
        type: String,
        required: [true,'el email es de caracter obligatorio'],
        unique:true

    },
    password : {
        type: String,
        required: [true,'el password es de caracter obligatorio']

    },
    estado:{
        type: Boolean,
        required: [true],
        default: true
    },
    authGoogle: {
        type: Boolean,
        default: false
    },
    authFacebook:{
        type: Boolean,
        default: false
    },
    foto:{
        type: String 
    }

})

UsuarioModelo.methods.toJSON = function(){
    const  {__v, password, _id, ...usuario} = this.toObject();
    usuario.uid = _id
    return usuario;
}
module.exports = model('Usuario',UsuarioModelo )
