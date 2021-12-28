const fs = require('fs')
const path = require('path')

const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const { response } = require("express");

const { subirArchivo } = require("../helpers/suibir-archivo");
const slider = require("../models/slider");
const usuario = require('../models/usuario');

// 

const UploadsPut = async(req, res = response) => {
    const {coleccion, id} = req.params;
    const {nameImg} = req.body;

    console.log(req.files);

    if (!req.files.archivo) {
        res.status(400).json({
            msg : 'el nombre del archivo debe ser a "archivo"'
        })
        
    }
    // vamos a poner un swicth para ver a que controlador va estar
    // console.log(coleccion, id);
    let  model;
    switch (coleccion) {
        case 'slider':
            model = await slider.findById(id);
            if (!model) {
                res.status(400).json({
                    msg : 'el id no esta registrado'
                })         
            }
            break;
        case 'usuarios':
            model = await usuario.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg : 'el id no esta registrado'
                })         
            }
            if (model.authGoogle || model.authFacebook) {
                return res.json({
                    msg : 'no se puede actualizar un usuario logeado desde otra red social'
                })
                
            }
    
            break;
    
        default:

            break;
    }
    // console.log (model, 'en el modelo de afuera');
    // vamos a eliminar la imagen
    if (model[nameImg]) {
        // partimos el url del link
        var img = model[nameImg].split('/');
        var nombre  = img[img.length -1];
       
        // obtenermos el id publico sn la extension
        const [public_id ] = nombre.split('.');

        cloudinary.uploader.destroy(public_id)
        
        // const newPath = path.join(__dirname,'../assets/img/',coleccion,model.id,img);
        // if (fs.existsSync(newPath)) {
        //     fs.unlinkSync(newPath)
        // }
        
    }

    // sacamos el name tem

    const {tempFilePath} = req.files.archivo
    const {secure_url} = await cloudinary.uploader.upload(tempFilePath);

    // // console.log(model, model._id,model.id);
    // const name = await subirArchivo(coleccion, req.files.archivo, ['jpg', 'png', 'jpeg'], model.id, nameImg)
    // // vamos a ver en que ruta va ir
    model[nameImg] = secure_url;

    await model.save();

    res.json(model)


}


const UploadsGetParameter = async(req, res = response) => {
    const {coleccion, userid, nameImg, id} = req.params;

    // vamos a poner un swicth para ver a que controlador va estar
    var model
    switch (coleccion) {
        case 'slider':
            model = await slider.findById(userid);
            if (!model) {
                res.status(400).json({
                    msg : 'el id no esta registrado'
                })         
            }
            break;
        case 'usuarios':
            model = await usuario.findById(userid);
            if (!model) {
                res.status(400).json({
                    msg : 'el id no esta registrado'
                })         
            }
            break;
    
        default:

            break;
    }


   
    // if ( model[nameImg]) {

    //     return res.sendFile(model[nameImg]);
    //     // const newPath = path.join(__dirname,'../assets/img/',coleccion, userid,id);
    //     // if (fs.existsSync(newPath)) {
    //     //     return res.sendFile(newPath)
            
    //     // }
        
    // }

    res.json(model)


}

module.exports={
    UploadsPut,
    UploadsGetParameter
}