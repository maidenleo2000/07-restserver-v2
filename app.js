require('dotenv').config() //para traer la info del archivo .env de variables de entorno

const Server = require('./models/server')

//1° se crea la instancia del Server, del servidor, ya que sino no se puede usar
const server = new Server();

//2° Lanzar el metodo listen
server.listen();
