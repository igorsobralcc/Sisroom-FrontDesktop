module.exports = (sequelize, Sequelize) => {
    const Historico = sequelize.define("historicos", {
        alocacao_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'alocacoes',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        porteiro_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'porteiros',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        status_entrada: {
            type: Sequelize.BOOLEAN,
        },
        status_saida: {
            type: Sequelize.BOOLEAN,
        },
        obs: {
            type: Sequelize.STRING,
        },
    });

    Historico.associate = models => {
        Historico.hasMany(models.alocacoes,{
            foreignKey: 'id',
            sourceKey: 'alocacao_id',
            as: 'alocacao'
        },models.porteiros,{
            foreignKey: 'id',
            sourceKey: 'porteiro_id',
            as: 'porteiro'
        })
    }

    return Historico;
};
