const {response, request} = require('express');
const bcryptjs = require('bcryptjs'); //!Para encriptar la contraseña se usa este paquete

const Usuario = require('../models/usuario'); //la u mayuscula me permite crear instancias de este modelo

const usuariosGet = async (req = request, res = response) => {

    // const query = req.query;
    // const {q, nombre = 'No name', apikey, page = 1, limit} = req.query;

    const { limite = 5, desde = 0 } = req.query //desestructura la url
    // const usuarios = await Usuario.find({estado: true}).skip(Number(desde)).limit(Number(limite));
    
    // const total = await Usuario.countDocuments({estado:true});

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments({estado:true}),
        Usuario.find({estado: true}).skip(Number(desde)).limit(Number(limite))
    ]);


    res.json({
        // resp
        total,
        usuarios
    });

    // res.send('Hola Mundo')
    // res.status(403).json({
    // res.json({
    //     // ok:true, //opcional, no es necesario el ok
    //     msg: 'get API - controlador',
    //     q,
    //     nombre,
    //     apikey,
    //     page,
    //     limit
    // }) //?Para devolver los datos en formato json que es lo mas comun
}

const usuariosPut = async (req, res = response) => {   
    
    // const id = req.params.id;
    const {id} = req.params;
    const {_id, password, google, correo, ...resto} = req.body;

    //TODO validar contra DB

    if(password){
        //encriptar contraseña
        const salt = bcryptjs.genSaltSync(); 
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto, {new: true} );
    
    res.json(usuario);
    // res.json({
    //     msg: 'put API - controlador',
    //     usuario
    // })
}

const usuariosPost = async (req, res = response) => {

    //esto es lo que manda el usuario que es el request 
    // const body = req.body; 

    //Desestructurando body para seguridad
    const {nombre, correo, password, rol} = req.body; 
    
    //Otra forma de desestructurar es marcando lo que NO QUIERO y mediante el operador rest aceptar el resto
    // const {google, ...resto} = req.body; 

    //nueva instancia de usuario se crea.
    // const usuario = new Usuario(resto);  

    const usuario = new Usuario({nombre, correo, password, rol});  
    //Como en el modelo de usuario solamente se define nombre y edad cualquier otra cosa que se envie no va a pasar y mongoose lo va a ignorar

    //TODO Verificar si el correo existe:
    // const existeEmail = await Usuario.findOne({ correo: correo });
    // if (existeEmail){
    //     return res.status(400).json({
    //         msg: 'Ese correo ya esta registrado'
    //     })
    // }


    //TODO Encriptar la contraseña
    const salt = bcryptjs.genSaltSync(); 
    //genSaltSync es el numero de vueltas para desencriptar, cuanto mas alto mejor pero tarda mas en generarse. Por defecto esta en 10 si no se pone nada.
    usuario.password = bcryptjs.hashSync(password, salt);

    //TODO Grabando datos en Mongo con la siguiente sentencia (guardar en BD)
    await usuario.save(); 
    
    res.json({
        // msg: 'post API - controlador',
        usuario
    })
}

const usuaiosDelete = async (req, res = response) => {  

    const { id } = req.params;

    //Fisicamente lo borramos
    // const usuario = await Usuario.findByIdAndDelete(id);

    //Borrar usuario SIN borrarlo fisicamente de la base de datos
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});


    res.json({
        // msg: 'delete API - controlador'
        id,
        usuario
    })
}

const usuariosPatch = (req, res = response) => { 
    
    res.json({
        msg: 'patch API - controlador',
        id
    })
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuaiosDelete,
    usuariosPatch
}