module.exports = app => {
    const coordenador = require("../controllers/coordenador.controller.js");
    const authMW = require("../middleware/authMW");

    var router = require("express").Router();

    router.use(authMW)

    // Create a new Tutorial
    router.post("/", coordenador.create);

    // Retrieve all coordenador
    router.get("/", coordenador.findAll);

    // Retrieve all status coordenador
    router.get("/ativo", coordenador.findAllAtivo);

    // Retrieve a single Tutorial with id
    router.get("/:id", coordenador.findOne);

    // Update a Tutorial with id
    router.put("/:id", coordenador.update);

    // Delete a Tutorial with id
    router.delete("/:id", coordenador.delete);

    // Create a new Tutorial
    router.delete("/", coordenador.deleteAll);

    app.use("/api/coordenador", router);
  };
