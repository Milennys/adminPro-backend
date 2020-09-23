const { response } = require('express');
const bcrypt = require('bcryptjs')
const User = require('../models/usuarios');
const { generarJWT } = require('../helpers/jwt');

const getUsers = async (req, res) => {

    const usuarios = await User.find({}, 'nombre ');
    res.json({
        ok: true,
        msg: 'Get Users',
        usuarios
    });
}

const creatUsers = async (req, res = response) => {
    const { email, password } = req.body;

    try {

        const existeEmail = await User.findOne({ email });

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }

        const usuario = new User(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);


        // Guardar usuario
        await usuario.save();

        //Generar el TOKEN - JWT
        const token = await generarJWT(usuario.id);


        res.json({
            ok: true,
            usuario,
            token
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }



}

const updateUser = async (req, res = response) => {
    // TODO: Validar token y comprobar si es el usuario correcto
    const uid = req.params.id;

    try {

        const usuarioDB = await User.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        // Actualizaciones
        const { password, google, email, ...campos } = req.body;

        if (usuarioDB.email !== email) {

            const existeEmail = await User.findOne({ email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                });
            }
        }

        campos.email = email;
        const usuarioActualizado = await User.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            usuario: usuarioActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}

const deleteUser = async (req, res = response) => {

    const uid = req.params.id;

    try {

        const usuarioDB = await User.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        await User.findByIdAndDelete(uid);


        res.json({
            ok: true,
            msg: 'Usuario eliminado'
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }


}


module.exports = {
    getUsers,
    creatUsers,
    updateUser,
    deleteUser
}