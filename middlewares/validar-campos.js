const {validationResult} = require('express-validator');


const validarCampos = (req,res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }

    next(); //en un middleware tiene que llamarse el next que es lo que llamo si la funcion pasa. Si llega a este punto le dice que siga con el siguiente middleware y si no hay mas sigue con el controlador
}




module.exports={
    validarCampos,
}