const { Schema, model} = require('mongoose');
const SlideFunction = Schema({
    bgPortada : {
        type: String,
    },
    title : {
        type: String,
        required: [true, 'se require al menos un titulo']

    },
    descripcion : {
        type: String,
        required: [true, 'se require al menos una descripcion']
    },
    precio : {
        type: Number,
        required: [true, 'se require el precio del producto']
    },
    textBoton : {
        type: String,
        required: [true, 'se require el texto del boton']
    },
    imgProducto : {
        type: String,
    
    },
    styles : {type : Schema.Types.Mixed}
    

})
module.exports = model('Slider', SlideFunction);