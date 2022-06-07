module.exports = (sequelize, Sequelize) => {
  const Sala = sequelize.define("salas", {
    numero: {
      type: Sequelize.BIGINT(4), 
      allowNull: false 
    },
    andar: {
      type: Sequelize.BIGINT(2),
      allowNull: false
    },
    tipo: {
      type: Sequelize.STRING,
      allowNull: false
    },
    chave:{
        type: Sequelize.BIGINT(4),
        allowNull: false
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
          isIn: {
              args: [[ 'ativo', 'ocupada', 'inativo', 'manutencao' ]],
              msg: 'O status deve ser ativo, ocupada, inativo ou manutencao'
          }
      }
    },
  });

  Sala.associate = models => {
    Sala.belongsTo(models.alocacoes,{
      foreignKey: "id",
      sourceKey: "sala_id"
  })
  }

  return Sala;
};
