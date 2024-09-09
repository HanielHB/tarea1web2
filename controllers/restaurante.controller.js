const db = require("../models");

exports.listRestaurante = function (req, res) {
    db.restaurantes.findAll({
        include: 'hamburguesas'
    }).then(restaurantes => {
        res.render('restaurantes/list.ejs', { restaurantes: restaurantes });
    });
}
exports.createRestaurante = async function (req, res) {
    const usuarios = await db.usuarios.findAll();
    res.render('restaurantes/form.ejs', { restaurante: null, usuarios, errors: null });
}
exports.insertRestaurante = function (req, res) {
    const { errors, restaurante } = validateRestauranteForm(req);
    if (errors) {
        res.render('restaurantes/form.ejs', { restaurante: restaurante, errors: errors});
        return;
    }
    //para acceder al usuario que está loggeado
    
    db.restaurantes.create({
        rnombre: req.body.rnombre,
        // usuarioId: req.body.usuarioId
    }).then(() => {
        res.redirect('/restaurantes');
    });
}
exports.editRestaurante = async function (req, res) {
    const id = req.params.id;
    const restaurante = await db.restaurantes.findByPk(id);
    res.render('restaurantes/form.ejs', { restaurante: restaurante, errors: null });
}
exports.updateRestaurante = async function (req, res) {
    const validacion = validateRestauranteForm(req);
    const errors = validacion.errors;
    const restauranteErrors = validacion.restaurante;
    if (errors) {
        res.render('restaurantes/form.ejs', { restaurante: restauranteErrors, errors: errors});
        return;
    }
    const id = req.params.id;
    const restaurante = await db.restaurantes.findByPk(id);

    restaurante.rnombre = req.body.rnombre;
    await restaurante.save();
    res.redirect('/restaurantes');
}


exports.deleteRestaurante = async function (req, res) {
    const id = req.params.id;
    const restaurante = await db.restaurantes.findByPk(id);
    await restaurante.destroy();
    res.redirect('/restaurantes');
}

// exports.uploadProfileGet = async function (req, res) {
//     const id = req.params.id;
//     const persona = await db.personas.findByPk(id);
//     res.render('personas/uploadProfile.ejs', { persona: persona, errors: null });
// }
// exports.uploadProfilePost = async function (req, res) {

//     const id = req.params.id;
//     const persona = await db.personas.findByPk(id);
//     if (!req.files?.photo) {
//         res.render('personas/uploadProfile.ejs', { errors: { message: 'Debe seleccionar una imagen' }, persona });
//         return;
//     }
//     const image = req.files.photo;
//     // eslint-disable-next-line no-undef
//     const path = __dirname + '/../public/images/profile/' + persona.id + '.jpg';

//     image.mv(path, function (err) {
//         if (err) {
//             res.render('personas/uploadProfile.ejs', { errors: { message: 'Error al subir la imagen' }, persona });
//             console.log(err);
//             return;
//         }
//         res.redirect('/personas');
//     });
// }

const validateRestauranteForm = function (req) {
    if (!req.body.rnombre ) {
        const errors = {
            rnombre: !req.body.rnombre,
        };
        errors.message = 'Todos los campos son obligatorios';
        const restaurante = {
            rnombre: req.body.rnombre
            
        };
        return { errors, restaurante };
    }
    return { errors: null, restaurante: null };
}