const db = require("../models");
const { formatDate } = require("../utils/date.utils");

exports.listPersona = function (req, res) {
    db.personas.findAll({
        include: 'mascotas'
    }).then(personas => {
        res.render('personas/list.ejs', { personas: personas });
    });
}
exports.createPersona = async function (req, res) {
    const usuarios = await db.usuarios.findAll();
    res.render('personas/form.ejs', { persona: null, usuarios, errors: null });
}
exports.insertPersona = function (req, res) {
    const { errors, persona } = validatePersonaForm(req);
    if (errors) {
        const fechaFormateada = formatDate(persona.fechaNacimiento);
        res.render('personas/form.ejs', { persona: persona, errors: errors, fechaFormateada });
        return;
    }
    //para acceder al usuario que está loggeado
    
    db.personas.create({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        ciudad: req.body.ciudad,
        edad: req.body.edad,
        fechaNacimiento: req.body.fechaNacimiento,
        genero: req.body.genero,
        usuarioId: req.body.usuarioId
    }).then(() => {
        res.redirect('/personas');
    });
}
exports.editPersona = async function (req, res) {
    const id = req.params.id;
    const persona = await db.personas.findByPk(id);
    const fechaFormateada = formatDate(persona.fechaNacimiento);
    res.render('personas/form.ejs', { persona: persona, fechaFormateada: fechaFormateada, errors: null });
}
exports.updatePersona = async function (req, res) {
    const validacion = validatePersonaForm(req);
    const errors = validacion.errors;
    const personaErrors = validacion.persona;
    if (errors) {
        const fechaFormateada = formatDate(personaErrors.fechaNacimiento);
        res.render('personas/form.ejs', { persona: personaErrors, errors: errors, fechaFormateada });
        return;
    }
    const id = req.params.id;
    const persona = await db.personas.findByPk(id);

    persona.nombre = req.body.nombre;
    persona.apellido = req.body.apellido;
    persona.ciudad = req.body.ciudad;
    persona.edad = req.body.edad;
    persona.fechaNacimiento = req.body.fechaNacimiento;
    persona.genero = req.body.genero;
    await persona.save();
    res.redirect('/personas');
}
exports.deletePersona = async function (req, res) {
    const id = req.params.id;
    const persona = await db.personas.findByPk(id);
    await persona.destroy();
    res.redirect('/personas');
}

exports.uploadProfileGet = async function (req, res) {
    const id = req.params.id;
    const persona = await db.personas.findByPk(id);
    res.render('personas/uploadProfile.ejs', { persona: persona, errors: null });
}
exports.uploadProfilePost = async function (req, res) {

    const id = req.params.id;
    const persona = await db.personas.findByPk(id);
    if (!req.files?.photo) {
        res.render('personas/uploadProfile.ejs', { errors: { message: 'Debe seleccionar una imagen' }, persona });
        return;
    }
    const image = req.files.photo;
    // eslint-disable-next-line no-undef
    const path = __dirname + '/../public/images/profile/' + persona.id + '.jpg';

    image.mv(path, function (err) {
        if (err) {
            res.render('personas/uploadProfile.ejs', { errors: { message: 'Error al subir la imagen' }, persona });
            console.log(err);
            return;
        }
        res.redirect('/personas');
    });
}

const validatePersonaForm = function (req) {
    if (!req.body.nombre || !req.body.apellido ||
        !req.body.ciudad || !req.body.edad || !req.body.fechaNacimiento ||
        !req.body.genero || !req.body.usuarioId) {
        const errors = {
            nombre: !req.body.nombre,
            apellido: !req.body.apellido,
            ciudad: !req.body.ciudad,
            edad: !req.body.edad,
            fechaNacimiento: !req.body.fechaNacimiento,
            genero: !req.body.genero,
            usuarioId: !req.body.usuario
        };
        errors.message = 'Todos los campos son obligatorios';
        const persona = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            ciudad: req.body.ciudad,
            edad: req.body.edad,
            fechaNacimiento: req.body.fechaNacimiento,
            genero: req.body.genero,
            usuarioId: req.body.usuarioId
        };
        return { errors, persona };
    }
    return { errors: null, persona: null };
}