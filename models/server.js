const express = require('express');
const cors = require('cors')

class Server{

    constructor(){
        this.app  = express();
        this.port= process.env.PORT;
        this.usuariosPath = '/api/users';
        // Middlewares
        this.middlewares();
        //Rutas de mi aplicación
        
        this.routes();
        
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