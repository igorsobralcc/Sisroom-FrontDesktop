module.exports = app => {
    const professor = require("../controllers/professor.controller.js");
    const authMW = require("../middleware/authMW");

    var router = require("express").Router();
  
    router.use(authMW)
  
    // Create a new Tutorial
    router.post("/", professor.create);
  
    // Retrieve all professor
    router.get("/", professor.findAll);
  
    // Retrieve all published professor
    router.get("/ativo", professor.findAllAtivo);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", professor.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", professor.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", professor.delete);
  
    // Create a new Tutorial
    router.delete("/", professor.deleteAll);
  
    app.use("/api/professor", router);
  };
  