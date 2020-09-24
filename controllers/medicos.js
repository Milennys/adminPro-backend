const { response } = require('express');

const Medico = require('../models/medico');

const getMedicos = async (req, res = response) => {

    const medicos = await Medico.find()
        .populate('usuario', 'nombre img')
        .populate('hospital', 'nombre img')


    res.json({
        ok: true,
        medicos
    })
}

const crearMedico = async (req, res = response) => {

    const uid = req.uid;
    const medico = new Medico({
        usuario: uid,
        ...req.body
    });


    try {

        const medicoDB = await medico.save();


        res.json({
            ok: true,
            medico: medicoDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}

const actualizarMedico = async (req, res = response) => {
    console.log(req.params)
    const medicoID = req.params.id
    const uid = req.uid

    try {
        const medico = Medico.findById(medicoID);
        if (!medico) {
            return res.status(404).json({
                ok: false,
                msg: 'Este medico no existe',
            });
        }

        const cambiosMedicos = {
            ...req.body,
            usuario: uid
        }

        const medicoActualizado = await Medico.findByIdAndUpdate(medicoID, cambiosMedicos, { new: true })

        res.json({
            ok: true,
            medico: medicoActualizado
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'error',
        });

    }
}

const borrarMedico = async(req, res = response) => {
    const medicoID = req.params.id
    try {

        const medico = Medico.findById(medicoID);
        if (!medico) {
            return res.status(404).json({
                ok: false,
                msg: 'Este medico no existe',
            });
        }

        await Medico.findByIdAndDelete(medicoID);

        res.json({
            ok: true,
            msg: 'Medico Eliminado'
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al eliminar medico'
        })
    }
}



module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}