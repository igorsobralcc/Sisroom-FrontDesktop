module.exports = app => {
    const curso = require("../controllers/curso.controller.js");
    const authMW = require("../middleware/authMW");

    var router = require("express").Router();

    router.use(authMW)
  
    // Create a new Tutorial
    router.post("/", curso.create);
  
    // Retrieve all curso
    router.get("/", curso.findAll);
  
    // Retrieve all status curso
    router.get("/ativo", curso.findAllAtivo);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", curso.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", curso.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", curso.delete);
  
    // Create a new Tutorial
    router.delete("/", curso.deleteAll);
  
    app.use("/api/curso", router);
  };
  