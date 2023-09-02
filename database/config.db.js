const { mongoose } = require("mongoose");



const dbConnection = async() => {
    //en DB es bueno hacer try y catch porque la conexion puede fallar

    try {
        await mongoose.connect(process.env.MONGODB_CNN, {
            //recomendaciones para la conexion a BD por mongoose
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Base de datos online');


    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos')
    }


}


module.exports = {
    dbConnection
}