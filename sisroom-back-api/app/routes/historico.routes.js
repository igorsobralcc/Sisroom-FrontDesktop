module.exports = app => {
    const historico = require("../controllers/historico.controller.js");
    const authMW = require("../middleware/authMW");

    var router = require("express").Router();

    router.use(authMW)

    // Create a new Tutorial
    router.post("/", historico.create);

    // Retrieve all historico
    router.get("/", historico.findAll);

    // Retrieve all published historico
    router.get("/ativo", historico.findAllRequest);

    // Retrieve a single Tutorial with id
    router.get("/:id", historico.findOne);

    // Update a Tutorial with id
    router.put("/entry/:id", historico.entry);

    // Delete a Tutorial with id
    router.put("/exit/:id", historico.exit);

    app.use("/api/historico", router);
  };
