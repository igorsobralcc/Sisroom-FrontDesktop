module.exports = (sequelize, Sequelize) => {
    const Alocacao = sequelize.define("alocacoes", {
        disciplina_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'disciplinas',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        turma_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'turmas',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        sala_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'salas',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        professor_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'professores',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        dataInicio: {
            type: Sequelize.DATE,
           allowNull: false
       },
        dataFim: {
            type: Sequelize.DATE,
           allowNull: false
       },
        status: {
            type: Sequelize.BOOLEAN,
           allowNull: false
       },
    });

    Alocacao.associate = models => {
        Alocacao.belongsTo(models.historicos, {
            foreignKey: "id",
            sourceKey: "alocacao_id"
        })
    }

    Alocacao.associate = models => {
        Alocacao.hasMany(models.professores, {
            foreignKey: 'id',
            sourceKey: 'professor_id',
            as: 'professor'
        }, models.salas, {
            foreignKey: 'id',
            sourceKey: 'sala_id',
            as: 'sala'
        }, models.turmas, {
            foreignKey: 'id',
            sourceKey: 'turma_id',
            as: 'turma'
        }, models.disciplinas, {
            foreignKey: 'id',
            sourceKey: 'disciplina_id',
            as: 'disciplina'
        })
    }

    return Alocacao;
};
