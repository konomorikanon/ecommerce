const cors = require('cors')
const  express = require('express');
const fileUpload = require('express-fileupload');
const { MongoseFunction } = require('../config/db');

class Server{
    constructor(){
        this.app = express();

        this.dbConnection()

        // vamos a colocar los middlewares
        this.middlewares();

        this.routes();
    }

    middlewares(){
        // cors
        this.app.use(cors());

        // 
        this.app.use(express.static('public'));
        
        // para e parseo del body
        this.app.use(express.json())

        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        })); 
        


    }
    dbConnection(){
        MongoseFunction();
    }
    routes(){
        this.app.use('/api/slider', require('../routes/slider'));
        this.app.use('/api/uploads', require('../routes/uploads'));
        this.app.use('/api/productos', require('../routes/productos'));
        this.app.use('/api/usuarios', require('../routes/usuarios'));
        this.app.use('/api/auth', require('../routes/auth'));




    }
    listen(){

        this.app.listen(process.env.PORT, () => {
            console.log(`server corriendo en el puerto ${process.env.PORT}`);

        })
    }


}

module.exports = Server;
