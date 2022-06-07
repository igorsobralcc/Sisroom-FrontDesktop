module.exports = (sequelize, Sequelize) => {
    const Professor = sequelize.define("professores", {
        coordenador_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'coordenadores',
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

    Professor.associate = models => {
        Professor.hasOne(models.coordenadores,{
            foreignKey: 'id',
            sourceKey: 'coordenador_id',
            as: 'coordenador'
        })
    }
    Professor.associate = models => {
        Professor.belongsToMany(models.usuarios,{
          foreignKey: 'id',
          sourceKey: "professor_id"
        },models.alocacoes,{
            foreignKey: "id",
            sourceKey: "professor_id"
        })
      }

    return Professor;
};
