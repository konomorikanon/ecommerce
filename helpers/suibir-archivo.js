const path = require('path')
const {v4} = require('uuid')

const subirArchivo = (coleccion,file, array = [], carpeta_id, nameGr ) => {
    return new Promise((resolve, reject) => {
        var pathDividido = file.name.split('.')
        var extension = pathDividido[pathDividido.length-1]
        if (!array.includes(extension)) {
            reject('la extencion no es valida')
            
        }
        const nombreTemp = v4()+"."+extension
        // vamos a generar el name y el path
        const newPath = path.join(__dirname,'../assets/img/',coleccion,carpeta_id,nombreTemp);
        const url = process.env.URL+`api/uploads/${coleccion}/${carpeta_id}/${nameGr}/${nombreTemp}`

        file.mv(newPath, (err) => {
            if (err) {
                reject(err)
                
            }
            resolve(url)

        })
    })    

}
module.exports = {
    subirArchivo
}