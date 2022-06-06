const express = require('express');
const cors = require('cors');
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
            productos:  '/api/productos'
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
    }
    routes(){
        this.app.use(this.paths.authPath,require('../routes/auth'))
        this.app.use(this.paths.buscar,require('../routes/buscar'))
        this.app.use(this.paths.usuariosPath,require('../routes/user'))
        this.app.use(this.paths.productos,require('../routes/productos'))
        this.app.use(this.paths.categorias,require('../routes/categorias'))
      
    }


    start(){
        this.app.listen(this.port)
    }
}

module.exports = Server;