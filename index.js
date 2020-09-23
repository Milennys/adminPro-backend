require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { db } = require('./db/config');
//Creando el server de express
const app = express();

app.use(cors());
//Lectura y parse de body
app.use(express.json());

db();
//KGyymQczTKZ4nfgZ
//dbMile
//Rutas
app.use('/api/usuarios', require('./routes/users'))
app.use('/api/login', require('./routes/auth'))

app.listen(process.env.PORT, () => {
    console.log('Server' + process.env.PORT)
})