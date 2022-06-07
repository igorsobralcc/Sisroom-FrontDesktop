module.exports = (sequelize, Sequelize) => {
    const Coordenador = sequelize.define("coordenadores", {
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
        area: {
            type: Sequelize.STRING,
            allowNull: false
        },
        contato: {
            type: Sequelize.STRING
        },
       status: {
             type: Sequelize.BOOLEAN,
            allowNull: false
        },
    });

    Coordenador.associate = models => {
        Coordenador.hasOne(models.gestores, {
            foreignKey: 'id',
            sourceKey: 'gestor_id',
            as: 'gestor'
        })
    }
    Coordenador.associate = models => {
        Coordenador.belongsToMany(models.usuarios, {
            foreignKey: 'id',
            sourceKey: "coordenador_id"
        }, models.professores, {
            foreignKey: 'id',
            sourceKey: "coordenador_id"
        })
    }



    return Coordenador;
};
