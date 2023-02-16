const express = require('express')
const cors = require('cors');

const {dbConnection} = require('../database/config')



class Server {

    constructor () {
        this.app = express();
        this.port = process.env.PORT;

        this.paths ={
            auth:   '/api/auth',
            usuarios: '/api/usuarios',
            servicios: '/api/servicios',
            pago_servicios: '/api/pago-servicio',
            pago_servicios_det: '/api/pago-servicio-det',

        }


       
        // conectar a db
        this.conectarDB();
        //middleware
        this.middlewares();
        //rutas de mi aplicacion
        this.routes();
    }


    async conectarDB(){
          

        try {
            await dbConnection.authenticate();
            console.log('Conexion a la base de datos exitosa!');
          } catch (error) {
            console.error('No se pudo conectar a la base de datos:', error);
          }
            
        
    }
    middlewares(){

        //cors
        this.app.use(cors());

        //lectura y parseo del body
        this.app.use(express.json());

        //directorio publico
        this.app.use(express.static('public'));


    }
    routes(){
        
        this.app.use(this.paths.auth,require('../routes/auth'))
        this.app.use(this.paths.usuarios,require('../routes/usuarios'))
        this.app.use(this.paths.servicios,require('../routes/servicios'))
        this.app.use(this.paths.pago_servicios,require('../routes/pago-servicio'))
        this.app.use(this.paths.pago_servicios_det,require('../routes/pago-servicio-det'))

    }

    listen(){
        this.app.listen(this.port,()=>{
        console.log('Servidor corriendo en puerto' , this.port)
})
    }

}

module.exports = Server;