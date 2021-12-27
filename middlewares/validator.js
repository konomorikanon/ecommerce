

const ValidarColeccion = (cat = "", Array = []) => {


    if (!Array.includes(cat)) {
        throw new Error('no existe una coleccion')
    }
    return true
    

}
const ValidarImgName = (name = '', array = []) => {

    if (!array.includes(name)) {
        throw new Error('no existe un nombre asi, consulte con el administrador')
    }
    return true

}
module.exports = {
    ValidarColeccion,
    ValidarImgName
}