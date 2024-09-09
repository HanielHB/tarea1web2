module.exports = (sequelize, Sequelize) => {
    const Review = sequelize.define("review", {
        review: {
            type: Sequelize.TEXT
        },
        puntaje: {
            type: Sequelize.INTEGER,
            validate: {
                min: 1,
                max: 5
            }
        },
        usuarioId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'usuarios', // Nombre de la tabla de usuarios
                key: 'id'
            }
        },
        hamburguesaId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'hamburguesas', // Nombre de la tabla de hamburguesas
                key: 'id'
            }
        }
    });

    Review.associate = function(models) {
        Review.belongsTo(models.Hamburguesa, { foreignKey: 'hamburguesaId', as: 'hamburguesa' });
        Review.belongsTo(models.Usuario, { foreignKey: 'usuarioId', as: 'usuario' });
    };
    return Review;
}