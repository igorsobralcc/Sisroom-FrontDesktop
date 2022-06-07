module.exports = app => {
  const gestor = require("../controllers/gestor.controller.js");
  const authMW = require("../middleware/authMW");

  var router = require("express").Router();

  router.use(authMW)

  // Create a new Tutorial
  router.post("/", gestor.create);

  // Retrieve all gestor
  router.get("/", gestor.findAll);

  // Retrieve all published gestor
  router.get("/ativo", gestor.findAllAtivo);

  // Retrieve a single Tutorial with id
  router.get("/:id", gestor.findOne);

  // Update a Tutorial with id
  router.put("/:id", gestor.update);

  // Delete a Tutorial with id
  router.delete("/:id", gestor.delete);

  // Create a new Tutorial
  router.delete("/", gestor.deleteAll);

  app.use("/api/gestor", router);
};
