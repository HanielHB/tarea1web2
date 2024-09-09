const { requireUser } = require("../middlewares/requires-user.js");

module.exports = app => {
    let router = require("express").Router();
    const controller =
        require("../controllers/restaurante.controller.js");

    router.get("/", requireUser, controller.listRestaurante);
    router.get("/create", requireUser, controller.createRestaurante);
    router.post("/create", requireUser, controller.insertRestaurante);
    router.get("/:id/edit", requireUser, controller.editRestaurante);
    router.post("/:id/edit", requireUser, controller.updateRestaurante);
    router.post("/:id/delete", requireUser, controller.deleteRestaurante);
    

    app.use('/restaurantes', router);

};