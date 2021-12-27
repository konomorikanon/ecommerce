const {  Router } = require('express');
const { postSlide, getAllSlide, putSlide } = require('../controllers/slider');
const {check} = require('express-validator');
const { ValidarDatos } = require('../middlewares/validarDatos');
const { verificarIdSlider } = require('../helpers/verificadores_models');

const router = Router();

router.post("/", [
        check('title', 'se debe de introducir el titulo').not().isEmpty(),
        check('descripcion', 'se require alguna descripcion').not().isEmpty(),
        check('precio', 'se requiere un precio').isNumeric(),
        check('textBoton', 'se require algun texto para el boton').not().isEmpty(),
        ValidarDatos
    ]
,postSlide )

router.get("/",getAllSlide );

router.put('/:id', [
  check('id', 'el id no es de mongo').isMongoId(),
  check('id').custom(verificarIdSlider),
  ValidarDatos

],putSlide )





module.exports = router