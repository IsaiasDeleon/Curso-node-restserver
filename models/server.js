const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../DB/config');

class Server{

    constructor(){
        this.app  = express();
        this.port= process.env.PORT;
        this.usuariosPath = '/api/users';
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
       this.app.use(this.usuariosPath,require('../routes/user'))
    }


    start(){
        this.app.listen(this.port)
    }
}

module.exports = Server;