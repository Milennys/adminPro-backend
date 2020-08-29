const mongoose = require('mongoose');

const dbConnection = async () => {

    try {
        await mongoose.connect(process.env.DB_CNN,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
            });
            console.log('Conectado a db')

    }
    catch (error) {
        console.error();
        throw new Error('ver logs en error');
    }
}

module.exports = {
    db: dbConnection
}