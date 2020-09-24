require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');
//Creando el server de express
const app = express();

app.use(cors());
//Lectura y parse de body
app.use(express.json());

dbConnection();

//Directorio Publico
app.use(express.static('public'));
//KGyymQczTKZ4nfgZ
//dbMile
//Rutas
app.use('/api/usuarios', require('./routes/usuarios'))
app.use( '/api/hospitales', require('./routes/hospitales') );
app.use( '/api/medicos', require('./routes/medicos') );
app.use( '/api/todo', require('./routes/busquedas') );
app.use('/api/login', require('./routes/auth'))
app.use( '/api/upload', require('./routes/uploads') );

app.listen(process.env.PORT, () => {
    console.log('Server' + process.env.PORT)
})