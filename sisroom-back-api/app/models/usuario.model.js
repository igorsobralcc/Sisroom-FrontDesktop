const bcrypt = require('bcryptjs');

module.exports = (sequelize, Sequelize) => {
    const Usuario = sequelize.define("usuarios", {
        coordenador_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'coordenadores',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        gestor_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'gestores',
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
        professor_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'professores',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        passwordResetToken: {
            type: Sequelize.STRING
        },
        passwordResetExpires: {
            type: Sequelize.DATE
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            isEmail: true,
        },
        senha: {
            type: Sequelize.VIRTUAL,
            allowNull: false,
        },
        funcao: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isIn: {
                    args: [['gestor', 'coordenador', 'porteiro', 'professor', 'admin']],
                    msg: 'O status deve ser gestor,coordenador,porteiro ou professor'
                }
            }
        },
        senha_hash: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
    });

    Usuario.addHook('beforeSave', async usuario => {
        if (usuario.senha) {
            usuario.senha_hash = await bcrypt.hash(usuario.senha, 8)
        }
    })

    Usuario.associate = models => {
        Usuario.hasMany(models.professores, {
            foreignKey: 'id',
            sourceKey: 'professor_id',
            as: 'professor'
        }, models.coordenadores, {
            foreignKey: 'id',
            sourceKey: 'coordenador_id',
            as: 'coordenador'
        }, models.gestores, {
            foreignKey: 'id',
            sourceKey: 'gestor_id',
            as: 'gestor'
        }, models.porteiros, {
            foreignKey: 'id',
            sourceKey: 'porteiro_id',
            as: 'porteiro'
        })
    }

    return Usuario;
};
