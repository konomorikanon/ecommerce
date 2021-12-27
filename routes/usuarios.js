const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosPost, usuariosPut } = require('../controllers/usuarios');
const { verificarEmailRepetido } = require('../helpers/verificadores_models');
const { JWTvalidator } = require('../middlewares/jwt-validator');
const { ValidarDatos } = require('../middlewares/validarDatos');

const router = Router();

router.post('/',[
    check('nombre', 'el nombre del usuario es obligatorio').notEmpty(),
    check('email', 'el email no es de formato correcto').isEmail(),
    check('email').custom(verificarEmailRepetido),
    check('password', 'el password del usuario es obligatorio').isLength({min:6}),
    ValidarDatos
], usuariosPost )

router.put('/:id',[
    check('id', 'se debe introducir el id del usuario ').isMongoId(),
    check('nombre', 'el nombre del usuario es obligatorio').notEmpty(),
    check('email', 'el email no es de formato correcto').isEmail(),
    check('password', 'el password del usuario es obligatorio').isLength({min:6}),
    JWTvalidator,
    ValidarDatos
], usuariosPut )
module.exports = router