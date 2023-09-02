const express = require('express')
const cors = require('cors')

const { dbConnection } = require('../database/config.db')



class Server {


    constructor() {
        //se crea la propiedad de express en la misma clase dentro del constructor
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //Conectar a la base de datos
        this.conectarDB();

        //Middlewares(funciones que añaden otra funcionalidad a mi webserver. Una funcion que siempre va a ejecutarse al ejecutar el servidor)
        this.middlewares(); //esto se va a servir en el path / por eso el this.routes() no va a funcionar en el path /, si quiero ver ese contenido tengo que cambiarle si o si el path
        //Todos los app.use son middlewares


        //Rutas de aplicacion
        //llama el metodo para configurar las rutas
        this.routes();
    }


    async conectarDB(){
        await dbConnection(); //llamo la funcion de config.db.js
    }


    middlewares(){
        //CORS
        this.app.use(cors());

        //Lectura y parseo del body que viene en JSON
        this.app.use(express.json()); //cualquier info que venga la va a serializar en json

        //Directorio público
        this.app.use(express.static('public'));

    }


    // routes() {
    //     this.app.get('/', (req, res) => {
    //         res.send('Hola Mundo')
    //     })
    // }

    routes() {

        this.app.use( this.usuariosPath, require('../routes/useruarios.routes'))

        //?Esto se copia y pega en user.routes.js
        // this.app.get('/api', (req, res) => {
        //     // res.send('Hola Mundo')
        //     // res.status(403).json({
        //     res.json({
        //         // ok:true, //opcional, no es necesario el ok
        //         msg: 'get API'
        //     }) //?Para devolver los datos en formato json que es lo mas comun
        // })

        // this.app.put('/api', (req, res) => {            
        //     res.json({
        //         msg: 'put API'
        //     })
        // })
        // this.app.post('/api', (req, res) => {            
        //     res.json({
        //         msg: 'post API'
        //     })
        // })
        // this.app.delete('/api', (req, res) => {            
        //     res.json({
        //         msg: 'delete API'
        //     })
        // })
        // this.app.patch('/api', (req, res) => {            
        //     res.json({
        //         msg: 'patch API'
        //     })
        // })
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port)
        })
    }


}












module.exports = Server;