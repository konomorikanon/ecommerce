const {check} = require('express-validator')
const {Router} = require('express')
const { UploadsPut, UploadsGetParameter } = require('../controllers/uploads')
const { ValidarDatos } = require('../middlewares/validarDatos')
const { ValidarColeccion, ValidarId, ValidarImgName } = require('../middlewares/validator')

const router = Router()

router.put('/:coleccion/:id',[
    check('id', 'el id no es valido').isMongoId(),
    check("coleccion").custom((cat) => ValidarColeccion(cat, ['slider', 'usuarios'])),
    check('nameImg', 'es necesario el nombre de la ruta de imagen').not().isEmpty() ,
    check('nameImg').custom((text) => ValidarImgName(text, ['bgPortada', 'imgProducto', 'foto'])),
    
    ValidarDatos
 
], UploadsPut )

router.get('/:coleccion/:userid/:nameImg/:id',[
    check('userid', 'el id no es valido').isMongoId(),
    check("coleccion").custom((cat) => ValidarColeccion(cat, ['slider', 'usuarios'])),
    check('nameImg').custom((text) => ValidarImgName(text, ['bgPortada', 'imgProducto', 'foto'])),
    
    ValidarDatos
 
], UploadsGetParameter )



module.exports = router
