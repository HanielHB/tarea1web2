const { requireUser } = require("../middlewares/requires-user.js");

module.exports = app => {
    let router = require("express").Router();
    const controller =
        require("../controllers/hamburguesa.controller.js");

    router.get("/", requireUser, controller.listHamburguesa);
    router.get("/create", requireUser, controller.createHamburguesa);
    router.post("/create", requireUser, controller.insertHamburguesa);
    router.get("/:id/edit", requireUser, controller.editHamburguesa);
    router.post("/:id/edit", requireUser, controller.updateHamburguesa);
    router.post("/:id/delete", requireUser, controller.deleteHamburguesa);
    router.get("/:id/profile", requireUser, controller.uploadProfileGet);
    router.post("/:id/profile", requireUser, controller.uploadProfilePost);
    router.get('/restaurante/:restauranteId', controller.listHamburguesasByRestaurante);

    app.use('/hamburguesas', router);

};