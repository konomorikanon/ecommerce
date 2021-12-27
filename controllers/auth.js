const { response } = require("express");
const usuario = require("../models/usuario");
const bcrypt = require("bcryptjs");
const generarJson = require("../helpers/generarJWT");
const { googleVerify } = require("../helpers/googleAuth");
const {default: fetch} = require("node-fetch");
const { default: axios } = require("axios");

const autenticarUsuario = async(req, res = response) => {
    const {email,password} = req.body

    const model = await usuario.findOne({email})
    if (!model) {
        return res.json({
            msg : 'password o contraseña incorrectas'
        })
    }
    console.log(model);
    
    const passVerify = bcrypt.compareSync(password, model.password)

    if (!passVerify) {
        return  res.json({
            msg : 'password o contraseña incorrectas'
        })
        
        
    }

    const token = await  generarJson(model.id);


    res.json({
        model,
        token
    })
}




const googleToken = async(req, res = response) => {
    const {tokenId} = req.body;

    const {nombre,imagen,correo} = await googleVerify(tokenId)
    // carga de datos del usuario
    const data = {
        nombre : nombre,
        email: correo,
        password : 'no existe',
        authGoogle : true,
        foto : imagen



    }
    // consulta a al base de datos
    var user = await usuario.findOne({email : correo})
    if (!user) {
        user = new usuario(data);
        await user.save();

    }else{

        if (!user.estado) {
            return res.json({
                msg : 'bloqueo insperado de cuanta, hable con el admnistrador'
            })
        
        }
        if (!user.authGoogle) {
            return res.json({
                msg : 'la cuenta ya fue registrada con anterioridad'
            })
        }


    }

    const token = await  generarJson(user.id);

    res.json({
        user,
        token
    })

}
const facebookToken = async(req, res) => {
    const {tokenId, userID} = req.body

    let facebook = `https://graph.facebook.com/v2.11/${userID}?fields=id,name,email,picture.height(200).width(200)&access_token=${tokenId}`
    var user;    
    const  {data}= await axios.get(facebook);

    var user = await usuario.findOne({email : data.email})
    // console.log(data.picture, data.email);

       
     var datos = {
        nombre : data.name,
        email: data.email,
        password : 'no existe',
        authFacebook : true,
        foto : data.picture.data.url
    }
    // con
              
    if (!user) {
        user = new usuario(datos);
        await user.save();

    }else{

        if (!user.estado) {
            return res.json({
                msg : 'bloqueo insperado de cuanta, hable con el admnistrador'
            })
        
        }
        if (!user.authFacebook) {
            return res.json({
                msg : 'la cuenta ya fue registrada con anterioridad'
            })
        }

    }

    const token = await  generarJson(user.id);

    res.json({
        user,token

    })

    
  

}

const  comprobarToken = async(req, res = response) => {
   

    res.json({
        auth : true
    })
}

module.exports = {
    autenticarUsuario,
    comprobarToken,
    googleToken,
    facebookToken
}