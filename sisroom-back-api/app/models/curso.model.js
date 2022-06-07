module.exports = (sequelize, Sequelize) => {
  const Curso = sequelize.define("cursos", {
    nome: {
      type: Sequelize.STRING,
      allowNull: false
    },
    area: {
      type: Sequelize.STRING,
      allowNull: false
    },
    status: {
      type: Sequelize.BOOLEAN,
     allowNull: false
 },
  });

  Curso.associate = models => {
    Curso.belongsTo(models.turmas, {
      foreignKey: "id",
      sourceKey: "curso_id"
    })
  }

    return Curso;
  };
