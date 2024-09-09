const db = require("../models");
const { formatDate } = require("../utils/date.utils");

exports.listCompetencia = function (req, res) {
    db.competencias.findAll({
        include: 'mascotas'
    }).then(competencias => {
        res.render('competencias/list.ejs', { competencias: competencias });
    });
}
exports.createCompetencia = async function (req, res) {

    res.render('competencias/form.ejs', { competencia: null });
}
exports.insertCompetencia = function (req, res) {
    db.competencias.create({
        nombre: req.body.nombre,
        fecha: req.body.fecha
    }).then(() => {
        res.redirect('/competencias');
    });
}
exports.editCompetencia = async function (req, res) {
    const id = req.params.id;
    const competencia = await db.competencias.findByPk(id);
    const fechaFormateada = formatDate(competencia.fecha);

    res.render('competencias/form.ejs', { competencia: competencia, fechaFormateada });
}
exports.updateCompetencia = async function (req, res) {
    const id = req.params.id;
    const competencia = await db.competencias.findByPk(id);

    competencia.nombre = req.body.nombre;
    competencia.fecha = req.body.fecha;
    await competencia.save();
    res.redirect('/competencias');
}
exports.deleteCompetencia = async function (req, res) {
    const id = req.params.id;
    const competencia = await db.competencias.findByPk(id);
    await competencia.destroy();
    res.redirect('/competencias');
}
exports.addParticipantes = async function (req, res) {
    const id = req.params.id;

    const competencia = await db.competencias.findByPk(id, {
        include: 'mascotas'
    });
    const mascotas = await db.mascotas.findAll();

    res.render('competencias/participantes.ejs', { competencia, mascotas });
}
exports.insertParticipantes = async function (req, res) {
    const id = req.params.id;
    const competencia = await db.competencias.findByPk(id);
    let mascotasList = req.body.mascotas;
    //check if array
    if (!Array.isArray(mascotasList)) {
        const temp = mascotasList;
        mascotasList = [];
        mascotasList.push(temp);
    }
    await competencia.setMascotas([]);
    mascotasList.forEach(async (idMascota) => {
        await competencia.addMascota(idMascota);
    });

    res.redirect('/competencias');
}