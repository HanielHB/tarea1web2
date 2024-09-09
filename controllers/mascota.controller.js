const db = require("../models");

exports.listMascota = function (req, res) {
    db.mascotas.findAll({
        include: 'persona'
    }).then(mascotas => {
        res.render('mascotas/list.ejs', { mascotas: mascotas });
    });
}
exports.createMascota = async function (req, res) {
    const personas = await db.personas.findAll();
    res.render('mascotas/form.ejs', { mascota: null, personas, errors: null });
}
exports.insertMascota = async function (req, res) {
    const { errors, mascota } = validateMascotaForm(req);
    if (errors) {
        const personas = await db.personas.findAll();

        res.render('mascotas/form.ejs', { mascota: mascota, personas, errors: errors });
        return;
    }
    db.mascotas.create({
        nombre: req.body.nombre,
        tipo: req.body.tipo,
        personaId: req.body.personaId
    }).then(() => {
        res.redirect('/mascotas');
    });
}
exports.editMascota = async function (req, res) {
    const id = req.params.id;
    const mascota = await db.mascotas.findByPk(id);
    const personas = await db.personas.findAll();

    res.render('mascotas/form.ejs', { mascota: mascota, personas, errors: null });
}
exports.updateMascota = async function (req, res) {
    const validacion = validateMascotaForm(req);
    const errors = validacion.errors;
    const mascotaErrors = validacion.mascota;
    if (errors) {
        const personas = await db.personas.findAll();

        res.render('mascotas/form.ejs', { mascota: mascotaErrors, personas, errors: errors });
        return;
    }
    const id = req.params.id;
    const mascota = await db.mascotas.findByPk(id);

    mascota.nombre = req.body.nombre;
    mascota.tipo = req.body.tipo;
    mascota.personaId = req.body.personaId;
    await mascota.save();
    res.redirect('/mascotas');
}
exports.deleteMascota = async function (req, res) {
    const id = req.params.id;
    const mascota = await db.mascotas.findByPk(id);
    await mascota.destroy();
    res.redirect('/mascotas');
}
const validateMascotaForm = function (req) {
    if (!req.body.nombre || !req.body.tipo || !req.body.personaId) {
        const errors = {
            nombre: !req.body.nombre,
            tipo: !req.body.tipo,
            personaId: !req.body.personaId
        };
        errors.message = 'Todos los campos son obligatorios';
        const mascota = {
            nombre: req.body.nombre,
            tipo: req.body.tipo,
            personaId: req.body.personaId
        };
        return { errors, mascota };
    }
    return { errors: null, mascota: null };
}