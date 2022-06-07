module.exports = (sequelize, Sequelize) => {
    const Turmas = sequelize.define("turmas", {
        curso_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'cursos',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        nome: {
            type: Sequelize.STRING,
            allowNull: false
        },
        status: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
    });

    Turmas.associate = models => {
        Turmas.hasOne(models.cursos,{
            foreignKey: 'id',
            sourceKey: 'curso_id',
            as: 'curso'
        })
    }

    return Turmas;
};
