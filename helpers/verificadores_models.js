const slider = require("../models/slider");
const usuario = require("../models/usuario");


const verificarIdSlider = async( id) => {
    const existsId = await slider.findById(id);

    if (!existsId) {
        throw new Error('no existe el id de tal slider ')
        
    }

}


const verificarEmailRepetido = async(email) => {
    const existsId = await usuario.findOne({email});

    if (existsId) {
        console.log("hola");
        throw new Error('no se admite un email repetido por favor verifique de nuevo con otro email ')
        
    }

}

module.exports = {
    verificarIdSlider,
    verificarEmailRepetido
}