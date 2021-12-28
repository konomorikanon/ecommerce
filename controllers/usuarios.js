const bcrypt = require("bcryptjs");
const { response } = require("express");
const generarJson = require("../helpers/generarJWT");
const usuario = require("../models/usuario");

const usuariosPost = async(req, res = response) => {

    const {nombre, email, password, actualizarPassword } = req.body;
    const data = {
        nombre,email
    }
    const model = new usuario(data);

    // vamos a encriptar la contraseña
    const salt = bcrypt.genSaltSync(4);
    model.password = bcrypt.hashSync(password, salt);

    await model.save();

    const token = await  generarJson(model.id);
    res.json({model, token});
    


}
const usuariosPut = async(req, res = response) => {

    const {nombre, email, password, apellidos, actualizarPassword } = req.body;
    const data = {
        nombre,email
    }

    console.log(req.body);
    const model = await usuario.findOne({email})
    // verficadores
    if (!model) {
        return res.json({
            msg : 'password o email incorrectas'
        })
    }
    const passVerify = bcrypt.compareSync(password, model.password)

    if (!passVerify) {
        return res.json({
            msg : 'password incorrecto'
        })
        
    }
    // comprobar que el usuario no actualize su informacion mediante redes sociales
    if (model.authGoogle || model.authFacebook) {
        return res.json({
            msg : 'no se puede actualizar un usuario logeado desde otra red social'
        })
        
    }
    // verificadores para actualizar la password
    if(actualizarPassword && actualizarPassword !== ''){
        console.log("hola");

        const salt = bcrypt.genSaltSync(4);
        model.password = bcrypt.hashSync(actualizarPassword, salt);
    }
    if(apellidos && apellidos !== ''){
        model.apellidos = apellidos
    }
    model.nombre = nombre;

    model.save();
    console.log(model);

    res.json(model)
    


}

module.exports = {
    usuariosPost,
    usuariosPut
}