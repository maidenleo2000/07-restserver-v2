require('dotenv').config() //para traer la info del archivo .env de variables de entorno

const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Hola Mundo')
})

app.listen(process.env.PORT, ()=>{
    console.log('Servidor corriendo en puerto', process.env.PORT)
})