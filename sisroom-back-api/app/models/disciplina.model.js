module.exports = (sequelize, Sequelize) => {
    const Disciplina = sequelize.define("disciplinas", {
        nome: {
            type: Sequelize.STRING,
            allowNull: false
        },
        status: {
          type: Sequelize.BOOLEAN,
         allowNull: false
     },
    });

    Disciplina.associate = models => {
        Disciplina.belongsTo(models.alocacoes, {
          foreignKey: 'id',
          sourceKey: "disciplina_id"
        })
      }

    return Disciplina;
};
