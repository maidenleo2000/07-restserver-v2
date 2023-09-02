
//?Modelo para guiarme en la construccion nada mas
// {
//     nombre: 'nombreUsuario',
//     correo: 'correo@correo.com',
//     password: '12131245434324414',
//     img: '1213124234123313',
//     rol: '3123124353242313',
//     estado: true,
//     google: true
// }

const { Schema, model } = require ('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true //para que no se repita
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    img: {
        type: String, 
    },
    rol: {
        type: String, 
        required: true,
        //emun valida que sea de los tipos que le especifico solamente
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
});

UsuarioSchema.methods.toJSON = function(){
    //esto no muestra la info de __v ni password al usuario cuandro se crean los datos
    const { __v, password, ...usuario } = this.toObject();
    return usuario;
}



module.exports = model('Usuario', UsuarioSchema);