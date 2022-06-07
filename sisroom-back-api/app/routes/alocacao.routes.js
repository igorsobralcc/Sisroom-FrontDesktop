module.exports = app => {
    const alocacao = require("../controllers/alocacao.controller.js");
    const authMW = require("../middleware/authMW");

    var router = require("express").Router();

    router.use(authMW)

    // Create a new Tutorial
    router.post("/", alocacao.create);

    // Retrieve all alocacao
    router.get("/", alocacao.findAll);

    // Retrieve all published alocacao
    router.get("/ativo", alocacao.findAllAtivo);

    // Retrieve a single Tutorial with id
    router.get("/:id", alocacao.findOne);

    // Update a Tutorial with id
    router.put("/:id", alocacao.update);

    // Delete a Tutorial with id
    router.delete("/:id", alocacao.delete);

    // Create a new Tutorial
    router.delete("/", alocacao.deleteAll);

    app.use("/api/alocacao", router);
  };
