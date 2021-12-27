const { response } = require("express")
const slider = require("../models/slider")

const getAllSlide = async(req, res = response) => {
    const {limit = 5,tope = 0, count = false } = req.query
    
    // vamos a sacar los resultados

    const [sliders ,counts ] = await Promise.all([
        slider.find().limit(limit).skip(tope),
        slider.find().countDocuments()

    ])
    
    if (count) {
        return res.json({
            sliders,
            counts
        })
        
    }
    res.json({
        sliders
    })


}
const getSlide = (req, res = response) => {

}
const postSlide = async(req, res = response) => {
    
    const datos = req.body
    const slide = new slider(datos);

    // guardar datos
    await  slide.save();


    res.json({
        msg : "se a creado con exito"
    })

}
// actualizar slider

const putSlide = async(req, res = response) => {

    const { bgPortada, imgProducto, _id} = req.body;
    const {id} = req.params;
    const data = await slider.findByIdAndUpdate(id, req.body, {new : true} );

    res.json({
        data
    })
    

}
module.exports = {
    getSlide,
    postSlide,
    getAllSlide,
    putSlide
}