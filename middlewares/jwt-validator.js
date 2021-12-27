const { response } = require("express");
const jsonwebtoken = require("jsonwebtoken");
const usuario = require("../models/usuario");

const JWTvalidator = async(req, res = response, next) => {

    const  token  = req.header('token');
    if (!token) {
        res.json({
            msg : 'no hay un token a verificar'
        })
        
    }
    try {
        const {id} = jsonwebtoken.verify(token,process.env.KEYSECRET)
        console.log(id);
        const user = await usuario.findById(id);
        req.usuario = user;
        console.log(user);
        next()
        
    } catch (error) {
        res.json({
            msg : error+"a"
        })
    }


}
module.exports = {
    JWTvalidator
}