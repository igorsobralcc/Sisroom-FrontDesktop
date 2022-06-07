const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.gestores = require("./gestor.model.js")(sequelize, Sequelize);
db.coordenadores = require("./coordenador.model.js")(sequelize, Sequelize);
db.porteiros = require("./porteiro.model.js")(sequelize, Sequelize);
db.professores = require("./professor.model.js")(sequelize, Sequelize);
db.usuarios = require("./usuario.model.js")(sequelize, Sequelize);
db.salas = require("./sala.model.js")(sequelize, Sequelize);
db.cursos = require("./curso.model.js")(sequelize, Sequelize);
db.historicos = require("./historico.model.js")(sequelize, Sequelize);
db.turmas = require("./turma.model.js")(sequelize, Sequelize);
db.disciplinas = require("./disciplina.model.js")(sequelize, Sequelize);
db.alocacoes = require("./alocacao.model.js")(sequelize, Sequelize);

module.exports = db;
