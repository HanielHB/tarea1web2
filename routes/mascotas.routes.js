const { requireUser } = require("../middlewares/requires-user.js");

module.exports = app => {
    let router = require("express").Router();
    const controller =
        require("../controllers/mascota.controller.js");

    router.get("/", requireUser, controller.listMascota);
    router.get("/create", requireUser, controller.createMascota);
    router.post("/create", requireUser, controller.insertMascota);
    router.get("/:id/edit", requireUser, controller.editMascota);
    router.post("/:id/edit", requireUser, controller.updateMascota);
    router.post("/:id/delete", requireUser, controller.deleteMascota);

    app.use('/mascotas', router);

};