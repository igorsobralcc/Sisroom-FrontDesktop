module.exports = app => {
    const turma = require("../controllers/turma.controller.js");
    const authMW = require("../middleware/authMW");

    var router = require("express").Router();

    router.use(authMW)
  
    // Create a new Tutorial
    router.post("/", turma.create);
  
    // Retrieve all turma
    router.get("/", turma.findAll);
  
    // Retrieve all published turma
    router.get("/ativo", turma.findAllAtivo);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", turma.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", turma.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", turma.delete);
  
    // Create a new Tutorial
    router.delete("/", turma.deleteAll);
  
    app.use("/api/turma", router);
  };
  