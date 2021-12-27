const jsonwebtoken = require("jsonwebtoken")

const generarJson = (id = '') => {

    return new Promise((resolve, reject) => {
        const payload = {id}
        jsonwebtoken.sign(payload,process.env.KEYSECRET,{
            expiresIn: '1d'
        }, (err, token) => {
            if (err) {
                console.log('h');
                reject('no se genero el token')
                
            }else{
                console.log('g');
                resolve(token);

            }

        })

    })
}
module.exports = generarJson;