const { requireUser } = require("../middlewares/requires-user.js");

module.exports = app => {
    let router = require("express").Router();
    const controller =
        require("../controllers/persona.controller.js");

    router.get("/", requireUser, controller.listPersona);
    router.get("/create", requireUser, controller.createPersona);
    router.post("/create", requireUser, controller.insertPersona);
    router.get("/:id/edit", requireUser, controller.editPersona);
    router.post("/:id/edit", requireUser, controller.updatePersona);
    router.post("/:id/delete", requireUser, controller.deletePersona);
    router.get("/:id/profile", requireUser, controller.uploadProfileGet);
    router.post("/:id/profile", requireUser, controller.uploadProfilePost);

    app.use('/personas', router);

};