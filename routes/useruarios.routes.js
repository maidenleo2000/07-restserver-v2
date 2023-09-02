const {Router} = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { esRolValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const {usuariosGet, 
       usuariosPut, 
       usuariosPost, 
       usuaiosDelete, 
       usuariosPatch} = require('../controllers/usuarios.controllers');

const router = Router();


router.get('/', usuariosGet );

//el :id es para indicar que quiero capturar eso que sigue al / en el URL
router.put('/:id', [
       check('id', 'No es un ID válido').isMongoId(),
       check('id').custom(existeUsuarioPorId),
       check('rol').custom( esRolValido ),
       validarCampos //la funcion validarcampos va al final de todos los checks, sino no funciona
], usuariosPut ); 

//Si se manda el controlador como tercer argumento quiere decir que el segundo son middlewares. Si se envia 1 solo se pasa directamente el nombre pero por lo general son mas de 1 y se manda como un array de middlewares
router.post('/', [
       //verifica que el nombre no este vacio
       check('nombre', 'El nombre es obligatorio').not().isEmpty(),
       //valida que el password tenga minimo 6 caracteres
       check('password', 'El password debe tener mas de 6 letras').isLength({min:6}),
       //valida que sea formato email
       check('correo', 'El correo no es válido').isEmail(),
       //valida si email existe de forma personalizada
       check('correo').custom(emailExiste),
       // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
       //Valida rol de forma customizada
       check('rol').custom( rol => esRolValido(rol) ),
       validarCampos
] , usuariosPost );

router.delete('/:id',[
       check('id', 'No es un ID válido').isMongoId(),
       check('id').custom(existeUsuarioPorId),
       validarCampos
], usuaiosDelete );

router.patch('/', usuariosPatch );









module.exports = router;