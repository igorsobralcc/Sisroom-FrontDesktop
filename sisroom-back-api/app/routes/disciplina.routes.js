module.exports = app => {
    const disciplina = require("../controllers/disciplina.controller.js");
    const authMW = require("../middleware/authMW");

    var router = require("express").Router();

    router.use(authMW)
  
    // Create a new Tutorial
    router.post("/", disciplina.create);
  
    // Retrieve all disciplina
    router.get("/", disciplina.findAll);
  
    // Retrieve all published disciplina
    router.get("/ativo", disciplina.findAllAtivo);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", disciplina.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", disciplina.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", disciplina.delete);
  
    // Create a new Tutorial
    router.delete("/", disciplina.deleteAll);
  
    app.use("/api/disciplina", router);
  };
  