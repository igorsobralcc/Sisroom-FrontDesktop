module.exports = (sequelize, Sequelize) => {
  const Porteiro = sequelize.define("porteiros", {
    gestor_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'gestores',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
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

  Porteiro.associate = models => {
    Porteiro.hasOne(models.gestores, {
      foreignKey: 'id',
      sourceKey: 'gestor_id',
      as: 'gestor'
    })
  }
  Porteiro.associate = models => {
    Porteiro.belongsToMany(models.usuarios, {
      foreignKey: 'id',
      sourceKey: "porteiro_id"
    },models.historicos, {
      foreignKey: 'id',
      sourceKey: "porteiro_id"
    })
  }

  return Porteiro;
};
