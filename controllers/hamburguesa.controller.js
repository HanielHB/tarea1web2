const db = require("../models");

exports.listHamburguesa = function (req, res) {
    db.hamburguesas.findAll({
        include: 'reviews'
    }).then(hamburguesas => {
        res.render('hamburguesas/list.ejs', { hamburguesas: hamburguesas });
    });
}

exports.createHamburguesa = async function (req, res) {
    const restaurantes = await db.restaurantes.findAll();
    res.render('hamburguesas/form.ejs', { hamburguesa: null, restaurantes, errors: null });
}
exports.insertHamburguesa = async function (req, res) {
    const { errors, hamburguesa } = validateHamburguesaForm(req);
    if (errors) {
        const restaurantes = await db.restaurantes.findAll();

        res.render('hamburguesas/form.ejs', { hamburguesa: hamburguesa, restaurantes, errors: errors });
        return;
    }
    db.hamburguesas.create({
        hnombre: req.body.hnombre,
        descripcion: req.body.descripcion,
        restauranteId: req.body.restauranteId
    }).then(() => {
        res.redirect('/hamburguesas');
    });
}
exports.editHamburguesa = async function (req, res) {
    const id = req.params.id;
    const hamburguesa = await db.hamburguesas.findByPk(id);
    const restaurantes = await db.restaurantes.findAll();

    res.render('hamburguesas/form.ejs', { hamburguesa: hamburguesa, restaurantes, errors: null });
}
exports.updateHamburguesa = async function (req, res) {
    const validacion = validateHamburguesaForm(req);
    const errors = validacion.errors;
    const hamburguesaErrors = validacion.hamburguesa;
    if (errors) {
        const restaurantes = await db.restaurantes.findAll();

        res.render('hamburguesas/form.ejs', { hamburguesa: hamburguesaErrors, restaurantes, errors: errors });
        return;
    }
    const id = req.params.id;
    const hamburguesa = await db.hamburguesas.findByPk(id);

    hamburguesa.hnombre = req.body.hnombre;
    hamburguesa.descripcion = req.body.descripcion;
    hamburguesa.restauranteId = req.body.restauranteId;
    await hamburguesa.save();
    res.redirect('/hamburguesas');
}
exports.deleteHamburguesa = async function (req, res) {
    const id = req.params.id;
    const hamburguesa = await db.hamburguesas.findByPk(id);
    await hamburguesa.destroy();
    res.redirect('/hamburguesas');
}


exports.uploadProfileGet = async function (req, res) {
    const id = req.params.id;
    const hamburguesa = await db.hamburguesas.findByPk(id);
    res.render('hamburguesas/uploadProfile.ejs', { hamburguesa: hamburguesa, errors: null });
}
exports.uploadProfilePost = async function (req, res) {

    const id = req.params.id;
    const hamburguesa = await db.hamburguesas.findByPk(id);
    if (!req.files?.photo) {
        res.render('hamburguesas/uploadProfile.ejs', { errors: { message: 'Debe seleccionar una imagen' }, hamburguesa });
        return;
    }
    const image = req.files.photo;
    // eslint-disable-next-line no-undef
    const path = __dirname + '/../public/images/profile/' + hamburguesa.id + '.jpg';

    image.mv(path, function (err) {
        if (err) {
            res.render('hamburguesas/uploadProfile.ejs', { errors: { message: 'Error al subir la imagen' }, hamburguesa });
            console.log(err);
            return;
        }
        res.redirect('/hamburguesas');
    });
}
exports.listHamburguesasByRestaurante = async function (req, res) {
    const restauranteId = req.params.restauranteId;
    const hamburguesas = await db.hamburguesas.findAll({
        where: { restauranteId: restauranteId },
        include: ['restaurante']
    });
    res.render('hamburguesas/list.ejs', { hamburguesas: hamburguesas });
}


const validateHamburguesaForm = function (req) {
    if (!req.body.hnombre || !req.body.descripcion
        || !req.body.restauranteId)  {
        const errors = {
            hnombre: !req.body.hnombre,
            descripcion: !req.body.descripcion,
            restauranteId: !req.body.restauranteId
        };
        errors.message = 'Todos los campos son obligatorios';
        const hamburguesa = {
            hnombre: req.body.hnombre,
            descripcion: req.body.descripcion,
            restauranteId: req.body.restauranteId
        };
        return { errors, hamburguesa };
    }
    return { errors: null, hamburguesa: null };
}