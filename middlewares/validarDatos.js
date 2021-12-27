const {validationResult } = require('express-validator')

const ValidarDatos = (req, res, next) => {

    const results = validationResult(req);
    if (!results.isEmpty()) {
        return res.status(200).json(results)
        
    }
    next()

}


module.exports = {
    ValidarDatos,
}