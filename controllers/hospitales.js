const { response } = require('express');

const Hospital = require('../models/hospital');


const getHospitales = async (req, res = response) => {

    const hospitales = await Hospital.find()
        .populate('usuario', 'nombre img');

    res.json({
        ok: true,
        hospitales
    })
}

const crearHospital = async (req, res = response) => {

    const uid = req.uid;
    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });

    try {

        const hospitalDB = await hospital.save();


        res.json({
            ok: true,
            hospital: hospitalDB
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }



}

const actualizarHospital = async (req, res = response) => {

    const hospitalID = req.params.id
    const uid = req.uid

    try {

        const hospital = Hospital.findById(hospitalID);
        if (!hospital) {
            return res.status(404).json({
                ok: false,
                msg: 'Este hospital no existe',
            });
        }

        const cambiosHospital = {
            ...req.body,
            usuario: uid
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate(hospitalID, cambiosHospital, { new: true })

        res.json({
            ok: true,
            hospital: hospitalActualizado
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'error',            
        });

    }


}

const borrarHospital = async (req, res = response) => {
    const hospitalID = req.params.id

    try {

        const hospital = Hospital.findById(hospitalID);
        if (!hospital) {
            return res.status(404).json({
                ok: false,
                msg: 'Este hospital no existe',
            });
        }

        await Hospital.findByIdAndDelete(hospitalID);
        res.json({
            ok: true,
            msg: 'Hospital eliminado'
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al eliminar hospital'
        })
    }
}



module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}