const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload')
const { dbConnection } = require('../DB/config');

class Server{

    constructor(){
        this.app  = express();
        this.port= process.env.PORT;
        this.paths = {
            usuariosPath: '/api/users',
            buscar: '/api/buscar',
            authPath: "/api/auth",
            categorias: '/api/categorias',
            productos:  '/api/productos',
            uploads: '/api/uploads'
        }
        //Conectar a DB
        this.conectarDB();
        // Middlewares
        this.middlewares();
        //Rutas de mi aplicación
        
        this.routes();
        
    }
    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        //CORS
        this.app.use(cors())
        //Lectura y paseo dle body
        this.app.use ( express.json());

        //directorio
        this.app.use ( express.static('public'))
        //Carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath:true
        }));
    }
    routes(){
        this.app.use(this.paths.authPath,require('../routes/auth'))
        this.app.use(this.paths.buscar,require('../routes/buscar'))
        this.app.use(this.paths.usuariosPath,require('../routes/user'))
        this.app.use(this.paths.productos,require('../routes/productos'))
        this.app.use(this.paths.categorias,require('../routes/categorias'))
        this.app.use(this.paths.uploads,require('../routes/upload'))
    }


    start(){
        this.app.listen(this.port)
    }
}

module.exports = Server;