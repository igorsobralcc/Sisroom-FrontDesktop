module.exports = (sequelize, Sequelize) => {
  const Gestor = sequelize.define("gestores", {
    nome: {
      type: Sequelize.STRING,
      allowNull: false
    },
    matricula: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    contato: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
  });

  Gestor.associate = models => {
    Gestor.belongsTo(models.coordenadores, {
      foreignKey: 'id',
      sourceKey: "gestor_id"
    })
  }
  Gestor.associate = models => {
    Gestor.belongsToMany(models.porteiros, {
      foreignKey: 'id',
      sourceKey: "gestor_id"
    }, models.usuario, {
      foreignKey: 'id',
      sourceKey: "gestor_id"
    })
  }


  return Gestor;
};
