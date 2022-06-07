module.exports = app => {
    const sala = require("../controllers/sala.controller.js");
    const authMW = require("../middleware/authMW");

    var router = require("express").Router();

    router.use(authMW)

    // Create a new Tutorial
    router.post("/", sala.create);

    // Retrieve all sala
    router.get("/", sala.findAll);

    // Retrieve all published sala
    router.get("/ativo", sala.findAllAtivo);

    // Retrieve all published sala
    router.get("/manutencao", sala.findAllManutencao);

    // Retrieve all published sala
    router.get("/ocupada", sala.findAllOcupada);

    // Retrieve a single Tutorial with id
    router.get("/:id", sala.findOne);

    // Update a Tutorial with id
    router.put("/:id", sala.update);

    // Update a Tutorial with id
    router.put("/ativa/:id", sala.activate);

    // Update a Tutorial with id
    router.put("/manutencao/:id", sala.maintenance);

    // Update a Tutorial with id
    router.put("/ocupada/:id", sala.occupied);

    // Delete a Tutorial with id
    router.delete("/:id", sala.delete);

    // Create a new Tutorial
    router.delete("/", sala.deleteAll);

    app.use("/api/sala", router);
  };
