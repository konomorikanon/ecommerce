const  { Router } =  require("express");
const { check } = require("express-validator");
const { autenticarUsuario, comprobarToken, googleToken, facebookToken } = require("../controllers/auth");
const { JWTvalidator } = require("../middlewares/jwt-validator");
const { ValidarDatos } = require("../middlewares/validarDatos");
const router = Router();

router.post('/verificarToken',[
    JWTvalidator,
] ,comprobarToken )

router.post('/iniciarSesion',[
    check('email', 'el email es de formato incorrecto').isEmail(),
    check('password', 'el password del usuario es obligatorio').isLength({min:6}),
    ValidarDatos
] ,autenticarUsuario )

router.post('/google',[
    check('tokenId', 'el id token es necesario').notEmpty(),
    ValidarDatos
] ,googleToken )
router.post('/facebook',[
    check('tokenId', 'el id token es necesario').notEmpty(),
], facebookToken )






module.exports = router;