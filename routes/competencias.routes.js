const { requireUser } = require("../middlewares/requires-user.js");

module.exports = app => {
    let router = require("express").Router();
    const controller =
        require("../controllers/competencia.controller.js");

    router.get("/", requireUser, controller.listCompetencia);
    router.get("/create", requireUser, controller.createCompetencia);
    router.post("/create", requireUser, controller.insertCompetencia);
    router.get("/:id/edit", requireUser, controller.editCompetencia);
    router.post("/:id/edit", requireUser, controller.updateCompetencia);
    router.post("/:id/delete", requireUser, controller.deleteCompetencia);
    router.get("/:id/participantes", requireUser, controller.addParticipantes);
    router.post("/:id/participantes", requireUser, controller.insertParticipantes);

    app.use('/competencias', router);

};