module.exports = app => {
    const porteiro = require("../controllers/porteiro.controller.js");
    const authMW = require("../middleware/authMW");

    var router = require("express").Router();
  
    router.use(authMW)
  
    // Create a new Tutorial
    router.post("/", porteiro.create);
  
    // Retrieve all porteiro
    router.get("/", porteiro.findAll);
  
    // Retrieve all published porteiro
    router.get("/ativo", porteiro.findAllAtivo);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", porteiro.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", porteiro.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", porteiro.delete);
  
    // Create a new Tutorial
    router.delete("/", porteiro.deleteAll);
  
    app.use("/api/porteiro", router);
  };
  