const {Router} = require('express');
const { check } = require('express-validator');
const { ProductosPost } = require('../controllers/productos');

const router = Router()

router.post('/',[
    check('')
] ,ProductosPost )

module.exports = router