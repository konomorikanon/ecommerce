const { response } = require("express")

const ProductosPost = (req, res = response) => {
    
    res.json({
        msg : "se a creado exitosamente"
    })
}
module.exports = {
    ProductosPost
}