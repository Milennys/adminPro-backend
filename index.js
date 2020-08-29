require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { db } = require('./db/config');
//Creando el server de express
const app = express();

app.use(cors())

db();
//KGyymQczTKZ4nfgZ
//dbMile
//Rutas
app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'Hola mundo!'
    })
});

app.listen(process.env.PORT, () => {
    console.log('Server' + process.env.PORT)
})